import { API, Locale, MessageFlags, RESTJSONErrorCodes } from "@discordjs/core";
import { DiscordAPIError, REST } from "@discordjs/rest";
import { captureCheckIn } from "@sentry/node";
import { Cron } from "croner";
import { init, t } from "i18next";
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
	isDuring,
	it,
	ja,
	ko,
	MAINTENANCE_PERIODS,
	NotificationOffsetToMaximumValues,
	NotificationType,
	SCHEDULES,
	ScheduleType,
	type ScheduleTypes,
	type NotificationTypes,
	ptBR,
	RADIANCE_EVENTS,
	type RealmName,
	returningSpiritsSchedule,
	type ReturningSpiritVisit,
	ru,
	type SeasonIds,
	shardEruption,
	skyCurrentSeason,
	skyNow,
	skyUpcomingEvents,
	skyUpcomingSeason,
	TIME_ZONE,
	TRAVELLING_DATES,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import database from "./database.js";
import { NotificationError } from "./models/notification-error.js";
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
	missingKeyHandler: (lngs, namespace, key) =>
		pino.error(
			`Locale ${lngs.join(", ")} had a missing translation in namespace ${namespace} for "${key}".`,
		),
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

const shardDataInitial = skyNow();
let shardDataDate = shardDataInitial.toPlainDate();
let shardData = shardEruption(shardDataInitial);

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
const NOTIFICATION_RETURNING_SPIRITS_MAXIMUM_OFFSET =
	NotificationOffsetToMaximumValues[NotificationType.ReturningSpirits];
const MAINTENANCE_PERIODS_NEWEST_FIRST = MAINTENANCE_PERIODS.toReversed();
const DOUBLE_HEART_EVENTS_NEWEST_FIRST = DOUBLE_HEART_EVENTS.toReversed();

const TREASURE_CANDLES_DOUBLE_CONFIGURATIONS_NEWEST_FIRST =
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.toReversed();

const RADIANCE_EVENTS_NEWEST_FIRST = RADIANCE_EVENTS.toReversed();

interface NotificationsShardEruptionData {
	type: NotificationShardEruptionTypes;
	timeUntilStart: number;
	realm: RealmName;
	area: AreaName;
	infographicURL: string;
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

interface NotificationsReturningSpiritsData {
	type: typeof NotificationType.ReturningSpirits;
	timeUntilStart: number;
	startEpochSeconds: number;
	spiritIds: ReturningSpiritVisit["spiritIds"];
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
		| typeof NotificationType.ReturningSpirits
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
	| NotificationsReturningSpiritsData
	| NotificationsNotShardEruptionData;

function isNotificationShardEruptionData(
	notification: NotificationsData,
): notification is NotificationsShardEruptionData {
	return NOTIFICATION_SHARD_ERUPTION_TYPES.includes(
		notification.type as NotificationShardEruptionTypes,
	);
}

const ScheduleTypeToNotificationType: Readonly<
	Partial<Record<ScheduleTypes, NotificationsNotShardEruptionData["type"]>>
> = {
	[ScheduleType.DailyReset]: NotificationType.DailyReset,
	[ScheduleType.EyeOfEden]: NotificationType.EyeOfEden,
	[ScheduleType.InternationalSpaceStation]: NotificationType.InternationalSpaceStation,
	[ScheduleType.PollutedGeyser]: NotificationType.PollutedGeyser,
	[ScheduleType.Grandma]: NotificationType.Grandma,
	[ScheduleType.Turtle]: NotificationType.Turtle,
	[ScheduleType.DreamsSkater]: NotificationType.DreamsSkater,
	[ScheduleType.AURORA]: NotificationType.AURORA,
	[ScheduleType.Passage]: NotificationType.Passage,
	[ScheduleType.AviarysFireworkFestival]: NotificationType.AviarysFireworkFestival,
	[ScheduleType.NestingWorkshop]: NotificationType.NestingWorkshop,
};

new Cron("* * * * *", { timezone: TIME_ZONE }, async () => {
	const now = skyNow();
	const checkInId = captureCheckIn({ monitorSlug: "notifications", status: "in_progress" });
	const date = now.round({ smallestUnit: "minute", roundingMode: "trunc" });
	const notifications: NotificationsData[] = [];

	const currentDate = date.toPlainDate();

	if (!currentDate.equals(shardDataDate)) {
		shardDataDate = currentDate;
		shardData = shardEruption(date);
	}

	for (const maintenancePeriod of MAINTENANCE_PERIODS_NEWEST_FIRST) {
		if (Temporal.ZonedDateTime.compare(maintenancePeriod.start, date) < 0) {
			break;
		}

		const timeUntilStart = Math.floor(maintenancePeriod.start.since(date).total("minutes"));

		if (timeUntilStart <= 15) {
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

	for (const radianceEvent of RADIANCE_EVENTS_NEWEST_FIRST) {
		if (Temporal.ZonedDateTime.compare(radianceEvent.start, date) < 0) {
			break;
		}

		const timeUntilStart = Math.floor(radianceEvent.start.since(date).total("minutes"));

		if (timeUntilStart <= NOTIFICATION_RADIANCE_EVENT_MAXIMUM_OFFSET) {
			notifications.push({
				type: NotificationType.RadianceEvent,
				timeUntilStart,
				dyeEmojis: radianceEvent.dyes.map((dye) => formatEmoji(DyeTypeToEmoji[dye])),
				timestamp: `<t:${epochSeconds(radianceEvent.start)}:R>`,
			});
		}
	}

	for (const doubleHeartEvent of DOUBLE_HEART_EVENTS_NEWEST_FIRST) {
		if (Temporal.ZonedDateTime.compare(doubleHeartEvent.start, date) < 0) {
			break;
		}

		const timeUntilStart = Math.floor(doubleHeartEvent.start.since(date).total("minutes"));

		if (timeUntilStart <= NOTIFICATION_DOUBLE_HEARTS_MAXIMUM_OFFSET) {
			notifications.push({
				type: NotificationType.DoubleHearts,
				timeUntilStart,
				heartEmoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				timestamp: `<t:${epochSeconds(doubleHeartEvent.start)}:R>`,
			});
		}
	}

	for (const doubleTreasureCandleEvent of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS_NEWEST_FIRST) {
		if (Temporal.ZonedDateTime.compare(doubleTreasureCandleEvent.start, date) < 0) {
			break;
		}

		const timeUntilStart = Math.floor(doubleTreasureCandleEvent.start.since(date).total("minutes"));

		if (timeUntilStart <= NOTIFICATION_DOUBLE_TREASURE_CANDLES_MAXIMUM_OFFSET) {
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

	const returningSpirits = returningSpiritsSchedule(date);

	if (returningSpirits) {
		const timeUntilStart = Math.floor(returningSpirits.start.since(date).total("minutes"));

		if (timeUntilStart >= 0 && timeUntilStart <= NOTIFICATION_RETURNING_SPIRITS_MAXIMUM_OFFSET) {
			const startEpochSeconds = epochSeconds(returningSpirits.start);

			notifications.push({
				type: NotificationType.ReturningSpirits,
				timeUntilStart,
				startEpochSeconds,
				spiritIds: returningSpirits.spiritIds,
				timestamp: `<t:${startEpochSeconds}:R>`,
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
				infographicURL: shardData.infographic.url,
				timestampStart: `<t:${epochSeconds(shardStart.start)}:R>`,
				timestampEnd: `<t:${epochSeconds(shardStart.end)}:R>`,
			});
		}
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

	for (const { type, resolve } of SCHEDULES) {
		const notificationType = ScheduleTypeToNotificationType[type];

		if (notificationType === undefined) {
			continue;
		}

		const occurrence = resolve(date);

		if (!occurrence) {
			continue;
		}

		const timeUntilStart = Math.floor(occurrence.start.since(date).total("minutes"));

		if (
			timeUntilStart >= 0 &&
			timeUntilStart <= NotificationOffsetToMaximumValues[notificationType]
		) {
			notifications.push({
				type: notificationType,
				timeUntilStart,
				timestamp: `<t:${epochSeconds(occurrence.start)}:R>`,
			});
		}
	}

	const updateErrors = [];

	for (const notification of notifications) {
		const { type, timeUntilStart } = notification;

		const notificationsSettled = await Promise.allSettled(
			(
				await database
					.selectFrom("notifications")
					.select(["guild_id", "type", "channel_id", "role_id", "locale"])
					.where("type", "=", type)
					.where("offset", "=", timeUntilStart)
					.where("sendable", "=", true)
					.where("channel_id", "is not", null)
					.where("role_id", "is not", null)
					.$narrowType<{ channel_id: string; role_id: string }>()
					.execute()
			).map(async (notificationPacket) => {
				const key = timeUntilStart === 0 ? "now" : "future";

				const message = isNotificationShardEruptionData(notification)
					? t(`notifications.messages.${type}.message-${key}`, {
							lng: notificationPacket.locale,
							ns: "features",
							location: `[${t("shard-eruption.realm-area", {
								lng: notificationPacket.locale,
								ns: "features",
								realm: notification.realm,
								area: notification.area,
							})}](${notification.infographicURL})`,
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
												: notification.type === NotificationType.ReturningSpirits
													? t(`notifications.messages.${type}.message-${key}`, {
															lng: notificationPacket.locale,
															ns: "features",
															spirits: new Intl.ListFormat(notificationPacket.locale, {
																style: "long",
																type: "conjunction",
															}).format(
																notification.spiritIds.map(
																	(spiritId) =>
																		`[${t(`spirits.${spiritId}`, {
																			lng: notificationPacket.locale,
																			ns: "general",
																		})}](${t(`spirit-wiki.${spiritId}`, {
																			lng: notificationPacket.locale,
																			ns: "general",
																		})})`,
																),
															),
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
							notification.type === NotificationType.Events
								? notification.eventId
								: notification.type === NotificationType.ReturningSpirits
									? notification.startEpochSeconds
									: undefined,
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

			const reason = result.reason as NotificationError;

			if (
				reason.cause instanceof DiscordAPIError &&
				(reason.cause.code === RESTJSONErrorCodes.UnknownChannel ||
					reason.cause.code === RESTJSONErrorCodes.MissingAccess ||
					reason.cause.code === RESTJSONErrorCodes.MissingPermissions)
			) {
				updateErrors.push(
					database
						.updateTable("notifications")
						.set({ sendable: false })
						.where("guild_id", "=", reason.data.guild_id)
						.where("type", "=", reason.data.type)
						.execute(),
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
