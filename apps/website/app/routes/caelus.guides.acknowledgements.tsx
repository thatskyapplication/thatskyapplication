import {
	FRIENDSHIP_ACTIONS_CONTRIBUTORS_ARRAY,
	type SkyProfilePacket,
	Table,
} from "@thatskyapplication/utility";
import { ExternalLinkIcon, Heart } from "lucide-react";
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
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 right-10 w-20 h-20 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute bottom-20 left-10 w-32 h-32 bg-pink-200/20 dark:bg-pink-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>
			<div className="relative z-10">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
						<Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
					</div>
					<h1 className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
						Acknowledgements
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Celebrating the wonderful community that makes {APPLICATION_NAME} possible.
					</p>
				</div>
				<hr className="my-8" />
				{skyProfilePackets.length > 0 && (
					<section className="space-y-6 mb-6">
						<div className="bg-linear-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-700/50 rounded-xl p-8">
							<h2 className="mt-0">Friendship actions contributors</h2>
							<p className="text-gray-700 dark:text-gray-300 mb-6">
								These wonderful people have contributed to{" "}
								<a
									className="regular-link inline-flex items-center"
									href="https://guide.thatskyapplication.com/caelus/friendship-actions"
									rel="noopener noreferrer"
									target="_blank"
								>
									friendship actions
									<ExternalLinkIcon className="ml-1 w-4 h-4" />
								</a>{" "}
								for everyone to enjoy!
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{skyProfilePackets.map((profile) => (
									<Link
										className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-xs rounded-lg p-4 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105 hover:shadow-md border border-pink-200/50 dark:border-pink-700/30"
										key={profile.user_id}
										to={`/sky-profiles/${profile.user_id}`}
									>
										<div className="flex items-center gap-3">
											{profile.icon ? (
												<div
													aria-label={`Icon of ${profile.name}.`}
													className="w-10 h-10 rounded-full border-2 border-pink-200 dark:border-pink-700 bg-cover bg-center"
													role="img"
													style={{
														backgroundImage: `url(https://cdn.thatskyapplication.com/sky_profiles/icons/${profile.user_id}/${profile.icon.startsWith("a_") ? `${profile.icon}.gif` : `${profile.icon}.webp`})`,
													}}
												/>
											) : (
												<div className="w-10 h-10 bg-linear-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
													{profile.name?.charAt(0).toUpperCase() ?? "?"}
												</div>
											)}
											<div className="flex-1 min-w-0">
												<p className="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
													{profile.name}
												</p>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</section>
				)}
				<section>
					<div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-8">
						<h2 className="mt-0 mb-6">Wiki</h2>
						<p className="text-gray-700 dark:text-gray-300 mb-0">
							{APPLICATION_NAME} features over 1,000 assets sourced directly from the
							community-maintained{" "}
							<a
								className="regular-link inline-flex items-center transition duration-200"
								href={WIKI_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								Sky: Children of the Light wiki
								<ExternalLinkIcon className="ml-1 w-4 h-4" />
							</a>
							. We're thankful for them!
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
