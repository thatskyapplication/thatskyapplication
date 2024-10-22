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
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Headbob;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask64;
const hairEmoji = HAIR_EMOJIS.Hair107;
const capeEmoji = CAPE_EMOJIS.Cape80;
const heldProp = HELD_PROPS_EMOJIS.HeldProp25;

export default new SeasonalSpirit({
	name: SpiritName.MellowMusician,
	seasonId: SeasonId.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHeadbob1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteHeadbob2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.MellowMusicianMask,
				cost: { seasonalCandles: 12 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.MellowMusicianBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MellowMusicianBlessing2,
				cost: { seasonalCandles: 14 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.MellowMusicianCape, emoji: capeEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHeadbob3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteHeadbob4, emoji: emoteEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.MellowMusicianBlessing3,
				cost: { seasonalCandles: 22 },
				emoji: blessing3,
			},
			{ name: "Electric guitar", cosmetic: Cosmetic.MellowMusicianElectricGuitar, emoji: heldProp },
			{
				name: "Hair",
				cosmetic: Cosmetic.MellowMusicianHair,
				cost: { seasonalCandles: 36 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.MellowMusicianBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteHeadbob1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteHeadbob2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MellowMusicianBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.MellowMusicianMask,
				cost: { candles: 32 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MellowMusicianSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MellowMusicianWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteHeadbob3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteHeadbob4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.MellowMusicianCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MellowMusicianBlessing2,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MellowMusicianHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Electric guitar",
				cosmetic: Cosmetic.MellowMusicianElectricGuitar,
				cost: { candles: 80 },
				emoji: heldProp,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			119,
			skyDate(2_024, 8, 1),
		),
	},
});
