import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { CHAT_INPUT_COMMANDS } from "../commands/index.js";
import { client } from "../discord.js";
import { handleChannelSelectMenu as handleMemberLogChannelSelectMenu } from "../features/member-log.js";
import {
	handleMessageLogAllowChannelSelectMenu,
	handleMessageLogChannelSelectMenu,
	handleMessageLogIgnoreChannelSelectMenu,
} from "../features/message-log.js";
import pino from "../pino.js";
import { ERROR_RESPONSE, NOT_IN_CACHED_GUILD_RESPONSE } from "../utility/constants.js";
import { isGuildChannelSelectMenu, isGuildChatInputCommand } from "../utility/functions.js";
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
				pino.error(error, "Error whilst executing chat input command.");
			}

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
			} catch (error) {
				pino.error(error, "Error whilst executing channel select menu interaction.");
				return;
			}

			pino.warn(data, "Received an unknown channel select menu interaction.");
			await client.api.interactions.updateMessage(data.id, data.token, ERROR_RESPONSE);
			return;
		}
	},
} satisfies Event<typeof name>;
