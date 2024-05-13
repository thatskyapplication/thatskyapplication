/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Anxious;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit29;
const maskEmoji = MASK_EMOJIS.Mask57;
const hairEmoji = HAIR_EMOJIS.Hair100;
const capeEmoji = CAPE_EMOJIS.Cape71;

export default new SeasonalSpirit({
	name: SpiritName.AnxiousAngler,
	season: SeasonName.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Hair", cost: { candles: 45 }, emoji: hairEmoji })
			.set(1 << 12, { name: "heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 3, { name: "Mask", cost: { candles: 35 }, emoji: maskEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing3 })
			.set(1 << 9, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji })
			.set(1 << 10, { name: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji }),
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 3, { name: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { name: "Hair", cost: { seasonalCandles: 14 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 22 }, emoji: blessing3 })
			.set(1 << 9, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 10, { name: "Outfit", cost: { seasonalCandles: 38 }, emoji: outfitEmoji })
			.set(1 << 11, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(105, skyDate(2_024, 1, 18)),
	},
});
