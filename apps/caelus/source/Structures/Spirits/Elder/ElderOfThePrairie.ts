/* eslint-disable unicorn/prefer-math-trunc */
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfThePrairie,
	realm: Realm.DaylightPrairie,
	offer: { candles: 0, hearts: 0, ascendedCandles: 78 },
	items: {
		[1 << 0]: "Hair",
		[1 << 1]: "Mask",
	},
});
