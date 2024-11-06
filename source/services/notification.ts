import {
	type API,
	type APIChannel,
	type APIGuild,
	type APIGuildMember,
	type APIRole,
	MessageFlags,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import { t } from "i18next";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import type { NotificationAllowedChannel, NotificationPacket } from "../models/Notification.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE,
	NOTIFICATION_CHANNEL_TYPES,
	NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
	NOTIFICATION_TYPE_VALUES,
	NotificationOffsetToMaximumValues,
	type NotificationTypes,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { can } from "../utility/permissions.js";

function isNotificationChannel(channel: APIChannel): channel is NotificationAllowedChannel {
	return NOTIFICATION_CHANNEL_TYPES.includes(
		channel.type as (typeof NOTIFICATION_CHANNEL_TYPES)[number],
	);
}

function isNotificationSendable(
	guild: APIGuild,
	channel: NotificationAllowedChannel,
	role: APIRole,
	me: APIGuildMember,
	returnErrors: true,
): string[];

function isNotificationSendable(
	guild: APIGuild,
	channel: NotificationAllowedChannel,
	role: APIRole,
	me: APIGuildMember,
	returnErrors?: false,
): boolean;

function isNotificationSendable(
	guild: APIGuild,
	channel: NotificationAllowedChannel,
	role: APIRole,
	me: APIGuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (me.communication_disabled_until && Date.parse(me.communication_disabled_until) > Date.now()) {
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
		errors.push(`\`View Channel\` & \`Send Messages\` are required for ${channel}.`);
	}

	if (
		!(
			can({ permission: PermissionFlagsBits.MentionEveryone, guild, member: me, channel }) ||
			role.mentionable
		)
	) {
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

function isNotificationType(notificationType: unknown): notificationType is NotificationTypes {
	return NOTIFICATION_TYPE_VALUES.includes(notificationType as NotificationTypes);
}

export async function setup(interaction: ChatInputCommandInteraction<"cached">) {
	const { locale, options } = interaction;
	const notificationType = options.getInteger("notification", true);
	const channel = options.getChannel("channel", true, NOTIFICATION_CHANNEL_TYPES);
	const role = options.getRole("role", true);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await interaction.reply(ERROR_RESPONSE);
		return;
	}

	if (role.id === interaction.guildId) {
		await interaction.reply({
			content: t("notifications.setup.no-everyone", { lng: locale, ns: "commands" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await channel.guild.members.fetchMe();
	const notificationSendable = isNotificationSendable(channel, role, me, true);

	if (notificationSendable.length > 0) {
		await interaction.reply({
			content: notificationSendable.join("\n"),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const stringSelectMenuOptions = [];
	const maximumOffset = NotificationOffsetToMaximumValues[notificationType];

	for (let index = 0; index <= maximumOffset; index++) {
		const indexString = String(index);

		const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
			.setLabel(indexString)
			.setValue(indexString);

		if (index === 0) {
			stringSelectMenuOptionBuilder.setDescription("Notify as soon as the event occurs.");
		}

		stringSelectMenuOptions.push(stringSelectMenuOptionBuilder);
	}

	const message = await interaction.reply({
		components: [
			new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(NOTIFICATION_SETUP_OFFSET_CUSTOM_ID)
					.setMaxValues(1)
					.setMinValues(1)
					.setOptions(stringSelectMenuOptions)
					.setPlaceholder("Offset notification by how many minutes?"),
			),
		],
		embeds: [
			new EmbedBuilder()
				.setColor(DEFAULT_EMBED_COLOUR)
				.setDescription(
					"You may choose a custom offset. This will decide how many minutes prior notifications will be delivered.",
				)
				.setTitle(t(`notification-types.${notificationType}`, { lng: locale, ns: "general" })),
		],
		fetchReply: true,
		flags: MessageFlags.Ephemeral,
	});

	let stringSelectMenuInteraction: StringSelectMenuInteraction<"cached">;
	let offset: number;

	try {
		stringSelectMenuInteraction = await message.awaitMessageComponent({
			componentType: ComponentType.StringSelect,
			filter: (responseInteraction) =>
				responseInteraction.customId === NOTIFICATION_SETUP_OFFSET_CUSTOM_ID,
			time: 60000,
		});

		offset = Number(stringSelectMenuInteraction.values[0]);
	} catch (error) {
		if (
			error instanceof DiscordjsError &&
			error.code === DiscordjsErrorCodes.InteractionCollectorError
		) {
			await interaction.editReply({
				components: [],
				content:
					"Couldn't make a choice? We've stopped setting up notifications for now. Feel free to try again!",
				embeds: [],
			});

			return;
		}

		pino.error(error, "Error whilst awaiting a response regarding a notification offset.");
		await interaction.editReply(ERROR_RESPONSE);
		return;
	}

	await pg<NotificationPacket>(Table.Notifications)
		.insert({
			guild_id: stringSelectMenuInteraction.guildId,
			type: notificationType,
			channel_id: channel.id,
			role_id: role.id,
			offset,
			sendable: true,
		})
		.onConflict(["guild_id", "type"])
		.merge();

	await stringSelectMenuInteraction.update({
		components: [],
		content: "Notifications have been modified.",
		embeds: [await embed(interaction)],
	});
}

export async function status(interaction: ChatInputCommandInteraction<"cached">) {
	await interaction.reply({
		embeds: [await embed(interaction)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function unset(interaction: ChatInputCommandInteraction<"cached">) {
	const notificationType = interaction.options.getInteger("notification", true);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await interaction.reply(ERROR_RESPONSE);
		return;
	}

	await pg<NotificationPacket>(Table.Notifications)
		.delete()
		.where({ guild_id: interaction.guildId, type: notificationType });

	await interaction.reply({
		content: "Notifications have been modified.",
		embeds: [await embed(interaction)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function deleteNotifications(guildId: Snowflake) {
	await pg<NotificationPacket>(Table.Notifications).delete().where({ guild_id: guildId });
}

export async function checkSendable(api: API, guildId: Snowflake) {
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

	const me = await api.guilds.getMember(guildId, APPLICATION_ID);

	// Check if we can still send to all the guild's notification channels.
	const promises = notificationPackets.map((notificationPacket) =>
		pg<NotificationPacket>(Table.Notifications)
			.update({
				sendable: isSendable(
					me,
					guildId,
					notificationPacket.channel_id,
					notificationPacket.role_id,
				),
			})
			.where({ guild_id: notificationPacket.guild_id, type: notificationPacket.type })
			.returning("*"),
	);

	await Promise.all(promises);
}

function isSendable(
	me: APIGuildMember,
	guildId: Snowflake,
	channelId: Snowflake | null,
	roleId: Snowflake | null,
) {
	if (!(channelId && roleId)) {
		return false;
	}

	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
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
				value: overviewValue(getOverviewPacket(notificationPackets, notificationType)),
				inline: true,
			})),
		)
		.setTitle(interaction.guild.name);
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
		channelId ? channelMention(channelId) : "No channel",
		roleId ? roleMention(roleId) : "No role",
		sendable
			? `Sending! ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`
			: `Stopped! ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}`,
		`Offset: ${offset ?? "N/A"}`,
	].join("\n");
}
