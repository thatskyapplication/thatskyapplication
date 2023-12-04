import type { ButtonInteraction } from "discord.js";
import type { HeartPacket } from "../Commands/Fun/heart.js";
import pg, { Table } from "../pg.js";
import type { ProfilePacket } from "./Profile.js";
import type { SpiritTrackerPacket } from "./Spirits/SpiritTracker.js";

export async function deleteUserData(interaction: ButtonInteraction) {
	const { id } = interaction.user;
	await pg<ProfilePacket>(Table.Profiles).delete().where({ user_id: id });
	await pg<SpiritTrackerPacket>(Table.SpiritTracker).delete().where({ user_id: id });
	await pg<HeartPacket>(Table.Hearts).update({ gifter_id: null }).where({ gifter_id: id });
	await pg<HeartPacket>(Table.Hearts).update({ giftee_id: null }).where({ giftee_id: id });

	await interaction.update({
		components: [],
		content: "Your data has been deleted. You are a moth now.",
	});
}
