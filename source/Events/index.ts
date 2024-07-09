import type { ClientEvents, Guild } from "discord.js";
import pino from "../pino.js";
import channelUpdate from "./channelUpdate.js";
import guildCreate from "./guildCreate.js";
import guildDelete from "./guildDelete.js";
import guildMemberAdd from "./guildMemberAdd.js";
import guildMemberRemove from "./guildMemberRemove.js";
import interactionCreate from "./interactionCreate.js";
import messageCreate from "./messageCreate.js";
import ready from "./ready.js";
import roleUpdate from "./roleUpdate.js";

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
	channelUpdate,
	guildCreate,
	guildDelete,
	guildMemberAdd,
	guildMemberRemove,
	interactionCreate,
	messageCreate,
	ready,
	roleUpdate,
] as const;
