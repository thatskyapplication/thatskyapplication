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
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../utility/spirits.js";

const call = SpiritCall.Crab;
const callEmoji = SpiritCallToEmoji[call];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask16;
const hairEmoji = HAIR_EMOJIS.Hair40;
const capeEmoji = CAPE_EMOJIS.Cape16;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp15;

export default new SeasonalSpirit({
	name: SpiritName.CrabWhisperer,
	seasonId: SeasonId.Lightseekers,
	call,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallCrab, emoji: callEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.CrabWhispererMask,
				cost: { seasonalCandles: 12 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.CrabWhispererBlessing1, emoji: blessing2 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CrabWhispererBlessing2,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.CrabWhispererMusicSheet, emoji: musicSheet },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.CrabWhispererBlessing3,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.CrabWhispererBlessing4, emoji: blessing2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.CrabWhispererHair,
				cost: { seasonalCandles: 18 },
				emoji: hairEmoji,
			},
			{ name: "Cape", cosmetic: Cosmetic.CrabWhispererCape, emoji: capeEmoji },
		],
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallCrab, emoji: callEmoji },
			{
				name: "Pipe",
				cosmetic: Cosmetic.CrabWhispererPipe,
				cost: { candles: 20 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CrabWhispererBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.CrabWhispererMask,
				cost: { candles: 30 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CrabWhispererHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CrabWhispererWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CrabWhispererBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.CrabWhispererMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CrabWhispererHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CrabWhispererCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(6, skyDate(2_020, 4, 9))
			.set(43, skyDate(2_021, 9, 1)),
		returning: [4],
	},
});
