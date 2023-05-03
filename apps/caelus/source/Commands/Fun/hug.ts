import { URL } from "node:url";
import type { ApplicationCommandData, ChatInputCommandInteraction, Snowflake } from "discord.js";
import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { CDN_URL, MAX_HUG_NO } from "../../Utility/Constants.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface HugPacket {
	hugger_id: Snowflake;
	huggee_id: Snowflake;
	timestamp: Date;
}

export default class implements ChatInputCommand {
	public readonly name = "hug";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, createdAt, guild, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "Share the love! Hug someone other than yourself!", ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to be hugged.`, ephemeral: true });
			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around for the hug!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty emotionless. Immune to hugs, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		await pg<HugPacket>(Table.Hugs).insert({
			hugger_id: interaction.user.id,
			huggee_id: user.id,
			timestamp: createdAt,
		});

		await interaction.reply({
			content: `${user}, ${interaction.user} hugged you!`,
			embeds: [
				new EmbedBuilder()
					.setColor((await guild?.members.fetchMe())?.displayColor ?? 0)
					.setImage(String(new URL(`hugs/${Math.floor(Math.random() * MAX_HUG_NO + 1)}.gif`, CDN_URL))),
			],
		});
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Hug someone!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "user",
					description: "The individual to be hugged.",
					required: true,
				},
			],
			dmPermission: false,
		};
	}
}
