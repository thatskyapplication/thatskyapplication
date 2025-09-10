import { Buffer } from "node:buffer";
import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
	type RESTPatchAPICurrentGuildMemberJSONBody,
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
import { meOverview, meUpsell } from "../../features/me.js";
import { setupResponse as setupResponseNotifications } from "../../features/notifications.js";
import { welcomeSetAsset, welcomeSetup } from "../../features/welcome.js";
import AI from "../../models/AI.js";
import type { Guild } from "../../models/discord/guild.js";
import { SERVER_UPGRADE_SKU_ID } from "../../utility/configuration.js";
import {
	isGuildChatInputCommand,
	notInCachedGuildResponse,
	validateAttachment,
} from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

async function dailyGuides(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
	guild: Guild,
) {
	const channel = options.getChannel("channel");

	if (channel) {
		const cachedChannel = guild.channels.get(channel.id);

		if (!(cachedChannel && isDailyGuidesDistributionChannel(cachedChannel))) {
			throw new Error("Received an unknown channel type whilst setting up daily guides.");
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable(
			guild,
			cachedChannel,
			await guild.fetchMe(),
			true,
		);

		if (dailyGuidesDistributable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: dailyGuidesDistributable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await setupDailyGuides({ guildId: guild.id, channelId: channel.id });
	}

	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseDailyGuides(guild),
	);
}

async function me(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
	guild: Guild,
) {
	if (
		!interaction.entitlements.some((entitlement) => entitlement.sku_id === SERVER_UPGRADE_SKU_ID)
	) {
		await meUpsell(interaction);
		return;
	}

	const avatar = options.getAttachment("avatar");
	const banner = options.getAttachment("banner");

	if (options.hoistedOptions.length > 0) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});

		const payload: RESTPatchAPICurrentGuildMemberJSONBody = {};

		if (avatar) {
			const buffer = Buffer.from(await (await fetch(avatar.url)).arrayBuffer());
			payload.avatar = `data:${avatar.content_type};base64,${buffer.toString("base64")}`;
		}

		if (banner) {
			const buffer = Buffer.from(await (await fetch(banner.url)).arrayBuffer());
			payload.banner = `data:${banner.content_type};base64,${buffer.toString("base64")}`;
		}

		await client.api.users.editCurrentGuildMember(guild.id, payload);
		await meOverview(interaction, { editReply: true });
		return;
	}

	await meOverview(interaction);
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

async function welcome(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
	const options = new OptionResolver(interaction);
	const media = options.getAttachment("media");

	if (media) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: MessageFlags.Ephemeral,
		});

		if (!(await validateAttachment(interaction, media))) {
			return;
		}

		await welcomeSetAsset(interaction, media);

		await welcomeSetup({
			interaction,
			userId: interaction.member.user.id,
			locale: guild.preferredLocale,
			deferred: true,
		});

		return;
	}

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: guild.preferredLocale,
	});
}

export default {
	name: t("configure.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
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
			case t("configure.ai.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				const ai = AI.cache.get(interaction.guild_id);

				await client.api.interactions.reply(interaction.id, interaction.token, {
					components: AI.response(interaction, ai),
					flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
				});

				break;
			}
			case t("configure.daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				await dailyGuides(interaction, options, guild);
				return;
			}
			case t("configure.me.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				await me(interaction, options, guild);
				return;
			}
			case t("configure.notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				await notifications(interaction, guild);
				return;
			}
			case t("configure.welcome.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				await welcome(interaction, guild);
				return;
			}
		}
	},
} as const;
