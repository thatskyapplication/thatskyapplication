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
	catalogueTraversal,
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
import {
	friendshipActionsCreateThread,
	friendshipActionsHugBack,
} from "../features/friendship-actions.js";
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
	skyProfileSetPersonality,
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
	welcomeHandleSuppressJoinNotificationsButton,
} from "../features/welcome.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_INVITE_URL } from "../utility/configuration.js";
import {
	CustomId,
	SHARD_ERUPTION_DATES,
	SKY_PROFILE_EXPLORER_LIKES,
	SKY_PROFILE_EXPLORERS,
} from "../utility/custom-id.js";
import {
	isAutocomplete,
	isButton,
	isChatInputCommand,
	isDMButton,
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
	let errorTypeString = "Error from ";

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
	async fire({ api, data }) {
		if (isChatInputCommand(data)) {
			pino.info(data, `Chat input command: ${new OptionResolver(data).chatInputCommandText()}`);
			const command = CHAT_INPUT_COMMANDS.find(({ name }) => name === data.data.name);

			if (!command) {
				pino.warn(data, "Received an unknown chat input command interaction.");
				await api.interactions.reply(data.id, data.token, errorResponseV2(data.locale));
				return;
			}

			try {
				await command.chatInput(data);
			} catch (error) {
				void recoverInteractionError(data, error);
			}

			return;
		}

		if (isUserContextMenuCommand(data)) {
			pino.info(data, `User context menu command: ${data.data.name}`);
			const command = USER_CONTEXT_MENU_COMMANDS.find(({ name }) => name === data.data.name);

			if (!command) {
				pino.warn(data, "Received an unknown user context menu command interaction.");
				await api.interactions.reply(data.id, data.token, errorResponseV2(data.locale));
				return;
			}

			try {
				await command.userContextMenu(data);
			} catch (error) {
				void recoverInteractionError(data, error);
			}

			return;
		}

		if (isButton(data)) {
			pino.info(data, `Button: ${data.data.custom_id}`);
			const [id, ...parts] = data.data.custom_id.split("§") as [string, ...string[]];

			if (await isOldId(data, id)) {
				return;
			}

			try {
				if (id === CustomId.DataDelete) {
					await deleteUserData(data);
					return;
				}

				if (id === CustomId.CatalogueViewStart || id === CustomId.CatalogueBackToStart) {
					await viewStart(data);
					return;
				}

				if (id === CustomId.CatalogueSettings) {
					await viewSettings(data);
					return;
				}

				if (id === CustomId.CatalogueSettingsEverything) {
					await updateEverythingButtonSetting(data);
					return;
				}

				if (id === CustomId.CatalogueViewRealms) {
					await viewRealms(data);
					return;
				}

				if (id === CustomId.CatalogueViewRealm) {
					const realmName = parts[0]!;

					if (isRealm(realmName)) {
						await viewRealm(data, realmName);
						return;
					}
				}

				if (id === CustomId.CatalogueViewElders) {
					await viewElders(data);
					return;
				}

				if (id === CustomId.CatalogueViewSeasons) {
					await viewSeasons(
						data,
						Number(data.data.custom_id.slice(data.data.custom_id.indexOf("§") + 1)),
					);

					return;
				}

				if (id === CustomId.CatalogueViewSeason) {
					const seasonId = Number(parts[0]!);

					if (isSeasonId(seasonId)) {
						await viewSeason(data, seasonId);
						return;
					}
				}

				if (id === CustomId.CatalogueViewEvents) {
					await viewEvents(
						data,
						Number(data.data.custom_id.slice(data.data.custom_id.indexOf("§") + 1)),
					);

					return;
				}

				if (id === CustomId.CatalogueViewEvent) {
					await parseViewEvent(data);
					return;
				}

				if (id === CustomId.CatalogueViewStarterPacks) {
					await viewStarterPacks(data);
					return;
				}

				if (id === CustomId.CatalogueViewSecretArea) {
					await viewSecretArea(data);
					return;
				}

				if (id === CustomId.CatalogueViewPermanentEventStore) {
					await viewPermanentEventStore(data);
					return;
				}

				if (id === CustomId.CatalogueViewNestingWorkshop) {
					await viewNestingWorkshop(data);
					return;
				}

				if (id === CustomId.CatalogueViewReturningSpirits) {
					await viewReturningSpirits(data);
					return;
				}

				if (id === CustomId.CatalogueViewSpirit) {
					await parseViewSpirit(data);
					return;
				}

				if (id === CustomId.CatalogueRealmEverything) {
					await setRealm(data);
					return;
				}

				if (id === CustomId.CatalogueEldersEverything) {
					await setElders(data);
					return;
				}

				if (id === CustomId.CatalogueSeasonEverything) {
					await setSeason(data);
					return;
				}

				if (id === CustomId.CatalogueItemsEverything) {
					await parseSetItems(data);
					return;
				}

				if (id === CustomId.ScheduleViewOverview) {
					await scheduleOverview(data);
					return;
				}

				if (id === CustomId.ChecklistDailyQuestsComplete) {
					await checklistHandleDailyQuests(data);
					return;
				}

				if (id === CustomId.ChecklistSeasonalCandlesComplete) {
					await checklistHandleSeasonalCandles(data);
					return;
				}

				if (id === CustomId.ChecklistEyeOfEdenComplete) {
					await checklistHandleEyeOfEden(data);
					return;
				}

				if (id === CustomId.ChecklistEventTicketsComplete) {
					await checklistHandleEventTickets(data);
					return;
				}

				if (id === CustomId.ChecklistShardEruptionsComplete) {
					await checklistHandleShardEruptions(data);
					return;
				}

				if (
					id === CustomId.ChecklistDailyQuestsShow ||
					id === CustomId.ScheduleDetailedBreakdownViewDailyGuides
				) {
					await dailyGuidesResponse(data);
					return;
				}

				if (
					id === CustomId.ChecklistShardEruptionsShow ||
					id === CustomId.ScheduleDetailedBreakdownViewShardEruptions
				) {
					await today(data, {
						ephemeral:
							data.message.flags &&
							(data.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral,
						newMessage: true,
					});

					return;
				}

				if (id === CustomId.ScheduleDetailedBreakdownViewSpirit) {
					let flags = MessageFlags.IsComponentsV2;

					if (
						data.message.flags &&
						(data.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral
					) {
						flags |= MessageFlags.Ephemeral;
					}

					await spiritsViewSpirit(data, Number(parts[0]) as SpiritIds, { flags });
					return;
				}

				if (id === CustomId.ScheduleDetailedBreakdownViewSpiritHistory) {
					await spiritsHistory(data, {
						type: SpiritsHistoryOrderType.Natural,
						page: 1,
						ephemeral:
							data.message.flags &&
							(data.message.flags & MessageFlags.Ephemeral) === MessageFlags.Ephemeral,
						newMessage: true,
					});

					return;
				}

				if (id === CustomId.ShardEruptionTodayToday) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await today(data);
					return;
				}

				if (id === CustomId.ShardEruptionTodayBack || id === CustomId.ShardEruptionTodayNext) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await today(data, { offset: Number(parts[0]) });
					return;
				}

				if (id === CustomId.ShardEruptionBrowseToday) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await browse(data);
					return;
				}

				if (
					id === CustomId.ShardEruptionBrowseBack ||
					id === CustomId.ShardEruptionBrowseNext ||
					id === CustomId.ShardEruptionBrowse
				) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await browse(data, Number(parts[0]));
					return;
				}

				if (id === CustomId.SkyProfileViewReset) {
					await skyProfileShowReset(data);
					return;
				}

				if (id === CustomId.SkyProfileViewEdit) {
					await skyProfileShowEdit(data);
					return;
				}

				if (
					id === CustomId.SkyProfileViewExplorer ||
					id === CustomId.SkyProfileExplorerBack ||
					id === CustomId.SkyProfileExplorerNext
				) {
					await skyProfileExplore(data);
					return;
				}

				if (
					id === CustomId.SkyProfileExplorerViewLikes ||
					id === CustomId.SkyProfileExplorerLikesBack ||
					id === CustomId.SkyProfileExplorerLikesNext
				) {
					await skyProfileExploreLikes(data);
					return;
				}

				if (
					id === CustomId.SkyProfileExplorerProfileBack ||
					id === CustomId.SkyProfileExplorerProfileNext ||
					id === CustomId.SkyProfileExplorerViewProfile
				) {
					await skyProfileExploreProfile(data, parts[0]!);
					return;
				}

				if (
					id === CustomId.SkyProfileExplorerLikesProfileBack ||
					id === CustomId.SkyProfileExplorerLikesProfileNext ||
					id === CustomId.SkyProfileExplorerLikesViewProfile
				) {
					await skyProfileExploreLikedProfile(data);
					return;
				}

				if (id === CustomId.SkyProfileExplorerProfileLike) {
					await skyProfileLike(data);
					return;
				}

				if (id === CustomId.SkyProfileExplorerLikesProfileLike) {
					await skyProfileLike(data, true);
					return;
				}

				if (id === CustomId.SkyProfileExplorerProfileReport) {
					await skyProfileReport(data);
					return;
				}

				if (id === CustomId.SkyProfileExplorerLikesProfileReport) {
					await skyProfileReport(data, true);
					return;
				}

				if (id === CustomId.SkyProfileExplorerConfirmReport) {
					await skyProfileReportModalPrompt(data);
					return;
				}

				if (id === CustomId.SpiritsHistoryBack || id === CustomId.SpiritsHistoryNext) {
					const { type, page } = spiritsParseSpiritsHistoryCustomId(data.data.custom_id);
					await spiritsHistory(data, { type, page });
					return;
				}

				if (id === CustomId.SpiritsViewSpirit) {
					await spiritsViewSpirit(data, Number(parts[0]) as SpiritIds, {
						flags: MessageFlags.Ephemeral,
					});

					return;
				}

				if (id === CustomId.HeartHistoryBack || id === CustomId.HeartHistoryNext) {
					await history(data);
					return;
				}

				if (
					id === CustomId.GuessSpiritOption1 ||
					id === CustomId.GuessSpiritOption2 ||
					id === CustomId.GuessSpiritOption3
				) {
					await guessSpiritAnswer(data);
					return;
				}

				if (
					id === CustomId.GuessEventOption1 ||
					id === CustomId.GuessEventOption2 ||
					id === CustomId.GuessEventOption3
				) {
					await guessEventAnswer(data);
					return;
				}

				if (id === CustomId.GuessEnd) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await guessHandleEndGame(data);
					return;
				}

				if (id === CustomId.GuessTryAgain) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await tryAgain(data);
					return;
				}

				if (id === CustomId.GuessLeaderboardBack || id === CustomId.GuessLeaderboardNext) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					const guessType = Number(parts[0]);

					if (isGuessType(guessType)) {
						await leaderboard(data, guessType);
						return;
					}
				}

				if (id === CustomId.ShopSuggest) {
					await shopSuggestionModal(data);
					return;
				}

				if (isDMButton(data) && id === CustomId.FriendshipActionsHugBack) {
					let number: number | undefined = Number(parts[0]);

					// This will be undefined on the first few buttons before an integer was used.
					if (Number.isNaN(number)) {
						number = undefined;
					}

					await friendshipActionsHugBack(data, number);
					return;
				}

				if (isGuildButton(data)) {
					if (id === CustomId.FriendshipActionsContribute) {
						await friendshipActionsCreateThread(data);
						return;
					}

					if (id === CustomId.MeCustomiseMe) {
						await meHandleCustomiseMeButton(data);
						return;
					}

					if (id === CustomId.MeDeleteBio) {
						await meHandleDeleteButton(data, { bio: null });
						return;
					}

					if (id === CustomId.MeDeleteAvatar) {
						await meHandleDeleteButton(data, { avatar: null });
						return;
					}

					if (id === CustomId.MeDeleteBanner) {
						await meHandleDeleteButton(data, { banner: null });
						return;
					}

					if (id === CustomId.NotificationsViewSetup) {
						const guild = GUILD_CACHE.get(data.guild_id);

						if (!guild) {
							await client.api.interactions.updateMessage(
								data.id,
								data.token,
								notInCachedGuildResponse(data.locale),
							);

							return;
						}

						await client.api.interactions.updateMessage(
							data.id,
							data.token,
							await setupResponse(data, guild),
						);

						return;
					}

					if (id === CustomId.DailyGuidesDistribute) {
						await handleDistributeButton(data);
						return;
					}

					if (id === CustomId.WelcomeEdit) {
						await welcomeHandleEditButton(data);
						return;
					}

					if (id === CustomId.WelcomeSuppressJoinNotifications) {
						await welcomeHandleSuppressJoinNotificationsButton(data);
						return;
					}

					if (id === CustomId.WelcomeAssetDelete) {
						await welcomeHandleAssetSettingDeleteButton(data);
						return;
					}

					if (id === CustomId.WelcomeHugSend) {
						await welcomeHandleHugButton(data, parts[0]!);
						return;
					}
				}
			} catch (error) {
				void recoverInteractionError(data, error);
				return;
			}

			pino.warn(data, "Received an unknown button interaction.");

			await api.interactions.updateMessage(
				data.id,
				data.token,
				data.message.flags && (data.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(data.locale)
					: errorResponseV2(data.locale),
			);

			return;
		}

		if (isStringSelectMenu(data)) {
			pino.info(data, `String select: ${data.data.custom_id}`);
			const [id] = data.data.custom_id.split("§") as [string, ...string[]];

			if (await isOldId(data, id)) {
				return;
			}

			const values = data.data.values;

			try {
				const value0 = values[0]!;

				if (id === CustomId.CatalogueTraversal) {
					await catalogueTraversal(data, value0);
					return;
				}

				if (id === CustomId.CatalogueViewRealm && isRealm(value0)) {
					await viewRealm(data, value0);
					return;
				}

				if (id === CustomId.CatalogueViewSpirit) {
					await parseViewSpirit(data);
					return;
				}

				if (id === CustomId.CatalogueViewEvent) {
					await parseViewEvent(data);
					return;
				}

				if (
					id === CustomId.CatalogueViewOffer1 ||
					id === CustomId.CatalogueViewOffer2 ||
					id === CustomId.CatalogueViewOffer3
				) {
					await parseSetItems(data);
					return;
				}

				if (id === CustomId.CatalogueSetSeasonItems) {
					await setSeasonItems(data);
					return;
				}

				if (id === CustomId.ScheduleViewDetailedBreakdown) {
					await scheduleDetailedBreakdown(data, { type: Number(value0) as ScheduleTypes });
					return;
				}

				if (SHARD_ERUPTION_DATES.includes(id as (typeof SHARD_ERUPTION_DATES)[number])) {
					if (await isNotComponentsV2(data)) {
						return;
					}

					await today(data, { offset: Number(value0) });
					return;
				}

				if (id === CustomId.SkyProfileEdit) {
					await skyProfileEdit(data);
					return;
				}

				if (id === CustomId.SkyProfileReset) {
					await skyProfileReset(data);
					return;
				}

				if (id === CustomId.SkyProfileWingedLight) {
					await skyProfileSetWingedLight(data);
					return;
				}

				if (id === CustomId.SkyProfileSeasons1 || id === CustomId.SkyProfileSeasons2) {
					await skyProfileSetSeasons(data);
					return;
				}

				if (id === CustomId.SkyProfilePlatforms) {
					await skyProfileSetPlatform(data);
					return;
				}

				if (id === CustomId.SkyProfilePersonality) {
					await skyProfileSetPersonality(data);
					return;
				}

				if (SKY_PROFILE_EXPLORERS.includes(id as (typeof SKY_PROFILE_EXPLORERS)[number])) {
					await skyProfileExploreProfile(data, value0);
					return;
				}

				if (
					SKY_PROFILE_EXPLORER_LIKES.includes(id as (typeof SKY_PROFILE_EXPLORER_LIKES)[number])
				) {
					await skyProfileExploreLikedProfile(data);
					return;
				}

				if (isGuildStringSelectMenu(data)) {
					if (id === CustomId.NotificationsSetup) {
						const notificationType = Number(value0);

						if (!isNotificationType(notificationType)) {
							pino.error(
								data,
								"Received an unknown notification type whilst setting up notifications.",
							);

							await client.api.interactions.updateMessage(
								data.id,
								data.token,
								errorResponseV2(data.locale),
							);

							return;
						}

						await displayNotificationType(data, notificationType);
						return;
					}

					if (id === CustomId.NotificationsSetupOffset) {
						await handleNotificationsStringSelectMenu(data);
						return;
					}

					if (id === CustomId.DailyGuidesQuestsReorder) {
						await questsReorder(data);
						return;
					}

					if (id === CustomId.DailyGuidesLocale) {
						await interactive(data, {
							type: InteractiveType.Locale,
							locale: value0 as Locale,
						});

						return;
					}
				}
			} catch (error) {
				void recoverInteractionError(data, error);
				return;
			}

			pino.warn(data, "Received an unknown select menu interaction.");

			await api.interactions.updateMessage(
				data.id,
				data.token,
				data.message.flags && (data.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(data.locale)
					: errorResponseV2(data.locale),
			);

			return;
		}

		if (isGuildRoleSelectMenu(data)) {
			pino.info(data, `Role select: ${data.data.custom_id}`);
			const [id] = data.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.NotificationsSetupRole) {
					await handleNotificationsRoleSelectMenu(data);
					return;
				}
			} catch (error) {
				void recoverInteractionError(data, error);
				return;
			}

			pino.warn(data, "Received an unknown role select menu interaction.");

			await api.interactions.updateMessage(
				data.id,
				data.token,
				data.message.flags && (data.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(data.locale)
					: errorResponseV2(data.locale),
			);

			return;
		}

		if (isGuildChannelSelectMenu(data)) {
			pino.info(data, `Channel select: ${data.data.custom_id}`);
			const [id] = data.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.DailyGuidesSetup) {
					await handleDailyGuidesChannelSelectMenu(data);
					return;
				}

				if (id === CustomId.NotificationsSetupChannel) {
					await handleNotificationsChannelSelectMenu(data);
					return;
				}
			} catch (error) {
				void recoverInteractionError(data, error);
				return;
			}

			pino.warn(data, "Received an unknown channel select menu interaction.");

			await api.interactions.updateMessage(
				data.id,
				data.token,
				data.message.flags && (data.message.flags & MessageFlags.IsComponentsV2) === 0
					? errorResponse(data.locale)
					: errorResponseV2(data.locale),
			);

			return;
		}

		if (isAutocomplete(data)) {
			pino.info(data, `Autocomplete: ${new OptionResolver(data).chatInputCommandText()}`);
			const command = AUTOCOMPLETE_COMMANDS.find(({ name }) => name === data.data.name);

			if (!command) {
				pino.warn(data, "Received an unknown command autocomplete interaction.");

				await api.interactions.createAutocompleteResponse(data.id, data.token, {
					choices: [],
				});

				return;
			}

			try {
				await command.autocomplete(data);
			} catch (error) {
				void recoverInteractionError(data, error);
			}

			return;
		}

		if (isModalSubmit(data)) {
			pino.info(data, `Modal submit: ${data.data.custom_id}`);
			const [id] = data.data.custom_id.split("§") as [string, ...string[]];

			try {
				if (id === CustomId.SkyProfileNameModal) {
					await skyProfileSetName(data);
					return;
				}

				if (id === CustomId.SkyProfileDescriptionModal) {
					await skyProfileSetDescription(data);
					return;
				}

				if (id === CustomId.SkyProfileIconModal) {
					await skyProfileSetIcon(data);
					return;
				}

				if (id === CustomId.SkyProfileBannerModal) {
					await skyProfileSetBanner(data);
					return;
				}

				if (id === CustomId.SkyProfileHangoutModal) {
					await skyProfileSetHangout(data);
					return;
				}

				if (id === CustomId.SkyProfileReportModal) {
					await skyProfileSendReport(data);
					return;
				}

				if (id === CustomId.ShopSuggestionModal) {
					await shopSuggestionSubmission(data);
					return;
				}

				if (isGuildModalSubmit(data)) {
					if (id === CustomId.MeCustomiseMeModal) {
						await meHandleCustomiseMeModal(data);
						return;
					}

					if (id === CustomId.WelcomeEditModal) {
						await welcomeHandleEditModal(data);
						return;
					}
				}
			} catch (error) {
				void recoverInteractionError(data, error);
				return;
			}

			pino.warn(data, "Received an unknown modal interaction.");
			await api.interactions.reply(data.id, data.token, errorResponseV2(data.locale));
		}
	},
} satisfies Event<typeof name>;
