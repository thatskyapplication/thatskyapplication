/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	EMOTES_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.RaiseTheRoof;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const emoteEmoji = EMOTES_EMOJIS.RaiseTheRoof;
const outfitEmoji = OUTFIT_EMOJIS.Outfit35;
const maskEmoji = MASK_EMOJIS.Mask69;
const hairEmoji = HAIR_EMOJIS.Hair114;
const capeEmoji = CAPE_EMOJIS.Cape94;

export default new SeasonalSpirit({
	name: SpiritName.MindfulMiner,
	season: SeasonName.Aurora,
	emote,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing3 })
			.set(1 << 3, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Hair", cost: { seasonalCandles: 24 }, emoji: hairEmoji })
			.set(1 << 7, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 9, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 10, { item: "Cape", cost: { seasonalCandles: 32 }, emoji: capeEmoji })
			.set(1 << 11, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AuroraHeart }),
	},
});
