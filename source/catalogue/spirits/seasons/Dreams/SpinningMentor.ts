import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.SpinTrick;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask39;
const hairEmoji = HAIR_EMOJIS.Hair72;
const capeEmoji = CAPE_EMOJIS.Cape45;

export default new SeasonalSpirit({
	name: SpiritName.SpinningMentor,
	season: SeasonName.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 3, cost: { seasonalCandles: 13 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 2, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 8, cost: { seasonalCandles: 23 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 9, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 11, cost: { seasonalCandles: 29 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 10, emoji: capeEmoji },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 44 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 8, cost: { candles: 42 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 10, cost: { candles: 70 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(59, skyDate(2_022, 4, 14))
			.set(91, skyDate(2_023, 7, 6)),
	},
});
