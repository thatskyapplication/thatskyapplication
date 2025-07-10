import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Grumpy;

export default new SeasonalSpirit({
	id: SpiritId.HikingGrouch,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteGrumpy1 },
			{ cosmetic: Cosmetic.EmoteGrumpy2 },
			{
				cosmetic: Cosmetic.HikingGrouchBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.HikingGrouchMask },
			{
				cosmetic: Cosmetic.EmoteGrumpy3,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.EmoteGrumpy4 },
			{
				cosmetic: Cosmetic.HikingGrouchHair,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.HikingGrouchBlessing2 },
			{
				cosmetic: Cosmetic.HikingGrouchBlessing3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.HikingGrouchBowTie },
			{
				cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteGrumpy1 },
			{
				cosmetic: Cosmetic.EmoteGrumpy2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.DoubleDeckChairs,
				cost: { hearts: 16 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchMask,
				cost: { candles: 34 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteGrumpy3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteGrumpy4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.HikingGrouchBowTie,
				cost: { candles: 50 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2022, 2, 17), end: skyDate(2022, 2, 21) }],
		returning: [4],
	},
});
