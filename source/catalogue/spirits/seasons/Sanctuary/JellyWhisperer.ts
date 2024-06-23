import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.Jellyfish;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit15;
const hairEmoji = HAIR_EMOJIS.Hair60;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp21;

export default new SeasonalSpirit({
	name: SpiritName.JellyWhisperer,
	season: SeasonName.Sanctuary,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Music sheet", bit: 1 << 2, cost: { seasonalCandles: 6 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 5, cost: { seasonalCandles: 8 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 6, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 9, cost: { seasonalCandles: 10 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 8, emoji: outfitEmoji },
			{ name: "Seasonal heart", bit: 1 << 3, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart },
		],
		current: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 2, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Umbrella", bit: 1 << 7, cost: { hearts: 15 }, emoji: placeablePropEmoji },
			{ name: "Hair", bit: 1 << 5, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Outfit", bit: 1 << 8, cost: { candles: 65 }, emoji: outfitEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(49, skyDate(2_021, 11, 25))
			.set(95, skyDate(2_023, 8, 31)),
	},
});
