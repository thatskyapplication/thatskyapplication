/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Shiver;

export default new StandardSpirit({
	name: SpiritName.ShiveringTrailblazer,
	emote,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { candles: 2 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Outfit", cost: { hearts: 2 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { candles: 3 } })
			.set(1 << 7, { item: `${emote} 4`, cost: { candles: 3 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Hair", cost: { hearts: 5 } }),
	},
});
