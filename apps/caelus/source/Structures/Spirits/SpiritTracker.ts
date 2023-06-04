import {
	type ChatInputCommandInteraction,
	type StringSelectMenuInteraction,
	type Snowflake,
	ActionRowBuilder,
	ButtonInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";
import pg, { Table } from "../../pg.js";
import { SeasonFlagsToString, resolveSeasonsToEmoji } from "../Seasons.js";
import type { BaseSpirit, SpiritName } from "./Base.js";
import Rhythm from "./Rhythm/index.js";

interface SpiritTrackerPacket {
	user_id: Snowflake;
}

interface SpiritTrackerData {
	userId: SpiritTrackerPacket["user_id"];
}

export const SPIRIT_TRACKER_VIEW_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_CUSTOM_ID" as const;

export class SpiritTracker {
	public userId: SpiritTrackerData["userId"];

	public constructor(profile: SpiritTrackerPacket) {
		this.userId = profile.user_id;
	}

	public static async fetch(userId: Snowflake) {
		const [spiritTrackerPacket] = await pg<SpiritTrackerPacket>(Table.SpiritTracker).where("user_id", userId);
		if (!spiritTrackerPacket) throw new Error("No spirit tracker data found.");
		return spiritTrackerPacket;
	}

	public static async set(interaction: StringSelectMenuInteraction) {
		const { customId, values } = interaction;
		const spiritName = customId.slice(customId.indexOf("-") + 1) as SpiritName;
		const bit = values.reduce((bit, value) => bit | Number(value), 0);

		await pg<SpiritTrackerPacket>(Table.SpiritTracker)
			.update({
				[SpiritTracker.transformNameToSnakeCase(customId.slice(customId.indexOf("-") + 1) as SpiritName)]:
					interaction.values.reduce((bit, value) => bit | Number(value), 0),
			})
			.where("user_id", interaction.user.id)
			.returning("*");

		await interaction.update(
			await SpiritTracker.responseData(interaction, bit, Rhythm.find(({ name }) => name === spiritName)!),
		);
	}

	public static async viewTracker(interaction: ButtonInteraction | ChatInputCommandInteraction) {
		const response = {
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							Object.entries(SeasonFlagsToString).map(([flag, season]) =>
								new StringSelectMenuOptionBuilder()
									.setEmoji(resolveSeasonsToEmoji(season))
									.setLabel(season)
									.setValue(flag),
							),
						)
						.setPlaceholder("Select a season!"),
				),
			],
			ephemeral: true,
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public static async viewSeason(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		// Ensure they have data.
		if (!(await this.fetch(interaction.user.id).catch(() => null))) {
			await pg<SpiritTrackerPacket>(Table.SpiritTracker).insert({ user_id: interaction.user.id }, "*");
		}

		const response = {
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(Rhythm.map(({ name }) => new StringSelectMenuOptionBuilder().setLabel(name).setValue(name)))
						.setPlaceholder("Select a spirit!"),
				),

				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		};

		await interaction.update(response);
	}

	public static async viewSpirit(interaction: StringSelectMenuInteraction) {
		const spiritTracker = await this.fetch(interaction.user.id);
		const [value] = interaction.values;
		const spirit = Rhythm.find(({ name }) => name === value);

		if (!spirit) {
			await interaction.update({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				components: [],
			});

			return;
		}

		// @ts-expect-error This is correctly transformed.
		const bit = spiritTracker[this.transformNameToSnakeCase(spirit.name)] as number | null;
		await interaction.update(await this.responseData(interaction, bit, spirit));
	}

	private static async responseData(interaction: StringSelectMenuInteraction, bit: number | null, spirit: BaseSpirit) {
		return {
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID}-${spirit.name}`)
						.setMaxValues(Object.values(spirit.flagsToItems).length)
						.setMinValues(0)
						.setOptions(
							Object.entries(spirit.flagsToItems).map(([flag, item]) =>
								new StringSelectMenuOptionBuilder()
									.setDefault(Boolean(bit && bit & Number(flag)))
									.setLabel(item)
									.setValue(flag),
							),
						)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SPIRIT_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				new EmbedBuilder()
					.setColor((await interaction.guild?.members.fetchMe())?.displayColor ?? 0)
					.setFields(
						{
							name: "Obtained",
							value: bit
								? spirit.maxItemBit === bit
									? "Everything!"
									: spirit.resolveBitsToOffer(bit).join("\n")
								: "Nothing!",
							inline: true,
						},
						{
							name: "Missing",
							value: bit ? spirit.resolveBitsToOffer(~bit & spirit.maxItemBit).join("\n") || "Nothing!" : "Everything!",
							inline: true,
						},
					)
					.setImage(spirit.imageURL)
					.setTitle(spirit.name)
					.setURL(spirit.wikiURL),
			],
		};
	}

	private static transformNameToSnakeCase(name: SpiritName) {
		return name.toLowerCase().replaceAll(" ", "_");
	}
}
