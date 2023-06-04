/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Call } from "../../Base.js";

const call = Call.Crab;

export default new SeasonalSpirit({
	name: SpiritName.CrabWhisperer,
	season: Season.Lightseekers,
	call,
	realm: Realm.GoldenWasteland,
	offer: { candles: 190, hearts: 0, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${call} call`,
		[1 << 1]: "Pipe",
		[1 << 2]: "Blessing 1",
		[1 << 3]: "Mask",
		[1 << 4]: "Heart",
		[1 << 5]: "Wing buff",
		[1 << 6]: "Blessing 2",
		[1 << 7]: "Music sheet",
		[1 << 8]: "Hair",
		[1 << 9]: "Cape",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(6, skyDate(2_020, 4, 9))
			.set(43, skyDate(2_021, 9, 1)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
