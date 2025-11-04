import "./i18next.js"; // Must be first.
import "./api.js";
import type { Snowflake } from "@discordjs/core";
import { COMMAND_CACHE } from "./caches/commands.js";
import { client, gateway } from "./discord.js";
import channelCreate from "./events/channel-create.js";
import channelDelete from "./events/channel-delete.js";
import channelUpdate from "./events/channel-update.js";
import entitlementCreate from "./events/entitlement-create.js";
import entitlementDelete from "./events/entitlement-delete.js";
import entitlementUpdate from "./events/entitlement-update.js";
import guildCreate from "./events/guild-create.js";
import guildDelete from "./events/guild-delete.js";
import guildMemberAdd from "./events/guild-member-add.js";
import guildMemberRemove from "./events/guild-member-remove.js";
import guildMemberUpdate from "./events/guild-member-update.js";
import guildRoleCreate from "./events/guild-role-create.js";
import guildRoleDelete from "./events/guild-role-delete.js";
import guildRoleUpdate from "./events/guild-role-update.js";
import guildStickersUpdate from "./events/guild-stickers-update.js";
import guildUpdate from "./events/guild-update.js";
import type { Event } from "./events/index.js";
import interactionCreate from "./events/interaction-create.js";
import messageCreate from "./events/message-create.js";
import messageDelete from "./events/message-delete.js";
import messageDeleteBulk from "./events/message-delete-bulk.js";
import messageUpdate from "./events/message-update.js";
import ready from "./events/ready.js";
import threadCreate from "./events/thread-create.js";
import threadDelete from "./events/thread-delete.js";
import threadListSync from "./events/thread-list-sync.js";
import threadUpdate from "./events/thread-update.js";
import pino from "./pino.js";
import { APPLICATION_ID } from "./utility/configuration.js";
import { captureError } from "./utility/functions.js";

for (const event of [
	channelCreate,
	channelDelete,
	channelUpdate,
	entitlementCreate,
	entitlementDelete,
	entitlementUpdate,
	guildCreate,
	guildDelete,
	guildMemberAdd,
	guildMemberRemove,
	guildMemberUpdate,
	guildRoleCreate,
	guildRoleDelete,
	guildRoleUpdate,
	guildStickersUpdate,
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

client.on("error", (error) => captureError(error));

// Populate the command cache.
const applicationCommands = await client.api.applicationCommands.getGlobalCommands(APPLICATION_ID);

const configureCommandName = "configure";
const skyProfileCommandName = "sky-profile";
let configureCommandId: Snowflake | undefined;
let skyProfileCommandId: Snowflake | undefined;

for (const applicationCommand of applicationCommands) {
	switch (applicationCommand.name) {
		case configureCommandName: {
			configureCommandId = applicationCommand.id;
			break;
		}
		case skyProfileCommandName: {
			skyProfileCommandId = applicationCommand.id;
			break;
		}
	}

	if (configureCommandId && skyProfileCommandId) {
		break;
	}
}

if (configureCommandId) {
	COMMAND_CACHE.set(configureCommandName, configureCommandId);
} else {
	pino.warn(`Command "${configureCommandName}" not found from the API.`);
}

if (skyProfileCommandId) {
	COMMAND_CACHE.set(skyProfileCommandName, skyProfileCommandId);
} else {
	pino.warn(`Command "${skyProfileCommandName}" not found from the API.`);
}

void gateway.connect();
