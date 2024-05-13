/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, ElderSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritName } from "../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Hair", cost: { ascendedCandles: 6 }, emoji: HAIR_EMOJIS.Hair32 })
			.set(1 << 1, {
				item: "Face accessory",
				cost: { ascendedCandles: 250 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory20,
			}),
	},
});
