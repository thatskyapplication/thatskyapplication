import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: `${emote1} 2`, bit: 1 << 1, cost: { hearts: 3 }, emoji: emote1Emoji },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace24 },
			{ name: "Aurora hair", bit: 1 << 3, cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair116 },
			{ name: "Ultimate outfit", bit: 1 << 4, cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit36 },
			{ name: "Ultimate cape", bit: 1 << 5, cost: { seasonalHearts: 1 }, emoji: CAPE_EMOJIS.Cape92 },
			{ name: `${emote1} 1`, bit: 1 << 6, emoji: emote1Emoji },
			{ name: `${emote1} 3`, bit: 1 << 7, cost: { candles: 5 }, emoji: emote1Emoji },
			{ name: `${emote1} 4`, bit: 1 << 8, cost: { hearts: 5 }, emoji: emote1Emoji },
			{ name: "Quest 2", bit: 1 << 9, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: `${emote2} 1`, bit: 1 << 10, emoji: emote2Emoji },
			{ name: `${emote2} 2`, bit: 1 << 11, cost: { hearts: 3 }, emoji: emote2Emoji },
			{ name: `${emote2} 3`, bit: 1 << 12, cost: { candles: 5 }, emoji: emote2Emoji },
			{ name: `${emote2} 4`, bit: 1 << 13, cost: { hearts: 5 }, emoji: emote2Emoji },
			{ name: "Quest 3", bit: 1 << 14, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart", bit: 1 << 15, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: `${emote3} 1`, bit: 1 << 16, emoji: emote3Emoji },
			{ name: `${emote3} 2`, bit: 1 << 17, cost: { hearts: 3 }, emoji: emote3Emoji },
			{ name: `${emote3} 3`, bit: 1 << 18, cost: { candles: 5 }, emoji: emote3Emoji },
			{ name: `${emote3} 4`, bit: 1 << 19, cost: { hearts: 5 }, emoji: emote3Emoji },
			{ name: "Quest 4", bit: 1 << 20, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Music sheet 1", bit: 1 << 21, cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
			{ name: "Quest 5", bit: 1 << 22, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Music sheet 2", bit: 1 << 23, cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
			{ name: "Outfit", bit: 1 << 24, cost: { candles: 200 }, emoji: OUTFIT_EMOJIS.Outfit37 },
			{ name: "Mask", bit: 1 << 25, cost: { candles: 50 }, emoji: MASK_EMOJIS.Mask70 },
		],
	},
});
