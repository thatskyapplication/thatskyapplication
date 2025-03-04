import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Timid;

export default new SeasonalSpirit({
	id: SpiritId.TimidBookworm,
	seasonId: SeasonId.Sanctuary,
	stance,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTimid },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TimidBookwormBlessing1,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Music sheet", cosmetic: Cosmetic.TimidBookwormMusicSheet },
			{
				name: "Hair",
				cosmetic: Cosmetic.TimidBookwormHair,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.TimidBookwormBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.TimidBookwormBlessing3,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Cape", cosmetic: Cosmetic.TimidBookwormCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTimid },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TimidBookwormMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TimidBookwormBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TimidBookwormHair,
				cost: { candles: 42 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TimidBookwormSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TimidBookwormWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TimidBookwormBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.TimidBookwormCape,
				cost: { candles: 70 },
			},
		],
	},
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: [37, 65, 113],
	},
});
