import { Upload } from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { Link } from "react-router";
import { SitePage } from "~/components/PageLayout";
import { requireAdminAccess } from "~/utility/functions.server.js";

export const loader = async ({ request }: LoaderFunctionArgs) => requireAdminAccess(request);

export default function Admin() {
	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<div>
					<h1>Admin</h1>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Link
						className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-4 flex items-center gap-4 w-full sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
						to="/admin/friendship-actions"
					>
						<div className="inline-flex rounded-lg border border-gray-200 bg-white p-3 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<Upload className="h-5 w-5" />
						</div>
						<div>
							<h2 className="my-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								Upload friendship actions
							</h2>
						</div>
					</Link>
				</div>
			</div>
		</SitePage>
	);
}
