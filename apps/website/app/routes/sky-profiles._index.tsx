import type { LoaderFunctionArgs } from "@remix-run/node";
import {
	Form,
	Link,
	type MetaFunction,
	useLoaderData,
	useViewTransitionState,
} from "@remix-run/react";
import { WEBSITE_URL, isPlatformId } from "@thatskyapplication/utility";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import TopBar from "~/components/TopBar";
import pg from "~/pg.server";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	SKY_PROFILES_DESCRIPTION,
	SKY_PROFILES_PAGE_LIMIT,
	Table,
} from "~/utility/constants";
import { PlatformToIcon } from "~/utility/platform-icons.js";
import type { ProfilePacket } from "~/utility/types.js";

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

		const profiles = await pg<ProfilePacket>(Table.Profiles)
			.whereRaw("lower(name) % ?", [queryLowerCase])
			.orderByRaw("similarity(lower(name), ?) DESC", [queryLowerCase])
			.limit(SKY_PROFILES_PAGE_LIMIT);

		return { profiles, query };
	}

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
			.whereNotNull("name")
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
		<Link
			key={profile.user_id}
			className="bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-xl sm:hover:translate-y-0 lg:hover:-translate-y-2 border border-gray-200 dark:border-gray-600 transition-transform duration-200 rounded-lg overflow-hidden flex flex-col h-[550px]"
			to={`/sky-profiles/${profile.user_id}`}
		>
			<div className="relative">
				{profile.thumbnail ? (
					<div
						className="w-full h-48 bg-cover bg-center"
						style={{
							backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${profile.user_id}/${profile.thumbnail.startsWith("a_") ? `${profile.thumbnail}.gif` : `${profile.thumbnail}.webp`})`,
						}}
						aria-label={`Thumbnail of ${profile.name}.`}
					/>
				) : (
					<div className="w-full h-48 bg-gray-200 dark:bg-gray-600" aria-label="No thumbnail." />
				)}
				{profile.icon && (
					<div
						className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-4 bg-cover bg-center"
						style={{
							backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${profile.user_id}/${profile.icon.startsWith("a_") ? `${profile.icon}.gif` : `${profile.icon}.webp`})`,
						}}
						aria-label={`Icon of ${profile.name}.`}
					/>
				)}
			</div>
			<div className="px-4 pt-10 pb-4 flex-1 overflow-hidden">
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
				{profile.description ? (
					<p className="mt-2 whitespace-pre-wrap line-clamp-6">{profile.description}</p>
				) : (
					<p className="mt-2 italic">No description.</p>
				)}
			</div>
			<div className="px-4 py-4 flex items-center gap-2">
				{profile.platform && profile.platform.length > 0 && (
					<div className="flex flex-wrap space-x-1">
						{profile.platform
							.filter((platform) => isPlatformId(platform))
							.sort((a, b) => a - b)
							.map((platform) => (
								<div
									key={platform}
									className="bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow items-center justify-center"
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
	const { profiles, query, currentPage, totalPages } = useLoaderData<typeof loader>();
	const transition = useViewTransitionState("./");

	return (
		<div className="min-h-screen pt-20">
			<TopBar />
			<div className="container mx-auto px-4 m-4">
				<div className="flex items-center mb-4">
					<Form method="get" className="mr-4">
						<input
							type="search"
							name="query"
							placeholder="Search..."
							defaultValue={query}
							onChange={(event) => {
								const value = event.currentTarget.value;
								if (value !== value.trim()) {
									return;
								}
								return event.currentTarget.form!.requestSubmit();
							}}
							className="p-2 border border-gray-200 dark:border-gray-600 rounded h-10"
						/>
					</Form>
					<Link
						to={"/sky-profiles/random"}
						className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded px-4 h-10"
					>
						<img
							src="https://cdn.thatskyapplication.com/assets/question_mark.webp"
							alt="Question mark icon."
							className="w-5 h-5 mr-2"
						/>
						<span>Random Sky Profile</span>
					</Link>
				</div>
				{transition && <p>Loading...</p>}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{profiles.length > 0 ? (
						profiles.map((profile) => SkyProfileCard(profile))
					) : currentPage !== undefined && totalPages !== undefined ? (
						<p>Oh. No Sky profiles? Why not be the first time make one?</p>
					) : (
						<p>No results.</p>
					)}
				</div>
				{currentPage !== undefined && totalPages !== undefined && (
					<Pagination currentPage={currentPage ?? 0} totalPages={totalPages ?? 0} />
				)}
			</div>
		</div>
	);
}

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
	const back2 = currentPage - 2;
	const back1 = currentPage - 1;
	const next1 = currentPage + 1;
	const next2 = currentPage + 2;

	return (
		<div className="mt-8 flex justify-center items-center space-x-2">
			<Link
				to={"?page=1"}
				onClick={(event) => {
					if (currentPage <= 1) {
						event.preventDefault();
					}
				}}
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
				}`}
			>
				<ChevronsLeftIcon className="w-6 h-6" />
				<span className="hidden md:block ml-1">Start</span>
			</Link>
			<Link
				to={`?page=${back1}`}
				onClick={(event) => {
					if (currentPage <= 1) {
						event.preventDefault();
					}
				}}
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
				}`}
			>
				<ChevronLeftIcon className="w-6 h-6" />
			</Link>
			<div className="flex items-center space-x-2">
				{back2 > 0 && (
					<Link
						to={`?page=${back2}`}
						className="shadow-md hover:shadow-lg flex items-center justify-center hover:bg-gray-100/50 dark:hover:bg-gray-900/50 hover:opacity-50 rounded-full h-6 w-6"
					>
						<span>{back2}</span>
					</Link>
				)}
				{back1 > 0 && (
					<Link
						to={`?page=${back1}`}
						className="shadow-md hover:shadow-lg flex items-center justify-center hover:bg-gray-100/50 dark:hover:bg-gray-900/50 hover:opacity-50 rounded-full h-6 w-6"
					>
						<span>{back1}</span>
					</Link>
				)}
				<Form
					method="get"
					onSubmit={(event) => {
						const form = event.currentTarget;
						const pageInput = form.elements.namedItem("page") as HTMLInputElement;
						const pageValue = Number(pageInput.value);

						if (pageValue > totalPages) {
							event.preventDefault();
							pageInput.value = totalPages.toString();
							setTimeout(() => form.submit(), 0);
						}
					}}
				>
					<input
						className="p-2 border border-gray-200 dark:border-gray-600 w-12 text-center rounded"
						type="text"
						inputMode="numeric"
						pattern="\d*"
						name="page"
						defaultValue={currentPage}
						maxLength={String(totalPages).length}
					/>
				</Form>
				{next1 <= totalPages && (
					<Link
						to={`?page=${next1}`}
						className="shadow-md hover:shadow-lg flex items-center justify-center hover:bg-gray-100/50 dark:hover:bg-gray-900/50 hover:opacity-50 rounded-full h-6 w-6"
					>
						<span>{next1}</span>
					</Link>
				)}
				{next2 < totalPages && (
					<Link
						to={`?page=${next2}`}
						className="shadow-md hover:shadow-lg flex items-center justify-center hover:bg-gray-100/50 dark:hover:bg-gray-900/50 hover:opacity-50 rounded-full h-6 w-6"
					>
						<span>{next2}</span>
					</Link>
				)}
			</div>
			<Link
				to={`?page=${next1}`}
				onClick={(event) => {
					if (currentPage >= totalPages) {
						event.preventDefault();
					}
				}}
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					currentPage >= totalPages ? "cursor-not-allowed opacity-50" : ""
				}`}
			>
				<ChevronRightIcon className="w-6 h-6" />
			</Link>
			<Link
				to={`?page=${totalPages}`}
				onClick={(event) => {
					if (currentPage >= totalPages) {
						event.preventDefault();
					}
				}}
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					currentPage >= totalPages ? "cursor-not-allowed opacity-50" : ""
				}`}
			>
				<span className="hidden md:block mr-1">End</span>
				<ChevronsRightIcon className="w-6 h-6" />
			</Link>
		</div>
	);
}
