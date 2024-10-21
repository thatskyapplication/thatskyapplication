import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.RhythmicClap;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask66;
const hairEmoji = HAIR_EMOJIS.Hair111;
const capeEmoji = CAPE_EMOJIS.Cape88;

export default new SeasonalSpirit({
	name: SpiritName.SeedOfHope,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRhythmicClap1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRhythmicClap2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SeedOfHopeBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing3,
			},
			{ name: "Mask", cosmetic: Cosmetic.SeedOfHopeMask, emoji: maskEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SeedOfHopeMusicSheet,
				cost: { seasonalCandles: 12 },
				emoji: musicSheet,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SeedOfHopeBlessing2, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRhythmicClap3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRhythmicClap4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.SeedOfHopeHair,
				cost: { seasonalCandles: 20 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.SeedOfHopeBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.SeedOfHopeBlessing4,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.SeedOfHopeCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SeedOfHopeSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AuroraHeart,
			},
		],
	},
});
