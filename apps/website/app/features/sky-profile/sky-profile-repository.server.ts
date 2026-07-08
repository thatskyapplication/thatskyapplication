import { type SkyProfilePacket, Table } from "@thatskyapplication/utility";
import pg from "~/pg.server";

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
	return pg<SkyProfilePacket>(Table.SkyProfiles)
		.select(...SKY_PROFILE_EDITOR_COLUMNS)
		.where({ user_id: userId })
		.first();
}

export function publicProfilesQuery() {
	return pg<SkyProfilePacket>(Table.SkyProfiles).whereNotNull("name");
}
