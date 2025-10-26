import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.WavingLight;

export default new SeasonalSpirit({
	id: SpiritId.RunningWayfarer,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteWavingLight1 },
				{ cosmetic: Cosmetic.EmoteWavingLight2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.RunningWayfarerMask,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RunningWayfarerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RunningWayfarerBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RunningWayfarerHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWavingLight3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteWavingLight4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.RunningWayfarerBlessing3,
					cost: { seasonalCandles: 24 },
				},
				{ cosmetic: Cosmetic.RunningWayfarerMusicSheet, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.RunningWayfarerCape,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.RunningWayfarerBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.RunningWayfarerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteWavingLight1 },
				{ cosmetic: Cosmetic.EmoteWavingLight2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RunningWayfarerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.RunningWayfarerMask,
					cost: { candles: 35 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.RunningWayfarerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.RunningWayfarerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWavingLight3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteWavingLight4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RunningWayfarerHair,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RunningWayfarerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.RunningWayfarerMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					cosmetic: Cosmetic.RunningWayfarerCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		returning: [9],
	},
});
