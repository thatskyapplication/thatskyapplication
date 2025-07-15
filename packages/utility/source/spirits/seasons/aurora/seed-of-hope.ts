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
			{ cosmetic: Cosmetic.EmoteRhythmicClap1 },
			{ cosmetic: Cosmetic.EmoteRhythmicClap2 },
			{
				cosmetic: Cosmetic.SeedOfHopeBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeMask },
			{
				cosmetic: Cosmetic.SeedOfHopeMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeBlessing2 },
			{
				cosmetic: Cosmetic.EmoteRhythmicClap3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteRhythmicClap4 },
			{
				cosmetic: Cosmetic.SeedOfHopeHair,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeBlessing3 },
			{
				cosmetic: Cosmetic.SeedOfHopeBlessing4,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeCape },
			{
				cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteRhythmicClap1 },
			{ cosmetic: Cosmetic.EmoteRhythmicClap2, cost: { hearts: 4 } },
			{
				cosmetic: Cosmetic.SeedOfHopeBlessing1,
				cost: { candles: 5 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeMask, cost: { candles: 35 } },
			{
				cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.SeedOfHopeWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteRhythmicClap3,
				cost: { hearts: 3 },
			},
			{ cosmetic: Cosmetic.EmoteRhythmicClap4, cost: { hearts: 6 } },
			{
				cosmetic: Cosmetic.SeedOfHopeHair,
				cost: { candles: 40 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeBlessing2, cost: { candles: 5 } },
			{
				cosmetic: Cosmetic.SeedOfHopeMusicSheet,
				cost: { candles: 15 },
			},
			{ cosmetic: Cosmetic.SeedOfHopeCape, cost: { candles: 75 } },
		],
	},
	visits: {
		returning: [9],
	},
});
