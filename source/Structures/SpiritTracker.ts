import {
	type ChatInputCommandInteraction,
	type EmbedAuthorOptions,
	type InteractionUpdateOptions,
	type Locale,
	type MessageActionRowComponentBuilder,
	type Snowflake,
	type StringSelectMenuInteraction,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelType,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { t } from "i18next";
import { type RealmName, DEFAULT_EMBED_COLOUR, ERROR_RESPONSE } from "../Utility/Constants.js";
import { isRealm } from "../Utility/Utility.js";
import {
	type ItemCost,
	addCosts,
	CatalogueType,
	EventNameUnique,
	resolveCostToString,
	SeasonName,
	SeasonNameToSeasonalEmoji,
} from "../Utility/catalogue.js";
import { todayDate } from "../Utility/dates.js";
import { formatEmoji, MISCELLANEOUS_EMOJIS } from "../Utility/emojis.js";
import { cannotUsePermissions } from "../Utility/permissionChecks.js";
import {
	SpiritName,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
} from "../Utility/spirits.js";
import { EVENTS, resolveEvents } from "../catalogue/events/index.js";
import { SPIRITS } from "../catalogue/spirits/index.js";
import { ELDER_SPIRITS, REALMS, STANDARD_SPIRITS } from "../catalogue/spirits/realms/index.js";
import {
	SEASONS,
	SEASON_SPIRITS,
	isSeasonName,
	resolveReturningSpirits,
	resolveSeason,
	resolveTravellingSpirit,
} from "../catalogue/spirits/seasons/index.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { Event } from "./Event.js";
import Profile from "./Profile.js";
import type { Season } from "./Season.js";
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit, StandardSpiritRealm } from "./Spirits.js";

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
	lightseeker_guide: SpiritTrackerValue;
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
	nesting_guide: SpiritTrackerValue;
	nesting_solarium: SpiritTrackerValue;
	nesting_loft: SpiritTrackerValue;
	nesting_atrium: SpiritTrackerValue;
	nesting_nook: SpiritTrackerValue;
	halloween_office_event_2019: SpiritTrackerValue;
	days_of_feast_2019: SpiritTrackerValue;
	days_of_love_2020: SpiritTrackerValue;
	days_of_nature_2020: SpiritTrackerValue;
	days_of_healing_2020: SpiritTrackerValue;
	sky_anniversary_2020: SpiritTrackerValue;
	days_of_summer_lights_2020: SpiritTrackerValue;
	days_of_mischief_2020: SpiritTrackerValue;
	days_of_feast_2020: SpiritTrackerValue;
	days_of_fortune_2021: SpiritTrackerValue;
	days_of_love_2021: SpiritTrackerValue;
	days_of_bloom_2021: SpiritTrackerValue;
	days_of_nature_2021: SpiritTrackerValue;
	days_of_rainbow_2021: SpiritTrackerValue;
	sky_anniversary_2021: SpiritTrackerValue;
	days_of_summer_2021: SpiritTrackerValue;
	days_of_summer_lights_2021: SpiritTrackerValue;
	days_of_mischief_2021: SpiritTrackerValue;
	days_of_feast_2021: SpiritTrackerValue;
	days_of_fortune_2022: SpiritTrackerValue;
	aviarys_firework_festival_2023: SpiritTrackerValue;
	days_of_feast_2023: SpiritTrackerValue;
	days_of_mischief_2023: SpiritTrackerValue;
	days_of_bloom_2024: SpiritTrackerValue;
	days_of_fortune_2024: SpiritTrackerValue;
	days_of_love_2024: SpiritTrackerValue;
	sky_x_cinnamoroll_pop_up_cafe_2024: SpiritTrackerValue;
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
	lightseekerGuide: SpiritTrackerPacket["lightseeker_guide"];
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
	nestingGuide: SpiritTrackerPacket["nesting_guide"];
	nestingSolarium: SpiritTrackerPacket["nesting_solarium"];
	nestingLoft: SpiritTrackerPacket["nesting_loft"];
	nestingAtrium: SpiritTrackerPacket["nesting_atrium"];
	nestingNook: SpiritTrackerPacket["nesting_nook"];
	halloweenOfficeEvent2019: SpiritTrackerPacket["halloween_office_event_2019"];
	daysOfFeast2019: SpiritTrackerPacket["days_of_feast_2019"];
	daysOfLove2020: SpiritTrackerPacket["days_of_love_2020"];
	daysOfNature2020: SpiritTrackerPacket["days_of_nature_2020"];
	daysOfHealing2020: SpiritTrackerPacket["days_of_healing_2020"];
	skyAnniversary2020: SpiritTrackerPacket["sky_anniversary_2020"];
	daysOfSummerLights2020: SpiritTrackerPacket["days_of_summer_lights_2020"];
	daysOfMischief2020: SpiritTrackerPacket["days_of_mischief_2020"];
	daysOfFeast2020: SpiritTrackerPacket["days_of_feast_2020"];
	daysOfFortune2021: SpiritTrackerPacket["days_of_fortune_2021"];
	daysOfLove2021: SpiritTrackerPacket["days_of_love_2021"];
	daysOfBloom2021: SpiritTrackerPacket["days_of_bloom_2021"];
	daysOfNature2021: SpiritTrackerPacket["days_of_nature_2021"];
	daysOfRainbow2021: SpiritTrackerPacket["days_of_rainbow_2021"];
	skyAnniversary2021: SpiritTrackerPacket["sky_anniversary_2021"];
	daysOfSummer2021: SpiritTrackerPacket["days_of_summer_2021"];
	daysOfSummerLights2021: SpiritTrackerPacket["days_of_summer_lights_2021"];
	daysOfMischief2021: SpiritTrackerPacket["days_of_mischief_2021"];
	daysOfFeast2021: SpiritTrackerPacket["days_of_feast_2021"];
	daysOfFortune2022: SpiritTrackerPacket["days_of_fortune_2022"];
	aviarysFireworkFestival2023: SpiritTrackerPacket["aviarys_firework_festival_2023"];
	daysOfFeast2023: SpiritTrackerPacket["days_of_feast_2023"];
	daysOfMischief2023: SpiritTrackerPacket["days_of_mischief_2023"];
	daysOfBloom2024: SpiritTrackerPacket["days_of_bloom_2024"];
	daysOfFortune2024: SpiritTrackerPacket["days_of_fortune_2024"];
	daysOfLove2024: SpiritTrackerPacket["days_of_love_2024"];
	skyXCinnamorollPopUpCafe2024: SpiritTrackerPacket["sky_x_cinnamoroll_pop_up_cafe_2024"];
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
	[SpiritName.LightseekerGuide]: "lightseeker_guide",
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
	[SpiritName.NestingGuide]: "nesting_guide",
	[SpiritName.NestingSolarium]: "nesting_solarium",
	[SpiritName.NestingLoft]: "nesting_loft",
	[SpiritName.NestingAtrium]: "nesting_atrium",
	[SpiritName.NestingNook]: "nesting_nook",
	[EventNameUnique.HalloweenOfficeEvent2019]: "halloween_office_event_2019",
	[EventNameUnique.DaysOfFeast2019]: "days_of_feast_2019",
	[EventNameUnique.DaysOfLove2020]: "days_of_love_2020",
	[EventNameUnique.DaysOfNature2020]: "days_of_nature_2020",
	[EventNameUnique.DaysOfHealing2020]: "days_of_healing_2020",
	[EventNameUnique.SkyAnniversary2020]: "sky_anniversary_2020",
	[EventNameUnique.DaysOfSummerLights2020]: "days_of_summer_lights_2020",
	[EventNameUnique.DaysOfMischief2020]: "days_of_mischief_2020",
	[EventNameUnique.DaysOfFeast2020]: "days_of_feast_2020",
	[EventNameUnique.DaysOfFortune2021]: "days_of_fortune_2021",
	[EventNameUnique.DaysOfLove2021]: "days_of_love_2021",
	[EventNameUnique.DaysOfBloom2021]: "days_of_bloom_2021",
	[EventNameUnique.DaysOfNature2021]: "days_of_nature_2021",
	[EventNameUnique.DaysOfRainbow2021]: "days_of_rainbow_2021",
	[EventNameUnique.SkyAnniversary2021]: "sky_anniversary_2021",
	[EventNameUnique.DaysOfSummer2021]: "days_of_summer_2021",
	[EventNameUnique.DaysOfSummerLights2021]: "days_of_summer_lights_2021",
	[EventNameUnique.DaysOfMischief2021]: "days_of_mischief_2021",
	[EventNameUnique.DaysOfFeast2021]: "days_of_feast_2021",
	[EventNameUnique.DaysOfFortune2022]: "days_of_fortune_2022",
	[EventNameUnique.AviarysFireworkFestival2023]: "aviarys_firework_festival_2023",
	[EventNameUnique.DaysOfFeast2023]: "days_of_feast_2023",
	[EventNameUnique.DaysOfMischief2023]: "days_of_mischief_2023",
	[EventNameUnique.DaysOfBloom2024]: "days_of_bloom_2024",
	[EventNameUnique.DaysOfFortune2024]: "days_of_fortune_2024",
	[EventNameUnique.DaysOfLove2024]: "days_of_love_2024",
	[EventNameUnique.SkyXCinnamorollPopUpCafe2024]: "sky_x_cinnamoroll_pop_up_cafe_2024",
} as const satisfies Readonly<Record<SpiritName | EventNameUnique, Exclude<keyof SpiritTrackerPacket, "user_id">>>;

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
	[SpiritName.LightseekerGuide]: "lightseekerGuide",
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
	[SpiritName.NestingGuide]: "nestingGuide",
	[SpiritName.NestingSolarium]: "nestingSolarium",
	[SpiritName.NestingLoft]: "nestingLoft",
	[SpiritName.NestingAtrium]: "nestingAtrium",
	[SpiritName.NestingNook]: "nestingNook",
	[EventNameUnique.HalloweenOfficeEvent2019]: "halloweenOfficeEvent2019",
	[EventNameUnique.DaysOfFeast2019]: "daysOfFeast2019",
	[EventNameUnique.DaysOfLove2020]: "daysOfLove2020",
	[EventNameUnique.DaysOfNature2020]: "daysOfNature2020",
	[EventNameUnique.DaysOfHealing2020]: "daysOfHealing2020",
	[EventNameUnique.SkyAnniversary2020]: "skyAnniversary2020",
	[EventNameUnique.DaysOfSummerLights2020]: "daysOfSummerLights2020",
	[EventNameUnique.DaysOfMischief2020]: "daysOfMischief2020",
	[EventNameUnique.DaysOfFeast2020]: "daysOfFeast2020",
	[EventNameUnique.DaysOfFortune2021]: "daysOfFortune2021",
	[EventNameUnique.DaysOfLove2021]: "daysOfLove2021",
	[EventNameUnique.DaysOfBloom2021]: "daysOfBloom2021",
	[EventNameUnique.DaysOfNature2021]: "daysOfNature2021",
	[EventNameUnique.DaysOfRainbow2021]: "daysOfRainbow2021",
	[EventNameUnique.SkyAnniversary2021]: "skyAnniversary2021",
	[EventNameUnique.DaysOfSummer2021]: "daysOfSummer2021",
	[EventNameUnique.DaysOfSummerLights2021]: "daysOfSummerLights2021",
	[EventNameUnique.DaysOfMischief2021]: "daysOfMischief2021",
	[EventNameUnique.DaysOfFeast2021]: "daysOfFeast2021",
	[EventNameUnique.DaysOfFortune2022]: "daysOfFortune2022",
	[EventNameUnique.AviarysFireworkFestival2023]: "aviarysFireworkFestival2023",
	[EventNameUnique.DaysOfFeast2023]: "daysOfFeast2023",
	[EventNameUnique.DaysOfMischief2023]: "daysOfMischief2023",
	[EventNameUnique.DaysOfBloom2024]: "daysOfBloom2024",
	[EventNameUnique.DaysOfFortune2024]: "daysOfFortune2024",
	[EventNameUnique.DaysOfLove2024]: "daysOfLove2024",
	[EventNameUnique.SkyXCinnamorollPopUpCafe2024]: "skyXCinnamorollPopUpCafe2024",
} as const satisfies Readonly<Record<SpiritName | EventNameUnique, Exclude<keyof SpiritTrackerData, "user_id">>>;

export const SPIRIT_TRACKER_VIEW_START_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_START_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID = "SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_TYPE_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_TYPE_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_EVENT_YEARS_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_EVENT_YEARS_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_EVENT_YEAR_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_EVENT_YEAR_CUSTOM_ID" as const;

export const SPIRIT_TRACKER_VIEW_RETURNING_SPIRITS_CUSTOM_ID =
	"SPIRIT_TRACKER_VIEW_RETURNING_SPIRITS_CUSTOM_ID" as const;

export const SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_EVENT_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_EVENT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_OFFER_1_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_OFFER_1_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_VIEW_OFFER_2_CUSTOM_ID = "SPIRIT_TRACKER_VIEW_OFFER_2_CUSTOM_ID" as const;
const SPIRIT_TRACKER_SHARE_REALMS_KEY = "realms" as const;
const SPIRIT_TRACKER_SHARE_ELDER_KEY = "elders" as const;
export const SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID = "SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SHARE_SEND_CUSTOM_ID = "SPIRIT_TRACKER_SHARE_SEND_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID" as const;
const SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT = 25 as const;
const SPIRIT_TRACKER_STANDARD_PERCENTAGE_NOTE = "Averages are calculated even beyond the second wing buff." as const;

const validRealms = REALMS.reduce<StandardSpiritRealm[]>((realms, { name, spirits }) => {
	if (spirits.length > 0) realms.push(name);
	return realms;
}, []);

const validSeasons = SEASONS.reduce<Season[]>((seasons, season) => {
	if (season.guide || season.spirits.length > 0) seasons.push(season);
	return seasons;
}, []);

const validEventsYears = EVENTS.reduce<number[]>((events, { start: { year }, offer }) => {
	if (offer.size > 0 && !events.includes(year)) events.push(year);
	return events;
}, []);

function backToStartButton(disabled = false) {
	return (
		new ButtonBuilder()
			// This custom id must differ to avoid duplicate custom ids.
			.setCustomId(SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID)
			.setDisabled(disabled)
			.setEmoji("⏮️")
			.setLabel("Start")
			.setStyle(ButtonStyle.Primary)
	);
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

	public lightseekerGuide!: SpiritTrackerData["lightseekerGuide"];

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

	public nestingGuide!: SpiritTrackerData["nestingGuide"];

	public nestingSolarium!: SpiritTrackerData["nestingSolarium"];

	public nestingLoft!: SpiritTrackerData["nestingLoft"];

	public nestingAtrium!: SpiritTrackerData["nestingAtrium"];

	public nestingNook!: SpiritTrackerData["nestingNook"];

	public halloweenOfficeEvent2019!: SpiritTrackerData["halloweenOfficeEvent2019"];

	public daysOfFeast2019!: SpiritTrackerData["daysOfFeast2019"];

	public daysOfLove2020!: SpiritTrackerData["daysOfLove2020"];

	public daysOfNature2020!: SpiritTrackerData["daysOfNature2020"];

	public daysOfHealing2020!: SpiritTrackerData["daysOfHealing2020"];

	public skyAnniversary2020!: SpiritTrackerData["skyAnniversary2020"];

	public daysOfSummerLights2020!: SpiritTrackerData["daysOfSummerLights2020"];

	public daysOfMischief2020!: SpiritTrackerData["daysOfMischief2020"];

	public daysOfFeast2020!: SpiritTrackerData["daysOfFeast2020"];

	public daysOfFortune2021!: SpiritTrackerData["daysOfFortune2021"];

	public daysOfLove2021!: SpiritTrackerData["daysOfLove2021"];

	public daysOfBloom2021!: SpiritTrackerData["daysOfBloom2021"];

	public daysOfNature2021!: SpiritTrackerData["daysOfNature2021"];

	public daysOfRainbow2021!: SpiritTrackerData["daysOfRainbow2021"];

	public skyAnniversary2021!: SpiritTrackerData["skyAnniversary2021"];

	public daysOfSummer2021!: SpiritTrackerData["daysOfSummer2021"];

	public daysOfSummerLights2021!: SpiritTrackerData["daysOfSummerLights2021"];

	public daysOfMischief2021!: SpiritTrackerData["daysOfMischief2021"];

	public daysOfFeast2021!: SpiritTrackerData["daysOfFeast2021"];

	public daysOfFortune2022!: SpiritTrackerData["daysOfFortune2022"];

	public aviarysFireworkFestival2023!: SpiritTrackerData["aviarysFireworkFestival2023"];

	public daysOfFeast2023!: SpiritTrackerData["daysOfFeast2023"];

	public daysOfMischief2023!: SpiritTrackerData["daysOfMischief2023"];

	public daysOfBloom2024!: SpiritTrackerData["daysOfBloom2024"];

	public daysOfFortune2024!: SpiritTrackerData["daysOfFortune2024"];

	public daysOfLove2024!: SpiritTrackerData["daysOfLove2024"];

	public skyXCinnamorollPopUpCafe2024!: SpiritTrackerData["skyXCinnamorollPopUpCafe2024"];

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
		this.lightseekerGuide = data.lightseeker_guide;
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
		this.nestingGuide = data.nesting_guide;
		this.nestingSolarium = data.nesting_solarium;
		this.nestingLoft = data.nesting_loft;
		this.nestingAtrium = data.nesting_atrium;
		this.nestingNook = data.nesting_nook;
		this.halloweenOfficeEvent2019 = data.halloween_office_event_2019;
		this.daysOfFeast2019 = data.days_of_feast_2019;
		this.daysOfLove2020 = data.days_of_love_2020;
		this.daysOfNature2020 = data.days_of_nature_2020;
		this.daysOfHealing2020 = data.days_of_healing_2020;
		this.skyAnniversary2020 = data.sky_anniversary_2020;
		this.daysOfSummerLights2020 = data.days_of_summer_lights_2020;
		this.daysOfMischief2020 = data.days_of_mischief_2020;
		this.daysOfFeast2020 = data.days_of_feast_2020;
		this.daysOfFortune2021 = data.days_of_fortune_2021;
		this.daysOfLove2021 = data.days_of_love_2021;
		this.daysOfBloom2021 = data.days_of_bloom_2021;
		this.daysOfNature2021 = data.days_of_nature_2021;
		this.daysOfRainbow2021 = data.days_of_rainbow_2021;
		this.skyAnniversary2021 = data.sky_anniversary_2021;
		this.daysOfSummer2021 = data.days_of_summer_2021;
		this.daysOfSummerLights2021 = data.days_of_summer_lights_2021;
		this.daysOfMischief2021 = data.days_of_mischief_2021;
		this.daysOfFeast2021 = data.days_of_feast_2021;
		this.daysOfFortune2022 = data.days_of_fortune_2022;
		this.aviarysFireworkFestival2023 = data.aviarys_firework_festival_2023;
		this.daysOfFeast2023 = data.days_of_feast_2023;
		this.daysOfMischief2023 = data.days_of_mischief_2023;
		this.daysOfBloom2024 = data.days_of_bloom_2024;
		this.daysOfFortune2024 = data.days_of_fortune_2024;
		this.daysOfLove2024 = data.days_of_love_2024;
		this.skyXCinnamorollPopUpCafe2024 = data.sky_x_cinnamoroll_pop_up_cafe_2024;
	}

	public static async fetch(userId: Snowflake) {
		const [spiritTrackerPacket] = await pg<SpiritTrackerPacket>(Table.Catalogue).where("user_id", userId);
		if (!spiritTrackerPacket) throw new Error("No spirit tracker data found.");
		return new this(spiritTrackerPacket);
	}

	public static async setSpirits(interaction: ButtonInteraction) {
		const { customId, user } = interaction;
		const realm = customId.slice(customId.indexOf("§") + 1);

		if (!isRealm(realm)) {
			throw new Error("Unknown realm.");
		}

		await this.update(
			user.id,
			STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm).reduce<SpiritTracketSetData>((data, spirit) => {
				data[SpiritTrackerNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await SpiritTracker.viewRealm(interaction, realm);
	}

	public static async setElders(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;

		await this.update(
			interaction.user.id,
			ELDER_SPIRITS.reduce<SpiritTracketSetData>((data, spirit) => {
				data[SpiritTrackerNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await SpiritTracker.viewElders(interaction);
	}

	public static async setSeason(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { customId, user } = interaction;
		const season = customId.slice(customId.indexOf("§") + 1);

		if (!isSeasonName(season)) {
			throw new Error("Unknown season.");
		}

		await this.update(
			user.id,
			SEASON_SPIRITS.filter((spirit) => spirit.season === season).reduce<SpiritTracketSetData>((data, spirit) => {
				data[SpiritTrackerNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await SpiritTracker.viewSeason(interaction, season);
	}

	public static async setSpirit(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const spiritTracker = await this.fetch(interaction.user.id);
		const { customId } = interaction;
		const resolvedName = customId.slice(customId.indexOf("§") + 1);

		const spiritOrEvent =
			SPIRITS.find(({ name }) => name === resolvedName) ?? EVENTS.find(({ nameUnique }) => nameUnique === resolvedName);

		if (!spiritOrEvent) {
			pino.error(interaction, "Unknown spirit or event.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const name = spiritOrEvent instanceof Event ? spiritOrEvent.nameUnique : spiritOrEvent.name;
		let newBit;

		if (interaction instanceof ButtonInteraction) {
			newBit = spiritOrEvent.maxItemsBit;
		} else {
			// Get the select menu where this interaction came from.
			const { component } = interaction;

			// Calculate the total bit in this select menu.
			const selectMenuTotalBit = component.options.reduce((bit, { value }) => bit | Number(value), 0);

			// Clear this bit from the total bit.
			const modifiedTotal = (spiritTracker[SpiritNameToSpiritTrackerName[name]] ?? 0) & ~selectMenuTotalBit;

			// Calculate the new bit.
			newBit = interaction.values.reduce((bit, value) => bit | Number(value), modifiedTotal);
		}

		const [spiritTrackerPacket] = await this.update(interaction.user.id, {
			[SpiritTrackerNameToRawName[name]]: newBit,
		});

		spiritTracker.patch(spiritTrackerPacket!);

		await (spiritOrEvent instanceof Event
			? spiritTracker.viewEvent(interaction, spiritOrEvent)
			: spiritTracker.viewSpiritResponse(interaction, newBit, spiritOrEvent));
	}

	private static async update(userId: SpiritTracker["userId"], data: SpiritTracketSetData) {
		return pg<SpiritTrackerPacket>(Table.Catalogue).update(data).where({ user_id: userId }).returning("*");
	}

	private ownedProgress(spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit | Event) {
		const resolvedOffer =
			spirit instanceof Event
				? spirit.offer
				: spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.current ?? spirit.seasonal;

		const bit = this[SpiritNameToSpiritTrackerName[spirit instanceof Event ? spirit.nameUnique : spirit.name]];

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
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit | Event)[],
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
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const existingSpiritTracker = await this.fetch(interaction.user.id).catch(() => null);
		let spiritTracker;

		if (existingSpiritTracker) {
			spiritTracker = existingSpiritTracker;
		} else {
			spiritTracker = new this(
				(await pg<SpiritTrackerPacket>(Table.Catalogue).insert({ user_id: interaction.user.id }, "*"))[0]!,
			);
		}

		const standardProgress = spiritTracker.spiritProgress(STANDARD_SPIRITS, true);
		const elderProgress = spiritTracker.spiritProgress(ELDER_SPIRITS, true);
		const seasonalProgress = spiritTracker.spiritProgress(SEASON_SPIRITS, true);
		const eventProgress = spiritTracker.spiritProgress(EVENTS, true);
		const today = todayDate();
		const currentSeason = resolveSeason(today);
		const currentEvents = resolveEvents(today);
		const currentTravellingSpirit = resolveTravellingSpirit(today);
		const currentReturningSpirits = resolveReturningSpirits(today);

		const currentSeasonButton = new ButtonBuilder()
			.setCustomId(
				currentSeason
					? `${SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID}§${currentSeason.name}`
					: // This would not happen, but it's here to satisfy the API.
					  SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID,
			)
			.setDisabled(!currentSeason)
			.setLabel("Current Season")
			.setStyle(currentSeason ? ButtonStyle.Success : ButtonStyle.Secondary);

		if (currentSeason) {
			currentSeasonButton.setEmoji(currentSeason.emoji);
		}

		const currentEventButtons = currentEvents.reduce<ButtonBuilder[]>((buttons, event) => {
			const button = new ButtonBuilder()
				.setCustomId(`${SPIRIT_TRACKER_VIEW_EVENT_CUSTOM_ID}§${event.nameUnique}`)
				.setStyle(ButtonStyle.Success);

			if (event.eventCurrencyEmoji) button.setEmoji(event.eventCurrencyEmoji);
			buttons.push(button);
			return buttons;
		}, []);

		if (currentEventButtons.length === 0) {
			currentEventButtons.push(
				new ButtonBuilder()
					// This would not happen, but it's here to satisfy the API.
					.setCustomId(SPIRIT_TRACKER_VIEW_EVENT_CUSTOM_ID)
					.setDisabled()
					.setLabel("Current Event")
					.setStyle(ButtonStyle.Secondary),
			);
		}

		if (currentEventButtons.length === 1) currentEventButtons[0]!.setLabel("Current Event");

		const currentTravellingSpiritButton = new ButtonBuilder()
			.setCustomId(
				currentTravellingSpirit
					? `${SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID}§${currentTravellingSpirit.name}`
					: // This would not happen, but it's here to satisfy the API.
					  `${SPIRIT_TRACKER_VIEW_START_CUSTOM_ID}-travelling`,
			)
			.setDisabled(!currentTravellingSpirit)
			.setLabel("Travelling Spirit")
			.setStyle(currentTravellingSpirit ? ButtonStyle.Success : ButtonStyle.Secondary);

		if (currentTravellingSpirit) {
			currentTravellingSpiritButton.setEmoji(SeasonNameToSeasonalEmoji[currentTravellingSpirit.season]);
		}

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_TYPE_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							new StringSelectMenuOptionBuilder()
								.setLabel(`Standard Spirits${standardProgress === null ? "" : ` (${standardProgress}%)`}`)
								.setValue(String(CatalogueType.StandardSpirits)),
							new StringSelectMenuOptionBuilder()
								.setLabel(`Elders${elderProgress === null ? "" : ` (${elderProgress}%)`}`)
								.setValue(String(CatalogueType.Elders)),
							new StringSelectMenuOptionBuilder()
								.setLabel(`Seasonal Spirits${seasonalProgress === null ? "" : ` (${seasonalProgress}%)`}`)
								.setValue(String(CatalogueType.SeasonalSpirits)),
							new StringSelectMenuOptionBuilder()
								.setLabel(`Events${eventProgress === null ? "" : ` (${eventProgress}%)`}`)
								.setValue(String(CatalogueType.Events)),
						)
						.setPlaceholder("What do you want to see?"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(backToStartButton(true)),
				// Limit the potential current event buttons to 4 to not exceed the limit.
				new ActionRowBuilder<ButtonBuilder>().setComponents(currentSeasonButton, ...currentEventButtons.slice(0, 4)),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					currentTravellingSpiritButton,
					new ButtonBuilder()
						.setCustomId(
							currentReturningSpirits
								? SPIRIT_TRACKER_VIEW_RETURNING_SPIRITS_CUSTOM_ID
								: // This would not happen, but it's here to satisfy the API.
								  `${SPIRIT_TRACKER_VIEW_START_CUSTOM_ID}-returning`,
						)
						.setDisabled(!currentReturningSpirits)
						.setLabel("Returning Spirits")
						.setStyle(currentReturningSpirits ? ButtonStyle.Success : ButtonStyle.Secondary),
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

	public static async parseCatalogueType(interaction: StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;

		switch (Number(interaction.values[0]) as CatalogueType) {
			case CatalogueType.StandardSpirits:
				await this.viewRealms(interaction);
				return;
			case CatalogueType.Elders:
				await this.viewElders(interaction);
				return;
			case CatalogueType.SeasonalSpirits:
				await this.viewSeasons(interaction);
				return;
			case CatalogueType.Events:
				await this.viewEventYears(interaction);
		}
	}

	public static async viewRealms(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const spiritTracker = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							validRealms.map((realm) => {
								const percentage = spiritTracker.spiritProgress(
									STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm),
									true,
								);

								return new StringSelectMenuOptionBuilder()
									.setLabel(
										`${t(`realms.${realm}`, { lng: locale, ns: "general" })}${
											percentage === null ? "" : ` (${percentage}%)`
										}`,
									)
									.setValue(realm);
							}),
						)
						.setPlaceholder("Select a realm!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID}§${SPIRIT_TRACKER_SHARE_REALMS_KEY}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				spiritTracker
					.realmsEmbed(locale)
					.setFooter({ text: SPIRIT_TRACKER_STANDARD_PERCENTAGE_NOTE })
					.setTitle("Realms"),
			],
		});
	}

	public static async viewRealm(interaction: ButtonInteraction | StringSelectMenuInteraction, realm: RealmName) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const spiritTracker = await this.fetch(user.id);
		const spirits = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm);
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const percentage = spiritTracker.spiritProgress([spirit], true);
			if (percentage !== null && percentage !== 100) hasEverything = false;

			return new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(spirit.name);
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID)
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
				spiritTracker
					.spiritEmbed(spirits, locale)
					.setFooter({ text: SPIRIT_TRACKER_STANDARD_PERCENTAGE_NOTE })
					.setTitle(t(`realms.${realm}`, { lng: locale, ns: "general" })),
			],
		} satisfies InteractionUpdateOptions;

		await interaction.update(response);
	}

	public static async viewElders(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const spiritTracker = await this.fetch(user.id);
		let hasEverything = true;

		const options = ELDER_SPIRITS.map((spirit) => {
			const percentage = spiritTracker.spiritProgress([spirit], true);
			if (percentage !== null && percentage !== 100) hasEverything = false;

			return new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(spirit.name);
		});

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an elder!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_START_CUSTOM_ID)
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
			embeds: [spiritTracker.spiritEmbed(ELDER_SPIRITS, locale).setTitle("Elders")],
		});
	}

	public static async viewSeasons(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const spiritTracker = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							validSeasons.map((season) => {
								const percentage = spiritTracker.spiritProgress([season.guide, ...season.spirits], true);

								return new StringSelectMenuOptionBuilder()
									.setEmoji(SeasonNameToSeasonalEmoji[season.name])
									.setLabel(
										`${t(`seasons.${season.name}`, { lng: locale, ns: "general" })}${
											percentage === null ? "" : ` (${percentage}%)`
										}`,
									)
									.setValue(season.name);
							}),
						)
						.setPlaceholder("Select a season!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		});
	}

	public static async viewSeason(interaction: ButtonInteraction | StringSelectMenuInteraction, seasonName: SeasonName) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const season = validSeasons.find(({ name }) => name === seasonName);

		if (!season) {
			pino.error(interaction, "Failed to view a season.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const spiritTracker = await this.fetch(user.id);
		const spirits = [season.guide, ...season.spirits];
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = spiritTracker.spiritProgress([spirit], true);
			if (percentage !== null && percentage !== 100) hasEverything = false;

			return new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`spiritNames.${name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(name);
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder(
							seasonName === SeasonName.Shattering || seasonName === SeasonName.Nesting
								? "Select an entity!"
								: seasonName === SeasonName.Revival
								? "Select a spirit or a shop!"
								: "Select a spirit!",
						),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SHARE_PROMPT_CUSTOM_ID}§${seasonName}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID}§${seasonName}`)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [
				spiritTracker
					.spiritEmbed(spirits, locale)
					.setTitle(
						`${formatEmoji(SeasonNameToSeasonalEmoji[seasonName])} ${t(`seasons.${seasonName}`, {
							lng: locale,
							ns: "general",
						})}`,
					)
					.setURL(season.wikiURL),
			],
		} satisfies InteractionUpdateOptions;

		if (options.length === 0) {
			response.components.shift();
			response.content = "There are no spirits.";
		}

		await interaction.update(response);
	}

	public static async viewEventYears(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { user } = interaction;
		const spiritTracker = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_EVENT_YEAR_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							validEventsYears.map((year) => {
								const percentage = spiritTracker.spiritProgress(
									EVENTS.filter((event) => event.start.year === year),
									true,
								);

								return new StringSelectMenuOptionBuilder()
									.setLabel(`${year}${percentage === null ? "" : ` (${percentage}%)`}`)
									.setValue(String(year));
							}),
						)
						.setPlaceholder("Select a year!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		});
	}

	public static async viewEvents(interaction: ButtonInteraction | StringSelectMenuInteraction, year: string) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const spiritTracker = await this.fetch(user.id);
		const events = EVENTS.filter((event) => event.start.year === Number(year));

		const options = events.map((event) => {
			const { name, nameUnique } = event;
			const percentage = spiritTracker.spiritProgress([event], true);

			const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
				.setLabel(
					`${t(`events.${name}`, { lng: locale, ns: "general" })}${percentage === null ? "" : ` (${percentage}%)`}`,
				)
				.setValue(nameUnique);

			if (event.eventCurrencyEmoji) stringSelectMenuOptionBuilder.setEmoji(event.eventCurrencyEmoji);
			return stringSelectMenuOptionBuilder;
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_EVENT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an event!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_EVENT_YEARS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				// spiritTracker.spiritEmbed(spirits, locale).setTitle(
				// 	`${formatEmoji(SeasonNameToSeasonalEmoji[season])} ${t(`seasons.${season}`, {
				// 		lng: locale,
				// 		ns: "general",
				// 	})}`,
				// ),
			],
		} satisfies InteractionUpdateOptions;

		if (options.length === 0) {
			response.components.shift();
			response.content = "There are no spirits.";
		}

		await interaction.update(response);
	}

	public static async viewReturningSpirits(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const spiritTracker = await this.fetch(user.id);
		const spirits = resolveReturningSpirits(todayDate());

		if (!spirits) {
			await SpiritTracker.viewTracker(interaction);
			return;
		}

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = spiritTracker.spiritProgress([spirit], true);

			return new StringSelectMenuOptionBuilder()
				.setEmoji(SeasonNameToSeasonalEmoji[spirit.season])
				.setLabel(
					`${t(`spiritNames.${name}`, { lng: locale, ns: "general" })}${
						percentage === null ? "" : ` (${percentage}%)`
					}`,
				)
				.setValue(name);
		});

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(backToStartButton()),
			],
			embeds: [spiritTracker.spiritEmbed(spirits, locale).setTitle("Returning Spirits")],
		};

		await interaction.update(response);
	}

	public static async viewSpirit(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		const spiritTracker = await this.fetch(interaction.user.id);

		const parsedCustomId =
			interaction instanceof ButtonInteraction
				? interaction.customId.slice(interaction.customId.indexOf("§") + 1)
				: interaction.values[0];

		const spirit = SPIRITS.find(({ name }) => name === parsedCustomId);

		if (!spirit) {
			await interaction.update({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				components: [],
				embeds: [],
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
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale } = interaction;
		const isSeasonalSpirit = spirit.isSeasonalSpirit();
		const isGuideSpirit = spirit.isGuideSpirit();
		const seasonalParsing = isSeasonalSpirit && !spirit.current;
		const offer = seasonalParsing ? spirit.seasonal : spirit.current;
		const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

		const embed = this.spiritEmbed([spirit], locale)
			.setTitle(t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" }))
			.setURL(spirit.wikiURL);

		const description = embed.data.description ? [embed.data.description] : [];

		if (imageURL) {
			embed.setImage(imageURL);
		} else {
			description.push(offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		embed.setDescription(description.join("\n"));
		if (isGuideSpirit && spirit.inProgress) embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		const buttons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButton(),
			new ButtonBuilder()
				.setCustomId(
					spirit.isElderSpirit()
						? SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID
						: spirit.isStandardSpirit()
						? `${SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID}§${spirit.realm}`
						: `${SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID}§${spirit.season}`,
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

			const itemSelectionOptions = offer.map(({ emoji, name }, flag) => {
				const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
					.setDefault(Boolean(bit && bit & flag))
					.setLabel(name)
					.setValue(String(flag));

				if (emoji) stringSelectMenuOption.setEmoji(emoji);
				return stringSelectMenuOption;
			});

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(0, SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${SPIRIT_TRACKER_VIEW_OFFER_1_CUSTOM_ID}§${spirit.name}`)
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
							.setCustomId(`${SPIRIT_TRACKER_VIEW_OFFER_2_CUSTOM_ID}§${spirit.name}`)
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

	public static async parseViewEvent(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const spiritTracker = await this.fetch(interaction.user.id);

		const eventName =
			interaction instanceof ButtonInteraction
				? interaction.customId.slice(interaction.customId.indexOf("§") + 1)
				: interaction.values[0];

		const event = EVENTS.find(({ nameUnique }) => nameUnique === eventName);

		if (!event) {
			await interaction.update(ERROR_RESPONSE);
			pino.error(interaction, "Could not parse an event for the catalogue.");
			return;
		}

		await spiritTracker.viewEvent(interaction, event);
	}

	public async viewEvent(interaction: ButtonInteraction | StringSelectMenuInteraction, event: Event) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale } = interaction;
		const bit = this[SpiritNameToSpiritTrackerName[event.nameUnique]];
		const { name, nameUnique, start, eventCurrencyEmoji, offer, imageURL } = event;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(
				`${eventCurrencyEmoji ? formatEmoji(eventCurrencyEmoji) : ""}${t(`events.${name}`, {
					lng: locale,
					ns: "general",
				})}`,
			)
			.setURL(event.wikiURL);

		const description = [];
		const owned = [];
		const unowned = [];

		for (const [flag, { emoji }] of offer.entries()) {
			if (bit && (bit & flag) === flag) {
				owned.push(formatEmoji(emoji));
			} else {
				unowned.push(formatEmoji(emoji));
			}
		}

		if (owned.length > 0) description.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} ${owned.join(" ")}`);
		if (unowned.length > 0) description.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.No)} ${unowned.join(" ")}`);
		const remainingCurrency = this.remainingCurrency(event, true);

		if (remainingCurrency) {
			const resolvedRemainingCurrency = resolveCostToString(remainingCurrency);

			if (resolvedRemainingCurrency.length > 0) {
				description.push(`${resolvedRemainingCurrency.join("")}`);
			}
		}

		if (imageURL) {
			embed.setImage(imageURL);
		} else {
			description.push(offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		embed.setDescription(description.join("\n"));
		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		const buttons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButton(),
			new ButtonBuilder()
				.setCustomId(`${SPIRIT_TRACKER_VIEW_EVENT_YEAR_CUSTOM_ID}§${start.year}`)
				.setEmoji("⏪")
				.setLabel("Back")
				.setStyle(ButtonStyle.Primary),
		);

		if (offer) {
			buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(`${SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID}§${nameUnique}`)
					.setDisabled(this.spiritProgress([event]) === 100)
					.setEmoji("💯")
					.setLabel("I have everything!")
					.setStyle(ButtonStyle.Success),
			);

			const itemSelectionOptions = offer.map(({ emoji, name }, flag) => {
				const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
					.setDefault(Boolean(bit && bit & flag))
					.setLabel(name)
					.setValue(String(flag));

				if (emoji) stringSelectMenuOption.setEmoji(emoji);
				return stringSelectMenuOption;
			});

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(0, SPIRIT_TRACKER_MAXIMUM_OPTIONS_LIMIT);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${SPIRIT_TRACKER_VIEW_OFFER_1_CUSTOM_ID}§${nameUnique}`)
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
							.setCustomId(`${SPIRIT_TRACKER_VIEW_OFFER_2_CUSTOM_ID}§${nameUnique}`)
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
		return resolveCostToString(
			spirits.reduce((remainingCurrency, spirit) => {
				const totalCost = this.remainingCurrency(spirit, resolveSeason(todayDate())?.name === season);
				return totalCost ? addCosts([remainingCurrency, totalCost]) : remainingCurrency;
			}, {}),
		);
	}

	private spiritEmbed(
		spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
		locale: Locale,
	) {
		const multiple = spirits.length > 1;
		const description = [];
		const remainingCurrencies = [];

		for (const spirit of spirits) {
			const bit = this[SpiritNameToSpiritTrackerName[spirit.name]];
			const spiritDescription = [];
			const isSeasonalSpirit = spirit.isSeasonalSpirit();
			const seasonalParsing = isSeasonalSpirit && !spirit.current;
			const offer = seasonalParsing ? spirit.seasonal : spirit.current;
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
				remainingCurrencies.push(remainingCurrency);
				const resolvedRemainingCurrency = resolveCostToString(remainingCurrency);

				if (resolvedRemainingCurrency.length > 0) {
					spiritDescription.push(`${resolvedRemainingCurrency.join("")}`);
				}
			}

			description.push(
				`${
					multiple ? `__${t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" })}__\n` : ""
				}${spiritDescription.join("\n")}`,
			);
		}

		if (multiple) {
			const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

			if (totalRemainingCurrency.length > 0) {
				description.unshift(`__Remaining Currency__\n${totalRemainingCurrency.join("")}`);
			}
		}

		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR);

		if (description.length > 0) {
			let descriptionString = description.join("\n\n");

			// If the resulting description exceeds 4,096 characters, replace the yes and no emojis with Unicode variants.
			if (descriptionString.length > 4_096) {
				descriptionString = descriptionString
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.Yes), "✅")
					.replaceAll(formatEmoji(MISCELLANEOUS_EMOJIS.No), "❌");
			}

			embed.setDescription(descriptionString);
		}

		return embed;
	}

	private realmsEmbed(locale: Locale) {
		return new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setDescription(
			validRealms
				.map((validRealm) => {
					const remainingCurrency = this.summateCurrency(
						STANDARD_SPIRITS.filter((spirit) => spirit.realm === validRealm),
					);

					return `__${t(`realms.${validRealm}`, { lng: locale, ns: "general" })}__\n${
						remainingCurrency.length > 0 ? remainingCurrency.join("") : formatEmoji(MISCELLANEOUS_EMOJIS.Yes)
					}`;
				})
				.join("\n\n"),
		);
	}

	public static async sharePrompt(interaction: ButtonInteraction) {
		const { channel, customId, locale, user } = interaction;

		if (!interaction.inGuild()) {
			await interaction.reply({
				content: "Only [you & I](https://youtu.be/WJjHIOewllc) are around here. Try sharing in a server!",
				flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
			});

			return;
		}

		if (!channel || (channel.type === ChannelType.PrivateThread && !channel.members.me)) {
			await interaction.update({
				components: [],
				content: "I cannot see this channel.",
				embeds: [],
			});

			return;
		}

		if (
			await cannotUsePermissions(
				interaction,
				PermissionFlagsBits.ViewChannel |
					(channel.isThread() ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) |
					PermissionFlagsBits.EmbedLinks |
					PermissionFlagsBits.UseExternalEmojis,
			)
		) {
			return;
		}

		const spiritTracker = await this.fetch(user.id);
		const type = customId.slice(customId.indexOf("§") + 1);
		const backButton = new ButtonBuilder().setLabel("Back").setStyle(ButtonStyle.Primary);
		let embed;

		if (type === SPIRIT_TRACKER_SHARE_REALMS_KEY) {
			backButton.setCustomId(SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID);
			embed = spiritTracker.realmsEmbed(locale).setTitle("Realms Progress");
		} else if (isRealm(type)) {
			backButton.setCustomId(`${SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID}§${type}`);

			embed = spiritTracker
				.spiritEmbed(
					STANDARD_SPIRITS.filter((spirit) => spirit.realm === type),
					locale,
				)
				.setTitle(`${type} Progress`);
		} else if (isSeasonName(type)) {
			const emoji = SeasonNameToSeasonalEmoji[type];
			backButton.setCustomId(`${SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID}§${type}`).setEmoji(emoji);

			embed = spiritTracker
				.spiritEmbed(
					SEASON_SPIRITS.filter((spirit) => spirit.season === type),
					locale,
				)
				.setTitle(`${formatEmoji(emoji)} ${t(`seasons.${type}`, { lng: locale, ns: "general" })} Progress`);
		} else if (type === SPIRIT_TRACKER_SHARE_ELDER_KEY) {
			backButton.setCustomId(SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID);
			embed = spiritTracker.spiritEmbed(ELDER_SPIRITS, locale).setTitle("Elders Progress");
		}

		if (!embed) {
			pino.error(interaction, "Failed to parse spirits from a spirit tracker share prompt.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const profile = await Profile.fetch(user.id).catch(() => null);
		const embedAuthorOptions: EmbedAuthorOptions = { name: profile?.name ?? user.tag };
		if (profile?.iconURL) embedAuthorOptions.iconURL = profile.iconURL;

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
			embeds: [embed.setAuthor(embedAuthorOptions)],
		});
	}

	public static async shareSend(interaction: ButtonInteraction<"cached">) {
		const { channel, message } = interaction;

		if (!channel || (channel.type === ChannelType.PrivateThread && !channel.members.me)) {
			await interaction.update({
				components: [],
				content: "I cannot see this channel.",
				embeds: [],
			});

			return;
		}

		if (
			await cannotUsePermissions(
				interaction,
				PermissionFlagsBits.ViewChannel |
					(channel.isThread() ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) |
					PermissionFlagsBits.EmbedLinks |
					PermissionFlagsBits.UseExternalEmojis,
			)
		) {
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
		spiritOrEvent: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit | Event,
		includeSeasonalCurrency?: boolean,
	) {
		let resolvedOffer;

		if (spiritOrEvent instanceof Event) {
			resolvedOffer = spiritOrEvent.offer;
		} else {
			const seasonalParsing = spiritOrEvent.isSeasonalSpirit() && !spiritOrEvent.current;
			resolvedOffer = seasonalParsing ? spiritOrEvent.seasonal : spiritOrEvent.current;
		}

		if (!resolvedOffer) return null;

		const bit =
			this[
				SpiritNameToSpiritTrackerName[spiritOrEvent instanceof Event ? spiritOrEvent.nameUnique : spiritOrEvent.name]
			];

		const result = addCosts(
			resolvedOffer
				.filter((_, flag) => !bit || (bit & flag) !== flag)
				.map((item) => item.cost)
				.filter((cost): cost is ItemCost => cost !== null),
		);

		if (!includeSeasonalCurrency) {
			for (const seasonalCandle of result.seasonalCandles) seasonalCandle.cost = 0;
			for (const seasonalHeart of result.seasonalHearts) seasonalHeart.cost = 0;
		}

		return result;
	}
}
