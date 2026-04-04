import {
	type CataloguePacket,
	CountryToEmoji,
	CROWDIN_URL,
	isCountry,
	isPlatformId,
	isSeasonId,
	isSkyProfilePersonalityType,
	isSpiritId,
	MAXIMUM_WINGED_LIGHT,
	type SkyProfileData,
	SkyProfilePersonalityToMBTI,
	SkyProfileWingedLightType,
	type Snowflake,
	skyProfileIconURL,
	Table,
	WEBSITE_URL,
	WING_BUFFS,
	WINGED_LIGHT_IN_AREAS,
} from "@thatskyapplication/utility";
import { ChevronLeftIcon, Edit, Globe, LinkIcon, MapPinIcon, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs } from "react-router";
import {
	isRouteErrorResponse,
	Link,
	type MetaFunction,
	useLoaderData,
	useLocation,
	useRouteError,
} from "react-router";
import { CentredSitePage, SitePage } from "~/components/PageLayout";
import SkyProfileHeaderCard from "~/components/SkyProfileHeaderCard";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import pg from "~/pg.server";
import { getSession } from "~/session.server";
import {
	cdnAssetURL,
	discordEmojiURL,
	getCDNURLFromMatches,
	skyProfileBannerURL,
} from "~/utility/cdn-url.js";
import { APPLICATION_NAME } from "~/utility/constants.js";
import { SeasonIdToSeasonalEmoji, SkyProfilePersonalityToEmoji } from "~/utility/emojis.js";
import { PlatformToIcon } from "~/utility/platform-icons.js";

const BADGES_CLASS_NAME =
	"inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-700 rounded-full text-sm font-medium text-purple-800 dark:text-purple-200 shadow-xs" as const;

export function ErrorBoundary() {
	const error = useRouteError();
	const cdnURL = useCDNURL();

	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<CentredSitePage>
				<div className="text-center max-w-lg">
					<div className="mb-8">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full mb-6 border-4 border-gray-300 dark:border-gray-600">
							<Users className="w-12 h-12 text-gray-400 dark:text-gray-500" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
							Unknown Sky Kid
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
							This Sky kid seems to have flown away... and hit a wall.
						</p>
					</div>
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Link
								className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
								to="/sky-profiles"
							>
								<ChevronLeftIcon className="w-5 h-5" />
								Sky Profiles
							</Link>
							<Link
								className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors"
								to="/sky-profiles/random"
							>
								<div
									aria-label="Question mark icon"
									className="w-5 h-5 bg-cover bg-center"
									role="img"
									style={{
										backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/question_mark.webp")})`,
									}}
								/>
								Random Sky Profile
							</Link>
						</div>
					</div>
				</div>
			</CentredSitePage>
		);
	}

	throw error;
}

export const meta: MetaFunction<typeof loader> = ({ data, location, matches }) => {
	const { data: skyProfileData } = data ?? {};
	const url = String(new URL(location.pathname, WEBSITE_URL));
	const cdnURL = getCDNURLFromMatches(matches);

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky Profiles, Sky Profile`,
		},
		{ title: skyProfileData?.name ?? "Sky Profile" },
		{
			name: "description",
			content: skyProfileData?.description ?? "A Sky profile.",
		},
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: skyProfileData?.name ?? "Sky Profile" },
		{
			property: "og:description",
			content: skyProfileData?.description ?? "A Sky profile.",
		},
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{
			property: "og:image",
			content: skyProfileData?.icon
				? skyProfileIconURL(cdnURL, skyProfileData.user_id, skyProfileData.icon)
				: skyProfileData?.banner
					? skyProfileBannerURL(cdnURL, skyProfileData.user_id, skyProfileData.banner)
					: null,
		},
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: skyProfileData?.name ?? "Sky Profile" },
		{
			name: "twitter:description",
			content: skyProfileData?.description ?? "A Sky profile.",
		},
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const { userId } = params;

	if (!userId) {
		throw new Response(null, { status: 400 });
	}

	const session = await getSession(request.headers.get("Cookie"));
	const discordUser = session.get("discord_user") ?? null;

	const data = await pg
		.select<SkyProfileData>("p.*", "u.translator", "u.supporter", "u.artist")
		.from(`${Table.Profiles} as p`)
		.leftJoin(`${Table.Users} as u`, "p.user_id", "u.discord_user_id")
		.where("p.user_id", userId as Snowflake)
		.first();

	if (!data) {
		throw new Response(null, { status: 404 });
	}

	let maximumWingedLight = null;

	if (data.winged_light !== null) {
		if (data.winged_light === SkyProfileWingedLightType.Capeless) {
			maximumWingedLight = "Capeless";
		} else {
			const catalogue = await pg<CataloguePacket>(Table.Catalogue)
				.where({ user_id: data.user_id })
				.first();

			if (catalogue) {
				const data = new Set(catalogue.data);
				let count = WINGED_LIGHT_IN_AREAS;

				for (const wingBuff of WING_BUFFS) {
					if (data.has(wingBuff)) {
						count++;
					}
				}

				maximumWingedLight = count === MAXIMUM_WINGED_LIGHT ? `${count} (Max)` : count.toString();
			}
		}
	}

	return { data, isOwner: discordUser?.id === data.user_id, maximumWingedLight };
};

function RecognitionBadges({ data }: { data: SkyProfileData }) {
	const badges = [];

	if (data.translator) {
		badges.push({
			label: "Translator",
			icon: <Globe className="w-4 h-4" />,
			description: "This Sky kid helps translate what you see! You can help out on Crowdin!",
			href: CROWDIN_URL,
		});
	}

	if (data.artist) {
		badges.push({
			label: "Artist",
			icon: "🎨",
			description: "This Sky kid contributes artwork! They have amazing styles!",
		});
	}

	if (data.supporter) {
		badges.push({
			label: "Supporter",
			icon: "🩵",
			description: "This Sky kid is supporting development! How nice of them!",
		});
	}

	return badges.length > 0 ? (
		<div className="mb-4 flex flex-wrap gap-2">
			{badges.map((badge) => {
				const content = (
					<>
						<div aria-label={badge.label} className="text-base" role="img">
							{badge.icon}
						</div>
						<span>{badge.label}</span>
					</>
				);

				return badge.href ? (
					<a
						className={`${BADGES_CLASS_NAME} hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-800/40 dark:hover:to-blue-800/40 transition-colors cursor-pointer`}
						href={badge.href}
						key={badge.label}
						rel="noopener noreferrer"
						target="_blank"
						title={badge.description}
					>
						{content}
					</a>
				) : (
					<div className={BADGES_CLASS_NAME} key={badge.label} title={badge.description}>
						{content}
					</div>
				);
			})}
		</div>
	) : null;
}

export default function SkyProfile() {
	const { data, isOwner, maximumWingedLight } = useLoaderData<typeof loader>();
	const cdnURL = useCDNURL();
	const location = useLocation();
	const [copied, setCopied] = useState(false);
	const { t } = useTranslation();

	const backURL =
		typeof location.state === "object" &&
		location.state !== null &&
		"returnTo" in location.state &&
		typeof location.state.returnTo === "string"
			? location.state.returnTo
			: "/sky-profiles";

	return (
		<SitePage>
			<div className="w-full max-w-3xl mx-auto">
				<div className="mb-4">
					<SkyProfileHeaderCard
						bannerURL={data.banner ? skyProfileBannerURL(cdnURL, data.user_id, data.banner) : null}
						iconURL={data.icon ? skyProfileIconURL(cdnURL, data.user_id, data.icon) : null}
						name={data.name}
					>
						<div className="flex-1 min-w-0">
							{data.name ? (
								<h1 className="mb-2">{data.name}</h1>
							) : (
								<h1 className="mb-2 italic">No name</h1>
							)}
							<RecognitionBadges data={data} />
						</div>
						{data.seasons && data.seasons.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{data.seasons
									.sort((a, b) => a - b)
									.filter((season) => isSeasonId(season))
									.map((season) => {
										const seasonEmoji = SeasonIdToSeasonalEmoji[season];

										return seasonEmoji ? (
											<div
												aria-label={`${t(`seasons.${season}`, { ns: "general" })} icon.`}
												className="w-10 h-10 bg-cover bg-center"
												key={season}
												role="img"
												style={{
													backgroundImage: `url(${discordEmojiURL(seasonEmoji.id)})`,
												}}
											/>
										) : null;
									})}
							</div>
						)}
						{data.platform && data.platform.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-2">
								{data.platform
									.filter((platform) => isPlatformId(platform))
									.sort((a, b) => a - b)
									.map((platform) => (
										<div
											className="bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow-sm items-center justify-center"
											key={platform}
										>
											{PlatformToIcon[platform]}
										</div>
									))}
							</div>
						)}
						<h2 className="font-semibold mb-2">
							About Me {data.country && isCountry(data.country) && CountryToEmoji[data.country]}
						</h2>
						<div className="mt-4">
							{data.description ? (
								<p className="whitespace-pre-wrap">{data.description}</p>
							) : (
								<p className="italic">No description.</p>
							)}
						</div>
					</SkyProfileHeaderCard>
				</div>
				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
					{maximumWingedLight && (
						<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 last:odd:md:col-span-2">
							<div
								aria-label="Winged light icon."
								className="w-6 h-6 mr-2 bg-cover bg-center"
								role="img"
								style={{
									backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/winged_light.webp")})`,
								}}
							/>
							<div className="flex-1">
								<p className="my-0 text-xs text-gray-500 dark:text-gray-400">
									Maximum Winged Light
								</p>
								<p className="my-0">{maximumWingedLight}</p>
							</div>
						</div>
					)}
					{data.spirit !== null && isSpiritId(data.spirit) ? (
						<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 last:odd:md:col-span-2">
							<div
								aria-label="Favourite spirit icon."
								className="w-6 h-6 mr-2 bg-cover bg-center"
								role="img"
								style={{
									backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/heart.webp")})`,
								}}
							/>
							<div className="flex-1">
								<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Favourite Spirit</p>
								<p className="my-0">{t(`spirits.${data.spirit}`, { ns: "general" })}</p>
							</div>
						</div>
					) : null}
					{data.personality !== null && isSkyProfilePersonalityType(data.personality) ? (
						<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 last:odd:md:col-span-2">
							<div
								aria-label="Personality icon."
								className="w-6 h-6 mr-2 bg-cover bg-center"
								role="img"
								style={{
									backgroundImage: `url(${discordEmojiURL(SkyProfilePersonalityToEmoji[data.personality].id)})`,
								}}
							/>
							<div className="flex-1">
								<p className="my-0 text-xs text-gray-500 dark:text-gray-400">
									{t("sky-profile.personality", { ns: "features" })}
								</p>
								<p className="my-0">
									{t("sky-profile.personality-with-mbti", {
										ns: "features",
										personality: data.personality,
										mbti: SkyProfilePersonalityToMBTI[data.personality],
									})}
								</p>
							</div>
						</div>
					) : null}
					{data.hangout && (
						<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 last:odd:md:col-span-2">
							<MapPinIcon className="w-6 h-6 mr-2" />
							<div className="flex-1">
								<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Favourite Hangout</p>
								<p className="my-0">{data.hangout}</p>
							</div>
						</div>
					)}
				</div>
				<div className="flex items-center justify-start mt-6 space-x-2">
					<Link
						className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded-sm px-4 py-2"
						to={backURL}
					>
						<ChevronLeftIcon className="w-6 h-6 mr-2" />
						<span>Back</span>
					</Link>
					<Link
						className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded-sm px-4 py-2"
						to="/sky-profiles/random"
					>
						<div
							aria-label="Question mark icon."
							className="w-6 h-6 mr-2 bg-cover bg-center"
							role="img"
							style={{
								backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/question_mark.webp")})`,
							}}
						/>
						<span>{t("sky-profile.random", { ns: "features" })}</span>
					</Link>
					{isOwner ? (
						<Link
							className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded-sm px-4 py-2"
							to="/me/sky-profile"
						>
							<Edit className="w-6 h-6 mr-2" />
							<span>Edit</span>
						</Link>
					) : null}
					<button
						className={`${copied ? "bg-green-500 hover:bg-green-600 border-green-600" : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-600"} shadow-md hover:shadow-lg flex items-center px-4 py-2 border rounded-sm transition-colors duration-300 overflow-auto`}
						onClick={async () => {
							await navigator.clipboard.writeText(
								`${window.location.origin}${window.location.pathname}`,
							);

							setCopied(true);
							setTimeout(() => setCopied(false), 2000);
						}}
						type="button"
					>
						<LinkIcon className="w-6 h-6 mr-2" />
						{copied ? "Link copied!" : "Share"}
					</button>
				</div>
			</div>
		</SitePage>
	);
}
