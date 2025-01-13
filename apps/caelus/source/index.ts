import "./i18next.js"; // Must be first.
import { Locale } from "@discordjs/core";
import { t } from "i18next";
import { COMMAND_CACHE } from "./caches/commands.js";
import { client, gateway } from "./discord.js";
import events, { type Event } from "./events/index.js";
import pino from "./pino.js";
import { APPLICATION_ID } from "./utility/constants.js";

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

// Populate the command cache.
const applicationCommands = await client.api.applicationCommands.getGlobalCommands(APPLICATION_ID);
const skyProfileCommandName = t("sky-profile.command-name", {
	lng: Locale.EnglishGB,
	ns: "commands",
});
const skyProfileCommand = applicationCommands.find(
	(command) => command.name === skyProfileCommandName,
);

if (skyProfileCommand) {
	COMMAND_CACHE.set(skyProfileCommandName, skyProfileCommand.id);
} else {
	pino.warn(`Command "${skyProfileCommandName}" not found from the API.`);
}

void gateway.connect();
