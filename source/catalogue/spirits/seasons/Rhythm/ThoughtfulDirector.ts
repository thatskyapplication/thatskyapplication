import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Thinking;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask25;
const capeEmoji = CAPE_EMOJIS.Cape24;
const heldProp = HELD_PROPS_EMOJIS.HeldProp16;

export default new SeasonalSpirit({
	name: SpiritName.ThoughtfulDirector,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Xylophone", bit: 1 << 9, cost: { seasonalCandles: 20 }, emoji: heldProp },
			{ name: "Blessing 2", bit: 1 << 8, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 11, cost: { seasonalCandles: 22 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 10, emoji: capeEmoji },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 3, cost: { candles: 42 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Xylophone", bit: 1 << 9, cost: { candles: 65 }, emoji: heldProp },
			{ name: "Cape", bit: 1 << 10, cost: { candles: 75 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(35, skyDate(2_021, 5, 13))
			.set(67, skyDate(2_022, 8, 4))
			.set(116, skyDate(2_024, 6, 20)),
		returning: [3],
	},
});
