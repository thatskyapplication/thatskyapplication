/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../Utility/Constants.js";
import { skyDate } from "../../Utility/Utility.js";
import { Expression, SeasonalSpirit, SpiritName, type SeasonalSpiritVisitCollectionKey } from "./Base.js";

enum RespectfulPianistFlags {
	Expression1 = 1 << 0,
	Expression2 = 1 << 1,
	Blessing1 = 1 << 2,
	Hair = 1 << 3,
	Heart = 1 << 4,
	WingBuff = 1 << 5,
	Expression3 = 1 << 6,
	Expression4 = 1 << 7,
	Blessing2 = 1 << 8,
	WinterPiano = 1 << 9,
	DuckMask = 1 << 10,
}

export default new SeasonalSpirit({
	name: SpiritName.RespectfulPianist,
	season: Season.Rhythm,
	expression: Expression.Respect,
	realm: Realm.GoldenWasteland,
	offer: { candles: 162, hearts: 13, ascendedCandles: 2 },
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(28, skyDate(2_021, 2, 4)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
