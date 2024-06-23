import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

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
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 2, { name: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 3, { name: "Blessing 1", emoji: blessing3 })
			.set(1 << 4, { name: "Blessing 2", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 5, { name: "Cape", emoji: capeEmoji })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 22 }, emoji: blessing3 })
			.set(1 << 9, { name: "Electric guitar", emoji: heldProp })
			.set(1 << 10, { name: "Hair", cost: { seasonalCandles: 36 }, emoji: hairEmoji })
			.set(1 << 11, { name: "Blessing 4", emoji: blessing3 })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
});
