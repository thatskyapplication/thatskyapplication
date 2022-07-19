import { ActionRowBuilder, ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { Command } from "../index.js";

export const SKY_PROFILE_MODAL = "SKY_PROFILE_MODAL";
export const SKY_PROFILE_TEXT_INPUT_DESCRIPTION = "SKY_PROFILE_DESCRIPTION";

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
    if (!interaction.options.getBoolean("description", true)) {
      await interaction.reply({
        content: "Oh, you don't want to set a description now? That's fine. Maybe later!",
        ephemeral: true
      });

      return;
    }

    const modal = new ModalBuilder();
    const actionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>();
    const textInput = new TextInputBuilder();
    modal.setCustomId(SKY_PROFILE_MODAL);
    modal.setTitle("Set your Sky profile description!");
    textInput.setCustomId(SKY_PROFILE_TEXT_INPUT_DESCRIPTION);
    textInput.setLabel("Type a lovely description about your Skykid.");
    textInput.setMaxLength(4000);
    textInput.setRequired();
    textInput.setStyle(TextInputStyle.Paragraph);
    actionRow.setComponents(textInput);
    modal.setComponents(actionRow);
    await interaction.showModal(modal);
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
              type: ApplicationCommandOptionType.Boolean,
              name: "description",
              description: "Sets the description of your profile.",
              required: true
            }
          ]
        }
      ]
    };
  }
}
