/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.TroupeGreeter,
	season: Season.Rhythm,
	expression: Expression.Welcome,
	realm: Realm.IslesOfDawn,
	offer: { candles: 146, hearts: 13, ascendedCandles: 12 },
	itemsData: [
		[1 << 0, "Expression1", `${Expression.Welcome} 1`],
		[1 << 1, "Expression2", `${Expression.Welcome} 2`],
		[1 << 2, "Blessing1", "Blessing 1"],
		[1 << 3, "MusicSheet", "Music sheet"],
		[1 << 4, "Heart", "Heart"],
		[1 << 5, "WingBuff", "Wing buff"],
		[1 << 6, "Expression3", `${Expression.Welcome} 3`],
		[1 << 7, "Expression4", `${Expression.Welcome} 4`],
		[1 << 8, "Blessing2", "Blessing 2"],
		[1 << 9, "Outfit", "Outfit"],
		[1 << 10, "Mask", "Mask"],
	],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(25, skyDate(2_020, 12, 24))
			.set(56, skyDate(2_022, 3, 3)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
