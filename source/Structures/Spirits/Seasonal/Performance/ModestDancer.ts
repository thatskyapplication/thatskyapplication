/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, SeasonalSpirit, SpiritName } from "../../Base.js";

const action = FriendAction.DuetDance;

export default new SeasonalSpirit({
	name: SpiritName.ModestDancer,
	season: SeasonName.Performance,
	action,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 8 } })
			.set(1 << 2, { item: "Music sheet", cost: null })
			.set(1 << 3, { item: "Mask", cost: { seasonalCandles: 14 } })
			.set(1 << 4, { item: "Blessing 2", cost: null })
			.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 26 } })
			.set(1 << 6, { item: `${action} 2`, cost: null })
			.set(1 << 7, { item: "Outfit", cost: { seasonalCandles: 30 } })
			.set(1 << 8, { item: "Hair", cost: null })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
});
