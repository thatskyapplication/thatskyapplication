/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritName } from "../../../Utility/spirits.js";
import { type ItemsData, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheVault,
	realm: Realm.VaultOfKnowledge,
	offer: {
		current: new Collection<number, ItemsData>().set(1 << 0, {
			item: "Hair",
			cost: { ascendedCandles: 5 },
			emoji: HAIR_EMOJIS.Hair36,
		}),
	},
});
