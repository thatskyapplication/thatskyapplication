import type { Kysely } from "kysely";
import type { Packet } from "./database/index.js";
import type { DB } from "./database/schema.js";
import { skyToday } from "./dates.js";

export type ChecklistSetData = Partial<Packet<"checklist">> &
	Pick<Packet<"checklist">, "last_updated_at">;

export function checklistResetPayload(lastUpdatedAt: Date, now: Date): ChecklistSetData {
	const lastUpdatedTimestamp = lastUpdatedAt.getTime();
	const payload: ChecklistSetData = { last_updated_at: now };
	const today = skyToday();

	if (today.epochMilliseconds > lastUpdatedTimestamp) {
		payload.daily_quests = false;
		payload.seasonal_candles = false;
		payload.shard_eruptions = false;
		payload.event_tickets = false;
	}

	if (today.subtract({ days: today.dayOfWeek % 7 }).epochMilliseconds > lastUpdatedTimestamp) {
		payload.eye_of_eden = false;
	}

	return payload;
}

export async function checklistRefresh(database: Kysely<DB>, checklistPacket: Packet<"checklist">) {
	const payload = checklistResetPayload(checklistPacket.last_updated_at, new Date());

	if (Object.keys(payload).length === 1) {
		return;
	}

	return database
		.updateTable("checklist")
		.set(payload)
		.where("user_id", "=", checklistPacket.user_id)
		.returningAll()
		.executeTakeFirst();
}
