import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Navigate;

export default new SeasonalSpirit({
	id: SpiritId.LivelyNavigator,
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteNavigate1 },
				{ cosmetic: Cosmetic.EmoteNavigate2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LivelyNavigatorBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LivelyNavigatorHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LivelyNavigatorBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteNavigate3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteNavigate4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.LivelyNavigatorTrailSpell1,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.LivelyNavigatorCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
					cost: { seasonalCandles: 28 },
				},
				{ cosmetic: Cosmetic.LivelyNavigatorTrailSpell2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteNavigate1 },
				{
					cosmetic: Cosmetic.EmoteNavigate2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LivelyNavigatorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.LivelyNavigatorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteNavigate3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteNavigate4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LivelyNavigatorBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LivelyNavigatorHair,
					cost: { candles: 55 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.LivelyNavigatorCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2023, 8, 17), end: skyDate(2023, 8, 21) },
			{ start: skyDate(2025, 5, 8), end: skyDate(2025, 5, 12) },
		],
	},
});
