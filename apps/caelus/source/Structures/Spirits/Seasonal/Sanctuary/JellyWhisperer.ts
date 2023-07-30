/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, Call, SeasonalSpirit, SpiritName } from "../../Base.js";

const call = Call.Jellyfish;

export default new SeasonalSpirit({
	name: SpiritName.JellyWhisperer,
	season: Season.Sanctuary,
	call,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null })
			.set(1 << 2, { item: "Music sheet", cost: { seasonalCandles: 6 } })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 5, { item: "Hair", cost: { seasonalCandles: 8 } })
			.set(1 << 6, { item: "Blessing 2", cost: null })
			.set(1 << 9, { item: "Blessing 3", cost: { seasonalCandles: 10 } })
			.set(1 << 8, { item: "Outfit", cost: null })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Hair", cost: { candles: 42 } })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 7, { item: "Umbrella", cost: { hearts: 15 } })
			.set(1 << 8, { item: "Outfit", cost: { candles: 65 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(49, skyDate(2_021, 11, 25)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
