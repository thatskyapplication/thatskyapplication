import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
import GiftHeart from "./Gift Heart.js";
import SkyProfile from "./Sky Profile.js";
import about from "./about.js";
import admin from "./admin.js";
import ai from "./ai.js";
import bonk from "./bonk.js";
import calculate from "./calculate.js";
import catalogue from "./catalogue.js";
import dailyguides from "./daily-guides.js";
import data from "./data.js";
import guess from "./guess.js";
import heart from "./heart.js";
import highfive from "./high-five.js";
import hug from "./hug.js";
import krill from "./krill.js";
import notifications from "./notifications.js";
import playfight from "./play-fight.js";
import schedule from "./schedule.js";
import sharderuption from "./shard-eruption.js";
import skyprofile from "./sky-profile.js";
import spirit from "./spirit.js";

const COMMANDS = {
	about,
	admin,
	ai,
	bonk,
	calculate,
	catalogue,
	dailyguides,
	data,
	GiftHeart,
	guess,
	heart,
	highfive,
	hug,
	krill,
	notifications,
	playfight,
	schedule,
	sharderuption,
	SkyProfile,
	skyprofile,
	spirit,
} as const;

type Command = (typeof COMMANDS)[keyof typeof COMMANDS];
const commands = Object.values(COMMANDS);

export function resolveCommand(
	interaction: AutocompleteInteraction,
): (Command & AutocompleteCommand) | null;

export function resolveCommand(
	interaction: ChatInputCommandInteraction,
): (Command & ChatInputCommand) | null;

export function resolveCommand(
	interaction: UserContextMenuCommandInteraction,
): (Command & UserContextMenuCommand) | null;

export function resolveCommand(
	interaction: MessageContextMenuCommandInteraction,
): (Command & MessageContextMenuCommand) | null;

export function resolveCommand({
	commandName,
}:
	| AutocompleteInteraction
	| ChatInputCommandInteraction
	| UserContextMenuCommandInteraction
	| MessageContextMenuCommandInteraction) {
	return commands.find(({ name }) => name === commandName) ?? null;
}

interface BaseCommandData {
	readonly name: string;
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

interface MessageContextMenuCommand extends BaseCommandData {
	messageContextMenu(interaction: MessageContextMenuCommandInteraction): Promise<void>;
}

export default COMMANDS;
