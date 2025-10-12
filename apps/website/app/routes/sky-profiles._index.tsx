import {
	COUNTRY_VALUES,
	CountryToEmoji,
	isPlatformId,
	type SkyProfilePacket,
	Table,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import type { LoaderFunctionArgs } from "react-router";
import { data, Link, type MetaFunction, useLoaderData, useSearchParams } from "react-router";
import { useLocale } from "remix-i18next/react";
import Select from "~/components/Select";
import pg from "~/pg.server";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	SKY_KID_ICON_URL,
	SKY_PROFILES_DESCRIPTION,
	SKY_PROFILES_PAGE_LIMIT,
} from "~/utility/constants";
import { PlatformToIcon } from "~/utility/platform-icons.js";

export const meta: MetaFunction = ({ location }) => {
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
		{ property: "og:image", content: APPLICATION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: "Sky Profiles" },
		{ name: "twitter:description", content: SKY_PROFILES_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const name = url.searchParams.get("name");
	const country = url.searchParams.get("country");

	if (name || country) {
		let profilesQuery = pg<SkyProfilePacket>(Table.Profiles).whereNotNull("name");

		if (name) {
			const queryLowerCase = name.toLowerCase();

			profilesQuery = profilesQuery
				.whereRaw("lower(name) % ?", [queryLowerCase])
				.orderByRaw("similarity(lower(name), ?) DESC", [queryLowerCase]);
		} else {
			profilesQuery = profilesQuery.orderBy("name", "asc").orderBy("user_id", "asc");
		}

		if (country) {
			profilesQuery = profilesQuery.where("country", country);
		}

		const profiles = await profilesQuery.limit(SKY_PROFILES_PAGE_LIMIT);

		return data(
			{ profiles, name, country },
			{ headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
		);
	}

	return data(
		{ profiles: [] },
		{ headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
	);
};

function SkyProfileCard(profile: SkyProfilePacket) {
	return (
		<Link
			className="bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-xl sm:hover:translate-y-0 lg:hover:-translate-y-2 border border-gray-200 dark:border-gray-600 transition-transform duration-200 rounded-lg overflow-hidden flex flex-col h-[550px]"
			key={profile.user_id}
			to={`/sky-profiles/${profile.user_id}`}
		>
			<div className="relative">
				{profile.banner ? (
					<div
						aria-label={`Banner of ${profile.name}.`}
						className="w-full h-48 bg-cover bg-center"
						role="img"
						style={{
							backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/banners/${profile.user_id}/${profile.banner.startsWith("a_") ? `${profile.banner}.gif` : `${profile.banner}.webp`})`,
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
							backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${profile.user_id}/${profile.icon.startsWith("a_") ? `${profile.icon}.gif` : `${profile.icon}.webp`})`,
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
										backgroundImage: `url(https://cdn.thatskyapplication.com/assets/season_${season + 1}.webp)`,
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
	const { profiles } = data;
	const name = "name" in data ? data.name : null;
	const country = "country" in data ? data.country : null;
	const locale = useLocale();
	const displayNames = new Intl.DisplayNames(locale, { type: "region", style: "long" });
	const [_, setSearchParams] = useSearchParams();

	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-col items-center mb-8 gap-4">
				<div className="flex flex-wrap items-center justify-center gap-4">
					<input
						className="p-2 border border-gray-200 dark:border-gray-600 rounded-sm w-64 bg-white dark:bg-gray-800 text-black dark:text-white"
						defaultValue={name ?? ""}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								const value = event.currentTarget.value.trim();

								setSearchParams((prev) => {
									const newParams = new URLSearchParams(prev);
									value ? newParams.set("name", value) : newParams.delete("name");
									return newParams;
								});
							}
						}}
						placeholder="Search by name..."
						type="search"
					/>
					<Select
						className="w-64"
						isClearable={true}
						onChange={(value) => {
							setSearchParams((prev) => {
								const newParams = new URLSearchParams(prev);
								value ? newParams.set("country", value) : newParams.delete("country");
								return newParams;
							});
						}}
						options={COUNTRY_VALUES.map((code) => ({
							value: code,
							label: `${CountryToEmoji[code]} ${displayNames.of(code)}`,
						}))}
						placeholder="Select a country"
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
								backgroundImage:
									"url(https://cdn.thatskyapplication.com/assets/question_mark.webp)",
							}}
						/>
						<span>Random</span>
					</Link>
				</div>
			</div>
			{profiles.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{profiles.map((profile) => SkyProfileCard(profile))}
				</div>
			) : name || country ? (
				<div className="text-center py-12">
					<p className="text-gray-600 dark:text-gray-400">No Sky profiles.</p>
				</div>
			) : (
				<div className="text-center py-12 space-y-4">
					<div
						aria-label="Sky kid icon."
						className="w-32 h-32 mx-auto bg-cover bg-center"
						role="img"
						style={{
							backgroundImage: `url(${SKY_KID_ICON_URL})`,
						}}
					/>
					<h1>Sky profiles</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Discover Sky profiles by the community by searching above!
					</p>
				</div>
			)}
		</div>
	);
}
