/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SEASON_EMOJIS, MISCELLANEOUS_EMOJIS, STANCES_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	SeasonalSpirit,
	SpiritName,
	Stance,
} from "../../Base.js";

const stance = Stance.Tinker;
const stanceEmoji = STANCES_EMOJIS.Tinker;
const outfitEmoji = OUTFIT_EMOJIS.Outfit26;

export default new SeasonalSpirit({
	name: SpiritName.TinkeringChimesmith,
	season: SeasonName.Flight,
	stance,
	realm: Realm.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 16 } })
			.set(1 << 7, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 6, { item: "Hair accessory", cost: { seasonalCandles: 22 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 9, { item: "Trail spell 1", cost: { seasonalCandles: 26 } })
			.set(1 << 8, { item: "Kalimba", cost: null })
			.set(1 << 2, { item: "Hair", cost: { seasonalCandles: 28 } })
			.set(1 << 10, { item: "Trail spell 2", cost: null })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Hair", cost: { candles: 45 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Hair accessory", cost: { candles: 35 } })
			.set(1 << 7, { item: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji })
			.set(1 << 8, { item: "Kalimba", cost: { candles: 75 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(87, skyDate(2_023, 5, 11)),
	},
});
