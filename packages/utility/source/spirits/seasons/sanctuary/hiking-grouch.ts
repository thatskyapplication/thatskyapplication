import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Grumpy;

export default new SeasonalSpirit({
	id: SpiritId.HikingGrouch,
	seasonId: SeasonId.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteGrumpy1 },
				{ cosmetic: Cosmetic.EmoteGrumpy2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HikingGrouchBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{ translation: CosmeticCommon.Mask, cosmetic: Cosmetic.HikingGrouchMask, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteGrumpy3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteGrumpy4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HikingGrouchHair,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HikingGrouchBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.HikingGrouchBlessing3,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.HikingGrouchBowTie, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteGrumpy1 },
				{
					cosmetic: Cosmetic.EmoteGrumpy2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.DoubleDeckChairs,
					cost: { hearts: 16 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HikingGrouchBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.HikingGrouchMask,
					cost: { candles: 34 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.HikingGrouchSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.HikingGrouchWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteGrumpy3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteGrumpy4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HikingGrouchHair,
					cost: { candles: 42 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HikingGrouchBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.HikingGrouchBowTie,
					cost: { candles: 50 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2022, 2, 17), end: skyDate(2022, 2, 21) }],
		returning: [4],
	},
});
