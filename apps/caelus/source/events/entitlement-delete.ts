import { GatewayDispatchEvents } from "@discordjs/core";
import AI from "../models/AI.js";
import { SERVER_UPGRADE_SKU_ID } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.EntitlementDelete;

export default {
	name,
	async fire({ data }) {
		if (data.sku_id === SERVER_UPGRADE_SKU_ID) {
			// A guild id is always present for this (guild subscription).
			await AI.delete(data.guild_id!);
		}
	},
} satisfies Event<typeof name>;
