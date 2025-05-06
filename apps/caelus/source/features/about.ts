import {
	type APIMessageTopLevelComponent,
	ComponentType,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { SkyMap, WEBSITE_URL } from "@thatskyapplication/utility";
import { client } from "../discord.js";
import {
	APPLICATION_INVITE_URL,
	DEFAULT_EMBED_COLOUR,
	GITHUB_SPONSORS_URL,
	KO_FI_URL,
	PATREON_URL,
	SUPPORT_SERVER_INVITE_URL,
	THATSKYGAME_URL,
} from "../utility/constants.js";
import { avatarURL } from "../utility/functions.js";

export async function about(): Promise<[APIMessageTopLevelComponent]> {
	const currentUser = await client.api.users.getCurrent();

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## [${currentUser.username}](${WEBSITE_URL})`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Thumbnail,
						media: { url: avatarURL(currentUser) },
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `Welcome to the lovely Discord application for [Sky: Children of the Light](${THATSKYGAME_URL} "thatskygame")!\n\nSo you'd like to know about me, huh? Well, I like long walks across the ${SkyMap.SanctuaryIslands}. Oh, and don't forget about gliding all over the ${SkyMap.StarlightDesert}. Also... JELLYFISH!\n\nCheck out these useful links:`,
						},
						{
							type: ComponentType.TextDisplay,
							content: `- [Invite](${APPLICATION_INVITE_URL})\n- [Support](${SUPPORT_SERVER_INVITE_URL})\n- [Website](${WEBSITE_URL})`,
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
					content: `Want to give support? There are ways you can do that! Thank you in advance!\n- [Patreon](${PATREON_URL})\n- [Ko-fi](${KO_FI_URL})\n- [GitHub](${GITHUB_SPONSORS_URL})`,
				},
			],
		},
	];
}
