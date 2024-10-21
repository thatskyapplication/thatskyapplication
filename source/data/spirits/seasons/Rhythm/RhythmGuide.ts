import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

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
