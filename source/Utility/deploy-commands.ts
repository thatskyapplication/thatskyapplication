import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	Locale,
	PermissionFlagsBits,
	REST,
	type RESTPostAPIApplicationCommandsJSONBody,
	Routes,
} from "discord.js";
import { t } from "i18next";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DEVELOPER_GUILD_ID,
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevelToName,
	LOCALES,
	MAXIMUM_WINGED_LIGHT,
	MAXIMUM_WING_BUFFS,
	MINIMUM_WINGED_LIGHT,
	NOTIFICATION_CHANNEL_TYPES,
	NOTIFICATION_EVENT_VALUES,
	QUEST_NUMBER,
	SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
	SKY_PROFILE_MINIMUM_COUNTRY_LENGTH,
	SKY_PROFILE_MINIMUM_SPOT_LENGTH,
	TOKEN,
} from "./Constants.js";
import "../i18next.js";

if (!TOKEN) {
	pino.fatal("Missing Discord token to deploy commands.");
	process.exit(1);
}

const notificationEventChoices = NOTIFICATION_EVENT_VALUES.map((notificationEvent) => ({
	name: notificationEvent,
	value: notificationEvent,
}));

const COMMANDS: RESTPostAPIApplicationCommandsJSONBody[] = [
	{
		name: "about",
		description: "About me, the wondrous little Sky helper!",
		type: ApplicationCommandType.ChatInput,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "ai",
		description: "Configure the AI.",
		type: ApplicationCommandType.ChatInput,
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: "bonk",
		description: "Bonk someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to be bonked.",
				required: true,
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("calculate.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("calculate.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("calculate.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("calculate.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "ascended-candles",
				description:
					"Calculates the number of days it would take to achieve a number of ascended candles.",
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: "start",
						description: "The starting number of ascended candles.",
						min_value: 0,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: "goal",
						description: "The desired number of ascended candles.",
						max_value: 10_000,
						min_value: 1,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "eye-of-eden",
						description: "Whether to include the Eye of Eden in the calculation.",
						required: false,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "shard-eruptions",
						description: "Whether to include shard eruptions in the calculation.",
						required: false,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "event-currency",
				description:
					"Calculates the number of days it would take to achieve a number of event currency.",
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: "start",
						description: "The starting number of event currency.",
						min_value: 0,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: "goal",
						description: "The desired number of event currency.",
						max_value: 250,
						min_value: 1,
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("calculate.seasonal-candles.command-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.seasonal-candles.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("calculate.seasonal-candles.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.seasonal-candles.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.seasonal-candles.command-option-start-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.seasonal-candles.command-option-start-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.seasonal-candles.command-option-start-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.seasonal-candles.command-option-start-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						min_value: 0,
						max_value: 1_000,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.seasonal-candles.command-option-goal-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.seasonal-candles.command-option-goal-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.seasonal-candles.command-option-goal-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.seasonal-candles.command-option-goal-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						min_value: 1,
						max_value: 1_000,
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("calculate.winged-light.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.winged-light.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("calculate.winged-light.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.winged-light.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: "wing-buffs",
						description: "The number of wing buffs (total amount collected from ascended spirits).",
						max_value: MAXIMUM_WING_BUFFS,
						min_value: 0,
						required: true,
					},
				],
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "catalogue",
		description: "Your very own Sky catalogue.",
		type: ApplicationCommandType.ChatInput,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "daily-guides",
		description: "The command to set up daily guides in the server.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "setup",
				description: "Sets up the daily guides in the server.",
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: "channel",
						description: "The channel to send daily guides in.",
						required: true,
						channel_types: [...DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES],
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "status",
				description: "Shows the status of daily guides in this server.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "unset",
				description: "Unsets daily guides in the server.",
			},
		],
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: "data",
		description: "Commands regarding your data.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "delete",
				description: "Deletes your data.",
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "Gift Heart",
		type: ApplicationCommandType.User,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: "guess",
		description: "Begin a Sky guessing game! How many can you get right in a row?",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "game",
				description: "Begin the guessing game!",
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: "difficulty",
						description: "Adjust the difficulty level!",
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							value: guessDifficultyLevel,
						})),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "leaderboard",
				description: "View the leaderboard!",
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: "difficulty",
						description: "What difficulty would you like to view?",
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							value: guessDifficultyLevel,
						})),
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "server",
						description: "Scope the leaderboard to your server?",
					},
				],
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "heart",
		description: "Feeling generous? You have up to 3 hearts to gift per day!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "gift",
				description: "Choose someone to gift your heart to!",
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: "user",
						description: "The user to gift a heart to.",
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "history",
				description: "Display a history of your hearts!",
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: "high-five",
		description: "High-five someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to high-five.",
				required: true,
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("hug.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("hug.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("hug.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("hug.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("hug.user", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [locale, t("hug.user", { lng: locale, ns: "commands" })]),
				),
				description: "The individual to be hugged.",
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("hug.user-description", { lng: locale, ns: "commands" }),
					]),
				),
				required: true,
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: "krill",
		description: "Krill someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to be krilled.",
				required: true,
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: "notifications",
		description: "The command to set up notifications for events.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "setup",
				description: "Sets up notifications in the server.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "event",
						description: "The event to set.",
						required: true,
						choices: notificationEventChoices,
					},
					{
						type: ApplicationCommandOptionType.Channel,
						name: "channel",
						description: "The channel to send notifications in.",
						required: true,
						channel_types: [...NOTIFICATION_CHANNEL_TYPES],
					},
					{
						type: ApplicationCommandOptionType.Role,
						name: "role",
						description: "The role to mention.",
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "status",
				description: "Shows the status of notifications in this server.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "unset",
				description: "Unsets a notification in the server.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "event",
						description: "The event to unset.",
						required: true,
						choices: notificationEventChoices,
					},
				],
			},
		],
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: "play-fight",
		description: "Fight someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to play fight.",
				required: true,
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("schedule.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("schedule.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("schedule.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("schedule.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "shard-eruption",
		description: "View the shard eruption schedule.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "browse",
				description: "Browse the shard eruptions.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "today",
				description: "View the shard eruption today.",
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "sky-profile",
		description: "Build a Sky profile for you and others to see!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "edit",
				description: "Edit your Sky profile.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "name",
						description: "What's your in-game name?",
						max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: "thumbnail",
						description: "Upload your thumbnail!",
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: "icon",
						description: "Upload your icon!",
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: "winged-light",
						description: `How much winged light do you have? (${MINIMUM_WINGED_LIGHT}-${MAXIMUM_WINGED_LIGHT})`,
						max_value: MAXIMUM_WINGED_LIGHT,
						min_value: MINIMUM_WINGED_LIGHT,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "spirit",
						description: "What's your favourite spirit?",
						autocomplete: true,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "country",
						description: "Feel like specifying your country?",
						max_length: SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH,
						min_length: SKY_PROFILE_MINIMUM_COUNTRY_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "spot",
						description: "Where's your favourite spot to hang out?",
						max_length: SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
						min_length: SKY_PROFILE_MINIMUM_SPOT_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "catalogue-progression",
						description: "Show your catalogue progression?",
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "guess-rank",
						description: "Show your guessing game rank?",
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "explore",
				description: "Explore the Sky profiles of others!",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "name",
						description: "Search a Sky profile via a name!",
						autocomplete: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "show",
				description: "Shows the Sky profile of someone.",
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: "user",
						description: "The user whose Sky profile you wish to see.",
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "hide",
						description: "Ensure only you can see the response. By default, the response is shown.",
					},
				],
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "Sky Profile",
		type: ApplicationCommandType.User,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
	{
		name: "spirit",
		description: "Returns the friendship tree of a spirit.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "search",
				description: "Reveal information about a spirit.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "query",
						description: "The name, season, expression, stance, or call of the spirit.",
						required: true,
						autocomplete: true,
					},
				],
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
] as const;

const DEVELOPER_COMMANDS: RESTPostAPIApplicationCommandsJSONBody[] = [
	{
		name: "admin",
		description: "Developer-specific commands.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "ai",
				description: "Toggles the AI feature.",
				options: [
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "enable",
						description: "Whether the AI feature should be enabled.",
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "custom-status",
				description: "Sets the custom status.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "text",
						description: "The text to use.",
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.SubcommandGroup,
				name: "daily-guides",
				description: "Edits the daily guides embed.",
				options: [
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "interactive",
						description: "Interactively edits the daily guides.",
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "set-quest",
						description: "Sets a quest for the daily guides.",
						options: [
							...QUEST_NUMBER.map((questNumber) => ({
								type: ApplicationCommandOptionType.String as const,
								name: `quest-${questNumber}`,
								description: "The daily quest.",
								autocomplete: true,
							})),
							...QUEST_NUMBER.map((questNumber) => ({
								type: ApplicationCommandOptionType.String as const,
								name: `url-${questNumber}`,
								description: "Override the respective daily quest's infographic.",
							})),
						],
					},
				],
			},
		],
		default_member_permissions: "0",
	},
] as const;

const rest = new REST({ version: "10" }).setToken(TOKEN);
pino.info("Setting application commands...");

const settled = await Promise.allSettled([
	rest.put(Routes.applicationCommands(APPLICATION_ID), { body: COMMANDS }),
	rest.put(Routes.applicationGuildCommands(APPLICATION_ID, DEVELOPER_GUILD_ID), {
		body: DEVELOPER_COMMANDS,
	}),
]);

const errors = settled
	.filter((result): result is PromiseRejectedResult => result.status === "rejected")
	.map((result) => result.reason);

if (errors.length > 0) {
	pino.error(errors, "Error setting commands.");
} else {
	pino.info("Successfully set application commands.");
}
