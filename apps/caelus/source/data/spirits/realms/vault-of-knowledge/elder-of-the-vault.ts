import { Cosmetic, ElderSpirit, RealmName, SpiritId } from "@thatskyapplication/utility";
import { HAIR_EMOJIS } from "../../../../utility/emojis.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheVault,
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
