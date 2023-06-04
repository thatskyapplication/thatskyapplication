/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.TroupeJuggler,
	season: Season.Rhythm,
	expression: Expression.Juggle,
	realm: Realm.ValleyOfTriumph,
	offer: { candles: 205, hearts: 27, ascendedCandles: 2 },
	itemsData: [
		[1 << 0, "Expression1", `${Expression.Juggle} 1`],
		[1 << 1, "Expression2", `${Expression.Juggle} 2`],
		[1 << 2, "Prop", `Prop`],
		[1 << 3, "Blessing1", "Blessing 1"],
		[1 << 4, "Hair", "Hair"],
		[1 << 5, "Heart", "Heart"],
		[1 << 6, "WingBuff", "Wing buff"],
		[1 << 7, "Expression3", `${Expression.Juggle} 3`],
		[1 << 8, "Expression4", `${Expression.Juggle} 4`],
		[1 << 9, "Blessing2", "Blessing 2"],
		[1 << 10, "Cape", "Cape"],
		[1 << 11, "Outfit", "Outfit"],
	],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(44, skyDate(2_021, 9, 16)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
