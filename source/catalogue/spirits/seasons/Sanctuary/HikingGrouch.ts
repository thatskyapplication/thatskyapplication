import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
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
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp22;

export default new SeasonalSpirit({
	name: SpiritName.HikingGrouch,
	season: SeasonName.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 4, { name: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 14 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { name: "Hair", cost: { seasonalCandles: 16 }, emoji: hairEmoji })
			.set(1 << 10, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 12, { name: "Blessing 3", cost: { seasonalCandles: 18 }, emoji: blessing2 })
			.set(1 << 11, { name: "Bow tie", cost: null, emoji: necklaceEmoji })
			.set(1 << 5, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Beach chairs", cost: { hearts: 16 }, emoji: placeablePropEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Mask", cost: { candles: 34 }, emoji: maskEmoji })
			.set(1 << 5, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 10, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 11, { name: "Bow tie", cost: { candles: 50 }, emoji: necklaceEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(55, skyDate(2_022, 2, 17)),
		returning: [4],
	},
});
