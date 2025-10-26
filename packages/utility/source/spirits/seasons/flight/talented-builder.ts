import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Voilà;

export default new SeasonalSpirit({
	id: SpiritId.TalentedBuilder,
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteVoilà1 },
				{ cosmetic: Cosmetic.EmoteVoilà2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TalentedBuilderBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{ cosmetic: Cosmetic.TalentedBuilderMusicSheet, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TalentedBuilderBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteVoilà3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteVoilà4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.TalentedBuilderTrailSpell1,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TalentedBuilderOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TalentedBuilderHair,
					cost: { seasonalCandles: 26 },
				},
				{ cosmetic: Cosmetic.TalentedBuilderTrailSpell2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteVoilà1 },
				{
					cosmetic: Cosmetic.EmoteVoilà2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TalentedBuilderBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.TalentedBuilderNeckAccessory,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TalentedBuilderSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TalentedBuilderWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteVoilà3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteVoilà4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.TalentedBuilderMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TalentedBuilderBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TalentedBuilderOutfit,
					cost: { candles: 70 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TalentedBuilderHair,
					cost: { candles: 45 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 11, 23), end: skyDate(2023, 11, 27) }],
	},
});
