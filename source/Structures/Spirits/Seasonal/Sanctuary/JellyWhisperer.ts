/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

const call = SpiritCall.Jellyfish;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit15;
const hairEmoji = HAIR_EMOJIS.Hair60;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp20;

export default new SeasonalSpirit({
	name: SpiritName.JellyWhisperer,
	season: SeasonName.Sanctuary,
	call,
	realm: Realm.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 2, { item: "Music sheet", cost: { seasonalCandles: 6 }, emoji: musicSheet })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 5, { item: "Hair", cost: { seasonalCandles: 8 }, emoji: hairEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 9, { item: "Blessing 3", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 8, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { item: "Umbrella", cost: { hearts: 15 }, emoji: placeablePropEmoji })
			.set(1 << 5, { item: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 8, { item: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(49, skyDate(2_021, 11, 25))
			.set(95, skyDate(2_023, 8, 31)),
	},
});
