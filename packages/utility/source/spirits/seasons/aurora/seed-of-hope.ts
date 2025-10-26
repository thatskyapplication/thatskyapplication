import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.RhythmicClap;

export default new SeasonalSpirit({
	id: SpiritId.SeedOfHope,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteRhythmicClap1 },
				{ cosmetic: Cosmetic.EmoteRhythmicClap2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SeedOfHopeBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{ translation: CosmeticCommon.Mask, cosmetic: Cosmetic.SeedOfHopeMask, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SeedOfHopeMusicSheet,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SeedOfHopeBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteRhythmicClap3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteRhythmicClap4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SeedOfHopeHair,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.SeedOfHopeBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.SeedOfHopeBlessing4,
					cost: { seasonalCandles: 26 },
				},
				{ translation: CosmeticCommon.Cape, cosmetic: Cosmetic.SeedOfHopeCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteRhythmicClap1 },
				{ cosmetic: Cosmetic.EmoteRhythmicClap2, cost: { hearts: 4 } },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SeedOfHopeBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SeedOfHopeMask,
					cost: { candles: 35 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SeedOfHopeWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteRhythmicClap3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteRhythmicClap4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SeedOfHopeHair,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SeedOfHopeBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SeedOfHopeMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.SeedOfHopeCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		returning: [9],
	},
});
