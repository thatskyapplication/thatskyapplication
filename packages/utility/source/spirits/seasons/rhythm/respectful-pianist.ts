import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Respect;

export default new SeasonalSpirit({
	id: SpiritId.RespectfulPianist,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteRespect1 },
				{ cosmetic: Cosmetic.EmoteRespect2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RespectfulPianistHair,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RespectfulPianistBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteRespect3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteRespect4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RespectfulPianistBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.RespectfulPianistWinterPiano, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.RespectfulPianistMask,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.RespectfulPianistBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteRespect1 },
				{
					cosmetic: Cosmetic.EmoteRespect2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RespectfulPianistBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RespectfulPianistHair,
					cost: { candles: 26 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.RespectfulPianistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteRespect3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteRespect4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RespectfulPianistBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.RespectfulPianistWinterPiano,
					cost: { candles: 75 },
				},
			],
			[
				{
					cosmetic: Cosmetic.RespectfulPianistMask,
					cost: { candles: 48 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 2, 4), end: skyDate(2021, 2, 8) },
			// https://discord.com/channels/575762611111592007/628684058414678026/1436078306066694164
			// Was present on 10/11/2025, but not announced. Likely due to the above.
			{ start: skyDate(2025, 11, 6, 11, 42), end: skyDate(2025, 11, 11) },
		],
		returning: [3],
	},
});
