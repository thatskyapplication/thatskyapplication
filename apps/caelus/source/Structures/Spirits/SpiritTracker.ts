import {
	type ActionRow,
	type ChatInputCommandInteraction,
	type InteractionUpdateOptions,
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
	formatEmoji,
} from "discord.js";
import { Season, Emoji } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, isSeason, resolveSeasonsToEmoji } from "../../Utility/Utility.js";
import pg, { Table } from "../../pg.js";
import {
	type GuideSpirit,
	type ElderSpirit,
	type SeasonalSpirit,
	type SpiritCost,
	type SpiritType,
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
import Spirits from "./index.js";

type SpiritTrackerValue = number | null;

interface SpiritTrackerPacket {
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
	ceremonial_worshipper: SpiritTrackerValue;
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
	aurora_guide: SpiritTrackerValue;
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
	ceremonialWorshipper: SpiritTrackerPacket["ceremonial_worshipper"];
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
	auroraGuide: SpiritTrackerPacket["aurora_guide"];
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
}

type SpiritTrackerPatchData = Omit<SpiritTrackerPacket, "user_id">;

export const SPIRIT_TRACKER_VIEW_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID = "SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID" as const;
const SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT = 24 as const;

const validSeasons = Seasonal.reduce<Season[]>((seasons, { season }) => {
	if (!seasons.includes(season)) seasons.push(season);
	return seasons;
}, []);

const backToStartButtonBuilder = new ButtonBuilder()
	.setCustomId(SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID)
	.setEmoji("⏮️")
	.setStyle(ButtonStyle.Primary);

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

	public ceremonialWorshipper!: SpiritTrackerData["ceremonialWorshipper"];

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

	public auroraGuide!: SpiritTrackerData["auroraGuide"];

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

	public constructor(profile: SpiritTrackerPacket) {
		this.userId = profile.user_id;
		this.patch(profile);
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
		this.ceremonialWorshipper = data.ceremonial_worshipper;
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
		this.auroraGuide = data.aurora_guide;
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
	}

	public static async fetch(userId: Snowflake) {
		const [spiritTrackerPacket] = await pg<SpiritTrackerPacket>(Table.SpiritTracker).where("user_id", userId);
		if (!spiritTrackerPacket) throw new Error("No spirit tracker data found.");
		return new this(spiritTrackerPacket);
	}

	public static async set(interaction: StringSelectMenuInteraction) {
		const { customId, values } = interaction;
		const spiritName = customId.slice(customId.indexOf("-") + 1) as SpiritName;

		const bit = values.reduce(
			(bit, value) => bit | Number(value),
			interaction.message.components
				.find((actionRow): actionRow is ActionRow<StringSelectMenuComponent> =>
					actionRow.components.some((component) =>
						component.customId?.startsWith(
							customId.startsWith(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID)
								? SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID
								: SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID,
						),
					),
				)
				?.components[0]!.options.reduce((bit, option) => (option.default ? bit | Number(option.value) : bit), 0) ?? 0,
		);

		let spirit;

		switch (spiritName) {
			case SpiritName.PointingCandlemaker:
				spirit = "pointing_candlemaker";
				break;
			case SpiritName.UsheringStargazer:
				spirit = "ushering_stargazer";
				break;
			case SpiritName.RejectingVoyager:
				spirit = "rejecting_voyager";
				break;
			case SpiritName.ElderOfTheIsle:
				spirit = "elder_of_the_isle";
				break;
			case SpiritName.ButterflyCharmer:
				spirit = "butterfly_charmer";
				break;
			case SpiritName.ApplaudingBellmaker:
				spirit = "applauding_bellmaker";
				break;
			case SpiritName.WavingBellmaker:
				spirit = "waving_bellmaker";
				break;
			case SpiritName.SlumberingShipwright:
				spirit = "slumbering_shipwright";
				break;
			case SpiritName.LaughingLightCatcher:
				spirit = "laughing_light_catcher";
				break;
			case SpiritName.BirdWhisperer:
				spirit = "bird_whisperer";
				break;
			case SpiritName.ExhaustedDockWorker:
				spirit = "exhausted_dock_worker";
				break;
			case SpiritName.CeremonialWorshipper:
				spirit = "ceremonial_worshipper";
				break;
			case SpiritName.ElderOfThePrairie:
				spirit = "elder_of_the_prairie";
				break;
			case SpiritName.ShiveringTrailblazer:
				spirit = "shivering_trailblazer";
				break;
			case SpiritName.BlushingProspector:
				spirit = "blushing_prospector";
				break;
			case SpiritName.HideNSeekPioneer:
				spirit = "hide_n_seek_pioneer";
				break;
			case SpiritName.PoutyPorter:
				spirit = "pouty_porter";
				break;
			case SpiritName.DismayedHunter:
				spirit = "dismayed_hunter";
				break;
			case SpiritName.ApologeticLumberjack:
				spirit = "apologetic_lumberjack";
				break;
			case SpiritName.TearfulLightMiner:
				spirit = "tearful_light_miner";
				break;
			case SpiritName.WhaleWhisperer:
				spirit = "whale_whisperer";
				break;
			case SpiritName.ElderOfTheForest:
				spirit = "elder_of_the_forest";
				break;
			case SpiritName.ConfidentSightseer:
				spirit = "confident_sightseer";
				break;
			case SpiritName.HandstandingThrillseeker:
				spirit = "handstanding_thrillseeker";
				break;
			case SpiritName.MantaWhisperer:
				spirit = "manta_whisperer";
				break;
			case SpiritName.BackflippingChampion:
				spirit = "backflipping_champion";
				break;
			case SpiritName.CheerfulSpectator:
				spirit = "cheerful_spectator";
				break;
			case SpiritName.BowingMedalist:
				spirit = "bowing_medalist";
				break;
			case SpiritName.ProudVictor:
				spirit = "proud_victor";
				break;
			case SpiritName.ElderOfTheValley:
				spirit = "elder_of_the_valley";
				break;
			case SpiritName.FrightenedRefugee:
				spirit = "frightened_refugee";
				break;
			case SpiritName.FaintingWarrior:
				spirit = "fainting_warrior";
				break;
			case SpiritName.CourageousSoldier:
				spirit = "courageous_soldier";
				break;
			case SpiritName.StealthySurvivor:
				spirit = "stealthy_survivor";
				break;
			case SpiritName.SalutingCaptain:
				spirit = "saluting_captain";
				break;
			case SpiritName.LookoutScout:
				spirit = "lookout_scout";
				break;
			case SpiritName.ElderOfTheWasteland:
				spirit = "elder_of_the_wasteland";
				break;
			case SpiritName.PrayingAcolyte:
				spirit = "praying_acolyte";
				break;
			case SpiritName.LevitatingAdept:
				spirit = "levitating_adept";
				break;
			case SpiritName.PoliteScholar:
				spirit = "polite_scholar";
				break;
			case SpiritName.MemoryWhisperer:
				spirit = "memory_whisperer";
				break;
			case SpiritName.MeditatingMonastic:
				spirit = "meditating_monastic";
				break;
			case SpiritName.ElderOfTheVault:
				spirit = "elder_of_the_vault";
				break;
			case SpiritName.GratitudeGuide:
				spirit = "gratitude_guide";
				break;
			case SpiritName.SassyDrifter:
				spirit = "sassy_drifter";
				break;
			case SpiritName.StretchingGuru:
				spirit = "stretching_guru";
				break;
			case SpiritName.ProvokingPerformer:
				spirit = "provoking_performer";
				break;
			case SpiritName.LeapingDancer:
				spirit = "leaping_dancer";
				break;
			case SpiritName.SalutingProtector:
				spirit = "saluting_protector";
				break;
			case SpiritName.GreetingShaman:
				spirit = "greeting_shaman";
				break;
			case SpiritName.LightseekersGuide:
				spirit = "lightseekers_guide";
				break;
			case SpiritName.PiggybackLightseeker:
				spirit = "piggyback_lightseeker";
				break;
			case SpiritName.DoublefiveLightCatcher:
				spirit = "doublefive_light_catcher";
				break;
			case SpiritName.LaidbackPioneer:
				spirit = "laidback_pioneer";
				break;
			case SpiritName.TwirlingChampion:
				spirit = "twirling_champion";
				break;
			case SpiritName.CrabWhisperer:
				spirit = "crab_whisperer";
				break;
			case SpiritName.ShushingLightScholar:
				spirit = "shushing_light_scholar";
				break;
			case SpiritName.BelongingGuide:
				spirit = "belonging_guide";
				break;
			case SpiritName.BoogieKid:
				spirit = "boogie_kid";
				break;
			case SpiritName.ConfettiCousin:
				spirit = "confetti_cousin";
				break;
			case SpiritName.HairtousleTeen:
				spirit = "hairtousle_teen";
				break;
			case SpiritName.SparklerParent:
				spirit = "sparkler_parent";
				break;
			case SpiritName.PleafulParent:
				spirit = "pleaful_parent";
				break;
			case SpiritName.WiseGrandparent:
				spirit = "wise_grandparent";
				break;
			case SpiritName.RhythmGuide:
				spirit = "rhythm_guide";
				break;
			case SpiritName.TroupeGreeter:
				spirit = "troupe_greeter";
				break;
			case SpiritName.FestivalSpinDancer:
				spirit = "festival_spin_dancer";
				break;
			case SpiritName.AdmiringActor:
				spirit = "admiring_actor";
				break;
			case SpiritName.TroupeJuggler:
				spirit = "troupe_juggler";
				break;
			case SpiritName.RespectfulPianist:
				spirit = "respectful_pianist";
				break;
			case SpiritName.ThoughtfulDirector:
				spirit = "thoughtful_director";
				break;
			case SpiritName.EnchantmentGuide:
				spirit = "enchantment_guide";
				break;
			case SpiritName.NoddingMuralist:
				spirit = "nodding_muralist";
				break;
			case SpiritName.IndifferentAlchemist:
				spirit = "indifferent_alchemist";
				break;
			case SpiritName.CrabWalker:
				spirit = "crab_walker";
				break;
			case SpiritName.ScarecrowFarmer:
				spirit = "scarecrow_farmer";
				break;
			case SpiritName.SnoozingCarpenter:
				spirit = "snoozing_carpenter";
				break;
			case SpiritName.PlayfightingHerbalist:
				spirit = "playfighting_herbalist";
				break;
			case SpiritName.SanctuaryGuide:
				spirit = "sanctuary_guide";
				break;
			case SpiritName.JellyWhisperer:
				spirit = "jelly_whisperer";
				break;
			case SpiritName.TimidBookworm:
				spirit = "timid_bookworm";
				break;
			case SpiritName.RallyingThrillseeker:
				spirit = "rallying_thrillseeker";
				break;
			case SpiritName.HikingGrouch:
				spirit = "hiking_grouch";
				break;
			case SpiritName.GratefulShellCollector:
				spirit = "grateful_shell_collector";
				break;
			case SpiritName.ChillSunbather:
				spirit = "chill_sunbather";
				break;
			case SpiritName.ProphecyGuide:
				spirit = "prophecy_guide";
				break;
			case SpiritName.ProphetOfWater:
				spirit = "prophet_of_water";
				break;
			case SpiritName.ProphetOfEarth:
				spirit = "prophet_of_earth";
				break;
			case SpiritName.ProphetOfAir:
				spirit = "prophet_of_air";
				break;
			case SpiritName.ProphetOfFire:
				spirit = "prophet_of_fire";
				break;
			case SpiritName.DreamsGuide:
				spirit = "dreams_guide";
				break;
			case SpiritName.SpinningMentor:
				spirit = "spinning_mentor";
				break;
			case SpiritName.DancingPerformer:
				spirit = "dancing_performer";
				break;
			case SpiritName.PeekingPostman:
				spirit = "peeking_postman";
				break;
			case SpiritName.BearhugHermit:
				spirit = "bearhug_hermit";
				break;
			case SpiritName.AssemblyGuide:
				spirit = "assembly_guide";
				break;
			case SpiritName.BaffledBotanist:
				spirit = "baffled_botanist";
				break;
			case SpiritName.ScoldingStudent:
				spirit = "scolding_student";
				break;
			case SpiritName.ScaredyCadet:
				spirit = "scaredy_cadet";
				break;
			case SpiritName.MarchingAdventurer:
				spirit = "marching_adventurer";
				break;
			case SpiritName.ChucklingScout:
				spirit = "chuckling_scout";
				break;
			case SpiritName.DaydreamForester:
				spirit = "daydream_forester";
				break;
			case SpiritName.TheRose:
				spirit = "the_rose";
				break;
			case SpiritName.BeckoningRuler:
				spirit = "beckoning_ruler";
				break;
			case SpiritName.GloatingNarcissist:
				spirit = "gloating_narcissist";
				break;
			case SpiritName.StretchingLamplighter:
				spirit = "stretching_lamplighter";
				break;
			case SpiritName.SlouchingSoldier:
				spirit = "slouching_soldier";
				break;
			case SpiritName.SneezingGeographer:
				spirit = "sneezing_geographer";
				break;
			case SpiritName.StarCollector:
				spirit = "star_collector";
				break;
			case SpiritName.FlightGuide:
				spirit = "flight_guide";
				break;
			case SpiritName.LivelyNavigator:
				spirit = "lively_navigator";
				break;
			case SpiritName.LightWhisperer:
				spirit = "light_whisperer";
				break;
			case SpiritName.TinkeringChimesmith:
				spirit = "tinkering_chimesmith";
				break;
			case SpiritName.TalentedBuilder:
				spirit = "talented_builder";
				break;
			case SpiritName.AbyssGuide:
				spirit = "abyss_guide";
				break;
			case SpiritName.AnxiousAngler:
				spirit = "anxious_angler";
				break;
			case SpiritName.CeasingCommodore:
				spirit = "ceasing_commodore";
				break;
			case SpiritName.BumblingBoatswain:
				spirit = "bumbling_boatswain";
				break;
			case SpiritName.CacklingCannoneer:
				spirit = "cackling_cannoneer";
				break;
			case SpiritName.PerformanceGuide:
				spirit = "performance_guide";
				break;
			case SpiritName.FranticStagehand:
				spirit = "frantic_stagehand";
				break;
			case SpiritName.ForgetfulStoryteller:
				spirit = "forgetful_storyteller";
				break;
			case SpiritName.MellowMusician:
				spirit = "mellow_musician";
				break;
			case SpiritName.ModestDancer:
				spirit = "modest_dancer";
				break;
			case SpiritName.TheVoidOfShattering:
				spirit = "the_void_of_shattering";
				break;
			case SpiritName.AncientLight1:
				spirit = "ancient_light1";
				break;
			case SpiritName.AncientLight2:
				spirit = "ancient_light2";
				break;
			case SpiritName.AncientDarkness1:
				spirit = "ancient_darkness1";
				break;
			case SpiritName.AncientDarkness2:
				spirit = "ancient_darkness2";
				break;
			case SpiritName.AURORAGuide:
				spirit = "aurora_guide";
				break;
			case SpiritName.RunningWayfarer:
				spirit = "running_wayfarer";
				break;
			case SpiritName.MindfulMiner:
				spirit = "mindful_miner";
				break;
			case SpiritName.WarriorOfLove:
				spirit = "warrior_of_love";
				break;
			case SpiritName.SeedOfHope:
				spirit = "seed_of_hope";
				break;
			case SpiritName.RemembranceGuide:
				spirit = "remembrance_guide";
				break;
			case SpiritName.BereftVeteran:
				spirit = "bereft_veteran";
				break;
			case SpiritName.PleadingChild:
				spirit = "pleading_child";
				break;
			case SpiritName.TiptoeingTeaBrewer:
				spirit = "tiptoeing_tea_brewer";
				break;
			case SpiritName.WoundedWarrior:
				spirit = "wounded_warrior";
				break;
			case SpiritName.PassageGuide:
				spirit = "passage_guide";
				break;
			case SpiritName.OddballOutcast:
				spirit = "oddball_outcast";
				break;
			case SpiritName.TumblingTroublemaker:
				spirit = "tumbling_troublemaker";
				break;
			case SpiritName.MelancholyMope:
				spirit = "melancholy_mope";
				break;
			case SpiritName.OveractiveOverachiever:
				spirit = "overactive_overachiever";
				break;
		}

		await pg<SpiritTrackerPacket>(Table.SpiritTracker)
			.update({ [spirit]: bit })
			.where("user_id", interaction.user.id)
			.returning("*");

		await SpiritTracker.viewSpiritResponse(interaction, bit, Spirits.find(({ name }) => name === spiritName)!);
	}

	private static averageProgress(progresses: number[]) {
		return progresses.length === 0
			? 100
			: Math.round(progresses.reduce((number, progression) => number + progression, 0) / progresses.length);
	}

	public static async viewTracker(interaction: ButtonInteraction | ChatInputCommandInteraction) {
		const existingSpiritTracker = await this.fetch(interaction.user.id).catch(() => null);
		let spiritTracker: SpiritTracker;

		if (existingSpiritTracker) {
			spiritTracker = existingSpiritTracker;
		} else {
			spiritTracker = new this(
				(await pg<SpiritTrackerPacket>(Table.SpiritTracker).insert({ user_id: interaction.user.id }, "*"))[0]!,
			);
		}

		const elderProgress = this.averageProgress(
			Elder.map(({ name, maxItemsBit }) => this.spiritProgression(spiritTracker.resolveNameToBit(name), maxItemsBit)),
		);

		const seasonalProgress = this.averageProgress(
			validSeasons.map((season) => this.seasonProgress(spiritTracker, season)),
		);

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							[SPIRIT_TYPE.Elder, SPIRIT_TYPE.Seasonal].map((spiritType) => {
								let label;

								switch (spiritType) {
									case SPIRIT_TYPE.Elder:
										label = `${resolveSpiritTypeToString(spiritType)} (${elderProgress}%)`;
										break;
									case SPIRIT_TYPE.Seasonal:
										label = `${resolveSpiritTypeToString(spiritType)} (${seasonalProgress}%)`;
										break;
								}

								return new StringSelectMenuOptionBuilder().setLabel(label).setValue(String(spiritType));
							}),
						)
						.setPlaceholder("What kind of spirit do you want to see?"),
				),
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
		switch (
			Number(interaction.values[0]) as Exclude<
				SpiritType,
				(typeof SPIRIT_TYPE)["Standard"] | (typeof SPIRIT_TYPE)["Guide"]
			>
		) {
			case SPIRIT_TYPE.Elder:
				await this.viewElders(interaction);
				return;
			case SPIRIT_TYPE.Seasonal:
				await this.viewSeasons(interaction);
		}
	}

	public static async parseBack(interaction: ButtonInteraction) {
		const { customId } = interaction;

		if (customId === SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID || customId === SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID) {
			await this.viewTracker(interaction);
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

		if (customId.startsWith(SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID)) {
			const parsedCustomId = customId.slice(customId.indexOf("-") + 1);
			if (isSeason(parsedCustomId)) await this.viewSeason(interaction, parsedCustomId);
			return;
		}

		if (customId === SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID) await this.viewTracker(interaction);
	}

	public static async viewElders(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		const spiritTracker = await this.fetch(interaction.user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							Elder.map(({ name, maxItemsBit }) =>
								new StringSelectMenuOptionBuilder()
									.setLabel(`${name} (${this.spiritProgression(spiritTracker.resolveNameToBit(name), maxItemsBit)}%)`)
									.setValue(name),
							),
						)
						.setPlaceholder("Select an elder!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		});
	}

	private static seasonProgress(spiritTracker: SpiritTracker, season: Season) {
		return this.averageProgress(
			Seasonal.filter((spirit) => spirit.season === season).map(({ name, maxItemsBit }) =>
				maxItemsBit ? this.spiritProgression(spiritTracker.resolveNameToBit(name), maxItemsBit) : 100,
			),
		);
	}

	public static async viewSeasons(interaction: ButtonInteraction | StringSelectMenuInteraction) {
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
							validSeasons.map((season) =>
								new StringSelectMenuOptionBuilder()
									.setEmoji(resolveSeasonsToEmoji(season))
									.setLabel(`${season} (${this.seasonProgress(spiritTracker, season)}%)`)
									.setValue(season),
							),
						)
						.setPlaceholder("Select a season!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setStyle(ButtonStyle.Primary),
				),
			],
		});
	}

	public static async viewSeason(interaction: ButtonInteraction | StringSelectMenuInteraction, season: Season) {
		const spiritTracker = await this.fetch(interaction.user.id);

		const options = Seasonal.filter((spirit) => spirit.season === season).map(({ name, maxItemsBit }) =>
			new StringSelectMenuOptionBuilder()
				.setLabel(
					`${name} (${maxItemsBit ? this.spiritProgression(spiritTracker.resolveNameToBit(name), maxItemsBit) : 100}%)`,
				)
				.setValue(name),
		);

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder(`Select ${season === Season.Shattering ? "an entity" : "a spirit"}!`),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButtonBuilder,
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID)
						.setEmoji("⏪")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
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

		const bit = spiritTracker.resolveNameToBit(spirit.name);
		await this.viewSpiritResponse(interaction, bit, spirit);
	}

	private static async viewSpiritResponse(
		interaction: StringSelectMenuInteraction,
		bit: SpiritTrackerValue,
		spirit: GuideSpirit | ElderSpirit | SeasonalSpirit,
	) {
		const remainingCurrency = {
			candles: 0,
			hearts: 0,
			ascendedCandles: 0,
			seasonalCandles: 0,
			seasonalHearts: 0,
		} satisfies SpiritCost;

		const embedFields =
			spirit.offer?.map(({ item, cost }, flag) => {
				let value;

				if (bit && (bit & flag) === flag) {
					value = formatEmoji(Emoji.Yes, true);
				} else {
					if (cost?.candles) remainingCurrency.candles += cost.candles;
					if (cost?.hearts) remainingCurrency.hearts += cost.hearts;
					if (cost?.ascendedCandles) remainingCurrency.ascendedCandles += cost.ascendedCandles;
					if (cost?.seasonalCandles) remainingCurrency.seasonalCandles += cost.seasonalCandles;
					if (cost?.seasonalHearts) remainingCurrency.seasonalHearts += cost.seasonalHearts;
					value = resolveOfferToCurrency(cost ?? {}).join("") || formatEmoji(Emoji.No, true);
				}

				return {
					name: item,
					value: bit && (bit & flag) === flag ? formatEmoji(Emoji.Yes, true) : value,
					inline: true,
				};
			}) ?? [];

		const backButtons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButtonBuilder,
			new ButtonBuilder()
				.setCustomId(
					spirit.isSeasonalSpirit() || spirit.isGuideSpirit()
						? `${SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID}-${spirit.season}`
						: SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID,
				)
				.setEmoji("⏪")
				.setStyle(ButtonStyle.Primary),
		);

		if (
			remainingCurrency.seasonalCandles > 0 &&
			(await cannotUseCustomEmojis(interaction, {
				components: [backButtons],
				embeds: [],
			}))
		) {
			return;
		}

		const embeds = [];
		const displayColor = (await interaction.guild?.members.fetchMe())?.displayColor ?? 0;

		const embed = new EmbedBuilder()
			.setColor(displayColor)
			.setFields(embedFields.slice(0, SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT))
			.setTitle(spirit.name)
			.setURL(spirit.wikiURL);

		embeds.push(embed);

		if (embedFields.length > SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT) {
			embeds.push(
				new EmbedBuilder().setColor(displayColor).setFields(embedFields.slice(SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT)),
			);
		}

		const lastEmbed = embeds.at(-1)!;
		const description = [];
		const resolvedRemainingCurrency = resolveOfferToCurrency(remainingCurrency);

		if (resolvedRemainingCurrency.length > 0) {
			description.push(`__Remaining Currency__\n${resolvedRemainingCurrency.join("")}`);
		}

		if (spirit.imageURL) {
			lastEmbed.setImage(spirit.imageURL);
		} else {
			description.push(spirit.offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		if (spirit.isGuideSpirit() && spirit.inProgress) lastEmbed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		if (description.length > 0) embed.setDescription(description.join("\n"));
		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		if (spirit.offer) {
			const itemSelectionOptions = spirit.offer.map(({ item }, flag) =>
				new StringSelectMenuOptionBuilder()
					.setDefault(Boolean(bit && bit & flag))
					.setLabel(item)
					.setValue(String(flag)),
			);

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(0, SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID}-${spirit.name}`)
					.setMaxValues(itemSelectionOptionsMaximumLimit.length)
					.setMinValues(0)
					.setOptions(itemSelectionOptionsMaximumLimit)
					.setPlaceholder("Select what you have!"),
			);

			components.push(itemSelection);

			if (itemSelectionOptions.length > SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(
					SPIRIT_TRACKER_MAXIMUM_FIELDS_LIMIT,
				);

				components.push(
					new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(`${SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID}-${spirit.name}`)
							.setMaxValues(itemSelectionOverflowOptionsMaximumLimit.length)
							.setMinValues(0)
							.setOptions(itemSelectionOverflowOptionsMaximumLimit)
							.setPlaceholder("Select what you have!"),
					),
				);
			}
		}

		components.push(backButtons);
		await interaction.update({ components, embeds });
	}

	private resolveNameToBit(spiritName: SpiritName) {
		switch (spiritName) {
			case SpiritName.PointingCandlemaker:
				return this.pointingCandlemaker;
			case SpiritName.UsheringStargazer:
				return this.usheringStargazer;
			case SpiritName.RejectingVoyager:
				return this.rejectingVoyager;
			case SpiritName.ElderOfTheIsle:
				return this.elderOfTheIsle;
			case SpiritName.ButterflyCharmer:
				return this.butterflyCharmer;
			case SpiritName.ApplaudingBellmaker:
				return this.applaudingBellmaker;
			case SpiritName.WavingBellmaker:
				return this.wavingBellmaker;
			case SpiritName.SlumberingShipwright:
				return this.slumberingShipwright;
			case SpiritName.LaughingLightCatcher:
				return this.laughingLightCatcher;
			case SpiritName.BirdWhisperer:
				return this.birdWhisperer;
			case SpiritName.ExhaustedDockWorker:
				return this.exhaustedDockWorker;
			case SpiritName.CeremonialWorshipper:
				return this.ceremonialWorshipper;
			case SpiritName.ElderOfThePrairie:
				return this.elderOfThePrairie;
			case SpiritName.ShiveringTrailblazer:
				return this.shiveringTrailblazer;
			case SpiritName.BlushingProspector:
				return this.blushingProspector;
			case SpiritName.HideNSeekPioneer:
				return this.hideNSeekPioneer;
			case SpiritName.PoutyPorter:
				return this.poutyPorter;
			case SpiritName.DismayedHunter:
				return this.dismayedHunter;
			case SpiritName.ApologeticLumberjack:
				return this.apologeticLumberjack;
			case SpiritName.TearfulLightMiner:
				return this.tearfulLightMiner;
			case SpiritName.WhaleWhisperer:
				return this.whaleWhisperer;
			case SpiritName.ElderOfTheForest:
				return this.elderOfTheForest;
			case SpiritName.ConfidentSightseer:
				return this.confidentSightseer;
			case SpiritName.HandstandingThrillseeker:
				return this.handstandingThrillseeker;
			case SpiritName.MantaWhisperer:
				return this.mantaWhisperer;
			case SpiritName.BackflippingChampion:
				return this.backflippingChampion;
			case SpiritName.CheerfulSpectator:
				return this.cheerfulSpectator;
			case SpiritName.BowingMedalist:
				return this.bowingMedalist;
			case SpiritName.ProudVictor:
				return this.proudVictor;
			case SpiritName.ElderOfTheValley:
				return this.elderOfTheValley;
			case SpiritName.FrightenedRefugee:
				return this.frightenedRefugee;
			case SpiritName.FaintingWarrior:
				return this.faintingWarrior;
			case SpiritName.CourageousSoldier:
				return this.courageousSoldier;
			case SpiritName.StealthySurvivor:
				return this.stealthySurvivor;
			case SpiritName.SalutingCaptain:
				return this.salutingCaptain;
			case SpiritName.LookoutScout:
				return this.lookoutScout;
			case SpiritName.ElderOfTheWasteland:
				return this.elderOfTheWasteland;
			case SpiritName.PrayingAcolyte:
				return this.prayingAcolyte;
			case SpiritName.LevitatingAdept:
				return this.levitatingAdept;
			case SpiritName.PoliteScholar:
				return this.politeScholar;
			case SpiritName.MemoryWhisperer:
				return this.memoryWhisperer;
			case SpiritName.MeditatingMonastic:
				return this.meditatingMonastic;
			case SpiritName.ElderOfTheVault:
				return this.elderOfTheVault;
			case SpiritName.GratitudeGuide:
				return this.gratitudeGuide;
			case SpiritName.SassyDrifter:
				return this.sassyDrifter;
			case SpiritName.StretchingGuru:
				return this.stretchingGuru;
			case SpiritName.ProvokingPerformer:
				return this.provokingPerformer;
			case SpiritName.LeapingDancer:
				return this.leapingDancer;
			case SpiritName.SalutingProtector:
				return this.salutingProtector;
			case SpiritName.GreetingShaman:
				return this.greetingShaman;
			case SpiritName.LightseekersGuide:
				return this.lightseekersGuide;
			case SpiritName.PiggybackLightseeker:
				return this.piggybackLightseeker;
			case SpiritName.DoublefiveLightCatcher:
				return this.doublefiveLightCatcher;
			case SpiritName.LaidbackPioneer:
				return this.laidbackPioneer;
			case SpiritName.TwirlingChampion:
				return this.twirlingChampion;
			case SpiritName.CrabWhisperer:
				return this.crabWhisperer;
			case SpiritName.ShushingLightScholar:
				return this.shushingLightScholar;
			case SpiritName.BelongingGuide:
				return this.belongingGuide;
			case SpiritName.BoogieKid:
				return this.boogieKid;
			case SpiritName.ConfettiCousin:
				return this.confettiCousin;
			case SpiritName.HairtousleTeen:
				return this.hairtousleTeen;
			case SpiritName.SparklerParent:
				return this.sparklerParent;
			case SpiritName.PleafulParent:
				return this.pleafulParent;
			case SpiritName.WiseGrandparent:
				return this.wiseGrandparent;
			case SpiritName.RhythmGuide:
				return this.rhythmGuide;
			case SpiritName.TroupeGreeter:
				return this.troupeGreeter;
			case SpiritName.FestivalSpinDancer:
				return this.festivalSpinDancer;
			case SpiritName.AdmiringActor:
				return this.admiringActor;
			case SpiritName.TroupeJuggler:
				return this.troupeJuggler;
			case SpiritName.RespectfulPianist:
				return this.respectfulPianist;
			case SpiritName.ThoughtfulDirector:
				return this.thoughtfulDirector;
			case SpiritName.EnchantmentGuide:
				return this.enchantmentGuide;
			case SpiritName.NoddingMuralist:
				return this.noddingMuralist;
			case SpiritName.IndifferentAlchemist:
				return this.indifferentAlchemist;
			case SpiritName.CrabWalker:
				return this.crabWalker;
			case SpiritName.ScarecrowFarmer:
				return this.scarecrowFarmer;
			case SpiritName.SnoozingCarpenter:
				return this.snoozingCarpenter;
			case SpiritName.PlayfightingHerbalist:
				return this.playfightingHerbalist;
			case SpiritName.SanctuaryGuide:
				return this.sanctuaryGuide;
			case SpiritName.JellyWhisperer:
				return this.jellyWhisperer;
			case SpiritName.TimidBookworm:
				return this.timidBookworm;
			case SpiritName.RallyingThrillseeker:
				return this.rallyingThrillseeker;
			case SpiritName.HikingGrouch:
				return this.hikingGrouch;
			case SpiritName.GratefulShellCollector:
				return this.gratefulShellCollector;
			case SpiritName.ChillSunbather:
				return this.chillSunbather;
			case SpiritName.ProphecyGuide:
				return this.prophecyGuide;
			case SpiritName.ProphetOfWater:
				return this.prophetOfWater;
			case SpiritName.ProphetOfEarth:
				return this.prophetOfEarth;
			case SpiritName.ProphetOfAir:
				return this.prophetOfAir;
			case SpiritName.ProphetOfFire:
				return this.prophetOfFire;
			case SpiritName.DreamsGuide:
				return this.dreamsGuide;
			case SpiritName.SpinningMentor:
				return this.spinningMentor;
			case SpiritName.DancingPerformer:
				return this.dancingPerformer;
			case SpiritName.PeekingPostman:
				return this.peekingPostman;
			case SpiritName.BearhugHermit:
				return this.bearhugHermit;
			case SpiritName.AssemblyGuide:
				return this.assemblyGuide;
			case SpiritName.BaffledBotanist:
				return this.baffledBotanist;
			case SpiritName.ScoldingStudent:
				return this.scoldingStudent;
			case SpiritName.ScaredyCadet:
				return this.scaredyCadet;
			case SpiritName.MarchingAdventurer:
				return this.marchingAdventurer;
			case SpiritName.ChucklingScout:
				return this.chucklingScout;
			case SpiritName.DaydreamForester:
				return this.daydreamForester;
			case SpiritName.TheRose:
				return this.theRose;
			case SpiritName.BeckoningRuler:
				return this.beckoningRuler;
			case SpiritName.GloatingNarcissist:
				return this.gloatingNarcissist;
			case SpiritName.StretchingLamplighter:
				return this.stretchingLamplighter;
			case SpiritName.SlouchingSoldier:
				return this.slouchingSoldier;
			case SpiritName.SneezingGeographer:
				return this.sneezingGeographer;
			case SpiritName.StarCollector:
				return this.starCollector;
			case SpiritName.FlightGuide:
				return this.flightGuide;
			case SpiritName.LivelyNavigator:
				return this.livelyNavigator;
			case SpiritName.LightWhisperer:
				return this.lightWhisperer;
			case SpiritName.TinkeringChimesmith:
				return this.tinkeringChimesmith;
			case SpiritName.TalentedBuilder:
				return this.talentedBuilder;
			case SpiritName.AbyssGuide:
				return this.abyssGuide;
			case SpiritName.AnxiousAngler:
				return this.anxiousAngler;
			case SpiritName.CeasingCommodore:
				return this.ceasingCommodore;
			case SpiritName.BumblingBoatswain:
				return this.bumblingBoatswain;
			case SpiritName.CacklingCannoneer:
				return this.cacklingCannoneer;
			case SpiritName.PerformanceGuide:
				return this.performanceGuide;
			case SpiritName.FranticStagehand:
				return this.franticStagehand;
			case SpiritName.ForgetfulStoryteller:
				return this.forgetfulStoryteller;
			case SpiritName.MellowMusician:
				return this.mellowMusician;
			case SpiritName.ModestDancer:
				return this.modestDancer;
			case SpiritName.TheVoidOfShattering:
				return this.theVoidOfShattering;
			case SpiritName.AncientLight1:
				return this.ancientLight1;
			case SpiritName.AncientLight2:
				return this.ancientLight2;
			case SpiritName.AncientDarkness1:
				return this.ancientDarkness1;
			case SpiritName.AncientDarkness2:
				return this.ancientDarkness2;
			case SpiritName.AURORAGuide:
				return this.auroraGuide;
			case SpiritName.RunningWayfarer:
				return this.runningWayfarer;
			case SpiritName.MindfulMiner:
				return this.mindfulMiner;
			case SpiritName.WarriorOfLove:
				return this.warriorOfLove;
			case SpiritName.SeedOfHope:
				return this.seedOfHope;
			case SpiritName.RemembranceGuide:
				return this.remembranceGuide;
			case SpiritName.BereftVeteran:
				return this.bereftVeteran;
			case SpiritName.PleadingChild:
				return this.pleadingChild;
			case SpiritName.TiptoeingTeaBrewer:
				return this.tiptoeingTeaBrewer;
			case SpiritName.WoundedWarrior:
				return this.woundedWarrior;
			case SpiritName.PassageGuide:
				return this.passageGuide;
			case SpiritName.OddballOutcast:
				return this.oddballOutcast;
			case SpiritName.TumblingTroublemaker:
				return this.tumblingTroublemaker;
			case SpiritName.MelancholyMope:
				return this.melancholyMope;
			case SpiritName.OveractiveOverachiever:
				return this.overactiveOverachiever;
		}
	}

	private static spiritProgression(bit: SpiritTrackerValue, maximumBit: number) {
		return bit
			? Math.round(((bit.toString(2).split("1").length - 1) / (maximumBit.toString(2).split("1").length - 1)) * 100)
			: 0;
	}
}
