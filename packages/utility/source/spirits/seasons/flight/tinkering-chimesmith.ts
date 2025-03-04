import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Tinker;

export default new SeasonalSpirit({
	id: SpiritId.TinkeringChimesmith,
	seasonId: SeasonId.Flight,
	stance,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTinker },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.TinkeringChimesmithOutfit },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.TinkeringChimesmithBlessing2 },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.TinkeringChimesmithTrailSpell1,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Kalimba", cosmetic: Cosmetic.TinkeringChimesmithKalimba },
			{
				name: "Hair",
				cosmetic: Cosmetic.TinkeringChimesmithHair,
				cost: { seasonalCandles: 28 },
			},
			{
				name: "Trail spell 2",
				cosmetic: Cosmetic.TinkeringChimesmithTrailSpell2,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTinker },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TinkeringChimesmithHair,
				cost: { candles: 45 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TinkeringChimesmithWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TinkeringChimesmithBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
				cost: { candles: 35 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TinkeringChimesmithOutfit,
				cost: { candles: 70 },
			},
			{
				name: "Kalimba",
				cosmetic: Cosmetic.TinkeringChimesmithKalimba,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [87],
	},
});
