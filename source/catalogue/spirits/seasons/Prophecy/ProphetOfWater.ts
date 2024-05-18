import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.DeepBreath;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask32;
const hairEmoji = HAIR_EMOJIS.Hair65;
const capeEmoji = CAPE_EMOJIS.Cape35;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp20;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfWater,
	season: SeasonName.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 4, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 10, { name: "Blessing 2", cost: { seasonalCandles: 21 }, emoji: blessing2 })
			.set(1 << 11, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 9, { name: "Mask", cost: { seasonalCandles: 27 }, emoji: maskEmoji })
			.set(1 << 12, { name: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 5, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ProphecyHeart }),
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Prop", cost: { candles: 15 }, emoji: placeablePropEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Hair", cost: { candles: 44 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Mask", cost: { candles: 54 }, emoji: maskEmoji })
			.set(1 << 10, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 11, { name: "Cape", cost: { candles: 75 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(41, skyDate(2_021, 8, 5))
			.set(74, skyDate(2_022, 11, 10)),
		returning: [2],
	},
});
