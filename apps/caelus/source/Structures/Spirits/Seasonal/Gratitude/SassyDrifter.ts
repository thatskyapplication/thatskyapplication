/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Stance } from "../../Base.js";

export default new SeasonalSpirit({
	name: SpiritName.SassyDrifter,
	season: Season.Gratitude,
	stance: Stance.Sassy,
	realm: Realm.IslesOfDawn,
	hasMarketingVideo: true,
	offer: { candles: 87, hearts: 0, ascendedCandles: 2 },
	items: {
		[1 << 0]: "Sassy stance",
		[1 << 1]: "Blessing 1",
		[1 << 2]: "Hair",
		[1 << 3]: "Heart",
		[1 << 4]: "Wing buff",
		[1 << 5]: "Blessing 2",
		[1 << 6]: "Weasel mask",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(1, skyDate(2_020, 1, 31))
			.set(10, skyDate(2_020, 5, 28))
			.set(39, skyDate(2_021, 7, 8))
			.set(76, skyDate(2_022, 12, 8)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
	keywords: ["weasel", "weasel mask"],
});
