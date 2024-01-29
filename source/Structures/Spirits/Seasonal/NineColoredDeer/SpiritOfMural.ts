/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SpiritName, GuideSpirit } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.SpiritOfMural,
	season: SeasonName.NineColoredDeer,
	realm: Realm.VaultOfKnowledge,
	offer: {
		inProgress: true,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace33 })
			.set(1 << 3, { item: "Ultimate hair", cost: { seasonalHearts: 1 }, emoji: HAIR_EMOJIS.Hair136 })
			.set(1 << 4, { item: "Ultimate outfit", cost: { seasonalHearts: 1 }, emoji: OUTFIT_EMOJIS.Outfit52 })
			.set(1 << 5, { item: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape121 }),
	},
});
