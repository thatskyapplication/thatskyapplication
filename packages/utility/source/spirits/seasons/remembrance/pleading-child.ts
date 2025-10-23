import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Pleading;

export default new SeasonalSpirit({
	id: SpiritId.PleadingChild,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmotePleading1 },
				{ cosmetic: Cosmetic.EmotePleading2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.PleadingChildNeckAccessory,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PleadingChildBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PleadingChildBlessing2,
					cost: { seasonalCandles: 20 },
				},
				{ cosmetic: Cosmetic.PleadingChildHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmotePleading3,
					cost: { seasonalCandles: 26 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmotePleading4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PleadingChildOutfit,
					cost: { seasonalCandles: 36 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.PleadingChildBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.PleadingChildSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmotePleading1 },
				{
					cosmetic: Cosmetic.EmotePleading2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PleadingChildBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.PleadingChildNeckAccessory,
					cost: { candles: 50 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PleadingChildSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PleadingChildWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmotePleading3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmotePleading4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PleadingChildBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PleadingChildOutfit,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.PleadingChildShoes,
					cost: { candles: 30 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PleadingChildHair,
					cost: { candles: 60 },
				},
			],
		],
	},
	visits: {
		returning: [7],
	},
});
