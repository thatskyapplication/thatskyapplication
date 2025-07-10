import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.BlindfoldBalancePose;

export default new SeasonalSpirit({
	id: SpiritId.AsceticMonk,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose1 },
			{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose2 },
			{
				cosmetic: Cosmetic.AsceticMonkBlessing1,
				cost: { seasonalCandles: 6 },
			},
			{ cosmetic: Cosmetic.AsceticMonkMask },
			{
				cosmetic: Cosmetic.AsceticMonkHair,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.AsceticMonkBlessing2 },
			{
				cosmetic: Cosmetic.EmoteBlindfoldBalancePose3,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.EmoteBlindfoldBalancePose4 },
			{
				cosmetic: Cosmetic.AsceticMonkOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.AsceticMonkBlessing3 },
			{
				cosmetic: Cosmetic.AsceticMonkSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
