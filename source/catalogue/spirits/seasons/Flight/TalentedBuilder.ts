import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Voilà;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit25;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace16;
const hairEmoji = HAIR_EMOJIS.Hair91;

export default new SeasonalSpirit({
	name: SpiritName.TalentedBuilder,
	season: SeasonName.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Neck accessory", cost: { candles: 40 }, emoji: necklaceEmoji })
			.set(1 << 12, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 3, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { name: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji })
			.set(1 << 10, { name: "Hair", cost: { candles: 45 }, emoji: hairEmoji }),
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 3, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 4, { name: "Neck accessory", cost: { seasonalCandles: 16 }, emoji: necklaceEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 22 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Trail spell 1", cost: { seasonalCandles: 24 }, emoji: colourTrail })
			.set(1 << 9, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 10, { name: "Hair", cost: { seasonalCandles: 26 }, emoji: hairEmoji })
			.set(1 << 11, { name: "Trail spell 2", cost: null, emoji: colourTrail })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.FlightHeart }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(101, skyDate(2_023, 11, 23)),
	},
});
