import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { FriendshipActionType } from "@thatskyapplication/utility";
import { t } from "i18next";
import { friendshipAction } from "../../features/friendship-actions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("hug.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		await friendshipAction({
			interaction,
			user: options.requireUser("user"),
			member: options.getMember("user"),
			type: FriendshipActionType.Hug,
		});
	},
} as const;
