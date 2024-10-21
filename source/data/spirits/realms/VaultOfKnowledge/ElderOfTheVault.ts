import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic } from "../../../../Utility2/catalogue.js";
import { HAIR_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritName } from "../../../../Utility2/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheVault,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheVaultHair,
				cost: { ascendedCandles: 5 },
				emoji: HAIR_EMOJIS.Hair36,
			},
		],
	},
});
