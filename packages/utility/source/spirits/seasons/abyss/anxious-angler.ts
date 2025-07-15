import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Anxious;

export default new SeasonalSpirit({
	id: SpiritId.AnxiousAngler,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteAnxious1 },
			{ cosmetic: Cosmetic.EmoteAnxious2 },
			{
				cosmetic: Cosmetic.AnxiousAnglerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.AnxiousAnglerMask },
			{
				cosmetic: Cosmetic.AnxiousAnglerHair,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.AnxiousAnglerBlessing2 },
			{
				cosmetic: Cosmetic.EmoteAnxious3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteAnxious4 },
			{
				cosmetic: Cosmetic.AnxiousAnglerBlessing3,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.AnxiousAnglerCape },
			{
				cosmetic: Cosmetic.AnxiousAnglerOutfit,
				cost: { seasonalCandles: 38 },
			},
			{ cosmetic: Cosmetic.AnxiousAnglerBlessing4 },
			{
				cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteAnxious1 },
			{
				cosmetic: Cosmetic.EmoteAnxious2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerHair,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.AnxiousAnglerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteAnxious3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteAnxious4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerMask,
				cost: { candles: 35 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerCape,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.AnxiousAnglerOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 1, 18), end: skyDate(2024, 1, 22) }],
	},
});
