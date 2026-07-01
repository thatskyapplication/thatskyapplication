import { skyToday } from "./dates.js";

export interface ChecklistPacket {
	user_id: string;
	daily_quests: boolean;
	seasonal_candles: boolean;
	eye_of_eden: boolean;
	shard_eruptions: boolean;
	event_tickets: boolean;
	last_updated_at: Date;
}

export type ChecklistSetData = Partial<ChecklistPacket> & Pick<ChecklistPacket, "last_updated_at">;

export function checklistResetPayload(lastUpdatedAt: Date, now: Date): ChecklistSetData {
	const lastUpdatedTimestamp = lastUpdatedAt.getTime();
	const payload: ChecklistSetData = { last_updated_at: now };
	const today = skyToday();

	if (today.toMillis() > lastUpdatedTimestamp) {
		payload.daily_quests = false;
		payload.seasonal_candles = false;
		payload.shard_eruptions = false;
		payload.event_tickets = false;
	}

	if (today.minus({ days: today.weekday % 7 }).toMillis() > lastUpdatedTimestamp) {
		payload.eye_of_eden = false;
	}

	return payload;
}
