export interface HeartPacket {
	user_id: string | null;
	giftee_id: string | null;
	timestamp: Date;
	count: number;
}

export const DELETED_USER_TEXT = "<deleted>" as const;
