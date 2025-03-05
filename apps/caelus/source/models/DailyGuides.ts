import {
	type APIAttachment,
	FormattingPatterns,
	type GatewayMessageCreateDispatchData,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	DailyQuest,
	type DailyQuests,
	REALM_NAME_VALUES,
	RealmName,
	SkyMap,
	SpiritId,
	type ValidRealmName,
	skyToday,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import pQueue from "p-queue";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { distribute } from "../services/daily-guides.js";
import {
	DAILY_INFOGRAPHICS_CHANNEL_ID,
	DailyQuestToInfographicURL,
	INFOGRAPHICS_DATABASE_GUILD_ID,
	type MeditationMaps,
	type QUEST_NUMBER,
	type RainbowAdmireMaps,
	type SocialLightAreaMaps,
	inconsistentMapKeys,
} from "../utility/constants.js";
import {
	isMeditationMap,
	isRainbowAdmireMap,
	isSocialLightAreaMap,
	resolveMap,
	resolveValidRealm,
} from "../utility/functions.js";
import { QUEST_SPIRITS, type QuestSpirits, isQuestSpirit } from "../utility/spirits.js";

export interface DailyGuidesPacket {
	quest1: DailyGuideQuest | null;
	quest2: DailyGuideQuest | null;
	quest3: DailyGuideQuest | null;
	quest4: DailyGuideQuest | null;
	travelling_rock: string | null;
}

interface DailyGuidesData {
	quest1: DailyGuidesPacket["quest1"];
	quest2: DailyGuidesPacket["quest2"];
	quest3: DailyGuidesPacket["quest3"];
	quest4: DailyGuidesPacket["quest4"];
	travellingRock: DailyGuidesPacket["travelling_rock"];
}

type DailyGuidesSetQuestsData = Partial<
	Pick<DailyGuidesData, "quest1" | "quest2" | "quest3" | "quest4">
>;

export interface DailyGuideQuest {
	id: number;
	url: string | null;
}

const DAILY_GUIDES_RESET_DATA = {
	quest1: null,
	quest2: null,
	quest3: null,
	quest4: null,
	travelling_rock: null,
} as const satisfies Readonly<{
	[DailyGuide in keyof DailyGuidesPacket]: null;
}>;

export type QuestNumber = (typeof QUEST_NUMBER)[number];

interface ResolveDailyGuideOptions {
	pureContent: string;
	realm: ValidRealmName | null;
	skyMap: SkyMap | null;
}

const CatchTheLightRealmToDailyQuest = {
	[RealmName.DaylightPrairie]: DailyQuest.CatchTheLightInTheDaylightPrairie,
	[RealmName.HiddenForest]: DailyQuest.CatchTheLightInTheHiddenForest,
	[RealmName.ValleyOfTriumph]: DailyQuest.CatchTheLightInTheValleyOfTriumph,
	[RealmName.GoldenWasteland]: DailyQuest.CatchTheLightInTheGoldenWasteland,
	[RealmName.VaultOfKnowledge]: DailyQuest.CatchTheLightInTheVaultOfKnowledge,
} as const satisfies Readonly<Record<ValidRealmName, DailyQuests>>;

const SocialLightAreaSkyMapToDailyQuest = {
	[SkyMap.Cave]: DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie,
	[SkyMap.ElevatedClearing]: DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest,
	[SkyMap.VillageOfDreams]: DailyQuest.VisitTheHotSpringInTheValleyOfTriumph,
	[SkyMap.Graveyard]: DailyQuest.VisitTheBonfireAtTheGoldenWasteland,
} as const satisfies Readonly<Record<SocialLightAreaMaps, DailyQuests>>;

const AdmireTheSaplingRealmToDailyQuest = {
	[RealmName.DaylightPrairie]: DailyQuest.AdmireTheSaplingInTheDaylightPrairie,
	[RealmName.HiddenForest]: DailyQuest.AdmireTheSaplingInTheHiddenForest,
	[RealmName.ValleyOfTriumph]: DailyQuest.AdmireTheSaplingInTheValleyOfTriumph,
	[RealmName.GoldenWasteland]: DailyQuest.AdmireTheSaplingInTheGoldenWasteland,
	[RealmName.VaultOfKnowledge]: DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge,
} as const satisfies Readonly<Record<ValidRealmName, DailyQuests>>;

const FindTheCandlesAtTheEndOfTheRainbowRealmToDailyQuest = {
	[RealmName.DaylightPrairie]: DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie,
	[RealmName.HiddenForest]: DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest,
	[RealmName.ValleyOfTriumph]: DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph,
	[RealmName.GoldenWasteland]: DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland,
	[RealmName.VaultOfKnowledge]: DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge,
} as const satisfies Readonly<Record<ValidRealmName, DailyQuests>>;

const AdmireTheRainbowSkyMapToDailyQuest = {
	[SkyMap.SanctuaryIslands]: DailyQuest.AdmireTheRainbowInTheSanctuaryIslands,
	[SkyMap.WindPaths]: DailyQuest.AdmireTheRainbowInTheWindPaths,
	[SkyMap.HermitValley]: DailyQuest.AdmireTheRainbowInTheHermitValley,
	[SkyMap.TreasureReef]: DailyQuest.AdmireTheRainbowInTheTreasureReef,
	[SkyMap.StarlightDesert]: DailyQuest.AdmireTheRainbowInTheStarlightDesert,
} as const satisfies Readonly<Record<RainbowAdmireMaps, DailyQuests>>;

const MeditateSkyMapToDailyQuest = {
	[SkyMap.BirdNest]: DailyQuest.MeditateAtTheBirdNest,
	[SkyMap.ButterflyFields]: DailyQuest.MeditateInTheButterflyFields,
	[SkyMap.SanctuaryIslands]: DailyQuest.MeditateAtTheSanctuaryIslands,
	[SkyMap.Cave]: DailyQuest.MeditateInTheCave,
	[SkyMap.KoiPond]: DailyQuest.MeditateByTheKoiPond,
	[SkyMap.ForestClearing]: DailyQuest.MeditateAtTheForestClearing,
	[SkyMap.ForestBrook]: DailyQuest.MeditateAtTheForestBrook,
	[SkyMap.ElevatedClearing]: DailyQuest.MeditateAtTheElevatedClearing,
	[SkyMap.ForestEnd]: DailyQuest.MeditateAtTheForestEnd,
	[SkyMap.Boneyard]: DailyQuest.MeditateAtTheBoneyard,
	[SkyMap.IceRink]: DailyQuest.MeditateByTheIceRink,
	[SkyMap.Coliseum]: DailyQuest.MeditateAtTheColiseum,
	[SkyMap.BrokenTemple]: DailyQuest.MeditateInTheBrokenTemple,
	[SkyMap.ForgottenArk]: DailyQuest.MeditateInTheForgottenArk,
	[SkyMap.Graveyard]: DailyQuest.MeditateInTheGraveyard,
	[SkyMap.Boat]: DailyQuest.MeditateOnTheBoat,
	[SkyMap.Battlefield]: DailyQuest.MeditateOnTheBattlefield,
	[SkyMap.VaultEntrance]: DailyQuest.MeditateAtTheVaultEntrance,
	[SkyMap.VaultSecondFloor]: DailyQuest.MeditateInTheVaultSecondFloor,
	[SkyMap.VaultSummit]: DailyQuest.MeditateAtTheVaultSummit,
} as const satisfies Readonly<Record<Exclude<MeditationMaps, SkyMap.Citadel>, DailyQuests>>;

const SpiritIdToDailyQuest = {
	[SpiritId.ButterflyCharmer]: DailyQuest.ReliveTheButterflyCharmer,
	[SpiritId.ApplaudingBellmaker]: DailyQuest.ReliveTheApplaudingBellmaker,
	[SpiritId.WavingBellmaker]: DailyQuest.ReliveTheWavingBellmaker,
	[SpiritId.SlumberingShipwright]: DailyQuest.ReliveTheSlumberingShipwright,
	[SpiritId.LaughingLightCatcher]: DailyQuest.ReliveTheLaughingLightCatcher,
	[SpiritId.BirdWhisperer]: DailyQuest.ReliveTheBirdWhisperer,
	[SpiritId.ExhaustedDockWorker]: DailyQuest.ReliveTheExhaustedDockWorker,
	[SpiritId.ShiveringTrailblazer]: DailyQuest.ReliveTheShiveringTrailblazer,
	[SpiritId.BlushingProspector]: DailyQuest.ReliveTheBlushingProspector,
	[SpiritId.HideNSeekPioneer]: DailyQuest.ReliveTheHideNSeekPioneer,
	[SpiritId.PoutyPorter]: DailyQuest.ReliveThePoutyPorter,
	[SpiritId.DismayedHunter]: DailyQuest.ReliveTheDismayedHunter,
	[SpiritId.ApologeticLumberjack]: DailyQuest.ReliveTheApologeticLumberjack,
	[SpiritId.TearfulLightMiner]: DailyQuest.ReliveTheTearfulLightMiner,
	[SpiritId.WhaleWhisperer]: DailyQuest.ReliveTheWhaleWhisperer,
	[SpiritId.ConfidentSightseer]: DailyQuest.ReliveTheConfidentSightseer,
	[SpiritId.HandstandingThrillseeker]: DailyQuest.ReliveTheHandstandingThrillseeker,
	[SpiritId.MantaWhisperer]: DailyQuest.ReliveTheMantaWhisperer,
	[SpiritId.BackflippingChampion]: DailyQuest.ReliveTheBackflippingChampion,
	[SpiritId.CheerfulSpectator]: DailyQuest.ReliveTheCheerfulSpectator,
	[SpiritId.BowingMedalist]: DailyQuest.ReliveTheBowingMedalist,
	[SpiritId.ProudVictor]: DailyQuest.ReliveTheProudVictor,
	[SpiritId.FrightenedRefugee]: DailyQuest.ReliveTheFrightenedRefugee,
	[SpiritId.FaintingWarrior]: DailyQuest.ReliveTheFaintingWarrior,
	[SpiritId.CourageousSoldier]: DailyQuest.ReliveTheCourageousSoldier,
	[SpiritId.StealthySurvivor]: DailyQuest.ReliveTheStealthySurvivor,
	[SpiritId.SalutingCaptain]: DailyQuest.ReliveTheSalutingCaptain,
	[SpiritId.LookoutScout]: DailyQuest.ReliveTheLookoutScout,
	[SpiritId.PrayingAcolyte]: DailyQuest.ReliveThePrayingAcolyte,
	[SpiritId.LevitatingAdept]: DailyQuest.ReliveTheLevitatingAdept,
	[SpiritId.PoliteScholar]: DailyQuest.ReliveThePoliteScholar,
	[SpiritId.MemoryWhisperer]: DailyQuest.ReliveTheMemoryWhisperer,
	[SpiritId.MeditatingMonastic]: DailyQuest.ReliveTheMeditatingMonastic,
	[SpiritId.StretchingGuru]: DailyQuest.ReliveTheStretchingGuru,
	[SpiritId.ProvokingPerformer]: DailyQuest.ReliveTheProvokingPerformer,
	[SpiritId.LeapingDancer]: DailyQuest.ReliveTheLeapingDancer,
	[SpiritId.SalutingProtector]: DailyQuest.ReliveTheSalutingProtector,
	[SpiritId.GreetingShaman]: DailyQuest.ReliveTheGreetingShaman,
	[SpiritId.DoublefiveLightCatcher]: DailyQuest.ReliveTheDoublefiveLightCatcher,
	[SpiritId.LaidbackPioneer]: DailyQuest.ReliveTheLaidbackPioneer,
	[SpiritId.TwirlingChampion]: DailyQuest.ReliveTheTwirlingChampion,
	[SpiritId.CrabWhisperer]: DailyQuest.ReliveTheCrabWhisperer,
	[SpiritId.ShushingLightScholar]: DailyQuest.ReliveTheShushingLightScholar,
	[SpiritId.ConfettiCousin]: DailyQuest.ReliveTheConfettiCousin,
	[SpiritId.HairtousleTeen]: DailyQuest.ReliveTheHairtousleTeen,
	[SpiritId.SparklerParent]: DailyQuest.ReliveTheSparklerParent,
	[SpiritId.PleafulParent]: DailyQuest.ReliveThePleafulParent,
	[SpiritId.WiseGrandparent]: DailyQuest.ReliveTheWiseGrandparent,
	[SpiritId.FestivalSpinDancer]: DailyQuest.ReliveTheFestivalSpinDancer,
	[SpiritId.AdmiringActor]: DailyQuest.ReliveTheAdmiringActor,
	[SpiritId.TroupeJuggler]: DailyQuest.ReliveTheTroupeJuggler,
	[SpiritId.RespectfulPianist]: DailyQuest.ReliveTheRespectfulPianist,
	[SpiritId.ThoughtfulDirector]: DailyQuest.ReliveTheThoughtfulDirector,
	[SpiritId.NoddingMuralist]: DailyQuest.ReliveTheNoddingMuralist,
	[SpiritId.IndifferentAlchemist]: DailyQuest.ReliveTheIndifferentAlchemist,
	[SpiritId.CrabWalker]: DailyQuest.ReliveTheCrabWalker,
	[SpiritId.ScarecrowFarmer]: DailyQuest.ReliveTheScarecrowFarmer,
	[SpiritId.SnoozingCarpenter]: DailyQuest.ReliveTheSnoozingCarpenter,
	[SpiritId.PlayfightingHerbalist]: DailyQuest.ReliveThePlayfightingHerbalist,
	[SpiritId.JellyWhisperer]: DailyQuest.ReliveTheJellyWhisperer,
	[SpiritId.TimidBookworm]: DailyQuest.ReliveTheTimidBookworm,
	[SpiritId.RallyingThrillseeker]: DailyQuest.ReliveTheRallyingThrillseeker,
	[SpiritId.HikingGrouch]: DailyQuest.ReliveTheHikingGrouch,
	[SpiritId.GratefulShellCollector]: DailyQuest.ReliveTheGratefulShellCollector,
	[SpiritId.ChillSunbather]: DailyQuest.ReliveTheChillSunbather,
	[SpiritId.SpinningMentor]: DailyQuest.ReliveTheSpinningMentor,
	[SpiritId.DancingPerformer]: DailyQuest.ReliveTheDancingPerformer,
	[SpiritId.PeekingPostman]: DailyQuest.ReliveThePeekingPostman,
	[SpiritId.BearhugHermit]: DailyQuest.ReliveTheBearhugHermit,
	[SpiritId.BaffledBotanist]: DailyQuest.ReliveTheBaffledBotanist,
	[SpiritId.ScoldingStudent]: DailyQuest.ReliveTheScoldingStudent,
	[SpiritId.ScaredyCadet]: DailyQuest.ReliveTheScaredyCadet,
	[SpiritId.MarchingAdventurer]: DailyQuest.ReliveTheMarchingAdventurer,
	[SpiritId.ChucklingScout]: DailyQuest.ReliveTheChucklingScout,
	[SpiritId.DaydreamForester]: DailyQuest.ReliveTheDaydreamForester,
} as const satisfies Readonly<Record<QuestSpirits, DailyQuests>>;

const regularExpressionRealms = REALM_NAME_VALUES.join("|").replaceAll(" ", "\\s+");

const skyMapRegExp = [...Object.values(SkyMap), ...inconsistentMapKeys]
	.join("|")
	.replaceAll(" ", "\\s+");

export default new (class DailyGuides {
	public quest1: DailyGuidesData["quest1"] = null;

	public quest2: DailyGuidesData["quest2"] = null;

	public quest3: DailyGuidesData["quest3"] = null;

	public quest4: DailyGuidesData["quest4"] = null;

	public travellingRock: DailyGuidesData["travellingRock"] = null;

	public readonly queue = new pQueue({ concurrency: 1 });

	public async reset(insert = false) {
		let query = pg<DailyGuidesPacket>(Table.DailyGuides);
		query = insert ? query.insert(DAILY_GUIDES_RESET_DATA) : query.update(DAILY_GUIDES_RESET_DATA);
		const [dailyGuidesPacket] = await query.returning("*");
		this.patch(dailyGuidesPacket!);
	}

	public patch(data: Partial<DailyGuidesPacket>) {
		if ("quest1" in data) {
			this.quest1 = data.quest1;
		}

		if ("quest2" in data) {
			this.quest2 = data.quest2;
		}

		if ("quest3" in data) {
			this.quest3 = data.quest3;
		}

		if ("quest4" in data) {
			this.quest4 = data.quest4;
		}

		if ("travelling_rock" in data) {
			this.travellingRock = data.travelling_rock;
		}
	}

	public validToParse(message: GatewayMessageCreateDispatchData) {
		return Boolean(
			message.channel_id === DAILY_INFOGRAPHICS_CHANNEL_ID &&
				message.message_reference?.guild_id === INFOGRAPHICS_DATABASE_GUILD_ID &&
				message.flags &&
				(message.flags & MessageFlags.IsCrosspost) === MessageFlags.IsCrosspost &&
				message.message_reference.message_id &&
				DiscordSnowflake.timestampFrom(message.message_reference.message_id) >=
					skyToday().toMillis(),
		);
	}

	public async parse(message: GatewayMessageCreateDispatchData) {
		if (!this.validToParse(message)) {
			return;
		}

		const { attachments, content } = message;
		const transformedContent = content.toUpperCase();

		if (
			(transformedContent.includes("DAILY QUEST") && transformedContent.length <= 20) ||
			transformedContent.includes("SEASONAL CANDLE") ||
			transformedContent.includes("TREASURE CANDLE") ||
			transformedContent.includes("SHATTERING SHARD SUMMARY") ||
			transformedContent.includes("DAYS OF COLOUR 2023") ||
			transformedContent.includes("2024 DAYS OF LOVE")
		) {
			/*
			 * Parsing for the following are redundant:
			 * - The general photo of quests (not needed)
			 * - The seasonal candles infographic (automated)
			 * - The treasure candles infographic (automated)
			 * - The shard eruption infographic (automated)
			 * - Days of Colour event ticket rotation
			 * - Days of Love event ticket rotation
			 */
			return;
		}

		const parsed = await this.queue.add(async () => {
			let parsed = false;

			if (
				transformedContent.includes("QUEST") ||
				transformedContent.includes("RAINBOW") ||
				transformedContent.includes("SOCIAL LIGHT") ||
				transformedContent.includes("SAPLING") ||
				transformedContent.includes("NATURE")
			) {
				parsed = await this.parseQuests(content, attachments);
			} else {
				pino.warn(message, "Intercepted an unparsed message.");
			}

			return parsed;
		});

		if (parsed && this.queue.pending === 0 && this.queue.size === 0) {
			this.queue.pause();
			await distribute();
			this.queue.start();
		}
	}

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
	private resolveDailyGuide(options: ResolveDailyGuideOptions) {
		const { pureContent, realm, skyMap } = options;
		const upperPureContent = pureContent.toUpperCase();

		if (
			upperPureContent.includes("BOW AT A PLAYER") ||
			upperPureContent.includes("BOW TO A PLAYER")
		) {
			return DailyQuest.BowAtAPlayer;
		}

		if (upperPureContent.includes("FOLLOW A FRIEND")) {
			return DailyQuest.FollowAFriend;
		}

		if (upperPureContent.includes("HUG A FRIEND")) {
			return DailyQuest.HugAFriend;
		}

		if (upperPureContent.includes("WAVE TO A FRIEND")) {
			return DailyQuest.WaveToAFriend;
		}

		if (upperPureContent.includes("HOLD THE HAND")) {
			return DailyQuest.HoldAFriendsHand;
		}

		if (upperPureContent.includes("SEND A GIFT")) {
			return DailyQuest.SendAGiftToAFriend;
		}

		if (upperPureContent.includes("ACQUAINTANCE")) {
			return DailyQuest.MakeANewAcquaintance;
		}

		if (upperPureContent.includes("HIGH-FIVE")) {
			return DailyQuest.HighFiveAFriend;
		}

		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) {
			return DailyQuest.UseAnExpressionNearAFriend;
		}

		if (upperPureContent.includes("BENCH")) {
			return DailyQuest.SitOnABenchWithAStranger;
		}

		if (upperPureContent.includes("RECHARGE FROM A JELLYFISH")) {
			return DailyQuest.RechargeFromAJellyfish;
		}

		if (upperPureContent.includes("RECHARGE FROM A LIGHT BLOOM")) {
			return DailyQuest.RechargeFromALightBloom;
		}

		if (
			upperPureContent.includes("RIDE A MANTA") ||
			upperPureContent.includes("RIDE WITH A MANTA")
		) {
			return DailyQuest.RideWithAManta;
		}

		if (upperPureContent.includes("RELIVE A SPIRIT'S MEMORY")) {
			return DailyQuest.ReliveASpiritsMemories;
		}

		if (upperPureContent.includes("DARK DRAGON")) {
			return DailyQuest.FaceTheDarkDragon;
		}

		if (upperPureContent.includes("KNOCK OVER 5 DARK CREATURE")) {
			return DailyQuest.KnockOver5DarkCrabs;
		}

		if (upperPureContent.includes("CATCH THE LIGHT")) {
			if (realm) {
				return CatchTheLightRealmToDailyQuest[realm];
			}

			pino.error(options, "Failed to match a catch the light realm.");
			return null;
		}

		if (
			upperPureContent.includes("SOCIAL LIGHT") ||
			upperPureContent.includes("VISIT THE ANCESTOR")
		) {
			if (skyMap && isSocialLightAreaMap(skyMap)) {
				return SocialLightAreaSkyMapToDailyQuest[skyMap];
			}

			pino.error(options, "Failed to match a social light area map.");
			return null;
		}

		if (upperPureContent.includes("SAPLING")) {
			if (realm) {
				return AdmireTheSaplingRealmToDailyQuest[realm];
			}

			pino.error(options, "Failed to match an admire the sapling realm.");
			return null;
		}

		if (upperPureContent.includes("POLLUTED GEYSER")) {
			return DailyQuest.VisitThePollutedGeyser;
		}

		if (upperPureContent.includes("GREAT VORTEX")) {
			return DailyQuest.RidTheSanctuaryVortexOfDarkness;
		}

		if (upperPureContent.includes("DAYS OF RAINBOW 2021")) {
			if (realm) {
				return FindTheCandlesAtTheEndOfTheRainbowRealmToDailyQuest[realm];
			}

			pino.error(options, "Failed to match a rainbow find realm.");
			return null;
		}

		if (upperPureContent.includes("ADMIRE THE RAINBOW")) {
			if (skyMap && isRainbowAdmireMap(skyMap)) {
				return AdmireTheRainbowSkyMapToDailyQuest[skyMap];
			}

			pino.error(options, "Failed to match a rainbow admire map.");
			return null;
		}

		if (upperPureContent.includes("MEDITATION")) {
			if (skyMap === SkyMap.Citadel) {
				if (upperPureContent.includes("ARCH")) {
					return DailyQuest.MeditateAboveTheCitadelsArch;
				}

				if (upperPureContent.includes("HIGH ABOVE")) {
					return DailyQuest.MeditateHighAboveTheCitadel;
				}
			} else if (skyMap && isMeditationMap(skyMap)) {
				return MeditateSkyMapToDailyQuest[skyMap];
			}

			pino.error(options, "Failed to match a meditation map.");
			return null;
		}

		if (upperPureContent.includes("GREEN LIGHT")) {
			return DailyQuest.CollectGreenLight;
		}

		if (upperPureContent.includes("ORANGE LIGHT")) {
			return DailyQuest.CollectOrangeLight;
		}

		if (upperPureContent.includes("BLUE LIGHT")) {
			return DailyQuest.CollectBlueLight;
		}

		// Prefix a space because "coloured light" contains red light.
		if (upperPureContent.includes(" RED LIGHT")) {
			return DailyQuest.CollectRedLight;
		}

		if (upperPureContent.includes("PURPLE LIGHT")) {
			return DailyQuest.CollectPurpleLight;
		}

		if (upperPureContent.includes("PRACTICE WITH THE SKATER")) {
			return DailyQuest.PracticeWithTheSkater;
		}

		if (upperPureContent.includes("RACE DOWN THE SLOPES")) {
			return DailyQuest.RaceDownTheSlopesWithTheSkater;
		}

		if (upperPureContent.includes("RACE DOWN THE MOUNTAIN")) {
			return DailyQuest.RaceDownTheMountainWithTheSkater;
		}

		if (upperPureContent.includes("REHEARSE FOR A PERFORMANCE")) {
			return DailyQuest.RehearseForAPerformanceWithTheSkater;
		}

		if (upperPureContent.includes("SCAVENGER HUNT")) {
			return DailyQuest.CompleteTheHoopScavengerHunt;
		}

		const sanitisedUpperPureContent = upperPureContent.replaceAll("’", "'");

		for (const spiritId of QUEST_SPIRITS) {
			if (
				sanitisedUpperPureContent.includes(
					t(`spirits.${spiritId}`, { lng: Locale.EnglishGB, ns: "general" }).toUpperCase(),
				)
			) {
				if (isQuestSpirit(spiritId)) {
					return SpiritIdToDailyQuest[spiritId];
				}

				pino.error(options, `Failed to match a spirit for ${spiritId}.`);
				return null;
			}
		}

		return null;
	}

	public async parseQuests(content: string, attachments: APIAttachment[]) {
		const { quest1, quest2, quest3, quest4 } = this;

		if (quest1 && quest2 && quest3 && quest4) {
			pino.info("Attempted to parse daily quests despite all quest variables exhausted.");
			return false;
		}

		// Remove the message link, if any.
		const pureContent =
			// biome-ignore lint/performance/useTopLevelRegex: This is fine.
			(/\n<?https?/.test(content) ? content.slice(0, content.indexOf("\n")) : content).replaceAll(
				new RegExp(FormattingPatterns.Emoji, "gi"),
				"",
			);

		// Attempt to find a realm.
		const potentialRealmRegExp =
			new RegExp(`(${regularExpressionRealms})`, "i").exec(pureContent)?.[1] ?? null;

		const realm = potentialRealmRegExp ? resolveValidRealm(potentialRealmRegExp) : null;

		// Attempt to find a map.
		const potentialMapRegExp =
			new RegExp(`\\s(${skyMapRegExp})`, "i").exec(pureContent)?.[1] ?? null;

		const skyMap = potentialMapRegExp ? resolveMap(potentialMapRegExp) : null;

		// Resolve the daily guide.
		const dailyQuest = this.resolveDailyGuide({ pureContent, realm, skyMap });

		// Log if no match.
		if (!dailyQuest) {
			pino.error(
				{ content, attachments: JSON.stringify(attachments) },
				"Failed to match a daily quest.",
			);
		}

		// Initialise the output.
		const data = dailyQuest
			? {
					id: dailyQuest,
					url: DailyQuestToInfographicURL[dailyQuest],
				}
			: null;

		// Duplicate check in case of manually updating.
		if ([quest1, quest2, quest3, quest4].some((quest) => data && quest?.id === data.id)) {
			return false;
		}

		// Update a quest variable.
		if (!quest1) {
			await this.updateQuests({ quest1: data });
			return true;
		}

		if (!quest2) {
			await this.updateQuests({ quest2: data });
			return true;
		}

		if (!quest3) {
			await this.updateQuests({ quest3: data });
			return true;
		}

		if (!quest4) {
			await this.updateQuests({ quest4: data });
			return true;
		}

		// This is needed to prevent TypeScript from stating not all code paths return a value.
		return true;
	}

	public async updateQuests(data: DailyGuidesSetQuestsData) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update(data)
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	public async updateTravellingRock(data: DailyGuidesPacket["travelling_rock"]) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ travelling_rock: data })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}
})();
