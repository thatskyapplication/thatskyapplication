import {
	type APIGuildChannel,
	type APIGuildMember,
	type GuildChannelType,
	PermissionFlagsBits,
} from "@discordjs/core";
import type { Guild } from "../models/discord/guild.js";

const ALL_PERMISSIONS = Object.values(PermissionFlagsBits).reduce(
	(bitField, permission) => bitField | permission,
	0n,
);

const computeBasePermissions = ({
	guild,
	member,
}: {
	guild: Guild;
	member: APIGuildMember;
}): bigint => {
	if (guild.ownerId === member.user.id) {
		return ALL_PERMISSIONS;
	}

	const everyoneRole = guild.roles.get(guild.id);

	if (!everyoneRole) {
		throw new Error("No @everyone role found.");
	}

	let permissions = BigInt(everyoneRole.permissions);

	for (const roleId of member.roles) {
		const role = guild.roles.get(roleId);

		if (!role) {
			throw new Error(`Could not find role id ${roleId}.`);
		}

		permissions |= BigInt(role.permissions);
	}

	if (permissions & PermissionFlagsBits.Administrator) {
		return ALL_PERMISSIONS;
	}

	return permissions;
};

const computeOverwrites = ({
	basePermissions,
	guild,
	member,
	channel,
}: {
	basePermissions: bigint;
	guild: Guild;
	member: APIGuildMember;
	channel: APIGuildChannel<GuildChannelType>;
}): bigint => {
	if (basePermissions & PermissionFlagsBits.Administrator) {
		return ALL_PERMISSIONS;
	}

	let permissions = basePermissions;

	const overwritesMap = new Map(
		(channel.permission_overwrites ?? []).map((overwrite) => [overwrite.id, overwrite]),
	);

	const everyoneOverwrite = overwritesMap.get(guild.id);

	if (everyoneOverwrite) {
		permissions &= BigInt(~everyoneOverwrite.deny);
		permissions |= BigInt(everyoneOverwrite.allow);
	}

	let allow = 0n;
	let deny = 0n;

	for (const roleId of member.roles) {
		const roleOverwrite = overwritesMap.get(roleId);

		if (roleOverwrite) {
			allow |= BigInt(roleOverwrite.allow);
			deny |= BigInt(roleOverwrite.deny);
		}
	}

	permissions &= ~deny;
	permissions |= allow;
	const memberOverwrite = overwritesMap.get(member.user.id);

	if (memberOverwrite) {
		permissions &= BigInt(~memberOverwrite.deny);
		permissions |= BigInt(memberOverwrite.allow);
	}

	return permissions;
};

const computePermissions = ({
	guild,
	member,
	channel,
}: {
	guild: Guild;
	member: APIGuildMember;
	channel?: APIGuildChannel<GuildChannelType> | undefined;
}): bigint => {
	const basePermissions = computeBasePermissions({ guild, member });

	if (!channel) {
		return basePermissions;
	}

	return computeOverwrites({ basePermissions, guild, member, channel });
};

export const can = ({
	permission,
	guild,
	member,
	channel,
}: {
	permission: bigint;
	guild: Guild;
	member: APIGuildMember;
	channel?: APIGuildChannel<GuildChannelType>;
}): boolean => {
	const permissions = computePermissions({ guild, member, channel });
	return (permissions & permission) === permission;
};
