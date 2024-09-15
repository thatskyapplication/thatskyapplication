import {
	type ApplicationCommandData,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
} from "discord.js";
import type { ChatInputCommand } from "../index.js";

const BONKS = {
	successful: [
		{
			message: "{{bonker}} bonked {{bonkee}}. Bonk bonk bonk.",
		},
		{
			message:
				"An ethereal force bonked {{bonkee}} on the head. A shrill giggle can be heard from {{bonker}}.",
		},
		{
			message: "BONK! {{bonkee}} was destroyed by {{bonker}}.",
		},
		{
			message: "A terrifying, mystical force bonked {{bonkee}}. {{bonker}} is pleased.",
		},
		{
			message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was successful.",
		},
		{
			message:
				"There was a 1% chance that {{bonkee}} would be bonked. {{bonker}} is that 1%. BONK.",
		},
		{
			message:
				"How extraordinary! A MASSIVE, HUGE BONK was applied to the forehead of {{bonkee}} by {{bonker}}.",
		},
		{
			message:
				"{{bonker}} took a flight, hiked mountains, conquered deserts, all to bonk {{bonkee}}. It was probably worth it.",
		},
		{
			message: "{{bonker}} has bonked {{bonkee}}. Finally! You deserve it, my friend.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}. This is the only physical touch you'll ever receive.",
		},
		{
			message: "We love {{bonkee}}, but {{bonker}} has other thoughts. BONK!",
		},
		{
			message:
				"{{bonkee}} got BONKED by the BONKER called {{bonker}} with the BONKINATOR BONKTHOUSAND. B O N K.",
		},
		{
			message:
				"It's a beautiful night, {{bonker}}'s looking for something dumb to do. Hey {{bonkee}}, {{bonker}}'s gonna BONK you! *BONK*",
		},
		{
			message:
				"{{bonker}} entered the nearby building, scaled to its peak, and dove off the top to bonk {{bonkee}}'s forehead at terminal velocity.",
		},
		{
			message:
				"A wild {{bonker}} appeared! {{bonker}} BONKED {{bonkee}} then mysteriously disappeared...",
		},
		{
			message:
				"{{bonker}} picked {{bonkee}} up, threw them into the air, and bonked them into outer space.",
		},
		{
			message:
				"Somebody was lurking in the shadows. It was {{bonker}} and they just bonked {{bonkee}}.",
		},
		{
			message:
				"{{bonker}} runs to {{bonkee}} but they accidentally hug each other! {{bonker}} sneaked in a lil' bonk, though.",
		},
		{
			message: "It's time to bonk {{bonkee}}. {{bonker}} did the deed.",
		},
		{
			message: "PEW PEW! {{bonker}} bonked {{bonkee}}.",
		},
		{
			message: "COLLATERAL DAMAGE! {{bonker}} bonked {{bonkee}}.",
		},
		{
			message: "{{bonker}} used bonk! It's super effective! {{bonkee}} took a lot of damage!",
		},
		{
			message:
				"{{bonker}} used bonk! It's not very effective... {{bonkee}} didn't take that much damage.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}, but at what cost?",
		},
		{
			message:
				"Roses are red,\nViolets are blue,\n{{bonker}} bonked {{bonkee}},\nAnd smacked them up too.",
		},
		{
			message:
				"A bee lands on {{bonkee}}'s head, but flies off after a few seconds. Taking advantage of the situation, {{bonker}} bonks {{bonkee}} anyway.",
		},
		{
			message: "{{bonkee}} can deal with the bad nights, but not when {{bonker}} bonks them. BONK.",
		},
		{
			message:
				"{{bonker}} jumped on a trampoline, somersaulted 14 times, entered a dive position, and bonked {{bonkee}}. It was a perfect landing.",
		},
		{
			message: "{{bonker}} bonked {{bonkee}}. It was a total headshot.",
		},
	],
	unsuccessful: [
		{
			message:
				"{{bonker}} proceeded to bonk {{bonkee}}, but slipped and fell on some bananas. The only thing they bonked was their own head.",
		},
		{
			message: "{{bonker}} attempted to bonk {{bonkee}}. {{bonker}} was not successful.",
		},
		{
			message:
				"Due to unfortunate weather conditions, {{bonker}} fell into a hole. They did not manage to bonk {{bonkee}}. {{bonkee}} fell into a separate hole, though.",
		},
		{
			message:
				"{{bonker}} hooked up with {{entry1}}, {{entry2}}, and {{entry3}} to figure out how to bonk {{bonkee}}. They're still working on it.",
			entries: [
				["El Guapo", "a pirate", "some sort of squirrel"],
				["Dracula", "Pope Francis", "a pet lizard"],
				["a moth", "the captain of the underworld", "Perry the Platypus"],
				[
					"Ed Sheeran",
					"a local microwave from a local fishing shop",
					"a piece of sentient bubble wrap",
				],
				["a duck", "the Yakuza", "a bubble that cannot be popped"],
				["Aurora", "a mirror", "a nearby particle"],
				["the NHS", "the inevitable darkness", "John Appleseed"],
				["a camera", "a tree", "the octopus overlord"],
			] satisfies [string, string, string][],
		},
		{
			message:
				"{{bonkee}} escaped the almighty bonk of {{bonker}}. Is this the final bonk by {{bonker}}?",
		},
		{
			message:
				"{{bonker}} was about to bonk {{bonkee}}, but {{bonkee}} turned around and bonked {{bonker}} instead. Oh, how the tables have turned!",
		},
		{
			message:
				"{{bonker}} is on their way to bonk {{bonkee}}, but finds a box of doughnuts! After weighing the odds, {{bonker}} feasts on the doughnuts instead.",
		},
		{
			message: "{{bonker}} used bonk! It didn't affect {{bonkee}}...",
		},
	],
} as const;

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "bonk",
		description: "Bonk someone!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The individual to be bonked.",
				required: true,
			},
		],
		integrationTypes: [0, 1],
		contexts: [0, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "No self-bonking! Bad!", ephemeral: true });
			return;
		}

		if (interaction.inGuild() && !member) {
			await interaction.reply({
				content: `${user} is not in this server to be bonked.`,
				ephemeral: true,
			});

			return;
		}

		if (
			channel &&
			!channel.isDMBased() &&
			member &&
			"user" in member &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around for the bonk!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty tough. Immune to bonks, I'd say.`,
				ephemeral: true,
			});

			return;
		}

		const decidingBonk = Math.random() < 0.1 ? BONKS.unsuccessful : BONKS.successful;
		const bonk = decidingBonk[Math.floor(Math.random() * decidingBonk.length)]!;
		const { message } = bonk;

		let bonkMessage = message
			.replaceAll("{{bonker}}", String(interaction.user))
			.replaceAll("{{bonkee}}", String(user));

		if ("entries" in bonk) {
			const { entries } = bonk;
			const [entry1, entry2, entry3] = entries[Math.floor(Math.random() * entries.length)]!;

			bonkMessage = bonkMessage
				.replace("{{entry1}}", entry1)
				.replace("{{entry2}}", entry2)
				.replace("{{entry3}}", entry3);
		}

		await interaction.reply(bonkMessage);
	}
})();
