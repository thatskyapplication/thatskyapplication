import { createHash } from "node:crypto";
import type { Snowflake } from "@discordjs/core";
import type { NotificationTypes } from "@thatskyapplication/utility";

export function notificationNonce(
	notificationType: NotificationTypes,
	channelId: Snowflake,
	key: string | number | undefined,
) {
	return createHash("md5")
		.update(
			key === undefined
				? `${notificationType}-${channelId}`
				: `${notificationType}-${key}-${channelId}`,
		)
		.digest("base64url");
}
