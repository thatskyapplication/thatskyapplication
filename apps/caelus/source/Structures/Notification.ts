import {
	type ChatInputCommandInteraction,
	type Client,
	type Guild,
	type GuildMember,
	type Snowflake,
	time,
	TimestampStyles,
} from "discord.js";
import { channelMention, ChannelType, Collection, EmbedBuilder, PermissionFlagsBits, roleMention } from "discord.js";
import { Season } from "../Utility/Constants.js";
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
	eye_of_eden_channel_id: Snowflake | null;
	eye_of_eden_role_id: Snowflake | null;
	daily_reset_channel_id: Snowflake | null;
	daily_reset_role_id: Snowflake | null;
	passage_channel_id: Snowflake | null;
	passage_role_id: Snowflake | null;
	aurora_channel_id: Snowflake | null;
	aurora_role_id: Snowflake | null;
	shard_eruption_channel_id: Snowflake | null;
	shard_eruption_role_id: Snowflake | null;
	iss_channel_id: Snowflake | null;
	iss_role_id: Snowflake | null;
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
	eyeOfEdenChannelId: NotificationPacket["eye_of_eden_channel_id"];
	eyeOfEdenRoleId: NotificationPacket["eye_of_eden_role_id"];
	dailyResetChannelId: NotificationPacket["daily_reset_channel_id"];
	dailyResetRoleId: NotificationPacket["daily_reset_role_id"];
	passageChannelId: NotificationPacket["passage_channel_id"];
	passageRoleId: NotificationPacket["passage_role_id"];
	auroraChannelId: NotificationPacket["aurora_channel_id"];
	auroraRoleId: NotificationPacket["aurora_role_id"];
	shardEruptionChannelId: NotificationPacket["shard_eruption_channel_id"];
	shardEruptionRoleId: NotificationPacket["shard_eruption_role_id"];
	issChannelId: NotificationPacket["iss_channel_id"];
	issRoleId: NotificationPacket["iss_role_id"];
}

type NotificationPatchData = Omit<NotificationPacket, "id" | "guild_id">;
export type NotificationInsertQuery = Partial<NotificationPatchData> & Pick<NotificationPacket, "guild_id">;
export type NotificationUpdateQuery = Omit<NotificationInsertQuery, "guild_id">;

export enum NotificationEvent {
	PollutedGeyser = "Polluted Geyser",
	Grandma = "Grandma",
	Turtle = "Turtle",
	DailyReset = "Daily Reset",
	EyeOfEden = "Eye of Eden",
	ISS = "ISS",
	ShardEruption = "Shard Eruption",
	AURORA = "AURORA",
	Passage = "Passage",
}

export interface NotificationSendExtra {
	startTime?: number;
	dangerousShardEruption?: boolean;
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

	public eyeOfEdenChannelId!: NotificationData["eyeOfEdenChannelId"];

	public eyeOfEdenRoleId!: NotificationData["eyeOfEdenRoleId"];

	public dailyResetChannelId!: NotificationData["dailyResetChannelId"];

	public dailyResetRoleId!: NotificationData["dailyResetRoleId"];

	public issChannelId!: NotificationData["issChannelId"];

	public issRoleId!: NotificationData["issRoleId"];

	public shardEruptionChannelId!: NotificationData["shardEruptionChannelId"];

	public shardEruptionRoleId!: NotificationData["shardEruptionRoleId"];

	public auroraChannelId!: NotificationData["auroraChannelId"];

	public auroraRoleId!: NotificationData["auroraRoleId"];

	public passageChannelId!: NotificationData["passageChannelId"];

	public passageRoleId!: NotificationData["passageRoleId"];

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
		this.eyeOfEdenChannelId = data.eye_of_eden_channel_id;
		this.eyeOfEdenRoleId = data.eye_of_eden_role_id;
		this.dailyResetChannelId = data.daily_reset_channel_id;
		this.dailyResetRoleId = data.daily_reset_role_id;
		this.issChannelId = data.iss_channel_id;
		this.issRoleId = data.iss_role_id;
		this.shardEruptionChannelId = data.shard_eruption_channel_id;
		this.shardEruptionRoleId = data.shard_eruption_role_id;
		this.auroraChannelId = data.aurora_channel_id;
		this.auroraRoleId = data.aurora_role_id;
		this.passageChannelId = data.passage_channel_id;
		this.passageRoleId = data.passage_role_id;
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

			notification.patch(notificationPacket!);
		} else {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications).insert(data, "*");
			notification = new this(notificationPacket!);
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

		this.patch(notificationPacket!);
		await interaction.reply({ content: "Notifications have been modified.", embeds: [await this.overview(guild)] });
	}

	public async send(
		client: Client<true>,
		type: NotificationEvent,
		{ startTime, dangerousShardEruption }: NotificationSendExtra = {},
	) {
		const {
			guildId,
			pollutedGeyserChannelId,
			pollutedGeyserRoleId,
			grandmaChannelId,
			grandmaRoleId,
			turtleChannelId,
			turtleRoleId,
			eyeOfEdenChannelId,
			eyeOfEdenRoleId,
			dailyResetChannelId,
			dailyResetRoleId,
			issChannelId,
			issRoleId,
			shardEruptionChannelId,
			shardEruptionRoleId,
			auroraChannelId,
			auroraRoleId,
			passageChannelId,
			passageRoleId,
		} = this;
		const timeString = startTime ? time(startTime, TimestampStyles.RelativeTime) : "soon";
		let channelId;
		let roleId;
		let suffix;

		switch (type) {
			case NotificationEvent.PollutedGeyser:
				channelId = pollutedGeyserChannelId;
				roleId = pollutedGeyserRoleId;
				suffix = `The polluted geyser will erupt ${timeString}!`;
				break;
			case NotificationEvent.Grandma:
				channelId = grandmaChannelId;
				roleId = grandmaRoleId;
				suffix = `Grandma will share her light ${timeString}!`;
				break;
			case NotificationEvent.Turtle:
				channelId = turtleChannelId;
				roleId = turtleRoleId;
				suffix = `The turtle will need cleansing of darkness ${timeString}!`;
				break;
			case NotificationEvent.EyeOfEden:
				channelId = eyeOfEdenChannelId;
				roleId = eyeOfEdenRoleId;
				suffix = "Skykids may save statues in the Eye of Eden again!";
				break;
			case NotificationEvent.DailyReset:
				channelId = dailyResetChannelId;
				roleId = dailyResetRoleId;
				suffix = "It's a new day. Time to forge candles again!";
				break;
			case NotificationEvent.ISS:
				channelId = issChannelId;
				roleId = issRoleId;
				suffix = "The International Space Station is accessible!";
				break;
			case NotificationEvent.ShardEruption:
				channelId = shardEruptionChannelId;
				roleId = shardEruptionRoleId;
				suffix = `A${dangerousShardEruption ? " dangerous" : ""} shard eruption begins ${timeString}!`;
				break;
			case NotificationEvent.AURORA:
				channelId = auroraChannelId;
				roleId = auroraRoleId;
				suffix = `The AURORA concert is starting ${timeString}! Take your friends!`;
				break;
			case NotificationEvent.Passage:
				channelId = passageChannelId;
				roleId = passageRoleId;
				suffix = `The Season of ${Season.Passage} quests are starting ${timeString}!`;
				break;
		}

		if (!channelId || !roleId) return;
		const channel = client.guilds.resolve(guildId)?.channels.resolve(channelId);
		if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement)) return;
		const role = channel.guild.roles.resolve(roleId);
		if (!role) return;
		const me = await channel.guild.members.fetchMe();

		if (
			!channel.permissionsFor(me).has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages) ||
			(!role.mentionable && !channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))
		)
			return;

		await channel.send(`${role} ${suffix}`).catch(() => null);
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
			eyeOfEdenChannelId,
			eyeOfEdenRoleId,
			dailyResetChannelId,
			dailyResetRoleId,
			issChannelId,
			issRoleId,
			shardEruptionChannelId,
			shardEruptionRoleId,
			auroraChannelId,
			auroraRoleId,
			passageChannelId,
			passageRoleId,
		} = this;

		return new EmbedBuilder()
			.setColor(me.displayColor)
			.setFields(
				{
					name: NotificationEvent.PollutedGeyser,
					value: this.overviewValue(me, pollutedGeyserChannelId, pollutedGeyserRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.Grandma,
					value: this.overviewValue(me, grandmaChannelId, grandmaRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.Turtle,
					value: this.overviewValue(me, turtleChannelId, turtleRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.DailyReset,
					value: this.overviewValue(me, dailyResetChannelId, dailyResetRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.ISS,
					value: this.overviewValue(me, issChannelId, issRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.EyeOfEden,
					value: this.overviewValue(me, eyeOfEdenChannelId, eyeOfEdenRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.ShardEruption,
					value: this.overviewValue(me, shardEruptionChannelId, shardEruptionRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.AURORA,
					value: this.overviewValue(me, auroraChannelId, auroraRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.Passage,
					value: this.overviewValue(me, passageChannelId, passageRoleId),
					inline: true,
				},
			)
			.setTitle(guild.name);
	}

	private overviewValue(me: GuildMember, channelId: Snowflake | null, roleId: Snowflake | null) {
		const { channels, roles } = me.guild;
		const channel = channelId ? channels.resolve(channelId) : null;
		const role = roleId ? roles.resolve(roleId) : null;

		return `${channelId ? channelMention(channelId) : "No channel"}\n${roleId ? roleMention(roleId) : "No role"}\n${
			channel?.permissionsFor(me).has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages) ||
			(role?.mentionable && channel?.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone))
				? "✅ Sending!"
				: "⚠️ Stopped!"
		}`;
	}
}
