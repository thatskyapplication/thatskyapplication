import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
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
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

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
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 4, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 10, cost: { seasonalCandles: 21 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 11, emoji: capeEmoji },
			{ name: "Mask", bit: 1 << 9, cost: { seasonalCandles: 27 }, emoji: maskEmoji },
			{ name: "Blessing 3", bit: 1 << 12, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 5,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.ProphecyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Prop", bit: 1 << 2, cost: { candles: 15 }, emoji: placeablePropEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 4, cost: { candles: 44 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 5, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 6,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 7, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 9, cost: { candles: 54 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 10, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 11, cost: { candles: 75 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(41, skyDate(2_021, 8, 5))
			.set(74, skyDate(2_022, 11, 10)),
		returning: [2],
	},
});
