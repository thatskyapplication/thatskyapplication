import type { Interaction } from "discord.js";
import { Events, InteractionType } from "discord.js";
import { ROLES_SELECT_MENU_CUSTOM_ID } from "../Commands/General/roles.js";
import { SKY_PROFILE_MODAL } from "../Commands/General/sky-profile.js";
import commands, {
	isAutocompleteCommand,
	isChatInputCommand,
	isCommandName,
	isUserContextMenuCommand,
} from "../Commands/index.js";
import Profile from "../Structures/Profile.js";
import { User } from "../Utility/Constants.js";
import { consoleLog } from "../Utility/Utility.js";
import type { Event } from "./index.js";

const name = Events.InteractionCreate;

const interactionErrorResponseBody = {
	content: "An error was encountered. Rest easy, it's being tracked!",
	ephemeral: true,
};

async function recoverInteractionError(interaction: Interaction, error: unknown) {
	let errorTypeString = "Error ";

	switch (interaction.type) {
		case InteractionType.ApplicationCommand:
			errorTypeString += `running command \`/${interaction.commandName}\`.`;
			break;
		case InteractionType.ApplicationCommandAutocomplete:
			errorTypeString += `autocompleting \`/${interaction.commandName}\`.`;
			break;
		default:
			errorTypeString += `performing \`${interaction.customId}\`.`;
			break;
	}

	void interaction.client.log(errorTypeString, error);

	try {
		if (interaction.isAutocomplete()) {
			await interaction.respond([]);
		} else if (interaction.deferred || interaction.replied) {
			await interaction.followUp(interactionErrorResponseBody);
		} else {
			await interaction.reply(interactionErrorResponseBody);
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
				void interaction.client.log(`Received an unknown chat input command interaction (\`${commandName}\`).`);

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
				void interaction.client.log(`Received an unknown chat input command interaction (\`${commandName}\`).`);
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
				void interaction.client.log(`Received an unknown user context menu command interaction (\`${commandName}\`).`);

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
				void interaction.client.log(`Received an unknown user context menu command interaction (\`${commandName}\`).`);
				return;
			}

			try {
				await command.userContextMenu(interaction);
			} catch (error) {
				void recoverInteractionError(interaction, error);
			}

			return;
		}

		if (interaction.isStringSelectMenu()) {
			try {
				if (!interaction.inCachedGuild()) {
					void interaction.client.log(
						`Attempted to perform \`${interaction.customId}\` via a select menu interaction in an uncached guild.`,
						interaction,
					);

					await interaction.reply({ content: "This option does not exist in Ba Sing Se.", ephemeral: true });
					return;
				}

				if (interaction.customId === ROLES_SELECT_MENU_CUSTOM_ID) {
					await commands.roles.apply(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			void interaction.client.log(`Received an unknown select menu interaction (\`${interaction.customId}\`).`);

			void interaction.reply({
				content: "We interact with a lot of options here. But that option... we have no idea what that is.",
				ephemeral: true,
			});

			return;
		}

		if (interaction.isAutocomplete()) {
			const { commandName } = interaction;

			if (!isCommandName(commandName)) {
				void interaction.client.log(
					`Received an unknown command autocomplete interaction (\`${interaction.commandName}\`).`,
				);

				return;
			}

			const command = commands[commandName];

			if (!isAutocompleteCommand(command)) {
				void interaction.client.log(`Received an unknown command via autocomplete (\`${interaction.commandName}\`).`);
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
			try {
				if (interaction.customId === SKY_PROFILE_MODAL) {
					await Profile.setDescription(interaction);
					return;
				}
			} catch (error) {
				void recoverInteractionError(interaction, error);
				return;
			}

			void interaction.client.log(`Received an unknown modal interaction (\`${interaction.customId}\`).`);

			void interaction.reply({
				content:
					"It seems the heavens have opened. But inside... there was nothing to be found for that modal you submitted.",
				ephemeral: true,
			});
		}
	},
};
