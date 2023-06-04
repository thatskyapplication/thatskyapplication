/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../Base.js";

const expression = Expression.Respect;

export default new SeasonalSpirit({
	name: SpiritName.RespectfulPianist,
	season: Season.Rhythm,
	expression,
	realm: Realm.GoldenWasteland,
	offer: { candles: 162, hearts: 13, ascendedCandles: 2 },
	itemsData: [
		[1 << 0, "Expression1", `${expression} 1`],
		[1 << 1, "Expression2", `${expression} 2`],
		[1 << 2, "Blessing1", "Blessing 1"],
		[1 << 3, "Hair", "Hair"],
		[1 << 4, "Heart", "Heart"],
		[1 << 5, "WingBuff", "Wing buff"],
		[1 << 6, "Expression3", `${expression} 3`],
		[1 << 7, "Expression4", `${expression} 4`],
		[1 << 8, "Blessing2", "Blessing 2"],
		[1 << 9, "WinterPiano", "Winter piano"],
		[1 << 10, "DuckMask", "Duck mask"],
	],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(28, skyDate(2_021, 2, 4)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
