import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Laidback;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask14;
const hairEmoji = HAIR_EMOJIS.Hair43;
const heldProp = HELD_PROPS_EMOJIS.HeldProp11;

export default new SeasonalSpirit({
	name: SpiritName.LaidbackPioneer,
	season: SeasonName.Lightseekers,
	stance,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 6 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing2 },
			{ name: "Blessing 2", bit: 1 << 5, cost: { seasonalCandles: 8 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 6, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 7, cost: { seasonalCandles: 10 }, emoji: hairEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing2 },
			{ name: "Blessing 4", bit: 1 << 10, cost: { seasonalCandles: 20 }, emoji: blessing2 },
			{ name: "Umbrella", bit: 1 << 8, emoji: heldProp },
		],
		current: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 2, cost: { candles: 30 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 6, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 7, cost: { candles: 18 }, emoji: hairEmoji },
			{ name: "Umbrella", bit: 1 << 8, cost: { candles: 75 }, emoji: heldProp },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(3, skyDate(2_020, 2, 27))
			.set(23, skyDate(2_020, 11, 26))
			.set(72, skyDate(2_022, 10, 13)),
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
