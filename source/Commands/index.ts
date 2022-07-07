import type { ApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";

// Events
import notifications from "./Events/notifications.js";

// General
import roles from "./General/roles.js";
import spirit from "./General/spirit.js";

const commands = {
  notifications: new notifications(),
  roles: new roles(),
  spirit: new spirit()
} as const;

export type CommandName = keyof typeof commands;

export function isCommandName(commandName: string): commandName is CommandName {
  return commandName in commands;
}

export function isAutocompleteCommand(command: Command): command is AutocompleteCommand {
  return isCommandName(command.name) && "autocomplete" in command;
}

export interface Command {
  name: CommandName;
  type: ApplicationCommandType;
  handle(interaction: ChatInputCommandInteraction): Promise<void>;
  get commandData(): ApplicationCommandData;
}

export interface AutocompleteCommand extends Command {
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

export default commands;
