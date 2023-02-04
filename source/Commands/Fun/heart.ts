import type { ApplicationCommandData, ChatInputCommandInteraction, Snowflake } from "discord.js";
import {
	time,
	TimestampStyles,
	PermissionFlagsBits,
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import { todayDate } from "../../Utility/Utility.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface HeartPacket {
	gifter_id: Snowflake;
	giftee_id: Snowflake;
	timestamp: Date;
}

export default class implements ChatInputCommand {
	public readonly name = "heart";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, createdAt, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "You cannot give hearts to yourself!", ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to give a heart to.`, ephemeral: true });
			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around to receive the heart!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty emotionless. Immune to love, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		// This is possibly undefined.
		const heartPackets: (HeartPacket | undefined)[] = await pg<HeartPacket>(Table.Hearts)
			.select()
			.where({ gifter_id: interaction.user.id })
			.orderBy("timestamp", "desc")
			.limit(1);

		const timestamp = heartPackets[0]?.timestamp;

		if (timestamp && timestamp.getTime() >= todayDate().getTime()) {
			await interaction.reply({
				content: `You have already given a heart today!\nYou can give another heart ${time(
					Math.floor((todayDate().getTime() + 86_400_000) / 1_000),
					TimestampStyles.RelativeTime,
				)}.`,
				ephemeral: true,
			});

			return;
		}

		await pg<HeartPacket>(Table.Hearts).insert({
			gifter_id: interaction.user.id,
			giftee_id: user.id,
			timestamp: createdAt,
		});

		await interaction.reply(`Sending a heart to ${user}. ${interaction.user} is such a nice person!`);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Feeling generous? You have one heart to give per day!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "user",
					description: "The user to give a heart to.",
					required: true,
				},
			],
			dmPermission: false,
		};
	}
}
