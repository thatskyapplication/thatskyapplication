import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
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
import { isDuring, isSeasonId, skyNow } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import {
	AUTOCOMPLETE_COMMANDS,
	CHAT_INPUT_COMMANDS,
	USER_CONTEXT_MENU_COMMANDS,
} from "../commands/index.js";
import { client } from "../discord.js";
import {
	ABOUT_FEEDBACK_CUSTOM_ID,
	ABOUT_ISSUE_CUSTOM_ID,
	FEEDBACK_MODAL_CUSTOM_ID,
	feedbackModalResponse,
	feedbackSubmission,
	ISSUE_MODAL_CUSTOM_ID,
	issueModalResponse,
	issueSubmission,
} from "../features/about.js";
import {
	CATALOGUE_BACK_TO_START_CUSTOM_ID,
	CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID,
	CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID,
	CATALOGUE_REALM_EVERYTHING_CUSTOM_ID,
	CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID,
	CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID,
	CATALOGUE_SETTINGS_CUSTOM_ID,
	CATALOGUE_SETTINGS_EVERYTHING_CUSTOM_ID,
	CATALOGUE_VIEW_ELDERS_CUSTOM_ID,
	CATALOGUE_VIEW_EVENT_CUSTOM_ID,
	CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID,
	CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID,
	CATALOGUE_VIEW_NESTING_WORKSHOP_CUSTOM_ID,
	CATALOGUE_VIEW_OFFER_1_CUSTOM_ID,
	CATALOGUE_VIEW_OFFER_2_CUSTOM_ID,
	CATALOGUE_VIEW_OFFER_3_CUSTOM_ID,
	CATALOGUE_VIEW_PERMANENT_EVENT_STORE_CUSTOM_ID,
	CATALOGUE_VIEW_REALM_CUSTOM_ID,
	CATALOGUE_VIEW_REALMS_CUSTOM_ID,
	CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID,
	CATALOGUE_VIEW_SEASON_CUSTOM_ID,
	CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
	CATALOGUE_VIEW_SECRET_AREA_CUSTOM_ID,
	CATALOGUE_VIEW_SPIRIT_CUSTOM_ID,
	CATALOGUE_VIEW_START_CUSTOM_ID,
	CATALOGUE_VIEW_STARTER_PACKS_CUSTOM_ID,
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
	DAILY_GUIDES_SETUP_CUSTOM_ID,
	handleChannelSelectMenu as handleDailyGuidesChannelSelectMenu,
} from "../features/daily-guides.js";
import {
	claimTicket,
	GIVEAWAY_BUTTON_CUSTOM_ID,
	GIVEAWAY_INFORMATION_TEXT_CUSTOM_ID,
	giveaway,
	upsell,
} from "../features/giveaway.js";
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
	SHOP_SUGGEST_CUSTOM_ID,
	SHOP_SUGGESTION_MODAL_CUSTOM_ID,
	shopSuggestionModal,
	shopSuggestionSubmission,
} from "../features/shop.js";
import {
	handleSearchButton,
	SPIRITS_HISTORY_BACK_CUSTOM_ID,
	SPIRITS_HISTORY_NEXT_CUSTOM_ID,
	SPIRITS_VIEW_SPIRIT_CUSTOM_ID,
	spiritsHistory,
} from "../features/spirits.js";
import AI, { AI_FREQUENCY_SELECT_MENU_CUSTOM_ID } from "../models/AI.js";
import Profile, {
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
	SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SHOW_RESET_CUSTOM_ID,
} from "../models/Profile.js";
import pino from "../pino.js";
import { distribute, interactive, questSwap } from "../services/admin.js";
import { deleteUserData } from "../services/data.js";
import {
	answer,
	isGuessDifficultyLevel,
	leaderboard,
	parseEndGame,
	tryAgain,
} from "../services/guess.js";
import { history } from "../services/heart.js";
import { browse, today } from "../services/shard-eruption.js";
import {
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
	DATA_DELETION_CUSTOM_ID,
	ERROR_RESPONSE,
	ERROR_RESPONSE_COMPONENTS_V2,
	GIVEAWAY_END_DATE,
	GIVEAWAY_START_DATE,
	GUESS_ANSWER_1,
	GUESS_ANSWER_2,
	GUESS_ANSWER_3,
	GUESS_END_GAME,
	GUESS_LEADERBOARD_BACK_CUSTOM_ID,
	GUESS_LEADERBOARD_NEXT_CUSTOM_ID,
	GUESS_TRY_AGAIN,
	HEART_HISTORY_BACK,
	HEART_HISTORY_NEXT,
	NOT_IN_CACHED_GUILD_RESPONSE,
} from "../utility/constants.js";
import {
	interactionInvoker,
	isAutocomplete,
	isButton,
	isChatInputCommand,
	isGuildButton,
	isGuildChannelSelectMenu,
	isGuildRoleSelectMenu,
	isGuildStringSelectMenu,
	isModalSubmit,
	isRealm,
	isStringSelectMenu,
	isUserContextMenuCommand,
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
			customId: customId,
			values: "values" in interaction.data ? interaction.data.values : null,
			guildId: interaction.guild_id,
			channelId: interaction.channel.id,
			messageId: interaction.message.id,
			permissions: interaction.app_permissions,
			authorizingIntegrationOwners: interaction.authorizing_integration_owners,
			context: interaction.context,
			locale: { user: interaction.locale, guild: interaction.guild_locale },
		},
		`Custom id: ${customId}`,
	);
}

export default {
	name,
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: It's fine.
	async fire({ api, data: interaction }) {
		if (isChatInputCommand(interaction)) {
			logCommand(interaction);
			const command = CHAT_INPUT_COMMANDS.find(({ name }) => name === interaction.data.name);

			if (!command) {
				pino.warn(interaction, "Received an unknown chat input command interaction.");
				await api.interactions.reply(
					interaction.id,
					interaction.token,
					ERROR_RESPONSE_COMPONENTS_V2,
				);
				return;
			}

			try {
				await command.chatInput(interaction);

				if (isDuring(GIVEAWAY_START_DATE, GIVEAWAY_END_DATE, skyNow())) {
					// Upsell for the giveaway.
					await upsell(interaction);
				}
			} catch (error) {
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
					ERROR_RESPONSE_COMPONENTS_V2,
				);
				return;
			}

			try {
				await command.userContextMenu(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (isButton(interaction)) {
			logMessageComponent(interaction);
			const customId = interaction.data.custom_id;

			try {
				if (customId === DATA_DELETION_CUSTOM_ID) {
					await deleteUserData(interaction);
					return;
				}

				if (customId === ABOUT_FEEDBACK_CUSTOM_ID) {
					await feedbackModalResponse(interaction);
					return;
				}

				if (customId === ABOUT_ISSUE_CUSTOM_ID) {
					await issueModalResponse(interaction);
					return;
				}

				if (
					customId === CATALOGUE_VIEW_START_CUSTOM_ID ||
					customId === CATALOGUE_BACK_TO_START_CUSTOM_ID
				) {
					await viewStart(interaction);
					return;
				}

				if (customId === CATALOGUE_SETTINGS_CUSTOM_ID) {
					await viewSettings(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_SETTINGS_EVERYTHING_CUSTOM_ID)) {
					await updateEverythingButtonSetting(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_REALMS_CUSTOM_ID) {
					await viewRealms(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_REALM_CUSTOM_ID)) {
					const parsedCustomId = customId.slice(customId.indexOf("§") + 1);

					if (isRealm(parsedCustomId)) {
						await viewRealm(interaction, parsedCustomId);
						return;
					}
				}

				if (customId === CATALOGUE_VIEW_ELDERS_CUSTOM_ID) {
					await viewElders(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_SEASONS_CUSTOM_ID) {
					await viewSeasons(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_SEASON_CUSTOM_ID)) {
					const parsedCustomId = Number(customId.slice(customId.indexOf("§") + 1));

					if (isSeasonId(parsedCustomId)) {
						await viewSeason(interaction, parsedCustomId);
						return;
					}
				}

				if (customId === CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID) {
					await viewEventYears(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID)) {
					const parsedCustomId = customId.slice(customId.indexOf("§") + 1);
					await viewEvents(interaction, parsedCustomId);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_EVENT_CUSTOM_ID)) {
					await parseViewEvent(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_STARTER_PACKS_CUSTOM_ID) {
					await viewStarterPacks(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_SECRET_AREA_CUSTOM_ID) {
					await viewSecretArea(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_PERMANENT_EVENT_STORE_CUSTOM_ID) {
					await viewPermanentEventStore(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_NESTING_WORKSHOP_CUSTOM_ID) {
					await viewNestingWorkshop(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID) {
					await viewReturningSpirits(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)) {
					await parseViewSpirit(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_REALM_EVERYTHING_CUSTOM_ID)) {
					await setRealm(interaction);
					return;
				}

				if (customId === CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID) {
					await setElders(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID)) {
					await setSeason(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID)) {
					await parseSetItems(interaction);
					return;
				}

				if (customId === SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction);
					return;
				}

				if (
					customId.startsWith(SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID) ||
					customId.startsWith(SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID)
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction, Number(customId.slice(customId.indexOf("§") + 1)));
					return;
				}

				if (customId === SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await browse(interaction);
					return;
				}

				if (
					customId.startsWith(SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID) ||
					customId.startsWith(SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID) ||
					customId.startsWith(SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID)
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await browse(interaction, Number(customId.slice(customId.indexOf("§") + 1)));
					return;
				}

				if (customId === SKY_PROFILE_SHOW_RESET_CUSTOM_ID) {
					await Profile.showReset(interaction);
					return;
				}

				if (customId === SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID) {
					await Profile.showEdit(interaction);
					return;
				}

				if (
					customId.startsWith(SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID)
				) {
					await Profile.explore(interaction);
					return;
				}

				if (
					customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID)
				) {
					await Profile.exploreLikes(interaction);
					return;
				}

				if (
					customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID)
				) {
					await Profile.exploreProfile(interaction, customId.slice(customId.indexOf("§") + 1));
					return;
				}

				if (
					customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID)
				) {
					await Profile.exploreLikedProfile(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID)) {
					await Profile.like(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID)) {
					await Profile.like(interaction, true);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID)) {
					await Profile.report(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID)) {
					await Profile.report(interaction, true);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID)) {
					await Profile.reportModalPrompt(interaction);
					return;
				}

				if (
					customId.startsWith(SPIRITS_HISTORY_BACK_CUSTOM_ID) ||
					customId.startsWith(SPIRITS_HISTORY_NEXT_CUSTOM_ID)
				) {
					await spiritsHistory(interaction);
					return;
				}

				if (customId.startsWith(SPIRITS_VIEW_SPIRIT_CUSTOM_ID)) {
					await handleSearchButton(interaction);
					return;
				}

				if (customId.startsWith(HEART_HISTORY_BACK) || customId.startsWith(HEART_HISTORY_NEXT)) {
					await history(interaction);
					return;
				}

				if (
					customId.startsWith(GUESS_ANSWER_1) ||
					customId.startsWith(GUESS_ANSWER_2) ||
					customId.startsWith(GUESS_ANSWER_3)
				) {
					await answer(interaction);
					return;
				}

				if (customId.startsWith(GUESS_END_GAME)) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await parseEndGame(interaction);
					return;
				}

				if (customId.startsWith(GUESS_TRY_AGAIN)) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await tryAgain(interaction);
					return;
				}

				if (
					customId.startsWith(GUESS_LEADERBOARD_BACK_CUSTOM_ID) ||
					customId.startsWith(GUESS_LEADERBOARD_NEXT_CUSTOM_ID)
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					const guessDifficultyLevel = Number(
						customId.slice(customId.indexOf("§") + 1, customId.lastIndexOf("§")),
					);

					if (isGuessDifficultyLevel(guessDifficultyLevel)) {
						await leaderboard(interaction, guessDifficultyLevel);
						return;
					}
				}

				if (customId === SHOP_SUGGEST_CUSTOM_ID) {
					await shopSuggestionModal(interaction);
					return;
				}

				if (isGuildButton(interaction)) {
					if (customId.startsWith(GIVEAWAY_BUTTON_CUSTOM_ID)) {
						await claimTicket(interaction, Number(customId.slice(customId.indexOf("§") + 1)) === 1);
						return;
					}

					if (customId.startsWith(GIVEAWAY_INFORMATION_TEXT_CUSTOM_ID)) {
						await client.api.interactions.updateMessage(interaction.id, interaction.token, {
							components: await giveaway({
								userId: interaction.member.user.id,
								createdTimestamp: DiscordSnowflake.timestampFrom(interaction.member.user.id),
								viewInformation: Number(customId.slice(customId.indexOf("§") + 1)) === 1,
								guildId: interaction.guild_id,
							}),
						});

						return;
					}

					if (customId === NOTIFICATIONS_VIEW_SETUP_CUSTOM_ID) {
						const guild = GUILD_CACHE.get(interaction.guild_id);

						if (!guild) {
							await client.api.interactions.updateMessage(
								interaction.id,
								interaction.token,
								NOT_IN_CACHED_GUILD_RESPONSE,
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

					if (customId === DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID) {
						await distribute(interaction);
						return;
					}
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown button interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? ERROR_RESPONSE
					: ERROR_RESPONSE_COMPONENTS_V2,
			);

			return;
		}

		if (isStringSelectMenu(interaction)) {
			logMessageComponent(interaction);
			const customId = interaction.data.custom_id;
			const values = interaction.data.values;

			try {
				const value0 = values[0]!;

				if (customId === CATALOGUE_VIEW_REALM_CUSTOM_ID && isRealm(value0)) {
					await viewRealm(interaction, value0);
					return;
				}

				if (customId === CATALOGUE_VIEW_SEASON_CUSTOM_ID) {
					const seasonId = Number(value0);

					if (isSeasonId(seasonId)) {
						await viewSeason(interaction, seasonId);
						return;
					}
				}

				if (customId === CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID) {
					await viewEvents(interaction, value0);
					return;
				}

				if (customId === CATALOGUE_VIEW_SPIRIT_CUSTOM_ID) {
					await parseViewSpirit(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_EVENT_CUSTOM_ID) {
					await parseViewEvent(interaction);
					return;
				}

				if (
					customId.startsWith(CATALOGUE_VIEW_OFFER_1_CUSTOM_ID) ||
					customId.startsWith(CATALOGUE_VIEW_OFFER_2_CUSTOM_ID) ||
					customId.startsWith(CATALOGUE_VIEW_OFFER_3_CUSTOM_ID)
				) {
					await parseSetItems(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID)) {
					await setSeasonItems(interaction);
					return;
				}

				if (
					SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.includes(
						customId as (typeof SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					if (await isNotComponentsV2(interaction)) {
						return;
					}

					await today(interaction, Number(value0));
					return;
				}

				if (customId === SKY_PROFILE_EDIT_CUSTOM_ID) {
					await Profile.edit(interaction);
					return;
				}

				if (customId === SKY_PROFILE_RESET_CUSTOM_ID) {
					await Profile.reset(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID) {
					await Profile.setWingedLight(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID) {
					await Profile.setSeasons(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID) {
					await Profile.setPlatform(interaction);
					return;
				}

				if (
					SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.includes(
						customId as (typeof SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					await Profile.exploreProfile(interaction, value0);
					return;
				}

				if (
					SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.includes(
						customId as (typeof SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					await Profile.exploreLikedProfile(interaction);
					return;
				}

				if (isGuildStringSelectMenu(interaction)) {
					if (customId === NOTIFICATIONS_SETUP_CUSTOM_ID) {
						const notificationType = Number(value0);

						if (!isNotificationType(notificationType)) {
							pino.error(
								interaction,
								"Received an unknown notification type whilst setting up notifications.",
							);

							await client.api.interactions.updateMessage(
								interaction.id,
								interaction.token,
								ERROR_RESPONSE_COMPONENTS_V2,
							);

							return;
						}

						await displayNotificationType(interaction, notificationType);
						return;
					}

					if (customId.startsWith(NOTIFICATIONS_SETUP_OFFSET_CUSTOM_ID)) {
						await handleNotificationsStringSelectMenu(interaction);
						return;
					}

					if (customId === DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID) {
						await questSwap(interaction);
						return;
					}

					if (customId === DAILY_GUIDES_LOCALE_CUSTOM_ID) {
						await interactive(interaction, { locale: value0 as Locale });
						return;
					}

					if (customId === AI_FREQUENCY_SELECT_MENU_CUSTOM_ID) {
						await AI.set(interaction);
						return;
					}
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown select menu interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? ERROR_RESPONSE
					: ERROR_RESPONSE_COMPONENTS_V2,
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
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown role select menu interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? ERROR_RESPONSE
					: ERROR_RESPONSE_COMPONENTS_V2,
			);

			return;
		}

		if (isGuildChannelSelectMenu(interaction)) {
			logMessageComponent(interaction);
			const customId = interaction.data.custom_id;

			try {
				if (customId === DAILY_GUIDES_SETUP_CUSTOM_ID) {
					await handleDailyGuidesChannelSelectMenu(interaction);
					return;
				}

				if (customId.startsWith(NOTIFICATIONS_SETUP_CHANNEL_CUSTOM_ID)) {
					await handleNotificationsChannelSelectMenu(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown channel select menu interaction.");

			await api.interactions.updateMessage(
				interaction.id,
				interaction.token,
				interaction.message.flags && (interaction.message.flags & MessageFlags.IsComponentsV2) === 0
					? ERROR_RESPONSE
					: ERROR_RESPONSE_COMPONENTS_V2,
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
			const customId = interaction.data.custom_id;

			try {
				if (customId === FEEDBACK_MODAL_CUSTOM_ID) {
					await feedbackSubmission(interaction);
					return;
				}

				if (customId === ISSUE_MODAL_CUSTOM_ID) {
					await issueSubmission(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID) {
					await Profile.setName(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID) {
					await Profile.setDescription(interaction);
					return;
				}

				if (customId === SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID) {
					await Profile.setSpot(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_REPORT_MODAL_CUSTOM_ID)) {
					await Profile.sendReport(interaction);
					return;
				}

				if (customId === SHOP_SUGGESTION_MODAL_CUSTOM_ID) {
					await shopSuggestionSubmission(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown modal interaction.");
			await api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE_COMPONENTS_V2);
		}
	},
} satisfies Event<typeof name>;
