import type { ClientEvents, Guild } from "discord.js";
import pino from "../pino.js";
import channelDelete from "./channel-delete.js";
import channelUpdate from "./channel-update.js";
import entitlementDelete from "./entitlement-delete.js";
import entitlementUpdate from "./entitlement-update.js";
import guildCreate from "./guild-create.js";
import guildDelete from "./guild-delete.js";
import guildMemberAdd from "./guild-member-add.js";
import guildMemberRemove from "./guild-member-remove.js";
import interactionCreate from "./interaction-create.js";
import messageCreate from "./message-create.js";
import ready from "./ready.js";
import roleUpdate from "./role-update.js";

export interface Event<T extends keyof ClientEvents = keyof ClientEvents> {
	name: T;
	once?: boolean;
	fire(this: void, ...parameters: ClientEvents[T]): Promise<void> | void;
}

export function logGuild(guild: Guild, join = true) {
	pino.info(
		{
			id: guild.id,
			name: guild.name,
			created: guild.createdTimestamp,
			joined: guild.joinedTimestamp,
			owner: guild.ownerId,
			members: guild.memberCount,
			locale: guild.preferredLocale,
		},
		`Guild ${join ? "joined" : "left"}`,
	);
}

export default [
	channelDelete,
	channelUpdate,
	entitlementDelete,
	entitlementUpdate,
	guildCreate,
	guildDelete,
	guildMemberAdd,
	guildMemberRemove,
	interactionCreate,
	messageCreate,
	ready,
	roleUpdate,
] as const;
