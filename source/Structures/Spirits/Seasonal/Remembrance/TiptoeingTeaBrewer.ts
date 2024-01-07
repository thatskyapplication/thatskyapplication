/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	EMOTES_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Tiptoeing;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const emoteEmoji = EMOTES_EMOJIS.Tiptoeing;
const outfitEmoji = OUTFIT_EMOJIS.Outfit41;
const hairEmoji = HAIR_EMOJIS.Hair121;
const capeEmoji = CAPE_EMOJIS.Cape103;

export default new SeasonalSpirit({
	name: SpiritName.TiptoeingTeaBrewer,
	season: SeasonName.Remembrance,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 24 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 34 }, emoji: blessing3 })
			.set(1 << 7, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 38 }, emoji: capeEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart }),
	},
});
