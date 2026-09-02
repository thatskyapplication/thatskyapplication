import type { Snowflake } from "@discordjs/core";
import { sql } from "kysely";
import { GUESS_RANK_SQL, type GuessTypes } from "@thatskyapplication/utility";
import database from "../database.js";

const GUESS_RANK_RAW = sql.raw<number>(GUESS_RANK_SQL);

export async function findUser(userId: Snowflake, type: GuessTypes) {
	const result = await database
		.selectFrom((eb) =>
			eb
				.selectFrom("guess")
				.select(["user_id", "type", "streak", GUESS_RANK_RAW.as("rank")])
				.where("streak", ">", 0)
				.as("ranked_guess"),
		)
		.selectAll()
		.where("user_id", "=", userId)
		.where("type", "=", type)
		.executeTakeFirst();

	return result;
}
