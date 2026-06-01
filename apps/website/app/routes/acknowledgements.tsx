import { CDN, type SkyProfilePacket, Table, WEBSITE_URL } from "@thatskyapplication/utility";
import { ExternalLinkIcon } from "lucide-react";
import { data, Link, type MetaFunction, useLoaderData } from "react-router";
import { AcknowledgementSocialLinks } from "~/components/AcknowledgementSocialLinks";
import { SitePage } from "~/components/PageLayout";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import pg from "~/pg.server";
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

const ACKNOWLEDGEMENTS_TITLE = "Acknowledgements" as const;
const ACKNOWLEDGEMENTS_DESCRIPTION = "The Sky kids that make everything you see possible." as const;

export const meta: MetaFunction<typeof loader> = ({ location, matches }) => {
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
	const { rows } = await pg.raw<{ rows: readonly SkyProfilePacket[] }>(
		`
			select ${Table.Profiles}.*
			from (
				select distinct unnest(${Table.FriendshipActions}.users) as user_id
				from ${Table.FriendshipActions}
			) unique_users
			join ${Table.Profiles} on ${Table.Profiles}.user_id = unique_users.user_id
			where profiles.name is not null
			order by profiles.name asc, profiles.user_id asc
		`,
	);

	return data(rows, {
		headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
	});
};

export default function Acknowledgements() {
	const cdnURL = useCDNURL();
	const cdn = new CDN(cdnURL);
	const skyProfilePackets = useLoaderData<typeof loader>();

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
								<ExternalLinkIcon className="ml-1 w-4 h-4" />
							</a>{" "}
							for everyone to enjoy.
						</p>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
							{skyProfilePackets.map((profile) => (
								<Link
									className="group flex items-center gap-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
									key={profile.user_id}
									to={`/sky-profiles/${profile.user_id}`}
								>
									{profile.icon ? (
										<div
											aria-label={`Icon of ${profile.name}.`}
											className="w-8 h-8 rounded-full bg-cover bg-center shrink-0"
											role="img"
											style={{
												backgroundImage: `url(${cdn.skyProfileIconURL(profile.user_id, profile.icon)})`,
											}}
										/>
									) : (
										<div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium shrink-0">
											{profile.name?.charAt(0).toUpperCase() ?? "?"}
										</div>
									)}
									<span className="text-sm font-medium truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
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
