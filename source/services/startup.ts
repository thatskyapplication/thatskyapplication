import type { NotificationPacket } from "../models/Notification.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { checkSendable } from "./notification.js";

export async function startup() {
	// Perform a health check for our notification subscribers.
	const notificationsSettled = await Promise.allSettled(
		(await pg<NotificationPacket>(Table.Notifications).distinct("guild_id")).map(
			(notificationPacket) => checkSendable(notificationPacket.guild_id),
		),
	);

	const notificationsErrors = notificationsSettled
		.filter((result): result is PromiseRejectedResult => result.status === "rejected")
		.map((result) => result.reason);

	if (notificationsErrors.length > 0) {
		pino.error(notificationsErrors, "Error whilst performing the notification health check.");
	}
}
