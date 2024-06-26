import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RhythmGuide,
	season: SeasonName.Rhythm,
	offer: {
		current: [
			{ name: "Pendant", bit: 1 << 0, emoji: NECKLACE_EMOJIS.Necklace04 },
			{
				name: "Ultimate mask",
				bit: 1 << 1,
				cost: { seasonalHearts: 2 },
				emoji: MASK_EMOJIS.Mask22,
			},
			{
				name: "Ultimate hair",
				bit: 1 << 2,
				cost: { seasonalHearts: 4 },
				emoji: HAIR_EMOJIS.Hair52,
			},
		],
	},
});
