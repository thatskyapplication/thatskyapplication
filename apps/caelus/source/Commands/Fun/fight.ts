import type { ApplicationCommandData, ChatInputCommandInteraction, Snowflake } from "discord.js";
import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { resolveEmbedColor } from "../../Utility/Utility.js";
import { waifu, WaifuCategory } from "../../Utility/externalAPIs.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface FightPacket {
	fighter_id: Snowflake;
	fightee_id: Snowflake;
	timestamp: Date;
}

export default class implements ChatInputCommand {
	public readonly name = "fight";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, createdAt, guild, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "No harm self! No no no!", ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to fight.`, ephemeral: true });
			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around for the fight!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty durable. Immune to fights, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		const { url } = await waifu(Math.random() < 0.5 ? WaifuCategory.Kick : WaifuCategory.Slap);
		const embed = new EmbedBuilder().setColor(await resolveEmbedColor(guild)).setImage(url);

		await pg<FightPacket>(Table.Fights).insert({
			fighter_id: interaction.user.id,
			fightee_id: user.id,
			timestamp: createdAt,
		});

		await interaction.reply({ content: `${interaction.user} is fighting ${user}!`, embeds: [embed] });
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Fight someone!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "user",
					description: "The individual to fight.",
					required: true,
				},
			],
			dmPermission: false,
		};
	}
}
