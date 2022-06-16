import { ChannelType, ChatInputCommandInteraction, Collection, Formatters, NewsChannel, Role, TextChannel } from "discord.js";
import Caelus, { Maria } from "../Client/Client.js";

interface NotificationData {
  No: number;
  "Guild ID": string;
  "Polluted Geyser Channel ID": string | null;
  "Polluted Geyser Role ID": string | null;
  "Grandma Channel ID": string | null;
  "Grandma Role ID": string | null;
  "Turtle Channel ID": string | null;
  "Turtle Role ID": string | null;
}

export const LightEvent = {
  PollutedGeyser: "Polluted Geyser",
  Grandma: "Grandma",
  Turtle: "Turtle"
} as const;

export function isEvent(event: string): event is typeof LightEvent[keyof typeof LightEvent] {
  return Object.values(LightEvent).includes(event as typeof LightEvent[keyof typeof LightEvent]);
}

export default class Notification {
  static readonly cache = new Collection<number, Notification>();
  readonly No: NotificationData["No"];
  readonly guildId: NotificationData["Guild ID"];
  pollutedGeyserChannelId: NotificationData["Polluted Geyser Channel ID"];
  pollutedGeyserRoleId: NotificationData["Polluted Geyser Role ID"];
  grandmaChannelId: NotificationData["Grandma Channel ID"];
  grandmaRoleId: NotificationData["Grandma Role ID"];
  turtleChannelId: NotificationData["Turtle Channel ID"];
  turtleRoleId: NotificationData["Turtle Role ID"];

  constructor(notification: NotificationData) {
    this.No = notification.No;
    this.guildId = notification["Guild ID"];
    this.pollutedGeyserChannelId = notification["Polluted Geyser Channel ID"];
    this.pollutedGeyserRoleId = notification["Polluted Geyser Role ID"];
    this.grandmaChannelId = notification["Grandma Channel ID"];
    this.grandmaRoleId = notification["Grandma Role ID"];
    this.turtleChannelId = notification["Turtle Channel ID"];
    this.turtleRoleId = notification["Turtle Role ID"];
  }

  static async setup(interaction: ChatInputCommandInteraction<"cached">, event: typeof LightEvent[keyof typeof LightEvent], channel: NewsChannel | TextChannel, role: Role): Promise<void> {
    const notification = this.cache.find(({ guildId }) => guildId === interaction.guildId);

    if (notification) {
      await Maria.query(`UPDATE \`Notifications\` SET \`${event} Channel ID\` = ?, \`${event} Role ID\` = ? WHERE \`No\` = ?;`, [
        channel.id,
        role.id,
        notification.No
      ]);

      switch (event) {
        case LightEvent.PollutedGeyser:
          notification.pollutedGeyserChannelId = channel.id;
          notification.pollutedGeyserRoleId = role.id;
          break;
        case LightEvent.Grandma:
          notification.grandmaChannelId = channel.id;
          notification.grandmaRoleId = role.id;
          break;
        case LightEvent.Turtle:
          notification.turtleChannelId = channel.id;
          notification.turtleRoleId = channel.id;
          break;
      }
    } else {
      const { insertId } = await Maria.query(`INSERT INTO \`Notifications\` SET \`Guild ID\` = ?, \`${event} Channel ID\` = ?, \`${event} Role ID\` = ?;`, [
        interaction.guildId,
        channel.id,
        role.id
      ]);

      const newNotification = new this({
        No: insertId,
        "Guild ID": interaction.guildId,
        "Polluted Geyser Channel ID": event === LightEvent.PollutedGeyser ? channel.id : null,
        "Polluted Geyser Role ID": event === LightEvent.PollutedGeyser ? role.id : null,
        "Grandma Channel ID": event === LightEvent.Grandma ? channel.id : null,
        "Grandma Role ID": event === LightEvent.Grandma ? role.id : null,
        "Turtle Channel ID": event === LightEvent.Turtle ? channel.id : null,
        "Turtle Role ID": event === LightEvent.Turtle ? role.id : null
      });

      this.cache.set(newNotification.No, newNotification);
    }

    await interaction.reply({
      allowedMentions: { parse: [] },
      content: `${event} notifications have been set up in ${channel}. The ${role} role will be mentioned.`
    });
  }

  async unset(interaction: ChatInputCommandInteraction<"cached">, event: typeof LightEvent[keyof typeof LightEvent]): Promise<void> {
    await Maria.query(`UPDATE \`Notifications\` SET \`${event} Channel ID\` = ?, \`${event} Role ID\` = ? WHERE \`No\` = ?;`, [
      null,
      null,
      this.No
    ]);

    await interaction.reply(`${event} notifications have been unset.`);
  }

  static async send(type: typeof LightEvent[keyof typeof LightEvent]): Promise<void> {
    for (const { pollutedGeyserChannelId, pollutedGeyserRoleId, grandmaChannelId, grandmaRoleId, turtleChannelId, turtleRoleId } of this.cache.values()) {
      let channelId;
      let roleId;

      switch (type) {
        case LightEvent.PollutedGeyser:
          channelId = pollutedGeyserChannelId;
          roleId = pollutedGeyserRoleId;
          break;
        case LightEvent.Grandma:
          channelId = grandmaChannelId;
          roleId = grandmaRoleId;
          break;
        case LightEvent.Turtle:
          channelId = turtleChannelId;
          roleId = turtleRoleId;
          break;
      }

      if (!roleId || !channelId) continue;
      const channel = Caelus.channels.resolve(channelId);
      if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildNews)) continue;
      await channel.send(`${Formatters.roleMention(roleId)} is starting soon!`).catch(() => null);
    }
  }
}
