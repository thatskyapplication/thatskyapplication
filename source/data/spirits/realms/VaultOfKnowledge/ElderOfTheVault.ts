import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { HAIR_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

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
