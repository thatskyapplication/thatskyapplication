import { RealmName, SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

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
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTwirl1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteTwirl2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WarriorOfLoveBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.WarriorOfLoveMask,
				cost: { candles: 35 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WarriorOfLoveSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.WarriorOfLoveWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTwirl3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteTwirl4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.WarriorOfLoveHair,
				cost: { candles: 40 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WarriorOfLoveBlessing2,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WarriorOfLoveMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.WarriorOfLoveCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [126],
	},
});
