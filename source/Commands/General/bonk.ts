import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { ChatInputCommand } from "../index.js";

const bonkMessages = [
	"{{bonker}} bonked {{bonkee}}. Bonk bonk bonk.",
	"An ethereal force bonked {{bonkee}} on the head.",
	"{{bonker}} proceeded to bonk {{bonkee}}, but slipped and fell on some bananas. The only thing they bonked was their own head.",
	"BONK! {{bonkee}} was destroyed.",
	"A terrifying, mystical force bonked {{bonkee}}. {{bonker}} is pleased.",
	"{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was successful.",
	"There was a 1% chance that {{bonkee}} would be bonked. {{bonker}} is that 1%. BONK.",
	"How extraordinary! A MASSIVE, HUGE BONK was applied to the forehead of {{bonkee}} by {{bonker}}.",
	"{{bonker}} took a flight, hiked mountains, conquered deserts, all to bonk {{bonkee}}. It was probably worth it.",
	"Due to unfortunate weather conditions, {{bonker}} fell into a hole. They did not manage to bonk {{bonkee}}. {{bonkee}} fell into a separate hole, though.",
	"{{bonker}} has bonked {{bonkee}}. Finally! You deserve it, my friend.",
	"{{bonker}} bonked {{bonkee}}. This is the only physical touch you'll ever receive.",
] as const;

export default class implements ChatInputCommand {
	public readonly name = "bonk";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const user = options.getUser("user", true);

		await interaction.reply(
			bonkMessages[Math.floor(Math.random() * bonkMessages.length)]
				.replaceAll("{{bonker}}", String(interaction.user))
				.replaceAll("{{bonkee}}", String(user)),
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
