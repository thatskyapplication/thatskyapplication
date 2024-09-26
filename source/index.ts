import { stat, unlink, writeFile } from "node:fs/promises";
import process from "node:process";
import { inspect } from "node:util";
import {
	type ApplicationCommandData,
	Client,
	EmbedBuilder,
	GatewayIntentBits,
	Locale,
	Options,
	Partials,
	PermissionFlagsBits,
	type Snowflake,
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
	public override async log({ content, embeds = [], error }: LogOptions) {
		const output = error ?? content;

		if (output) {
			pino.info(output);
		}

		const channel = this.channels.cache.get(MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID);

		if (!(channel instanceof TextChannel)) {
			return;
		}

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
					const embed = new EmbedBuilder()
						.setDescription(`\`\`\`xl\n${inspectedError}\n\`\`\``)
						.setTitle("Error");

					embeds.push(embed);
				}
			}

			for (const embed of embeds) {
				if (embed.data.color === undefined) {
					embed.setColor(DEFAULT_EMBED_COLOUR);
				}
			}

			const payload: Parameters<TextChannel["send"]>[0] = {
				allowedMentions: { parse: [] },
				embeds,
				files,
			};

			if (content) {
				payload.content = `${stamp} ${content}`;
			}

			await channel.send(payload);

			if (files.length > 0) {
				await unlink(potentialFileName);
			}
		} catch (error) {
			await stat(potentialFileName)
				.then(async () => unlink(potentialFileName))
				.catch((unlinkError) => {
					if (unlinkError.code !== "ENOENT") {
						pino.error(unlinkError, "Failed to unlink file.");
					}
				});

			pino.error(error, "Failed to log to Discord.");
		}
	}

	public override async applyCommands() {
		try {
			if (!this.isReady()) {
				throw new Error("Client applying commands when not ready.");
			}

			const fetchedGlobalCommands = await this.application.commands.fetch({
				cache: false,
				withLocalizations: true,
			});

			const globalCommandData: ApplicationCommandData[] = [];
			const guildCommandData = new Map<Snowflake, ApplicationCommandData[]>();

			for (const command of Object.values(commands)) {
				if ("guilds" in command) {
					for (const guildId of command.guilds) {
						const guildCommands = guildCommandData.get(guildId);

						if (guildCommands) {
							guildCommands.push(command.data);
						} else {
							guildCommandData.set(guildId, [command.data]);
						}
					}
				} else {
					globalCommandData.push(command.data);
				}
			}

			const promises = [];

			if (
				fetchedGlobalCommands.size !== globalCommandData.length ||
				fetchedGlobalCommands.some((fetchedGlobalCommand) => {
					const localCommand = globalCommandData.find(
						({ name }) => name === fetchedGlobalCommand.name,
					);
					return !(localCommand && fetchedGlobalCommand.equals(localCommand, true));
				})
			) {
				promises.push(this.application.commands.set(globalCommandData));
			}

			for (const [guildId, data] of guildCommandData.entries()) {
				promises.push(this.application.commands.set(data, guildId));
			}

			const commandsSettled = await Promise.allSettled(promises);

			const commandsErrors = commandsSettled
				.filter((result): result is PromiseRejectedResult => result.status === "rejected")
				.map((result) => result.reason);

			pino.info("Set commands.");

			if (commandsErrors.length > 0) {
				pino.error(commandsErrors, "Error setting commands.");
			}

			commands.sharderuption.id =
				fetchedGlobalCommands.find(({ name }) => name === commands.sharderuption.data.name)?.id ??
				null;

			commands.catalogue.id =
				fetchedGlobalCommands.find(({ name }) => name === commands.catalogue.data.name)?.id ?? null;
		} catch (error) {
			pino.error(error, "Failed to set commands.");
		}
	}
}

const client = new Caelus({
	intents:
		GatewayIntentBits.Guilds |
		GatewayIntentBits.GuildMembers |
		GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
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
	partials: [Partials.GuildMember],
});

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

const { DISCORD_TOKEN, DEVELOPMENT_DISCORD_TOKEN } = process.env;
const token = PRODUCTION ? DISCORD_TOKEN : DEVELOPMENT_DISCORD_TOKEN;
void client.login(token);
