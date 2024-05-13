/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheVault,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: new Collection<number, FriendshipTreeItem>().set(1 << 0, {
			name: "Hair",
			cost: { ascendedCandles: 5 },
			emoji: HAIR_EMOJIS.Hair36,
		}),
	},
});
