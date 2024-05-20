import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.PullUp;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairEmoji = HAIR_EMOJIS.Hair124;
const capeEmoji = CAPE_EMOJIS.Cape103;
const heldProp = HELD_PROPS_EMOJIS.HeldProp34;

export default new SeasonalSpirit({
	name: SpiritName.OveractiveOverachiever,
	season: SeasonName.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 3, { name: "Manta ocarina", cost: null, emoji: heldProp })
			.set(1 << 4, { name: `${emote} 3`, cost: { seasonalCandles: 22 }, emoji: emoteEmoji })
			.set(1 << 5, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { name: "Cape", cost: { seasonalCandles: 30 }, emoji: capeEmoji })
			.set(1 << 7, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 32 }, emoji: blessing3 })
			.set(1 << 9, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PassageHeart }),
	},
});
