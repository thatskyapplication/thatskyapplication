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
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Grumpy;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask31;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace07;
const hairEmoji = HAIR_EMOJIS.Hair63;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13;

export default new SeasonalSpirit({
	name: SpiritName.HikingGrouch,
	season: SeasonName.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 4, emoji: maskEmoji },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 14 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 9, cost: { seasonalCandles: 16 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 10, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 12, cost: { seasonalCandles: 18 }, emoji: blessing2 },
			{ name: "Bow tie", bit: 1 << 11, emoji: necklaceEmoji },
			{ name: "Seasonal heart", bit: 1 << 5, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Beach chairs", bit: 1 << 2, cost: { hearts: 16 }, emoji: placeablePropEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 4, cost: { candles: 34 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 5, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 6, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 9, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 10, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Bow tie", bit: 1 << 11, cost: { candles: 50 }, emoji: necklaceEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(55, skyDate(2_022, 2, 17)),
		returning: [4],
	},
});
