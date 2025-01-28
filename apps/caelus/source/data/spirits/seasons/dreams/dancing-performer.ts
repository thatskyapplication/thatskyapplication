import {
	Cosmetic,
	RealmName,
	SeasonId,
	SpiritEmote,
	SpiritName,
} from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.ShowDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask38;
const hairEmoji = HAIR_EMOJIS.Hair71;
const capeEmoji = CAPE_EMOJIS.Cape44;
const heldProp = HELD_PROPS_EMOJIS.HeldProp20;

export default new SeasonalSpirit({
	name: SpiritName.DancingPerformer,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShowDance1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteShowDance2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DancingPerformerBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.DancingPerformerHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShowDance3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteShowDance4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DancingPerformerBlessing2,
				cost: { seasonalCandles: 21 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.DancingPerformerMask, emoji: maskEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.DancingPerformerCape,
				cost: { seasonalCandles: 27 },
				emoji: capeEmoji,
			},
			{ name: "Lute", cosmetic: Cosmetic.DancingPerformerLute, emoji: heldProp },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DreamsHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShowDance1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShowDance2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DancingPerformerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DancingPerformerHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DancingPerformerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.DancingPerformerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShowDance3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShowDance4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.DancingPerformerMask,
				cost: { candles: 48 },
				emoji: maskEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DancingPerformerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Lute",
				cosmetic: Cosmetic.DancingPerformerLute,
				cost: { candles: 70 },
				emoji: heldProp,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.DancingPerformerCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [112],
	},
});
