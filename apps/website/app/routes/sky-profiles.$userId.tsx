import {
	type CataloguePacket,
	CountryToEmoji,
	CROWDIN_URL,
	isCountry,
	isPlatformId,
	isSpiritId,
	MAXIMUM_WINGED_LIGHT,
	type SkyProfileData,
	SkyProfileWingedLightType,
	type Snowflake,
	Table,
	WEBSITE_URL,
	WING_BUFFS,
	WINGED_LIGHT_IN_AREAS,
} from "@thatskyapplication/utility";
import { ChevronLeftIcon, Globe, LinkIcon, MapPinIcon, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs } from "react-router";
import {
	isRouteErrorResponse,
	Link,
	type MetaFunction,
	useLoaderData,
	useRouteError,
	useSearchParams,
} from "react-router";
import pg from "~/pg.server";
import { APPLICATION_NAME } from "~/utility/constants.js";
import { PlatformToIcon } from "~/utility/platform-icons.js";

const BADGES_CLASS_NAME =
	"inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-700 rounded-full text-sm font-medium text-purple-800 dark:text-purple-200 shadow-xs" as const;

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<div className="min-h-[calc(100vh-9rem)] flex items-center justify-center px-4 py-16">
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
										backgroundImage:
											"url(https://cdn.thatskyapplication.com/assets/question_mark.webp)",
									}}
								/>
								Random Sky Profile
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	throw error;
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
	const { data: skyProfileData } = data ?? {};
	const url = String(new URL(location.pathname, WEBSITE_URL));

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
				? `https://cdn.thatskyapplication.com/sky_profiles/icons/${skyProfileData.user_id}/${skyProfileData.icon.startsWith("a_") ? `${skyProfileData.icon}.gif` : `${skyProfileData.icon}.webp`}`
				: skyProfileData?.banner
					? `https://cdn.thatskyapplication.com/sky_profiles/banners/${skyProfileData.user_id}/${skyProfileData.banner.startsWith("a_") ? `${skyProfileData.banner}.gif` : `${skyProfileData.banner}.webp`}`
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { userId } = params;

	if (!userId) {
		throw new Response(null, { status: 400 });
	}

	const data = await pg
		.select<SkyProfileData>(["p.*", "u.crowdin_user_id", "u.supporter", "u.artist"])
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

	return { data, maximumWingedLight };
};

function RecognitionBadges({ data }: { data: SkyProfileData }) {
	const badges = [];

	if (data.crowdin_user_id) {
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
						<span aria-label={badge.label} className="text-base" role="img">
							{badge.icon}
						</span>
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
	const { data, maximumWingedLight } = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
	const [copied, setCopied] = useState(false);
	const { t } = useTranslation();

	// Preserve relevant search parameters for the main page.
	const returnParams = new URLSearchParams();
	const name = searchParams.get("name");
	const country = searchParams.get("country");
	const page = searchParams.get("page");

	if (name) {
		returnParams.set("name", name);
	}

	if (country) {
		returnParams.set("country", country);
	}

	if (page) {
		returnParams.set("page", page);
	}

	const backURL = returnParams.toString()
		? `/sky-profiles?${returnParams.toString()}`
		: "/sky-profiles";

	return (
		<div className="mx-auto px-4 max-w-3xl mb-4">
			<div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
				<div className="relative h-60 w-full">
					<div className="w-full h-full rounded-md overflow-hidden">
						{data.banner ? (
							<div
								aria-label={`Banner of ${data.name}.`}
								className="w-full h-full bg-cover bg-center"
								role="img"
								style={{
									backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/banners/${data.user_id}/${data.banner.startsWith("a_") ? `${data.banner}.gif` : `${data.banner}.webp`})`,
								}}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
						)}
					</div>
					{data.icon && (
						<div
							aria-label={`Icon of ${data.name}.`}
							className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-8 left-4 bg-cover bg-center"
							role="img"
							style={{
								backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${data.user_id}/${data.icon.startsWith("a_") ? `${data.icon}.gif` : `${data.icon}.webp`})`,
							}}
						/>
					)}
				</div>
				<div className="px-4 pt-10 pb-2">
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
								.map((season) => (
									<div
										aria-label={`Season ${season} icon.`}
										className="w-10 h-10 bg-cover bg-center"
										key={season}
										role="img"
										style={{
											backgroundImage: `url(https://cdn.thatskyapplication.com/assets/season_${season + 1}.webp)`,
										}}
									/>
								))}
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
				</div>
			</div>
			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				{maximumWingedLight && (
					<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2">
						<div
							aria-label="Winged light icon."
							className="w-6 h-6 mr-2 bg-cover bg-center"
							role="img"
							style={{
								backgroundImage: "url(https://cdn.thatskyapplication.com/assets/winged_light.webp)",
							}}
						/>
						<div className="flex-1">
							<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Maximum Winged Light</p>
							<p className="my-0">{maximumWingedLight}</p>
						</div>
					</div>
				)}
				{data.spirit !== null && isSpiritId(data.spirit) ? (
					<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2">
						<div
							aria-label="Favourite spirit icon."
							className="w-6 h-6 mr-2 bg-cover bg-center"
							role="img"
							style={{
								backgroundImage: "url(https://cdn.thatskyapplication.com/assets/heart.webp)",
							}}
						/>
						<div className="flex-1">
							<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Favourite Spirit</p>
							<p className="my-0">{t(`spirits.${data.spirit}`, { ns: "general" })}</p>
						</div>
					</div>
				) : null}
				{data.hangout && (
					<div
						className={`group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 ${(data.winged_light === null && data.spirit === null) || (data.winged_light !== null && data.spirit) ? "md:col-span-2" : ""}`}
					>
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
							backgroundImage: "url(https://cdn.thatskyapplication.com/assets/question_mark.webp)",
						}}
					/>
					<span>{t("sky-profile.random", { ns: "features" })}</span>
				</Link>
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
	);
}
