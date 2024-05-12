/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, STANCE_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, Stance, StandardSpirit } from "../../Base.js";

const stance = Stance.Sneaky;
const stanceEmoji = STANCE_EMOJIS.Sneaky;

export default new StandardSpirit({
	name: SpiritName.StealthySurvivor,
	stance,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Hair", cost: { hearts: 5 }, emoji: HAIR_EMOJIS.Hair24 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 4 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { item: "Cape 1", cost: { hearts: 50 }, emoji: CAPE_EMOJIS.Cape10 })
			.set(1 << 7, { item: "Wing buff 2", cost: { ascendedCandles: 12 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 8, { item: "Cape 2", cost: { hearts: 150 }, emoji: CAPE_EMOJIS.Cape82 }),
	},
});
