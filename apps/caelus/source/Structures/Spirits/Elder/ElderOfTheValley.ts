/* eslint-disable unicorn/prefer-math-trunc */
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheValley,
	realm: Realm.ValleyOfTriumph,
	offer: { candles: 0, hearts: 0, ascendedCandles: 11 },
	itemsData: [
		[1 << 0, "Hair", "Hair"],
		[1 << 1, "Hair", "Hair"],
	],
});
