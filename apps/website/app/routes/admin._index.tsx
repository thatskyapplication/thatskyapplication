import { Flag, Ticket, Upload } from "lucide-react";
import { Link } from "react-router";
import { SitePage } from "~/components/PageLayout";
import { requireAdminAccess } from "~/utility/functions.server.js";
import type { Route } from "./+types/admin._index.js";

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	await requireAdminAccess({ context, request, url });
	return null;
};

export default function Admin() {
	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<div>
					<h1>Admin</h1>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Link
						className="flex w-full items-center gap-4 rounded-lg bg-gray-100 p-4 shadow-md transition-transform duration-200 hover:bg-gray-100/50 hover:shadow-lg sm:hover:translate-y-0 lg:hover:-translate-y-2 dark:bg-gray-900 dark:hover:bg-gray-900/50"
						to="/admin/friendship-actions"
					>
						<div className="inline-flex rounded-lg border border-gray-200 bg-white p-3 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<Upload className="h-5 w-5" />
						</div>
						<div>
							<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								Friendship actions
							</h2>
						</div>
					</Link>

					<Link
						className="flex w-full items-center gap-4 rounded-lg bg-gray-100 p-4 shadow-md transition-transform duration-200 hover:bg-gray-100/50 hover:shadow-lg sm:hover:translate-y-0 lg:hover:-translate-y-2 dark:bg-gray-900 dark:hover:bg-gray-900/50"
						to="/admin/sky-profile-reports"
					>
						<div className="inline-flex rounded-lg border border-gray-200 bg-white p-3 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<Flag className="h-5 w-5" />
						</div>
						<div>
							<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								Sky profile reports
							</h2>
						</div>
					</Link>

					<Link
						className="flex w-full items-center gap-4 rounded-lg bg-gray-100 p-4 shadow-md transition-transform duration-200 hover:bg-gray-100/50 hover:shadow-lg sm:hover:translate-y-0 lg:hover:-translate-y-2 dark:bg-gray-900 dark:hover:bg-gray-900/50"
						to="/admin/support-server-invites"
					>
						<div className="inline-flex rounded-lg border border-gray-200 bg-white p-3 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<Ticket className="h-5 w-5" />
						</div>
						<div>
							<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								Support server invites
							</h2>
						</div>
					</Link>
				</div>
			</div>
		</SitePage>
	);
}
