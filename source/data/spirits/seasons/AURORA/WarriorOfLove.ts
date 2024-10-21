import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Twirl;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask68;
const hairEmoji = HAIR_EMOJIS.Hair113;
const capeEmoji = CAPE_EMOJIS.Cape90;

export default new SeasonalSpirit({
	name: SpiritName.WarriorOfLove,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTwirl1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteTwirl2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.WarriorOfLoveMask,
				cost: { seasonalCandles: 6 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.WarriorOfLoveBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WarriorOfLoveBlessing2,
				cost: { seasonalCandles: 12 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.WarriorOfLoveHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTwirl3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteTwirl4, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
				cost: { seasonalCandles: 24 },
				emoji: musicSheet,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.WarriorOfLoveBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.WarriorOfLoveBlessing4,
				cost: { seasonalCandles: 30 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.WarriorOfLoveCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AuroraHeart,
			},
		],
	},
});
