/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, GuideSpirit } from "../../../Structures/Spirits/Base.js";
import { RealmName } from "../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../Utility/spirits.js";

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
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: `${emote1} 2`, cost: { hearts: 3 }, emoji: emote1Emoji })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace24 })
			.set(1 << 3, { item: "Aurora hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair116 })
			.set(1 << 4, { item: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit36 })
			.set(1 << 5, { item: "Ultimate cape", cost: { seasonalHearts: 1 }, emoji: CAPE_EMOJIS.Cape95 })
			.set(1 << 6, { item: `${emote1} 1`, cost: null, emoji: emote1Emoji })
			.set(1 << 7, { item: `${emote1} 3`, cost: { candles: 5 }, emoji: emote1Emoji })
			.set(1 << 8, { item: `${emote1} 4`, cost: { hearts: 5 }, emoji: emote1Emoji })
			.set(1 << 9, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { item: `${emote2} 1`, cost: null, emoji: emote2Emoji })
			.set(1 << 11, { item: `${emote2} 2`, cost: { hearts: 3 }, emoji: emote2Emoji })
			.set(1 << 12, { item: `${emote2} 3`, cost: { candles: 5 }, emoji: emote2Emoji })
			.set(1 << 13, { item: `${emote2} 4`, cost: { hearts: 5 }, emoji: emote2Emoji })
			.set(1 << 14, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 15, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 16, { item: `${emote3} 1`, cost: null, emoji: emote3Emoji })
			.set(1 << 17, { item: `${emote3} 2`, cost: { hearts: 3 }, emoji: emote3Emoji })
			.set(1 << 18, { item: `${emote3} 3`, cost: { candles: 5 }, emoji: emote3Emoji })
			.set(1 << 19, { item: `${emote3} 4`, cost: { hearts: 5 }, emoji: emote3Emoji })
			.set(1 << 20, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 21, { item: "Music sheet 1", cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 22, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 23, { item: "Music sheet 2", cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 24, { item: "Outfit", cost: { candles: 200 }, emoji: OUTFIT_EMOJIS.Outfit37 })
			.set(1 << 25, { item: "Mask", cost: { candles: 50 }, emoji: MASK_EMOJIS.Mask70 }),
	},
});
