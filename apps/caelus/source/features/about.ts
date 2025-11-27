import {
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type Locale,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { CROWDIN_URL, WEBSITE_URL } from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import {
	APPLICATION_INVITE_URL,
	SUPPORT_SERVER_INVITE_URL,
	SUPPORTER_SKU_ID,
} from "../utility/configuration.js";
import { GITHUB_SPONSORS_URL, THATSKYGAME_URL } from "../utility/constants.js";
import { avatarURL } from "../utility/functions.js";

export async function about(locale: Locale): Promise<[APIMessageTopLevelComponent]> {
	const currentUser = await client.api.users.getCurrent();

	return [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Thumbnail,
						media: { url: avatarURL(currentUser) },
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `## [${currentUser.username}](${WEBSITE_URL})`,
						},
						{
							type: ComponentType.TextDisplay,
							content: t("about.magical-companion", {
								lng: locale,
								ns: "features",
								url: THATSKYGAME_URL,
							}),
						},
						{
							type: ComponentType.TextDisplay,
							content: t("about.links", {
								lng: locale,
								ns: "features",
								applicationInviteURL: APPLICATION_INVITE_URL,
								supportServerInviteURL: SUPPORT_SERVER_INVITE_URL,
								websiteURL: WEBSITE_URL,
							}),
						},
					],
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: t("about.description", {
						lng: locale,
						ns: "features",
						crowdinURL: CROWDIN_URL,
						supportServerInviteURL: SUPPORT_SERVER_INVITE_URL,
						githubSponsorsURL: GITHUB_SPONSORS_URL,
					}),
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Premium,
							sku_id: SUPPORTER_SKU_ID,
						},
					],
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: t("about.final-message", {
						lng: locale,
						ns: "features",
						url: SUPPORT_SERVER_INVITE_URL,
					}),
				},
			],
		},
	];
}
