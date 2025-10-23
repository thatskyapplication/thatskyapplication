import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.HairTousle;

export default new SeasonalSpirit({
	id: SpiritId.HairtousleTeen,
	seasonId: SeasonId.Belonging,
	action,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.FriendActionHairTousle1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HairtousleTeenBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HairtousleTeenBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.HairtousleTeenMusicSheet,
					cost: { seasonalCandles: 14 },
				},
				{ cosmetic: Cosmetic.FriendActionHairTousle2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HairtousleTeenBlessing3,
					cost: { seasonalCandles: 16 },
				},
				{ cosmetic: Cosmetic.HairtousleTeenEarmuffs, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.HairtousleTeenUkulele,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.HairtousleTeenBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.HairtousleTeenSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.FriendActionHairTousle1 }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HairtousleTeenBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.HairtousleTeenMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.HairtousleTeenSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.HairtousleTeenWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HairtousleTeenBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.FriendActionHairTousle2,
					cost: { hearts: 9 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.HairtousleTeenUkulele,
					cost: { candles: 70 },
				},
			],
			[
				{
					cosmetic: Cosmetic.HairtousleTeenEarmuffs,
					cost: { candles: 50 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 6, 11), end: skyDate(2020, 6, 15) },
			{ start: skyDate(2022, 6, 9), end: skyDate(2022, 6, 13) },
			{ start: skyDate(2024, 3, 28), end: skyDate(2024, 4, 1) },
		],
	},
});
