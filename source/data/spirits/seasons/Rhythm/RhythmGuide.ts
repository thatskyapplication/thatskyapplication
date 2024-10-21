import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritName } from "../../../../Utility2/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RhythmGuide,
	seasonId: SeasonId.Rhythm,
	offer: {
		current: [
			{ name: "Pendant", cosmetic: Cosmetic.RhythmPendant, emoji: NECKLACE_EMOJIS.Necklace04 },
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.RhythmUltimateMask,
				cost: { seasonalHearts: 2 },
				emoji: MASK_EMOJIS.Mask22,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.RhythmUltimateHair,
				cost: { seasonalHearts: 4 },
				emoji: HAIR_EMOJIS.Hair52,
			},
		],
	},
});
