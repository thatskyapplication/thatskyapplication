import { Events } from "discord.js";
import AI from "../Structures/AI.js";
import { SERVER_UPGRADE_SKU_ID } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = Events.EntitlementDelete;

export default {
	name,
	async fire(entitlement) {
		if (entitlement.skuId === SERVER_UPGRADE_SKU_ID) {
			await AI.delete(entitlement.guildId!);
		}
	},
} satisfies Event<typeof name>;
