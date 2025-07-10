import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Marching;

export default new SeasonalSpirit({
	id: SpiritId.MarchingAdventurer,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteMarching1 },
			{ cosmetic: Cosmetic.EmoteMarching2 },
			{
				cosmetic: Cosmetic.MarchingAdventurerHair,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.MarchingAdventurerBlessing1 },
			{
				cosmetic: Cosmetic.EmoteMarching3,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.EmoteMarching4 },
			{
				cosmetic: Cosmetic.MarchingAdventurerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.MarchingAdventurerMask },
			{
				cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.MarchingAdventurerBlessing3 },
			{
				cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteMarching1 },
			{
				cosmetic: Cosmetic.EmoteMarching2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerMask,
				cost: { candles: 30 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteMarching3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteMarching4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
				cost: { candles: 55 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 7, 3), end: skyDate(2025, 7, 7) }],
		returning: [1],
	},
});
