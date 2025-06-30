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
	/Suggestion for (?<language>.+) was (?<action>.+) in project (?<project>.+?)\.?\nKey: (?<key>.+?) ?\nContext: (?<context>.+)\nFile: (?<file>.+)\nSource string: (?<source>.+)\nTranslation: (?<translation>.+)\nURL: (?<url>.+)/s;

const FILE_UPDATED_REGULAR_EXPRESSION =
	/File (?<file>.+) has been updated in the project (?<project>.+)\.\n(?<newStrings>\d+) new strings \((?<newWords>\d+) words\), (?<updatedStrings>\d+) updated strings \((?<updatedWords>\d+) words\), (?<deletedStrings>\d+) deleted strings \((?<deletedWords>\d+) words\)\.\nURL: (?<url>[^ ]+)(?: There are (?<similar>\d+) more similar events\.)?/;

const FILE_FULLY_TRANSLATED_REGULAR_EXPRESSION =
	/File (?<file>.+) is now fully translated into (?<language>.+) in project (?<project>.+)\.\nURL: (?<url>.+)/;

const BUILT_REGULAR_EXPRESSION =
	/Project (?<project>.+) are successfully built.\nDownload link: (?<url>.+)/;

const FINAL_TRANSLATION_REGULAR_EXPRESSION =
	/Final translation of string into (?<language>.+) was updated in the project (?<project>.+)\.\nKey: (?<key>.+)\nFile: (?<file>.+)\nOld translation: (?<oldTranslation>.+)?\nNew translation: (?<newTranslation>.+)?\nURL: (?<url>.+)/s;

const ISSUE_REGULAR_EXPRESSION =
	/An issue (?<issueType>has been updated|created) in (?<project>.+)\. ?\nIssue Type: (?<type>.+?)\. ?\nFile: (?<file>.+)\. ?\nText: (?<text>.+?) ?\nLanguage: (?<language>.+)\. ?\n\nURL: (?<url>.+)/s;

const PROJECT_FULLY_TRANSLATED_REGULAR_EXPRESSION =
	/Project (?<project>.+) is now fully translated into (?<language>.+)\.\nProject link: (?<url>.+)/;

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

const IssueTypeToString = {
	created: "created",
	"has been updated": "updated",
} as const satisfies Readonly<Record<string, string>>;

const ISSUE_TYPE_STRING_DEFAULT = "notification" as const;

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
		timestamp: new Date().toISOString(),
	};
}

function createFileUpdatedEmbed(message: GatewayMessageCreateDispatchData) {
	const result = FILE_UPDATED_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const {
		newStrings,
		newWords,
		updatedStrings,
		updatedWords,
		deletedStrings,
		deletedWords,
		url,
		similar,
	} = result.groups as {
		file: string;
		project: string;
		newStrings: string;
		newWords: string;
		updatedStrings: string;
		updatedWords: string;
		deletedStrings: string;
		deletedWords: string;
		url: string;
		similar?: string;
	};

	const newWordsText = newWords === "1" ? "1 word" : `${newWords} words`;
	const updatedWordsText = updatedWords === "1" ? "1 word" : `${updatedWords} words`;
	const deletedWordsText = deletedWords === "1" ? "1 word" : `${deletedWords} words`;

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `[Source file updated.](${url})${similar ? `\nThere are ${similar} more similar events.` : ""}`,
		fields: [
			{
				name: "New Strings",
				value: `${newStrings} (${newWordsText})`,
				inline: true,
			},
			{
				name: "Updated Strings",
				value: `${updatedStrings} (${updatedWordsText})`,
				inline: true,
			},
			{
				name: "Deleted Strings",
				value: `${deletedStrings} (${deletedWordsText})`,
				inline: true,
			},
		],
		timestamp: new Date().toISOString(),
	};
}

function createFileFullyTranslatedEmbed(message: GatewayMessageCreateDispatchData) {
	const result = FILE_FULLY_TRANSLATED_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const { language, url } = result.groups as {
		file: string;
		language: string;
		project: string;
		url: string;
	};

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `[File fully translated in ${CrowdinLanguageToLanguage[language as keyof typeof CrowdinLanguageToLanguage]}!](${url})`,
		timestamp: new Date().toISOString(),
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
		newTranslation?: string;
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
				value: newTranslation ?? "_Empty string_",
				inline: false,
			},
		],
		footer: {
			text: `${CrowdinLanguageToLanguage[language as keyof typeof CrowdinLanguageToLanguage]} | ${key}`,
		},
		timestamp: new Date().toISOString(),
	};
}

function createIssueEmbed(message: GatewayMessageCreateDispatchData) {
	const result = ISSUE_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const { issueType, type, text, language, url } = result.groups as {
		issueType: string;
		project: string;
		type: string;
		file: string;
		text: string;
		language: string;
		url: string;
	};

	let issueTypeString:
		| (typeof IssueTypeToString)[keyof typeof IssueTypeToString]
		| typeof ISSUE_TYPE_STRING_DEFAULT =
		IssueTypeToString[issueType as keyof typeof IssueTypeToString];

	if (!issueTypeString) {
		pino.error(message, "Unknown issue type in Crowdin message.");
		issueTypeString = ISSUE_TYPE_STRING_DEFAULT;
	}

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `[Issue ${issueTypeString}: \`${type}\`](${url})\n\n>>> ${text}`,
		footer: {
			text: `${CrowdinLanguageToLanguage[language as keyof typeof CrowdinLanguageToLanguage]}`,
		},
		timestamp: new Date().toISOString(),
	};
}

function createProjectFullyTranslatedEmbed(message: GatewayMessageCreateDispatchData) {
	const result = PROJECT_FULLY_TRANSLATED_REGULAR_EXPRESSION.exec(message.content);

	if (!result?.groups) {
		return;
	}

	const { language, url } = result.groups as {
		file: string;
		language: string;
		project: string;
		url: string;
	};

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `[Project fully translated in ${CrowdinLanguageToLanguage[language as keyof typeof CrowdinLanguageToLanguage]}!](${url})`,
		timestamp: new Date().toISOString(),
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
		message.content.startsWith("File ") &&
		message.content.includes(" has been updated in the project ")
	) {
		embed = createFileUpdatedEmbed(message);
	} else if (
		message.content.startsWith("File ") &&
		message.content.includes(" is now fully translated ")
	) {
		embed = createFileFullyTranslatedEmbed(message);
	} else if (
		message.content.startsWith("Project ") &&
		message.content.includes("are successfully built.")
	) {
		embed = createBuiltEmbed(message);
	} else if (message.content.startsWith("An issue ")) {
		embed = createIssueEmbed(message);
	} else if (
		message.content.startsWith("Project ") &&
		message.content.includes(" is now fully translated ")
	) {
		embed = createProjectFullyTranslatedEmbed(message);
	}

	if (!embed) {
		pino.error(message, "Unmatched embed for Crowdin.");
		return;
	}

	await client.api.channels.createMessage(channel.id, { embeds: [embed] });
}
