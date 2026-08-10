import {
	ActivityType,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIModalSubmitGuildInteraction,
	ComponentType,
	MessageFlags,
	PresenceUpdateStatus,
	TextInputStyle,
} from "@discordjs/core";
import database from "../database.js";
import { client } from "../discord.js";
import { CustomId } from "../utility/custom-id.js";
import { ModalResolver } from "../utility/modal-resolver.js";

async function persistCustomStatus(customStatus: string | null) {
	const result = await database
		.updateTable("admin")
		.set({ custom_status: customStatus })
		.executeTakeFirst();

	if (result.numUpdatedRows === 0n) {
		await database.insertInto("admin").values({ custom_status: customStatus }).execute();
	}
}

export async function adminCustomStatusModal(
	interaction: APIChatInputApplicationCommandGuildInteraction,
) {
	const adminPacket = await database.selectFrom("admin").select("custom_status").executeTakeFirst();

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.AdminCustomStatusModalCustomStatus,
					max_length: 128,
					required: false,
					style: TextInputStyle.Short,
					value: adminPacket?.custom_status ?? "",
				},
				label: "Custom status",
			},
		],
		custom_id: CustomId.AdminCustomStatusModal,
		title: "Custom status",
	});
}

export async function adminHandleCustomStatus(interaction: APIModalSubmitGuildInteraction) {
	const components = new ModalResolver(interaction.data);
	const customStatus =
		components.getTextInputValue(CustomId.AdminCustomStatusModalCustomStatus) || null;
	const shardCount = await client.gateway.getShardCount();

	await Promise.all([
		persistCustomStatus(customStatus),
		...Array.from({ length: shardCount }, (_, index) =>
			client.updatePresence(index, {
				activities: customStatus
					? [{ type: ActivityType.Custom, name: customStatus, state: customStatus }]
					: [],
				afk: false,
				since: null,
				status: PresenceUpdateStatus.Online,
			}),
		),
	]);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: customStatus ? "Custom status set." : "Custom status removed.",
		flags: MessageFlags.Ephemeral,
	});
}
