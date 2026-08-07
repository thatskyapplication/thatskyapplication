import type { _NonNullableFields } from "@discordjs/core/http-only";
import { sql } from "kysely";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useRouteLoaderData, useSearchParams } from "react-router";
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
import type { DiscordUser } from "~/utility/types";
import type { Route } from "./+types/sky-profiles._index.js";

const NO_COUNTRY_VALUE = "none" as const;
const PROFILES_PER_PAGE = 24 as const;

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
	const name = url.searchParams.get("name");
	const country = url.searchParams.get("country");
	const page = parsePage(url);

	// Get all available countries.
	const countries = await database
		.selectFrom("sky_profiles")
		.select("country")
		.distinct()
		.where("name", "is not", null)
		.where("country", "is not", null)
		.$narrowType<{ country: Country }>()
		.execute();

	if (name || country) {
		let profilesQuery = publicProfilesQuery();

		if (name) {
			const queryLowerCase = name.toLowerCase();
			profilesQuery = profilesQuery.where(sql<boolean>`lower(name) % ${queryLowerCase}`);
		}

		if (country) {
			if (country === NO_COUNTRY_VALUE) {
				profilesQuery = profilesQuery.where("country", "is", null);
			} else {
				profilesQuery = profilesQuery.where("country", "=", country);
			}
		}

		// Get total count for pagination (before applying ordering).
		const countResult = await profilesQuery
			.select((eb) => eb.fn.countAll<string>().as("count"))
			.executeTakeFirst();

		const totalCount = Number(countResult?.count ?? 0);
		const maximumPage = Math.max(1, Math.ceil(totalCount / PROFILES_PER_PAGE));
		const currentPage = Math.min(page, maximumPage);

		// Apply ordering.
		if (name) {
			const queryLowerCase = name.toLowerCase();
			profilesQuery = profilesQuery
				.orderBy(sql`similarity(lower(name), ${queryLowerCase})`, "desc")
				.orderBy("name", "asc")
				.orderBy("user_id", "asc");
		} else {
			profilesQuery = profilesQuery.orderBy("name", "asc").orderBy("user_id", "asc");
		}

		// Apply pagination.
		const offset = (currentPage - 1) * PROFILES_PER_PAGE;
		const profiles = await profilesQuery
			.selectAll()
			.limit(PROFILES_PER_PAGE)
			.offset(offset)
			.execute();

		return {
			profiles,
			name,
			country,
			countries,
			currentPage,
			maximumPage,
			totalCount,
		};
	}

	return { profiles: [], countries, currentPage: 1, maximumPage: 1, totalCount: 0 };
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
						className="pointer-events-none h-48 w-full object-cover"
						fetchPriority={priority ? "high" : undefined}
						loading={priority ? "eager" : "lazy"}
						src={cdn.skyProfileBannerURL(profile.user_id, profile.banner)}
					/>
				) : (
					<div
						aria-label="No banner."
						className="h-48 w-full bg-gray-200 dark:bg-gray-600"
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
				{profile.description ? (
					<p className="mt-2 line-clamp-6 whitespace-pre-wrap">{profile.description}</p>
				) : (
					<p className="mt-2 italic">No description.</p>
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
	const cdnURL = useCDNURL();
	const data = loaderData;
	const discordUser = useRouteLoaderData<typeof rootLoader>("root")?.user ?? null;
	const location = useLocation();
	const { t } = useTranslation();
	const locale = useTranslation().i18n.language;
	const { profiles, currentPage, maximumPage } = data;
	const displayNames = useRegionDisplayNames(locale);

	const countries = data.countries.sort((a, b) =>
		displayNames.of(a.country)!.localeCompare(displayNames.of(b.country)!),
	);

	const name = "name" in data ? data.name : null;
	const country = "country" in data ? data.country : null;
	const [_, setSearchParams] = useSearchParams();

	const updateFilters = ({ name, country }: { name: string; country: string }) => {
		const trimmedName = name.trim();

		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);

			if (trimmedName) {
				newParams.set("name", trimmedName);
			} else {
				newParams.delete("name");
			}

			if (country) {
				newParams.set("country", country);
			} else {
				newParams.delete("country");
			}

			newParams.delete("page");
			return newParams;
		});
	};

	return (
		<SitePage>
			<div className="container mx-auto">
				<div className="mb-8 flex flex-col items-center gap-4">
					<SkyProfilesFilters
						countries={countries}
						country={country}
						discordUser={discordUser}
						displayNames={displayNames}
						key={`${name ?? ""}:${country ?? ""}`}
						name={name}
						onUpdateFilters={updateFilters}
					/>
				</div>
				{profiles.length > 0 ? (
					<>
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
					</>
				) : name || country ? (
					<div className="py-12 text-center">
						<p className="text-gray-600 dark:text-gray-400">
							{t("sky-profile.search-none", { ns: "features" })}
						</p>
					</div>
				) : (
					<div className="space-y-4 py-12 text-center">
						<div
							aria-label="Sky kid icon."
							className="mx-auto h-32 w-32 bg-cover bg-center"
							role="img"
							style={{
								backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/sky_kid.webp")})`,
							}}
						/>
						<h1>{t("sky-profile.name-plural", { ns: "features" })}</h1>
						<p className="text-gray-600 dark:text-gray-400">
							{t("sky-profile.description-website", { ns: "features" })}
						</p>
					</div>
				)}
			</div>
		</SitePage>
	);
}

interface SkyProfilesFiltersProps {
	countries: readonly Pick<
		Packet<"sky_profiles"> & _NonNullableFields<Pick<Packet<"sky_profiles">, "country">>,
		"country"
	>[];
	country: string | null;
	displayNames: Intl.DisplayNames;
	discordUser: DiscordUser | null;
	name: string | null;
	onUpdateFilters: ({ name, country }: { name: string; country: string }) => void;
}

function SkyProfilesFilters({
	countries,
	country,
	displayNames,
	discordUser,
	name,
	onUpdateFilters,
}: SkyProfilesFiltersProps) {
	const cdnURL = useCDNURL();
	const { t } = useTranslation();
	const [nameValue, setNameValue] = useState(name ?? "");

	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<label className="sr-only" htmlFor="sky-profile-name-search">
				{t("sky-profile.search-by-name", { ns: "features" })}
			</label>
			<input
				className="w-64 rounded-sm border border-gray-200 bg-white p-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
				id="sky-profile-name-search"
				onChange={(event) => {
					const nextName = event.currentTarget.value;
					setNameValue(nextName);

					if (nextName === "") {
						onUpdateFilters({ country: country ?? "", name: "" });
					}
				}}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						onUpdateFilters({
							country: country ?? "",
							name: nameValue,
						});
					}
				}}
				placeholder={t("sky-profile.search-by-name", { ns: "features" })}
				type="search"
				value={nameValue}
			/>
			<Select
				className="w-64"
				isClearable={true}
				onChange={(value) => {
					onUpdateFilters({
						country: value,
						name: nameValue,
					});
				}}
				options={[
					{
						label: t("sky-profile.country-unspecified", { ns: "features" }),
						value: NO_COUNTRY_VALUE,
					},
					...countries.map((skyProfilePacket) => ({
						label: formatCountryLabel(skyProfilePacket.country as Country, displayNames),
						value: skyProfilePacket.country,
					})),
				]}
				placeholder={t("sky-profile.select-a-country", { ns: "features" })}
				value={country ?? ""}
			/>
			<Link
				className="flex items-center rounded-sm border border-gray-200 bg-gray-100 px-4 py-2 shadow-md hover:bg-gray-100/50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-900/50"
				to="/sky-profiles/random"
			>
				<EmojiIcon
					className="mr-2 h-6 w-6"
					emoji={MISCELLANEOUS_EMOJIS.QuestionMark}
					label="Question mark icon."
				/>
				<span>{t("sky-profile.random", { ns: "features" })}</span>
			</Link>
			{discordUser && (
				<Link
					className="flex items-center rounded-sm border border-gray-200 bg-gray-100 px-4 py-2 shadow-md hover:bg-gray-100/50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-900/50"
					to={`/sky-profiles/${discordUser.id}`}
				>
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
		</div>
	);
}
