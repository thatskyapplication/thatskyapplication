/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	EMOTE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.AURORA,
	season: SeasonName.Aurora,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: `${SpiritEmote.SilentClap} 2`, cost: { hearts: 3 }, emoji: EMOTE_EMOJIS.SilentClap })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace24 })
			.set(1 << 3, { item: "Aurora hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair116 })
			.set(1 << 4, { item: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit36 })
			.set(1 << 5, { item: "Ultimate cape", cost: { seasonalHearts: 1 }, emoji: CAPE_EMOJIS.Cape95 })
			.set(1 << 6, { item: `${SpiritEmote.SilentClap} 1`, cost: null, emoji: EMOTE_EMOJIS.SilentClap })
			.set(1 << 7, { item: `${SpiritEmote.SilentClap} 3`, cost: { candles: 5 }, emoji: EMOTE_EMOJIS.SilentClap })
			.set(1 << 8, { item: `${SpiritEmote.SilentClap} 4`, cost: { hearts: 5 }, emoji: EMOTE_EMOJIS.SilentClap })
			.set(1 << 9, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 10, { item: `${SpiritEmote.Conduct} 1`, cost: null, emoji: EMOTE_EMOJIS.Conduct })
			.set(1 << 11, { item: `${SpiritEmote.Conduct} 2`, cost: { hearts: 3 }, emoji: EMOTE_EMOJIS.Conduct })
			.set(1 << 12, { item: `${SpiritEmote.Conduct} 3`, cost: { candles: 5 }, emoji: EMOTE_EMOJIS.Conduct })
			.set(1 << 13, { item: `${SpiritEmote.Conduct} 4`, cost: { hearts: 5 }, emoji: EMOTE_EMOJIS.Conduct })
			.set(1 << 14, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 15, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 16, { item: `${SpiritEmote.Skipping} 1`, cost: null, emoji: EMOTE_EMOJIS.Skipping })
			.set(1 << 17, { item: `${SpiritEmote.Skipping} 2`, cost: { hearts: 3 }, emoji: EMOTE_EMOJIS.Skipping })
			.set(1 << 18, { item: `${SpiritEmote.Skipping} 3`, cost: { candles: 5 }, emoji: EMOTE_EMOJIS.Skipping })
			.set(1 << 19, { item: `${SpiritEmote.Skipping} 4`, cost: { hearts: 5 }, emoji: EMOTE_EMOJIS.Skipping })
			.set(1 << 20, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 21, { item: "Music sheet 1", cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 22, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 23, { item: "Music sheet 2", cost: { candles: 20 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 24, { item: "Outfit", cost: { candles: 200 }, emoji: OUTFIT_EMOJIS.Outfit37 })
			.set(1 << 25, { item: "Mask", cost: { candles: 50 }, emoji: MASK_EMOJIS.Mask70 }),
	},
});
