import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Crab;

export default new SeasonalSpirit({
	id: SpiritId.CrabWhisperer,
	seasonId: SeasonId.Lightseekers,
	call,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallCrab },
			{
				name: "Mask",
				cosmetic: Cosmetic.CrabWhispererMask,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.CrabWhispererBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CrabWhispererBlessing2,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.CrabWhispererMusicSheet },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.CrabWhispererBlessing3,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.CrabWhispererBlessing4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.CrabWhispererHair,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Cape", cosmetic: Cosmetic.CrabWhispererCape },
		],
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallCrab },
			{
				name: "Pipe",
				cosmetic: Cosmetic.CrabWhispererPipe,
				cost: { candles: 20 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CrabWhispererBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.CrabWhispererMask,
				cost: { candles: 30 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CrabWhispererHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CrabWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CrabWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.CrabWhispererMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CrabWhispererHair,
				cost: { candles: 42 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CrabWhispererCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 4, 9), end: skyDate(2020, 4, 13) },
			{ start: skyDate(2021, 9, 1), end: skyDate(2021, 9, 5) },
		],
		returning: [4],
	},
});
