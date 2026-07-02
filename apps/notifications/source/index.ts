import { API, Locale, MessageFlags, RESTJSONErrorCodes } from "@discordjs/core";
import { DiscordAPIError, REST } from "@discordjs/rest";
import { captureCheckIn } from "@sentry/node";
import {
	type AreaName,
	DOUBLE_HEART_EVENTS,
	de,
	type EventIds,
	enGB,
	epochSeconds,
	es419,
	esES,
	formatEmoji,
	fr,
	INTERNATIONAL_SPACE_STATION_DATES,
	isDuring,
	it,
	ja,
	ko,
	MAINTENANCE_PERIODS,
	NotificationOffsetToMaximumValues,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
	ptBR,
	RADIANCE_EVENTS,
	type RealmName,
	ru,
	type SeasonIds,
	shardEruption,
	skyCurrentSeason,
	skyNow,
	skyUpcomingEvents,
	skyUpcomingSeason,
	Table,
	TIME_ZONE,
	TRAVELLING_DATES,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import { Cron } from "croner";
import { init, t } from "i18next";
import { NotificationError } from "./models/notification-error.js";
import { pg } from "./pg.js";
import pino from "./pino.js";
import { DISCORD_TOKEN } from "./utility/configuration.js";
import {
	DyeTypeToEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
} from "./utility/emojis.js";
import { notificationNonce } from "./utility/functions.js";

void init({
	fallbackLng: Locale.EnglishGB,
	interpolation: {
		escapeValue: false,
	},
	missingKeyHandler: (locale, namespace, key) =>
		pino.warn(`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`),
	ns: ["general", "commands", "features"],
	resources: {
		[Locale.German]: de,
		[Locale.EnglishGB]: enGB,
		[Locale.SpanishLATAM]: es419,
		[Locale.SpanishES]: esES,
		[Locale.French]: fr,
		[Locale.Italian]: it,
		[Locale.Japanese]: ja,
		[Locale.Korean]: ko,
		[Locale.PortugueseBR]: ptBR,
		[Locale.Russian]: ru,
		[Locale.Thai]: th,
		[Locale.Vietnamese]: vi,
		[Locale.ChineseCN]: zhCN,
		[Locale.ChineseTW]: zhTW,
	},
	returnEmptyString: false,
	saveMissing: true,
});

const client = new API(new REST({ version: "10" }).setToken(DISCORD_TOKEN));
const travellingSpirit = TRAVELLING_DATES.last();
const travellingSpiritStart = travellingSpirit?.start;

const travellingSpiritEarliestNotificationTime = travellingSpiritStart?.subtract({
	minutes: NotificationOffsetToMaximumValues[NotificationType.TravellingSpirit],
});

let shardData = shardEruption();

const NOTIFICATION_SHARD_ERUPTION_TYPES = [
	NotificationType.RegularShardEruption,
	NotificationType.StrongShardEruption,
] as const satisfies Readonly<NotificationTypes[]>;

type NotificationShardEruptionTypes = (typeof NOTIFICATION_SHARD_ERUPTION_TYPES)[number];

const NOTIFICATION_SHARD_ERUPTION_MAXIMUM_OFFSET = Math.max(
	...NOTIFICATION_SHARD_ERUPTION_TYPES.map(
		(notificationType) => NotificationOffsetToMaximumValues[notificationType],
	),
);
const NOTIFICATION_EVENTS_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.Events];
const NOTIFICATION_RADIANCE_EVENT_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.RadianceEvent];
const NOTIFICATION_DOUBLE_HEARTS_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.DoubleHearts];
const NOTIFICATION_DOUBLE_SEASONAL_LIGHT_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.DoubleSeasonalLight];
const NOTIFICATION_DOUBLE_TREASURE_CANDLES_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.DoubleTreasureCandles];
const NOTIFICATION_SEASONS_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.Seasons];

interface NotificationsShardEruptionData {
	type: NotificationShardEruptionTypes;
	timeUntilStart: number;
	realm: RealmName;
	area: AreaName;
	url: string;
	timestampStart: `<t:${number}:R>`;
	timestampEnd: `<t:${number}:R>`;
}

interface NotificationsMaintenanceData {
	type: typeof NotificationType.Maintenance;
	timeUntilStart: number;
	timestampStart: `<t:${number}:t>`;
	timestampStartRelative: `<t:${number}:R>`;
	timestampEnd: `<t:${number}:t>`;
	timestampEndRelative: `<t:${number}:R>`;
}

interface NotificationsEventData {
	type: typeof NotificationType.Events;
	timeUntilStart: number;
	eventId: EventIds;
	eventName: `event-names.${string}`;
	timestamp: `<t:${number}:R>`;
}

interface NotificationsRadianceEventData {
	type: typeof NotificationType.RadianceEvent;
	timeUntilStart: number;
	dyeEmojis: readonly string[];
	timestamp: `<t:${number}:R>`;
}

interface NotificationsDoubleHeartsData {
	type: typeof NotificationType.DoubleHearts;
	timeUntilStart: number;
	heartEmoji: string;
	timestamp: `<t:${number}:R>`;
}

interface NotificationsDoubleSeasonalLightData {
	type: typeof NotificationType.DoubleSeasonalLight;
	timeUntilStart: number;
	seasonalCandleEmoji: string;
	timestamp: `<t:${number}:R>`;
}

interface NotificationsDoubleTreasureCandlesData {
	type: typeof NotificationType.DoubleTreasureCandles;
	timeUntilStart: number;
	timestamp: `<t:${number}:R>`;
}

interface NotificationsSeasonData {
	type: typeof NotificationType.Seasons;
	timeUntilStart: number;
	seasonId: SeasonIds;
	timestamp: `<t:${number}:R>`;
}

interface NotificationsNotShardEruptionData {
	type: Exclude<
		NotificationTypes,
		| NotificationShardEruptionTypes
		| typeof NotificationType.Maintenance
		| typeof NotificationType.Events
		| typeof NotificationType.RadianceEvent
		| typeof NotificationType.DoubleHearts
		| typeof NotificationType.DoubleSeasonalLight
		| typeof NotificationType.DoubleTreasureCandles
		| typeof NotificationType.Seasons
	>;
	timeUntilStart: number;
	timestamp: `<t:${number}:R>`;
}

type NotificationsData =
	| NotificationsShardEruptionData
	| NotificationsMaintenanceData
	| NotificationsEventData
	| NotificationsRadianceEventData
	| NotificationsDoubleHeartsData
	| NotificationsDoubleSeasonalLightData
	| NotificationsDoubleTreasureCandlesData
	| NotificationsSeasonData
	| NotificationsNotShardEruptionData;

function isNotificationShardEruptionData(
	notification: NotificationsData,
): notification is NotificationsShardEruptionData {
	return NOTIFICATION_SHARD_ERUPTION_TYPES.includes(
		notification.type as NotificationShardEruptionTypes,
	);
}

new Cron("* * * * *", { timezone: TIME_ZONE }, async () => {
	const now = skyNow();
	const checkInId = captureCheckIn({ monitorSlug: "notifications", status: "in_progress" });
	const date = now.round({ smallestUnit: "minute", roundingMode: "trunc" });
	const { day, dayOfWeek, hour, minute } = date;
	const notifications: NotificationsData[] = [];

	if (hour === 0 && minute === 0) {
		// Update the shard eruption.
		shardData = shardEruption();
	}

	for (const maintenancePeriod of MAINTENANCE_PERIODS) {
		const timeUntilStart = Math.floor(maintenancePeriod.start.since(date).total("minutes"));

		if (timeUntilStart >= 0 && timeUntilStart <= 15) {
			notifications.push({
				type: NotificationType.Maintenance,
				timeUntilStart,
				timestampStart: `<t:${epochSeconds(maintenancePeriod.start)}:t>`,
				timestampStartRelative: `<t:${epochSeconds(maintenancePeriod.start)}:R>`,
				timestampEnd: `<t:${epochSeconds(maintenancePeriod.end)}:t>`,
				timestampEndRelative: `<t:${epochSeconds(maintenancePeriod.end)}:R>`,
			});
		}
	}

	for (const event of skyUpcomingEvents(date).values()) {
		const timeUntilStart = Math.floor(event.start.since(date).total("minutes"));

		if (timeUntilStart >= 0 && timeUntilStart <= NOTIFICATION_EVENTS_MAXIMUM_OFFSET) {
			notifications.push({
				type: NotificationType.Events,
				timeUntilStart,
				eventId: event.id,
				eventName: event.name,
				timestamp: `<t:${epochSeconds(event.start)}:R>`,
			});
		}
	}

	for (const radianceEvent of RADIANCE_EVENTS) {
		const timeUntilStart = Math.floor(radianceEvent.start.since(date).total("minutes"));

		if (timeUntilStart >= 0 && timeUntilStart <= NOTIFICATION_RADIANCE_EVENT_MAXIMUM_OFFSET) {
			notifications.push({
				type: NotificationType.RadianceEvent,
				timeUntilStart,
				dyeEmojis: radianceEvent.dyes.map((dye) => formatEmoji(DyeTypeToEmoji[dye])),
				timestamp: `<t:${epochSeconds(radianceEvent.start)}:R>`,
			});
		}
	}

	for (const doubleHeartEvent of DOUBLE_HEART_EVENTS) {
		const timeUntilStart = Math.floor(doubleHeartEvent.start.since(date).total("minutes"));

		if (timeUntilStart >= 0 && timeUntilStart <= NOTIFICATION_DOUBLE_HEARTS_MAXIMUM_OFFSET) {
			notifications.push({
				type: NotificationType.DoubleHearts,
				timeUntilStart,
				heartEmoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				timestamp: `<t:${epochSeconds(doubleHeartEvent.start)}:R>`,
			});
		}
	}

	for (const doubleTreasureCandleEvent of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS) {
		const timeUntilStart = Math.floor(doubleTreasureCandleEvent.start.since(date).total("minutes"));

		if (
			timeUntilStart >= 0 &&
			timeUntilStart <= NOTIFICATION_DOUBLE_TREASURE_CANDLES_MAXIMUM_OFFSET
		) {
			notifications.push({
				type: NotificationType.DoubleTreasureCandles,
				timeUntilStart,
				timestamp: `<t:${epochSeconds(doubleTreasureCandleEvent.start)}:R>`,
			});
		}
	}

	for (const season of [skyCurrentSeason(date), skyUpcomingSeason(date)]) {
		if (!season) {
			continue;
		}

		const seasonalCandleEmoji = formatEmoji(
			SeasonIdToSeasonalCandleEmoji[season.id] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle,
		);

		for (const doubleSeasonalLight of season.doubleSeasonalLight ?? []) {
			const timeUntilStart = Math.floor(doubleSeasonalLight.start.since(date).total("minutes"));

			if (
				timeUntilStart >= 0 &&
				timeUntilStart <= NOTIFICATION_DOUBLE_SEASONAL_LIGHT_MAXIMUM_OFFSET
			) {
				notifications.push({
					type: NotificationType.DoubleSeasonalLight,
					timeUntilStart,
					seasonalCandleEmoji,
					timestamp: `<t:${epochSeconds(doubleSeasonalLight.start)}:R>`,
				});
			}
		}

		const timeUntilStart = Math.floor(season.start.since(date).total("minutes"));

		if (timeUntilStart >= 0 && timeUntilStart <= NOTIFICATION_SEASONS_MAXIMUM_OFFSET) {
			notifications.push({
				type: NotificationType.Seasons,
				timeUntilStart,
				seasonId: season.id,
				timestamp: `<t:${epochSeconds(season.start)}:R>`,
			});
		}
	}

	if (shardData) {
		// Find a start timestamp within the widest configured shard eruption notification window.
		const shardStart = shardData.timestamps.find(({ start }) => {
			const diffMinutes = Math.floor(start.since(date).total("minutes"));
			return diffMinutes >= 0 && diffMinutes <= NOTIFICATION_SHARD_ERUPTION_MAXIMUM_OFFSET;
		});

		if (shardStart) {
			const timeUntilStart = Math.floor(shardStart.start.since(date).total("minutes"));

			notifications.push({
				type: shardData.strong
					? NotificationType.StrongShardEruption
					: NotificationType.RegularShardEruption,
				timeUntilStart,
				realm: shardData.realm,
				area: shardData.area,
				url: shardData.url,
				timestampStart: `<t:${epochSeconds(shardStart.start)}:R>`,
				timestampEnd: `<t:${epochSeconds(shardStart.end)}:R>`,
			});
		}
	}

	if ((hour === 23 && minute >= 45 && minute <= 59) || (hour === 0 && minute === 0)) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.DailyReset,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		(dayOfWeek === 6 && hour === 23 && minute >= 36 && minute <= 59) ||
		(dayOfWeek === 7 && hour === 0 && minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.EyeOfEden,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		(INTERNATIONAL_SPACE_STATION_DATES.includes(
			date.add({ days: 1 }).day as (typeof INTERNATIONAL_SPACE_STATION_DATES)[number],
		) &&
			hour === 23 &&
			minute >= 45 &&
			minute <= 59) ||
		(INTERNATIONAL_SPACE_STATION_DATES.includes(
			day as (typeof INTERNATIONAL_SPACE_STATION_DATES)[number],
		) &&
			hour === 0 &&
			minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.InternationalSpaceStation,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		travellingSpiritEarliestNotificationTime &&
		travellingSpiritStart &&
		isDuring(travellingSpiritEarliestNotificationTime, travellingSpiritStart, date)
	) {
		const timeUntilStart = travellingSpiritStart.since(date).total("minutes");

		notifications.push({
			type: NotificationType.TravellingSpirit,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(travellingSpiritStart)}:R>`,
		});
	}

	if (
		minute === 0 ||
		(minute >= 10 && minute <= 15) ||
		(minute >= 25 && minute <= 30) ||
		(minute >= 40 && minute <= 45) ||
		minute >= 55
	) {
		const timeUntilStart = (15 - (minute % 15)) % 15;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Passage,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if ((hour % 2 === 1 && minute >= 55) || (hour % 2 === 0 && minute <= 10)) {
		const timeUntilStart = hour % 2 === 0 ? 10 - minute : 70 - minute;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.AURORA,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		(minute >= 0 && minute <= 5 && hour % 2 === 0) ||
		(minute >= 55 && minute <= 59 && hour % 2 === 1)
	) {
		const timeUntilStart = hour % 2 === 0 ? 5 - minute : 65 - minute;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.PollutedGeyser,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (hour % 2 === 0 && minute >= 25 && minute <= 35) {
		const timeUntilStart = 35 - minute;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Grandma,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (hour % 2 === 0 && minute >= 40 && minute <= 50) {
		const timeUntilStart = 50 - minute;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Turtle,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		(dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 7) &&
		(hour % 2 === 0 ? minute >= 50 : minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.DreamsSkater,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		(dayOfWeek === 4 && hour === 23 && minute >= 45 && minute <= 59) ||
		(dayOfWeek === 5 && hour === 0 && minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.NestingWorkshop,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	if (
		(day === 1 && ((hour % 4 === 0 && minute === 0) || (hour % 4 === 3 && minute >= 45))) ||
		(date.daysInMonth === day && hour === 23 && minute >= 45)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.add({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.AviarysFireworkFestival,
			timeUntilStart,
			timestamp: `<t:${epochSeconds(startTime)}:R>`,
		});
	}

	const updateErrors = [];

	for (const notification of notifications) {
		const { type, timeUntilStart } = notification;

		const notificationsSettled = await Promise.allSettled(
			(
				await pg<NotificationPacket & { channel_id: string; role_id: string }>(Table.Notifications)
					.select("guild_id", "type", "channel_id", "role_id", "locale")
					.where({
						type,
						offset: timeUntilStart,
						sendable: true,
					})
					.and.whereNotNull("channel_id")
					.and.whereNotNull("role_id")
			).map(async (notificationPacket) => {
				const key = timeUntilStart === 0 ? "now" : "future";

				const message = isNotificationShardEruptionData(notification)
					? t(`notifications.messages.${type}.message-${key}`, {
							lng: notificationPacket.locale,
							ns: "features",
							location: `[${t("shard-eruption.realm-area", { lng: notificationPacket.locale, ns: "features", realm: notification.realm, area: notification.area })}](${notification.url})`,
							timestampStart: notification.timestampStart,
							timestampEnd: notification.timestampEnd,
						})
					: notification.type === NotificationType.Maintenance
						? t(`notifications.messages.${type}.message-${key}`, {
								lng: notificationPacket.locale,
								ns: "features",
								timestampStart: notification.timestampStart,
								timestampStartRelative: notification.timestampStartRelative,
								timestampEnd: notification.timestampEnd,
								timestampEndRelative: notification.timestampEndRelative,
							})
						: notification.type === NotificationType.Events
							? t(`notifications.messages.${type}.message-${key}`, {
									lng: notificationPacket.locale,
									ns: "features",
									event: `[${t(notification.eventName, {
										lng: notificationPacket.locale,
										ns: "general",
									})}](${t(`event-wiki.${notification.eventId}`, {
										lng: notificationPacket.locale,
										ns: "general",
									})})`,
									timestamp: notification.timestamp,
								})
							: notification.type === NotificationType.RadianceEvent
								? t(`notifications.messages.${type}.message-${key}`, {
										lng: notificationPacket.locale,
										ns: "features",
										dyesStart: notification.dyeEmojis.join(""),
										dyesEnd: notification.dyeEmojis.toReversed().join(""),
										timestamp: notification.timestamp,
									})
								: notification.type === NotificationType.DoubleHearts
									? t(`notifications.messages.${type}.message-${key}`, {
											lng: notificationPacket.locale,
											ns: "features",
											heart: notification.heartEmoji,
											timestamp: notification.timestamp,
										})
									: notification.type === NotificationType.DoubleSeasonalLight
										? t(`notifications.messages.${type}.message-${key}`, {
												lng: notificationPacket.locale,
												ns: "features",
												seasonalCandle: notification.seasonalCandleEmoji,
												timestamp: notification.timestamp,
											})
										: notification.type === NotificationType.DoubleTreasureCandles
											? t(`notifications.messages.${type}.message-${key}`, {
													lng: notificationPacket.locale,
													ns: "features",
													timestamp: notification.timestamp,
												})
											: notification.type === NotificationType.Seasons
												? t(`notifications.messages.${type}.message-${key}`, {
														lng: notificationPacket.locale,
														ns: "features",
														season: `[${t(`seasons.${notification.seasonId}`, {
															lng: notificationPacket.locale,
															ns: "general",
														})}](${t(`season-wiki.${notification.seasonId}`, {
															lng: notificationPacket.locale,
															ns: "general",
														})})`,
														timestamp: notification.timestamp,
													})
												: t(`notifications.messages.${type}.message-${key}`, {
														lng: notificationPacket.locale,
														ns: "features",
														timestamp: notification.timestamp,
														spirit: `[${t(`spirits.${travellingSpirit!.spiritId}`, {
															lng: notificationPacket.locale,
															ns: "general",
														})}](${t(`spirit-wiki.${travellingSpirit!.spiritId}`, {
															lng: notificationPacket.locale,
															ns: "general",
														})})`,
													});

				try {
					return await client.channels.createMessage(notificationPacket.channel_id, {
						allowed_mentions: { roles: [notificationPacket.role_id] },
						content: `<@&${notificationPacket.role_id}> ${message}`,
						enforce_nonce: true,
						flags: MessageFlags.SuppressEmbeds,
						nonce: notificationNonce(
							type,
							notificationPacket.channel_id,
							notification.type === NotificationType.Events ? notification.eventId : undefined,
						),
					});
				} catch (error) {
					throw new NotificationError(notificationPacket, error);
				}
			}),
		);

		let errors = 0;
		const refinedErrors: NotificationError[] = [];

		for (const result of notificationsSettled) {
			if (result.status !== "rejected") {
				continue;
			}

			const reason: NotificationError = result.reason;

			if (
				reason.cause instanceof DiscordAPIError &&
				(reason.cause.code === RESTJSONErrorCodes.UnknownChannel ||
					reason.cause.code === RESTJSONErrorCodes.MissingAccess ||
					reason.cause.code === RESTJSONErrorCodes.MissingPermissions)
			) {
				updateErrors.push(
					pg<NotificationPacket>(Table.Notifications).update({ sendable: false }).where({
						guild_id: reason.data.guild_id,
						type: reason.data.type,
					}),
				);
			} else {
				refinedErrors.push(reason);
			}

			errors++;
		}

		const successful = notificationsSettled.length - errors;
		const message = `Notification ${notification.type} (${notification.timeUntilStart} mins until) delivered to ${successful === 1 ? `${successful} guild` : `${successful} guilds`}.`;

		if (refinedErrors.length > 0) {
			pino.error(
				new AggregateError(refinedErrors, "Error whilst sending notifications."),
				`${message} Errors: ${refinedErrors.length}`,
			);
		} else {
			pino.info(message);
		}
	}

	await Promise.all(updateErrors);

	captureCheckIn({
		monitorSlug: "notifications",
		status: "ok",
		checkInId,
		duration: skyNow().since(now).total("seconds"),
	});
});
