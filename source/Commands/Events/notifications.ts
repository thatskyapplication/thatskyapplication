import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction, NewsChannel, PermissionFlagsBits, TextChannel } from "discord.js";
import Caelus from "../../Client/Client.js";
import Notification, { isEvent, LightEvent } from "../../Client/Notification.js";
import type { Command } from "../index.js";

export default class implements Command {
  readonly name = "notifications";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    switch (interaction.options.getSubcommand()) {
      case "setup":
        return await this.setup(interaction);
      case "unset":
        return await this.unset(interaction);
    }
  }

  async setup(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const { options } = interaction;
    const event = options.getString("event", true);
    const channel = options.getChannel("channel", true) as TextChannel | NewsChannel; // From restrictions placed in the command.
    const role = options.getRole("role", true);
    const me = await channel.guild.members.fetch(Caelus.user.id);

    if (!isEvent(event)) {
      Caelus.log(`Received an unknown notification event: ${event} whilst setting up notifications.`);

      await interaction.reply({
        content: "The dark dragon has obeliterated this event. It's gone... for now.",
        ephemeral: true
      });

      return;
    }

    const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

    if (notification && ((event === LightEvent.PollutedGeyser && notification.pollutedGeyserChannelId === channel.id && notification.pollutedGeyserRoleId === role.id) || (event === LightEvent.Grandma && notification.grandmaChannelId === channel.id && notification.grandmaRoleId === role.id) || (event === LightEvent.Turtle && notification.turtleChannelId === channel.id && notification.turtleRoleId === role.id))) {
      await interaction.reply({
        allowedMentions: { parse: [] },
        content: `${event} notifications are already set to mention the role ${role} in ${channel}. There was nothing to do.`,
        ephemeral: true
      });

      return;
    }

    if (!channel.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) {
      await interaction.reply({
        content: `\`View Channel\` & \`Send Messages\` are required for ${channel}.`,
        ephemeral: true
      });

      return;
    }

    if (!role.mentionable && !channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone)) {
      await interaction.reply({
        content: `Cannot mention the ${role} role.`,
        ephemeral: true
      });

      return;
    }

    await Notification.setup(interaction, event, channel, role);
  }

  async unset(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

    if (!notification) {
      await interaction.reply({
        content: "This server has nothing set up.",
        ephemeral: true
      });

      return;
    }

    const { options } = interaction;
    const event = options.getString("event", true);

    if (!isEvent(event)) {
      Caelus.log(`Received an unknown notification event: ${event} whilst setting up notifications.`);

      await interaction.reply({
        content: "The dark dragon has obeliterated this event. It's gone... for now.",
        ephemeral: true
      });

      return;
    }

    if ((event === LightEvent.PollutedGeyser && notification.pollutedGeyserChannelId === null && notification.pollutedGeyserRoleId === null) || (event === LightEvent.Grandma && notification.grandmaChannelId === null && notification.grandmaRoleId === null) || (event === LightEvent.Turtle && notification.turtleChannelId === null && notification.turtleRoleId === null)) {
      await interaction.reply({
        content: `${event} notifications are not already set. There was nothing to do.`,
        ephemeral: true
      });

      return;
    }

    await notification.unset(interaction, event);
  }

  get commandData(): ApplicationCommandData {
    const choices = Object.values(LightEvent).map(lightEvent => ({
      name: lightEvent,
      value: lightEvent
    }));

    return {
      name: this.name,
      description: "The command to set up notifications for events.",
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "setup",
          description: "Sets up notifications in the server.",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "event",
              description: "The event to set.",
              required: true,
              choices
            },
            {
              type: ApplicationCommandOptionType.Channel,
              name: "channel",
              description: "The channel to send notifications in.",
              required: true,
              channelTypes: [
                ChannelType.GuildText,
                ChannelType.GuildNews
              ]
            },
            {
              type: ApplicationCommandOptionType.Role,
              name: "role",
              description: "The role to mention.",
              required: true
            }
          ]
        },
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: "unset",
          description: "Unsets a notification in the server.",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "event",
              description: "The event to unset.",
              required: true,
              choices
            }
          ]
        }
      ],
      defaultMemberPermissions: PermissionFlagsBits.ManageGuild
    };
  }
}
