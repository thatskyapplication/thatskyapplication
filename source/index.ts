import { unlink, writeFile } from "node:fs/promises";
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
import { Partials, Client, GatewayIntentBits, TextChannel, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import commands from "./Commands/index.js";
import type { Event } from "./Events/index.js";
import events from "./Events/index.js";
import { DEVELOPER_GUILD_ID, LOG_CHANNEL_ID, production } from "./Utility/Constants.js";
import { consoleLog } from "./Utility/Utility.js";

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

class Caelus extends Client {
	public constructor(options: ClientOptions) {
		super(options);
	}

	public override async log(message: LogOptions | string, error?: any) {
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
				.has(
					PermissionFlagsBits.AttachFiles |
						PermissionFlagsBits.EmbedLinks |
						PermissionFlagsBits.SendMessages |
						PermissionFlagsBits.ViewChannel,
				)
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
		const payload: Parameters<TextChannel["send"]>[0] = { allowedMentions: { parse: [] }, embeds, files };
		if (content) payload.content = `${stamp} ${content}`;
		await logChannel.send(payload);
		if (files.length > 0) await unlink(potentialFileName);
	}

	private async deployCommands(
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

			consoleLog(
				applicationCommands.map(({ name, type }) => `Set ${name} as a ${type} application command.`).join("\n"),
			);

			consoleLog("Finished applying commands!");
		}
	}

	public override async applyCommands() {
		try {
			if (!this.isReady()) throw new Error("Client applying commands when not ready.");
			const developerGuild = this.guilds.resolve(DEVELOPER_GUILD_ID);
			if (!developerGuild) throw new Error("Could not find the developer guild.");
			const fetchedGlobalCommands = await this.application.commands.fetch({ cache: false });
			const fetchedDeveloperCommands = await developerGuild.commands.fetch({ cache: false });
			const globalCommandData = [];
			const developerCommandData = [];

			for (const command of Object.values(commands)) {
				if ("developer" in command && command.developer) {
					developerCommandData.push(command.commandData);
				} else {
					globalCommandData.push(command.commandData);
				}
			}

			await this.deployCommands(this, fetchedGlobalCommands, globalCommandData);
			await this.deployCommands(this, fetchedDeveloperCommands, developerCommandData, developerGuild);
		} catch (error) {
			void this.log("Failed to apply commands.", error);
		}
	}
}

const client = new Caelus({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	partials: [Partials.Message],
});

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

const { DISCORD_TOKEN, DEVELOPMENT_DISCORD_TOKEN } = process.env;
const token = production ? DISCORD_TOKEN : DEVELOPMENT_DISCORD_TOKEN;
void client.login(token);
