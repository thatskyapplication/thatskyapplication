import {
	Cosmetic,
	RealmName,
	SpiritEmote,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Float;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	id: SpiritId.MeditatingMonastic,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFloat1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteFloat2,
				cost: { candles: 10 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MeditatingMonasticBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MeditatingMonasticHair,
				cost: { hearts: 10 },
				emoji: HAIR_EMOJIS.Hair29,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MeditatingMonasticHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MeditatingMonasticWingBuff,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFloat3,
				cost: { candles: 7 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteFloat4,
				cost: { candles: 10 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MeditatingMonasticBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Chair",
				cosmetic: Cosmetic.MeditatingMonasticChair,
				cost: { hearts: 30 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp01,
			},
		],
	},
});
