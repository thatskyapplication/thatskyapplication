import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { GUILD_CACHE } from "../../caches/guilds.js";
import { client } from "../../discord.js";
import {
	isDailyGuidesDistributable,
	isDailyGuidesDistributionChannel,
	setup as setupDailyGuides,
	setupResponse as setupResponseDailyGuides,
} from "../../features/daily-guides.js";
import { meOverview } from "../../features/me.js";
import { setupResponse as setupResponseNotifications } from "../../features/notifications.js";
import { welcomeSetup } from "../../features/welcome.js";
import type { Guild } from "../../models/discord/guild.js";
import {
	formatArrayErrors,
	isGuildChatInputCommand,
	isThreadChannelType,
	notInCachedGuildResponse,
} from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

async function dailyGuides(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
	guild: Guild,
) {
	const { locale } = interaction;
	const channel = options.getChannel("channel");

	if (channel) {
		const cachedChannel = guild.channels.get(channel.id) ?? guild.threads.get(channel.id);

		if (!cachedChannel && isThreadChannelType(channel.type)) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("cannot-view-thread", { ns: "general", lng: locale }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (!(cachedChannel && isDailyGuidesDistributionChannel(cachedChannel))) {
			throw new Error("Received an unknown channel type whilst setting up daily guides.");
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable({
			guild,
			channel: cachedChannel,
			me: await guild.fetchMe(),
			locale,
		});

		if (dailyGuidesDistributable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: formatArrayErrors(dailyGuidesDistributable),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await setupDailyGuides({ guildId: guild.id, channelId: channel.id });
	}

	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseDailyGuides(guild, locale),
	);
}

async function notifications(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	guild: Guild,
) {
	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseNotifications(interaction, guild),
	);
}

export default {
	name: t("configure.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const guild = isGuildChatInputCommand(interaction) && GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			await client.api.interactions.reply(
				interaction.id,
				interaction.token,
				notInCachedGuildResponse(interaction.locale),
			);

			return;
		}

		const options = new OptionResolver(interaction);

		switch (options.getSubcommand(true)) {
			case t("configure.daily-guides.command-name", { ns: "commands" }): {
				await dailyGuides(interaction, options, guild);
				return;
			}
			case t("configure.me.command-name", { ns: "commands" }): {
				await meOverview(interaction);
				return;
			}
			case t("configure.notifications.command-name", { ns: "commands" }): {
				await notifications(interaction, guild);
				return;
			}
			case t("configure.welcome.command-name", { ns: "commands" }): {
				await welcomeSetup({ interaction, guild, locale: guild.preferredLocale, reply: true });
				return;
			}
		}
	},
} as const;
