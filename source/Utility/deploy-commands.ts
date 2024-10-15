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
	PRODUCTION,
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
	name_localizations: Object.fromEntries(
		LOCALES.map((locale) => [
			locale,
			t(`notificationEvent.${notificationEvent}`, { lng: locale, ns: "general" }),
		]),
	),
	value: notificationEvent,
}));

const COMMANDS: RESTPostAPIApplicationCommandsJSONBody[] = [
	{
		name: t("about.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("about.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("about.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("about.command-description", { lng: locale, ns: "commands" }),
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
		name: t("ai.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("ai.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("ai.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("ai.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: t("bonk.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("bonk.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("bonk.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("bonk.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("bonk.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("bonk.command-option-user-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("bonk.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("bonk.command-option-user-description", { lng: locale, ns: "commands" }),
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
				name: t("calculate.ascended-candles.command-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.ascended-candles.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("calculate.ascended-candles.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.ascended-candles.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.ascended-candles.command-option-start-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-start-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.ascended-candles.command-option-start-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-start-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						min_value: 0,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.ascended-candles.command-option-goal-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-goal-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.ascended-candles.command-option-goal-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-goal-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						max_value: 10_000,
						min_value: 1,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("calculate.ascended-candles.command-option-eye-of-eden-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-eye-of-eden-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.ascended-candles.command-option-eye-of-eden-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-eye-of-eden-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						required: false,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("calculate.ascended-candles.command-option-shard-eruptions-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-shard-eruptions-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t(
							"calculate.ascended-candles.command-option-shard-eruptions-description",
							{
								lng: Locale.EnglishGB,
								ns: "commands",
							},
						),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.ascended-candles.command-option-shard-eruptions-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						required: false,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("calculate.event-currency.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.event-currency.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("calculate.event-currency.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("calculate.event-currency.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.event-currency.command-option-start-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.event-currency.command-option-start-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.event-currency.command-option-start-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.event-currency.command-option-start-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						min_value: 0,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.event-currency.command-option-goal-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.event-currency.command-option-goal-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.event-currency.command-option-goal-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.event-currency.command-option-goal-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
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
						name: t("calculate.winged-light.command-option-wing-buffs-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.winged-light.command-option-wing-buffs-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("calculate.winged-light.command-option-wing-buffs-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("calculate.winged-light.command-option-wing-buffs-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
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
		name: t("catalogue.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("catalogue.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("catalogue.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("catalogue.command-description", { lng: locale, ns: "commands" }),
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
		name: t("daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("daily-guides.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("daily-guides.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("daily-guides.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("daily-guides.setup.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("daily-guides.setup.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("daily-guides.setup.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("daily-guides.setup.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: t("daily-guides.setup.command-option-channel-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("daily-guides.setup.command-option-channel-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("daily-guides.setup.command-option-channel-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("daily-guides.setup.command-option-channel-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						required: true,
						channel_types: [...DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES],
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("daily-guides.status.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("daily-guides.status.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("daily-guides.status.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("daily-guides.status.command-description", { lng: locale, ns: "commands" }),
					]),
				),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("daily-guides.unset.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("daily-guides.unset.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("daily-guides.unset.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("daily-guides.unset.command-description", { lng: locale, ns: "commands" }),
					]),
				),
			},
		],
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: t("data.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("data.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("data.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("data.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("data.delete.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("data.delete.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("data.delete.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("data.delete.command-description", { lng: locale, ns: "commands" }),
					]),
				),
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
		name: t("Gift-Heart.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		type: ApplicationCommandType.User,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("guess.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("guess.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("guess.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("guess.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("guess.game.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("guess.game.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("guess.game.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("guess.game.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("guess.game.command-option-difficulty-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("guess.game.command-option-difficulty-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("guess.game.command-option-difficulty-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("guess.game.command-option-difficulty-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							name_localizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t(`guess.game.command-option-difficulty-choice-name.${guessDifficultyLevel}`, {
										lng: locale,
										ns: "commands",
									}),
								]),
							),
							value: guessDifficultyLevel,
						})),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("guess.leaderboard.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("guess.leaderboard.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("guess.leaderboard.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("guess.leaderboard.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("guess.leaderboard.command-option-difficulty-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("guess.leaderboard.command-option-difficulty-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("guess.leaderboard.command-option-difficulty-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("guess.leaderboard.command-option-difficulty-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							name_localizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t(
										`guess.leaderboard.command-option-difficulty-choice-name.${guessDifficultyLevel}`,
										{
											lng: locale,
											ns: "commands",
										},
									),
								]),
							),
							value: guessDifficultyLevel,
						})),
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("guess.leaderboard.command-option-server-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("guess.leaderboard.command-option-server-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("guess.leaderboard.command-option-server-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("guess.leaderboard.command-option-server-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
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
		name: t("heart.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("heart.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("heart.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("heart.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("heart.gift.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("heart.gift.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("heart.gift.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("heart.gift.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: t("heart.gift.command-option-user-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("heart.gift.command-option-user-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("heart.gift.command-option-user-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("heart.gift.command-option-user-description", { lng: locale, ns: "commands" }),
							]),
						),
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("heart.history.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("heart.history.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("heart.history.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("heart.history.command-description", { lng: locale, ns: "commands" }),
					]),
				),
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("high-five.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("high-five.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("high-five.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("high-five.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("high-five.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("high-five.command-option-user-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("high-five.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("high-five.command-option-user-description", { lng: locale, ns: "commands" }),
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
		name: t("krill.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("krill.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("krill.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("krill.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("krill.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("krill.command-option-user-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("krill.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("krill.command-option-user-description", { lng: locale, ns: "commands" }),
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
		name: t("notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("notifications.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("notifications.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("notifications.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("notifications.setup.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("notifications.setup.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("notifications.setup.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("notifications.setup.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("notifications.setup.command-option-event-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-event-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("notifications.setup.command-option-event-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-event-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						required: true,
						choices: notificationEventChoices,
					},
					{
						type: ApplicationCommandOptionType.Channel,
						name: t("notifications.setup.command-option-channel-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-channel-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("notifications.setup.command-option-channel-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-channel-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						required: true,
						channel_types: [...NOTIFICATION_CHANNEL_TYPES],
					},
					{
						type: ApplicationCommandOptionType.Role,
						name: t("notifications.setup.command-option-role-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-role-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("notifications.setup.command-option-role-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-role-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("notifications.status.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("notifications.status.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("notifications.status.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("notifications.status.command-description", { lng: locale, ns: "commands" }),
					]),
				),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("notifications.unset.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("notifications.unset.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("notifications.unset.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("notifications.unset.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("notifications.unset.command-option-event-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.unset.command-option-event-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("notifications.unset.command-option-event-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.unset.command-option-event-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
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
		name: t("play-fight.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("play-fight.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("play-fight.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("play-fight.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("play-fight.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("play-fight.command-option-user-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("play-fight.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("play-fight.command-option-user-description", { lng: locale, ns: "commands" }),
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
const promises = [rest.put(Routes.applicationCommands(APPLICATION_ID), { body: COMMANDS })];

if (PRODUCTION) {
	promises.push(
		rest.put(Routes.applicationGuildCommands(APPLICATION_ID, DEVELOPER_GUILD_ID), {
			body: DEVELOPER_COMMANDS,
		}),
	);
}

const settled = await Promise.allSettled(promises);

const errors = settled
	.filter((result): result is PromiseRejectedResult => result.status === "rejected")
	.map((result) => result.reason);

if (errors.length > 0) {
	pino.error(errors, "Error setting commands.");
} else {
	pino.info("Successfully set application commands.");
}
