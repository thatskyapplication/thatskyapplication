import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "bonk";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		await interaction.reply(
			member === null ? `An ethereal force bonked ${user} on the head.` : `${user} was bonked. Bonk bonk bonk.`,
		);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Bonk someone!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "user",
					description: "The individual to be bonked.",
					required: true,
				},
			],
			dmPermission: false,
		};
	}
}
