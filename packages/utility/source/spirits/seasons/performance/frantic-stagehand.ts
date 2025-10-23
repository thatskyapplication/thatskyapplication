import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.Handshake;

export default new SeasonalSpirit({
	id: SpiritId.FranticStagehand,
	seasonId: SeasonId.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.FriendActionHandshake1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.FranticStagehandBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{ cosmetic: Cosmetic.FranticStagehandHood, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.FranticStagehandMusicSheet,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.FranticStagehandBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.FranticStagehandBlessing3,
					cost: { seasonalCandles: 26 },
				},
				{ cosmetic: Cosmetic.FriendActionHandshake2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.FranticStagehandMask,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.FranticStagehandOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.FriendActionHandshake1 },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.FranticStagehandMusicSheet,
					cost: { candles: 22 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.FranticStagehandBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FranticStagehandHood,
					cost: { candles: 48 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.FranticStagehandWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.FranticStagehandBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionHandshake2,
					cost: { hearts: 8 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.FranticStagehandOutfit,
					cost: { candles: 70 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.FranticStagehandMask,
					cost: { candles: 34 },
				},
			],
		],
	},
	visits: {
		returning: [5],
	},
});
