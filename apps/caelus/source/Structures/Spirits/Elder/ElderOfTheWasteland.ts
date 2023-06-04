/* eslint-disable unicorn/prefer-math-trunc */
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheWasteland,
	realm: Realm.GoldenWasteland,
	offer: { candles: 0, hearts: 0, ascendedCandles: 6 },
	itemsData: [[1 << 0, "Hair", "Hair"]],
});
