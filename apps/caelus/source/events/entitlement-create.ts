import { GatewayDispatchEvents, RESTJSONErrorCodes } from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { Table, type UsersPacket } from "@thatskyapplication/utility";
import { client } from "../discord.js";
import pg from "../pg.js";
import { SUPPORT_SERVER_GUILD_ID, SUPPORTER_ROLE_ID } from "../utility/configuration.js";
import { captureError } from "../utility/functions.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.EntitlementCreate;

export default {
	name,
	async fire({ data }) {
		if (data.user_id) {
			try {
				await pg<UsersPacket>(Table.Users)
					.insert({ discord_user_id: data.user_id, supporter: true })
					.onConflict("discord_user_id")
					.merge();

				await client.api.guilds.addRoleToMember(
					SUPPORT_SERVER_GUILD_ID,
					data.user_id,
					SUPPORTER_ROLE_ID,
				);
			} catch (error) {
				// Unknown member is fine.
				if (
					!(error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.UnknownMember)
				) {
					captureError(error, "Error adding supporter state to member.");
				}
			}
		}
	},
} satisfies Event<typeof name>;
