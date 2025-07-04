import {
	API,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	PermissionFlagsBits,
	type RESTPutAPIApplicationCommandsJSONBody,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import pino from "../pino.js";
import { APPLICATION_ID, DISCORD_TOKEN, MEMBER_LOG_CHANNEL_TYPES } from "./constants.js";

const COMMANDS: RESTPutAPIApplicationCommandsJSONBody = [
	{
		name: "about",
		description: "About me, the Sky-themed moderation application.",
		type: ApplicationCommandType.ChatInput,
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
	{
		name: "configure",
		description: "Configure settings for the server.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "member-log",
				description: "Configure the member log for accounts joining and leaving.",
				options: [
					{
						type: ApplicationCommandOptionType.Channel,
						name: "channel",
						description: "The channel to use.",
						channel_types: [...MEMBER_LOG_CHANNEL_TYPES],
						required: false,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "message-log",
				description: "Configure the message log for messages in the server.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "report",
				description: "Configure reporting for the server.",
			},
		],
		default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
		integration_types: [ApplicationIntegrationType.GuildInstall],
		contexts: [InteractionContextType.Guild],
	},
] as const;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const api = new API(rest);
pino.info("Setting application commands...");

try {
	await api.applicationCommands.bulkOverwriteGlobalCommands(APPLICATION_ID, COMMANDS);
	pino.info("Successfully set application commands.");
} catch (error) {
	pino.error(error, "Error setting commands.");
}
