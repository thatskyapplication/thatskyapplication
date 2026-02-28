import {
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APISelectMenuOption,
	ButtonStyle,
	ComponentType,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	SelectMenuDefaultValueType,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import {
	formatEmoji,
	NOTIFICATION_TYPE_VALUES,
	type NotificationPacket,
	type NotificationTypes,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { Role } from "../models/discord/role.js";
import pg from "../pg.js";
import pino from "../pino.js";
import {
	NOTIFICATION_CHANNEL_TYPES,
	NotificationOffsetToMaximumValues,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { notInCachedGuildResponse } from "../utility/functions.js";
import { can } from "../utility/permissions.js";

type NotificationAllowedChannel = Extract<
	APIChannel,
	{ type: (typeof NOTIFICATION_CHANNEL_TYPES)[number] }
>;

function isNotificationChannel(channel: APIChannel): channel is NotificationAllowedChannel {
	return NOTIFICATION_CHANNEL_TYPES.includes(
		channel.type as (typeof NOTIFICATION_CHANNEL_TYPES)[number],
	);
}

function isNotificationSendable(
	guild: Guild,
	channel: NotificationAllowedChannel,
	role: Role,
	me: GuildMember,
	returnErrors: true,
): string[];

function isNotificationSendable(
	guild: Guild,
	channel: NotificationAllowedChannel,
	role: Role,
	me: GuildMember,
	returnErrors?: false,
): boolean;

function isNotificationSendable(
	guild: Guild,
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
			`Cannot mention the <@&${role.id}> role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for <@${me.user.id}> in <#${channel.id}> or make the role mentionable.`,
		);
	}

	return returnErrors ? errors : errors.length === 0;
}

export function isNotificationType(
	notificationType: number,
): notificationType is NotificationTypes {
	return NOTIFICATION_TYPE_VALUES.includes(notificationType as NotificationTypes);
}

interface NotificationsSetupOptions {
	guild: Guild;
	type: NotificationTypes;
	channelId?: Snowflake | null;
	roleId?: Snowflake | null;
	offset?: number | null;
}

type NotificationsSetupPayload = Pick<
	NotificationPacket,
	"guild_id" | "type" | "sendable" | "locale"
> &
	Partial<Pick<NotificationPacket, "channel_id" | "role_id" | "offset">>;

async function setup({ guild, type, channelId, roleId, offset }: NotificationsSetupOptions) {
	const notificationPacket = await pg<NotificationPacket>(Table.Notifications)
		.select("channel_id", "role_id", "offset")
		.where({ guild_id: guild.id, type })
		.first();

	const payload: NotificationsSetupPayload = {
		guild_id: guild.id,
		type,
		sendable: isSendable(
			await guild.fetchMe(),
			guild,
			channelId === undefined ? notificationPacket?.channel_id : channelId,
			roleId === undefined ? notificationPacket?.role_id : roleId,
			offset === undefined ? notificationPacket?.offset : offset,
		),
		locale: guild.preferredLocale,
	};

	const merge: (keyof Pick<
		NotificationsSetupPayload,
		"channel_id" | "role_id" | "offset" | "sendable"
	>)[] = ["sendable"];

	if (channelId !== undefined) {
		payload.channel_id = channelId;
		merge.push("channel_id");
	}

	if (roleId !== undefined) {
		payload.role_id = roleId;
		merge.push("role_id");
	}

	if (offset !== undefined) {
		payload.offset = offset;
		merge.push("offset");
	}

	await pg<NotificationPacket>(Table.Notifications)
		.insert(payload)
		.onConflict(["guild_id", "type"])
		.merge(merge);
}

export async function setupResponse(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	guild: Guild,
): Promise<APIInteractionResponseCallbackData> {
	const notificationsPackets = await pg<NotificationPacket>(Table.Notifications)
		.select("type", "channel_id", "role_id", "offset")
		.where({ guild_id: interaction.guild_id });

	const notificationsMap = notificationsPackets.reduce(
		(notifications, notificationsPacket) =>
			notifications.set(notificationsPacket.type as NotificationTypes, notificationsPacket),
		new Map<
			NotificationTypes,
			Pick<NotificationPacket, "channel_id" | "type" | "offset" | "role_id">
		>(),
	);

	const me = await guild.fetchMe();

	return {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content:
							"## [Notifications](https://guide.thatskyapplication.com/caelus/notifications)",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content:
							"You may choose a channel to receive notifications in! Use the select menu below to select a notification type.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: CustomId.NotificationsSetup,
								options: NOTIFICATION_TYPE_VALUES.map((notificationType) => {
									const notification = notificationsMap.get(notificationType);

									return {
										description: notification
											? isSendable(
													me,
													guild,
													notification.channel_id,
													notification.role_id,
													notification.offset,
												)
												? "Sending!"
												: "Stopped. View to see why."
											: "Not set up.",
										label: t(`notification-types.${notificationType}`, {
											lng: interaction.locale,
											ns: "general",
										}),
										value: String(notificationType),
									};
								}),
								max_values: 1,
								min_values: 0,
								placeholder: "Select a notification type.",
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

export async function displayNotificationType(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	notificationType: NotificationTypes,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(interaction.locale),
		);

		return;
	}

	if (!isNotificationType(notificationType)) {
		throw new Error("Received an unknown notification type whilst setting up notifications.");
	}

	const notificationsPacket = await pg<NotificationPacket>(Table.Notifications)
		.select("channel_id", "role_id", "offset")
		.where({ guild_id: interaction.guild_id, type: notificationType })
		.first();

	const stringSelectMenuOptions = [];
	const maximumOffset = NotificationOffsetToMaximumValues[notificationType];
	const offset = notificationsPacket?.offset;

	for (let index = 0; index <= maximumOffset; index++) {
		const indexString = String(index);

		const stringSelectMenuOption: APISelectMenuOption = {
			default: offset === index,
			label: indexString,
			value: indexString,
		};

		if (index === 0) {
			stringSelectMenuOption.description = "Notify as soon as the event occurs.";
		}

		stringSelectMenuOptions.push(stringSelectMenuOption);
	}

	const channelId = notificationsPacket?.channel_id;
	const roleId = notificationsPacket?.role_id;
	const channel = channelId ? guild.channels.get(channelId) : null;
	const role = roleId ? guild.roles.get(roleId) : null;
	const feedback = [];

	if (channel && role) {
		if (isNotificationChannel(channel)) {
			feedback.push(...isNotificationSendable(guild, channel, role, await guild.fetchMe(), true));
		} else {
			feedback.push("No channel detected. Was it deleted?");
		}
	} else {
		feedback.push("A channel and a role is required.");
	}

	if (typeof offset !== "number") {
		feedback.push("An offset is required.");
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## ${t(`notification-types.${notificationType}`, { lng: interaction.locale, ns: "general" })}`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: t("notifications.edit-information", {
							lng: interaction.locale,
							ns: "features",
						}),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: `${CustomId.NotificationsSetupChannel}§${notificationType}`,
								// @ts-expect-error The mutable array error is fine.
								channel_types: NOTIFICATION_CHANNEL_TYPES,
								default_values: channelId
									? [{ id: channelId, type: SelectMenuDefaultValueType.Channel }]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: t("notifications.edit-channel-channel-select-menu-placeholder", {
									lng: interaction.locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.RoleSelect,
								custom_id: `${CustomId.NotificationsSetupRole}§${notificationType}`,
								default_values: roleId
									? [{ id: roleId, type: SelectMenuDefaultValueType.Role }]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: t("notifications.edit-role-role-select-menu-placeholder", {
									lng: interaction.locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CustomId.NotificationsSetupOffset}§${notificationType}`,
								options: stringSelectMenuOptions,
								max_values: 1,
								min_values: 0,
								placeholder: t("notifications.edit-offset-string-select-menu-placeholder", {
									lng: interaction.locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.TextDisplay,
						content:
							feedback.length > 0
								? `Stopped ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}\n${feedback.length > 1 ? feedback.map((string) => `- ${string}`).join("\n") : feedback[0]}`
								: `Sending ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								style: ButtonStyle.Primary,
								custom_id: CustomId.NotificationsViewSetup,
								emoji: { name: "⏪" },
								label: t("notifications.back", { lng: interaction.locale, ns: "features" }),
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	});
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(interaction.locale),
		);

		return;
	}

	const customId = interaction.data.custom_id;
	const notificationTypeString = customId.slice(customId.indexOf("§") + 1);
	const notificationType = Number(notificationTypeString);

	if (!isNotificationType(notificationType)) {
		throw new Error("Received an unknown notification type whilst setting up notifications.");
	}

	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId);

		if (!(channel && isNotificationChannel(channel))) {
			throw new Error("Received an unknown channel type whilst setting up notifications.");
		}
	}

	await setup({ guild, type: notificationType, channelId: channelId ?? null });
	await displayNotificationType(interaction, notificationType);
}

export async function handleRoleSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(interaction.locale),
		);

		return;
	}

	const customId = interaction.data.custom_id;
	const notificationTypeString = customId.slice(customId.indexOf("§") + 1);
	const notificationType = Number(notificationTypeString);

	if (!isNotificationType(notificationType)) {
		throw new Error("Received an unknown notification type whilst setting up notifications.");
	}

	const [roleId] = interaction.data.values;
	await setup({ guild, type: notificationType, roleId: roleId ?? null });
	await displayNotificationType(interaction, notificationType);
}

export async function handleStringSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(interaction.locale),
		);

		return;
	}

	const customId = interaction.data.custom_id;
	const notificationTypeString = customId.slice(customId.indexOf("§") + 1);
	const notificationType = Number(notificationTypeString);

	if (!isNotificationType(notificationType)) {
		throw new Error("Received an unknown notification type whilst setting up notifications.");
	}

	const [offset] = interaction.data.values;

	await setup({
		guild,
		type: notificationType,
		offset: offset === undefined ? null : Number(offset),
	});

	await displayNotificationType(interaction, notificationType);
}

async function deleteNotifications(guildId: Snowflake) {
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
		.select(["guild_id", "type", "channel_id", "role_id", "offset"])
		.where({ guild_id: guildId });

	const me = await guild.fetchMe();

	// Check if we can still send to all the guild's notification channels.
	const promises = notificationPackets.map((notificationPacket) =>
		pg<NotificationPacket>(Table.Notifications)
			.update({
				sendable: isSendable(
					me,
					guild,
					notificationPacket.channel_id,
					notificationPacket.role_id,
					notificationPacket.offset,
				),
				locale: guild.preferredLocale,
			})
			.where({ guild_id: notificationPacket.guild_id, type: notificationPacket.type }),
	);

	await Promise.all(promises);
}

export async function updateLocale(guildId: Snowflake, locale: Locale) {
	await pg<NotificationPacket>(Table.Notifications).update({ locale }).where({ guild_id: guildId });
}

function isSendable(
	me: GuildMember,
	guild: Guild,
	channelId: Snowflake | undefined | null,
	roleId: Snowflake | undefined | null,
	offset: number | undefined | null,
) {
	if (!(channelId && roleId && typeof offset === "number")) {
		return false;
	}

	const channel = guild.channels.get(channelId);
	const role = guild.roles.get(roleId);

	return Boolean(
		channel &&
			isNotificationChannel(channel) &&
			role &&
			isNotificationSendable(guild, channel, role, me),
	);
}
