import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction, NewsChannel, PermissionFlagsBits, TextChannel } from "discord.js";
import Notification, { isEvent, LightEvent } from "../../Structures/Notification.js";
import type { Command } from "../index.js";

export default class implements Command {
  readonly name = "notifications";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.inCachedGuild()) {
      interaction.client.log(`The \`/${this.name}\` command was used in an uncached guild, somehow.`, interaction);

      return void await interaction.reply({
        content: `There is no \`/${this.name}\` command in Ba Sing Se.`,
        ephemeral: true
      });
    }

    switch (interaction.options.getSubcommand()) {
      case "overview":
        return await this.overview(interaction);
      case "setup":
        return await this.setup(interaction);
      case "unset":
        return await this.unset(interaction);
    }
  }

  async overview(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

    if (!notification) {
      return void await interaction.reply({
        content: "This server has nothing set up.",
        ephemeral: true
      });
    }

    await interaction.reply({ embeds: [await notification.overview()], ephemeral: true });
  }

  async setup(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const { options } = interaction;
    const event = options.getString("event", true);
    const channel = options.getChannel("channel", true) as TextChannel | NewsChannel; // From restrictions placed in the command.
    const role = options.getRole("role", true);
    const me = await channel.guild.members.fetchMe();

    if (!isEvent(event)) {
      interaction.client.log(`Received an unknown notification event: ${event} whilst setting up notifications.`);

      return void await interaction.reply({
        content: "The dark dragon has obeliterated this event. It's gone... for now.",
        ephemeral: true
      });
    }

    const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

    if (notification && ((event === LightEvent.PollutedGeyser && notification.pollutedGeyserChannelId === channel.id && notification.pollutedGeyserRoleId === role.id) || (event === LightEvent.Grandma && notification.grandmaChannelId === channel.id && notification.grandmaRoleId === role.id) || (event === LightEvent.Turtle && notification.turtleChannelId === channel.id && notification.turtleRoleId === role.id) || (event === LightEvent.ShardEruption && notification.shardEruptionChannelId === channel.id && notification.shardEruptionRoleId === role.id))) {
      return void await interaction.reply({
        content: `${event} notifications are already set to mention the role ${role} in ${channel}. There was nothing to do.`,
        ephemeral: true
      });
    }

    if (!channel.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) {
      return void await interaction.reply({
        content: `\`View Channel\` & \`Send Messages\` are required for ${channel}.`,
        ephemeral: true
      });
    }

    if (!role.mentionable && !channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone)) {
      return void await interaction.reply({
        content: `Cannot mention the ${role} role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for ${interaction.client.user} in the channel or make the role mentionable.`,
        ephemeral: true
      });
    }

    await Notification.setup(interaction, event, channel, role);
  }

  async unset(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const notification = Notification.cache.find(({ guildId }) => interaction.guildId === guildId);

    if (!notification) {
      return void await interaction.reply({
        content: "This server has nothing set up.",
        ephemeral: true
      });
    }

    const { options } = interaction;
    const event = options.getString("event", true);

    if (!isEvent(event)) {
      interaction.client.log(`Received an unknown notification event: ${event} whilst setting up notifications.`);

      return void await interaction.reply({
        content: "The dark dragon has obeliterated this event. It's gone... for now.",
        ephemeral: true
      });
    }

    if ((event === LightEvent.PollutedGeyser && notification.pollutedGeyserChannelId === null && notification.pollutedGeyserRoleId === null) || (event === LightEvent.Grandma && notification.grandmaChannelId === null && notification.grandmaRoleId === null) || (event === LightEvent.Turtle && notification.turtleChannelId === null && notification.turtleRoleId === null) || (event === LightEvent.ShardEruption && notification.shardEruptionChannelId === null && notification.shardEruptionRoleId === null)) {
      return void await interaction.reply({
        content: `${event} notifications are not already set. There was nothing to do.`,
        ephemeral: true
      });
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
          name: "overview",
          description: "Shows the notifications in this server."
        },
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
      defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
      dmPermission: false
    };
  }
}
