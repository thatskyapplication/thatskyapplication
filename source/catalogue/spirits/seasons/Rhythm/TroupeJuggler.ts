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
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp15;

export default new SeasonalSpirit({
	name: SpiritName.TroupeJuggler,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 4, { name: "Hair", cost: { seasonalCandles: 12 }, emoji: hairEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 14 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 10, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 11, { name: "Outfit", cost: { seasonalCandles: 18 }, emoji: outfitEmoji })
			.set(1 << 12, { name: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 5, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart }),
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Prop", cost: { hearts: 14 }, emoji: placeablePropEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { name: "Cape", cost: { candles: 75 }, emoji: capeEmoji })
			.set(1 << 11, { name: "Outfit", cost: { candles: 75 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(44, skyDate(2_021, 9, 16))
			.set(99, skyDate(2_023, 10, 26)),
	},
});
