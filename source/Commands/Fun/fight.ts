import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { PermissionFlagsBits, ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "fight";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: `No harm self! No no no!`, ephemeral: true });
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

		await interaction.reply({ content: `PEW PEW! ${interaction.user} picked a fight with ${user}.` });
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
