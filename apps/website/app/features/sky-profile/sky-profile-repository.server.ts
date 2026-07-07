import database from "~/database.server";

const SKY_PROFILE_EDITOR_COLUMNS = [
	"icon",
	"banner",
	"name",
	"description",
	"seasons",
	"spirit",
	"hangout",
	"personality",
	"country",
	"platform",
	"winged_light",
	"catalogue_progression",
	"guess_rank",
] as const;

export function getSkyProfilePacket(userId: string) {
	return database
		.selectFrom("sky_profiles")
		.select(SKY_PROFILE_EDITOR_COLUMNS)
		.where("user_id", "=", userId)
		.executeTakeFirst();
}

export function publicProfilesQuery() {
	return database.selectFrom("sky_profiles").where("name", "is not", null);
}
