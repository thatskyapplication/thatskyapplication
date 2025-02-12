import type { Snowflake } from "@discordjs/core/http-only";
import {
	SiBluesky,
	SiBlueskyHex,
	SiFacebook,
	SiFacebookHex,
	SiInstagram,
	SiInstagramHex,
	SiTiktok,
	SiTiktokHex,
	SiTwitch,
	SiTwitchHex,
	SiX,
	SiXHex,
	SiYoutube,
	SiYoutubeHex,
} from "@icons-pack/react-simple-icons";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import TopBar from "~/components/TopBar";
import pg from "~/pg.server";
import {
	APPLICATION_NAME,
	CONTENT_CREATORS_DESCRIPTION,
	CONTENT_CREATORS_ICON_URL,
	Table,
} from "~/utility/constants";

export interface ContentCreatorsPacket {
	user_id: Snowflake;
	description: string | null;
	youtube: string | null;
	twitch: string | null;
	tiktok: string | null;
	x: string | null;
	instagram: string | null;
	facebook: string | null;
	bluesky: string | null;
	name: string | null;
	avatar: string | null;
}

export const meta: MetaFunction = ({ location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Creator Troupe, Content Creators, Discord Bot, Discord Application`,
		},
		{ title: "Creator Troupe" },
		{ name: "description", content: CONTENT_CREATORS_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: "Creator Troupe" },
		{ property: "og:description", content: CONTENT_CREATORS_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: CONTENT_CREATORS_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: "Creator Troupe" },
		{ name: "twitter:description", content: CONTENT_CREATORS_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async () => {
	try {
		const contentCreatorsPacket = await pg<ContentCreatorsPacket>(Table.ContentCreators).orderBy(
			"name",
			"asc",
		);

		return contentCreatorsPacket;
	} catch {
		throw new Response("Unable to fetch content creators.", { status: 500 });
	}
};

const renderPlatforms = ({
	youtube,
	twitch,
	tiktok,
	x,
	instagram,
	facebook,
	bluesky,
}: ContentCreatorsPacket) => (
	<div className="flex gap-2 pb-1 overflow-auto -mb-3">
		{youtube && (
			<a
				href={`https://youtube.com/${youtube}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiYoutube color={SiYoutubeHex} className="w-6 h-6" />
			</a>
		)}
		{twitch && (
			<a
				href={`https://twitch.tv/${twitch}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiTwitch color={SiTwitchHex} className="w-6 h-6" />
			</a>
		)}
		{tiktok && (
			<a
				href={`https://tiktok.com/${tiktok}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiTiktok color={SiTiktokHex} className="w-6 h-6" />
			</a>
		)}
		{x && (
			<a
				href={`https://x.com/${x}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiX color={SiXHex} className="w-6 h-6" />
			</a>
		)}
		{instagram && (
			<a
				href={`https://instagram.com/${instagram}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiInstagram color={SiInstagramHex} className="w-6 h-6" />
			</a>
		)}
		{facebook && (
			<a
				href={`https://facebook.com/${facebook}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiFacebook color={SiFacebookHex} className="w-6 h-6" />
			</a>
		)}
		{bluesky && (
			<a
				href={`https://bsky.app/profile/${bluesky}`}
				target="_blank"
				rel="noopener noreferrer"
				className="transition hover:opacity-75 bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow flex items-center justify-center"
			>
				<SiBluesky color={SiBlueskyHex} className="w-6 h-6" />
			</a>
		)}
	</div>
);

export default function CreatorTroupe() {
	const contentCreatorsPacket = useLoaderData<typeof loader>();

	const creatorTroupe = contentCreatorsPacket
		.filter((creator) => creator.name)
		.map((creator) => (
			<div
				key={creator.user_id}
				className="p-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow hover:shadow-md rounded-lg transition flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]"
			>
				<div>
					<div className="flex items-center">
						{creator.avatar && (
							<img
								src={`https://cdn.thatskyapplication.com/content_creators/avatars/${creator.user_id}/${creator.avatar}.webp`}
								alt="Avatar icon."
								className="h-16 w-16 rounded-full object-cover mr-2"
							/>
						)}
						<h2 className="my-0">{creator.name}</h2>
					</div>
					{creator.description && <p className="whitespace-pre-wrap">{creator.description}</p>}
				</div>
				<div className="mt-4">{renderPlatforms(creator)}</div>
			</div>
		));

	return (
		<div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-4">
			<TopBar />
			<h1 className="text-center">Sky Creator Troupe</h1>
			<div className="gap-6 max-w-6xl px-4 w-full flex flex-wrap justify-center">
				{creatorTroupe.length > 0 ? (
					creatorTroupe
				) : (
					<p className="text-sm text-center">
						Legends speak of beings that carry souls to the Eye of Eden. Whilst streaming on Twitch.
						Probably YouTube too.
					</p>
				)}
			</div>
		</div>
	);
}
