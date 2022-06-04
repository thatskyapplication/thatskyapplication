import { unlink, writeFile } from "node:fs/promises";
import { inspect } from "node:util";
import { Client, ClientOptions, GatewayIntentBits, TextChannel, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import commands from "../Commands/index.js";
import { logChannelId } from "../Utility/Constants.js";

interface LogOptions {
  content?: string;
  embeds?: EmbedBuilder[];
}

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
    if (!this.isReady()) throw new Error("Client logging when not ready.");
    let stamp = new Date().toISOString();
    const content = typeof message === "string" ? message : message.content;
    const output = error || content;
    if (output) this.consoleLog(output, stamp);
    const { logChannel } = this;
    const me = await logChannel.guild.members.fetch(this.user.id);

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
    const channel = this.channels.resolve(logChannelId);
    if (!(channel instanceof TextChannel)) throw new Error("Attempting to log in a non-text channel.");
    return channel;
  }

  async applyCommands(): Promise<void> {
    try {
      const { logChannel } = this;
      const applicationCommands = await logChannel.guild.commands.set(Object.values(commands).map(({ commandData }) => commandData));
      this.consoleLog(applicationCommands.map(({ name, type }) => `Set ${name} as a ${type} application command.`).join("\n"));
      this.consoleLog("Finished applying commands!");
    } catch (error) {
      this.log("Failed to apply commands.", error);
    }
  }
}

export default new Caelus<true>({ intents: [GatewayIntentBits.Guilds] });
