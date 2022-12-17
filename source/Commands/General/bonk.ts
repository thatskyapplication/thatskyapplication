import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import type { ChatInputCommand } from "../index.js";

const bonkMessages = [
	"{{bonker}} bonked {{bonkee}}. Bonk bonk bonk.",
	"An ethereal force bonked {{bonkee}} on the head. A shrill giggle can be heard from {{bonker}}.",
	"{{bonker}} proceeded to bonk {{bonkee}}, but slipped and fell on some bananas. The only thing they bonked was their own head.",
	"BONK! {{bonkee}} was destroyed by {{bonker}}.",
	"A terrifying, mystical force bonked {{bonkee}}. {{bonker}} is pleased.",
	"{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was successful.",
	"{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was not successful.",
	"There was a 1% chance that {{bonkee}} would be bonked. {{bonker}} is that 1%. BONK.",
	"How extraordinary! A MASSIVE, HUGE BONK was applied to the forehead of {{bonkee}} by {{bonker}}.",
	"{{bonker}} took a flight, hiked mountains, conquered deserts, all to bonk {{bonkee}}. It was probably worth it.",
	"Due to unfortunate weather conditions, {{bonker}} fell into a hole. They did not manage to bonk {{bonkee}}. {{bonkee}} fell into a separate hole, though.",
	"{{bonker}} has bonked {{bonkee}}. Finally! You deserve it, my friend.",
	"{{bonker}} bonked {{bonkee}}. This is the only physical touch you'll ever receive.",
	"{{bonker}} hooked up with El Guapo, a pirate, and some sort of squirrel to figure out how to bonk {{bonkee}}. They're still working on it.",
	"{{bonkee}} escaped the almighty bonk of {{bonker}}. Is this the final bonk by {{bonker}}?",
	"We love {{bonkee}}, but {{bonker}} has other thoughts. BONK!",
	"{{bonkee}} got BONKED by the BONKER called {{bonker}} with the BONKINATOR BONKTHOUSAND. B O N K.",
] as const;

export default class implements ChatInputCommand {
	public readonly name = "bonk";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: `No self-bonking! Bad!`,
				ephemeral: true,
			});

			return;
		}

		if (!member) {
			await interaction.reply({
				content: `${user} is not in this server to be bonked.`,
				ephemeral: true,
			});

			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty tough. Immune to bonks, I'd say.`,
				ephemeral: true,
			});

			return;
		}

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
