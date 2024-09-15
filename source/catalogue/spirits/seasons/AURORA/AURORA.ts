import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote1 = SpiritEmote.SilentClap;
const emote1Emoji = SpiritEmoteToEmoji[emote1];
const emote2 = SpiritEmote.Conduct;
const emote2Emoji = SpiritEmoteToEmoji[emote2];
const emote3 = SpiritEmote.Skipping;
const emote3Emoji = SpiritEmoteToEmoji[emote3];

export default new GuideSpirit({
	name: SpiritName.AURORA,
	season: SeasonName.AURORA,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.AURORAQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: `${emote1} 2`,
				cosmetic: Cosmetic.EmoteSilentClap2,
				cost: { hearts: 3 },
				emoji: emote1Emoji,
			},
			{ name: "Pendant", cosmetic: Cosmetic.AURORAPendant, emoji: NECKLACE_EMOJIS.Necklace24 },
			{
				name: "Aurora hair",
				cosmetic: Cosmetic.AURORAAuroraHair,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair116,
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.AURORAUltimateOutfit,
				cost: { seasonalHearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit36,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.AURORAUltimateCape,
				cost: { seasonalHearts: 1 },
				emoji: CAPE_EMOJIS.Cape92,
			},
			{ name: `${emote1} 1`, cosmetic: Cosmetic.EmoteSilentClap1, emoji: emote1Emoji },
			{
				name: `${emote1} 3`,
				cosmetic: Cosmetic.EmoteSilentClap3,
				cost: { candles: 5 },
				emoji: emote1Emoji,
			},
			{
				name: `${emote1} 4`,
				cosmetic: Cosmetic.EmoteSilentClap4,
				cost: { hearts: 5 },
				emoji: emote1Emoji,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.AURORAQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: `${emote2} 1`, cosmetic: Cosmetic.EmoteConduct1, emoji: emote2Emoji },
			{
				name: `${emote2} 2`,
				cosmetic: Cosmetic.EmoteConduct2,
				cost: { hearts: 3 },
				emoji: emote2Emoji,
			},
			{
				name: `${emote2} 3`,
				cosmetic: Cosmetic.EmoteConduct3,
				cost: { candles: 5 },
				emoji: emote2Emoji,
			},
			{
				name: `${emote2} 4`,
				cosmetic: Cosmetic.EmoteConduct4,
				cost: { hearts: 5 },
				emoji: emote2Emoji,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.AURORAQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart",
				cosmetic: Cosmetic.AURORAHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: `${emote3} 1`, cosmetic: Cosmetic.EmoteSkipping1, emoji: emote3Emoji },
			{
				name: `${emote3} 2`,
				cosmetic: Cosmetic.EmoteSkipping2,
				cost: { hearts: 3 },
				emoji: emote3Emoji,
			},
			{
				name: `${emote3} 3`,
				cosmetic: Cosmetic.EmoteSkipping3,
				cost: { candles: 5 },
				emoji: emote3Emoji,
			},
			{
				name: `${emote3} 4`,
				cosmetic: Cosmetic.EmoteSkipping4,
				cost: { hearts: 5 },
				emoji: emote3Emoji,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.AURORAQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Music sheet 1",
				cosmetic: Cosmetic.AURORAMusicSheet1,
				cost: { candles: 20 },
				emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.AURORAQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Music sheet 2",
				cosmetic: Cosmetic.AURORAMusicSheet2,
				cost: { candles: 20 },
				emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.AURORAOutfit,
				cost: { candles: 200 },
				emoji: OUTFIT_EMOJIS.Outfit37,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AURORAMask,
				cost: { candles: 50 },
				emoji: MASK_EMOJIS.Mask70,
			},
		],
	},
});
