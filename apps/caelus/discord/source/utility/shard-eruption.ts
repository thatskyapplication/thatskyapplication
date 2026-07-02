import type { Locale } from "@discordjs/core";
import {
	epochSeconds,
	formatEmoji,
	resolveCurrencyEmoji,
	type ShardEruptionData,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { MISCELLANEOUS_EMOJIS } from "./emojis.js";

export const MAXIMUM_OPTION_NUMBER = 25 as const;

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, area, strong, reward, url }: ShardEruptionData,
	useHyperlink: boolean,
	locale: Locale,
) {
	let realmMap = t("shard-eruption.realm-area", { lng: locale, ns: "features", realm, area });

	if (useHyperlink) {
		realmMap = `[${realmMap}](${url})`;
	}

	return `${formatEmoji(resolveShardEruptionEmoji(strong))} ${realmMap}\n${
		reward === 200
			? `200 ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}`
			: resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
					amount: reward.toLocaleString(locale),
				})
	}`;
}

interface ShardEruptionTimestampsStringOptions {
	now?: Temporal.ZonedDateTime;
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
				start: `<t:${epochSeconds(start)}:T>`,
				end: `<t:${epochSeconds(end)}:T>`,
			});

			if (now && Temporal.ZonedDateTime.compare(now, end) >= 0) {
				string = `~~${string}~~`;
			}

			return string;
		})
		.join("\n");
}
