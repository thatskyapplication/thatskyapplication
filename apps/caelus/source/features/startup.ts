import type { NotificationPacket } from "@thatskyapplication/utility";
import { isDuring, skyNow, Table } from "@thatskyapplication/utility";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { GIVEAWAY_END_DATE, GIVEAWAY_START_DATE } from "../utility/constants.js";
import { eligible, type GiveawayPacket, ineligible } from "./giveaway.js";
import { checkSendable } from "./notifications.js";

async function giveaway() {
	// Ensure eligibility in the giveaway.
	const giveawayPackets = await pg<GiveawayPacket>(Table.Giveaway).select("user_id", "eligible");

	const { members } = await client.requestGuildMembers({
		guild_id: SUPPORT_SERVER_GUILD_ID,
		query: "",
		limit: 0,
	});

	const memberIds = new Set(members.map((member) => member.user.id));

	const giveawaySettled = await Promise.allSettled(
		giveawayPackets.map((giveawayPacket) => {
			const isInGuild = memberIds.has(giveawayPacket.user_id);

			if (isInGuild && !giveawayPacket.eligible) {
				return eligible({ userId: giveawayPacket.user_id });
			}

			if (!isInGuild && giveawayPacket.eligible) {
				return ineligible({ userId: giveawayPacket.user_id });
			}

			return undefined;
		}),
	);

	const giveawayErrors = giveawaySettled
		.filter((result) => result.status === "rejected")
		.map((result) => result.reason);

	if (giveawayErrors.length > 0) {
		pino.error(giveawayErrors, "Error whilst ensuring eligibility in the giveaway.");
	}
}

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
	const promises = [notifications()];

	if (isDuring(GIVEAWAY_START_DATE, GIVEAWAY_END_DATE, skyNow())) {
		promises.push(giveaway());
	}

	await Promise.all(promises);
}
