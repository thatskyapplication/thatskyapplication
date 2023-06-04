/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Expression } from "../../Base.js";

const expression = Expression.Dismiss;

export default new SeasonalSpirit({
	name: SpiritName.SalutingProtector,
	season: Season.Gratitude,
	expression,
	realm: Realm.GoldenWasteland,
	offer: { candles: 145, hearts: 13, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${expression} 1`,
		[1 << 1]: `${expression} 2`,
		[1 << 2]: "Blessing 1",
		[1 << 3]: "Music sheet",
		[1 << 4]: "Heart",
		[1 << 5]: "Wing buff",
		[1 << 6]: `${expression} 3`,
		[1 << 7]: `${expression} 4`,
		[1 << 8]: "Blessing 2",
		[1 << 9]: "Cape",
		[1 << 10]: "Mask",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set("Error", skyDate(2_020, 5, 28))
			.set(53, skyDate(2_022, 1, 20)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
