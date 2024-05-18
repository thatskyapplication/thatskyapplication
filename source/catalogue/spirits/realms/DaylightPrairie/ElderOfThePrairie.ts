import { Collection } from "discord.js";
import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfThePrairie,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: "Hair", cost: { ascendedCandles: 3 }, emoji: HAIR_EMOJIS.Hair31 })
			.set(1 << 1, {
				name: "Face accessory",
				cost: { ascendedCandles: 75 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory19,
			}),
	},
});
