import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

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
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 5, { name: "Hair", emoji: hairEmoji })
			.set(1 << 7, { name: `${emote} 3`, cost: { seasonalCandles: 14 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: { seasonalCandles: 18 }, emoji: blessing2 })
			.set(1 << 4, { name: "Music sheet", emoji: musicSheet })
			.set(1 << 10, { name: "Cape", cost: { seasonalCandles: 22 }, emoji: capeEmoji })
			.set(1 << 11, { name: "Blessing 3", emoji: blessing2 })
			.set(1 << 2, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.LittlePrinceHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 5, { name: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 6, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 10, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(81, skyDate(2_023, 2, 16)),
	},
});
