import { clsx } from "clsx";
import { sql } from "kysely";
import { Search } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	Form,
	Link,
	useLocation,
	useNavigation,
	useRouteLoaderData,
	useSubmit,
} from "react-router";
import { type Country, type Packet, WEBSITE_URL } from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination";
import { PlatformBadges } from "~/components/PlatformBadges.js";
import { SeasonEmojiBadges } from "~/components/SeasonEmojiBadges.js";
import Select from "~/components/Select";
import database from "~/database.server";
import { publicProfilesQuery } from "~/features/sky-profile/sky-profile-repository.server.js";
import { useCDN, useCDNURL } from "~/hooks/use-cdn-url.js";
import { useRegionDisplayNames } from "~/hooks/use-region-display-names.js";
import type { loader as rootLoader } from "~/root";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, SKY_PROFILES_DESCRIPTION } from "~/utility/constants";
import { formatCountryLabel } from "~/utility/country.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { parsePage } from "~/utility/functions.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";
import type { DiscordUser } from "~/utility/types";
import type { Route } from "./+types/sky-profiles._index.js";

const NO_COUNTRY_VALUE = "none" as const;
const PROFILES_PER_PAGE = 24 as const;
const RECENT_PROFILES_LIMIT = 9 as const;
const VIEW_ALL = "all" as const;

const FILTER_BUTTON_CLASS =
	"flex items-center rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 shadow-md hover:bg-gray-100/50 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50" as const;

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky Profiles, Sky Profile`,
		},
		{ title: "Sky Profiles" },
		{ name: "description", content: SKY_PROFILES_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: "Sky Profiles" },
		{ property: "og:description", content: SKY_PROFILES_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: "Sky Profiles" },
		{ name: "twitter:description", content: SKY_PROFILES_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ url }: Route.LoaderArgs) => {
	const name = url.searchParams.get("name")?.trim() || null;
	const country = url.searchParams.get("country") || null;
	const browsingAll = url.searchParams.get("view") === VIEW_ALL;
	const page = parsePage(url);

	const countries = await database
		.selectFrom("sky_profiles")
		.select("country")
		.distinct()
		.where("name", "is not", null)
		.where("country", "is not", null)
		.$narrowType<{ country: Country }>()
		.execute();

	if (!name && !country && !browsingAll) {
		const profiles = await publicProfilesQuery()
			.where("description", "is not", null)
			.where((eb) => eb(eb.fn("cardinality", ["seasons"]), ">", 0))
			.orderBy("last_updated_at", (orderBy) => orderBy.desc().nullsLast())
			.orderBy("user_id", "asc")
			.selectAll()
			.limit(RECENT_PROFILES_LIMIT)
			.execute();

		return {
			profiles,
			name,
			country,
			countries,
			browsingAll,
			recent: true,
			currentPage: 1,
			maximumPage: 1,
		};
	}

	let profilesQuery = publicProfilesQuery();

	if (name) {
		const queryLowerCase = name.toLowerCase();
		const likePattern = `%${queryLowerCase.replaceAll(/[\\%_]/g, String.raw`\$&`)}%`;

		profilesQuery = profilesQuery.where((eb) =>
			eb.or([
				sql<boolean>`lower(name) collate "C" like ${likePattern}`,
				sql<boolean>`lower(name) % ${queryLowerCase}`,
			]),
		);
	}

	if (country) {
		if (country === NO_COUNTRY_VALUE) {
			profilesQuery = profilesQuery.where("country", "is", null);
		} else {
			profilesQuery = profilesQuery.where("country", "=", country);
		}
	}

	const countResult = await profilesQuery
		.select((eb) => eb.fn.countAll<string>().as("count"))
		.executeTakeFirst();

	const totalCount = Number(countResult?.count ?? 0);
	const maximumPage = Math.max(1, Math.ceil(totalCount / PROFILES_PER_PAGE));
	const currentPage = Math.min(page, maximumPage);

	if (name) {
		const queryLowerCase = name.toLowerCase();

		profilesQuery = profilesQuery
			.orderBy(sql`similarity(lower(name), ${queryLowerCase})`, "desc")
			.orderBy("name", "asc")
			.orderBy("user_id", "asc");
	} else {
		profilesQuery = profilesQuery.orderBy("name", "asc").orderBy("user_id", "asc");
	}

	const profiles = await profilesQuery
		.selectAll()
		.limit(PROFILES_PER_PAGE)
		.offset((currentPage - 1) * PROFILES_PER_PAGE)
		.execute();

	return {
		profiles,
		name,
		country,
		countries,
		browsingAll,
		recent: false,
		currentPage,
		maximumPage,
	};
};

interface SkyProfileCardProps {
	priority: boolean;
	profile: Packet<"sky_profiles">;
	returnTo: string;
}

function SkyProfileCard({ priority, profile, returnTo }: SkyProfileCardProps) {
	const cdn = useCDN();

	return (
		<Link
			className="flex h-137.5 flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-lg transition-transform duration-200 [-webkit-user-drag:none] hover:shadow-xl sm:hover:translate-y-0 lg:hover:-translate-y-2 dark:border-gray-600 dark:bg-gray-700"
			draggable={false}
			state={{ returnTo }}
			to={`/sky-profiles/${profile.user_id}`}
		>
			<div className="relative">
				{profile.banner ? (
					<img
						alt={`Banner of ${profile.name}.`}
						className="pointer-events-none aspect-17/6 w-full object-cover"
						fetchPriority={priority ? "high" : undefined}
						loading={priority ? "eager" : "lazy"}
						src={cdn.skyProfileBannerURL(profile.user_id, profile.banner)}
					/>
				) : (
					<div
						aria-label="No banner."
						className="aspect-17/6 w-full bg-gray-200 dark:bg-gray-600"
						role="img"
					/>
				)}
				{profile.icon && (
					<img
						alt={`Icon of ${profile.name}.`}
						className="pointer-events-none absolute -bottom-8 left-4 h-16 w-16 rounded-full border-4 border-white object-cover"
						loading="lazy"
						src={cdn.skyProfileIconURL(profile.user_id, profile.icon)}
					/>
				)}
			</div>
			<div className="flex-1 overflow-hidden px-4 pt-10 pb-4">
				<h2 className="my-0">{profile.name!}</h2>
				{profile.seasons && profile.seasons.length > 0 && (
					<SeasonEmojiBadges
						className="flex flex-wrap gap-1"
						emojiClassName="w-6 h-6"
						seasons={profile.seasons}
					/>
				)}
				{profile.description && (
					<p className="mt-2 line-clamp-6 whitespace-pre-wrap">{profile.description}</p>
				)}
			</div>
			<div className="flex items-center p-4">
				{profile.platform && profile.platform.length > 0 && (
					<PlatformBadges className="flex flex-wrap gap-2" platforms={profile.platform} />
				)}
			</div>
		</Link>
	);
}

export default function SkyProfiles({ loaderData }: Route.ComponentProps) {
	const { profiles, name, country, countries, browsingAll, recent, currentPage, maximumPage } =
		loaderData;

	const discordUser = useRouteLoaderData<typeof rootLoader>("root")?.user ?? null;
	const location = useLocation();
	const navigation = useNavigation();
	const { t } = useTranslation();
	const locale = useTranslation().i18n.language;
	const displayNames = useRegionDisplayNames(locale);
	const searching = navigation.location?.pathname === location.pathname;

	const countryOptions = countries
		.map(({ country }) => ({
			label: formatCountryLabel(country, displayNames),
			name: displayNames.of(country) ?? country,
			value: country,
		}))
		.sort((a, b) => a.name.localeCompare(b.name, locale));

	return (
		<SitePage>
			<div className="container mx-auto">
				<h1 className="text-center">{t("sky-profile.name-plural", { ns: "features" })}</h1>
				{recent && (
					<p className="text-center text-gray-600 dark:text-gray-400">
						{t("sky-profile.description-website", { ns: "features" })}
					</p>
				)}
				<div className="mb-8 flex flex-col items-center gap-4">
					<SkyProfilesFilters
						browsingAll={browsingAll}
						country={country}
						countryOptions={countryOptions}
						discordUser={discordUser}
						name={name}
						searching={searching}
					/>
					{recent && (
						<p className="my-0 text-sm text-gray-600 dark:text-gray-400">
							{t("sky-profile.description-recent", { ns: "features" })}
						</p>
					)}
				</div>
				{profiles.length > 0 ? (
					<div className={clsx("transition-opacity", searching && "opacity-60")}>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{profiles.map((profile, index) => (
								<SkyProfileCard
									key={profile.user_id}
									priority={index === 0}
									profile={profile}
									returnTo={`${location.pathname}${location.search}`}
								/>
							))}
						</div>
						{maximumPage > 1 && <Pagination currentPage={currentPage} maximumPage={maximumPage} />}
					</div>
				) : (
					<div className="py-12 text-center">
						<p className="text-gray-600 dark:text-gray-400">
							{t("sky-profile.search-none", { ns: "features" })}
						</p>
					</div>
				)}
				{recent && (
					<div className="mt-8 flex justify-center">
						<Link className={FILTER_BUTTON_CLASS} to={`?view=${VIEW_ALL}`}>
							{t("sky-profile.explore-all", { ns: "features" })}
						</Link>
					</div>
				)}
			</div>
		</SitePage>
	);
}

interface SkyProfilesFiltersProps {
	browsingAll: boolean;
	countryOptions: readonly { label: string; value: string }[];
	country: string | null;
	discordUser: DiscordUser | null;
	name: string | null;
	searching: boolean;
}

function SkyProfilesFilters({
	browsingAll,
	countryOptions,
	country,
	discordUser,
	name,
	searching,
}: SkyProfilesFiltersProps) {
	const cdnURL = useCDNURL();
	const { t } = useTranslation();
	const submit = useSubmit();
	const formRef = useRef<HTMLFormElement>(null);

	const submitFilters = (formData: FormData) => {
		const parameters = new URLSearchParams();

		for (const [key, value] of formData) {
			if (typeof value === "string" && value !== "") {
				parameters.set(key, value);
			}
		}

		void submit(parameters, { method: "get" });
	};

	return (
		<Form
			className="flex flex-wrap items-center justify-center gap-4"
			method="get"
			onSubmit={(event) => {
				event.preventDefault();
				submitFilters(new FormData(event.currentTarget));
			}}
			ref={formRef}
		>
			{browsingAll && <input name="view" type="hidden" value={VIEW_ALL} />}
			<label className="sr-only" htmlFor="sky-profile-name-search">
				{t("sky-profile.search-by-name", { ns: "features" })}
			</label>
			<input
				className="w-64 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400"
				defaultValue={name ?? ""}
				id="sky-profile-name-search"
				name="name"
				placeholder={t("sky-profile.search-by-name", { ns: "features" })}
				type="search"
				{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
			/>
			<input name="country" readOnly type="hidden" value={country ?? ""} />
			<Select
				ariaLabel={t("sky-profile.select-a-country", { ns: "features" })}
				className="w-64"
				isClearable={true}
				onChange={(value) => {
					const form = formRef.current;

					if (!form) {
						return;
					}

					const formData = new FormData(form);
					formData.set("country", value);
					submitFilters(formData);
				}}
				options={[
					{
						label: t("sky-profile.country-unspecified", { ns: "features" }),
						value: NO_COUNTRY_VALUE,
					},
					...countryOptions,
				]}
				placeholder={t("sky-profile.select-a-country", { ns: "features" })}
				surface="page"
				value={country ?? ""}
			/>
			<button className={FILTER_BUTTON_CLASS} disabled={searching} type="submit">
				<Search aria-hidden="true" className="mr-2 h-5 w-5" />
				<span>{t("search-label", { ns: "general" })}</span>
			</button>
			<Link className={FILTER_BUTTON_CLASS} to="/sky-profiles/random">
				<EmojiIcon
					className="mr-2 h-6 w-6"
					emoji={MISCELLANEOUS_EMOJIS.QuestionMark}
					label="Question mark icon."
				/>
				<span>{t("sky-profile.random", { ns: "features" })}</span>
			</Link>
			{discordUser && (
				<Link className={FILTER_BUTTON_CLASS} to={`/sky-profiles/${discordUser.id}`}>
					<div
						aria-label="Sky kid icon."
						className="mr-2 h-6 w-6 bg-cover bg-center"
						role="img"
						style={{
							backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/sky_kid.webp")})`,
						}}
					/>
					<span>{t("sky-profile.me", { ns: "features" })}</span>
				</Link>
			)}
		</Form>
	);
}
