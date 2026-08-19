import type { Locale } from "@discordjs/core";
import { t } from "i18next";
import {
	epochSeconds,
	formatEmoji,
	resolveCurrencyEmoji,
	type ShardEruptionData,
} from "@thatskyapplication/utility";
import { MISCELLANEOUS_EMOJIS } from "./emojis.js";

export const MAXIMUM_OPTION_NUMBER = 25 as const;

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}

export function shardEruptionInformationString(
	{ realm, area, strong, reward, infographic }: ShardEruptionData,
	locale: Locale,
) {
	const realmMap = `[${t("shard-eruption.realm-area", {
		lng: locale,
		ns: "features",
		realm,
		area,
	})}](${infographic.url})`;

	return `${formatEmoji(resolveShardEruptionEmoji(strong))} ${realmMap}\n${
		strong
			? resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
					amount: reward.toLocaleString(locale),
				})
			: `${reward.toLocaleString(locale)} ${formatEmoji(MISCELLANEOUS_EMOJIS.Light)}`
	}`;
}

interface ShardEruptionTimestampStringOptions {
	now: Temporal.ZonedDateTime | undefined;
	timestamp: ShardEruptionData["timestamps"][number];
	locale: Locale;
}

export function shardEruptionTimestampString({
	now,
	timestamp: { start, end },
	locale,
}: ShardEruptionTimestampStringOptions) {
	const string = t("time-range", {
		lng: locale,
		ns: "general",
		start: `<t:${epochSeconds(start)}:T>`,
		end: `<t:${epochSeconds(end)}:T>`,
	});

	if (now) {
		if (Temporal.ZonedDateTime.compare(now, end) >= 0) {
			return `~~${string}~~`;
		}

		if (Temporal.ZonedDateTime.compare(now, start) >= 0) {
			return `**${string}**`;
		}
	}

	return string;
}

interface ShardEruptionTimestampsStringOptions {
	now: Temporal.ZonedDateTime | undefined;
	timestamps: ShardEruptionData["timestamps"];
	locale: Locale;
}

export function shardEruptionTimestampsString({
	now,
	timestamps,
	locale,
}: ShardEruptionTimestampsStringOptions) {
	return timestamps
		.map((timestamp) => shardEruptionTimestampString({ now, timestamp, locale }))
		.join("\n");
}
