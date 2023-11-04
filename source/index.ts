import { stat, unlink, writeFile } from "node:fs/promises";
import process from "node:process";
import { inspect } from "node:util";
import type {
	ApplicationCommandData,
	Snowflake,
	ApplicationCommand,
	Collection,
	Guild,
	ClientOptions,
} from "discord.js";
import { Client, GatewayIntentBits, TextChannel, EmbedBuilder, PermissionFlagsBits, Locale } from "discord.js";
import { init } from "i18next";
import commands from "./Commands/index.js";
import type { Event } from "./Events/index.js";
import events from "./Events/index.js";
import enGB from "./Locales/en-GB.js";
import esES from "./Locales/es-ES.js";
import {
	COMMAND_LOG_CHANNEL_ID,
	DEFAULT_EMBED_COLOUR,
	DEVELOPER_GUILD_ID,
	ERROR_LOG_CHANNEL_ID,
	GUILD_LOG_CHANNEL_ID,
	MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID,
	PRODUCTION,
} from "./Utility/Constants.js";
import { consoleLog } from "./Utility/Utility.js";

export const enum LogType {
	Error,
	Guild,
	Command,
	ManualDailyGuides,
}

interface LogOptions {
	content?: string;
	embeds?: EmbedBuilder[];
	error?: unknown;
	type?: LogType;
}

declare module "discord.js" {
	interface Client {
		log(options: LogOptions): Promise<void>;
		applyCommands(): Promise<void>;
	}
}

void init({
	fallbackLng: Locale.EnglishGB,
	missingKeyHandler: (locale, namespace, key) =>
		consoleLog(`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`),
	ns: ["general", "commands"],
	resources: {
		[Locale.EnglishGB]: enGB,
		[Locale.SpanishES]: esES,
	},
	returnEmptyString: false,
	saveMissing: true,
});

class Caelus extends Client {
	public constructor(options: ClientOptions) {
		super(options);
	}

	public override async log({ content, embeds = [], error, type = LogType.Error }: LogOptions) {
		let stamp = new Date().toISOString();
		const output = error ?? content;
		if (output) consoleLog(output, stamp);
		let channel;

		switch (type) {
			case LogType.Error:
				channel = this.channels.cache.get(ERROR_LOG_CHANNEL_ID);
				break;
			case LogType.Guild:
				channel = this.channels.cache.get(GUILD_LOG_CHANNEL_ID);
				break;
			case LogType.Command:
				channel = this.channels.cache.get(COMMAND_LOG_CHANNEL_ID);
				break;
			case LogType.ManualDailyGuides:
				channel = this.channels.cache.get(MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID);
				break;
		}

		if (!(channel instanceof TextChannel)) return;
		const potentialFileName = `../error-${Date.now()}.xl`;

		try {
			const me = await channel.guild.members.fetchMe();

			if (
				!channel
					.permissionsFor(me)
					.has(
						PermissionFlagsBits.AttachFiles |
							PermissionFlagsBits.EmbedLinks |
							PermissionFlagsBits.SendMessages |
							PermissionFlagsBits.ViewChannel,
					)
			) {
				return;
			}

			stamp = `\`[${stamp}]\``;
			const files = [];

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

			for (const embed of embeds) if (embed.data.color === undefined) embed.setColor(DEFAULT_EMBED_COLOUR);
			const payload: Parameters<TextChannel["send"]>[0] = { allowedMentions: { parse: [] }, embeds, files };
			if (content) payload.content = `${stamp} ${content}`;
			await channel.send(payload);
			if (files.length > 0) await unlink(potentialFileName);
		} catch (error) {
			await stat(potentialFileName)
				.then(async () => unlink(potentialFileName))
				.catch(async (unlinkError) => {
					if (unlinkError.code !== "ENOENT") consoleLog(unlinkError);
				});

			consoleLog(error);
		}
	}

	private async deployCommands(
		client: Client<true>,
		fetchedCommands: Collection<Snowflake, ApplicationCommand>,
		data: ApplicationCommandData[],
		guild?: Guild,
	) {
		if (
			fetchedCommands.size !== data.length ||
			fetchedCommands.some((fetchedCommand) => {
				const localCommand = data.find(({ name }) => name === fetchedCommand.name);
				return !localCommand || !fetchedCommand.equals(localCommand, true);
			})
		) {
			const applicationCommands = await (guild ?? client.application).commands.set(data);

			consoleLog(
				applicationCommands.map(({ name, type }) => `Set ${name} as a ${type} application command.`).join("\n"),
			);

			consoleLog("Finished applying commands!");
		}
	}

	public override async applyCommands() {
		try {
			if (!this.isReady()) throw new Error("Client applying commands when not ready.");
			const developerGuild = this.guilds.cache.get(DEVELOPER_GUILD_ID);
			if (!developerGuild) throw new Error("Could not find the developer guild.");
			const fetchedGlobalCommands = await this.application.commands.fetch({ cache: false, withLocalizations: true });
			const fetchedDeveloperCommands = await developerGuild.commands.fetch({ cache: false, withLocalizations: true });
			const globalCommandData = [];
			const developerCommandData = [];

			for (const command of Object.values(commands)) {
				if ("developer" in command && command.developer) {
					developerCommandData.push(command.data);
				} else {
					globalCommandData.push(command.data);
				}
			}

			await this.deployCommands(this, fetchedGlobalCommands, globalCommandData);
			await this.deployCommands(this, fetchedDeveloperCommands, developerCommandData, developerGuild);

			/* eslint-disable require-atomic-updates */
			commands.sharderuption.id =
				fetchedGlobalCommands.find(({ name }) => name === commands.sharderuption.data.name)?.id ?? null;

			commands.skyprofile.id =
				fetchedGlobalCommands.find(({ name }) => name === commands.skyprofile.data.name)?.id ?? null;
			/* eslint-enable require-atomic-updates */
		} catch (error) {
			void this.log({ content: "Failed to apply commands.", error });
		}
	}
}

const client = new Caelus({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
});

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

const { DISCORD_TOKEN, DEVELOPMENT_DISCORD_TOKEN } = process.env;
const token = PRODUCTION ? DISCORD_TOKEN : DEVELOPMENT_DISCORD_TOKEN;
void client.login(token);
