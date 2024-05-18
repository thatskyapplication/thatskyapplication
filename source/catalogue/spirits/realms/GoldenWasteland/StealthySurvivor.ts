import { Collection } from "discord.js";
import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Sneaky;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.StealthySurvivor,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { name: "Hair", cost: { hearts: 5 }, emoji: HAIR_EMOJIS.Hair24 })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { name: "Wing buff 1", cost: { ascendedCandles: 4 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { name: "Cape 1", cost: { hearts: 50 }, emoji: CAPE_EMOJIS.Cape10 })
			.set(1 << 7, { name: "Wing buff 2", cost: { ascendedCandles: 12 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 8, { name: "Cape 2", cost: { hearts: 150 }, emoji: CAPE_EMOJIS.Cape82 }),
	},
});
