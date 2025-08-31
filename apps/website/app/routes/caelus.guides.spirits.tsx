export default function Spirits() {
	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 right-10 w-20 h-20 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-xl animate-pulse" />
				<div
					className="absolute bottom-20 left-10 w-32 h-32 bg-violet-200/20 dark:bg-violet-400/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>
			<div className="relative z-10">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-full mb-4">
						<img
							alt="Wing buff icon"
							className="w-8 h-8"
							src="https://cdn.thatskyapplication.com/icons/wing_buff.png"
						/>
					</div>
					<h1 className="bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
						Spirits
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Discover everything about the spirits of Sky!
					</p>
				</div>
				<hr className="my-8" />
				<section className="space-y-6">
					<h2>Searching spirits</h2>
					<p>
						You can search spirits via name, season, emote, stance, or call via{" "}
						<code>/spirits search</code>!
					</p>
					<img
						alt="Example of spirit search command showing detailed spirit information with cosmetics and seasonal details"
						className="w-full max-w-lg rounded-md shadow-md border border-gray-200 dark:border-gray-600"
						src="https://cdn.thatskyapplication.com/assets/spirits_search_example.webp"
					/>
				</section>
				<section className="space-y-6">
					<h2>Viewing a history of spirits</h2>
					<p>
						Want to track when spirits visit? Use <code>/spirits history</code> to see comprehensive
						tracking of them all!
					</p>
					<div className="bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700/50 rounded-xl p-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
								<img
									alt="Wing buff icon"
									className="w-6 h-6"
									src="https://cdn.thatskyapplication.com/icons/wing_buff.png"
								/>
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-0">
								Spirits history features
							</h3>
						</div>
						<div className="grid md:grid-cols-2 gap-4 mb-6">
							<img
								alt="Example of spirit history showing appearance tracking"
								className="w-full rounded-md shadow-md border border-gray-200 dark:border-gray-600"
								src="https://cdn.thatskyapplication.com/assets/spirits_history_appearance_example.webp?v=2"
							/>
							<img
								alt="Example of spirit history showing rarity tracking"
								className="w-full rounded-md shadow-md border border-gray-200 dark:border-gray-600"
								src="https://cdn.thatskyapplication.com/assets/spirits_history_rarity_example.webp?v=2"
							/>
						</div>
						<div className="bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-3">
							<p className="text-indigo-800 dark:text-indigo-300 text-sm m-0">
								<strong>Switch views:</strong> Toggle between appearance order and rarity to see
								which spirits haven't returned in ages!
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
