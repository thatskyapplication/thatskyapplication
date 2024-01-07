/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS, STANCES_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Stance, SpiritName, StandardSpirit } from "../../Base.js";

const stance = Stance.Confident;
const stanceEmoji = STANCES_EMOJIS.Confident;

export default new StandardSpirit({
	name: SpiritName.ConfidentSightseer,
	stance,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Hair", cost: { hearts: 2 }, emoji: HAIR_EMOJIS.Hair17 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { item: "Outfit", cost: { hearts: 5 }, emoji: OUTFIT_EMOJIS.Outfit07 }),
	},
});
