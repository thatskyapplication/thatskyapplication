/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

const emote = SpiritEmote.ChestPound;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit17;
const maskEmoji = MASK_EMOJIS.Mask35;
const hairEmoji = HAIR_EMOJIS.Hair68;
const placeablePropEmoji1 = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp21;
const placeablePropEmoji2 = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp31;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfFire,
	season: SeasonName.Prophecy,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 13 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Blessing 2", cost: { seasonalCandles: 23 }, emoji: blessing2 })
			.set(1 << 8, { item: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 10, { item: "Mask", cost: { seasonalCandles: 29 }, emoji: maskEmoji })
			.set(1 << 12, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ProphecyHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 13, { item: "Prop", cost: { candles: 15 }, emoji: placeablePropEmoji2 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: { candles: 44 }, emoji: hairEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { item: "Mask", cost: { candles: 54 }, emoji: maskEmoji })
			.set(1 << 11, { item: "Cauldron", cost: { hearts: 13 }, emoji: placeablePropEmoji1 })
			.set(1 << 12, { item: "Outfit", cost: { candles: 75 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(50, skyDate(2_021, 12, 9))
			.set(93, skyDate(2_023, 8, 3)),
	},
});
