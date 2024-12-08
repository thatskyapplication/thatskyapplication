import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import type { ContentCreatorsEditOptions } from "../../models/ContentCreators.js";
import { contentCreatorsEdit } from "../../services/content-creators.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "content-creators",
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (!isGuildChatInputCommand(interaction)) {
			return;
		}

		const options = new OptionResolver(interaction);
		const name = options.getString("name");
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

		await contentCreatorsEdit(interaction, data);
	},
} as const;
