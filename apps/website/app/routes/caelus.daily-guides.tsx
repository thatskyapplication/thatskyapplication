import { Link } from "@remix-run/react";
import { ChevronDown, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import InfoBox from "~/components/InfoBox";
import { APPLICATION_NAME } from "~/utility/constants";

export default function DailyGuides() {
	const [permissionsExpanded, setPermissionsExpanded] = useState(false);

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
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-4">
						<Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
					</div>
					<h1 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
						Daily Guides
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Automated daily guides delivered straight to your Discord server!
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
						Guess what?{" "}
						<Link to="/daily-guides" className="regular-link">
							In your browser too!
						</Link>
					</p>
				</div>
				<hr className="my-8" />
				<div className="my-4">
					<button
						type="button"
						onClick={() => setPermissionsExpanded(!permissionsExpanded)}
						className="flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
					>
						{permissionsExpanded ? (
							<ChevronDown className="w-4 h-4" />
						) : (
							<ChevronRight className="w-4 h-4" />
						)}
						<span className="text-sm font-medium">Permissions</span>
					</button>
					{permissionsExpanded && (
						<div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-amber-700 dark:text-amber-300 text-sm">
										<strong>You:</strong> <code>Manage Server</code>
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-amber-700 dark:text-amber-300 text-sm">
										<strong>{APPLICATION_NAME}:</strong> <code>Send Messages</code>{" "}
										<code>View Channel</code>
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
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
					src="https://cdn.thatskyapplication.com/assets/daily_guides_example.webp"
					alt="Example of daily guides message in Discord showing quest information, treasure candles, seasonal details, and shard eruption data"
					className="w-full max-w-lg rounded-md shadow-md"
				/>
				<p>
					The time zone in this image is GMT+01:00, which is why the timestamp states 08:00 (Sky is
					8 or 7 hours behind, depending on daylight savings).
				</p>
				<p>You can also see an example of what shard eruptions look like here!</p>
			</div>
			<h2>Seeing daily guides ad hoc</h2>
			<p>
				You can view daily guides at any time by using the <code>/daily-guides</code> command. This
				will respond ephemerally to not interrupt any ongoing conversation.
			</p>
		</div>
	);
}
