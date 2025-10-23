import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Gloat;

export default new SeasonalSpirit({
	id: SpiritId.GloatingNarcissist,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteGloat1 },
				{ cosmetic: Cosmetic.EmoteGloat2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.GloatingNarcissistBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{ cosmetic: Cosmetic.GloatingNarcissistMusicSheet, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteGloat3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteGloat4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.GloatingNarcissistBlessing2,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.GloatingNarcissistOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.GloatingNarcissistHair,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.GloatingNarcissistBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.GloatingNarcissistSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteGloat1 },
				{
					cosmetic: Cosmetic.EmoteGloat2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.GloatingNarcissistSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.GloatingNarcissistBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.GloatingNarcissistMusicSheet,
					cost: { candles: 15 },
				},
				{
					cosmetic: Cosmetic.GloatingNarcissistHair,
					cost: { candles: 46 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.GloatingNarcissistWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteGloat3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteGloat4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.GloatingNarcissistBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.GloatingNarcissistOutfit,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 7, 20), end: skyDate(2023, 7, 24) }],
		returning: [8],
	},
});
