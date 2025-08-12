import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIAttachment,
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APINewsChannel,
	type APIPublicThreadChannel,
	type APITextChannel,
	type APIUser,
	ButtonStyle,
	ChannelType,
	ComponentType,
	FormattingPatterns,
	type GatewayMessageCreateDispatchData,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
	SelectMenuDefaultValueType,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	type DailyGuidesPacket,
	DailyQuest,
	type DailyQuests,
	formatEmoji,
	formatEmojiURL,
	isDailyQuest,
	REALM_NAME_VALUES,
	RealmName,
	RotationIdentifier,
	resolveCurrencyEmoji,
	SkyMap,
	SpiritId,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
	Table,
	TIME_ZONE,
	treasureCandles,
	type ValidRealmName,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { hash } from "hasha";
import { t } from "i18next";
import type { DateTime } from "luxon";
import pQueue from "p-queue";
import sharp from "sharp";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pg from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import {
	APPLICATION_ID,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	DAILY_INFOGRAPHICS_CHANNEL_ID,
	INFOGRAPHICS_DATABASE_GUILD_ID,
	MAXIMUM_CONCURRENCY_LIMIT,
	SUPPORT_SERVER_GUILD_ID,
} from "../utility/configuration.js";
import {
	CDN_BUCKET,
	CDN_URL,
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_REORDER_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_URL,
	DailyQuestToInfographicURL,
	DEFAULT_EMBED_COLOUR,
	inconsistentMapKeys,
	LOCALE_OPTIONS,
	type MeditationMaps,
	NOT_IN_CACHED_GUILD_RESPONSE,
	type RainbowAdmireMaps,
	type SocialLightAreaMaps,
} from "../utility/constants.js";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import {
	isMeditationMap,
	isRainbowAdmireMap,
	isSocialLightAreaMap,
	resolveMap,
	resolveValidRealm,
	userTag,
} from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import {
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";
import { QUEST_SPIRITS, type QuestSpirits } from "../utility/spirits.js";

type DailyGuidesSetData = Partial<DailyGuidesPacket> &
	Required<Pick<DailyGuidesPacket, "last_updated_user_id" | "last_updated_at">>;

export interface DailyGuidesDistributionPacket {
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

type DailyGuidesDistributionAllowedChannel =
	| Extract<
			// We use our own thread.
			Exclude<APIChannel, APIPublicThreadChannel>,
			{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
	  >
	| PublicThread;

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

const updateQueue = new pQueue({ concurrency: 1 });
const distributeQueue = new pQueue({ concurrency: MAXIMUM_CONCURRENCY_LIMIT });
export const DAILY_GUIDES_SETUP_CUSTOM_ID = "DAILY_GUIDES_SETUP_CUSTOM_ID" as const;

export async function fetchDailyGuides() {
	const dailyQuests = await pg<DailyGuidesPacket>(Table.DailyGuides).first();

	if (dailyQuests) {
		return dailyQuests;
	}

	// Use column defaults.
	const [insertedDailyQuests] = await pg<DailyGuidesPacket>(Table.DailyGuides)
		.insert({})
		.returning("*");

	return insertedDailyQuests!;
}

export async function resetDailyGuides() {
	await pg<DailyGuidesPacket>(Table.DailyGuides).truncate();
	await pg<DailyGuidesPacket>(Table.DailyGuides).insert({});
}

export function validToParse(message: GatewayMessageCreateDispatchData) {
	return Boolean(
		message.channel_id === DAILY_INFOGRAPHICS_CHANNEL_ID &&
			message.message_reference?.guild_id === INFOGRAPHICS_DATABASE_GUILD_ID &&
			message.flags &&
			(message.flags & MessageFlags.IsCrosspost) === MessageFlags.IsCrosspost &&
			message.message_reference.message_id &&
			DiscordSnowflake.timestampFrom(message.message_reference.message_id) >= skyToday().toMillis(),
	);
}

export async function parseDailyQuest(message: GatewayMessageCreateDispatchData) {
	const { id, attachments, content } = message;
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

	const parsed = await updateQueue.add(async () => {
		let parsed = false;

		if (
			transformedContent.includes("QUEST") ||
			transformedContent.includes("RAINBOW") ||
			transformedContent.includes("SOCIAL LIGHT") ||
			transformedContent.includes("SAPLING") ||
			transformedContent.includes("NATURE")
		) {
			parsed = await parseQuests(id, content, attachments);
		} else {
			pino.warn(message, "Intercepted an unparsed message.");
		}

		return parsed;
	});

	if (parsed && updateQueue.pending === 0 && updateQueue.size === 0) {
		updateQueue.pause();

		await distribute({
			lastUpdatedUserId: APPLICATION_ID,
			lastUpdatedAt: new Date(DiscordSnowflake.timestampFrom(id)),
		});

		updateQueue.start();
	}
}

interface ResolveDailyGuideOptions {
	pureContent: string;
	realm: ValidRealmName | null;
	skyMap: SkyMap | null;
}

function resolveDailyGuide(options: ResolveDailyGuideOptions) {
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

	if (upperPureContent.includes("RIDE A MANTA") || upperPureContent.includes("RIDE WITH A MANTA")) {
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
			return SpiritIdToDailyQuest[spiritId];
		}
	}

	return null;
}

async function parseQuests(id: Snowflake, content: string, attachments: APIAttachment[]) {
	const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides();

	if (
		await pg<DailyGuidesPacket>(Table.DailyGuides)
			.where("quest1", "<>", null)
			.andWhere("quest2", "<>", null)
			.andWhere("quest3", "<>", null)
			.andWhere("quest4", "<>", null)
			.first()
	) {
		pino.info("Attempted to parse daily quests despite all quest variables exhausted.");
		return false;
	}

	// Remove the message link, if any.
	const pureContent = (
		/\n<?https?/.test(content) ? content.slice(0, content.indexOf("\n")) : content
	).replaceAll(new RegExp(FormattingPatterns.Emoji, "gi"), "");

	// Attempt to find a realm.
	const potentialRealmRegExp =
		new RegExp(`(${regularExpressionRealms})`, "i").exec(pureContent)?.[1] ?? null;

	const realm = potentialRealmRegExp ? resolveValidRealm(potentialRealmRegExp) : null;

	// Attempt to find a map.
	const potentialMapRegExp = new RegExp(`\\s(${skyMapRegExp})`, "i").exec(pureContent)?.[1] ?? null;

	const skyMap = potentialMapRegExp ? resolveMap(potentialMapRegExp) : null;

	// Resolve the daily guide.
	const dailyQuest = resolveDailyGuide({ pureContent, realm, skyMap });

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
		await updateDailyGuides({
			quest1: data,
			last_updated_user_id: APPLICATION_ID,
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(id)),
		});

		return true;
	}

	if (!quest2) {
		await updateDailyGuides({
			quest2: data,
			last_updated_user_id: APPLICATION_ID,
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(id)),
		});

		return true;
	}

	if (!quest3) {
		await updateDailyGuides({
			quest3: data,
			last_updated_user_id: APPLICATION_ID,
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(id)),
		});

		return true;
	}

	if (!quest4) {
		await updateDailyGuides({
			quest4: data,
			last_updated_user_id: APPLICATION_ID,
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(id)),
		});

		return true;
	}

	// This is needed to prevent TypeScript from stating not all code paths return a value.
	return true;
}

async function updateDailyGuides(data: DailyGuidesSetData) {
	await pg<DailyGuidesPacket>(Table.DailyGuides).update(data);
}

export function isDailyGuidesDistributionChannel(
	channel: APIChannel | AnnouncementThread | PublicThread | PrivateThread,
): channel is DailyGuidesDistributionAllowedChannel {
	return DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES.includes(
		channel.type as (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number],
	);
}

export function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

export function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

export function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (me.isCommunicationDisabled()) {
		errors.push("I am timed out.");
	}

	const isThread = channel.type === ChannelType.PublicThread;
	let resolvedChannelForPermission: APITextChannel | APINewsChannel | GuildChannel;

	if (isThread) {
		if (channel.threadMetadata?.archived) {
			errors.push("The thread is archived.");
		}

		const parentChannel = guild.channels.get(channel.parentId);

		if (!parentChannel) {
			pino.warn(channel, `Could not resolve a daily guides thread's parent channel.`);

			// Early exit.
			return returnErrors
				? errors.length > 1
					? errors.map((error) => `- ${error}`)
					: errors
				: errors.length === 0;
		}

		resolvedChannelForPermission = parentChannel;

		if (
			resolvedChannelForPermission &&
			!can({
				permission: PermissionFlagsBits.ManageThreads,
				guild,
				member: me,
				channel: resolvedChannelForPermission,
			}) &&
			channel.threadMetadata?.locked
		) {
			errors.push("The thread is locked.");
		}
	} else {
		resolvedChannelForPermission = channel;
	}

	const permissions =
		PermissionFlagsBits.ViewChannel |
		(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) |
		PermissionFlagsBits.EmbedLinks;

	if (!can({ permission: permissions, guild, member: me, channel: resolvedChannelForPermission })) {
		errors.push(
			`\`View Channel\` & \`${
				isThread ? "Send Messages in Threads" : "Send Messages"
			}\` & \`Embed Links\` are required for <#${channel.id}>.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

interface DailyGuidesSetupOptions {
	guildId: Snowflake;
	channelId: Snowflake | null;
}

export async function setup({ guildId, channelId }: DailyGuidesSetupOptions) {
	const dailyGuidesDistributionPacket = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.where({ guild_id: guildId })
		.first();

	let shouldSend = false;

	if (dailyGuidesDistributionPacket) {
		// biome-ignore lint/suspicious/noImplicitAnyLet: Effort.
		let updateData;

		if (dailyGuidesDistributionPacket.channel_id === channelId) {
			updateData = { channel_id: channelId };
		} else {
			// Delete the existing message, if present.
			if (dailyGuidesDistributionPacket.channel_id && dailyGuidesDistributionPacket.message_id) {
				await client.api.channels
					.deleteMessage(
						dailyGuidesDistributionPacket.channel_id,
						dailyGuidesDistributionPacket.message_id,
					)
					.catch(() => null);
			}

			updateData = { channel_id: channelId, message_id: null };
			shouldSend = Boolean(channelId);
		}

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.update(updateData)
			.where({ guild_id: guildId })
			.returning("*");
	} else {
		shouldSend = Boolean(channelId);

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).insert(
			{ guild_id: guildId, channel_id: channelId, message_id: null },
			"*",
		);
	}

	if (shouldSend) {
		await send(false, { guildId, channelId, messageId: null });
	}
}

export async function setupResponse(guild: Guild): Promise<APIInteractionResponseCallbackData> {
	const dailyGuidesDistributionPacket = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.select("channel_id")
		.where({ guild_id: guild.id })
		.first();

	const channelId = dailyGuidesDistributionPacket?.channel_id;
	const channel = channelId ? guild.channels.get(channelId) : null;
	const feedback = [];

	if (channel) {
		if (isDailyGuidesDistributionChannel(channel)) {
			feedback.push(...isDailyGuidesDistributable(guild, channel, await guild.fetchMe(), true));
		} else {
			feedback.push("No channel detected. Was it deleted?");
		}
	} else {
		feedback.push("No channel selected.");
	}

	return {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## [Daily guides](${new URL("caelus/daily-guides", WEBSITE_URL)})`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content:
							"You may choose a channel to receive daily guides in! Use the select menu below to select a channel.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: DAILY_GUIDES_SETUP_CUSTOM_ID,
								// @ts-expect-error The mutable array error is fine.
								channel_types: DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
								default_values: channelId
									? [{ id: channelId, type: SelectMenuDefaultValueType.Channel }]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: "Select a channel to use for daily guides.",
							},
						],
					},
					{
						type: ComponentType.TextDisplay,
						content:
							feedback.length > 0
								? `Stopped ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}\n${feedback.join("\n")}`
								: `Sending ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`,
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);
		return;
	}

	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId);

		if (!(channel && isDailyGuidesDistributionChannel(channel))) {
			throw new Error("Received an unknown channel type whilst setting up daily guides.");
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable(
			guild,
			channel,
			await guild.fetchMe(),
			true,
		);

		if (dailyGuidesDistributable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: dailyGuidesDistributable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	await setup({ guildId: interaction.guild_id, channelId: channelId ?? null });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild),
	);
}

export async function resetDailyGuidesDistribution() {
	await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).update({
		message_id: null,
	});
}

export async function deleteDailyGuidesDistribution(guildId: Snowflake) {
	await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
		.delete()
		.where({ guild_id: guildId });
}

interface DailyGuidesSendOptions {
	guildId: DailyGuidesDistributionPacket["guild_id"];
	channelId: DailyGuidesDistributionPacket["channel_id"];
	messageId: DailyGuidesDistributionPacket["message_id"];
}

async function send(
	enforceNonce: boolean,
	{ guildId, channelId, messageId }: DailyGuidesSendOptions,
) {
	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as the guild was not cached.`,
		);

		return;
	}

	const channel = guild.channels.get(channelId!) ?? guild.threads.get(channelId!);

	if (!channel) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it had no detectable channel id ${channelId}.`,
		);

		return;
	}

	if (!isDailyGuidesDistributionChannel(channel)) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it did not satisfy the allowed channel types.`,
		);

		return;
	}

	const me = await guild.fetchMe();

	if (!isDailyGuidesDistributable(guild, channel, me)) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it did not have suitable permissions in channel id ${channelId}.`,
		);

		return;
	}

	// Retrieve our data.
	const components = await distributionData(guild.preferredLocale);

	// Update the embed if a message exists.
	if (messageId) {
		return client.api.channels.editMessage(channelId!, messageId, { components });
	}

	// There is no existing message. Send one.
	const { id } = await client.api.channels.createMessage(channelId!, {
		components,
		enforce_nonce: enforceNonce,
		flags: MessageFlags.IsComponentsV2,
		nonce: guildId,
	});

	const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.update({ message_id: id })
		.where({ guild_id: guildId })
		.returning("*");

	return newDailyGuidesDistributionPacket;
}

function dailyGuidesEventData(date: DateTime, locale: Locale) {
	const events = skyCurrentEvents(date);

	const eventEndText = skyNotEndedEvents(date).map(({ id, start, end }) => {
		const daysUntilStart = start.diff(date, "days").days;
		const eventTicketEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			return `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${
				daysUntilStart < 1
					? `${t(`events.${id}`, { lng: locale, ns: "general" })} starts today.`
					: daysUntilStart >= 2
						? `${t(`events.${id}`, { lng: locale, ns: "general" })} starts in ${Math.floor(daysUntilStart)} days.`
						: `${t(`events.${id}`, { lng: locale, ns: "general" })} starts tomorrow.`
			}`;
		}

		return `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("days-left.event", {
			lng: locale,
			ns: "general",
			count: Math.ceil(end.diff(date, "days").days) - 1,
			name: t(`events.${id}`, { lng: locale, ns: "general" }),
		})}`;
	});

	const event1 = events.first();
	let iconURL = null;

	if (event1) {
		const eventTicketEmoji = EventIdToEventTicketEmoji[event1.id];

		if (eventTicketEmoji) {
			iconURL = formatEmojiURL(eventTicketEmoji.id);
		}
	}

	const currentEventsWithEventTickets = events.filter(
		(event) =>
			event.eventTickets &&
			date < event.eventTickets.end &&
			event.resolveInfographicURL(date) !== null,
	);

	const eventTickets =
		currentEventsWithEventTickets.size > 0
			? currentEventsWithEventTickets
					.map((event) => {
						const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

						return `[${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("view", {
							lng: locale,
							ns: "general",
						})}](${event.resolveInfographicURL(date)!} "${t(`events.${event.id}`, { lng: locale, ns: "general" })}")`;
					})
					.join(" | ")
			: null;

	return { eventEndText, iconURL, eventTickets };
}

export async function distributionData(locale: Locale): Promise<[APIMessageTopLevelComponent]> {
	const today = skyToday();
	const now = skyNow();

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(now.toMillis())}](${DAILY_GUIDES_URL})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const {
		quest1,
		quest2,
		quest3,
		quest4,
		travelling_rock: travellingRock,
	} = await fetchDailyGuides();
	const quests = [quest1, quest2, quest3, quest4].filter((quest) => quest !== null);

	if (quests.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.quests-heading", { lng: locale, ns: "features" })}\n${quests
				.map(
					({ id, url }, index) =>
						`${index + 1}. ${url ? `[${t(`quests.${id}`, { lng: locale, ns: "general" })}](${url})` : t(`quests.${id}`, { lng: locale, ns: "general" })}`,
				)
				.join("\n")}`,
		});
	}

	const treasureCandleURLs = treasureCandles(today);

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `### ${t("daily-guides.treasure-candles", { lng: locale, ns: "features" })}\n${
			treasureCandleURLs.length === 1
				? `[${t("view", { lng: locale, ns: "general" })}](${treasureCandleURLs[0]})`
				: treasureCandleURLs
						.map(
							(treasureCandleURL, index) =>
								`[${index * 4 + 1}–${index * 4 + 4}](${treasureCandleURL})`,
						)
						.join(" | ")
		}`,
	});

	const season = skyCurrentSeason(today);
	const footerText = [];

	if (season) {
		const seasonalCandlesRotation = season.resolveSeasonalCandlesRotation(today);
		const values = [];
		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		footerText.push(
			`${seasonEmoji ? `${formatEmoji(seasonEmoji)} ` : ""}${t("days-left.season", {
				lng: locale,
				ns: "general",
				count: Math.ceil(season.end.diff(now, "days").days) - 1,
			})}`,
		);

		if (seasonalCandlesRotation) {
			const { rotation, realm } = seasonalCandlesRotation;
			let rotationIdentifier: RotationIdentifier = rotation;

			if (season.isDuringDoubleSeasonalLightEvent(today)) {
				rotationIdentifier = RotationIdentifier.Double;
			}

			const url = season.seasonalCandlesRotationURL(realm, rotationIdentifier);
			values.push(`[${t("view", { lng: locale, ns: "general" })}](${url})`);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		const candleEmoji = SeasonIdToSeasonalCandleEmoji[season.id];

		values.push(
			t("daily-guides.seasonal-candles-remain", {
				lng: locale,
				ns: "features",
				remaining: resolveCurrencyEmoji({ emoji: candleEmoji, number: seasonalCandlesLeft }),
				remainingSeasonPass: resolveCurrencyEmoji({
					emoji: candleEmoji,
					number: seasonalCandlesLeftWithSeasonPass,
				}),
			}),
		);

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.seasonal-candles", { lng: locale, ns: "features" })}\n${values.join("\n")}`,
		});
	} else {
		const next = skyUpcomingSeason(today);

		if (next) {
			const daysUntilStart = next.start.diff(today, "days").days;
			const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

			footerText.push(
				`${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${t("daily-guides.season-upcoming", { lng: locale, ns: "features", count: daysUntilStart })}`,
			);
		}
	}

	const eventData = dailyGuidesEventData(today, locale);
	footerText.push(...eventData.eventEndText);

	if (eventData.eventTickets) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("event-tickets", { lng: locale, ns: "general" })}\n${eventData.eventTickets}`,
		});
	}

	const shard = shardEruption();

	if (shard) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n${shardEruptionInformationString(shard, true, locale)}\n${shardEruptionTimestampsString(shard)}`,
		});
	} else {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n${t("daily-guides.shard-eruption-none", { lng: locale, ns: "features" })}`,
		});
	}

	if (travellingRock) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}\n[${t("view", { lng: locale, ns: "general" })}](${String(new URL(`daily_guides/travelling_rocks/${travellingRock}.webp`, CDN_URL))})`,
		});
	}

	if (footerText.length > 0) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content: footerText.map((text) => `-# ${text}`).join("\n"),
			},
		);
	}

	return [{ type: ComponentType.Container, components: containerComponents }];
}

interface DailyGuidesDistributionOptions {
	lastUpdatedUserId: Snowflake | null;
	lastUpdatedAt: Date;
}

export async function distribute({
	lastUpdatedUserId,
	lastUpdatedAt,
}: DailyGuidesDistributionOptions) {
	await updateDailyGuides({
		last_updated_user_id: lastUpdatedUserId,
		last_updated_at: lastUpdatedAt,
	});

	const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).whereNotNull("channel_id");

	const settled = await Promise.allSettled(
		dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) =>
			distributeQueue.add(async () =>
				send(true, {
					guildId: dailyGuidesDistributionPacket.guild_id,
					channelId: dailyGuidesDistributionPacket.channel_id,
					messageId: dailyGuidesDistributionPacket.message_id,
				}),
			),
		),
	);

	const knownErrors: unknown[] = [];

	const errors = settled
		.filter((result): result is PromiseRejectedResult => result.status === "rejected")
		.map((result) => result.reason)
		.filter((error) => {
			if (
				error instanceof DiscordAPIError &&
				error.code === RESTJSONErrorCodes.UnknownMessage &&
				error.method === "PATCH"
			) {
				// It is likely that the message was deleted prior to editing.
				knownErrors.push(error);
				return false;
			}

			return true;
		});

	if (errors.length > 0) {
		pino.error(errors, "Error whilst distributing daily guides.");
	}

	if (knownErrors.length > 0) {
		pino.info(knownErrors, "Known errors whilst distributing daily guides.");
	}
}

export const enum InteractiveType {
	Reorder = 0,
	Distributing = 1,
	Distributed = 2,
	Locale = 3,
	Uploading = 4,
}

interface InteractiveOptions {
	type?: InteractiveType;
	locale: Locale;
}

export async function interactive(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	{ type, locale }: InteractiveOptions,
) {
	const {
		quest1,
		quest2,
		quest3,
		quest4,
		last_updated_at: lastUpdatedAt,
		last_updated_user_id: lastUpdatedUserId,
	} = await fetchDailyGuides();
	const quests = [quest1, quest2, quest3, quest4];
	const questOptions = [];

	for (const quest of quests) {
		if (!quest) {
			continue;
		}

		questOptions.push({
			label: t(`quests.${quest.id}`, { lng: locale, ns: "general" }),
			value: quest.id.toString(),
		});
	}

	const containerComponents: APIComponentInContainer[] = [];

	const components: APIMessageTopLevelComponent[] = [
		...(await distributionData(locale)),
		{
			type: ComponentType.Container,
			components: containerComponents,
		},
	];

	let message: string;

	switch (type) {
		case InteractiveType.Reorder:
			message = "Quests reordered!";
			break;
		case InteractiveType.Distributing:
			message = "Distributing...";
			break;
		case InteractiveType.Distributed:
			message = "Distributed daily guides!";
			break;
		default:
			message = "What would you like to do?";
			break;
	}

	containerComponents.push({ type: ComponentType.TextDisplay, content: message });

	if (questOptions.length > 1) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: DAILY_GUIDES_QUESTS_REORDER_SELECT_MENU_CUSTOM_ID,
					max_values: questOptions.length,
					min_values: questOptions.length,
					options: questOptions,
					placeholder: "Reorder quests.",
				},
			],
		});
	}

	containerComponents.push(
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: DAILY_GUIDES_LOCALE_CUSTOM_ID,
					max_values: 1,
					min_values: 1,
					options: LOCALE_OPTIONS,
					placeholder: "View in a locale.",
				},
			],
		},
		{
			type: ComponentType.TextDisplay,
			content: lastUpdatedUserId
				? `-# Last updated by <@${lastUpdatedUserId}> <t:${Math.floor(lastUpdatedAt.getTime() / 1000)}:R>.`
				: `-# Last updated <t:${Math.floor(lastUpdatedAt.getTime() / 1000)}:R>.`,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Success,
					custom_id: DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
					label: "Distribute",
					disabled: type === InteractiveType.Distributing,
				},
			],
		},
	);

	const response: APIInteractionResponseCallbackData = {
		allowed_mentions: { parse: [] },
		components,
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (type === InteractiveType.Distributed || type === InteractiveType.Uploading) {
		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, response);
		return;
	}

	if (
		type === InteractiveType.Reorder ||
		type === InteractiveType.Distributing ||
		type === InteractiveType.Locale
	) {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, response);
}

interface LogModificationOptions {
	user: APIUser;
	content: string;
}

async function logModification({ user, content }: LogModificationOptions) {
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error("Could not find the support server whilst logging a daily guides modification.");
		return;
	}

	const channel = guild.channels.get(DAILY_GUIDES_LOG_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		pino.error("Could not find the daily guides log channel.");
		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error("Missing permissions to post in the daily guides log channel.");
		return;
	}

	await client.api.channels.createMessage(channel.id, {
		allowed_mentions: { parse: [] },
		content: `<@${user.id}> (${userTag(user)}) ${content}`,
		flags: MessageFlags.SuppressEmbeds,
	});
}

export async function handleDistributeButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;
	await interactive(interaction, { type: InteractiveType.Distributing, locale });
	await logModification({ user: interaction.member.user, content: "distributed daily guides." });

	await distribute({
		lastUpdatedUserId: interaction.member.user.id,
		lastUpdatedAt: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	});

	await interactive(interaction, { type: InteractiveType.Distributed, locale });
}

export async function set(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const { locale } = interaction;

	if (options.hoistedOptions.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "At least one option must be specified.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const interactiveOptions: InteractiveOptions = { locale };
	const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides();
	const oldQuest1 = quest1?.id;
	const oldQuest2 = quest2?.id;
	const oldQuest3 = quest3?.id;
	const oldQuest4 = quest4?.id;
	const newQuest1 = options.getInteger("quest-1") ?? oldQuest1;
	const newQuest2 = options.getInteger("quest-2") ?? oldQuest2;
	const newQuest3 = options.getInteger("quest-3") ?? oldQuest3;
	const newQuest4 = options.getInteger("quest-4") ?? oldQuest4;
	const travellingRock = options.getAttachment("travelling-rock");

	const url1 =
		options.getString("url-1") ??
		(newQuest1 !== undefined && isDailyQuest(newQuest1)
			? DailyQuestToInfographicURL[newQuest1]
			: null);

	const url2 =
		options.getString("url-2") ??
		(newQuest2 !== undefined && isDailyQuest(newQuest2)
			? DailyQuestToInfographicURL[newQuest2]
			: null);

	const url3 =
		options.getString("url-3") ??
		(newQuest3 !== undefined && isDailyQuest(newQuest3)
			? DailyQuestToInfographicURL[newQuest3]
			: null);

	const url4 =
		options.getString("url-4") ??
		(newQuest4 !== undefined && isDailyQuest(newQuest4)
			? DailyQuestToInfographicURL[newQuest4]
			: null);

	const oldQuests = {
		quest1: oldQuest1 === undefined ? null : t(`quests.${oldQuest1}`, { ns: "general" }),
		quest2: oldQuest2 === undefined ? null : t(`quests.${oldQuest2}`, { ns: "general" }),
		quest3: oldQuest3 === undefined ? null : t(`quests.${oldQuest3}`, { ns: "general" }),
		quest4: oldQuest4 === undefined ? null : t(`quests.${oldQuest4}`, { ns: "general" }),
	};

	const newQuests = {
		quest1: newQuest1 === undefined ? null : t(`quests.${newQuest1}`, { ns: "general" }),
		quest2: newQuest2 === undefined ? null : t(`quests.${newQuest2}`, { ns: "general" }),
		quest3: newQuest3 === undefined ? null : t(`quests.${newQuest3}`, { ns: "general" }),
		quest4: newQuest4 === undefined ? null : t(`quests.${newQuest4}`, { ns: "general" }),
	};

	let logMessage = `set daily guides.\nOld:\n\`\`\`JSON\n${JSON.stringify(oldQuests)}\n\`\`\`\nNew:\n\`\`\`JSON\n${JSON.stringify(newQuests)}\n\`\`\``;

	const data: DailyGuidesSetData = {
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	};

	if (travellingRock) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: MessageFlags.Ephemeral,
		});

		interactiveOptions.type = InteractiveType.Uploading;
		const fetchedURL = await fetch(travellingRock.url);

		const buffer = await sharp(await fetchedURL.arrayBuffer())
			.webp()
			.toBuffer();

		const hashedBuffer = await hash(buffer, { algorithm: "md5" });

		await S3Client.send(
			new PutObjectCommand({
				Bucket: CDN_BUCKET,
				Key: `daily_guides/travelling_rocks/${hashedBuffer}.webp`,
				Body: buffer,
				ContentDisposition: "inline",
				ContentType: fetchedURL.headers.get("content-type")!,
			}),
		);

		logMessage += `\nTravelling rock is now:\n${new URL(`daily_guides/travelling_rocks/${hashedBuffer}.webp`, CDN_URL)}`;
		data.travelling_rock = hashedBuffer;
	}

	data.quest1 = newQuest1 === undefined ? null : { id: newQuest1, url: url1 };
	data.quest2 = newQuest2 === undefined ? null : { id: newQuest2, url: url2 };
	data.quest3 = newQuest3 === undefined ? null : { id: newQuest3, url: url3 };
	data.quest4 = newQuest4 === undefined ? null : { id: newQuest4, url: url4 };
	await logModification({ user: interaction.member.user, content: logMessage });
	await updateDailyGuides(data);
	await interactive(interaction, interactiveOptions);
}

export async function questsReorder(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const {
		locale,
		data: { values },
	} = interaction;

	const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides();
	const newQuest1 = Number(values[0]);
	const newQuest2 = Number(values[1]);
	const newQuest3 = values[2] === undefined ? null : Number(values[2]);
	const newQuest4 = values[3] === undefined ? null : Number(values[3]);

	const data: DailyGuidesSetData = {
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	};

	if (isDailyQuest(newQuest1)) {
		data.quest1 = { id: newQuest1, url: DailyQuestToInfographicURL[newQuest1] };
	}

	if (isDailyQuest(newQuest2)) {
		data.quest2 = { id: newQuest2, url: DailyQuestToInfographicURL[newQuest2] };
	}

	if (newQuest3 !== null && isDailyQuest(newQuest3)) {
		data.quest3 = { id: newQuest3, url: DailyQuestToInfographicURL[newQuest3] };
	}

	if (newQuest4 !== null && isDailyQuest(newQuest4)) {
		data.quest4 = { id: newQuest4, url: DailyQuestToInfographicURL[newQuest4] };
	}

	const oldQuests = {
		quest1: quest1?.id === undefined ? null : t(`quests.${quest1.id}`, { ns: "general" }),
		quest2: quest2?.id === undefined ? null : t(`quests.${quest2.id}`, { ns: "general" }),
		quest3: quest3?.id === undefined ? null : t(`quests.${quest3.id}`, { ns: "general" }),
		quest4: quest4?.id === undefined ? null : t(`quests.${quest4.id}`, { ns: "general" }),
	};

	const newQuests = {
		quest1: t(`quests.${newQuest1}`, { ns: "general" }),
		quest2: t(`quests.${newQuest2}`, { ns: "general" }),
		quest3: newQuest3 === null ? null : t(`quests.${newQuest3}`, { ns: "general" }),
		quest4: newQuest4 === null ? null : t(`quests.${newQuest4}`, { ns: "general" }),
	};

	await logModification({
		user: interaction.member.user,
		content: `reordered daily quests.\nOld:\n\`\`\`JSON\n${JSON.stringify(oldQuests)}\n\`\`\`\nNew:\n\`\`\`JSON\n${JSON.stringify(newQuests)}\n\`\`\``,
	});

	await updateDailyGuides(data);
	await interactive(interaction, { type: InteractiveType.Reorder, locale });
}
