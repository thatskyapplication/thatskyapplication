import { SiDiscord } from "@icons-pack/react-simple-icons";
import { ArrowLeft } from "lucide-react";
import { Link, redirect } from "react-router";
import { SitePage } from "~/components/PageLayout";
import { caelusInGuild } from "~/utility/caelus.server.js";
import { APPLICATION_NAME, INVITE_APPLICATION_URL } from "~/utility/constants.js";
import { guildIconURL } from "~/utility/functions.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { requireUserAdminGuilds } from "~/utility/guilds.server.js";
import type { Route } from "./+types/caelus.dashboard.$guildId._index.js";

export const loader = async ({ context, params, request, url }: Route.LoaderArgs) => {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });
	const { guildId } = params;
	const oAuthGuilds = await requireUserAdminGuilds(discordUser.id, url);
	const oAuthGuild = oAuthGuilds.find((oAuthGuild) => oAuthGuild.id === guildId);

	if (!oAuthGuild) {
		return redirect("/caelus/dashboard");
	}

	return { guild: oAuthGuild, meInGuild: await caelusInGuild(oAuthGuild.id) };
};

export default function ServerDashboard({ loaderData }: Route.ComponentProps) {
	const { guild, meInGuild } = loaderData;

	return (
		<SitePage>
			<div className="container mx-auto max-w-7xl">
				<div className="rounded-xl border border-gray-200 bg-white p-8 shadow-xs dark:border-gray-700 dark:bg-gray-800">
					<div className="relative overflow-hidden">
						<div className="relative z-10">
							<div className="mb-8 flex items-center justify-between">
								<Link
									className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
									to="/caelus/dashboard"
								>
									<ArrowLeft className="h-4 w-4" />
									Back
								</Link>
							</div>

							<div className="mb-8 flex items-center gap-4">
								{guild.icon ? (
									<div
										aria-label={`${guild.name} icon.`}
										className="h-16 w-16 rounded-full bg-cover bg-center"
										role="img"
										style={{ backgroundImage: `url(${guildIconURL(guild.id, guild.icon)})` }}
									/>
								) : (
									<div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-linear-to-br from-blue-500 to-purple-600 text-xl font-bold text-white dark:border-gray-600">
										{guild.name[0]!.toUpperCase()}
									</div>
								)}
								<div>
									<h1 className="mb-2">{guild.name}</h1>
								</div>
							</div>

							{meInGuild ? null : (
								<div className="mt-12 flex flex-col items-center justify-center">
									<p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
										{APPLICATION_NAME} is not in this server. Why not spread the love?
									</p>
									<a
										className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600 px-6 py-3 text-white shadow-lg transition-shadow hover:shadow-xl"
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
		</SitePage>
	);
}
