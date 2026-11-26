import type { TFunction } from "i18next";
import {
	type fetchDailyGuides,
	SHARD_ERUPTION_START_DATE,
	shardEruption,
	TIME_ZONE,
	treasureCandles,
} from "@thatskyapplication/utility";
import type { DailyGuidesCardData } from "~/components/daily-guides/DailyGuidesCard.js";
import type { NestingWorkshopProp } from "~/components/NestingWorkshopProps.js";
import { shardEruptionTimestampLabels, type TimePreferences } from "~/utility/time.js";

interface DailyGuidesCardDataOptions extends TimePreferences {
	dailyGuides: Awaited<ReturnType<typeof fetchDailyGuides>>;
	date: Temporal.PlainDate;
	nestingWorkshop: readonly NestingWorkshopProp[];
	t: TFunction;
	timeZoneEstimated: boolean;
	today: Temporal.PlainDate;
}

export function dailyGuidesCardData({
	dailyGuides,
	date,
	hour12,
	locale,
	nestingWorkshop,
	t,
	timeZone,
	timeZoneEstimated,
	today,
}: DailyGuidesCardDataOptions): DailyGuidesCardData {
	const dayStart = date.toZonedDateTime(TIME_ZONE);
	const shardEruptionExists =
		Temporal.ZonedDateTime.compare(dayStart, SHARD_ERUPTION_START_DATE) >= 0;
	const shard = shardEruptionExists ? shardEruption(dayStart) : null;
	const treasureCandleNotes: string[] = [];
	const treasureCandleLinks = treasureCandles(dayStart).map(
		({ url, availableFrom, unavailableAt }, index, candles) => {
			let footnote = null;

			if (availableFrom || unavailableAt) {
				const previous = candles[index - 1];

				if (
					availableFrom?.epochNanoseconds !== previous?.availableFrom?.epochNanoseconds ||
					unavailableAt?.epochNanoseconds !== previous?.unavailableAt?.epochNanoseconds
				) {
					treasureCandleNotes.push(
						t(
							unavailableAt
								? "daily-guides.treasure-candles-previous-day"
								: "daily-guides.treasure-candles-available-from",
							{ ns: "features" },
						),
					);
				}

				footnote = treasureCandleNotes.length;
			}

			return { url, footnote };
		},
	);

	return {
		dailyGuides,
		date: date.toString(),
		dateString: new Intl.DateTimeFormat(locale, {
			timeZone: TIME_ZONE,
			dateStyle: "full",
		}).format(dayStart.epochMilliseconds),
		hour12,
		isToday: date.equals(today),
		locale,
		nestingWorkshop,
		shard: shard
			? {
					...shard,
					timestamps: shardEruptionTimestampLabels(shard.timestamps, { locale, timeZone, hour12 }),
				}
			: null,
		shardEruptionExists,
		timeZone,
		timeZoneEstimated,
		treasureCandleLinks,
		treasureCandleNotes,
	};
}
