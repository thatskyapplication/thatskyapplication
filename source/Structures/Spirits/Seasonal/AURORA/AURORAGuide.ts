/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.AURORAGuide,
	season: SeasonName.Aurora,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null })
			.set(1 << 1, { item: `${Emote.SilentClap} 2`, cost: { hearts: 3 } })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace23 })
			.set(1 << 3, { item: "Aurora hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair116 })
			.set(1 << 4, { item: "Ultimate outfit", cost: { seasonalHearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit36 })
			.set(1 << 5, { item: "Ultimate cape", cost: { seasonalHearts: 1 }, emoji: CAPE_EMOJIS.Cape95 })
			.set(1 << 6, { item: `${Emote.SilentClap} 1`, cost: null })
			.set(1 << 7, { item: `${Emote.SilentClap} 3`, cost: { candles: 5 } })
			.set(1 << 8, { item: `${Emote.SilentClap} 4`, cost: { hearts: 5 } })
			.set(1 << 9, { item: "Quest 2", cost: null })
			.set(1 << 10, { item: `${Emote.Conduct} 1`, cost: null })
			.set(1 << 11, { item: `${Emote.Conduct} 2`, cost: { hearts: 3 } })
			.set(1 << 12, { item: `${Emote.Conduct} 3`, cost: { candles: 5 } })
			.set(1 << 13, { item: `${Emote.Conduct} 4`, cost: { hearts: 5 } })
			.set(1 << 14, { item: "Quest 3", cost: null })
			.set(1 << 15, { item: "Heart", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 16, { item: `${Emote.Skipping} 1`, cost: null })
			.set(1 << 17, { item: `${Emote.Skipping} 2`, cost: { hearts: 3 } })
			.set(1 << 18, { item: `${Emote.Skipping} 3`, cost: { candles: 5 } })
			.set(1 << 19, { item: `${Emote.Skipping} 4`, cost: { hearts: 5 } })
			.set(1 << 20, { item: "Quest 4", cost: null })
			.set(1 << 21, { item: "Music sheet 1", cost: { candles: 20 } })
			.set(1 << 22, { item: "Quest 5", cost: null })
			.set(1 << 23, { item: "Music sheet 2", cost: { candles: 20 } })
			.set(1 << 24, { item: "Outfit", cost: { candles: 200 }, emoji: OUTFIT_EMOJIS.Outfit37 })
			.set(1 << 25, { item: "Mask", cost: { candles: 50 }, emoji: MASK_EMOJIS.Mask70 }),
	},
});
