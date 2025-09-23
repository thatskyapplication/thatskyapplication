import { GatewayDispatchEvents } from "@discordjs/core";
import { isDuring, skyNow, Table, type UsersPacket } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import { eligible } from "../features/giveaway.js";
import { sendWelcomeMessage, type WelcomePacketWithChannel } from "../features/welcome.js";
import pg from "../pg.js";
import pino from "../pino.js";
import {
	ARTIST_ROLE_ID,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORTER_ROLE_ID,
	TRANSLATOR_ROLE_ID,
} from "../utility/configuration.js";
import { GIVEAWAY_END_DATE, GIVEAWAY_START_DATE } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount++;

			const welcomePacket = await pg<WelcomePacketWithChannel>(Table.Welcome)
				.where({ guild_id: data.guild_id })
				.and.whereNotNull("welcome_channel_id")
				.first();

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
			if (isDuring(GIVEAWAY_START_DATE, GIVEAWAY_END_DATE, skyNow())) {
				await eligible({ userId: data.user.id });
			}

			const usersPacket = await pg<UsersPacket>(Table.Users)
				.where({ discord_user_id: data.user.id })
				.first();

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
