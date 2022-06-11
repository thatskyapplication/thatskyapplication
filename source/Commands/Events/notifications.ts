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

    await Notification.create(interaction, event, channel, role);
  }

  get commandData(): ApplicationCommandData {
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
              description: "The event to configure.",
              required: true,
              choices: [
                {
                  name: LightEvent.PollutedGeyser,
                  value: LightEvent.PollutedGeyser
                },
                {
                  name: LightEvent.Grandma,
                  value: LightEvent.Grandma
                },
                {
                  name: LightEvent.Turtle,
                  value: LightEvent.Turtle
                }
              ]
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
        }
      ],
      defaultMemberPermissions: PermissionFlagsBits.ManageGuild
    };
  }
}
