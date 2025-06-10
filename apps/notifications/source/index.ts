import { API, Locale, MessageFlags } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import {
	de,
	enGB,
	es419,
	esES,
	fr,
	INTERNATIONAL_SPACE_STATION_DATES,
	INTERNATIONAL_SPACE_STATION_PRIOR_DATES,
	it,
	ja,
	ko,
	type NotificationPacket,
	NotificationType,
	type NotificationTypes,
	ptBR,
	ru,
	shardEruption,
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
import { NOTIFICATIONS_TABLE } from "./utility/constants.js";

void init({
	fallbackLng: Locale.EnglishGB,
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
	interpolation: {
		escapeValue: false,
	},
});

const client = new API(new REST({ version: "10" }).setToken(DISCORD_TOKEN));
const travellingSpirit = TRAVELLING_DATES.last();
const travellingSpiritStart = travellingSpirit?.start;
const travellingSpiritEarliestNotificationTime = travellingSpiritStart?.minus(900000);
let shardData = shardEruption();

interface NotificationsData {
	type: NotificationTypes;
	timeUntilStart: number;
	suffix: string;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
new Cron("* * * * *", { timezone: TIME_ZONE }, async () => {
	const date = DateTime.now().setZone(TIME_ZONE).set({ second: 0, millisecond: 0 });
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
				suffix: shardData.strong
					? timeUntilStart === 0
						? `A strong shard eruption is landing in the [${shardData.realm} (${shardData.skyMap})](${shardData.url}) and clears up <t:${shardStart.end.toUnixInteger()}:R>!`
						: `A strong shard eruption lands in the [${shardData.realm} (${shardData.skyMap})](${shardData.url}) <t:${shardStart.start.toUnixInteger()}:R> and clears up <t:${shardStart.end.toUnixInteger()}:R>!`
					: timeUntilStart === 0
						? `A regular shard eruption is landing in the [${shardData.realm} (${shardData.skyMap})](${shardData.url}) and clears up <t:${shardStart.end.toUnixInteger()}:R>!`
						: `A regular shard eruption lands in the [${shardData.realm} (${shardData.skyMap})](${shardData.url}) <t:${shardStart.start.toUnixInteger()}:R> and clears up <t:${shardStart.end.toUnixInteger()}:R>!`,
			});
		}
	}

	if ((hour === 23 && minute >= 45 && minute <= 59) || (hour === 0 && minute === 0)) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.DailyReset,
			timeUntilStart,
			suffix:
				timeUntilStart === 0
					? "It's a new day. Time to forge candles again!"
					: `A new day will begin <t:${startTime.toUnixInteger()}:R>!`,
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
			suffix:
				timeUntilStart === 0
					? "Sky kids may save statues in the Eye of Eden again!"
					: `Statues in the Eye of Eden will reset <t:${startTime.toUnixInteger()}:R>!`,
		});
	}

	if (
		(INTERNATIONAL_SPACE_STATION_PRIOR_DATES.includes(
			day as (typeof INTERNATIONAL_SPACE_STATION_PRIOR_DATES)[number],
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
			suffix:
				timeUntilStart === 0
					? "The International Space Station is accessible!"
					: `The International Space Station will be accessible <t:${startTime.toUnixInteger()}:R>!`,
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
			suffix:
				timeUntilStart === 0
					? `${t(`spirits.${travellingSpirit.spiritId}`, { lng: Locale.EnglishGB, ns: "general" })} has arrived!`
					: `${t(`spirits.${travellingSpirit.spiritId}`, { lng: Locale.EnglishGB, ns: "general" })} will arrive <t:${travellingSpiritStart.toUnixInteger()}:R>!`,
		});
	}

	if (
		minute === 0 ||
		(minute >= 10 && minute <= 15) ||
		(minute >= 25 && minute <= 30) ||
		(minute >= 40 && minute <= 45) ||
		(minute >= 55 && minute <= 59)
	) {
		const timeUntilStart = (15 - minute) % 15;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Passage,
			timeUntilStart,
			suffix:
				timeUntilStart === 0
					? "The Season of Passage quests are starting!"
					: `The Season of Passage quests will start <t:${startTime.toUnixInteger()}:R>!`,
		});
	}

	if ((hour % 2 === 1 && minute >= 45) || (hour % 2 === 0 && minute === 0)) {
		const timeUntilStart = (60 - minute) % 60;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.AURORA,
			timeUntilStart,
			suffix:
				timeUntilStart === 0
					? "The AURORA concert is starting! Take your friends!"
					: `The AURORA concert will start <t:${startTime.toUnixInteger()}:R>! Take your friends!`,
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
			suffix:
				timeUntilStart === 0
					? "The Polluted Geyser is starting to erupt!"
					: `The Polluted Geyser will erupt <t:${startTime.toUnixInteger()}:R>!`,
		});
	}

	if (hour % 2 === 0 && minute >= 25 && minute <= 35) {
		const timeUntilStart = 35 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Grandma,
			timeUntilStart,
			suffix:
				timeUntilStart === 0
					? "Grandma has begun sharing her light!"
					: `Grandma will share her light <t:${startTime.toUnixInteger()}:R>!`,
		});
	}

	if (hour % 2 === 0 && minute >= 40 && minute <= 50) {
		const timeUntilStart = 50 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.Turtle,
			timeUntilStart,
			suffix:
				timeUntilStart === 0
					? "The turtle needs cleansing of darkness now!"
					: `The turtle will need cleansing of darkness <t:${startTime.toUnixInteger()}:R>!`,
		});
	}

	if (
		((weekday === 5 || weekday === 6 || weekday === 7) && hour % 2 === 0 && minute >= 50) ||
		(hour % 2 === 1 && minute === 0)
	) {
		const timeUntilStart = 60 - minute;
		const startTime = date.plus({ minutes: timeUntilStart });

		notifications.push({
			type: NotificationType.DreamsSkater,
			timeUntilStart,
			suffix:
				timeUntilStart === 0
					? "The Dreams skater has begun practising!"
					: `The Dreams skater will practise <t:${startTime.toUnixInteger()}:R>!`,
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
			suffix:
				timeUntilStart === 0
					? "Aviary's Firework Festival is beginning!"
					: `Aviary's Firework Festival will begin <t:${startTime.toUnixInteger()}:R>!`,
		});
	}

	for (const { type, timeUntilStart, suffix } of notifications) {
		pino.info({ type, until: timeUntilStart }, "Queueing notification.");

		const notificationsSettled = await Promise.allSettled(
			(
				await pg<NotificationPacket & { channel_id: string; role_id: string }>(NOTIFICATIONS_TABLE)
					.select("channel_id", "role_id")
					.where({
						type,
						offset: timeUntilStart,
						sendable: true,
					})
					.and.whereNotNull("channel_id")
					.and.whereNotNull("role_id")
			).map((notificationPacket) =>
				client.channels.createMessage(notificationPacket.channel_id, {
					allowed_mentions: { roles: [notificationPacket.role_id] },
					content: `<@&${notificationPacket.role_id}> ${suffix}`,
					enforce_nonce: true,
					flags: MessageFlags.SuppressEmbeds,
					nonce: `${type}-${notificationPacket.channel_id}`,
				}),
			),
		);

		const errors = notificationsSettled
			.filter((result) => result.status === "rejected")
			.map((result) => result.reason);

		if (errors.length > 0) {
			pino.error(errors, "Error whilst sending notifications.");
		}
	}
});
