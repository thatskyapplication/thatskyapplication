import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Bubbles;

export default new SeasonalSpirit({
	id: SpiritId.DaydreamForester,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBubbles1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBubbles2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.DaydreamForesterMask,
				cost: { seasonalCandles: 5 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.DaydreamForesterBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBubbles3,
				cost: { seasonalCandles: 10 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBubbles4 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.DaydreamForesterMusicSheet,
				cost: { seasonalCandles: 15 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.DaydreamForesterBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.DaydreamForesterBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Hair", cosmetic: Cosmetic.DaydreamForesterHair },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBubbles1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBubbles2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DaydreamForesterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.DaydreamForesterMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.DaydreamForesterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBubbles3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBubbles4,
				cost: { hearts: 6 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.DaydreamForesterMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DaydreamForesterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DaydreamForesterHair,
				cost: { candles: 44 },
			},
		],
	},
	visits: {
		travelling: [60, 109],
	},
});
