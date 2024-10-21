import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Injured;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit41;
const maskEmoji = MASK_EMOJIS.Mask74;
const capeEmoji = CAPE_EMOJIS.Cape99;

export default new SeasonalSpirit({
	name: SpiritName.WoundedWarrior,
	seasonId: SeasonId.Remembrance,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceInjured, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WoundedWarriorBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing3,
			},
			{ name: "Mask", cosmetic: Cosmetic.WoundedWarriorMask, emoji: maskEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.WoundedWarriorOutfit,
				cost: { seasonalCandles: 30 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.WoundedWarriorBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.WoundedWarriorBlessing3,
				cost: { seasonalCandles: 36 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.WoundedWarriorCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WoundedWarriorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RemembranceHeart,
			},
		],
	},
});
