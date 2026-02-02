import {
	FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY,
	type SkyProfilePacket,
	Table,
} from "@thatskyapplication/utility";
import { ExternalLinkIcon } from "lucide-react";
import { data, Link, useLoaderData } from "react-router";
import pg from "~/pg.server";
import { APPLICATION_NAME, WIKI_URL } from "~/utility/constants";

export const loader = async () => {
	const contributors = await pg<SkyProfilePacket>(Table.Profiles)
		.select("user_id", "name", "icon")
		.whereIn("user_id", FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY)
		.whereNotNull("name")
		.orderBy("name", "asc")
		.orderBy("user_id", "asc");

	return data(contributors, {
		headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
	});
};

export default function Acknowledgements() {
	const skyProfilePackets = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto px-4 max-w-4xl py-12">
			<h1>Acknowledgements</h1>
			<p className="text-gray-500 dark:text-gray-400">
				The people and resources that make {APPLICATION_NAME} possible.
			</p>
			<hr />

			{skyProfilePackets.length > 0 && (
				<section>
					<h2>Friendship actions contributors</h2>
					<p className="text-gray-600 dark:text-gray-400">
						These people have contributed to{" "}
						<a
							className="regular-link inline-flex items-center"
							href="https://guide.thatskyapplication.com/caelus/friendship-actions"
							rel="noopener noreferrer"
							target="_blank"
						>
							friendship actions
							<ExternalLinkIcon className="ml-1 w-4 h-4" />
						</a>{" "}
						for everyone to enjoy.
					</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
						{skyProfilePackets.map((profile) => (
							<Link
								className="group flex items-center gap-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
								key={profile.user_id}
								to={`/sky-profiles/${profile.user_id}`}
							>
								{profile.icon ? (
									<div
										aria-label={`Icon of ${profile.name}.`}
										className="w-8 h-8 rounded-full bg-cover bg-center shrink-0"
										role="img"
										style={{
											backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${profile.user_id}/${profile.icon.startsWith("a_") ? `${profile.icon}.gif` : `${profile.icon}.webp`})`,
										}}
									/>
								) : (
									<div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium shrink-0">
										{profile.name?.charAt(0).toUpperCase() ?? "?"}
									</div>
								)}
								<span className="text-sm font-medium truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
									{profile.name}
								</span>
							</Link>
						))}
					</div>
				</section>
			)}

			<section>
				<h2>Wiki</h2>
				<p className="text-gray-600 dark:text-gray-400">
					{APPLICATION_NAME} features over 1,000 assets sourced directly from the
					community-maintained{" "}
					<a
						className="regular-link inline-flex items-center"
						href={WIKI_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						Sky: Children of the Light wiki
						<ExternalLinkIcon className="ml-1 w-4 h-4" />
					</a>
					. We're thankful for them!
				</p>
			</section>
		</div>
	);
}
