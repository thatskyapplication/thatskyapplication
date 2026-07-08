import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import database from "../database.js";
import { client } from "../discord.js";
import { memberLogSendJoinLeave } from "../features/member-log.js";
import { sendWelcomeMessage } from "../features/welcome.js";
import pino from "../pino.js";
import {
	ARTIST_ROLE_ID,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORTER_ROLE_ID,
	TRANSLATOR_ROLE_ID,
} from "../utility/configuration.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount++;

			if (guild.id === SUPPORT_SERVER_GUILD_ID) {
				await memberLogSendJoinLeave({ guild, member: data });
			}

			const welcomePacket = await database
				.selectFrom("welcome")
				.selectAll()
				.where("guild_id", "=", data.guild_id)
				.where("welcome_channel_id", "is not", null)
				.$narrowType<{ welcome_channel_id: string }>()
				.executeTakeFirst();

			if (welcomePacket) {
				await sendWelcomeMessage({
					userId: data.user.id,
					welcomePacket,
					locale: guild.preferredLocale,
				});
			}
		} else {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}

		if (data.guild_id === SUPPORT_SERVER_GUILD_ID) {
			const usersPacket = await database
				.selectFrom("users")
				.selectAll()
				.where("discord_user_id", "=", data.user.id)
				.executeTakeFirst();

			if (usersPacket?.translator) {
				pino.info(data, "Adding translator role to user.");

				await client.api.guilds.addRoleToMember(
					SUPPORT_SERVER_GUILD_ID,
					data.user.id,
					TRANSLATOR_ROLE_ID,
				);
			}

			if (usersPacket?.supporter) {
				pino.info(data, "Adding supporter role to user.");

				await client.api.guilds.addRoleToMember(
					SUPPORT_SERVER_GUILD_ID,
					data.user.id,
					SUPPORTER_ROLE_ID,
				);
			}

			if (usersPacket?.artist) {
				pino.info(data, "Adding artist role to user.");

				await client.api.guilds.addRoleToMember(
					SUPPORT_SERVER_GUILD_ID,
					data.user.id,
					ARTIST_ROLE_ID,
				);
			}
		}
	},
} satisfies Event<typeof name>;
