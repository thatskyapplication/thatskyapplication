import {
	type ChatInputCommandInteraction,
	Locale,
	PermissionFlagsBits,
	type Snowflake,
	TimestampStyles,
	type UserContextMenuCommandInteraction,
	time,
} from "discord.js";
import { t } from "i18next";
import { history, total } from "../../Structures/Heart.js";
import { getRandomElement } from "../../Utility/Utility.js";
import { skyToday } from "../../Utility/dates.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, resolveCurrencyEmoji } from "../../Utility/emojis.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

export interface HeartPacket {
	gifter_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
}

export const enum HeartHistoryNavigationType {
	Back = 0,
	Forward = 1,
}

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

const MAXIMUM_HEARTS_PER_DAY = 3 as const;
export const HEART_HISTORY_BACK = "HEART_HISTORY_BACK" as const;
export const HEART_HISTORY_FORWARD = "HEART_HISTORY_FORWARD" as const;

export default new (class implements ChatInputCommand {
	public readonly name = t("heart.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "gift":
				await this.gift(interaction);
				break;
			case "history":
				await this.history(interaction);
		}
	}

	public async gift(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { channel, createdAt, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: `You cannot gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to yourself!`,
				ephemeral: true,
			});

			return;
		}

		if (interaction.inGuild() && !member) {
			await interaction.reply({
				content: `${user} is not in this server to gift a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} to.`,
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
			await interaction.reply({
				content: `${user} is not around to receive a ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)}!`,
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
				ephemeral: true,
			});

			return;
		}

		const noMoreHeartsLeft = `You have no more ${formatEmoji(
			MISCELLANEOUS_EMOJIS.Heart,
		)} left to gift today.\nYou can gift more ${tomorrowTimestamp}.`;

		if (filteredHeartPackets.length >= MAXIMUM_HEARTS_PER_DAY) {
			await interaction.reply({ content: noMoreHeartsLeft, ephemeral: true });
			return;
		}

		await pg<HeartPacket>(Table.Hearts).insert({
			gifter_id: interaction.user.id,
			giftee_id: user.id,
			timestamp: createdAt,
		});

		const hearts = await total(user.id);

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
			ephemeral: true,
		});
	}

	public async history(interaction: ChatInputCommandInteraction) {
		await history(interaction);
	}
})();
