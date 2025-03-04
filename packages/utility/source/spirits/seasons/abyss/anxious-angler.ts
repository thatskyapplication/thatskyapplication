import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Anxious;

export default new SeasonalSpirit({
	id: SpiritId.AnxiousAngler,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAnxious1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAnxious2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AnxiousAnglerBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Mask", cosmetic: Cosmetic.AnxiousAnglerMask },
			{
				name: "Hair",
				cosmetic: Cosmetic.AnxiousAnglerHair,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.AnxiousAnglerBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAnxious3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAnxious4 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.AnxiousAnglerBlessing3,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Cape", cosmetic: Cosmetic.AnxiousAnglerCape },
			{
				name: "Outfit",
				cosmetic: Cosmetic.AnxiousAnglerOutfit,
				cost: { seasonalCandles: 38 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.AnxiousAnglerBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAnxious1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteAnxious2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AnxiousAnglerBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.AnxiousAnglerHair,
				cost: { candles: 45 },
			},
			{
				name: "heart",
				cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.AnxiousAnglerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAnxious3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteAnxious4,
				cost: { hearts: 6 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AnxiousAnglerMask,
				cost: { candles: 35 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.AnxiousAnglerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.AnxiousAnglerCape,
				cost: { candles: 70 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.AnxiousAnglerOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		travelling: [105],
	},
});
