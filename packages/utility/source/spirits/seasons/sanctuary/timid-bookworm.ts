import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Timid;

export default new SeasonalSpirit({
	id: SpiritId.TimidBookworm,
	seasonId: SeasonId.Sanctuary,
	stance,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.StanceTimid },
			{
				cosmetic: Cosmetic.TimidBookwormBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.TimidBookwormMusicSheet },
			{
				cosmetic: Cosmetic.TimidBookwormHair,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.TimidBookwormBlessing2 },
			{
				cosmetic: Cosmetic.TimidBookwormBlessing3,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.TimidBookwormCape },
			{
				cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.StanceTimid },
			{
				cosmetic: Cosmetic.TimidBookwormMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.TimidBookwormBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TimidBookwormHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.TimidBookwormWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.TimidBookwormBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.TimidBookwormCape,
				cost: { candles: 70 },
			},
		],
	},
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: [
			{ start: skyDate(2021, 6, 10), end: skyDate(2021, 6, 14) },
			{ start: skyDate(2022, 7, 7), end: skyDate(2022, 7, 11) },
			{ start: skyDate(2024, 5, 9), end: skyDate(2024, 5, 13) },
		],
	},
});
