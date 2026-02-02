import { APPLICATION_NAME } from "~/utility/constants";

export default function TermsPrivacy() {
	return (
		<div className="container mx-auto px-4 max-w-2xl py-12">
			<h1>Terms & Privacy</h1>
			<p className="text-gray-500 dark:text-gray-400">
				This is a Discord application, so we'll keep it short.
			</p>
			<hr />

			<h2>Your data</h2>
			<p>
				Data you give to {APPLICATION_NAME} is stored indefinitely. This includes user ids, server
				ids, and Sky profile content. None of it is shared with third parties.
			</p>

			<h2>Deleting your data</h2>
			<p>
				Use the <code>/data delete</code> command.
			</p>

			<h2>Use</h2>
			<p>
				Use involves a Discord application called {APPLICATION_NAME}. By engaging with this service,
				you agree to these terms.
			</p>

			<h2>Changes</h2>
			<p>
				These terms may be amended at any time. Continued use will signify acceptance of the
				changes. If you no longer wish to be bound by these changes, you may stop using the service
				and delete your data.
			</p>

			<h2>Contact</h2>
			<p>You may contact Jiralite in the support server.</p>
		</div>
	);
}
