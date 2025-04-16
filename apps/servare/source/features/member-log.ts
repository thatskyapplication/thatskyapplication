import {
	type APIChannel,
	type APIGuildInteractionWrapper,
	type APIGuildMember,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentSelectMenuInteraction,
	ComponentType,
	type GatewayGuildMemberAddDispatchData,
	type GatewayGuildMemberRemoveDispatchData,
	MessageFlags,
	PermissionFlagsBits,
	SelectMenuDefaultValueType,
	type Snowflake,
} from "@discordjs/core";
import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_EMBED_COLOUR,
	MEMBER_LOG_CHANNEL_TYPES,
	MEMBER_LOG_LEAVE_COLOUR,
} from "../utility/constants.js";
import { skyProfileWebsiteURL } from "../utility/functions.js";
import { can } from "../utility/permissions.js";
import { CustomId, schemaStore } from "../utility/string-store.js";
import type { GuildSettingsPacket } from "./guild-settings.js";

type MemberLogAllowedChannel = Extract<
	APIChannel,
	{ type: (typeof MEMBER_LOG_CHANNEL_TYPES)[number] }
>;

export function isMemberLogChannel(channel: APIChannel): channel is MemberLogAllowedChannel {
	return MEMBER_LOG_CHANNEL_TYPES.includes(
		channel.type as (typeof MEMBER_LOG_CHANNEL_TYPES)[number],
	);
}

export function isMemberLogSendable(
	guild: Guild,
	channel: MemberLogAllowedChannel,
	me: APIGuildMember,
	returnErrors: true,
): string[];

export function isMemberLogSendable(
	guild: Guild,
	channel: MemberLogAllowedChannel,
	me: APIGuildMember,
	returnErrors?: false,
): boolean;

export function isMemberLogSendable(
	guild: Guild,
	channel: MemberLogAllowedChannel,
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
		errors.push(`\`View Channel\` & \`Send Messages\` are required for <#${channel.id}>.`);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

interface MemberLogSetupOptions {
	guildId: Snowflake;
	channelId: Snowflake | null;
}

export async function setup({ guildId, channelId }: MemberLogSetupOptions) {
	await pg<GuildSettingsPacket>(Table.GuildSettings)
		.insert({ guild_id: guildId, member_log_channel_id: channelId })
		.onConflict("guild_id")
		.merge();
}

export async function setupResponse(
	guildId: Snowflake,
): Promise<APIInteractionResponseCallbackData> {
	const memberLogPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select("member_log_channel_id")
		.where({ guild_id: guildId })
		.first();

	return {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.ChannelSelect,
						custom_id: schemaStore.serialize(CustomId.MemberLog, {}).toString(),
						// @ts-expect-error The mutable array error is fine.
						channel_types: MEMBER_LOG_CHANNEL_TYPES,
						default_values: memberLogPacket?.member_log_channel_id
							? [
									{
										id: memberLogPacket.member_log_channel_id,
										type: SelectMenuDefaultValueType.Channel,
									},
								]
							: [],
						min_values: 0,
						placeholder: "Select a channel to use for the member log.",
					},
				],
			},
		],
		embeds: [
			{
				title: "Member Log",
				description:
					"Choose a channel to receive updates regarding accounts joining and leaving the server.\n\nYou can also click their username to view their Sky profile.",
				color: DEFAULT_EMBED_COLOUR,
			},
		],
		flags: MessageFlags.Ephemeral,
	};
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	guild: Guild,
) {
	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId);

		if (!(channel && isMemberLogChannel(channel))) {
			pino.error(interaction, "Received an unknown channel type whilst setting up the member log.");
			throw new Error("Received an unknown channel type whilst setting up the member log.");
		}

		const memberLogSendable = isMemberLogSendable(guild, channel, await guild.fetchMe(), true);

		if (memberLogSendable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: memberLogSendable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	await setup({ guildId: interaction.guild_id, channelId: channelId ?? null });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.guild_id),
	);
}

function embedTintFactor(duration: number) {
	const percent = Math.min(duration / (2_419_200 / 100), 100);
	let red: number;
	let green: number;
	let blue = 0;

	if (percent < 50) {
		red = 255;
		green = Math.round(5.1 * percent);
	} else {
		green = 255;
		red = Math.round(510 - 5.1 * percent);
	}

	const tintFactor = 0.3;
	red += (255 - red) * tintFactor;
	green += (255 - green) * tintFactor;
	blue += (255 - blue) * tintFactor;
	return Math.trunc((red << 16) + (green << 8) + blue);
}

export async function sendJoinLeave(
	member: GatewayGuildMemberAddDispatchData | GatewayGuildMemberRemoveDispatchData,
	leftTimestamp?: number,
) {
	const memberLogPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.where({ guild_id: member.guild_id })
		.first();

	if (!memberLogPacket?.member_log_channel_id) {
		return;
	}

	const guild = GUILD_CACHE.get(member.guild_id);

	if (!guild) {
		pino.error({ member, leftTimestamp }, "Failed to find a guild to start send a member log in.");
		return;
	}

	const channel = guild.channels.get(memberLogPacket.member_log_channel_id);

	if (!(channel && isMemberLogChannel(channel))) {
		pino.error({ member, leftTimestamp }, "Failed to find a channel to send a member log in.");
		return;
	}

	if (!isMemberLogSendable(guild, channel, await guild.fetchMe())) {
		return;
	}

	const { user } = member;

	const index =
		user.discriminator === "0"
			? calculateUserDefaultAvatarIndex(user.id)
			: Number(user.discriminator) % 5;

	const iconURL = user.avatar
		? client.rest.cdn.avatar(user.id, user.avatar)
		: client.rest.cdn.defaultAvatar(index);

	const createdTimestamp = Math.floor(
		Number(DiscordSnowflake.deconstruct(user.id).timestamp / 1000n),
	);

	const description = [
		`User: <@${user.id}> (${user.discriminator === "0" ? user.username : `${user.username}#${user.discriminator}`})`,
		`Created: <t:${createdTimestamp}:F> (<t:${createdTimestamp}:R>)`,
	];

	const joinedAt = "joined_at" in member ? member.joined_at : null;

	if (joinedAt) {
		const joinedTimestamp = Math.floor(Date.parse(joinedAt) / 1000);
		description.push(`Joined <t:${joinedTimestamp}:F> (<t:${joinedTimestamp}:R>)`);
	}

	if (leftTimestamp) {
		const left = Math.floor(leftTimestamp / 1000);
		description.push(`Left <t:${left}:F> (<t:${left}:R>)`);
	}

	await client.api.channels.createMessage(memberLogPacket.member_log_channel_id, {
		embeds: [
			{
				author: { name: user.username, icon_url: iconURL, url: skyProfileWebsiteURL(user.id) },
				description: description.join("\n"),
				color: leftTimestamp
					? MEMBER_LOG_LEAVE_COLOUR
					: embedTintFactor(Date.now() - createdTimestamp),
				footer: { text: leftTimestamp ? "Left" : "Joined" },
				timestamp: leftTimestamp ? new Date(leftTimestamp).toISOString() : joinedAt!,
			},
		],
	});
}
