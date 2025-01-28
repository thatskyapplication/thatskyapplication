import { Cosmetic, RealmName, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { StandardSpirit } from "../../../../models/Spirits.js";
import {
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Laugh;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new StandardSpirit({
	name: SpiritName.LaughingLightCatcher,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLaugh1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteLaugh2,
				cost: { candles: 1 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LaughingLightCollectorBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Harp",
				cosmetic: Cosmetic.LaughingLightCollectorHarp,
				cost: { hearts: 5 },
				emoji: HELD_PROPS_EMOJIS.HeldProp01,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LaughingLightCollectorHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LaughingLightCollectorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteLaugh3,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteLaugh4,
				cost: { candles: 5 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LaughingLightCollectorHair,
				cost: { hearts: 5 },
				emoji: HAIR_EMOJIS.Hair08,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LaughingLightCollectorBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
		],
	},
});
