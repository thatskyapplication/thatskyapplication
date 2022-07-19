import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import type { Command } from "../index.js";

export default class implements Command {
  readonly name = "sky-profile";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    switch (interaction.options.getSubcommand()) {
      case "set":
        return await this.set(interaction);
    }
  }

  async set(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply("Woaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhh.");
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      description: "The command related to everything about your Sky profile.",
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "set",
          description: "Set your Sky profile!",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "description",
              description: "Sets the description of your profile."
            }
          ]
        }
      ]
    };
  }
}
