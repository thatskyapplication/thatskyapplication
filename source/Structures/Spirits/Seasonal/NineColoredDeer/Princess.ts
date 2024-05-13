/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season/index.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const emote = SpiritEmote.FloatSpin;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit55;
const maskEmoji = MASK_EMOJIS.Mask88;
const hairEmoji = HAIR_EMOJIS.Hair139;
const capeEmoji = CAPE_EMOJIS.Cape124;

export default new SeasonalSpirit({
	name: SpiritName.Princess,
	season: SeasonName.NineColoredDeer,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 8 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 18 }, emoji: blessing3 })
			.set(1 << 5, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 22 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Outfit", cost: { seasonalCandles: 26 }, emoji: outfitEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 32 }, emoji: blessing3 })
			.set(1 << 11, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 12, {
				item: "Seasonal heart",
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColoredDeerHeart,
			}),
	},
});
