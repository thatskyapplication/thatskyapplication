import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Juggle;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit12;
const hairEmoji = HAIR_EMOJIS.Hair50;
const capeEmoji = CAPE_EMOJIS.Cape23;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp16;

export default new SeasonalSpirit({
	name: SpiritName.TroupeJuggler,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 4, cost: { seasonalCandles: 12 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 14 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 10, emoji: capeEmoji },
			{ name: "Outfit", bit: 1 << 11, cost: { seasonalCandles: 18 }, emoji: outfitEmoji },
			{ name: "Blessing 3", bit: 1 << 12, emoji: blessing2 },
			{ name: "Seasonal heart", bit: 1 << 5, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Prop", bit: 1 << 2, cost: { hearts: 14 }, emoji: placeablePropEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 4, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 5, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 6, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 10, cost: { candles: 75 }, emoji: capeEmoji },
			{ name: "Outfit", bit: 1 << 11, cost: { candles: 75 }, emoji: outfitEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(44, skyDate(2_021, 9, 16))
			.set(99, skyDate(2_023, 10, 26)),
	},
});
