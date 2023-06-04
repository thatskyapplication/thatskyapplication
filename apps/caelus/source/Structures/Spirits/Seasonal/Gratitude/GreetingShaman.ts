/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Expression } from "../../Base.js";

const expression = Expression.Greeting;

export default new SeasonalSpirit({
	name: SpiritName.GreetingShaman,
	season: Season.Gratitude,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: { candles: 112, hearts: 13, ascendedCandles: 2 },
	items: {
		[1 << 0]: `${expression} 1`,
		[1 << 1]: `${expression} 2`,
		[1 << 2]: "Blessing 1",
		[1 << 3]: "Large bell",
		[1 << 4]: "Heart",
		[1 << 5]: "Wing buff",
		[1 << 6]: `${expression} 3`,
		[1 << 7]: `${expression} 4`,
		[1 << 8]: "Blessing 2",
		[1 << 9]: "Mask",
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(14, skyDate(2_020, 7, 23))
			.set(62, skyDate(2_022, 5, 26)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
