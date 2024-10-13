import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
import admin from "./Admin/admin.js";
import dailyguides from "./Events/daily-guides.js";
import notifications from "./Events/notifications.js";
import schedule from "./Events/schedule.js";
import GiftHeart from "./Fun/Gift Heart.js";
import bonk from "./Fun/bonk.js";
import guess from "./Fun/guess.js";
import heart from "./Fun/heart.js";
import highfive from "./Fun/high-five.js";
import hug from "./Fun/hug.js";
import krill from "./Fun/krill.js";
import playfight from "./Fun/play-fight.js";
import SkyProfile from "./General/Sky Profile.js";
import about from "./General/about.js";
import ai from "./General/ai.js";
import calculate from "./General/calculate.js";
import catalogue from "./General/catalogue.js";
import data from "./General/data.js";
import sharderuption from "./General/shard-eruption.js";
import skyprofile from "./General/sky-profile.js";
import spirit from "./General/spirit.js";

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
