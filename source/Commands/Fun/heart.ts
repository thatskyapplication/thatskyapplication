import type {
	ApplicationCommandData,
	ChatInputCommandInteraction,
	Snowflake,
	UserContextMenuCommandInteraction,
} from "discord.js";
import {
	time,
	TimestampStyles,
	PermissionFlagsBits,
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import { Emoji } from "../../Utility/Constants.js";
import { resolveCurrencyEmoji, todayDate } from "../../Utility/Utility.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface HeartPacket {
	gifter_id: Snowflake;
	giftee_id: Snowflake;
	timestamp: Date;
}

const HEARTS = [
	"{{gifter}} sent a heart to {{giftee}}. How lucky!",
	"A heart from {{gifter}} to {{giftee}}. That was nice of them!",
	"Incoming heart from {{gifter}} to {{giftee}}!",
	"{{gifter}} sent {{giftee}} a heart! What a good friend!",
	"Sent {{giftee}} a heart. How nice of {{gifter}}!",
	"{{gifter}} sent a heart to {{giftee}}. They're pretty lucky!",
	"Sent {{giftee}} a heart. {{gifter}} is lucky to have a friend like you!",
	"{{gifter}}, sending a heart each day keeps the dark dragon away from {{giftee}}!",
	"A wholesome heart delivered to {{giftee}} from {{gifter}}!",
] as const satisfies Readonly<string[]>;

export default class implements ChatInputCommand {
	public readonly name = "heart";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "count":
				await this.count(interaction);
				return;
			case "gift":
				await this.gift(interaction);
		}
	}

	public async heartCount(gifteeId: Snowflake) {
		return (await pg<HeartPacket>(Table.Hearts).select().where({ giftee_id: gifteeId })).length;
	}

	public async count(interaction: ChatInputCommandInteraction) {
		await interaction.reply(
			`You have ${resolveCurrencyEmoji({
				interaction,
				emoji: Emoji.Heart,
				number: await this.heartCount(interaction.user.id),
			})}.`,
		);
	}

	public async gift(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		const { channel, createdAt, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: `You cannot gift a ${resolveCurrencyEmoji({ interaction, emoji: Emoji.Heart })} to yourself!`,
				ephemeral: true,
			});

			return;
		}

		if (!member) {
			await interaction.reply({
				content: `${user} is not in this server to gift a ${resolveCurrencyEmoji({
					interaction,
					emoji: Emoji.Heart,
				})} to.`,
				ephemeral: true,
			});

			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({
				content: `${user} is not around to receive the ${resolveCurrencyEmoji({ interaction, emoji: Emoji.Heart })}!`,
				ephemeral: true,
			});

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
				content: `You have already gifted a ${resolveCurrencyEmoji({
					interaction,
					emoji: Emoji.Heart,
				})} today!\nYou can give another ${resolveCurrencyEmoji({ interaction, emoji: Emoji.Heart })} ${time(
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

		const hearts = await this.heartCount(user.id);

		const heartMessage = HEARTS[Math.floor(Math.random() * HEARTS.length)]
			.replaceAll("{{gifter}}", String(interaction.user))
			.replaceAll("{{giftee}}", String(user));

		await interaction.reply(
			`${heartMessage}\n${user} now has ${resolveCurrencyEmoji({ interaction, emoji: Emoji.Heart, number: hearts })}.`,
		);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Feeling generous? You have one heart to give per day!",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "gift",
					description: "Choose someone to gift your heart to!",
					options: [
						{
							type: ApplicationCommandOptionType.User,
							name: "user",
							description: "The user to give a heart to.",
							required: true,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "count",
					description: "Count the number of hearts you have!",
				},
			],
			dmPermission: false,
		};
	}
}
