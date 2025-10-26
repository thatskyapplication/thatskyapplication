import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.DontGo;

export default new SeasonalSpirit({
	id: SpiritId.PleafulParent,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteDontGo1 },
				{ cosmetic: Cosmetic.EmoteDontGo2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.PleafulParentBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{ cosmetic: Cosmetic.PleafulParentGuitar, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteDontGo3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteDontGo4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PleafulParentMask,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PleafulParentCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.PleafulParentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteDontGo1 },
				{
					cosmetic: Cosmetic.EmoteDontGo2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PleafulParentBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PleafulParentMask,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PleafulParentSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PleafulParentWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDontGo3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteDontGo4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PleafulParentBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PleafulParentCape,
					cost: { candles: 65 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PleafulParentGuitar,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 3, 26), end: skyDate(2020, 3, 30) },
			{ start: skyDate(2020, 12, 10), end: skyDate(2020, 12, 14) },
			{ start: skyDate(2022, 12, 22), end: skyDate(2022, 12, 26) },
			{ start: skyDate(2024, 10, 24), end: skyDate(2024, 10, 28) },
		],
	},
});
