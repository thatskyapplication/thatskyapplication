import type { Kysely } from "kysely";
import type { Packet } from "./database/index.js";
import type { DB } from "./database/schema.js";
import { TIME_ZONE } from "./dates.js";
import { AreaName } from "./kingdom/geography.js";

export const CHECKLIST_HIDDEN_COLUMNS = [
	"daily_quests_hidden",
	"seasonal_candles_hidden",
	"eye_of_eden_hidden",
	"shard_eruptions_hidden",
	"dye_workshop_hidden",
	"do_not_disturb_hidden",
	"event_tickets_hidden",
] as const satisfies readonly (keyof Packet<"checklist">)[];

export type ChecklistHiddenColumn = (typeof CHECKLIST_HIDDEN_COLUMNS)[number];

export const ChecklistHiddenColumnToLocaleKey = {
	daily_quests_hidden: "general:daily-quests",
	seasonal_candles_hidden: "general:seasonal-candles",
	eye_of_eden_hidden: `general:areas.${AreaName.EyeOfEden}`,
	shard_eruptions_hidden: "features:shard-eruption.name-plural",
	dye_workshop_hidden: "general:dye-workshop",
	do_not_disturb_hidden: "features:checklist.do-not-disturb-blessing",
	event_tickets_hidden: "general:event-tickets",
} as const satisfies Readonly<Record<ChecklistHiddenColumn, string>>;

export type ChecklistColumn = Exclude<keyof Packet<"checklist">, "last_updated_at" | "user_id">;

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
