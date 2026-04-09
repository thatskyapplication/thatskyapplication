export enum RealmName {
	IsleOfDawn = "Isle of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export const REALM_NAME_VALUES = Object.values(RealmName);

export function isRealm(realm: string): realm is RealmName {
	return REALM_NAME_VALUES.includes(realm as RealmName);
}

export const VALID_REALM_NAME = [
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
] as const;

export type ValidRealmName = (typeof VALID_REALM_NAME)[number];

export enum AreaName {
	// Isle of Dawn.
	DawnCircle = "Dawn Circle",
	PassageRock = "Passage Rock",
	TempleOfTheIsle = "Temple of the Isle",
	DawnOverlook = "Dawn Overlook",
	TrialOfWater = "Trial of Water",
	TrialOfEarth = "Trial of Earth",
	TrialOfAir = "Trial of Air",
	TrialOfFire = "Trial of Fire",

	// Daylight Prairie.
	PrairieRest = "Prairie Rest",
	ButterflyFields = "Butterfly Fields",
	BirdNest = "Bird Nest",
	SanctuaryIslands = "Sanctuary Islands",
	PrairieCave = "Prairie Cave",
	PrairiePeaks = "Prairie Peaks",
	PrairieVillage = "Prairie Village",
	PrairieHeights = "Prairie Heights",
	TempleOfThePrairie = "Temple of the Prairie",

	// Hidden Forest.
	TheWindPaths = "The Wind Paths",
	ForestCourtyard = "Forest Courtyard",
	TheTreehouse = "The Treehouse",
	ForestBrook = "Forest Brook",
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	BlueBirdTheatre = "Blue Bird Theatre",
	ForestCavern = "Forest Cavern",
	SacredPond = "Sacred Pond",

	// Valley of Triumph.
	ValleyRest = "Valley Rest",
	FrozenLake = "Frozen Lake",
	TheCitadel = "The Citadel",
	LowerValleyTrack = "Lower Valley Track",
	UpperValleyTrack = "Upper Valley Track",
	TempleOfTheValley = "Temple of the Valley",
	VillageOfDreams = "Village of Dreams",
	HermitValley = "Hermit Valley",
	VillageTheatre = "Village Theatre",

	// Golden Wasteland.
	TreasureReef = "Treasure Reef",
	TheOuterBailey = "The Outer Bailey",
	TheGraveyard = "The Graveyard",
	ForgottenArk = "Forgotten Ark",
	TheBattlefield = "The Battlefield",
	CrabFields = "Crab Fields",
	TempleOfTheWasteland = "Temple of the Wasteland",

	// Vault of Knowledge.
	VaultRest = "Vault Rest",
	VaultArchive = "Vault Archive",
	RepositoryOfRefuge = "Repository of Refuge",
	LowerVault = "Lower Vault",
	UpperVault = "Upper Vault",
	TempleOfTheVault = "Temple of the Vault",
	StarlightDesert = "Starlight Desert",
	JellyfishCove = "Jellyfish Cove",
	CrescentOasis = "Crescent Oasis",
	Moominvalley = "Moominvalley",

	// Eye of Eden.
	GateOfEden = "Gate of Eden",
	PathOfEden = "Path of Eden",
	/**
	 * @remarks Japanese distinguishes the area past the point of no return from the name of the realm.
	 */
	EyeOfEden = "Eye of Eden",

	// The Passage.
	ThePassage = "The Passage",

	// Season of Shattering.
	AncientMemory = "Ancient Memory",

	// Season of Revival.
	AviaryVillage = "Aviary Village",
}
