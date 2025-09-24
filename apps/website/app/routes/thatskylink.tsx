import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";

const EXAMPLES = [
	{
		short: "thatsky.link/dailies",
		full: "thatskyapplication.com/daily-guides",
		description: "Today's daily guides.",
	},
	{
		short: "thatsky.link/p0276",
		full: "thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1365-hotfix---december-5-2024---0-27-6-305399-android-huawei-ios-304953-playstation-steam-switch/",
		description: "Patch notes for 0.27.6.",
	},
	{
		short: "thatsky.link/wiki",
		full: "sky-children-of-the-light.fandom.com/wiki/Sky:_Children_of_the_Light_Wiki",
		description: "Sky: Children of the Light wiki.",
	},
] as const;

export default function ThatSkyLink() {
	return (
		<div className="px-4 w-full max-w-4xl mx-auto">
			<div className="text-center pb-4">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
					<LinkIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
				</div>
				<h1 className="text-4xl font-bold mb-4">thatskylink</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					Link redirector for the Sky community.
				</p>
			</div>
			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-8 text-center">See the difference</h2>
				<div className="grid gap-6">
					{EXAMPLES.map((example) => (
						<div
							className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-xs hover:shadow-md transition-shadow"
							key={example.short}
						>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
									<a
										className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium underline-offset-4 hover:underline transition-colors"
										href={`https://${example.short}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<code>{example.short}</code>
									</a>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1" />
									<a
										className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm break-all underline-offset-4 hover:underline transition-colors min-w-0"
										href={`https://${example.full}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										<code>{example.full}</code>
									</a>
								</div>
								<p className="text-gray-600 dark:text-gray-400 text-sm pl-5 my-0">
									{example.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>
			<section className="mb-16">
				<div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-semibold mb-6 text-center">How it works</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="text-center">
							<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
							</div>
							<h3 className="font-semibold mb-2">Type the shortened variant</h3>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								Enter something like{" "}
								<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded-sm">
									thatsky.link/wiki
								</code>
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
							</div>
							<h3 className="font-semibold mb-2">Instant redirect</h3>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								You're automatically taken to the full destination URL!
							</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
					<h2 className="text-2xl font-semibold mb-6 text-center">Source Code</h2>
					<div className="text-center">
						<div className="inline-flex items-center gap-3 mb-4">
							<SiGithub className="w-8 h-8 text-gray-700 dark:text-gray-300" />
							<h3 className="font-semibold text-lg">GitHub</h3>
						</div>
						<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
							All links are listed here. You may suggest a link too!
						</p>
						<a
							className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
							href="https://github.com/thatskyapplication/thatskylink"
							rel="noopener noreferrer"
							target="_blank"
						>
							View
							<ExternalLinkIcon className="ml-2 w-4 h-4" />
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
