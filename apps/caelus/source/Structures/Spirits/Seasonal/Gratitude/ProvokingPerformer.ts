/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Expression } from "../../Base.js";

const expression = Expression.Karate;

export default new SeasonalSpirit({
	name: SpiritName.ProvokingPerformer,
	season: Season.Gratitude,
	expression: Expression.Karate,
	realm: Realm.HiddenForest,
	hasMarketingVideo: true,
	offer: { candles: 104, hearts: 13, ascendedCandles: 2 },
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
		[1 << 9]: "Mask",
		[1 << 10]: "Hair",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(4, skyDate(2_020, 3, 12))
			.set(19, skyDate(2_020, 10, 1))
			.set(84, skyDate(2_023, 3, 30))
			.set("Error", skyDate(2_023, 4, 13)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
