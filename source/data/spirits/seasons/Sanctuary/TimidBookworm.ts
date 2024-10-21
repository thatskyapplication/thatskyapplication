import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Timid;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const hairEmoji = HAIR_EMOJIS.Hair61;
const capeEmoji = CAPE_EMOJIS.Cape30;

export default new SeasonalSpirit({
	name: SpiritName.TimidBookworm,
	seasonId: SeasonId.Sanctuary,
	stance,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTimid, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TimidBookwormBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.TimidBookwormMusicSheet, emoji: musicSheet },
			{
				name: "Hair",
				cosmetic: Cosmetic.TimidBookwormHair,
				cost: { seasonalCandles: 10 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.TimidBookwormBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TimidBookwormBlessing3,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.TimidBookwormCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTimid, emoji: stanceEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TimidBookwormMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TimidBookwormBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TimidBookwormHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TimidBookwormWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TimidBookwormBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.TimidBookwormCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
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
