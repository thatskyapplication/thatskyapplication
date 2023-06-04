/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Dance;

export default new SeasonalSpirit({
	name: SpiritName.FestivalSpinDancer,
	season: Season.Rhythm,
	expression,
	realm: Realm.DaylightPrairie,
	offer: { candles: 157, hearts: 19, ascendedCandles: 2 },
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
		[1 << 9]: "Hair",
		[1 << 10]: "Prop",
		[1 << 11]: "Outfit",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(17, skyDate(2_020, 9, 3))
			.set(46, skyDate(2_021, 10, 14)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
