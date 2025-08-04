import type { Locale } from "@discordjs/core";
import {
	formatEmoji,
	resolveCurrencyEmoji,
	type ShardEruptionData,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { MISCELLANEOUS_EMOJIS } from "./emojis.js";

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
	"SHARD_ERUPTION_BROWSE_5_SELECT_MENU_CUSTOM_ID",
] as const;

export const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH =
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.length;

export const MAXIMUM_OPTION_NUMBER = 25 as const;

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, skyMap, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
	locale: Locale,
) {
	let realmMap = `${t(`realms.${realm}`, { lng: locale, ns: "general" })}${t("open-bracket", { lng: locale, ns: "general" })}${t(`maps.${skyMap}`, { lng: locale, ns: "general" })}${t("close-bracket", { lng: locale, ns: "general" })}`;

	if (useHyperlink) {
		realmMap = `[${realmMap}](${url})`;
	}

	return `${formatEmoji(resolveShardEruptionEmoji(strong))} ${realmMap}\n${
		reward === 200
			? `200 ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}`
			: resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.AscendedCandle, number: reward })
	}`;
}

export function shardEruptionTimestampsString({ timestamps }: ShardEruptionData) {
	return timestamps
		.map(({ start, end }) => `<t:${start.toUnixInteger()}:T>–<t:${end.toUnixInteger()}:T>`)
		.join("\n");
}
