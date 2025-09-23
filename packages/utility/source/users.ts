export interface UsersPacket {
	discord_user_id: string | null;
	crowdin_user_id: number | null;
	supporter: boolean | null;
	artist: boolean | null;
	translator: boolean | null;
}
