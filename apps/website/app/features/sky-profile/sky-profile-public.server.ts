import type { Snowflake } from "@discordjs/core/http-only";
import {
	type CataloguePacket,
	type GuessTypes,
	type GuessUserRanking,
	Table,
} from "@thatskyapplication/utility";
import pg from "~/pg.server";

export async function getSkyProfileCatalogueData(userId: Snowflake) {
	const catalogue = await pg<CataloguePacket>(Table.Catalogue).where({ user_id: userId }).first();
	return catalogue ? new Set(catalogue.data) : null;
}

export async function findGuessUserRanking(userId: Snowflake, type: GuessTypes) {
	return pg
		.select<GuessUserRanking>()
		.from(
			pg(Table.Guess)
				.select(
					"user_id",
					"type",
					"streak",
					pg.raw("row_number() over (partition by type order by streak desc)::int as rank"),
				)
				.where("streak", ">", 0),
		)
		.where({ user_id: userId, type })
		.first();
}
