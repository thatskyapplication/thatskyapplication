import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Respect;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask26;
const hairEmoji = HAIR_EMOJIS.Hair51;
const heldProp = HELD_PROPS_EMOJIS.HeldProp15;

export default new SeasonalSpirit({
	name: SpiritName.RespectfulPianist,
	seasonId: SeasonId.Rhythm,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRespect1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteRespect2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.RespectfulPianistHair,
				cost: { seasonalCandles: 14 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.RespectfulPianistBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRespect3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteRespect4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RespectfulPianistBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing2,
			},
			{ name: "Winter piano", cosmetic: Cosmetic.RespectfulPianistWinterPiano, emoji: heldProp },
			{
				name: "Duck mask",
				cosmetic: Cosmetic.RespectfulPianistMask,
				cost: { seasonalCandles: 20 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.RespectfulPianistBlessing3, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RhythmHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteRespect1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteRespect2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RespectfulPianistBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RespectfulPianistHair,
				cost: { candles: 26 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RespectfulPianistSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RespectfulPianistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteRespect3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteRespect4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RespectfulPianistBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Winter piano",
				cosmetic: Cosmetic.RespectfulPianistWinterPiano,
				cost: { candles: 75 },
				emoji: heldProp,
			},
			{
				name: "Duck mask",
				cosmetic: Cosmetic.RespectfulPianistMask,
				cost: { candles: 48 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			28,
			skyDate(2_021, 2, 4),
		),
		returning: [3],
	},
});
