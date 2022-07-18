import { unlink, writeFile } from "node:fs/promises";
import process from "node:process";
import { inspect } from "node:util";
import { Client, ClientOptions, GatewayIntentBits, TextChannel, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { createPool } from "mariadb";
import commands from "../Commands/index.js";
import { LOG_CHANNEL_ID } from "../Utility/Constants.js";

interface LogOptions {
  content?: string;
  embeds?: EmbedBuilder[];
}

export const Maria = createPool({
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PASSWORD,
  host: process.env.MARIA_HOST,
  database: process.env.MARIA_DATABASE
});

class Caelus<T extends boolean> extends Client<T> {
  constructor(options: ClientOptions) {
    super(options);
  }

  consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
    console.log(`- - - - - ${stamp} - - - - -`);
    console.log(inspect(consoleLog, false, Infinity, true));
  }

  async log(message: string, error?: any): Promise<void>;
  async log(message: LogOptions): Promise<void>;

  async log(message: string | LogOptions, error?: any): Promise<void> {
    let stamp = new Date().toISOString();
    const content = typeof message === "string" ? message : message.content;
    const output = error || content;
    if (output) this.consoleLog(output, stamp);
    const { logChannel } = this;
    const me = await logChannel.guild.members.fetchMe();

    if (!logChannel.permissionsFor(me).has([
      PermissionFlagsBits.AttachFiles,
      PermissionFlagsBits.EmbedLinks,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel
    ])) {
      throw new Error("Missing permissions to log.");
    }

    stamp = `\`[${stamp}]\``;
    const embeds = typeof message !== "string" && "embeds" in message ? message.embeds ?? [] : [];
    const files = [];
    const potentialFileName = `../error-${Date.now()}.xl`;

    if (error) {
      const inspectedError = inspect(error, false, Infinity);

      if (inspectedError.length > 4096) {
        await writeFile(potentialFileName, inspectedError);
        files.push(potentialFileName);
      } else {
        const embed = new EmbedBuilder();
        embed.setDescription(`\`\`\`xl\n${inspectedError}\n\`\`\``);
        embed.setTitle("Error");
        embeds.push(embed);
      }
    }

    for (const embed of embeds) embed.setColor(me.displayColor);

    await logChannel.send({
      allowedMentions: { parse: [] },
      content: content ? `${stamp} ${content}` : null,
      embeds,
      files
    });

    if (files.length > 0) await unlink(potentialFileName);
  }

  get logChannel(): TextChannel {
    const channel = this.channels.resolve(LOG_CHANNEL_ID);
    if (!(channel instanceof TextChannel)) throw new Error("Attempting to log in a non-text channel.");
    return channel;
  }

  async applyCommands(): Promise<void> {
    try {
      if (!this.isReady()) throw new Error("Client applying commands when not ready.");
      const fetchedCommands = await this.application.commands.fetch({ cache: false });
      const commandData = Object.values(commands).map(({ commandData }) => commandData);

      if (fetchedCommands.size !== commandData.length || fetchedCommands.some(fetchedCommand => {
        const localCommand = commandData.find(({ name }) => name === fetchedCommand.name);
        return !localCommand || !fetchedCommand.equals(localCommand, true);
      })) {
        const applicationCommands = await this.application.commands.set(commandData);
        this.consoleLog(applicationCommands.map(({ name, type }) => `Set ${name} as a ${type} application command.`).join("\n"));
        this.consoleLog("Finished applying commands!");
      }
    } catch (error) {
      this.log("Failed to apply commands.", error);
    }
  }
}

export default new Caelus({ intents: [GatewayIntentBits.Guilds] });
