export interface ChecklistPacket {
	user_id: string;
	daily_quests: boolean;
	seasonal_candles: boolean;
	eye_of_eden: boolean;
	shard_eruptions: boolean;
	event_tickets: boolean;
}

export type ChecklistSetData = Partial<Omit<ChecklistPacket, "user_id">>;