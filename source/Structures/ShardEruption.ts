import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	type Locale,
} from "discord.js";
import { t } from "i18next";
import { DEFAULT_EMBED_COLOUR } from "../utility/Constants.js";
import { dateString, skyToday } from "../utility/dates.js";
import {
	resolveShardEruptionEmoji,
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

export const SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS = [
	"SHARD_ERUPTION_BROWSE_1_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_2_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_3_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_4_SELECT_MENU_CUSTOM_ID",
] as const;

export function todayEmbed(locale: Locale, offset = 0) {
	const shardYesterday = shardEruption(offset - 1);
	const shardToday = shardEruption(offset);
	const shard = shardEruption();
	const shardTomorrow = shardEruption(offset + 1);

	const embed = new EmbedBuilder()
		.setColor(DEFAULT_EMBED_COLOUR)
		.setTitle(dateString(skyToday().plus({ days: offset }), locale));

	const buttonYesterday = new ButtonBuilder()
		.setCustomId(`${SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID}§${offset - 1}`)
		.setLabel(t("back", { lng: locale, ns: "general" }))
		.setStyle(ButtonStyle.Primary);

	const button = new ButtonBuilder()
		.setCustomId(SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID)
		.setDisabled(offset === 0)
		.setLabel("Today")
		.setStyle(ButtonStyle.Success);

	const buttonTomorrow = new ButtonBuilder()
		.setCustomId(`${SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID}§${offset + 1}`)
		.setLabel(t("next", { lng: locale, ns: "general" }))
		.setStyle(ButtonStyle.Primary);

	if (shardYesterday) {
		buttonYesterday.setEmoji(resolveShardEruptionEmoji(shardYesterday.strong));
	}

	if (shardToday) {
		embed
			.setFields(
				{
					name: "Information",
					value: shardEruptionInformationString(shardToday, false, locale),
					inline: true,
				},
				{
					name: "Timestamps",
					value: shardEruptionTimestampsString(shardToday),
					inline: true,
				},
			)
			.setImage(String(shardToday.url));
	} else {
		embed.setDescription(`There are no shard eruptions ${offset === 0 ? "today" : "on this day"}.`);
	}

	if (shard) {
		button.setEmoji(resolveShardEruptionEmoji(shard.strong));
	}

	if (shardTomorrow) {
		buttonTomorrow.setEmoji(resolveShardEruptionEmoji(shardTomorrow.strong));
	}

	return {
		components: [
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				buttonYesterday,
				button,
				buttonTomorrow,
				new ButtonBuilder()
					.setCustomId(`${SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID}§${offset}`)
					.setEmoji("🌐")
					.setLabel("Browse")
					.setStyle(ButtonStyle.Secondary),
			),
		],
		embeds: [embed],
	};
}
