import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.EvilLaugh;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask54;
const hairEmoji = HAIR_EMOJIS.Hair98;
const capeEmoji = CAPE_EMOJIS.Cape70;

export default new SeasonalSpirit({
	name: SpiritName.CacklingCannoneer,
	season: SeasonName.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Mask", cost: { candles: 40 }, emoji: maskEmoji })
			.set(1 << 12, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 11, { name: "Hair", cost: { candles: 50 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 8, { name: "Cape", cost: { candles: 70 }, emoji: capeEmoji })
			.set(1 << 3, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet }),
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 3, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 4, { name: "Mask", cost: { seasonalCandles: 16 }, emoji: maskEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Cape", cost: { seasonalCandles: 26 }, emoji: capeEmoji })
			.set(1 << 9, { name: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { name: "Blessing 4", cost: { seasonalCandles: 34 }, emoji: blessing3 })
			.set(1 << 11, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
	visits: {
		returning: [4],
	},
});
