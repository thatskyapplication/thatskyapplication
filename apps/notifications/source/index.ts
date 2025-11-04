import { API, Locale, MessageFlags } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { captureCheckIn } from "@sentry/node";
import {
	de,
	enGB,
	es419,
	esES,
	fr,
	INTERNATIONAL_SPACE_STATION_DATES,
	it,
	ja,
	ko,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
	ptBR,
	type RealmName,
	ru,
	type SkyMap,
	shardEruption,
	Table,
	TIME_ZONE,
	TRAVELLING_DATES,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import { Cron } from "croner";
import { init, t } from "i18next";
import { DateTime } from "luxon";
import { pg } from "./pg.js";
import pino from "./pino.js";
import { DISCORD_TOKEN } from "./utility/configuration.js";
import { captureError } from "./utility/functions.js";

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
const travellingSpiritEarliestNotificationTime = travellingSpiritStart?.minus(900000);
let shardData = shardEruption();

const NOTIFICATION_SHARD_ERUPTION_TYPES = [
	NotificationType.RegularShardEruption,
	NotificationType.StrongShardEruption,
] as const satisfies Readonly<NotificationTypes[]>;

type NotificationShardEruptionTypes = (typeof NOTIFICATION_SHARD_ERUPTION_TYPES)[number];

interface NotificationsShardEruptionData {
	type: NotificationShardEruptionTypes;
	timeUntilStart: number;
	realm: RealmName;
	skyMap: SkyMap;
	url: string;
	timestampStart: `<t:${number}:R>`;
	timestampEnd: `<t:${number}:R>`;
}

interface NotificationsNotShardEruptionData {
	type: Exclude<NotificationTypes, NotificationShardEruptionTypes>;
	timeUntilStart: number;
	timestamp: `<t:${number}:R>`;
}

type NotificationsData = NotificationsShardEruptionData | NotificationsNotShardEruptionData;

function isNotificationShardEruptionData(
	notification: NotificationsData,
): notification is NotificationsShardEruptionData {
	return NOTIFICATION_SHARD_ERUPTION_TYPES.includes(
		notification.type as NotificationShardEruptionTypes,
	);
}

new Cron("* * * * *", { timezone: TIME_ZONE }, async () => {
	const now = DateTime.now();
	const checkInId = captureCheckIn({ monitorSlug: "notifications", status: "in_progress" });
	const date = now.setZone(TIME_ZONE).startOf("minute");
	const { day, weekday, hour, minute } = date;
	const notifications: NotificationsData[] = [];

	if (hour === 0 && minute === 0) {
		// Update the shard eruption.
		shardData = shardEruption();
	}

	if (shardData) {
		// Find a start timestamp that is up to 10 minutes before the shard eruption.
		const shardStart = shardData.timestamps.find(({ start }) => {
			const diffMinutes = Math.floor(start.diff(date, "minutes").minutes);
			return diffMinutes >= 0 && diffMinutes <= 10;
		});

		if (shardStart) {
			const timeUntilStart = Math.floor(shardStart.start.diff(date, "minutes").minutes);

			notifications.push({
				type: shardData.strong
					? NotificationType.StrongShardEruption
					: NotificationType.RegularShardEruption,
				timeUntilStart,
				realm: shardData.realm,
				skyMap: shardData.skyMap,
				url: shardData.url,
				timestampStart: `<t:${shardStart.start.toUnixInteger()}:R>`,
				timestampEnd: `<t:${shardStart.end.toUnixInteger()}:R>`,
			});
		}
	}

	if ((hour === 23 && minute >= 45 && minute <= 59) || (hour === 0 && minute === 0)) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.DailyReset,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		(weekday === 6 && hour === 23 && minute >= 36 && minute <= 59) ||
		(weekday === 7 && hour === 0 && minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.EyeOfEden,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		(INTERNATIONAL_SPACE_STATION_DATES.includes(
			date.plus({ day: 1 }).day as (typeof INTERNATIONAL_SPACE_STATION_DATES)[number],
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
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.InternationalSpaceStation,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		travellingSpiritEarliestNotificationTime &&
		travellingSpiritStart &&
		date >= travellingSpiritEarliestNotificationTime &&
		date <= travellingSpiritStart
	) {
		const timeUntilStart = travellingSpiritStart.diff(date, "minutes").minutes;

		notifications.push({
			type: NotificationType.TravellingSpirit,
			timeUntilStart,
			timestamp: `<t:${travellingSpiritStart.toUnixInteger()}:R>`,
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
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Passage,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if ((hour % 2 === 1 && minute >= 55) || (hour % 2 === 0 && minute <= 10)) {
		const timeUntilStart = hour % 2 === 0 ? 10 - minute : 70 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.AURORA,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		(minute >= 0 && minute <= 5 && hour % 2 === 0) ||
		(minute >= 55 && minute <= 59 && hour % 2 === 1)
	) {
		const timeUntilStart = hour % 2 === 0 ? 5 - minute : 65 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.PollutedGeyser,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (hour % 2 === 0 && minute >= 25 && minute <= 35) {
		const timeUntilStart = 35 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Grandma,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (hour % 2 === 0 && minute >= 40 && minute <= 50) {
		const timeUntilStart = 50 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Turtle,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		(weekday === 5 || weekday === 6 || weekday === 7) &&
		(hour % 2 === 0 ? minute >= 50 : minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.DreamsSkater,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		(weekday === 7 && hour === 23 && minute >= 45 && minute <= 59) ||
		(weekday === 1 && hour === 0 && minute === 0)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.NestingWorkshop,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	if (
		(day === 1 && ((hour % 4 === 0 && minute === 0) || (hour % 4 === 3 && minute >= 45))) ||
		(date.endOf("month").day === day && hour === 23 && minute >= 45)
	) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.AviarysFireworkFestival,
			timeUntilStart,
			timestamp: `<t:${startTime.toUnixInteger()}:R>`,
		});
	}

	for (const notification of notifications) {
		const { type, timeUntilStart } = notification;

		const notificationsSettled = await Promise.allSettled(
			(
				await pg<NotificationPacket & { channel_id: string; role_id: string }>(Table.Notifications)
					.select("channel_id", "role_id", "locale")
					.where({
						type,
						offset: timeUntilStart,
						sendable: true,
					})
					.and.whereNotNull("channel_id")
					.and.whereNotNull("role_id")
			).map((notificationPacket) => {
				const key = timeUntilStart === 0 ? "now" : "future";

				const message = isNotificationShardEruptionData(notification)
					? t(`notifications.messages.${type}.message-${key}`, {
							lng: notificationPacket.locale,
							ns: "features",
							location: `[${t("shard-eruption.realm-map", { lng: notificationPacket.locale, ns: "features", realm: notification.realm, map: notification.skyMap })}](${notification.url})`,
							timestampStart: notification.timestampStart,
							timestampEnd: notification.timestampEnd,
						})
					: t(`notifications.messages.${type}.message-${key}`, {
							lng: notificationPacket.locale,
							ns: "features",
							timestamp: notification.timestamp,
							spirit: t(`spirits.${travellingSpirit!.spiritId}`, {
								lng: notificationPacket.locale,
								ns: "general",
							}),
						});

				return client.channels.createMessage(notificationPacket.channel_id, {
					allowed_mentions: { roles: [notificationPacket.role_id] },
					content: `<@&${notificationPacket.role_id}> ${message}`,
					enforce_nonce: true,
					flags: MessageFlags.SuppressEmbeds,
					nonce: `${type}-${notificationPacket.channel_id}`,
				});
			}),
		);

		const errors = [];

		for (const result of notificationsSettled) {
			if (result.status !== "rejected") {
				continue;
			}

			errors.push(result.reason);
		}

		const successful = notificationsSettled.length - errors.length;
		const message = `Notification ${notification.type} (${notification.timeUntilStart} mins until) delivered to ${successful === 1 ? `${successful} guild` : `${successful} guilds`}.`;

		if (errors.length > 0) {
			captureError(
				new AggregateError(errors, "Error whilst sending notifications."),
				`${message} Errors: ${errors.length}`,
			);
		} else {
			pino.info(message);
		}
	}

	captureCheckIn({
		monitorSlug: "notifications",
		status: "ok",
		checkInId,
		duration: DateTime.now().diff(now, "seconds").seconds,
	});
});
