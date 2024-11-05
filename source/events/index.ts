// import roleUpdate from "./role-update.js";
import type { Client, MappedEvents } from "@discordjs/core";
import channelDelete from "./channel-delete.js";
// import channelUpdate from "./channel-update.js";
// import entitlementDelete from "./entitlement-delete.js";
// import entitlementUpdate from "./entitlement-update.js";
import guildCreate from "./guild-create.js";
// import guildDelete from "./guild-delete.js";
// import guildMemberAdd from "./guild-member-add.js";
// import guildMemberRemove from "./guild-member-remove.js";
import interactionCreate from "./interaction-create.js";
// import messageCreate from "./message-create.js";
import ready from "./ready.js";

export interface Event<T extends keyof MappedEvents = keyof MappedEvents> {
	name: T;
	once?: boolean;
	fire(this: Client, ...parameters: MappedEvents[T]): Promise<void> | void;
}

export default [
	channelDelete,
	// channelUpdate,
	// entitlementDelete,
	// entitlementUpdate,
	guildCreate,
	// guildDelete,
	// guildMemberAdd,
	// guildMemberRemove,
	interactionCreate,
	// messageCreate,
	ready,
	// roleUpdate,
] as const;
