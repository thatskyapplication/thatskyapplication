import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Grateful;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const hairEmoji = HAIR_EMOJIS.Hair64;
const capeEmoji = CAPE_EMOJIS.Cape32;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp17;

export default new SeasonalSpirit({
	name: SpiritName.GratefulShellCollector,
	season: SeasonName.Sanctuary,
	emote,
	realm: RealmName.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing2 })
			.set(1 << 4, { name: "Hair", emoji: hairEmoji })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 10, { name: "Cape", cost: { seasonalCandles: 18 }, emoji: capeEmoji })
			.set(1 << 9, { name: "Blessing 2", emoji: blessing2 })
			.set(1 << 5, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Chairs", cost: { candles: 45 }, emoji: placeablePropEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Hair", cost: { candles: 34 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(45, skyDate(2_021, 9, 30))
			.set(88, skyDate(2_023, 5, 25)),
	},
});
