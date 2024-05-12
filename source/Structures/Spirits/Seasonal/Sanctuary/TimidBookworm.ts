/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	STANCE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

const stance = SpiritStance.Timid;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const stanceEmoji = STANCE_EMOJIS.Timid;
const hairEmoji = HAIR_EMOJIS.Hair61;
const capeEmoji = CAPE_EMOJIS.Cape30;

export default new SeasonalSpirit({
	name: SpiritName.TimidBookworm,
	season: SeasonName.Sanctuary,
	stance,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 1, { item: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 10 }, emoji: hairEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 7, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(37, skyDate(2_021, 6, 10))
			.set(65, skyDate(2_022, 7, 7))
			.set(113, skyDate(2_024, 5, 9)),
	},
});
