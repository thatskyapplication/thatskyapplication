import { randomInt } from "node:crypto";
import {
	type APIChatInputApplicationCommandInteraction,
	ButtonStyle,
	ComponentType,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { formatEmoji } from "@thatskyapplication/utility";
import database from "../database.js";
import { client } from "../discord.js";
import { SUPPORT_SERVER_INVITE_URL } from "../utility/configuration.js";
import { LOCALE_UPSELL_LOCALES } from "../utility/constants.js";
import { EMOTE_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker } from "../utility/functions.js";

export async function localeUpsell(interaction: APIChatInputApplicationCommandInteraction) {
	if (!LOCALE_UPSELL_LOCALES.includes(interaction.locale) || randomInt(4) !== 0) {
		return;
	}

	const userId = interactionInvoker(interaction).id;
	const seenAt = new Date();

	const usersPacket = await database
		.insertInto("users")
		.values({ discord_user_id: userId, locale_upsell_seen_at: seenAt })
		.onConflict((oc) =>
			oc
				.column("discord_user_id")
				.doUpdateSet({ locale_upsell_seen_at: seenAt })
				.where("users.locale_upsell_seen_at", "is", null)
				.where("users.translator", "is not", true),
		)
		.returning("discord_user_id")
		.executeTakeFirst();

	if (!usersPacket) {
		return;
	}

	try {
		await client.api.interactions.followUp(interaction.application_id, interaction.token, {
			components: [
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						url: SUPPORT_SERVER_INVITE_URL,
						label: t("support-server", { lng: interaction.locale, ns: "general" }),
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `Hey! Caelus is translated by volunteers. If you'd like to help improve the translation you're using, join the support server and ask about translating! ${formatEmoji(EMOTE_EMOJIS.Grateful)}\n-# You won't see this again.`,
						},
					],
				},
			],
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	} catch (error) {
		await database
			.updateTable("users")
			.set({ locale_upsell_seen_at: null })
			.where("discord_user_id", "=", userId)
			.where("locale_upsell_seen_at", "=", seenAt)
			.execute();

		throw error;
	}
}
