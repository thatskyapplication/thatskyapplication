import {
	type ChatInputCommandInteraction,
	type ContextMenuCommandInteraction,
	DiscordAPIError,
	Events,
	type Interaction,
	InteractionType,
	type Locale,
	RESTJSONErrorCodes,
} from "discord.js";
import {
	DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_DAILY_MESSAGE_MODAL,
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_MODAL,
	DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID,
} from "../Commands/Admin/admin.js";
import {
	HEART_HISTORY_BACK,
	HEART_HISTORY_FORWARD,
	HeartHistoryNavigationType,
} from "../Commands/Fun/heart.js";
import { DATA_DELETION_CUSTOM_ID } from "../Commands/General/data.js";
import { SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID } from "../Commands/General/spirit.js";
import COMMANDS, { resolveCommand } from "../Commands/index.js";
import AI, { AI_FREQUENCY_SELECT_MENU_CUSTOM_ID } from "../Structures/AI.js";
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
} from "../Structures/Catalogue.js";
import { deleteUserData } from "../Structures/Data.js";
import {
	GUESS_ANSWER_1,
	GUESS_ANSWER_2,
	GUESS_ANSWER_3,
	GUESS_TRY_AGAIN,
	answer,
	tryAgain,
} from "../Structures/Guess.js";
import { NOTIFICATION_SETUP_OFFSET_CUSTOM_ID } from "../Structures/Notification.js";
import Profile, {
	SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID,
	SKY_PROFILE_EDIT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID,
	SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS,
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
	SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID,
	SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID,
	SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID,
} from "../Structures/Profile.js";
import {
	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
} from "../Structures/ShardEruption.js";
import { ERROR_RESPONSE } from "../Utility/Constants.js";
import { isRealm } from "../Utility/Utility.js";
import { isSeasonName } from "../catalogue/spirits/seasons/index.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = Events.InteractionCreate;
const heartHistoryRegExp = new RegExp(`(${HEART_HISTORY_BACK}|${HEART_HISTORY_FORWARD})-(\\d+)`);

async function recoverInteractionError(interaction: Interaction, error: unknown) {
	let errorTypeString = `Error from ${interaction.user.tag} in ${interaction.channelId} from `;

	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			errorTypeString += `running command ${
				interaction.isChatInputCommand() ? String(interaction) : interaction.commandName
			}.`;

			break;
		}
		case InteractionType.MessageComponent: {
			errorTypeString += `interacting with a \`${interaction.customId}\` component.`;
			break;
		}
		case InteractionType.ApplicationCommandAutocomplete: {
			const focused = interaction.options.getFocused(true);
			errorTypeString += `autocompleting \`/${interaction.commandName}\` (\`${focused.name}\`, \`${focused.value}\`).`;
			break;
		}
		case InteractionType.ModalSubmit: {
			errorTypeString += `submitting \`${interaction.customId}\`.`;
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

function logCommand(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) {
	const { appPermissions, channelId, commandName, guildId, guildLocale, locale, user } =
		interaction;

	const command = interaction.isChatInputCommand() ? String(interaction) : commandName;

	pino.info(
		{
			user: { id: user.id, username: user.username },
			command,
			guildId,
			channelId,
			permissions: appPermissions ? String(appPermissions.bitfield) : null,
			locale: { user: locale, guild: guildLocale },
		},
		`Command: ${command}`,
	);
}

export default {
	name,
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: It's fine.
	async fire(interaction) {
		if (interaction.isChatInputCommand()) {
			logCommand(interaction);
			const command = resolveCommand(interaction);

			if (!command) {
				pino.warn(interaction, "Received an unknown chat input command interaction.");
				await interaction.reply(ERROR_RESPONSE);
				return;
			}

			try {
				await command.chatInput(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (interaction.isUserContextMenuCommand()) {
			logCommand(interaction);
			const command = resolveCommand(interaction);

			if (!command) {
				pino.warn(interaction, "Received an unknown user context menu command interaction.");
				await interaction.reply(ERROR_RESPONSE);
				return;
			}

			try {
				await command.userContextMenu(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (interaction.isMessageContextMenuCommand()) {
			logCommand(interaction);
			const command = resolveCommand(interaction);

			if (!command) {
				pino.warn(interaction, "Received an unknown message context menu command interaction.");
				await interaction.reply(ERROR_RESPONSE);
				return;
			}

			try {
				await command.messageContextMenu(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (interaction.isButton()) {
			const { customId } = interaction;

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
					const parsedCustomId = customId.slice(customId.indexOf("§") + 1);

					if (isSeasonName(parsedCustomId)) {
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

				if (customId === CATALOGUE_SHARE_SEND_CUSTOM_ID && interaction.inCachedGuild()) {
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

				if (customId === SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID) {
					await COMMANDS.sharderuption.today(interaction);
					return;
				}

				if (
					customId.startsWith(SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID) ||
					customId.startsWith(SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID)
				) {
					await COMMANDS.sharderuption.today(
						interaction,
						Number(customId.slice(customId.indexOf("§") + 1)),
					);

					return;
				}

				if (customId === SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID) {
					await COMMANDS.sharderuption.browse(interaction);
					return;
				}

				if (
					customId.startsWith(SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID) ||
					customId.startsWith(SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID) ||
					customId.startsWith(SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID)
				) {
					await COMMANDS.sharderuption.browse(
						interaction,
						Number(customId.slice(customId.indexOf("§") + 1)),
					);

					return;
				}

				if (customId === SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID) {
					await Profile.showEdit(interaction);
					return;
				}

				if (
					customId.startsWith(SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID) ||
					customId.startsWith(SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID)
				) {
					await Profile.explore(interaction);
					return;
				}

				if (
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
					await Profile.exploreProfile(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID)) {
					await Profile.exploreLikes(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID)) {
					await Profile.like(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID)) {
					await Profile.explore(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID)) {
					await Profile.report(interaction);
					return;
				}

				if (customId.startsWith(SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID)) {
					await Profile.reportModalPrompt(interaction);
					return;
				}

				const heartHistoryResult = heartHistoryRegExp.exec(customId);

				if (heartHistoryResult) {
					const [, type, timestamp] = heartHistoryResult;

					await COMMANDS.heart.heartHistory(interaction, {
						type:
							type === HEART_HISTORY_BACK
								? HeartHistoryNavigationType.Back
								: HeartHistoryNavigationType.Forward,
						timestamp: Number(timestamp!),
					});

					return;
				}

				if (customId.startsWith(SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID)) {
					await COMMANDS.spirit.parseSpiritSwitch(interaction);
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

				if (customId.startsWith(GUESS_TRY_AGAIN)) {
					await tryAgain(interaction);
					return;
				}

				if (customId === DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID) {
					await COMMANDS.admin.dailyMessageModalResponse(interaction);
					return;
				}

				if (customId === DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID) {
					await COMMANDS.admin.treasureCandlesModalResponse(interaction);
					return;
				}

				if (customId === DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID) {
					await COMMANDS.admin.distribute(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown button interaction.");
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		if (interaction.isStringSelectMenu()) {
			const { customId, values } = interaction;

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

				if (customId === CATALOGUE_VIEW_SEASON_CUSTOM_ID && isSeasonName(value0)) {
					await Catalogue.viewSeason(interaction, value0);
					return;
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

				if (
					SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.includes(
						customId as (typeof SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					await COMMANDS.sharderuption.today(interaction, Number(value0));
					return;
				}

				if (customId === SKY_PROFILE_EDIT_CUSTOM_ID) {
					await Profile.edit(interaction);
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
					) ||
					SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.includes(
						customId as (typeof SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS)[number],
					)
				) {
					await Profile.exploreProfile(interaction);
					return;
				}

				if (interaction.inCachedGuild()) {
					if (customId === NOTIFICATION_SETUP_OFFSET_CUSTOM_ID) {
						// This is handled in the command itself.
						return;
					}

					if (customId === DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID) {
						await COMMANDS.admin.questSwap(interaction);
						return;
					}

					if (customId === DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID) {
						await COMMANDS.admin.treasureCandlesSelectMenuResponse(interaction);
						return;
					}

					if (customId === DAILY_GUIDES_LOCALE_CUSTOM_ID) {
						await COMMANDS.admin.interactive(interaction, { locale: value0 as Locale });
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
			await interaction.update(ERROR_RESPONSE);
			return;
		}

		if (interaction.isAutocomplete()) {
			const command = resolveCommand(interaction);

			if (!command) {
				pino.warn(interaction, "Received an unknown command autocomplete interaction.");
				await interaction.respond([]);
				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (interaction.isModalSubmit()) {
			const { customId } = interaction;

			try {
				if (interaction.isFromMessage()) {
					if (customId === SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID) {
						await Profile.setName(interaction);
						return;
					}

					if (customId === SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID) {
						await Profile.setDescription(interaction);
						return;
					}

					if (customId === SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID) {
						await Profile.setCountry(interaction);
						return;
					}

					if (customId === SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID) {
						await Profile.setWingedLight(interaction);
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

					if (DAILY_GUIDES_DAILY_MESSAGE_MODAL === customId) {
						await COMMANDS.admin.setDailyMessage(interaction);
						return;
					}

					if (customId.startsWith(DAILY_GUIDES_TREASURE_CANDLES_MODAL)) {
						await COMMANDS.admin.setTreasureCandles(interaction);
						return;
					}
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			pino.warn(interaction, "Received an unknown modal interaction.");
			await interaction.reply(ERROR_RESPONSE);
		}
	},
} satisfies Event<typeof name>;
