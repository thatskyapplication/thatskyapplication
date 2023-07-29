/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { type ItemsData, Call, SpiritName, StandardSpirit } from "../../Base.js";

const call = Call.Manta;

export default new StandardSpirit({
	name: SpiritName.MantaWhisperer,
	call,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 2, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 3, { item: "Wing buff", cost: { ascendedCandles: 1 } })
			.set(1 << 4, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 5, { item: "Music sheet", cost: { hearts: 3 } }),
	},
});
