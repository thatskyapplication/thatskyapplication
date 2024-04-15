/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.NestingGuide,
	season: SeasonName.Nesting,
	offer: {
		inProgress: true,
		hasInfographic: false,
		current: new Collection<number, ItemsData>().set(1 << 0, {
			item: "Quest 1",
			cost: null,
			emoji: MISCELLANEOUS_EMOJIS.Quest,
		}),
	},
});
