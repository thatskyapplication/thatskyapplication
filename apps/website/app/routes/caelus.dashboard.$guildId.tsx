import { DiscordAPIError } from "@discordjs/rest";
import { ArrowLeft } from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { Link, redirect, useLoaderData } from "react-router";
import pino from "~/pino";
import { getCaelusGuildData } from "~/utility/caelus.server.js";
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

		const caelusGuildData = await getCaelusGuildData(guildId);
		return { guild, caelusGuildData };
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
	const { guild, caelusGuildData } = useLoaderData<typeof loader>();

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
								<img
									alt={`${guild.name} icon.`}
									className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600"
									src={guildIconURL(guild.id, guild.icon)}
								/>
							) : (
								<div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-gray-200 dark:border-gray-600">
									{guild.name[0]!.toUpperCase()}
								</div>
							)}
							<div>
								<h1 className="mb-2">{guild.name}</h1>
								{caelusGuildData && (
									<div className="flex items-center gap-2">
										<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
											<span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400" />
											Caelus Active
										</span>
										<span className="text-sm text-gray-600 dark:text-gray-400">
											{JSON.stringify(caelusGuildData)}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
