import { Collection } from "discord.js";
import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheValley,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Hair 1", cost: { ascendedCandles: 5 }, emoji: HAIR_EMOJIS.Hair33 })
			.set(1 << 1, { name: "Hair 2", cost: { ascendedCandles: 6 }, emoji: HAIR_EMOJIS.Hair34 }),
	},
});
