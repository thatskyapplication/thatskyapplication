import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, type MetaFunction, useLoaderData } from "@remix-run/react";
import { WEBSITE_URL, isPlatformId } from "@thatskyapplication/utility";
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
			content: profilePacket.thumbnail
				? `https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${profilePacket.user_id}/${profilePacket.thumbnail.startsWith("a_") ? `${profilePacket.thumbnail}.gif` : `${profilePacket.thumbnail}.webp`}`
				: profilePacket.icon
					? `https://cdn.thatskyapplication.com/sky_profiles/icons/${profilePacket.user_id}/${profilePacket.icon.startsWith("a_") ? `${profilePacket.icon}.gif` : `${profilePacket.icon}.webp`}`
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
		<div className="mx-auto max-w-3xl">
			<TopBar back="/sky-profiles" />
			<div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg mt-20 mb-4">
				<div className=" relative h-48 w-full">
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
					{profile.name ? <h1>{profile.name}</h1> : <h1 className="italic">No name</h1>}
					{profile.seasons && profile.seasons.length > 0 && (
						<div className="mt-4">
							<h2 className="font-semibold mb-2">Seasons</h2>
							<div className="flex flex-wrap gap-2">
								{profile.seasons
									.sort((a, b) => a - b)
									.map((season) => (
										<img
											key={season}
											src={`https://cdn.thatskyapplication.com/assets/season_${season + 1}.webp`}
											alt={`Season ${season}`}
											className="w-8 h-8"
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
										<div key={platform} className="bg-gray-300 dark:bg-gray-600 p-2 rounded-md">
											{PlatformToIcon[platform]}
										</div>
									))}
							</div>
						</div>
					)}
					<div className="space-y-1">
						{profile.country && (
							<p>
								<span className="font-semibold">Country:</span> {profile.country}
							</p>
						)}
						{profile.winged_light !== null && (
							<p>
								<span className="font-semibold">Winged Light:</span> {profile.winged_light}
							</p>
						)}
					</div>
					{(profile.spirit || profile.spot) && (
						<div className="mt-4 space-y-2">
							{profile.spirit && (
								<p>
									<span className="font-semibold">Favourite Spirit:</span> {profile.spirit}
								</p>
							)}
							{profile.spot && (
								<p>
									<span className="font-semibold">Favourite Hangout:</span> {profile.spot}
								</p>
							)}
						</div>
					)}
					{profile.description && (
						<div className="mt-4">
							<h2 className="font-semibold mb-2">About Me</h2>
							<p className="whitespace-pre-wrap">{profile.description}</p>
						</div>
					)}
					<div className="mt-8">
						<Link to="/sky-profiles" className="text-blue-600 hover:underline">
							Back to Profiles
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
