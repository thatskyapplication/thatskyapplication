import { GatewayDispatchEvents, RESTJSONErrorCodes } from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { Table, type UsersPacket } from "@thatskyapplication/utility";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID, SUPPORTER_ROLE_ID } from "../utility/configuration.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.EntitlementDelete;

export default {
	name,
	async fire({ data }) {
		if (data.user_id) {
			try {
				await pg<UsersPacket>(Table.Users)
					.update({ supporter: false })
					.where({ discord_user_id: data.user_id });

				await client.api.guilds.removeRoleFromMember(
					SUPPORT_SERVER_GUILD_ID,
					data.user_id,
					SUPPORTER_ROLE_ID,
				);
			} catch (error) {
				// Unknown member is fine.
				if (
					!(error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.UnknownMember)
				) {
					pino.error(error, "Error removing supporter state from member.");
				}
			}
		}
	},
} satisfies Event<typeof name>;
