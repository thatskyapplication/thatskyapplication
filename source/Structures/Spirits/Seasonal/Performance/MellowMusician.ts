/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season/index.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const emote = SpiritEmote.Headbob;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask64;
const hairEmoji = HAIR_EMOJIS.Hair107;
const capeEmoji = CAPE_EMOJIS.Cape80;
const heldProp = HELD_PROPS_EMOJIS.HeldProp25;

export default new SeasonalSpirit({
	name: SpiritName.MellowMusician,
	season: SeasonName.Performance,
	emote,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 5, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 22 }, emoji: blessing3 })
			.set(1 << 9, { item: "Electric guitar", cost: null, emoji: heldProp })
			.set(1 << 10, { item: "Hair", cost: { seasonalCandles: 36 }, emoji: hairEmoji })
			.set(1 << 11, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
});
