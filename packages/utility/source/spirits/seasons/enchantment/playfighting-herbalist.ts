import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.PlayFight;

export default new SeasonalSpirit({
	id: SpiritId.PlayfightingHerbalist,
	seasonId: SeasonId.Enchantment,
	action,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.FriendActionPlayFight1 },
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PlayfightingHerbalistMask,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing3,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.FriendActionPlayFight2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.PlayfightingHerbalistMusicSheet,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PlayfightingHerbalistHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PlayfightingHerbalistCape,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.PlayfightingHerbalistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.FriendActionPlayFight1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.PlayfightingHerbalistMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PlayfightingHerbalistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PlayfightingHerbalistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionPlayFight2,
					cost: { hearts: 10 },
					level: 2,
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.PlayfightingHerbalistMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.PlayfightingHerbalistBlessing3,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PlayfightingHerbalistHair,
					cost: { candles: 42 },
				},
				{
					cosmetic: Cosmetic.PlayfightingHerbalistOrb,
					cost: { candles: 20 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PlayfightingHerbalistCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 10, 28), end: skyDate(2021, 11, 1) },
			{ start: skyDate(2023, 10, 12), end: skyDate(2023, 10, 16) },
		],
	},
});
