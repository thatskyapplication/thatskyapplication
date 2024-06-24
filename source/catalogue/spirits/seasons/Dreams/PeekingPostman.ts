import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
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
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{ name: "Outfit", bit: 1 << 11, cost: { seasonalCandles: 21 }, emoji: outfitEmoji },
			{ name: "Blessing 2", bit: 1 << 10, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 9, cost: { seasonalCandles: 27 }, emoji: capeEmoji },
			{ name: "Rabbit mask", bit: 1 << 4, emoji: maskEmoji },
			{ name: "Seasonal heart", bit: 1 << 5, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 2, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Rabbit mask", bit: 1 << 4, cost: { candles: 54 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 5, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 6, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Cape", bit: 1 << 9, cost: { candles: 65 }, emoji: capeEmoji },
			{ name: "Blessing 2", bit: 1 << 10, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 11, cost: { candles: 70 }, emoji: outfitEmoji },
		],
	},
	keywords: ["rabbit", "rabbit mask"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(64, skyDate(2_022, 6, 23)),
	},
});
