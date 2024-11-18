import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIUserApplicationCommandInteraction,
	GatewayDispatchEvents,
	InteractionType,
	type Locale,
	RESTJSONErrorCodes,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { GUILD_CACHE } from "../caches/guilds.js";
import {
	AUTOCOMPLETE_COMMANDS,
	CHAT_INPUT_COMMANDS,
	USER_CONTEXT_MENU_COMMANDS,
} from "../commands/index.js";
import AI, { AI_FREQUENCY_SELECT_MENU_CUSTOM_ID } from "../models/AI.js";
import {
	CATALOGUE_BACK_TO_START_CUSTOM_ID,
	CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID,
	CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID,
	CATALOGUE_REALM_EVERYTHING_CUSTOM_ID,
	CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID,
	CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID,
	CATALOGUE_SHARE_PROMPT_CUSTOM_ID,
	CATALOGUE_SHARE_SEND_CUSTOM_ID,
	CATALOGUE_VIEW_ELDERS_CUSTOM_ID,
	CATALOGUE_VIEW_EVENT_CUSTOM_ID,
	CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID,
	CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID,
	CATALOGUE_VIEW_OFFER_1_CUSTOM_ID,
	CATALOGUE_VIEW_OFFER_2_CUSTOM_ID,
	CATALOGUE_VIEW_OFFER_3_CUSTOM_ID,
	CATALOGUE_VIEW_REALMS_CUSTOM_ID,
	CATALOGUE_VIEW_REALM_CUSTOM_ID,
	CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID,
	CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
	CATALOGUE_VIEW_SEASON_CUSTOM_ID,
	CATALOGUE_VIEW_SPIRIT_CUSTOM_ID,
	CATALOGUE_VIEW_START_CUSTOM_ID,
	CATALOGUE_VIEW_TYPE_CUSTOM_ID,
	Catalogue,
} from "../models/Catalogue.js";
// import Profile, {
// 	SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID,
// 	SKY_PROFILE_EDIT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS,
// 	SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS,
// 	SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID,
// 	SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID,
// 	SKY_PROFILE_REPORT_MODAL_CUSTOM_ID,
// 	SKY_PROFILE_RESET_CUSTOM_ID,
// 	SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID,
// 	SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID,
// 	SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID,
// 	SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID,
// 	SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID,
// 	SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID,
// 	SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID,
// 	SKY_PROFILE_SHOW_RESET_CUSTOM_ID,
// } from "../models/Profile.js";
import pino from "../pino.js";
import {
	dailyMessageModalResponse,
	distribute,
	interactive,
	questSwap,
	setDailyMessage,
	setTreasureCandles,
	treasureCandlesModalResponse,
	treasureCandlesSelectMenuResponse,
} from "../services/admin.js";
import { finaliseSetup } from "../services/notification.js";
import { deleteUserData } from "../services/data.js";
import {
	answer,
	isGuessDifficultyLevel,
	leaderboard,
	parseEndGame,
	tryAgain,
} from "../services/guess.js";
// import { history } from "../services/heart.js";
// import { browse, today } from "../services/shard-eruption.js";
// import { parseSpiritSwitch } from "../services/spirit.js";
import { isSeasonId } from "../utility/catalogue.js";
import {
	DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_DAILY_MESSAGE_MODAL,
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_MODAL,
	DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID,
	DATA_DELETION_CUSTOM_ID,
	ERROR_RESPONSE,
	GUESS_ANSWER_1,
	GUESS_ANSWER_2,
	GUESS_ANSWER_3,
	GUESS_END_GAME,
	GUESS_LEADERBOARD_BACK_CUSTOM_ID,
	GUESS_LEADERBOARD_NEXT_CUSTOM_ID,
	GUESS_TRY_AGAIN,
	// HEART_HISTORY_BACK,
	// HEART_HISTORY_NEXT,
	NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
} from "../utility/constants.js";
import {
	isAutocomplete,
	isButton,
	isChatInputCommand,
	isModalSubmit,
	isRealm,
	isSelectMenu,
	isUserContextMenuCommand,
} from "../utility/functions.js";
// import {
// 	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
// 	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
// 	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
// 	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
// 	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
// 	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
// 	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
// 	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
// } from "../utility/shard-eruption.js";
// import { SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID } from "../utility/spirits.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.InteractionCreate;

async function recoverInteractionError(interaction: APIInteraction, error: unknown) {
	const user = interaction.user ?? interaction.member?.user!;
	let errorTypeString = `Error from ${user.username} in ${interaction.channel!.id} from `;

	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			errorTypeString += `running command ${
				// TODO: Do this
				interaction.isChatInputCommand() ? String(interaction) : interaction.data.name
			}.`;

			break;
		}
		case InteractionType.MessageComponent: {
			errorTypeString += `interacting with a \`${interaction.data.custom_id}\` component.`;
			break;
		}
		case InteractionType.ApplicationCommandAutocomplete: {
			// TODO: Do this
			const focused = interaction.options.getFocused(true);
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
		if (interaction.isAutocomplete()) {
			await interaction.respond([]);
		} else if (interaction.deferred || interaction.replied) {
			await interaction.followUp(ERROR_RESPONSE);
		} else {
			await interaction.reply(ERROR_RESPONSE);
		}
	} catch (error) {
		pino.error(error, "Failed to follow up or reply from recovering an interaction error.");
	}
}

function logCommand(
	interaction: APIChatInputApplicationCommandInteraction | APIUserApplicationCommandInteraction,
) {
	// TODO: Do this
	const command = "";
	// const command = interaction.isChatInputCommand() ? String(interaction) : commandName;
	const user = interaction.user ?? interaction.member?.user!;

	pino.info(
		{
			user: { id: user.id, username: user.username },
			command,
			guildId: interaction.guild_id,
			channelId: interaction.channel.id,
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
	const user = interaction.user ?? interaction.member?.user!;

	pino.info(
		{
			user: { id: user.id, username: user.username },
			customId: customId,
			values: "values" in interaction.data ? interaction.data.values : null,
			guildId: interaction.guild_id,
			channelId: interaction.channel.id,
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
				await api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE);
				return;
			}

			try {
				await command.chatInput(interaction);
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
				await api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE);
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

				if (
					customId === CATALOGUE_VIEW_START_CUSTOM_ID ||
					customId === CATALOGUE_BACK_TO_START_CUSTOM_ID
				) {
					await Catalogue.viewCatalogue(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_REALMS_CUSTOM_ID) {
					await Catalogue.viewRealms(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_REALM_CUSTOM_ID)) {
					const parsedCustomId = customId.slice(customId.indexOf("§") + 1);

					if (isRealm(parsedCustomId)) {
						await Catalogue.viewRealm(interaction, parsedCustomId);
						return;
					}
				}

				if (customId === CATALOGUE_VIEW_ELDERS_CUSTOM_ID) {
					await Catalogue.viewElders(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_SEASONS_CUSTOM_ID) {
					await Catalogue.viewSeasons(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_SEASON_CUSTOM_ID)) {
					const parsedCustomId = Number(customId.slice(customId.indexOf("§") + 1));

					if (isSeasonId(parsedCustomId)) {
						await Catalogue.viewSeason(interaction, parsedCustomId);
						return;
					}
				}

				if (customId === CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID) {
					await Catalogue.viewEventYears(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID)) {
					const parsedCustomId = customId.slice(customId.indexOf("§") + 1);
					await Catalogue.viewEvents(interaction, parsedCustomId);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_EVENT_CUSTOM_ID)) {
					await Catalogue.parseViewEvent(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID) {
					await Catalogue.viewReturningSpirits(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_VIEW_SPIRIT_CUSTOM_ID)) {
					await Catalogue.parseViewSpirit(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_REALM_EVERYTHING_CUSTOM_ID)) {
					await Catalogue.setRealm(interaction);
					return;
				}

				if (customId === CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID) {
					await Catalogue.setElders(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_SHARE_PROMPT_CUSTOM_ID)) {
					await Catalogue.sharePrompt(interaction);
					return;
				}

				if (
					customId === CATALOGUE_SHARE_SEND_CUSTOM_ID &&
					interaction.guild_id &&
					GUILD_CACHE.has(interaction.guild_id)
				) {
					await Catalogue.shareSend(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID)) {
					await Catalogue.setSeason(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID)) {
					await Catalogue.parseSetItems(interaction);
					return;
				}

				// if (customId === SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID) {
				// 	await today(interaction);
				// 	return;
				// }

				// if (
				// 	customId.startsWith(SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID) ||
				// 	customId.startsWith(SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID)
				// ) {
				// 	await today(interaction, Number(customId.slice(customId.indexOf("§") + 1)));

				// 	return;
				// }

				// if (customId === SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID) {
				// 	await browse(interaction);
				// 	return;
				// }

				// if (
				// 	customId.startsWith(SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID) ||
				// 	customId.startsWith(SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID) ||
				// 	customId.startsWith(SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID)
				// ) {
				// 	await browse(interaction, Number(customId.slice(customId.indexOf("§") + 1)));

				// 	return;
				// }

				// if (customId === SKY_PROFILE_SHOW_RESET_CUSTOM_ID) {
				// 	await Profile.showReset(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID) {
				// 	await Profile.showEdit(interaction);
				// 	return;
				// }

				// if (
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID)
				// ) {
				// 	await Profile.explore(interaction);
				// 	return;
				// }

				// if (
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID)
				// ) {
				// 	await Profile.exploreLikes(interaction);
				// 	return;
				// }

				// if (
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID)
				// ) {
				// 	await Profile.exploreProfile(interaction, customId.slice(customId.indexOf("§") + 1));
				// 	return;
				// }

				// if (
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID) ||
				// 	customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID)
				// ) {
				// 	await Profile.exploreLikedProfile(interaction);
				// 	return;
				// }

				// if (customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID)) {
				// 	await Profile.like(interaction);
				// 	return;
				// }

				// if (customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID)) {
				// 	await Profile.like(interaction, true);
				// 	return;
				// }

				// if (customId.startsWith(SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID)) {
				// 	await Profile.report(interaction);
				// 	return;
				// }

				// if (customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID)) {
				// 	await Profile.report(interaction, true);
				// 	return;
				// }

				// if (customId.startsWith(SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID)) {
				// 	await Profile.reportModalPrompt(interaction);
				// 	return;
				// }

				// if (customId.startsWith(HEART_HISTORY_BACK) || customId.startsWith(HEART_HISTORY_NEXT)) {
				// 	await history(interaction);
				// 	return;
				// }

				// if (customId.startsWith(SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID)) {
				// 	await parseSpiritSwitch(interaction);
				// 	return;
				// }

				if (
					customId.startsWith(GUESS_ANSWER_1) ||
					customId.startsWith(GUESS_ANSWER_2) ||
					customId.startsWith(GUESS_ANSWER_3)
				) {
					await answer(interaction);
					return;
				}

				if (customId.startsWith(GUESS_END_GAME)) {
					await parseEndGame(interaction);
					return;
				}

				if (customId.startsWith(GUESS_TRY_AGAIN)) {
					await tryAgain(interaction);
					return;
				}

				if (
					customId.startsWith(GUESS_LEADERBOARD_BACK_CUSTOM_ID) ||
					customId.startsWith(GUESS_LEADERBOARD_NEXT_CUSTOM_ID)
				) {
					const guessDifficultyLevel = Number(
						customId.slice(customId.indexOf("§") + 1, customId.lastIndexOf("§")),
					);

					if (isGuessDifficultyLevel(guessDifficultyLevel)) {
						await leaderboard(interaction, guessDifficultyLevel);
						return;
					}
				}

				if (customId === DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID) {
					await dailyMessageModalResponse(interaction);
					return;
				}

				if (customId === DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID) {
					await treasureCandlesModalResponse(interaction);
					return;
				}

				if (customId === DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID) {
					await distribute(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown button interaction.");
			await api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
			return;
		}

		if (isSelectMenu(interaction)) {
			logMessageComponent(interaction);
			const customId = interaction.data.custom_id;
			const values = interaction.data.values;

			try {
				if (customId === CATALOGUE_VIEW_TYPE_CUSTOM_ID) {
					await Catalogue.parseCatalogueType(interaction);
					return;
				}

				const value0 = values[0]!;

				if (customId === CATALOGUE_VIEW_REALM_CUSTOM_ID && isRealm(value0)) {
					await Catalogue.viewRealm(interaction, value0);
					return;
				}

				if (customId === CATALOGUE_VIEW_SEASON_CUSTOM_ID) {
					const seasonId = Number(value0);

					if (isSeasonId(seasonId)) {
						await Catalogue.viewSeason(interaction, seasonId);
						return;
					}
				}

				if (customId === CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID) {
					await Catalogue.viewEvents(interaction, value0);
					return;
				}

				if (customId === CATALOGUE_VIEW_SPIRIT_CUSTOM_ID) {
					await Catalogue.parseViewSpirit(interaction);
					return;
				}

				if (customId === CATALOGUE_VIEW_EVENT_CUSTOM_ID) {
					await Catalogue.parseViewEvent(interaction);
					return;
				}

				if (
					customId.startsWith(CATALOGUE_VIEW_OFFER_1_CUSTOM_ID) ||
					customId.startsWith(CATALOGUE_VIEW_OFFER_2_CUSTOM_ID) ||
					customId.startsWith(CATALOGUE_VIEW_OFFER_3_CUSTOM_ID)
				) {
					await Catalogue.parseSetItems(interaction);
					return;
				}

				if (customId.startsWith(CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID)) {
					await Catalogue.setSeasonItems(interaction);
					return;
				}

				// if (
				// 	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.includes(
				// 		customId as (typeof SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS)[number],
				// 	)
				// ) {
				// 	await today(interaction, Number(value0));
				// 	return;
				// }

				// if (customId === SKY_PROFILE_EDIT_CUSTOM_ID) {
				// 	await Profile.edit(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_RESET_CUSTOM_ID) {
				// 	await Profile.reset(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID) {
				// 	await Profile.setSeasons(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID) {
				// 	await Profile.setPlatform(interaction);
				// 	return;
				// }

				// if (
				// 	SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.includes(
				// 		customId as (typeof SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS)[number],
				// 	)
				// ) {
				// 	await Profile.exploreProfile(interaction, value0);
				// 	return;
				// }

				// if (
				// 	SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.includes(
				// 		customId as (typeof SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS)[number],
				// 	)
				// ) {
				// 	await Profile.exploreLikedProfile(interaction);
				// 	return;
				// }

				if (interaction.guild_id && GUILD_CACHE.has(interaction.guild_id)) {
					if (customId.startsWith(NOTIFICATION_SETUP_OFFSET_CUSTOM_ID)) {
						await finaliseSetup(interaction);
						return;
					}

					if (customId === DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID) {
						await questSwap(interaction);
						return;
					}

					if (customId === DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID) {
						await treasureCandlesSelectMenuResponse(interaction);
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
			await api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
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
				// if (customId === SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID) {
				// 	await Profile.setName(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID) {
				// 	await Profile.setDescription(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID) {
				// 	await Profile.setCountry(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID) {
				// 	await Profile.setWingedLight(interaction);
				// 	return;
				// }

				// if (customId === SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID) {
				// 	await Profile.setSpot(interaction);
				// 	return;
				// }

				// if (customId.startsWith(SKY_PROFILE_REPORT_MODAL_CUSTOM_ID)) {
				// 	await Profile.sendReport(interaction);
				// 	return;
				// }

				if (DAILY_GUIDES_DAILY_MESSAGE_MODAL === customId) {
					await setDailyMessage(interaction);
					return;
				}

				if (customId.startsWith(DAILY_GUIDES_TREASURE_CANDLES_MODAL)) {
					await setTreasureCandles(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown modal interaction.");
			await api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE);
		}
	},
} satisfies Event<typeof name>;
