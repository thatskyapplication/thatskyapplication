import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Chuckle;

export default new SeasonalSpirit({
	id: SpiritId.ChucklingScout,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteChuckle1 },
			{ cosmetic: Cosmetic.EmoteChuckle2 },
			{
				cosmetic: Cosmetic.ChucklingScoutMask,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.ChucklingScoutBlessing1 },
			{
				cosmetic: Cosmetic.EmoteChuckle3,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.EmoteChuckle4 },
			{
				cosmetic: Cosmetic.ChucklingScoutBlessing2,
				cost: { seasonalCandles: 17 },
			},
			{ cosmetic: Cosmetic.ChucklingScoutOutfit },
			{
				cosmetic: Cosmetic.ChucklingScoutProp,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.ChucklingScoutBlessing3 },
			{
				cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteChuckle1 },
			{
				cosmetic: Cosmetic.EmoteChuckle2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutMask,
				cost: { candles: 36 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ChucklingScoutWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteChuckle3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteChuckle4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutOutfit,
				cost: { candles: 46 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutShoes,
				cost: { candles: 32 },
			},
			{
				cosmetic: Cosmetic.ChucklingScoutProp,
				cost: { candles: 45 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 3, 13), end: skyDate(2025, 3, 17) }],
		returning: [1],
	},
});
