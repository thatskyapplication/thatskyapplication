import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.WavingLight;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask67;
const hairEmoji = HAIR_EMOJIS.Hair112;
const capeEmoji = CAPE_EMOJIS.Cape89;

export default new SeasonalSpirit({
	id: SpiritId.RunningWayfarer,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWavingLight1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWavingLight2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.RunningWayfarerMask,
				cost: { seasonalCandles: 12 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RunningWayfarerBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RunningWayfarerBlessing2,
				cost: { seasonalCandles: 16 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.RunningWayfarerHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWavingLight3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWavingLight4, emoji: emoteEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.RunningWayfarerBlessing3,
				cost: { seasonalCandles: 24 },
				emoji: blessing3,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.RunningWayfarerMusicSheet, emoji: musicSheet },
			{
				name: "Cape",
				cosmetic: Cosmetic.RunningWayfarerCape,
				cost: { seasonalCandles: 30 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.RunningWayfarerBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RunningWayfarerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AuroraHeart,
			},
		],
	},
});
