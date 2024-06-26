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

const emote = SpiritEmote.DustOff;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask33;
const hairEmoji = HAIR_EMOJIS.Hair66;
const capeEmoji = CAPE_EMOJIS.Cape36;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp13;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfEarth,
	season: SeasonName.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 4, cost: { seasonalCandles: 12 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 9, cost: { seasonalCandles: 21 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 10, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 11, cost: { seasonalCandles: 27 }, emoji: capeEmoji },
			{ name: "Mask", bit: 1 << 12, emoji: maskEmoji },
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
			{ name: "Music sheet", bit: 1 << 9, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 10, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 11, cost: { candles: 75 }, emoji: capeEmoji },
			{ name: "Mask", bit: 1 << 12, cost: { candles: 44 }, emoji: maskEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set("Error", skyDate(2_022, 1, 6))
			.set(54, skyDate(2_022, 2, 3)),
		returning: [2],
	},
});
