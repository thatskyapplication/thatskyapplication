import { useTranslation } from "react-i18next";
import { data, type HeadersArgs } from "react-router";
import { CROWDIN_URL, type Packet, WEBSITE_URL } from "@thatskyapplication/utility";
import { AcknowledgementPills } from "~/components/AcknowledgementPills";
import { AcknowledgementProfileCards } from "~/components/AcknowledgementProfileCards";
import { SitePage } from "~/components/PageLayout";
import { publicProfilesQuery } from "~/features/sky-profile/sky-profile-repository.server.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	SKY_COTL_INFOGRAPHICS_DATABASE_INSTAGRAM_URL,
	SKY_COTL_INFOGRAPHICS_DATABASE_URL,
	SKY_COTL_INFOGRAPHICS_DATABASE_X_URL,
	WIKI_BLUESKY_URL,
	WIKI_DISCORD_URL,
	WIKI_URL,
} from "~/utility/constants";
import type { Route } from "./+types/acknowledgements.js";

const ACKNOWLEDGEMENTS_DESCRIPTION = "The Sky kids that make everything you see possible." as const;

type AcknowledgementProfile = Packet<"sky_profiles"> & { name: string };

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: loaderData.title },
		{ name: "description", content: ACKNOWLEDGEMENTS_DESCRIPTION },
		{ name: "theme-color", content: "#49add8" },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: ACKNOWLEDGEMENTS_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: APPLICATION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: loaderData.title },
		{ name: "twitter:description", content: ACKNOWLEDGEMENTS_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ context }: Route.LoaderArgs) => {
	const t = getInstance(context).getFixedT(getLocale(context));
	const [friendshipActionContributors, translators] = await Promise.all([
		publicProfilesQuery()
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
			.$narrowType<AcknowledgementProfile>()
			.orderBy("sky_profiles.name", "asc")
			.orderBy("sky_profiles.user_id", "asc")
			.execute(),
		publicProfilesQuery()
			.innerJoin("users", "users.discord_user_id", "sky_profiles.user_id")
			.selectAll("sky_profiles")
			.where("users.translator", "=", true)
			.$narrowType<AcknowledgementProfile>()
			.orderBy("sky_profiles.name", "asc")
			.orderBy("sky_profiles.user_id", "asc")
			.execute(),
	]);

	return data(
		{
			friendshipActionContributors,
			title: t("acknowledgements.name", { ns: "features" }),
			translators,
		},
		{
			headers: { "Cache-Control": "private, max-age=3600", Vary: "Accept-Language, Cookie" },
		},
	);
};

export function headers({ loaderHeaders }: HeadersArgs) {
	return loaderHeaders;
}

export default function Acknowledgements({ loaderData }: Route.ComponentProps) {
	const { friendshipActionContributors, translators } = loaderData;
	const { t } = useTranslation();

	return (
		<SitePage>
			<div className="container mx-auto max-w-4xl">
				<h1>Acknowledgements</h1>
				<p className="text-gray-500 dark:text-gray-400">
					The people and resources that make {APPLICATION_NAME} possible.
				</p>
				<hr />

				{translators.length > 0 && (
					<section>
						<h2>{t("acknowledgements.translators", { ns: "features" })}</h2>
						<AcknowledgementPills
							pills={[{ href: CROWDIN_URL, label: "Crowdin", platform: "crowdin" }]}
						/>
						<p className="text-gray-600 dark:text-gray-400">
							{t("acknowledgements.translators-description", { ns: "features" })}
						</p>
						<AcknowledgementProfileCards profiles={translators} />
					</section>
				)}

				{friendshipActionContributors.length > 0 && (
					<section>
						<h2>{t("acknowledgements.friendship-actions-contributors", { ns: "features" })}</h2>
						<AcknowledgementPills
							pills={[
								{
									href: "https://guide.thatskyapplication.com/caelus/friendship-actions",
									label: t("acknowledgements.friendship-actions", { ns: "features" }),
									platform: "mintlify",
								},
							]}
						/>
						<p className="text-gray-600 dark:text-gray-400">
							{t("acknowledgements.friendship-actions-contributors-description", {
								ns: "features",
							})}
						</p>
						<AcknowledgementProfileCards profiles={friendshipActionContributors} />
					</section>
				)}

				<section>
					<h2>Sky:CoTL Infographics Database</h2>
					<AcknowledgementPills
						pills={[
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
					<AcknowledgementPills
						pills={[
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
