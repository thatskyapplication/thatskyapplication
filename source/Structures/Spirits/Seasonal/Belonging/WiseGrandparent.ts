/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	STANCE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

const stance = SpiritStance.Wise;
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const stanceEmoji = STANCE_EMOJIS.Wise;
const maskEmoji = MASK_EMOJIS.Mask19;
const capeEmoji = CAPE_EMOJIS.Cape22;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp09;

export default new SeasonalSpirit({
	name: SpiritName.WiseGrandparent,
	season: SeasonName.Belonging,
	stance,
	realm: Realm.VaultOfKnowledge,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing1 })
			.set(1 << 1, { item: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 8, { item: "Mask", cost: { seasonalCandles: 14 }, emoji: maskEmoji })
			.set(1 << 10, { item: "Blessing 4", cost: null, emoji: blessing2 })
			.set(1 << 11, { item: "Blessing 5", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 6, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 2, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.BelongingHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 2, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji })
			.set(1 << 7, { item: "Prop", cost: { candles: 10 }, emoji: placeablePropEmoji })
			.set(1 << 8, { item: "Mask", cost: { candles: 48 }, emoji: maskEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(15, skyDate(2_020, 8, 6))
			.set(48, skyDate(2_021, 11, 11))
			.set(100, skyDate(2_023, 11, 9)),
	},
});
