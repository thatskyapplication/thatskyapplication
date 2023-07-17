/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { type ItemsData, GuideSpirit, SpiritName } from "../../Base.js";

export default new GuideSpirit({
	name: SpiritName.MomentsGuide,
	season: Season.Moments,
	realm: Realm.DaylightPrairie,
	inProgress: true,
	hasInfographic: false,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: "Camera", cost: null })
		.set(1 << 1, { item: "Pendant", cost: null })
		.set(1 << 2, { item: "Ultimate mask accessory", cost: { seasonalHearts: 1 } })
		.set(1 << 3, { item: "Ultimate camera", cost: { seasonalHearts: 1 } })
		.set(1 << 4, { item: "Ultimate hair accessory", cost: { seasonalHearts: 2 } })
		.set(1 << 5, { item: "Quest 1", cost: null })
		.set(1 << 6, { item: "Heart 1", cost: null }),
});
