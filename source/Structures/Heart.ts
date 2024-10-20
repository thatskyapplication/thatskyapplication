import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	type ChatInputCommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
	type Snowflake,
	TimestampStyles,
	time,
	userMention,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR } from "../Utility/Constants.js";
import { MISCELLANEOUS_EMOJIS, resolveCurrencyEmoji } from "../Utility/emojis.js";
import { cannotUsePermissions } from "../Utility/permissionChecks.js";
import pg, { Table } from "../pg.js";

export const HEARTS = [
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
export const MAXIMUM_HEARTS_PER_DAY = 3 as const;
export const HEART_HISTORY_BACK = "HEART_HISTORY_BACK" as const;
export const HEART_HISTORY_FORWARD = "HEART_HISTORY_FORWARD" as const;

export interface HeartPacket {
	gifter_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
}

export const enum HeartHistoryNavigationType {
	Back = 0,
	Forward = 1,
}

interface HeartHistoryOptions {
	type: HeartHistoryNavigationType;
	timestamp: number;
}

export async function total(gifteeId: Snowflake) {
	return Number(
		(await pg<HeartPacket>(Table.Hearts).count().where({ giftee_id: gifteeId }))[0]!.count,
	);
}

export async function history(
	interaction: ButtonInteraction | ChatInputCommandInteraction,
	options: HeartHistoryOptions | null = null,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const buttonInteraction = interaction instanceof ButtonInteraction;

	const hearts = await pg<HeartPacket>(Table.Hearts)
		.select()
		.where({ gifter_id: interaction.user.id })
		.orWhere({ giftee_id: interaction.user.id })
		.orderBy("timestamp", "desc");

	if (hearts.length === 0) {
		const response = {
			components: [],
			content: `You have ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: 0 })}.`,
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
				emoji: MISCELLANEOUS_EMOJIS.Heart,
				number: hearts.filter((heart) => heart.gifter_id === interaction.user.id).length,
			})}\nReceived: ${resolveCurrencyEmoji({
				emoji: MISCELLANEOUS_EMOJIS.Heart,
				number: hearts.filter((heart) => heart.giftee_id === interaction.user.id).length,
			})}`,
		)
		.setFields(
			heartsFiltered.map((heart) => {
				const gifted = heart.gifter_id === interaction.user.id;
				const user = gifted ? heart.giftee_id : heart.gifter_id;

				return {
					name: gifted ? "Gifted" : "Received",
					value: `${user ? userMention(user) : DELETED_USER_TEXT}\n${time(
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
