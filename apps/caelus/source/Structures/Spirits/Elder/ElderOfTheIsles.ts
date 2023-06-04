/* eslint-disable unicorn/prefer-math-trunc */
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheIsle,
	realm: Realm.IslesOfDawn,
	offer: { candles: 0, hearts: 0, ascendedCandles: 129 },
	items: {
		[1 << 0]: "Hair",
		[1 << 1]: "Mask",
	},
});
