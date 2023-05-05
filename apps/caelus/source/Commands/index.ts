/* eslint-disable import/order */
import type {
	ApplicationCommandData,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
import { ApplicationCommandType } from "discord.js";

// Developer
import d_daily_guides from "./Developer/d-daily-guides.js";

// Events
import daily_guides from "./Events/daily-guides.js";
import notifications from "./Events/notifications.js";
import schedule from "./Events/schedule.js";

// Fun
import bonk from "./Fun/bonk.js";
import Gift_Heart from "./Fun/Gift Heart.js";
import fight from "./Fun/fight.js";
import heart from "./Fun/heart.js";
import hug from "./Fun/hug.js";

// General
import calculate from "./General/calculate.js";
import roles from "./General/roles.js";
import Sky_Profile from "./General/Sky Profile.js";
import sky_profile from "./General/sky-profile.js";
import spirit from "./General/spirit.js";

const commands = {
	bonk: new bonk(),
	calculate: new calculate(),
	"d-daily-guides": new d_daily_guides(),
	"daily-guides": new daily_guides(),
	fight: new fight(),
	"Gift Heart": new Gift_Heart(),
	heart: new heart(),
	hug: new hug(),
	notifications: new notifications(),
	roles: new roles(),
	schedule: new schedule(),
	"Sky Profile": new Sky_Profile(),
	"sky-profile": new sky_profile(),
	spirit: new spirit(),
} as const;

export type CommandName = keyof typeof commands;

export function isCommandName(commandName: string): commandName is CommandName {
	return commandName in commands;
}

export function isChatInputCommand(command: BaseCommandData): command is ChatInputCommand {
	return command.type === ApplicationCommandType.ChatInput;
}

export function isAutocompleteCommand(command: BaseCommandData): command is AutocompleteCommand {
	return "autocomplete" in command;
}

export function isUserContextMenuCommand(command: BaseCommandData): command is UserContextMenuCommand {
	return command.type === ApplicationCommandType.User;
}

interface BaseCommandData {
	name: CommandName;
	type: ApplicationCommandType;
	developer?: boolean;
	get commandData(): ApplicationCommandData;
}

export interface ChatInputCommand extends BaseCommandData {
	chatInput(interaction: ChatInputCommandInteraction): Promise<void>;
}

export interface AutocompleteCommand extends ChatInputCommand {
	autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

export interface UserContextMenuCommand extends BaseCommandData {
	userContextMenu(interaction: UserContextMenuCommandInteraction): Promise<void>;
}

export default commands;
