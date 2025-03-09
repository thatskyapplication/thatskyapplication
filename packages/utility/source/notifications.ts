export interface NotificationPacket {
	guild_id: string;
	type: number;
	channel_id: string;
	role_id: string;
	offset: number;
	sendable: boolean;
}

export const NotificationType = {
	DailyReset: 0,
	EyeOfEden: 1,
	InternationalSpaceStation: 2,
	Dragon: 3,
	PollutedGeyser: 4,
	Grandma: 5,
	Turtle: 6,
	RegularShardEruption: 7,
	StrongShardEruption: 8,
	AURORA: 9,
	Passage: 10,
	AviarysFireworkFestival: 11,
	TravellingSpirit: 12,
	DreamsSkater: 13,
} as const satisfies Readonly<Record<string, number>>;

export type NotificationTypes = (typeof NotificationType)[keyof typeof NotificationType];
export const NOTIFICATION_TYPE_VALUES = Object.values(NotificationType);
