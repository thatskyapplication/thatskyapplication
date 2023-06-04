/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Expression } from "../../Base.js";

const expression = Expression.DoubleFive;

export default new SeasonalSpirit({
	name: SpiritName.DoublefiveLightCatcher,
	season: Season.Lightseekers,
	expression: Expression.DoubleFive,
	realm: Realm.DaylightPrairie,
	offer: { candles: 126, hearts: 7, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${expression} 1`,
		[1 << 1]: "Blessing 1",
		[1 << 2]: "Mask",
		[1 << 3]: "Heart",
		[1 << 4]: "Wing buff",
		[1 << 5]: "Blessing 2",
		[1 << 6]: `${expression} 2`,
		[1 << 7]: "Flute",
		[1 << 8]: "Hair",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(2, skyDate(2_020, 2, 14))
			.set(33, skyDate(2_021, 4, 15))
			.set(66, skyDate(2_022, 7, 21)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
