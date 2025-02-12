import { DailyQuest, type DailyQuests, RealmName } from "@thatskyapplication/utility";

export const DEFAULT_LOCALE = "en-GB" as const;
export const CDN_URL = "https://cdn.thatskyapplication.com" as const;
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
export const SKY_KID_ICON_URL = String(new URL("assets/sky_kid.webp", CDN_URL));

export const INVITE_APPLICATION_URL =
	"https://discord.com/oauth2/authorize?client_id=982740693070012506" as const;

export const INVITE_SUPPORT_SERVER_URL = "https://discord.gg/dFJms52NgB" as const;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;

// 1:1 only.
export const HUGGING_GIFS = [
	1, 2, 4, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
] as const;

export enum Table {
	ContentCreators = "content_creators",
	DailyGuides = "daily_guides",
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
	[DailyQuest.MeetUpWithAsceticMonkInSanctuaryIslands]:
		"Meet up with Ascetic Monk in Sanctuary Islands",
	[DailyQuest.MeetUpWithNightbirdWhispererInSanctuaryIslands]:
		"Meet up with Nightbird Whisperer in Sanctuary Islands",
	[DailyQuest.MeetUpWithJollyGeologistInSanctuaryIslands]:
		"Meet up with Jolly Geologist in Sanctuary Islands",
	[DailyQuest.MeetUpWithAsceticMonkInPrairieVillage]:
		"Meet up with Ascetic Monk in Prairie Village",
} as const satisfies Readonly<Record<DailyQuests, string>>;

export type RotationNumber = 1 | 2 | 3;

export const SEASONAL_CANDLES_ROTATION = [
	{ rotation: 2, realm: RealmName.ValleyOfTriumph },
	{ rotation: 2, realm: RealmName.GoldenWasteland },
	{ rotation: 1, realm: RealmName.VaultOfKnowledge },
	{ rotation: 1, realm: RealmName.DaylightPrairie },
	{ rotation: 1, realm: RealmName.HiddenForest },
	{ rotation: 1, realm: RealmName.ValleyOfTriumph },
	{ rotation: 1, realm: RealmName.GoldenWasteland },
	{ rotation: 2, realm: RealmName.VaultOfKnowledge },
	{ rotation: 2, realm: RealmName.DaylightPrairie },
	{ rotation: 2, realm: RealmName.HiddenForest },
] as const;

export const SEASONAL_CANDLE_ICON = String(new URL("icons/seasonal_candle.webp", CDN_URL));

export const TREASURE_CANDLES_ROTATION = {
	[RealmName.DaylightPrairie]: [
		String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
	],
	[RealmName.HiddenForest]: [
		String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
	],
	[RealmName.ValleyOfTriumph]: [
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
	],
	[RealmName.GoldenWasteland]: [
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
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
