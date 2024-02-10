import type { ClientEvents, Guild } from "discord.js";
import pino from "../pino.js";
import { event as guildCreate } from "./guildCreate.js";
import { event as guildDelete } from "./guildDelete.js";
import { event as interactionCreate } from "./interactionCreate.js";
import { event as messageCreate } from "./messageCreate.js";
import { event as ready } from "./ready.js";

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

export default [guildCreate, guildDelete, interactionCreate, messageCreate, ready] as const;
