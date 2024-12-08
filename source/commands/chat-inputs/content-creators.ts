import { type APIChatInputApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { client } from "../../discord.js";
import type { ContentCreatorsEditOptions } from "../../models/ContentCreators.js";
import { contentCreatorsEdit, contentCreatorsSetAvatar } from "../../services/content-creators.js";
import { SKY_CREATOR_TROUPE_USER_IDS } from "../../utility/constants.js";
import { isGuildChatInputCommand, validateAttachment } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "content-creators",
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (!isGuildChatInputCommand(interaction)) {
			return;
		}

		if (!SKY_CREATOR_TROUPE_USER_IDS.has(interaction.member.user.id)) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				flags: MessageFlags.Ephemeral,
				content: "Unknown Sky Creator Troupe member.",
			});

			return;
		}

		const options = new OptionResolver(interaction);
		const defer = options.hoistedOptions.length > 0;

		if (defer) {
			await client.api.interactions.defer(interaction.id, interaction.token, {
				flags: MessageFlags.Ephemeral,
			});
		}

		const name = options.getString("name");
		const avatar = options.getAttachment("avatar");
		const description = options.getString("description");
		const youtube = options.getString("youtube");
		const twitch = options.getString("twitch");
		const tiktok = options.getString("tiktok");
		const x = options.getString("x");
		const instagram = options.getString("instagram");
		const facebook = options.getString("facebook");
		const bluesky = options.getString("bluesky");
		const data: ContentCreatorsEditOptions = {};

		if (name) {
			data.name = name;
		}

		if (avatar) {
			if (!(await validateAttachment(interaction, avatar))) {
				return;
			}

			data.avatar = await contentCreatorsSetAvatar(interaction, avatar);
		}

		if (description) {
			data.description = description;
		}

		if (youtube) {
			data.youtube = youtube;
		}

		if (twitch) {
			data.twitch = twitch;
		}

		if (tiktok) {
			data.tiktok = tiktok;
		}

		if (x) {
			data.x = x;
		}

		if (instagram) {
			data.instagram = instagram;
		}

		if (facebook) {
			data.facebook = facebook;
		}

		if (bluesky) {
			data.bluesky = bluesky;
		}

		await contentCreatorsEdit(interaction, data, defer);
	},
} as const;
