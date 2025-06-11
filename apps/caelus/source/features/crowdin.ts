import {
	type APIEmbed,
	ChannelType,
	type GatewayMessageCreateDispatchData,
	PermissionFlagsBits,
} from "@discordjs/core";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import pino from "../pino.js";
import { CROWDIN_CHANNEL_ID } from "../utility/configuration.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { can } from "../utility/permissions.js";

const SUGGESTION_REGULAR_EXPRESSION =
	/Suggestion for (?<language>.+) was (?<action>:.+) in project (?<project>.+)\nKey: (?<key>.+?) ?\nContext: (?<context>.+)\nFile: (?<file>.+)\nSource string: (?<source>.+)\nTranslation: (?<translation>.+)\nURL: (?<url>.+)/;

const BUILT_REGULAR_EXPRESSION =
	/Project (?<project>.+) are successfully built.\nDownload link: (?<url>.+)/;

const FINAL_TRANSLATION_REGULAR_EXPRESSION =
	/Final translation of string into (?<language>.+) was updated in the project (?<project>.+)\.\nKey: (?<key>.+)\nFile: (?<file>.+)\nOld translation: (?<oldTranslation>.+)?\nNew translation: (?<newTranslation>.+)\nURL: (?<url>.+)/;

const CrowdinLanguageToLanguage = {
	"Chinese Simplified": "中文",
	"Chinese Traditional": "繁體中文",
	French: "Français",
	German: "Deutsch",
	Italian: "Italiano",
	Japanese: "日本語",
	Korean: "한국어",
	"Portuguese, Brazilian": "Português do Brasil",
	Russian: "Русский",
	Spanish: "Español",
	"Spanish, Latin America": "Español, LATAM",
	Thai: "ไทย",
	Vietnamese: "Tiếng Việt",
} as const satisfies Readonly<Record<string, string>>;

function createSuggestionEmbed(message: GatewayMessageCreateDispatchData) {
	const result = SUGGESTION_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const { language, action, key, context, source, translation, url } = result.groups as {
		language: string;
		action: string;
		project: string;
		key: string;
		context: string;
		file: string;
		source: string;
		translation: string;
		url: string;
	};

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `[Suggestion ${action}!](${url})`,
		fields: [
			{
				name: "Source",
				value: source,
				inline: false,
			},
			{
				name: "Translation",
				value: translation,
				inline: false,
			},
		],
		footer: {
			text: `${CrowdinLanguageToLanguage[language as keyof typeof CrowdinLanguageToLanguage]} | ${key} | ${context}`,
		},
	};
}

function createBuiltEmbed(message: GatewayMessageCreateDispatchData) {
	const result = BUILT_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const { url } = result.groups as { project: string; url: string };

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `Translations built! [Download](${url})`,
		timestamp: new Date().toISOString(),
	};
}

function createFinalTranslationEmbed(message: GatewayMessageCreateDispatchData) {
	const result = FINAL_TRANSLATION_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const { language, key, oldTranslation, newTranslation, url } = result.groups as {
		language: string;
		project: string;
		key: string;
		file: string;
		oldTranslation?: string;
		newTranslation: string;
		url: string;
	};

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `[Final translation updated!](${url})`,
		fields: [
			{
				name: "Old",
				value: oldTranslation ?? "_Empty string_",
				inline: false,
			},
			{
				name: "New",
				value: newTranslation,
				inline: false,
			},
		],
		footer: {
			text: `${CrowdinLanguageToLanguage[language as keyof typeof CrowdinLanguageToLanguage]} | ${key}`,
		},
	};
}

export async function crowdin(
	message: GatewayMessageCreateDispatchData,
	guild: Guild,
	me: GuildMember,
) {
	const channel = guild.channels.get(CROWDIN_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		pino.error(message, "Could not find the Crowdin channel.");
		return;
	}

	if (
		!can({
			permission:
				PermissionFlagsBits.EmbedLinks |
				PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.ViewChannel,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error(message, "Missing permissions to post in the Crowdin channel.");
		return;
	}

	let embed: APIEmbed | undefined;

	if (message.content.startsWith("Suggestion for")) {
		embed = createSuggestionEmbed(message);
	} else if (message.content.startsWith("Final translation of string")) {
		embed = createFinalTranslationEmbed(message);
	} else if (
		message.content.startsWith("Project ") &&
		message.content.includes("are successfully built.")
	) {
		embed = createBuiltEmbed(message);
	}

	if (!embed) {
		pino.error(message, "Unmatched embed for Crowdin.");
		return;
	}

	await client.api.channels.createMessage(channel.id, { embeds: [embed] });
}
