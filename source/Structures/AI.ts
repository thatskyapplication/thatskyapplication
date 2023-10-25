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
	frequency: number;
}

interface AIData {
	guildId: AIPacket["guild_id"];
	frequency: AIFrequency;
}

type AIFrequency = (typeof AI_FREQUENCY)[number];
type AISetData = Omit<AIPacket, "guild_id">;
type AIPatchData = Omit<AIPacket, "guild_id">;

export const AI_FREQUENCY_DEFAULT = 5 as const;
export const AI_FREQUENCY_SELECT_MENU_CUSTOM_ID = "AI_FREQUENCY_SELECT_MENU_CUSTOM_ID" as const;
export const AI_FREQUENCY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const AI_FREQUENCY_DESCRIPTION = `I may sporadically respond to a message and spice up your day!

The frequency at which I will respond may be configured. The default is \`${AI_FREQUENCY_DEFAULT}\`. The higher the frequency, the more likely I will respond.

You can set the frequency to \`0\` to turn off this feature and I will no longer sporadically reply.` as const;

function isAIFrequency(number: number): number is AIFrequency {
	return AI_FREQUENCY.includes(number as AIFrequency);
}

export default class AI {
	public static readonly cache = new Collection<Snowflake, AI>();

	public readonly guildId: AIData["guildId"];

	public frequency!: AIData["frequency"];

	public constructor(notification: AIPacket) {
		this.guildId = notification.guild_id;
		this.patch(notification);
	}

	private patch(data: AIPatchData) {
		this.frequency = data.frequency as AIFrequency;
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
		const frequency = Number(interaction.values[0]);

		if (!isAIFrequency(frequency)) {
			await interaction.update({
				components: [],
				content: "Unknown frequency. Please try again.",
				embeds: [],
			});

			return;
		}

		const ai = await this.upsert(interaction.guildId, { frequency });

		await interaction.update({
			...this.response(interaction.guild, ai),
			content: `Frequency set to \`${frequency}\`.`,
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
							AI_FREQUENCY.map((number) => {
								const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
									.setDefault(number === (ai?.frequency ?? AI_FREQUENCY_DEFAULT))
									.setLabel(String(number))
									.setValue(String(number));

								if (number === 0) {
									stringSelectMenuOption.setDescription("Turn this feature off.");
								} else if (number === AI_FREQUENCY_DEFAULT) {
									stringSelectMenuOption.setDescription("Default.");
								}

								return stringSelectMenuOption;
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
}
