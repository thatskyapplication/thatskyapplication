import { Link } from "@remix-run/react";
import InfoBox from "~/components/InfoBox";
import Video from "~/components/Video";
import { APPLICATION_NAME } from "~/utility/constants";

export default function DailyGuides() {
	return (
		<div className="relative min-h-screen">
			<div
				className="absolute inset-0 bg-cover bg-top filter blur-[5px] transition-all duration-500"
				style={{
					backgroundImage:
						'url("https://cdn.thatskyapplication.com/assets/daily_guides_light.webp")',
				}}
			/>
			<div
				className="absolute inset-0 bg-cover bg-top filter blur-[5px] transition-all duration-500 dark:block hidden"
				style={{
					backgroundImage:
						'url("https://cdn.thatskyapplication.com/assets/daily_guides_dark.webp")',
				}}
			/>
			<div className="relative z-10 flex items-center justify-center lg:px-4 px-2 py-8">
				<div className="bg-sky-100/50 dark:bg-gray-800/50 lg:p-8 p-4 rounded-lg shadow-lg w-full">
					<h1>Daily guides</h1>
					<hr />
					<p>
						Daily guides in Sky delivered to your server. Guess what?{" "}
						<Link to="/daily-guides" className="regular-link">
							In your browser too.
						</Link>
					</p>
					<InfoBox>
						Ensure {APPLICATION_NAME} is added to a server! By default, the required permission for
						this command is <code>Manage Server</code>.
					</InfoBox>
					<h2>Setting up daily guides</h2>
					<p>
						You'll need a channel to send notifications in. Then, use{" "}
						<code>/daily-guides setup</code>!
					</p>
					<Video src="https://cdn.thatskyapplication.com/examples/daily_guides_setup.mp4" />
					<p>
						The date, message, quests, treasure candles, seasonal candles (and calculations), shard
						eruption, season dates, and event dates are all shown. Amazing!
					</p>
					<h2>Do I have daily guides set up?</h2>
					<p>
						Have daily guides suddenly stopped working? It could be that permissions in your server
						changed or someone stopped the daily guides. Use <code>/daily-guides status</code> to
						see the status.
					</p>
					<img
						src="https://cdn.thatskyapplication.com/examples/daily_guides_status.webp"
						alt="Showing the status of daily guides."
						className="w-full max-w-lg rounded-md shadow-md"
					/>
					<h2>What will it look like?</h2>
					<p>
						When you first set up daily guides, you might wonder when the next day's will come. The
						answer is obvious: the next day! That's 00:00, in case you <i>really</i> needed that
						clarity.
					</p>
					<InfoBox>
						Daily guides are distributed at 00:00, but the daily message and the daily quests need
						manual input. You can expect these to appear between 0-30 minutes.
					</InfoBox>
					<img
						src="https://cdn.thatskyapplication.com/examples/daily_guides_example.webp"
						alt="Example of daily guides in a channel."
						className="w-full max-w-lg rounded-md shadow-md"
					/>
					<p>
						The time zone in this image is GMT+00:00, which is why the daily guides appeared at
						08:00 (Sky is 8 or 7 hours behind, depending on daylight savings).
					</p>
					<p>You can also see an example of what shard eruptions look like here!</p>
					<h2>Removing daily guides</h2>
					<p>
						No longer want daily guides? That's what <code>/daily-guides unset</code> is for. Easy!
					</p>
				</div>
			</div>
		</div>
	);
}
