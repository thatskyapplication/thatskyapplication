import { Gift, Heart, History, Users } from "lucide-react";
import { APPLICATION_NAME } from "~/utility/constants.js";

export default function Hearts() {
	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 right-10 w-20 h-20 bg-pink-200/20 dark:bg-pink-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute bottom-20 left-10 w-32 h-32 bg-red-200/20 dark:bg-red-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>
			<div className="relative z-10">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 rounded-full mb-4">
						<Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
					</div>
					<h1 className="bg-gradient-to-r from-pink-600 via-red-600 to-rose-600 dark:from-pink-400 dark:via-red-400 dark:to-rose-400 bg-clip-text text-transparent">
						Hearts
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Share the love with your friends!
					</p>
				</div>
				<hr className="my-8" />
				<section className="space-y-6">
					<h2>Gifting hearts</h2>
					<p>There are two ways to gift hearts.</p>
					<div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-700/50 rounded-xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
								<Gift className="w-6 h-6 text-pink-600 dark:text-pink-400" />
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-0">
								How to gift hearts
							</h3>
						</div>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Slash command</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
									Use the chat input command to gift hearts directly:
								</p>
								<code>/heart gift</code>
							</div>
							<div>
								<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
									User context menu command
								</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
									Right-click any user and select "Gift Heart":
								</p>
								<img
									src="https://cdn.thatskyapplication.com/assets/gift_heart_example.webp"
									alt="Showing how to gift hearts via the context menu"
									className="w-full max-w-sm rounded-md shadow-md border border-gray-200 dark:border-gray-600"
								/>
							</div>
						</div>
						<div className="mt-4 space-y-3">
							<div className="bg-pink-100 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-lg p-3">
								<p className="text-pink-800 dark:text-pink-300 text-sm m-0 flex items-center gap-2">
									<Heart className="w-4 h-4" />
									<strong>Daily Limit:</strong> You can gift up to 3 hearts per day.
								</p>
							</div>
							<div className="bg-pink-100 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-lg p-3">
								<p className="text-pink-800 dark:text-pink-300 text-sm m-0 flex items-center gap-2">
									<Heart className="w-4 h-4" />
									<strong>Double Hearts:</strong> Double hearts in Sky affect {APPLICATION_NAME}!
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="space-y-6">
					<h2>Viewing a history of your hearts</h2>
					<p>
						Ever wanted to see your gifted and received hearts? You can invoke the{" "}
						<code>/heart history</code> command!
					</p>
					<div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700/50 rounded-xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
								<History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-0">
								Heart history features
							</h3>
						</div>
						<div className="grid md:grid-cols-3 gap-4 mb-6">
							<div className="text-center">
								<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
									<Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
								</div>
								<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Hearts Gifted</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									See how many hearts you've given
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
									<Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
								</div>
								<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
									Hearts Received
								</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Track hearts you've received
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
									<Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
								</div>
								<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
									Browse History
								</h4>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Navigate through your heart exchanges
								</p>
							</div>
						</div>
						<img
							src="https://cdn.thatskyapplication.com/assets/heart_history_example.webp"
							alt="Showing the history of hearts with total counts and navigation"
							className="w-full max-w-lg rounded-md shadow-md border border-gray-200 dark:border-gray-600 mx-auto"
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
