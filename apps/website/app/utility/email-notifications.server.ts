import { randomUUID } from "node:crypto";
import type { Snowflake } from "@discordjs/core/http-only";
import database from "~/database.server.js";

interface EmailNotificationsSubscriptions {
	travellingSpirit: boolean;
	returningSpirits: boolean;
}

export interface EmailNotificationsPending extends EmailNotificationsSubscriptions {
	locale: string;
}

interface SaveEmailNotificationsOptions extends EmailNotificationsPending {
	userId: Snowflake;
	email: string;
}

export async function fetchEmailNotifications(userId: Snowflake) {
	const emailNotificationsPacket = await database
		.selectFrom("notifications_email")
		.select(["email", "travelling_spirit_subscribed_at", "returning_spirits_subscribed_at"])
		.where("user_id", "=", userId)
		.executeTakeFirst();

	if (!emailNotificationsPacket) {
		return null;
	}

	return {
		email: emailNotificationsPacket.email,
		travellingSpirit: emailNotificationsPacket.travelling_spirit_subscribed_at !== null,
		returningSpirits: emailNotificationsPacket.returning_spirits_subscribed_at !== null,
	};
}

export async function saveEmailNotifications({
	userId,
	email,
	locale,
	travellingSpirit,
	returningSpirits,
}: SaveEmailNotificationsOptions) {
	const now = new Date();

	await database.transaction().execute(async (transaction) => {
		await transaction
			.insertInto("notifications_email")
			.values({
				user_id: userId,
				email,
				locale,
				travelling_spirit_subscribed_at: travellingSpirit ? now : null,
				returning_spirits_subscribed_at: returningSpirits ? now : null,
			})
			.onConflict((oc) =>
				oc.column("user_id").doUpdateSet((eb) => ({
					email: eb.ref("excluded.email"),
					locale: eb.ref("excluded.locale"),
					travelling_spirit_subscribed_at: travellingSpirit
						? eb.fn.coalesce(
								"notifications_email.travelling_spirit_subscribed_at",
								"excluded.travelling_spirit_subscribed_at",
							)
						: null,
					returning_spirits_subscribed_at: returningSpirits
						? eb.fn.coalesce(
								"notifications_email.returning_spirits_subscribed_at",
								"excluded.returning_spirits_subscribed_at",
							)
						: null,
				})),
			)
			.execute();

		await transaction
			.insertInto("users")
			.values({ discord_user_id: userId, email_unsubscribe_token: randomUUID() })
			.onConflict((oc) =>
				oc
					.column("discord_user_id")
					.doUpdateSet((eb) => ({
						email_unsubscribe_token: eb.ref("excluded.email_unsubscribe_token"),
					}))
					.where("users.email_unsubscribe_token", "is", null),
			)
			.execute();
	});
}

export async function deleteEmailNotifications(userId: Snowflake) {
	await database.deleteFrom("notifications_email").where("user_id", "=", userId).execute();
}

export async function unsubscribeFromEmailNotifications(emailUnsubscribeToken: string) {
	await database
		.deleteFrom("notifications_email")
		.where("user_id", "in", (eb) =>
			eb
				.selectFrom("users")
				.select("discord_user_id")
				.where("email_unsubscribe_token", "=", emailUnsubscribeToken),
		)
		.execute();
}
