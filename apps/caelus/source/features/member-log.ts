import {
	type APIChannel,
	ChannelType,
	type GatewayGuildMemberAddDispatchData,
	type GatewayGuildMemberRemoveDispatchData,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import { MEMBER_LOG_CHANNEL_ID } from "../utility/configuration.js";
import { avatarURL, userTag } from "../utility/functions.js";
import { can } from "../utility/permissions.js";

const MEMBER_LOG_CHANNEL_TYPES = [ChannelType.GuildText] as const;
const MEMBER_LOG_LEAVE_COLOUR = 0x000000 as const;

function skyProfileURL(userId: Snowflake) {
	return new URL(userId, WEBSITE_URL).href;
}

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
	me: GuildMember,
	returnErrors: true,
): string[];

export function isMemberLogSendable(
	guild: Guild,
	channel: MemberLogAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

export function isMemberLogSendable(
	guild: Guild,
	channel: MemberLogAllowedChannel,
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

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
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

interface MemberLogSendJoinLeaveOptions {
	guild: Guild;
	member: GatewayGuildMemberAddDispatchData | GatewayGuildMemberRemoveDispatchData;
	leftTimestamp?: number;
}

export async function memberLogSendJoinLeave({
	guild,
	member,
	leftTimestamp,
}: MemberLogSendJoinLeaveOptions) {
	const channel = guild.channels.get(MEMBER_LOG_CHANNEL_ID);

	if (!(channel && isMemberLogChannel(channel))) {
		throw new Error("Failed to find a channel to send a member log in.");
	}

	if (!isMemberLogSendable(guild, channel, await guild.fetchMe())) {
		throw new Error("Failed to send a member log.");
	}

	const { user } = member;

	const createdTimestamp = Math.floor(
		Number(DiscordSnowflake.deconstruct(user.id).timestamp / 1000n),
	);

	const description = [
		`User: <@${user.id}> (${userTag(user)})`,
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

	await client.api.channels.createMessage(MEMBER_LOG_CHANNEL_ID, {
		embeds: [
			{
				author: {
					name: user.username,
					icon_url: avatarURL(user),
					url: skyProfileURL(user.id),
				},
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
