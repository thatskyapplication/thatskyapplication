/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	EMOTES_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Gloat;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTES_EMOJIS.Gloat;
const outfitEmoji = OUTFIT_EMOJIS.Outfit21;
const hairEmoji = HAIR_EMOJIS.Hair86;

export default new SeasonalSpirit({
	name: SpiritName.GloatingNarcissist,
	season: SeasonName.LittlePrince,
	emote,
	realm: Realm.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing2 })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 22 }, emoji: blessing2 })
			.set(1 << 7, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 8, { item: "Hair", cost: { seasonalCandles: 26 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.LittlePrinceHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 10, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 8, { item: "Hair", cost: { candles: 46 }, emoji: hairEmoji })
			.set(1 << 11, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 4, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { item: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(92, skyDate(2_023, 7, 20)),
	},
});
