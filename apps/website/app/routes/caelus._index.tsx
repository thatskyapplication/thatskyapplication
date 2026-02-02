import { SiCrowdin, SiDiscord } from "@icons-pack/react-simple-icons";
import { BookOpen, Heart, Users } from "lucide-react";
import { Link } from "react-router";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	GUIDE_URL,
	INVITE_APPLICATION_URL,
	INVITE_SUPPORT_SERVER_URL,
} from "~/utility/constants";

const LINKS = [
	{
		to: GUIDE_URL,
		label: "Guide",
		description: "Learn how to use Caelus.",
		icon: <BookOpen className="w-5 h-5" />,
		external: true,
	},
	{
		to: INVITE_SUPPORT_SERVER_URL,
		label: "Support Server",
		description: "Get help, report bugs, or just hang out.",
		icon: <SiDiscord className="w-5 h-5" />,
		external: true,
	},
	{
		to: "https://guide.thatskyapplication.com/translating",
		label: "Translations",
		description: "Help translate Caelus into your language.",
		icon: <SiCrowdin className="w-5 h-5" />,
		external: true,
	},
	{
		to: "/acknowledgements",
		label: "Acknowledgements",
		description: "The people that make Caelus possible.",
		icon: <Heart className="w-5 h-5" />,
		external: false,
	},
] as const;

export default function CaelusIndex() {
	return (
		<div className="container mx-auto px-4 max-w-3xl py-16">
			<div className="flex flex-col items-center text-center mb-16">
				<img
					alt={`${APPLICATION_NAME} icon.`}
					className="w-24 h-24 rounded-full shadow-lg mb-6"
					src={APPLICATION_ICON_URL}
				/>
				<h1 className="text-4xl sm:text-5xl font-bold mb-3">{APPLICATION_NAME}</h1>
				<p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
					Caelus is the Discord application for Sky: Children of the Light.
				</p>
				<div className="flex gap-3 mt-8">
					<a
						className="inline-flex items-center gap-2 bg-discord-button hover:bg-discord-button/80 text-white font-semibold px-6 py-3 rounded-xl transition-colors no-underline"
						href={INVITE_APPLICATION_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Users className="w-5 h-5" />
						Add to Server
					</a>
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				{LINKS.map((link) =>
					link.external ? (
						<a
							className="flex items-start gap-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors no-underline"
							href={link.to}
							key={link.label}
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="text-gray-400 dark:text-gray-500 mt-0.5">{link.icon}</div>
							<div>
								<p className="font-semibold text-gray-900 dark:text-white m-0">{link.label}</p>
								<p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">
									{link.description}
								</p>
							</div>
						</a>
					) : (
						<Link
							className="flex items-start gap-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors no-underline"
							key={link.label}
							to={link.to}
						>
							<div className="text-gray-400 dark:text-gray-500 mt-0.5">{link.icon}</div>
							<div>
								<p className="font-semibold text-gray-900 dark:text-white m-0">{link.label}</p>
								<p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">
									{link.description}
								</p>
							</div>
						</Link>
					),
				)}
			</div>
		</div>
	);
}
