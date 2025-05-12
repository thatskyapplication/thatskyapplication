import { client, gateway } from "./discord.js";
import channelCreate from "./events/channel-create.js";
import channelDelete from "./events/channel-delete.js";
import channelUpdate from "./events/channel-update.js";
import guildCreate from "./events/guild-create.js";
import guildDelete from "./events/guild-delete.js";
import guildMemberAdd from "./events/guild-member-add.js";
import guildMemberRemove from "./events/guild-member-remove.js";
import guildMemberUpdate from "./events/guild-member-update.js";
import guildRoleCreate from "./events/guild-role-create.js";
import guildRoleDelete from "./events/guild-role-delete.js";
import guildRoleUpdate from "./events/guild-role-update.js";
import guildUpdate from "./events/guild-update.js";
import type { Event } from "./events/index.js";
import interactionCreate from "./events/interaction-create.js";
import messageCreate from "./events/message-create.js";
import messageDeleteBulk from "./events/message-delete-bulk.js";
import messageDelete from "./events/message-delete.js";
import messageUpdate from "./events/message-update.js";
import ready from "./events/ready.js";
import threadCreate from "./events/thread-create.js";
import threadDelete from "./events/thread-delete.js";
import threadListSync from "./events/thread-list-sync.js";
import threadUpdate from "./events/thread-update.js";

for (const event of [
	channelCreate,
	channelDelete,
	channelUpdate,
	guildCreate,
	guildDelete,
	guildMemberAdd,
	guildMemberRemove,
	guildMemberUpdate,
	guildRoleCreate,
	guildRoleDelete,
	guildRoleUpdate,
	guildUpdate,
	interactionCreate,
	messageCreate,
	messageDeleteBulk,
	messageDelete,
	messageUpdate,
	ready,
	threadCreate,
	threadDelete,
	threadListSync,
	threadUpdate,
]) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

void gateway.connect();
