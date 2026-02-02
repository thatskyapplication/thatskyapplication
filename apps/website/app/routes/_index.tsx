import { SiDiscord } from "@icons-pack/react-simple-icons";
import { AlarmClock, Clock, LinkIcon, UsersIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { APPLICATION_NAME } from "~/utility/constants";

export default function Index() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center p-4 min-h-screen">
			<header className="flex flex-col items-center text-center mb-8 max-w-lg w-full">
				<h1 className="mt-4">thatskyapplication</h1>
				<p className="mt-2 text-lg">Here are some cool things for Sky: Children of the Light!</p>
			</header>
			<div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full">
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-6 flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1rem)] items-center text-center sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
					to="/caelus"
				>
					<SiDiscord className="h-8 w-8 mb-4" />
					<h2 className="font-medium text-lg">{APPLICATION_NAME}</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						A Discord application for Sky: Children of the Light. Invite Caelus and share the love
						with your community!
					</p>
				</Link>
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-6 flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1rem)] items-center text-center sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
					to="/daily-guides"
				>
					<Clock className="h-8 w-8 mb-4" />
					<h2 className="font-medium text-lg">Daily Guides</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						Today's quests, treasure candles, seasonal candles, shard eruption, etc. all in one
						simple page.
					</p>
				</Link>
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-6 flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1rem)] items-center text-center sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
					to="/shard-eruption"
				>
					<img
						alt="Strong shard eruption icon."
						className="w-8 h-8"
						src="https://cdn.thatskyapplication.com/assets/shard_strong.webp"
					/>
					<h2 className="font-medium text-lg">Shard Eruptions</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						See today's shard eruption, and view a schedule of shard eruptions.
					</p>
				</Link>
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-6 flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1rem)] items-center text-center sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
					to="/sky-profiles"
				>
					<UsersIcon className="h-8 w-8 mb-4" />
					<h2 className="font-medium text-lg">Sky Profiles</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						A lovely place to view all Sky profiles! You can also share a direct link to one! Have
						fun exploring!
					</p>
				</Link>
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-6 flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1rem)] items-center text-center sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
					to="/schedule"
				>
					<AlarmClock className="h-8 w-8 mb-4" />
					<h2 className="font-medium text-lg">{t("schedule.name", { ns: "features" })}</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						{t("schedule.description", { ns: "features" })}
					</p>
				</Link>
				<Link
					className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg p-6 flex flex-col justify-between w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1rem)] items-center text-center sm:hover:translate-y-0 lg:hover:-translate-y-2 transition-transform duration-200"
					to="/thatskylink"
				>
					<LinkIcon className="h-8 w-8 mb-4" />
					<h2 className="font-medium text-lg">thatskylink</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						Making long links short and memorable. This is also a good place to find various links
						for the community.
					</p>
				</Link>
			</div>
		</div>
	);
}
