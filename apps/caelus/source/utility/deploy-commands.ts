import { t } from "i18next";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DEVELOPER_GUILD_ID,
	LOCALES,
	QUEST_NUMBER,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
	SKY_PROFILE_MINIMUM_SPOT_LENGTH,
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
	type RESTPutAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import {
	GUESS_DIFFICULTY_LEVEL_VALUES,
	GuessDifficultyLevelToName,
	MAXIMUM_WINGED_LIGHT,
	MINIMUM_WINGED_LIGHT,
	WING_BUFFS,
} from "@thatskyapplication/utility";
import { DISCORD_TOKEN } from "./configuration.js";

function localisations(name: string, ns = "commands") {
	return Object.fromEntries(LOCALES.map((locale) => [locale, t(name, { lng: locale, ns })]));
}

const COMMANDS: RESTPutAPIApplicationCommandsJSONBody = [
	{
		name: t("about.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("about.command-name"),
		description: t("about.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("about.command-description"),
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
		name: t("bonk.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("bonk.command-name"),
		description: t("bonk.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("bonk.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("bonk.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("bonk.command-option-user-name"),
				description: t("bonk.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("bonk.command-option-user-description"),
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
		name_localizations: localisations("calculate.command-name"),
		description: t("calculate.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("calculate.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("calculate.ascended-candles.command-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: localisations("calculate.ascended-candles.command-name"),
				description: t("calculate.ascended-candles.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("calculate.ascended-candles.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.ascended-candles.command-option-start-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-start-name",
						),
						description: t("calculate.ascended-candles.command-option-start-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.ascended-candles.command-option-start-description",
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
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-goal-name",
						),
						description: t("calculate.ascended-candles.command-option-goal-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.ascended-candles.command-option-goal-description",
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
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-eye-of-eden-name",
						),
						description: t("calculate.ascended-candles.command-option-eye-of-eden-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.ascended-candles.command-option-eye-of-eden-description",
						),
						required: false,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("calculate.ascended-candles.command-option-shard-eruptions-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-shard-eruptions-name",
						),
						description: t(
							"calculate.ascended-candles.command-option-shard-eruptions-description",
							{
								lng: Locale.EnglishGB,
								ns: "commands",
							},
						),
						description_localizations: localisations(
							"calculate.ascended-candles.command-option-shard-eruptions-description",
						),
						required: false,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("calculate.event-tickets.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("calculate.event-tickets.command-name"),
				description: t("calculate.event-tickets.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("calculate.event-tickets.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.event-tickets.command-option-start-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("calculate.event-tickets.command-option-start-name"),
						description: t("calculate.event-tickets.command-option-start-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.event-tickets.command-option-start-description",
						),
						min_value: 0,
						required: true,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.event-tickets.command-option-goal-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("calculate.event-tickets.command-option-goal-name"),
						description: t("calculate.event-tickets.command-option-goal-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.event-tickets.command-option-goal-description",
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
				name_localizations: localisations("calculate.seasonal-candles.command-name"),
				description: t("calculate.seasonal-candles.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("calculate.seasonal-candles.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.seasonal-candles.command-option-start-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.seasonal-candles.command-option-start-name",
						),
						description: t("calculate.seasonal-candles.command-option-start-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.seasonal-candles.command-option-start-description",
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
						name_localizations: localisations(
							"calculate.seasonal-candles.command-option-goal-name",
						),
						description: t("calculate.seasonal-candles.command-option-goal-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.seasonal-candles.command-option-goal-description",
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
				name_localizations: localisations("calculate.winged-light.command-name"),
				description: t("calculate.winged-light.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("calculate.winged-light.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.winged-light.command-option-wing-buffs-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.winged-light.command-option-wing-buffs-name",
						),
						description: t("calculate.winged-light.command-option-wing-buffs-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"calculate.winged-light.command-option-wing-buffs-description",
						),
						max_value: WING_BUFFS.length,
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
		name_localizations: localisations("catalogue.command-name"),
		description: t("catalogue.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("catalogue.command-description"),
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
		name: t("configure.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("configure.command-name"),
		description: t("configure.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("configure.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.ai.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("configure.ai.command-name"),
				description: t("configure.ai.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("configure.ai.command-description"),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("configure.daily-guides.command-name"),
				description: t("configure.daily-guides.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("configure.daily-guides.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: t("configure.daily-guides.command-option-channel-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("configure.daily-guides.command-option-channel-name"),
						description: t("configure.daily-guides.command-option-channel-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"configure.daily-guides.command-option-channel-description",
						),
						channel_types: [...DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES],
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("configure.notifications.command-name"),
				description: t("configure.notifications.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("configure.notifications.command-description"),
			},
		],
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: t("daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("daily-guides.command-name"),
		description: t("daily-guides.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("daily-guides.command-description"),
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
		name: t("data.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("data.command-name"),
		description: t("data.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("data.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("data.delete.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("data.delete.command-name"),
				description: t("data.delete.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("data.delete.command-description"),
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
		name_localizations: localisations("Gift-Heart.command-name"),
		type: ApplicationCommandType.User,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("giveaway.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("giveaway.command-name"),
		description: t("giveaway.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("giveaway.command-description"),
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
		name: t("guess.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("guess.command-name"),
		description: t("guess.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("guess.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("guess.game.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("guess.game.command-name"),
				description: t("guess.game.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
				description_localizations: localisations("guess.game.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("guess.game.command-option-difficulty-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("guess.game.command-option-difficulty-name"),
						description: t("guess.game.command-option-difficulty-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"guess.game.command-option-difficulty-description",
						),
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							name_localizations: localisations(
								`guess.game.command-option-difficulty-choice-name.${guessDifficultyLevel}`,
							),
							value: guessDifficultyLevel,
						})),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("guess.leaderboard.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("guess.leaderboard.command-name"),
				description: t("guess.leaderboard.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("guess.leaderboard.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("guess.leaderboard.command-option-difficulty-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("guess.leaderboard.command-option-difficulty-name"),
						description: t("guess.leaderboard.command-option-difficulty-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"guess.leaderboard.command-option-difficulty-description",
						),
						choices: GUESS_DIFFICULTY_LEVEL_VALUES.map((guessDifficultyLevel) => ({
							name: GuessDifficultyLevelToName[guessDifficultyLevel],
							name_localizations: localisations(
								`guess.leaderboard.command-option-difficulty-choice-name.${guessDifficultyLevel}`,
							),
							value: guessDifficultyLevel,
						})),
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
		name: t("hair-tousle.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("hair-tousle.command-name"),
		description: t("hair-tousle.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("hair-tousle.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("hair-tousle.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("hair-tousle.command-option-user-name"),
				description: t("hair-tousle.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("hair-tousle.command-option-user-description"),
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
		name: t("heart.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("heart.command-name"),
		description: t("heart.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("heart.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("heart.gift.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("heart.gift.command-name"),
				description: t("heart.gift.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
				description_localizations: localisations("heart.gift.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: t("heart.gift.command-option-user-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("heart.gift.command-option-user-name"),
						description: t("heart.gift.command-option-user-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations("heart.gift.command-option-user-description"),
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("heart.history.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("heart.history.command-name"),
				description: t("heart.history.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("heart.history.command-description"),
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
		name_localizations: localisations("high-five.command-name"),
		description: t("high-five.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("high-five.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("high-five.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("high-five.command-option-user-name"),
				description: t("high-five.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("high-five.command-option-user-description"),
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
		name_localizations: localisations("hug.command-name"),
		description: t("hug.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("hug.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("hug.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("hug.command-option-user-name"),
				description: t("hug.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("hug.command-option-user-description"),
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
		name_localizations: localisations("krill.command-name"),
		description: t("krill.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("krill.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("krill.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("krill.command-option-user-name"),
				description: t("krill.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("krill.command-option-user-description"),
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
		name: t("play-fight.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("play-fight.command-name"),
		description: t("play-fight.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("play-fight.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("play-fight.command-option-user-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("play-fight.command-option-user-name"),
				description: t("play-fight.command-option-user-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("play-fight.command-option-user-description"),
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
		name: t("quest.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("quest.command-name"),
		description: t("quest.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("quest.command-description"),
		options: [
			{
				type: ApplicationCommandOptionType.Integer,
				name: t("quest.command-option-daily-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("quest.command-option-daily-name"),
				description: t("quest.command-option-daily-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("quest.command-option-daily-description"),
				autocomplete: true,
				required: true,
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
		name: t("schedule.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("schedule.command-name"),
		description: t("schedule.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("schedule.command-description"),
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
		name_localizations: localisations("shard-eruption.command-name"),
		description: t("shard-eruption.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("shard-eruption.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("shard-eruption.command-option-browse-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: localisations("shard-eruption.command-option-browse-name"),
				description: t("shard-eruption.command-option-browse-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations(
					"shard-eruption.command-option-browse-description",
				),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("shard-eruption.command-option-today-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				name_localizations: localisations("shard-eruption.command-option-today-name"),
				description: t("shard-eruption.command-option-today-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("shard-eruption.command-option-today-description"),
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
		name: t("shop.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("shop.command-name"),
		description: t("shop.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("shop.command-description"),
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
		name: t("sky-profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		name_localizations: localisations("sky-profile.command-name"),
		description: t("sky-profile.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("sky-profile.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.edit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("sky-profile.edit.command-name"),
				description: t("sky-profile.edit.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("sky-profile.edit.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-name-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-name-name"),
						description: t("sky-profile.edit.command-option-name-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-name-description",
						),
						max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: t("sky-profile.edit.command-option-thumbnail-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-thumbnail-name"),
						description: t("sky-profile.edit.command-option-thumbnail-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-thumbnail-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: t("sky-profile.edit.command-option-icon-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-icon-name"),
						description: t("sky-profile.edit.command-option-icon-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-icon-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("sky-profile.edit.command-option-winged-light-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-winged-light-name"),
						description: t("sky-profile.edit.command-option-winged-light-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-winged-light-description",
						),
						max_value: MAXIMUM_WINGED_LIGHT,
						min_value: MINIMUM_WINGED_LIGHT,
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("sky-profile.edit.command-option-spirit-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-spirit-name"),
						description: t("sky-profile.edit.command-option-spirit-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-spirit-description",
						),
						autocomplete: true,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-country-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-country-name"),
						description: t("sky-profile.edit.command-option-country-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-country-description",
						),
						autocomplete: true,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-spot-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-spot-name"),
						description: t("sky-profile.edit.command-option-spot-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-spot-description",
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
						name_localizations: localisations(
							"sky-profile.edit.command-option-catalogue-progression-name",
						),
						description: t("sky-profile.edit.command-option-catalogue-progression-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-catalogue-progression-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.edit.command-option-guess-rank-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-guess-rank-name"),
						description: t("sky-profile.edit.command-option-guess-rank-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-guess-rank-description",
						),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.explore.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("sky-profile.explore.command-name"),
				description: t("sky-profile.explore.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("sky-profile.explore.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.explore.command-option-name-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.explore.command-option-name-name"),
						description: t("sky-profile.explore.command-option-name-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.explore.command-option-name-description",
						),
						autocomplete: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.show.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("sky-profile.show.command-name"),
				description: t("sky-profile.show.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("sky-profile.show.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: t("sky-profile.show.command-option-user-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.show.command-option-user-name"),
						description: t("sky-profile.show.command-option-user-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.show.command-option-user-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.show.command-option-hide-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.show.command-option-hide-name"),
						description: t("sky-profile.show.command-option-hide-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.show.command-option-hide-description",
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
		name_localizations: localisations("Sky-Profile.command-name"),
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
		name_localizations: localisations("spirit.command-name"),
		description: t("spirit.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
		description_localizations: localisations("spirit.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("spirit.search.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				name_localizations: localisations("spirit.search.command-name"),
				description: t("spirit.search.command-description", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}),
				description_localizations: localisations("spirit.search.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("spirit.search.command-option-query-name", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						name_localizations: localisations("spirit.search.command-option-query-name"),
						description: t("spirit.search.command-option-query-description", {
							lng: Locale.EnglishGB,
							ns: "commands",
						}),
						description_localizations: localisations(
							"spirit.search.command-option-query-description",
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

const DEVELOPER_COMMANDS: RESTPutAPIApplicationGuildCommandsJSONBody = [
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
								type: ApplicationCommandOptionType.Integer as const,
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
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "set-travelling-rock",
						description: "Sets the travelling rock's location for the daily guides.",
						options: [
							{
								type: ApplicationCommandOptionType.Attachment,
								name: "attachment",
								description: "The location of the travelling rock.",
								required: true,
							},
						],
					},
				],
			},
		],
		default_member_permissions: "0",
	},
] as const;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const api = new API(rest);
pino.info("Setting application commands...");

const commands = [
	api.applicationCommands.bulkOverwriteGlobalCommands(APPLICATION_ID, COMMANDS),
	api.applicationCommands.bulkOverwriteGuildCommands(
		APPLICATION_ID,
		DEVELOPER_GUILD_ID,
		DEVELOPER_COMMANDS,
	),
];

const settled = await Promise.allSettled(commands);

const errors = settled
	.filter((result) => result.status === "rejected")
	.map((result) => result.reason);

if (errors.length > 0) {
	pino.error(errors, "Error setting commands.");
} else {
	pino.info("Successfully set application commands.");
}
