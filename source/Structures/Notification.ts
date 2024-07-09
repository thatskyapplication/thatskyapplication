import {
	type Channel,
	ChannelType,
	type ChatInputCommandInteraction,
	Collection,
	EmbedBuilder,
	type GuildBasedChannel,
	type GuildMember,
	PermissionFlagsBits,
	type Role,
	type Snowflake,
	channelMention,
	roleMention,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR } from "../Utility/Constants.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "../Utility/emojis.js";
import pg, { Table } from "../pg.js";

export interface NotificationPacket {
	guild_id: Snowflake;
	polluted_geyser_channel_id: Snowflake | null;
	polluted_geyser_role_id: Snowflake | null;
	polluted_geyser_sendable: boolean;
	polluted_geyser_offset: number;
	grandma_channel_id: Snowflake | null;
	grandma_role_id: Snowflake | null;
	grandma_sendable: boolean;
	grandma_offset: number;
	turtle_channel_id: Snowflake | null;
	turtle_role_id: Snowflake | null;
	turtle_sendable: boolean;
	turtle_offset: number;
	eye_of_eden_channel_id: Snowflake | null;
	eye_of_eden_role_id: Snowflake | null;
	eye_of_eden_sendable: boolean;
	daily_reset_channel_id: Snowflake | null;
	daily_reset_role_id: Snowflake | null;
	daily_reset_sendable: boolean;
	passage_channel_id: Snowflake | null;
	passage_role_id: Snowflake | null;
	passage_sendable: boolean;
	passage_offset: number;
	aurora_channel_id: Snowflake | null;
	aurora_role_id: Snowflake | null;
	aurora_sendable: boolean;
	aurora_offset: number;
	regular_shard_eruption_channel_id: Snowflake | null;
	regular_shard_eruption_role_id: Snowflake | null;
	regular_shard_eruption_sendable: boolean;
	regular_shard_eruption_offset: number;
	iss_channel_id: Snowflake | null;
	iss_role_id: Snowflake | null;
	iss_sendable: boolean;
	strong_shard_eruption_channel_id: Snowflake | null;
	strong_shard_eruption_role_id: Snowflake | null;
	strong_shard_eruption_sendable: boolean;
	strong_shard_eruption_offset: number;
	aviarys_firework_festival_channel_id: Snowflake | null;
	aviarys_firework_festival_role_id: Snowflake | null;
	aviarys_firework_festival_sendable: boolean;
	dragon_channel_id: Snowflake | null;
	dragon_role_id: Snowflake | null;
	dragon_sendable: boolean;
}

interface NotificationData {
	guildId: NotificationPacket["guild_id"];
	pollutedGeyserChannelId: NotificationPacket["polluted_geyser_channel_id"];
	pollutedGeyserRoleId: NotificationPacket["polluted_geyser_role_id"];
	pollutedGeyserSendable: NotificationPacket["polluted_geyser_sendable"];
	pollutedGeyserOffset: NotificationPacket["polluted_geyser_offset"];
	grandmaChannelId: NotificationPacket["grandma_channel_id"];
	grandmaRoleId: NotificationPacket["grandma_role_id"];
	grandmaSendable: NotificationPacket["grandma_sendable"];
	grandmaOffset: NotificationPacket["grandma_offset"];
	turtleChannelId: NotificationPacket["turtle_channel_id"];
	turtleRoleId: NotificationPacket["turtle_role_id"];
	turtleSendable: NotificationPacket["turtle_sendable"];
	turtleOffset: NotificationPacket["turtle_offset"];
	eyeOfEdenChannelId: NotificationPacket["eye_of_eden_channel_id"];
	eyeOfEdenRoleId: NotificationPacket["eye_of_eden_role_id"];
	eyeOfEdenSendable: NotificationPacket["eye_of_eden_sendable"];
	dailyResetChannelId: NotificationPacket["daily_reset_channel_id"];
	dailyResetRoleId: NotificationPacket["daily_reset_role_id"];
	dailyResetSendable: NotificationPacket["daily_reset_sendable"];
	passageChannelId: NotificationPacket["passage_channel_id"];
	passageRoleId: NotificationPacket["passage_role_id"];
	passageSendable: NotificationPacket["passage_sendable"];
	passageOffset: NotificationPacket["passage_offset"];
	auroraChannelId: NotificationPacket["aurora_channel_id"];
	auroraRoleId: NotificationPacket["aurora_role_id"];
	auroraSendable: NotificationPacket["aurora_sendable"];
	auroraOffset: NotificationPacket["aurora_offset"];
	regularShardEruptionChannelId: NotificationPacket["regular_shard_eruption_channel_id"];
	regularShardEruptionRoleId: NotificationPacket["regular_shard_eruption_role_id"];
	regularShardEruptionSendable: NotificationPacket["regular_shard_eruption_sendable"];
	regularShardEruptionOffset: NotificationPacket["regular_shard_eruption_offset"];
	issChannelId: NotificationPacket["iss_channel_id"];
	issRoleId: NotificationPacket["iss_role_id"];
	issSendable: NotificationPacket["iss_sendable"];
	strongShardEruptionChannelId: NotificationPacket["strong_shard_eruption_channel_id"];
	strongShardEruptionRoleId: NotificationPacket["strong_shard_eruption_role_id"];
	strongShardEruptionSendable: NotificationPacket["strong_shard_eruption_sendable"];
	strongShardEruptionOffset: NotificationPacket["strong_shard_eruption_offset"];
	aviarysFireworkFestivalChannelId: NotificationPacket["aviarys_firework_festival_channel_id"];
	aviarysFireworkFestivalRoleId: NotificationPacket["aviarys_firework_festival_role_id"];
	aviarysFireworkFestivalSendable: NotificationPacket["aviarys_firework_festival_sendable"];
	dragonChannelId: NotificationPacket["dragon_channel_id"];
	dragonRoleId: NotificationPacket["dragon_role_id"];
	dragonSendable: NotificationPacket["dragon_sendable"];
}

type NotificationPatchData = Omit<NotificationPacket, "guild_id">;

export type NotificationInsertQuery = Partial<NotificationPatchData> &
	Pick<NotificationPacket, "guild_id">;

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
	Dragon = "Dragon",
}

export const NOTIFICATION_EVENT_VALUES = Object.values(NotificationEvent);

export const NOTIFICATION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
] as const satisfies Readonly<ChannelType[]>;

type NotificationAllowedChannel = Extract<
	GuildBasedChannel,
	{ type: (typeof NOTIFICATION_CHANNEL_TYPES)[number] }
>;

function isNotificationChannel(channel: Channel): channel is NotificationAllowedChannel {
	return NOTIFICATION_CHANNEL_TYPES.includes(
		channel.type as (typeof NOTIFICATION_CHANNEL_TYPES)[number],
	);
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

	if (me.isCommunicationDisabled()) {
		errors.push("I am timed out.");
	}

	if (
		!channel
			.permissionsFor(me)
			.has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages)
	) {
		errors.push(`\`View Channel\` & \`Send Messages\` are required for ${channel}.`);
	}

	if (!(channel.permissionsFor(me).has(PermissionFlagsBits.MentionEveryone) || role.mentionable)) {
		errors.push(
			`Cannot mention the ${role} role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for ${me} in the channel or make the role mentionable.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

export function isEvent(event: string): event is NotificationEvent {
	return NOTIFICATION_EVENT_VALUES.includes(event as NotificationEvent);
}

export default class Notification {
	public static readonly cache = new Collection<Snowflake, Notification>();

	public readonly guildId: NotificationData["guildId"];

	public pollutedGeyserChannelId!: NotificationData["pollutedGeyserChannelId"];

	public pollutedGeyserRoleId!: NotificationData["pollutedGeyserRoleId"];

	public pollutedGeyserSendable!: NotificationData["pollutedGeyserSendable"];

	public pollutedGeyserOffset!: NotificationData["pollutedGeyserOffset"];

	public grandmaChannelId!: NotificationData["grandmaChannelId"];

	public grandmaRoleId!: NotificationData["grandmaRoleId"];

	public grandmaSendable!: NotificationData["grandmaSendable"];

	public grandmaOffset!: NotificationData["grandmaOffset"];

	public turtleChannelId!: NotificationData["turtleChannelId"];

	public turtleRoleId!: NotificationData["turtleRoleId"];

	public turtleSendable!: NotificationData["turtleSendable"];

	public turtleOffset!: NotificationData["turtleOffset"];

	public eyeOfEdenChannelId!: NotificationData["eyeOfEdenChannelId"];

	public eyeOfEdenRoleId!: NotificationData["eyeOfEdenRoleId"];

	public eyeOfEdenSendable!: NotificationData["eyeOfEdenSendable"];

	public dailyResetChannelId!: NotificationData["dailyResetChannelId"];

	public dailyResetRoleId!: NotificationData["dailyResetRoleId"];

	public dailyResetSendable!: NotificationData["dailyResetSendable"];

	public issChannelId!: NotificationData["issChannelId"];

	public issRoleId!: NotificationData["issRoleId"];

	public issSendable!: NotificationData["issSendable"];

	public regularShardEruptionChannelId!: NotificationData["regularShardEruptionChannelId"];

	public regularShardEruptionRoleId!: NotificationData["regularShardEruptionRoleId"];

	public regularShardEruptionSendable!: NotificationData["regularShardEruptionSendable"];

	public regularShardEruptionOffset!: NotificationData["regularShardEruptionOffset"];

	public strongShardEruptionChannelId!: NotificationData["strongShardEruptionChannelId"];

	public strongShardEruptionRoleId!: NotificationData["strongShardEruptionRoleId"];

	public strongShardEruptionSendable!: NotificationData["strongShardEruptionSendable"];

	public strongShardEruptionOffset!: NotificationData["strongShardEruptionOffset"];

	public auroraChannelId!: NotificationData["auroraChannelId"];

	public auroraRoleId!: NotificationData["auroraRoleId"];

	public auroraSendable!: NotificationData["auroraSendable"];

	public auroraOffset!: NotificationData["auroraOffset"];

	public passageChannelId!: NotificationData["passageChannelId"];

	public passageRoleId!: NotificationData["passageRoleId"];

	public passageSendable!: NotificationData["passageSendable"];

	public passageOffset!: NotificationData["passageOffset"];

	public aviarysFireworkFestivalChannelId!: NotificationData["aviarysFireworkFestivalChannelId"];

	public aviarysFireworkFestivalRoleId!: NotificationData["aviarysFireworkFestivalRoleId"];

	public aviarysFireworkFestivalSendable!: NotificationData["aviarysFireworkFestivalSendable"];

	public dragonChannelId!: NotificationData["dragonChannelId"];

	public dragonRoleId!: NotificationData["dragonRoleId"];

	public dragonSendable!: NotificationData["dragonSendable"];

	public constructor(notification: NotificationPacket) {
		this.guildId = notification.guild_id;
		this.patch(notification);
	}

	private patch(data: NotificationPatchData) {
		this.pollutedGeyserChannelId = data.polluted_geyser_channel_id;
		this.pollutedGeyserRoleId = data.polluted_geyser_role_id;
		this.pollutedGeyserSendable = data.polluted_geyser_sendable;
		this.pollutedGeyserOffset = data.polluted_geyser_offset;
		this.grandmaChannelId = data.grandma_channel_id;
		this.grandmaRoleId = data.grandma_role_id;
		this.grandmaSendable = data.grandma_sendable;
		this.grandmaOffset = data.grandma_offset;
		this.turtleChannelId = data.turtle_channel_id;
		this.turtleRoleId = data.turtle_role_id;
		this.turtleSendable = data.turtle_sendable;
		this.turtleOffset = data.turtle_offset;
		this.eyeOfEdenChannelId = data.eye_of_eden_channel_id;
		this.eyeOfEdenRoleId = data.eye_of_eden_role_id;
		this.eyeOfEdenSendable = data.eye_of_eden_sendable;
		this.dailyResetChannelId = data.daily_reset_channel_id;
		this.dailyResetRoleId = data.daily_reset_role_id;
		this.dailyResetSendable = data.daily_reset_sendable;
		this.issChannelId = data.iss_channel_id;
		this.issRoleId = data.iss_role_id;
		this.issSendable = data.iss_sendable;
		this.regularShardEruptionChannelId = data.regular_shard_eruption_channel_id;
		this.regularShardEruptionRoleId = data.regular_shard_eruption_role_id;
		this.regularShardEruptionSendable = data.regular_shard_eruption_sendable;
		this.regularShardEruptionOffset = data.regular_shard_eruption_offset;
		this.strongShardEruptionChannelId = data.strong_shard_eruption_channel_id;
		this.strongShardEruptionRoleId = data.strong_shard_eruption_role_id;
		this.strongShardEruptionSendable = data.strong_shard_eruption_sendable;
		this.strongShardEruptionOffset = data.strong_shard_eruption_offset;
		this.auroraChannelId = data.aurora_channel_id;
		this.auroraRoleId = data.aurora_role_id;
		this.auroraSendable = data.aurora_sendable;
		this.auroraOffset = data.aurora_offset;
		this.passageChannelId = data.passage_channel_id;
		this.passageRoleId = data.passage_role_id;
		this.passageSendable = data.passage_sendable;
		this.passageOffset = data.passage_offset;
		this.aviarysFireworkFestivalChannelId = data.aviarys_firework_festival_channel_id;
		this.aviarysFireworkFestivalRoleId = data.aviarys_firework_festival_role_id;
		this.aviarysFireworkFestivalSendable = data.aviarys_firework_festival_sendable;
		this.dragonChannelId = data.dragon_channel_id;
		this.dragonRoleId = data.dragon_role_id;
		this.dragonSendable = data.dragon_sendable;
	}

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached">,
		data: NotificationInsertQuery | NotificationUpdateQuery,
	) {
		const { guildId } = interaction;
		let notification = this.cache.get(guildId);

		if (notification) {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications)
				.update(data)
				.where({ guild_id: notification.guildId })
				.returning("*");

			notification.patch(notificationPacket!);
		} else {
			const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications).insert(
				data,
				"*",
			);

			notification = new this(notificationPacket!);
			this.cache.set(notification.guildId, notification);
		}

		await interaction.reply({
			content: "Notifications have been modified.",
			embeds: [await notification.embed(interaction)],
			ephemeral: true,
		});
	}

	public async unset(
		interaction: ChatInputCommandInteraction<"cached">,
		data: NotificationUpdateQuery,
	) {
		const { guildId } = interaction;

		const [notificationPacket] = await pg<NotificationPacket>(Table.Notifications)
			.update(data)
			.where({ guild_id: guildId })
			.returning("*");

		this.patch(notificationPacket!);

		await interaction.reply({
			content: "Notifications have been modified.",
			embeds: [await this.embed(interaction)],
			ephemeral: true,
		});
	}

	public static async delete(guildId: Snowflake) {
		await pg<NotificationPacket>(Table.Notifications).delete().where({ guild_id: guildId });
		this.cache.delete(guildId);
	}

	public async embed(interaction: ChatInputCommandInteraction<"cached">) {
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
			dragonChannelId,
			dragonRoleId,
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
					value: this.overviewValue(
						me,
						aviarysFireworkFestivalChannelId,
						aviarysFireworkFestivalRoleId,
					),
					inline: true,
				},
				{
					name: NotificationEvent.Dragon,
					value: this.overviewValue(me, dragonChannelId, dragonRoleId),
					inline: true,
				},
			)
			.setTitle(interaction.guild.name);
	}

	private overviewValue(
		member: GuildMember,
		channelId: Snowflake | null,
		roleId: Snowflake | null,
	) {
		const { channels, roles } = member.guild;
		const channel = channelId ? channels.cache.get(channelId) : null;
		const role = roleId ? roles.cache.get(roleId) : null;

		const sending =
			channel &&
			isNotificationChannel(channel) &&
			role &&
			isNotificationSendable(channel, role, member);

		return `${channelId ? channelMention(channelId) : "No channel"}\n${roleId ? roleMention(roleId) : "No role"}\n${
			sending ? "Sending!" : "Stopped!"
		} ${formatEmoji(sending ? MISCELLANEOUS_EMOJIS.Yes : MISCELLANEOUS_EMOJIS.No)}`;
	}
}
