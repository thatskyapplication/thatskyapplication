/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	EMOTE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Emote, SeasonalSpirit, SpiritName } from "../../Base.js";

const emote = Emote.Chuckle;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTE_EMOJIS.Chuckle;
const outfitEmoji = OUTFIT_EMOJIS.Outfit20;
const maskEmoji = MASK_EMOJIS.Mask46;
const placeablePropEmoji = PLACEABLE_PROPS_EMOJIS.PlaceableProp15;

export default new SeasonalSpirit({
	name: SpiritName.ChucklingScout,
	season: SeasonName.Assembly,
	emote,
	realm: Realm.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { item: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 14 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: { seasonalCandles: 17 }, emoji: blessing2 })
			.set(1 << 8, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 10, { item: "Prop", cost: { seasonalCandles: 20 }, emoji: placeablePropEmoji })
			.set(1 << 11, { item: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AssemblyHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Mask", cost: { candles: 36 }, emoji: maskEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { item: "Prop", cost: { candles: 45 }, emoji: placeablePropEmoji }),
	},
	visits: {
		returning: [1],
	},
});
