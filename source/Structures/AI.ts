import {
	ActionRowBuilder,
	type ChatInputCommandInteraction,
	type Client,
	Collection,
	ComponentType,
	EmbedBuilder,
	type GuildMember,
	type Message,
	PermissionFlagsBits,
	type Snowflake,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import {
	messageCreateEmojiResponse,
	messageCreateReactionResponse,
	messageCreateResponse,
} from "../open-ai.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { DEFAULT_EMBED_COLOUR, SERVER_UPGRADE_SKU_ID } from "../utility/constants.js";
import { resolveEntitlement } from "../utility/functions.js";

interface AIPacket {
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

	public static async populateCache(client: Client<true>) {
		// Clear the cache. Just in case.
		this.cache.clear();

		// Fetch the AI packets.
		const packets = await pg<AIPacket>(Table.AI);

		// Fetch entitlements for the server upgrade SKU.
		const entitlements = await client.application.entitlements.fetch({
			excludeEnded: true,
			limit: 100,
			skus: [SERVER_UPGRADE_SKU_ID],
		});

		// Filter the packets to only include guilds with the SKU.
		const filteredPackets = packets.filter((packet) =>
			entitlements.some((entitlement) => entitlement.guildId === packet.guild_id),
		);

		// Populate the cache.
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

	public static async set(interaction: StringSelectMenuInteraction<"cached">) {
		const frequencyType = Number(interaction.values[0]);

		if (!isAIFrequency(frequencyType)) {
			await interaction.update({
				components: [],
				content: "Unknown frequency. Please try again.",
				embeds: [],
			});

			return;
		}

		const ai = await this.upsert(interaction.guildId, { frequency_type: frequencyType });

		// @ts-expect-error discord.js update required.
		await interaction.update({
			...(await this.response(interaction, ai)),
			content: `Frequency set to \`${AIFrequencyTypeToString[frequencyType]}\`.`,
		});
	}

	public static async response(
		interaction: ChatInputCommandInteraction<"cached"> | StringSelectMenuInteraction<"cached">,
		ai?: AI,
	) {
		const entitlement = interaction.entitlements.find(
			(entitlement) => entitlement.skuId === SERVER_UPGRADE_SKU_ID && entitlement.isActive(),
		);

		return entitlement?.isActive()
			? {
					components: [
						new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
							new StringSelectMenuBuilder()
								.setCustomId(AI_FREQUENCY_SELECT_MENU_CUSTOM_ID)
								.setMaxValues(1)
								.setMinValues(1)
								.setOptions(
									AI_FREQUENCY_VALUES.map((aIFrequencyValue) =>
										new StringSelectMenuOptionBuilder()
											.setDefault(aIFrequencyValue === ai?.frequencyType)
											.setLabel(AIFrequencyTypeToString[aIFrequencyValue])
											.setValue(String(aIFrequencyValue)),
									),
								)
								.setPlaceholder("Set the frequency."),
						),
					],
					embeds: [
						new EmbedBuilder()
							.setColor(DEFAULT_EMBED_COLOUR)
							.setDescription(AI_FREQUENCY_DESCRIPTION)
							.setTitle(interaction.guild.name),
					],
				}
			: {
					components: [
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.Button,
									sku_id: SERVER_UPGRADE_SKU_ID,
									style: 6,
								},
							],
						},
					],
					embeds: [
						new EmbedBuilder()
							.setColor(DEFAULT_EMBED_COLOUR)
							.setDescription(AI_FREQUENCY_DESCRIPTION_WITHOUT_MONETISATION)
							.setTitle(interaction.guild.name),
					],
				};
	}

	public async respond(message: Message<true>, me: GuildMember) {
		const entitlement = await resolveEntitlement(
			message.client.application.entitlements,
			message.guildId,
		);

		if (!entitlement) {
			pino.error(message, "Cannot find the Server Upgrade entitlement.");
			throw new Error("Cannot find the Server Upgrade entitlement.");
		}

		if (entitlement.isActive()) {
			await (Math.random() < 0.1
				? Math.random() < 0.5 && me.permissions.has(PermissionFlagsBits.AddReactions)
					? messageCreateReactionResponse(message)
					: messageCreateEmojiResponse(message)
				: message.system
					? undefined
					: messageCreateResponse(message));
		} else {
			// The entitlement is not active. Delete it, if it is still around.
			await AI.delete(message.guildId);
		}
	}

	public static async delete(guildId: Snowflake) {
		await pg<AIPacket>(Table.AI).delete().where({ guild_id: guildId });
		this.cache.delete(guildId);
	}
}
