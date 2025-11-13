import process from "node:process";
import { info, setFailed, summary } from "@actions/core";
import {
	API,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	PermissionFlagsBits,
	type RESTPutAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import {
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	GUESS_TYPE_VALUES,
	MAXIMUM_WINGED_LIGHT,
	MINIMUM_WINGED_LIGHT,
	SCHEDULE_TYPE_VALUES,
	ScheduleType,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	SPIRITS_HISTORY_ORDER_TYPE_VALUES,
	WING_BUFFS,
} from "@thatskyapplication/utility";
import { init, t } from "i18next";
import { z } from "zod/v4";
import {
	I18_NEXT_OPTIONS,
	LOCALES,
	QUEST_NUMBER,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
} from "./constants.js";

const envSchema = z.object({
	GITHUB_ACTIONS: z
		.string()
		.optional()
		.transform((value) => value === "true"),
	DISCORD_TOKEN: z.string().min(1),
	SUPPORT_SERVER_GUILD_ID: z.string().min(1),
	TOP_GG_TOKEN: z.string().optional(),
});

const { GITHUB_ACTIONS, DISCORD_TOKEN, SUPPORT_SERVER_GUILD_ID, TOP_GG_TOKEN } = envSchema.parse(
	process.env,
);

const errors = [];

await init({
	...I18_NEXT_OPTIONS,
	missingKeyHandler: (locale, namespace, key) =>
		errors.push(
			`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`,
		),
});

function localisations(name: string, options: Record<string, unknown> = {}, ns = "commands") {
	return Object.fromEntries(
		LOCALES.map((locale) => [locale, t(name, { lng: locale, ns, ...options })]),
	);
}

const COMMANDS: RESTPutAPIApplicationCommandsJSONBody = [
	{
		name: t("about.command-name", { ns: "commands" }),
		name_localizations: localisations("about.command-name"),
		description: t("about.command-description", { ns: "commands" }),
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
		name: t("calculate.command-name", { ns: "commands" }),
		name_localizations: localisations("calculate.command-name"),
		description: t("calculate.command-description", { ns: "commands" }),
		description_localizations: localisations("calculate.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("calculate.ascended-candles.command-name", {
					ns: "commands",
				}),
				name_localizations: localisations("calculate.ascended-candles.command-name"),
				description: t("calculate.ascended-candles.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("calculate.ascended-candles.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.ascended-candles.command-option-start-name", {
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-start-name",
						),
						description: t("calculate.ascended-candles.command-option-start-description", {
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
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-goal-name",
						),
						description: t("calculate.ascended-candles.command-option-goal-description", {
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
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-eye-of-eden-name",
						),
						description: t("calculate.ascended-candles.command-option-eye-of-eden-description", {
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
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.ascended-candles.command-option-shard-eruptions-name",
						),
						description: t(
							"calculate.ascended-candles.command-option-shard-eruptions-description",
							{
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
				name: t("calculate.event-tickets.command-name", { ns: "commands" }),
				name_localizations: localisations("calculate.event-tickets.command-name"),
				description: t("calculate.event-tickets.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("calculate.event-tickets.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.event-tickets.command-option-start-name", {
							ns: "commands",
						}),
						name_localizations: localisations("calculate.event-tickets.command-option-start-name"),
						description: t("calculate.event-tickets.command-option-start-description", {
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
							ns: "commands",
						}),
						name_localizations: localisations("calculate.event-tickets.command-option-goal-name"),
						description: t("calculate.event-tickets.command-option-goal-description", {
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
					ns: "commands",
				}),
				name_localizations: localisations("calculate.seasonal-candles.command-name"),
				description: t("calculate.seasonal-candles.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("calculate.seasonal-candles.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.seasonal-candles.command-option-start-name", {
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.seasonal-candles.command-option-start-name",
						),
						description: t("calculate.seasonal-candles.command-option-start-description", {
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
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.seasonal-candles.command-option-goal-name",
						),
						description: t("calculate.seasonal-candles.command-option-goal-description", {
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
				name: t("calculate.winged-light.command-name", { ns: "commands" }),
				name_localizations: localisations("calculate.winged-light.command-name"),
				description: t("calculate.winged-light.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("calculate.winged-light.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("calculate.winged-light.command-option-wing-buffs-name", {
							ns: "commands",
						}),
						name_localizations: localisations(
							"calculate.winged-light.command-option-wing-buffs-name",
						),
						description: t("calculate.winged-light.command-option-wing-buffs-description", {
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
		name: t("catalogue.command-name", { ns: "commands" }),
		name_localizations: localisations("catalogue.command-name"),
		description: t("catalogue.command-description", { ns: "commands" }),
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
		name: t("checklist.command-name", { ns: "commands" }),
		name_localizations: localisations("checklist.command-name"),
		description: t("checklist.command-description", { ns: "commands" }),
		description_localizations: localisations("checklist.command-description"),
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
		name: t("configure.command-name", { ns: "commands" }),
		name_localizations: localisations("configure.command-name"),
		description: t("configure.command-description", { ns: "commands" }),
		description_localizations: localisations("configure.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.ai.command-name", { ns: "commands" }),
				name_localizations: localisations("configure.ai.command-name"),
				description: t("configure.ai.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("configure.ai.command-description"),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.daily-guides.command-name", { ns: "commands" }),
				name_localizations: localisations("configure.daily-guides.command-name"),
				description: t("configure.daily-guides.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("configure.daily-guides.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: t("configure.daily-guides.command-option-channel-name", {
							ns: "commands",
						}),
						name_localizations: localisations("configure.daily-guides.command-option-channel-name"),
						description: t("configure.daily-guides.command-option-channel-description", {
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
				name: t("configure.me.command-name", { ns: "commands" }),
				name_localizations: localisations("configure.me.command-name"),
				description: t("configure.me.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("configure.me.command-description"),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.notifications.command-name", { ns: "commands" }),
				name_localizations: localisations("configure.notifications.command-name"),
				description: t("configure.notifications.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("configure.notifications.command-description"),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("configure.welcome.command-name", { ns: "commands" }),
				name_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("configure.welcome.command-name", { lng: locale, ns: "commands" }),
					]),
				),
				description: t("configure.welcome.command-description", {
					ns: "commands",
				}),
				description_localizations: Object.fromEntries(
					LOCALES.map((locale) => [
						locale,
						t("configure.welcome.command-description", { lng: locale, ns: "commands" }),
					]),
				),
			},
		],
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: t("daily-guides.command-name", { ns: "commands" }),
		name_localizations: localisations("daily-guides.command-name"),
		description: t("daily-guides.command-description", { ns: "commands" }),
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
		name: t("data.command-name", { ns: "commands" }),
		name_localizations: localisations("data.command-name"),
		description: t("data.command-description", { ns: "commands" }),
		description_localizations: localisations("data.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("data.delete.command-name", { ns: "commands" }),
				name_localizations: localisations("data.delete.command-name"),
				description: t("data.delete.command-description", {
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
		name: t("Gift-Heart.command-name", { ns: "commands" }),
		name_localizations: localisations("Gift-Heart.command-name"),
		type: ApplicationCommandType.User,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [InteractionContextType.Guild, InteractionContextType.PrivateChannel],
	},
	{
		name: t("guess.command-name", { ns: "commands" }),
		name_localizations: localisations("guess.command-name"),
		description: t("guess.command-description", { ns: "commands" }),
		description_localizations: localisations("guess.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("guess.game.command-name", { ns: "commands" }),
				name_localizations: localisations("guess.game.command-name"),
				description: t("guess.game.command-description", { ns: "commands" }),
				description_localizations: localisations("guess.game.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("guess.game.command-option-type-name", {
							ns: "commands",
						}),
						name_localizations: localisations("guess.game.command-option-type-name"),
						description: t("guess.game.command-option-type-description", {
							ns: "commands",
						}),
						description_localizations: localisations("guess.game.command-option-type-description"),
						choices: GUESS_TYPE_VALUES.map((guessType) => ({
							name: t(`guess.game.command-option-type-choice-name.${guessType}`, {
								ns: "commands",
							}),
							name_localizations: localisations(
								`guess.game.command-option-type-choice-name.${guessType}`,
							),
							value: guessType,
						})),
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("guess.leaderboard.command-name", { ns: "commands" }),
				name_localizations: localisations("guess.leaderboard.command-name"),
				description: t("guess.leaderboard.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("guess.leaderboard.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("guess.leaderboard.command-option-type-name", {
							ns: "commands",
						}),
						name_localizations: localisations("guess.leaderboard.command-option-type-name"),
						description: t("guess.leaderboard.command-option-type-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"guess.leaderboard.command-option-type-description",
						),
						choices: GUESS_TYPE_VALUES.map((guessType) => ({
							name: t(`guess.game.command-option-type-choice-name.${guessType}`, {
								ns: "commands",
							}),
							name_localizations: localisations(
								`guess.leaderboard.command-option-type-choice-name.${guessType}`,
							),
							value: guessType,
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
		name: t("hair-tousle.command-name", { ns: "commands" }),
		name_localizations: localisations("hair-tousle.command-name"),
		description: t("hair-tousle.command-description", { ns: "commands" }),
		description_localizations: localisations("hair-tousle.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("hair-tousle.command-option-user-name", { ns: "commands" }),
				name_localizations: localisations("hair-tousle.command-option-user-name"),
				description: t("hair-tousle.command-option-user-description", {
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
		name: t("heart.command-name", { ns: "commands" }),
		name_localizations: localisations("heart.command-name"),
		description: t("heart.command-description", { ns: "commands" }),
		description_localizations: localisations("heart.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("heart.gift.command-name", { ns: "commands" }),
				name_localizations: localisations("heart.gift.command-name"),
				description: t("heart.gift.command-description", { ns: "commands" }),
				description_localizations: localisations("heart.gift.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: t("heart.gift.command-option-user-name", {
							ns: "commands",
						}),
						name_localizations: localisations("heart.gift.command-option-user-name"),
						description: t("heart.gift.command-option-user-description", {
							ns: "commands",
						}),
						description_localizations: localisations("heart.gift.command-option-user-description"),
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("heart.history.command-name", { ns: "commands" }),
				name_localizations: localisations("heart.history.command-name"),
				description: t("heart.history.command-description", {
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
		name: t("high-five.command-name", { ns: "commands" }),
		name_localizations: localisations("high-five.command-name"),
		description: t("high-five.command-description", { ns: "commands" }),
		description_localizations: localisations("high-five.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("high-five.command-option-user-name", { ns: "commands" }),
				name_localizations: localisations("high-five.command-option-user-name"),
				description: t("high-five.command-option-user-description", {
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
		name: t("hug.command-name", { ns: "commands" }),
		name_localizations: localisations("hug.command-name"),
		description: t("hug.command-description", { ns: "commands" }),
		description_localizations: localisations("hug.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("hug.command-option-user-name", { ns: "commands" }),
				name_localizations: localisations("hug.command-option-user-name"),
				description: t("hug.command-option-user-description", {
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
		name: t("krill.command-name", { ns: "commands" }),
		name_localizations: localisations("krill.command-name"),
		description: t("krill.command-description", { ns: "commands" }),
		description_localizations: localisations("krill.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("krill.command-option-user-name", { ns: "commands" }),
				name_localizations: localisations("krill.command-option-user-name"),
				description: t("krill.command-option-user-description", {
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
		name: t("play-fight.command-name", { ns: "commands" }),
		name_localizations: localisations("play-fight.command-name"),
		description: t("play-fight.command-description", { ns: "commands" }),
		description_localizations: localisations("play-fight.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: t("play-fight.command-option-user-name", { ns: "commands" }),
				name_localizations: localisations("play-fight.command-option-user-name"),
				description: t("play-fight.command-option-user-description", {
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
		name: t("quest.command-name", { ns: "commands" }),
		name_localizations: localisations("quest.command-name"),
		description: t("quest.command-description", { ns: "commands" }),
		description_localizations: localisations("quest.command-description"),
		options: [
			{
				type: ApplicationCommandOptionType.Integer,
				name: t("quest.command-option-daily-name", { ns: "commands" }),
				name_localizations: localisations("quest.command-option-daily-name"),
				description: t("quest.command-option-daily-description", {
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
		name: t("schedule.command-name", { ns: "commands" }),
		name_localizations: localisations("schedule.command-name"),
		description: t("schedule.command-description", { ns: "commands" }),
		description_localizations: localisations("schedule.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Integer,
				name: t("schedule.command-option-type-name", {
					ns: "commands",
				}),
				name_localizations: localisations("schedule.command-option-type-name"),
				description: t("schedule.command-option-type-description", {
					ns: "commands",
				}),
				description_localizations: localisations("schedule.command-option-type-description"),
				choices: SCHEDULE_TYPE_VALUES.filter(
					(scheduleType) => scheduleType !== ScheduleType.Dragon,
				).map((scheduleType) => ({
					name: t(`schedule.command-option-type-choice-name.${scheduleType}`, {
						ns: "commands",
					}),
					name_localizations: localisations(
						`schedule.command-option-type-choice-name.${scheduleType}`,
					),
					value: scheduleType,
				})),
			},
			{
				type: ApplicationCommandOptionType.Boolean,
				name: t("schedule.command-option-hide-name", { ns: "commands" }),
				name_localizations: localisations("schedule.command-option-hide-name"),
				description: t("schedule.command-option-hide-description", {
					ns: "commands",
				}),
				description_localizations: localisations("schedule.command-option-hide-description"),
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
		name: t("shard-eruption.command-name", { ns: "commands" }),
		name_localizations: localisations("shard-eruption.command-name"),
		description: t("shard-eruption.command-description", { ns: "commands" }),
		description_localizations: localisations("shard-eruption.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("shard-eruption.command-option-browse-name", {
					ns: "commands",
				}),
				name_localizations: localisations("shard-eruption.command-option-browse-name"),
				description: t("shard-eruption.command-option-browse-description", {
					ns: "commands",
				}),
				description_localizations: localisations(
					"shard-eruption.command-option-browse-description",
				),
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("shard-eruption.command-option-today-name", {
					ns: "commands",
				}),
				name_localizations: localisations("shard-eruption.command-option-today-name"),
				description: t("shard-eruption.command-option-today-description", {
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
	// {
	// 	name: t("shop.command-name", { ns: "commands" }),
	// 	name_localizations: localisations("shop.command-name"),
	// 	description: t("shop.command-description", { ns: "commands" }),
	// 	description_localizations: localisations("shop.command-description"),
	// 	type: ApplicationCommandType.ChatInput,
	// 	integration_types: [
	// 		ApplicationIntegrationType.GuildInstall,
	// 		ApplicationIntegrationType.UserInstall,
	// 	],
	// 	contexts: [
	// 		InteractionContextType.Guild,
	// 		InteractionContextType.BotDM,
	// 		InteractionContextType.PrivateChannel,
	// 	],
	// },
	{
		name: t("sky-profile.command-name", { ns: "commands" }),
		name_localizations: localisations("sky-profile.command-name"),
		description: t("sky-profile.command-description", { ns: "commands" }),
		description_localizations: localisations("sky-profile.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("sky-profile.edit.command-name", { ns: "commands" }),
				name_localizations: localisations("sky-profile.edit.command-name"),
				description: t("sky-profile.edit.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("sky-profile.edit.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-name-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-name-name"),
						description: t("sky-profile.edit.command-option-name-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-name-description",
						),
						max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: t("sky-profile.edit.command-option-icon-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-icon-name"),
						description: t("sky-profile.edit.command-option-icon-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-icon-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: t("sky-profile.edit.command-option-banner-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-banner-name"),
						description: t("sky-profile.edit.command-option-banner-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-banner-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("sky-profile.edit.command-option-winged-light-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-winged-light-name"),
						description: t("sky-profile.edit.command-option-winged-light-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-winged-light-description",
							{ minimum: MINIMUM_WINGED_LIGHT, maximum: MAXIMUM_WINGED_LIGHT },
						),
						choices: SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES.map((skyProfileWingedLightType) => ({
							name: t(
								`sky-profile.edit.command-option-winged-light-choice-name.${skyProfileWingedLightType}`,
								{ ns: "commands" },
							),
							name_localizations: localisations(
								`sky-profile.edit.command-option-winged-light-choice-name.${skyProfileWingedLightType}`,
							),
							value: skyProfileWingedLightType,
						})),
					},
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("sky-profile.edit.command-option-spirit-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-spirit-name"),
						description: t("sky-profile.edit.command-option-spirit-description", {
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
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-country-name"),
						description: t("sky-profile.edit.command-option-country-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-country-description",
						),
						autocomplete: true,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.edit.command-option-hangout-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-hangout-name"),
						description: t("sky-profile.edit.command-option-hangout-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-hangout-description",
						),
						max_length: SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
						min_length: SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.edit.command-option-catalogue-progression-name", {
							ns: "commands",
						}),
						name_localizations: localisations(
							"sky-profile.edit.command-option-catalogue-progression-name",
						),
						description: t("sky-profile.edit.command-option-catalogue-progression-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.edit.command-option-catalogue-progression-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.edit.command-option-guess-rank-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.edit.command-option-guess-rank-name"),
						description: t("sky-profile.edit.command-option-guess-rank-description", {
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
				name: t("sky-profile.explore.command-name", { ns: "commands" }),
				name_localizations: localisations("sky-profile.explore.command-name"),
				description: t("sky-profile.explore.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("sky-profile.explore.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: t("sky-profile.explore.command-option-name-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.explore.command-option-name-name"),
						description: t("sky-profile.explore.command-option-name-description", {
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
				name: t("sky-profile.show.command-name", { ns: "commands" }),
				name_localizations: localisations("sky-profile.show.command-name"),
				description: t("sky-profile.show.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("sky-profile.show.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: t("sky-profile.show.command-option-user-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.show.command-option-user-name"),
						description: t("sky-profile.show.command-option-user-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"sky-profile.show.command-option-user-description",
						),
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: t("sky-profile.show.command-option-hide-name", {
							ns: "commands",
						}),
						name_localizations: localisations("sky-profile.show.command-option-hide-name"),
						description: t("sky-profile.show.command-option-hide-description", {
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
		name: t("Sky-Profile.command-name", { ns: "commands" }),
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
		name: t("spirits.command-name", { ns: "commands" }),
		name_localizations: localisations("spirits.command-name"),
		description: t("spirits.command-description", { ns: "commands" }),
		description_localizations: localisations("spirits.command-description"),
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("spirits.history.command-name", { ns: "commands" }),
				name_localizations: localisations("spirits.history.command-name"),
				description: t("spirits.history.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("spirits.history.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("spirits.history.command-option-order-name", {
							ns: "commands",
						}),
						name_localizations: localisations("spirits.history.command-option-order-name"),
						description: t("spirits.history.command-option-order-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"spirits.history.command-option-order-description",
						),
						choices: SPIRITS_HISTORY_ORDER_TYPE_VALUES.map((spiritsHistoryOrderType) => ({
							name: t(
								`spirits.history.command-option-order-choice-name.${spiritsHistoryOrderType}`,
								{ ns: "commands" },
							),
							name_localizations: localisations(
								`spirits.history.command-option-order-choice-name.${spiritsHistoryOrderType}`,
							),
							value: spiritsHistoryOrderType,
						})),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: t("spirits.search.command-name", { ns: "commands" }),
				name_localizations: localisations("spirits.search.command-name"),
				description: t("spirits.search.command-description", {
					ns: "commands",
				}),
				description_localizations: localisations("spirits.search.command-description"),
				options: [
					{
						type: ApplicationCommandOptionType.Integer,
						name: t("spirits.search.command-option-query-name", {
							ns: "commands",
						}),
						name_localizations: localisations("spirits.search.command-option-query-name"),
						description: t("spirits.search.command-option-query-description", {
							ns: "commands",
						}),
						description_localizations: localisations(
							"spirits.search.command-option-query-description",
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

const SUPPORT_SERVER_COMMANDS: RESTPutAPIApplicationGuildCommandsJSONBody = [
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
		],
		default_member_permissions: "0",
	},
	{
		name: t("daily-guides.command-name", { ns: "commands" }),
		name_localizations: localisations("daily-guides.command-name"),
		description: "Edits the daily guides.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "set",
				description: "Sets data for the daily guides.",
				options: [
					...QUEST_NUMBER.map((questNumber) => ({
						type: ApplicationCommandOptionType.Integer as const,
						name: `quest-${questNumber}`,
						description: "The daily quest.",
						autocomplete: true,
					})),
					{
						type: ApplicationCommandOptionType.Attachment,
						name: "travelling-rock",
						description: "The location of the travelling rock.",
					},
				],
			},
		],
	},
] as const;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const api = new API(rest);
const applicationId = (await api.users.getCurrent()).id;
info("Setting application commands...");

const commands = [
	api.applicationCommands.bulkOverwriteGlobalCommands(applicationId, COMMANDS),
	api.applicationCommands.bulkOverwriteGuildCommands(
		applicationId,
		SUPPORT_SERVER_GUILD_ID,
		SUPPORT_SERVER_COMMANDS,
	),
];

const settled = await Promise.allSettled(commands);

for (const result of settled) {
	if (result.status === "fulfilled") {
		continue;
	}

	errors.push(result.reason);
}

const deploymentResults = [];

if (errors.length > 0) {
	deploymentResults.push(["Discord", "Failed", `${errors.length} error(s).`]);
} else {
	deploymentResults.push(["Discord", "Success", `${COMMANDS.length} command(s).`]);
}

if (GITHUB_ACTIONS) {
	if (TOP_GG_TOKEN) {
		const response = await fetch("https://top.gg/api/v1/projects/@me/commands", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TOP_GG_TOKEN}`,
			},
			body: JSON.stringify(COMMANDS),
		});

		if (response.ok) {
			deploymentResults.push(["Top.gg", "Success", `${COMMANDS.length} command(s).`]);
		} else {
			errors.push(await response.json());
			deploymentResults.push(["Top.gg", "Failed", "Deployment error."]);
		}
	} else {
		deploymentResults.push(["Top.gg", "Skipped", "No token."]);
	}
}

const result = summary.addHeading("Commands deployment").addTable([
	[
		{ data: "Platform", header: true },
		{ data: "Status", header: true },
		{ data: "Details", header: true },
	],
	...deploymentResults,
]);

if (errors.length > 0) {
	result.addDetails("Errors", `\`\`\`\n${errors.join("\n\n")}\n\`\`\``);
}

if (GITHUB_ACTIONS) {
	await result.write();
} else {
	info(result.stringify());
}

if (errors.length > 0) {
	setFailed("Command deployment failed.");
	process.exit(1);
}
