import {
	type ChatInputCommandInteraction,
	type Snowflake,
	type UserContextMenuCommandInteraction,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	EmbedBuilder,
	formatEmoji,
	time,
	TimestampStyles,
	PermissionFlagsBits,
	userMention,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR, Emoji } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, resolveCurrencyEmoji, todayDate } from "../../Utility/Utility.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface HeartPacket {
	gifter_id: Snowflake;
	giftee_id: Snowflake;
	timestamp: Date;
}

export const enum HeartHistoryNavigationType {
	Back,
	Forward,
}

interface HeartHistoryOptions {
	type: HeartHistoryNavigationType;
	timestamp: number;
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

export const HEART_HISTORY_BACK = "HEART_HISTORY_BACK" as const;
export const HEART_HISTORY_FORWARD = "HEART_HISTORY_FORWARD" as const;

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "heart",
		description: "Feeling generous? You have one heart to give per day!",
		type: ApplicationCommandType.ChatInput,
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
				name: "history",
				description: "Display a history of your hearts!",
			},
		],
		dmPermission: false,
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "gift":
				await this.gift(interaction);
				break;
			case "history":
				await this.history(interaction);
		}
	}

	public async heartCount(gifteeId: Snowflake) {
		return (await pg<HeartPacket>(Table.Hearts).select().where({ giftee_id: gifteeId })).length;
	}

	public async gift(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		if (await cannotUseCustomEmojis(interaction)) return;
		const { channel, createdAt, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: `You cannot gift a ${formatEmoji(Emoji.Heart)} to yourself!`,
				ephemeral: true,
			});

			return;
		}

		if (!member) {
			await interaction.reply({
				content: `${user} is not in this server to gift a ${formatEmoji(Emoji.Heart)} to.`,
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
				content: `${user} is not around to receive the ${formatEmoji(Emoji.Heart)}!`,
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
		const todayTimestamp = todayDate().valueOf();

		if (timestamp && timestamp.getTime() >= todayTimestamp) {
			await interaction.reply({
				content: `You have already gifted a ${formatEmoji(Emoji.Heart)} today!\nYou can give another one ${time(
					Math.floor((todayTimestamp + 86_400_000) / 1_000),
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

		const heartMessage = HEARTS[Math.floor(Math.random() * HEARTS.length)]!.replaceAll(
			"heart",
			formatEmoji(Emoji.Heart),
		)
			.replaceAll("{{gifter}}", String(interaction.user))
			.replaceAll("{{giftee}}", String(user));

		await interaction.reply(
			`${heartMessage}\n${user} now has ${resolveCurrencyEmoji({ emoji: Emoji.Heart, number: hearts })}.`,
		);
	}

	public async history(interaction: ChatInputCommandInteraction) {
		await this.heartHistory(interaction);
	}

	public async heartHistory(
		interaction: ButtonInteraction | ChatInputCommandInteraction,
		options: HeartHistoryOptions | null = null,
	) {
		if (await cannotUseCustomEmojis(interaction)) return;
		const buttonInteraction = interaction instanceof ButtonInteraction;

		const hearts = await pg<HeartPacket>(Table.Hearts)
			.select()
			.where({ gifter_id: interaction.user.id })
			.orWhere({ giftee_id: interaction.user.id })
			.orderBy("timestamp", "desc");

		if (hearts.length === 0) {
			const response = {
				components: [],
				content: `You have ${resolveCurrencyEmoji({ emoji: Emoji.Heart, number: 0 })}.`,
				embeds: [],
				ephemeral: true,
			};

			if (buttonInteraction) {
				await interaction.update(response);
			} else {
				await interaction.reply(response);
			}

			return;
		}

		const heartsFiltered = options
			? options.type === HeartHistoryNavigationType.Back
				? hearts.filter((heart) => heart.timestamp.getTime() > options.timestamp).slice(-24)
				: hearts.filter((heart) => heart.timestamp.getTime() < options.timestamp).slice(0, 24)
			: hearts.slice(0, 24);

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setDescription(
				`Gifted: ${resolveCurrencyEmoji({
					emoji: Emoji.Heart,
					number: hearts.filter((heart) => heart.gifter_id === interaction.user.id).length,
				})}\nReceived: ${resolveCurrencyEmoji({
					emoji: Emoji.Heart,
					number: hearts.filter((heart) => heart.giftee_id === interaction.user.id).length,
				})}`,
			)
			.setFields(
				heartsFiltered.map((heart) => {
					const gifted = heart.gifter_id === interaction.user.id;

					return {
						name: gifted ? "Gifted" : "Received",
						value: `${userMention(gifted ? heart.giftee_id : heart.gifter_id)}\n${time(
							Math.floor(heart.timestamp.getTime() / 1_000),
							TimestampStyles.ShortDate,
						)}\n(${time(Math.floor(heart.timestamp.getTime() / 1_000), TimestampStyles.RelativeTime)})`,
						inline: true,
					};
				}),
			)
			.setTitle("Heart History");

		const actionRow = new ActionRowBuilder<ButtonBuilder>();
		const firstTimestamp = heartsFiltered.at(0)?.timestamp.getTime();
		const lastTimestamp = heartsFiltered.at(-1)?.timestamp.getTime();

		if (firstTimestamp && firstTimestamp < hearts.at(0)!.timestamp.getTime()) {
			const button = new ButtonBuilder()
				.setCustomId(`${HEART_HISTORY_BACK}-${firstTimestamp}`)
				.setEmoji("◀️")
				.setStyle(ButtonStyle.Primary);

			actionRow.addComponents(button);
		}

		if (lastTimestamp && lastTimestamp > hearts.at(-1)!.timestamp.getTime()) {
			const button2 = new ButtonBuilder()
				.setCustomId(`${HEART_HISTORY_FORWARD}-${lastTimestamp}`)
				.setEmoji("▶️")
				.setStyle(ButtonStyle.Primary);

			actionRow.addComponents(button2);
		}

		const response = {
			components: actionRow.components.length > 0 ? [actionRow] : [],
			embeds: [embed],
			ephemeral: true,
		};

		if (buttonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}
})();
