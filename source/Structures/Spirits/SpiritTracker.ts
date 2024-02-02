import {
	type ActionRow,
	type ChatInputCommandInteraction,
	type InteractionUpdateOptions,
	type MessageActionRowComponentBuilder,
	type Snowflake,
	type StringSelectMenuComponent,
	type StringSelectMenuInteraction,
	ActionRowBuilder,
	ButtonInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	type EmbedAuthorOptions,
} from "discord.js";
import type { Realm } from "../../Utility/Constants.js";
import { DEFAULT_EMBED_COLOUR } from "../../Utility/Constants.js";
import { isRealm } from "../../Utility/Utility.js";
import { todayDate } from "../../Utility/dates.js";
import { cannotUseCustomEmojis, formatEmoji, MISCELLANEOUS_EMOJIS, type Emoji } from "../../Utility/emojis.js";
import pg, { Table } from "../../pg.js";
import Profile from "../Profile.js";
import {
	isSeasonName,
	resolveFullSeasonName,
	resolveSeason,
	SeasonName,
	SeasonNameToSeasonalEmoji,
} from "../Season.js";
import {
	type ElderSpirit,
	type GuideSpirit,
	type SeasonalSpirit,
	type SpiritCost,
	type SpiritType,
	type StandardSpirit,
	type StandardSpiritRealm,
	addCurrency,
	SpiritName,
	SPIRIT_TYPE,
	resolveSpiritTypeToString,
	resolveOfferToCurrency,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
} from "./Base.js";
import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";
import Standard from "./Standard/index.js";
import Spirits from "./index.js";

type SpiritTrackerValue = number | null;

export interface SpiritTrackerPacket {
	user_id: Snowflake;
	pointing_candlemaker: SpiritTrackerValue;
	ushering_stargazer: SpiritTrackerValue;
	rejecting_voyager: SpiritTrackerValue;
	elder_of_the_isle: SpiritTrackerValue;
	butterfly_charmer: SpiritTrackerValue;
	applauding_bellmaker: SpiritTrackerValue;
	waving_bellmaker: SpiritTrackerValue;
	slumbering_shipwright: SpiritTrackerValue;
	laughing_light_catcher: SpiritTrackerValue;
	bird_whisperer: SpiritTrackerValue;
	exhausted_dock_worker: SpiritTrackerValue;
	ceremonial_worshiper: SpiritTrackerValue;
	elder_of_the_prairie: SpiritTrackerValue;
	shivering_trailblazer: SpiritTrackerValue;
	blushing_prospector: SpiritTrackerValue;
	hide_n_seek_pioneer: SpiritTrackerValue;
	pouty_porter: SpiritTrackerValue;
	dismayed_hunter: SpiritTrackerValue;
	apologetic_lumberjack: SpiritTrackerValue;
	tearful_light_miner: SpiritTrackerValue;
	whale_whisperer: SpiritTrackerValue;
	elder_of_the_forest: SpiritTrackerValue;
	confident_sightseer: SpiritTrackerValue;
	handstanding_thrillseeker: SpiritTrackerValue;
	manta_whisperer: SpiritTrackerValue;
	backflipping_champion: SpiritTrackerValue;
	cheerful_spectator: SpiritTrackerValue;
	bowing_medalist: SpiritTrackerValue;
	proud_victor: SpiritTrackerValue;
	elder_of_the_valley: SpiritTrackerValue;
	frightened_refugee: SpiritTrackerValue;
	fainting_warrior: SpiritTrackerValue;
	courageous_soldier: SpiritTrackerValue;
	stealthy_survivor: SpiritTrackerValue;
	saluting_captain: SpiritTrackerValue;
	lookout_scout: SpiritTrackerValue;
	elder_of_the_wasteland: SpiritTrackerValue;
	praying_acolyte: SpiritTrackerValue;
	levitating_adept: SpiritTrackerValue;
	polite_scholar: SpiritTrackerValue;
	memory_whisperer: SpiritTrackerValue;
	meditating_monastic: SpiritTrackerValue;
	elder_of_the_vault: SpiritTrackerValue;
	gratitude_guide: SpiritTrackerValue;
	sassy_drifter: SpiritTrackerValue;
	stretching_guru: SpiritTrackerValue;
	provoking_performer: SpiritTrackerValue;
	leaping_dancer: SpiritTrackerValue;
	saluting_protector: SpiritTrackerValue;
	greeting_shaman: SpiritTrackerValue;
	lightseekers_guide: SpiritTrackerValue;
	piggyback_lightseeker: SpiritTrackerValue;
	doublefive_light_catcher: SpiritTrackerValue;
	laidback_pioneer: SpiritTrackerValue;
	twirling_champion: SpiritTrackerValue;
	crab_whisperer: SpiritTrackerValue;
	shushing_light_scholar: SpiritTrackerValue;
	belonging_guide: SpiritTrackerValue;
	boogie_kid: SpiritTrackerValue;
	confetti_cousin: SpiritTrackerValue;
	hairtousle_teen: SpiritTrackerValue;
	sparkler_parent: SpiritTrackerValue;
	pleaful_parent: SpiritTrackerValue;
	wise_grandparent: SpiritTrackerValue;
	rhythm_guide: SpiritTrackerValue;
	troupe_greeter: SpiritTrackerValue;
	festival_spin_dancer: SpiritTrackerValue;
	admiring_actor: SpiritTrackerValue;
	troupe_juggler: SpiritTrackerValue;
	respectful_pianist: SpiritTrackerValue;
	thoughtful_director: SpiritTrackerValue;
	enchantment_guide: SpiritTrackerValue;
	nodding_muralist: SpiritTrackerValue;
	indifferent_alchemist: SpiritTrackerValue;
	crab_walker: SpiritTrackerValue;
	scarecrow_farmer: SpiritTrackerValue;
	snoozing_carpenter: SpiritTrackerValue;
	playfighting_herbalist: SpiritTrackerValue;
	sanctuary_guide: SpiritTrackerValue;
	jelly_whisperer: SpiritTrackerValue;
	timid_bookworm: SpiritTrackerValue;
	rallying_thrillseeker: SpiritTrackerValue;
	hiking_grouch: SpiritTrackerValue;
	grateful_shell_collector: SpiritTrackerValue;
	chill_sunbather: SpiritTrackerValue;
	prophecy_guide: SpiritTrackerValue;
	prophet_of_water: SpiritTrackerValue;
	prophet_of_earth: SpiritTrackerValue;
	prophet_of_air: SpiritTrackerValue;
	prophet_of_fire: SpiritTrackerValue;
	dreams_guide: SpiritTrackerValue;
	spinning_mentor: SpiritTrackerValue;
	dancing_performer: SpiritTrackerValue;
	peeking_postman: SpiritTrackerValue;
	bearhug_hermit: SpiritTrackerValue;
	assembly_guide: SpiritTrackerValue;
	baffled_botanist: SpiritTrackerValue;
	scolding_student: SpiritTrackerValue;
	scaredy_cadet: SpiritTrackerValue;
	marching_adventurer: SpiritTrackerValue;
	chuckling_scout: SpiritTrackerValue;
	daydream_forester: SpiritTrackerValue;
	the_rose: SpiritTrackerValue;
	beckoning_ruler: SpiritTrackerValue;
	gloating_narcissist: SpiritTrackerValue;
	stretching_lamplighter: SpiritTrackerValue;
	slouching_soldier: SpiritTrackerValue;
	sneezing_geographer: SpiritTrackerValue;
	star_collector: SpiritTrackerValue;
	flight_guide: SpiritTrackerValue;
	lively_navigator: SpiritTrackerValue;
	light_whisperer: SpiritTrackerValue;
	tinkering_chimesmith: SpiritTrackerValue;
	talented_builder: SpiritTrackerValue;
	abyss_guide: SpiritTrackerValue;
	anxious_angler: SpiritTrackerValue;
	ceasing_commodore: SpiritTrackerValue;
	bumbling_boatswain: SpiritTrackerValue;
	cackling_cannoneer: SpiritTrackerValue;
	performance_guide: SpiritTrackerValue;
	frantic_stagehand: SpiritTrackerValue;
	forgetful_storyteller: SpiritTrackerValue;
	mellow_musician: SpiritTrackerValue;
	modest_dancer: SpiritTrackerValue;
	the_void_of_shattering: SpiritTrackerValue;
	ancient_light1: SpiritTrackerValue;
	ancient_light2: SpiritTrackerValue;
	ancient_darkness1: SpiritTrackerValue;
	ancient_darkness2: SpiritTrackerValue;
	aurora: SpiritTrackerValue;
	running_wayfarer: SpiritTrackerValue;
	mindful_miner: SpiritTrackerValue;
	warrior_of_love: SpiritTrackerValue;
	seed_of_hope: SpiritTrackerValue;
	remembrance_guide: SpiritTrackerValue;
	bereft_veteran: SpiritTrackerValue;
	pleading_child: SpiritTrackerValue;
	tiptoeing_tea_brewer: SpiritTrackerValue;
	wounded_warrior: SpiritTrackerValue;
	passage_guide: SpiritTrackerValue;
	oddball_outcast: SpiritTrackerValue;
	tumbling_troublemaker: SpiritTrackerValue;
	melancholy_mope: SpiritTrackerValue;
	overactive_overachiever: SpiritTrackerValue;
	moments_guide: SpiritTrackerValue;
	reassuring_ranger: SpiritTrackerValue;
	nightbird_whisperer: SpiritTrackerValue;
	jolly_geologist: SpiritTrackerValue;
	ascetic_monk: SpiritTrackerValue;
	hopeful_steward: SpiritTrackerValue;
	vestige_of_a_deserted_oasis: SpiritTrackerValue;
	memory_of_a_lost_village: SpiritTrackerValue;
	echo_of_an_abandoned_refuge: SpiritTrackerValue;
	remnant_of_a_forgotten_haven: SpiritTrackerValue;
	spirit_of_mural: SpiritTrackerValue;
	herb_gatherer: SpiritTrackerValue;
	hunter: SpiritTrackerValue;
	feudal_lord: SpiritTrackerValue;
	princess: SpiritTrackerValue;
}

interface SpiritTrackerData {
	userId: SpiritTrackerPacket["user_id"];
	pointingCandlemaker: SpiritTrackerPacket["pointing_candlemaker"];
	usheringStargazer: SpiritTrackerPacket["ushering_stargazer"];
	rejectingVoyager: SpiritTrackerPacket["rejecting_voyager"];
	elderOfTheIsle: SpiritTrackerPacket["elder_of_the_isle"];
	butterflyCharmer: SpiritTrackerPacket["butterfly_charmer"];
	applaudingBellmaker: SpiritTrackerPacket["applauding_bellmaker"];
	wavingBellmaker: SpiritTrackerPacket["waving_bellmaker"];
	slumberingShipwright: SpiritTrackerPacket["slumbering_shipwright"];
	laughingLightCatcher: SpiritTrackerPacket["laughing_light_catcher"];
	birdWhisperer: SpiritTrackerPacket["bird_whisperer"];
	exhaustedDockWorker: SpiritTrackerPacket["exhausted_dock_worker"];
	ceremonialWorshiper: SpiritTrackerPacket["ceremonial_worshiper"];
	elderOfThePrairie: SpiritTrackerPacket["elder_of_the_prairie"];
	shiveringTrailblazer: SpiritTrackerPacket["shivering_trailblazer"];
	blushingProspector: SpiritTrackerPacket["blushing_prospector"];
	hideNSeekPioneer: SpiritTrackerPacket["hide_n_seek_pioneer"];
	poutyPorter: SpiritTrackerPacket["pouty_porter"];
	dismayedHunter: SpiritTrackerPacket["dismayed_hunter"];
	apologeticLumberjack: SpiritTrackerPacket["apologetic_lumberjack"];
	tearfulLightMiner: SpiritTrackerPacket["tearful_light_miner"];
	whaleWhisperer: SpiritTrackerPacket["whale_whisperer"];
	elderOfTheForest: SpiritTrackerPacket["elder_of_the_forest"];
	confidentSightseer: SpiritTrackerPacket["confident_sightseer"];
	handstandingThrillseeker: SpiritTrackerPacket["handstanding_thrillseeker"];
	mantaWhisperer: SpiritTrackerPacket["manta_whisperer"];
	backflippingChampion: SpiritTrackerPacket["backflipping_champion"];
	cheerfulSpectator: SpiritTrackerPacket["cheerful_spectator"];
	bowingMedalist: SpiritTrackerPacket["bowing_medalist"];
	proudVictor: SpiritTrackerPacket["proud_victor"];
	elderOfTheValley: SpiritTrackerPacket["elder_of_the_valley"];
	frightenedRefugee: SpiritTrackerPacket["frightened_refugee"];
	faintingWarrior: SpiritTrackerPacket["fainting_warrior"];
	courageousSoldier: SpiritTrackerPacket["courageous_soldier"];
	stealthySurvivor: SpiritTrackerPacket["stealthy_survivor"];
	salutingCaptain: SpiritTrackerPacket["saluting_captain"];
	lookoutScout: SpiritTrackerPacket["lookout_scout"];
	elderOfTheWasteland: SpiritTrackerPacket["elder_of_the_wasteland"];
	prayingAcolyte: SpiritTrackerPacket["praying_acolyte"];
	levitatingAdept: SpiritTrackerPacket["levitating_adept"];
	politeScholar: SpiritTrackerPacket["polite_scholar"];
	memoryWhisperer: SpiritTrackerPacket["memory_whisperer"];
	meditatingMonastic: SpiritTrackerPacket["meditating_monastic"];
	elderOfTheVault: SpiritTrackerPacket["elder_of_the_vault"];
	gratitudeGuide: SpiritTrackerPacket["gratitude_guide"];
	sassyDrifter: SpiritTrackerPacket["sassy_drifter"];
	stretchingGuru: SpiritTrackerPacket["stretching_guru"];
	provokingPerformer: SpiritTrackerPacket["provoking_performer"];
	leapingDancer: SpiritTrackerPacket["leaping_dancer"];
	salutingProtector: SpiritTrackerPacket["saluting_protector"];
	greetingShaman: SpiritTrackerPacket["greeting_shaman"];
	lightseekersGuide: SpiritTrackerPacket["lightseekers_guide"];
	piggybackLightseeker: SpiritTrackerPacket["piggyback_lightseeker"];
	doublefiveLightCatcher: SpiritTrackerPacket["doublefive_light_catcher"];
	laidbackPioneer: SpiritTrackerPacket["laidback_pioneer"];
	twirlingChampion: SpiritTrackerPacket["twirling_champion"];
	crabWhisperer: SpiritTrackerPacket["crab_whisperer"];
	shushingLightScholar: SpiritTrackerPacket["shushing_light_scholar"];
	belongingGuide: SpiritTrackerPacket["belonging_guide"];
	boogieKid: SpiritTrackerPacket["boogie_kid"];
	confettiCousin: SpiritTrackerPacket["confetti_cousin"];
	hairtousleTeen: SpiritTrackerPacket["hairtousle_teen"];
	sparklerParent: SpiritTrackerPacket["sparkler_parent"];
	pleafulParent: SpiritTrackerPacket["pleaful_parent"];
	wiseGrandparent: SpiritTrackerPacket["wise_grandparent"];
	rhythmGuide: SpiritTrackerPacket["rhythm_guide"];
	troupeGreeter: SpiritTrackerPacket["troupe_greeter"];
	festivalSpinDancer: SpiritTrackerPacket["festival_spin_dancer"];
	admiringActor: SpiritTrackerPacket["admiring_actor"];
	troupeJuggler: SpiritTrackerPacket["troupe_juggler"];
	respectfulPianist: SpiritTrackerPacket["respectful_pianist"];
	thoughtfulDirector: SpiritTrackerPacket["thoughtful_director"];
	enchantmentGuide: SpiritTrackerPacket["enchantment_guide"];
	noddingMuralist: SpiritTrackerPacket["nodding_muralist"];
	indifferentAlchemist: SpiritTrackerPacket["indifferent_alchemist"];
	crabWalker: SpiritTrackerPacket["crab_walker"];
	scarecrowFarmer: SpiritTrackerPacket["scarecrow_farmer"];
	snoozingCarpenter: SpiritTrackerPacket["snoozing_carpenter"];
	playfightingHerbalist: SpiritTrackerPacket["playfighting_herbalist"];
	sanctuaryGuide: SpiritTrackerPacket["sanctuary_guide"];
	jellyWhisperer: SpiritTrackerPacket["jelly_whisperer"];
	timidBookworm: SpiritTrackerPacket["timid_bookworm"];
	rallyingThrillseeker: SpiritTrackerPacket["rallying_thrillseeker"];
	hikingGrouch: SpiritTrackerPacket["hiking_grouch"];
	gratefulShellCollector: SpiritTrackerPacket["grateful_shell_collector"];
	chillSunbather: SpiritTrackerPacket["chill_sunbather"];
	prophecyGuide: SpiritTrackerPacket["prophecy_guide"];
	prophetOfWater: SpiritTrackerPacket["prophet_of_water"];
	prophetOfEarth: SpiritTrackerPacket["prophet_of_earth"];
	prophetOfAir: SpiritTrackerPacket["prophet_of_air"];
	prophetOfFire: SpiritTrackerPacket["prophet_of_fire"];
	dreamsGuide: SpiritTrackerPacket["dreams_guide"];
	spinningMentor: SpiritTrackerPacket["spinning_mentor"];
	dancingPerformer: SpiritTrackerPacket["dancing_performer"];
	peekingPostman: SpiritTrackerPacket["peeking_postman"];
	bearhugHermit: SpiritTrackerPacket["bearhug_hermit"];
	assemblyGuide: SpiritTrackerPacket["assembly_guide"];
	baffledBotanist: SpiritTrackerPacket["baffled_botanist"];
	scoldingStudent: SpiritTrackerPacket["scolding_student"];
	scaredyCadet: SpiritTrackerPacket["scaredy_cadet"];
	marchingAdventurer: SpiritTrackerPacket["marching_adventurer"];
	chucklingScout: SpiritTrackerPacket["chuckling_scout"];
	daydreamForester: SpiritTrackerPacket["daydream_forester"];
	theRose: SpiritTrackerPacket["the_rose"];
	beckoningRuler: SpiritTrackerPacket["beckoning_ruler"];
	gloatingNarcissist: SpiritTrackerPacket["gloating_narcissist"];
	stretchingLamplighter: SpiritTrackerPacket["stretching_lamplighter"];
	slouchingSoldier: SpiritTrackerPacket["slouching_soldier"];
	sneezingGeographer: SpiritTrackerPacket["sneezing_geographer"];
	starCollector: SpiritTrackerPacket["star_collector"];
	flightGuide: SpiritTrackerPacket["flight_guide"];
	livelyNavigator: SpiritTrackerPacket["lively_navigator"];
	lightWhisperer: SpiritTrackerPacket["light_whisperer"];
	tinkeringChimesmith: SpiritTrackerPacket["tinkering_chimesmith"];
	talentedBuilder: SpiritTrackerPacket["talented_builder"];
	abyssGuide: SpiritTrackerPacket["abyss_guide"];
	anxiousAngler: SpiritTrackerPacket["anxious_angler"];
	ceasingCommodore: SpiritTrackerPacket["ceasing_commodore"];
	bumblingBoatswain: SpiritTrackerPacket["bumbling_boatswain"];
	cacklingCannoneer: SpiritTrackerPacket["cackling_cannoneer"];
	performanceGuide: SpiritTrackerPacket["performance_guide"];
	franticStagehand: SpiritTrackerPacket["frantic_stagehand"];
	forgetfulStoryteller: SpiritTrackerPacket["forgetful_storyteller"];
	mellowMusician: SpiritTrackerPacket["mellow_musician"];
	modestDancer: SpiritTrackerPacket["modest_dancer"];
	theVoidOfShattering: SpiritTrackerPacket["the_void_of_shattering"];
	ancientLight1: SpiritTrackerPacket["ancient_light1"];
	ancientLight2: SpiritTrackerPacket["ancient_light2"];
	ancientDarkness1: SpiritTrackerPacket["ancient_darkness1"];
	ancientDarkness2: SpiritTrackerPacket["ancient_darkness2"];
	aurora: SpiritTrackerPacket["aurora"];
	runningWayfarer: SpiritTrackerPacket["running_wayfarer"];
	mindfulMiner: SpiritTrackerPacket["mindful_miner"];
	warriorOfLove: SpiritTrackerPacket["warrior_of_love"];
	seedOfHope: SpiritTrackerPacket["seed_of_hope"];
	remembranceGuide: SpiritTrackerPacket["remembrance_guide"];
	bereftVeteran: SpiritTrackerPacket["bereft_veteran"];
	pleadingChild: SpiritTrackerPacket["pleading_child"];
	tiptoeingTeaBrewer: SpiritTrackerPacket["tiptoeing_tea_brewer"];
	woundedWarrior: SpiritTrackerPacket["wounded_warrior"];
	passageGuide: SpiritTrackerPacket["passage_guide"];
	oddballOutcast: SpiritTrackerPacket["oddball_outcast"];
	tumblingTroublemaker: SpiritTrackerPacket["tumbling_troublemaker"];
	melancholyMope: SpiritTrackerPacket["melancholy_mope"];
	overactiveOverachiever: SpiritTrackerPacket["overactive_overachiever"];
	momentsGuide: SpiritTrackerPacket["moments_guide"];
	reassuringRanger: SpiritTrackerPacket["reassuring_ranger"];
	nightbirdWhisperer: SpiritTrackerPacket["nightbird_whisperer"];
	jollyGeologist: SpiritTrackerPacket["jolly_geologist"];
	asceticMonk: SpiritTrackerPacket["ascetic_monk"];
	hopefulSteward: SpiritTrackerPacket["hopeful_steward"];
	vestigeOfADesertedOasis: SpiritTrackerPacket["vestige_of_a_deserted_oasis"];
	memoryOfALostVillage: SpiritTrackerPacket["memory_of_a_lost_village"];
	echoOfAnAbandonedRefuge: SpiritTrackerPacket["echo_of_an_abandoned_refuge"];
	remnantOfAForgottenHaven: SpiritTrackerPacket["remnant_of_a_forgotten_haven"];
	spiritOfMural: SpiritTrackerPacket["spirit_of_mural"];
	herbGatherer: SpiritTrackerPacket["herb_gatherer"];
	hunter: SpiritTrackerPacket["hunter"];
	feudalLord: SpiritTrackerPacket["feudal_lord"];
	princess: SpiritTrackerPacket["princess"];
}

type SpiritTrackerPatchData = Omit<SpiritTrackerPacket, "user_id">;
type SpiritTracketSetData = Partial<Omit<SpiritTrackerPacket, "user_id">>;

const SpiritTrackerNameToRawName = {
	[SpiritName.PointingCandlemaker]: "pointing_candlemaker",
	[SpiritName.UsheringStargazer]: "ushering_stargazer",
	[SpiritName.RejectingVoyager]: "rejecting_voyager",
	[SpiritName.ElderOfTheIsle]: "elder_of_the_isle",
	[SpiritName.ButterflyCharmer]: "butterfly_charmer",
	[SpiritName.ApplaudingBellmaker]: "applauding_bellmaker",
	[SpiritName.WavingBellmaker]: "waving_bellmaker",
	[SpiritName.SlumberingShipwright]: "slumbering_shipwright",
	[SpiritName.LaughingLightCatcher]: "laughing_light_catcher",
	[SpiritName.BirdWhisperer]: "bird_whisperer",
	[SpiritName.ExhaustedDockWorker]: "exhausted_dock_worker",
	[SpiritName.CeremonialWorshiper]: "ceremonial_worshiper",
	[SpiritName.ElderOfThePrairie]: "elder_of_the_prairie",
	[SpiritName.ShiveringTrailblazer]: "shivering_trailblazer",
	[SpiritName.BlushingProspector]: "blushing_prospector",
	[SpiritName.HideNSeekPioneer]: "hide_n_seek_pioneer",
	[SpiritName.PoutyPorter]: "pouty_porter",
	[SpiritName.DismayedHunter]: "dismayed_hunter",
	[SpiritName.ApologeticLumberjack]: "apologetic_lumberjack",
	[SpiritName.TearfulLightMiner]: "tearful_light_miner",
	[SpiritName.WhaleWhisperer]: "whale_whisperer",
	[SpiritName.ElderOfTheForest]: "elder_of_the_forest",
	[SpiritName.ConfidentSightseer]: "confident_sightseer",
	[SpiritName.HandstandingThrillseeker]: "handstanding_thrillseeker",
	[SpiritName.MantaWhisperer]: "manta_whisperer",
	[SpiritName.BackflippingChampion]: "backflipping_champion",
	[SpiritName.CheerfulSpectator]: "cheerful_spectator",
	[SpiritName.BowingMedalist]: "bowing_medalist",
	[SpiritName.ProudVictor]: "proud_victor",
	[SpiritName.ElderOfTheValley]: "elder_of_the_valley",
	[SpiritName.FrightenedRefugee]: "frightened_refugee",
	[SpiritName.FaintingWarrior]: "fainting_warrior",
	[SpiritName.CourageousSoldier]: "courageous_soldier",
	[SpiritName.StealthySurvivor]: "stealthy_survivor",
	[SpiritName.SalutingCaptain]: "saluting_captain",
	[SpiritName.LookoutScout]: "lookout_scout",
	[SpiritName.ElderOfTheWasteland]: "elder_of_the_wasteland",
	[SpiritName.PrayingAcolyte]: "praying_acolyte",
	[SpiritName.LevitatingAdept]: "levitating_adept",
	[SpiritName.PoliteScholar]: "polite_scholar",
	[SpiritName.MemoryWhisperer]: "memory_whisperer",
	[SpiritName.MeditatingMonastic]: "meditating_monastic",
	[SpiritName.ElderOfTheVault]: "elder_of_the_vault",
	[SpiritName.GratitudeGuide]: "gratitude_guide",
	[SpiritName.SassyDrifter]: "sassy_drifter",
	[SpiritName.StretchingGuru]: "stretching_guru",
	[SpiritName.ProvokingPerformer]: "provoking_performer",
	[SpiritName.LeapingDancer]: "leaping_dancer",
	[SpiritName.SalutingProtector]: "saluting_protector",
	[SpiritName.GreetingShaman]: "greeting_shaman",
	[SpiritName.LightseekersGuide]: "lightseekers_guide",
	[SpiritName.PiggybackLightseeker]: "piggyback_lightseeker",
	[SpiritName.DoublefiveLightCatcher]: "doublefive_light_catcher",
	[SpiritName.LaidbackPioneer]: "laidback_pioneer",
	[SpiritName.TwirlingChampion]: "twirling_champion",
	[SpiritName.CrabWhisperer]: "crab_whisperer",
	[SpiritName.ShushingLightScholar]: "shushing_light_scholar",
	[SpiritName.BelongingGuide]: "belonging_guide",
	[SpiritName.BoogieKid]: "boogie_kid",
	[SpiritName.ConfettiCousin]: "confetti_cousin",
	[SpiritName.HairtousleTeen]: "hairtousle_teen",
	[SpiritName.SparklerParent]: "sparkler_parent",
	[SpiritName.PleafulParent]: "pleaful_parent",
	[SpiritName.WiseGrandparent]: "wise_grandparent",
	[SpiritName.RhythmGuide]: "rhythm_guide",
	[SpiritName.TroupeGreeter]: "troupe_greeter",
	[SpiritName.FestivalSpinDancer]: "festival_spin_dancer",
	[SpiritName.AdmiringActor]: "admiring_actor",
	[SpiritName.TroupeJuggler]: "troupe_juggler",
	[SpiritName.RespectfulPianist]: "respectful_pianist",
	[SpiritName.ThoughtfulDirector]: "thoughtful_director",
	[SpiritName.EnchantmentGuide]: "enchantment_guide",
	[SpiritName.NoddingMuralist]: "nodding_muralist",
	[SpiritName.IndifferentAlchemist]: "indifferent_alchemist",
	[SpiritName.CrabWalker]: "crab_walker",
	[SpiritName.ScarecrowFarmer]: "scarecrow_farmer",
	[SpiritName.SnoozingCarpenter]: "snoozing_carpenter",
	[SpiritName.PlayfightingHerbalist]: "playfighting_herbalist",
	[SpiritName.SanctuaryGuide]: "sanctuary_guide",
	[SpiritName.JellyWhisperer]: "jelly_whisperer",
	[SpiritName.TimidBookworm]: "timid_bookworm",
	[SpiritName.RallyingThrillseeker]: "rallying_thrillseeker",
	[SpiritName.HikingGrouch]: "hiking_grouch",
	[SpiritName.GratefulShellCollector]: "grateful_shell_collector",
	[SpiritName.ChillSunbather]: "chill_sunbather",
	[SpiritName.ProphecyGuide]: "prophecy_guide",
	[SpiritName.ProphetOfWater]: "prophet_of_water",
	[SpiritName.ProphetOfEarth]: "prophet_of_earth",
	[SpiritName.ProphetOfAir]: "prophet_of_air",
	[SpiritName.ProphetOfFire]: "prophet_of_fire",
	[SpiritName.DreamsGuide]: "dreams_guide",
	[SpiritName.SpinningMentor]: "spinning_mentor",
	[SpiritName.DancingPerformer]: "dancing_performer",
	[SpiritName.PeekingPostman]: "peeking_postman",
	[SpiritName.BearhugHermit]: "bearhug_hermit",
	[SpiritName.AssemblyGuide]: "assembly_guide",
	[SpiritName.BaffledBotanist]: "baffled_botanist",
	[SpiritName.ScoldingStudent]: "scolding_student",
	[SpiritName.ScaredyCadet]: "scaredy_cadet",
	[SpiritName.MarchingAdventurer]: "marching_adventurer",
	[SpiritName.ChucklingScout]: "chuckling_scout",
	[SpiritName.DaydreamForester]: "daydream_forester",
	[SpiritName.TheRose]: "the_rose",
	[SpiritName.BeckoningRuler]: "beckoning_ruler",
	[SpiritName.GloatingNarcissist]: "gloating_narcissist",
	[SpiritName.StretchingLamplighter]: "stretching_lamplighter",
	[SpiritName.SlouchingSoldier]: "slouching_soldier",
	[SpiritName.SneezingGeographer]: "sneezing_geographer",
	[SpiritName.StarCollector]: "star_collector",
	[SpiritName.FlightGuide]: "flight_guide",
	[SpiritName.LivelyNavigator]: "lively_navigator",
	[SpiritName.LightWhisperer]: "light_whisperer",
	[SpiritName.TinkeringChimesmith]: "tinkering_chimesmith",
	[SpiritName.TalentedBuilder]: "talented_builder",
	[SpiritName.AbyssGuide]: "abyss_guide",
	[SpiritName.AnxiousAngler]: "anxious_angler",
	[SpiritName.CeasingCommodore]: "ceasing_commodore",
	[SpiritName.BumblingBoatswain]: "bumbling_boatswain",
	[SpiritName.CacklingCannoneer]: "cackling_cannoneer",
	[SpiritName.PerformanceGuide]: "performance_guide",
	[SpiritName.FranticStagehand]: "frantic_stagehand",
	[SpiritName.ForgetfulStoryteller]: "forgetful_storyteller",
	[SpiritName.MellowMusician]: "mellow_musician",
	[SpiritName.ModestDancer]: "modest_dancer",
	[SpiritName.TheVoidOfShattering]: "the_void_of_shattering",
	[SpiritName.AncientLight1]: "ancient_light1",
	[SpiritName.AncientLight2]: "ancient_light2",
	[SpiritName.AncientDarkness1]: "ancient_darkness1",
	[SpiritName.AncientDarkness2]: "ancient_darkness2",
	[SpiritName.AURORA]: "aurora",
	[SpiritName.RunningWayfarer]: "running_wayfarer",
	[SpiritName.MindfulMiner]: "mindful_miner",
	[SpiritName.WarriorOfLove]: "warrior_of_love",
	[SpiritName.SeedOfHope]: "seed_of_hope",
	[SpiritName.RemembranceGuide]: "remembrance_guide",
	[SpiritName.BereftVeteran]: "bereft_veteran",
	[SpiritName.PleadingChild]: "pleading_child",
	[SpiritName.TiptoeingTeaBrewer]: "tiptoeing_tea_brewer",
	[SpiritName.WoundedWarrior]: "wounded_warrior",
	[SpiritName.PassageGuide]: "passage_guide",
	[SpiritName.OddballOutcast]: "oddball_outcast",
	[SpiritName.TumblingTroublemaker]: "tumbling_troublemaker",
	[SpiritName.MelancholyMope]: "melancholy_mope",
	[SpiritName.OveractiveOverachiever]: "overactive_overachiever",
	[SpiritName.MomentsGuide]: "moments_guide",
	[SpiritName.ReassuringRanger]: "reassuring_ranger",
	[SpiritName.NightbirdWhisperer]: "nightbird_whisperer",
	[SpiritName.JollyGeologist]: "jolly_geologist",
	[SpiritName.AsceticMonk]: "ascetic_monk",
	[SpiritName.HopefulSteward]: "hopeful_steward",
	[SpiritName.VestigeOfADesertedOasis]: "vestige_of_a_deserted_oasis",
	[SpiritName.MemoryOfALostVillage]: "memory_of_a_lost_village",
	[SpiritName.EchoOfAnAbandonedRefuge]: "echo_of_an_abandoned_refuge",
	[SpiritName.RemnantOfAForgottenHaven]: "remnant_of_a_forgotten_haven",
	[SpiritName.SpiritOfMural]: "spirit_of_mural",
	[SpiritName.HerbGatherer]: "herb_gatherer",
	[SpiritName.Hunter]: "hunter",
	[SpiritName.FeudalLord]: "feudal_lord",
	[SpiritName.Princess]: "princess",
} as const satisfies Readonly<Record<SpiritName, Exclude<keyof SpiritTrackerPacket, "user_id">>>;

const SpiritNameToSpiritTrackerName = {
	[SpiritName.PointingCandlemaker]: "pointingCandlemaker",
	[SpiritName.UsheringStargazer]: "usheringStargazer",
	[SpiritName.RejectingVoyager]: "rejectingVoyager",
	[SpiritName.ElderOfTheIsle]: "elderOfTheIsle",
	[SpiritName.ButterflyCharmer]: "butterflyCharmer",
	[SpiritName.ApplaudingBellmaker]: "applaudingBellmaker",
	[SpiritName.WavingBellmaker]: "wavingBellmaker",
	[SpiritName.SlumberingShipwright]: "slumberingShipwright",
	[SpiritName.LaughingLightCatcher]: "laughingLightCatcher",
	[SpiritName.BirdWhisperer]: "birdWhisperer",
	[SpiritName.ExhaustedDockWorker]: "exhaustedDockWorker",
	[SpiritName.CeremonialWorshiper]: "ceremonialWorshiper",
	[SpiritName.ElderOfThePrairie]: "elderOfThePrairie",
	[SpiritName.ShiveringTrailblazer]: "shiveringTrailblazer",
	[SpiritName.BlushingProspector]: "blushingProspector",
	[SpiritName.HideNSeekPioneer]: "hideNSeekPioneer",
	[SpiritName.PoutyPorter]: "poutyPorter",
	[SpiritName.DismayedHunter]: "dismayedHunter",
	[SpiritName.ApologeticLumberjack]: "apologeticLumberjack",
	[SpiritName.TearfulLightMiner]: "tearfulLightMiner",
	[SpiritName.WhaleWhisperer]: "whaleWhisperer",
	[SpiritName.ElderOfTheForest]: "elderOfTheForest",
	[SpiritName.ConfidentSightseer]: "confidentSightseer",
	[SpiritName.HandstandingThrillseeker]: "handstandingThrillseeker",
	[SpiritName.MantaWhisperer]: "mantaWhisperer",
	[SpiritName.BackflippingChampion]: "backflippingChampion",
	[SpiritName.CheerfulSpectator]: "cheerfulSpectator",
	[SpiritName.BowingMedalist]: "bowingMedalist",
	[SpiritName.ProudVictor]: "proudVictor",
	[SpiritName.ElderOfTheValley]: "elderOfTheValley",
	[SpiritName.FrightenedRefugee]: "frightenedRefugee",
	[SpiritName.FaintingWarrior]: "faintingWarrior",
	[SpiritName.CourageousSoldier]: "courageousSoldier",
	[SpiritName.StealthySurvivor]: "stealthySurvivor",
	[SpiritName.SalutingCaptain]: "salutingCaptain",
	[SpiritName.LookoutScout]: "lookoutScout",
	[SpiritName.ElderOfTheWasteland]: "elderOfTheWasteland",
	[SpiritName.PrayingAcolyte]: "prayingAcolyte",
	[SpiritName.LevitatingAdept]: "levitatingAdept",
	[SpiritName.PoliteScholar]: "politeScholar",
	[SpiritName.MemoryWhisperer]: "memoryWhisperer",
	[SpiritName.MeditatingMonastic]: "meditatingMonastic",
	[SpiritName.ElderOfTheVault]: "elderOfTheVault",
	[SpiritName.GratitudeGuide]: "gratitudeGuide",
	[SpiritName.SassyDrifter]: "sassyDrifter",
	[SpiritName.StretchingGuru]: "stretchingGuru",
	[SpiritName.ProvokingPerformer]: "provokingPerformer",
	[SpiritName.LeapingDancer]: "leapingDancer",
	[SpiritName.SalutingProtector]: "salutingProtector",
	[SpiritName.GreetingShaman]: "greetingShaman",
	[SpiritName.LightseekersGuide]: "lightseekersGuide",
	[SpiritName.PiggybackLightseeker]: "piggybackLightseeker",
	[SpiritName.DoublefiveLightCatcher]: "doublefiveLightCatcher",
	[SpiritName.LaidbackPioneer]: "laidbackPioneer",
	[SpiritName.TwirlingChampion]: "twirlingChampion",
	[SpiritName.CrabWhisperer]: "crabWhisperer",
	[SpiritName.ShushingLightScholar]: "shushingLightScholar",
	[SpiritName.BelongingGuide]: "belongingGuide",
	[SpiritName.BoogieKid]: "boogieKid",
	[SpiritName.ConfettiCousin]: "confettiCousin",
	[SpiritName.HairtousleTeen]: "hairtousleTeen",
	[SpiritName.SparklerParent]: "sparklerParent",
	[SpiritName.PleafulParent]: "pleafulParent",
	[SpiritName.WiseGrandparent]: "wiseGrandparent",
	[SpiritName.RhythmGuide]: "rhythmGuide",
	[SpiritName.TroupeGreeter]: "troupeGreeter",
	[SpiritName.FestivalSpinDancer]: "festivalSpinDancer",
	[SpiritName.AdmiringActor]: "admiringActor",
	[SpiritName.TroupeJuggler]: "troupeJuggler",
	[SpiritName.RespectfulPianist]: "respectfulPianist",
	[SpiritName.ThoughtfulDirector]: "thoughtfulDirector",
	[SpiritName.EnchantmentGuide]: "enchantmentGuide",
	[SpiritName.NoddingMuralist]: "noddingMuralist",
	[SpiritName.IndifferentAlchemist]: "indifferentAlchemist",
	[SpiritName.CrabWalker]: "crabWalker",
	[SpiritName.ScarecrowFarmer]: "scarecrowFarmer",
	[SpiritName.SnoozingCarpenter]: "snoozingCarpenter",
	[SpiritName.PlayfightingHerbalist]: "playfightingHerbalist",
	[SpiritName.SanctuaryGuide]: "sanctuaryGuide",
	[SpiritName.JellyWhisperer]: "jellyWhisperer",
	[SpiritName.TimidBookworm]: "timidBookworm",
	[SpiritName.RallyingThrillseeker]: "rallyingThrillseeker",
	[SpiritName.HikingGrouch]: "hikingGrouch",
	[SpiritName.GratefulShellCollector]: "gratefulShellCollector",
	[SpiritName.ChillSunbather]: "chillSunbather",
	[SpiritName.ProphecyGuide]: "prophecyGuide",
	[SpiritName.ProphetOfWater]: "prophetOfWater",
	[SpiritName.ProphetOfEarth]: "prophetOfEarth",
	[SpiritName.ProphetOfAir]: "prophetOfAir",
	[SpiritName.ProphetOfFire]: "prophetOfFire",
	[SpiritName.DreamsGuide]: "dreamsGuide",
	[SpiritName.SpinningMentor]: "spinningMentor",
	[SpiritName.DancingPerformer]: "dancingPerformer",
	[SpiritName.PeekingPostman]: "peekingPostman",
	[SpiritName.BearhugHermit]: "bearhugHermit",
	[SpiritName.AssemblyGuide]: "assemblyGuide",
	[SpiritName.BaffledBotanist]: "baffledBotanist",
	[SpiritName.ScoldingStudent]: "scoldingStudent",
	[SpiritName.ScaredyCadet]: "scaredyCadet",
	[SpiritName.MarchingAdventurer]: "marchingAdventurer",
	[SpiritName.ChucklingScout]: "chucklingScout",
	[SpiritName.DaydreamForester]: "daydreamForester",
	[SpiritName.TheRose]: "theRose",
	[SpiritName.BeckoningRuler]: "beckoningRuler",
	[SpiritName.GloatingNarcissist]: "gloatingNarcissist",
	[SpiritName.StretchingLamplighter]: "stretchingLamplighter",
	[SpiritName.SlouchingSoldier]: "slouchingSoldier",
	[SpiritName.SneezingGeographer]: "sneezingGeographer",
	[SpiritName.StarCollector]: "starCollector",
	[SpiritName.FlightGuide]: "flightGuide",
	[SpiritName.LivelyNavigator]: "livelyNavigator",
	[SpiritName.LightWhisperer]: "lightWhisperer",
	[SpiritName.TinkeringChimesmith]: "tinkeringChimesmith",
	[SpiritName.TalentedBuilder]: "talentedBuilder",
	[SpiritName.AbyssGuide]: "abyssGuide",
	[SpiritName.AnxiousAngler]: "anxiousAngler",
	[SpiritName.CeasingCommodore]: "ceasingCommodore",
	[SpiritName.BumblingBoatswain]: "bumblingBoatswain",
	[SpiritName.CacklingCannoneer]: "cacklingCannoneer",
	[SpiritName.PerformanceGuide]: "performanceGuide",
	[SpiritName.FranticStagehand]: "franticStagehand",
	[SpiritName.ForgetfulStoryteller]: "forgetfulStoryteller",
	[SpiritName.MellowMusician]: "mellowMusician",
	[SpiritName.ModestDancer]: "modestDancer",
	[SpiritName.TheVoidOfShattering]: "theVoidOfShattering",
	[SpiritName.AncientLight1]: "ancientLight1",
	[SpiritName.AncientLight2]: "ancientLight2",
	[SpiritName.AncientDarkness1]: "ancientDarkness1",
	[SpiritName.AncientDarkness2]: "ancientDarkness2",
	[SpiritName.AURORA]: "aurora",
	[SpiritName.RunningWayfarer]: "runningWayfarer",
	[SpiritName.MindfulMiner]: "mindfulMiner",
	[SpiritName.WarriorOfLove]: "warriorOfLove",
	[SpiritName.SeedOfHope]: "seedOfHope",
	[SpiritName.RemembranceGuide]: "remembranceGuide",
	[SpiritName.BereftVeteran]: "bereftVeteran",
	[SpiritName.PleadingChild]: "pleadingChild",
	[SpiritName.TiptoeingTeaBrewer]: "tiptoeingTeaBrewer",
	[SpiritName.WoundedWarrior]: "woundedWarrior",
	[SpiritName.PassageGuide]: "passageGuide",
	[SpiritName.OddballOutcast]: "oddballOutcast",
	[SpiritName.TumblingTroublemaker]: "tumblingTroublemaker",
	[SpiritName.MelancholyMope]: "melancholyMope",
	[SpiritName.OveractiveOverachiever]: "overactiveOverachiever",
	[SpiritName.MomentsGuide]: "momentsGuide",
	[SpiritName.ReassuringRanger]: "reassuringRanger",
	[SpiritName.NightbirdWhisperer]: "nightbirdWhisperer",
	[SpiritName.JollyGeologist]: "jollyGeologist",
	[SpiritName.AsceticMonk]: "asceticMonk",
	[SpiritName.HopefulSteward]: "hopefulSteward",
	[SpiritName.VestigeOfADesertedOasis]: "vestigeOfADesertedOasis",
	[SpiritName.MemoryOfALostVillage]: "memoryOfALostVillage",
	[SpiritName.EchoOfAnAbandonedRefuge]: "echoOfAnAbandonedRefuge",
	[SpiritName.RemnantOfAForgottenHaven]: "remnantOfAForgottenHaven",
	[SpiritName.SpiritOfMural]: "spiritOfMural",
	[SpiritName.HerbGatherer]: "herbGatherer",
	[SpiritName.Hunter]: "hunter",
	[SpiritName.FeudalLord]: "feudalLord",
	[SpiritName.Princess]: "princess",
} as const satisfies Readonly<Record<SpiritName, Exclude<keyof SpiritTrackerData, "user_id">>>;

interface SharePromptOptions {
	spirits: readonly StandardSpirit[] | readonly ElderSpirit[] | readonly (GuideSpirit | SeasonalSpirit)[];
	backButtonCustomId: string;
	title: string;
	emoji: Emoji | null;
}

export const SPIRIT_TRACKER_VIEW_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_REALMS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_REALMS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_REALM_BACK_CUSTOM_ID = "SPIRIT_TRACKER_REALM_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID = "SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID" as const;
const SPIRIT_TRACKER_SHARE_ELDER_KEY = "elders" as const;
export const SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID = "SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SHARE_SEND_CUSTOM_ID = "SPIRIT_TRACKER_SHARE_SEND_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID" as const;
const SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT = 25 as const;
const SPIRIT_TRACKER_STANDARD_PERCENTAGE_NOTE = "Averages are calculated even beyond the second wing buff." as const;

const validRealms = Standard.reduce<StandardSpiritRealm[]>((realms, { realm }) => {
	if (!realms.includes(realm)) realms.push(realm);
	return realms;
}, []);

const validSeasons = Seasonal.reduce<SeasonName[]>((seasons, { season }) => {
	if (!seasons.includes(season)) seasons.push(season);
	return seasons;
}, []);

function backToStartButton(disabled = false) {
	return new ButtonBuilder()
		.setCustomId(SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID)
		.setDisabled(disabled)
		.setEmoji("⏮️")
		.setLabel("Start")
		.setStyle(ButtonStyle.Primary);
}

export class SpiritTracker {
	public readonly userId: SpiritTrackerData["userId"];

	public pointingCandlemaker!: SpiritTrackerData["pointingCandlemaker"];

	public usheringStargazer!: SpiritTrackerData["usheringStargazer"];

	public rejectingVoyager!: SpiritTrackerData["rejectingVoyager"];

	public elderOfTheIsle!: SpiritTrackerData["elderOfTheIsle"];

	public butterflyCharmer!: SpiritTrackerData["butterflyCharmer"];

	public applaudingBellmaker!: SpiritTrackerData["applaudingBellmaker"];

	public wavingBellmaker!: SpiritTrackerData["wavingBellmaker"];

	public slumberingShipwright!: SpiritTrackerData["slumberingShipwright"];

	public laughingLightCatcher!: SpiritTrackerData["laughingLightCatcher"];

	public birdWhisperer!: SpiritTrackerData["birdWhisperer"];

	public exhaustedDockWorker!: SpiritTrackerData["exhaustedDockWorker"];

	public ceremonialWorshiper!: SpiritTrackerData["ceremonialWorshiper"];

	public elderOfThePrairie!: SpiritTrackerData["elderOfThePrairie"];

	public shiveringTrailblazer!: SpiritTrackerData["shiveringTrailblazer"];

	public blushingProspector!: SpiritTrackerData["blushingProspector"];

	public hideNSeekPioneer!: SpiritTrackerData["hideNSeekPioneer"];

	public poutyPorter!: SpiritTrackerData["poutyPorter"];

	public dismayedHunter!: SpiritTrackerData["dismayedHunter"];

	public apologeticLumberjack!: SpiritTrackerData["apologeticLumberjack"];

	public tearfulLightMiner!: SpiritTrackerData["tearfulLightMiner"];

	public whaleWhisperer!: SpiritTrackerData["whaleWhisperer"];

	public elderOfTheForest!: SpiritTrackerData["elderOfTheForest"];

	public confidentSightseer!: SpiritTrackerData["confidentSightseer"];

	public handstandingThrillseeker!: SpiritTrackerData["handstandingThrillseeker"];

	public mantaWhisperer!: SpiritTrackerData["mantaWhisperer"];

	public backflippingChampion!: SpiritTrackerData["backflippingChampion"];

	public cheerfulSpectator!: SpiritTrackerData["cheerfulSpectator"];

	public bowingMedalist!: SpiritTrackerData["bowingMedalist"];

	public proudVictor!: SpiritTrackerData["proudVictor"];

	public elderOfTheValley!: SpiritTrackerData["elderOfTheValley"];

	public frightenedRefugee!: SpiritTrackerData["frightenedRefugee"];

	public faintingWarrior!: SpiritTrackerData["faintingWarrior"];

	public courageousSoldier!: SpiritTrackerData["courageousSoldier"];

	public stealthySurvivor!: SpiritTrackerData["stealthySurvivor"];

	public salutingCaptain!: SpiritTrackerData["salutingCaptain"];

	public lookoutScout!: SpiritTrackerData["lookoutScout"];

	public elderOfTheWasteland!: SpiritTrackerData["elderOfTheWasteland"];

	public prayingAcolyte!: SpiritTrackerData["prayingAcolyte"];

	public levitatingAdept!: SpiritTrackerData["levitatingAdept"];

	public politeScholar!: SpiritTrackerData["politeScholar"];

	public memoryWhisperer!: SpiritTrackerData["memoryWhisperer"];

	public meditatingMonastic!: SpiritTrackerData["meditatingMonastic"];

	public elderOfTheVault!: SpiritTrackerData["elderOfTheVault"];

	public gratitudeGuide!: SpiritTrackerData["gratitudeGuide"];

	public sassyDrifter!: SpiritTrackerData["sassyDrifter"];

	public stretchingGuru!: SpiritTrackerData["stretchingGuru"];

	public provokingPerformer!: SpiritTrackerData["provokingPerformer"];

	public leapingDancer!: SpiritTrackerData["leapingDancer"];

	public salutingProtector!: SpiritTrackerData["salutingProtector"];

	public greetingShaman!: SpiritTrackerData["greetingShaman"];

	public lightseekersGuide!: SpiritTrackerData["lightseekersGuide"];

	public piggybackLightseeker!: SpiritTrackerData["piggybackLightseeker"];

	public doublefiveLightCatcher!: SpiritTrackerData["doublefiveLightCatcher"];

	public laidbackPioneer!: SpiritTrackerData["laidbackPioneer"];

	public twirlingChampion!: SpiritTrackerData["twirlingChampion"];

	public crabWhisperer!: SpiritTrackerData["crabWhisperer"];

	public shushingLightScholar!: SpiritTrackerData["shushingLightScholar"];

	public belongingGuide!: SpiritTrackerData["belongingGuide"];

	public boogieKid!: SpiritTrackerData["boogieKid"];

	public confettiCousin!: SpiritTrackerData["confettiCousin"];

	public hairtousleTeen!: SpiritTrackerData["hairtousleTeen"];

	public sparklerParent!: SpiritTrackerData["sparklerParent"];

	public pleafulParent!: SpiritTrackerData["pleafulParent"];

	public wiseGrandparent!: SpiritTrackerData["wiseGrandparent"];

	public rhythmGuide!: SpiritTrackerData["rhythmGuide"];

	public troupeGreeter!: SpiritTrackerData["troupeGreeter"];

	public festivalSpinDancer!: SpiritTrackerData["festivalSpinDancer"];

	public admiringActor!: SpiritTrackerData["admiringActor"];

	public troupeJuggler!: SpiritTrackerData["troupeJuggler"];

	public respectfulPianist!: SpiritTrackerData["respectfulPianist"];

	public thoughtfulDirector!: SpiritTrackerData["thoughtfulDirector"];

	public enchantmentGuide!: SpiritTrackerData["enchantmentGuide"];

	public noddingMuralist!: SpiritTrackerData["noddingMuralist"];

	public indifferentAlchemist!: SpiritTrackerData["indifferentAlchemist"];

	public crabWalker!: SpiritTrackerData["crabWalker"];

	public scarecrowFarmer!: SpiritTrackerData["scarecrowFarmer"];

	public snoozingCarpenter!: SpiritTrackerData["snoozingCarpenter"];

	public playfightingHerbalist!: SpiritTrackerData["playfightingHerbalist"];

	public sanctuaryGuide!: SpiritTrackerData["sanctuaryGuide"];

	public jellyWhisperer!: SpiritTrackerData["jellyWhisperer"];

	public timidBookworm!: SpiritTrackerData["timidBookworm"];

	public rallyingThrillseeker!: SpiritTrackerData["rallyingThrillseeker"];

	public hikingGrouch!: SpiritTrackerData["hikingGrouch"];

	public gratefulShellCollector!: SpiritTrackerData["gratefulShellCollector"];

	public chillSunbather!: SpiritTrackerData["chillSunbather"];

	public prophecyGuide!: SpiritTrackerData["prophecyGuide"];

	public prophetOfWater!: SpiritTrackerData["prophetOfWater"];

	public prophetOfEarth!: SpiritTrackerData["prophetOfEarth"];

	public prophetOfAir!: SpiritTrackerData["prophetOfAir"];

	public prophetOfFire!: SpiritTrackerData["prophetOfFire"];

	public dreamsGuide!: SpiritTrackerData["dreamsGuide"];

	public spinningMentor!: SpiritTrackerData["spinningMentor"];

	public dancingPerformer!: SpiritTrackerData["dancingPerformer"];

	public peekingPostman!: SpiritTrackerData["peekingPostman"];

	public bearhugHermit!: SpiritTrackerData["bearhugHermit"];

	public assemblyGuide!: SpiritTrackerData["assemblyGuide"];

	public baffledBotanist!: SpiritTrackerData["baffledBotanist"];

	public scoldingStudent!: SpiritTrackerData["scoldingStudent"];

	public scaredyCadet!: SpiritTrackerData["scaredyCadet"];

	public marchingAdventurer!: SpiritTrackerData["marchingAdventurer"];

	public chucklingScout!: SpiritTrackerData["chucklingScout"];

	public daydreamForester!: SpiritTrackerData["daydreamForester"];

	public theRose!: SpiritTrackerData["theRose"];

	public beckoningRuler!: SpiritTrackerData["beckoningRuler"];

	public gloatingNarcissist!: SpiritTrackerData["gloatingNarcissist"];

	public stretchingLamplighter!: SpiritTrackerData["stretchingLamplighter"];

	public slouchingSoldier!: SpiritTrackerData["slouchingSoldier"];

	public sneezingGeographer!: SpiritTrackerData["sneezingGeographer"];

	public starCollector!: SpiritTrackerData["starCollector"];

	public flightGuide!: SpiritTrackerData["flightGuide"];

	public livelyNavigator!: SpiritTrackerData["livelyNavigator"];

	public lightWhisperer!: SpiritTrackerData["lightWhisperer"];

	public tinkeringChimesmith!: SpiritTrackerData["tinkeringChimesmith"];

	public talentedBuilder!: SpiritTrackerData["talentedBuilder"];

	public abyssGuide!: SpiritTrackerData["abyssGuide"];

	public anxiousAngler!: SpiritTrackerData["anxiousAngler"];

	public ceasingCommodore!: SpiritTrackerData["ceasingCommodore"];

	public bumblingBoatswain!: SpiritTrackerData["bumblingBoatswain"];

	public cacklingCannoneer!: SpiritTrackerData["cacklingCannoneer"];

	public performanceGuide!: SpiritTrackerData["performanceGuide"];

	public franticStagehand!: SpiritTrackerData["franticStagehand"];

	public forgetfulStoryteller!: SpiritTrackerData["forgetfulStoryteller"];

	public mellowMusician!: SpiritTrackerData["mellowMusician"];

	public modestDancer!: SpiritTrackerData["modestDancer"];

	public theVoidOfShattering!: SpiritTrackerData["theVoidOfShattering"];

	public ancientLight1!: SpiritTrackerData["ancientLight1"];

	public ancientLight2!: SpiritTrackerData["ancientLight2"];

	public ancientDarkness1!: SpiritTrackerData["ancientDarkness1"];

	public ancientDarkness2!: SpiritTrackerData["ancientDarkness2"];

	public aurora!: SpiritTrackerData["aurora"];

	public runningWayfarer!: SpiritTrackerData["runningWayfarer"];

	public mindfulMiner!: SpiritTrackerData["mindfulMiner"];

	public warriorOfLove!: SpiritTrackerData["warriorOfLove"];

	public seedOfHope!: SpiritTrackerData["seedOfHope"];

	public remembranceGuide!: SpiritTrackerData["remembranceGuide"];

	public bereftVeteran!: SpiritTrackerData["bereftVeteran"];

	public pleadingChild!: SpiritTrackerData["pleadingChild"];

	public tiptoeingTeaBrewer!: SpiritTrackerData["tiptoeingTeaBrewer"];

	public woundedWarrior!: SpiritTrackerData["woundedWarrior"];

	public passageGuide!: SpiritTrackerData["passageGuide"];

	public oddballOutcast!: SpiritTrackerData["oddballOutcast"];

	public tumblingTroublemaker!: SpiritTrackerData["tumblingTroublemaker"];

	public melancholyMope!: SpiritTrackerData["melancholyMope"];

	public overactiveOverachiever!: SpiritTrackerData["overactiveOverachiever"];

	public momentsGuide!: SpiritTrackerData["momentsGuide"];

	public reassuringRanger!: SpiritTrackerData["reassuringRanger"];

	public nightbirdWhisperer!: SpiritTrackerData["nightbirdWhisperer"];

	public jollyGeologist!: SpiritTrackerData["jollyGeologist"];

	public asceticMonk!: SpiritTrackerData["asceticMonk"];

	public hopefulSteward!: SpiritTrackerData["hopefulSteward"];

	public vestigeOfADesertedOasis!: SpiritTrackerData["vestigeOfADesertedOasis"];

	public memoryOfALostVillage!: SpiritTrackerData["memoryOfALostVillage"];

	public echoOfAnAbandonedRefuge!: SpiritTrackerData["echoOfAnAbandonedRefuge"];

	public remnantOfAForgottenHaven!: SpiritTrackerData["remnantOfAForgottenHaven"];

	public spiritOfMural!: SpiritTrackerData["spiritOfMural"];

	public herbGatherer!: SpiritTrackerData["herbGatherer"];

	public hunter!: SpiritTrackerData["hunter"];

	public feudalLord!: SpiritTrackerData["feudalLord"];

	public princess!: SpiritTrackerData["princess"];

	public constructor(spiritTrack: SpiritTrackerPacket) {
		this.userId = spiritTrack.user_id;
		this.patch(spiritTrack);
	}

	private patch(data: SpiritTrackerPatchData) {
		this.pointingCandlemaker = data.pointing_candlemaker;
		this.usheringStargazer = data.ushering_stargazer;
		this.rejectingVoyager = data.rejecting_voyager;
		this.elderOfTheIsle = data.elder_of_the_isle;
		this.butterflyCharmer = data.butterfly_charmer;
		this.applaudingBellmaker = data.applauding_bellmaker;
		this.wavingBellmaker = data.waving_bellmaker;
		this.slumberingShipwright = data.slumbering_shipwright;
		this.laughingLightCatcher = data.laughing_light_catcher;
		this.birdWhisperer = data.bird_whisperer;
		this.exhaustedDockWorker = data.exhausted_dock_worker;
		this.ceremonialWorshiper = data.ceremonial_worshiper;
		this.elderOfThePrairie = data.elder_of_the_prairie;
		this.shiveringTrailblazer = data.shivering_trailblazer;
		this.blushingProspector = data.blushing_prospector;
		this.hideNSeekPioneer = data.hide_n_seek_pioneer;
		this.poutyPorter = data.pouty_porter;
		this.dismayedHunter = data.dismayed_hunter;
		this.apologeticLumberjack = data.apologetic_lumberjack;
		this.tearfulLightMiner = data.tearful_light_miner;
		this.whaleWhisperer = data.whale_whisperer;
		this.elderOfTheForest = data.elder_of_the_forest;
		this.confidentSightseer = data.confident_sightseer;
		this.handstandingThrillseeker = data.handstanding_thrillseeker;
		this.mantaWhisperer = data.manta_whisperer;
		this.backflippingChampion = data.backflipping_champion;
		this.cheerfulSpectator = data.cheerful_spectator;
		this.bowingMedalist = data.bowing_medalist;
		this.proudVictor = data.proud_victor;
		this.elderOfTheValley = data.elder_of_the_valley;
		this.frightenedRefugee = data.frightened_refugee;
		this.faintingWarrior = data.fainting_warrior;
		this.courageousSoldier = data.courageous_soldier;
		this.stealthySurvivor = data.stealthy_survivor;
		this.salutingCaptain = data.saluting_captain;
		this.lookoutScout = data.lookout_scout;
		this.elderOfTheWasteland = data.elder_of_the_wasteland;
		this.prayingAcolyte = data.praying_acolyte;
		this.levitatingAdept = data.levitating_adept;
		this.politeScholar = data.polite_scholar;
		this.memoryWhisperer = data.memory_whisperer;
		this.meditatingMonastic = data.meditating_monastic;
		this.elderOfTheVault = data.elder_of_the_vault;
		this.gratitudeGuide = data.gratitude_guide;
		this.sassyDrifter = data.sassy_drifter;
		this.stretchingGuru = data.stretching_guru;
		this.provokingPerformer = data.provoking_performer;
		this.leapingDancer = data.leaping_dancer;
		this.salutingProtector = data.saluting_protector;
		this.greetingShaman = data.greeting_shaman;
		this.lightseekersGuide = data.lightseekers_guide;
		this.piggybackLightseeker = data.piggyback_lightseeker;
		this.doublefiveLightCatcher = data.doublefive_light_catcher;
		this.laidbackPioneer = data.laidback_pioneer;
		this.twirlingChampion = data.twirling_champion;
		this.crabWhisperer = data.crab_whisperer;
		this.shushingLightScholar = data.shushing_light_scholar;
		this.belongingGuide = data.belonging_guide;
		this.boogieKid = data.boogie_kid;
		this.confettiCousin = data.confetti_cousin;
		this.hairtousleTeen = data.hairtousle_teen;
		this.sparklerParent = data.sparkler_parent;
		this.pleafulParent = data.pleaful_parent;
		this.wiseGrandparent = data.wise_grandparent;
		this.rhythmGuide = data.rhythm_guide;
		this.troupeGreeter = data.troupe_greeter;
		this.festivalSpinDancer = data.festival_spin_dancer;
		this.admiringActor = data.admiring_actor;
		this.troupeJuggler = data.troupe_juggler;
		this.respectfulPianist = data.respectful_pianist;
		this.thoughtfulDirector = data.thoughtful_director;
		this.enchantmentGuide = data.enchantment_guide;
		this.noddingMuralist = data.nodding_muralist;
		this.indifferentAlchemist = data.indifferent_alchemist;
		this.crabWalker = data.crab_walker;
		this.scarecrowFarmer = data.scarecrow_farmer;
		this.snoozingCarpenter = data.snoozing_carpenter;
		this.playfightingHerbalist = data.playfighting_herbalist;
		this.sanctuaryGuide = data.sanctuary_guide;
		this.jellyWhisperer = data.jelly_whisperer;
		this.timidBookworm = data.timid_bookworm;
		this.rallyingThrillseeker = data.rallying_thrillseeker;
		this.hikingGrouch = data.hiking_grouch;
		this.gratefulShellCollector = data.grateful_shell_collector;
		this.chillSunbather = data.chill_sunbather;
		this.prophecyGuide = data.prophecy_guide;
		this.prophetOfWater = data.prophet_of_water;
		this.prophetOfEarth = data.prophet_of_earth;
		this.prophetOfAir = data.prophet_of_air;
		this.prophetOfFire = data.prophet_of_fire;
		this.dreamsGuide = data.dreams_guide;
		this.spinningMentor = data.spinning_mentor;
		this.dancingPerformer = data.dancing_performer;
		this.peekingPostman = data.peeking_postman;
		this.bearhugHermit = data.bearhug_hermit;
		this.assemblyGuide = data.assembly_guide;
		this.baffledBotanist = data.baffled_botanist;
		this.scoldingStudent = data.scolding_student;
		this.scaredyCadet = data.scaredy_cadet;
		this.marchingAdventurer = data.marching_adventurer;
		this.chucklingScout = data.chuckling_scout;
		this.daydreamForester = data.daydream_forester;
		this.theRose = data.the_rose;
		this.beckoningRuler = data.beckoning_ruler;
		this.gloatingNarcissist = data.gloating_narcissist;
		this.stretchingLamplighter = data.stretching_lamplighter;
		this.slouchingSoldier = data.slouching_soldier;
		this.sneezingGeographer = data.sneezing_geographer;
		this.starCollector = data.star_collector;
		this.flightGuide = data.flight_guide;
		this.livelyNavigator = data.lively_navigator;
		this.lightWhisperer = data.light_whisperer;
		this.tinkeringChimesmith = data.tinkering_chimesmith;
		this.talentedBuilder = data.talented_builder;
		this.abyssGuide = data.abyss_guide;
		this.anxiousAngler = data.anxious_angler;
		this.ceasingCommodore = data.ceasing_commodore;
		this.bumblingBoatswain = data.bumbling_boatswain;
		this.cacklingCannoneer = data.cackling_cannoneer;
		this.performanceGuide = data.performance_guide;
		this.franticStagehand = data.frantic_stagehand;
		this.forgetfulStoryteller = data.forgetful_storyteller;
		this.mellowMusician = data.mellow_musician;
		this.modestDancer = data.modest_dancer;
		this.theVoidOfShattering = data.the_void_of_shattering;
		this.ancientLight1 = data.ancient_light1;
		this.ancientLight2 = data.ancient_light2;
		this.ancientDarkness1 = data.ancient_darkness1;
		this.ancientDarkness2 = data.ancient_darkness2;
		this.aurora = data.aurora;
		this.runningWayfarer = data.running_wayfarer;
		this.mindfulMiner = data.mindful_miner;
		this.warriorOfLove = data.warrior_of_love;
		this.seedOfHope = data.seed_of_hope;
		this.remembranceGuide = data.remembrance_guide;
		this.bereftVeteran = data.bereft_veteran;
		this.pleadingChild = data.pleading_child;
		this.tiptoeingTeaBrewer = data.tiptoeing_tea_brewer;
		this.woundedWarrior = data.wounded_warrior;
		this.passageGuide = data.passage_guide;
		this.oddballOutcast = data.oddball_outcast;
		this.tumblingTroublemaker = data.tumbling_troublemaker;
		this.melancholyMope = data.melancholy_mope;
		this.overactiveOverachiever = data.overactive_overachiever;
		this.momentsGuide = data.moments_guide;
		this.reassuringRanger = data.reassuring_ranger;
		this.nightbirdWhisperer = data.nightbird_whisperer;
		this.jollyGeologist = data.jolly_geologist;
		this.asceticMonk = data.ascetic_monk;
		this.hopefulSteward = data.hopeful_steward;
		this.vestigeOfADesertedOasis = data.vestige_of_a_deserted_oasis;
		this.memoryOfALostVillage = data.memory_of_a_lost_village;
		this.echoOfAnAbandonedRefuge = data.echo_of_an_abandoned_refuge;
		this.remnantOfAForgottenHaven = data.remnant_of_a_forgotten_haven;
		this.spiritOfMural = data.spirit_of_mural;
		this.herbGatherer = data.herb_gatherer;
		this.hunter = data.hunter;
		this.feudalLord = data.feudal_lord;
		this.princess = data.princess;
	}

	public static async fetch(userId: Snowflake) {
		const [spiritTrackerPacket] = await pg<SpiritTrackerPacket>(Table.SpiritTracker).where("user_id", userId);
		if (!spiritTrackerPacket) throw new Error("No spirit tracker data found.");
		return new this(spiritTrackerPacket);
	}

	public static async setSpirits(interaction: ButtonInteraction) {
		const { customId, user } = interaction;
		const realm = customId.slice(customId.indexOf("§") + 1) as Realm;

		await this.update(
			user.id,
			Standard.filter((spirit) => spirit.realm === realm).reduce<SpiritTracketSetData>((data, spirit) => {
				data[SpiritTrackerNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await SpiritTracker.viewRealm(interaction, realm);
	}

	public static async setElders(interaction: ButtonInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;

		await this.update(
			interaction.user.id,
			Elder.reduce<SpiritTracketSetData>((data, spirit) => {
				data[SpiritTrackerNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await SpiritTracker.viewElders(interaction);
	}

	public static async setSeason(interaction: ButtonInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const { customId, user } = interaction;
		const season = customId.slice(customId.indexOf("§") + 1) as SeasonName;

		await this.update(
			user.id,
			Seasonal.filter((spirit) => spirit.season === season).reduce<SpiritTracketSetData>((data, spirit) => {
				data[SpiritTrackerNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await SpiritTracker.viewSeason(interaction, season);
	}

	public static async setSpirit(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const spiritTracker = await this.fetch(interaction.user.id);
		const { customId } = interaction;
		const spiritName = customId.slice(customId.indexOf("§") + 1) as SpiritName;
		const spirit = Spirits.find(({ name }) => name === spiritName)!;
		let newBit;

		if (interaction instanceof ButtonInteraction) {
			newBit = spirit.maxItemsBit;
		} else {
			newBit = interaction.values.reduce(
				(bit, value) => bit | Number(value),
				interaction.message.components
					.find((actionRow): actionRow is ActionRow<StringSelectMenuComponent> =>
						actionRow.components.some(
							(component) =>
								component.customId?.startsWith(
									customId.startsWith(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID)
										? SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID
										: SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID,
								),
						),
					)
					?.components[0]!.options.reduce((bit, option) => (option.default ? bit | Number(option.value) : bit), 0) ?? 0,
			);
		}

		const [spiritTrackerPacket] = await this.update(interaction.user.id, {
			[SpiritTrackerNameToRawName[spiritName]]: newBit,
		});

		spiritTracker.patch(spiritTrackerPacket!);
		await spiritTracker.viewSpiritResponse(interaction, newBit, spirit);
	}

	private static async update(userId: SpiritTracker["userId"], data: SpiritTracketSetData) {
		return pg<SpiritTrackerPacket>(Table.SpiritTracker).update(data).where({ user_id: userId }).returning("*");
	}

	private ownedProgress(spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit) {
		const resolvedOffer =
			spirit.isStandardSpirit() || spirit.isElderSpirit()
				? spirit.offer.current
				: spirit.isGuideSpirit()
				? spirit.offer?.current ?? null
				: spirit.offer.current ?? spirit.offer.seasonal;

		const bit = this[SpiritNameToSpiritTrackerName[spirit.name]];

		return {
			owned: resolvedOffer?.filter((_, itemBit) => bit && (bit & itemBit) === itemBit).size ?? 0,
			total: resolvedOffer?.size ?? 0,
		};
	}

	private progressPercentage(owned: number[], total: number, round?: boolean) {
		if (total === 0) return null;
		const percentage = (owned.reduce((totalOwned, number) => totalOwned + number, 0) / total) * 100;
		if (!round) return percentage;
		const integer = Math.trunc(percentage);
		return integer === 0 ? Math.ceil(percentage) : integer === 99 ? Math.floor(percentage) : Math.round(percentage);
	}

	public spiritProgress(
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
		round?: boolean,
	) {
		const numbers = [];
		let total = 0;

		for (const spirit of spirits) {
			const { owned, total: offerTotal } = this.ownedProgress(spirit);
			numbers.push(owned);
			total += offerTotal;
		}

		return this.progressPercentage(numbers, total, round);
	}

	public static async viewTracker(interaction: ButtonInteraction | ChatInputCommandInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const existingSpiritTracker = await this.fetch(interaction.user.id).catch(() => null);
		let spiritTracker;

		if (existingSpiritTracker) {
			spiritTracker = existingSpiritTracker;
		} else {
			spiritTracker = new this(
				(await pg<SpiritTrackerPacket>(Table.SpiritTracker).insert({ user_id: interaction.user.id }, "*"))[0]!,
			);
		}

		const standardProgress = spiritTracker.spiritProgress(Standard, true);
		const elderProgress = spiritTracker.spiritProgress(Elder, true);
		const seasonalProgress = spiritTracker.spiritProgress(Seasonal, true);

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							[SPIRIT_TYPE.Standard, SPIRIT_TYPE.Elder, SPIRIT_TYPE.Seasonal].map((spiritType) => {
								let label;

								switch (spiritType) {
									case SPIRIT_TYPE.Standard:
										label = `${resolveSpiritTypeToString(spiritType)}${
											standardProgress === null ? "" : ` (${standardProgress}%)`
										}`;

										break;
									case SPIRIT_TYPE.Elder:
										label = `${resolveSpiritTypeToString(spiritType)}${
											elderProgress === null ? "" : ` (${elderProgress}%)`
										}`;

										break;
									case SPIRIT_TYPE.Seasonal:
										label = `${resolveSpiritTypeToString(spiritType)}${
											seasonalProgress === null ? "" : ` (${seasonalProgress}%)`
										}`;

										break;
								}

								return new StringSelectMenuOptionBuilder().setLabel(label).setValue(String(spiritType));
							}),
						)
						.setPlaceholder("What kind of spirit do you want to see?"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(backToStartButton(true)),
			],
			embeds: [],
			ephemeral: true,
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public static async parseSpiritType(interaction: StringSelectMenuInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;

		switch (Number(interaction.values[0]) as Exclude<SpiritType, (typeof SPIRIT_TYPE)["Guide"]>) {
			case SPIRIT_TYPE.Standard:
				await this.viewRealms(interaction);
				return;
			case SPIRIT_TYPE.Elder:
				await this.viewElders(interaction);
				return;
			case SPIRIT_TYPE.Seasonal:
				await this.viewSeasons(interaction);
		}
	}

	public static async parseBack(interaction: ButtonInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const { customId } = interaction;

		if (
			customId === SPIRIT_TRACKER_REALMS_BACK_CUSTOM_ID ||
			customId === SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID ||
			customId === SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID
		) {
			await this.viewTracker(interaction);
			return;
		}

		if (customId === SPIRIT_TRACKER_REALM_BACK_CUSTOM_ID) {
			await this.viewRealms(interaction);
			return;
		}

		if (customId === SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID) {
			await this.viewSeasons(interaction);
			return;
		}

		if (customId === SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID) {
			await this.viewElders(interaction);
			return;
		}

		if (
			customId.startsWith(SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID) ||
			customId.startsWith(SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID)
		) {
			const parsedCustomId = customId.slice(customId.indexOf("§") + 1);
			if (isRealm(parsedCustomId)) await this.viewRealm(interaction, parsedCustomId);
			if (isSeasonName(parsedCustomId)) await this.viewSeason(interaction, parsedCustomId);
			return;
		}

		if (customId === SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID) {
			await this.viewTracker(interaction);
			return;
		}

		void interaction.client.log({ content: "Could not parse a back button.", error: interaction });

		await interaction.reply({
			content: "This back button took me to the '70s. Anyway, I'm back now, and you should probably report this bug!",
			ephemeral: true,
		});
	}

	public static async viewRealms(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const spiritTracker = await this.fetch(interaction.user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							validRealms.map((realm) => {
								const percentage = spiritTracker.spiritProgress(
									Standard.filter((spirit) => spirit.realm === realm),
									true,
								);

								return new StringSelectMenuOptionBuilder()
									.setLabel(`${realm}${percentage === null ? "" : ` (${percentage}%)`}`)
									.setValue(realm);
							}),
						)
						.setPlaceholder("Select a realm!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_REALMS_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(
						validRealms
							.map((validRealm) => {
								const remainingCurrency = spiritTracker.summateCurrency(
									Standard.filter((spirit) => spirit.realm === validRealm),
								);

								return `__${validRealm}__\n${
									remainingCurrency.length > 0 ? remainingCurrency.join("") : formatEmoji(MISCELLANEOUS_EMOJIS.Yes)
								}`;
							})
							.join("\n\n"),
					)
					.setFooter({ text: SPIRIT_TRACKER_STANDARD_PERCENTAGE_NOTE })
					.setTitle("Realms"),
			],
		});
	}

	public static async viewRealm(interaction: ButtonInteraction | StringSelectMenuInteraction, realm: Realm) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const spiritTracker = await this.fetch(interaction.user.id);
		const spirits = Standard.filter((spirit) => spirit.realm === realm);
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const percentage = spiritTracker.spiritProgress([spirit], true);
			if (percentage !== null && percentage !== 100) hasEverything = false;

			return new StringSelectMenuOptionBuilder()
				.setLabel(`${spirit.name}${percentage === null ? "" : ` (${percentage}%)`}`)
				.setValue(spirit.name);
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_REALM_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID}§${realm}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID}§${realm}`)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [
				spiritTracker.spiritEmbed(spirits).setFooter({ text: SPIRIT_TRACKER_STANDARD_PERCENTAGE_NOTE }).setTitle(realm),
			],
		} satisfies InteractionUpdateOptions;

		await interaction.update(response);
	}

	public static async viewElders(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const spiritTracker = await this.fetch(interaction.user.id);
		let hasEverything = true;

		const options = Elder.map((spirit) => {
			const percentage = spiritTracker.spiritProgress([spirit], true);
			if (percentage !== null && percentage !== 100) hasEverything = false;

			return new StringSelectMenuOptionBuilder()
				.setLabel(`${spirit.name}${percentage === null ? "" : ` (${percentage}%)`}`)
				.setValue(spirit.name);
		});

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an elder!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID}§${SPIRIT_TRACKER_SHARE_ELDER_KEY}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [spiritTracker.spiritEmbed(Elder).setTitle("Elders")],
		});
	}

	public static async viewSeasons(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const spiritTracker = await this.fetch(interaction.user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							validSeasons.map((season) => {
								const percentage = spiritTracker.spiritProgress(
									Seasonal.filter((spirit) => spirit.season === season),
									true,
								);

								return new StringSelectMenuOptionBuilder()
									.setEmoji(SeasonNameToSeasonalEmoji[season])
									.setLabel(`${season}${percentage === null ? "" : ` (${percentage}%)`}`)
									.setValue(season);
							}),
						)
						.setPlaceholder("Select a season!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		});
	}

	public static async viewSeason(interaction: ButtonInteraction | StringSelectMenuInteraction, season: SeasonName) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const spiritTracker = await this.fetch(interaction.user.id);
		const spirits = Seasonal.filter((spirit) => spirit.season === season);
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = spiritTracker.spiritProgress([spirit], true);
			if (percentage !== null && percentage !== 100) hasEverything = false;

			return new StringSelectMenuOptionBuilder()
				.setLabel(`${name}${percentage === null ? "" : ` (${percentage}%)`}`)
				.setValue(name);
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder(
							season === SeasonName.Shattering
								? "Select an entity!"
								: season === SeasonName.Revival
								? "Select a spirit or a shop!"
								: "Select a spirit!",
						),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID}§${season}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID}§${season}`)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [
				spiritTracker
					.spiritEmbed(spirits)
					.setTitle(`${formatEmoji(SeasonNameToSeasonalEmoji[season])} ${resolveFullSeasonName(season)}`),
			],
		} satisfies InteractionUpdateOptions;

		if (options.length === 0) {
			response.components.shift();
			response.content = "There are no spirits.";
		}

		await interaction.update(response);
	}

	public static async viewSpirit(interaction: StringSelectMenuInteraction) {
		const spiritTracker = await this.fetch(interaction.user.id);
		const spirit = Spirits.find(({ name }) => name === interaction.values[0]);

		if (!spirit) {
			await interaction.update({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				components: [],
			});

			return;
		}

		await spiritTracker.viewSpiritResponse(
			interaction,
			spiritTracker[SpiritNameToSpiritTrackerName[spirit.name]],
			spirit,
		);
	}

	private async viewSpiritResponse(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		bit: SpiritTrackerValue,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const isSeasonalSpirit = spirit.isSeasonalSpirit();
		const isGuideSpirit = spirit.isGuideSpirit();
		const seasonalParsing = isSeasonalSpirit && !spirit.visited;
		const offer = seasonalParsing ? spirit.offer.seasonal : spirit.offer?.current;
		const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;
		const embed = this.spiritEmbed([spirit]).setTitle(spirit.name).setURL(spirit.wikiURL);
		const description = embed.data.description ? [embed.data.description] : [];

		if (imageURL) {
			embed.setImage(imageURL);
		} else {
			description.push(offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		embed.setDescription(description.join("\n"));
		if (isGuideSpirit && spirit.offer?.inProgress) embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		const buttons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButton(),
			new ButtonBuilder()
				.setCustomId(
					spirit.isElderSpirit()
						? SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID
						: spirit.isStandardSpirit()
						? `${SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID}§${spirit.realm}`
						: `${SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID}§${spirit.season}`,
				)
				.setEmoji(isSeasonalSpirit || isGuideSpirit ? SeasonNameToSeasonalEmoji[spirit.season] : "⏪")
				.setLabel("Back")
				.setStyle(ButtonStyle.Primary),
		);

		if (offer) {
			buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(`${SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID}§${spirit.name}`)
					.setDisabled(this.spiritProgress([spirit]) === 100)
					.setEmoji("💯")
					.setLabel("I have everything!")
					.setStyle(ButtonStyle.Success),
			);

			const itemSelectionOptions = offer.map(({ emoji, item }, flag) => {
				const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
					.setDefault(Boolean(bit && bit & flag))
					.setLabel(item)
					.setValue(String(flag));

				if (emoji) stringSelectMenuOption.setEmoji(emoji);
				return stringSelectMenuOption;
			});

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(0, SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID}§${spirit.name}`)
					.setMaxValues(itemSelectionOptionsMaximumLimit.length)
					.setMinValues(0)
					.setOptions(itemSelectionOptionsMaximumLimit)
					.setPlaceholder("Select what you have!"),
			);

			components.push(itemSelection);

			if (itemSelectionOptions.length > SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(
					SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT,
				);

				components.push(
					new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(`${SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID}§${spirit.name}`)
							.setMaxValues(itemSelectionOverflowOptionsMaximumLimit.length)
							.setMinValues(0)
							.setOptions(itemSelectionOverflowOptionsMaximumLimit)
							.setPlaceholder("Select what you have!"),
					),
				);
			}
		}

		components.push(buttons);
		await interaction.update({ components, content: "", embeds: [embed] });
	}

	private summateCurrency(
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
		season?: SeasonName | null,
	) {
		return resolveOfferToCurrency(
			spirits.reduce((remainingCurrency, spirit) => {
				const remaining = this.remainingCurrency(spirit, resolveSeason(todayDate())?.name === season);
				return remaining ? addCurrency(remainingCurrency, remaining) : remainingCurrency;
			}, {}),
			season,
		);
	}

	private spiritEmbed(spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[]) {
		const multiple = spirits.length > 1;
		const description = [];

		// This method only needs a single spirit to determine the season if invoked from a season.
		const aSpirit = spirits[0]!;
		const spiritSeason = aSpirit.isSeasonalSpirit() || aSpirit.isGuideSpirit() ? aSpirit.season : null;

		if (multiple) {
			const resolvedRemainingCurrency = this.summateCurrency(spirits, spiritSeason);

			if (resolvedRemainingCurrency.length > 0) {
				description.push(`__Remaining Currency__\n${resolvedRemainingCurrency.join("")}`);
			}
		}

		for (const spirit of spirits) {
			const bit = this[SpiritNameToSpiritTrackerName[spirit.name]];
			const spiritDescription = [];
			const isSeasonalSpirit = spirit.isSeasonalSpirit();
			const seasonalParsing = isSeasonalSpirit && !spirit.visited;
			const offer = seasonalParsing ? spirit.offer.seasonal : spirit.offer?.current;
			if (!offer) continue;
			const owned = [];
			const unowned = [];

			for (const [flag, { emoji }] of offer.entries()) {
				if (bit && (bit & flag) === flag) {
					owned.push(formatEmoji(emoji));
				} else {
					unowned.push(formatEmoji(emoji));
				}
			}

			if (owned.length > 0) spiritDescription.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} ${owned.join(" ")}`);
			if (unowned.length > 0) spiritDescription.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.No)} ${unowned.join(" ")}`);

			const remainingCurrency = this.remainingCurrency(spirit, true);

			if (remainingCurrency) {
				const resolvedRemainingCurrency = resolveOfferToCurrency(remainingCurrency, spiritSeason);

				if (resolvedRemainingCurrency.length > 0) {
					spiritDescription.push(`${resolvedRemainingCurrency.join("")} remaining`);
				}
			}

			description.push(`${multiple ? `__${spirit.name}__\n` : ""}${spiritDescription.join("\n")}`);
		}

		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR);
		if (description.length > 0) embed.setDescription(description.join("\n\n"));
		return embed;
	}

	public static async sharePromptParse(interaction: ButtonInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const { customId } = interaction;
		const realmOrElderOrSeason = customId.slice(customId.indexOf("§") + 1);
		let backButtonCustomId;
		let emoji = null;
		let spirits;
		let title;

		if (isRealm(realmOrElderOrSeason)) {
			backButtonCustomId = `${SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID}§${realmOrElderOrSeason}`;
			spirits = Standard.filter((spirit) => spirit.realm === realmOrElderOrSeason);
			title = `${realmOrElderOrSeason} Progress`;
		} else if (isSeasonName(realmOrElderOrSeason)) {
			backButtonCustomId = `${SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID}§${realmOrElderOrSeason}`;
			emoji = SeasonNameToSeasonalEmoji[realmOrElderOrSeason];
			spirits = Seasonal.filter((spirit) => spirit.season === realmOrElderOrSeason);
			title = `${formatEmoji(emoji)} ${resolveFullSeasonName(realmOrElderOrSeason)} Progress`;
		} else if (realmOrElderOrSeason === SPIRIT_TRACKER_SHARE_ELDER_KEY) {
			backButtonCustomId = SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID;
			spirits = Elder;
			title = "Elders Progress";
		}

		if (!backButtonCustomId || !spirits || !title) {
			void interaction.client.log({ content: "Failed to parse spirits from a share prompt.", error: interaction });

			await interaction.update({
				components: [],
				content: "Seems a dark crab did not like this. This incident will be taken care of!",
				embeds: [],
			});

			return;
		}

		await this.sharePrompt(interaction, { spirits, backButtonCustomId, title, emoji });
	}

	public static async sharePrompt(
		interaction: ButtonInteraction,
		{ spirits, backButtonCustomId, title, emoji }: SharePromptOptions,
	) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const { user } = interaction;
		const spiritTracker = await this.fetch(user.id);
		const embed = spiritTracker.spiritEmbed(spirits);
		const profile = await Profile.fetch(user.id).catch(() => null);
		const embedAuthorOptions: EmbedAuthorOptions = { name: profile?.name ?? user.tag };
		if (profile?.iconURL) embedAuthorOptions.iconURL = profile.iconURL;

		const backButton = new ButtonBuilder()
			.setCustomId(backButtonCustomId)
			.setLabel("Back")
			.setStyle(ButtonStyle.Primary);

		if (emoji) backButton.setEmoji(emoji);

		await interaction.update({
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backButton,
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SHARE_SEND_CUSTOM_ID)
						.setEmoji("🔗")
						.setLabel("Send")
						.setStyle(ButtonStyle.Success),
				),
			],
			content: "This will share your progress in this channel. Is this okay?",
			embeds: [embed.setAuthor(embedAuthorOptions).setTimestamp().setTitle(title)],
		});
	}

	public static async shareSend(interaction: ButtonInteraction) {
		if (await cannotUseCustomEmojis(interaction, { components: [], embeds: [] })) return;
		const { channel, message } = interaction;

		if (!channel) {
			await interaction.client.log({ content: "Failed to share a spirit tracker.", error: interaction });

			await interaction.update({
				components: [],
				content: "This share button has been krilled. This may have been a mistake. Or not.",
				embeds: [],
			});

			return;
		}

		await channel.send({ embeds: interaction.message.embeds });

		const components = message.components.map((component) =>
			ActionRowBuilder.from<MessageActionRowComponentBuilder>(component),
		);

		for (const actionRow of components) {
			actionRow.components
				.find(
					(component) =>
						"custom_id" in component.data && component.data.custom_id === SPIRIT_TRACKER_SHARE_SEND_CUSTOM_ID,
				)
				?.setDisabled();
		}

		await interaction.update({ components, content: "Progress shared!", embeds: [] });
	}

	private remainingCurrency(
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
		includeSeasonalCurrency?: boolean,
	) {
		const seasonalParsing = spirit.isSeasonalSpirit() && !spirit.visited;
		const resolvedOffer = seasonalParsing ? spirit.offer.seasonal : spirit.offer?.current;
		if (!resolvedOffer) return null;
		const bit = this[SpiritNameToSpiritTrackerName[spirit.name]];

		return resolvedOffer.reduce<Required<SpiritCost>>(
			(remaining, { cost }, flag) => {
				if (!cost || (bit && (bit & flag) === flag)) return remaining;
				if (cost.candles) remaining.candles += cost.candles;
				if (cost.hearts) remaining.hearts += cost.hearts;
				if (cost.ascendedCandles) remaining.ascendedCandles += cost.ascendedCandles;
				if (includeSeasonalCurrency && cost.seasonalCandles) remaining.seasonalCandles += cost.seasonalCandles;
				if (includeSeasonalCurrency && cost.seasonalHearts) remaining.seasonalHearts += cost.seasonalHearts;
				return remaining;
			},
			{
				candles: 0,
				hearts: 0,
				ascendedCandles: 0,
				seasonalCandles: 0,
				seasonalHearts: 0,
			},
		);
	}
}
