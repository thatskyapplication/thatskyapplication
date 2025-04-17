import knex from "knex";
import { DATABASE_URL } from "./utility/constants.js";

export enum Table {
	GuildSettings = "guild_settings",
	Messages = "messages",
}

export default knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
