import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Slouch;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const hairEmoji = HAIR_EMOJIS.Hair85;
const capeEmoji = CAPE_EMOJIS.Cape60;

export default new SeasonalSpirit({
	name: SpiritName.SlouchingSoldier,
	season: SeasonName.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { seasonalCandles: 10 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 5, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 7, cost: { seasonalCandles: 14 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { seasonalCandles: 18 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 4, emoji: musicSheet },
			{ name: "Cape", bit: 1 << 10, cost: { seasonalCandles: 22 }, emoji: capeEmoji },
			{ name: "Blessing 3", bit: 1 << 11, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 2,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Heart", bit: 1 << 2, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 4, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 5, cost: { candles: 42 }, emoji: hairEmoji },
			{
				name: "Wing buff",
				bit: 1 << 6,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 7, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 8, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 10, cost: { candles: 70 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			81,
			skyDate(2_023, 2, 16),
		),
	},
});
