/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Expression } from "../../Base.js";

const expression = Expression.TripleAxel;

export default new SeasonalSpirit({
	name: SpiritName.TwirlingChampion,
	season: Season.Lightseekers,
	expression,
	realm: Realm.ValleyOfTriumph,
	offer: { candles: 131, hearts: 13, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${expression} 1`,
		[1 << 1]: `${expression} 2`,
		[1 << 2]: "Blessing 1",
		[1 << 3]: "Mask",
		[1 << 4]: "Heart",
		[1 << 5]: "Wing buff",
		[1 << 6]: `${expression} 3`,
		[1 << 7]: `${expression} 4`,
		[1 << 8]: "Blessing 2",
		[1 << 9]: "Panflute",
		[1 << 10]: "Hair",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(18, skyDate(2_020, 9, 17))
			.set(52, skyDate(2_022, 1, 6)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
