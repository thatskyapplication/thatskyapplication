import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.RoyalHairtousleTeen,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.EmoteAmazed1,
			},
			{ cosmetic: Cosmetic.EmoteAmazed2 },
			{
				cosmetic: Cosmetic.RoyalHairtousleTeenBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.RoyalHairtousleTeenHeadAccessory },
			{
				cosmetic: Cosmetic.EmoteAmazed3,
				cost: { seasonalCandles: 17 },
			},
			{ cosmetic: Cosmetic.EmoteAmazed4 },
			{
				cosmetic: Cosmetic.RoyalHairtousleTeenOutfit,
				cost: { seasonalCandles: 25 },
			},
			{ cosmetic: Cosmetic.RoyalHairtousleTeenBlessing2 },
			{
				cosmetic: Cosmetic.RoyalHairtousleTeenWhiteDye,
				cost: { seasonalCandles: 29 },
			},
			{ cosmetic: Cosmetic.RoyalHairtousleTeenCape },
			{
				cosmetic: Cosmetic.RoyalHairtousleTeenSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
