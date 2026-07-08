import { GatewayDispatchEvents, RESTJSONErrorCodes } from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import database from "../database.js";
import { client } from "../discord.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID, SUPPORTER_ROLE_ID } from "../utility/configuration.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.EntitlementCreate;

export default {
	name,
	async fire({ data }) {
		if (data.user_id) {
			try {
				await database
					.insertInto("users")
					.values({ discord_user_id: data.user_id, supporter: true })
					.onConflict((oc) =>
						oc.column("discord_user_id").doUpdateSet((eb) => ({
							supporter: eb.ref("excluded.supporter"),
						})),
					)
					.execute();

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
					pino.error(error, "Error adding supporter state to member.");
				}
			}
		}
	},
} satisfies Event<typeof name>;
