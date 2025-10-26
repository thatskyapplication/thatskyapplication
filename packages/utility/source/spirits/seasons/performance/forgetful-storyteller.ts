import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Aww;

export default new SeasonalSpirit({
	id: SpiritId.ForgetfulStoryteller,
	seasonId: SeasonId.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteAww1 },
				{ cosmetic: Cosmetic.EmoteAww2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ForgetfulStorytellerBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ForgetfulStorytellerMask,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ForgetfulStorytellerHair,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ForgetfulStorytellerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAww3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteAww4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ForgetfulStorytellerBlessing3,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ForgetfulStorytellerOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ForgetfulStorytellerCape,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.ForgetfulStorytellerBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ForgetfulStorytellerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteAww1 },
				{ cosmetic: Cosmetic.EmoteAww2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ForgetfulStorytellerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ForgetfulStorytellerMask,
					cost: { candles: 34 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ForgetfulStorytellerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ForgetfulStorytellerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAww3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteAww4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ForgetfulStorytellerHair,
					cost: { candles: 44 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ForgetfulStorytellerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ForgetfulStorytellerOutfit,
					cost: { candles: 70 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ForgetfulStorytellerCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 1, 30), end: skyDate(2025, 2, 3) }],
	},
});
