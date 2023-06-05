import {
	type ChatInputCommandInteraction,
	type StringSelectMenuInteraction,
	type Snowflake,
	ActionRowBuilder,
	ButtonInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	type InteractionUpdateOptions,
} from "discord.js";
import { Season, Emoji } from "../../Utility/Constants.js";
import { isSeason, resolveEmoji, resolveSeasonsToEmoji } from "../../Utility/Utility.js";
import pg, { Table } from "../../pg.js";
import {
	type BaseSpirit,
	type SpiritType,
	SpiritName,
	SPIRIT_TYPE,
	resolveSpiritTypeToString,
	resolveOfferToCurrency,
	type SpiritCost,
} from "./Base.js";
import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";
import Spirits from "./index.js";

interface SpiritTrackerPacket {
	user_id: Snowflake;
	pointing_candlemaker: number | null;
	ushering_stargazer: number | null;
	rejecting_voyager: number | null;
	elder_of_the_isle: number | null;
	butterfly_charmer: number | null;
	applauding_bellmaker: number | null;
	waving_bellmaker: number | null;
	slumbering_shipwright: number | null;
	laughing_light_catcher: number | null;
	bird_whisperer: number | null;
	exhausted_dock_worker: number | null;
	ceremonial_worshipper: number | null;
	elder_of_the_prairie: number | null;
	shivering_trailblazer: number | null;
	blushing_prospector: number | null;
	hide_n_seek_pioneer: number | null;
	pouty_porter: number | null;
	dismayed_hunter: number | null;
	apologetic_lumberjack: number | null;
	tearful_light_miner: number | null;
	whale_whisperer: number | null;
	elder_of_the_forest: number | null;
	confident_sightseer: number | null;
	handstanding_thrillseeker: number | null;
	manta_whisperer: number | null;
	backflipping_champion: number | null;
	cheerful_spectator: number | null;
	bowing_medalist: number | null;
	proud_victor: number | null;
	elder_of_the_valley: number | null;
	frightened_refugee: number | null;
	fainting_warrior: number | null;
	courageous_soldier: number | null;
	stealthy_survivor: number | null;
	saluting_captain: number | null;
	lookout_scout: number | null;
	elder_of_the_wasteland: number | null;
	praying_acolyte: number | null;
	levitating_adept: number | null;
	polite_scholar: number | null;
	memory_whisperer: number | null;
	meditating_monastic: number | null;
	elder_of_the_vault: number | null;
	sassy_drifter: number | null;
	stretching_guru: number | null;
	provoking_performer: number | null;
	leaping_dancer: number | null;
	saluting_protector: number | null;
	greeting_shaman: number | null;
	piggyback_lightseeker: number | null;
	doublefive_light_catcher: number | null;
	laidback_pioneer: number | null;
	twirling_champion: number | null;
	crab_whisperer: number | null;
	shushing_light_scholar: number | null;
	boogie_kid: number | null;
	confetti_cousin: number | null;
	hairtousle_teen: number | null;
	sparkler_parent: number | null;
	pleaful_parent: number | null;
	wise_grandparent: number | null;
	troupe_greeter: number | null;
	festival_spin_dancer: number | null;
	admiring_actor: number | null;
	troupe_juggler: number | null;
	respectful_pianist: number | null;
	thoughtful_director: number | null;
	nodding_muralist: number | null;
	indifferent_alchemist: number | null;
	crab_walker: number | null;
	scarecrow_farmer: number | null;
	snoozing_carpenter: number | null;
	playfighting_herbalist: number | null;
	jelly_whisperer: number | null;
	timid_bookworm: number | null;
	rallying_thrillseeker: number | null;
	hiking_grouch: number | null;
	grateful_shell_collector: number | null;
	chill_sunbather: number | null;
	prophet_of_water: number | null;
	prophet_of_earth: number | null;
	prophet_of_air: number | null;
	prophet_of_fire: number | null;
	spinning_mentor: number | null;
	dancing_performer: number | null;
	peeking_postman: number | null;
	bearhug_hermit: number | null;
	baffled_botanist: number | null;
	scolding_student: number | null;
	scaredy_cadet: number | null;
	marching_adventurer: number | null;
	chuckling_scout: number | null;
	daydream_forester: number | null;
	beckoning_ruler: number | null;
	gloating_narcissist: number | null;
	stretching_lamplighter: number | null;
	slouching_soldier: number | null;
	sneezing_geographer: number | null;
	star_collector: number | null;
	lively_navigator: number | null;
	light_whisperer: number | null;
	tinkering_chimesmith: number | null;
	talented_builder: number | null;
	anxious_angler: number | null;
	ceasing_commodore: number | null;
	bumbling_boatswain: number | null;
	cackling_cannoneer: number | null;
	frantic_stagehand: number | null;
	forgetful_storyteller: number | null;
	mellow_musician: number | null;
	modest_dancer: number | null;
	running_wayfarer: number | null;
	mindful_miner: number | null;
	warrior_of_love: number | null;
	seed_of_hope: number | null;
	bereft_veteran: number | null;
	pleading_child: number | null;
	tiptoeing_tea_brewer: number | null;
	wounded_warrior: number | null;
	oddball_outcast: number | null;
	tumbling_troublemaker: number | null;
	melancholy_mope: number | null;
	overactive_overachiever: number | null;
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
	sassyDrifter: SpiritTrackerPacket["sassy_drifter"];
	stretchingGuru: SpiritTrackerPacket["stretching_guru"];
	provokingPerformer: SpiritTrackerPacket["provoking_performer"];
	leapingDancer: SpiritTrackerPacket["leaping_dancer"];
	salutingProtector: SpiritTrackerPacket["saluting_protector"];
	greetingShaman: SpiritTrackerPacket["greeting_shaman"];
	piggybackLightseeker: SpiritTrackerPacket["piggyback_lightseeker"];
	doublefiveLightCatcher: SpiritTrackerPacket["doublefive_light_catcher"];
	laidbackPioneer: SpiritTrackerPacket["laidback_pioneer"];
	twirlingChampion: SpiritTrackerPacket["twirling_champion"];
	crabWhisperer: SpiritTrackerPacket["crab_whisperer"];
	shushingLightScholar: SpiritTrackerPacket["shushing_light_scholar"];
	boogieKid: SpiritTrackerPacket["boogie_kid"];
	confettiCousin: SpiritTrackerPacket["confetti_cousin"];
	hairtousleTeen: SpiritTrackerPacket["hairtousle_teen"];
	sparklerParent: SpiritTrackerPacket["sparkler_parent"];
	pleafulParent: SpiritTrackerPacket["pleaful_parent"];
	wiseGrandparent: SpiritTrackerPacket["wise_grandparent"];
	troupeGreeter: SpiritTrackerPacket["troupe_greeter"];
	festivalSpinDancer: SpiritTrackerPacket["festival_spin_dancer"];
	admiringActor: SpiritTrackerPacket["admiring_actor"];
	troupeJuggler: SpiritTrackerPacket["troupe_juggler"];
	respectfulPianist: SpiritTrackerPacket["respectful_pianist"];
	thoughtfulDirector: SpiritTrackerPacket["thoughtful_director"];
	noddingMuralist: SpiritTrackerPacket["nodding_muralist"];
	indifferentAlchemist: SpiritTrackerPacket["indifferent_alchemist"];
	crabWalker: SpiritTrackerPacket["crab_walker"];
	scarecrowFarmer: SpiritTrackerPacket["scarecrow_farmer"];
	snoozingCarpenter: SpiritTrackerPacket["snoozing_carpenter"];
	playfightingHerbalist: SpiritTrackerPacket["playfighting_herbalist"];
	jellyWhisperer: SpiritTrackerPacket["jelly_whisperer"];
	timidBookworm: SpiritTrackerPacket["timid_bookworm"];
	rallyingThrillseeker: SpiritTrackerPacket["rallying_thrillseeker"];
	hikingGrouch: SpiritTrackerPacket["hiking_grouch"];
	gratefulShellCollector: SpiritTrackerPacket["grateful_shell_collector"];
	chillSunbather: SpiritTrackerPacket["chill_sunbather"];
	prophetOfWater: SpiritTrackerPacket["prophet_of_water"];
	prophetOfEarth: SpiritTrackerPacket["prophet_of_earth"];
	prophetOfAir: SpiritTrackerPacket["prophet_of_air"];
	prophetOfFire: SpiritTrackerPacket["prophet_of_fire"];
	spinningMentor: SpiritTrackerPacket["spinning_mentor"];
	dancingPerformer: SpiritTrackerPacket["dancing_performer"];
	peekingPostman: SpiritTrackerPacket["peeking_postman"];
	bearhugHermit: SpiritTrackerPacket["bearhug_hermit"];
	baffledBotanist: SpiritTrackerPacket["baffled_botanist"];
	scoldingStudent: SpiritTrackerPacket["scolding_student"];
	scaredyCadet: SpiritTrackerPacket["scaredy_cadet"];
	marchingAdventurer: SpiritTrackerPacket["marching_adventurer"];
	chucklingScout: SpiritTrackerPacket["chuckling_scout"];
	daydreamForester: SpiritTrackerPacket["daydream_forester"];
	beckoningRuler: SpiritTrackerPacket["beckoning_ruler"];
	gloatingNarcissist: SpiritTrackerPacket["gloating_narcissist"];
	stretchingLamplighter: SpiritTrackerPacket["stretching_lamplighter"];
	slouchingSoldier: SpiritTrackerPacket["slouching_soldier"];
	sneezingGeographer: SpiritTrackerPacket["sneezing_geographer"];
	starCollector: SpiritTrackerPacket["star_collector"];
	livelyNavigator: SpiritTrackerPacket["lively_navigator"];
	lightWhisperer: SpiritTrackerPacket["light_whisperer"];
	tinkeringChimesmith: SpiritTrackerPacket["tinkering_chimesmith"];
	talentedBuilder: SpiritTrackerPacket["talented_builder"];
	anxiousAngler: SpiritTrackerPacket["anxious_angler"];
	ceasingCommodore: SpiritTrackerPacket["ceasing_commodore"];
	bumblingBoatswain: SpiritTrackerPacket["bumbling_boatswain"];
	cacklingCannoneer: SpiritTrackerPacket["cackling_cannoneer"];
	franticStagehand: SpiritTrackerPacket["frantic_stagehand"];
	forgetfulStoryteller: SpiritTrackerPacket["forgetful_storyteller"];
	mellowMusician: SpiritTrackerPacket["mellow_musician"];
	modestDancer: SpiritTrackerPacket["modest_dancer"];
	runningWayfarer: SpiritTrackerPacket["running_wayfarer"];
	mindfulMiner: SpiritTrackerPacket["mindful_miner"];
	warriorOfLove: SpiritTrackerPacket["warrior_of_love"];
	seedOfHope: SpiritTrackerPacket["seed_of_hope"];
	bereftVeteran: SpiritTrackerPacket["bereft_veteran"];
	pleadingChild: SpiritTrackerPacket["pleading_child"];
	tiptoeingTeaBrewer: SpiritTrackerPacket["tiptoeing_tea_brewer"];
	woundedWarrior: SpiritTrackerPacket["wounded_warrior"];
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
export const SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID = "SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID = "SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID" as const;
export const SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID = "SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID" as const;

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

	public sassyDrifter!: SpiritTrackerData["sassyDrifter"];

	public stretchingGuru!: SpiritTrackerData["stretchingGuru"];

	public provokingPerformer!: SpiritTrackerData["provokingPerformer"];

	public leapingDancer!: SpiritTrackerData["leapingDancer"];

	public salutingProtector!: SpiritTrackerData["salutingProtector"];

	public greetingShaman!: SpiritTrackerData["greetingShaman"];

	public piggybackLightseeker!: SpiritTrackerData["piggybackLightseeker"];

	public doublefiveLightCatcher!: SpiritTrackerData["doublefiveLightCatcher"];

	public laidbackPioneer!: SpiritTrackerData["laidbackPioneer"];

	public twirlingChampion!: SpiritTrackerData["twirlingChampion"];

	public crabWhisperer!: SpiritTrackerData["crabWhisperer"];

	public shushingLightScholar!: SpiritTrackerData["shushingLightScholar"];

	public boogieKid!: SpiritTrackerData["boogieKid"];

	public confettiCousin!: SpiritTrackerData["confettiCousin"];

	public hairtousleTeen!: SpiritTrackerData["hairtousleTeen"];

	public sparklerParent!: SpiritTrackerData["sparklerParent"];

	public pleafulParent!: SpiritTrackerData["pleafulParent"];

	public wiseGrandparent!: SpiritTrackerData["wiseGrandparent"];

	public troupeGreeter!: SpiritTrackerData["troupeGreeter"];

	public festivalSpinDancer!: SpiritTrackerData["festivalSpinDancer"];

	public admiringActor!: SpiritTrackerData["admiringActor"];

	public troupeJuggler!: SpiritTrackerData["troupeJuggler"];

	public respectfulPianist!: SpiritTrackerData["respectfulPianist"];

	public thoughtfulDirector!: SpiritTrackerData["thoughtfulDirector"];

	public noddingMuralist!: SpiritTrackerData["noddingMuralist"];

	public indifferentAlchemist!: SpiritTrackerData["indifferentAlchemist"];

	public crabWalker!: SpiritTrackerData["crabWalker"];

	public scarecrowFarmer!: SpiritTrackerData["scarecrowFarmer"];

	public snoozingCarpenter!: SpiritTrackerData["snoozingCarpenter"];

	public playfightingHerbalist!: SpiritTrackerData["playfightingHerbalist"];

	public jellyWhisperer!: SpiritTrackerData["jellyWhisperer"];

	public timidBookworm!: SpiritTrackerData["timidBookworm"];

	public rallyingThrillseeker!: SpiritTrackerData["rallyingThrillseeker"];

	public hikingGrouch!: SpiritTrackerData["hikingGrouch"];

	public gratefulShellCollector!: SpiritTrackerData["gratefulShellCollector"];

	public chillSunbather!: SpiritTrackerData["chillSunbather"];

	public prophetOfWater!: SpiritTrackerData["prophetOfWater"];

	public prophetOfEarth!: SpiritTrackerData["prophetOfEarth"];

	public prophetOfAir!: SpiritTrackerData["prophetOfAir"];

	public prophetOfFire!: SpiritTrackerData["prophetOfFire"];

	public spinningMentor!: SpiritTrackerData["spinningMentor"];

	public dancingPerformer!: SpiritTrackerData["dancingPerformer"];

	public peekingPostman!: SpiritTrackerData["peekingPostman"];

	public bearhugHermit!: SpiritTrackerData["bearhugHermit"];

	public baffledBotanist!: SpiritTrackerData["baffledBotanist"];

	public scoldingStudent!: SpiritTrackerData["scoldingStudent"];

	public scaredyCadet!: SpiritTrackerData["scaredyCadet"];

	public marchingAdventurer!: SpiritTrackerData["marchingAdventurer"];

	public chucklingScout!: SpiritTrackerData["chucklingScout"];

	public daydreamForester!: SpiritTrackerData["daydreamForester"];

	public beckoningRuler!: SpiritTrackerData["beckoningRuler"];

	public gloatingNarcissist!: SpiritTrackerData["gloatingNarcissist"];

	public stretchingLamplighter!: SpiritTrackerData["stretchingLamplighter"];

	public slouchingSoldier!: SpiritTrackerData["slouchingSoldier"];

	public sneezingGeographer!: SpiritTrackerData["sneezingGeographer"];

	public starCollector!: SpiritTrackerData["starCollector"];

	public livelyNavigator!: SpiritTrackerData["livelyNavigator"];

	public lightWhisperer!: SpiritTrackerData["lightWhisperer"];

	public tinkeringChimesmith!: SpiritTrackerData["tinkeringChimesmith"];

	public talentedBuilder!: SpiritTrackerData["talentedBuilder"];

	public anxiousAngler!: SpiritTrackerData["anxiousAngler"];

	public ceasingCommodore!: SpiritTrackerData["ceasingCommodore"];

	public bumblingBoatswain!: SpiritTrackerData["bumblingBoatswain"];

	public cacklingCannoneer!: SpiritTrackerData["cacklingCannoneer"];

	public franticStagehand!: SpiritTrackerData["franticStagehand"];

	public forgetfulStoryteller!: SpiritTrackerData["forgetfulStoryteller"];

	public mellowMusician!: SpiritTrackerData["mellowMusician"];

	public modestDancer!: SpiritTrackerData["modestDancer"];

	public runningWayfarer!: SpiritTrackerData["runningWayfarer"];

	public mindfulMiner!: SpiritTrackerData["mindfulMiner"];

	public warriorOfLove!: SpiritTrackerData["warriorOfLove"];

	public seedOfHope!: SpiritTrackerData["seedOfHope"];

	public bereftVeteran!: SpiritTrackerData["bereftVeteran"];

	public pleadingChild!: SpiritTrackerData["pleadingChild"];

	public tiptoeingTeaBrewer!: SpiritTrackerData["tiptoeingTeaBrewer"];

	public woundedWarrior!: SpiritTrackerData["woundedWarrior"];

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
		this.sassyDrifter = data.sassy_drifter;
		this.stretchingGuru = data.stretching_guru;
		this.provokingPerformer = data.provoking_performer;
		this.leapingDancer = data.leaping_dancer;
		this.salutingProtector = data.saluting_protector;
		this.greetingShaman = data.greeting_shaman;
		this.piggybackLightseeker = data.piggyback_lightseeker;
		this.doublefiveLightCatcher = data.doublefive_light_catcher;
		this.laidbackPioneer = data.laidback_pioneer;
		this.twirlingChampion = data.twirling_champion;
		this.crabWhisperer = data.crab_whisperer;
		this.shushingLightScholar = data.shushing_light_scholar;
		this.boogieKid = data.boogie_kid;
		this.confettiCousin = data.confetti_cousin;
		this.hairtousleTeen = data.hairtousle_teen;
		this.sparklerParent = data.sparkler_parent;
		this.pleafulParent = data.pleaful_parent;
		this.wiseGrandparent = data.wise_grandparent;
		this.troupeGreeter = data.troupe_greeter;
		this.festivalSpinDancer = data.festival_spin_dancer;
		this.admiringActor = data.admiring_actor;
		this.troupeJuggler = data.troupe_juggler;
		this.respectfulPianist = data.respectful_pianist;
		this.thoughtfulDirector = data.thoughtful_director;
		this.noddingMuralist = data.nodding_muralist;
		this.indifferentAlchemist = data.indifferent_alchemist;
		this.crabWalker = data.crab_walker;
		this.scarecrowFarmer = data.scarecrow_farmer;
		this.snoozingCarpenter = data.snoozing_carpenter;
		this.playfightingHerbalist = data.playfighting_herbalist;
		this.jellyWhisperer = data.jelly_whisperer;
		this.timidBookworm = data.timid_bookworm;
		this.rallyingThrillseeker = data.rallying_thrillseeker;
		this.hikingGrouch = data.hiking_grouch;
		this.gratefulShellCollector = data.grateful_shell_collector;
		this.chillSunbather = data.chill_sunbather;
		this.prophetOfWater = data.prophet_of_water;
		this.prophetOfEarth = data.prophet_of_earth;
		this.prophetOfAir = data.prophet_of_air;
		this.prophetOfFire = data.prophet_of_fire;
		this.spinningMentor = data.spinning_mentor;
		this.dancingPerformer = data.dancing_performer;
		this.peekingPostman = data.peeking_postman;
		this.bearhugHermit = data.bearhug_hermit;
		this.baffledBotanist = data.baffled_botanist;
		this.scoldingStudent = data.scolding_student;
		this.scaredyCadet = data.scaredy_cadet;
		this.marchingAdventurer = data.marching_adventurer;
		this.chucklingScout = data.chuckling_scout;
		this.daydreamForester = data.daydream_forester;
		this.beckoningRuler = data.beckoning_ruler;
		this.gloatingNarcissist = data.gloating_narcissist;
		this.stretchingLamplighter = data.stretching_lamplighter;
		this.slouchingSoldier = data.slouching_soldier;
		this.sneezingGeographer = data.sneezing_geographer;
		this.starCollector = data.star_collector;
		this.livelyNavigator = data.lively_navigator;
		this.lightWhisperer = data.light_whisperer;
		this.tinkeringChimesmith = data.tinkering_chimesmith;
		this.talentedBuilder = data.talented_builder;
		this.anxiousAngler = data.anxious_angler;
		this.ceasingCommodore = data.ceasing_commodore;
		this.bumblingBoatswain = data.bumbling_boatswain;
		this.cacklingCannoneer = data.cackling_cannoneer;
		this.franticStagehand = data.frantic_stagehand;
		this.forgetfulStoryteller = data.forgetful_storyteller;
		this.mellowMusician = data.mellow_musician;
		this.modestDancer = data.modest_dancer;
		this.runningWayfarer = data.running_wayfarer;
		this.mindfulMiner = data.mindful_miner;
		this.warriorOfLove = data.warrior_of_love;
		this.seedOfHope = data.seed_of_hope;
		this.bereftVeteran = data.bereft_veteran;
		this.pleadingChild = data.pleading_child;
		this.tiptoeingTeaBrewer = data.tiptoeing_tea_brewer;
		this.woundedWarrior = data.wounded_warrior;
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
		const bit = values.reduce((bit, value) => bit | Number(value), 0);

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
				spirit = "hide'n'seek_pioneer";
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
			case SpiritName.BereftVeteran:
				spirit = "bereft_veteran";
				break;
			case SpiritName.PleadingChild:
				spirit = "pleading_child";
				break;
			case SpiritName.TiptoeingTeaBrewer:
				spirit = "tiptoeing_tea-brewer";
				break;
			case SpiritName.WoundedWarrior:
				spirit = "wounded_warrior";
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
			.update({ [spirit]: interaction.values.reduce((bit, value) => bit | Number(value), 0) })
			.where("user_id", interaction.user.id)
			.returning("*");

		await interaction.update(
			await SpiritTracker.responseData(interaction, bit, Spirits.find(({ name }) => name === spiritName)!),
		);
	}

	public static async viewTracker(interaction: ButtonInteraction | ChatInputCommandInteraction) {
		// Ensure they have data.
		if (!(await this.fetch(interaction.user.id).catch(() => null))) {
			await pg<SpiritTrackerPacket>(Table.SpiritTracker).insert({ user_id: interaction.user.id }, "*");
		}

		const response = {
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							Object.values(SPIRIT_TYPE).map((spiritType) =>
								new StringSelectMenuOptionBuilder()
									.setLabel(resolveSpiritTypeToString(spiritType))
									.setValue(String(spiritType)),
							),
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
		switch (Number(interaction.values[0]) as SpiritType) {
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
		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(Elder.map(({ name }) => new StringSelectMenuOptionBuilder().setLabel(name).setValue(name)))
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

	public static async viewSeasons(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		await interaction.update({
			content: "",
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(0)
						.setOptions(
							Object.values(Season).map((season) =>
								new StringSelectMenuOptionBuilder()
									.setEmoji(resolveSeasonsToEmoji(season))
									.setLabel(season)
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

		const options = Seasonal.filter((spirit) => spirit.season.name === season).map(({ name, maxItemsBit }) =>
			new StringSelectMenuOptionBuilder()
				.setLabel(`${name} (${this.spiritProgression(spiritTracker.resolveNameToBit(name), maxItemsBit)}%)`)
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
						.setPlaceholder("Select a spirit!"),
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
		await interaction.update(await this.responseData(interaction, bit, spirit));
	}

	private static async responseData(interaction: StringSelectMenuInteraction, bit: number | null, spirit: BaseSpirit) {
		const description = { candles: 0, hearts: 0, ascendedCandles: 0 } satisfies SpiritCost;

		const embedFields = spirit.offer.map(({ item, cost }, flag) => {
			let value;

			if (bit && (bit & flag) === flag) {
				value = resolveEmoji(interaction, Emoji.Yes, true);
			} else {
				if (cost?.candles) description.candles += cost.candles;
				if (cost?.hearts) description.hearts += cost.hearts;
				if (cost?.ascendedCandles) description.ascendedCandles += cost.ascendedCandles;
				value = resolveOfferToCurrency(interaction, cost ?? {}).join("") || resolveEmoji(interaction, Emoji.No, true);
			}

			return {
				name: item,
				value: bit && (bit & flag) === flag ? resolveEmoji(interaction, Emoji.Yes, true) : value,
				inline: true,
			};
		});

		return {
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`${SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID}-${spirit.name}`)
						.setMaxValues(spirit.offer.size)
						.setMinValues(0)
						.setOptions(
							spirit.offer.map(({ item }, flag) =>
								new StringSelectMenuOptionBuilder()
									.setDefault(Boolean(bit && bit & flag))
									.setLabel(item)
									.setValue(String(flag)),
							),
						)
						.setPlaceholder("Select what you have!"),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					backToStartButtonBuilder,
					new ButtonBuilder()
						.setCustomId(
							spirit.isSeasonalSpirit()
								? `${SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID}-${spirit.season.name}`
								: SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID,
						)
						.setEmoji("⏪")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [
				new EmbedBuilder()
					.setColor((await interaction.guild?.members.fetchMe())?.displayColor ?? 0)
					.setDescription(`__Remaining Currency__\n${resolveOfferToCurrency(interaction, description).join("")}`)
					.setFields(embedFields)
					.setImage(spirit.imageURL)
					.setTitle(spirit.name)
					.setURL(spirit.wikiURL),
			],
		};
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
			case SpiritName.ProphetOfWater:
				return this.prophetOfWater;
			case SpiritName.ProphetOfEarth:
				return this.prophetOfEarth;
			case SpiritName.ProphetOfAir:
				return this.prophetOfAir;
			case SpiritName.ProphetOfFire:
				return this.prophetOfFire;
			case SpiritName.SpinningMentor:
				return this.spinningMentor;
			case SpiritName.DancingPerformer:
				return this.dancingPerformer;
			case SpiritName.PeekingPostman:
				return this.peekingPostman;
			case SpiritName.BearhugHermit:
				return this.bearhugHermit;
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
			case SpiritName.LivelyNavigator:
				return this.livelyNavigator;
			case SpiritName.LightWhisperer:
				return this.lightWhisperer;
			case SpiritName.TinkeringChimesmith:
				return this.tinkeringChimesmith;
			case SpiritName.TalentedBuilder:
				return this.talentedBuilder;
			case SpiritName.AnxiousAngler:
				return this.anxiousAngler;
			case SpiritName.CeasingCommodore:
				return this.ceasingCommodore;
			case SpiritName.BumblingBoatswain:
				return this.bumblingBoatswain;
			case SpiritName.CacklingCannoneer:
				return this.cacklingCannoneer;
			case SpiritName.FranticStagehand:
				return this.franticStagehand;
			case SpiritName.ForgetfulStoryteller:
				return this.forgetfulStoryteller;
			case SpiritName.MellowMusician:
				return this.mellowMusician;
			case SpiritName.ModestDancer:
				return this.modestDancer;
			case SpiritName.RunningWayfarer:
				return this.runningWayfarer;
			case SpiritName.MindfulMiner:
				return this.mindfulMiner;
			case SpiritName.WarriorOfLove:
				return this.warriorOfLove;
			case SpiritName.SeedOfHope:
				return this.seedOfHope;
			case SpiritName.BereftVeteran:
				return this.bereftVeteran;
			case SpiritName.PleadingChild:
				return this.pleadingChild;
			case SpiritName.TiptoeingTeaBrewer:
				return this.tiptoeingTeaBrewer;
			case SpiritName.WoundedWarrior:
				return this.woundedWarrior;
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

	private static spiritProgression(bit: number | null, maximumBit: number) {
		return `${
			bit
				? Math.round(((bit.toString(2).split("1").length - 1) / (maximumBit.toString(2).split("1").length - 1)) * 100)
				: 0
		}%`;
	}
}
