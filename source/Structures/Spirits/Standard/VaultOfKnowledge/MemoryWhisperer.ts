/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CALLS_EMOJIS, CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Call, SpiritName, StandardSpirit } from "../../Base.js";

const call = Call.CosmicManta;
const callEmoji = CALLS_EMOJIS.CosmicManta;

export default new StandardSpirit({
	name: SpiritName.MemoryWhisperer,
	call,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Outfit", cost: { hearts: 3 }, emoji: OUTFIT_EMOJIS.Outfit09 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 4 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Cape 1", cost: { hearts: 50 }, emoji: CAPE_EMOJIS.Cape12 })
			.set(1 << 7, { item: "Wing buff 2", cost: { ascendedCandles: 12 } })
			.set(1 << 8, { item: "Cape 2", cost: { hearts: 150 }, emoji: CAPE_EMOJIS.Cape77 }),
	},
});
