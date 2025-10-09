import { APPLICATION_NAME } from "~/utility/constants";

export default function TermsPrivacy() {
	return (
		<div>
			<h1>Terms of Service & Privacy Policy</h1>
			<hr />
			<p>Let's be real. This is a Discord application, so we'll keep it short.</p>
			<h2>Terminology</h2>
			<p>
				The term "server moderator" applies to those with the <code>Manage Server</code> permission.
			</p>
			<h2>Use</h2>
			<p>
				Use involves a Discord application called {APPLICATION_NAME}. By engaging with this service,
				you agree to the terms of service and privacy policy.
			</p>
			<h2>What data is stored?</h2>
			<p>Data you give to {APPLICATION_NAME} is stored indefinitely:</p>
			<ul className="list-disc pl-5 space-y-1">
				<li>User ids (catalogue, hearts, etc.).</li>
				<li>Server ids (notifications, daily guides, etc.).</li>
				<li>Content in Sky profiles.</li>
			</ul>
			<p>
				The AI of {APPLICATION_NAME} does <strong>not</strong> store any data.
			</p>
			<h2>What data is shared?</h2>
			<p>
				OpenAI's API is utilised to generate random responses. Message content provided is sent to
				OpenAI as context. This setting may be turned off by server moderators and as such, no data
				would be shared.
			</p>
			<p>No other data is shared.</p>
			<h2>How can I delete my data?</h2>
			<p>
				Use the <code>/data delete</code> command. If you do not wish to use this command, please
				see the contact information on this page.
			</p>
			<h2>Changes to the terms of service and privacy policy</h2>
			<p>
				The terms of service and privacy policy may be amended at any time. Continued use will
				signify acceptance of the changes. If you no longer wish to be bound by these changes, you
				may stop using the service. You may also request a deletion of your data.
			</p>
			<h2>Contact</h2>
			<p>You may contact Jiralite found in the support server.</p>
		</div>
	);
}
