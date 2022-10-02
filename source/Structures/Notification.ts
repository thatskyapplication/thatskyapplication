import { channelMention, ChannelType, ChatInputCommandInteraction, Client, Collection, EmbedBuilder, NewsChannel, PermissionFlagsBits, Role, roleMention, TextChannel } from "discord.js";
import Base from "./Base.js";

interface NotificationData {
  No: number;
  "Guild ID": string;
  "Polluted Geyser Channel ID": string | null;
  "Polluted Geyser Role ID": string | null;
  "Grandma Channel ID": string | null;
  "Grandma Role ID": string | null;
  "Turtle Channel ID": string | null;
  "Turtle Role ID": string | null;
  "Shard Eruption Channel ID": string | null;
  "Shard Eruption Role ID": string | null;
}

export const LightEvent = {
  PollutedGeyser: "Polluted Geyser",
  Grandma: "Grandma",
  Turtle: "Turtle",
  ShardEruption: "Shard Eruption"
} as const;

export function isEvent(event: string): event is typeof LightEvent[keyof typeof LightEvent] {
  return Object.values(LightEvent).includes(event as typeof LightEvent[keyof typeof LightEvent]);
}

export default class Notification extends Base {
  static readonly cache = new Collection<number, Notification>();
  readonly No: NotificationData["No"];
  readonly guildId: NotificationData["Guild ID"];
  pollutedGeyserChannelId: NotificationData["Polluted Geyser Channel ID"];
  pollutedGeyserRoleId: NotificationData["Polluted Geyser Role ID"];
  grandmaChannelId: NotificationData["Grandma Channel ID"];
  grandmaRoleId: NotificationData["Grandma Role ID"];
  turtleChannelId: NotificationData["Turtle Channel ID"];
  turtleRoleId: NotificationData["Turtle Role ID"];
  shardEruptionChannelId: NotificationData["Shard Eruption Channel ID"];
  shardEruptionRoleId: NotificationData["Shard Eruption Role ID"];

  constructor(client: Client<true>, notification: NotificationData) {
    super(client);
    this.No = notification.No;
    this.guildId = notification["Guild ID"];
    this.pollutedGeyserChannelId = notification["Polluted Geyser Channel ID"];
    this.pollutedGeyserRoleId = notification["Polluted Geyser Role ID"];
    this.grandmaChannelId = notification["Grandma Channel ID"];
    this.grandmaRoleId = notification["Grandma Role ID"];
    this.turtleChannelId = notification["Turtle Channel ID"];
    this.turtleRoleId = notification["Turtle Role ID"];
    this.shardEruptionChannelId = notification["Shard Eruption Channel ID"];
    this.shardEruptionRoleId = notification["Shard Eruption Role ID"];
  }

  static async setup(interaction: ChatInputCommandInteraction<"cached">, event: typeof LightEvent[keyof typeof LightEvent], channel: NewsChannel | TextChannel, role: Role): Promise<void> {
    let notification = this.cache.find(({ guildId }) => guildId === interaction.guildId);

    if (notification) {
      await interaction.client.Maria.query(`UPDATE \`Notifications\` SET \`${event} Channel ID\` = ?, \`${event} Role ID\` = ? WHERE \`No\` = ?;`, [
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
          notification.turtleRoleId = role.id;
          break;
        case LightEvent.ShardEruption:
          notification.shardEruptionChannelId = channel.id;
          notification.shardEruptionRoleId = role.id;
          break;
      }
    } else {
      const { insertId } = await interaction.client.Maria.query(`INSERT INTO \`Notifications\` SET \`Guild ID\` = ?, \`${event} Channel ID\` = ?, \`${event} Role ID\` = ?;`, [
        interaction.guildId,
        channel.id,
        role.id
      ]);

      notification = new this(interaction.client, {
        No: insertId,
        "Guild ID": interaction.guildId,
        "Polluted Geyser Channel ID": event === LightEvent.PollutedGeyser ? channel.id : null,
        "Polluted Geyser Role ID": event === LightEvent.PollutedGeyser ? role.id : null,
        "Grandma Channel ID": event === LightEvent.Grandma ? channel.id : null,
        "Grandma Role ID": event === LightEvent.Grandma ? role.id : null,
        "Turtle Channel ID": event === LightEvent.Turtle ? channel.id : null,
        "Turtle Role ID": event === LightEvent.Turtle ? role.id : null,
        "Shard Eruption Channel ID": event === LightEvent.ShardEruption ? channel.id : null,
        "Shard Eruption Role ID": event === LightEvent.ShardEruption ? role.id : null
      });

      this.cache.set(notification.No, notification);
    }

    await interaction.reply({
      allowedMentions: { parse: [] },
      content: `${event} notifications have been set up in ${channel}. The ${role} role will be mentioned.`,
      embeds: [await notification.overview()]
    });
  }

  async unset(interaction: ChatInputCommandInteraction<"cached">, event: typeof LightEvent[keyof typeof LightEvent]): Promise<void> {
    await interaction.client.Maria.query(`UPDATE \`Notifications\` SET \`${event} Channel ID\` = ?, \`${event} Role ID\` = ? WHERE \`No\` = ?;`, [
      null,
      null,
      this.No
    ]);

    switch (event) {
      case LightEvent.PollutedGeyser:
        this.pollutedGeyserChannelId = null;
        this.pollutedGeyserRoleId = null;
        break;
      case LightEvent.Grandma:
        this.grandmaChannelId = null;
        this.grandmaRoleId = null;
        break;
      case LightEvent.Turtle:
        this.turtleChannelId = null;
        this.turtleRoleId = null;
        break;
      case LightEvent.ShardEruption:
        this.shardEruptionChannelId = null;
        this.shardEruptionRoleId = null;
        break;
    }

    await interaction.reply({
      content: `${event} notifications have been unset.`,
      embeds: [await this.overview()]
    });
  }

  async send(type: typeof LightEvent[keyof typeof LightEvent]): Promise<void> {
    const { guildId, pollutedGeyserChannelId, pollutedGeyserRoleId, grandmaChannelId, grandmaRoleId, turtleChannelId, turtleRoleId, shardEruptionChannelId, shardEruptionRoleId } = this;
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
      case LightEvent.ShardEruption:
        channelId = shardEruptionChannelId;
        roleId = shardEruptionRoleId;
        break;
    }

    if (!channelId || !roleId) return;
    const channel = this.client.guilds.resolve(guildId)?.channels.resolve(channelId);
    if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildNews)) return;
    const role = channel.guild.roles.resolve(roleId);
    if (!role) return;
    const me = await channel.guild.members.fetchMe();
    if (!channel.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) || (!role.mentionable && !channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))) return;
    await channel.send(`${role} is starting soon!`).catch(() => null);
  }

  async overview(): Promise<EmbedBuilder> {
    const { guildId, pollutedGeyserChannelId, pollutedGeyserRoleId, grandmaChannelId, grandmaRoleId, turtleChannelId, turtleRoleId, shardEruptionChannelId, shardEruptionRoleId } = this;
    const guild = this.client.guilds.resolve(guildId);
    const me = await guild?.members.fetchMe();
    const pollutedGeyserChannel = pollutedGeyserChannelId ? guild?.channels.resolve(pollutedGeyserChannelId) : null;
    const pollutedGeyserRole = pollutedGeyserRoleId ? guild?.roles.resolve(pollutedGeyserRoleId) : null;
    const grandmaChannel = grandmaChannelId ? guild?.channels.resolve(grandmaChannelId) : null;
    const grandmaRole = grandmaRoleId ? guild?.roles.resolve(grandmaRoleId) : null;
    const turtleChannel = turtleChannelId ? guild?.channels.resolve(turtleChannelId) : null;
    const turtleRole = turtleRoleId ? guild?.roles.resolve(turtleRoleId) : null;
    const shardEruptionChannel = shardEruptionChannelId ? guild?.channels.resolve(shardEruptionChannelId) : null;
    const shardEruptionRole = shardEruptionRoleId ? guild?.roles.resolve(shardEruptionRoleId) : null;
    const embed = new EmbedBuilder();
    embed.setColor(me?.displayColor ?? 0);

    embed.setFields([
      {
        name: LightEvent.PollutedGeyser,
        value: `${pollutedGeyserChannelId ? channelMention(pollutedGeyserChannelId) : "No channel"}\n${pollutedGeyserRoleId ? roleMention(pollutedGeyserRoleId) : "No role"}\n${me && (pollutedGeyserChannel?.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) || (pollutedGeyserRole?.mentionable && pollutedGeyserChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))) ? "✅ Sending!" : "⚠️ Stopped!"}`,
        inline: true
      },
      {
        name: LightEvent.Grandma,
        value: `${grandmaChannelId ? channelMention(grandmaChannelId) : "No channel"}\n${grandmaRoleId ? roleMention(grandmaRoleId) : "No role"}\n${me && (grandmaChannel?.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) || (grandmaRole?.mentionable && grandmaChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))) ? "✅ Sending!" : "⚠️ Stopped!"}`,
        inline: true
      },
      {
        name: LightEvent.Turtle,
        value: `${turtleChannelId ? channelMention(turtleChannelId) : "No channel"}\n${turtleRoleId ? roleMention(turtleRoleId) : "No role"}\n${me && (turtleChannel?.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) || (turtleRole?.mentionable && turtleChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))) ? "✅ Sending!" : "⚠️ Stopped!"}`,
        inline: true
      },
      {
        name: LightEvent.ShardEruption,
        value: `${shardEruptionChannelId ? channelMention(shardEruptionChannelId) : "No channel"}\n${shardEruptionRoleId ? roleMention(shardEruptionRoleId) : "No role"}\n${me && (shardEruptionChannel?.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) || (shardEruptionRole?.mentionable && shardEruptionChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))) ? "✅ Sending!" : "⚠️ Stopped!"}`,
        inline: true
      }
    ]);

    embed.setTitle(guild?.name ?? guildId);
    return embed;
  }
}
