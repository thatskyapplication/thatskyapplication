import { type Interaction, Events, InteractionType } from "discord.js";
import {
	D_DAILY_GUIDES_QUEST_1_MODAL,
	D_DAILY_GUIDES_QUEST_2_MODAL,
	D_DAILY_GUIDES_QUEST_3_MODAL,
	D_DAILY_GUIDES_QUEST_4_MODAL,
} from "../Commands/Developer/d-daily-guides.js";
import { HeartHistoryNavigationType, HEART_HISTORY_BACK, HEART_HISTORY_FORWARD } from "../Commands/Fun/heart.js";
import { ROLES_SELECT_MENU_CUSTOM_ID } from "../Commands/General/roles.js";
import {
	SKY_PROFILE_MODAL,
	SKY_PROFILE_PLATFORM_CUSTOM_ID,
	SKY_PROFILE_SEASONS_CUSTOM_ID,
} from "../Commands/General/sky-profile.js";
import commands, {
	isAutocompleteCommand,
	isChatInputCommand,
	isCommandName,
	isUserContextMenuCommand,
} from "../Commands/index.js";
import Profile from "../Structures/Profile.js";
import { User } from "../Utility/Constants.js";
import { chatInputApplicationCommandMention, consoleLog } from "../Utility/Utility.js";
import type { Event } from "./index.js";

const name = Events.InteractionCreate;
const heartHistoryRegExp = new RegExp(`(${HEART_HISTORY_BACK}|${HEART_HISTORY_FORWARD})-(\\d+)`);

const INTERACTION_ERROR_RESPONSE_BODY = {
	content: "An error was encountered. Rest easy, it's being tracked!",
	ephemeral: true,
} as const;

async function recoverInteractionError(interaction: Interaction, error: unknown) {
	let errorTypeString = `Error from ${interaction.user} in ${interaction.channel} `;

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
			errorTypeString += `interacting with a \`/${interaction.customId}\` component.`;
			break;
		case InteractionType.ApplicationCommandAutocomplete:
			// eslint-disable-next-line no-case-declarations
			const focused = interaction.options.getFocused(true);
			errorTypeString += `autocompleting \`/${interaction.commandName}\` (\`${focused.name}\`, \`${focused.value}\`).`;
			break;
		case InteractionType.ModalSubmit:
			errorTypeString += `submitting \`/${interaction.customId}\`.`;
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

export const event: Event<typeof name> = {
	name,
	async fire(interaction) {
		if (interaction.isChatInputCommand()) {
			const { commandName } = interaction;

			if (!isCommandName(commandName)) {
				void interaction.client.log({
					content: `Received an unknown chat input command interaction (\`${commandName}\`).`,
				});

				void interaction.reply({
					content: "A dark crab appeared out of nowhere and gobbled this command up. It doesn't seem to exist.",
					ephemeral: true,
				});

				return;
			}

			const command = commands[commandName];

			if ("developer" in command && command.developer && interaction.user.id !== User.Jiralite) {
				await interaction.reply("Disallowed.");
				return;
			}

			if (!isChatInputCommand(command)) {
				void interaction.client.log({
					content: `Received an unknown chat input command interaction (\`${commandName}\`).`,
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
			const { commandName } = interaction;

			if (!isCommandName(commandName)) {
				void interaction.client.log({
					content: `Received an unknown user context menu command interaction (\`${commandName}\`).`,
				});

				void interaction.reply({
					content: "A dark dragon appeared and struck the user. The command flew away.",
					ephemeral: true,
				});

				return;
			}

			const command = commands[commandName];

			if ("developer" in command && command.developer && interaction.user.id !== User.Jiralite) {
				await interaction.reply("Disallowed.");
				return;
			}

			if (!isUserContextMenuCommand(command)) {
				void interaction.client.log({
					content: `Received an unknown user context menu command interaction (\`${commandName}\`).`,
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

		if (interaction.isButton()) {
			const { customId } = interaction;

			try {
				const heartHistoryResult = heartHistoryRegExp.exec(customId);

				if (heartHistoryResult) {
					const [, type, timestamp] = heartHistoryResult;

					await commands.heart.heartHistory(interaction, {
						type: type === HEART_HISTORY_BACK ? HeartHistoryNavigationType.Back : HeartHistoryNavigationType.Forward,
						timestamp: Number(timestamp!),
					});

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
			const { customId } = interaction;

			try {
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
						content: `Attempted to perform \`${interaction.customId}\` via a select menu interaction in an uncached guild.`,
						error: interaction,
					});

					await interaction.reply({ content: "This option does not exist in Ba Sing Se.", ephemeral: true });
					return;
				}

				if (customId === ROLES_SELECT_MENU_CUSTOM_ID) {
					await commands.roles.apply(interaction);
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

			if (!isCommandName(commandName)) {
				void interaction.client.log({
					content: `Received an unknown command autocomplete interaction (\`${interaction.commandName}\`).`,
				});

				return;
			}

			const command = commands[commandName];

			if (!isAutocompleteCommand(command)) {
				void interaction.client.log({
					content: `Received an unknown command via autocomplete (\`${interaction.commandName}\`).`,
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

		if (interaction.isModalSubmit()) {
			const { customId } = interaction;

			try {
				if (customId === SKY_PROFILE_MODAL) {
					await Profile.setDescription(interaction);
					return;
				}

				if (D_DAILY_GUIDES_QUEST_1_MODAL === customId) {
					await commands["d-daily-guides"].parseQuest(interaction, 1);
					return;
				}

				if (D_DAILY_GUIDES_QUEST_2_MODAL === customId) {
					await commands["d-daily-guides"].parseQuest(interaction, 2);
					return;
				}

				if (D_DAILY_GUIDES_QUEST_3_MODAL === customId) {
					await commands["d-daily-guides"].parseQuest(interaction, 3);
					return;
				}

				if (D_DAILY_GUIDES_QUEST_4_MODAL === customId) {
					await commands["d-daily-guides"].parseQuest(interaction, 4);
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
