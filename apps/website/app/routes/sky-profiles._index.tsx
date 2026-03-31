import type { _NonNullableFields } from "@discordjs/core/http-only";
import {
	type Country,
	CountryToEmoji,
	isPlatformId,
	type SkyProfilePacket,
	skyProfileIconURL,
	Table,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs } from "react-router";
import {
	data,
	Link,
	type MetaFunction,
	useLoaderData,
	useLocation,
	useSearchParams,
} from "react-router";
import { SitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination";
import Select from "~/components/Select";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import pg from "~/pg.server";
import { getSession } from "~/session.server";
import {
	applicationIconURL,
	cdnAssetURL,
	getCDNURLFromMatches,
	skyKidIconURL,
} from "~/utility/cdn-url.js";
import { APPLICATION_NAME, SKY_PROFILES_DESCRIPTION } from "~/utility/constants";
import { PlatformToIcon } from "~/utility/platform-icons.js";
import type { DiscordUser } from "~/utility/types";

const NO_COUNTRY_VALUE = "none" as const;
const PROFILES_PER_PAGE = 24 as const;

export const meta: MetaFunction = ({ location, matches }) => {
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
		{ title: "Sky Profiles" },
		{ name: "description", content: SKY_PROFILES_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: "Sky Profiles" },
		{ property: "og:description", content: SKY_PROFILES_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: applicationIconURL(cdnURL) },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: "Sky Profiles" },
		{ name: "twitter:description", content: SKY_PROFILES_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const discordUser = session.get("discord_user") ?? null;
	const url = new URL(request.url);
	const name = url.searchParams.get("name");
	const country = url.searchParams.get("country");
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

	// Get all available countries.
	const countries = await pg<
		SkyProfilePacket & _NonNullableFields<Pick<SkyProfilePacket, "country">>
	>(Table.Profiles)
		.distinct("country")
		.whereNotNull("name")
		.and.whereNotNull("country");

	if (name || country) {
		let profilesQuery = pg<SkyProfilePacket>(Table.Profiles).whereNotNull("name");

		if (name) {
			const queryLowerCase = name.toLowerCase();
			profilesQuery = profilesQuery.whereRaw("lower(name) % ?", [queryLowerCase]);
		}

		if (country) {
			if (country === NO_COUNTRY_VALUE) {
				profilesQuery = profilesQuery.whereNull("country");
			} else {
				profilesQuery = profilesQuery.where("country", country);
			}
		}

		// Get total count for pagination (before applying ordering).
		const countResult = (await profilesQuery.clone().count("* as count")) as { count: string }[];
		const totalCount = Number(countResult[0]?.count ?? 0);
		const maximumPage = Math.max(1, Math.ceil(totalCount / PROFILES_PER_PAGE));

		// Apply ordering.
		if (name) {
			const queryLowerCase = name.toLowerCase();
			profilesQuery = profilesQuery.orderByRaw("similarity(lower(name), ?) DESC", [queryLowerCase]);
		} else {
			profilesQuery = profilesQuery.orderBy("name", "asc").orderBy("user_id", "asc");
		}

		// Apply pagination.
		const offset = (page - 1) * PROFILES_PER_PAGE;
		const profiles = await profilesQuery.limit(PROFILES_PER_PAGE).offset(offset);

		return data(
			{
				profiles,
				name,
				country,
				countries,
				currentPage: page,
				maximumPage,
				totalCount,
				discordUser,
			},
			{ headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
		);
	}

	return data(
		{ profiles: [], countries, currentPage: 1, maximumPage: 1, totalCount: 0, discordUser },
		{ headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
	);
};

function SkyProfileCard(cdnURL: string, profile: SkyProfilePacket, returnTo: string) {
	return (
		<Link
			className="bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-xl sm:hover:translate-y-0 lg:hover:-translate-y-2 border border-gray-200 dark:border-gray-600 transition-transform duration-200 rounded-lg overflow-hidden flex flex-col h-137.5"
			key={profile.user_id}
			state={{ returnTo }}
			to={`/sky-profiles/${profile.user_id}`}
		>
			<div className="relative">
				{profile.banner ? (
					<div
						aria-label={`Banner of ${profile.name}.`}
						className="w-full h-48 bg-cover bg-center"
						role="img"
						style={{
							backgroundImage: `url(${cdnAssetURL(
								cdnURL,
								`sky_profiles/banners/${profile.user_id}/${profile.banner.startsWith("a_") ? `${profile.banner}.gif` : `${profile.banner}.webp`}`,
							)})`,
						}}
					/>
				) : (
					<div
						aria-label="No banner."
						className="w-full h-48 bg-gray-200 dark:bg-gray-600"
						role="img"
					/>
				)}
				{profile.icon && (
					<div
						aria-label={`Icon of ${profile.name}.`}
						className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-4 bg-cover bg-center"
						role="img"
						style={{
							backgroundImage: `url(${skyProfileIconURL(cdnURL, profile.user_id, profile.icon)})`,
						}}
					/>
				)}
			</div>
			<div className="px-4 pt-10 pb-4 flex-1 overflow-hidden">
				<h2 className="my-0">{profile.name!}</h2>
				{profile.seasons && profile.seasons.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{profile.seasons
							.sort((a, b) => a - b)
							.map((season) => (
								<div
									aria-label={`Season ${season} icon.`}
									className="w-6 h-6 bg-cover bg-center"
									key={season}
									role="img"
									style={{
										backgroundImage: `url(${cdnAssetURL(cdnURL, `assets/season_${season + 1}.webp`)})`,
									}}
								/>
							))}
					</div>
				)}
				{profile.description ? (
					<p className="mt-2 whitespace-pre-wrap line-clamp-6">{profile.description}</p>
				) : (
					<p className="mt-2 italic">No description.</p>
				)}
			</div>
			<div className="flex p-4 items-center">
				{profile.platform && profile.platform.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{profile.platform
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
			</div>
		</Link>
	);
}

export default function SkyProfiles() {
	const data = useLoaderData<typeof loader>();
	const location = useLocation();
	const { t } = useTranslation();
	const cdnURL = useCDNURL();
	const locale = useTranslation().i18n.language;
	const { profiles, currentPage, maximumPage, discordUser } = data;
	const displayNames = new Intl.DisplayNames(locale, { type: "region", style: "long" });

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
			trimmedName ? newParams.set("name", trimmedName) : newParams.delete("name");
			country ? newParams.set("country", country) : newParams.delete("country");
			newParams.delete("page");
			return newParams;
		});
	};

	return (
		<SitePage>
			<div className="container mx-auto">
				<div className="flex flex-col items-center mb-8 gap-4">
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
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{profiles.map((profile) =>
								SkyProfileCard(cdnURL, profile, `${location.pathname}${location.search}`),
							)}
						</div>
						{maximumPage > 1 && <Pagination currentPage={currentPage} maximumPage={maximumPage} />}
					</>
				) : name || country ? (
					<div className="text-center py-12">
						<p className="text-gray-600 dark:text-gray-400">
							{t("sky-profile.search-none", { ns: "features" })}
						</p>
					</div>
				) : (
					<div className="text-center py-12 space-y-4">
						<div
							aria-label="Sky kid icon."
							className="w-32 h-32 mx-auto bg-cover bg-center"
							role="img"
							style={{
								backgroundImage: `url(${skyKidIconURL(cdnURL)})`,
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
		SkyProfilePacket & _NonNullableFields<Pick<SkyProfilePacket, "country">>,
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
	const { t } = useTranslation();
	const cdnURL = useCDNURL();
	const [nameValue, setNameValue] = useState(name ?? "");

	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<input
				className="p-2 border border-gray-200 dark:border-gray-600 rounded-sm w-64 bg-white dark:bg-gray-800 text-black dark:text-white"
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
						label: `${CountryToEmoji[skyProfilePacket.country as Country]} ${displayNames.of(skyProfilePacket.country)}`,
						value: skyProfilePacket.country,
					})),
				]}
				placeholder={t("sky-profile.select-a-country", { ns: "features" })}
				value={country ?? ""}
			/>
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
			{discordUser && (
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded-sm px-4 py-2"
					to={`/sky-profiles/${discordUser.id}`}
				>
					<div
						aria-label="Sky kid icon."
						className="w-6 h-6 mr-2 bg-cover bg-center"
						role="img"
						style={{
							backgroundImage: `url(${skyKidIconURL(cdnURL)})`,
						}}
					/>
					<span>{t("sky-profile.me", { ns: "features" })}</span>
				</Link>
			)}
		</div>
	);
}
