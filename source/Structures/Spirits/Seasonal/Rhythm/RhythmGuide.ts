/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { HAIR_EMOJIS, MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season/index.js";
import { type ItemsData, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.RhythmGuide,
	season: SeasonName.Rhythm,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace04 })
			.set(1 << 1, { item: "Ultimate mask", cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask22 })
			.set(1 << 2, { item: "Ultimate hair", cost: { seasonalHearts: 4 }, emoji: HAIR_EMOJIS.Hair52 }),
	},
});
