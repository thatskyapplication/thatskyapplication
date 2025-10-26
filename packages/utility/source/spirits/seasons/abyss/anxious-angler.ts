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
			[
				{ cosmetic: Cosmetic.EmoteAnxious1 },
				{ cosmetic: Cosmetic.EmoteAnxious2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.AnxiousAnglerBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.AnxiousAnglerMask,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.AnxiousAnglerHair,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.AnxiousAnglerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAnxious3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteAnxious4, seasonPass: true, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.AnxiousAnglerBlessing3,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.AnxiousAnglerCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AnxiousAnglerOutfit,
					cost: { seasonalCandles: 38 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.AnxiousAnglerBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteAnxious1 },
				{
					cosmetic: Cosmetic.EmoteAnxious2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.AnxiousAnglerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.AnxiousAnglerHair,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.AnxiousAnglerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAnxious3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteAnxious4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.AnxiousAnglerMask,
					cost: { candles: 35 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.AnxiousAnglerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.AnxiousAnglerCape,
					cost: { candles: 70 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AnxiousAnglerOutfit,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 1, 18), end: skyDate(2024, 1, 22) }],
		returning: [10],
	},
});
