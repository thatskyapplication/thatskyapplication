import type { APIChannel } from "@discordjs/core";
import type { NOTIFICATION_CHANNEL_TYPES } from "../utility/constants.js";

export type NotificationAllowedChannel = Extract<
	APIChannel,
	{ type: (typeof NOTIFICATION_CHANNEL_TYPES)[number] }
>;
