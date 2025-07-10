import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Whistle;

export default new SeasonalSpirit({
	id: SpiritId.HerbGatherer,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteWhistle1 },
			{ cosmetic: Cosmetic.EmoteWhistle2 },
			{
				cosmetic: Cosmetic.HerbGathererBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.HerbGathererOutfit },
			{
				cosmetic: Cosmetic.HerbGathererHair,
				cost: { seasonalCandles: 26 },
			},
			{ cosmetic: Cosmetic.HerbGathererBlessing2 },
			{
				cosmetic: Cosmetic.EmoteWhistle3,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.EmoteWhistle4 },
			{
				cosmetic: Cosmetic.HerbGathererProp,
				cost: { seasonalCandles: 36 },
			},
			{ cosmetic: Cosmetic.HerbGathererBlessing3 },
			{
				cosmetic: Cosmetic.HerbGathererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
