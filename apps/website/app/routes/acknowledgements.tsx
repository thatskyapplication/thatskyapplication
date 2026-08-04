import { ExternalLinkIcon } from "lucide-react";
import { data, type HeadersArgs, Link } from "react-router";
import { CDN, type Packet, WEBSITE_URL } from "@thatskyapplication/utility";
import { AcknowledgementSocialLinks } from "~/components/AcknowledgementSocialLinks";
import { SitePage } from "~/components/PageLayout";
import database from "~/database.server";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import {
	APPLICATION_NAME,
	SKY_COTL_INFOGRAPHICS_DATABASE_INSTAGRAM_URL,
	SKY_COTL_INFOGRAPHICS_DATABASE_URL,
	SKY_COTL_INFOGRAPHICS_DATABASE_X_URL,
	WIKI_BLUESKY_URL,
	WIKI_DISCORD_URL,
	WIKI_URL,
} from "~/utility/constants";
import type { Route } from "./+types/acknowledgements.js";

const ACKNOWLEDGEMENTS_TITLE = "Acknowledgements" as const;
const ACKNOWLEDGEMENTS_DESCRIPTION = "The Sky kids that make everything you see possible." as const;

type AcknowledgementProfile = Packet<"sky_profiles"> & { name: string };

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord bot, Discord application, Acknowledgements, Contributors, Credits`,
		},
		{ title: ACKNOWLEDGEMENTS_TITLE },
		{ name: "description", content: ACKNOWLEDGEMENTS_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: ACKNOWLEDGEMENTS_TITLE },
		{ property: "og:description", content: ACKNOWLEDGEMENTS_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: ACKNOWLEDGEMENTS_TITLE },
		{ name: "twitter:description", content: ACKNOWLEDGEMENTS_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async () => {
	const rows = await database
		.selectFrom("sky_profiles")
		.innerJoin(
			(eb) =>
				eb
					.selectFrom("friendship_actions")
					.select(({ fn }) => fn<string>("unnest", ["friendship_actions.users"]).as("user_id"))
					.distinct()
					.as("unique_users"),
			(join) => join.onRef("unique_users.user_id", "=", "sky_profiles.user_id"),
		)
		.selectAll("sky_profiles")
		.where("sky_profiles.name", "is not", null)
		.$narrowType<AcknowledgementProfile>()
		.orderBy("sky_profiles.name", "asc")
		.orderBy("sky_profiles.user_id", "asc")
		.execute();

	return data(rows, {
		headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
	});
};

export function headers({ loaderHeaders }: HeadersArgs) {
	return loaderHeaders;
}

export default function Acknowledgements({ loaderData }: Route.ComponentProps) {
	const cdnURL = useCDNURL();
	const cdn = new CDN(cdnURL);
	const skyProfilePackets = loaderData;

	return (
		<SitePage>
			<div className="container mx-auto max-w-4xl">
				<h1>Acknowledgements</h1>
				<p className="text-gray-500 dark:text-gray-400">
					The people and resources that make {APPLICATION_NAME} possible.
				</p>
				<hr />

				{skyProfilePackets.length > 0 && (
					<section>
						<h2>Friendship actions contributors</h2>
						<p className="text-gray-600 dark:text-gray-400">
							These people have contributed to{" "}
							<a
								className="regular-link inline-flex items-center"
								href="https://guide.thatskyapplication.com/caelus/friendship-actions"
								rel="noopener noreferrer"
								target="_blank"
							>
								friendship actions
								<ExternalLinkIcon className="ml-1 h-4 w-4" />
							</a>{" "}
							for everyone to enjoy.
						</p>
						<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
							{skyProfilePackets.map((profile) => (
								<Link
									aria-label={profile.name}
									className="group flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
									key={profile.user_id}
									to={`/sky-profiles/${profile.user_id}`}
								>
									{profile.icon ? (
										<div
											aria-hidden="true"
											className="h-8 w-8 shrink-0 rounded-full bg-cover bg-center"
											style={{
												backgroundImage: `url(${cdn.skyProfileIconURL(profile.user_id, profile.icon)})`,
											}}
										/>
									) : (
										<div
											aria-hidden="true"
											className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
										>
											{profile.name.charAt(0).toUpperCase()}
										</div>
									)}
									<span className="truncate text-sm font-medium transition-colors group-hover:text-pink-600 dark:group-hover:text-pink-400">
										{profile.name}
									</span>
								</Link>
							))}
						</div>
					</section>
				)}

				<section>
					<h2>Sky:CoTL Infographics Database</h2>
					<AcknowledgementSocialLinks
						links={[
							{
								href: SKY_COTL_INFOGRAPHICS_DATABASE_URL,
								label: "Sky:CoTL Infographics Database",
								platform: "discord",
							},
							{
								href: SKY_COTL_INFOGRAPHICS_DATABASE_X_URL,
								label: "@ourskyjourney",
								platform: "x",
							},
							{
								href: SKY_COTL_INFOGRAPHICS_DATABASE_INSTAGRAM_URL,
								label: "@ourskyjourney",
								platform: "instagram",
							},
						]}
					/>
					<p className="text-gray-600 dark:text-gray-400">
						Founded by Clement and io, various infographics used across {APPLICATION_NAME} are
						sourced from Sky:CoTL Infographics Database. We're thankful for them!
					</p>
				</section>
				<section>
					<h2>Wiki</h2>
					<AcknowledgementSocialLinks
						links={[
							{
								href: WIKI_URL,
								label: "Wiki",
								platform: "website",
							},
							{
								href: WIKI_DISCORD_URL,
								label: "Sky Wiki Contributors",
								platform: "discord",
							},
							{
								href: WIKI_BLUESKY_URL,
								label: "@skywiki.bsky.social",
								platform: "bluesky",
							},
						]}
					/>
					<p className="text-gray-600 dark:text-gray-400">
						{APPLICATION_NAME} features over 1,000 assets sourced directly from the
						community-maintained Sky: Children of the Light wiki. You too can also help contribute
						to the wiki!
					</p>
				</section>
			</div>
		</SitePage>
	);
}
