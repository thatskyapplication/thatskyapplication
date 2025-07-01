import { GatewayDispatchEvents } from "@discordjs/core";
import { isDuring, skyNow, Table, type UsersPacket } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import { eligible } from "../features/giveaway.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { TRANSLATOR_ROLE_ID } from "../utility/configuration.js";
import {
	DEVELOPER_GUILD_ID,
	GIVEAWAY_END_DATE,
	GIVEAWAY_START_DATE,
} from "../utility/constants.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount++;
		} else {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}

		if (data.guild_id === DEVELOPER_GUILD_ID) {
			if (
				await pg<UsersPacket>(Table.Users)
					.where({ discord_user_id: data.user.id })
					.and.whereNotNull("crowdin_user_id")
					.first()
			) {
				pino.info(data, "Added translator role to user.");

				await client.api.guilds.addRoleToMember(
					DEVELOPER_GUILD_ID,
					data.user.id,
					TRANSLATOR_ROLE_ID,
				);
			}

			if (isDuring(GIVEAWAY_START_DATE, GIVEAWAY_END_DATE, skyNow())) {
				await eligible({ userId: data.user.id });
			}
		}
	},
} satisfies Event<typeof name>;
