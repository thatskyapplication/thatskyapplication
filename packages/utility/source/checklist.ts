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
