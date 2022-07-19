import { ActionRowBuilder, ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, CacheType, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, UserContextMenuCommandInteraction } from "discord.js";
import Profile from "../../Client/Profile.js";
import type { Command } from "../index.js";

export const SKY_PROFILE_MODAL = "SKY_PROFILE_MODAL";
export const SKY_PROFILE_TEXT_INPUT_DESCRIPTION = "SKY_PROFILE_DESCRIPTION";
const SKY_MAXIMUM_NAME_LENGTH = 16;
const SKY_MINIMUM_IMAGE_URL_LENGTH = 9;
const SKY_MAXIMUM_IMAGE_URL_LENGTH = 150;

export default class implements Command {
  readonly name = "sky-profile";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    switch (interaction.options.getSubcommand()) {
      case "set-description":
        return await this.setDescription(interaction);
      case "set-icon":
        return await this.setIcon(interaction);
      case "set-name":
        return await this.setName(interaction);
      case "set-thumbnail":
        return await this.setThumbnail(interaction);
      case "show":
        return await this.show(interaction);
    }
  }

  async setDescription(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.options.getBoolean("description", true)) {
      return void await interaction.reply({
        content: "Oh, you don't want to set a description now? That's fine. Maybe later!",
        ephemeral: true
      });
    }

    const profile = Profile.cache.find(({ userId }) => interaction.user.id === userId);
    const modal = new ModalBuilder();
    const actionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>();
    const textInput = new TextInputBuilder();
    modal.setCustomId(SKY_PROFILE_MODAL);
    modal.setTitle("Set your Sky profile description!");
    textInput.setCustomId(SKY_PROFILE_TEXT_INPUT_DESCRIPTION);
    textInput.setLabel("Type a lovely description about your Skykid.");
    textInput.setMaxLength(4000);
    textInput.setStyle(TextInputStyle.Paragraph);
    if (profile?.description) textInput.setValue(profile.description);
    actionRow.setComponents(textInput);
    modal.setComponents(actionRow);
    await interaction.showModal(modal);
  }

  async setIcon(interaction: ChatInputCommandInteraction): Promise<void> {
    const icon = interaction.options.getString("icon", true);
    if (!icon.startsWith("https://")) return void await interaction.reply({ content: "Please use a valid URL!", ephemeral: true });
    await Profile.set(interaction, { icon });
  }

  async setName(interaction: ChatInputCommandInteraction): Promise<void> {
    const name = interaction.options.getString("name", true);
    await Profile.set(interaction, { name });
  }

  async setThumbnail(interaction: ChatInputCommandInteraction): Promise<void> {
    const thumbnail = interaction.options.getString("thumbnail", true);
    if (!thumbnail.startsWith("https://")) return void await interaction.reply({ content: "Please use a valid URL!", ephemeral: true });
    await Profile.set(interaction, { thumbnail });
  }

  async show(interaction: ChatInputCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType>): Promise<void> {
    const user = interaction.options.getUser("user");
    const ephemeral = interaction.isChatInputCommand() ? interaction.options.getBoolean("ephemeral") ?? false : true;
    if (user?.bot) return void await interaction.reply({ content: "Do bots have Sky profiles? Hm. Who knows?", ephemeral });
    const profile = Profile.cache.find(({ userId }) => (user?.id ?? interaction.user.id) === userId);

    if (!profile) {
      return void await interaction.reply({
        content: `${user === null ? "You do" : `${user} does`} not have a Sky profile! Why not ${user === null ? "" : "ask them to"} create one?`,
        ephemeral: true
      });
    }

    await interaction.reply({ embeds: [await profile.show(interaction.guild)], ephemeral });
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      description: "The command related to everything about your Sky profile.",
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "set-description",
          description: "Set the description of your Sky profile!",
          options: [
            {
              type: ApplicationCommandOptionType.Boolean,
              name: "description",
              description: "Choose whether to set the description of your Sky profile.",
              required: true
            }
          ]
        },
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "set-name",
          description: "Set the name of your Skykid in your Sky profile!",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "name",
              description: "Provide your in-game name.",
              required: true,
              maxLength: SKY_MAXIMUM_NAME_LENGTH
            }
          ]
        },
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "set-icon",
          description: "Set the icon of your Skykid in your Sky profile!",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "icon",
              description: "Provide a URL to show as your author icon.",
              required: true,
              minLength: SKY_MINIMUM_IMAGE_URL_LENGTH,
              maxLength: SKY_MAXIMUM_IMAGE_URL_LENGTH
            }
          ]
        },
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "set-thumbnail",
          description: "Set the thumbnail of your Skykid in your Sky profile!",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "thumbnail",
              description: "Provide a URL to show as your thumbnail.",
              required: true,
              minLength: SKY_MINIMUM_IMAGE_URL_LENGTH,
              maxLength: SKY_MAXIMUM_IMAGE_URL_LENGTH
            }
          ]
        },
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "show",
          description: "Shows the Sky profile of someone.",
          options: [
            {
              type: ApplicationCommandOptionType.User,
              name: "user",
              description: "The user whose Sky profile you wish to see."
            },
            {
              type: ApplicationCommandOptionType.Boolean,
              name: "ephemeral",
              description: "Whether the response should be ephemeral. By default, the response is shown."
            }
          ]
        }
      ]
    };
  }
}
