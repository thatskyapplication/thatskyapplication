import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.ChestPound;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfFire,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteChestPound1 },
				{ cosmetic: Cosmetic.EmoteChestPound2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfFireBlessing1,
					cost: { seasonalCandles: 13 },
				},
				{ cosmetic: Cosmetic.ProphetOfFireHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteChestPound3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteChestPound4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfFireBlessing2,
					cost: { seasonalCandles: 23 },
				},
				{ cosmetic: Cosmetic.ProphetOfFireMusicSheet, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfFireMask,
					cost: { seasonalCandles: 29 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ProphetOfFireOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ProphetOfFireSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteChestPound1 },
				{
					cosmetic: Cosmetic.EmoteChestPound2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.ProphetOfFireProp,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfFireBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.ProphetOfFireHair,
					cost: { candles: 44 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ProphetOfFireSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ProphetOfFireWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteChestPound3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteChestPound4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ProphetOfFireMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfFireBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfFireMask,
					cost: { candles: 54 },
				},
				{
					cosmetic: Cosmetic.ProphetOfFireCauldron,
					cost: { hearts: 13 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ProphetOfFireOutfit,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 12, 9), end: skyDate(2021, 12, 13) },
			{ start: skyDate(2023, 8, 3), end: skyDate(2023, 8, 7) },
		],
	},
});
