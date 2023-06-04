/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Expression } from "../../Base.js";

const expression = Expression.Carry;

export default new SeasonalSpirit({
	name: SpiritName.PiggybackLightseeker,
	season: Season.Lightseekers,
	expression,
	realm: Realm.IslesOfDawn,
	hasMarketingVideo: true,
	offer: { candles: 123, hearts: 8, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${expression} 1`,
		[1 << 1]: "Blessing 1",
		[1 << 2]: "Mask",
		[1 << 3]: "Heart",
		[1 << 4]: "Wing buff",
		[1 << 5]: "Blessing 2",
		[1 << 6]: `${expression} 2`,
		[1 << 7]: "Hair",
		[1 << 8]: "Cape",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(7, skyDate(2_020, 4, 16))
			.set(30, skyDate(2_021, 3, 4))
			.set(80, skyDate(2_023, 2, 2)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
