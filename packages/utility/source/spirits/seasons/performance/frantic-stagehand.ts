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
			{ cosmetic: Cosmetic.FriendActionHandshake1 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.FranticStagehandBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.FranticStagehandHood },
			{
				cosmetic: Cosmetic.FranticStagehandMusicSheet,
				cost: { seasonalCandles: 22 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.FranticStagehandBlessing2,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.FranticStagehandBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.FriendActionHandshake2 },
			{
				cosmetic: Cosmetic.FranticStagehandMask,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.FranticStagehandOutfit },
			{
				cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.FriendActionHandshake1 },
			{
				cosmetic: Cosmetic.FranticStagehandMusicSheet,
				cost: { candles: 22 },
			},
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
				cosmetic: Cosmetic.FranticStagehandSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.FranticStagehandWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.FranticStagehandBlessing2,
			},
			{
				cosmetic: Cosmetic.FriendActionHandshake2,
				cost: { hearts: 8 },
			},
			{
				cosmetic: Cosmetic.FranticStagehandOutfit,
				cost: { candles: 70 },
			},
			{
				cosmetic: Cosmetic.FranticStagehandMask,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		returning: [5],
	},
});
