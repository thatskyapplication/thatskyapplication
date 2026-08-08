import { SitePage } from "~/components/PageLayout";
import { guildIconURL } from "~/utility/functions.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { requireUserAdminGuilds } from "~/utility/guilds.server.js";
import type { Route } from "./+types/caelus.dashboard._index.js";

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });
	return requireUserAdminGuilds(discordUser.id, url);
};

export default function Dashboard({ loaderData }: Route.ComponentProps) {
	const guilds = loaderData;

	return (
		<SitePage>
			<div className="container mx-auto max-w-7xl">
				<div className="rounded-xl border border-gray-200 bg-white p-8 shadow-xs dark:border-gray-700 dark:bg-gray-800">
					<div className="relative overflow-hidden">
						<div className="pointer-events-none absolute inset-0 overflow-hidden">
							<div className="absolute top-10 right-10 h-20 w-20 animate-pulse rounded-full bg-blue-200/20 blur-xl dark:bg-blue-400/10" />
							<div
								className="absolute bottom-20 left-10 h-32 w-32 animate-pulse rounded-full bg-purple-200/20 blur-xl dark:bg-purple-400/10"
								style={{ animationDelay: "1.5s" }}
							/>
						</div>
						<div className="relative z-10">
							<div className="mb-8 text-center">
								<h1 className="mb-1 text-4xl font-bold text-gray-900 dark:text-gray-100">
									Dashboard
								</h1>
							</div>
							<hr className="my-8" />
							{guilds.length === 0 ? (
								<div className="py-12 text-center">
									<h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
										No servers found.
									</h2>
									<p className="text-gray-600 dark:text-gray-400">
										Keep in mind you need the <code>Administrator</code> permission to use this
										dashboard.
									</p>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{guilds.map((guild) => (
										<article
											className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
											key={guild.id}
										>
											<div className="mb-4 flex items-center gap-4">
												{guild.icon ? (
													<div
														aria-label={`${guild.name} icon.`}
														className="h-12 w-12 rounded-full bg-cover bg-center"
														role="img"
														style={{
															backgroundImage: `url(${guildIconURL(guild.id, guild.icon)})`,
														}}
													/>
												) : (
													<div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 font-semibold text-white">
														{guild.name[0]!.toUpperCase()}
													</div>
												)}
												<div className="min-w-0 flex-1">
													<h3 className="truncate font-semibold text-gray-900 dark:text-gray-100">
														{guild.name}
													</h3>
												</div>
											</div>
										</article>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</SitePage>
	);
}
