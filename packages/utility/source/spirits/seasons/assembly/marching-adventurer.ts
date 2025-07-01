import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Marching;

export default new SeasonalSpirit({
	id: SpiritId.MarchingAdventurer,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteMarching1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteMarching2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.MarchingAdventurerHair,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.MarchingAdventurerBlessing1 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteMarching3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteMarching4 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MarchingAdventurerBlessing2,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Mask", cosmetic: Cosmetic.MarchingAdventurerMask },
			{
				name: "Tiki torch",
				cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.MarchingAdventurerBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteMarching1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteMarching2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MarchingAdventurerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.MarchingAdventurerMask,
				cost: { candles: 30 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.MarchingAdventurerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteMarching3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteMarching4,
				cost: { hearts: 6 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.MarchingAdventurerHair,
				cost: { candles: 45 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MarchingAdventurerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Tiki torch",
				cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
				cost: { candles: 55 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 7, 3), end: skyDate(2025, 7, 7) }],
		returning: [1],
	},
});
