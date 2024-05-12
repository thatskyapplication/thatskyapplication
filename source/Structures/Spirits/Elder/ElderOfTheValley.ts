/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritName } from "../../../Utility/spirits.js";
import { type ItemsData, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheValley,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Hair 1", cost: { ascendedCandles: 5 }, emoji: HAIR_EMOJIS.Hair33 })
			.set(1 << 1, { item: "Hair 2", cost: { ascendedCandles: 6 }, emoji: HAIR_EMOJIS.Hair34 }),
	},
});
