import { Cosmetic, RealmName, SeasonId, SpiritEmote, SpiritId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.DontGo;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask20;
const capeEmoji = CAPE_EMOJIS.Cape21;
const heldProp = HELD_PROPS_EMOJIS.HeldProp13;

export default new SeasonalSpirit({
	id: SpiritId.PleafulParent,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDontGo1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteDontGo2, emoji: emoteEmoji },
			{
				name: "Blessing",
				cosmetic: Cosmetic.PleafulParentBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{ name: "Guitar", cosmetic: Cosmetic.PleafulParentGuitar, emoji: heldProp },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDontGo3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteDontGo4, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.PleafulParentMask,
				cost: { seasonalCandles: 18 },
				emoji: maskEmoji,
			},
			{ name: "Cape", cosmetic: Cosmetic.PleafulParentCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PleafulParentSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteDontGo1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteDontGo2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.PleafulParentBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PleafulParentMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.PleafulParentSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.PleafulParentWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteDontGo3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteDontGo4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PleafulParentBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.PleafulParentCape,
				cost: { candles: 65 },
				emoji: capeEmoji,
			},
			{
				name: "Guitar",
				cosmetic: Cosmetic.PleafulParentGuitar,
				cost: { candles: 75 },
				emoji: heldProp,
			},
		],
	},
	visits: {
		travelling: [5, 24, 77, 125],
	},
});
