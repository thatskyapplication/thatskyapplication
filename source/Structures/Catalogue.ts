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
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_EVENT_INFOGRAPHIC_YET,
	NO_EVENT_OFFER_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
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
import { SpiritName } from "../Utility/spirits.js";
import { CURRENT_EVENTS, CURRENT_EVENTS_YEARS, resolveEvents } from "../catalogue/events/index.js";
import { SPIRITS } from "../catalogue/spirits/index.js";
import { ELDER_SPIRITS, REALMS, STANDARD_SPIRITS } from "../catalogue/spirits/realms/index.js";
import {
	CURRENT_SEASONS,
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
import type { ElderSpirit, GuideSpirit, SeasonalSpirit, StandardSpirit } from "./Spirits.js";

type CatalogueValue = number | null;

export interface CataloguePacket {
	user_id: Snowflake;
	pointing_candlemaker: CatalogueValue;
	ushering_stargazer: CatalogueValue;
	rejecting_voyager: CatalogueValue;
	butterfly_charmer: CatalogueValue;
	applauding_bellmaker: CatalogueValue;
	waving_bellmaker: CatalogueValue;
	slumbering_shipwright: CatalogueValue;
	laughing_light_catcher: CatalogueValue;
	bird_whisperer: CatalogueValue;
	exhausted_dock_worker: CatalogueValue;
	ceremonial_worshiper: CatalogueValue;
	shivering_trailblazer: CatalogueValue;
	blushing_prospector: CatalogueValue;
	hide_n_seek_pioneer: CatalogueValue;
	pouty_porter: CatalogueValue;
	dismayed_hunter: CatalogueValue;
	apologetic_lumberjack: CatalogueValue;
	tearful_light_miner: CatalogueValue;
	whale_whisperer: CatalogueValue;
	confident_sightseer: CatalogueValue;
	handstanding_thrillseeker: CatalogueValue;
	manta_whisperer: CatalogueValue;
	backflipping_champion: CatalogueValue;
	cheerful_spectator: CatalogueValue;
	bowing_medalist: CatalogueValue;
	proud_victor: CatalogueValue;
	frightened_refugee: CatalogueValue;
	fainting_warrior: CatalogueValue;
	courageous_soldier: CatalogueValue;
	stealthy_survivor: CatalogueValue;
	saluting_captain: CatalogueValue;
	lookout_scout: CatalogueValue;
	praying_acolyte: CatalogueValue;
	levitating_adept: CatalogueValue;
	polite_scholar: CatalogueValue;
	memory_whisperer: CatalogueValue;
	meditating_monastic: CatalogueValue;
	elder_of_the_isle: CatalogueValue;
	elder_of_the_prairie: CatalogueValue;
	elder_of_the_forest: CatalogueValue;
	elder_of_the_valley: CatalogueValue;
	elder_of_the_wasteland: CatalogueValue;
	elder_of_the_vault: CatalogueValue;
	gratitude_guide: CatalogueValue;
	sassy_drifter: CatalogueValue;
	stretching_guru: CatalogueValue;
	provoking_performer: CatalogueValue;
	leaping_dancer: CatalogueValue;
	saluting_protector: CatalogueValue;
	greeting_shaman: CatalogueValue;
	lightseeker_guide: CatalogueValue;
	piggyback_lightseeker: CatalogueValue;
	doublefive_light_catcher: CatalogueValue;
	laidback_pioneer: CatalogueValue;
	twirling_champion: CatalogueValue;
	crab_whisperer: CatalogueValue;
	shushing_light_scholar: CatalogueValue;
	halloween_office_event_2019: CatalogueValue;
	belonging_guide: CatalogueValue;
	boogie_kid: CatalogueValue;
	confetti_cousin: CatalogueValue;
	hairtousle_teen: CatalogueValue;
	sparkler_parent: CatalogueValue;
	pleaful_parent: CatalogueValue;
	wise_grandparent: CatalogueValue;
	days_of_giving_2019: CatalogueValue;
	days_of_feast_2019: CatalogueValue;
	rhythm_guide: CatalogueValue;
	troupe_greeter: CatalogueValue;
	festival_spin_dancer: CatalogueValue;
	admiring_actor: CatalogueValue;
	troupe_juggler: CatalogueValue;
	respectful_pianist: CatalogueValue;
	thoughtful_director: CatalogueValue;
	lunar_new_year_2020: CatalogueValue;
	days_of_love_2020: CatalogueValue;
	days_of_spring_2020: CatalogueValue;
	enchantment_guide: CatalogueValue;
	nodding_muralist: CatalogueValue;
	indifferent_alchemist: CatalogueValue;
	crab_walker: CatalogueValue;
	scarecrow_farmer: CatalogueValue;
	snoozing_carpenter: CatalogueValue;
	playfighting_herbalist: CatalogueValue;
	days_of_nature_2020: CatalogueValue;
	days_of_healing_2020: CatalogueValue;
	days_of_rainbow_2020: CatalogueValue;
	sanctuary_guide: CatalogueValue;
	jelly_whisperer: CatalogueValue;
	timid_bookworm: CatalogueValue;
	rallying_thrillseeker: CatalogueValue;
	hiking_grouch: CatalogueValue;
	grateful_shell_collector: CatalogueValue;
	chill_sunbather: CatalogueValue;
	sky_anniversary_2020: CatalogueValue;
	days_of_summer_lights_2020: CatalogueValue;
	prophecy_guide: CatalogueValue;
	prophet_of_water: CatalogueValue;
	prophet_of_earth: CatalogueValue;
	prophet_of_air: CatalogueValue;
	prophet_of_fire: CatalogueValue;
	days_of_mischief_2020: CatalogueValue;
	days_of_giving_2020: CatalogueValue;
	days_of_feast_2020: CatalogueValue;
	dreams_guide: CatalogueValue;
	spinning_mentor: CatalogueValue;
	dancing_performer: CatalogueValue;
	peeking_postman: CatalogueValue;
	bearhug_hermit: CatalogueValue;
	days_of_fortune_2021: CatalogueValue;
	days_of_love_2021: CatalogueValue;
	days_of_bloom_2021: CatalogueValue;
	assembly_guide: CatalogueValue;
	baffled_botanist: CatalogueValue;
	scolding_student: CatalogueValue;
	scaredy_cadet: CatalogueValue;
	marching_adventurer: CatalogueValue;
	chuckling_scout: CatalogueValue;
	daydream_forester: CatalogueValue;
	days_of_nature_2021: CatalogueValue;
	childrens_day_2021: CatalogueValue;
	days_of_rainbow_2021: CatalogueValue;
	the_rose: CatalogueValue;
	beckoning_ruler: CatalogueValue;
	gloating_narcissist: CatalogueValue;
	stretching_lamplighter: CatalogueValue;
	slouching_soldier: CatalogueValue;
	sneezing_geographer: CatalogueValue;
	star_collector: CatalogueValue;
	sky_anniversary_2021: CatalogueValue;
	days_of_summer_2021: CatalogueValue;
	days_of_summer_lights_2021: CatalogueValue;
	flight_guide: CatalogueValue;
	lively_navigator: CatalogueValue;
	light_whisperer: CatalogueValue;
	tinkering_chimesmith: CatalogueValue;
	talented_builder: CatalogueValue;
	days_of_mischief_2021: CatalogueValue;
	days_of_giving_2021: CatalogueValue;
	days_of_feast_2021: CatalogueValue;
	abyss_guide: CatalogueValue;
	anxious_angler: CatalogueValue;
	ceasing_commodore: CatalogueValue;
	bumbling_boatswain: CatalogueValue;
	cackling_cannoneer: CatalogueValue;
	days_of_fortune_2022: CatalogueValue;
	days_of_love_2022: CatalogueValue;
	kizuna_ai_2022: CatalogueValue;
	days_of_bloom_2022: CatalogueValue;
	performance_guide: CatalogueValue;
	frantic_stagehand: CatalogueValue;
	forgetful_storyteller: CatalogueValue;
	mellow_musician: CatalogueValue;
	modest_dancer: CatalogueValue;
	days_of_nature_2022: CatalogueValue;
	harmony_hall_grand_opening_2022: CatalogueValue;
	days_of_rainbow_2022: CatalogueValue;
	the_void_of_shattering: CatalogueValue;
	ancient_light1: CatalogueValue;
	ancient_light2: CatalogueValue;
	ancient_darkness1: CatalogueValue;
	ancient_darkness2: CatalogueValue;
	sky_anniversary_2022: CatalogueValue;
	days_of_sunlight_2022: CatalogueValue;
	lazy_days_2022: CatalogueValue;
	aurora: CatalogueValue;
	running_wayfarer: CatalogueValue;
	mindful_miner: CatalogueValue;
	warrior_of_love: CatalogueValue;
	seed_of_hope: CatalogueValue;
	days_of_mischief_2022: CatalogueValue;
	days_of_giving_2022: CatalogueValue;
	days_of_feast_2022: CatalogueValue;
	remembrance_guide: CatalogueValue;
	bereft_veteran: CatalogueValue;
	pleading_child: CatalogueValue;
	tiptoeing_tea_brewer: CatalogueValue;
	wounded_warrior: CatalogueValue;
	days_of_fortune_2023: CatalogueValue;
	days_of_love_2023: CatalogueValue;
	days_of_bloom_2023: CatalogueValue;
	passage_guide: CatalogueValue;
	oddball_outcast: CatalogueValue;
	tumbling_troublemaker: CatalogueValue;
	melancholy_mope: CatalogueValue;
	overactive_overachiever: CatalogueValue;
	days_of_nature_2023: CatalogueValue;
	days_of_colour_2023: CatalogueValue;
	days_of_music_2023: CatalogueValue;
	moments_guide: CatalogueValue;
	reassuring_ranger: CatalogueValue;
	nightbird_whisperer: CatalogueValue;
	jolly_geologist: CatalogueValue;
	ascetic_monk: CatalogueValue;
	sky_anniversary_2023: CatalogueValue;
	aurora_encore_concerts_2023: CatalogueValue;
	days_of_sunlight_2023: CatalogueValue;
	days_of_style_2023: CatalogueValue;
	hopeful_steward: CatalogueValue;
	vestige_of_a_deserted_oasis: CatalogueValue;
	memory_of_a_lost_village: CatalogueValue;
	echo_of_an_abandoned_refuge: CatalogueValue;
	remnant_of_a_forgotten_haven: CatalogueValue;
	days_of_mischief_2023: CatalogueValue;
	days_of_giving_2023: CatalogueValue;
	aviarys_firework_festival_2023: CatalogueValue;
	days_of_feast_2023: CatalogueValue;
	spirit_of_mural: CatalogueValue;
	herb_gatherer: CatalogueValue;
	hunter: CatalogueValue;
	feudal_lord: CatalogueValue;
	princess: CatalogueValue;
	days_of_fortune_2024: CatalogueValue;
	days_of_love_2024: CatalogueValue;
	spring_camping_2024: CatalogueValue;
	days_of_bloom_2024: CatalogueValue;
	nesting_guide: CatalogueValue;
	nesting_solarium: CatalogueValue;
	nesting_loft: CatalogueValue;
	nesting_atrium: CatalogueValue;
	nesting_nook: CatalogueValue;
	sky_x_cinnamoroll_pop_up_cafe_2024: CatalogueValue;
	days_of_nature_2024: CatalogueValue;
}

interface CatalogueData {
	userId: CataloguePacket["user_id"];
	pointingCandlemaker: CataloguePacket["pointing_candlemaker"];
	usheringStargazer: CataloguePacket["ushering_stargazer"];
	rejectingVoyager: CataloguePacket["rejecting_voyager"];
	butterflyCharmer: CataloguePacket["butterfly_charmer"];
	applaudingBellmaker: CataloguePacket["applauding_bellmaker"];
	wavingBellmaker: CataloguePacket["waving_bellmaker"];
	slumberingShipwright: CataloguePacket["slumbering_shipwright"];
	laughingLightCatcher: CataloguePacket["laughing_light_catcher"];
	birdWhisperer: CataloguePacket["bird_whisperer"];
	exhaustedDockWorker: CataloguePacket["exhausted_dock_worker"];
	ceremonialWorshiper: CataloguePacket["ceremonial_worshiper"];
	shiveringTrailblazer: CataloguePacket["shivering_trailblazer"];
	blushingProspector: CataloguePacket["blushing_prospector"];
	hideNSeekPioneer: CataloguePacket["hide_n_seek_pioneer"];
	poutyPorter: CataloguePacket["pouty_porter"];
	dismayedHunter: CataloguePacket["dismayed_hunter"];
	apologeticLumberjack: CataloguePacket["apologetic_lumberjack"];
	tearfulLightMiner: CataloguePacket["tearful_light_miner"];
	whaleWhisperer: CataloguePacket["whale_whisperer"];
	confidentSightseer: CataloguePacket["confident_sightseer"];
	handstandingThrillseeker: CataloguePacket["handstanding_thrillseeker"];
	mantaWhisperer: CataloguePacket["manta_whisperer"];
	backflippingChampion: CataloguePacket["backflipping_champion"];
	cheerfulSpectator: CataloguePacket["cheerful_spectator"];
	bowingMedalist: CataloguePacket["bowing_medalist"];
	proudVictor: CataloguePacket["proud_victor"];
	frightenedRefugee: CataloguePacket["frightened_refugee"];
	faintingWarrior: CataloguePacket["fainting_warrior"];
	courageousSoldier: CataloguePacket["courageous_soldier"];
	stealthySurvivor: CataloguePacket["stealthy_survivor"];
	salutingCaptain: CataloguePacket["saluting_captain"];
	lookoutScout: CataloguePacket["lookout_scout"];
	prayingAcolyte: CataloguePacket["praying_acolyte"];
	levitatingAdept: CataloguePacket["levitating_adept"];
	politeScholar: CataloguePacket["polite_scholar"];
	memoryWhisperer: CataloguePacket["memory_whisperer"];
	meditatingMonastic: CataloguePacket["meditating_monastic"];
	elderOfTheIsle: CataloguePacket["elder_of_the_isle"];
	elderOfThePrairie: CataloguePacket["elder_of_the_prairie"];
	elderOfTheForest: CataloguePacket["elder_of_the_forest"];
	elderOfTheValley: CataloguePacket["elder_of_the_valley"];
	elderOfTheWasteland: CataloguePacket["elder_of_the_wasteland"];
	elderOfTheVault: CataloguePacket["elder_of_the_vault"];
	gratitudeGuide: CataloguePacket["gratitude_guide"];
	sassyDrifter: CataloguePacket["sassy_drifter"];
	stretchingGuru: CataloguePacket["stretching_guru"];
	provokingPerformer: CataloguePacket["provoking_performer"];
	leapingDancer: CataloguePacket["leaping_dancer"];
	salutingProtector: CataloguePacket["saluting_protector"];
	greetingShaman: CataloguePacket["greeting_shaman"];
	lightseekerGuide: CataloguePacket["lightseeker_guide"];
	piggybackLightseeker: CataloguePacket["piggyback_lightseeker"];
	doublefiveLightCatcher: CataloguePacket["doublefive_light_catcher"];
	laidbackPioneer: CataloguePacket["laidback_pioneer"];
	twirlingChampion: CataloguePacket["twirling_champion"];
	crabWhisperer: CataloguePacket["crab_whisperer"];
	shushingLightScholar: CataloguePacket["shushing_light_scholar"];
	halloweenOfficeEvent2019: CataloguePacket["halloween_office_event_2019"];
	belongingGuide: CataloguePacket["belonging_guide"];
	boogieKid: CataloguePacket["boogie_kid"];
	confettiCousin: CataloguePacket["confetti_cousin"];
	hairtousleTeen: CataloguePacket["hairtousle_teen"];
	sparklerParent: CataloguePacket["sparkler_parent"];
	pleafulParent: CataloguePacket["pleaful_parent"];
	wiseGrandparent: CataloguePacket["wise_grandparent"];
	daysOfGiving2019: CataloguePacket["days_of_giving_2019"];
	daysOfFeast2019: CataloguePacket["days_of_feast_2019"];
	rhythmGuide: CataloguePacket["rhythm_guide"];
	troupeGreeter: CataloguePacket["troupe_greeter"];
	festivalSpinDancer: CataloguePacket["festival_spin_dancer"];
	admiringActor: CataloguePacket["admiring_actor"];
	troupeJuggler: CataloguePacket["troupe_juggler"];
	respectfulPianist: CataloguePacket["respectful_pianist"];
	thoughtfulDirector: CataloguePacket["thoughtful_director"];
	lunarNewYear2020: CataloguePacket["lunar_new_year_2020"];
	daysOfLove2020: CataloguePacket["days_of_love_2020"];
	daysOfSpring2020: CataloguePacket["days_of_spring_2020"];
	enchantmentGuide: CataloguePacket["enchantment_guide"];
	noddingMuralist: CataloguePacket["nodding_muralist"];
	indifferentAlchemist: CataloguePacket["indifferent_alchemist"];
	crabWalker: CataloguePacket["crab_walker"];
	scarecrowFarmer: CataloguePacket["scarecrow_farmer"];
	snoozingCarpenter: CataloguePacket["snoozing_carpenter"];
	playfightingHerbalist: CataloguePacket["playfighting_herbalist"];
	daysOfNature2020: CataloguePacket["days_of_nature_2020"];
	daysOfHealing2020: CataloguePacket["days_of_healing_2020"];
	daysOfRainbow2020: CataloguePacket["days_of_rainbow_2020"];
	sanctuaryGuide: CataloguePacket["sanctuary_guide"];
	jellyWhisperer: CataloguePacket["jelly_whisperer"];
	timidBookworm: CataloguePacket["timid_bookworm"];
	rallyingThrillseeker: CataloguePacket["rallying_thrillseeker"];
	hikingGrouch: CataloguePacket["hiking_grouch"];
	gratefulShellCollector: CataloguePacket["grateful_shell_collector"];
	chillSunbather: CataloguePacket["chill_sunbather"];
	skyAnniversary2020: CataloguePacket["sky_anniversary_2020"];
	daysOfSummerLights2020: CataloguePacket["days_of_summer_lights_2020"];
	prophecyGuide: CataloguePacket["prophecy_guide"];
	prophetOfWater: CataloguePacket["prophet_of_water"];
	prophetOfEarth: CataloguePacket["prophet_of_earth"];
	prophetOfAir: CataloguePacket["prophet_of_air"];
	prophetOfFire: CataloguePacket["prophet_of_fire"];
	daysOfMischief2020: CataloguePacket["days_of_mischief_2020"];
	daysOfGiving2020: CataloguePacket["days_of_giving_2020"];
	daysOfFeast2020: CataloguePacket["days_of_feast_2020"];
	dreamsGuide: CataloguePacket["dreams_guide"];
	spinningMentor: CataloguePacket["spinning_mentor"];
	dancingPerformer: CataloguePacket["dancing_performer"];
	peekingPostman: CataloguePacket["peeking_postman"];
	bearhugHermit: CataloguePacket["bearhug_hermit"];
	daysOfFortune2021: CataloguePacket["days_of_fortune_2021"];
	daysOfLove2021: CataloguePacket["days_of_love_2021"];
	daysOfBloom2021: CataloguePacket["days_of_bloom_2021"];
	assemblyGuide: CataloguePacket["assembly_guide"];
	baffledBotanist: CataloguePacket["baffled_botanist"];
	scoldingStudent: CataloguePacket["scolding_student"];
	scaredyCadet: CataloguePacket["scaredy_cadet"];
	marchingAdventurer: CataloguePacket["marching_adventurer"];
	chucklingScout: CataloguePacket["chuckling_scout"];
	daydreamForester: CataloguePacket["daydream_forester"];
	daysOfNature2021: CataloguePacket["days_of_nature_2021"];
	childrensDay2021: CataloguePacket["childrens_day_2021"];
	daysOfRainbow2021: CataloguePacket["days_of_rainbow_2021"];
	theRose: CataloguePacket["the_rose"];
	beckoningRuler: CataloguePacket["beckoning_ruler"];
	gloatingNarcissist: CataloguePacket["gloating_narcissist"];
	stretchingLamplighter: CataloguePacket["stretching_lamplighter"];
	slouchingSoldier: CataloguePacket["slouching_soldier"];
	sneezingGeographer: CataloguePacket["sneezing_geographer"];
	starCollector: CataloguePacket["star_collector"];
	skyAnniversary2021: CataloguePacket["sky_anniversary_2021"];
	daysOfSummer2021: CataloguePacket["days_of_summer_2021"];
	daysOfSummerLights2021: CataloguePacket["days_of_summer_lights_2021"];
	flightGuide: CataloguePacket["flight_guide"];
	livelyNavigator: CataloguePacket["lively_navigator"];
	lightWhisperer: CataloguePacket["light_whisperer"];
	tinkeringChimesmith: CataloguePacket["tinkering_chimesmith"];
	talentedBuilder: CataloguePacket["talented_builder"];
	daysOfMischief2021: CataloguePacket["days_of_mischief_2021"];
	daysOfGiving2021: CataloguePacket["days_of_giving_2021"];
	daysOfFeast2021: CataloguePacket["days_of_feast_2021"];
	abyssGuide: CataloguePacket["abyss_guide"];
	anxiousAngler: CataloguePacket["anxious_angler"];
	ceasingCommodore: CataloguePacket["ceasing_commodore"];
	bumblingBoatswain: CataloguePacket["bumbling_boatswain"];
	cacklingCannoneer: CataloguePacket["cackling_cannoneer"];
	daysOfFortune2022: CataloguePacket["days_of_fortune_2022"];
	daysOfLove2022: CataloguePacket["days_of_love_2022"];
	kizunaAI2022: CataloguePacket["kizuna_ai_2022"];
	daysOfBloom2022: CataloguePacket["days_of_bloom_2022"];
	performanceGuide: CataloguePacket["performance_guide"];
	franticStagehand: CataloguePacket["frantic_stagehand"];
	forgetfulStoryteller: CataloguePacket["forgetful_storyteller"];
	mellowMusician: CataloguePacket["mellow_musician"];
	modestDancer: CataloguePacket["modest_dancer"];
	daysOfNature2022: CataloguePacket["days_of_nature_2022"];
	harmonyHallGrandOpening2022: CataloguePacket["harmony_hall_grand_opening_2022"];
	daysOfRainbow2022: CataloguePacket["days_of_rainbow_2022"];
	theVoidOfShattering: CataloguePacket["the_void_of_shattering"];
	ancientLight1: CataloguePacket["ancient_light1"];
	ancientLight2: CataloguePacket["ancient_light2"];
	ancientDarkness1: CataloguePacket["ancient_darkness1"];
	ancientDarkness2: CataloguePacket["ancient_darkness2"];
	skyAnniversary2022: CataloguePacket["sky_anniversary_2022"];
	daysOfSunlight2022: CataloguePacket["days_of_sunlight_2022"];
	lazyDays2022: CataloguePacket["lazy_days_2022"];
	aurora: CataloguePacket["aurora"];
	runningWayfarer: CataloguePacket["running_wayfarer"];
	mindfulMiner: CataloguePacket["mindful_miner"];
	warriorOfLove: CataloguePacket["warrior_of_love"];
	seedOfHope: CataloguePacket["seed_of_hope"];
	daysOfMischief2022: CataloguePacket["days_of_mischief_2022"];
	daysOfGiving2022: CataloguePacket["days_of_giving_2022"];
	daysOfFeast2022: CataloguePacket["days_of_feast_2022"];
	remembranceGuide: CataloguePacket["remembrance_guide"];
	bereftVeteran: CataloguePacket["bereft_veteran"];
	pleadingChild: CataloguePacket["pleading_child"];
	tiptoeingTeaBrewer: CataloguePacket["tiptoeing_tea_brewer"];
	woundedWarrior: CataloguePacket["wounded_warrior"];
	daysOfFortune2023: CataloguePacket["days_of_fortune_2023"];
	daysOfLove2023: CataloguePacket["days_of_love_2023"];
	daysOfBloom2023: CataloguePacket["days_of_bloom_2023"];
	passageGuide: CataloguePacket["passage_guide"];
	oddballOutcast: CataloguePacket["oddball_outcast"];
	tumblingTroublemaker: CataloguePacket["tumbling_troublemaker"];
	melancholyMope: CataloguePacket["melancholy_mope"];
	overactiveOverachiever: CataloguePacket["overactive_overachiever"];
	daysOfNature2023: CataloguePacket["days_of_nature_2023"];
	daysOfColour2023: CataloguePacket["days_of_colour_2023"];
	daysOfMusic2023: CataloguePacket["days_of_music_2023"];
	momentsGuide: CataloguePacket["moments_guide"];
	reassuringRanger: CataloguePacket["reassuring_ranger"];
	nightbirdWhisperer: CataloguePacket["nightbird_whisperer"];
	jollyGeologist: CataloguePacket["jolly_geologist"];
	asceticMonk: CataloguePacket["ascetic_monk"];
	skyAnniversary2023: CataloguePacket["sky_anniversary_2023"];
	auroraEncoreConcerts2023: CataloguePacket["aurora_encore_concerts_2023"];
	daysOfSunlight2023: CataloguePacket["days_of_sunlight_2023"];
	daysOfStyle2023: CataloguePacket["days_of_style_2023"];
	hopefulSteward: CataloguePacket["hopeful_steward"];
	vestigeOfADesertedOasis: CataloguePacket["vestige_of_a_deserted_oasis"];
	memoryOfALostVillage: CataloguePacket["memory_of_a_lost_village"];
	echoOfAnAbandonedRefuge: CataloguePacket["echo_of_an_abandoned_refuge"];
	remnantOfAForgottenHaven: CataloguePacket["remnant_of_a_forgotten_haven"];
	daysOfMischief2023: CataloguePacket["days_of_mischief_2023"];
	daysOfGiving2023: CataloguePacket["days_of_giving_2023"];
	aviarysFireworkFestival2023: CataloguePacket["aviarys_firework_festival_2023"];
	daysOfFeast2023: CataloguePacket["days_of_feast_2023"];
	spiritOfMural: CataloguePacket["spirit_of_mural"];
	herbGatherer: CataloguePacket["herb_gatherer"];
	hunter: CataloguePacket["hunter"];
	feudalLord: CataloguePacket["feudal_lord"];
	princess: CataloguePacket["princess"];
	daysOfFortune2024: CataloguePacket["days_of_fortune_2024"];
	daysOfLove2024: CataloguePacket["days_of_love_2024"];
	springCamping2024: CataloguePacket["spring_camping_2024"];
	daysOfBloom2024: CataloguePacket["days_of_bloom_2024"];
	nestingGuide: CataloguePacket["nesting_guide"];
	nestingSolarium: CataloguePacket["nesting_solarium"];
	nestingLoft: CataloguePacket["nesting_loft"];
	nestingAtrium: CataloguePacket["nesting_atrium"];
	nestingNook: CataloguePacket["nesting_nook"];
	skyXCinnamorollPopUpCafe2024: CataloguePacket["sky_x_cinnamoroll_pop_up_cafe_2024"];
	daysOfNature2024: CataloguePacket["days_of_nature_2024"];
}

type CataloguePatchData = Omit<CataloguePacket, "user_id">;
type CatalogueSetData = Partial<Omit<CataloguePacket, "user_id">>;

const CatalogueNameToRawName = {
	[SpiritName.PointingCandlemaker]: "pointing_candlemaker",
	[SpiritName.UsheringStargazer]: "ushering_stargazer",
	[SpiritName.RejectingVoyager]: "rejecting_voyager",
	[SpiritName.ButterflyCharmer]: "butterfly_charmer",
	[SpiritName.ApplaudingBellmaker]: "applauding_bellmaker",
	[SpiritName.WavingBellmaker]: "waving_bellmaker",
	[SpiritName.SlumberingShipwright]: "slumbering_shipwright",
	[SpiritName.LaughingLightCatcher]: "laughing_light_catcher",
	[SpiritName.BirdWhisperer]: "bird_whisperer",
	[SpiritName.ExhaustedDockWorker]: "exhausted_dock_worker",
	[SpiritName.CeremonialWorshiper]: "ceremonial_worshiper",
	[SpiritName.ShiveringTrailblazer]: "shivering_trailblazer",
	[SpiritName.BlushingProspector]: "blushing_prospector",
	[SpiritName.HideNSeekPioneer]: "hide_n_seek_pioneer",
	[SpiritName.PoutyPorter]: "pouty_porter",
	[SpiritName.DismayedHunter]: "dismayed_hunter",
	[SpiritName.ApologeticLumberjack]: "apologetic_lumberjack",
	[SpiritName.TearfulLightMiner]: "tearful_light_miner",
	[SpiritName.WhaleWhisperer]: "whale_whisperer",
	[SpiritName.ConfidentSightseer]: "confident_sightseer",
	[SpiritName.HandstandingThrillseeker]: "handstanding_thrillseeker",
	[SpiritName.MantaWhisperer]: "manta_whisperer",
	[SpiritName.BackflippingChampion]: "backflipping_champion",
	[SpiritName.CheerfulSpectator]: "cheerful_spectator",
	[SpiritName.BowingMedalist]: "bowing_medalist",
	[SpiritName.ProudVictor]: "proud_victor",
	[SpiritName.FrightenedRefugee]: "frightened_refugee",
	[SpiritName.FaintingWarrior]: "fainting_warrior",
	[SpiritName.CourageousSoldier]: "courageous_soldier",
	[SpiritName.StealthySurvivor]: "stealthy_survivor",
	[SpiritName.SalutingCaptain]: "saluting_captain",
	[SpiritName.LookoutScout]: "lookout_scout",
	[SpiritName.PrayingAcolyte]: "praying_acolyte",
	[SpiritName.LevitatingAdept]: "levitating_adept",
	[SpiritName.PoliteScholar]: "polite_scholar",
	[SpiritName.MemoryWhisperer]: "memory_whisperer",
	[SpiritName.MeditatingMonastic]: "meditating_monastic",
	[SpiritName.ElderOfTheIsle]: "elder_of_the_isle",
	[SpiritName.ElderOfThePrairie]: "elder_of_the_prairie",
	[SpiritName.ElderOfTheForest]: "elder_of_the_forest",
	[SpiritName.ElderOfTheValley]: "elder_of_the_valley",
	[SpiritName.ElderOfTheWasteland]: "elder_of_the_wasteland",
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
	[EventNameUnique.HalloweenOfficeEvent2019]: "halloween_office_event_2019",
	[SpiritName.BelongingGuide]: "belonging_guide",
	[SpiritName.BoogieKid]: "boogie_kid",
	[SpiritName.ConfettiCousin]: "confetti_cousin",
	[SpiritName.HairtousleTeen]: "hairtousle_teen",
	[SpiritName.SparklerParent]: "sparkler_parent",
	[SpiritName.PleafulParent]: "pleaful_parent",
	[SpiritName.WiseGrandparent]: "wise_grandparent",
	[EventNameUnique.DaysOfGiving2019]: "days_of_giving_2019",
	[EventNameUnique.DaysOfFeast2019]: "days_of_feast_2019",
	[SpiritName.RhythmGuide]: "rhythm_guide",
	[SpiritName.TroupeGreeter]: "troupe_greeter",
	[SpiritName.FestivalSpinDancer]: "festival_spin_dancer",
	[SpiritName.AdmiringActor]: "admiring_actor",
	[SpiritName.TroupeJuggler]: "troupe_juggler",
	[SpiritName.RespectfulPianist]: "respectful_pianist",
	[SpiritName.ThoughtfulDirector]: "thoughtful_director",
	[EventNameUnique.LunarNewYear2020]: "lunar_new_year_2020",
	[EventNameUnique.DaysOfLove2020]: "days_of_love_2020",
	[EventNameUnique.DaysOfSpring2020]: "days_of_spring_2020",
	[SpiritName.EnchantmentGuide]: "enchantment_guide",
	[SpiritName.NoddingMuralist]: "nodding_muralist",
	[SpiritName.IndifferentAlchemist]: "indifferent_alchemist",
	[SpiritName.CrabWalker]: "crab_walker",
	[SpiritName.ScarecrowFarmer]: "scarecrow_farmer",
	[SpiritName.SnoozingCarpenter]: "snoozing_carpenter",
	[SpiritName.PlayfightingHerbalist]: "playfighting_herbalist",
	[EventNameUnique.DaysOfNature2020]: "days_of_nature_2020",
	[EventNameUnique.DaysOfHealing2020]: "days_of_healing_2020",
	[EventNameUnique.DaysOfRainbow2020]: "days_of_rainbow_2020",
	[SpiritName.SanctuaryGuide]: "sanctuary_guide",
	[SpiritName.JellyWhisperer]: "jelly_whisperer",
	[SpiritName.TimidBookworm]: "timid_bookworm",
	[SpiritName.RallyingThrillseeker]: "rallying_thrillseeker",
	[SpiritName.HikingGrouch]: "hiking_grouch",
	[SpiritName.GratefulShellCollector]: "grateful_shell_collector",
	[SpiritName.ChillSunbather]: "chill_sunbather",
	[EventNameUnique.SkyAnniversary2020]: "sky_anniversary_2020",
	[EventNameUnique.DaysOfSummerLights2020]: "days_of_summer_lights_2020",
	[SpiritName.ProphecyGuide]: "prophecy_guide",
	[SpiritName.ProphetOfWater]: "prophet_of_water",
	[SpiritName.ProphetOfEarth]: "prophet_of_earth",
	[SpiritName.ProphetOfAir]: "prophet_of_air",
	[SpiritName.ProphetOfFire]: "prophet_of_fire",
	[EventNameUnique.DaysOfMischief2020]: "days_of_mischief_2020",
	[EventNameUnique.DaysOfGiving2020]: "days_of_giving_2020",
	[EventNameUnique.DaysOfFeast2020]: "days_of_feast_2020",
	[SpiritName.DreamsGuide]: "dreams_guide",
	[SpiritName.SpinningMentor]: "spinning_mentor",
	[SpiritName.DancingPerformer]: "dancing_performer",
	[SpiritName.PeekingPostman]: "peeking_postman",
	[SpiritName.BearhugHermit]: "bearhug_hermit",
	[EventNameUnique.DaysOfFortune2021]: "days_of_fortune_2021",
	[EventNameUnique.DaysOfLove2021]: "days_of_love_2021",
	[EventNameUnique.DaysOfBloom2021]: "days_of_bloom_2021",
	[SpiritName.AssemblyGuide]: "assembly_guide",
	[SpiritName.BaffledBotanist]: "baffled_botanist",
	[SpiritName.ScoldingStudent]: "scolding_student",
	[SpiritName.ScaredyCadet]: "scaredy_cadet",
	[SpiritName.MarchingAdventurer]: "marching_adventurer",
	[SpiritName.ChucklingScout]: "chuckling_scout",
	[SpiritName.DaydreamForester]: "daydream_forester",
	[EventNameUnique.DaysOfNature2021]: "days_of_nature_2021",
	[EventNameUnique.ChildrensDay2021]: "childrens_day_2021",
	[EventNameUnique.DaysOfRainbow2021]: "days_of_rainbow_2021",
	[SpiritName.TheRose]: "the_rose",
	[SpiritName.BeckoningRuler]: "beckoning_ruler",
	[SpiritName.GloatingNarcissist]: "gloating_narcissist",
	[SpiritName.StretchingLamplighter]: "stretching_lamplighter",
	[SpiritName.SlouchingSoldier]: "slouching_soldier",
	[SpiritName.SneezingGeographer]: "sneezing_geographer",
	[SpiritName.StarCollector]: "star_collector",
	[EventNameUnique.SkyAnniversary2021]: "sky_anniversary_2021",
	[EventNameUnique.DaysOfSummer2021]: "days_of_summer_2021",
	[EventNameUnique.DaysOfSummerLights2021]: "days_of_summer_lights_2021",
	[SpiritName.FlightGuide]: "flight_guide",
	[SpiritName.LivelyNavigator]: "lively_navigator",
	[SpiritName.LightWhisperer]: "light_whisperer",
	[SpiritName.TinkeringChimesmith]: "tinkering_chimesmith",
	[SpiritName.TalentedBuilder]: "talented_builder",
	[EventNameUnique.DaysOfMischief2021]: "days_of_mischief_2021",
	[EventNameUnique.DaysOfGiving2021]: "days_of_giving_2021",
	[EventNameUnique.DaysOfFeast2021]: "days_of_feast_2021",
	[SpiritName.AbyssGuide]: "abyss_guide",
	[SpiritName.AnxiousAngler]: "anxious_angler",
	[SpiritName.CeasingCommodore]: "ceasing_commodore",
	[SpiritName.BumblingBoatswain]: "bumbling_boatswain",
	[SpiritName.CacklingCannoneer]: "cackling_cannoneer",
	[EventNameUnique.DaysOfFortune2022]: "days_of_fortune_2022",
	[EventNameUnique.DaysOfLove2022]: "days_of_love_2022",
	[EventNameUnique.KizunaAI2022]: "kizuna_ai_2022",
	[EventNameUnique.DaysOfBloom2022]: "days_of_bloom_2022",
	[SpiritName.PerformanceGuide]: "performance_guide",
	[SpiritName.FranticStagehand]: "frantic_stagehand",
	[SpiritName.ForgetfulStoryteller]: "forgetful_storyteller",
	[SpiritName.MellowMusician]: "mellow_musician",
	[SpiritName.ModestDancer]: "modest_dancer",
	[EventNameUnique.DaysOfNature2022]: "days_of_nature_2022",
	[EventNameUnique.HarmonyHallGrandOpening2022]: "harmony_hall_grand_opening_2022",
	[EventNameUnique.DaysOfRainbow2022]: "days_of_rainbow_2022",
	[SpiritName.TheVoidOfShattering]: "the_void_of_shattering",
	[SpiritName.AncientLight1]: "ancient_light1",
	[SpiritName.AncientLight2]: "ancient_light2",
	[SpiritName.AncientDarkness1]: "ancient_darkness1",
	[SpiritName.AncientDarkness2]: "ancient_darkness2",
	[EventNameUnique.SkyAnniversary2022]: "sky_anniversary_2022",
	[EventNameUnique.DaysOfSunlight2022]: "days_of_sunlight_2022",
	[EventNameUnique.LazyDays2022]: "lazy_days_2022",
	[SpiritName.AURORA]: "aurora",
	[SpiritName.RunningWayfarer]: "running_wayfarer",
	[SpiritName.MindfulMiner]: "mindful_miner",
	[SpiritName.WarriorOfLove]: "warrior_of_love",
	[SpiritName.SeedOfHope]: "seed_of_hope",
	[EventNameUnique.DaysOfMischief2022]: "days_of_mischief_2022",
	[EventNameUnique.DaysOfGiving2022]: "days_of_giving_2022",
	[EventNameUnique.DaysOfFeast2022]: "days_of_feast_2022",
	[SpiritName.RemembranceGuide]: "remembrance_guide",
	[SpiritName.BereftVeteran]: "bereft_veteran",
	[SpiritName.PleadingChild]: "pleading_child",
	[SpiritName.TiptoeingTeaBrewer]: "tiptoeing_tea_brewer",
	[SpiritName.WoundedWarrior]: "wounded_warrior",
	[EventNameUnique.DaysOfFortune2023]: "days_of_fortune_2023",
	[EventNameUnique.DaysOfLove2023]: "days_of_love_2023",
	[EventNameUnique.DaysOfBloom2023]: "days_of_bloom_2023",
	[SpiritName.PassageGuide]: "passage_guide",
	[SpiritName.OddballOutcast]: "oddball_outcast",
	[SpiritName.TumblingTroublemaker]: "tumbling_troublemaker",
	[SpiritName.MelancholyMope]: "melancholy_mope",
	[SpiritName.OveractiveOverachiever]: "overactive_overachiever",
	[EventNameUnique.DaysOfNature2023]: "days_of_nature_2023",
	[EventNameUnique.DaysOfColour2023]: "days_of_colour_2023",
	[EventNameUnique.DaysOfMusic2023]: "days_of_music_2023",
	[SpiritName.MomentsGuide]: "moments_guide",
	[SpiritName.ReassuringRanger]: "reassuring_ranger",
	[SpiritName.NightbirdWhisperer]: "nightbird_whisperer",
	[SpiritName.JollyGeologist]: "jolly_geologist",
	[SpiritName.AsceticMonk]: "ascetic_monk",
	[EventNameUnique.SkyAnniversary2023]: "sky_anniversary_2023",
	[EventNameUnique.AURORAEncoreConcerts2023]: "aurora_encore_concerts_2023",
	[EventNameUnique.DaysOfSunlight2023]: "days_of_sunlight_2023",
	[EventNameUnique.DaysOfStyle2023]: "days_of_style_2023",
	[SpiritName.HopefulSteward]: "hopeful_steward",
	[SpiritName.VestigeOfADesertedOasis]: "vestige_of_a_deserted_oasis",
	[SpiritName.MemoryOfALostVillage]: "memory_of_a_lost_village",
	[SpiritName.EchoOfAnAbandonedRefuge]: "echo_of_an_abandoned_refuge",
	[SpiritName.RemnantOfAForgottenHaven]: "remnant_of_a_forgotten_haven",
	[EventNameUnique.DaysOfMischief2023]: "days_of_mischief_2023",
	[EventNameUnique.DaysOfGiving2023]: "days_of_giving_2023",
	[EventNameUnique.AviarysFireworkFestival2023]: "aviarys_firework_festival_2023",
	[EventNameUnique.DaysOfFeast2023]: "days_of_feast_2023",
	[SpiritName.SpiritOfMural]: "spirit_of_mural",
	[SpiritName.HerbGatherer]: "herb_gatherer",
	[SpiritName.Hunter]: "hunter",
	[SpiritName.FeudalLord]: "feudal_lord",
	[SpiritName.Princess]: "princess",
	[EventNameUnique.DaysOfFortune2024]: "days_of_fortune_2024",
	[EventNameUnique.DaysOfLove2024]: "days_of_love_2024",
	[EventNameUnique.SpringCamping2024]: "spring_camping_2024",
	[EventNameUnique.DaysOfBloom2024]: "days_of_bloom_2024",
	[SpiritName.NestingGuide]: "nesting_guide",
	[SpiritName.NestingSolarium]: "nesting_solarium",
	[SpiritName.NestingLoft]: "nesting_loft",
	[SpiritName.NestingAtrium]: "nesting_atrium",
	[SpiritName.NestingNook]: "nesting_nook",
	[EventNameUnique.SkyXCinnamorollPopUpCafe2024]: "sky_x_cinnamoroll_pop_up_cafe_2024",
	[EventNameUnique.DaysOfNature2024]: "days_of_nature_2024",
} as const satisfies Readonly<Record<SpiritName | EventNameUnique, Exclude<keyof CataloguePacket, "user_id">>>;

const SpiritEventNameToCatalogueName = {
	[SpiritName.PointingCandlemaker]: "pointingCandlemaker",
	[SpiritName.UsheringStargazer]: "usheringStargazer",
	[SpiritName.RejectingVoyager]: "rejectingVoyager",
	[SpiritName.ButterflyCharmer]: "butterflyCharmer",
	[SpiritName.ApplaudingBellmaker]: "applaudingBellmaker",
	[SpiritName.WavingBellmaker]: "wavingBellmaker",
	[SpiritName.SlumberingShipwright]: "slumberingShipwright",
	[SpiritName.LaughingLightCatcher]: "laughingLightCatcher",
	[SpiritName.BirdWhisperer]: "birdWhisperer",
	[SpiritName.ExhaustedDockWorker]: "exhaustedDockWorker",
	[SpiritName.CeremonialWorshiper]: "ceremonialWorshiper",
	[SpiritName.ShiveringTrailblazer]: "shiveringTrailblazer",
	[SpiritName.BlushingProspector]: "blushingProspector",
	[SpiritName.HideNSeekPioneer]: "hideNSeekPioneer",
	[SpiritName.PoutyPorter]: "poutyPorter",
	[SpiritName.DismayedHunter]: "dismayedHunter",
	[SpiritName.ApologeticLumberjack]: "apologeticLumberjack",
	[SpiritName.TearfulLightMiner]: "tearfulLightMiner",
	[SpiritName.WhaleWhisperer]: "whaleWhisperer",
	[SpiritName.ConfidentSightseer]: "confidentSightseer",
	[SpiritName.HandstandingThrillseeker]: "handstandingThrillseeker",
	[SpiritName.MantaWhisperer]: "mantaWhisperer",
	[SpiritName.BackflippingChampion]: "backflippingChampion",
	[SpiritName.CheerfulSpectator]: "cheerfulSpectator",
	[SpiritName.BowingMedalist]: "bowingMedalist",
	[SpiritName.ProudVictor]: "proudVictor",
	[SpiritName.FrightenedRefugee]: "frightenedRefugee",
	[SpiritName.FaintingWarrior]: "faintingWarrior",
	[SpiritName.CourageousSoldier]: "courageousSoldier",
	[SpiritName.StealthySurvivor]: "stealthySurvivor",
	[SpiritName.SalutingCaptain]: "salutingCaptain",
	[SpiritName.LookoutScout]: "lookoutScout",
	[SpiritName.PrayingAcolyte]: "prayingAcolyte",
	[SpiritName.LevitatingAdept]: "levitatingAdept",
	[SpiritName.PoliteScholar]: "politeScholar",
	[SpiritName.MemoryWhisperer]: "memoryWhisperer",
	[SpiritName.MeditatingMonastic]: "meditatingMonastic",
	[SpiritName.ElderOfTheIsle]: "elderOfTheIsle",
	[SpiritName.ElderOfThePrairie]: "elderOfThePrairie",
	[SpiritName.ElderOfTheForest]: "elderOfTheForest",
	[SpiritName.ElderOfTheValley]: "elderOfTheValley",
	[SpiritName.ElderOfTheWasteland]: "elderOfTheWasteland",
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
	[EventNameUnique.HalloweenOfficeEvent2019]: "halloweenOfficeEvent2019",
	[SpiritName.BelongingGuide]: "belongingGuide",
	[SpiritName.BoogieKid]: "boogieKid",
	[SpiritName.ConfettiCousin]: "confettiCousin",
	[SpiritName.HairtousleTeen]: "hairtousleTeen",
	[SpiritName.SparklerParent]: "sparklerParent",
	[SpiritName.PleafulParent]: "pleafulParent",
	[SpiritName.WiseGrandparent]: "wiseGrandparent",
	[EventNameUnique.DaysOfGiving2019]: "daysOfGiving2019",
	[EventNameUnique.DaysOfFeast2019]: "daysOfFeast2019",
	[SpiritName.RhythmGuide]: "rhythmGuide",
	[SpiritName.TroupeGreeter]: "troupeGreeter",
	[SpiritName.FestivalSpinDancer]: "festivalSpinDancer",
	[SpiritName.AdmiringActor]: "admiringActor",
	[SpiritName.TroupeJuggler]: "troupeJuggler",
	[SpiritName.RespectfulPianist]: "respectfulPianist",
	[SpiritName.ThoughtfulDirector]: "thoughtfulDirector",
	[EventNameUnique.LunarNewYear2020]: "lunarNewYear2020",
	[EventNameUnique.DaysOfLove2020]: "daysOfLove2020",
	[EventNameUnique.DaysOfSpring2020]: "daysOfSpring2020",
	[SpiritName.EnchantmentGuide]: "enchantmentGuide",
	[SpiritName.NoddingMuralist]: "noddingMuralist",
	[SpiritName.IndifferentAlchemist]: "indifferentAlchemist",
	[SpiritName.CrabWalker]: "crabWalker",
	[SpiritName.ScarecrowFarmer]: "scarecrowFarmer",
	[SpiritName.SnoozingCarpenter]: "snoozingCarpenter",
	[SpiritName.PlayfightingHerbalist]: "playfightingHerbalist",
	[EventNameUnique.DaysOfNature2020]: "daysOfNature2020",
	[EventNameUnique.DaysOfHealing2020]: "daysOfHealing2020",
	[EventNameUnique.DaysOfRainbow2020]: "daysOfRainbow2020",
	[SpiritName.SanctuaryGuide]: "sanctuaryGuide",
	[SpiritName.JellyWhisperer]: "jellyWhisperer",
	[SpiritName.TimidBookworm]: "timidBookworm",
	[SpiritName.RallyingThrillseeker]: "rallyingThrillseeker",
	[SpiritName.HikingGrouch]: "hikingGrouch",
	[SpiritName.GratefulShellCollector]: "gratefulShellCollector",
	[SpiritName.ChillSunbather]: "chillSunbather",
	[EventNameUnique.SkyAnniversary2020]: "skyAnniversary2020",
	[EventNameUnique.DaysOfSummerLights2020]: "daysOfSummerLights2020",
	[SpiritName.ProphecyGuide]: "prophecyGuide",
	[SpiritName.ProphetOfWater]: "prophetOfWater",
	[SpiritName.ProphetOfEarth]: "prophetOfEarth",
	[SpiritName.ProphetOfAir]: "prophetOfAir",
	[SpiritName.ProphetOfFire]: "prophetOfFire",
	[EventNameUnique.DaysOfMischief2020]: "daysOfMischief2020",
	[EventNameUnique.DaysOfGiving2020]: "daysOfGiving2020",
	[EventNameUnique.DaysOfFeast2020]: "daysOfFeast2020",
	[SpiritName.DreamsGuide]: "dreamsGuide",
	[SpiritName.SpinningMentor]: "spinningMentor",
	[SpiritName.DancingPerformer]: "dancingPerformer",
	[SpiritName.PeekingPostman]: "peekingPostman",
	[SpiritName.BearhugHermit]: "bearhugHermit",
	[EventNameUnique.DaysOfFortune2021]: "daysOfFortune2021",
	[EventNameUnique.DaysOfLove2021]: "daysOfLove2021",
	[EventNameUnique.DaysOfBloom2021]: "daysOfBloom2021",
	[SpiritName.AssemblyGuide]: "assemblyGuide",
	[SpiritName.BaffledBotanist]: "baffledBotanist",
	[SpiritName.ScoldingStudent]: "scoldingStudent",
	[SpiritName.ScaredyCadet]: "scaredyCadet",
	[SpiritName.MarchingAdventurer]: "marchingAdventurer",
	[SpiritName.ChucklingScout]: "chucklingScout",
	[SpiritName.DaydreamForester]: "daydreamForester",
	[EventNameUnique.DaysOfNature2021]: "daysOfNature2021",
	[EventNameUnique.ChildrensDay2021]: "childrensDay2021",
	[EventNameUnique.DaysOfRainbow2021]: "daysOfRainbow2021",
	[SpiritName.TheRose]: "theRose",
	[SpiritName.BeckoningRuler]: "beckoningRuler",
	[SpiritName.GloatingNarcissist]: "gloatingNarcissist",
	[SpiritName.StretchingLamplighter]: "stretchingLamplighter",
	[SpiritName.SlouchingSoldier]: "slouchingSoldier",
	[SpiritName.SneezingGeographer]: "sneezingGeographer",
	[SpiritName.StarCollector]: "starCollector",
	[EventNameUnique.SkyAnniversary2021]: "skyAnniversary2021",
	[EventNameUnique.DaysOfSummer2021]: "daysOfSummer2021",
	[EventNameUnique.DaysOfSummerLights2021]: "daysOfSummerLights2021",
	[SpiritName.FlightGuide]: "flightGuide",
	[SpiritName.LivelyNavigator]: "livelyNavigator",
	[SpiritName.LightWhisperer]: "lightWhisperer",
	[SpiritName.TinkeringChimesmith]: "tinkeringChimesmith",
	[SpiritName.TalentedBuilder]: "talentedBuilder",
	[EventNameUnique.DaysOfMischief2021]: "daysOfMischief2021",
	[EventNameUnique.DaysOfGiving2021]: "daysOfGiving2021",
	[EventNameUnique.DaysOfFeast2021]: "daysOfFeast2021",
	[SpiritName.AbyssGuide]: "abyssGuide",
	[SpiritName.AnxiousAngler]: "anxiousAngler",
	[SpiritName.CeasingCommodore]: "ceasingCommodore",
	[SpiritName.BumblingBoatswain]: "bumblingBoatswain",
	[SpiritName.CacklingCannoneer]: "cacklingCannoneer",
	[EventNameUnique.DaysOfFortune2022]: "daysOfFortune2022",
	[EventNameUnique.DaysOfLove2022]: "daysOfLove2022",
	[EventNameUnique.KizunaAI2022]: "kizunaAI2022",
	[EventNameUnique.DaysOfBloom2022]: "daysOfBloom2022",
	[SpiritName.PerformanceGuide]: "performanceGuide",
	[SpiritName.FranticStagehand]: "franticStagehand",
	[SpiritName.ForgetfulStoryteller]: "forgetfulStoryteller",
	[SpiritName.MellowMusician]: "mellowMusician",
	[SpiritName.ModestDancer]: "modestDancer",
	[EventNameUnique.DaysOfNature2022]: "daysOfNature2022",
	[EventNameUnique.HarmonyHallGrandOpening2022]: "harmonyHallGrandOpening2022",
	[EventNameUnique.DaysOfRainbow2022]: "daysOfRainbow2022",
	[SpiritName.TheVoidOfShattering]: "theVoidOfShattering",
	[SpiritName.AncientLight1]: "ancientLight1",
	[SpiritName.AncientLight2]: "ancientLight2",
	[SpiritName.AncientDarkness1]: "ancientDarkness1",
	[SpiritName.AncientDarkness2]: "ancientDarkness2",
	[EventNameUnique.SkyAnniversary2022]: "skyAnniversary2022",
	[EventNameUnique.DaysOfSunlight2022]: "daysOfSunlight2022",
	[EventNameUnique.LazyDays2022]: "lazyDays2022",
	[SpiritName.AURORA]: "aurora",
	[SpiritName.RunningWayfarer]: "runningWayfarer",
	[SpiritName.MindfulMiner]: "mindfulMiner",
	[SpiritName.WarriorOfLove]: "warriorOfLove",
	[SpiritName.SeedOfHope]: "seedOfHope",
	[EventNameUnique.DaysOfMischief2022]: "daysOfMischief2022",
	[EventNameUnique.DaysOfGiving2022]: "daysOfGiving2022",
	[EventNameUnique.DaysOfFeast2022]: "daysOfFeast2022",
	[SpiritName.RemembranceGuide]: "remembranceGuide",
	[SpiritName.BereftVeteran]: "bereftVeteran",
	[SpiritName.PleadingChild]: "pleadingChild",
	[SpiritName.TiptoeingTeaBrewer]: "tiptoeingTeaBrewer",
	[SpiritName.WoundedWarrior]: "woundedWarrior",
	[EventNameUnique.DaysOfFortune2023]: "daysOfFortune2023",
	[EventNameUnique.DaysOfLove2023]: "daysOfLove2023",
	[EventNameUnique.DaysOfBloom2023]: "daysOfBloom2023",
	[SpiritName.PassageGuide]: "passageGuide",
	[SpiritName.OddballOutcast]: "oddballOutcast",
	[SpiritName.TumblingTroublemaker]: "tumblingTroublemaker",
	[SpiritName.MelancholyMope]: "melancholyMope",
	[SpiritName.OveractiveOverachiever]: "overactiveOverachiever",
	[EventNameUnique.DaysOfNature2023]: "daysOfNature2023",
	[EventNameUnique.DaysOfColour2023]: "daysOfColour2023",
	[EventNameUnique.DaysOfMusic2023]: "daysOfMusic2023",
	[SpiritName.MomentsGuide]: "momentsGuide",
	[SpiritName.ReassuringRanger]: "reassuringRanger",
	[SpiritName.NightbirdWhisperer]: "nightbirdWhisperer",
	[SpiritName.JollyGeologist]: "jollyGeologist",
	[SpiritName.AsceticMonk]: "asceticMonk",
	[EventNameUnique.SkyAnniversary2023]: "skyAnniversary2023",
	[EventNameUnique.AURORAEncoreConcerts2023]: "auroraEncoreConcerts2023",
	[EventNameUnique.DaysOfSunlight2023]: "daysOfSunlight2023",
	[EventNameUnique.DaysOfStyle2023]: "daysOfStyle2023",
	[SpiritName.HopefulSteward]: "hopefulSteward",
	[SpiritName.VestigeOfADesertedOasis]: "vestigeOfADesertedOasis",
	[SpiritName.MemoryOfALostVillage]: "memoryOfALostVillage",
	[SpiritName.EchoOfAnAbandonedRefuge]: "echoOfAnAbandonedRefuge",
	[SpiritName.RemnantOfAForgottenHaven]: "remnantOfAForgottenHaven",
	[EventNameUnique.DaysOfMischief2023]: "daysOfMischief2023",
	[EventNameUnique.DaysOfGiving2023]: "daysOfGiving2023",
	[EventNameUnique.AviarysFireworkFestival2023]: "aviarysFireworkFestival2023",
	[EventNameUnique.DaysOfFeast2023]: "daysOfFeast2023",
	[SpiritName.SpiritOfMural]: "spiritOfMural",
	[SpiritName.HerbGatherer]: "herbGatherer",
	[SpiritName.Hunter]: "hunter",
	[SpiritName.FeudalLord]: "feudalLord",
	[SpiritName.Princess]: "princess",
	[EventNameUnique.DaysOfFortune2024]: "daysOfFortune2024",
	[EventNameUnique.DaysOfLove2024]: "daysOfLove2024",
	[EventNameUnique.SpringCamping2024]: "springCamping2024",
	[EventNameUnique.DaysOfBloom2024]: "daysOfBloom2024",
	[SpiritName.NestingGuide]: "nestingGuide",
	[SpiritName.NestingSolarium]: "nestingSolarium",
	[SpiritName.NestingLoft]: "nestingLoft",
	[SpiritName.NestingAtrium]: "nestingAtrium",
	[SpiritName.NestingNook]: "nestingNook",
	[EventNameUnique.SkyXCinnamorollPopUpCafe2024]: "skyXCinnamorollPopUpCafe2024",
	[EventNameUnique.DaysOfNature2024]: "daysOfNature2024",
} as const satisfies Readonly<Record<SpiritName | EventNameUnique, Exclude<keyof CatalogueData, "user_id">>>;

export const CATALOGUE_VIEW_START_CUSTOM_ID = "CATALOGUE_VIEW_START_CUSTOM_ID" as const;
export const CATALOGUE_BACK_TO_START_CUSTOM_ID = "CATALOGUE_BACK_TO_START_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_TYPE_CUSTOM_ID = "CATALOGUE_VIEW_TYPE_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_REALMS_CUSTOM_ID = "CATALOGUE_VIEW_REALMS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_ELDERS_CUSTOM_ID = "CATALOGUE_VIEW_ELDERS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SEASONS_CUSTOM_ID = "CATALOGUE_VIEW_SEASONS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_REALM_CUSTOM_ID = "CATALOGUE_VIEW_REALM_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SEASON_CUSTOM_ID = "CATALOGUE_VIEW_SEASON_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID = "CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SPIRIT_CUSTOM_ID = "CATALOGUE_VIEW_SPIRIT_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_1_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_1_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_2_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_2_CUSTOM_ID" as const;
const CATALOGUE_SHARE_REALMS_KEY = "realms" as const;
const CATALOGUE_SHARE_ELDER_KEY = "elders" as const;
export const CATALOGUE_SHARE_PROMPT_CUSTOM_ID = "CATALOGUE_SHARE_PROMPT_CUSTOM_ID" as const;
export const CATALOGUE_SHARE_SEND_CUSTOM_ID = "CATALOGUE_SHARE_SEND_CUSTOM_ID" as const;
export const CATALOGUE_REALM_EVERYTHING_CUSTOM_ID = "CATALOGUE_REALM_EVERYTHING_CUSTOM_ID" as const;
export const CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID = "CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID" as const;
export const CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID = "CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID" as const;
export const CATALOGUE_SPIRIT_EVERYTHING_CUSTOM_ID = "CATALOGUE_SPIRIT_EVERYTHING_CUSTOM_ID" as const;
const CATALOGUE_MAXIMUM_OPTIONS_LIMIT = 25 as const;
const CATALOGUE_STANDARD_PERCENTAGE_NOTE = "Averages are calculated even beyond the second wing buff." as const;

function backToStartButton(disabled = false) {
	return (
		new ButtonBuilder()
			// This custom id must differ to avoid duplicate custom ids.
			.setCustomId(CATALOGUE_BACK_TO_START_CUSTOM_ID)
			.setDisabled(disabled)
			.setEmoji("⏮️")
			.setLabel("Start")
			.setStyle(ButtonStyle.Primary)
	);
}

export class Catalogue {
	public readonly userId: CatalogueData["userId"];

	public pointingCandlemaker!: CatalogueData["pointingCandlemaker"];

	public usheringStargazer!: CatalogueData["usheringStargazer"];

	public rejectingVoyager!: CatalogueData["rejectingVoyager"];

	public butterflyCharmer!: CatalogueData["butterflyCharmer"];

	public applaudingBellmaker!: CatalogueData["applaudingBellmaker"];

	public wavingBellmaker!: CatalogueData["wavingBellmaker"];

	public slumberingShipwright!: CatalogueData["slumberingShipwright"];

	public laughingLightCatcher!: CatalogueData["laughingLightCatcher"];

	public birdWhisperer!: CatalogueData["birdWhisperer"];

	public exhaustedDockWorker!: CatalogueData["exhaustedDockWorker"];

	public ceremonialWorshiper!: CatalogueData["ceremonialWorshiper"];

	public shiveringTrailblazer!: CatalogueData["shiveringTrailblazer"];

	public blushingProspector!: CatalogueData["blushingProspector"];

	public hideNSeekPioneer!: CatalogueData["hideNSeekPioneer"];

	public poutyPorter!: CatalogueData["poutyPorter"];

	public dismayedHunter!: CatalogueData["dismayedHunter"];

	public apologeticLumberjack!: CatalogueData["apologeticLumberjack"];

	public tearfulLightMiner!: CatalogueData["tearfulLightMiner"];

	public whaleWhisperer!: CatalogueData["whaleWhisperer"];

	public confidentSightseer!: CatalogueData["confidentSightseer"];

	public handstandingThrillseeker!: CatalogueData["handstandingThrillseeker"];

	public mantaWhisperer!: CatalogueData["mantaWhisperer"];

	public backflippingChampion!: CatalogueData["backflippingChampion"];

	public cheerfulSpectator!: CatalogueData["cheerfulSpectator"];

	public bowingMedalist!: CatalogueData["bowingMedalist"];

	public proudVictor!: CatalogueData["proudVictor"];

	public frightenedRefugee!: CatalogueData["frightenedRefugee"];

	public faintingWarrior!: CatalogueData["faintingWarrior"];

	public courageousSoldier!: CatalogueData["courageousSoldier"];

	public stealthySurvivor!: CatalogueData["stealthySurvivor"];

	public salutingCaptain!: CatalogueData["salutingCaptain"];

	public lookoutScout!: CatalogueData["lookoutScout"];

	public prayingAcolyte!: CatalogueData["prayingAcolyte"];

	public levitatingAdept!: CatalogueData["levitatingAdept"];

	public politeScholar!: CatalogueData["politeScholar"];

	public memoryWhisperer!: CatalogueData["memoryWhisperer"];

	public meditatingMonastic!: CatalogueData["meditatingMonastic"];

	public elderOfTheIsle!: CatalogueData["elderOfTheIsle"];

	public elderOfThePrairie!: CatalogueData["elderOfThePrairie"];

	public elderOfTheForest!: CatalogueData["elderOfTheForest"];

	public elderOfTheValley!: CatalogueData["elderOfTheValley"];

	public elderOfTheWasteland!: CatalogueData["elderOfTheWasteland"];

	public elderOfTheVault!: CatalogueData["elderOfTheVault"];

	public gratitudeGuide!: CatalogueData["gratitudeGuide"];

	public sassyDrifter!: CatalogueData["sassyDrifter"];

	public stretchingGuru!: CatalogueData["stretchingGuru"];

	public provokingPerformer!: CatalogueData["provokingPerformer"];

	public leapingDancer!: CatalogueData["leapingDancer"];

	public salutingProtector!: CatalogueData["salutingProtector"];

	public greetingShaman!: CatalogueData["greetingShaman"];

	public lightseekerGuide!: CatalogueData["lightseekerGuide"];

	public piggybackLightseeker!: CatalogueData["piggybackLightseeker"];

	public doublefiveLightCatcher!: CatalogueData["doublefiveLightCatcher"];

	public laidbackPioneer!: CatalogueData["laidbackPioneer"];

	public twirlingChampion!: CatalogueData["twirlingChampion"];

	public crabWhisperer!: CatalogueData["crabWhisperer"];

	public shushingLightScholar!: CatalogueData["shushingLightScholar"];

	public halloweenOfficeEvent2019!: CatalogueData["halloweenOfficeEvent2019"];

	public belongingGuide!: CatalogueData["belongingGuide"];

	public boogieKid!: CatalogueData["boogieKid"];

	public confettiCousin!: CatalogueData["confettiCousin"];

	public hairtousleTeen!: CatalogueData["hairtousleTeen"];

	public sparklerParent!: CatalogueData["sparklerParent"];

	public pleafulParent!: CatalogueData["pleafulParent"];

	public wiseGrandparent!: CatalogueData["wiseGrandparent"];

	public daysOfGiving2019!: CatalogueData["daysOfGiving2019"];

	public daysOfFeast2019!: CatalogueData["daysOfFeast2019"];

	public rhythmGuide!: CatalogueData["rhythmGuide"];

	public troupeGreeter!: CatalogueData["troupeGreeter"];

	public festivalSpinDancer!: CatalogueData["festivalSpinDancer"];

	public admiringActor!: CatalogueData["admiringActor"];

	public troupeJuggler!: CatalogueData["troupeJuggler"];

	public respectfulPianist!: CatalogueData["respectfulPianist"];

	public thoughtfulDirector!: CatalogueData["thoughtfulDirector"];

	public lunarNewYear2020!: CatalogueData["lunarNewYear2020"];

	public daysOfLove2020!: CatalogueData["daysOfLove2020"];

	public daysOfSpring2020!: CatalogueData["daysOfSpring2020"];

	public enchantmentGuide!: CatalogueData["enchantmentGuide"];

	public noddingMuralist!: CatalogueData["noddingMuralist"];

	public indifferentAlchemist!: CatalogueData["indifferentAlchemist"];

	public crabWalker!: CatalogueData["crabWalker"];

	public scarecrowFarmer!: CatalogueData["scarecrowFarmer"];

	public snoozingCarpenter!: CatalogueData["snoozingCarpenter"];

	public playfightingHerbalist!: CatalogueData["playfightingHerbalist"];

	public daysOfNature2020!: CatalogueData["daysOfNature2020"];

	public daysOfHealing2020!: CatalogueData["daysOfHealing2020"];

	public daysOfRainbow2020!: CatalogueData["daysOfRainbow2020"];

	public sanctuaryGuide!: CatalogueData["sanctuaryGuide"];

	public jellyWhisperer!: CatalogueData["jellyWhisperer"];

	public timidBookworm!: CatalogueData["timidBookworm"];

	public rallyingThrillseeker!: CatalogueData["rallyingThrillseeker"];

	public hikingGrouch!: CatalogueData["hikingGrouch"];

	public gratefulShellCollector!: CatalogueData["gratefulShellCollector"];

	public chillSunbather!: CatalogueData["chillSunbather"];

	public skyAnniversary2020!: CatalogueData["skyAnniversary2020"];

	public daysOfSummerLights2020!: CatalogueData["daysOfSummerLights2020"];

	public prophecyGuide!: CatalogueData["prophecyGuide"];

	public prophetOfWater!: CatalogueData["prophetOfWater"];

	public prophetOfEarth!: CatalogueData["prophetOfEarth"];

	public prophetOfAir!: CatalogueData["prophetOfAir"];

	public prophetOfFire!: CatalogueData["prophetOfFire"];

	public daysOfMischief2020!: CatalogueData["daysOfMischief2020"];

	public daysOfGiving2020!: CatalogueData["daysOfGiving2020"];

	public daysOfFeast2020!: CatalogueData["daysOfFeast2020"];

	public dreamsGuide!: CatalogueData["dreamsGuide"];

	public spinningMentor!: CatalogueData["spinningMentor"];

	public dancingPerformer!: CatalogueData["dancingPerformer"];

	public peekingPostman!: CatalogueData["peekingPostman"];

	public bearhugHermit!: CatalogueData["bearhugHermit"];

	public daysOfFortune2021!: CatalogueData["daysOfFortune2021"];

	public daysOfLove2021!: CatalogueData["daysOfLove2021"];

	public daysOfBloom2021!: CatalogueData["daysOfBloom2021"];

	public assemblyGuide!: CatalogueData["assemblyGuide"];

	public baffledBotanist!: CatalogueData["baffledBotanist"];

	public scoldingStudent!: CatalogueData["scoldingStudent"];

	public scaredyCadet!: CatalogueData["scaredyCadet"];

	public marchingAdventurer!: CatalogueData["marchingAdventurer"];

	public chucklingScout!: CatalogueData["chucklingScout"];

	public daydreamForester!: CatalogueData["daydreamForester"];

	public daysOfNature2021!: CatalogueData["daysOfNature2021"];

	public childrensDay2021!: CatalogueData["childrensDay2021"];

	public daysOfRainbow2021!: CatalogueData["daysOfRainbow2021"];

	public theRose!: CatalogueData["theRose"];

	public beckoningRuler!: CatalogueData["beckoningRuler"];

	public gloatingNarcissist!: CatalogueData["gloatingNarcissist"];

	public stretchingLamplighter!: CatalogueData["stretchingLamplighter"];

	public slouchingSoldier!: CatalogueData["slouchingSoldier"];

	public sneezingGeographer!: CatalogueData["sneezingGeographer"];

	public starCollector!: CatalogueData["starCollector"];

	public skyAnniversary2021!: CatalogueData["skyAnniversary2021"];

	public daysOfSummer2021!: CatalogueData["daysOfSummer2021"];

	public daysOfSummerLights2021!: CatalogueData["daysOfSummerLights2021"];

	public flightGuide!: CatalogueData["flightGuide"];

	public livelyNavigator!: CatalogueData["livelyNavigator"];

	public lightWhisperer!: CatalogueData["lightWhisperer"];

	public tinkeringChimesmith!: CatalogueData["tinkeringChimesmith"];

	public talentedBuilder!: CatalogueData["talentedBuilder"];

	public daysOfMischief2021!: CatalogueData["daysOfMischief2021"];

	public daysOfGiving2021!: CatalogueData["daysOfGiving2021"];

	public daysOfFeast2021!: CatalogueData["daysOfFeast2021"];

	public abyssGuide!: CatalogueData["abyssGuide"];

	public anxiousAngler!: CatalogueData["anxiousAngler"];

	public ceasingCommodore!: CatalogueData["ceasingCommodore"];

	public bumblingBoatswain!: CatalogueData["bumblingBoatswain"];

	public cacklingCannoneer!: CatalogueData["cacklingCannoneer"];

	public daysOfFortune2022!: CatalogueData["daysOfFortune2022"];

	public daysOfLove2022!: CatalogueData["daysOfLove2022"];

	public kizunaAI2022!: CatalogueData["kizunaAI2022"];

	public daysOfBloom2022!: CatalogueData["daysOfBloom2022"];

	public performanceGuide!: CatalogueData["performanceGuide"];

	public franticStagehand!: CatalogueData["franticStagehand"];

	public forgetfulStoryteller!: CatalogueData["forgetfulStoryteller"];

	public mellowMusician!: CatalogueData["mellowMusician"];

	public modestDancer!: CatalogueData["modestDancer"];

	public daysOfNature2022!: CatalogueData["daysOfNature2022"];

	public harmonyHallGrandOpening2022!: CatalogueData["harmonyHallGrandOpening2022"];

	public daysOfRainbow2022!: CatalogueData["daysOfRainbow2022"];

	public theVoidOfShattering!: CatalogueData["theVoidOfShattering"];

	public ancientLight1!: CatalogueData["ancientLight1"];

	public ancientLight2!: CatalogueData["ancientLight2"];

	public ancientDarkness1!: CatalogueData["ancientDarkness1"];

	public ancientDarkness2!: CatalogueData["ancientDarkness2"];

	public skyAnniversary2022!: CatalogueData["skyAnniversary2022"];

	public daysOfSunlight2022!: CatalogueData["daysOfSunlight2022"];

	public lazyDays2022!: CatalogueData["lazyDays2022"];

	public aurora!: CatalogueData["aurora"];

	public runningWayfarer!: CatalogueData["runningWayfarer"];

	public mindfulMiner!: CatalogueData["mindfulMiner"];

	public warriorOfLove!: CatalogueData["warriorOfLove"];

	public seedOfHope!: CatalogueData["seedOfHope"];

	public daysOfMischief2022!: CatalogueData["daysOfMischief2022"];

	public daysOfGiving2022!: CatalogueData["daysOfGiving2022"];

	public daysOfFeast2022!: CatalogueData["daysOfFeast2022"];

	public remembranceGuide!: CatalogueData["remembranceGuide"];

	public bereftVeteran!: CatalogueData["bereftVeteran"];

	public pleadingChild!: CatalogueData["pleadingChild"];

	public tiptoeingTeaBrewer!: CatalogueData["tiptoeingTeaBrewer"];

	public woundedWarrior!: CatalogueData["woundedWarrior"];

	public daysOfFortune2023!: CatalogueData["daysOfFortune2023"];

	public daysOfLove2023!: CatalogueData["daysOfLove2023"];

	public daysOfBloom2023!: CatalogueData["daysOfBloom2023"];

	public passageGuide!: CatalogueData["passageGuide"];

	public oddballOutcast!: CatalogueData["oddballOutcast"];

	public tumblingTroublemaker!: CatalogueData["tumblingTroublemaker"];

	public melancholyMope!: CatalogueData["melancholyMope"];

	public overactiveOverachiever!: CatalogueData["overactiveOverachiever"];

	public daysOfNature2023!: CatalogueData["daysOfNature2023"];

	public daysOfColour2023!: CatalogueData["daysOfColour2023"];

	public daysOfMusic2023!: CatalogueData["daysOfMusic2023"];

	public momentsGuide!: CatalogueData["momentsGuide"];

	public reassuringRanger!: CatalogueData["reassuringRanger"];

	public nightbirdWhisperer!: CatalogueData["nightbirdWhisperer"];

	public jollyGeologist!: CatalogueData["jollyGeologist"];

	public asceticMonk!: CatalogueData["asceticMonk"];

	public skyAnniversary2023!: CatalogueData["skyAnniversary2023"];

	public auroraEncoreConcerts2023!: CatalogueData["auroraEncoreConcerts2023"];

	public daysOfSunlight2023!: CatalogueData["daysOfSunlight2023"];

	public daysOfStyle2023!: CatalogueData["daysOfStyle2023"];

	public hopefulSteward!: CatalogueData["hopefulSteward"];

	public vestigeOfADesertedOasis!: CatalogueData["vestigeOfADesertedOasis"];

	public memoryOfALostVillage!: CatalogueData["memoryOfALostVillage"];

	public echoOfAnAbandonedRefuge!: CatalogueData["echoOfAnAbandonedRefuge"];

	public remnantOfAForgottenHaven!: CatalogueData["remnantOfAForgottenHaven"];

	public daysOfMischief2023!: CatalogueData["daysOfMischief2023"];

	public daysOfGiving2023!: CatalogueData["daysOfGiving2023"];

	public aviarysFireworkFestival2023!: CatalogueData["aviarysFireworkFestival2023"];

	public daysOfFeast2023!: CatalogueData["daysOfFeast2023"];

	public spiritOfMural!: CatalogueData["spiritOfMural"];

	public herbGatherer!: CatalogueData["herbGatherer"];

	public hunter!: CatalogueData["hunter"];

	public feudalLord!: CatalogueData["feudalLord"];

	public princess!: CatalogueData["princess"];

	public daysOfFortune2024!: CatalogueData["daysOfFortune2024"];

	public daysOfLove2024!: CatalogueData["daysOfLove2024"];

	public springCamping2024!: CatalogueData["springCamping2024"];

	public daysOfBloom2024!: CatalogueData["daysOfBloom2024"];

	public nestingGuide!: CatalogueData["nestingGuide"];

	public nestingSolarium!: CatalogueData["nestingSolarium"];

	public nestingLoft!: CatalogueData["nestingLoft"];

	public nestingAtrium!: CatalogueData["nestingAtrium"];

	public nestingNook!: CatalogueData["nestingNook"];

	public skyXCinnamorollPopUpCafe2024!: CatalogueData["skyXCinnamorollPopUpCafe2024"];

	public daysOfNature2024!: CatalogueData["daysOfNature2024"];

	public constructor(catalogue: CataloguePacket) {
		this.userId = catalogue.user_id;
		this.patch(catalogue);
	}

	private patch(data: CataloguePatchData) {
		this.pointingCandlemaker = data.pointing_candlemaker;
		this.usheringStargazer = data.ushering_stargazer;
		this.rejectingVoyager = data.rejecting_voyager;
		this.butterflyCharmer = data.butterfly_charmer;
		this.applaudingBellmaker = data.applauding_bellmaker;
		this.wavingBellmaker = data.waving_bellmaker;
		this.slumberingShipwright = data.slumbering_shipwright;
		this.laughingLightCatcher = data.laughing_light_catcher;
		this.birdWhisperer = data.bird_whisperer;
		this.exhaustedDockWorker = data.exhausted_dock_worker;
		this.ceremonialWorshiper = data.ceremonial_worshiper;
		this.shiveringTrailblazer = data.shivering_trailblazer;
		this.blushingProspector = data.blushing_prospector;
		this.hideNSeekPioneer = data.hide_n_seek_pioneer;
		this.poutyPorter = data.pouty_porter;
		this.dismayedHunter = data.dismayed_hunter;
		this.apologeticLumberjack = data.apologetic_lumberjack;
		this.tearfulLightMiner = data.tearful_light_miner;
		this.whaleWhisperer = data.whale_whisperer;
		this.confidentSightseer = data.confident_sightseer;
		this.handstandingThrillseeker = data.handstanding_thrillseeker;
		this.mantaWhisperer = data.manta_whisperer;
		this.backflippingChampion = data.backflipping_champion;
		this.cheerfulSpectator = data.cheerful_spectator;
		this.bowingMedalist = data.bowing_medalist;
		this.proudVictor = data.proud_victor;
		this.frightenedRefugee = data.frightened_refugee;
		this.faintingWarrior = data.fainting_warrior;
		this.courageousSoldier = data.courageous_soldier;
		this.stealthySurvivor = data.stealthy_survivor;
		this.salutingCaptain = data.saluting_captain;
		this.lookoutScout = data.lookout_scout;
		this.prayingAcolyte = data.praying_acolyte;
		this.levitatingAdept = data.levitating_adept;
		this.politeScholar = data.polite_scholar;
		this.memoryWhisperer = data.memory_whisperer;
		this.meditatingMonastic = data.meditating_monastic;
		this.elderOfTheIsle = data.elder_of_the_isle;
		this.elderOfThePrairie = data.elder_of_the_prairie;
		this.elderOfTheForest = data.elder_of_the_forest;
		this.elderOfTheValley = data.elder_of_the_valley;
		this.elderOfTheWasteland = data.elder_of_the_wasteland;
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
		this.halloweenOfficeEvent2019 = data.halloween_office_event_2019;
		this.belongingGuide = data.belonging_guide;
		this.boogieKid = data.boogie_kid;
		this.confettiCousin = data.confetti_cousin;
		this.hairtousleTeen = data.hairtousle_teen;
		this.sparklerParent = data.sparkler_parent;
		this.pleafulParent = data.pleaful_parent;
		this.wiseGrandparent = data.wise_grandparent;
		this.daysOfGiving2019 = data.days_of_giving_2019;
		this.daysOfFeast2019 = data.days_of_feast_2019;
		this.rhythmGuide = data.rhythm_guide;
		this.troupeGreeter = data.troupe_greeter;
		this.festivalSpinDancer = data.festival_spin_dancer;
		this.admiringActor = data.admiring_actor;
		this.troupeJuggler = data.troupe_juggler;
		this.respectfulPianist = data.respectful_pianist;
		this.thoughtfulDirector = data.thoughtful_director;
		this.lunarNewYear2020 = data.lunar_new_year_2020;
		this.daysOfLove2020 = data.days_of_love_2020;
		this.daysOfSpring2020 = data.days_of_spring_2020;
		this.enchantmentGuide = data.enchantment_guide;
		this.noddingMuralist = data.nodding_muralist;
		this.indifferentAlchemist = data.indifferent_alchemist;
		this.crabWalker = data.crab_walker;
		this.scarecrowFarmer = data.scarecrow_farmer;
		this.snoozingCarpenter = data.snoozing_carpenter;
		this.playfightingHerbalist = data.playfighting_herbalist;
		this.daysOfNature2020 = data.days_of_nature_2020;
		this.daysOfHealing2020 = data.days_of_healing_2020;
		this.daysOfRainbow2020 = data.days_of_rainbow_2020;
		this.sanctuaryGuide = data.sanctuary_guide;
		this.jellyWhisperer = data.jelly_whisperer;
		this.timidBookworm = data.timid_bookworm;
		this.rallyingThrillseeker = data.rallying_thrillseeker;
		this.hikingGrouch = data.hiking_grouch;
		this.gratefulShellCollector = data.grateful_shell_collector;
		this.chillSunbather = data.chill_sunbather;
		this.skyAnniversary2020 = data.sky_anniversary_2020;
		this.daysOfSummerLights2020 = data.days_of_summer_lights_2020;
		this.prophecyGuide = data.prophecy_guide;
		this.prophetOfWater = data.prophet_of_water;
		this.prophetOfEarth = data.prophet_of_earth;
		this.prophetOfAir = data.prophet_of_air;
		this.prophetOfFire = data.prophet_of_fire;
		this.daysOfMischief2020 = data.days_of_mischief_2020;
		this.daysOfGiving2020 = data.days_of_giving_2020;
		this.daysOfFeast2020 = data.days_of_feast_2020;
		this.dreamsGuide = data.dreams_guide;
		this.spinningMentor = data.spinning_mentor;
		this.dancingPerformer = data.dancing_performer;
		this.peekingPostman = data.peeking_postman;
		this.bearhugHermit = data.bearhug_hermit;
		this.daysOfFortune2021 = data.days_of_fortune_2021;
		this.daysOfLove2021 = data.days_of_love_2021;
		this.daysOfBloom2021 = data.days_of_bloom_2021;
		this.assemblyGuide = data.assembly_guide;
		this.baffledBotanist = data.baffled_botanist;
		this.scoldingStudent = data.scolding_student;
		this.scaredyCadet = data.scaredy_cadet;
		this.marchingAdventurer = data.marching_adventurer;
		this.chucklingScout = data.chuckling_scout;
		this.daydreamForester = data.daydream_forester;
		this.daysOfNature2021 = data.days_of_nature_2021;
		this.childrensDay2021 = data.childrens_day_2021;
		this.daysOfRainbow2021 = data.days_of_rainbow_2021;
		this.theRose = data.the_rose;
		this.beckoningRuler = data.beckoning_ruler;
		this.gloatingNarcissist = data.gloating_narcissist;
		this.stretchingLamplighter = data.stretching_lamplighter;
		this.slouchingSoldier = data.slouching_soldier;
		this.sneezingGeographer = data.sneezing_geographer;
		this.starCollector = data.star_collector;
		this.skyAnniversary2021 = data.sky_anniversary_2021;
		this.daysOfSummer2021 = data.days_of_summer_2021;
		this.daysOfSummerLights2021 = data.days_of_summer_lights_2021;
		this.flightGuide = data.flight_guide;
		this.livelyNavigator = data.lively_navigator;
		this.lightWhisperer = data.light_whisperer;
		this.tinkeringChimesmith = data.tinkering_chimesmith;
		this.talentedBuilder = data.talented_builder;
		this.daysOfMischief2021 = data.days_of_mischief_2021;
		this.daysOfGiving2021 = data.days_of_giving_2021;
		this.daysOfFeast2021 = data.days_of_feast_2021;
		this.abyssGuide = data.abyss_guide;
		this.anxiousAngler = data.anxious_angler;
		this.ceasingCommodore = data.ceasing_commodore;
		this.bumblingBoatswain = data.bumbling_boatswain;
		this.cacklingCannoneer = data.cackling_cannoneer;
		this.daysOfFortune2022 = data.days_of_fortune_2022;
		this.daysOfLove2022 = data.days_of_love_2022;
		this.kizunaAI2022 = data.kizuna_ai_2022;
		this.daysOfBloom2022 = data.days_of_bloom_2022;
		this.performanceGuide = data.performance_guide;
		this.franticStagehand = data.frantic_stagehand;
		this.forgetfulStoryteller = data.forgetful_storyteller;
		this.mellowMusician = data.mellow_musician;
		this.modestDancer = data.modest_dancer;
		this.daysOfNature2022 = data.days_of_nature_2022;
		this.harmonyHallGrandOpening2022 = data.harmony_hall_grand_opening_2022;
		this.daysOfRainbow2022 = data.days_of_rainbow_2022;
		this.theVoidOfShattering = data.the_void_of_shattering;
		this.ancientLight1 = data.ancient_light1;
		this.ancientLight2 = data.ancient_light2;
		this.ancientDarkness1 = data.ancient_darkness1;
		this.ancientDarkness2 = data.ancient_darkness2;
		this.skyAnniversary2022 = data.sky_anniversary_2022;
		this.daysOfSunlight2022 = data.days_of_sunlight_2022;
		this.lazyDays2022 = data.lazy_days_2022;
		this.aurora = data.aurora;
		this.runningWayfarer = data.running_wayfarer;
		this.mindfulMiner = data.mindful_miner;
		this.warriorOfLove = data.warrior_of_love;
		this.seedOfHope = data.seed_of_hope;
		this.daysOfMischief2022 = data.days_of_mischief_2022;
		this.daysOfGiving2022 = data.days_of_giving_2022;
		this.daysOfFeast2022 = data.days_of_feast_2022;
		this.remembranceGuide = data.remembrance_guide;
		this.bereftVeteran = data.bereft_veteran;
		this.pleadingChild = data.pleading_child;
		this.tiptoeingTeaBrewer = data.tiptoeing_tea_brewer;
		this.woundedWarrior = data.wounded_warrior;
		this.daysOfFortune2023 = data.days_of_fortune_2023;
		this.daysOfLove2023 = data.days_of_love_2023;
		this.daysOfBloom2023 = data.days_of_bloom_2023;
		this.passageGuide = data.passage_guide;
		this.oddballOutcast = data.oddball_outcast;
		this.tumblingTroublemaker = data.tumbling_troublemaker;
		this.melancholyMope = data.melancholy_mope;
		this.overactiveOverachiever = data.overactive_overachiever;
		this.daysOfNature2023 = data.days_of_nature_2023;
		this.daysOfColour2023 = data.days_of_colour_2023;
		this.daysOfMusic2023 = data.days_of_music_2023;
		this.momentsGuide = data.moments_guide;
		this.reassuringRanger = data.reassuring_ranger;
		this.nightbirdWhisperer = data.nightbird_whisperer;
		this.jollyGeologist = data.jolly_geologist;
		this.asceticMonk = data.ascetic_monk;
		this.skyAnniversary2023 = data.sky_anniversary_2023;
		this.auroraEncoreConcerts2023 = data.aurora_encore_concerts_2023;
		this.daysOfSunlight2023 = data.days_of_sunlight_2023;
		this.daysOfStyle2023 = data.days_of_style_2023;
		this.hopefulSteward = data.hopeful_steward;
		this.vestigeOfADesertedOasis = data.vestige_of_a_deserted_oasis;
		this.memoryOfALostVillage = data.memory_of_a_lost_village;
		this.echoOfAnAbandonedRefuge = data.echo_of_an_abandoned_refuge;
		this.remnantOfAForgottenHaven = data.remnant_of_a_forgotten_haven;
		this.daysOfMischief2023 = data.days_of_mischief_2023;
		this.daysOfGiving2023 = data.days_of_giving_2023;
		this.aviarysFireworkFestival2023 = data.aviarys_firework_festival_2023;
		this.daysOfFeast2023 = data.days_of_feast_2023;
		this.spiritOfMural = data.spirit_of_mural;
		this.herbGatherer = data.herb_gatherer;
		this.hunter = data.hunter;
		this.feudalLord = data.feudal_lord;
		this.princess = data.princess;
		this.daysOfFortune2024 = data.days_of_fortune_2024;
		this.daysOfLove2024 = data.days_of_love_2024;
		this.springCamping2024 = data.spring_camping_2024;
		this.daysOfBloom2024 = data.days_of_bloom_2024;
		this.nestingGuide = data.nesting_guide;
		this.nestingSolarium = data.nesting_solarium;
		this.nestingLoft = data.nesting_loft;
		this.nestingAtrium = data.nesting_atrium;
		this.nestingNook = data.nesting_nook;
		this.skyXCinnamorollPopUpCafe2024 = data.sky_x_cinnamoroll_pop_up_cafe_2024;
		this.daysOfNature2024 = data.days_of_nature_2024;
	}

	public static async fetch(userId: Snowflake) {
		const [cataloguePacket] = await pg<CataloguePacket>(Table.Catalogue).where("user_id", userId);
		if (!cataloguePacket) throw new Error("No catalogue data found.");
		return new this(cataloguePacket);
	}

	private ownedProgress(spiritOrEvent: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit | Event) {
		const isEvent = spiritOrEvent instanceof Event;

		const resolvedOffer = isEvent
			? spiritOrEvent.offer
			: spiritOrEvent.isStandardSpirit() || spiritOrEvent.isElderSpirit() || spiritOrEvent.isGuideSpirit()
			? spiritOrEvent.current
			: spiritOrEvent.current ?? spiritOrEvent.seasonal;

		const bit = this[SpiritEventNameToCatalogueName[isEvent ? spiritOrEvent.nameUnique : spiritOrEvent.name]];

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

	public progress(
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
		const existingCatalogue = await this.fetch(interaction.user.id).catch(() => null);
		let catalogue;

		if (existingCatalogue) {
			catalogue = existingCatalogue;
		} else {
			catalogue = new this(
				(await pg<CataloguePacket>(Table.Catalogue).insert({ user_id: interaction.user.id }, "*"))[0]!,
			);
		}

		const standardProgress = catalogue.progress(STANDARD_SPIRITS, true);
		const elderProgress = catalogue.progress(ELDER_SPIRITS, true);
		const seasonalProgress = catalogue.progress(SEASON_SPIRITS, true);
		const eventProgress = catalogue.progress(CURRENT_EVENTS, true);
		const today = todayDate();
		const currentSeason = resolveSeason(today);
		const currentEvents = resolveEvents(today);
		const currentTravellingSpirit = resolveTravellingSpirit(today);
		const currentReturningSpirits = resolveReturningSpirits(today);

		const currentSeasonButton = new ButtonBuilder()
			.setCustomId(
				currentSeason
					? `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${currentSeason.name}`
					: // This would not happen, but it's here to satisfy the API.
					  CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
			)
			.setDisabled(!currentSeason)
			.setLabel("Current Season")
			.setStyle(currentSeason ? ButtonStyle.Success : ButtonStyle.Secondary);

		if (currentSeason) {
			currentSeasonButton.setEmoji(currentSeason.emoji);
		}

		const currentEventButtons = currentEvents.reduce<ButtonBuilder[]>((buttons, event) => {
			const button = new ButtonBuilder()
				.setCustomId(`${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${event.nameUnique}`)
				.setStyle(ButtonStyle.Success);

			if (event.eventCurrencyEmoji) button.setEmoji(event.eventCurrencyEmoji);
			buttons.push(button);
			return buttons;
		}, []);

		if (currentEventButtons.length === 0) {
			currentEventButtons.push(
				new ButtonBuilder()
					// This would not happen, but it's here to satisfy the API.
					.setCustomId(CATALOGUE_VIEW_EVENT_CUSTOM_ID)
					.setDisabled()
					.setLabel("Current Event")
					.setStyle(ButtonStyle.Secondary),
			);
		}

		if (currentEventButtons.length === 1) currentEventButtons[0]!.setLabel("Current Event");

		const currentTravellingSpiritButton = new ButtonBuilder()
			.setCustomId(
				currentTravellingSpirit
					? `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${currentTravellingSpirit.name}`
					: // This would not happen, but it's here to satisfy the API.
					  `${CATALOGUE_VIEW_START_CUSTOM_ID}-travelling`,
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
						.setCustomId(CATALOGUE_VIEW_TYPE_CUSTOM_ID)
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
								? CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID
								: // This would not happen, but it's here to satisfy the API.
								  `${CATALOGUE_VIEW_START_CUSTOM_ID}-returning`,
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
		const catalogue = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_REALM_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							REALMS.map(({ name }) => {
								const percentage = catalogue.progress(
									STANDARD_SPIRITS.filter((spirit) => spirit.realm === name),
									true,
								);

								return new StringSelectMenuOptionBuilder()
									.setLabel(
										`${t(`realms.${name}`, { lng: locale, ns: "general" })}${
											percentage === null ? "" : ` (${percentage}%)`
										}`,
									)
									.setValue(name);
							}),
						)
						.setPlaceholder("Select a realm!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_REALMS_KEY}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				catalogue.realmsEmbed(locale).setFooter({ text: CATALOGUE_STANDARD_PERCENTAGE_NOTE }).setTitle("Realms"),
			],
		});
	}

	public static async viewRealm(interaction: ButtonInteraction | StringSelectMenuInteraction, realm: RealmName) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);
		const spirits = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm);
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const percentage = catalogue.progress([spirit], true);
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
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_REALMS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${realm}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_REALM_EVERYTHING_CUSTOM_ID}§${realm}`)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [
				catalogue
					.spiritEmbed(spirits, locale)
					.setFooter({ text: CATALOGUE_STANDARD_PERCENTAGE_NOTE })
					.setTitle(t(`realms.${realm}`, { lng: locale, ns: "general" })),
			],
		} satisfies InteractionUpdateOptions;

		await interaction.update(response);
	}

	public static async viewElders(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);
		let hasEverything = true;

		const options = ELDER_SPIRITS.map((spirit) => {
			const percentage = catalogue.progress([spirit], true);
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
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an elder!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${CATALOGUE_SHARE_ELDER_KEY}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [catalogue.spiritEmbed(ELDER_SPIRITS, locale).setTitle("Elders")],
		});
	}

	public static async viewSeasons(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale, user } = interaction;
		const catalogue = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_SEASON_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							CURRENT_SEASONS.map((season) => {
								const percentage = catalogue.progress([season.guide, ...season.spirits], true);

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
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
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
		const season = CURRENT_SEASONS.find(({ name }) => name === seasonName);

		if (!season) {
			pino.error(interaction, "Failed to view a season.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const catalogue = await this.fetch(user.id);
		const spirits = [season.guide, ...season.spirits];
		let hasEverything = true;

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = catalogue.progress([spirit], true);
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
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
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
						.setCustomId(CATALOGUE_VIEW_SEASONS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SHARE_PROMPT_CUSTOM_ID}§${seasonName}`)
						.setEmoji("🔗")
						.setLabel("Share")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(`${CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID}§${seasonName}`)
						.setDisabled(hasEverything)
						.setEmoji("💯")
						.setLabel("I have everything!")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [
				catalogue
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
		const catalogue = await this.fetch(user.id);

		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							CURRENT_EVENTS_YEARS.map((year) => {
								const percentage = catalogue.progress(
									CURRENT_EVENTS.filter((event) => event.start.year === year),
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
						.setCustomId(CATALOGUE_VIEW_START_CUSTOM_ID)
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
		const catalogue = await this.fetch(user.id);
		const events = CURRENT_EVENTS.filter((event) => event.start.year === Number(year));

		const options = events.map((event) => {
			const { name, nameUnique } = event;
			const percentage = catalogue.progress([event], true);

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
						.setCustomId(CATALOGUE_VIEW_EVENT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select an event!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButton(),
					new ButtonBuilder()
						.setCustomId(CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID)
						.setEmoji("⏪")
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				// catalogue.spiritEmbed(spirits, locale).setTitle(
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
		const catalogue = await this.fetch(user.id);
		const spirits = resolveReturningSpirits(todayDate());

		if (!spirits) {
			await Catalogue.viewTracker(interaction);
			return;
		}

		const options = spirits.map((spirit) => {
			const { name } = spirit;
			const percentage = catalogue.progress([spirit], true);

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
						.setCustomId(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(options)
						.setPlaceholder("Select a spirit!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(backToStartButton()),
			],
			embeds: [catalogue.spiritEmbed(spirits, locale).setTitle("Returning Spirits")],
		};

		await interaction.update(response);
	}

	public static async parseViewSpirit(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const catalogue = await this.fetch(interaction.user.id);

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

		await catalogue.viewSpirit(interaction, spirit);
	}

	private async viewSpirit(
		interaction: ButtonInteraction | StringSelectMenuInteraction,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale } = interaction;
		const bit = this[SpiritEventNameToCatalogueName[spirit.name]];
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
						? CATALOGUE_VIEW_ELDERS_CUSTOM_ID
						: spirit.isStandardSpirit()
						? `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${spirit.realm}`
						: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${spirit.season}`,
				)
				.setEmoji(isSeasonalSpirit || isGuideSpirit ? SeasonNameToSeasonalEmoji[spirit.season] : "⏪")
				.setLabel("Back")
				.setStyle(ButtonStyle.Primary),
		);

		if (offer) {
			buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_SPIRIT_EVERYTHING_CUSTOM_ID}§${spirit.name}`)
					.setDisabled(this.progress([spirit]) === 100)
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

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(0, CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${spirit.name}`)
					.setMaxValues(itemSelectionOptionsMaximumLimit.length)
					.setMinValues(0)
					.setOptions(itemSelectionOptionsMaximumLimit)
					.setPlaceholder("Select what you have!"),
			);

			components.push(itemSelection);

			if (itemSelectionOptions.length > CATALOGUE_MAXIMUM_OPTIONS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

				components.push(
					new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(`${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§${spirit.name}`)
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
		const catalogue = await this.fetch(interaction.user.id);

		const eventName =
			interaction instanceof ButtonInteraction
				? interaction.customId.slice(interaction.customId.indexOf("§") + 1)
				: interaction.values[0];

		const event = CURRENT_EVENTS.find(({ nameUnique }) => nameUnique === eventName);

		if (!event) {
			await interaction.update(ERROR_RESPONSE);
			pino.error(interaction, "Could not parse an event for the catalogue.");
			return;
		}

		await catalogue.viewEvent(interaction, event);
	}

	private async viewEvent(interaction: ButtonInteraction | StringSelectMenuInteraction, event: Event) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale } = interaction;
		const bit = this[SpiritEventNameToCatalogueName[event.nameUnique]];
		const { name, nameUnique, start, eventCurrencyEmoji, offer, offerInfographicURL } = event;

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

		if (offer) {
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
		}

		if (offerInfographicURL) {
			embed.setImage(offerInfographicURL);
		} else {
			description.push(offer ? NO_EVENT_INFOGRAPHIC_YET : NO_EVENT_OFFER_TEXT);
		}

		if (description.length > 0) embed.setDescription(description.join("\n"));
		const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [];

		const buttons = new ActionRowBuilder<ButtonBuilder>().setComponents(
			backToStartButton(),
			new ButtonBuilder()
				.setCustomId(`${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${start.year}`)
				.setEmoji("⏪")
				.setLabel("Back")
				.setStyle(ButtonStyle.Primary),
		);

		if (offer) {
			buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(`${CATALOGUE_SPIRIT_EVERYTHING_CUSTOM_ID}§${nameUnique}`)
					.setDisabled(this.progress([event]) === 100)
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

			const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(0, CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

			const itemSelection = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${nameUnique}`)
					.setMaxValues(itemSelectionOptionsMaximumLimit.length)
					.setMinValues(0)
					.setOptions(itemSelectionOptionsMaximumLimit)
					.setPlaceholder("Select what you have!"),
			);

			components.push(itemSelection);

			if (itemSelectionOptions.length > CATALOGUE_MAXIMUM_OPTIONS_LIMIT) {
				const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

				components.push(
					new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(`${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§${nameUnique}`)
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

	public static async setRealm(interaction: ButtonInteraction) {
		const { customId, user } = interaction;
		const realm = customId.slice(customId.indexOf("§") + 1);

		if (!isRealm(realm)) {
			throw new Error("Unknown realm.");
		}

		await this.update(
			user.id,
			STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm).reduce<CatalogueSetData>((data, spirit) => {
				data[CatalogueNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await Catalogue.viewRealm(interaction, realm);
	}

	public static async setElders(interaction: ButtonInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;

		await this.update(
			interaction.user.id,
			ELDER_SPIRITS.reduce<CatalogueSetData>((data, spirit) => {
				data[CatalogueNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await Catalogue.viewElders(interaction);
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
			SEASON_SPIRITS.filter((spirit) => spirit.season === season).reduce<CatalogueSetData>((data, spirit) => {
				data[CatalogueNameToRawName[spirit.name]] = spirit.maxItemsBit;
				return data;
			}, {}),
		);

		await Catalogue.viewSeason(interaction, season);
	}

	public static async setItems(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const catalogue = await this.fetch(interaction.user.id);
		const { customId } = interaction;
		const resolvedName = customId.slice(customId.indexOf("§") + 1);

		const spiritOrEvent =
			SPIRITS.find(({ name }) => name === resolvedName) ??
			CURRENT_EVENTS.find(({ nameUnique }) => nameUnique === resolvedName);

		if (!spiritOrEvent) {
			pino.error(interaction, "Unknown spirit or event.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		const isEvent = spiritOrEvent instanceof Event;
		const name = isEvent ? spiritOrEvent.nameUnique : spiritOrEvent.name;
		let newBit;

		if (interaction instanceof ButtonInteraction) {
			newBit = spiritOrEvent.maxItemsBit;
		} else {
			// Get the select menu where this interaction came from.
			const { component } = interaction;

			// Calculate the total bit in this select menu.
			const selectMenuTotalBit = component.options.reduce((bit, { value }) => bit | Number(value), 0);

			// Clear this bit from the total bit.
			const modifiedTotal = (catalogue[SpiritEventNameToCatalogueName[name]] ?? 0) & ~selectMenuTotalBit;

			// Calculate the new bit.
			newBit = interaction.values.reduce((bit, value) => bit | Number(value), modifiedTotal);
		}

		const [cataloguePacket] = await this.update(interaction.user.id, {
			[CatalogueNameToRawName[name]]: newBit,
		});

		catalogue.patch(cataloguePacket!);

		await (isEvent
			? catalogue.viewEvent(interaction, spiritOrEvent)
			: catalogue.viewSpirit(interaction, spiritOrEvent));
	}

	private static async update(userId: Catalogue["userId"], data: CatalogueSetData) {
		return pg<CataloguePacket>(Table.Catalogue).update(data).where({ user_id: userId }).returning("*");
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
			const bit = this[SpiritEventNameToCatalogueName[spirit.name]];
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
			REALMS.map(({ name }) => {
				const remainingCurrency = this.summateCurrency(STANDARD_SPIRITS.filter((spirit) => spirit.realm === name));

				return `__${t(`realms.${name}`, { lng: locale, ns: "general" })}__\n${
					remainingCurrency.length > 0 ? remainingCurrency.join("") : formatEmoji(MISCELLANEOUS_EMOJIS.Yes)
				}`;
			}).join("\n\n"),
		);
	}

	public static async sharePrompt(interaction: ButtonInteraction) {
		const { channel, customId, locale, user } = interaction;

		if (!interaction.inGuild()) {
			await interaction.reply({
				content: "[You & I](https://youtu.be/_kqQDCxRCzM) are the only ones around here. Try sharing in a server!",
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

		const catalogue = await this.fetch(user.id);
		const type = customId.slice(customId.indexOf("§") + 1);
		const backButton = new ButtonBuilder().setLabel("Back").setStyle(ButtonStyle.Primary);
		let embed;

		if (type === CATALOGUE_SHARE_REALMS_KEY) {
			backButton.setCustomId(CATALOGUE_VIEW_REALMS_CUSTOM_ID);
			embed = catalogue.realmsEmbed(locale).setTitle("Realms Progress");
		} else if (isRealm(type)) {
			backButton.setCustomId(`${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${type}`);

			embed = catalogue
				.spiritEmbed(
					STANDARD_SPIRITS.filter((spirit) => spirit.realm === type),
					locale,
				)
				.setTitle(`${type} Progress`);
		} else if (isSeasonName(type)) {
			const emoji = SeasonNameToSeasonalEmoji[type];
			backButton.setCustomId(`${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${type}`).setEmoji(emoji);

			embed = catalogue
				.spiritEmbed(
					SEASON_SPIRITS.filter((spirit) => spirit.season === type),
					locale,
				)
				.setTitle(`${formatEmoji(emoji)} ${t(`seasons.${type}`, { lng: locale, ns: "general" })} Progress`);
		} else if (type === CATALOGUE_SHARE_ELDER_KEY) {
			backButton.setCustomId(CATALOGUE_VIEW_ELDERS_CUSTOM_ID);
			embed = catalogue.spiritEmbed(ELDER_SPIRITS, locale).setTitle("Elders Progress");
		}

		if (!embed) {
			pino.error(interaction, "Failed to parse spirits from a catalogue share prompt.");
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
						.setCustomId(CATALOGUE_SHARE_SEND_CUSTOM_ID)
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
					(component) => "custom_id" in component.data && component.data.custom_id === CATALOGUE_SHARE_SEND_CUSTOM_ID,
				)
				?.setDisabled();
		}

		await interaction.update({ components, content: "Progress shared!", embeds: [] });
	}

	private remainingCurrency(
		spiritOrEvent: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit | Event,
		includeSeasonalCurrency?: boolean,
	) {
		const isEvent = spiritOrEvent instanceof Event;
		let resolvedOffer;

		if (isEvent) {
			resolvedOffer = spiritOrEvent.offer;
		} else {
			const seasonalParsing = spiritOrEvent.isSeasonalSpirit() && !spiritOrEvent.current;
			resolvedOffer = seasonalParsing ? spiritOrEvent.seasonal : spiritOrEvent.current;
		}

		if (!resolvedOffer) return null;
		const bit = this[SpiritEventNameToCatalogueName[isEvent ? spiritOrEvent.nameUnique : spiritOrEvent.name]];

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
