import { Events } from "discord.js";
import type { Event } from "./index.js";
import Caelus from "../Client/Client.js";
import commands, { isCommandName } from "../Commands/index.js";

const name = Events.InteractionCreate;

export const event: Event<typeof name> = {
  name,
  once: false,
  async fire(interaction): Promise<void> {
    if (!interaction.inCachedGuild()) return;

    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;

      if (!isCommandName(commandName)) {
        Caelus.log(`Received an unknown chat input command interaction (\`${interaction.commandName}\`).`);

        interaction.reply({
          content: "This command is drifting away with the souls of the underworld...",
          ephemeral: true
        });

        return;
      }

      try {
        await commands[commandName].handle(interaction);
      } catch (error) {
        Caelus.log(`Error running command \`/${commandName}\`.`, error);
        const interactionResponseBody = { content: "An error was encountered. Rest easy, it's being tracked!", ephemeral: true };
        interaction.deferred || interaction.replied ? interaction.followUp(interactionResponseBody) : interaction.reply(interactionResponseBody);
      }

      return;
    }

    if (interaction.isAutocomplete()) {
      const { commandName } = interaction;

      if (!isCommandName(commandName)) {
        Caelus.log(`Received an unknown chat input command interaction (\`${interaction.commandName}\`).`);
        return;
      }

      try {
        await commands[commandName].autocomplete(interaction);
      } catch (error) {
        Caelus.log(`Error autocompleting \`/${commandName}\`.`, error);
      }
    }
  }
};
