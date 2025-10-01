import type { Locale } from "@discordjs/core";
import {
	formatEmoji,
	resolveCurrencyEmoji,
	type ShardEruptionData,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { MISCELLANEOUS_EMOJIS } from "./emojis.js";

export const MAXIMUM_OPTION_NUMBER = 25 as const;

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, skyMap, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
	locale: Locale,
) {
	let realmMap = t("shard-eruption.realm-map", { lng: locale, ns: "features", realm, map: skyMap });

	if (useHyperlink) {
		realmMap = `[${realmMap}](${url})`;
	}

	return `${formatEmoji(resolveShardEruptionEmoji(strong))} ${realmMap}\n${
		reward === 200
			? `200 ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}`
			: resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.AscendedCandle, number: reward })
	}`;
}

interface ShardEruptionTimestampsStringOptions {
	now?: DateTime;
	timestamps: ShardEruptionData["timestamps"];
	locale: Locale;
}

export function shardEruptionTimestampsString({
	now,
	timestamps,
	locale,
}: ShardEruptionTimestampsStringOptions) {
	return timestamps
		.map(({ start, end }) => {
			let string = t("time-range", {
				lng: locale,
				ns: "general",
				start: `<t:${start.toUnixInteger()}:T>`,
				end: `<t:${end.toUnixInteger()}:T>`,
			});

			if (now && now >= end) {
				string = `~~${string}~~`;
			}

			return string;
		})
		.join("\n");
}
