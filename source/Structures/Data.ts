import { type ButtonInteraction, MessageFlags, hyperlink } from "discord.js";
import { SUPPORT_SERVER_INVITE_URL } from "../Utility/Constants.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import type { CataloguePacket } from "./Catalogue.js";
import type { GuessPacket } from "./Guess.js";
import type { HeartPacket } from "./Heart.js";
import Profile from "./Profile.js";

const DELETE_ERROR_MESSAGE = `There was an issue deleting your user data. Don't worry, this incident is being tracked and has been converted into a manual data deletion request (as opposed to an automatic one). Your data will be deleted within 30 days.
	
If you want, you may join the ${hyperlink(
	"support server",
	SUPPORT_SERVER_INVITE_URL,
)} and request to see the status of your data deletion request.` as const;

export async function deleteUserData(interaction: ButtonInteraction) {
	const { id } = interaction.user;
	const profile = await Profile.fetch(id).catch(() => null);
	const promises = [];

	if (profile) {
		promises.push(profile.delete());
	}

	promises.push(pg<CataloguePacket>(Table.Catalogue).delete().where({ user_id: id }));
	promises.push(pg<HeartPacket>(Table.Hearts).update({ gifter_id: null }).where({ gifter_id: id }));
	promises.push(pg<HeartPacket>(Table.Hearts).update({ giftee_id: null }).where({ giftee_id: id }));
	promises.push(pg<GuessPacket>(Table.Guess).delete().where({ user_id: id }));

	try {
		await Promise.all(promises);
	} catch (error) {
		pino.error(error, `Error deleting user data for ${id}.`);

		await interaction.update({
			components: [],
			content: DELETE_ERROR_MESSAGE,
			flags: MessageFlags.SuppressEmbeds,
		});

		return;
	}

	await interaction.update({
		components: [],
		content: "Your data has been deleted. You are a moth now.",
	});
}
