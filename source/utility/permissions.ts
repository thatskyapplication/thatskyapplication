import {
	type APIChatInputApplicationCommandInteraction,
	type APIGuildChannel,
	type APIGuildMember,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type GuildChannelType,
	InteractionType,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import pino from "../pino.js";

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

	let permissions = everyoneRole.permissions;

	for (const roleId of member.roles) {
		const role = guild.roles.get(roleId);

		if (!role) {
			throw new Error(`Could not find role id ${roleId}.`);
		}

		permissions |= role.permissions;
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

const PermissionFlagBitsToString = new Map<bigint, string>()
	.set(PermissionFlagsBits.ViewChannel, "View Channel")
	.set(PermissionFlagsBits.SendMessages, "Send Messages")
	.set(PermissionFlagsBits.EmbedLinks, "Embed Links")
	.set(PermissionFlagsBits.UseExternalEmojis, "Use External Emojis")
	.set(PermissionFlagsBits.SendMessagesInThreads, "Send Messages in Threads");

function getPermissionString(bit: bigint) {
	const string = PermissionFlagBitsToString.get(bit);

	if (string === undefined) {
		pino.warn(`No permission string exists for ${bit}.`);
		return "Unknown";
	}

	return string;
}

export async function cannotUsePermissions(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction,
	permissions: bigint,
) {
	// Direct messages are fine.
	if (!interaction.guild_id) {
		return false;
	}

	const appPermissions = BigInt(interaction.app_permissions);
	const missingPermissions = [];

	if (
		(permissions & PermissionFlagsBits.ViewChannel) === PermissionFlagsBits.ViewChannel &&
		(appPermissions & PermissionFlagsBits.ViewChannel) === 0n
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.ViewChannel));
	}

	if (
		(permissions & PermissionFlagsBits.SendMessages) === PermissionFlagsBits.SendMessages &&
		(appPermissions & PermissionFlagsBits.SendMessages) === 0n
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.SendMessages));
	}

	if (
		(permissions & PermissionFlagsBits.EmbedLinks) === PermissionFlagsBits.EmbedLinks &&
		(appPermissions & PermissionFlagsBits.EmbedLinks) === 0n
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.EmbedLinks));
	}

	if (
		(permissions & PermissionFlagsBits.UseExternalEmojis) ===
			PermissionFlagsBits.UseExternalEmojis &&
		(appPermissions & PermissionFlagsBits.UseExternalEmojis) === 0n
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.UseExternalEmojis));
	}

	if (
		(permissions & PermissionFlagsBits.SendMessagesInThreads) ===
			PermissionFlagsBits.SendMessagesInThreads &&
		(appPermissions & PermissionFlagsBits.SendMessagesInThreads) === 0n
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.SendMessagesInThreads));
	}

	if (missingPermissions.length === 0) {
		return false;
	}

	const response = {
		components: [],
		content: `${
			missingPermissions.length > 1
				? `Missing the following permissions:\n${missingPermissions
						.map((missingPermission) => `- \`${missingPermission}\``)
						.join("\n")}\n`
				: `Missing the \`${missingPermissions[0]}\` permission. `
		}Someone needs to adjust the permissions!`,
		embeds: [],
		flags: MessageFlags.Ephemeral,
	};

	if (interaction.type === InteractionType.MessageComponent) {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	}

	return true;
}
