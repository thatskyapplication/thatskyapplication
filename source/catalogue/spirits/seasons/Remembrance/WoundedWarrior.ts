import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Injured;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit41;
const maskEmoji = MASK_EMOJIS.Mask74;
const capeEmoji = CAPE_EMOJIS.Cape99;

export default new SeasonalSpirit({
	name: SpiritName.WoundedWarrior,
	season: SeasonName.Remembrance,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 14 }, emoji: blessing3 },
			{ name: "Mask", bit: 1 << 2, emoji: maskEmoji },
			{ name: "Outfit", bit: 1 << 3, cost: { seasonalCandles: 30 }, emoji: outfitEmoji },
			{ name: "Blessing 2", bit: 1 << 4, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 5, cost: { seasonalCandles: 36 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 6, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 7,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RemembranceHeart,
			},
		],
	},
});
