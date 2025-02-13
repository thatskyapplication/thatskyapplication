import type { Snowflake } from "@discordjs/core/http-only";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, type MetaFunction, useLoaderData } from "@remix-run/react";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import TopBar from "~/components/TopBar";
import pg from "~/pg.server";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	SKY_PROFILES_DESCRIPTION,
	SKY_PROFILES_PAGE_LIMIT,
	Table,
} from "~/utility/constants";

interface ProfilePacket {
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
	country: string | null;
	winged_light: number | null;
	seasons: number[] | null;
	platform: number[] | null;
	spirit: string | null;
	spot: string | null;
	catalogue_progression: boolean | null;
	guess_rank: boolean | null;
}

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
	const pageParameter = url.searchParams.get("page") ?? "1";
	let page = Number(pageParameter);

	if (!Number.isInteger(page) || page < 1) {
		page = 1;
	}

	const currentPage = Math.max(1, Number(page));
	const offset = (currentPage - 1) * SKY_PROFILES_PAGE_LIMIT;

	try {
		const countResult = await pg<ProfilePacket>(Table.Profiles)
			.whereNotNull("name")
			.count({ total: "*" })
			.first();

		const totalProfiles = Number(countResult!.total!);
		const totalPages = Math.ceil(totalProfiles / SKY_PROFILES_PAGE_LIMIT);

		if (currentPage > totalPages) {
			throw new Response("Invalid page number.", { status: 404 });
		}

		const profiles = await pg<ProfilePacket>(Table.Profiles)
			.orderBy("name", "asc")
			.orderBy("user_id", "asc")
			.limit(SKY_PROFILES_PAGE_LIMIT)
			.offset(offset);

		return { profiles, currentPage, totalPages };
	} catch {
		throw new Response("Unable to fetch Sky profiles.", { status: 500 });
	}
};

function SkyProfileCard(profile: ProfilePacket) {
	return (
		<div
			key={profile.user_id}
			className="bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-xl sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200 rounded-lg overflow-hidden"
		>
			<div className="relative">
				{profile.thumbnail ? (
					<img
						className="w-full h-48 object-cover"
						src={`https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${profile.user_id}/${profile.thumbnail.startsWith("a_") ? `${profile.thumbnail}.gif` : `${profile.thumbnail}.webp`}`}
						alt={`Thumbnail of ${profile.name}.`}
					/>
				) : (
					<div className="w-full h-48 bg-gray-200 dark:bg-gray-600" />
				)}
				{profile.icon && (
					<img
						className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-4"
						src={`https://cdn.thatskyapplication.com/sky_profiles/icons/${profile.user_id}/${profile.icon.startsWith("a_") ? `${profile.icon}.gif` : `${profile.icon}.webp`}`}
						alt={`Icon of ${profile.name}.`}
					/>
				)}
			</div>
			<div className="px-4 pt-10 pb-4">
				<h2 className="my-0">{profile.name!}</h2>
				{profile.seasons && profile.seasons.length > 0 && (
					<div className="flex flex-wrap">
						{profile.seasons
							.sort((a, b) => a - b)
							.map((season) => (
								<img
									key={season}
									className="w-5 h-5"
									alt={`Season ${season} icon.`}
									src={`https://cdn.thatskyapplication.com/assets/season_${season + 1}.webp`}
								/>
							))}
					</div>
				)}
				{profile.description && <p className="mt-2 whitespace-pre-wrap">{profile.description}</p>}
				{profile.country && (
					<p className="mt-2">
						<span className="font-medium">Country: </span>
						{profile.country}
					</p>
				)}
				{profile.winged_light !== null && (
					<p className="mt-2">
						<span className="font-medium">Winged Light: </span>
						{profile.winged_light}
					</p>
				)}
				{profile.platform && profile.platform.length > 0 && (
					<p className="mt-2">
						<span className="font-medium">Platforms: </span>
						{profile.platform.join(", ")}
					</p>
				)}
				{profile.spirit && (
					<p className="mt-2 text-sm">
						<span className="font-medium">Favourite Spirit: </span>
						{profile.spirit}
					</p>
				)}
				{profile.spot && (
					<p className="mt-2 text-sm">
						<span className="font-medium">Favourite Hangout: </span>
						{profile.spot}
					</p>
				)}
			</div>
		</div>
	);
}

export default function SkyProfiles() {
	const { profiles, currentPage, totalPages } = useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-4">
			<TopBar />
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{profiles.length > 0 ? (
						profiles.map((profile) => SkyProfileCard(profile))
					) : (
						<p className="text-sm text-center">
							Oh. No Sky profiles? Why not be the first time make one?
						</p>
					)}
				</div>
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</div>
		</div>
	);
}

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
	return (
		<div className="mt-8 flex justify-center space-x-4">
			{currentPage > 1 && (
				<Link
					to={`?page=${currentPage - 1}`}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					Previous
				</Link>
			)}
			<span className="px-3 py-1">
				Page {currentPage} of {totalPages}
			</span>
			{currentPage < totalPages && (
				<Link
					to={`?page=${currentPage + 1}`}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					Next
				</Link>
			)}
		</div>
	);
}
