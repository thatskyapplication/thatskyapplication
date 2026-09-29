import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { t } from "i18next";
import { FriendshipActionType, type FriendshipActionTypes } from "@thatskyapplication/utility";
import { friendshipAction } from "../../features/friendship-actions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("friendship-action.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		let type: FriendshipActionTypes;

		switch (options.requireSubcommand()) {
			case "hair-tousle": {
				type = FriendshipActionType.HairTousle;
				break;
			}
			case "high-five": {
				type = FriendshipActionType.HighFive;
				break;
			}
			case "hug": {
				type = FriendshipActionType.Hug;
				break;
			}
			case "krill": {
				type = FriendshipActionType.Krill;
				break;
			}
			case "play-fight": {
				type = FriendshipActionType.PlayFight;
				break;
			}
			default: {
				throw new Error("Received an unknown friendship action subcommand.");
			}
		}

		await friendshipAction({
			interaction,
			user: options.requireUser("user"),
			member: options.getMember("user"),
			type,
		});
	},
} as const;
