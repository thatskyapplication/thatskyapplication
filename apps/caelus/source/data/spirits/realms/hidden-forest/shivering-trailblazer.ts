import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Shiver;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	id: SpiritId.ShiveringTrailblazer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShiver1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShiver2,
				cost: { candles: 2 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ShiveringTrailblazerBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ShiveringTrailblazerOutfit,
				cost: { hearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit05,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ShiveringTrailblazerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ShiveringTrailblazerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShiver3,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShiver4,
				cost: { candles: 3 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ShiveringTrailblazerBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ShiveringTrailblazerHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair10,
			},
		],
	},
});
