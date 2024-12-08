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
	NOTIFICATION_TYPE_VALUES,
	QUEST_NUMBER,
	SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
	SKY_PROFILE_MINIMUM_COUNTRY_LENGTH,
	SKY_PROFILE_MINIMUM_SPOT_LENGTH,
	TOKEN,
} from "./constants.js";
import "../i18next.js";
import {
	API,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	Locale,
	PermissionFlagsBits,
	type RESTPostAPIApplicationCommandsJSONBody,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import {
	CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH,
	ContentCreatorsEditType,
} from "../services/content-creators.js";

if (!TOKEN) {
	pino.fatal("Missing Discord token to deploy commands.");
	process.exit(1);
}

const notificationEventChoices = NOTIFICATION_TYPE_VALUES.map((notificationType) => ({
	name: t(`notification-types.${notificationType}`, { lng: Locale.EnglishGB, ns: "general" }),
	name_localizations: Object.fromEntries(
		LOCALES.map((locale) => [
			locale,
			t(`notification-types.${notificationType}`, { lng: locale, ns: "general" }),
		]),
	),
	value: notificationType,
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
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("Gift-Heart.command-name", { lng: locale, ns: "commands" }),
			]),
		),
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
						type: ApplicationCommandOptionType.Integer,
						name: t("notifications.setup.command-option-notification-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-notification-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("notifications.setup.command-option-notification-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.setup.command-option-notification-description", {
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
						type: ApplicationCommandOptionType.Integer,
						name: t("notifications.unset.command-option-notification-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.unset.command-option-notification-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("notifications.unset.command-option-notification-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("notifications.unset.command-option-notification-description", {
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
		name: t("shard-eruption.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("shard-eruption.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("shard-eruption.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("shard-eruption.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("shard-eruption.command-option-browse-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("shard-eruption.command-option-browse-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("shard-eruption.command-option-browse-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("shard-eruption.command-option-browse-description", { lng: locale, ns: "commands" }),
					]),
				),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("shard-eruption.command-option-today-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("shard-eruption.command-option-today-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("shard-eruption.command-option-today-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("shard-eruption.command-option-today-description", { lng: locale, ns: "commands" }),
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
		name: t("sky-profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("sky-profile.command-name", { lng: locale, ns: "commands" }),
			]),
		),
		description: t("sky-profile.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("sky-profile.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.edit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("sky-profile.edit.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("sky-profile.edit.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("sky-profile.edit.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-name-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-name-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.edit.command-option-name-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-name-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: t("sky-profile.edit.command-option-thumbnail-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-thumbnail-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("sky-profile.edit.command-option-thumbnail-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-thumbnail-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: t("sky-profile.edit.command-option-icon-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-icon-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.edit.command-option-icon-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-icon-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("sky-profile.edit.command-option-winged-light-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-winged-light-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("sky-profile.edit.command-option-winged-light-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-winged-light-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						max_value: MAXIMUM_WINGED_LIGHT,
						min_value: MINIMUM_WINGED_LIGHT,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-spirit-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-spirit-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.edit.command-option-spirit-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-spirit-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						autocomplete: true,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-country-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-country-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.edit.command-option-country-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-country-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						max_length: SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH,
						min_length: SKY_PROFILE_MINIMUM_COUNTRY_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-spot-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-spot-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.edit.command-option-spot-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-spot-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						max_length: SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
						min_length: SKY_PROFILE_MINIMUM_SPOT_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.edit.command-option-catalogue-progression-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-catalogue-progression-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("sky-profile.edit.command-option-catalogue-progression-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-catalogue-progression-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.edit.command-option-guess-rank-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-guess-rank-name", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						description: t("sky-profile.edit.command-option-guess-rank-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.edit.command-option-guess-rank-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.explore.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("sky-profile.explore.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("sky-profile.explore.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("sky-profile.explore.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.explore.command-option-name-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.explore.command-option-name-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.explore.command-option-name-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.explore.command-option-name-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
						autocomplete: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.show.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("sky-profile.show.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("sky-profile.show.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("sky-profile.show.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: t("sky-profile.show.command-option-user-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.show.command-option-user-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.show.command-option-user-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.show.command-option-user-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.show.command-option-hide-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.show.command-option-hide-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("sky-profile.show.command-option-hide-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("sky-profile.show.command-option-hide-description", {
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
		name: t("Sky-Profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("Sky-Profile.command-name", { lng: locale, ns: "commands" }),
			]),
		),
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
		name: t("spirit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: Object.fromEntries(
			LOCALES.map((locale) => [locale, t("spirit.command-name", { lng: locale, ns: "commands" })]),
		),
		description: t("spirit.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: Object.fromEntries(
			LOCALES.map((locale) => [
				locale,
				t("spirit.command-description", { lng: locale, ns: "commands" }),
			]),
		),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("spirit.search.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("spirit.search.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("spirit.search.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("spirit.search.command-description", { lng: locale, ns: "commands" }),
					]),
				),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("spirit.search.command-option-query-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("spirit.search.command-option-query-name", { lng: locale, ns: "commands" }),
							]),
						),
						description: t("spirit.search.command-option-query-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: Object.fromEntries(
							LOCALES.map((locale) => [
								locale,
								t("spirit.search.command-option-query-description", {
									lng: locale,
									ns: "commands",
								}),
							]),
						),
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
	{
		name: "content-creators",
		description: "Edit your information to display on the website. We know who you are.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.String,
				name: "name",
				description: "What are you known as?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.Name],
			},
			{
				type: ApplicationCommandOptionType.Attachment,
				name: "avatar",
				description: "Upload an avatar.",
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "description",
				description: "Use a concise description to introduce yourself.",
				max_length:
					CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.Description],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "youtube",
				description: "What is your YouTube handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.YouTube],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "twitch",
				description: "What is your Twitch handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.Twitch],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "tiktok",
				description: "What is your TikTok handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.TikTok],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "x",
				description: "What is your X handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.X],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "instagram",
				description: "What is your Instagram handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.Instagram],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "facebook",
				description: "What is your Facebook handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.Facebook],
			},
			{
				type: ApplicationCommandOptionType.String,
				name: "bluesky",
				description: "What is your Bluesky handle?",
				max_length: CONTENT_CREATORS_EDIT_TYPE_TO_MAXIMUM_LENGTH[ContentCreatorsEditType.Bluesky],
			},
		],
	},
] as const;

const rest = new REST({ version: "10" }).setToken(TOKEN);
const api = new API(rest);
pino.info("Setting application commands...");

const settled = await Promise.allSettled([
	api.applicationCommands.bulkOverwriteGlobalCommands(APPLICATION_ID, COMMANDS),
	api.applicationCommands.bulkOverwriteGuildCommands(
		APPLICATION_ID,
		DEVELOPER_GUILD_ID,
		DEVELOPER_COMMANDS,
	),
]);

const errors = settled
	.filter((result): result is PromiseRejectedResult => result.status === "rejected")
	.map((result) => result.reason);

if (errors.length > 0) {
	pino.error(errors, "Error setting commands.");
} else {
	pino.info("Successfully set application commands.");
}
