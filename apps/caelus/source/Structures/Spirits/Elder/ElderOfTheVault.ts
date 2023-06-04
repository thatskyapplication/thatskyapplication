/* eslint-disable unicorn/prefer-math-trunc */
import { Realm } from "../../../Utility/Constants.js";
import { SpiritName, ElderSpirit } from "../Base.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheVault,
	realm: Realm.VaultOfKnowledge,
	offer: { candles: 0, hearts: 0, ascendedCandles: 5 },
	items: { [1 << 0]: "Hair" },
});
