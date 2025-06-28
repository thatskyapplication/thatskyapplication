import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Sassy;

export default new SeasonalSpirit({
	id: SpiritId.SassyDrifter,
	seasonId: SeasonId.Gratitude,
	stance,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSassy },
			{
				name: "Hair",
				cosmetic: Cosmetic.SassyDrifterHair,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.SassyDrifterBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SassyDrifterBlessing2,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Weasel mask", cosmetic: Cosmetic.SassyDrifterMask },
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSassy },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SassyDrifterBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SassyDrifterHair,
				cost: { candles: 26 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SassyDrifterHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SassyDrifterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SassyDrifterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Weasel mask",
				cosmetic: Cosmetic.SassyDrifterMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 1, 31, 12), end: skyDate(2020, 2, 3) },
			{ start: skyDate(2020, 5, 28), end: skyDate(2020, 6, 1) },
			{ start: skyDate(2021, 7, 8), end: skyDate(2021, 7, 12) },
			{ start: skyDate(2022, 12, 8), end: skyDate(2022, 12, 12) },
			{ start: skyDate(2024, 4, 11), end: skyDate(2024, 4, 15) },
		],
	},
	keywords: ["weasel", "weasel mask"],
});
