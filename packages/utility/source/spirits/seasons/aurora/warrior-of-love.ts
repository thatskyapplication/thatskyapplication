import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Twirl;

export default new SeasonalSpirit({
	id: SpiritId.WarriorOfLove,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteTwirl1 },
				{ cosmetic: Cosmetic.EmoteTwirl2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WarriorOfLoveMask,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WarriorOfLoveBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WarriorOfLoveBlessing2,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.WarriorOfLoveHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTwirl3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteTwirl4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.WarriorOfLoveBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.WarriorOfLoveBlessing4,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WarriorOfLoveCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteTwirl1 },
				{
					cosmetic: Cosmetic.EmoteTwirl2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WarriorOfLoveBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WarriorOfLoveMask,
					cost: { candles: 35 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.WarriorOfLoveWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTwirl3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteTwirl4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.WarriorOfLoveHair,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WarriorOfLoveBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WarriorOfLoveCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 11, 7), end: skyDate(2024, 11, 11) }],
		returning: [9],
	},
});
