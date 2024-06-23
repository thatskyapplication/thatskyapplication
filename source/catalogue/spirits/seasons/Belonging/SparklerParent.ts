import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	SEASON_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	MASK_EMOJIS,
	HAIR_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Sparkler;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask21;
const hairEmoji = HAIR_EMOJIS.Hair47;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.SparklerParent,
	season: SeasonName.Belonging,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 10 }, emoji: blessing1 },
			{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 12 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 9, cost: { seasonalCandles: 14 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 8, emoji: blessing2 },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.BelongingHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 3, cost: { candles: 36 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 9, cost: { candles: 34 }, emoji: hairEmoji },
			{ name: "Pinwheel", bit: 1 << 10, cost: { candles: 33 }, emoji: placeablePropEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(9, skyDate(2_020, 5, 14))
			.set(32, skyDate(2_021, 4, 1))
			.set(51, skyDate(2_021, 12, 23))
			.set(90, skyDate(2_023, 6, 22)),
	},
});
