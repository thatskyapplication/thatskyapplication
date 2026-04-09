import { Area } from "../models/area.js";
import { AreaName, RealmName } from "./geography.js";

export const AREAS = [
	// Isle of Dawn.
	new Area({ name: AreaName.DawnCircle, realm: RealmName.IsleOfDawn, wingedLight: 3 }),
	new Area({ name: AreaName.PassageRock, realm: RealmName.IsleOfDawn, wingedLight: 2 }),
	new Area({ name: AreaName.DawnOverlook, realm: RealmName.IsleOfDawn, wingedLight: 1 }),
	new Area({ name: AreaName.TrialOfWater, realm: RealmName.IsleOfDawn, wingedLight: 1 }),
	new Area({ name: AreaName.TrialOfEarth, realm: RealmName.IsleOfDawn, wingedLight: 1 }),
	new Area({ name: AreaName.TrialOfAir, realm: RealmName.IsleOfDawn, wingedLight: 1 }),
	new Area({ name: AreaName.TrialOfFire, realm: RealmName.IsleOfDawn, wingedLight: 1 }),

	// Daylight Prairie.
	new Area({ name: AreaName.PrairieRest, realm: RealmName.DaylightPrairie, wingedLight: 1 }),
	new Area({ name: AreaName.ButterflyFields, realm: RealmName.DaylightPrairie, wingedLight: 2 }),
	new Area({ name: AreaName.BirdNest, realm: RealmName.DaylightPrairie, wingedLight: 2 }),
	new Area({ name: AreaName.SanctuaryIslands, realm: RealmName.DaylightPrairie, wingedLight: 8 }),
	new Area({ name: AreaName.PrairieCave, realm: RealmName.DaylightPrairie, wingedLight: 2 }),
	new Area({ name: AreaName.PrairiePeaks, realm: RealmName.DaylightPrairie, wingedLight: 3 }),
	new Area({ name: AreaName.PrairieVillage, realm: RealmName.DaylightPrairie, wingedLight: 3 }),
	new Area({ name: AreaName.PrairieHeights, realm: RealmName.DaylightPrairie, wingedLight: 1 }),
	new Area({ name: AreaName.TempleOfThePrairie, realm: RealmName.DaylightPrairie, wingedLight: 2 }),

	// Hidden Forest.
	new Area({ name: AreaName.TheWindPaths, realm: RealmName.HiddenForest, wingedLight: 2 }),
	new Area({ name: AreaName.ForestCourtyard, realm: RealmName.HiddenForest, wingedLight: 2 }),
	new Area({ name: AreaName.TheTreehouse, realm: RealmName.HiddenForest, wingedLight: 2 }),
	new Area({ name: AreaName.ForestBrook, realm: RealmName.HiddenForest, wingedLight: 4 }),
	new Area({ name: AreaName.Boneyard, realm: RealmName.HiddenForest, wingedLight: 3 }),
	new Area({ name: AreaName.ElevatedClearing, realm: RealmName.HiddenForest, wingedLight: 2 }),
	new Area({ name: AreaName.BlueBirdTheatre, realm: RealmName.HiddenForest, wingedLight: 1 }),
	new Area({ name: AreaName.ForestCavern, realm: RealmName.HiddenForest, wingedLight: 4 }),
	new Area({ name: AreaName.SacredPond, realm: RealmName.HiddenForest, wingedLight: 1 }),

	// Valley of Triumph.
	new Area({ name: AreaName.ValleyRest, realm: RealmName.ValleyOfTriumph, wingedLight: 1 }),
	new Area({ name: AreaName.FrozenLake, realm: RealmName.ValleyOfTriumph, wingedLight: 2 }),
	new Area({ name: AreaName.TheCitadel, realm: RealmName.ValleyOfTriumph, wingedLight: 2 }),
	new Area({ name: AreaName.LowerValleyTrack, realm: RealmName.ValleyOfTriumph, wingedLight: 1 }),
	new Area({ name: AreaName.UpperValleyTrack, realm: RealmName.ValleyOfTriumph, wingedLight: 2 }),
	new Area({ name: AreaName.TempleOfTheValley, realm: RealmName.ValleyOfTriumph, wingedLight: 3 }),
	new Area({ name: AreaName.VillageOfDreams, realm: RealmName.ValleyOfTriumph, wingedLight: 3 }),
	new Area({ name: AreaName.HermitValley, realm: RealmName.ValleyOfTriumph, wingedLight: 2 }),
	new Area({ name: AreaName.VillageTheatre, realm: RealmName.ValleyOfTriumph, wingedLight: 1 }),

	// Golden Wasteland.
	new Area({ name: AreaName.TreasureReef, realm: RealmName.GoldenWasteland, wingedLight: 2 }),
	new Area({ name: AreaName.TheOuterBailey, realm: RealmName.GoldenWasteland, wingedLight: 2 }),
	new Area({ name: AreaName.TheGraveyard, realm: RealmName.GoldenWasteland, wingedLight: 6 }),
	new Area({ name: AreaName.ForgottenArk, realm: RealmName.GoldenWasteland, wingedLight: 2 }),
	new Area({ name: AreaName.TheBattlefield, realm: RealmName.GoldenWasteland, wingedLight: 2 }),
	new Area({ name: AreaName.CrabFields, realm: RealmName.GoldenWasteland, wingedLight: 3 }),

	new Area({
		name: AreaName.TempleOfTheWasteland,
		realm: RealmName.GoldenWasteland,
		wingedLight: 1,
	}),

	// Vault of Knowledge.
	new Area({ name: AreaName.VaultRest, realm: RealmName.VaultOfKnowledge, wingedLight: 1 }),
	new Area({ name: AreaName.VaultArchive, realm: RealmName.VaultOfKnowledge, wingedLight: 2 }),

	new Area({
		name: AreaName.RepositoryOfRefuge,
		realm: RealmName.VaultOfKnowledge,
		wingedLight: 1,
	}),

	new Area({ name: AreaName.LowerVault, realm: RealmName.VaultOfKnowledge, wingedLight: 1 }),
	new Area({ name: AreaName.UpperVault, realm: RealmName.VaultOfKnowledge, wingedLight: 3 }),
	new Area({ name: AreaName.TempleOfTheVault, realm: RealmName.VaultOfKnowledge, wingedLight: 1 }),
	new Area({ name: AreaName.StarlightDesert, realm: RealmName.VaultOfKnowledge, wingedLight: 3 }),
	new Area({ name: AreaName.CrescentOasis, realm: RealmName.VaultOfKnowledge, wingedLight: 3 }),
	new Area({ name: AreaName.Moominvalley, realm: RealmName.VaultOfKnowledge, wingedLight: 1 }),

	// Eye of Eden.
	new Area({ name: AreaName.GateOfEden, realm: RealmName.EyeOfEden, wingedLight: 1 }),
	new Area({ name: AreaName.PathOfEden, realm: RealmName.EyeOfEden, wingedLight: 9 }),

	// Miscellaneous.
	new Area({ name: AreaName.AncientMemory, wingedLight: 6 }),
	new Area({ name: AreaName.ThePassage, wingedLight: 1 }),
] as const;

export function areasForRealm(realm: RealmName) {
	return AREAS.filter((area) => area.realm === realm);
}
