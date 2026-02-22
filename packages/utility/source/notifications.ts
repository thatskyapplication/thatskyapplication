export interface NotificationPacket {
	guild_id: string;
	type: number;
	channel_id: string | null;
	role_id: string | null;
	offset: number | null;
	sendable: boolean;
	locale: string;
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
	NestingWorkshop: 14,
	Maintenance: 15,
} as const satisfies Readonly<Record<string, number>>;

export type NotificationTypes = (typeof NotificationType)[keyof typeof NotificationType];
export const NOTIFICATION_TYPE_VALUES = Object.values(NotificationType);
