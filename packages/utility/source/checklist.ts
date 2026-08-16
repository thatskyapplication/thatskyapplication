import type { Kysely } from "kysely";
import type { Packet } from "./database/index.js";
import type { DB } from "./database/schema.js";
import { TIME_ZONE } from "./dates.js";

export type ChecklistSetData = Partial<Packet<"checklist">> &
	Pick<Packet<"checklist">, "last_updated_at">;

export function checklistResetPayload(lastUpdatedAt: Date, now: Date): ChecklistSetData {
	const lastUpdatedTimestamp = lastUpdatedAt.getTime();
	const payload: ChecklistSetData = { last_updated_at: now };
	const today = Temporal.Instant.fromEpochMilliseconds(now.getTime())
		.toZonedDateTimeISO(TIME_ZONE)
		.startOfDay();

	if (today.epochMilliseconds > lastUpdatedTimestamp) {
		payload.daily_quests = false;
		payload.do_not_disturb = false;
		payload.seasonal_candles = false;
		payload.shard_eruptions = false;
		payload.event_tickets = false;
	}

	if (
		today.subtract({ days: (today.dayOfWeek - 5 + 7) % 7 }).epochMilliseconds > lastUpdatedTimestamp
	) {
		payload.dye_workshop = false;
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
