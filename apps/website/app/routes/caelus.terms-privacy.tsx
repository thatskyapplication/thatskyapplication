import { clsx } from "clsx";
import { SitePage } from "~/components/PageLayout";
import { APPLICATION_NAME } from "~/utility/constants";
import { MAJOR_HEADING_CLASS, PAGE_TITLE_CLASS } from "~/utility/styles.js";

export default function TermsPrivacy() {
	return (
		<SitePage>
			<div className="container mx-auto max-w-2xl space-y-4">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6")}>Terms & privacy</h1>
				<p className="text-gray-500 dark:text-gray-400">
					This is a Discord application, so we'll keep it short.
				</p>
				<hr />

				<h2 className={MAJOR_HEADING_CLASS}>Your data</h2>
				<p>
					Data you give to {APPLICATION_NAME} is stored indefinitely. This includes user ids, server
					ids, and Sky profile content. None of it is shared with third parties.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Reports</h2>
				<p>
					Reporting a Sky profile records the reason you give, your user id, and the user id of the
					person reported. A copy of their Sky profile icon and banner is kept for 90 days so it can
					be reviewed.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Deleting your data</h2>
				<p>
					Use the <code>/data delete</code> command.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Use</h2>
				<p>
					Use involves a Discord application called {APPLICATION_NAME}. By engaging with this
					service, you agree to these terms.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Changes</h2>
				<p>
					These terms may be amended at any time. Continued use will signify acceptance of the
					changes. If you no longer wish to be bound by these changes, you may stop using the
					service and delete your data.
				</p>

				<h2 className={MAJOR_HEADING_CLASS}>Contact</h2>
				<p>You may contact Jiralite in the support server.</p>
			</div>
		</SitePage>
	);
}
