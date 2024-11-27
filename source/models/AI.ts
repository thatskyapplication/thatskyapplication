import { Collection } from "@discordjs/collection";
import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIMessageComponentSelectMenuInteraction,
	ComponentType,
	type GatewayMessageCreateDispatchData,
	type InteractionsAPI,
	MessageFlags,
	MessageType,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import {
	ENTITLEMENT_CACHE,
	clearEntitlementCache,
	fetchEntitlement,
} from "../caches/entitlements.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import {
	messageCreateEmojiResponse,
	messageCreateReactionResponse,
	messageCreateResponse,
} from "../open-ai.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	SERVER_UPGRADE_SKU_ID,
} from "../utility/constants.js";
import { can } from "../utility/permissions.js";
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

const AIFrequencyType = {
	Disabled: 0,
	VeryRare: 1,
	Rare: 2,
	Normal: 3,
	Common: 4,
	VeryCommon: 5,
} as const;

const AI_FREQUENCY_VALUES = Object.values(AIFrequencyType);
type AIFrequencyTypes = (typeof AI_FREQUENCY_VALUES)[number];

const AIFrequencyTypeToString = {
	[AIFrequencyType.Disabled]: "Disabled",
	[AIFrequencyType.VeryRare]: "Very rare",
	[AIFrequencyType.Rare]: "Rare",
	[AIFrequencyType.Normal]: "Normal",
	[AIFrequencyType.Common]: "Common",
	[AIFrequencyType.VeryCommon]: "Very common",
} as const satisfies Readonly<Record<AIFrequencyTypes, string>>;

const AIFrequencyTypeToValue = {
	[AIFrequencyType.Disabled]: 0,
	[AIFrequencyType.VeryRare]: 0.000_1,
	[AIFrequencyType.Rare]: 0.001,
	[AIFrequencyType.Normal]: 0.005,
	[AIFrequencyType.Common]: 0.01,
	[AIFrequencyType.VeryCommon]: 0.05,
} as const satisfies Readonly<Record<AIFrequencyTypes, number>>;

type AIFrequencyValues = (typeof AIFrequencyTypeToValue)[keyof typeof AIFrequencyTypeToValue];

function isAIFrequency(number: number): number is AIFrequencyTypes {
	return AI_FREQUENCY_VALUES.includes(number as AIFrequencyTypes);
}

export const AI_FREQUENCY_SELECT_MENU_CUSTOM_ID = "AI_FREQUENCY_SELECT_MENU_CUSTOM_ID" as const;

const AI_FREQUENCY_DESCRIPTION = `I have the ability to engage in conversation, be it sporadically or when you mention me!

The frequency at which I will sporadically respond may be configured. The higher the frequency, the more likely I will respond.

You can disable the frequency to turn this feature off and I will no longer sporadically reply.` as const;

const AI_FREQUENCY_DESCRIPTION_WITHOUT_MONETISATION = `I have the ability to engage in conversation, be it sporadically or when you mention me! I can choose to respond in certain frequencies too!

To use this feature though, it must be purchased.` as const;

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
		let ai = this.cache.find((cachedAI) => cachedAI.guildId === guildId);

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
			pino.error(interaction, "Failed to find a guild to set an AI frequency in.");
			throw new Error("Guild not found.");
		}

		const frequencyType = Number(interaction.data.values[0]);

		if (!isAIFrequency(frequencyType)) {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
				content: "Unknown frequency. Please try again.",
				embeds: [],
			});

			return;
		}

		const ai = await this.upsert(guild.id, { frequency_type: frequencyType });

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			...this.response(interaction, ai),
			content: `Frequency set to \`${AIFrequencyTypeToString[frequencyType]}\`.`,
		});
	}

	public static response(
		interaction:
			| APIChatInputApplicationCommandGuildInteraction
			| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
		ai?: AI,
	): Parameters<InteractionsAPI["reply"]>[2] {
		const guild = GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			pino.error(interaction, "Failed to find a guild to create a JSON body response in.");
			throw new Error("Guild not found.");
		}

		const entitlement = interaction.entitlements.find(
			(entitlement) => entitlement.sku_id === SERVER_UPGRADE_SKU_ID,
		);

		return entitlement
			? {
					components: [
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: AI_FREQUENCY_SELECT_MENU_CUSTOM_ID,
									max_values: 1,
									min_values: 1,
									options: AI_FREQUENCY_VALUES.map((aIFrequencyValue) => ({
										default: aIFrequencyValue === ai?.frequencyType,
										label: AIFrequencyTypeToString[aIFrequencyValue],
										value: String(aIFrequencyValue),
									})),
									placeholder: "Set the frequency.",
								},
							],
						},
					],
					embeds: [
						{
							color: DEFAULT_EMBED_COLOUR,
							description: AI_FREQUENCY_DESCRIPTION,
							title: guild.name,
						},
					],
					flags: MessageFlags.Ephemeral,
				}
			: {
					components: [
						{
							type: ComponentType.ActionRow,
							components: [{ type: ComponentType.Button, sku_id: SERVER_UPGRADE_SKU_ID, style: 6 }],
						},
					],
					embeds: [
						{
							color: DEFAULT_EMBED_COLOUR,
							description: AI_FREQUENCY_DESCRIPTION_WITHOUT_MONETISATION,
							title: guild.name,
						},
					],
					flags: MessageFlags.Ephemeral,
				};
	}

	public async respond(message: GatewayMessageCreateDispatchData, me: GuildMember) {
		const guild = message.guild_id && GUILD_CACHE.get(message.guild_id);

		if (!guild) {
			pino.error(message, "Failed to find a guild to respond in.");
			return;
		}

		const channel = guild.channels.get(message.channel_id);

		if (!channel) {
			pino.error(message, "Failed to find a channel to respond in.");
			return;
		}

		const entitlement = await fetchEntitlement(guild.id);

		if (entitlement) {
			await (Math.random() < 0.1
				? Math.random() < 0.5 &&
					can({ permission: PermissionFlagsBits.AddReactions, guild, member: me, channel })
					? messageCreateReactionResponse(message)
					: messageCreateEmojiResponse(message)
				: message.type === MessageType.Default ||
						message.type === MessageType.Reply ||
						message.type === MessageType.ChatInputCommand ||
						message.type === MessageType.ContextMenuCommand
					? messageCreateResponse(message)
					: undefined);
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
