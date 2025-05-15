import {
	type APIChatInputApplicationCommandInteraction,
	type APIMessageComponentButtonInteraction,
	ButtonStyle,
	ComponentType,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../discord.js";
import type { GiveawayPacket, GiveawayUpsellPacket } from "../features/giveaway.js";
import type { CataloguePacket } from "../models/Catalogue.js";
import type { GuessPacket } from "../models/Guess.js";
import type { HeartPacket } from "../models/Heart.js";
import Profile from "../models/Profile.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { DATA_DELETION_CUSTOM_ID, SUPPORT_SERVER_INVITE_URL } from "../utility/constants.js";
import { interactionInvoker } from "../utility/functions.js";

export async function deletePrompt(interaction: APIChatInputApplicationCommandInteraction) {
	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: DATA_DELETION_CUSTOM_ID,
						label: "Delete my data",
						style: ButtonStyle.Danger,
					},
				],
			},
		],
		content: t("data.delete.prompt-message", { lng: interaction.locale, ns: "commands" }),
		flags: MessageFlags.Ephemeral,
	});
}

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
	);

	try {
		await Promise.all(promises);
	} catch (error) {
		pino.error(error, `Error deleting user data for ${userId}.`);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [],
			content: t("data.delete.error-message", {
				lng: locale,
				ns: "commands",
				url: SUPPORT_SERVER_INVITE_URL,
			}),
			flags: MessageFlags.SuppressEmbeds,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [],
		content: "Your data has been deleted. You are a moth now.",
	});
}
