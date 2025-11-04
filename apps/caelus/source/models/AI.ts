import { Collection } from "@discordjs/collection";
import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type GatewayMessageCreateDispatchData,
	MessageFlags,
	MessageType,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import {
	AI_FREQUENCY_TYPE_VALUES,
	AIFrequencyType,
	type AIFrequencyTypes,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import {
	clearEntitlementCache,
	ENTITLEMENT_CACHE,
	fetchEntitlement,
} from "../caches/entitlements.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import {
	messageCreateEmojiResponse,
	messageCreateReactionResponse,
	messageCreateResponse,
	messageCreateStickerResponse,
} from "../open-ai.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { APPLICATION_ID, SERVER_UPGRADE_SKU_ID } from "../utility/configuration.js";
import { CustomId } from "../utility/custom-id.js";
import { captureError, isThreadChannel } from "../utility/functions.js";
import { can } from "../utility/permissions.js";
import type { GuildChannel } from "./discord/guild.js";
import type { GuildMember } from "./discord/guild-member.js";

export interface AIPacket {
	guild_id: Snowflake;
	frequency_type: number;
}

interface AIData {
	guildId: AIPacket["guild_id"];
	frequencyType: AIFrequencyTypes;
}

type AISetData = Omit<AIPacket, "guild_id">;
type AIPatchData = Omit<AIPacket, "guild_id">;

const AIFrequencyTypeToValue = {
	[AIFrequencyType.Disabled]: 0,
	[AIFrequencyType.VeryRare]: 0.000_1,
	[AIFrequencyType.Rare]: 0.001,
	[AIFrequencyType.Normal]: 0.005,
	[AIFrequencyType.Common]: 0.01,
	[AIFrequencyType.VeryCommon]: 0.05,
} as const satisfies Readonly<Record<AIFrequencyTypes, number>>;

type AIFrequencyValues = (typeof AIFrequencyTypeToValue)[keyof typeof AIFrequencyTypeToValue];

function isAIFrequency(frequencyType: number): frequencyType is AIFrequencyTypes {
	return AI_FREQUENCY_TYPE_VALUES.includes(frequencyType as AIFrequencyTypes);
}

export default class AI {
	public static readonly cache = new Collection<Snowflake, AI>();

	public readonly guildId: AIData["guildId"];

	public frequencyType!: AIData["frequencyType"];

	public frequency!: AIFrequencyValues;

	public constructor(notification: AIPacket) {
		this.guildId = notification.guild_id;
		this.patch(notification);
	}

	public static async populateCache() {
		// Clear the cache. Just in case.
		this.cache.clear();
		clearEntitlementCache();

		// Fetch the AI packets.
		const packets = await pg<AIPacket>(Table.AI);

		// Fetch entitlements for the server upgrade SKU.
		const entitlements = await client.api.monetization.getEntitlements(APPLICATION_ID, {
			exclude_ended: true,
			limit: 100,
			sku_ids: SERVER_UPGRADE_SKU_ID,
		});

		// Populate the entitlement cache.
		for (const entitlement of entitlements) {
			ENTITLEMENT_CACHE.set(entitlement.id, entitlement);
		}

		// Filter the packets to only include guilds with the SKU.
		const filteredPackets = packets.filter((packet) =>
			entitlements.some((entitlement) => entitlement.guild_id === packet.guild_id),
		);

		// Populate the AI cache.
		for (const packet of filteredPackets) {
			const ai = new this(packet);
			this.cache.set(ai.guildId, ai);
		}
	}

	private patch(data: AIPatchData) {
		this.frequencyType = isAIFrequency(data.frequency_type)
			? data.frequency_type
			: AIFrequencyType.Disabled;

		this.frequency = AIFrequencyTypeToValue[this.frequencyType];
	}

	private static async upsert(guildId: AI["guildId"], data: AISetData) {
		let ai = this.cache.get(guildId);

		const [aiPacket] = await pg<AIPacket>(Table.AI)
			.insert({ ...data, guild_id: guildId }, "*")
			.onConflict("guild_id")
			.merge();

		if (ai) {
			ai.patch(aiPacket!);
		} else {
			ai = new this(aiPacket!);
			this.cache.set(ai.guildId, ai);
		}

		return ai;
	}

	public static async set(
		interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	) {
		const guild = GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			throw new Error("Failed to find a guild to set an AI frequency in.");
		}

		const frequencyType = Number(interaction.data.values[0]);

		if (!isAIFrequency(frequencyType)) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("ai.frequency-unknown", { lng: interaction.locale, ns: "features" }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const ai = await this.upsert(guild.id, { frequency_type: frequencyType });

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: this.response(interaction, ai),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	}

	public static response(
		interaction:
			| APIChatInputApplicationCommandGuildInteraction
			| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
		ai?: AI,
	): [APIMessageTopLevelComponent] {
		const guild = GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			throw new Error("Failed to find a guild to create a JSON body response in.");
		}

		const { entitlements, locale } = interaction;

		const entitlement = entitlements.find(
			(entitlement) => entitlement.sku_id === SERVER_UPGRADE_SKU_ID,
		);

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.TextDisplay,
				content: `## ${t("ai.title", { lng: locale, ns: "features" })}`,
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		if (entitlement) {
			containerComponents.push(
				{
					type: ComponentType.TextDisplay,
					content: t("ai.frequency-description", { lng: locale, ns: "features" }),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CustomId.AIFrequency,
							max_values: 1,
							min_values: 1,
							options: AI_FREQUENCY_TYPE_VALUES.map((aIFrequencyValue) => ({
								default: aIFrequencyValue === ai?.frequencyType,
								label: t(`ai.frequency-type.${aIFrequencyValue}`, { lng: locale, ns: "features" }),
								value: String(aIFrequencyValue),
							})),
							placeholder: t("ai.frequency-type-string-select-menu-placeholder", {
								lng: locale,
								ns: "features",
							}),
						},
					],
				},
			);
		} else {
			containerComponents.push(
				{
					type: ComponentType.TextDisplay,
					content: t("ai.frequency-description-no-monetisation", { lng: locale, ns: "features" }),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Premium,
							sku_id: SERVER_UPGRADE_SKU_ID,
						},
					],
				},
			);
		}

		return [{ type: ComponentType.Container, components: containerComponents }];
	}

	public async respond(
		message: GatewayMessageCreateDispatchData,
		me: GuildMember,
		mentioned: boolean,
	) {
		const guild = message.guild_id && GUILD_CACHE.get(message.guild_id);

		if (!guild) {
			captureError(message, "Failed to find a guild to respond in.");
			return;
		}

		const channel = guild.channels.get(message.channel_id) ?? guild.threads.get(message.channel_id);

		if (!channel) {
			captureError(message, "Failed to find a channel to respond in.");
			return;
		}

		const entitlement = await fetchEntitlement(guild.id);
		let resolvedChannelForPermission: GuildChannel;

		if (isThreadChannel(channel)) {
			const parentChannel = guild.channels.get(channel.parentId);

			if (!parentChannel) {
				pino.warn(message, "Failed to resolve the parent channel for an AI response.");
				return;
			}

			resolvedChannelForPermission = parentChannel;
		} else {
			resolvedChannelForPermission = channel;
		}

		if (entitlement) {
			if (Math.random() < 0.1) {
				const randomReply = Math.random();

				if (
					randomReply < 1 / 3 &&
					can({
						permission: PermissionFlagsBits.AddReactions,
						guild,
						member: me,
						channel: resolvedChannelForPermission,
					})
				) {
					await messageCreateReactionResponse(message);
				} else if (randomReply < 2 / 3) {
					await messageCreateEmojiResponse(message);
				} else if (guild.stickers.some((sticker) => sticker.available)) {
					await messageCreateStickerResponse(message, guild);
				}
			} else if (
				message.type === MessageType.Default ||
				message.type === MessageType.Reply ||
				message.type === MessageType.ChatInputCommand ||
				message.type === MessageType.ContextMenuCommand
			) {
				await messageCreateResponse(message, mentioned);
			}
		} else {
			pino.info(message, "No entitlement found, so deleting from AI cache.");
			await AI.delete(guild.id);
		}
	}

	public static async delete(guildId: Snowflake) {
		await pg<AIPacket>(Table.AI).delete().where({ guild_id: guildId });
		this.cache.delete(guildId);
	}
}
