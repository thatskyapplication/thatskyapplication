import {
	type APIChannel,
	type APIChatInputApplicationCommandInteraction,
	type APIGuildMember,
	type APIMessageComponentSelectMenuInteraction,
	type APISelectMenuOption,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import { t } from "i18next";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { NotificationAllowedChannel, NotificationPacket } from "../models/Notification.js";
import type { Guild } from "../models/discord/guild.js";
import type { Role } from "../models/discord/role.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE,
	NOTIFICATION_CHANNEL_TYPES,
	NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
	NOTIFICATION_TYPE_VALUES,
	NOT_IN_CACHED_GUILD_RESPONSE,
	NotificationOffsetToMaximumValues,
	type NotificationTypes,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji } from "../utility/emojis.js";
import { isCommunicationDisabled } from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";

function isNotificationChannel(channel: APIChannel): channel is NotificationAllowedChannel {
	return NOTIFICATION_CHANNEL_TYPES.includes(
		channel.type as (typeof NOTIFICATION_CHANNEL_TYPES)[number],
	);
}

function isNotificationSendable(
	guild: Guild,
	channel: NotificationAllowedChannel,
	role: Role,
	me: APIGuildMember,
	returnErrors: true,
): string[];

function isNotificationSendable(
	guild: Guild,
	channel: NotificationAllowedChannel,
	role: Role,
	me: APIGuildMember,
	returnErrors?: false,
): boolean;

function isNotificationSendable(
	guild: Guild,
	channel: NotificationAllowedChannel,
	role: Role,
	me: APIGuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (isCommunicationDisabled(me)) {
		errors.push("I am timed out.");
	}

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		errors.push(`\`View Channel\` & \`Send Messages\` are required for <#${channel.id}>.`);
	}

	if (
		!(
			can({ permission: PermissionFlagsBits.MentionEveryone, guild, member: me, channel }) ||
			role.mentionable
		)
	) {
		errors.push(
			`Cannot mention the <@${role.id}> role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for <@${me.user.id}> in the channel or make the role mentionable.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

function isNotificationType(notificationType: unknown): notificationType is NotificationTypes {
	return NOTIFICATION_TYPE_VALUES.includes(notificationType as NotificationTypes);
}

export async function setup(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	const guild = interaction.guild_id && GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const { locale } = interaction;
	const notificationType = options.getInteger("notification", true);
	const channel = CHANNEL_CACHE.get(options.getChannel("channel", true).id);

	if (!(channel && isNotificationChannel(channel))) {
		pino.error(interaction, "Received an unknown channel type whilst setting up notifications.");
		throw new Error("Received an unknown channel type whilst setting up notifications.");
	}

	const role = options.getRole("role", true);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await client.api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE);
		return;
	}

	if (role.id === interaction.guild_id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("notifications.setup.no-everyone", { lng: locale, ns: "commands" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await client.api.guilds.getMember(guild.id, APPLICATION_ID);
	const notificationSendable = isNotificationSendable(guild, channel, role, me, true);

	if (notificationSendable.length > 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: notificationSendable.join("\n"),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const stringSelectMenuOptions = [];
	const maximumOffset = NotificationOffsetToMaximumValues[notificationType];

	for (let index = 0; index <= maximumOffset; index++) {
		const indexString = String(index);

		const stringSelectMenuOption: APISelectMenuOption = {
			label: indexString,
			value: indexString,
		};

		if (index === 0) {
			stringSelectMenuOption.description = "Notify as soon as the event occurs.";
		}

		stringSelectMenuOptions.push(stringSelectMenuOption);
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: `${NOTIFICATION_SETUP_OFFSET_CUSTOM_ID}§${notificationType}§${channel.id}§${role.id}`,
						max_values: 1,
						min_values: 1,
						options: stringSelectMenuOptions,
						placeholder: "Offset notification by how many minutes?",
					},
				],
			},
		],
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				description:
					"You may choose a custom offset. This will decide how many minutes prior notifications will be delivered.",
				title: t(`notification-types.${notificationType}`, { lng: locale, ns: "general" }),
			},
		],
		flags: MessageFlags.Ephemeral,
	});
}

export async function finaliseSetup(interaction: APIMessageComponentSelectMenuInteraction) {
	const guild = interaction.guild_id && GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);
		return;
	}

	const [, rawNotificationType, channelId, roleId] = interaction.data.custom_id.split("§");
	const notificationType = Number(rawNotificationType);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, ERROR_RESPONSE);
		return;
	}

	await pg<NotificationPacket>(Table.Notifications)
		.insert({
			guild_id: guild.id,
			type: notificationType,
			channel_id: channelId!,
			role_id: roleId!,
			offset: Number(interaction.data.values[0]),
			sendable: true,
		})
		.onConflict(["guild_id", "type"])
		.merge();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [],
		content: "Notifications have been modified.",
		embeds: [await embed(interaction)],
	});
}

export async function status(interaction: APIChatInputApplicationCommandInteraction) {
	await client.api.interactions.reply(interaction.id, interaction.token, {
		embeds: [await embed(interaction)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function unset(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	const guild = interaction.guild_id && GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);
		return;
	}

	const notificationType = options.getInteger("notification", true);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await client.api.interactions.reply(interaction.id, interaction.token, ERROR_RESPONSE);
		return;
	}

	await pg<NotificationPacket>(Table.Notifications)
		.delete()
		.where({ guild_id: guild.id, type: notificationType });

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: "Notifications have been modified.",
		embeds: [await embed(interaction)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function deleteNotifications(guildId: Snowflake) {
	await pg<NotificationPacket>(Table.Notifications).delete().where({ guild_id: guildId });
}

export async function checkSendable(guildId: Snowflake) {
	// Can the guild be accessed?
	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
		// Just nuke everything.
		await deleteNotifications(guildId);
		return;
	}

	const notificationPackets = await pg<NotificationPacket>(Table.Notifications)
		.select(["guild_id", "type", "channel_id", "role_id"])
		.where({ guild_id: guildId });

	const me = await client.api.guilds.getMember(guildId, APPLICATION_ID);

	// Check if we can still send to all the guild's notification channels.
	const promises = notificationPackets.map((notificationPacket) =>
		pg<NotificationPacket>(Table.Notifications)
			.update({
				sendable: isSendable(me, guild, notificationPacket.channel_id, notificationPacket.role_id),
			})
			.where({ guild_id: notificationPacket.guild_id, type: notificationPacket.type })
			.returning("*"),
	);

	await Promise.all(promises);
}

function isSendable(
	me: APIGuildMember,
	guild: Guild,
	channelId: Snowflake | null,
	roleId: Snowflake | null,
) {
	if (!(channelId && roleId)) {
		return false;
	}

	const channel = CHANNEL_CACHE.get(channelId);
	const role = guild.roles.find((role) => role.id === roleId);

	return Boolean(
		channel &&
			isNotificationChannel(channel) &&
			role &&
			isNotificationSendable(guild, channel, role, me),
	);
}

async function embed(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const guild = interaction.guild_id && GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.error(interaction, "Guild not found for notification embed.");
		throw new Error("Guild not found for notification embed.");
	}

	const { locale } = interaction;

	const notificationPackets = await pg<NotificationPacket>(Table.Notifications)
		.select(["type", "channel_id", "role_id", "offset", "sendable"])
		.where({ guild_id: guild.id });

	return {
		color: DEFAULT_EMBED_COLOUR,
		fields: NOTIFICATION_TYPE_VALUES.map((notificationType) => ({
			name: t(`notification-types.${notificationType}`, {
				lng: locale,
				ns: "general",
			}),
			value: overviewValue(getOverviewPacket(notificationPackets, notificationType)),
			inline: true,
		})),

		title: guild.name,
	};
}

function getOverviewPacket(
	notificationPackets: Pick<
		NotificationPacket,
		"type" | "channel_id" | "role_id" | "offset" | "sendable"
	>[],
	notificationType: NotificationTypes,
) {
	return notificationPackets.find((packet) => packet.type === notificationType);
}

function overviewValue(
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
		channelId ? `<#${channelId}>` : "No channel",
		roleId ? `<@&${roleId}>` : "No role",
		sendable
			? `Sending! ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`
			: `Stopped! ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`,
		`Offset: ${offset ?? "N/A"}`,
	].join("\n");
}
