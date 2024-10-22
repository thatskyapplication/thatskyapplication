import { Events } from "discord.js";
import AI from "../models/AI.js";
import { SERVER_UPGRADE_SKU_ID } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = Events.EntitlementUpdate;

export default {
	name,
	async fire(_, newEntitlement) {
		if (newEntitlement.skuId === SERVER_UPGRADE_SKU_ID) {
			if (!newEntitlement.isActive()) {
				// This is no longer active. Remove it.
				// A guild id is always present for this (guild subscription).
				await AI.delete(newEntitlement.guildId!);
			}
		}
	},
} satisfies Event<typeof name>;
