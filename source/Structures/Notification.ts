import {
	type Channel,
	ChatInputCommandInteraction,
	type Client,
	EmbedBuilder,
	type GuildBasedChannel,
	type GuildMember,
	MessageFlags,
	PermissionFlagsBits,
	type Role,
	type Snowflake,
	type StringSelectMenuInteraction,
	channelMention,
	roleMention,
} from "discord.js";
import { t } from "i18next";
import {
	DEFAULT_EMBED_COLOUR,
	NOTIFICATION_CHANNEL_TYPES,
	NOTIFICATION_TYPE_VALUES,
	NotificationType,
	type NotificationTypes,
} from "../Utility/Constants.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "../Utility/emojis.js";
import pg, { Table } from "../pg.js";

export interface NotificationPacket {
	guild_id: Snowflake;
	type: number;
	channel_id: Snowflake;
	role_id: Snowflake;
	offset: number;
	sendable: boolean;
}

interface NotificationData {
	guildId: NotificationPacket["guild_id"];
	type: NotificationPacket["type"];
	channelId: NotificationPacket["channel_id"];
	roleId: NotificationPacket["role_id"];
	offset: NotificationPacket["offset"];
	sendable: NotificationPacket["sendable"];
}

type NotificationPatchData = Omit<NotificationPacket, "guild_id" | "type">;

const NOTIFICATION_OFFSETS = [
	NotificationType.PollutedGeyser,
	NotificationType.Grandma,
	NotificationType.Turtle,
	NotificationType.RegularShardEruption,
	NotificationType.StrongShardEruption,
	NotificationType.AURORA,
	NotificationType.Passage,
] as const satisfies Readonly<NotificationTypes[]>;

type NotificationOffset = (typeof NOTIFICATION_OFFSETS)[number];

export const NotificationOffsetToMaximumValues = {
	[NotificationType.PollutedGeyser]: 10,
	[NotificationType.Grandma]: 10,
	[NotificationType.Turtle]: 10,
	[NotificationType.RegularShardEruption]: 10,
	[NotificationType.StrongShardEruption]: 10,
	[NotificationType.AURORA]: 15,
	[NotificationType.Passage]: 5,
} as const;

type NotificationAllowedChannel = Extract<
	GuildBasedChannel,
	{ type: (typeof NOTIFICATION_CHANNEL_TYPES)[number] }
>;

export const NOTIFICATION_SETUP_OFFSET_CUSTOM_ID = "NOTIFICATION_SETUP_OFFSET_CUSTOM_ID" as const;

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

export function isNotificationType(
	notificationType: unknown,
): notificationType is NotificationTypes {
	return NOTIFICATION_TYPE_VALUES.includes(notificationType as NotificationTypes);
}

export function isNotificationOffset(
	notificationType: unknown,
): notificationType is NotificationOffset {
	return NOTIFICATION_OFFSETS.includes(notificationType as NotificationOffset);
}

export default class Notification {
	public readonly guildId: NotificationData["guildId"];

	public readonly type!: NotificationData["type"];

	public channelId!: NotificationData["channelId"];

	public roleId!: NotificationData["roleId"];

	public offset!: NotificationData["offset"];

	public sendable!: NotificationData["sendable"];

	public constructor(notification: NotificationPacket) {
		this.guildId = notification.guild_id;
		this.patch(notification);
	}

	private patch(data: NotificationPatchData) {
		this.channelId = data.channel_id;
		this.roleId = data.role_id;
		this.offset = data.offset;
		this.sendable = data.sendable;
	}

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached"> | StringSelectMenuInteraction<"cached">,
		data: NotificationData,
	) {
		await pg<NotificationPacket>(Table.Notifications)
			.insert(
				{
					guild_id: data.guildId,
					type: data.type,
					channel_id: data.channelId,
					role_id: data.roleId,
					offset: data.offset,
					sendable: data.sendable,
				},
				"*",
			)
			.onConflict(["guild_id", "type"])
			.merge();

		const responseObject = {
			components: [],
			content: "Notifications have been modified.",
			embeds: [await this.embed(interaction)],
		};

		await (interaction instanceof ChatInputCommandInteraction
			? interaction.reply({ ...responseObject, flags: MessageFlags.Ephemeral })
			: interaction.update(responseObject));
	}

	public static async unset(
		interaction: ChatInputCommandInteraction<"cached">,
		notificationType: NotificationTypes,
	) {
		const { guildId } = interaction;

		await pg<NotificationPacket>(Table.Notifications)
			.delete()
			.where({ guild_id: guildId, type: notificationType });

		await interaction.reply({
			content: "Notifications have been modified.",
			embeds: [await Notification.embed(interaction)],
			flags: MessageFlags.Ephemeral,
		});
	}

	public static async delete(guildId: Snowflake) {
		await pg<NotificationPacket>(Table.Notifications).delete().where({ guild_id: guildId });
	}

	public static async checkSendable(client: Client<true>, guildId: Snowflake) {
		// Can the guild be accessed?
		const guild = client.guilds.cache.get(guildId);

		if (!guild) {
			// Just nuke everything.
			await this.delete(guildId);
			return;
		}

		const notificationPackets = await pg<NotificationPacket>(Table.Notifications)
			.select(["guild_id", "type", "channel_id", "role_id"])
			.where({ guild_id: guildId });

		const me = await guild.members.fetchMe();

		// Check if we can still send to all the guild's notification channels.
		const promises = notificationPackets.map((notificationPacket) =>
			pg<NotificationPacket>(Table.Notifications)
				.update({
					sendable: this.isSendable(me, notificationPacket.channel_id, notificationPacket.role_id),
				})
				.where({ guild_id: notificationPacket.guild_id })
				.returning("*"),
		);

		await Promise.all(promises);
	}

	private static isSendable(
		me: GuildMember,
		channelId: Snowflake | null,
		roleId: Snowflake | null,
	) {
		if (!(channelId && roleId)) {
			return false;
		}

		const channel = me.guild.channels.cache.get(channelId);
		const role = me.guild.roles.cache.get(roleId);

		return Boolean(
			channel &&
				isNotificationChannel(channel) &&
				role &&
				isNotificationSendable(channel, role, me),
		);
	}

	public static async embed(
		interaction: ChatInputCommandInteraction<"cached"> | StringSelectMenuInteraction<"cached">,
	) {
		const { locale } = interaction;

		const notificationPackets = await pg<NotificationPacket>(Table.Notifications)
			.select(["type", "channel_id", "role_id", "offset", "sendable"])
			.where({ guild_id: interaction.guildId });

		return new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setFields(
				NOTIFICATION_TYPE_VALUES.map((notificationType) => ({
					name: t(`notification-types.${notificationType}`, {
						lng: locale,
						ns: "general",
					}),
					value: this.overviewValue(this.getOverviewPacket(notificationPackets, notificationType)),
					inline: true,
				})),
			)
			.setTitle(interaction.guild.name);
	}

	private static getOverviewPacket(
		notificationPackets: Pick<
			NotificationPacket,
			"type" | "channel_id" | "role_id" | "offset" | "sendable"
		>[],
		notificationType: NotificationTypes,
	) {
		return notificationPackets.find((packet) => packet.type === notificationType);
	}

	private static overviewValue(
		notificationPacket?: Pick<
			NotificationPacket,
			"type" | "channel_id" | "role_id" | "offset" | "sendable"
		>,
	) {
		const channelId = notificationPacket?.channel_id;
		const roleId = notificationPacket?.role_id;
		const offset = notificationPacket?.offset;
		const sendable = notificationPacket?.sendable;

		return [
			channelId ? channelMention(channelId) : "No channel",
			roleId ? roleMention(roleId) : "No role",
			sendable
				? `Sending! ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`
				: `Stopped! ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`,
			`Offset: ${offset ?? "N/A"}`,
		].join("\n");
	}
}
