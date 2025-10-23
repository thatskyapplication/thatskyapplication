import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Sneeze;

export default new SeasonalSpirit({
	id: SpiritId.SneezingGeographer,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteSneeze1 },
				{ cosmetic: Cosmetic.EmoteSneeze2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.SneezingGeographerHair,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SneezingGeographerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSneeze3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSneeze4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SneezingGeographerBlessing2,
					cost: { seasonalCandles: 22 },
				},
				{ cosmetic: Cosmetic.SneezingGeographerCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.SneezingGeographerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSneeze1 },
				{
					cosmetic: Cosmetic.EmoteSneeze2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SneezingGeographerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SneezingGeographerBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.SneezingGeographerHair,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SneezingGeographerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSneeze3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteSneeze4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SneezingGeographerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SneezingGeographerCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 4, 13), end: skyDate(2023, 4, 17) }],
		returning: [8],
	},
});
