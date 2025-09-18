import { DiscordAPIError } from "@discordjs/rest";
import { ArrowLeft } from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { Link, redirect, useLoaderData } from "react-router";
import pino from "~/pino";
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

		return { guild };
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
	const { guild } = useLoaderData<typeof loader>();

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
							</div>
						</div>

						<hr className="my-8" />
						<img
							alt="This is pain. No Spain. Just pain."
							src="https://media1.tenor.com/m/g02Xs9DcGt0AAAAd/piddel-piddel-meme.gif"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
