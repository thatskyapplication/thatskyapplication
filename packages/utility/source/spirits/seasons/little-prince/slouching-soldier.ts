import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Slouch;

export default new SeasonalSpirit({
	id: SpiritId.SlouchingSoldier,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteSlouch1 },
			{ cosmetic: Cosmetic.EmoteSlouch2 },
			{
				cosmetic: Cosmetic.SlouchingSoldierBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.SlouchingSoldierHair },
			{
				cosmetic: Cosmetic.EmoteSlouch3,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.EmoteSlouch4 },
			{
				cosmetic: Cosmetic.SlouchingSoldierBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.SlouchingSoldierMusicSheet },
			{
				cosmetic: Cosmetic.SlouchingSoldierCape,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.SlouchingSoldierBlessing3 },
			{
				cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteSlouch1 },
			{
				cosmetic: Cosmetic.EmoteSlouch2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierHair,
				cost: { candles: 42 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteSlouch3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteSlouch4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.SlouchingSoldierCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 2, 16), end: skyDate(2023, 2, 20) }],
		returning: [8],
	},
});
