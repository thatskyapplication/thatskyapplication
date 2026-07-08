import type { Snowflake } from "@discordjs/core/http-only";
import { GUESS_RANK_SQL, type GuessTypes } from "@thatskyapplication/utility";
import { sql } from "kysely";
import database from "~/database.server";

export async function getSkyProfileCatalogueData(userId: Snowflake) {
	const catalogue = await database
		.selectFrom("catalogue")
		.selectAll()
		.where("user_id", "=", userId)
		.executeTakeFirst();

	return catalogue ? new Set(catalogue.data) : null;
}

export function findGuessUserRanking(userId: Snowflake, type: GuessTypes) {
	return database
		.selectFrom((eb) =>
			eb
				.selectFrom("guess")
				.select(["user_id", "type", "streak", sql.raw<number>(GUESS_RANK_SQL).as("rank")])
				.where("streak", ">", 0)
				.as("ranked_guess"),
		)
		.selectAll()
		.where("user_id", "=", userId)
		.where("type", "=", type)
		.executeTakeFirst();
}
