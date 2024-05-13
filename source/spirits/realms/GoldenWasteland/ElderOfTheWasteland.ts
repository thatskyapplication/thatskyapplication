/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, ElderSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritName } from "../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>().set(1 << 0, {
			item: "Hair",
			cost: { ascendedCandles: 6 },
			emoji: HAIR_EMOJIS.Hair35,
		}),
	},
});
