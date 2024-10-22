export interface GuessPacket {
	user_id: string;
	streak: number | null;
	streak_hard: number | null;
	guild_ids: string[];
}
