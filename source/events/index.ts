import type { MappedEvents } from "@discordjs/core";
import channelCreate from "./channel-create.js";
import channelDelete from "./channel-delete.js";
import channelUpdate from "./channel-update.js";
import entitlementDelete from "./entitlement-delete.js";
import entitlementUpdate from "./entitlement-update.js";
import guildCreate from "./guild-create.js";
import guildDelete from "./guild-delete.js";
import guildMemberAdd from "./guild-member-add.js";
import guildMemberRemove from "./guild-member-remove.js";
import guildUpdate from "./guild-update.js";
import interactionCreate from "./interaction-create.js";
import messageCreate from "./message-create.js";
import messageDelete from "./message-delete.js";
import messageUpdate from "./message-update.js";
import ready from "./ready.js";
import roleUpdate from "./role-update.js";

export interface Event<T extends keyof MappedEvents = keyof MappedEvents> {
	name: T;
	once?: boolean;
	fire(this: void, ...parameters: MappedEvents[T]): Promise<void> | void;
}

export default [
	channelCreate,
	channelDelete,
	channelUpdate,
	entitlementDelete,
	entitlementUpdate,
	guildCreate,
	guildDelete,
	guildMemberAdd,
	guildMemberRemove,
	guildUpdate,
	interactionCreate,
	messageCreate,
	messageDelete,
	messageUpdate,
	ready,
	roleUpdate,
] as const;
