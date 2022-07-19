import { ActionRowBuilder, ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { Command } from "../index.js";

const SKY_PROFILE_MODAL_CUSTOM_ID = "SKY_PROFILE_MODAL";
const SKY_PROFILE_TEXT_INPUT_CUSTOM_ID = "SKY_PROFILE_DESCRIPTION";

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
    const modal = new ModalBuilder();
    const actionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>();
    const textInput = new TextInputBuilder();
    modal.setCustomId(SKY_PROFILE_MODAL_CUSTOM_ID);
    modal.setTitle("Set your Sky profile description!");
    textInput.setCustomId(SKY_PROFILE_TEXT_INPUT_CUSTOM_ID);
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
