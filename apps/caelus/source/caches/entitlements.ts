import { Collection } from "@discordjs/collection";
import type { APIEntitlement, Snowflake } from "@discordjs/core";
import { client } from "../discord.js";
import { APPLICATION_ID } from "../utility/configuration.js";
import { SERVER_UPGRADE_SKU_ID } from "../utility/constants.js";

export const ENTITLEMENT_CACHE = new Collection<Snowflake, APIEntitlement>();

export async function fetchEntitlement(guildId: Snowflake) {
	const cachedEntitlement = ENTITLEMENT_CACHE.find(
		(entitlement) => entitlement.sku_id === SERVER_UPGRADE_SKU_ID,
	);

	if (cachedEntitlement) {
		return cachedEntitlement;
	}

	const [fetchedEntitlement] = await client.api.monetization.getEntitlements(APPLICATION_ID, {
		exclude_ended: true,
		guild_id: guildId,
		sku_ids: SERVER_UPGRADE_SKU_ID,
	});

	return fetchedEntitlement ?? null;
}

export function clearEntitlementCache() {
	ENTITLEMENT_CACHE.clear();
}
