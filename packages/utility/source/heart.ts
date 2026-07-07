import type { Kysely } from "kysely";
import type { DB } from "./database/schema.js";

export function heartHistory(database: Kysely<DB>, userId: string, limit: number, offset: number) {
	return database
		.selectFrom("hearts")
		.leftJoin("sky_profiles as giftee_profile", "giftee_profile.user_id", "hearts.giftee_id")
		.leftJoin("sky_profiles as user_profile", "user_profile.user_id", "hearts.user_id")
		.select([
			"hearts.user_id",
			"hearts.giftee_id",
			"hearts.timestamp",
			"hearts.count",
			"giftee_profile.name as giftee_name",
			"user_profile.name as user_name",
		])
		.where((eb) => eb.or([eb("hearts.user_id", "=", userId), eb("hearts.giftee_id", "=", userId)]))
		.orderBy("hearts.timestamp", "desc")
		.orderBy("hearts.user_id", "asc")
		.orderBy("hearts.giftee_id", "asc")
		.limit(limit)
		.offset(offset)
		.execute();
}

export async function totalHearts(
	database: Kysely<DB>,
	column: "giftee_id" | "user_id",
	userId: string,
) {
	const result = await database
		.selectFrom("hearts")
		.select((eb) => eb.fn.sum<string | null>("count").as("sum"))
		.where(column, "=", userId)
		.executeTakeFirst();

	return Number(result?.sum ?? 0);
}

export async function heartHistoryTotal(database: Kysely<DB>, userId: string) {
	const result = await database
		.selectFrom("hearts")
		.select((eb) => eb.fn.countAll<string>().as("totalRows"))
		.where((eb) => eb.or([eb("user_id", "=", userId), eb("giftee_id", "=", userId)]))
		.executeTakeFirst();

	return Number(result?.totalRows ?? 0);
}

export const MAXIMUM_HEARTS_PER_DAY = 3 as const;
export const DELETED_USER_TEXT = "<deleted>" as const;

export const SkyProfileMissingNameSource = {
	Heart: 0,
	Guess: 1,
} as const satisfies Readonly<Record<string, number>>;

export const SKY_PROFILE_MISSING_NAME_SOURCE_VALUES = Object.values(SkyProfileMissingNameSource);
export type SkyProfileMissingNameSources = (typeof SKY_PROFILE_MISSING_NAME_SOURCE_VALUES)[number];
