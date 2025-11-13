import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Peek;

export default new SeasonalSpirit({
	id: SpiritId.PeekingPostman,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmotePeek1 },
				{ cosmetic: Cosmetic.EmotePeek2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.PeekingPostmanMusicSheet,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PeekingPostmanBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmotePeek3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmotePeek4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PeekingPostmanOutfit,
					cost: { seasonalCandles: 21 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PeekingPostmanBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PeekingPostmanCape,
					cost: { seasonalCandles: 27 },
				},
				{ cosmetic: Cosmetic.PeekingPostmanRabbitMask, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.PeekingPostmanSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmotePeek1 },
				{ cosmetic: Cosmetic.EmotePeek2, cost: { hearts: 4 }, level: 2 },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.PeekingPostmanMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PeekingPostmanBlessing1,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.PeekingPostmanRabbitMask,
					cost: { candles: 54 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PeekingPostmanSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.PeekingPostmanWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmotePeek3, cost: { hearts: 3 }, level: 3 },
				{ cosmetic: Cosmetic.EmotePeek4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.PeekingPostmanCape,
					cost: { candles: 65 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PeekingPostmanBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.PeekingPostmanOutfit,
					cost: { candles: 70 },
				},
			],
		],
	},
	keywords: ["rabbit", "rabbit mask"],
	visits: {
		travelling: [{ start: skyDate(2022, 6, 23), end: skyDate(2022, 6, 27) }],
		returning: [11],
	},
});
