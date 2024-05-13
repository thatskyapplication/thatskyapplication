import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.HandRub;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace14;
const capeEmoji = CAPE_EMOJIS.Cape59;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.StarCollector,
	season: SeasonName.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Necktie", cost: { seasonalCandles: 12 }, emoji: necklaceEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 4, { name: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 5, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { name: "Blessing 2", cost: { seasonalCandles: 20 }, emoji: blessing2 })
			.set(1 << 7, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 8, { name: "Prop", cost: { seasonalCandles: 24 }, emoji: placeablePropEmoji })
			.set(1 << 9, { name: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.LittlePrinceHeart }),
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 10, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { name: "Necktie", cost: { candles: 40 }, emoji: necklaceEmoji })
			.set(1 << 11, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 5, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 6, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { name: "Cape", cost: { candles: 75 }, emoji: capeEmoji })
			.set(1 << 8, { name: "Prop", cost: { candles: 70 }, emoji: placeablePropEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(96, skyDate(2_023, 9, 14)),
	},
});
