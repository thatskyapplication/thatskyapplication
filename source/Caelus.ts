import { readdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { URL } from "node:url";
import { inspect } from "node:util";
import type { ApplicationCommandData, Snowflake, ApplicationCommand, Collection, Guild } from "discord.js";
import { Client, GatewayIntentBits, TextChannel, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import commands from "./Commands/index.js";
import type { Event } from "./Events/index.js";
import { DEVELOPER_GUILD_ID, LOG_CHANNEL_ID } from "./Utility/Constants.js";
import { consoleLog } from "./Utility/Utility.js";

const eventsPath = new URL("Events/", import.meta.url);

interface LogOptions {
	content?: string;
	embeds?: EmbedBuilder[];
}

declare module "discord.js" {
	interface Client {
		log(message: string, error?: any): Promise<void>;
		log(message: LogOptions): Promise<void>;
		applyCommands(): Promise<void>;
	}
}

// eslint-disable-next-line func-names
Client.prototype.log = async function (message, error?) {
	let stamp = new Date().toISOString();
	const content = typeof message === "string" ? message : message.content;
	const output = error || content;
	if (output) consoleLog(output, stamp);
	const logChannel = this.channels.cache.get(LOG_CHANNEL_ID);
	if (!(logChannel instanceof TextChannel)) return;
	const me = await logChannel.guild.members.fetchMe();

	if (
		!logChannel
			.permissionsFor(me)
			.has([
				PermissionFlagsBits.AttachFiles,
				PermissionFlagsBits.EmbedLinks,
				PermissionFlagsBits.SendMessages,
				PermissionFlagsBits.ViewChannel,
			])
	)
		return;

	stamp = `\`[${stamp}]\``;
	const embeds = typeof message !== "string" && "embeds" in message ? message.embeds ?? [] : [];
	const files = [];
	const potentialFileName = `../error-${Date.now()}.xl`;

	if (error) {
		const inspectedError = inspect(error, false, Number.POSITIVE_INFINITY);

		if (inspectedError.length > 4_096) {
			await writeFile(potentialFileName, inspectedError);
			files.push(potentialFileName);
		} else {
			const embed = new EmbedBuilder().setDescription(`\`\`\`xl\n${inspectedError}\n\`\`\``).setTitle("Error");
			embeds.push(embed);
		}
	}

	for (const embed of embeds) embed.setColor(me.displayColor);

	await logChannel.send({
		allowedMentions: { parse: [] },
		content: content ? `${stamp} ${content}` : undefined,
		embeds,
		files,
	});

	if (files.length > 0) await unlink(potentialFileName);
};

async function deployCommands(
	client: Client<true>,
	fetchedCommands: Collection<Snowflake, ApplicationCommand>,
	commandData: ApplicationCommandData[],
	guild?: Guild,
) {
	if (
		fetchedCommands.size !== commandData.length ||
		fetchedCommands.some((fetchedCommand) => {
			const localCommand = commandData.find(({ name }) => name === fetchedCommand.name);
			return !localCommand || !fetchedCommand.equals(localCommand, true);
		})
	) {
		const applicationCommands = await (guild ?? client.application).commands.set(commandData);
		consoleLog(applicationCommands.map(({ name, type }) => `Set ${name} as a ${type} application command.`).join("\n"));
		consoleLog("Finished applying commands!");
	}
}

// eslint-disable-next-line func-names
Client.prototype.applyCommands = async function () {
	try {
		if (!this.isReady()) throw new Error("Client applying commands when not ready.");
		const developerGuild = this.guilds.resolve(DEVELOPER_GUILD_ID);
		if (!developerGuild) throw new Error("Could not find the developer guild.");
		const fetchedGlobalCommands = await this.application.commands.fetch({ cache: false });
		const fetchedDeveloperCommands = await developerGuild.commands.fetch({ cache: false });
		const globalCommandData: ApplicationCommandData[] = [];
		const developerCommandData: ApplicationCommandData[] = [];

		for (const command of Object.values(commands)) {
			if ("developer" in command && command.developer) {
				developerCommandData.push(command.commandData);
			} else {
				globalCommandData.push(command.commandData);
			}
		}

		await deployCommands(this, fetchedGlobalCommands, globalCommandData);
		await deployCommands(this, fetchedDeveloperCommands, developerCommandData, developerGuild);
	} catch (error) {
		void this.log("Failed to apply commands.", error);
	}
};

const Caelus = new Client({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
});

for (const file of (await readdir(eventsPath)).filter((file) => file !== "index.js")) {
	const { name, once, fire } = (await import(join(String(eventsPath), file))).event as Event;
	Caelus[once ? "once" : "on"](name, fire);
}

void Caelus.login();
