/* eslint-disable import/order */
import {
	type ApplicationCommandData,
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	type MessageContextMenuCommandInteraction,
	type UserContextMenuCommandInteraction,
	hyperlink,
	MessageFlags,
} from "discord.js";

// Developer
import admin from "./Admin/admin.js";

// Events
import dailyguides from "./Events/daily-guides.js";
import notifications from "./Events/notifications.js";
import schedule from "./Events/schedule.js";

// Fun
import bonk from "./Fun/bonk.js";
import GiftHeart from "./Fun/Gift Heart.js";
import guess from "./Fun/guess.js";
import heart from "./Fun/heart.js";
import highfive from "./Fun/high-five.js";
import hug from "./Fun/hug.js";
import krill from "./Fun/krill.js";
import playfight from "./Fun/play-fight.js";

// General
import ai from "./General/ai.js";
import about from "./General/about.js";
import calculate from "./General/calculate.js";
import catalogue from "./General/catalogue.js";
import data from "./General/data.js";
import sharderuption from "./General/shard-eruption.js";
import SkyProfile from "./General/Sky Profile.js";
import skyprofile from "./General/sky-profile.js";
import spirit from "./General/spirit.js";
import { APPLICATION_INVITE_URL, SUPPORT_SERVER_INVITE_URL } from "../Utility/Constants.js";

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
export const commands = Object.values(COMMANDS);

export function resolveCommand(interaction: AutocompleteInteraction): (Command & AutocompleteCommand) | null;
export function resolveCommand(interaction: ChatInputCommandInteraction): (Command & ChatInputCommand) | null;

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
	return commands.find(({ data }) => data.name === commandName) ?? null;
}

interface BaseCommandData {
	readonly data: ApplicationCommandData;
	readonly developer?: boolean;
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

export interface MessageContextMenuCommand extends BaseCommandData {
	messageContextMenu(interaction: MessageContextMenuCommandInteraction): Promise<void>;
}

export const NOT_IN_GUILD_RESPONSE = {
	content: `This command may only be used in a server.\nIf you need help, join the ${hyperlink(
		"support server",
		SUPPORT_SERVER_INVITE_URL,
	)}!`,
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
} as const;

export const NOT_IN_CACHED_GUILD_RESPONSE = {
	content: `This command requires me to be present in the server. ${hyperlink(
		"Invite me",
		APPLICATION_INVITE_URL,
	)} with the bot scope and try again!\nIf you need help, join the ${hyperlink(
		"support server",
		SUPPORT_SERVER_INVITE_URL,
	)}!`,
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
} as const;

export default COMMANDS;
