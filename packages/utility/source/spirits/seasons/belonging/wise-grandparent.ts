import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Wise;

export default new SeasonalSpirit({
	id: SpiritId.WiseGrandparent,
	seasonId: SeasonId.Belonging,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceWise },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WiseGrandparentBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.WiseGrandparentMusicSheet },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WiseGrandparentBlessing2,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.WiseGrandparentBlessing3 },
			{
				name: "Mask",
				cosmetic: Cosmetic.WiseGrandparentMask,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.WiseGrandparentBlessing4 },
			{
				name: "Blessing 5",
				cosmetic: Cosmetic.WiseGrandparentBlessing5,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Cape", cosmetic: Cosmetic.WiseGrandparentCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceWise },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WiseGrandparentMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WiseGrandparentBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.WiseGrandparentWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WiseGrandparentBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.WiseGrandparentCape,
				cost: { candles: 70 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.WiseGrandparentProp,
				cost: { candles: 10 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.WiseGrandparentMask,
				cost: { candles: 48 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 8, 6), end: skyDate(2020, 8, 10) },
			{ start: skyDate(2021, 11, 11), end: skyDate(2021, 11, 15) },
			{ start: skyDate(2023, 11, 9), end: skyDate(2023, 11, 13) },
		],
	},
});
