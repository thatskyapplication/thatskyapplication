/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, FriendshipTreeItem>().set(1 << 0, {
			name: "Hair",
			cost: { ascendedCandles: 6 },
			emoji: HAIR_EMOJIS.Hair35,
		}),
	},
});
