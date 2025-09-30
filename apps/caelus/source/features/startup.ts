import type { NotificationPacket } from "@thatskyapplication/utility";
import { Table } from "@thatskyapplication/utility";
import pg from "../pg.js";
import pino from "../pino.js";
import { checkSendable } from "./notifications.js";

async function notifications() {
	// Perform a health check for our notification subscribers.
	const notificationsSettled = await Promise.allSettled(
		(await pg<NotificationPacket>(Table.Notifications).distinct("guild_id")).map(
			(notificationPacket) => checkSendable(notificationPacket.guild_id),
		),
	);

	const notificationsErrors = notificationsSettled
		.filter((result) => result.status === "rejected")
		.map((result) => result.reason);

	if (notificationsErrors.length > 0) {
		pino.error(notificationsErrors, "Error whilst performing the notification health check.");
	}
}

export async function startup() {
	await notifications();
}
