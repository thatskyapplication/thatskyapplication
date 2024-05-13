import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
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
	season: SeasonName.Aurora,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { name: `${emote1} 2`, cost: { hearts: 3 }, emoji: emote1Emoji })
			.set(1 << 2, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace24 })
			.set(1 << 3, { name: "Aurora hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair116 })
			.set(1 << 4, { name: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit36 })
			.set(1 << 5, { name: "Ultimate cape", cost: { seasonalHearts: 1 }, emoji: CAPE_EMOJIS.Cape95 })
			.set(1 << 6, { name: `${emote1} 1`, cost: null, emoji: emote1Emoji })
			.set(1 << 7, { name: `${emote1} 3`, cost: { candles: 5 }, emoji: emote1Emoji })
			.set(1 << 8, { name: `${emote1} 4`, cost: { hearts: 5 }, emoji: emote1Emoji })
			.set(1 << 9, { name: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { name: `${emote2} 1`, cost: null, emoji: emote2Emoji })
			.set(1 << 11, { name: `${emote2} 2`, cost: { hearts: 3 }, emoji: emote2Emoji })
			.set(1 << 12, { name: `${emote2} 3`, cost: { candles: 5 }, emoji: emote2Emoji })
			.set(1 << 13, { name: `${emote2} 4`, cost: { hearts: 5 }, emoji: emote2Emoji })
			.set(1 << 14, { name: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 15, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 16, { name: `${emote3} 1`, cost: null, emoji: emote3Emoji })
			.set(1 << 17, { name: `${emote3} 2`, cost: { hearts: 3 }, emoji: emote3Emoji })
			.set(1 << 18, { name: `${emote3} 3`, cost: { candles: 5 }, emoji: emote3Emoji })
			.set(1 << 19, { name: `${emote3} 4`, cost: { hearts: 5 }, emoji: emote3Emoji })
			.set(1 << 20, { name: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 21, { name: "Music sheet 1", cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 22, { name: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 23, { name: "Music sheet 2", cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 24, { name: "Outfit", cost: { candles: 200 }, emoji: OUTFIT_EMOJIS.Outfit37 })
			.set(1 << 25, { name: "Mask", cost: { candles: 50 }, emoji: MASK_EMOJIS.Mask70 }),
	},
});
