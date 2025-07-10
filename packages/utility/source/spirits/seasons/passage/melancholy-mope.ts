import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Moping;

export default new SeasonalSpirit({
	id: SpiritId.MelancholyMope,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteMoping1 },
			{ cosmetic: Cosmetic.EmoteMoping2 },
			{
				cosmetic: Cosmetic.MelancholyMopeFaceAccessory,
				cost: { seasonalCandles: 6 },
			},
			{ cosmetic: Cosmetic.MelancholyMopeBlessing1 },
			{
				cosmetic: Cosmetic.MelancholyMopeBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.MelancholyMopeHair },
			{
				cosmetic: Cosmetic.EmoteMoping3,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.EmoteMoping4 },
			{
				cosmetic: Cosmetic.MelancholyMopeOutfit,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.MelancholyMopeBlessing3 },
			{
				cosmetic: Cosmetic.MelancholyMopeSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
