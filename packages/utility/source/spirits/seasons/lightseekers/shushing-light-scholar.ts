import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shush;

export default new SeasonalSpirit({
	id: SpiritId.ShushingLightScholar,
	seasonId: SeasonId.Lightseekers,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteShush1 },
				{ cosmetic: Cosmetic.EmoteShush2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ShushingLightScholarBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ShushingLightScholarMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteShush3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteShush4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ShushingLightScholarBlessing2,
					cost: { seasonalCandles: 20 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ShushingLightScholarCape,
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteShush1 },
				{
					cosmetic: Cosmetic.EmoteShush2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ShushingLightScholarBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ShushingLightScholarMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ShushingLightScholarHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ShushingLightScholarWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteShush3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteShush4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ShushingLightScholarBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ShushingLightScholarCape,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 8, 20), end: skyDate(2020, 8, 24) },
			{ start: skyDate(2022, 9, 15), end: skyDate(2022, 9, 19) },
			{ start: skyDate(2024, 9, 12), end: skyDate(2024, 9, 16) },
		],
	},
});
