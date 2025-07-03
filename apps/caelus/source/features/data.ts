import {
	type APIMessageComponentButtonInteraction,
	MessageFlags,
	RESTJSONErrorCodes,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import type { CataloguePacket, UsersPacket } from "@thatskyapplication/utility";
import { Table } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import type { GuessPacket } from "../models/Guess.js";
import type { HeartPacket } from "../models/Heart.js";
import Profile from "../models/Profile.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID, TRANSLATOR_ROLE_ID } from "../utility/configuration.js";
import { SUPPORT_SERVER_INVITE_URL } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";
import type { GiveawayPacket, GiveawayUpsellPacket } from "./giveaway.js";

export async function deleteUserData(interaction: APIMessageComponentButtonInteraction) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);
	const userId = invoker.id;
	const profile = await Profile.fetch(userId).catch(() => null);
	const promises = [];

	if (profile) {
		promises.push(profile.delete());
	}

	promises.push(
		pg<CataloguePacket>(Table.Catalogue).delete().where({ user_id: userId }),
		pg<HeartPacket>(Table.Hearts).update({ gifter_id: null }).where({ gifter_id: userId }),
		pg<HeartPacket>(Table.Hearts).update({ giftee_id: null }).where({ giftee_id: userId }),
		pg<GuessPacket>(Table.Guess).delete().where({ user_id: userId }),
		pg<GiveawayPacket>(Table.Giveaway).delete().where({ user_id: userId }),
		pg<GiveawayUpsellPacket>(Table.GiveawayUpsell).delete().where({ user_id: userId }),
		pg<UsersPacket>(Table.Users).delete().where({ discord_user_id: userId }),
	);

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
