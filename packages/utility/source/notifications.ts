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
	Events: 16,
} as const satisfies Readonly<Record<string, number>>;

export type NotificationTypes = (typeof NotificationType)[keyof typeof NotificationType];
export const NOTIFICATION_TYPE_VALUES = Object.values(NotificationType);

// Cannot exceed 24.
export const NotificationOffsetToMaximumValues = {
	[NotificationType.DailyReset]: 15,
	[NotificationType.EyeOfEden]: 24,
	[NotificationType.InternationalSpaceStation]: 10,
	[NotificationType.Dragon]: 10,
	[NotificationType.PollutedGeyser]: 10,
	[NotificationType.Grandma]: 10,
	[NotificationType.Turtle]: 10,
	[NotificationType.RegularShardEruption]: 10,
	[NotificationType.StrongShardEruption]: 10,
	[NotificationType.AURORA]: 15,
	[NotificationType.Passage]: 5,
	[NotificationType.AviarysFireworkFestival]: 15,
	[NotificationType.TravellingSpirit]: 15,
	[NotificationType.DreamsSkater]: 10,
	[NotificationType.NestingWorkshop]: 15,
	[NotificationType.Maintenance]: 15,
	[NotificationType.Events]: 15,
} as const satisfies Readonly<Record<NotificationTypes, number>>;
