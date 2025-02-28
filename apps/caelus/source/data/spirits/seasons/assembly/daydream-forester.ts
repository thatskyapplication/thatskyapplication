import { Cosmetic, RealmName, SeasonId, SpiritEmote, SpiritId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Bubbles;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask47;
const hairEmoji = HAIR_EMOJIS.Hair78;

export default new SeasonalSpirit({
	id: SpiritId.DaydreamForester,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBubbles1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBubbles2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.DaydreamForesterMask,
				cost: { seasonalCandles: 5 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.DaydreamForesterBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBubbles3,
				cost: { seasonalCandles: 10 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBubbles4, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.DaydreamForesterMusicSheet,
				cost: { seasonalCandles: 15 },
				emoji: musicSheet,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.DaydreamForesterBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.DaydreamForesterBlessing3,
				cost: { seasonalCandles: 20 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.DaydreamForesterHair, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AssemblyHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBubbles1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBubbles2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DaydreamForesterBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.DaydreamForesterMask,
				cost: { candles: 24 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.DaydreamForesterWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBubbles3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBubbles4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.DaydreamForesterMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DaydreamForesterBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DaydreamForesterHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: [60, 109],
	},
});
