import type { ApplicationCommandData, ChatInputCommandInteraction, Snowflake } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface BonkPacket {
	user_id: Snowflake;
	count: number;
}

const bonks = [
	{
		message: "{{bonker}} bonked {{bonkee}}. Bonk bonk bonk.",
		successful: true,
	},
	{
		message: "An ethereal force bonked {{bonkee}} on the head. A shrill giggle can be heard from {{bonker}}.",
		successful: true,
	},
	{
		message:
			"{{bonker}} proceeded to bonk {{bonkee}}, but slipped and fell on some bananas. The only thing they bonked was their own head.",
		successful: false,
	},
	{
		message: "BONK! {{bonkee}} was destroyed by {{bonker}}.",
		successful: true,
	},
	{
		message: "A terrifying, mystical force bonked {{bonkee}}. {{bonker}} is pleased.",
		successful: true,
	},
	{
		message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was successful.",
		successful: true,
	},
	{
		message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was not successful.",
		successful: false,
	},
	{
		message: "There was a 1% chance that {{bonkee}} would be bonked. {{bonker}} is that 1%. BONK.",
		successful: true,
	},
	{
		message: "How extraordinary! A MASSIVE, HUGE BONK was applied to the forehead of {{bonkee}} by {{bonker}}.",
		successful: true,
	},
	{
		message:
			"{{bonker}} took a flight, hiked mountains, conquered deserts, all to bonk {{bonkee}}. It was probably worth it.",
		successful: true,
	},
	{
		message:
			"Due to unfortunate weather conditions, {{bonker}} fell into a hole. They did not manage to bonk {{bonkee}}. {{bonkee}} fell into a separate hole, though.",
		successful: false,
	},
	{
		message: "{{bonker}} has bonked {{bonkee}}. Finally! You deserve it, my friend.",
		successful: true,
	},
	{
		message: "{{bonker}} bonked {{bonkee}}. This is the only physical touch you'll ever receive.",
		successful: true,
	},
	{
		message:
			"{{bonker}} hooked up with El Guapo, a pirate, and some sort of squirrel to figure out how to bonk {{bonkee}}. They're still working on it.",
		successful: false,
	},
	{
		message: "{{bonkee}} escaped the almighty bonk of {{bonker}}. Is this the final bonk by {{bonker}}?",
		successful: false,
	},
	{
		message: "We love {{bonkee}}, but {{bonker}} has other thoughts. BONK!",
		successful: true,
	},
	{
		message: "{{bonkee}} got BONKED by the BONKER called {{bonker}} with the BONKINATOR BONKTHOUSAND. B O N K.",
		successful: true,
	},
	{
		message:
			"It's a beautiful night, {{bonker}}'s looking for something dumb to do. Hey {{bonkee}}, {{bonker}}'s gonna BONK you! *BONK*",
		successful: true,
	},
	{
		message:
			"{{bonker}} entered the nearby building, scaled to its peak, and dove off the top to bonk {{bonkee}}'s forehead at terminal velocity.",
		successful: true,
	},
	{
		message:
			"{{bonker}} was about to bonk {{bonkee}}, but {{bonkee}} turned around and bonked {{bonker}} instead. Oh, how the tables have turned!",
		successful: false,
	},
	{
		message: "A wild {{bonker}} appeared! {{bonker}} BONKED {{bonkee}} then mysteriously disappeared...",
		successful: true,
	},
	{
		message: "Roses are red, violets are blue, {{bonker}} bonked {{bonkee}}, and jumped on them too.",
		successful: true,
	},
	{
		message: "{{bonker}} picked {{bonkee}} up, threw them into the air, and bonked them into outer space.",
		successful: true,
	},
	{
		message: "Somebody was lurking in the shadows. It was {{bonker}} and they just bonked {{bonkee}}.",
		successful: true,
	},
] as const;

export default class implements ChatInputCommand {
	public readonly name = "bonk";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: `No self-bonking! Bad!`, ephemeral: true });
			return;
		}

		if (!member) {
			await interaction.reply({ content: `${user} is not in this server to be bonked.`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty tough. Immune to bonks, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		const { message, successful } = bonks[Math.floor(Math.random() * bonks.length)];
		let bonkMessage = message.replaceAll("{{bonker}}", String(interaction.user)).replaceAll("{{bonkee}}", String(user));

		if (successful) {
			const [{ count }] = await pg<BonkPacket>(Table.Bonks)
				.insert({ user_id: user.id, count: 1 })
				.onConflict("user_id")
				.merge({ count: pg.raw("?? + 1", `${Table.Bonks}.count`) })
				.returning("count");

			if (count % 50 === 0) bonkMessage += `\n${user} has been bonked ${count} times!`;
		}

		await interaction.reply(bonkMessage);
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
