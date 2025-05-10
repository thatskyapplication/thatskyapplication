import {
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
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
	NOTIFICATION_TYPE_VALUES,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
	formatEmoji,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { Guild } from "../models/discord/guild.js";
import type { Role } from "../models/discord/role.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE_COMPONENTS_V2,
	NOTIFICATION_CHANNEL_TYPES,
	NOT_IN_CACHED_GUILD_RESPONSE,
	NotificationOffsetToMaximumValues,
	SUPPORT_SERVER_INVITE_URL,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";

export const NOTIFICATIONS_SETUP_CUSTOM_ID = "NOTIFICATIONS_SETUP_CUSTOM_ID" as const;

export const NOTIFICATIONS_SETUP_CHANNEL_CUSTOM_ID =
	"NOTIFICATIONS_SETUP_CHANNEL_CUSTOM_ID" as const;

export const NOTIFICATIONS_SETUP_ROLE_CUSTOM_ID = "NOTIFICATIONS_SETUP_ROLE_CUSTOM_ID" as const;
export const NOTIFICATIONS_SETUP_OFFSET_CUSTOM_ID = "NOTIFICATIONS_SETUP_OFFSET_CUSTOM_ID" as const;
export const NOTIFICATIONS_VIEW_SETUP_CUSTOM_ID = "NOTIFICATIONS_VIEW_SETUP_CUSTOM_ID" as const;

export type NotificationAllowedChannel = Extract<
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
			`Cannot mention the <@${role.id}> role. Ensure \`Mention @everyone, @here and All Roles\` permission is enabled for <@${me.user.id}> in the channel or make the role mentionable.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
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

type NotificationsSetupPayload = Pick<NotificationPacket, "guild_id" | "type" | "sendable"> &
	Partial<Pick<NotificationPacket, "channel_id" | "role_id" | "offset">>;

export async function setup({ guild, type, channelId, roleId, offset }: NotificationsSetupOptions) {
	const notificationPacket = await pg<NotificationPacket>(Table.Notifications)
		.select("channel_id", "role_id")
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
		),
	};

	const merge: (keyof Pick<NotificationsSetupPayload, "channel_id" | "role_id" | "offset">)[] = [];

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

export function setupResponse(locale: Locale): APIInteractionResponseCallbackData {
	return {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Notifications",
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
								custom_id: NOTIFICATIONS_SETUP_CUSTOM_ID,
								options: NOTIFICATION_TYPE_VALUES.map((notificationType) => ({
									label: t(`notification-types.${notificationType}`, {
										lng: locale,
										ns: "general",
									}),
									value: String(notificationType),
								})),
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
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);

		return;
	}

	if (notificationType === NotificationType.AppUpdates) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `App Updates for Sky is an experimental feature that is not available in your server. Visit the [support server](${SUPPORT_SERVER_INVITE_URL}) for more information!`,
			flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
		});

		return;
	}

	const notificationPacket = await pg<NotificationPacket>(Table.Notifications)
		.select("channel_id", "role_id", "offset")
		.where({ guild_id: interaction.guild_id, type: notificationType })
		.first();

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

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
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
						content: "You may choose a channel, role, and offset.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: `${NOTIFICATIONS_SETUP_CHANNEL_CUSTOM_ID}§${notificationType}`,
								// @ts-expect-error The mutable array error is fine.
								channel_types: NOTIFICATION_CHANNEL_TYPES,
								default_values: notificationPacket?.channel_id
									? [
											{
												id: notificationPacket.channel_id,
												type: SelectMenuDefaultValueType.Channel,
											},
										]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: "Select a channel.",
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.RoleSelect,
								custom_id: `${NOTIFICATIONS_SETUP_ROLE_CUSTOM_ID}§${notificationType}`,
								default_values: notificationPacket?.role_id
									? [{ id: notificationPacket.role_id, type: SelectMenuDefaultValueType.Role }]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: "Select a role.",
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: NOTIFICATIONS_SETUP_OFFSET_CUSTOM_ID,
								options: stringSelectMenuOptions,
								max_values: 1,
								min_values: 0,
								placeholder: "Select an offset.",
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								style: ButtonStyle.Primary,
								custom_id: NOTIFICATIONS_VIEW_SETUP_CUSTOM_ID,
								emoji: { name: "⏪" },
								label: t("back", { lng: interaction.locale, ns: "general" }),
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
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const customId = interaction.data.custom_id;
	const notificationTypeString = customId.slice(customId.indexOf("§") + 1);
	const notificationType = Number(notificationTypeString);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);

		return;
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
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const customId = interaction.data.custom_id;
	const notificationTypeString = customId.slice(customId.indexOf("§") + 1);
	const notificationType = Number(notificationTypeString);

	if (!isNotificationType(notificationType)) {
		pino.error(
			interaction,
			"Received an unknown notification type whilst setting up notifications.",
		);

		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);

		return;
	}

	const [roleId] = interaction.data.values;
	await setup({ guild, type: notificationType, roleId: roleId ?? null });
	await displayNotificationType(interaction, notificationType);
}

export async function status(interaction: APIChatInputApplicationCommandGuildInteraction) {
	await client.api.interactions.reply(interaction.id, interaction.token, {
		embeds: [await embed(interaction)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function unset(
	interaction: APIChatInputApplicationCommandGuildInteraction,
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

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);
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

	const me = await guild.fetchMe();

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
	me: GuildMember,
	guild: Guild,
	channelId?: Snowflake | null,
	roleId?: Snowflake | null,
) {
	if (!(channelId && roleId)) {
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

async function embed(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

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
