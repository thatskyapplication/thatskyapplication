import {
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	ApplicationCommandType,
	ComponentType,
	GatewayDispatchEvents,
	InteractionType,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { addBreadcrumb } from "@sentry/node";
import {
	isRealm,
	isSeasonId,
	type ScheduleTypes,
	type SpiritIds,
	SpiritsHistoryOrderType,
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
import { history } from "../features/heart.js";
import {
	meHandleCustomiseMeButton,
	meHandleCustomiseMeModal,
	meHandleDeleteButton,
} from "../features/me.js";
import {
	displayNotificationType,
	handleChannelSelectMenu as handleNotificationsChannelSelectMenu,
	handleRoleSelectMenu as handleNotificationsRoleSelectMenu,
	handleStringSelectMenu as handleNotificationsStringSelectMenu,
	isNotificationType,
	setupResponse,
} from "../features/notifications.js";
import { scheduleDetailedBreakdown, scheduleOverview } from "../features/schedule.js";
import { browse, today } from "../features/shard-eruption.js";
import { shopSuggestionModal, shopSuggestionSubmission } from "../features/shop.js";
import {
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
	skyProfileSetBanner,
	skyProfileSetDescription,
	skyProfileSetHangout,
	skyProfileSetIcon,
	skyProfileSetName,
	skyProfileSetPlatform,
	skyProfileSetSeasons,
	skyProfileSetWingedLight,
	skyProfileShowEdit,
	skyProfileShowReset,
} from "../features/sky-profile.js";
import {
	spiritsHistory,
	spiritsParseSpiritsHistoryCustomId,
	spiritsViewSpirit,
} from "../features/spirits.js";
import {
	welcomeHandleAssetSettingDeleteButton,
	welcomeHandleEditButton,
	welcomeHandleEditModal,
	welcomeHandleHugButton,
} from "../features/welcome.js";
import AI from "../models/AI.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_INVITE_URL } from "../utility/configuration.js";
import {
	CustomId,
	SHARD_ERUPTION_DATES,
	SKY_PROFILE_EXPLORER_LIKES,
	SKY_PROFILE_EXPLORERS,
} from "../utility/custom-id.js";
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

async function isOldId(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	id: string,
) {
	if (Number.isInteger(Number(id))) {
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
			errorTypeString += `autocompleting \`/${interaction.data.name}\` (\`${focused.name}\`).`;
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

export default {
	name,
	async fire({ api, data: interaction }) {
		if (isChatInputCommand(interaction)) {
			pino.info(
				interaction,
				`Chat input command: ${new OptionResolver(interaction).chatInputCommandText()}`,
			);

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

				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (isUserContextMenuCommand(interaction)) {
			pino.info(interaction, `User context menu command: ${interaction.data.name}`);
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

				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (isButton(interaction)) {
			pino.info(interaction, `Button: ${interaction.data.custom_id}`);
			const [id, ...parts] = interaction.data.custom_id.split("§") as [string, ...string[]];

			if (await isOldId(interaction, id)) {
				return;
			}

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

				if (id === CustomId.ScheduleViewOverview) {
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
					id === CustomId.ScheduleDetailedBreakdownViewDailyGuides
				) {
					await dailyGuidesResponse(interaction);
					return;
				}

				if (
					id === CustomId.ChecklistShardEruptionsShow ||
					id === CustomId.ScheduleDetailedBreakdownViewShardEruptions
				) {
					await today(interaction, {
						ephemeral:
							interaction.message.flags &&
							(interaction.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral,
						newMessage: true,
					});

					return;
				}

				if (id === CustomId.ScheduleDetailedBreakdownViewSpirit) {
					let flags = MessageFlags.IsComponentsV2;

					if (
						interaction.message.flags &&
						(interaction.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral
					) {
						flags |= MessageFlags.Ephemeral;
					}

					await spiritsViewSpirit(interaction, Number(parts[0]) as SpiritIds, { flags });
					return;
				}

				if (id === CustomId.ScheduleDetailedBreakdownViewSpiritHistory) {
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

				if (id === CustomId.ShardEruptionTodayToday) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction);
					return;
				}

				if (id === CustomId.ShardEruptionTodayBack || id === CustomId.ShardEruptionTodayNext) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction, { offset: Number(parts[0]) });
					return;
				}

				if (id === CustomId.ShardEruptionBrowseToday) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await browse(interaction);
					return;
				}

				if (
					id === CustomId.ShardEruptionBrowseBack ||
					id === CustomId.ShardEruptionBrowseNext ||
					id === CustomId.ShardEruptionBrowse
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await browse(interaction, Number(parts[0]));
					return;
				}

				if (id === CustomId.SkyProfileViewReset) {
					await skyProfileShowReset(interaction);
					return;
				}

				if (id === CustomId.SkyProfileViewEdit) {
					await skyProfileShowEdit(interaction);
					return;
				}

				if (
					id === CustomId.SkyProfileViewExplorer ||
					id === CustomId.SkyProfileExplorerBack ||
					id === CustomId.SkyProfileExplorerNext
				) {
					await skyProfileExplore(interaction);
					return;
				}

				if (
					id === CustomId.SkyProfileExplorerViewLikes ||
					id === CustomId.SkyProfileExplorerLikesBack ||
					id === CustomId.SkyProfileExplorerLikesNext
				) {
					await skyProfileExploreLikes(interaction);
					return;
				}

				if (
					id === CustomId.SkyProfileExplorerProfileBack ||
					id === CustomId.SkyProfileExplorerProfileNext ||
					id === CustomId.SkyProfileExplorerViewProfile
				) {
					await skyProfileExploreProfile(interaction, parts[0]!);
					return;
				}

				if (
					id === CustomId.SkyProfileExplorerLikesProfileBack ||
					id === CustomId.SkyProfileExplorerLikesProfileNext ||
					id === CustomId.SkyProfileExplorerLikesViewProfile
				) {
					await skyProfileExploreLikedProfile(interaction);
					return;
				}

				if (id === CustomId.SkyProfileExplorerProfileLike) {
					await skyProfileLike(interaction);
					return;
				}

				if (id === CustomId.SkyProfileExplorerLikesProfileLike) {
					await skyProfileLike(interaction, true);
					return;
				}

				if (id === CustomId.SkyProfileExplorerProfileReport) {
					await skyProfileReport(interaction);
					return;
				}

				if (id === CustomId.SkyProfileExplorerLikesProfileReport) {
					await skyProfileReport(interaction, true);
					return;
				}

				if (id === CustomId.SkyProfileExplorerConfirmReport) {
					await skyProfileReportModalPrompt(interaction);
					return;
				}

				if (id === CustomId.SpiritsHistoryBack || id === CustomId.SpiritsHistoryNext) {
					const { type, page } = spiritsParseSpiritsHistoryCustomId(interaction.data.custom_id);
					await spiritsHistory(interaction, { type, page });
					return;
				}

				if (id === CustomId.SpiritsViewSpirit) {
					await spiritsViewSpirit(interaction, Number(parts[0]) as SpiritIds, {
						flags: MessageFlags.Ephemeral,
					});

					return;
				}

				if (id === CustomId.HeartHistoryBack || id === CustomId.HeartHistoryNext) {
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

				if (id === CustomId.ShopSuggest) {
					await shopSuggestionModal(interaction);
					return;
				}

				if (isGuildButton(interaction)) {
					if (id === CustomId.FriendshipActionsContribute) {
						await friendshipActionsCreateThread(interaction);
						return;
					}

					if (id === CustomId.MeCustomiseMe) {
						await meHandleCustomiseMeButton(interaction);
						return;
					}

					if (id === CustomId.MeDeleteBio) {
						await meHandleDeleteButton(interaction, { bio: null });
						return;
					}

					if (id === CustomId.MeDeleteAvatar) {
						await meHandleDeleteButton(interaction, { avatar: null });
						return;
					}

					if (id === CustomId.MeDeleteBanner) {
						await meHandleDeleteButton(interaction, { banner: null });
						return;
					}

					if (id === CustomId.NotificationsViewSetup) {
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

					if (id === CustomId.WelcomeEdit) {
						await welcomeHandleEditButton(interaction);
						return;
					}

					if (id === CustomId.WelcomeAssetDelete) {
						await welcomeHandleAssetSettingDeleteButton(interaction);
						return;
					}

					if (id === CustomId.WelcomeHugSend) {
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
			pino.info(interaction, `String select: ${interaction.data.custom_id}`);
			const [id] = interaction.data.custom_id.split("§") as [string, ...string[]];

			if (await isOldId(interaction, id)) {
				return;
			}

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

				if (id === CustomId.ScheduleViewDetailedBreakdown) {
					await scheduleDetailedBreakdown(interaction, { type: Number(value0) as ScheduleTypes });
					return;
				}

				if (SHARD_ERUPTION_DATES.includes(id as (typeof SHARD_ERUPTION_DATES)[number])) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction, { offset: Number(value0) });
					return;
				}

				if (id === CustomId.SkyProfileEdit) {
					await skyProfileEdit(interaction);
					return;
				}

				if (id === CustomId.SkyProfileReset) {
					await skyProfileReset(interaction);
					return;
				}

				if (id === CustomId.SkyProfileWingedLight) {
					await skyProfileSetWingedLight(interaction);
					return;
				}

				if (id === CustomId.SkyProfileSeasons1 || id === CustomId.SkyProfileSeasons2) {
					await skyProfileSetSeasons(interaction);
					return;
				}

				if (id === CustomId.SkyProfilePlatforms) {
					await skyProfileSetPlatform(interaction);
					return;
				}

				if (SKY_PROFILE_EXPLORERS.includes(id as (typeof SKY_PROFILE_EXPLORERS)[number])) {
					await skyProfileExploreProfile(interaction, value0);
					return;
				}

				if (
					SKY_PROFILE_EXPLORER_LIKES.includes(id as (typeof SKY_PROFILE_EXPLORER_LIKES)[number])
				) {
					await skyProfileExploreLikedProfile(interaction);
					return;
				}

				if (isGuildStringSelectMenu(interaction)) {
					if (id === CustomId.NotificationsSetup) {
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

					if (id === CustomId.NotificationsSetupOffset) {
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

					if (id === CustomId.AIFrequency) {
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
			pino.info(interaction, `Role select: ${interaction.data.custom_id}`);
			const [id] = interaction.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.NotificationsSetupRole) {
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
			pino.info(interaction, `Channel select: ${interaction.data.custom_id}`);
			const [id] = interaction.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.DailyGuidesSetup) {
					await handleDailyGuidesChannelSelectMenu(interaction);
					return;
				}

				if (id === CustomId.NotificationsSetupChannel) {
					await handleNotificationsChannelSelectMenu(interaction);
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
			pino.info(interaction, `Modal submit: ${interaction.data.custom_id}`);
			const [id] = interaction.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.AboutFeedbackModal) {
					await feedbackSubmission(interaction);
					return;
				}

				if (id === CustomId.AboutIssueModal) {
					await issueSubmission(interaction);
					return;
				}

				if (id === CustomId.SkyProfileNameModal) {
					await skyProfileSetName(interaction);
					return;
				}

				if (id === CustomId.SkyProfileDescriptionModal) {
					await skyProfileSetDescription(interaction);
					return;
				}

				if (id === CustomId.SkyProfileIconModal) {
					await skyProfileSetIcon(interaction);
					return;
				}

				if (id === CustomId.SkyProfileBannerModal) {
					await skyProfileSetBanner(interaction);
					return;
				}

				if (id === CustomId.SkyProfileHangoutModal) {
					await skyProfileSetHangout(interaction);
					return;
				}

				if (id === CustomId.SkyProfileReportModal) {
					await skyProfileSendReport(interaction);
					return;
				}

				if (id === CustomId.ShopSuggestionModal) {
					await shopSuggestionSubmission(interaction);
					return;
				}

				if (isGuildModalSubmit(interaction)) {
					if (id === CustomId.MeCustomiseMeModal) {
						await meHandleCustomiseMeModal(interaction);
						return;
					}

					if (id === CustomId.WelcomeEditModal) {
						await welcomeHandleEditModal(interaction);
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
