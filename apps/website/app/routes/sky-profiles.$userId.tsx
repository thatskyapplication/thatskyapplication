import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, type MetaFunction, useLoaderData } from "@remix-run/react";
import { CountryToEmoji, WEBSITE_URL, isCountry, isPlatformId } from "@thatskyapplication/utility";
import { ChevronLeftIcon, MapPinIcon } from "lucide-react";
import TopBar from "~/components/TopBar.js";
import pg from "~/pg.server";
import { APPLICATION_NAME, Table } from "~/utility/constants.js";
import { PlatformToIcon } from "~/utility/platform-icons.js";
import type { ProfilePacket } from "~/utility/types.js";

export const meta: MetaFunction = ({ data, location }) => {
	const profilePacket = data as ProfilePacket;
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky Profiles, Sky Profile`,
		},
		{ title: profilePacket.name ?? "Sky Profile" },
		{ name: "description", content: profilePacket.description },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: profilePacket.name ?? "Sky Profile" },
		{ property: "og:description", content: profilePacket.description },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{
			property: "og:image",
			content: profilePacket.icon
				? `https://cdn.thatskyapplication.com/sky_profiles/icons/${profilePacket.user_id}/${profilePacket.icon.startsWith("a_") ? `${profilePacket.icon}.gif` : `${profilePacket.icon}.webp`}`
				: profilePacket.thumbnail
					? `https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${profilePacket.user_id}/${profilePacket.thumbnail.startsWith("a_") ? `${profilePacket.thumbnail}.gif` : `${profilePacket.thumbnail}.webp`}`
					: null,
		},
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: profilePacket.name ?? "Sky Profile" },
		{ name: "twitter:description", content: profilePacket.description },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { userId } = params;

	if (!userId) {
		throw new Response("User id not provided,", { status: 400 });
	}

	const profile = await pg<ProfilePacket>(Table.Profiles).where({ user_id: userId }).first();

	if (!profile) {
		throw new Response("Sky Profile not found.", { status: 404 });
	}

	return profile;
};

export default function SkyProfile() {
	const profile = useLoaderData<typeof loader>();

	return (
		<div className="mx-auto px-4 max-w-3xl mt-20 mb-4">
			<TopBar back="/sky-profiles" />
			<div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
				<div className="relative h-60 w-full">
					<div className="w-full h-full rounded-md overflow-hidden">
						{profile.thumbnail ? (
							<div
								className="w-full h-full bg-cover bg-center"
								style={{
									backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${profile.user_id}/${profile.thumbnail.startsWith("a_") ? `${profile.thumbnail}.gif` : `${profile.thumbnail}.webp`})`,
								}}
								aria-label={`Thumbnail of ${profile.name}.`}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
						)}
					</div>
					{profile.icon && (
						<div
							className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-8 left-4 bg-cover bg-center"
							style={{
								backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${profile.user_id}/${profile.icon.startsWith("a_") ? `${profile.icon}.gif` : `${profile.icon}.webp`})`,
							}}
							aria-label={`Icon of ${profile.name}.`}
						/>
					)}
				</div>
				<div className="px-4 pt-10 pb-2">
					{profile.name ? <h1>{profile.name} </h1> : <h1 className="italic">No name</h1>}
					{profile.seasons && profile.seasons.length > 0 && (
						<div className="mt-4">
							<h2 className="font-semibold mb-2">Seasons</h2>
							<div className="flex flex-wrap gap-2">
								{profile.seasons
									.sort((a, b) => a - b)
									.map((season) => (
										<div
											key={season}
											className="w-8 h-8 bg-cover bg-center"
											style={{
												backgroundImage: `url(https://cdn.thatskyapplication.com/assets/season_${season + 1}.webp)`,
											}}
											aria-label={`Season ${season} icon.`}
										/>
									))}
							</div>
						</div>
					)}
					{profile.platform && profile.platform.length > 0 && (
						<div className="mt-4">
							<h2 className="font-semibold mb-2">Platforms</h2>
							<div className="flex flex-wrap gap-2">
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
						</div>
					)}
					<h2 className="font-semibold mb-2">
						About Me{" "}
						{profile.country && isCountry(profile.country) && CountryToEmoji[profile.country]}
					</h2>
					<div className="mt-4">
						{profile.description ? (
							<p className="whitespace-pre-wrap">{profile.description}</p>
						) : (
							<p className="italic">No description.</p>
						)}
					</div>
				</div>
			</div>
			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				{profile.winged_light !== null && (
					<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2">
						<div
							className="w-6 h-6 mr-2 bg-cover bg-center"
							style={{
								backgroundImage: "url(https://cdn.thatskyapplication.com/assets/winged_light.webp)",
							}}
							aria-label="Winged light icon."
						/>
						<div className="flex-1">
							<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Maximum Winged Light</p>
							<p className="my-0">{profile.winged_light}</p>
						</div>
					</div>
				)}
				{profile.spirit && (
					<div className="group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2">
						<div
							className="w-6 h-6 mr-2 bg-cover bg-center"
							style={{
								backgroundImage: "url(https://cdn.thatskyapplication.com/assets/heart.webp)",
							}}
							aria-label="Favourite spirit icon."
						/>
						<div className="flex-1">
							<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Favourite Spirit</p>
							<p className="my-0">{profile.spirit}</p>
						</div>
					</div>
				)}
				{profile.spot && (
					<div
						className={`group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 ${(profile.winged_light === null && profile.spirit === null) || (profile.winged_light !== null && profile.spirit) ? "md:col-span-2" : ""}`}
					>
						<MapPinIcon className="w-6 h-6 mr-2" />
						<div className="flex-1">
							<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Favourite Hangout</p>
							<p className="my-0">{profile.spot}</p>
						</div>
					</div>
				)}
			</div>
			<div className="flex items-center justify-start mt-6 space-x-2">
				<Link
					to="/sky-profiles"
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded px-4 h-10"
				>
					<ChevronLeftIcon className="w-6 h-6" />
					<span className="ml-1">Back</span>
				</Link>
				<Link
					to={"/sky-profiles/random"}
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded px-4 h-10"
				>
					<div
						className="w-5 h-5 mr-2 bg-cover bg-center"
						style={{
							backgroundImage: "url(https://cdn.thatskyapplication.com/assets/question_mark.webp)",
						}}
						aria-label="Question mark icon."
					/>
					<span>Random</span>
				</Link>
			</div>
		</div>
	);
}
