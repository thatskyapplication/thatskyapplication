import type { ChatInputCommandInteraction, Client, Guild, Snowflake } from "discord.js";
import { channelMention, ChannelType, Collection, EmbedBuilder, PermissionFlagsBits, roleMention } from "discord.js";
import pg, { Table } from "../pg.js";

export interface NotificationPacket {
	id: number;
	guild_id: Snowflake;
	polluted_geyser_channel_id: Snowflake | null;
	polluted_geyser_role_id: Snowflake | null;
	grandma_channel_id: Snowflake | null;
	grandma_role_id: Snowflake | null;
	turtle_channel_id: Snowflake | null;
	turtle_role_id: Snowflake | null;
}

interface NotificationData {
	id: NotificationPacket["id"];
	guildId: NotificationPacket["guild_id"];
	pollutedGeyserChannelId: NotificationPacket["polluted_geyser_channel_id"];
	pollutedGeyserRoleId: NotificationPacket["polluted_geyser_role_id"];
	grandmaChannelId: NotificationPacket["grandma_channel_id"];
	grandmaRoleId: NotificationPacket["grandma_role_id"];
	turtleChannelId: NotificationPacket["turtle_channel_id"];
	turtleRoleId: NotificationPacket["turtle_role_id"];
}

type NotificationPatchData = Omit<NotificationPacket, "id" | "guild_id">;
export type NotificationInsertQuery = Partial<NotificationPatchData> & Pick<NotificationPacket, "guild_id">;
export type NotificationUpdateQuery = Omit<NotificationInsertQuery, "guild_id">;

export enum NotificationEvent {
	PollutedGeyser = "Polluted Geyser",
	Grandma = "Grandma",
	Turtle = "Turtle",
}

export function isEvent(event: string): event is NotificationEvent {
	return Object.values(NotificationEvent).includes(event as NotificationEvent);
}

export default class Notification {
	public static readonly cache = new Collection<number, Notification>();

	public readonly id: NotificationData["id"];

	public readonly guildId: NotificationData["guildId"];

	public pollutedGeyserChannelId!: NotificationData["pollutedGeyserChannelId"];

	public pollutedGeyserRoleId!: NotificationData["pollutedGeyserRoleId"];

	public grandmaChannelId!: NotificationData["grandmaChannelId"];

	public grandmaRoleId!: NotificationData["grandmaRoleId"];

	public turtleChannelId!: NotificationData["turtleChannelId"];

	public turtleRoleId!: NotificationData["turtleRoleId"];

	public constructor(notification: NotificationPacket) {
		this.id = notification.id;
		this.guildId = notification.guild_id;
		this.patch(notification);
	}

	private patch(data: NotificationPatchData) {
		this.pollutedGeyserChannelId = data.polluted_geyser_channel_id;
		this.pollutedGeyserRoleId = data.polluted_geyser_role_id;
		this.grandmaChannelId = data.grandma_channel_id;
		this.grandmaRoleId = data.grandma_role_id;
		this.turtleChannelId = data.turtle_channel_id;
		this.turtleRoleId = data.turtle_role_id;
	}

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached">,
		data: NotificationInsertQuery | NotificationUpdateQuery,
	) {
		const { guild, guildId } = interaction;
		let notification = this.cache.find((cachedNotification) => cachedNotification.guildId === guildId);

		if (notification) {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications)
				.update(data)
				.where("id", notification.id)
				.returning("*");

			notification.patch(notificationPacket);
		} else {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications).insert(data, "*");
			notification = new this(notificationPacket);
			this.cache.set(notification.id, notification);
		}

		await interaction.reply({
			content: "Notifications have been modified.",
			embeds: [await notification.overview(guild)],
		});
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">, data: NotificationUpdateQuery) {
		const { guild, guildId } = interaction;

		const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications)
			.update(data)
			.where("guild_id", guildId)
			.returning("*");

		this.patch(notificationPacket);
		await interaction.reply({ content: "Notifications have been modified.", embeds: [await this.overview(guild)] });
	}

	public async send(client: Client<true>, type: NotificationEvent) {
		const {
			guildId,
			pollutedGeyserChannelId,
			pollutedGeyserRoleId,
			grandmaChannelId,
			grandmaRoleId,
			turtleChannelId,
			turtleRoleId,
		} = this;
		let channelId;
		let roleId;

		switch (type) {
			case NotificationEvent.PollutedGeyser:
				channelId = pollutedGeyserChannelId;
				roleId = pollutedGeyserRoleId;
				break;
			case NotificationEvent.Grandma:
				channelId = grandmaChannelId;
				roleId = grandmaRoleId;
				break;
			case NotificationEvent.Turtle:
				channelId = turtleChannelId;
				roleId = turtleRoleId;
				break;
		}

		if (!channelId || !roleId) return;
		const channel = client.guilds.resolve(guildId)?.channels.resolve(channelId);
		if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement)) return;
		const role = channel.guild.roles.resolve(roleId);
		if (!role) return;
		const me = await channel.guild.members.fetchMe();

		if (
			!channel.permissionsFor(me).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) ||
			(!role.mentionable && !channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))
		)
			return;

		await channel.send(`${role} is starting soon!`).catch(() => null);
	}

	public async overview(guild: Guild) {
		const me = await guild.members.fetchMe();
		const {
			pollutedGeyserChannelId,
			pollutedGeyserRoleId,
			grandmaChannelId,
			grandmaRoleId,
			turtleChannelId,
			turtleRoleId,
		} = this;
		const pollutedGeyserChannel = pollutedGeyserChannelId ? guild?.channels.resolve(pollutedGeyserChannelId) : null;
		const pollutedGeyserRole = pollutedGeyserRoleId ? guild?.roles.resolve(pollutedGeyserRoleId) : null;
		const grandmaChannel = grandmaChannelId ? guild?.channels.resolve(grandmaChannelId) : null;
		const grandmaRole = grandmaRoleId ? guild?.roles.resolve(grandmaRoleId) : null;
		const turtleChannel = turtleChannelId ? guild?.channels.resolve(turtleChannelId) : null;
		const turtleRole = turtleRoleId ? guild?.roles.resolve(turtleRoleId) : null;

		return new EmbedBuilder()
			.setColor(me.displayColor)
			.setFields(
				{
					name: NotificationEvent.PollutedGeyser,
					value: `${pollutedGeyserChannelId ? channelMention(pollutedGeyserChannelId) : "No channel"}\n${
						pollutedGeyserRoleId ? roleMention(pollutedGeyserRoleId) : "No role"
					}\n${
						me &&
						(pollutedGeyserChannel
							?.permissionsFor(me)
							.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) ||
							(pollutedGeyserRole?.mentionable &&
								pollutedGeyserChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone)))
							? "✅ Sending!"
							: "⚠️ Stopped!"
					}`,
					inline: true,
				},
				{
					name: NotificationEvent.Grandma,
					value: `${grandmaChannelId ? channelMention(grandmaChannelId) : "No channel"}\n${
						grandmaRoleId ? roleMention(grandmaRoleId) : "No role"
					}\n${
						me &&
						(grandmaChannel
							?.permissionsFor(me)
							.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) ||
							(grandmaRole?.mentionable && grandmaChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone)))
							? "✅ Sending!"
							: "⚠️ Stopped!"
					}`,
					inline: true,
				},
				{
					name: NotificationEvent.Turtle,
					value: `${turtleChannelId ? channelMention(turtleChannelId) : "No channel"}\n${
						turtleRoleId ? roleMention(turtleRoleId) : "No role"
					}\n${
						me &&
						(turtleChannel
							?.permissionsFor(me)
							.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]) ||
							(turtleRole?.mentionable && turtleChannel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone)))
							? "✅ Sending!"
							: "⚠️ Stopped!"
					}`,
					inline: true,
				},
			)
			.setTitle(guild.name);
	}
}
