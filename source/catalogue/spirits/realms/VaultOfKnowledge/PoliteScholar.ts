import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Polite;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.PoliteScholar,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { name: "Outfit", cost: { hearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit08 })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { name: "Hair", cost: { hearts: 15 }, emoji: HAIR_EMOJIS.Hair28 }),
	},
});
