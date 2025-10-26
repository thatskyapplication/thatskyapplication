import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheVault,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ElderOfTheVaultHair,
					cost: { ascendedCandles: 5 },
				},
			],
		],
	},
});
