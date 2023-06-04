/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../../Base.js";

const expression = Expression.Juggle;

export default new SeasonalSpirit({
	name: SpiritName.TroupeJuggler,
	season: Season.Rhythm,
	expression,
	realm: Realm.ValleyOfTriumph,
	offer: { candles: 205, hearts: 27, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${expression} 1`,
		[1 << 1]: `${expression} 2`,
		[1 << 2]: `Prop`,
		[1 << 3]: "Blessing 1",
		[1 << 4]: "Hair",
		[1 << 5]: "Heart",
		[1 << 6]: "Wing buff",
		[1 << 7]: `${expression} 3`,
		[1 << 8]: `${expression} 4`,
		[1 << 9]: "Blessing 2",
		[1 << 10]: "Cape",
		[1 << 11]: "Outfit",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(44, skyDate(2_021, 9, 16)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
