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
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Wise;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask19;
const capeEmoji = CAPE_EMOJIS.Cape22;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp09;

export default new SeasonalSpirit({
	name: SpiritName.WiseGrandparent,
	season: SeasonName.Belonging,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { seasonalCandles: 10 }, emoji: blessing1 },
			{ name: "Music sheet", bit: 1 << 1, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 5, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 8, cost: { seasonalCandles: 14 }, emoji: maskEmoji },
			{ name: "Blessing 4", bit: 1 << 10, emoji: blessing2 },
			{ name: "Blessing 5", bit: 1 << 11, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 6, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 2,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Music sheet", bit: 1 << 1, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Heart", bit: 1 << 2, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{
				name: "Wing buff",
				bit: 1 << 4,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 6, cost: { candles: 70 }, emoji: capeEmoji },
			{ name: "Prop", bit: 1 << 7, cost: { candles: 10 }, emoji: placeablePropEmoji },
			{ name: "Mask", bit: 1 << 8, cost: { candles: 48 }, emoji: maskEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(15, skyDate(2_020, 8, 6))
			.set(48, skyDate(2_021, 11, 11))
			.set(100, skyDate(2_023, 11, 9)),
	},
});
