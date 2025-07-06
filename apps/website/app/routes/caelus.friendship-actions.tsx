import { useLoaderData } from "@remix-run/react";
import { ExternalLink, Send } from "lucide-react";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { friendshipActionGIFs } from "~/utility/functions.js";

const REQUIREMENTS = [
	"Recorded on a device with native screen recording (iOS, macOS, etc.) to ensure elements are not visible",
	"Recorded in the highest definition mode possible",
	"Must be an aspect ratio of 1:1",
	"Must not exceed 512x512",
	"Must not exceed 5 MB",
	"Must not have noticeable compression",
] as const;

export const loader = () => ({ gifs: friendshipActionGIFs() });

export default function FriendshipActions() {
	const { gifs } = useLoaderData<typeof loader>();

	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 right-10 w-20 h-20 bg-pink-200/20 dark:bg-pink-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute bottom-20 left-10 w-32 h-32 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>
			<div className="relative z-10">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full mb-4">
						<div
							className="w-8 h-8 bg-cover bg-center"
							style={{ backgroundImage: "url(https://cdn.thatskyapplication.com/icons/hug.png)" }}
							aria-label="Hug icon"
						/>
					</div>
					<h1 className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
						Friendship Actions
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Express yourself with the same friendship actions from Sky!
					</p>
				</div>
				<hr className="my-8" />
				<div className="mb-6">
					<h2>Commands</h2>
					<ul className="list-disc pl-5 space-y-1">
						<li>
							<code>/hair-tousle</code>
						</li>
						<li>
							<code>/high-five</code>
						</li>
						<li>
							<code>/hug</code>
						</li>
						<li>
							<code>/play-fight</code>
						</li>
					</ul>
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						There is also a <code>/krill</code> command for those who deserve it!
					</p>
				</div>
				<div className="mb-12">
					<h2>Community GIFs</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{gifs.map((gif) => (
							<div
								key={gif}
								className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
							>
								<div
									className="w-full aspect-square bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
									style={{ backgroundImage: `url(${gif})` }}
									aria-label="Friendship action GIF"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-2xl p-8">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
							<Send className="w-8 h-8 text-white" />
						</div>
						<h2>Submit Your GIF!</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Love what you see? These were all created by our amazing community! You can contribute
							your own GIF too!
						</p>
					</div>
					<div className="mb-8">
						<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
							Requirements
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{REQUIREMENTS.map((requirement) => (
								<div
									key={requirement}
									className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm"
								>
									<div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
									<p className="text-sm text-gray-700 dark:text-gray-300">{requirement}</p>
								</div>
							))}
						</div>
					</div>
					<div className="text-center">
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							Once you've ensured your GIF meets the requirements, head over to our support server
							and mention a developer!
						</p>
						<a
							href={INVITE_SUPPORT_SERVER_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<ExternalLink className="w-5 h-5" />
							Join Support Server
						</a>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
							You may also mention a developer with a raw video and we'll try our best!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
