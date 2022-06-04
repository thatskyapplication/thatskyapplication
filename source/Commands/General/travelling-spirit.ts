import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import type { Command } from "../index.js";

export default class implements Command {
  readonly name = "travelling-spirit";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction<"cached"> | UserContextMenuCommandInteraction<"cached">): Promise<void> {
    if (!(interaction instanceof ChatInputCommandInteraction)) throw new Error(`/${this.name} command called, but did not receive a command interaction.`);
    return await this.execute(interaction);
  }

  async execute(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    await interaction.reply({ content: "Success!", ephemeral: true });
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      description: "Returns the friendship tree of a Travelling Spirit.",
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "name",
          description: "The name of the Travelling Spirit.",
          required: true,
          choices: [
            {
              name: "Sassy Drifter",
              value: "Sassy Drifter"
            }
          ]
        }
      ]
    };
  }
}
