import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../utility/spirits.js";

const call = SpiritCall.Jellyfish;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit15;
const hairEmoji = HAIR_EMOJIS.Hair60;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp21;

export default new SeasonalSpirit({
	name: SpiritName.JellyWhisperer,
	seasonId: SeasonId.Sanctuary,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallJellyfish, emoji: callEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.JellyWhispererMusicSheet,
				cost: { seasonalCandles: 6 },
				emoji: musicSheet,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.JellyWhispererBlessing1, emoji: blessing2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.JellyWhispererHair,
				cost: { seasonalCandles: 8 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.JellyWhispererBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.JellyWhispererBlessing3,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{ name: "Outfit", cosmetic: Cosmetic.JellyWhispererOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.SanctuaryHeart,
			},
		],
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallJellyfish, emoji: callEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.JellyWhispererBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.JellyWhispererMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.JellyWhispererSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.JellyWhispererWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.JellyWhispererBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Umbrella",
				cosmetic: Cosmetic.JellyWhispererUmbrella,
				cost: { hearts: 15 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.JellyWhispererHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.JellyWhispererOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(49, skyDate(2_021, 11, 25))
			.set(95, skyDate(2_023, 8, 31)),
	},
});
