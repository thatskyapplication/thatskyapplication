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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWhistle1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWhistle2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HerbGathererBlessing1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.HerbGathererOutfit },
			{
				name: "Hair",
				cosmetic: Cosmetic.HerbGathererHair,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.HerbGathererBlessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWhistle3,
				cost: { seasonalCandles: 30 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWhistle4 },
			{
				name: "Prop",
				cosmetic: Cosmetic.HerbGathererProp,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.HerbGathererBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HerbGathererSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
