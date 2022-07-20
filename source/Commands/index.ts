/* eslint-disable import/order */
import { ApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

// Events
import notifications from "./Events/notifications.js";

// General
import roles from "./General/roles.js";
import Sky_Profile from "./General/Sky Profile.js";
import sky_profile from "./General/sky-profile.js";
import spirit from "./General/spirit.js";
import winged_light from "./General/winged-light.js";

const commands = {
  notifications: new notifications(),
  roles: new roles(),
  "Sky Profile": new Sky_Profile(),
  "sky-profile": new sky_profile(),
  spirit: new spirit(),
  "winged-light": new winged_light()
} as const;

export type CommandName = keyof typeof commands;

export function isCommandName(commandName: string): commandName is CommandName {
  return commandName in commands;
}

export function isChatInputCommand(command: BaseCommandData): command is Command {
  return isCommandName(command.name) && command.type === ApplicationCommandType.ChatInput;
}

export function isAutocompleteCommand(command: BaseCommandData): command is AutocompleteCommand {
  return isCommandName(command.name) && "autocomplete" in command;
}

export function isUserContextMenuCommand(command: BaseCommandData): command is UserContextMenuCommand {
  return isCommandName(command.name) && command.type === ApplicationCommandType.User;
}

interface BaseCommandData {
  name: CommandName;
  type: ApplicationCommandType;
  get commandData(): ApplicationCommandData;
}

export interface Command extends BaseCommandData {
  handle(interaction: ChatInputCommandInteraction): Promise<void>;
  execute?(interaction: ChatInputCommandInteraction): Promise<void>;
}

export interface AutocompleteCommand extends Command {
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

export interface UserContextMenuCommand extends BaseCommandData {
  userContextMenu(interaction: UserContextMenuCommandInteraction): Promise<void>;
}

export default commands;
