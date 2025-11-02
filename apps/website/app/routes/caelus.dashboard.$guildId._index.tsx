import { DiscordAPIError } from "@discordjs/rest";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { ArrowLeft, Clock } from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { Link, redirect, useLoaderData } from "react-router";
import pino from "~/pino";
import { caelusInGuild } from "~/utility/caelus.server.js";
import { APPLICATION_NAME, INVITE_APPLICATION_URL } from "~/utility/constants.js";
import { guildIconURL } from "~/utility/functions.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { getUserAdminGuilds } from "~/utility/guilds.server.js";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const { discordUser, tokenExchange } = await requireDiscordAuthentication(request);
	const { guildId } = params;

	if (!guildId) {
		throw new Response(null, { status: 400 });
	}

	try {
		const guilds = await getUserAdminGuilds(discordUser, tokenExchange);
		const guild = guilds.find((guild) => guild.id === guildId);

		if (!guild) {
			return redirect("/caelus/dashboard");
		}

		return { guild, meInGuild: await caelusInGuild(guild.id) };
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 401) {
			const returnTo = encodeURIComponent(request.url);
			return redirect(`/login?returnTo=${returnTo}`);
		}

		pino.error({ request, error }, "Failed to load user guilds.");
		throw new Response(null, { status: 500 });
	}
};

export default function ServerDashboard() {
	const { guild, meInGuild } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xs p-8">
				<div className="relative overflow-hidden">
					<div className="relative z-10">
						<div className="flex items-center justify-between mb-8">
							<Link
								className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								to="/caelus/dashboard"
							>
								<ArrowLeft className="w-4 h-4" />
								Back
							</Link>
						</div>

						<div className="flex items-center gap-4 mb-8">
							{guild.icon ? (
								<div
									aria-label={`${guild.name} icon.`}
									className="w-16 h-16 bg-cover bg-center rounded-full"
									role="img"
									style={{ backgroundImage: `url(${guildIconURL(guild.id, guild.icon)})` }}
								/>
							) : (
								<div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-gray-200 dark:border-gray-600">
									{guild.name[0]!.toUpperCase()}
								</div>
							)}
							<div>
								<h1 className="mb-2">{guild.name}</h1>
							</div>
						</div>

						{meInGuild ? (
							<div className="mt-8">
								<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
									Settings
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Link
										className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
										to={`/caelus/dashboard/${guild.id}/daily-guides`}
									>
										<div className="flex items-center gap-3 mb-2">
											<Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
											<h3 className="font-semibold text-gray-900 dark:text-gray-100">
												Daily Guides
											</h3>
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
											Have daily guides delivered to your server.
										</p>
									</Link>
								</div>
							</div>
						) : (
							<div className="mt-12 flex flex-col items-center justify-center">
								<p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
									{APPLICATION_NAME} is not in this server. Why not spread the love?
								</p>
								<a
									className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
									href={INVITE_APPLICATION_URL}
									rel="noopener noreferrer"
									target="_blank"
								>
									<SiDiscord className="h-5 w-5 text-white" />
									<span className="font-medium">Invite {APPLICATION_NAME}</span>
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
