import {
	type Channel,
	type ChatInputCommandInteraction,
	type Client,
	type GuildBasedChannel,
	type GuildMember,
	type Role,
	type Snowflake,
	channelMention,
	ChannelType,
	Collection,
	EmbedBuilder,
	hyperlink,
	MessageFlags,
	PermissionFlagsBits,
	roleMention,
	time,
	TimestampStyles,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR } from "../Utility/Constants.js";
import type { ShardEruptionData } from "../Utility/Utility.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "../Utility/emojis.js";
import pg, { Table } from "../pg.js";
import { SeasonName, resolveFullSeasonName } from "./Season.js";

export interface NotificationPacket {
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
	regular_shard_eruption_channel_id: Snowflake | null;
	regular_shard_eruption_role_id: Snowflake | null;
	iss_channel_id: Snowflake | null;
	iss_role_id: Snowflake | null;
	strong_shard_eruption_channel_id: Snowflake | null;
	strong_shard_eruption_role_id: Snowflake | null;
	aviarys_firework_festival_channel_id: Snowflake | null;
	aviarys_firework_festival_role_id: Snowflake | null;
}

interface NotificationData {
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
	regularShardEruptionChannelId: NotificationPacket["regular_shard_eruption_channel_id"];
	regularShardEruptionRoleId: NotificationPacket["regular_shard_eruption_role_id"];
	issChannelId: NotificationPacket["iss_channel_id"];
	issRoleId: NotificationPacket["iss_role_id"];
	strongShardEruptionChannelId: NotificationPacket["strong_shard_eruption_channel_id"];
	strongShardEruptionRoleId: NotificationPacket["strong_shard_eruption_role_id"];
	aviarysFireworkFestivalChannelId: NotificationPacket["aviarys_firework_festival_channel_id"];
	aviarysFireworkFestivalRoleId: NotificationPacket["aviarys_firework_festival_role_id"];
}

type NotificationPatchData = Omit<NotificationPacket, "guild_id">;
export type NotificationInsertQuery = Partial<NotificationPatchData> & Pick<NotificationPacket, "guild_id">;
export type NotificationUpdateQuery = Omit<NotificationInsertQuery, "guild_id">;

export enum NotificationEvent {
	PollutedGeyser = "Polluted Geyser",
	Grandma = "Grandma",
	Turtle = "Turtle",
	DailyReset = "Daily Reset",
	EyeOfEden = "Eye of Eden",
	ISS = "ISS",
	RegularShardEruption = "Shard Eruption (Regular)",
	StrongShardEruption = "Shard Eruption (Strong)",
	AURORA = "AURORA",
	Passage = "Passage",
	AviarysFireworkFestival = "Aviary's Firework Festival",
}

export const NOTIFICATION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
] as const satisfies Readonly<ChannelType[]>;

type NotificationAllowedChannel = Extract<GuildBasedChannel, { type: (typeof NOTIFICATION_CHANNEL_TYPES)[number] }>;

function isNotificationChannel(channel: Channel): channel is NotificationAllowedChannel {
	return NOTIFICATION_CHANNEL_TYPES.includes(channel.type as (typeof NOTIFICATION_CHANNEL_TYPES)[number]);
}

export function isNotificationSendable(
	channel: NotificationAllowedChannel,
	role: Role,
	me: GuildMember,
	returnErrors: true,
): string[];

export function isNotificationSendable(
	channel: NotificationAllowedChannel,
	role: Role,
	me: GuildMember,
	returnErrors?: false,
): boolean;

export function isNotificationSendable(
	channel: NotificationAllowedChannel,
	role: Role,
	me: GuildMember,
	returnErrors = false,
) {
	const errors = [];
	if (me.isCommunicationDisabled()) errors.push("I am timed out.");

	if (!channel.permissionsFor(me).has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages)) {
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		errors.push(`\`View Channel\` & \`Send Messages\` are required for ${channel}.`);
	}

	if (!channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone) && !role.mentionable) {
		errors.push(
			`Cannot mention the ${role} role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for ${me} in the channel or make the role mentionable.`,
		);
	}

	return returnErrors ? (errors.length > 1 ? errors.map((error) => `- ${error}`) : errors) : errors.length === 0;
}

export interface NotificationSendExtra {
	startTime?: number;
	endTime?: number;
	shardEruption?: ShardEruptionData;
}

export function isEvent(event: string): event is NotificationEvent {
	return Object.values(NotificationEvent).includes(event as NotificationEvent);
}

export default class Notification {
	public static readonly cache = new Collection<Snowflake, Notification>();

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

	public regularShardEruptionChannelId!: NotificationData["regularShardEruptionChannelId"];

	public regularShardEruptionRoleId!: NotificationData["regularShardEruptionRoleId"];

	public strongShardEruptionChannelId!: NotificationData["strongShardEruptionChannelId"];

	public strongShardEruptionRoleId!: NotificationData["strongShardEruptionRoleId"];

	public auroraChannelId!: NotificationData["auroraChannelId"];

	public auroraRoleId!: NotificationData["auroraRoleId"];

	public passageChannelId!: NotificationData["passageChannelId"];

	public passageRoleId!: NotificationData["passageRoleId"];

	public aviarysFireworkFestivalChannelId!: NotificationData["aviarysFireworkFestivalChannelId"];

	public aviarysFireworkFestivalRoleId!: NotificationData["aviarysFireworkFestivalRoleId"];

	public constructor(notification: NotificationPacket) {
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
		this.regularShardEruptionChannelId = data.regular_shard_eruption_channel_id;
		this.regularShardEruptionRoleId = data.regular_shard_eruption_role_id;
		this.strongShardEruptionChannelId = data.strong_shard_eruption_channel_id;
		this.strongShardEruptionRoleId = data.strong_shard_eruption_role_id;
		this.auroraChannelId = data.aurora_channel_id;
		this.auroraRoleId = data.aurora_role_id;
		this.passageChannelId = data.passage_channel_id;
		this.passageRoleId = data.passage_role_id;
		this.aviarysFireworkFestivalChannelId = data.aviarys_firework_festival_channel_id;
		this.aviarysFireworkFestivalRoleId = data.aviarys_firework_festival_role_id;
	}

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached">,
		data: NotificationInsertQuery | NotificationUpdateQuery,
	) {
		const { guildId } = interaction;
		let notification = this.cache.find((cachedNotification) => cachedNotification.guildId === guildId);

		if (notification) {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications)
				.update(data)
				.where({ guild_id: notification.guildId })
				.returning("*");

			notification.patch(notificationPacket!);
		} else {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications).insert(data, "*");
			notification = new this(notificationPacket!);
			this.cache.set(notification.guildId, notification);
		}

		await interaction.reply({
			content: "Notifications have been modified.",
			embeds: [await notification.overview(interaction)],
		});
	}

	public async unset(interaction: ChatInputCommandInteraction<"cached">, data: NotificationUpdateQuery) {
		const { guildId } = interaction;

		const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications)
			.update(data)
			.where({ guild_id: guildId })
			.returning("*");

		this.patch(notificationPacket!);
		await interaction.reply({
			content: "Notifications have been modified.",
			embeds: [await this.overview(interaction)],
		});
	}

	public static async delete(guildId: Snowflake) {
		await pg<NotificationPacket>(Table.Notifications).delete().where({ guild_id: guildId });
		this.cache.delete(guildId);
	}

	public async send(
		client: Client<true>,
		type: NotificationEvent,
		{ startTime, endTime, shardEruption }: NotificationSendExtra = {},
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
			regularShardEruptionChannelId,
			regularShardEruptionRoleId,
			strongShardEruptionChannelId,
			strongShardEruptionRoleId,
			auroraChannelId,
			auroraRoleId,
			passageChannelId,
			passageRoleId,
			aviarysFireworkFestivalChannelId,
			aviarysFireworkFestivalRoleId,
		} = this;
		const startTimeString = startTime ? time(startTime, TimestampStyles.RelativeTime) : "soon";
		const endTimeString = endTime ? time(endTime, TimestampStyles.RelativeTime) : "soon";
		const { realm, map, url } = shardEruption ?? {};
		let channelId;
		let roleId;
		let suffix;

		switch (type) {
			case NotificationEvent.PollutedGeyser:
				channelId = pollutedGeyserChannelId;
				roleId = pollutedGeyserRoleId;
				suffix = `The polluted geyser will erupt ${startTimeString}!`;
				break;
			case NotificationEvent.Grandma:
				channelId = grandmaChannelId;
				roleId = grandmaRoleId;
				suffix = `Grandma will share her light ${startTimeString}!`;
				break;
			case NotificationEvent.Turtle:
				channelId = turtleChannelId;
				roleId = turtleRoleId;
				suffix = `The turtle will need cleansing of darkness ${startTimeString}!`;
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
			case NotificationEvent.RegularShardEruption:
				channelId = regularShardEruptionChannelId;
				roleId = regularShardEruptionRoleId;

				suffix = `A regular shard eruption lands in the ${hyperlink(
					`${realm!} (${map!})`,
					url!,
				)} ${startTimeString} and clears up ${endTimeString}!`;

				break;
			case NotificationEvent.StrongShardEruption:
				channelId = strongShardEruptionChannelId;
				roleId = strongShardEruptionRoleId;

				suffix = `A strong shard eruption lands in the ${hyperlink(
					`${realm!} (${map!})`,
					url!,
				)} ${startTimeString} and clears up ${endTimeString}!`;

				break;
			case NotificationEvent.AURORA:
				channelId = auroraChannelId;
				roleId = auroraRoleId;
				suffix = `The AURORA concert is starting ${startTimeString}! Take your friends!`;
				break;
			case NotificationEvent.Passage:
				channelId = passageChannelId;
				roleId = passageRoleId;
				suffix = `The ${resolveFullSeasonName(SeasonName.Passage)} quests are starting ${startTimeString}!`;
				break;
			case NotificationEvent.AviarysFireworkFestival:
				channelId = aviarysFireworkFestivalChannelId;
				roleId = aviarysFireworkFestivalRoleId;
				suffix = `Aviary's Firework Festival begins ${startTimeString}!`;
				break;
		}

		if (!channelId || !roleId) return;
		const channel = client.guilds.cache.get(guildId)?.channels.cache.get(channelId);
		if (!channel || !isNotificationChannel(channel)) return;
		const role = channel.guild.roles.cache.get(roleId);
		if (!role) return;
		const me = await channel.guild.members.fetchMe();
		if (!isNotificationSendable(channel, role, me)) return;
		await channel.send({ content: `${role} ${suffix}`, flags: MessageFlags.SuppressEmbeds });
	}

	public async overview(interaction: ChatInputCommandInteraction<"cached">) {
		const me = await interaction.guild.members.fetchMe();

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
			regularShardEruptionChannelId,
			regularShardEruptionRoleId,
			strongShardEruptionChannelId,
			strongShardEruptionRoleId,
			auroraChannelId,
			auroraRoleId,
			passageChannelId,
			passageRoleId,
			aviarysFireworkFestivalChannelId,
			aviarysFireworkFestivalRoleId,
		} = this;

		return new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
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
					name: NotificationEvent.RegularShardEruption,
					value: this.overviewValue(me, regularShardEruptionChannelId, regularShardEruptionRoleId),
					inline: true,
				},
				{
					name: NotificationEvent.StrongShardEruption,
					value: this.overviewValue(me, strongShardEruptionChannelId, strongShardEruptionRoleId),
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
				{
					name: NotificationEvent.AviarysFireworkFestival,
					value: this.overviewValue(me, aviarysFireworkFestivalChannelId, aviarysFireworkFestivalRoleId),
					inline: true,
				},
			)
			.setTitle(interaction.guild.name);
	}

	private overviewValue(member: GuildMember, channelId: Snowflake | null, roleId: Snowflake | null) {
		const { channels, roles } = member.guild;
		const channel = channelId ? channels.cache.get(channelId) : null;
		const role = roleId ? roles.cache.get(roleId) : null;
		const sending = channel && isNotificationChannel(channel) && role && isNotificationSendable(channel, role, member);

		return `${channelId ? channelMention(channelId) : "No channel"}\n${roleId ? roleMention(roleId) : "No role"}\n${
			sending ? "Sending!" : "Stopped!"
		} ${formatEmoji(sending ? MISCELLANEOUS_EMOJIS.Yes : MISCELLANEOUS_EMOJIS.No)}`;
	}
}
