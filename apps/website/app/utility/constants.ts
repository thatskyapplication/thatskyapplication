export const DEFAULT_LOCALE = "en-GB" as const;
export const WEBSITE_URL = "https://thatskyapplication.com" as const;
export const CDN_URL = "https://cdn.thatskyapplication.com" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com" as const;
export const APPLICATION_NAME = "Caelus" as const;

export const APPLICATION_DESCRIPTION =
	`${APPLICATION_NAME} is a Discord application for Sky: Children of the Light. Comes equipped with fun, hugs, and smiles. Share the love with your community!` as const;

export const APPLICATION_ICON_URL = String(
	new URL(`avatar_icons/${APPLICATION_NAME.toLowerCase()}.webp`, CDN_URL),
);

export const CONTENT_CREATORS_DESCRIPTION =
	"View Sky: Children of the Light content creators here!";

export const CONTENT_CREATORS_ICON_URL = String(new URL("assets/creator_troupe.webp", CDN_URL));

export const SHARD_ERUPTION_DESCRIPTION =
	"See today's shard eruption, and view a schedule of future shard eruptions." as const;

export const SHARD_ERUPTION_ICON_URL = String(new URL("assets/shard_strong.webp", CDN_URL));

export const INVITE_APPLICATION_URL =
	"https://discord.com/oauth2/authorize?client_id=982740693070012506" as const;

export const INVITE_SUPPORT_SERVER_URL = "https://discord.gg/dFJms52NgB" as const;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;

// 1:1 only.
export const HUGGING_GIFS = [
	1, 2, 4, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
] as const;

export const MAXIMUM_KRILL_NO = 11 as const;

export enum Table {
	ContentCreators = "content_creators",
	DailyGuides = "daily_guides",
}

export enum RealmName {
	IslesOfDawn = "Isles of Dawn",
	DaylightPrairie = "Daylight Prairie",
	HiddenForest = "Hidden Forest",
	ValleyOfTriumph = "Valley of Triumph",
	GoldenWasteland = "Golden Wasteland",
	VaultOfKnowledge = "Vault of Knowledge",
	EyeOfEden = "Eye of Eden",
}

export const REALM_NAME_TO_REALM_CDN_NAME = {
	[RealmName.DaylightPrairie]: "daylight_prairie",
	[RealmName.HiddenForest]: "hidden_forest",
	[RealmName.ValleyOfTriumph]: "valley_of_triumph",
	[RealmName.GoldenWasteland]: "golden_wasteland",
	[RealmName.VaultOfKnowledge]: "vault_of_knowledge",
} as const satisfies Readonly<
	Record<Exclude<RealmName, RealmName.IslesOfDawn | RealmName.EyeOfEden>, string>
>;

export const VALID_REALM_NAME = [
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
] as const;

export type ValidRealmName = (typeof VALID_REALM_NAME)[number];

export enum SkyMap {
	// Daylight Prairie.
	BirdNest = "Bird Nest",
	ButterflyFields = "Butterfly Fields",
	Cave = "Cave",
	KoiPond = "Koi Pond",
	VillageIslands = "Village Islands",
	SanctuaryIslands = "Sanctuary Islands",

	// Hidden Forest.
	Boneyard = "Boneyard",
	ElevatedClearing = "Elevated Clearing",
	ForestBrook = "Forest Brook",
	ForestClearing = "Forest Clearing",
	ForestEnd = "Forest End",
	Treehouse = "Treehouse",
	WindPaths = "Wind Paths",

	// Valley of Triumph.
	IceRink = "Ice Rink",
	Citadel = "Citadel",
	Coliseum = "Coliseum",
	HermitValley = "Hermit Valley",
	VillageOfDreams = "Village of Dreams",

	// Golden Wasteland.
	Battlefield = "Battlefield",
	Boat = "Boat",
	BrokenTemple = "Broken Temple",
	CrabFields = "Crab Fields",
	ForgottenArk = "Forgotten Ark",
	Graveyard = "Graveyard",
	TreasureReef = "Treasure Reef",

	// Vault of Knowledge.
	VaultEntrance = "Vault Entrance",
	JellyfishCove = "Jellyfish Cove",
	StarlightDesert = "Starlight Desert",
	VaultSecondFloor = "Vault Second Floor",
	VaultSummit = "Vault Summit",

	// Orbit.
	Orbit = "Orbit",

	// Season of Shattering.
	AncientMemory = "Ancient Memory",

	// Season of the Nine-Coloured Deer.
	CrescentOasis = "Crescent Oasis",
}

export const DailyQuest = {
	Collect30PiecesOfLight: 0,
	Light20Candles: 1,
	ForgeACandle: 2,
	Melt10Darkness: 3,
	BowAtAPlayer: 4,
	FollowAFriend: 5,
	HugAFriend: 6,
	WaveToAFriend: 7,
	HoldAFriendsHand: 8,
	SendAGiftToAFriend: 9,
	MakeANewAcquaintance: 10,
	HighFiveAFriend: 11,
	UseAnExpressionNearAFriend: 12,
	SitOnABenchWithAStranger: 13,
	RechargeFromAJellyfish: 14,
	RechargeFromALightBloom: 15,
	RideWithAManta: 16,
	ReliveASpiritsMemories: 17,
	ReliveASpiritsMemoriesInDaylightPrairie: 18,
	ReliveASpiritsMemoriesInHiddenForest: 19,
	ReliveASpiritsMemoriesInValleyOfTriumph: 20,
	ReliveASpiritsMemoriesInGoldenWasteland: 21,
	ReliveASpiritsMemoriesInVaultOfKnowledge: 22,
	FaceTheDarkDragon: 23,
	KnockOver5DarkCrabs: 24,
	CatchTheLightInTheDaylightPrairie: 25,
	CatchTheLightInTheHiddenForest: 26,
	CatchTheLightInTheValleyOfTriumph: 27,
	CatchTheLightInTheGoldenWasteland: 28,
	CatchTheLightInTheVaultOfKnowledge: 29,
	VisitTheCosyHideoutInTheDaylightPrairie: 30,
	VisitTheAncestorsTableOfBelongingInTheHiddenForest: 31,
	VisitTheHotSpringInTheValleyOfTriumph: 32,
	VisitTheBonfireAtTheGoldenWasteland: 33,
	AdmireTheSaplingInTheDaylightPrairie: 34,
	AdmireTheSaplingInTheHiddenForest: 35,
	AdmireTheSaplingInTheValleyOfTriumph: 36,
	AdmireTheSaplingInTheGoldenWasteland: 37,
	AdmireTheSaplingInTheVaultOfKnowledge: 38,
	VisitThePollutedGeyser: 39,
	RidTheSanctuaryVortexOfDarkness: 40,
	FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie: 41,
	FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest: 42,
	FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph: 43,
	FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland: 44,
	FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge: 45,
	AdmireTheRainbowInTheSanctuaryIslands: 46,
	AdmireTheRainbowInTheWindPaths: 47,
	AdmireTheRainbowInTheHermitValley: 48,
	AdmireTheRainbowInTheTreasureReef: 49,
	AdmireTheRainbowInTheStarlightDesert: 50,
	MeditateAtTheBirdNest: 51,
	MeditateInTheButterflyFields: 52,
	MeditateAtTheSanctuaryIslands: 53,
	MeditateInTheCave: 54,
	MeditateByTheKoiPond: 55,
	MeditateAtTheForestClearing: 56,
	MeditateAtTheForestBrook: 57,
	MeditateAtTheElevatedClearing: 58,
	MeditateAtTheForestEnd: 59,
	MeditateAtTheBoneyard: 60,
	MeditateByTheIceRink: 61,
	MeditateAboveTheCitadelsArch: 62,
	MeditateHighAboveTheCitadel: 63,
	MeditateAtTheColiseum: 64,
	MeditateInTheBrokenTemple: 65,
	MeditateInTheForgottenArk: 66,
	MeditateInTheGraveyard: 67,
	MeditateOnTheBoat: 68,
	MeditateOnTheBattlefield: 69,
	MeditateAtTheVaultEntrance: 70,
	MeditateInTheVaultSecondFloor: 71,
	MeditateAtTheVaultSummit: 72,
	CollectGreenLight: 73,
	CollectOrangeLight: 74,
	CollectBlueLight: 75,
	CollectRedLight: 76,
	CollectPurpleLight: 77,
	PracticeWithTheSkater: 78,
	RaceDownTheSlopesWithTheSkater: 79,
	RaceDownTheMountainWithTheSkater: 80,
	RehearseForAPerformanceWithTheSkater: 81,
	CompleteTheHoopScavengerHunt: 82,
	ReliveTheButterflyCharmer: 83,
	ReliveTheApplaudingBellmaker: 84,
	ReliveTheWavingBellmaker: 85,
	ReliveTheSlumberingShipwright: 86,
	ReliveTheLaughingLightCatcher: 87,
	ReliveTheBirdWhisperer: 88,
	ReliveTheExhaustedDockWorker: 89,
	ReliveTheCeremonialWorshiper: 90,
	ReliveTheShiveringTrailblazer: 91,
	ReliveTheBlushingProspector: 92,
	ReliveTheHideNSeekPioneer: 93,
	ReliveThePoutyPorter: 94,
	ReliveTheDismayedHunter: 95,
	ReliveTheApologeticLumberjack: 96,
	ReliveTheTearfulLightMiner: 97,
	ReliveTheWhaleWhisperer: 98,
	ReliveTheConfidentSightseer: 99,
	ReliveTheHandstandingThrillseeker: 100,
	ReliveTheMantaWhisperer: 101,
	ReliveTheBackflippingChampion: 102,
	ReliveTheCheerfulSpectator: 103,
	ReliveTheBowingMedalist: 104,
	ReliveTheProudVictor: 105,
	ReliveTheFrightenedRefugee: 106,
	ReliveTheFaintingWarrior: 107,
	ReliveTheCourageousSoldier: 108,
	ReliveTheStealthySurvivor: 109,
	ReliveTheSalutingCaptain: 110,
	ReliveTheLookoutScout: 111,
	ReliveThePrayingAcolyte: 112,
	ReliveTheLevitatingAdept: 113,
	ReliveThePoliteScholar: 114,
	ReliveTheMemoryWhisperer: 115,
	ReliveTheMeditatingMonastic: 116,
	ReliveTheStretchingGuru: 117,
	ReliveTheProvokingPerformer: 118,
	ReliveTheLeapingDancer: 119,
	ReliveTheSalutingProtector: 120,
	ReliveTheGreetingShaman: 121,
	ReliveTheDoublefiveLightCatcher: 122,
	ReliveTheLaidbackPioneer: 123,
	ReliveTheTwirlingChampion: 124,
	ReliveTheCrabWhisperer: 125,
	ReliveTheShushingLightScholar: 126,
	ReliveTheConfettiCousin: 127,
	ReliveTheHairtousleTeen: 128,
	ReliveTheSparklerParent: 129,
	ReliveThePleafulParent: 130,
	ReliveTheWiseGrandparent: 131,
	ReliveTheFestivalSpinDancer: 132,
	ReliveTheAdmiringActor: 133,
	ReliveTheTroupeJuggler: 134,
	ReliveTheRespectfulPianist: 135,
	ReliveTheThoughtfulDirector: 136,
	ReliveTheNoddingMuralist: 137,
	ReliveTheIndifferentAlchemist: 138,
	ReliveTheCrabWalker: 139,
	ReliveTheScarecrowFarmer: 140,
	ReliveTheSnoozingCarpenter: 141,
	ReliveThePlayfightingHerbalist: 142,
	ReliveTheJellyWhisperer: 143,
	ReliveTheTimidBookworm: 144,
	ReliveTheRallyingThrillseeker: 145,
	ReliveTheHikingGrouch: 146,
	ReliveTheGratefulShellCollector: 147,
	ReliveTheChillSunbather: 148,
	ReliveTheSpinningMentor: 149,
	ReliveTheDancingPerformer: 150,
	ReliveThePeekingPostman: 151,
	ReliveTheBearhugHermit: 152,
	ReliveTheBaffledBotanist: 153,
	ReliveTheScoldingStudent: 154,
	ReliveTheScaredyCadet: 155,
	ReliveTheMarchingAdventurer: 156,
	ReliveTheChucklingScout: 157,
	ReliveTheDaydreamForester: 158,
	VisitAShardOfDarknessFallenToTheKingdomOfSky: 159,
	TakeASelfieWithHikingGrouchInPrairiePeaks: 160,
	TakeASelfieWithCrabWhispererInPrairiePeaks: 161,
	TakeASelfieWithCacklingCannoneerInPrairiePeaks: 162,
	TakeASelfieWithTroupeGreeterInPrairiePeaks: 163,
	MeetCinnamorollOnAHillInAviaryVillage: 164,
	SmellFlowersWithCinnamorollInAviaryVillage: 165,
	FindCinnamorollPeekingAroundAviaryVillage: 166,
	WakeUpCinnamorollInAviaryVillage: 167,
	FlyUpToTheTowerWithCinnamorollInAviaryVillage: 168,
	SplashInTheWaterWithCinnamorollInAviaryVillage: 169,
	PlayAnyTournamentSport: 170,
	ModestDancerNeedsHelpWithSomethingInVillageOfDreams: 171,
	ForgetfulStorytellerNeedsHelpWithSomethingInVillageOfDreams: 172,
	MeetUpWithFranticStagehandInVillageTheatre: 173,
	MellowMusicianNeedsHelpWithSomethingInVillageTheatre: 174,
	ChangeYourHairstyle: 175,
	ChangeYourNecklace: 176,
	ChangeYourProp: 177,
	ChangeYourMask: 178,
	ChangeYourCape: 179,
	ChangeYourOutfit: 180,
	ViewASharedMemoryAtAStyleRunwayShrine: 181,
	RecordASharedMemoryAtAStyleRunwayShrine: 182,
	CacklingCannoneerNeedsHelpWithSomethingInTreasureReef: 183,
	AnxiousAnglerNeedsHelpWithSomethingInTreasureReef: 184,
	MellowMusicianNeedsHelpWithSomethingInVillageOfDreams: 185,
	AnxiousAnglerNeedsHelpWithSomethingInGoldenWasteland: 186,
	MeetUpWithAnxiousAnglerInCrabFields: 187,
	MeetUpWithCeasingCommodoreInTreasureReef: 188,
	MeetUpWithBlushingProspectorInForestBrook: 189,
	MeetUpWithShiveringTrailblazerInForestBrook: 190,
	MeetUpWithCacklingCannoneerInGraveyard: 191,
	MeetUpWithHideNSeekPioneerInBoneyard: 192,
	MeetUpWithHideNSeekPioneerInElevatedClearing: 193,
	MeetUpWithBumblingBoatswainInForgottenArk: 194,
	MeetUpWithHideNSeekPioneerInHiddenForest: 195,
	MeetUpWithCacklingCannoneerInForgottenArk: 196,
	MeetUpWithApologeticLumberjackInBoneyard: 197,
	MeetUpWithCeasingCommodoreInForgottenArk: 198,
	MeetUpWithJollyGeologistInPrairiePeaks: 199,
	MeetUpWithDismayedHunterInBoneyard: 200,
	MeetUpWithWhaleWhispererInBoneyard: 201,
} as const satisfies Readonly<Record<string, number>>;

export const DAILY_QUEST_VALUES = Object.values(DailyQuest);
export type DailyQuests = (typeof DAILY_QUEST_VALUES)[number];

export const DailyQuestToString = {
	[DailyQuest.Collect30PiecesOfLight]: "Collect 30 pieces of light",
	[DailyQuest.Light20Candles]: "Light 20 candles",
	[DailyQuest.ForgeACandle]: "Forge a candle",
	[DailyQuest.Melt10Darkness]: "Melt 10 darkness",
	[DailyQuest.BowAtAPlayer]: "Bow at a player",
	[DailyQuest.FollowAFriend]: "Follow a friend",
	[DailyQuest.HugAFriend]: "Hug a friend",
	[DailyQuest.WaveToAFriend]: "Wave to a friend",
	[DailyQuest.HoldAFriendsHand]: "Hold a friend's hand",
	[DailyQuest.SendAGiftToAFriend]: "Send a gift to a friend",
	[DailyQuest.MakeANewAcquaintance]: "Make a new acquaintance",
	[DailyQuest.HighFiveAFriend]: "High-five a friend",
	[DailyQuest.UseAnExpressionNearAFriend]: "Use an expression near a friend",
	[DailyQuest.SitOnABenchWithAStranger]: "Sit on a bench with a stranger",
	[DailyQuest.RechargeFromAJellyfish]: "Recharge from a jellyfish",
	[DailyQuest.RechargeFromALightBloom]: "Recharge from a light bloom",
	[DailyQuest.RideWithAManta]: "Ride with a manta",
	[DailyQuest.ReliveASpiritsMemories]: "Relive a spirit's memories",
	[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
		"Relive a spirit's memories in the Daylight Prairie",
	[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
		"Relive a spirit's memories in the Hidden Forest",
	[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
		"Relive a spirit's memories in the Valley of Triumph",
	[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
		"Relive a spirit's memories in the Golden Wasteland",
	[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
		"Relive a spirit's memories in the Vault of Knowledge",
	[DailyQuest.FaceTheDarkDragon]: "Face the dark dragon",
	[DailyQuest.KnockOver5DarkCrabs]: "Knock over 5 dark crabs",
	[DailyQuest.CatchTheLightInTheDaylightPrairie]: "Catch the light in the Daylight Prairie",
	[DailyQuest.CatchTheLightInTheHiddenForest]: "Catch the light in the Hidden Forest",
	[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "Catch the light in the Valley of Triumph",
	[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Catch the light in the Golden Wasteland",
	[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "Catch the light in the Vault of Knowledge",
	[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
		"Visit the cosy hideout in the Daylight Prairie",
	[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
		"Visit the Ancestor's Table of Belonging in the Hidden Forest",
	[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]:
		"Visit the hot spring in the Valley of Triumph",
	[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]: "Visit the bonfire at the Golden Wasteland",
	[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]: "Admire the sapling in the Daylight Prairie",
	[DailyQuest.AdmireTheSaplingInTheHiddenForest]: "Admire the sapling in the Hidden Forest",
	[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]: "Admire the sapling in the Valley of Triumph",
	[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]: "Admire the sapling in the Golden Wasteland",
	[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
		"Admire the sapling in the Vault of Knowledge",
	[DailyQuest.VisitThePollutedGeyser]: "Visit the Polluted Geyser",
	[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "Rid the sanctuary vortex of darkness",
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
		"Find the candles at the end of the rainbow in the Daylight Prairie",
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
		"Find the candles at the end of the rainbow in the Hidden Forest",
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
		"Find the candles at the end of the rainbow in the Valley of Triumph",
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
		"Find the candles at the end of the rainbow in the Golden Wasteland",
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
		"Find the candles at the end of the rainbow in the Vault of Knowledge",
	[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]: "Admire the rainbow in the Sanctuary Islands",
	[DailyQuest.AdmireTheRainbowInTheWindPaths]: "Admire the rainbow in the Wind Paths",
	[DailyQuest.AdmireTheRainbowInTheHermitValley]: "Admire the rainbow in the Hermit Valley",
	[DailyQuest.AdmireTheRainbowInTheTreasureReef]: "Admire the rainbow in the Treasure Reef",
	[DailyQuest.AdmireTheRainbowInTheStarlightDesert]: "Admire the rainbow in the Starlight Desert",
	[DailyQuest.MeditateAtTheBirdNest]: "Meditate at the Bird Nest",
	[DailyQuest.MeditateInTheButterflyFields]: "Meditate in the Butterfly Fields",
	[DailyQuest.MeditateAtTheSanctuaryIslands]: "Meditate at the Sanctuary Islands",
	[DailyQuest.MeditateInTheCave]: "Meditate in the Cave",
	[DailyQuest.MeditateByTheKoiPond]: "Meditate by the Koi Pond",
	[DailyQuest.MeditateAtTheForestClearing]: "Meditate at the Forest Clearing",
	[DailyQuest.MeditateAtTheForestBrook]: "Meditate at the Forest Brook",
	[DailyQuest.MeditateAtTheElevatedClearing]: "Meditate at the Elevated Clearing",
	[DailyQuest.MeditateAtTheForestEnd]: "Meditate at the Forest End",
	[DailyQuest.MeditateAtTheBoneyard]: "Meditate at the Boneyard",
	[DailyQuest.MeditateByTheIceRink]: "Meditate by the Ice Rink",
	[DailyQuest.MeditateAboveTheCitadelsArch]: "Meditate above the Citadel's Arch",
	[DailyQuest.MeditateHighAboveTheCitadel]: "Meditate high above the Citadel",
	[DailyQuest.MeditateAtTheColiseum]: "Meditate at the Coliseum",
	[DailyQuest.MeditateInTheBrokenTemple]: "Meditate in the Broken Temple",
	[DailyQuest.MeditateInTheForgottenArk]: "Meditate in the Forgotten Ark",
	[DailyQuest.MeditateInTheGraveyard]: "Meditate in the Graveyard",
	[DailyQuest.MeditateOnTheBoat]: "Meditate on the Boat",
	[DailyQuest.MeditateOnTheBattlefield]: "Meditate on the Battlefield",
	[DailyQuest.MeditateAtTheVaultEntrance]: "Meditate at the Vault Entrance",
	[DailyQuest.MeditateInTheVaultSecondFloor]: "Meditate in the Vault Second Floor",
	[DailyQuest.MeditateAtTheVaultSummit]: "Meditate at the Vault Summit",
	[DailyQuest.CollectGreenLight]: "Collect green light",
	[DailyQuest.CollectOrangeLight]: "Collect orange light",
	[DailyQuest.CollectBlueLight]: "Collect blue light",
	[DailyQuest.CollectRedLight]: "Collect red light",
	[DailyQuest.CollectPurpleLight]: "Collect purple light",
	[DailyQuest.PracticeWithTheSkater]: "Practice with the skater",
	[DailyQuest.RaceDownTheSlopesWithTheSkater]: "Race down the slopes with the skater",
	[DailyQuest.RaceDownTheMountainWithTheSkater]: "Race down the mountain with the skater",
	[DailyQuest.RehearseForAPerformanceWithTheSkater]: "Rehearse for a performance with the skater",
	[DailyQuest.CompleteTheHoopScavengerHunt]: "Complete the hoop scavenger hunt",
	[DailyQuest.ReliveTheButterflyCharmer]: "Relive the Butterfly Charmer",
	[DailyQuest.ReliveTheApplaudingBellmaker]: "Relive the Applauding Bellmaker",
	[DailyQuest.ReliveTheWavingBellmaker]: "Relive the Waving Bellmaker",
	[DailyQuest.ReliveTheSlumberingShipwright]: "Relive the Slumbering Shipwright",
	[DailyQuest.ReliveTheLaughingLightCatcher]: "Relive the Laughing Light Catcher",
	[DailyQuest.ReliveTheBirdWhisperer]: "Relive the Bird Whisperer",
	[DailyQuest.ReliveTheExhaustedDockWorker]: "Relive the Exhausted Dock Worker",
	[DailyQuest.ReliveTheCeremonialWorshiper]: "Relive the Ceremonial Worshiper",
	[DailyQuest.ReliveTheShiveringTrailblazer]: "Relive the Shivering Trailblazer",
	[DailyQuest.ReliveTheBlushingProspector]: "Relive the Blushing Prospector",
	[DailyQuest.ReliveTheHideNSeekPioneer]: "Relive the Hide'n'Seek Pioneer",
	[DailyQuest.ReliveThePoutyPorter]: "Relive the Pouty Porter",
	[DailyQuest.ReliveTheDismayedHunter]: "Relive the Dismayed Hunter",
	[DailyQuest.ReliveTheApologeticLumberjack]: "Relive the Apologetic Lumberjack",
	[DailyQuest.ReliveTheTearfulLightMiner]: "Relive the Tearful Light Miner",
	[DailyQuest.ReliveTheWhaleWhisperer]: "Relive the Whale Whisperer",
	[DailyQuest.ReliveTheConfidentSightseer]: "Relive the Confident Sightseer",
	[DailyQuest.ReliveTheHandstandingThrillseeker]: "Relive the Handstanding Thrillseeker",
	[DailyQuest.ReliveTheMantaWhisperer]: "Relive the Manta Whisperer",
	[DailyQuest.ReliveTheBackflippingChampion]: "Relive the Backflipping Champion",
	[DailyQuest.ReliveTheCheerfulSpectator]: "Relive the Cheerful Spectator",
	[DailyQuest.ReliveTheBowingMedalist]: "Relive the Bowing Medalist",
	[DailyQuest.ReliveTheProudVictor]: "Relive the Proud Victor",
	[DailyQuest.ReliveTheFrightenedRefugee]: "Relive the Frightened Refugee",
	[DailyQuest.ReliveTheFaintingWarrior]: "Relive the Fainting Warrior",
	[DailyQuest.ReliveTheCourageousSoldier]: "Relive the Courageous Soldier",
	[DailyQuest.ReliveTheStealthySurvivor]: "Relive the Stealthy Survivor",
	[DailyQuest.ReliveTheSalutingCaptain]: "Relive the Saluting Captain",
	[DailyQuest.ReliveTheLookoutScout]: "Relive the Lookout Scout",
	[DailyQuest.ReliveThePrayingAcolyte]: "Relive the Praying Acolyte",
	[DailyQuest.ReliveTheLevitatingAdept]: "Relive the Levitating Adept",
	[DailyQuest.ReliveThePoliteScholar]: "Relive the Polite Scholar",
	[DailyQuest.ReliveTheMemoryWhisperer]: "Relive the Memory Whisperer",
	[DailyQuest.ReliveTheMeditatingMonastic]: "Relive the Meditating Monastic",
	[DailyQuest.ReliveTheStretchingGuru]: "Relive the Stretching Guru",
	[DailyQuest.ReliveTheProvokingPerformer]: "Relive the Provoking Performer",
	[DailyQuest.ReliveTheLeapingDancer]: "Relive the Leaping Dancer",
	[DailyQuest.ReliveTheSalutingProtector]: "Relive the Saluting Protector",
	[DailyQuest.ReliveTheGreetingShaman]: "Relive the Greeting Shaman",
	[DailyQuest.ReliveTheDoublefiveLightCatcher]: "Relive the Doublefive Light Catcher",
	[DailyQuest.ReliveTheLaidbackPioneer]: "Relive the Laidback Pioneer",
	[DailyQuest.ReliveTheTwirlingChampion]: "Relive the Twirling Champion",
	[DailyQuest.ReliveTheCrabWhisperer]: "Relive the Crab Whisperer",
	[DailyQuest.ReliveTheShushingLightScholar]: "Relive the Shushing Light Scholar",
	[DailyQuest.ReliveTheConfettiCousin]: "Relive the Confetti Cousin",
	[DailyQuest.ReliveTheHairtousleTeen]: "Relive the Hairtousle Teen",
	[DailyQuest.ReliveTheSparklerParent]: "Relive the Sparkler Parent",
	[DailyQuest.ReliveThePleafulParent]: "Relive the Pleaful Parent",
	[DailyQuest.ReliveTheWiseGrandparent]: "Relive the Wise Grandparent",
	[DailyQuest.ReliveTheFestivalSpinDancer]: "Relive the Festival Spin Dancer",
	[DailyQuest.ReliveTheAdmiringActor]: "Relive the Admiring Actor",
	[DailyQuest.ReliveTheTroupeJuggler]: "Relive the Troupe Juggler",
	[DailyQuest.ReliveTheRespectfulPianist]: "Relive the Respectful Pianist",
	[DailyQuest.ReliveTheThoughtfulDirector]: "Relive the Thoughtful Director",
	[DailyQuest.ReliveTheNoddingMuralist]: "Relive the Nodding Muralist",
	[DailyQuest.ReliveTheIndifferentAlchemist]: "Relive the Indifferent Alchemist",
	[DailyQuest.ReliveTheCrabWalker]: "Relive the Crab Walker",
	[DailyQuest.ReliveTheScarecrowFarmer]: "Relive the Scarecrow Farmer",
	[DailyQuest.ReliveTheSnoozingCarpenter]: "Relive the Snoozing Carpenter",
	[DailyQuest.ReliveThePlayfightingHerbalist]: "Relive the Playfighting Herbalist",
	[DailyQuest.ReliveTheJellyWhisperer]: "Relive the Jelly Whisperer",
	[DailyQuest.ReliveTheTimidBookworm]: "Relive the Timid Bookworm",
	[DailyQuest.ReliveTheRallyingThrillseeker]: "Relive the Rallying Thrillseeker",
	[DailyQuest.ReliveTheHikingGrouch]: "Relive the Hiking Grouch",
	[DailyQuest.ReliveTheGratefulShellCollector]: "Relive the Grateful Shell Collector",
	[DailyQuest.ReliveTheChillSunbather]: "Relive the Chill Sunbather",
	[DailyQuest.ReliveTheSpinningMentor]: "Relive the Spinning Mentor",
	[DailyQuest.ReliveTheDancingPerformer]: "Relive the Dancing Performer",
	[DailyQuest.ReliveThePeekingPostman]: "Relive the Peeking Postman",
	[DailyQuest.ReliveTheBearhugHermit]: "Relive the Bearhug Hermit",
	[DailyQuest.ReliveTheBaffledBotanist]: "Relive the Baffled Botanist",
	[DailyQuest.ReliveTheScoldingStudent]: "Relive the Scolding Student",
	[DailyQuest.ReliveTheScaredyCadet]: "Relive the Scaredy Cadet",
	[DailyQuest.ReliveTheMarchingAdventurer]: "Relive the Marching Adventurer",
	[DailyQuest.ReliveTheChucklingScout]: "Relive the Chuckling Scout",
	[DailyQuest.ReliveTheDaydreamForester]: "Relive the Daydream Forester",
	[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
		"Visit a shard of darkness fallen to the Kingdom of Sky",
	[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
		"Take a selfie with Hiking Grouch in Prairie Peaks",
	[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
		"Take a selfie with Crab Whisperer in Prairie Peaks",
	[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
		"Take a selfie with Cackling Cannoneer in Prairie Peaks",
	[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
		"Take a selfie with Troupe Greeter in Prairie Peaks",
	[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
		"Meet Cinnamoroll on a hill in Aviary Village",
	[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
		"Smell flowers with Cinnamoroll in Aviary Village",
	[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
		"Find Cinnamoroll peeking around Aviary Village",
	[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "Wake up Cinnamoroll in Aviary Village",
	[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
		"Fly up to the tower with Cinnamoroll in Aviary Village",
	[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
		"Splash in the water with Cinnamoroll in Aviary Village",
	[DailyQuest.PlayAnyTournamentSport]: "Play any Tournament sport",
	[DailyQuest.ModestDancerNeedsHelpWithSomethingInVillageOfDreams]:
		"Modest Dancer needs help with something in Village of Dreams",
	[DailyQuest.ForgetfulStorytellerNeedsHelpWithSomethingInVillageOfDreams]:
		"Forgetful Storyteller needs help with something in Village of Dreams",
	[DailyQuest.MeetUpWithFranticStagehandInVillageTheatre]:
		"Meet up with Frantic Stagehand in Village Theatre",
	[DailyQuest.MellowMusicianNeedsHelpWithSomethingInVillageTheatre]:
		"Mellow Musician needs help with something in Village Theatre",
	[DailyQuest.ChangeYourHairstyle]: "Change your hairstyle",
	[DailyQuest.ChangeYourNecklace]: "Change your necklace",
	[DailyQuest.ChangeYourProp]: "Change your prop",
	[DailyQuest.ChangeYourMask]: "Change your mask",
	[DailyQuest.ChangeYourCape]: "Change your cape",
	[DailyQuest.ChangeYourOutfit]: "Change your outfit",
	[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
		"View a shared memory at a Style Runway Shrine",
	[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
		"Record a shared memory at a Style Runway Shrine",
	[DailyQuest.CacklingCannoneerNeedsHelpWithSomethingInTreasureReef]:
		"Cackling Cannoneer needs help with something in Treasure Reef",
	[DailyQuest.AnxiousAnglerNeedsHelpWithSomethingInTreasureReef]:
		"Anxious Angler needs help with something in Treasure Reef",
	[DailyQuest.MellowMusicianNeedsHelpWithSomethingInVillageOfDreams]:
		"Melow Musician needs help with something in Village of Dreams",
	[DailyQuest.AnxiousAnglerNeedsHelpWithSomethingInGoldenWasteland]:
		"Anxious Angler needs help with something in Golden Wasteland",
	[DailyQuest.MeetUpWithAnxiousAnglerInCrabFields]: "Meet up with Anxious Angler in Crab Fields",
	[DailyQuest.MeetUpWithCeasingCommodoreInTreasureReef]:
		"Meet up with Ceasing Commodore in Treasure Reef",
	[DailyQuest.MeetUpWithBlushingProspectorInForestBrook]:
		"Meet up with Blushing Prospector in Forest Brook",
	[DailyQuest.MeetUpWithShiveringTrailblazerInForestBrook]:
		"Meet up with Shivering Trailblazer in Forest Brook",
	[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]:
		"Meet up with Cackling Cannoneer in Graveyard",
	[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]: "Meet up with Hide'n'Seek Pioneer in Boneyard",
	[DailyQuest.MeetUpWithHideNSeekPioneerInElevatedClearing]:
		"Meet up with Hide'n'Seek Pioneer in Elevated Clearing",
	[DailyQuest.MeetUpWithBumblingBoatswainInForgottenArk]:
		"Meet up with Bumbling Boatswain in Forgotten Ark",
	[DailyQuest.MeetUpWithHideNSeekPioneerInHiddenForest]:
		"Meet up with Hide'n'Seek Pioneer in Hidden Forest",
	[DailyQuest.MeetUpWithCacklingCannoneerInForgottenArk]:
		"Meet up with Cackling Cannoneer in Forgotten Ark",
	[DailyQuest.MeetUpWithApologeticLumberjackInBoneyard]:
		"Meet up with Apologetic Lumberjack in Boneyard",
	[DailyQuest.MeetUpWithCeasingCommodoreInForgottenArk]:
		"Meet up with Ceasing Commodore in Forgotten Ark",
	[DailyQuest.MeetUpWithJollyGeologistInPrairiePeaks]:
		"Meet up with Jolly Geologist in Prairie Peaks",
	[DailyQuest.MeetUpWithDismayedHunterInBoneyard]: "Meet up with Dismayed Hunter in Boneyard",
	[DailyQuest.MeetUpWithWhaleWhispererInBoneyard]: "Meet up with Whale Whisperer in Boneyard",
} as const satisfies Readonly<Record<DailyQuests, string>>;

export type RotationNumber = 1 | 2 | 3;

export const SEASONAL_CANDLES_ROTATION = [
	{ rotation: 1, realm: RealmName.VaultOfKnowledge },
	{ rotation: 1, realm: RealmName.DaylightPrairie },
	{ rotation: 1, realm: RealmName.HiddenForest },
	{ rotation: 2, realm: RealmName.ValleyOfTriumph },
	{ rotation: 2, realm: RealmName.GoldenWasteland },
	{ rotation: 2, realm: RealmName.VaultOfKnowledge },
	{ rotation: 2, realm: RealmName.DaylightPrairie },
	{ rotation: 2, realm: RealmName.HiddenForest },
	{ rotation: 1, realm: RealmName.ValleyOfTriumph },
	{ rotation: 1, realm: RealmName.GoldenWasteland },
] as const;

export const SEASONAL_CANDLE_ICON = String(new URL("icons/seasonal_candle.webp", CDN_URL));

export const TREASURE_CANDLES_ROTATION = {
	[RealmName.DaylightPrairie]: [
		String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
	],
	[RealmName.HiddenForest]: [
		String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
	],
	[RealmName.ValleyOfTriumph]: [
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
	],
	[RealmName.GoldenWasteland]: [
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
	],
	[RealmName.VaultOfKnowledge]: [
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
	],
} as const;

export const DOUBLE_TREASURE_CANDLES_ROTATION = {
	[RealmName.DaylightPrairie]: [
		String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
	],
	[RealmName.HiddenForest]: [
		String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
	],
	[RealmName.ValleyOfTriumph]: [
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
	],
	[RealmName.GoldenWasteland]: [
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
	],
	[RealmName.VaultOfKnowledge]: [
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
	],
} as const;
