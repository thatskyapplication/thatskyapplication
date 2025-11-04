import {
	type APIMessageComponentButtonInteraction,
	MessageFlags,
	RESTJSONErrorCodes,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import type { CataloguePacket, UsersPacket } from "@thatskyapplication/utility";
import { type ChecklistPacket, Table } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import pg from "../pg.js";
import {
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
	TRANSLATOR_ROLE_ID,
} from "../utility/configuration.js";
import { captureError, interactionInvoker } from "../utility/functions.js";
import type { GuessPacket } from "./guess.js";
import type { HeartPacket } from "./heart.js";
import { skyProfileDelete } from "./sky-profile.js";

export async function deleteUserData(interaction: APIMessageComponentButtonInteraction) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);
	const userId = invoker.id;

	const promises = [
		pg<CataloguePacket>(Table.Catalogue).delete().where({ user_id: userId }),
		pg<ChecklistPacket>(Table.Checklist).delete().where({ user_id: userId }),
		pg<HeartPacket>(Table.Hearts).update({ user_id: null }).where({ user_id: userId }),
		pg<HeartPacket>(Table.Hearts).update({ giftee_id: null }).where({ giftee_id: userId }),
		pg<GuessPacket>(Table.Guess).delete().where({ user_id: userId }),
		skyProfileDelete(userId),
		pg<UsersPacket>(Table.Users).delete().where({ discord_user_id: userId }),
	];

	try {
		await Promise.all(promises);

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
		captureError(error, `Error deleting user data for ${userId}.`);

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
