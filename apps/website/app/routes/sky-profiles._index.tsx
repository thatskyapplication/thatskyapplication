import {
	isPlatformId,
	type SkyProfilePacket,
	Table,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import type { LoaderFunctionArgs } from "react-router";
import { data, Form, Link, type MetaFunction, useLoaderData } from "react-router";
import Pagination from "~/components/Pagination.js";
import pg from "~/pg.server";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
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
	const query = url.searchParams.get("query");

	if (query) {
		const queryLowerCase = query.toLowerCase();

		const profiles = await pg<SkyProfilePacket>(Table.Profiles)
			.whereRaw("lower(name) % ?", [queryLowerCase])
			.orderByRaw("similarity(lower(name), ?) DESC", [queryLowerCase])
			.limit(SKY_PROFILES_PAGE_LIMIT);

		return data(
			{ profiles, query },
			{ headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
		);
	}

	const pageParameter = url.searchParams.get("page") ?? "1";
	let page = Number(pageParameter);

	if (!Number.isInteger(page) || page < 1) {
		page = 1;
	}

	const currentPage = Math.max(1, Number(page));
	const offset = (currentPage - 1) * SKY_PROFILES_PAGE_LIMIT;

	const countResult = await pg<SkyProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.count({ total: "*" })
		.first();

	const totalProfiles = Number(countResult!.total!);
	const maximumPage = Math.ceil(totalProfiles / SKY_PROFILES_PAGE_LIMIT);

	if (currentPage > maximumPage) {
		throw new Response(null, { status: 404 });
	}

	const profiles = await pg<SkyProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.orderBy("name", "asc")
		.orderBy("user_id", "asc")
		.limit(SKY_PROFILES_PAGE_LIMIT)
		.offset(offset);

	return data(
		{ profiles, currentPage, maximumPage },
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
	const query = "query" in data ? data.query : undefined;
	const currentPage = "currentPage" in data ? data.currentPage : undefined;
	const maximumPage = "maximumPage" in data ? data.maximumPage : undefined;

	return (
		<div className="container mx-auto px-4 m-4">
			<div className="flex items-center mb-4">
				<Form className="mr-4" method="get">
					<input
						className="p-2 border border-gray-200 dark:border-gray-600 rounded-sm my-2 w-48"
						defaultValue={query}
						name="query"
						onChange={(event) => {
							const value = event.currentTarget.value;
							if (value !== value.trim()) {
								return;
							}
							return event.currentTarget.form!.requestSubmit();
						}}
						placeholder="Search..."
						type="search"
					/>
				</Form>
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
					<span>Random</span>
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{profiles.length > 0 ? (
					profiles.map((profile) => SkyProfileCard(profile))
				) : currentPage !== undefined && maximumPage !== undefined ? (
					<p>Oh. No Sky profiles? Why not be the first time make one?</p>
				) : (
					<p>No results.</p>
				)}
			</div>
			{currentPage !== undefined && maximumPage !== undefined && (
				<Pagination currentPage={currentPage} maximumPage={maximumPage} />
			)}
		</div>
	);
}
