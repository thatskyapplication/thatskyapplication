import { Clock, ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";
import InfoBox from "~/components/InfoBox";
import Permissions from "~/components/Permissions";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants.js";

export default function DailyGuides() {
	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 right-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute bottom-20 left-10 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>
			<div className="relative z-10">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-4">
						<Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
					</div>
					<h1 className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
						Daily Guides
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Automated daily guides delivered straight to your Discord server!
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
						Guess what?{" "}
						<Link className="regular-link" to="/daily-guides">
							In your browser too!
						</Link>
					</p>
				</div>
				<hr className="my-8" />
				<Permissions
					appPermissions={["Send Messages", "View Channel"]}
					userPermissions={["Manage Server"]}
				/>
				<h2>Setting up daily guides</h2>
				<p>
					Use <code>/configure daily-guides</code>. That's all.
				</p>
				<h2>What will it look like?</h2>
				<p>
					Daily guides are automatically posted at 00:00 PT every day. When you first set up daily
					guides, you might wonder when the next day's will come. The answer is obvious: the next
					day! That's 00:00, in case you <i>really</i> needed that clarity.
				</p>
				<InfoBox>
					Daily guides are distributed at 00:00, but the daily quests need manual input. You can
					expect them to appear between 0-30 minutes.
				</InfoBox>
				<img
					alt="Example of daily guides message in Discord showing quest information, treasure candles, seasonal details, and shard eruption data"
					className="w-full max-w-lg rounded-md shadow-md"
					src="https://cdn.thatskyapplication.com/assets/daily_guides_example.webp"
				/>
				<p>
					The time zone in this image is UTC+00:00, which is why the timestamp states 08:00 (Sky is
					8 or 7 hours behind, depending on daylight savings).
				</p>
				<p>You can also see an example of what shard eruptions look like here!</p>
			</div>
			<h2>Seeing daily guides ad hoc</h2>
			<p>
				You can view daily guides at any time by using the <code>/daily-guides</code> command. This
				will respond ephemerally to not interrupt any ongoing conversation.
			</p>
			<h2>I want to help set daily guides!</h2>
			<p>
				As mentioned above, daily quests need manual input. Anyone in the{" "}
				<a
					className="regular-link inline-flex items-center transition duration-200"
					href={INVITE_SUPPORT_SERVER_URL}
					rel="noopener noreferrer"
					target="_blank"
				>
					support server
					<ExternalLinkIcon className="ml-1 w-4 h-4" />
				</a>{" "}
				can update the daily quests! Please read the documentation in the server or ask around for
				help!
			</p>
		</div>
	);
}
