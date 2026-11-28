import { setTimeout } from "node:timers/promises";
import { t } from "i18next";
import {
	NotificationType,
	returningSpiritsSchedule,
	type SpiritIds,
	skyNow,
	TIME_ZONE,
	travellingSpiritSchedule,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import database from "./database.js";
import pino from "./pino.js";
import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } from "./utility/configuration.js";

const EMAIL_SENDING_URL =
	`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/email/sending/send` as const;

const EMAIL_FROM_ADDRESS = "notifications@thatskyapplication.com" as const;
const EMAIL_FROM_NAME = "thatskyapplication" as const;
const EMAIL_SEND_INTERVAL_MILLISECONDS = 250 as const;
const EMAIL_SEND_TIMEOUT_MILLISECONDS = 15_000 as const;
const SETTINGS_URL = `${WEBSITE_URL}/me/settings` as const;

const NotificationTypeToEmailColumns = {
	[NotificationType.TravellingSpirit]: {
		subscribedAt: "travelling_spirit_subscribed_at",
		lastEmailedVisitStart: "travelling_spirit_last_emailed_visit_start",
	},
	[NotificationType.ReturningSpirits]: {
		subscribedAt: "returning_spirits_subscribed_at",
		lastEmailedVisitStart: "returning_spirits_last_emailed_visit_start",
	},
} as const;

interface SpiritGroup {
	end: Temporal.ZonedDateTime;
	spiritIds: readonly SpiritIds[];
}

interface Arrival {
	type: keyof typeof NotificationTypeToEmailColumns;
	start: Temporal.ZonedDateTime;
	spiritGroups: SpiritGroup[];
}

let stopping = false;
let activeRun = Promise.resolve();

function escapeHTML(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function currentArrivals(now: Temporal.ZonedDateTime) {
	const arrivals: Arrival[] = [];
	const travellingSpiritVisit = travellingSpiritSchedule(now).visit;

	if (travellingSpiritVisit) {
		arrivals.push({
			type: NotificationType.TravellingSpirit,
			start: travellingSpiritVisit.start,
			spiritGroups: [
				{ end: travellingSpiritVisit.end, spiritIds: [travellingSpiritVisit.spiritId] },
			],
		});
	}

	for (const { active, end, spiritIds, start } of returningSpiritsSchedule(now)) {
		if (!active) {
			continue;
		}

		const previousArrival = arrivals.at(-1);

		if (
			previousArrival?.type === NotificationType.ReturningSpirits &&
			previousArrival.start.equals(start)
		) {
			previousArrival.spiritGroups.push({ end, spiritIds });
		} else {
			arrivals.push({
				type: NotificationType.ReturningSpirits,
				start,
				spiritGroups: [{ end, spiritIds }],
			});
		}
	}

	return arrivals;
}

function emailContent(arrival: Arrival, locale: string, unsubscribeURL: string) {
	const listFormat = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });

	const endFormat = new Intl.DateTimeFormat(locale, {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "numeric",
		minute: "2-digit",
		timeZone: TIME_ZONE,
		timeZoneName: "longGeneric",
	});

	const spiritName = (spiritId: SpiritIds) =>
		t(`spirits.${spiritId}`, { lng: locale, ns: "general" });

	const spiritIds = arrival.spiritGroups.flatMap((spiritGroup) => spiritGroup.spiritIds);
	const spirits = listFormat.format(spiritIds.map(spiritName));

	const subject = t(`notifications.messages.${arrival.type}.message-now`, {
		lng: locale,
		ns: "features",
		spirit: spirits,
		spirits,
	});

	const availability = arrival.spiritGroups.map((spiritGroup) =>
		t("email.spirits-until", {
			lng: locale,
			ns: "features",
			count: spiritGroup.spiritIds.length,
			spirits: listFormat.format(spiritGroup.spiritIds.map(spiritName)),
			end: endFormat.format(spiritGroup.end.epochMilliseconds),
		}),
	);

	const spiritLinks = spiritIds.map((spiritId) => ({
		name: spiritName(spiritId),
		url: `${WEBSITE_URL}/spirits?spirit=${spiritId}`,
		catalogueURL: `${WEBSITE_URL}/me/catalogue?view=spirit&spirit=${spiritId}`,
		wikiURL: t(`spirit-wiki.${spiritId}`, { lng: locale, ns: "general" }),
	}));

	const catalogue = t("catalogue.main-title", { lng: locale, ns: "features" });
	const wiki = t("wiki", { lng: locale, ns: "general" });
	const footer = t("email.footer", { lng: locale, ns: "features" });
	const unsubscribe = t("email.unsubscribe", { lng: locale, ns: "features" });
	const settings = t("settings.name", { lng: locale, ns: "features" });

	const text = [
		subject,
		"",
		...availability,
		"",
		...spiritLinks.flatMap(({ name, url, catalogueURL, wikiURL }) => [
			`${name}: ${url}`,
			`${catalogue}: ${catalogueURL}`,
			`${wiki}: ${wikiURL}`,
			"",
		]),
		footer,
		`${unsubscribe}: ${unsubscribeURL}`,
		`${settings}: ${SETTINGS_URL}`,
	].join("\n");

	const html = [
		"<!doctype html>",
		`<html lang="${escapeHTML(locale)}">`,
		"<head>",
		'<meta charset="utf-8">',
		'<meta name="viewport" content="width=device-width, initial-scale=1">',
		`<title>${escapeHTML(subject)}</title>`,
		"</head>",
		'<body style="margin: 0; padding: 24px; font-family: system-ui, sans-serif; font-size: 16px; line-height: 1.5;">',
		`<h1 style="margin: 0 0 16px; font-size: 20px;">${escapeHTML(subject)}</h1>`,
		...availability.map((sentence) => `<p style="margin: 0 0 16px;">${escapeHTML(sentence)}</p>`),
		'<ul style="margin: 0 0 24px; padding-left: 20px;">',
		...spiritLinks.map(
			({ name, url, catalogueURL, wikiURL }) =>
				`<li><a href="${escapeHTML(url)}">${escapeHTML(name)}</a> (<a href="${escapeHTML(catalogueURL)}">${escapeHTML(catalogue)}</a> | <a href="${escapeHTML(wikiURL)}">${escapeHTML(wiki)}</a>)</li>`,
		),
		"</ul>",
		'<hr style="margin: 0 0 16px; border: none; border-top: 1px solid #d1d5db;">',
		`<p style="margin: 0; font-size: 13px; color: #6b7280;">${escapeHTML(footer)}<br><a href="${escapeHTML(unsubscribeURL)}">${escapeHTML(unsubscribe)}</a> · <a href="${SETTINGS_URL}">${escapeHTML(settings)}</a></p>`,
		"</body>",
		"</html>",
	].join("\n");

	return { subject, text, html };
}

async function sendArrivalEmails(arrival: Arrival) {
	const { subscribedAt, lastEmailedVisitStart } = NotificationTypeToEmailColumns[arrival.type];
	const visitStart = new Date(arrival.start.epochMilliseconds);

	const subscribers = await database
		.selectFrom("notifications_email")
		.leftJoin("users", "users.discord_user_id", "notifications_email.user_id")
		.select((eb) => [
			"notifications_email.user_id",
			"users.email_unsubscribe_token",
			eb.ref(lastEmailedVisitStart).as("previous_last_emailed_visit_start"),
		])
		.where(subscribedAt, "<=", visitStart)
		.where((eb) =>
			eb.or([eb(lastEmailedVisitStart, "is", null), eb(lastEmailedVisitStart, "<", visitStart)]),
		)
		.execute();

	let sent = 0;

	for (const subscriber of subscribers) {
		if (stopping) {
			return false;
		}

		const claimedSubscriber = await database
			.updateTable("notifications_email")
			.set(lastEmailedVisitStart, visitStart)
			.where("user_id", "=", subscriber.user_id)
			.where(subscribedAt, "<=", visitStart)
			.where((eb) =>
				eb.or([eb(lastEmailedVisitStart, "is", null), eb(lastEmailedVisitStart, "<", visitStart)]),
			)
			.returning(["email", "locale"])
			.executeTakeFirst();

		if (!claimedSubscriber) {
			continue;
		}

		if (subscriber.email_unsubscribe_token === null) {
			pino.error(
				{ userId: subscriber.user_id },
				"An email notification subscriber has no unsubscribe token.",
			);

			continue;
		}

		const unsubscribeURL = `${WEBSITE_URL}/unsubscribe?token=${subscriber.email_unsubscribe_token}`;
		const { subject, text, html } = emailContent(arrival, claimedSubscriber.locale, unsubscribeURL);
		let retry = false;

		try {
			const response = await fetch(EMAIL_SENDING_URL, {
				body: JSON.stringify({
					from: { address: EMAIL_FROM_ADDRESS, name: EMAIL_FROM_NAME },
					to: claimedSubscriber.email,
					subject,
					text,
					html,
					headers: {
						"List-Unsubscribe": `<${unsubscribeURL}>`,
						"List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
					},
				}),
				headers: {
					Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
					"Content-Type": "application/json",
				},
				method: "POST",
				signal: AbortSignal.timeout(EMAIL_SEND_TIMEOUT_MILLISECONDS),
			});

			const responseBody = await response.text();

			if (response.ok) {
				sent++;
			} else if (response.status === 400) {
				pino.error(
					{ body: responseBody, status: response.status, userId: subscriber.user_id },
					"Cloudflare rejected an email notification.",
				);
			} else {
				retry = true;

				pino.error(
					{ body: responseBody, status: response.status, userId: subscriber.user_id },
					"Cloudflare did not send an email notification. Retrying next minute.",
				);
			}
		} catch (error) {
			retry = true;

			pino.error(
				{ error, userId: subscriber.user_id },
				"Could not send an email notification. Retrying next minute.",
			);
		}

		if (retry) {
			await database
				.updateTable("notifications_email")
				.set(lastEmailedVisitStart, subscriber.previous_last_emailed_visit_start)
				.where("user_id", "=", subscriber.user_id)
				.where(lastEmailedVisitStart, "=", visitStart)
				.execute();

			return false;
		}

		await setTimeout(EMAIL_SEND_INTERVAL_MILLISECONDS);
	}

	if (subscribers.length > 0) {
		pino.info(
			`Email notification ${arrival.type} for the visit starting ${arrival.start.toString()} sent to ${sent} of ${subscribers.length} subscribers.`,
		);
	}

	return true;
}

async function sendDueEmailNotifications() {
	try {
		for (const arrival of currentArrivals(skyNow())) {
			if (!(await sendArrivalEmails(arrival))) {
				return;
			}
		}
	} catch (error) {
		pino.error(error, "Error whilst sending email notifications.");
	}
}

export function sendEmailNotifications() {
	activeRun = sendDueEmailNotifications();
	return activeRun;
}

export async function stopEmailNotifications() {
	stopping = true;
	await activeRun;
}
