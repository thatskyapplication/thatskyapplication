import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.ChestPound;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit17;
const maskEmoji = MASK_EMOJIS.Mask35;
const hairEmoji = HAIR_EMOJIS.Hair68;
const placeablePropEmoji1 = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp22;
const placeablePropEmoji2 = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp31;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfFire,
	season: SeasonName.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 13 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { seasonalCandles: 23 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 8, emoji: musicSheet },
			{ name: "Mask", bit: 1 << 10, cost: { seasonalCandles: 29 }, emoji: maskEmoji },
			{ name: "Outfit", bit: 1 << 12, emoji: outfitEmoji },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ProphecyHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Prop", bit: 1 << 13, cost: { candles: 15 }, emoji: placeablePropEmoji2 },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 44 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 8, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 9, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 10, cost: { candles: 54 }, emoji: maskEmoji },
			{ name: "Cauldron", bit: 1 << 11, cost: { hearts: 13 }, emoji: placeablePropEmoji1 },
			{ name: "Outfit", bit: 1 << 12, cost: { candles: 75 }, emoji: outfitEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(50, skyDate(2_021, 12, 9))
			.set(93, skyDate(2_023, 8, 3)),
	},
});
