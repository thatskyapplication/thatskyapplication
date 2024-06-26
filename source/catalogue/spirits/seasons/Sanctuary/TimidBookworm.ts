import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
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
		seasonal: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 8 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 1, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 3, cost: { seasonalCandles: 10 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 6, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 7, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 4,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Music sheet", bit: 1 << 1, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 7, cost: { candles: 70 }, emoji: capeEmoji },
		],
	},
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(37, skyDate(2_021, 6, 10))
			.set(65, skyDate(2_022, 7, 7))
			.set(113, skyDate(2_024, 5, 9)),
	},
});
