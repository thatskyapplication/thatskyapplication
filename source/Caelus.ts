import { readdir, unlink, writeFile } from "node:fs/promises";
import process from "node:process";
import { URL } from "node:url";
import { inspect } from "node:util";
import { Client, GatewayIntentBits, TextChannel, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { createPool, Pool } from "mariadb";
import commands from "./Commands/index.js";
import type { Event } from "./Events/index.js";
import { LOG_CHANNEL_ID } from "./Utility/Constants.js";
import { consoleLog } from "./Utility/Utility.js";

const eventsPath = new URL("./Events/", import.meta.url);

interface LogOptions {
  content?: string;
  embeds?: EmbedBuilder[];
}

declare module "discord.js" {
  interface Client {
    Maria: Pool;
    log(message: string, error?: any): Promise<void>;
    log(message: LogOptions): Promise<void>;
    applyCommands(): Promise<void>;
  }
}

Client.prototype.Maria = createPool({
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PASSWORD,
  host: process.env.MARIA_HOST,
  database: process.env.MARIA_DATABASE,
  bigIntAsNumber: true,
  insertIdAsNumber: true
});

Client.prototype.log = async function (message, error?) {
  let stamp = new Date().toISOString();
  const content = typeof message === "string" ? message : message.content;
  const output = error || content;
  if (output) consoleLog(output, stamp);
  const logChannel = this.channels.cache.get(LOG_CHANNEL_ID);
  if (!(logChannel instanceof TextChannel)) throw new Error("Attempting to log in a non-text channel.");
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
    content: content ? `${stamp} ${content}` : undefined,
    embeds,
    files
  });

  if (files.length > 0) await unlink(potentialFileName);
};

Client.prototype.applyCommands = async function () {
  try {
    if (!this.isReady()) throw new Error("Client applying commands when not ready.");
    const fetchedCommands = await this.application.commands.fetch({ cache: false });
    const commandData = Object.values(commands).map(({ commandData }) => commandData);

    if (fetchedCommands.size !== commandData.length || fetchedCommands.some(fetchedCommand => {
      const localCommand = commandData.find(({ name }) => name === fetchedCommand.name);
      return !localCommand || !fetchedCommand.equals(localCommand, true);
    })) {
      const applicationCommands = await this.application.commands.set(commandData);
      consoleLog(applicationCommands.map(({ name, type }) => `Set ${name} as a ${type} application command.`).join("\n"));
      consoleLog("Finished applying commands!");
    }
  } catch (error) {
    this.log("Failed to apply commands.", error);
  }
};

const Caelus = new Client({ intents: GatewayIntentBits.Guilds });

for (const file of (await readdir(eventsPath)).filter(file => file !== "index.js")) {
  const { name, once, fire } = (await import(eventsPath + file)).event as Event;
  Caelus[once ? "once" : "on"](name, fire);
}

Caelus.login();
