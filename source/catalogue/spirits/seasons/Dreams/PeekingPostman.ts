import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Peek;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit18;
const maskEmoji = MASK_EMOJIS.Mask37;
const capeEmoji = CAPE_EMOJIS.Cape43;

export default new SeasonalSpirit({
	name: SpiritName.PeekingPostman,
	season: SeasonName.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 2, { name: "Music sheet", cost: { seasonalCandles: 12 }, emoji: musicSheet })
			.set(1 << 3, { name: "Blessing 1", emoji: blessing2 })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 11, { name: "Outfit", cost: { seasonalCandles: 21 }, emoji: outfitEmoji })
			.set(1 << 10, { name: "Blessing 2", emoji: blessing2 })
			.set(1 << 9, { name: "Cape", cost: { seasonalCandles: 27 }, emoji: capeEmoji })
			.set(1 << 4, { name: "Rabbit mask", emoji: maskEmoji })
			.set(1 << 5, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Rabbit mask", cost: { candles: 54 }, emoji: maskEmoji })
			.set(1 << 5, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Cape", cost: { candles: 65 }, emoji: capeEmoji })
			.set(1 << 10, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 11, { name: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji }),
	},
	keywords: ["rabbit", "rabbit mask"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(64, skyDate(2_022, 6, 23)),
	},
});
