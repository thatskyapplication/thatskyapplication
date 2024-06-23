import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	SEASON_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.SpinDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit13;
const hairEmoji = HAIR_EMOJIS.Hair49;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp18;

export default new SeasonalSpirit({
	name: SpiritName.FestivalSpinDancer,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 3, { name: "Music sheet", emoji: musicSheet })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 12 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, emoji: emoteEmoji })
			.set(1 << 9, { name: "Hair", cost: { seasonalCandles: 14 }, emoji: hairEmoji })
			.set(1 << 11, { name: "Outfit", emoji: outfitEmoji })
			.set(1 << 4, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart }),
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 5 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 10 }, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { name: "Hair", cost: { candles: 34 }, emoji: hairEmoji })
			.set(1 << 10, { name: "Prop", cost: { candles: 30 }, emoji: placeablePropEmoji })
			.set(1 << 11, { name: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(17, skyDate(2_020, 9, 3))
			.set(46, skyDate(2_021, 10, 14))
			.set(103, skyDate(2_023, 12, 21)),
	},
});
