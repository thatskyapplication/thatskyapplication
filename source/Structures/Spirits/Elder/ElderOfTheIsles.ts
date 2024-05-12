/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../Utility/Constants.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../Utility/emojis.js";
import { SpiritName } from "../../../Utility/spirits.js";
import { type ItemsData, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheIsle,
	realm: Realm.IslesOfDawn,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Hair", cost: { ascendedCandles: 4 }, emoji: HAIR_EMOJIS.Hair30 })
			.set(1 << 1, {
				item: "Face accessory",
				cost: { ascendedCandles: 125 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory18,
			}),
	},
});
