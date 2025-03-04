import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.CalmDown;

export default new SeasonalSpirit({
	id: SpiritId.CeasingCommodore,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCalmDown1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteCalmDown2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CeasingCommodoreBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Hair", cosmetic: Cosmetic.CeasingCommodoreHair },
			{
				name: "Mask",
				cosmetic: Cosmetic.CeasingCommodoreMask,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.CeasingCommodoreBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCalmDown3,
				cost: { seasonalCandles: 16 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteCalmDown4 },
			{
				name: "Cape",
				cosmetic: Cosmetic.CeasingCommodoreCape,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.CeasingCommodoreBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.CeasingCommodoreSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCalmDown1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCalmDown2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CeasingCommodoreBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CeasingCommodoreHair,
				cost: { candles: 45 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CeasingCommodoreSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CeasingCommodoreWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCalmDown3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCalmDown4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CeasingCommodoreBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.CeasingCommodoreMask,
				cost: { candles: 40 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CeasingCommodoreCape,
				cost: { candles: 20 },
			},
		],
	},
	visits: {
		returning: [5],
	},
});
