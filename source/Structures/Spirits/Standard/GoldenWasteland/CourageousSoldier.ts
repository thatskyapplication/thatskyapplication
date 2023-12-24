/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, STANCES_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Stance, SpiritName, StandardSpirit } from "../../Base.js";

const stance = Stance.Courageous;
const stanceEmoji = STANCES_EMOJIS.Courageous;

export default new StandardSpirit({
	name: SpiritName.CourageousSoldier,
	stance,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Hair", cost: { hearts: 4 }, emoji: HAIR_EMOJIS.Hair23 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Cape 1", cost: { hearts: 15 }, emoji: CAPE_EMOJIS.Cape09 })
			.set(1 << 7, { item: "Wing buff 2", cost: { ascendedCandles: 6 } })
			.set(1 << 8, { item: "Cape 2", cost: { hearts: 45 }, emoji: CAPE_EMOJIS.Cape47 }),
	},
});
