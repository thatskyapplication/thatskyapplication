/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CALLS_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS, SHOE_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, Call, SeasonalSpirit, SpiritName } from "../../Base.js";

const call = Call.Nightbird;
const callEmoji = CALLS_EMOJIS.Nightbird;

export default new SeasonalSpirit({
	name: SpiritName.NightbirdWhisperer,
	season: SeasonName.Moments,
	call,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Hair", cost: { seasonalCandles: 12 } })
			.set(1 << 2, { item: "Blessing 1", cost: null })
			.set(1 << 3, { item: "Blessing 2", cost: { seasonalCandles: 24 } })
			.set(1 << 4, { item: "Hair accessory", cost: null })
			.set(1 << 5, { item: "Outfit", cost: { seasonalCandles: 28 }, emoji: OUTFIT_EMOJIS.Outfit48 })
			.set(1 << 6, { item: "Blessing 3", cost: null })
			.set(1 << 7, { item: "Blessing 4", cost: { seasonalCandles: 36 } })
			.set(1 << 8, { item: "Shoes", cost: null, emoji: SHOE_EMOJIS.Shoe04 })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
