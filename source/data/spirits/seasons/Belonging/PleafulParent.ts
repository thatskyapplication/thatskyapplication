import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.DontGo;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask20;
const capeEmoji = CAPE_EMOJIS.Cape21;
const heldProp = HELD_PROPS_EMOJIS.HeldProp13;

export default new SeasonalSpirit({
	name: SpiritName.PleafulParent,
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
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(5, skyDate(2_020, 3, 26))
			.set(24, skyDate(2_020, 12, 10))
			.set(77, skyDate(2_022, 12, 22))
			.set(125, skyDate(2_024, 10, 24)),
	},
});
