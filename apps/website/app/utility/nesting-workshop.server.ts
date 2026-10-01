import type { Snowflake } from "@discordjs/core/http-only";
import {
	fetchNestingWorkshop,
	nestingWorkshopDate,
	resolveNestingWorkshopItems,
} from "@thatskyapplication/utility";
import database from "~/database.server";
import { getSkyProfileCatalogueData } from "~/features/sky-profile/sky-profile-public.server.js";

export async function fetchNestingWorkshopProps(
	date: Temporal.PlainDate,
	userId: Snowflake | undefined,
) {
	const [nestingWorkshopPacket, catalogue] = await Promise.all([
		fetchNestingWorkshop(database, date),
		userId && nestingWorkshopDate(date) ? getSkyProfileCatalogueData(userId) : null,
	]);

	return resolveNestingWorkshopItems(nestingWorkshopPacket?.cosmetics ?? []).map((item) => ({
		item,
		owned: item.cosmetics.every((cosmetic) => catalogue?.has(cosmetic)),
	}));
}
