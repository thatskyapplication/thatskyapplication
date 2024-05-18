import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
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
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp20;

export default new SeasonalSpirit({
	name: SpiritName.JellyWhisperer,
	season: SeasonName.Sanctuary,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 2, { name: "Music sheet", cost: { seasonalCandles: 6 }, emoji: musicSheet })
			.set(1 << 1, { name: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 5, { name: "Hair", cost: { seasonalCandles: 8 }, emoji: hairEmoji })
			.set(1 << 6, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 9, { name: "Blessing 3", cost: { seasonalCandles: 10 }, emoji: blessing2 })
			.set(1 << 8, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 3, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 3, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { name: "Umbrella", cost: { hearts: 15 }, emoji: placeablePropEmoji })
			.set(1 << 5, { name: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 8, { name: "Outfit", cost: { candles: 65 }, emoji: outfitEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(49, skyDate(2_021, 11, 25))
			.set(95, skyDate(2_023, 8, 31)),
	},
});
