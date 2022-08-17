import { Events } from "discord.js";
import type { Event } from "./index.js";
import { rolesSelectMenuCustomId } from "../Commands/General/roles.js";
import { SKY_PROFILE_MODAL } from "../Commands/General/sky-profile.js";
import commands, { isAutocompleteCommand, isChatInputCommand, isCommandName, isUserContextMenuCommand } from "../Commands/index.js";
import Profile from "../Structures/Profile.js";

const name = Events.InteractionCreate;

export const event: Event<typeof name> = {
  name,
  async fire(interaction) {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;

      if (!isCommandName(commandName)) {
        interaction.client.log(`Received an unknown chat input command interaction (\`${commandName}\`).`);

        interaction.reply({
          content: "A dark crab appeared out of nowhere and gobbled this command up. It doesn't seem to exist.",
          ephemeral: true
        });

        return;
      }

      const command = commands[commandName];

      if (!isChatInputCommand(command)) {
        interaction.client.log(`Received an unknown chat input command interaction (\`${commandName}\`).`);
        return;
      }

      try {
        await command.chatInput(interaction);
      } catch (error) {
        interaction.client.log(`Error running command \`/${commandName}\`.`, error);
        const interactionResponseBody = { content: "An error was encountered. Rest easy, it's being tracked!", ephemeral: true };
        (interaction.deferred || interaction.replied ? interaction.followUp(interactionResponseBody) : interaction.reply(interactionResponseBody)).catch(() => null);
      }

      return;
    }

    if (interaction.isUserContextMenuCommand()) {
      const { commandName } = interaction;

      if (!isCommandName(commandName)) {
        interaction.client.log(`Received an unknown user context menu command interaction (\`${commandName}\`).`);

        interaction.reply({
          content: "A dark dragon appeared and striked the user. The command flew away.",
          ephemeral: true
        });

        return;
      }

      const command = commands[commandName];

      if (!isUserContextMenuCommand(command)) {
        interaction.client.log(`Received an unknown user context menu command interaction (\`${commandName}\`).`);
        return;
      }

      try {
        await command.userContextMenu(interaction);
      } catch (error) {
        interaction.client.log(`Error running command \`${commandName}\`.`, error);
        const interactionResponseBody = { content: "An error was encountered. Rest easy, it's being tracked!", ephemeral: true };
        (interaction.deferred || interaction.replied ? interaction.followUp(interactionResponseBody) : interaction.reply(interactionResponseBody)).catch(() => null);
      }
    }

    if (interaction.isSelectMenu()) {
      try {
        if (!interaction.inCachedGuild()) {
          interaction.client.log(`Attempted to perform \`${interaction.customId}\` via a select menu interaction in an uncached guild.`, interaction);

          return void await interaction.reply({
            content: "This option does not exist in Ba Sing Se.",
            ephemeral: true
          });
        }

        if (interaction.customId === rolesSelectMenuCustomId) return await commands.roles.apply(interaction);
      } catch (error) {
        interaction.client.log(`Error performing \`${interaction.customId}\`.`, error);
        const interactionResponseBody = { content: "An error was encountered. Rest easy, it's being tracked!", ephemeral: true };
        (interaction.deferred || interaction.replied ? interaction.followUp(interactionResponseBody) : interaction.reply(interactionResponseBody)).catch(() => null);
        return;
      }

      interaction.client.log(`Received an unknown select menu interaction (\`${interaction.customId}\`).`);

      interaction.reply({
        content: "We interact with a lot of options here. But that option... we have no idea what that is.",
        ephemeral: true
      });

      return;
    }

    if (interaction.isAutocomplete()) {
      const { commandName } = interaction;

      if (!isCommandName(commandName)) {
        interaction.client.log(`Received an unknown command autocomplete interaction (\`${interaction.commandName}\`).`);
        return;
      }

      const command = commands[commandName];

      if (!isAutocompleteCommand(command)) {
        interaction.client.log(`Received an unknown command via autocomplete (\`${interaction.commandName}\`).`);
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        interaction.client.log(`Error autocompleting \`/${commandName}\`.`, error);
      }
    }

    if (interaction.isModalSubmit()) {
      try {
        if (interaction.customId === SKY_PROFILE_MODAL) return await Profile.setDescription(interaction);
      } catch (error) {
        interaction.client.log(`Error performing \`${interaction.customId}\`.`, error);
        const interactionResponseBody = { content: "An error was encountered. Rest easy, it's being tracked!", ephemeral: true };
        (interaction.deferred || interaction.replied ? interaction.followUp(interactionResponseBody) : interaction.reply(interactionResponseBody)).catch(() => null);
        return;
      }

      interaction.client.log(`Received an unknown modal interaction (\`${interaction.customId}\`).`);

      interaction.reply({
        content: "It seems the heavens have opened. But inside... there was nothing to be found for that modal you submitted.",
        ephemeral: true
      });

      return;
    }
  }
};
