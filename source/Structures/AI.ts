import {
	type Guild,
	type Snowflake,
	type StringSelectMenuInteraction,
	ActionRowBuilder,
	Collection,
	EmbedBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR } from "../Utility/Constants.js";
import pg, { Table } from "../pg.js";

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

export const AIFrequencyType = {
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

export const AIFrequencyTypeToValue = {
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

export const AI_FREQUENCY_DESCRIPTION = `I may sporadically respond to a message and spice up your day!

The frequency at which I will respond may be configured. The higher the frequency, the more likely I will respond.

You can disable the frequency to turn this feature off and I will no longer sporadically reply.` as const;

export default class AI {
	public static readonly cache = new Collection<Snowflake, AI>();

	public readonly guildId: AIData["guildId"];

	public frequencyType!: AIData["frequencyType"];

	public frequency!: AIFrequencyValues;

	public constructor(notification: AIPacket) {
		this.guildId = notification.guild_id;
		this.patch(notification);
	}

	private patch(data: AIPatchData) {
		this.frequencyType = isAIFrequency(data.frequency_type) ? data.frequency_type : AIFrequencyType.Disabled;
		this.frequency = AIFrequencyTypeToValue[this.frequencyType];
	}

	private static async upsert(guildId: AI["guildId"], data: AISetData) {
		let ai = this.cache.find((cachedAI) => cachedAI.guildId === guildId);

		if (ai) {
			const [aiPacket] = await pg<AIPacket>(Table.AI).update(data).where({ guild_id: guildId }).returning("*");
			ai.patch(aiPacket!);
		} else {
			const [aiPacket] = await pg<AIPacket>(Table.AI).insert({ ...data, guild_id: guildId }, "*");
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

		await interaction.update({
			...this.response(interaction.guild, ai),
			content: `Frequency set to \`${AIFrequencyTypeToString[frequencyType]}\`.`,
		});
	}

	public static response({ name }: Guild, ai?: AI) {
		return {
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(AI_FREQUENCY_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(1)
						.setOptions(
							AI_FREQUENCY_VALUES.map((aIFrequencyValue) => {
								return new StringSelectMenuOptionBuilder()
									.setDefault(aIFrequencyValue === ai?.frequencyType)
									.setLabel(AIFrequencyTypeToString[aIFrequencyValue])
									.setValue(String(aIFrequencyValue));
							}),
						)
						.setPlaceholder("Set the frequency."),
				),
			],
			embeds: [
				new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setDescription(AI_FREQUENCY_DESCRIPTION).setTitle(name),
			],
			ephemeral: true,
		};
	}

	public static async delete(guildId: Snowflake) {
		await pg<AIPacket>(Table.AI).delete().where({ guild_id: guildId });
		this.cache.delete(guildId);
	}
}
