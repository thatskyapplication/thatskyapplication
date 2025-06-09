import { Cosmetic } from "../../../cosmetics.js";
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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRhythmicClap1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRhythmicClap2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SeedOfHopeBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Mask", cosmetic: Cosmetic.SeedOfHopeMask },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SeedOfHopeMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SeedOfHopeBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRhythmicClap3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRhythmicClap4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.SeedOfHopeHair,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.SeedOfHopeBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.SeedOfHopeBlessing4,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Cape", cosmetic: Cosmetic.SeedOfHopeCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRhythmicClap1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRhythmicClap2, cost: { hearts: 4 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SeedOfHopeBlessing1,
				cost: { candles: 5 },
			},
			{ name: "Mask", cosmetic: Cosmetic.SeedOfHopeMask, cost: { candles: 35 } },
			{
				name: "Heart",
				cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SeedOfHopeWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRhythmicClap3,
				cost: { hearts: 3 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRhythmicClap4, cost: { hearts: 6 } },
			{
				name: "Hair",
				cosmetic: Cosmetic.SeedOfHopeHair,
				cost: { candles: 40 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SeedOfHopeBlessing2, cost: { candles: 5 } },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SeedOfHopeMusicSheet,
				cost: { candles: 15 },
			},
			{ name: "Cape", cosmetic: Cosmetic.SeedOfHopeCape, cost: { candles: 75 } },
		],
	},
	visits: {
		returning: [9],
	},
});
