import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, type MetaFunction, useLoaderData } from "@remix-run/react";
import {
	type CataloguePacket,
	CountryToEmoji,
	enGB,
	isCountry,
	isPlatformId,
	isSpiritId,
	MAXIMUM_WINGED_LIGHT,
	type SkyProfilePacket,
	SkyProfileWingedLightType,
	type Snowflake,
	Table,
	WEBSITE_URL,
	WING_BUFFS,
	WINGED_LIGHT_IN_AREAS,
} from "@thatskyapplication/utility";
import { ChevronLeftIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { useState } from "react";
import pg from "~/pg.server";
import { APPLICATION_NAME } from "~/utility/constants.js";
import { PlatformToIcon } from "~/utility/platform-icons.js";

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
	const { skyProfilePacket } = data!;
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky Profiles, Sky Profile`,
		},
		{ title: skyProfilePacket.name ?? "Sky Profile" },
		{ name: "description", content: skyProfilePacket.description },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: skyProfilePacket.name ?? "Sky Profile" },
		{ property: "og:description", content: skyProfilePacket.description },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{
			property: "og:image",
			content: skyProfilePacket.icon
				? `https://cdn.thatskyapplication.com/sky_profiles/icons/${skyProfilePacket.user_id}/${skyProfilePacket.icon.startsWith("a_") ? `${skyProfilePacket.icon}.gif` : `${skyProfilePacket.icon}.webp`}`
				: skyProfilePacket.thumbnail
					? `https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${skyProfilePacket.user_id}/${skyProfilePacket.thumbnail.startsWith("a_") ? `${skyProfilePacket.thumbnail}.gif` : `${skyProfilePacket.thumbnail}.webp`}`
					: null,
		},
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: skyProfilePacket.name ?? "Sky Profile" },
		{ name: "twitter:description", content: skyProfilePacket.description },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { userId } = params;

	if (!userId) {
		throw new Response("User id not provided,", { status: 400 });
	}

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId as Snowflake })
		.first();

	if (!skyProfilePacket) {
		throw new Response("Sky Profile not found.", { status: 404 });
	}

	let maximumWingedLight = null;

	if (skyProfilePacket.winged_light !== null) {
		if (skyProfilePacket.winged_light === SkyProfileWingedLightType.Capeless) {
			maximumWingedLight = "Capeless";
		} else {
			const catalogue = await pg<CataloguePacket>(Table.Catalogue)
				.where({ user_id: skyProfilePacket.user_id })
				.first();

			if (catalogue) {
				const data = new Set(catalogue.data);
				let count = WINGED_LIGHT_IN_AREAS;

				for (const wingBuff of WING_BUFFS) {
					if (data.has(wingBuff)) {
						count++;
					}
				}

				maximumWingedLight = count === MAXIMUM_WINGED_LIGHT ? `${count} (Max)` : count.toString();
			}
		}
	}

	return { skyProfilePacket, maximumWingedLight };
};

export default function SkyProfile() {
	const { skyProfilePacket, maximumWingedLight } = useLoaderData<typeof loader>();
	const [copied, setCopied] = useState(false);

	return (
		<div className="pt-8 mx-auto px-4 max-w-3xl mb-4">
			<div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
				<div className="relative h-60 w-full">
					<div className="w-full h-full rounded-md overflow-hidden">
						{skyProfilePacket.thumbnail ? (
							<div
								className="w-full h-full bg-cover bg-center"
								style={{
									backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/thumbnails/${skyProfilePacket.user_id}/${skyProfilePacket.thumbnail.startsWith("a_") ? `${skyProfilePacket.thumbnail}.gif` : `${skyProfilePacket.thumbnail}.webp`})`,
								}}
								aria-label={`Thumbnail of ${skyProfilePacket.name}.`}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
						)}
					</div>
					{skyProfilePacket.icon && (
						<div
							className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-8 left-4 bg-cover bg-center"
							style={{
								backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${skyProfilePacket.user_id}/${skyProfilePacket.icon.startsWith("a_") ? `${skyProfilePacket.icon}.gif` : `${skyProfilePacket.icon}.webp`})`,
							}}
							aria-label={`Icon of ${skyProfilePacket.name}.`}
						/>
					)}
				</div>
				<div className="px-4 pt-10 pb-2">
					{skyProfilePacket.name ? (
						<h1 className="mb-2">{skyProfilePacket.name}</h1>
					) : (
						<h1 className="mb-2 italic">No name</h1>
					)}
					{skyProfilePacket.seasons && skyProfilePacket.seasons.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{skyProfilePacket.seasons
								.sort((a, b) => a - b)
								.map((season) => (
									<div
										key={season}
										className="w-10 h-10 bg-cover bg-center"
										style={{
											backgroundImage: `url(https://cdn.thatskyapplication.com/assets/season_${season + 1}.webp)`,
										}}
										aria-label={`Season ${season} icon.`}
									/>
								))}
						</div>
					)}
					{skyProfilePacket.platform && skyProfilePacket.platform.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
							{skyProfilePacket.platform
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
					<h2 className="font-semibold mb-2">
						About Me{" "}
						{skyProfilePacket.country &&
							isCountry(skyProfilePacket.country) &&
							CountryToEmoji[skyProfilePacket.country]}
					</h2>
					<div className="mt-4">
						{skyProfilePacket.description ? (
							<p className="whitespace-pre-wrap">{skyProfilePacket.description}</p>
						) : (
							<p className="italic">No description.</p>
						)}
					</div>
				</div>
			</div>
			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				{maximumWingedLight && (
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
							<p className="my-0">{maximumWingedLight}</p>
						</div>
					</div>
				)}
				{skyProfilePacket.spirit !== null && isSpiritId(skyProfilePacket.spirit) ? (
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
							{/* @ts-expect-error New season not yet announced. */}
							<p className="my-0">{enGB.general.spirits[skyProfilePacket.spirit]}</p>
						</div>
					</div>
				) : null}
				{skyProfilePacket.spot && (
					<div
						className={`group flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-2 ${(skyProfilePacket.winged_light === null && skyProfilePacket.spirit === null) || (skyProfilePacket.winged_light !== null && skyProfilePacket.spirit) ? "md:col-span-2" : ""}`}
					>
						<MapPinIcon className="w-6 h-6 mr-2" />
						<div className="flex-1">
							<p className="my-0 text-xs text-gray-500 dark:text-gray-400">Favourite Hangout</p>
							<p className="my-0">{skyProfilePacket.spot}</p>
						</div>
					</div>
				)}
			</div>
			<div className="flex items-center justify-start mt-6 space-x-2">
				<Link
					to="/sky-profiles"
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded px-4 py-2"
				>
					<ChevronLeftIcon className="w-6 h-6 mr-2" />
					<span>Back</span>
				</Link>
				<Link
					to={"/sky-profiles/random"}
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg flex items-center border border-gray-200 dark:border-gray-600 rounded px-4 py-2"
				>
					<div
						className="w-6 h-6 mr-2 bg-cover bg-center"
						style={{
							backgroundImage: "url(https://cdn.thatskyapplication.com/assets/question_mark.webp)",
						}}
						aria-label="Question mark icon."
					/>
					<span>Random</span>
				</Link>
				<button
					type="button"
					onClick={async () => {
						await navigator.clipboard.writeText(window.location.href);
						setCopied(true);
						setTimeout(() => setCopied(false), 2000);
					}}
					className={`${copied ? "bg-green-500 hover:bg-green-600 border-green-600" : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-600"} shadow-md hover:shadow-lg flex items-center px-4 py-2 border rounded transition-colors duration-300 overflow-auto`}
				>
					<LinkIcon className="w-6 h-6 mr-2" />
					{copied ? "Link copied!" : "Share"}
				</button>
			</div>
		</div>
	);
}
