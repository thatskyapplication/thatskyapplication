import {
	type ChatInputCommandInteraction,
	type ContextMenuCommandInteraction,
	type Interaction,
	Events,
	InteractionType,
	EmbedBuilder,
	hyperlink,
	channelLink,
} from "discord.js";
import {
	DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_DAILY_MESSAGE_MODAL,
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_MODAL,
} from "../Commands/Admin/admin.js";
import { HeartHistoryNavigationType, HEART_HISTORY_BACK, HEART_HISTORY_FORWARD } from "../Commands/Fun/heart.js";
import { DATA_DELETION_CUSTOM_ID } from "../Commands/General/data.js";
import {
	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
} from "../Commands/General/shard-eruption.js";
import {
	SKY_PROFILE_MODAL,
	SKY_PROFILE_PLATFORM_CUSTOM_ID,
	SKY_PROFILE_SEASONS_CUSTOM_ID,
} from "../Commands/General/sky-profile.js";
import { SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID } from "../Commands/General/spirit.js";
import COMMANDS, { resolveCommand } from "../Commands/index.js";
import AI, { AI_FREQUENCY_SELECT_MENU_CUSTOM_ID } from "../Structures/AI.js";
import { deleteUserData } from "../Structures/Data.js";
import Profile from "../Structures/Profile.js";
import { isSeasonName } from "../Structures/Season.js";
import {
	SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID,
	SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID,
	SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID,
	SPIRIT_TRACKER_REALMS_BACK_CUSTOM_ID,
	SPIRIT_TRACKER_REALM_BACK_CUSTOM_ID,
	SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID,
	SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID,
	SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID,
	SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID,
	SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID,
	SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID,
	SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID,
	SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID,
	SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID,
	SpiritTracker,
} from "../Structures/Spirits/SpiritTracker.js";
import { chatInputApplicationCommandMention, consoleLog, guildLink, isRealm } from "../Utility/Utility.js";
import { LogType } from "../index.js";
import type { Event } from "./index.js";

const name = Events.InteractionCreate;
const heartHistoryRegExp = new RegExp(`(${HEART_HISTORY_BACK}|${HEART_HISTORY_FORWARD})-(\\d+)`);

const INTERACTION_ERROR_RESPONSE_BODY = {
	content: "An error was encountered. Rest easy, it's being tracked!",
	ephemeral: true,
} as const;

async function recoverInteractionError(interaction: Interaction, error: unknown) {
	let errorTypeString = `Error from ${interaction.user} (${interaction.user.tag}) in ${interaction.channel} (${interaction.channelId}) from `;

	switch (interaction.type) {
		case InteractionType.ApplicationCommand:
			// eslint-disable-next-line no-case-declarations
			const isChatInputCommand = interaction.isChatInputCommand();

			errorTypeString += `running command ${chatInputApplicationCommandMention(
				interaction.commandId,
				interaction.commandName,
				isChatInputCommand ? interaction.options.getSubcommand(false) : undefined,
				isChatInputCommand ? interaction.options.getSubcommandGroup() : undefined,
			)}.`;

			break;
		case InteractionType.MessageComponent:
			errorTypeString += `interacting with a \`${interaction.customId}\` component.`;
			break;
		case InteractionType.ApplicationCommandAutocomplete:
			// eslint-disable-next-line no-case-declarations
			const focused = interaction.options.getFocused(true);
			errorTypeString += `autocompleting \`/${interaction.commandName}\` (\`${focused.name}\`, \`${focused.value}\`).`;
			break;
		case InteractionType.ModalSubmit:
			errorTypeString += `submitting \`${interaction.customId}\`.`;
			break;
	}

	void interaction.client.log({ content: errorTypeString, error });

	try {
		if (interaction.isAutocomplete()) {
			await interaction.respond([]);
		} else if (interaction.deferred || interaction.replied) {
			await interaction.followUp(INTERACTION_ERROR_RESPONSE_BODY);
		} else {
			await interaction.reply(INTERACTION_ERROR_RESPONSE_BODY);
		}
	} catch (error) {
		consoleLog(`Failed to follow up or reply from recovering an interaction error: ${error}`);
	}
}

async function logCommand(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) {
	const { appPermissions, channelId, guildId, guild, user } = interaction;

	const embed = new EmbedBuilder()
		.setAuthor({ name: `${user.tag} (${user.id})`, iconURL: user.displayAvatarURL() })
		.setDescription(`\`${interaction.isChatInputCommand() ? interaction.toString() : interaction.commandName}\``)
		.setFields(
			{
				name: "Guild",
				value: guildId
					? guild
						? `${guild.name} (${hyperlink(`\`${guildId}\``, guildLink(guildId))})`
						: hyperlink(`\`${guildId}\``, guildLink(guildId))
					: "None",
				inline: true,
			},
			{
				name: "Channel",
				value: guildId
					? hyperlink(`\`${channelId}\``, channelLink(channelId, guildId))
					: hyperlink(`\`${channelId}\``, channelLink(channelId)),
				inline: true,
			},
		)
		.setTimestamp();

	if (appPermissions) embed.addFields({ name: "Permissions", value: `\`${appPermissions.bitfield}\``, inline: true });
	void interaction.client.log({ embeds: [embed], type: LogType.Command });
}

export const event: Event<typeof name> = {
	name,
	async fire(interaction) {
		if (interaction.isChatInputCommand()) {
			void logCommand(interaction);
			const { commandName } = interaction;
			const command = resolveCommand(interaction);

			if (!command) {
				void interaction.client.log({
					content: `Received an unknown chat input command interaction (\`${commandName}\`).`,
				});

				void interaction.reply({
					content: "A dark crab appeared out of nowhere and gobbled this command up. It doesn't seem to exist.",
					ephemeral: true,
				});

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
			void logCommand(interaction);
			const { commandName } = interaction;
			const command = resolveCommand(interaction);

			if (!command) {
				void interaction.client.log({
					content: `Received an unknown user context menu command interaction (\`${commandName}\`).`,
				});

				void interaction.reply({
					content: "A dark dragon appeared and struck the user. The command flew away.",
					ephemeral: true,
				});

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
			void logCommand(interaction);
			const { commandName } = interaction;
			const command = resolveCommand(interaction);

			if (!command) {
				void interaction.client.log({
					content: `Received an unknown message context menu command interaction (\`${commandName}\`).`,
				});

				void interaction.reply({
					content: "A nearby jellyfish gobbled up this message context menu command.",
					ephemeral: true,
				});

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
					customId === SPIRIT_TRACKER_REALMS_BACK_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_REALM_BACK_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_ELDERS_BACK_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_SEASONS_BACK_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_SEASON_BACK_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_SPIRIT_BACK_ELDER_CUSTOM_ID ||
					customId.startsWith(SPIRIT_TRACKER_SPIRIT_BACK_STANDARD_CUSTOM_ID) ||
					customId.startsWith(SPIRIT_TRACKER_SPIRIT_BACK_SEASONAL_CUSTOM_ID) ||
					customId === SPIRIT_TRACKER_BACK_TO_START_CUSTOM_ID
				) {
					await SpiritTracker.parseBack(interaction);
					return;
				}

				if (customId.startsWith(SPIRIT_TRACKER_REALM_EVERYTHING_CUSTOM_ID)) {
					await SpiritTracker.setSpirits(interaction);
					return;
				}

				if (customId === SPIRIT_TRACKER_ELDERS_EVERYTHING_CUSTOM_ID) {
					await SpiritTracker.setElders(interaction);
					return;
				}

				if (customId.startsWith(SPIRIT_TRACKER_SEASON_EVERYTHING_CUSTOM_ID)) {
					await SpiritTracker.setSeason(interaction);
					return;
				}

				if (customId.startsWith(SPIRIT_TRACKER_SPIRIT_EVERYTHING_CUSTOM_ID)) {
					await SpiritTracker.setSpirit(interaction);
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
					await COMMANDS.sharderuption.today(interaction, Number(customId.slice(customId.indexOf("§") + 1)));
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
					await COMMANDS.sharderuption.browse(interaction, Number(customId.slice(customId.indexOf("§") + 1)));
					return;
				}

				const heartHistoryResult = heartHistoryRegExp.exec(customId);

				if (heartHistoryResult) {
					const [, type, timestamp] = heartHistoryResult;

					await COMMANDS.heart.heartHistory(interaction, {
						type: type === HEART_HISTORY_BACK ? HeartHistoryNavigationType.Back : HeartHistoryNavigationType.Forward,
						timestamp: Number(timestamp!),
					});

					return;
				}

				if (customId.startsWith(SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID)) {
					await COMMANDS.spirit.parseSpiritSwitch(interaction);
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

			void interaction.client.log({ content: `Received an unknown button interaction (\`${customId}\`).` });

			void interaction.reply({
				content: "A button a day keeps a button away. This useless proverb was brought to you by an unknown button.",
				ephemeral: true,
			});

			return;
		}

		if (interaction.isStringSelectMenu()) {
			const { customId, values } = interaction;

			try {
				if (customId === SPIRIT_TRACKER_VIEW_CUSTOM_ID) {
					await SpiritTracker.parseSpiritType(interaction);
					return;
				}

				const value0 = values[0]!;

				if (customId === SPIRIT_TRACKER_VIEW_REALMS_CUSTOM_ID && isRealm(value0)) {
					await SpiritTracker.viewRealm(interaction, value0);
					return;
				}

				if (customId === SPIRIT_TRACKER_VIEW_SEASONS_CUSTOM_ID && isSeasonName(value0)) {
					await SpiritTracker.viewSeason(interaction, value0);
					return;
				}

				if (
					customId === SPIRIT_TRACKER_VIEW_REALM_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_VIEW_ELDERS_CUSTOM_ID ||
					customId === SPIRIT_TRACKER_VIEW_SEASON_CUSTOM_ID
				) {
					await SpiritTracker.viewSpirit(interaction);
					return;
				}

				if (
					customId.startsWith(SPIRIT_TRACKER_VIEW_SPIRIT_CUSTOM_ID) ||
					customId.startsWith(SPIRIT_TRACKER_VIEW_SPIRIT_OVERFLOW_CUSTOM_ID)
				) {
					await SpiritTracker.setSpirit(interaction);
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

				if (customId === SKY_PROFILE_SEASONS_CUSTOM_ID) {
					await Profile.setSeasons(interaction);
					return;
				}

				if (customId === SKY_PROFILE_PLATFORM_CUSTOM_ID) {
					await Profile.setPlatform(interaction);
					return;
				}

				if (!interaction.inCachedGuild()) {
					void interaction.client.log({
						content: `Attempted to perform \`${customId}\` via a select menu interaction in an uncached guild.`,
						error: interaction,
					});

					await interaction.reply({ content: "This option does not exist in Ba Sing Se.", ephemeral: true });
					return;
				}

				if (customId === DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID) {
					await COMMANDS.admin.questSwap(interaction);
					return;
				}

				if (customId === AI_FREQUENCY_SELECT_MENU_CUSTOM_ID) {
					await AI.set(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			void interaction.client.log({
				content: `Received an unknown select menu interaction (\`${customId}\`).`,
			});

			void interaction.reply({
				content: "We interact with a lot of options here. But that option... we have no idea what that is.",
				ephemeral: true,
			});

			return;
		}

		if (interaction.isAutocomplete()) {
			const { commandName } = interaction;
			const command = resolveCommand(interaction);

			if (!command) {
				void interaction.client.log({
					content: `Received an unknown command autocomplete interaction (\`${commandName}\`).`,
				});

				void interaction.respond([]);
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
				if (customId === SKY_PROFILE_MODAL) {
					await Profile.setDescription(interaction);
					return;
				}

				if (!interaction.isFromMessage()) {
					void interaction.client.log({
						content: `Attempted to perform \`${customId}\` via a modal submit interaction, but expected it to be from a message.`,
						error: interaction,
					});

					await interaction.reply({ content: "This modal submitted itself to the dark dragon.", ephemeral: true });
					return;
				}

				if (DAILY_GUIDES_DAILY_MESSAGE_MODAL === customId) {
					await COMMANDS.admin.setDailyMessage(interaction);
					return;
				}

				if (DAILY_GUIDES_TREASURE_CANDLES_MODAL === customId) {
					await COMMANDS.admin.setTreasureCandles(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			void interaction.client.log({ content: `Received an unknown modal interaction (\`${customId}\`).` });

			void interaction.reply({
				content:
					"It seems the heavens have opened. But inside... there was nothing to be found for that modal you submitted.",
				ephemeral: true,
			});
		}
	},
};
