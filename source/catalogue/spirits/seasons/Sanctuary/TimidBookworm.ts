import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Timid;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const hairEmoji = HAIR_EMOJIS.Hair61;
const capeEmoji = CAPE_EMOJIS.Cape30;

export default new SeasonalSpirit({
	name: SpiritName.TimidBookworm,
	season: SeasonName.Sanctuary,
	stance,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 1, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 3, { name: "Hair", cost: { seasonalCandles: 10 }, emoji: hairEmoji })
			.set(1 << 6, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 7, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 4, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(37, skyDate(2_021, 6, 10))
			.set(65, skyDate(2_022, 7, 7))
			.set(113, skyDate(2_024, 5, 9)),
	},
});
