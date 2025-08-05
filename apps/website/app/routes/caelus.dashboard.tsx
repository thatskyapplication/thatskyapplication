import {
	PermissionFlagsBits,
	type RESTAPIPartialCurrentUserGuild,
	type RESTGetAPICurrentUserGuildsResult,
} from "@discordjs/core/http-only";
import { Server, Settings } from "lucide-react";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { redirect, useLoaderData } from "react-router";
import pino from "~/pino";
import { getSession } from "~/session.server";
import { guildIconURL } from "~/utility/functions.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");
	const accessToken = session.get("access_token");

	if (!(user && accessToken)) {
		const returnTo = encodeURIComponent(request.url);
		return redirect(`/login?returnTo=${returnTo}`);
	}

	try {
		const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 401) {
			const returnTo = encodeURIComponent(request.url);
			return redirect(`/login?returnTo=${returnTo}`);
		}

		if (!response.ok) {
			throw await response.json();
		}

		const guilds = (await response.json()) as RESTGetAPICurrentUserGuildsResult;

		return {
			guilds: guilds.reduce<RESTAPIPartialCurrentUserGuild[]>((guilds, guild) => {
				if (
					(BigInt(guild.permissions) & PermissionFlagsBits.Administrator) ===
					PermissionFlagsBits.Administrator
				) {
					guilds.push(guild);
				}

				return guilds;
			}, []),
		};
	} catch (error) {
		pino.error({ request, error }, "Failed to load dashboard.");
		return { guilds: [], error: true };
	}
};

export default function Dashboard() {
	const { guilds, error } = useLoaderData<typeof loader>();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredGuilds = guilds.filter(
		({ id, name }) =>
			id.includes(searchQuery) || name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8">
				<div className="relative overflow-hidden">
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-10 right-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-xl animate-pulse" />
						<div
							className="absolute bottom-20 left-10 w-32 h-32 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-xl animate-pulse"
							style={{ animationDelay: "1.5s" }}
						/>
					</div>
					<div className="relative z-10">
						<div className="text-center mb-8">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
								<Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
							</div>
							<h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Dashboard
							</h1>
						</div>
						<hr className="my-8" />
						{error && (
							<div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
								<p className="text-sm">Something went wrong. Please report this!</p>
							</div>
						)}
						<div className="mb-6">
							<input
								className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Search servers..."
								type="search"
								value={searchQuery}
							/>
						</div>
						{guilds.length === 0 ? (
							<div className="text-center py-12">
								<Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
									No servers found
								</h2>
								<p className="text-gray-600 dark:text-gray-400">
									You need the <code>Administrator</code> permission to use this dashboard.
								</p>
							</div>
						) : filteredGuilds.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-gray-600 dark:text-gray-400">No servers found.</p>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{filteredGuilds.map((guild) => (
									<div
										className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
										key={guild.id}
									>
										<div className="flex items-center gap-4 mb-4">
											{guild.icon ? (
												<img
													alt={`${guild.name} icon.`}
													className="w-12 h-12 rounded-full"
													src={guildIconURL(guild.id, guild.icon)}
												/>
											) : (
												<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
													{guild.name[0]!.toUpperCase()}
												</div>
											)}
											<div className="flex-1 min-w-0">
												<h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
													{guild.name}
												</h3>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
