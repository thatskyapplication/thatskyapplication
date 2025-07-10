import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.Nightbird;

export default new SeasonalSpirit({
	id: SpiritId.NightbirdWhisperer,
	seasonId: SeasonId.Moments,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.CallNightbird },
			{
				cosmetic: Cosmetic.NightbirdWhispererHair,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.NightbirdWhispererBlessing1 },
			{
				cosmetic: Cosmetic.NightbirdWhispererBlessing2,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.NightbirdWhispererHairAccessory,
			},
			{
				cosmetic: Cosmetic.NightbirdWhispererOutfit,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.NightbirdWhispererBlessing3 },
			{
				cosmetic: Cosmetic.NightbirdWhispererBlessing4,
				cost: { seasonalCandles: 36 },
			},
			{ cosmetic: Cosmetic.NightbirdWhispererShoes },
			{
				cosmetic: Cosmetic.NightbirdWhispererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
