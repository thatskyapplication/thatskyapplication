import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shrug;

export default new SeasonalSpirit({
	id: SpiritId.IndifferentAlchemist,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteShrug1 },
				{ cosmetic: Cosmetic.EmoteShrug2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.IndifferentAlchemistBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.IndifferentAlchemistMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteShrug3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteShrug4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.IndifferentAlchemistHair,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.IndifferentAlchemistBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.IndifferentAlchemistBlessing3,
					cost: { seasonalCandles: 20 },
				},
				{ cosmetic: Cosmetic.IndifferentAlchemistCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.IndifferentAlchemistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteShrug1 },
				{
					cosmetic: Cosmetic.EmoteShrug2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.IndifferentAlchemistBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.IndifferentAlchemistMask,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.IndifferentAlchemistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.IndifferentAlchemistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteShrug3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteShrug4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.IndifferentAlchemistBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.IndifferentAlchemistHair,
					cost: { candles: 42 },
				},
			],
			[
				{
					cosmetic: Cosmetic.IndifferentAlchemistCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 10, 29), end: skyDate(2020, 11, 2) },
			{ start: skyDate(2022, 9, 1), end: skyDate(2022, 9, 5) },
		],
		returning: [5],
	},
});
