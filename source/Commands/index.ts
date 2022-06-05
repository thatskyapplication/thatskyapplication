import type { ApplicationCommandData, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";

// General
import travelling_spirit from "./General/travelling-spirit.js";

const commands = {
  "travelling-spirit": new travelling_spirit()
} as const;

export type CommandName = keyof typeof commands;

export function isCommandName(commandName: string): commandName is CommandName {
  return commandName in commands;
}

export interface Command {
  name: CommandName;
  type: number;
  handle(interaction: ChatInputCommandInteraction<"cached">): Promise<void>;
  get commandData(): ApplicationCommandData;
}

export interface AutocompleteCommand extends Command {
  autocomplete(interaction: AutocompleteInteraction<"cached">): Promise<void>;
}

export default commands;
