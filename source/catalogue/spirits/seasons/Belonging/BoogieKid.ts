import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { MASK_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BoogieDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit10;
const maskEmoji = MASK_EMOJIS.Mask18;

export default new SeasonalSpirit({
	name: SpiritName.BoogieKid,
	season: SeasonName.Belonging,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing1 })
			.set(1 << 8, { name: "Blessing 2", emoji: blessing2 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 10 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 3, { name: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 9, { name: "Outfit", emoji: outfitEmoji })
			.set(1 << 4, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.BelongingHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Mask", cost: { candles: 30 }, emoji: maskEmoji })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { name: "Outfit", cost: { candles: 60 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(22, skyDate(2_020, 11, 12))
			.set(40, skyDate(2_021, 7, 22))
			.set(82, skyDate(2_023, 3, 2)),
	},
});
