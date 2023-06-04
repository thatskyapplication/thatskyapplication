/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.FestivalSpinDancer,
	season: Season.Rhythm,
	expression: Expression.Dance,
	realm: Realm.DaylightPrairie,
	offer: { candles: 157, hearts: 19, ascendedCandles: 2 },
	itemsData: [
		[1 << 0, "Expression1", `${Expression.Dance} 1`],
		[1 << 1, "Expression2", `${Expression.Dance} 2`],
		[1 << 2, "Blessing1", "Blessing 1"],
		[1 << 3, "MusicSheet", "Music sheet"],
		[1 << 4, "Heart", "Heart"],
		[1 << 5, "WingBuff", "Wing buff"],
		[1 << 6, "Expression3", `${Expression.Dance} 3`],
		[1 << 7, "Expression4", `${Expression.Dance} 4`],
		[1 << 8, "Blessing2", "Blessing 2"],
		[1 << 9, "Hair", "Hair"],
		[1 << 10, "Outfit", "Outfit"],
		[1 << 11, "Prop", "Prop"],
	],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(17, skyDate(2_020, 9, 3))
			.set(46, skyDate(2_021, 10, 14)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
