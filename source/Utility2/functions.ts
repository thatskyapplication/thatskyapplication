import type { EntitlementManager, Snowflake } from "discord.js";
import { SERVER_UPGRADE_SKU_ID } from "./Constants.js";

export async function resolveEntitlement(
	entitlementManager: EntitlementManager,
	guildId: Snowflake,
) {
	return (
		entitlementManager.cache.find(
			(entitlement) =>
				entitlement.guildId === guildId && entitlement.skuId === SERVER_UPGRADE_SKU_ID,
		) ?? (await entitlementManager.fetch({ guild: guildId, skus: [SERVER_UPGRADE_SKU_ID] })).first()
	);
}
