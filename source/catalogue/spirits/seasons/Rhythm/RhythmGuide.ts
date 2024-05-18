import { Collection } from "discord.js";
import { GuideSpirit } from "../../../../Structures/Spirits.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RhythmGuide,
	season: SeasonName.Rhythm,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace04 })
			.set(1 << 1, { name: "Ultimate mask", cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask22 })
			.set(1 << 2, { name: "Ultimate hair", cost: { seasonalHearts: 4 }, emoji: HAIR_EMOJIS.Hair52 }),
	},
});
