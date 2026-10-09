import { type APIContainerComponent, ComponentType } from "@discordjs/core/http-only";
import { Outlet } from "react-router";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { caelusLinks } from "~/utility/caelus";
import {
	APPLICATION_COLOUR,
	APPLICATION_DESCRIPTION,
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	INVITE_APPLICATION_URL,
	WEBSITE_NAME,
} from "~/utility/constants";
import { linkButtonRows } from "~/utility/discord-component-embed.server.js";
import type { Route } from "./+types/caelus.js";

export const meta: Route.MetaFunction = ({ location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: APPLICATION_NAME },
		{ name: "description", content: APPLICATION_DESCRIPTION },
		{ name: "theme-color", content: `#${APPLICATION_COLOUR.toString(16)}` },
		{ property: "og:title", content: APPLICATION_NAME },
		{ property: "og:description", content: APPLICATION_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: WEBSITE_NAME },
		{ property: "og:image", content: APPLICATION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: APPLICATION_NAME },
		{ name: "twitter:description", content: APPLICATION_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

export const loader = ({ context, url }: Route.LoaderArgs) => {
	const discordComponentEmbed: APIContainerComponent = {
		type: ComponentType.Container,
		accent_color: APPLICATION_COLOUR,
		components: [
			{
				type: ComponentType.Section,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## [${APPLICATION_NAME}](${new URL(url.pathname, WEBSITE_URL).href})`,
					},
					{ type: ComponentType.TextDisplay, content: APPLICATION_DESCRIPTION },
				],
				accessory: { type: ComponentType.Thumbnail, media: { url: APPLICATION_ICON_URL } },
			},
			{ type: ComponentType.Separator },
			...linkButtonRows([
				{ label: "Add to server", to: INVITE_APPLICATION_URL },
				...caelusLinks(getInstance(context).getFixedT(getLocale(context))),
			]),
		],
	};

	return { discordComponentEmbed };
};

export default function CaelusLayout() {
	return <Outlet />;
}
