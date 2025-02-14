import { ExternalLinkIcon } from "lucide-react";
import TopBar from "~/components/TopBar";
import Video from "~/components/Video";
import { APPLICATION_NAME } from "~/utility/constants";

export default function ThatSkyLink() {
	return (
		<div className="min-h-screen px-4 w-full max-w-6xl mx-auto">
			<TopBar />
			<h1 className="text-center pt-20">thatskylink</h1>
			<hr />
			<div className="bg-gray-100 dark:bg-gray-900 p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg mt-8 text-lg">
				<section>
					<h2 className="mt-0">What is thatskylink?</h2>
					<p>
						<a
							href="https://thatsky.link"
							target="_blank"
							rel="noopener noreferrer"
							className="regular-link inline-flex items-center transition duration-200"
						>
							https://thatsky.link
							<ExternalLinkIcon className="ml-1 w-4 h-4" />
						</a>{" "}
						is a link redirector. Simply put? It makes long links short and memorable. A good
						coincidence of this is that the complete list of redirects serves as a hub for useful
						Sky links.
					</p>
				</section>
				<section>
					<h2>How does thatskylink work?</h2>
					<div className="flex items-center justify-center">
						<Video src="https://cdn.thatskyapplication.com/assets/thatskylink.mp4" />
					</div>
					<p>
						Visit{" "}
						<a
							href="https://thatsky.link"
							target="_blank"
							rel="noopener noreferrer"
							className="regular-link inline-flex items-center transition duration-200"
						>
							https://thatsky.link
							<ExternalLinkIcon className="ml-1 w-4 h-4" />
						</a>{" "}
						to be taken to the GitHub where the code lives. You'll see a list of redirects! In the
						video, "dailies", "merch", and "p0276" were showcased.
					</p>
					<p>
						If we did not type out{" "}
						<a
							href="https://thatsky.link/p0276"
							target="_blank"
							rel="noopener noreferrer"
							className="regular-link inline-flex items-center transition duration-200"
						>
							https://thatsky.link/p0276
							<ExternalLinkIcon className="ml-1 w-4 h-4" />
						</a>
						, we would have to search it up or, for some reason, memorise a link over 170
						characters. What would you rather type out? If you haven't figured it out already, "p"
						with the version number takes you to the respective version's patch notes.
					</p>
					<p>
						If you're here, you very likely are already using thatskylink without realising it. For
						example, patch notes in {APPLICATION_NAME} in the catalogue use thatskylink.
					</p>
				</section>
				<section>
					<h2>Can anyone add a redirect to thatskylink?</h2>
					<p>
						Within reason. Links can include well-known community-driven content, such as the{" "}
						<a
							href="https://thatsky.link/wiki"
							target="_blank"
							rel="noopener noreferrer"
							className="regular-link inline-flex items-center transition duration-200"
						>
							wiki
							<ExternalLinkIcon className="ml-1 w-4 h-4" />
						</a>
						. Personal blogs, personal social media accounts, etc. may not be supported. Reach out
						to us if you have an idea of something to add!
					</p>
				</section>
			</div>
		</div>
	);
}
