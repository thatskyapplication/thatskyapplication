import { stat, unlink, writeFile } from "node:fs/promises";
import process from "node:process";
import { inspect } from "node:util";
import {
	type ApplicationCommandManager,
	type ApplicationCommand,
	type ApplicationCommandData,
	type ClientOptions,
	type Collection,
	type GuildApplicationCommandManager,
	type Snowflake,
	Client,
	EmbedBuilder,
	GatewayIntentBits,
	Locale,
	Options,
	PermissionFlagsBits,
	TextChannel,
} from "discord.js";
import { init } from "i18next";
import commands from "./Commands/index.js";
import events, { type Event } from "./Events/index.js";
import de from "./Locales/de.js";
import enGB from "./Locales/en-GB.js";
import es419 from "./Locales/es-419.js";
import esES from "./Locales/es-ES.js";
import fr from "./Locales/fr.js";
import it from "./Locales/it.js";
import ja from "./Locales/ja.js";
import ko from "./Locales/ko.js";
import ptBR from "./Locales/pt-BR.js";
import ru from "./Locales/ru.js";
import vi from "./Locales/vi.js";
import zhCN from "./Locales/zh-CN.js";
import zhTW from "./Locales/zh-TW.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	DEVELOPER_GUILD_ID,
	MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID,
	PRODUCTION,
} from "./Utility/Constants.js";
import pino from "./pino.js";

interface LogOptions {
	content?: string;
	embeds?: EmbedBuilder[];
	error?: unknown;
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
		pino.warn(`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`),
	ns: ["general", "commands"],
	resources: {
		[Locale.German]: de,
		[Locale.EnglishGB]: enGB,
		[Locale.SpanishLATAM]: es419,
		[Locale.SpanishES]: esES,
		[Locale.French]: fr,
		[Locale.Italian]: it,
		[Locale.Japanese]: ja,
		[Locale.Korean]: ko,
		[Locale.PortugueseBR]: ptBR,
		[Locale.Russian]: ru,
		[Locale.Vietnamese]: vi,
		[Locale.ChineseCN]: zhCN,
		[Locale.ChineseTW]: zhTW,
	},
	returnEmptyString: false,
	saveMissing: true,
});

class Caelus extends Client {
	public constructor(options: ClientOptions) {
		super(options);
	}

	public override async log({ content, embeds = [], error }: LogOptions) {
		const output = error ?? content;
		if (output) pino.info(output);
		const channel = this.channels.cache.get(MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID);
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

			const stamp = `\`[${new Date().toISOString()}]\``;
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
					if (unlinkError.code !== "ENOENT") pino.error(unlinkError, "Failed to unlink file.");
				});

			pino.error(error, "Failed to log to Discord.");
		}
	}

	private async deployCommands(
		commandManager: ApplicationCommandManager | GuildApplicationCommandManager,
		fetchedCommands: Collection<Snowflake, ApplicationCommand>,
		data: ApplicationCommandData[],
	) {
		return fetchedCommands.size !== data.length ||
			fetchedCommands.some((fetchedCommand) => {
				const localCommand = data.find(({ name }) => name === fetchedCommand.name);
				return !localCommand || !fetchedCommand.equals(localCommand, true);
			})
			? commandManager.set(data)
			: null;
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

			const [globalCommands, developerCommands] = await Promise.all([
				this.deployCommands(this.application.commands, fetchedGlobalCommands, globalCommandData),
				this.deployCommands(developerGuild.commands, fetchedDeveloperCommands, developerCommandData),
			]);

			if (globalCommands) pino.info("Set global commands.");
			if (developerCommands) pino.info("Set developer commands.");

			/* eslint-disable require-atomic-updates */
			commands.sharderuption.id =
				fetchedGlobalCommands.find(({ name }) => name === commands.sharderuption.data.name)?.id ?? null;

			commands.skyprofile.id =
				fetchedGlobalCommands.find(({ name }) => name === commands.skyprofile.data.name)?.id ?? null;
			/* eslint-enable require-atomic-updates */
		} catch (error) {
			pino.error(error, "Failed to set commands.");
		}
	}
}

const client = new Caelus({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	makeCache: Options.cacheWithLimits({
		ApplicationCommandManager: 0,
		AutoModerationRuleManager: 0,
		BaseGuildEmojiManager: 0,
		GuildBanManager: 0,
		GuildEmojiManager: 0,
		GuildInviteManager: 0,
		GuildMemberManager: {
			keepOverLimit: (member) => member.user.id === APPLICATION_ID,
			maxSize: 50,
		},
		GuildScheduledEventManager: 0,
		GuildStickerManager: 0,
		MessageManager: 15,
		PresenceManager: 0,
		ReactionManager: 0,
		ReactionUserManager: 0,
		StageInstanceManager: 0,
		ThreadManager: 0,
		ThreadMemberManager: {
			keepOverLimit: (user) => user.id === APPLICATION_ID,
			maxSize: 5,
		},
		UserManager: {
			keepOverLimit: (user) => user.id === APPLICATION_ID,
			maxSize: 50,
		},
		VoiceStateManager: 0,
	}),
});

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

const { DISCORD_TOKEN, DEVELOPMENT_DISCORD_TOKEN } = process.env;
const token = PRODUCTION ? DISCORD_TOKEN : DEVELOPMENT_DISCORD_TOKEN;
void client.login(token);
