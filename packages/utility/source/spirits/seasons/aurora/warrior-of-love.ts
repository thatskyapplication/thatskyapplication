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
			{ cosmetic: Cosmetic.EmoteTwirl1 },
			{ cosmetic: Cosmetic.EmoteTwirl2 },
			{
				cosmetic: Cosmetic.WarriorOfLoveMask,
				cost: { seasonalCandles: 6 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.WarriorOfLoveBlessing1,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.WarriorOfLoveBlessing2,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.WarriorOfLoveHair },
			{
				cosmetic: Cosmetic.EmoteTwirl3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.EmoteTwirl4 },
			{
				translation: CosmeticCommon.MusicSheet,
				cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
				cost: { seasonalCandles: 24 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.WarriorOfLoveBlessing3,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.WarriorOfLoveBlessing4,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.WarriorOfLoveCape },
			{
				cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteTwirl1 },
			{
				cosmetic: Cosmetic.EmoteTwirl2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.WarriorOfLoveBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.WarriorOfLoveMask,
				cost: { candles: 35 },
			},
			{
				cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.WarriorOfLoveWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteTwirl3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteTwirl4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.WarriorOfLoveHair,
				cost: { candles: 40 },
			},
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
			{
				cosmetic: Cosmetic.WarriorOfLoveCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 11, 7), end: skyDate(2024, 11, 11) }],
		returning: [9],
	},
});
