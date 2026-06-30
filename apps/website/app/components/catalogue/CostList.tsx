import { type CostEntry, type Emoji, SeasonId } from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalHeartEmoji,
} from "~/utility/emojis.js";

export function costEntryEmoji(entry: CostEntry): Emoji | null {
	switch (entry.type) {
		case "money":
			return null;
		case "candles":
			return MISCELLANEOUS_EMOJIS.Candle;
		case "hearts":
			return MISCELLANEOUS_EMOJIS.Heart;
		case "ascendedCandles":
			return MISCELLANEOUS_EMOJIS.AscendedCandle;
		case "seasonalCandles":
			return SeasonIdToSeasonalCandleEmoji[entry.seasonId] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle;
		case "seasonalHearts":
			return entry.seasonId === SeasonId.Gratitude || entry.seasonId === SeasonId.Lightseekers
				? MISCELLANEOUS_EMOJIS.SeasonalHeart
				: (SeasonIdToSeasonalHeartEmoji[entry.seasonId] ?? MISCELLANEOUS_EMOJIS.SeasonalHeart);
		case "eventTickets":
			return EventIdToEventTicketEmoji[entry.eventId] ?? MISCELLANEOUS_EMOJIS.EventTicket;
	}
}

function costEntryKey(entry: CostEntry) {
	return `${entry.type}-${"seasonId" in entry ? entry.seasonId : "eventId" in entry ? entry.eventId : 0}`;
}

export function CostList({ costs, locale }: { costs: readonly CostEntry[]; locale: string }) {
	if (costs.length === 0) {
		return null;
	}

	return (
		<span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
			{costs.map((entry) => {
				if (entry.type === "money") {
					return (
						<span key={costEntryKey(entry)}>
							${entry.amount.toLocaleString(locale, { minimumFractionDigits: 2 })}
						</span>
					);
				}

				const emoji = costEntryEmoji(entry);

				return (
					<span className="inline-flex items-center gap-1" key={costEntryKey(entry)}>
						{emoji ? <EmojiIcon emoji={emoji} /> : null}
						{entry.amount.toLocaleString(locale)}
					</span>
				);
			})}
		</span>
	);
}
