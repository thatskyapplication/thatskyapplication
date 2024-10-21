import {
	ActionRowBuilder,
	ButtonBuilder,
	type ButtonInteraction,
	ButtonStyle,
	type ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	type Snowflake,
	TimestampStyles,
	type UserContextMenuCommandInteraction,
	time,
	userMention,
} from "discord.js";
import pg, { Table } from "../pg.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/Constants.js";
import { skyToday } from "../utility/dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, resolveCurrencyEmoji } from "../utility/emojis.js";
import { getRandomElement } from "../utility/functions.js";
import { cannotUsePermissions } from "../utility/permissionChecks.js";

const HEARTS = [
	"{{gifter}} sent a heart to {{giftee}}. How lucky!",
	"A heart from {{gifter}} to {{giftee}}. That was nice of them!",
	"Incoming heart from {{gifter}} to {{giftee}}!",
	"{{gifter}} sent {{giftee}} a heart! What a good friend!",
	"{{gifter}} sent {{giftee}} a heart. How nice of {{gifter}}!",
	"{{gifter}} sent a heart to {{giftee}}. They're pretty lucky!",
	"{{gifter}} sent {{giftee}} a heart. {{giftee}} is lucky to have a friend like you!",
	"{{gifter}}, sending a heart each day keeps the dark dragon away from {{giftee}}!",
	"A wholesome heart delivered to {{giftee}} from {{gifter}}!",
] as const satisfies Readonly<string[]>;

const DELETED_USER_TEXT = "<deleted>" as const;
const MAXIMUM_HEARTS_PER_DAY = 3 as const;
const HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER = 24 as const;
export const HEART_HISTORY_BACK = "HEART_HISTORY_BACK" as const;
export const HEART_HISTORY_NEXT = "HEART_HISTORY_NEXT" as const;

export interface HeartPacket {
	gifter_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
}

async function totalGifted(userId: Snowflake) {
	return Number(
		(await pg<HeartPacket>(Table.Hearts).count().where({ gifter_id: userId }))[0]!.count,
	);
}

export async function totalReceived(userId: Snowflake) {
	return Number(
		(await pg<HeartPacket>(Table.Hearts).count().where({ giftee_id: userId }))[0]!.count,
	);
}

export async function gift(
	interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const { channel, createdAt, options } = interaction;
	const user = options.getUser("user", true);
	const member = options.getMember("user");

	if (user.id === interaction.user.id) {
		await interaction.reply({
			content: `You cannot gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to yourself!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (interaction.inGuild() && !member) {
		await interaction.reply({
			content: `${user} is not in this server to gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to.`,
			flags: MessageFlags.Ephemeral,
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
		await interaction.reply({
			content: `${user} is not around to receive a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)}!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (user.bot) {
		await interaction.reply({
			content: `${user} is a bot. They're pretty emotionless. Immune to love, I'd say.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const today = skyToday();

	const tomorrowTimestamp = time(
		Math.floor(today.plus({ day: 1 }).toUnixInteger()),
		TimestampStyles.RelativeTime,
	);

	const heartPackets = await pg<HeartPacket>(Table.Hearts)
		.select()
		.where({ gifter_id: interaction.user.id })
		.orderBy("timestamp", "desc")
		.limit(MAXIMUM_HEARTS_PER_DAY);

	const filteredHeartPackets = heartPackets.filter(
		(heart) => heart.timestamp.getTime() >= today.toMillis(),
	);

	if (filteredHeartPackets.some((heart) => heart.giftee_id === user.id)) {
		await interaction.reply({
			content: `You've already sent ${user} a ${formatEmoji(
				MISCELLANEOUS_EMOJIS.Heart,
			)} today!\nYou can gift another one to them ${tomorrowTimestamp}.`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const noMoreHeartsLeft = `You have no more ${formatEmoji(
		MISCELLANEOUS_EMOJIS.Heart,
	)} left to gift today.\nYou can gift more ${tomorrowTimestamp}.`;

	if (filteredHeartPackets.length >= MAXIMUM_HEARTS_PER_DAY) {
		await interaction.reply({ content: noMoreHeartsLeft, flags: MessageFlags.Ephemeral });
		return;
	}

	await pg<HeartPacket>(Table.Hearts).insert({
		gifter_id: interaction.user.id,
		giftee_id: user.id,
		timestamp: createdAt,
	});

	const hearts = await totalReceived(user.id);

	const heartMessage = getRandomElement(HEARTS)!
		.replaceAll("heart", formatEmoji(MISCELLANEOUS_EMOJIS.Heart))
		.replaceAll("{{gifter}}", String(interaction.user))
		.replaceAll("{{giftee}}", String(user));

	await interaction.reply({
		allowedMentions: { users: [user.id] },
		content: `${heartMessage}\n${user} now has ${resolveCurrencyEmoji({
			emoji: MISCELLANEOUS_EMOJIS.Heart,
			number: hearts,
		})}.`,
	});

	const heartsLeftToGift = MAXIMUM_HEARTS_PER_DAY - filteredHeartPackets.length - 1;

	await interaction.followUp({
		content:
			heartsLeftToGift === 0
				? noMoreHeartsLeft
				: `You can gift ${heartsLeftToGift} more ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} today.`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function history(interaction: ButtonInteraction | ChatInputCommandInteraction) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const isChatInputCommand = interaction.isChatInputCommand();

	const page = isChatInputCommand
		? 1
		: Number(interaction.customId.slice(interaction.customId.indexOf("§") + 1));

	const offset = (page - 1) * HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER;

	const heartPackets = await pg<HeartPacket>(Table.Hearts)
		.where({ gifter_id: interaction.user.id })
		.orWhere({ giftee_id: interaction.user.id })
		.orderBy("timestamp", "desc")
		.limit(HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER + 1)
		.offset(offset);

	if (heartPackets.length === 0) {
		const response = {
			components: [],
			content: `You have ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: 0 })}.`,
			embeds: [],
		};

		if (isChatInputCommand) {
			await interaction.reply({ ...response, flags: MessageFlags.Ephemeral });
		} else {
			await interaction.update(response);
		}

		return;
	}

	const hasPreviousPage = offset > 0;
	const hasNextPage = heartPackets.length > HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER;

	if (hasNextPage) {
		heartPackets.pop();
	}

	const [gifted, received] = await Promise.all([
		totalGifted(interaction.user.id),
		totalReceived(interaction.user.id),
	]);

	const embed = new EmbedBuilder()
		.setColor(DEFAULT_EMBED_COLOUR)
		.setDescription(
			`Gifted: ${resolveCurrencyEmoji({
				emoji: MISCELLANEOUS_EMOJIS.Heart,
				number: gifted,
			})}\nReceived: ${resolveCurrencyEmoji({
				emoji: MISCELLANEOUS_EMOJIS.Heart,
				number: received,
			})}`,
		)
		.setFields(
			heartPackets.map((heartPacket) => {
				const gifted = heartPacket.gifter_id === interaction.user.id;
				const user = gifted ? heartPacket.giftee_id : heartPacket.gifter_id;

				return {
					name: gifted ? "Gifted" : "Received",
					value: `${user ? userMention(user) : DELETED_USER_TEXT}\n${time(
						Math.floor(heartPacket.timestamp.getTime() / 1_000),
						TimestampStyles.ShortDate,
					)}\n(${time(Math.floor(heartPacket.timestamp.getTime() / 1_000), TimestampStyles.RelativeTime)})`,
					inline: true,
				};
			}),
		)
		.setTitle("Heart History");

	const response = {
		components: [
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				new ButtonBuilder()
					.setCustomId(`${HEART_HISTORY_BACK}§${page - 1}`)
					.setDisabled(!hasPreviousPage)
					.setEmoji("⬅️")
					.setLabel("Back")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId(`${HEART_HISTORY_NEXT}§${page + 1}`)
					.setDisabled(!hasNextPage)
					.setEmoji("➡️")
					.setLabel("Next")
					.setStyle(ButtonStyle.Secondary),
			),
		],
		embeds: [embed],
	};

	if (isChatInputCommand) {
		await interaction.reply({ ...response, flags: MessageFlags.Ephemeral });
	} else {
		await interaction.update(response);
	}
}
