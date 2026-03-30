import { type SkyProfilePacket, Table } from "@thatskyapplication/utility";
import { Ellipsis, Users } from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { SitePage } from "~/components/PageLayout";
import pg from "~/pg.server";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);

	const skyProfile = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name")
		.where({ user_id: discordUser.id })
		.first();

	return { discordUser, skyProfile };
};

export default function Me() {
	const { discordUser, skyProfile } = useLoaderData<typeof loader>();
	const displayName = skyProfile?.name ?? discordUser.username;

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<div>
					<h1>Welcome, {displayName}!</h1>
					<p className="mb-0 text-gray-600 dark:text-gray-300">
						You can update things about yourself here!
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Link
						className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-4 flex items-center gap-4 w-full sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
						to="/me/sky-profile"
					>
						<div className="inline-flex rounded-lg border border-gray-200 bg-white p-3 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<Users className="h-5 w-5" />
						</div>
						<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
							Sky profile
						</h2>
					</Link>

					<div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-4 flex items-center gap-4 w-full text-gray-600 dark:text-gray-400">
						<div className="inline-flex rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
							<Ellipsis className="h-5 w-5" />
						</div>
						<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
							More coming soon
						</h2>
					</div>
				</div>
			</div>
		</SitePage>
	);
}
