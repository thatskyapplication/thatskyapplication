import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { CAPE_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Acknowledge;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask08;
const capeEmoji = CAPE_EMOJIS.Cape13;

export default new SeasonalSpirit({
	name: SpiritName.SalutingProtector,
	season: SeasonName.Gratitude,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 3, cost: { seasonalCandles: 16 }, emoji: musicSheet },
			{ name: "Blessing", bit: 1 << 2, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Cape", bit: 1 << 9, cost: { seasonalCandles: 20 }, emoji: capeEmoji },
			{ name: "Mask", bit: 1 << 10, cost: { hearts: 5 }, emoji: maskEmoji },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 3, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 9, cost: { candles: 75 }, emoji: capeEmoji },
			{ name: "Mask", bit: 1 << 10, cost: { candles: 42 }, emoji: maskEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set("Error", skyDate(2_020, 5, 28))
			.set(53, skyDate(2_022, 1, 20)),
	},
});
