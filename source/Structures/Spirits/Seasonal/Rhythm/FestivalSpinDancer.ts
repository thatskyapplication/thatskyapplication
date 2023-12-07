/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { skyDate } from "../../../../Utility/dates.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.SpinDance;

export default new SeasonalSpirit({
	name: SpiritName.FestivalSpinDancer,
	season: SeasonName.Rhythm,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 2, { item: "Blessing", cost: { seasonalCandles: 10 } })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 12 } })
			.set(1 << 7, { item: `${emote} 4`, cost: null })
			.set(1 << 9, { item: "Hair", cost: { seasonalCandles: 14 } })
			.set(1 << 11, { item: "Outfit", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 5 } })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 10 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Hair", cost: { candles: 34 } })
			.set(1 << 10, { item: "Prop", cost: { candles: 30 } })
			.set(1 << 11, { item: "Outfit", cost: { candles: 65 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(17, skyDate(2_020, 9, 3))
			.set(46, skyDate(2_021, 10, 14))
			.set(103, skyDate(2_023, 12, 21)),
	},
});
