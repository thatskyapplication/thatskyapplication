import process from "node:process";
import { URL } from "node:url";
import { ChannelType, Locale, MessageFlags, type Snowflake } from "@discordjs/core";
import {
	DailyQuest,
	type DailyQuests,
	RealmName,
	SkyMap,
	WEBSITE_URL,
} from "@thatskyapplication/utility";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(
		process.env.DISCORD_TOKEN &&
		process.env.DATABASE_URL &&
		process.env.OPENAI_API_KEY &&
		process.env.OPENAI_BASE_URL &&
		process.env.AI_GATEWAY_TOKEN &&
		process.env.S3_ACCESS_KEY_ID &&
		process.env.S3_ACCOUNT_ID &&
		process.env.S3_SECRET_ACCESS_KEY &&
		process.env.SKY_PROFILE_REPORTS_CHANNEL_ID &&
		process.env.WIND_PATHS_URL
	) ||
	(PRODUCTION && !(process.env.BETTER_STACK_TOKEN && process.env.FLIGHT_CHECK))
) {
	throw new Error("Missing environment variables.");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
export const AI_GATEWAY_TOKEN = process.env.AI_GATEWAY_TOKEN;
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
export const S3_ACCOUNT_ID = process.env.S3_ACCOUNT_ID;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
export const SKY_PROFILE_REPORTS_CHANNEL_ID = process.env.SKY_PROFILE_REPORTS_CHANNEL_ID;
export const WIND_PATHS_URL = process.env.WIND_PATHS_URL;
export const BETTER_STACK_TOKEN = process.env.BETTER_STACK_TOKEN;
export const FLIGHT_CHECK = process.env.FLIGHT_CHECK;

// Application ids.
const APPLICATION_ID_DEVELOPMENT = "1071822091814441000" as const;
const APPLICATION_ID_PRODUCTION = "982740693070012506" as const;
export const APPLICATION_ID = PRODUCTION ? APPLICATION_ID_PRODUCTION : APPLICATION_ID_DEVELOPMENT;

// Content delivery network buckets.
const CDN_BUCKET_DEVELOPMENT = "thatskyapplication-dev" as const;
const CDN_BUCKET_PRODUCTION = "thatskyapplication" as const;
export const CDN_BUCKET = PRODUCTION ? CDN_BUCKET_PRODUCTION : CDN_BUCKET_DEVELOPMENT;

// Content delivery network links.
const CDN_URL_DEVELOPMENT = "https://cdn-development.thatskyapplication.com" as const;
const CDN_URL_PRODUCTION = "https://cdn.thatskyapplication.com" as const;
export const CDN_URL = PRODUCTION ? CDN_URL_PRODUCTION : CDN_URL_DEVELOPMENT;

// Guild ids.
const DEVELOPER_GUILD_ID_PRODUCTION = "1017993798170726411" as const;
const DEVELOPER_GUILD_ID_DEVELOPMENT = "1260971646584619109" as const;

export const DEVELOPER_GUILD_ID = PRODUCTION
	? DEVELOPER_GUILD_ID_PRODUCTION
	: DEVELOPER_GUILD_ID_DEVELOPMENT;

export const SKY_CREATOR_TROUPE_GUILD_IDS = [
	"796292367212609556", // Evinsky.
	"1161438354244640838", // Moon.
] as const;

// Channel ids.
export const DAILY_INFOGRAPHICS_CHANNEL_ID = "1041420071614042152" as const;
export const MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID = "1131896865378549832" as const;

// Concurrency limit to not hit the global rate limit of 50 requests per second.
export const MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT = 45 as const;

// Maximum GIF numbers.
export const MAX_HAIR_TOUSLE_NO = 3 as const;
export const MAX_HIGH_FIVE_NO = 8 as const;
export const MAX_HUG_NO = 36 as const;
export const MAX_PLAY_FIGHT_NO = 6 as const;
export const MAX_KRILL_NO = 11 as const;

// Website URLs.
export const APPLICATION_INVITE_URL = String(new URL("invite", WEBSITE_URL));
export const SUPPORT_SERVER_INVITE_URL = String(new URL("support", WEBSITE_URL));
export const CONTENT_CREATORS_URL = String(new URL("content-creators", WEBSITE_URL));
export const DAILY_GUIDES_URL = String(new URL("daily-guides", WEBSITE_URL));
export const SHARD_ERUPTION_URL = String(new URL("shard-eruption", WEBSITE_URL));
export const LINK_REDIRECTOR_URL = "https://thatsky.link" as const;

// SKU ids.
const SERVER_UPGRADE_SKU_ID_DEVELOPMENT = "1270975828481806428" as const;
const SERVER_UPGRADE_SKU_ID_PRODUCTION = "1270871254316089515" as const;

export const SERVER_UPGRADE_SKU_ID = PRODUCTION
	? SERVER_UPGRADE_SKU_ID_PRODUCTION
	: SERVER_UPGRADE_SKU_ID_DEVELOPMENT;

// Error response.
export const ERROR_RESPONSE = {
	content: `Oh no, that wasn't supposed to happen!\n\nFeel free to join our [support server](${SUPPORT_SERVER_INVITE_URL}) and report this issue! 🩵`,
	components: [],
	embeds: [],
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
};

// Not in cached guild response.
export const NOT_IN_CACHED_GUILD_RESPONSE = {
	content: `This command requires me to be present in the server. [Invite me](${APPLICATION_INVITE_URL}) with the bot scope and try again!\nIf you need help, join the [support server](${SUPPORT_SERVER_INVITE_URL})!`,
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
} as const;

// Quest numbers.
export const QUEST_NUMBER = [1, 2, 3, 4] as const;

// Sky Creator Troupe user ids.
export const SKY_CREATOR_TROUPE_USER_IDS = new Set<Snowflake>([
	"128298536726036480", // Maelstrom.
	"290337478898876417", // Nastymold.
	"588847442313609216", // Sterling Ivy.
	"713002852909449236", // Evinsky.
	"833943628502138940", // Moon.
]);

// Miscellaneous constants.
const THATSKYGAME_URL = "https://thatskygame.com" as const;
const GITHUB_SPONSORS_URL = "https://github.com/sponsors/thatskyapplication" as const;
const PATREON_URL = "https://patreon.com/Jiralite" as const;
const KO_FI_URL = "https://ko-fi.com/jiralite" as const;
export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = 244 as const;
export const ASCENDED_CANDLES_PER_WEEK = 15.75 as const;
export const INFOGRAPHICS_DATABASE_GUILD_ID = "736912435654688868" as const;
export const ISS_DATES_ACCESSIBLE = [6, 14, 22, 30] as const;
export const DEFAULT_EMBED_COLOUR = 0x6f68c9 as const;
export const ANIMATED_HASH_PREFIX = "a_" as const;
export const MAXIMUM_ASSET_SIZE = 5_000_000 as const;
export const REALM_NAME_VALUES = Object.values(RealmName);
export const SKY_MAP_VALUES = Object.values(SkyMap);

export const MEDITATION_MAPS = [
	SkyMap.BirdNest,
	SkyMap.ButterflyFields,
	SkyMap.SanctuaryIslands,
	SkyMap.Cave,
	SkyMap.KoiPond,
	SkyMap.ForestClearing,
	SkyMap.ForestBrook,
	SkyMap.ElevatedClearing,
	SkyMap.ForestEnd,
	SkyMap.Boneyard,
	SkyMap.IceRink,
	SkyMap.Citadel,
	SkyMap.Coliseum,
	SkyMap.BrokenTemple,
	SkyMap.ForgottenArk,
	SkyMap.Graveyard,
	SkyMap.Boat,
	SkyMap.Battlefield,
	SkyMap.VaultEntrance,
	SkyMap.VaultSecondFloor,
	SkyMap.VaultSummit,
] as const;

export type MeditationMaps = (typeof MEDITATION_MAPS)[number];

export const SOCIAL_LIGHT_AREA_MAPS = [
	SkyMap.Cave,
	SkyMap.ElevatedClearing,
	SkyMap.VillageOfDreams,
	SkyMap.Graveyard,
] as const;

export type SocialLightAreaMaps = (typeof SOCIAL_LIGHT_AREA_MAPS)[number];

export const RAINBOW_ADMIRE_MAPS = [
	SkyMap.SanctuaryIslands,
	SkyMap.WindPaths,
	SkyMap.HermitValley,
	SkyMap.TreasureReef,
	SkyMap.StarlightDesert,
] as const;

export type RainbowAdmireMaps = (typeof RAINBOW_ADMIRE_MAPS)[number];

export const WINGED_LIGHT_AREAS = [...REALM_NAME_VALUES, SkyMap.AncientMemory] as const;
type WingedLightAreas = (typeof WINGED_LIGHT_AREAS)[number];

// This exists due to the Infographics server's inconsistencies and faults alongside no desire to fix them.
export const INCONSISTENT_MAP = {
	// Daylight Prairie.
	"Sanctuary Island": SkyMap.SanctuaryIslands,

	// Hidden Forest.
	"Forest's Brook": SkyMap.ForestBrook,

	// Valley of Triumph.
	"Race End": SkyMap.Coliseum,
} as const;

export const inconsistentMapKeys = Object.keys(INCONSISTENT_MAP);

export const VALID_REALM_NAME = [
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
] as const;

export type ValidRealmName = (typeof VALID_REALM_NAME)[number];
export const VALID_REALM_NAME_VALUES = Object.values(VALID_REALM_NAME);

export const WINGED_LIGHT_THRESHOLDS = [
	1, 2, 5, 10, 20, 35, 55, 75, 100, 120, 150, 200, 250,
] as const satisfies Readonly<number[]>;

export const AreaToWingedLightCount = {
	[RealmName.IslesOfDawn]: 9,
	[RealmName.DaylightPrairie]: 24,
	[RealmName.HiddenForest]: 19,
	[RealmName.ValleyOfTriumph]: 17,
	[RealmName.GoldenWasteland]: 18,
	[RealmName.VaultOfKnowledge]: 15,
	[RealmName.EyeOfEden]: 10,
	[SkyMap.AncientMemory]: 6,
	[SkyMap.Orbit]: 1,
} as const satisfies Readonly<Record<WingedLightAreas | SkyMap.Orbit, number>>;

export const WINGED_LIGHT_IN_AREAS = Object.values(AreaToWingedLightCount).reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

export const MAXIMUM_WING_BUFFS = MAXIMUM_WINGED_LIGHT - WINGED_LIGHT_IN_AREAS;

export const LOCALES = [
	Locale.German,
	Locale.EnglishGB,
	Locale.EnglishUS,
	Locale.SpanishLATAM,
	Locale.SpanishES,
	Locale.French,
	Locale.Italian,
	Locale.Japanese,
	Locale.Korean,
	Locale.PortugueseBR,
	Locale.Russian,
	Locale.Vietnamese,
	Locale.ChineseCN,
	Locale.ChineseTW,
] as const satisfies Readonly<Locale[]>;

export const SKY_CREATOR_TROUPE = {
	evinsky: {
		name: "Evinsky",
		userId: "713002852909449236",
		description: "Content creator on TikTok",
	},
} as const satisfies Readonly<Record<string, Record<string, string>>>;

// About.
export const ABOUT_DESCRIPTION =
	`Welcome to the lovely Discord application for [Sky: Children of the Light](${THATSKYGAME_URL} "thatskygame")!

So you'd like to know about me, huh? Well, I like long walks across the ${
		SkyMap.SanctuaryIslands
	}. Oh, and don't forget about gliding all over the ${SkyMap.StarlightDesert}. Also... JELLYFISH!

In any case, you can invite me by opening up my profile or using the invite link below! If you need help, head on to the support server linked also below and we'll figure it out together!` as const;

export const ABOUT_SPONSOR = `Want to give support? There are ways you can do that! Thank you in advance!
[Patreon](${PATREON_URL}) | [Ko-fi](${KO_FI_URL}) | [GitHub](${GITHUB_SPONSORS_URL})` as const;

// Admin.
export const DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID =
	"DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID" as const;

export const DAILY_GUIDES_LOCALE_CUSTOM_ID = "DAILY_GUIDES_LOCALE_CUSTOM_ID" as const;

export const DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID =
	"DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID" as const;

export const QUEST_OPTIONS = QUEST_NUMBER.map((questNumber) => ({
	label: `Quest ${questNumber}`,
	value: String(questNumber),
}));

export const LOCALE_OPTIONS = LOCALES.map((locale) => ({
	label: locale,
	value: locale,
}));

// Bonk.
export const BONKS = {
	successful: [
		{
			message: "{{bonker}} bonked {{bonkee}}. Bonk bonk bonk.",
		},
		{
			message:
				"An ethereal force bonked {{bonkee}} on the head. A shrill giggle can be heard from {{bonker}}.",
		},
		{
			message: "BONK! {{bonkee}} was destroyed by {{bonker}}.",
		},
		{
			message: "A terrifying, mystical force bonked {{bonkee}}. {{bonker}} is pleased.",
		},
		{
			message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was successful.",
		},
		{
			message:
				"There was a 1% chance that {{bonkee}} would be bonked. {{bonker}} is that 1%. BONK.",
		},
		{
			message:
				"How extraordinary! A MASSIVE, HUGE BONK was applied to the forehead of {{bonkee}} by {{bonker}}.",
		},
		{
			message:
				"{{bonker}} took a flight, hiked mountains, conquered deserts, all to bonk {{bonkee}}. It was probably worth it.",
		},
		{
			message: "{{bonker}} has bonked {{bonkee}}. Finally! You deserve it, my friend.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}. This is the only physical touch you'll ever receive.",
		},
		{
			message: "We love {{bonkee}}, but {{bonker}} has other thoughts. BONK!",
		},
		{
			message:
				"{{bonkee}} got BONKED by the BONKER called {{bonker}} with the BONKINATOR BONKTHOUSAND. B O N K.",
		},
		{
			message:
				"It's a beautiful night, {{bonker}}'s looking for something dumb to do. Hey {{bonkee}}, {{bonker}}'s gonna BONK you! *BONK*",
		},
		{
			message:
				"{{bonker}} entered the nearby building, scaled to its peak, and dove off the top to bonk {{bonkee}}'s forehead at terminal velocity.",
		},
		{
			message:
				"A wild {{bonker}} appeared! {{bonker}} BONKED {{bonkee}} then mysteriously disappeared...",
		},
		{
			message:
				"{{bonker}} picked {{bonkee}} up, threw them into the air, and bonked them into outer space.",
		},
		{
			message:
				"Somebody was lurking in the shadows. It was {{bonker}} and they just bonked {{bonkee}}.",
		},
		{
			message:
				"{{bonker}} runs to {{bonkee}} but they accidentally hug each other! {{bonker}} sneaked in a lil' bonk, though.",
		},
		{
			message: "It's time to bonk {{bonkee}}. {{bonker}} did the deed.",
		},
		{
			message: "PEW PEW! {{bonker}} bonked {{bonkee}}.",
		},
		{
			message: "COLLATERAL DAMAGE! {{bonker}} bonked {{bonkee}}.",
		},
		{
			message: "{{bonker}} used bonk! It's super effective! {{bonkee}} took a lot of damage!",
		},
		{
			message:
				"{{bonker}} used bonk! It's not very effective... {{bonkee}} didn't take that much damage.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}, but at what cost?",
		},
		{
			message:
				"Roses are red,\nViolets are blue,\n{{bonker}} bonked {{bonkee}},\nAnd smacked them up too.",
		},
		{
			message:
				"A bee lands on {{bonkee}}'s head, but flies off after a few seconds. Taking advantage of the situation, {{bonker}} bonks {{bonkee}} anyway.",
		},
		{
			message: "{{bonkee}} can deal with the bad nights, but not when {{bonker}} bonks them. BONK.",
		},
		{
			message:
				"{{bonker}} jumped on a trampoline, somersaulted 14 times, entered a dive position, and bonked {{bonkee}}. It was a perfect landing.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}. It was a total headshot.",
		},
		{
			message:
				"Whilst flying over the Treasure Reef, {{bonker}} bonked {{bonkee}} into the water below them.",
		},
	],
	unsuccessful: [
		{
			message:
				"{{bonker}} proceeded to bonk {{bonkee}}, but slipped and fell on some bananas. The only thing they bonked was their own head.",
		},
		{
			message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was not successful.",
		},
		{
			message:
				"Due to unfortunate weather conditions, {{bonker}} fell into a hole. They did not manage to bonk {{bonkee}}. {{bonkee}} fell into a separate hole, though.",
		},
		{
			message:
				"{{bonker}} hooked up with {{entry1}}, {{entry2}}, and {{entry3}} to figure out how to bonk {{bonkee}}. They're still working on it.",
			entries: [
				["El Guapo", "a pirate", "some sort of squirrel"],
				["Dracula", "Pope Francis", "a pet lizard"],
				["a moth", "the captain of the underworld", "Perry the Platypus"],
				[
					"Ed Sheeran",
					"a local microwave from a local fishing shop",
					"a piece of sentient bubble wrap",
				],
				["a duck", "the Yakuza", "a bubble that cannot be popped"],
				["Aurora", "a mirror", "a nearby particle"],
				["the NHS", "the inevitable darkness", "John Appleseed"],
				["a camera", "a tree", "the octopus overlord"],
			] satisfies [string, string, string][],
		},
		{
			message:
				"{{bonkee}} escaped the almighty bonk of {{bonker}}. Is this the final bonk by {{bonker}}?",
		},
		{
			message:
				"{{bonker}} was about to bonk {{bonkee}}, but {{bonkee}} turned around and bonked {{bonker}} instead. Oh, how the tables have turned!",
		},
		{
			message:
				"{{bonker}} is on their way to bonk {{bonkee}}, but finds a box of doughnuts! After weighing the odds, {{bonker}} feasts on the doughnuts instead.",
		},
		{
			message: "{{bonker}} used bonk! It didn't affect {{bonkee}}...",
		},
	],
} as const;

// Content creators.
export const CONTENT_CREATORS_DISPLAY_EDIT_CUSTOM_ID =
	"CONTENT_CREATORS_DISPLAY_EDIT_CUSTOM_ID" as const;

export const CONTENT_CREATORS_EDIT_MODAL_CUSTOM_ID =
	"CONTENT_CREATORS_EDIT_MODAL_CUSTOM_ID" as const;

export const CONTENT_CREATORS_EDIT_TEXT_INPUT_CUSTOM_ID =
	"CONTENT_CREATORS_EDIT_TEXT_INPUT_CUSTOM_ID" as const;

export const DailyQuestToInfographicURL = {
	[DailyQuest.Collect30PiecesOfLight]: null,
	[DailyQuest.Light20Candles]: null,
	[DailyQuest.ForgeACandle]: null,
	[DailyQuest.Melt10Darkness]: null,
	[DailyQuest.BowAtAPlayer]: new URL(
		"daily_guides/quests/social/bow_at_a_player.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FollowAFriend]: new URL(
		"daily_guides/quests/social/follow_a_friend.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.HugAFriend]: new URL(
		"daily_guides/quests/social/hug_a_friend.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.WaveToAFriend]: new URL(
		"daily_guides/quests/social/wave_to_a_friend.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.HoldAFriendsHand]: new URL(
		"daily_guides/quests/social/hold_a_friends_hand.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.SendAGiftToAFriend]: new URL(
		"daily_guides/quests/social/send_a_gift_to_a_friend.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MakeANewAcquaintance]: new URL(
		"daily_guides/quests/social/make_a_new_acquaintance.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.HighFiveAFriend]: new URL(
		"daily_guides/quests/social/high_five_a_friend.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.UseAnExpressionNearAFriend]: new URL(
		"daily_guides/quests/social/use_an_expression_near_a_friend.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.SitOnABenchWithAStranger]: new URL(
		"daily_guides/quests/social/sit_on_a_bench_with_a_stranger.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RechargeFromAJellyfish]: new URL(
		"daily_guides/quests/miscellaneous/recharge_from_a_jellyfish.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RechargeFromALightBloom]: new URL(
		"daily_guides/quests/miscellaneous/recharge_from_a_light_bloom.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RideWithAManta]: new URL(
		"daily_guides/quests/miscellaneous/ride_a_manta.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveASpiritsMemories]: new URL(
		"daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]: new URL(
		"daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]: new URL(
		"daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]: new URL(
		"daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]: new URL(
		"daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]: new URL(
		"daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FaceTheDarkDragon]: new URL(
		"daily_guides/quests/miscellaneous/face_the_dark_dragon.gif",
		CDN_URL,
	).toString(),
	[DailyQuest.KnockOver5DarkCrabs]: new URL(
		"daily_guides/quests/miscellaneous/knock_over_5_dark_crabs.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CatchTheLightInTheDaylightPrairie]: new URL(
		"daily_guides/quests/catch_the_light/daylight_prairie.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CatchTheLightInTheHiddenForest]: new URL(
		"daily_guides/quests/catch_the_light/hidden_forest.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CatchTheLightInTheValleyOfTriumph]: new URL(
		"daily_guides/quests/catch_the_light/valley_of_triumph.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CatchTheLightInTheGoldenWasteland]: new URL(
		"daily_guides/quests/catch_the_light/golden_wasteland.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: new URL(
		"daily_guides/quests/catch_the_light/vault_of_knowledge.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]: new URL(
		"daily_guides/quests/miscellaneous/visit_the_cosy_hideout.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]: new URL(
		"daily_guides/quests/miscellaneous/visit_the_ancestors_table_of_belonging.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]: new URL(
		"daily_guides/quests/miscellaneous/visit_the_hot_spring.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]: new URL(
		"daily_guides/quests/miscellaneous/visit_the_bonfire.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]: new URL(
		"daily_guides/quests/days_of_bloom/daylight_prairie.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheSaplingInTheHiddenForest]: new URL(
		"daily_guides/quests/days_of_bloom/hidden_forest.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]: new URL(
		"daily_guides/quests/days_of_bloom/valley_of_triumph.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]: new URL(
		"daily_guides/quests/days_of_bloom/golden_wasteland.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]: new URL(
		"daily_guides/quests/days_of_bloom/vault_of_knowledge.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.VisitThePollutedGeyser]: new URL(
		"daily_guides/quests/days_of_nature/visit_the_polluted_geyser.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RidTheSanctuaryVortexOfDarkness]: new URL(
		"daily_guides/quests/days_of_nature/rid_the_sanctuary_vortex_of_darkness.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]: new URL(
		"daily_guides/quests/days_of_colour/find/daylight_prairie.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]: new URL(
		"daily_guides/quests/days_of_colour/find/hidden_forest.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]: new URL(
		"daily_guides/quests/days_of_colour/find/valley_of_triumph.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]: new URL(
		"daily_guides/quests/days_of_colour/find/golden_wasteland.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]: new URL(
		"daily_guides/quests/days_of_colour/find/vault_of_knowledge.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]: new URL(
		"daily_guides/quests/days_of_colour/admire/sanctuary_islands.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheRainbowInTheWindPaths]: new URL(
		"daily_guides/quests/days_of_colour/admire/wind_paths.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheRainbowInTheHermitValley]: new URL(
		"daily_guides/quests/days_of_colour/admire/hermit_valley.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheRainbowInTheTreasureReef]: new URL(
		"daily_guides/quests/days_of_colour/admire/treasure_reef.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.AdmireTheRainbowInTheStarlightDesert]: new URL(
		"daily_guides/quests/days_of_colour/admire/starlight_desert.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheBirdNest]: new URL(
		"daily_guides/quests/season_of_gratitude/bird_nest.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateInTheButterflyFields]: new URL(
		"daily_guides/quests/season_of_gratitude/butterfly_fields.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheSanctuaryIslands]: new URL(
		"daily_guides/quests/season_of_gratitude/sanctuary_islands.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateInTheCave]: new URL(
		"daily_guides/quests/season_of_gratitude/cave.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateByTheKoiPond]: new URL(
		"daily_guides/quests/season_of_gratitude/koi_pond.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheForestClearing]: new URL(
		"daily_guides/quests/season_of_gratitude/forest_clearing.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheForestBrook]: new URL(
		"daily_guides/quests/season_of_gratitude/forest_brook.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheElevatedClearing]: new URL(
		"daily_guides/quests/season_of_gratitude/elevated_clearing.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheForestEnd]: new URL(
		"daily_guides/quests/season_of_gratitude/forest_end.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheBoneyard]: new URL(
		"daily_guides/quests/season_of_gratitude/boneyard.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateByTheIceRink]: new URL(
		"daily_guides/quests/season_of_gratitude/ice_rink.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAboveTheCitadelsArch]: new URL(
		"daily_guides/quests/season_of_gratitude/citadel/arch.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateHighAboveTheCitadel]: new URL(
		"daily_guides/quests/season_of_gratitude/citadel/high_above.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheColiseum]: new URL(
		"daily_guides/quests/season_of_gratitude/coliseum.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateInTheBrokenTemple]: new URL(
		"daily_guides/quests/season_of_gratitude/broken_temple.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateInTheForgottenArk]: new URL(
		"daily_guides/quests/season_of_gratitude/forgotten_ark.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateInTheGraveyard]: new URL(
		"daily_guides/quests/season_of_gratitude/graveyard.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateOnTheBoat]: new URL(
		"daily_guides/quests/season_of_gratitude/boat.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateOnTheBattlefield]: new URL(
		"daily_guides/quests/season_of_gratitude/battlefield.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheVaultEntrance]: new URL(
		"daily_guides/quests/season_of_gratitude/vault_entrance.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateInTheVaultSecondFloor]: new URL(
		"daily_guides/quests/season_of_gratitude/vault_second_floor.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.MeditateAtTheVaultSummit]: new URL(
		"daily_guides/quests/season_of_gratitude/vault_summit.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CollectGreenLight]: new URL(
		"daily_guides/quests/season_of_enchantment/collect_green_light.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CollectOrangeLight]: new URL(
		"daily_guides/quests/season_of_enchantment/collect_orange_light.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CollectBlueLight]: new URL(
		"daily_guides/quests/season_of_enchantment/collect_blue_light.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CollectRedLight]: new URL(
		"daily_guides/quests/season_of_enchantment/collect_red_light.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CollectPurpleLight]: new URL(
		"daily_guides/quests/season_of_enchantment/collect_purple_light.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.PracticeWithTheSkater]: new URL(
		"daily_guides/quests/season_of_dreams/practice_with_the_skater.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RaceDownTheSlopesWithTheSkater]: new URL(
		"daily_guides/quests/season_of_dreams/race_down_the_slopes_with_the_skater.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RaceDownTheMountainWithTheSkater]: new URL(
		"daily_guides/quests/season_of_dreams/race_down_the_mountain_with_the_skater.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.RehearseForAPerformanceWithTheSkater]: new URL(
		"daily_guides/quests/season_of_dreams/rehearse_for_a_performance_with_the_skater.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.CompleteTheHoopScavengerHunt]: new URL(
		"daily_guides/quests/season_of_assembly/hoop.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheButterflyCharmer]: new URL(
		"daily_guides/quests/spirits/butterfly_charmer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheApplaudingBellmaker]: new URL(
		"daily_guides/quests/spirits/applauding_bellmaker.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheWavingBellmaker]: new URL(
		"daily_guides/quests/spirits/waving_bellmaker.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheSlumberingShipwright]: new URL(
		"daily_guides/quests/spirits/slumbering_shipwright.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheLaughingLightCatcher]: new URL(
		"daily_guides/quests/spirits/laughing_light_catcher.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheBirdWhisperer]: new URL(
		"daily_guides/quests/spirits/bird_whisperer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheExhaustedDockWorker]: new URL(
		"daily_guides/quests/spirits/exhausted_dock_worker.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheCeremonialWorshiper]: new URL(
		"daily_guides/quests/spirits/ceremonial_worshiper.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheShiveringTrailblazer]: new URL(
		"daily_guides/quests/spirits/shivering_trailblazer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheBlushingProspector]: new URL(
		"daily_guides/quests/spirits/blushing_prospector.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheHideNSeekPioneer]: new URL(
		"daily_guides/quests/spirits/hide_n_seek_pioneer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveThePoutyPorter]: new URL(
		"daily_guides/quests/spirits/pouty_porter.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheDismayedHunter]: new URL(
		"daily_guides/quests/spirits/dismayed_hunter.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheApologeticLumberjack]: new URL(
		"daily_guides/quests/spirits/apologetic_lumberjack.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheTearfulLightMiner]: new URL(
		"daily_guides/quests/spirits/tearful_light_miner.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheWhaleWhisperer]: new URL(
		"daily_guides/quests/spirits/whale_whisperer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheConfidentSightseer]: new URL(
		"daily_guides/quests/spirits/confident_sightseer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheHandstandingThrillseeker]: new URL(
		"daily_guides/quests/spirits/handstanding_thrillseeker.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheMantaWhisperer]: new URL(
		"daily_guides/quests/spirits/manta_whisperer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheBackflippingChampion]: new URL(
		"daily_guides/quests/spirits/backflipping_champion.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheCheerfulSpectator]: new URL(
		"daily_guides/quests/spirits/cheerful_spectator.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheBowingMedalist]: new URL(
		"daily_guides/quests/spirits/bowing_medalist.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheProudVictor]: new URL(
		"daily_guides/quests/spirits/proud_victor.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheFrightenedRefugee]: new URL(
		"daily_guides/quests/spirits/frightened_refugee.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheFaintingWarrior]: new URL(
		"daily_guides/quests/spirits/fainting_warrior.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheCourageousSoldier]: new URL(
		"daily_guides/quests/spirits/courageous_soldier.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheStealthySurvivor]: new URL(
		"daily_guides/quests/spirits/stealthy_survivor.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheSalutingCaptain]: new URL(
		"daily_guides/quests/spirits/saluting_captain.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheLookoutScout]: new URL(
		"daily_guides/quests/spirits/lookout_scout.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveThePrayingAcolyte]: new URL(
		"daily_guides/quests/spirits/praying_acolyte.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheLevitatingAdept]: new URL(
		"daily_guides/quests/spirits/levitating_adept.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveThePoliteScholar]: new URL(
		"daily_guides/quests/spirits/polite_scholar.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheMemoryWhisperer]: new URL(
		"daily_guides/quests/spirits/memory_whisperer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheMeditatingMonastic]: new URL(
		"daily_guides/quests/spirits/meditating_monastic.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheStretchingGuru]: new URL(
		"daily_guides/quests/spirits/stretching_guru.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheProvokingPerformer]: new URL(
		"daily_guides/quests/spirits/provoking_performer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheLeapingDancer]: new URL(
		"daily_guides/quests/spirits/leaping_dancer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheSalutingProtector]: new URL(
		"daily_guides/quests/spirits/saluting_protector.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheGreetingShaman]: new URL(
		"daily_guides/quests/spirits/greeting_shaman.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheDoublefiveLightCatcher]: new URL(
		"daily_guides/quests/spirits/doublefive_light_catcher.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheLaidbackPioneer]: new URL(
		"daily_guides/quests/spirits/laidback_pioneer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheTwirlingChampion]: new URL(
		"daily_guides/quests/spirits/twirling_champion.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheCrabWhisperer]: new URL(
		"daily_guides/quests/spirits/crab_whisperer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheShushingLightScholar]: new URL(
		"daily_guides/quests/spirits/shushing_light_scholar.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheConfettiCousin]: new URL(
		"daily_guides/quests/spirits/confetti_cousin.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheHairtousleTeen]: new URL(
		"daily_guides/quests/spirits/hairtousle_teen.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheSparklerParent]: new URL(
		"daily_guides/quests/spirits/sparkler_parent.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveThePleafulParent]: new URL(
		"daily_guides/quests/spirits/pleaful_parent.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheWiseGrandparent]: new URL(
		"daily_guides/quests/spirits/wise_grandparent.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheFestivalSpinDancer]: new URL(
		"daily_guides/quests/spirits/festival_spin_dancer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheAdmiringActor]: new URL(
		"daily_guides/quests/spirits/admiring_actor.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheTroupeJuggler]: new URL(
		"daily_guides/quests/spirits/troupe_juggler.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheRespectfulPianist]: new URL(
		"daily_guides/quests/spirits/respectful_pianist.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheThoughtfulDirector]: new URL(
		"daily_guides/quests/spirits/thoughtful_director.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheNoddingMuralist]: new URL(
		"daily_guides/quests/spirits/nodding_muralist.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheIndifferentAlchemist]: new URL(
		"daily_guides/quests/spirits/indifferent_alchemist.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheCrabWalker]: new URL(
		"daily_guides/quests/spirits/crab_walker.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheScarecrowFarmer]: new URL(
		"daily_guides/quests/spirits/scarecrow_farmer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheSnoozingCarpenter]: new URL(
		"daily_guides/quests/spirits/snoozing_carpenter.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveThePlayfightingHerbalist]: new URL(
		"daily_guides/quests/spirits/playfighting_herbalist.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheJellyWhisperer]: new URL(
		"daily_guides/quests/spirits/jelly_whisperer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheTimidBookworm]: new URL(
		"daily_guides/quests/spirits/timid_bookworm.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheRallyingThrillseeker]: new URL(
		"daily_guides/quests/spirits/rallying_thrillseeker.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheHikingGrouch]: new URL(
		"daily_guides/quests/spirits/hiking_grouch.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheGratefulShellCollector]: new URL(
		"daily_guides/quests/spirits/grateful_shell_collector.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheChillSunbather]: new URL(
		"daily_guides/quests/spirits/chill_sunbather.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheSpinningMentor]: new URL(
		"daily_guides/quests/spirits/spinning_mentor.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheDancingPerformer]: new URL(
		"daily_guides/quests/spirits/dancing_performer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveThePeekingPostman]: new URL(
		"daily_guides/quests/spirits/peeking_postman.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheBearhugHermit]: new URL(
		"daily_guides/quests/spirits/bearhug_hermit.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheBaffledBotanist]: new URL(
		"daily_guides/quests/spirits/baffled_botanist.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheScoldingStudent]: new URL(
		"daily_guides/quests/spirits/scolding_student.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheScaredyCadet]: new URL(
		"daily_guides/quests/spirits/scaredy_cadet.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheMarchingAdventurer]: new URL(
		"daily_guides/quests/spirits/marching_adventurer.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheChucklingScout]: new URL(
		"daily_guides/quests/spirits/chuckling_scout.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.ReliveTheDaydreamForester]: new URL(
		"daily_guides/quests/spirits/daydream_forester.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]: null,
	[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]: null,
	[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]: null,
	[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]: null,
	[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]: null,
	[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]: new URL(
		"daily_guides/quests/sky_x_cinnamoroll_pop_up_cafe/meet_cinnamoroll_on_a_hill_in_aviary_village.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]: new URL(
		"daily_guides/quests/sky_x_cinnamoroll_pop_up_cafe/smell_flowers_with_cinnamoroll_in_aviary_village.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]: new URL(
		"daily_guides/quests/sky_x_cinnamoroll_pop_up_cafe/find_cinnamoroll_peeking_around_aviary_village.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.WakeUpCinnamorollInAviaryVillage]: new URL(
		"daily_guides/quests/sky_x_cinnamoroll_pop_up_cafe/wake_up_cinnamoroll_in_aviary_village.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]: new URL(
		"daily_guides/quests/sky_x_cinnamoroll_pop_up_cafe/fly_up_to_the_tower_with_cinnamoroll_in_aviary_village.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]: new URL(
		"daily_guides/quests/sky_x_cinnamoroll_pop_up_cafe/splash_in_the_water_with_cinnamoroll_in_aviary_village.webp",
		CDN_URL,
	).toString(),
	[DailyQuest.PlayAnyTournamentSport]: null,
	[DailyQuest.ModestDancerNeedsHelpWithSomethingInVillageOfDreams]: null,
	[DailyQuest.ForgetfulStorytellerNeedsHelpWithSomethingInVillageOfDreams]: null,
	[DailyQuest.MeetUpWithFranticStagehandInVillageTheatre]: null,
	[DailyQuest.MellowMusicianNeedsHelpWithSomethingInVillageTheatre]: null,
	[DailyQuest.ChangeYourHairstyle]: null,
	[DailyQuest.ChangeYourNecklace]: null,
	[DailyQuest.ChangeYourProp]: null,
	[DailyQuest.ChangeYourMask]: null,
	[DailyQuest.ChangeYourCape]: null,
	[DailyQuest.ChangeYourOutfit]: null,
	[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]: null,
	[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]: null,
	[DailyQuest.CacklingCannoneerNeedsHelpWithSomethingInTreasureReef]: null,
	[DailyQuest.AnxiousAnglerNeedsHelpWithSomethingInTreasureReef]: null,
	[DailyQuest.MellowMusicianNeedsHelpWithSomethingInVillageOfDreams]: null,
	[DailyQuest.AnxiousAnglerNeedsHelpWithSomethingInGoldenWasteland]: null,
	[DailyQuest.MeetUpWithAnxiousAnglerInCrabFields]: null,
	[DailyQuest.MeetUpWithCeasingCommodoreInTreasureReef]: null,
	[DailyQuest.MeetUpWithBlushingProspectorInForestBrook]: null,
	[DailyQuest.MeetUpWithShiveringTrailblazerInForestBrook]: null,
	[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]: null,
	[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]: null,
	[DailyQuest.MeetUpWithHideNSeekPioneerInElevatedClearing]: null,
	[DailyQuest.MeetUpWithBumblingBoatswainInForgottenArk]: null,
	[DailyQuest.MeetUpWithHideNSeekPioneerInHiddenForest]: null,
	[DailyQuest.MeetUpWithCacklingCannoneerInForgottenArk]: null,
	[DailyQuest.MeetUpWithApologeticLumberjackInBoneyard]: null,
	[DailyQuest.MeetUpWithCeasingCommodoreInForgottenArk]: null,
	[DailyQuest.MeetUpWithJollyGeologistInPrairiePeaks]: null,
	[DailyQuest.MeetUpWithDismayedHunterInBoneyard]: null,
	[DailyQuest.MeetUpWithWhaleWhispererInBoneyard]: null,
	[DailyQuest.MeetUpWithAsceticMonkInSanctuaryIslands]: null,
	[DailyQuest.MeetUpWithNightbirdWhispererInSanctuaryIslands]: null,
} as const satisfies Readonly<Record<DailyQuests, string | null>>;

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
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
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
		String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
	],
	[RealmName.VaultOfKnowledge]: [
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
	],
} as const;

// Daily guides distribution.
export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
	ChannelType.PublicThread,
] as const;

// Data.
export const DATA_DELETION_CUSTOM_ID = "DATA_DELETION_CUSTOM_ID" as const;

// Guess.
export enum GuessDifficultyLevel {
	Original = 0,
	Hard = 1,
}

export const GUESS_DIFFICULTY_LEVEL_VALUES = Object.values(GuessDifficultyLevel).filter(
	(guessDifficultyLevel) => typeof guessDifficultyLevel === "number",
);

export const GuessDifficultyLevelToName = {
	[GuessDifficultyLevel.Original]: "Original",
	[GuessDifficultyLevel.Hard]: "Hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;

export const GuessDifficultyToStreakColumn = {
	[GuessDifficultyLevel.Original]: "streak",
	[GuessDifficultyLevel.Hard]: "streak_hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;

export const GUESS_TIMEOUT = 30_000 as const;
export const GUESS_ANSWER_1 = "GUESS_ANSWER_1" as const;
export const GUESS_ANSWER_2 = "GUESS_ANSWER_2" as const;
export const GUESS_ANSWER_3 = "GUESS_ANSWER_3" as const;
export const GUESS_END_GAME = "GUESS_END_GAME_CUSTOM_ID" as const;
export const GUESS_TRY_AGAIN = "GUESS_TRY_AGAIN_CUSTOM_ID" as const;
export const GUESS_LEADERBOARD_MAXIMUM_DISPLAY_NUMBER = 10 as const;
export const GUESS_LEADERBOARD_BACK_CUSTOM_ID = "GUESS_LEADERBOARD_BACK_CUSTOM_ID" as const;
export const GUESS_LEADERBOARD_NEXT_CUSTOM_ID = "GUESS_LEADERBOARD_NEXT_CUSTOM_ID" as const;

// Heart.
export const HEARTS = [
	"{{gifter}} sent a heart to {{giftee}}. How lucky!",
	"A heart from {{gifter}} to {{giftee}}. That was nice of them!",
	"Incoming heart from {{gifter}} to {{giftee}}!",
	"{{gifter}} sent {{giftee}} a heart! What a good friend!",
	"{{gifter}} sent {{giftee}} a heart. How nice of {{gifter}}!",
	"{{gifter}} sent a heart to {{giftee}}. They're pretty lucky!",
	"{{gifter}} sent {{giftee}} a heart. {{giftee}} is lucky to have a friend like you!",
	"{{gifter}}, sending a heart each day keeps the dark dragon away from {{giftee}}!",
	"A wholesome heart delivered to {{giftee}} from {{gifter}}!",
] as const satisfies Readonly<string[]>;

export const DELETED_USER_TEXT = "<deleted>" as const;
export const MAXIMUM_HEARTS_PER_DAY = 3 as const;
export const HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER = 24 as const;
export const HEART_HISTORY_BACK = "HEART_HISTORY_BACK" as const;
export const HEART_HISTORY_NEXT = "HEART_HISTORY_NEXT" as const;

// Notifications.
export const NOTIFICATION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
] as const satisfies Readonly<ChannelType[]>;

export const NotificationType = {
	DailyReset: 0,
	EyeOfEden: 1,
	InternationalSpaceStation: 2,
	Dragon: 3,
	PollutedGeyser: 4,
	Grandma: 5,
	Turtle: 6,
	RegularShardEruption: 7,
	StrongShardEruption: 8,
	AURORA: 9,
	Passage: 10,
	AviarysFireworkFestival: 11,
	TravellingSpirit: 12,
} as const satisfies Readonly<Record<string, number>>;

export type NotificationTypes = (typeof NotificationType)[keyof typeof NotificationType];
export const NOTIFICATION_TYPE_VALUES = Object.values(NotificationType);

// Cannot exceed 24.
export const NotificationOffsetToMaximumValues = {
	[NotificationType.DailyReset]: 15,
	[NotificationType.EyeOfEden]: 24,
	[NotificationType.InternationalSpaceStation]: 10,
	[NotificationType.Dragon]: 10,
	[NotificationType.PollutedGeyser]: 10,
	[NotificationType.Grandma]: 10,
	[NotificationType.Turtle]: 10,
	[NotificationType.RegularShardEruption]: 10,
	[NotificationType.StrongShardEruption]: 10,
	[NotificationType.AURORA]: 15,
	[NotificationType.Passage]: 5,
	[NotificationType.AviarysFireworkFestival]: 15,
	[NotificationType.TravellingSpirit]: 15,
} as const satisfies Readonly<Record<NotificationTypes, number>>;

export const NOTIFICATION_SETUP_OFFSET_CUSTOM_ID = "NOTIFICATION_SETUP_OFFSET_CUSTOM_ID" as const;

// Schedule.
export const PASSAGE_TRUNCATION_LIMIT = 9 as const;

// Sky profiles.
export const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
export const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
export const SKY_PROFILE_MINIMUM_COUNTRY_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH = 60 as const;
export const SKY_PROFILE_MINIMUM_WINGED_LIGHT_LENGTH = 1 as const;
export const SKY_PROFILE_MAXIMUM_WINGED_LIGHT_LENGTH = 3 as const;
export const SKY_PROFILE_MINIMUM_SPOT_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_SPOT_LENGTH = 50 as const;
export const SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER = 25 as const;
export const SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH = 100 as const;
export const SKY_PROFILE_EXPLORE_AUTOCOMPLETE_NAME_LENGTH = 100 as const;
export const SKY_PROFILE_REPORT_MAXIMUM_LENGTH = 1000 as const;
export const SKY_PROFILE_REPORT_MINIMUM_LENGTH = 10 as const;
export const SKY_PROFILE_UNKNOWN_NAME = "Anonymous" as const;
