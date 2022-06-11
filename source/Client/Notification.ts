import { ChannelType, ChatInputCommandInteraction, Collection, Formatters, NewsChannel, Role, TextChannel } from "discord.js";
import Caelus, { Maria } from "../Client/Client.js";

interface NotificationData {
  No: number;
  "Guild ID": string;
  "Channel ID": string;
  "Polluted Geyser": string | null;
  Grandma: string | null;
  Turtle: string | null;
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
  readonly channelId: NotificationData["Channel ID"];
  readonly pollutedGeyser: NotificationData["Polluted Geyser"];
  readonly grandma: NotificationData["Grandma"];
  readonly turtle: NotificationData["Turtle"];

  constructor(notification: NotificationData) {
    this.No = notification.No;
    this.guildId = notification["Guild ID"];
    this.channelId = notification["Channel ID"];
    this.pollutedGeyser = notification["Polluted Geyser"];
    this.grandma = notification.Grandma;
    this.turtle = notification.Turtle;
  }

  static async create(interaction: ChatInputCommandInteraction<"cached">, event: typeof LightEvent[keyof typeof LightEvent], channel: NewsChannel | TextChannel, role: Role): Promise<void> {
    const notification = this.cache.find(({ guildId }) => guildId === interaction.guildId);

    if (notification) {
      await Maria.query(`UPDATE \`Notifications\` SET \`Channel ID\` = ?, \`${event}\` = ? WHERE \`No\` = ?;`, [
        channel.id,
        role.id,
        notification.No
      ]);
    } else {
      const { insertId } = await Maria.query(`INSERT INTO \`Notifications\` SET \`Guild ID\` = ?, \`Channel ID\` = ?, \`${event}\` = ?;`, [
        interaction.guildId,
        channel.id,
        role.id
      ]);

      const newNotification = new this({
        No: insertId,
        "Guild ID": interaction.guildId,
        "Channel ID": channel.id,
        [event]: role.id,
        "Polluted Geyser": event === LightEvent.PollutedGeyser ? role.id : null,
        "Grandma": event === LightEvent.Grandma ? role.id : null,
        "Turtle": event === LightEvent.Turtle ? role.id : null
      });

      this.cache.set(newNotification.No, newNotification);
    }

    await interaction.reply({
      allowedMentions: { parse: [] },
      content: `${event} notifications have been set up in ${channel}. The ${role} role will be mentioned.`
    });
  }

  static async send(type: typeof LightEvent[keyof typeof LightEvent]): Promise<void> {
    for (const { channelId, pollutedGeyser, grandma, turtle } of this.cache.values()) {
      const channel = Caelus.channels.resolve(channelId);
      if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildNews)) continue;
      let roleId;

      switch (type) {
        case LightEvent.PollutedGeyser:
          roleId = pollutedGeyser;
          break;
        case LightEvent.Grandma:
          roleId = grandma;
          break;
        case LightEvent.Turtle:
          roleId = turtle;
          break;
      }

      if (!roleId) continue;
      await channel.send(`${Formatters.roleMention(roleId)} is starting soon!`).catch(() => null);
    }
  }
}
