/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Stance } from "../../Base.js";

const stance = Stance.Laidback;

export default new SeasonalSpirit({
	name: SpiritName.LaidbackPioneer,
	season: Season.Lightseekers,
	stance,
	realm: Realm.HiddenForest,
	offer: { candles: 151, hearts: 0, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${stance} stance`,
		[1 << 1]: "Blessing 1",
		[1 << 2]: "Mask",
		[1 << 3]: "Heart",
		[1 << 4]: "Wing buff",
		[1 << 5]: "Blessing 2",
		[1 << 6]: "Music sheet",
		[1 << 7]: "Hair",
		[1 << 8]: "Umbrella",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(3, skyDate(2_020, 2, 27))
			.set(23, skyDate(2_020, 11, 26))
			.set(72, skyDate(2_022, 10, 13)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
