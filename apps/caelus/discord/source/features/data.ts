import {
	type APIMessageComponentButtonInteraction,
	MessageFlags,
	RESTJSONErrorCodes,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { t } from "i18next";
import database from "../database.js";
import { client } from "../discord.js";
import pino from "../pino.js";
import {
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
	TRANSLATOR_ROLE_ID,
} from "../utility/configuration.js";
import { interactionInvoker } from "../utility/functions.js";
import { skyProfileDelete } from "./sky-profile.js";

export async function deleteUserData(interaction: APIMessageComponentButtonInteraction) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);
	const userId = invoker.id;

	try {
		await database.transaction().execute(async (transaction) => {
			await transaction.deleteFrom("catalogue").where("user_id", "=", userId).execute();
			await transaction.deleteFrom("checklist").where("user_id", "=", userId).execute();
			await transaction
				.updateTable("hearts")
				.set({ user_id: null })
				.where("user_id", "=", userId)
				.execute();
			await transaction
				.updateTable("hearts")
				.set({ giftee_id: null })
				.where("giftee_id", "=", userId)
				.execute();
			await transaction.deleteFrom("guess").where("user_id", "=", userId).execute();
			await transaction.deleteFrom("users").where("discord_user_id", "=", userId).execute();
			await skyProfileDelete(userId, transaction);
		});

		try {
			await client.api.guilds.removeRoleFromMember(
				SUPPORT_SERVER_GUILD_ID,
				userId,
				TRANSLATOR_ROLE_ID,
			);
		} catch (error) {
			// Unknown member is fine.
			if (!(error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.UnknownMember)) {
				throw error;
			}
		}
	} catch (error) {
		pino.error(error, `Error deleting user data for ${userId}.`);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [],
			content: t("data.delete-error", {
				lng: locale,
				ns: "features",
				url: SUPPORT_SERVER_INVITE_URL,
			}),
			flags: MessageFlags.SuppressEmbeds,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [],
		content: t("data.delete-success", { lng: locale, ns: "features" }),
	});
}
