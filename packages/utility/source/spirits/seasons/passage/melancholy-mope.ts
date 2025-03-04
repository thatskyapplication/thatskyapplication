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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteMoping1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteMoping2 },
			{
				name: "Face accessory",
				cosmetic: Cosmetic.MelancholyMopeFaceAccessory,
				cost: { seasonalCandles: 6 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.MelancholyMopeBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MelancholyMopeBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Hair", cosmetic: Cosmetic.MelancholyMopeHair },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteMoping3,
				cost: { seasonalCandles: 26 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteMoping4 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.MelancholyMopeOutfit,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.MelancholyMopeBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MelancholyMopeSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
