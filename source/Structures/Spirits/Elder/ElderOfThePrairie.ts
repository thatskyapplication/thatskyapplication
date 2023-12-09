/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { FACE_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";
import { type ItemsData, ElderSpirit, SpiritName } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfThePrairie,
	realm: Realm.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Hair", cost: { ascendedCandles: 3 } })
			.set(1 << 1, {
				item: "Face accessory",
				cost: { ascendedCandles: 75 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory19,
			}),
	},
});
