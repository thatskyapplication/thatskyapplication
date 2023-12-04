import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import type { ButtonInteraction } from "discord.js";
import type { HeartPacket } from "../Commands/Fun/heart.js";
import S3Client from "../S3Client.js";
import { CDN_BUCKET } from "../Utility/Constants.js";
import pg, { Table } from "../pg.js";
import type { ProfilePacket } from "./Profile.js";
import Profile from "./Profile.js";
import type { SpiritTrackerPacket } from "./Spirits/SpiritTracker.js";

export async function deleteUserData(interaction: ButtonInteraction) {
	const { id } = interaction.user;
	const profile = await Profile.fetch(id).catch(() => null);
	const promises = [];

	if (profile) {
		const profileDeleteData = [];

		if (profile.icon) {
			profileDeleteData.push({ Key: Profile.iconRoute(id, profile.icon) });
		}

		if (profile.thumbnail) {
			profileDeleteData.push({ Key: Profile.thumbnailRoute(id, profile.thumbnail) });
		}

		promises.push(
			S3Client.send(new DeleteObjectsCommand({ Bucket: CDN_BUCKET, Delete: { Objects: profileDeleteData } })),
		);
	}

	promises.push(pg<ProfilePacket>(Table.Profiles).delete().where({ user_id: id }));
	promises.push(pg<SpiritTrackerPacket>(Table.SpiritTracker).delete().where({ user_id: id }));
	promises.push(pg<HeartPacket>(Table.Hearts).update({ gifter_id: null }).where({ gifter_id: id }));
	promises.push(pg<HeartPacket>(Table.Hearts).update({ giftee_id: null }).where({ giftee_id: id }));
	await Promise.all(promises);

	await interaction.update({
		components: [],
		content: "Your data has been deleted. You are a moth now.",
	});
}
