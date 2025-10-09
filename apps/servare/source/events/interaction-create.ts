import { GatewayDispatchEvents } from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { addBreadcrumb } from "@sentry/node";
import { GUILD_CACHE } from "../caches/guilds.js";
import { CHAT_INPUT_COMMANDS, MESSAGE_CONTEXT_MENU_COMMANDS } from "../commands/index.js";
import { client } from "../discord.js";
import { handleChannelSelectMenu as handleMemberLogChannelSelectMenu } from "../features/member-log.js";
import {
	handleMessageLogAllowChannelSelectMenu,
	handleMessageLogChannelSelectMenu,
	handleMessageLogIgnoreChannelSelectMenu,
} from "../features/message-log.js";
import {
	cancel,
	confirmation,
	create,
	handleChannelSelectMenu as handleReportChannelSelectMenu,
	handleStringSelectMenu as handleReportTagStringSelectMenu,
} from "../features/report.js";
import pino from "../pino.js";
import { ERROR_RESPONSE, NOT_IN_CACHED_GUILD_RESPONSE } from "../utility/constants.js";
import {
	isGuildButton,
	isGuildChannelSelectMenu,
	isGuildChatInputCommand,
	isGuildMessageContextMenuCommand,
	isGuildModalSubmit,
	isGuildStringSelectMenu,
} from "../utility/functions.js";
import { CustomId, schemaStore } from "../utility/string-store.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.InteractionCreate;

export default {
	name,
	async fire({ data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn(data, "Received an interaction from an uncached guild.");
			await client.api.interactions.reply(data.id, data.token, NOT_IN_CACHED_GUILD_RESPONSE);
			return;
		}

		if (isGuildChatInputCommand(data)) {
			const command = CHAT_INPUT_COMMANDS.find(({ name }) => name === data.data.name);

			if (!command) {
				pino.warn(data, "Received an unknown chat input command interaction.");
				await client.api.interactions.reply(data.id, data.token, ERROR_RESPONSE);
				return;
			}

			try {
				await command.chatInput(data, guild);
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data,
					category: "Interaction",
					message: "Chat input command failed.",
					timestamp: DiscordSnowflake.timestampFrom(data.id) / 1000,
				});

				pino.error(error, "Error whilst executing chat input command.");
			}

			return;
		}

		if (isGuildMessageContextMenuCommand(data)) {
			const command = MESSAGE_CONTEXT_MENU_COMMANDS.find(({ name }) => name === data.data.name);

			if (!command) {
				pino.warn(data, "Received an unknown message context menu command interaction.");
				await client.api.interactions.reply(data.id, data.token, ERROR_RESPONSE);
				return;
			}

			try {
				await command.messageContextMenu(data, guild);
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data,
					category: "Interaction",
					message: "Message context menu command failed.",
					timestamp: DiscordSnowflake.timestampFrom(data.id) / 1000,
				});

				pino.error(error, "Error whilst executing message context menu command.");
			}

			return;
		}

		if (isGuildButton(data)) {
			try {
				const schemaData = schemaStore.deserialize(data.data.custom_id);

				if (schemaData.id === CustomId.ReportModalConfirmationConfirm) {
					await create(data, schemaData.data);
					return;
				}

				if (schemaData.id === CustomId.ReportModalConfirmationCancel) {
					await cancel(data);
					return;
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data,
					category: "Interaction",
					message: "Button interaction failed.",
					timestamp: DiscordSnowflake.timestampFrom(data.id) / 1000,
				});

				pino.error(error, "Error whilst handling a button interaction.");
				return;
			}

			pino.warn(data, "Received an unknown button interaction.");
			await client.api.interactions.updateMessage(data.id, data.token, ERROR_RESPONSE);
			return;
		}

		if (isGuildStringSelectMenu(data)) {
			try {
				const schemaData = schemaStore.deserialize(data.data.custom_id);

				if (schemaData.id === CustomId.ReportTag) {
					await handleReportTagStringSelectMenu(data, guild);
					return;
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data,
					category: "Interaction",
					message: "String select interaction failed.",
					timestamp: DiscordSnowflake.timestampFrom(data.id) / 1000,
				});

				pino.error(error, "Error whilst executing string select menu interaction.");
				return;
			}

			pino.warn(data, "Received an unknown string select menu interaction.");
			await client.api.interactions.updateMessage(data.id, data.token, ERROR_RESPONSE);
			return;
		}

		if (isGuildChannelSelectMenu(data)) {
			try {
				const schemaData = schemaStore.deserialize(data.data.custom_id);

				if (schemaData.id === CustomId.MemberLog) {
					await handleMemberLogChannelSelectMenu(data, guild);
					return;
				}

				if (schemaData.id === CustomId.MessageLogChannelId) {
					await handleMessageLogChannelSelectMenu(data, guild);
					return;
				}

				if (schemaData.id === CustomId.MessageLogIgnoreChannelIds) {
					await handleMessageLogIgnoreChannelSelectMenu(data, guild);
					return;
				}

				if (schemaData.id === CustomId.MessageLogAllowChannelIds) {
					await handleMessageLogAllowChannelSelectMenu(data, guild);
					return;
				}

				if (schemaData.id === CustomId.ReportChannel) {
					await handleReportChannelSelectMenu(data, guild);
					return;
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data,
					category: "Interaction",
					message: "Channel select failed.",
					timestamp: DiscordSnowflake.timestampFrom(data.id) / 1000,
				});

				pino.error(error, "Error whilst executing channel select menu interaction.");
				return;
			}

			pino.warn(data, "Received an unknown channel select menu interaction.");
			await client.api.interactions.updateMessage(data.id, data.token, ERROR_RESPONSE);
			return;
		}

		if (isGuildModalSubmit(data)) {
			try {
				const schemaData = schemaStore.deserialize(data.data.custom_id);

				if (schemaData.id === CustomId.ReportModalResponse) {
					await confirmation(data, guild, schemaData.data);
					return;
				}
			} catch (error) {
				addBreadcrumb({
					type: "user",
					level: "error",
					data,
					category: "Interaction",
					message: "Modal submit failed.",
					timestamp: DiscordSnowflake.timestampFrom(data.id) / 1000,
				});

				pino.error(error, "Error whilst handling a modal submit interaction.");
				return;
			}

			pino.warn(data, "Received an unknown modal submit interaction.");
			await client.api.interactions.reply(data.id, data.token, ERROR_RESPONSE);
		}
	},
} satisfies Event<typeof name>;
