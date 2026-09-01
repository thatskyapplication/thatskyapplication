import { Outlet } from "react-router";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import {
	APPLICATION_DESCRIPTION,
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	WEBSITE_NAME,
} from "~/utility/constants";
import type { Route } from "./+types/caelus.js";

export const meta: Route.MetaFunction = ({ location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: APPLICATION_NAME },
		{ name: "description", content: APPLICATION_DESCRIPTION },
		{ name: "theme-color", content: "#a5b5f1" },
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

export default function CaelusLayout() {
	return <Outlet />;
}
