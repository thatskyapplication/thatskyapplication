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
export const VALID_REALM_NAME_VALUES = Object.values(VALID_REALM_NAME);

export enum SkyMap {
	// Daylight Prairie.
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	PrairieCave = "Prairie Cave",
	PrairiePeaks = "Prairie Peaks",
	KoiPond = "Koi Pond",
	PrairieVillage = "Prairie Village",
	TempleOfThePrairie = "Temple of the Prairie",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest.
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	SacredPond = "Sacred Pond",
	TheTreehouse = "The Treehouse",
	TheWindPaths = "The Wind Paths",

	// Valley of Triumph.
	FrozenLake = "Frozen Lake",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",
	VillageTheatre = "Village Theatre",

	// Golden Wasteland.
	TheBattlefield = "The Battlefield",
	TheOuterBailey = "The Outer Bailey",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	TheGraveyard = "The Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge.
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	RepositoryOfRefuge = "Repository of Refuge",

	// Eye of Eden.
	StormEnd = "Eye of Eden",

	// The Passage.
	ThePassage = "The Passage",

	// Season of Shattering.
	AncientMemory = "Ancient Memory",

	// Season of Revival.
	AviaryVillage = "Aviary Village",
}

export const SKY_MAP_VALUES = Object.values(SkyMap);
