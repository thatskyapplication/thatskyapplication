/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { CAPE_EMOJIS, EMOTES_EMOJIS, HAIR_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Stretch;
const emoteEmoji = EMOTES_EMOJIS.Stretch;
const hairEmoji = HAIR_EMOJIS.Hair87;
const capeEmoji = CAPE_EMOJIS.Cape61;

export default new SeasonalSpirit({
	name: SpiritName.StretchingLamplighter,
	season: SeasonName.LittlePrince,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 10 } })
			.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Cape", cost: { seasonalCandles: 22 }, emoji: capeEmoji })
			.set(1 << 7, { item: "Blessing 2", cost: null })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.LittlePrinceHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 8, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Hair", cost: { candles: 44 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 4, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 5, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 7, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(102, skyDate(2_023, 12, 7)),
	},
});
