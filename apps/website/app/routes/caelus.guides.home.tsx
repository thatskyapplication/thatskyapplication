import { SiDiscord } from "@icons-pack/react-simple-icons";
import { BellIcon, Clock3Icon, Globe, Heart } from "lucide-react";
import { Link } from "react-router";
import { APPLICATION_NAME, CROWDIN_URL, INVITE_APPLICATION_URL } from "~/utility/constants";

export default function Home() {
	return (
		<div className="min-h-[calc(100vh_-_9vh)] relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1s" }}
				/>
				<div
					className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "2s" }}
				/>
			</div>
			<div className="relative z-10 flex flex-col items-center justify-center px-4 py-12">
				<div className="text-center mb-12">
					<div className="relative mb-8 group">
						<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
						<img
							alt={APPLICATION_NAME}
							className="relative w-32 h-32 rounded-full object-cover mx-auto shadow-2xl ring-4 ring-white/50 dark:ring-gray-700/50 group-hover:scale-105 transition-transform duration-300"
							src="/caelus.png"
						/>
					</div>
					<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
						{APPLICATION_NAME}
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
						Your magical companion for Sky: Children of the Light
					</p>
				</div>
				<div className="w-full max-w-4xl">
					<h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
						Popular Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Link
							className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
							to="/caelus/guides/daily-guides"
						>
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl" />
							<div className="relative z-10">
								<div className="mb-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl w-fit backdrop-blur-sm">
									<Clock3Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
								</div>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Daily Guides
								</h3>
								<div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
									Explore dailies →
								</div>
							</div>
						</Link>

						<Link
							className="group relative bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/30 border border-pink-200 dark:border-pink-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
							to="/caelus/guides/hearts"
						>
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full blur-xl" />
							<div className="relative z-10">
								<div className="mb-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl w-fit backdrop-blur-sm">
									<Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
								</div>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Hearts</h3>
								<div className="mt-4 text-pink-600 dark:text-pink-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
									Spread love →
								</div>
							</div>
						</Link>
						<Link
							className="group relative bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/30 border border-amber-200 dark:border-amber-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
							to="/caelus/guides/notifications"
						>
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-xl" />
							<div className="relative z-10">
								<div className="mb-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl w-fit backdrop-blur-sm">
									<BellIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
								</div>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Notifications
								</h3>
								<div className="mt-4 text-amber-600 dark:text-amber-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
									Set alerts →
								</div>
							</div>
						</Link>
						<Link
							className="group relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 border border-green-200 dark:border-green-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
							to="/caelus/guides/friendship-actions"
						>
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-xl" />
							<div className="relative z-10">
								<div className="mb-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl w-fit backdrop-blur-sm">
									<img
										alt="Hug icon"
										className="w-8 h-8"
										src="https://cdn.thatskyapplication.com/icons/hug.png"
									/>
								</div>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Friendship Actions
								</h3>
								<div className="mt-4 text-green-600 dark:text-green-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
									GIFs for all →
								</div>
							</div>
						</Link>
						<Link
							className="group relative bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/30 border border-purple-200 dark:border-purple-700/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden md:col-span-2 lg:col-span-1"
							to="/caelus/guides/spirits"
						>
							<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-xl" />
							<div className="relative z-10">
								<div className="mb-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl w-fit backdrop-blur-sm">
									<img
										alt="Wing buff icon"
										className="w-8 h-8"
										src="https://cdn.thatskyapplication.com/icons/wing_buff.png"
									/>
								</div>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spirits</h3>
								<div className="mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
									View spirits →
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="mt-12 w-full max-w-2xl">
					<div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 text-center">
						<div className="flex items-center justify-center mb-3">
							<div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3">
								<Globe className="w-6 h-6 text-gray-700 dark:text-gray-300" />
							</div>
							<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
								Translate {APPLICATION_NAME}!
							</h3>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
							Make {APPLICATION_NAME} accessible to everyone in their native language!
						</p>
						<a
							className="inline-flex items-center px-4 py-2 bg-[#263238] hover:bg-[#1a222a] text-white font-medium rounded-lg transition-colors text-sm shadow-sm hover:shadow-md"
							href={CROWDIN_URL}
							rel="noopener noreferrer"
							style={{ backgroundColor: "#263238" }}
							target="_blank"
						>
							Join on Crowdin
						</a>
					</div>
				</div>
				<div className="mt-16 text-center">
					<a
						className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
						href={INVITE_APPLICATION_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						<SiDiscord className="h-5 w-5 text-white" />
						<span className="font-medium">Invite {APPLICATION_NAME}</span>
					</a>
					<p className="mt-6 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
						<span className="lg:hidden">
							Browse features via the menu button above to discover everything {APPLICATION_NAME}{" "}
							has to offer.
						</span>
						<span className="hidden lg:block">
							Explore the sidebar to discover features {APPLICATION_NAME} has to offer.
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
