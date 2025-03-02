import { Cosmetic, ElderSpirit, RealmName, SpiritId } from "@thatskyapplication/utility";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheVault,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheVaultHair,
				cost: { ascendedCandles: 5 },
			},
		],
	},
});
