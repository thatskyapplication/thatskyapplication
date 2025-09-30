import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitInteraction,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	ComponentType,
	GatewayDispatchEvents,
	InteractionType,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
	type Snowflake,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { addBreadcrumb, captureException } from "@sentry/node";
import {
	isRealm,
	isSeasonId,
	type ScheduleTypes,
	type SpiritIds,
	SpiritsHistoryOrderType,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { GUILD_CACHE } from "../caches/guilds.js";
import {
	AUTOCOMPLETE_COMMANDS,
	CHAT_INPUT_COMMANDS,
	USER_CONTEXT_MENU_COMMANDS,
} from "../commands/index.js";
import { client } from "../discord.js";
import {
	feedbackModalResponse,
	feedbackSubmission,
	issueModalResponse,
	issueSubmission,
} from "../features/about.js";
import {
	parseSetItems,
	parseViewEvent,
	parseViewSpirit,
	setElders,
	setRealm,
	setSeason,
	setSeasonItems,
	updateEverythingButtonSetting,
	viewElders,
	viewEvents,
	viewEventYears,
	viewNestingWorkshop,
	viewPermanentEventStore,
	viewRealm,
	viewRealms,
	viewReturningSpirits,
	viewSeason,
	viewSeasons,
	viewSecretArea,
	viewSettings,
	viewStart,
	viewStarterPacks,
} from "../features/catalogue.js";
import {
	checklistHandleDailyQuests,
	checklistHandleEventTickets,
	checklistHandleEyeOfEden,
	checklistHandleSeasonalCandles,
	checklistHandleShardEruptions,
} from "../features/checklist.js";
import { commandAnalyticsSend } from "../features/command-analytics.js";
import {
	dailyGuidesResponse,
	handleChannelSelectMenu as handleDailyGuidesChannelSelectMenu,
	handleDistributeButton,
	InteractiveType,
	interactive,
	questsReorder,
} from "../features/daily-guides.js";
import { deleteUserData } from "../features/data.js";
import { friendshipActionsCreateThread } from "../features/friendship-actions.js";
import {
	guessEventAnswer,
	guessHandleEndGame,
	guessSpiritAnswer,
	isGuessType,
	leaderboard,
	tryAgain,
} from "../features/guess.js";
import {
	HEART_HISTORY_BACK_CUSTOM_ID,
	HEART_HISTORY_NEXT_CUSTOM_ID,
	history,
} from "../features/heart.js";
import {
	ME_DELETE_AVATAR_CUSTOM_ID,
	ME_DELETE_BANNER_CUSTOM_ID,
	ME_DELETE_BIO_CUSTOM_ID,
	ME_SET_BIO_BUTTON_CUSTOM_ID,
	ME_SET_BIO_MODAL_CUSTOM_ID,
	meHandleDeleteButton,
	meHandleSetBioButton,
	meHandleSetBioModal,
} from "../features/me.js";
import {
	displayNotificationType,
	handleChannelSelectMenu as handleNotificationsChannelSelectMenu,
	handleRoleSelectMenu as handleNotificationsRoleSelectMenu,
	handleStringSelectMenu as handleNotificationsStringSelectMenu,
	isNotificationType,
	NOTIFICATIONS_SETUP_CHANNEL_CUSTOM_ID,
	NOTIFICATIONS_SETUP_CUSTOM_ID,
	NOTIFICATIONS_SETUP_OFFSET_CUSTOM_ID,
	NOTIFICATIONS_SETUP_ROLE_CUSTOM_ID,
	NOTIFICATIONS_VIEW_SETUP_CUSTOM_ID,
	setupResponse,
} from "../features/notifications.js";
import {
	SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID,
	SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID,
	SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID,
	SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID,
	SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID,
	SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID,
	scheduleDetailedBreakdown,
	scheduleOverview,
} from "../features/schedule.js";
import { browse, today } from "../features/shard-eruption.js";
import {
	SHOP_SUGGEST_CUSTOM_ID,
	SHOP_SUGGESTION_MODAL_CUSTOM_ID,
	shopSuggestionModal,
	shopSuggestionSubmission,
} from "../features/shop.js";
import {
	SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID,
	SKY_PROFILE_EDIT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS,
	SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS,
	SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID,
	SKY_PROFILE_REPORT_MODAL_CUSTOM_ID,
	SKY_PROFILE_RESET_CUSTOM_ID,
	SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_HANGOUT_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SET_SEASONS_SELECT_MENU_1_CUSTOM_ID,
	SKY_PROFILE_SET_SEASONS_SELECT_MENU_2_CUSTOM_ID,
	SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SHOW_RESET_CUSTOM_ID,
	skyProfileEdit,
	skyProfileExplore,
	skyProfileExploreLikedProfile,
	skyProfileExploreLikes,
	skyProfileExploreProfile,
	skyProfileLike,
	skyProfileReport,
	skyProfileReportModalPrompt,
	skyProfileReset,
	skyProfileSendReport,
	skyProfileSetDescription,
	skyProfileSetHangout,
	skyProfileSetName,
	skyProfileSetPlatform,
	skyProfileSetSeasons,
	skyProfileSetWingedLight,
	skyProfileShowEdit,
	skyProfileShowReset,
} from "../features/sky-profile.js";
import {
	handleSearchButton,
	SPIRITS_HISTORY_BACK_CUSTOM_ID,
	SPIRITS_HISTORY_NEXT_CUSTOM_ID,
	SPIRITS_VIEW_SPIRIT_CUSTOM_ID,
	search,
	spiritsHistory,
	spiritsParseSpiritsHistoryCustomId,
} from "../features/spirits.js";
import {
	handleChannelSelectMenu as handleWelcomeChannelSelectMenu,
	WELCOME_ACCENT_COLOUR_DELETE_SETTING_CUSTOM_ID,
	WELCOME_ACCENT_COLOUR_SETTING_CUSTOM_ID,
	WELCOME_ACCENT_COLOUR_SETTING_MODAL_CUSTOM_ID,
	WELCOME_ASSET_DELETE_SETTING_CUSTOM_ID,
	WELCOME_HUG_CUSTOM_ID,
	WELCOME_HUG_SETTING_CUSTOM_ID,
	WELCOME_MESSAGE_DELETE_SETTING_CUSTOM_ID,
	WELCOME_MESSAGE_SETTING_CUSTOM_ID,
	WELCOME_MESSAGE_SETTING_MODAL_CUSTOM_ID,
	WELCOME_WELCOME_CHANNEL_CUSTOM_ID,
	welcomeHandleAccentColourSettingButton,
	welcomeHandleAccentColourSettingDeleteButton,
	welcomeHandleAccentColourSettingModal,
	welcomeHandleAssetSettingDeleteButton,
	welcomeHandleHugButton,
	welcomeHandleHugSettingButton,
	welcomeHandleMessageSettingButton,
	welcomeHandleMessageSettingDeleteButton,
	welcomeHandleMessageSettingModal,
} from "../features/welcome.js";
import AI, { AI_FREQUENCY_SELECT_MENU_CUSTOM_ID } from "../models/AI.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_INVITE_URL } from "../utility/configuration.js";
import { CustomId } from "../utility/custom-id.js";
import {
	interactionInvoker,
	isAutocomplete,
	isButton,
	isChatInputCommand,
	isGuildButton,
	isGuildChannelSelectMenu,
	isGuildModalSubmit,
	isGuildRoleSelectMenu,
	isGuildStringSelectMenu,
	isModalSubmit,
	isStringSelectMenu,
	isUserContextMenuCommand,
	notInCachedGuildResponse,
} from "../utility/functions.js";
import { OptionResolver } from "../utility/option-resolver.js";
import {
	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
} from "../utility/shard-eruption.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.InteractionCreate;

function errorResponse(locale: Locale) {
	return {
		content: t("interaction-error", { lng: locale, ns: "general", url: SUPPORT_SERVER_INVITE_URL }),
		components: [],
		embeds: [],
		flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
	};
}

function errorResponseV2(locale: Locale) {
	return {
		components: [
			{
				type: ComponentType.TextDisplay as const,
				content: t("interaction-error", {
					lng: locale,
					ns: "general",
					url: SUPPORT_SERVER_INVITE_URL,
				}),
			},
		],
		flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

async function isNotComponentsV2(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	if (
		interaction.message.flags &&
		(interaction.message.flags & MessageFlags.IsComponentsV2) === MessageFlags.IsComponentsV2
	) {
		return false;
	}

	const promises = [];

	if (
		(BigInt(interaction.app_permissions) & PermissionFlagsBits.ViewChannel) ===
		PermissionFlagsBits.ViewChannel
	) {
		promises.push(
			client.api.channels.deleteMessage(interaction.channel.id, interaction.message.id),
		);
	}

	promises.push(
		client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This response is too old. Use the command again!",
			flags: MessageFlags.Ephemeral,
		}),
	);

	await Promise.all(promises);
	return true;
}

async function recoverInteractionError(interaction: APIInteraction, error: unknown) {
	const invoker = interactionInvoker(interaction);
	let errorTypeString = `Error from ${invoker.username} in ${interaction.channel!.id} from `;

	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			const options = new OptionResolver(interaction);
			errorTypeString += `running command ${interaction.data.type === ApplicationCommandType.ChatInput ? options.chatInputCommandText() : interaction.data.name}.`;
			break;
		}
		case InteractionType.MessageComponent: {
			errorTypeString += `interacting with a \`${interaction.data.custom_id}\` component.`;
			break;
		}
		case InteractionType.ApplicationCommandAutocomplete: {
			const options = new OptionResolver(interaction);
			const focused = options.getFocusedOption();
			errorTypeString += `autocompleting \`/${interaction.data.name}\` (\`${focused.name}\`, \`${focused.value}\`).`;
			break;
		}
		case InteractionType.ModalSubmit: {
			errorTypeString += `submitting \`${interaction.data.custom_id}\`.`;
			break;
		}
	}

	pino.error(error, errorTypeString);

	// We cannot respond to this.
	if (
		error instanceof DiscordAPIError &&
		(error.code === RESTJSONErrorCodes.UnknownInteraction ||
			error.code === RESTJSONErrorCodes.CannotSendAnEmptyMessage)
	) {
		return;
	}

	try {
		if (isAutocomplete(interaction)) {
			await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
				choices: [],
			});

			return;
		}
	} catch (error) {
		pino.error(error, "Failed to respond from recovering an interaction error.");
	}
}

function logCommand(
	interaction: APIChatInputApplicationCommandInteraction | APIUserApplicationCommandInteraction,
) {
	let command: string;
	let targetUser: Snowflake | undefined;

	if (isChatInputCommand(interaction)) {
		const options = new OptionResolver(interaction);
		command = options.chatInputCommandText();
	} else {
		command = interaction.data.name;
		targetUser = interaction.data.target_id;
	}

	const invoker = interactionInvoker(interaction);

	void commandAnalyticsSend({
		userId: invoker.id,
		guildId: interaction.guild_id,
		channelId: interaction.channel.id,
		commandId: interaction.data.id,
		commandString: command,
		userLocale: interaction.locale,
		guildLocale: interaction.guild_locale,
		date: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	});

	pino.info(
		{
			user: { id: invoker.id, username: invoker.username },
			command,
			guildId: interaction.guild_id,
			channelId: interaction.channel.id,
			targetUser,
			permissions: interaction.app_permissions,
			authorizingIntegrationOwners: interaction.authorizing_integration_owners,
			context: interaction.context,
			locale: { user: interaction.locale, guild: interaction.guild_locale },
		},
		`Command: ${command}`,
	);
}

function logMessageComponent(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const customId = interaction.data.custom_id;
	const invoker = interactionInvoker(interaction);

	pino.info(
		{
			user: { id: invoker.id, invokername: invoker.username },
			customId,
			values: "values" in interaction.data ? interaction.data.values : null,
			guildId: interaction.guild_id,
			channelId: interaction.channel.id,
			messageId: interaction.message.id,
			permissions: interaction.app_permissions,
			authorizingIntegrationOwners: interaction.authorizing_integration_owners,
			context: interaction.context,
			locale: { user: interaction.locale, guild: interaction.guild_locale },
		},
		`Component custom id: ${customId}`,
	);
}

function logModalSubmit(interaction: APIModalSubmitInteraction) {
	const customId = interaction.data.custom_id;
	const invoker = interactionInvoker(interaction);

	pino.info(
		{
			user: { id: invoker.id, invokername: invoker.username },
			customId,
			components: interaction.data.components,
			guildId: interaction.guild_id,
			channelId: "channel" in interaction ? interaction.channel.id : null,
			messageId: "message" in interaction ? interaction.message.id : null,
			permissions: interaction.app_permissions,
			authorizingIntegrationOwners: interaction.authorizing_integration_owners,
			context: interaction.context,
			locale: { user: interaction.locale, guild: interaction.guild_locale },
		},
		`Modal submit custom id: ${customId}`,
	);
}

export default {
	name,
	async fire({ api, data: interaction }) {
		if (isChatInputCommand(interaction)) {
			logCommand(interaction);
			const command = CHAT_INPUT_COMMANDS.find(({ name }) => name === interaction.data.name);

			if (!command) {
				pino.warn(interaction, "Received an unknown chat input command interaction.");

				await api.interactions.reply(
					interaction.id,
					interaction.token,
					errorResponseV2(interaction.locale),
				);

				return;
			}

			try {
				await command.chatInput(interaction);
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "Chat input command failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (isUserContextMenuCommand(interaction)) {
			logCommand(interaction);
			const command = USER_CONTEXT_MENU_COMMANDS.find(({ name }) => name === interaction.data.name);

			if (!command) {
				pino.warn(interaction, "Received an unknown user context menu command interaction.");

				await api.interactions.reply(
					interaction.id,
					interaction.token,
					errorResponseV2(interaction.locale),
				);

				return;
			}

			try {
				await command.userContextMenu(interaction);
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "User context menu command failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (isButton(interaction)) {
			logMessageComponent(interaction);
			const [id, ...parts] = interaction.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.DataDelete) {
					await deleteUserData(interaction);
					return;
				}

				if (id === CustomId.AboutFeedback) {
					await feedbackModalResponse(interaction);
					return;
				}

				if (id === CustomId.AboutIssue) {
					await issueModalResponse(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewStart || id === CustomId.CatalogueBackToStart) {
					await viewStart(interaction);
					return;
				}

				if (id === CustomId.CatalogueSettings) {
					await viewSettings(interaction);
					return;
				}

				if (id === CustomId.CatalogueSettingsEverything) {
					await updateEverythingButtonSetting(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewRealms) {
					await viewRealms(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewRealm) {
					const realmName = parts[0]!;

					if (isRealm(realmName)) {
						await viewRealm(interaction, realmName);
						return;
					}
				}

				if (id === CustomId.CatalogueViewElders) {
					await viewElders(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewSeasons) {
					await viewSeasons(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewSeason) {
					const seasonId = Number(parts[0]!);

					if (isSeasonId(seasonId)) {
						await viewSeason(interaction, seasonId);
						return;
					}
				}

				if (id === CustomId.CatalogueViewEventYears) {
					await viewEventYears(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewEventYear) {
					await viewEvents(interaction, parts[0]!);
					return;
				}

				if (id === CustomId.CatalogueViewEvent) {
					await parseViewEvent(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewStarterPacks) {
					await viewStarterPacks(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewSecretArea) {
					await viewSecretArea(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewPermanentEventStore) {
					await viewPermanentEventStore(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewNestingWorkshop) {
					await viewNestingWorkshop(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewReturningSpirits) {
					await viewReturningSpirits(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewSpirit) {
					await parseViewSpirit(interaction);
					return;
				}

				if (id === CustomId.CatalogueRealmEverything) {
					await setRealm(interaction);
					return;
				}

				if (id === CustomId.CatalogueEldersEverything) {
					await setElders(interaction);
					return;
				}

				if (id === CustomId.CatalogueSeasonEverything) {
					await setSeason(interaction);
					return;
				}

				if (id === CustomId.CatalogueItemsEverything) {
					await parseSetItems(interaction);
					return;
				}

				if (id === SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID) {
					await scheduleOverview(interaction);
					return;
				}

				if (id === CustomId.ChecklistDailyQuestsComplete) {
					await checklistHandleDailyQuests(interaction);
					return;
				}

				if (id === CustomId.ChecklistSeasonalCandlesComplete) {
					await checklistHandleSeasonalCandles(interaction);
					return;
				}

				if (id === CustomId.ChecklistEyeOfEdenComplete) {
					await checklistHandleEyeOfEden(interaction);
					return;
				}

				if (id === CustomId.ChecklistEventTicketsComplete) {
					await checklistHandleEventTickets(interaction);
					return;
				}

				if (id === CustomId.ChecklistShardEruptionsComplete) {
					await checklistHandleShardEruptions(interaction);
					return;
				}

				if (
					id === CustomId.ChecklistDailyQuestsShow ||
					id === SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID
				) {
					await dailyGuidesResponse(interaction);
					return;
				}

				if (
					id === CustomId.ChecklistShardEruptionsShow ||
					id === SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID
				) {
					await today(interaction, {
						ephemeral:
							interaction.message.flags &&
							(interaction.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral,
						newMessage: true,
					});

					return;
				}

				if (id === SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID) {
					const spiritId = Number(parts[0]) as SpiritIds;
					let flags = MessageFlags.IsComponentsV2;

					if (
						interaction.message.flags &&
						(interaction.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral
					) {
						flags |= MessageFlags.Ephemeral;
					}

					await client.api.interactions.reply(interaction.id, interaction.token, {
						components: search({ spirit: spirits().get(spiritId)!, locale: interaction.locale }),
						flags,
					});

					return;
				}

				if (id === SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID) {
					await spiritsHistory(interaction, {
						type: SpiritsHistoryOrderType.Natural,
						page: 1,
						ephemeral:
							interaction.message.flags &&
							(interaction.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral,
						newMessage: true,
					});

					return;
				}

				if (id === SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction);
					return;
				}

				if (
					id === SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID ||
					id === SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction, { offset: Number(parts[0]) });
					return;
				}

				if (id === SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await browse(interaction);
					return;
				}

				if (
					id === SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID ||
					id === SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID ||
					id === SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await browse(interaction, Number(parts[0]));
					return;
				}

				if (id === SKY_PROFILE_SHOW_RESET_CUSTOM_ID) {
					await skyProfileShowReset(interaction);
					return;
				}

				if (id === SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID) {
					await skyProfileShowEdit(interaction);
					return;
				}

				if (
					id === SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID
				) {
					await skyProfileExplore(interaction);
					return;
				}

				if (
					id === SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID
				) {
					await skyProfileExploreLikes(interaction);
					return;
				}

				if (
					id === SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID
				) {
					await skyProfileExploreProfile(interaction, parts[0]!);
					return;
				}

				if (
					id === SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID ||
					id === SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID
				) {
					await skyProfileExploreLikedProfile(interaction);
					return;
				}

				if (id === SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID) {
					await skyProfileLike(interaction);
					return;
				}

				if (id === SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID) {
					await skyProfileLike(interaction, true);
					return;
				}

				if (id === SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID) {
					await skyProfileReport(interaction);
					return;
				}

				if (id === SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID) {
					await skyProfileReport(interaction, true);
					return;
				}

				if (id === SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID) {
					await skyProfileReportModalPrompt(interaction);
					return;
				}

				if (id === SPIRITS_HISTORY_BACK_CUSTOM_ID || id === SPIRITS_HISTORY_NEXT_CUSTOM_ID) {
					// We already have an array. Double-check this.
					const { type, page } = spiritsParseSpiritsHistoryCustomId(interaction.data.custom_id);
					await spiritsHistory(interaction, { type, page });
					return;
				}

				if (id === SPIRITS_VIEW_SPIRIT_CUSTOM_ID) {
					await handleSearchButton(interaction);
					return;
				}

				if (id === HEART_HISTORY_BACK_CUSTOM_ID || id === HEART_HISTORY_NEXT_CUSTOM_ID) {
					await history(interaction);
					return;
				}

				if (
					id === CustomId.GuessSpiritOption1 ||
					id === CustomId.GuessSpiritOption2 ||
					id === CustomId.GuessSpiritOption3
				) {
					await guessSpiritAnswer(interaction);
					return;
				}

				if (
					id === CustomId.GuessEventOption1 ||
					id === CustomId.GuessEventOption2 ||
					id === CustomId.GuessEventOption3
				) {
					await guessEventAnswer(interaction);
					return;
				}

				if (id === CustomId.GuessEnd) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await guessHandleEndGame(interaction);
					return;
				}

				if (id === CustomId.GuessTryAgain) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await tryAgain(interaction);
					return;
				}

				if (id === CustomId.GuessLeaderboardBack || id === CustomId.GuessLeaderboardNext) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					const guessType = Number(parts[0]);

					if (isGuessType(guessType)) {
						await leaderboard(interaction, guessType);
						return;
					}
				}

				if (id === SHOP_SUGGEST_CUSTOM_ID) {
					await shopSuggestionModal(interaction);
					return;
				}

				if (isGuildButton(interaction)) {
					if (id === CustomId.FriendshipActionsContribute) {
						await friendshipActionsCreateThread(interaction);
						return;
					}

					if (id === ME_SET_BIO_BUTTON_CUSTOM_ID) {
						await meHandleSetBioButton(interaction);
						return;
					}

					if (id === ME_DELETE_BIO_CUSTOM_ID) {
						await meHandleDeleteButton(interaction, { bio: null });
						return;
					}

					if (id === ME_DELETE_AVATAR_CUSTOM_ID) {
						await meHandleDeleteButton(interaction, { avatar: null });
						return;
					}

					if (id === ME_DELETE_BANNER_CUSTOM_ID) {
						await meHandleDeleteButton(interaction, { banner: null });
						return;
					}

					if (id === NOTIFICATIONS_VIEW_SETUP_CUSTOM_ID) {
						const guild = GUILD_CACHE.get(interaction.guild_id);

						if (!guild) {
							await client.api.interactions.updateMessage(
								interaction.id,
								interaction.token,
								notInCachedGuildResponse(interaction.locale),
							);

							return;
						}

						await client.api.interactions.updateMessage(
							interaction.id,
							interaction.token,
							await setupResponse(interaction, guild),
						);

						return;
					}

					if (id === CustomId.DailyGuidesDistribute) {
						await handleDistributeButton(interaction);
						return;
					}

					if (id === WELCOME_HUG_SETTING_CUSTOM_ID) {
						await welcomeHandleHugSettingButton(interaction, !Number(parts[0]));
						return;
					}

					if (id === WELCOME_MESSAGE_SETTING_CUSTOM_ID) {
						await welcomeHandleMessageSettingButton(interaction);
						return;
					}

					if (id === WELCOME_MESSAGE_DELETE_SETTING_CUSTOM_ID) {
						await welcomeHandleMessageSettingDeleteButton(interaction);
						return;
					}

					if (id === WELCOME_ASSET_DELETE_SETTING_CUSTOM_ID) {
						await welcomeHandleAssetSettingDeleteButton(interaction);
						return;
					}

					if (id === WELCOME_ACCENT_COLOUR_SETTING_CUSTOM_ID) {
						await welcomeHandleAccentColourSettingButton(interaction);
						return;
					}

					if (id === WELCOME_ACCENT_COLOUR_DELETE_SETTING_CUSTOM_ID) {
						await welcomeHandleAccentColourSettingDeleteButton(interaction);
						return;
					}

					if (id === WELCOME_HUG_CUSTOM_ID) {
						await welcomeHandleHugButton(interaction, parts[0]!);
						return;
					}
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "Button interaction failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown button interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(interaction.locale)
					: errorResponseV2(interaction.locale),
			);

			return;
		}

		if (isStringSelectMenu(interaction)) {
			logMessageComponent(interaction);
			const [id] = interaction.data.custom_id.split("§") as [string, ...string[]];
			const values = interaction.data.values;

			try {
				const value0 = values[0]!;

				if (id === CustomId.CatalogueViewRealm && isRealm(value0)) {
					await viewRealm(interaction, value0);
					return;
				}

				if (id === CustomId.CatalogueViewEventYear) {
					await viewEvents(interaction, value0);
					return;
				}

				if (id === CustomId.CatalogueViewSpirit) {
					await parseViewSpirit(interaction);
					return;
				}

				if (id === CustomId.CatalogueViewEvent) {
					await parseViewEvent(interaction);
					return;
				}

				if (
					id === CustomId.CatalogueViewOffer1 ||
					id === CustomId.CatalogueViewOffer2 ||
					id === CustomId.CatalogueViewOffer3
				) {
					await parseSetItems(interaction);
					return;
				}

				if (id === CustomId.CatalogueSetSeasonItems) {
					await setSeasonItems(interaction);
					return;
				}

				if (id === SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID) {
					await scheduleDetailedBreakdown(interaction, { type: Number(value0) as ScheduleTypes });
					return;
				}

				if (
					SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.includes(
						id as (typeof SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction, { offset: Number(value0) });
					return;
				}

				if (id === SKY_PROFILE_EDIT_CUSTOM_ID) {
					await skyProfileEdit(interaction);
					return;
				}

				if (id === SKY_PROFILE_RESET_CUSTOM_ID) {
					await skyProfileReset(interaction);
					return;
				}

				if (id === SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID) {
					await skyProfileSetWingedLight(interaction);
					return;
				}

				if (
					id === SKY_PROFILE_SET_SEASONS_SELECT_MENU_1_CUSTOM_ID ||
					id === SKY_PROFILE_SET_SEASONS_SELECT_MENU_2_CUSTOM_ID
				) {
					await skyProfileSetSeasons(interaction);
					return;
				}

				if (id === SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID) {
					await skyProfileSetPlatform(interaction);
					return;
				}

				if (
					SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.includes(
						id as (typeof SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					await skyProfileExploreProfile(interaction, value0);
					return;
				}

				if (
					SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.includes(
						id as (typeof SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					await skyProfileExploreLikedProfile(interaction);
					return;
				}

				if (isGuildStringSelectMenu(interaction)) {
					if (id === NOTIFICATIONS_SETUP_CUSTOM_ID) {
						const notificationType = Number(value0);

						if (!isNotificationType(notificationType)) {
							pino.error(
								interaction,
								"Received an unknown notification type whilst setting up notifications.",
							);

							await client.api.interactions.updateMessage(
								interaction.id,
								interaction.token,
								errorResponseV2(interaction.locale),
							);

							return;
						}

						await displayNotificationType(interaction, notificationType);
						return;
					}

					if (id === NOTIFICATIONS_SETUP_OFFSET_CUSTOM_ID) {
						await handleNotificationsStringSelectMenu(interaction);
						return;
					}

					if (id === CustomId.DailyGuidesQuestsReorder) {
						await questsReorder(interaction);
						return;
					}

					if (id === CustomId.DailyGuidesLocale) {
						await interactive(interaction, {
							type: InteractiveType.Locale,
							locale: value0 as Locale,
						});

						return;
					}

					if (id === AI_FREQUENCY_SELECT_MENU_CUSTOM_ID) {
						await AI.set(interaction);
						return;
					}
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "String select interaction failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown select menu interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(interaction.locale)
					: errorResponseV2(interaction.locale),
			);

			return;
		}

		if (isGuildRoleSelectMenu(interaction)) {
			logMessageComponent(interaction);
			const customId = interaction.data.custom_id;

			try {
				if (customId.startsWith(NOTIFICATIONS_SETUP_ROLE_CUSTOM_ID)) {
					await handleNotificationsRoleSelectMenu(interaction);
					return;
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "Role select failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown role select menu interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(interaction.locale)
					: errorResponseV2(interaction.locale),
			);

			return;
		}

		if (isGuildChannelSelectMenu(interaction)) {
			logMessageComponent(interaction);
			const customId = interaction.data.custom_id;

			try {
				if (customId === CustomId.DailyGuidesSetup) {
					await handleDailyGuidesChannelSelectMenu(interaction);
					return;
				}

				if (customId.startsWith(NOTIFICATIONS_SETUP_CHANNEL_CUSTOM_ID)) {
					await handleNotificationsChannelSelectMenu(interaction);
					return;
				}

				if (customId === WELCOME_WELCOME_CHANNEL_CUSTOM_ID) {
					await handleWelcomeChannelSelectMenu(interaction, {
						welcomeChannelId: interaction.data.values[0] ?? null,
					});

					return;
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "Channel select failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown channel select menu interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(interaction.locale)
					: errorResponseV2(interaction.locale),
			);

			return;
		}

		if (isAutocomplete(interaction)) {
			const command = AUTOCOMPLETE_COMMANDS.find(({ name }) => name === interaction.data.name);

			if (!command) {
				pino.warn(interaction, "Received an unknown command autocomplete interaction.");

				await api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
					choices: [],
				});

				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (isModalSubmit(interaction)) {
			logModalSubmit(interaction);
			const customId = interaction.data.custom_id;

			try {
				if (customId === CustomId.AboutFeedbackModal) {
					await feedbackSubmission(interaction);
					return;
				}

				if (customId === CustomId.AboutIssueModal) {
					await issueSubmission(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID) {
					await skyProfileSetName(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID) {
					await skyProfileSetDescription(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_HANGOUT_MODAL_CUSTOM_ID) {
					await skyProfileSetHangout(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_REPORT_MODAL_CUSTOM_ID)) {
					await skyProfileSendReport(interaction);
					return;
				}

				if (customId === SHOP_SUGGESTION_MODAL_CUSTOM_ID) {
					await shopSuggestionSubmission(interaction);
					return;
				}

				if (isGuildModalSubmit(interaction)) {
					if (customId === ME_SET_BIO_MODAL_CUSTOM_ID) {
						await meHandleSetBioModal(interaction);
						return;
					}

					if (customId === WELCOME_MESSAGE_SETTING_MODAL_CUSTOM_ID) {
						await welcomeHandleMessageSettingModal(interaction);
						return;
					}

					if (customId === WELCOME_ACCENT_COLOUR_SETTING_MODAL_CUSTOM_ID) {
						await welcomeHandleAccentColourSettingModal(interaction);
						return;
					}
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data: interaction,
					category: "Interaction",
					message: "Modal submit failed.",
					timestamp: DiscordSnowflake.timestampFrom(interaction.id) / 1000,
				});

				captureException(error);
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown modal interaction.");

			await api.interactions.reply(
				interaction.id,
				interaction.token,
				errorResponseV2(interaction.locale),
			);
		}
	},
} satisfies Event<typeof name>;
