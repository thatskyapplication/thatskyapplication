import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Facepalm;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask49;
const hairEmoji = HAIR_EMOJIS.Hair80;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp10;

export default new SeasonalSpirit({
	name: SpiritName.BaffledBotanist,
	season: SeasonName.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 8, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 12 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 3, { name: "Mask", cost: { seasonalCandles: 14 }, emoji: maskEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 11, { name: "Blessing 3", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 10, { name: "Prop", cost: null, emoji: placeablePropEmoji })
			.set(1 << 4, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AssemblyHeart }),
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Mask", cost: { candles: 24 }, emoji: maskEmoji })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Hair", cost: { candles: 45 }, emoji: hairEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { name: "Prop", cost: { candles: 45 }, emoji: placeablePropEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(78, skyDate(2_023, 1, 5)),
		returning: [1],
	},
});
