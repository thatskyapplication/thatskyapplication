import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BlowKiss;

export default new SeasonalSpirit({
	id: SpiritId.AdmiringActor,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBlowKiss1 },
				{ cosmetic: Cosmetic.EmoteBlowKiss2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.AdmiringActorBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{ cosmetic: Cosmetic.AdmiringActorMusicSheet, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteBlowKiss3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBlowKiss4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AdmiringActorOutfit,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.AdmiringActorMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.AdmiringActorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBlowKiss1 },
				{
					cosmetic: Cosmetic.EmoteBlowKiss2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.AdmiringActorBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.AdmiringActorMusicSheet,
					cost: { candles: 15 },
				},
				{
					cosmetic: Cosmetic.AdmiringActorSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.AdmiringActorWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBlowKiss3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBlowKiss4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.AdmiringActorBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.AdmiringActorOutfit,
					cost: { candles: 65 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.AdmiringActorMask,
					cost: { candles: 42 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 10, 15), end: skyDate(2020, 10, 19) },
			{ start: skyDate(2021, 6, 24), end: skyDate(2021, 6, 28) },
			{ start: skyDate(2023, 6, 8), end: skyDate(2023, 6, 12) },
			{ start: skyDate(2025, 10, 9), end: skyDate(2025, 10, 13) },
		],
	},
});
