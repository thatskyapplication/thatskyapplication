import { BellIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { APPLICATION_NAME } from "~/utility/constants";

export default function Home() {
	return (
		<div className="min-h-[calc(100vh_-_9vh)] flex flex-col items-center justify-center px-4">
			<img
				src="/caelus.png"
				alt={APPLICATION_NAME}
				className="w-24 h-24 rounded-full object-cover"
			/>
			<h2 className="text-center mb-6 text-2xl font-bold">Popular Features</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl w-full">
				<Link
					to="/caelus/daily-guides"
					className="flex items-center justify-center text-center px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				>
					<ClockIcon className="flex-shrink-0 h-5 w-5 mr-2 stroke-[#724150] stroke-[0.5]" />
					Daily Guides
				</Link>
				<Link
					to="/caelus/hearts"
					className="flex items-center justify-center text-center px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				>
					<img
						src="https://cdn.thatskyapplication.com/icons/heart.png"
						alt="Heart icon."
						className="h-5 w-5 mr-2"
					/>
					Hearts
				</Link>
				<Link
					to="/caelus/notifications"
					className="flex items-center justify-center text-center px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				>
					<BellIcon className="flex-shrink-0 h-5 w-5 mr-2 stroke-[#724150] stroke-[0.5]" />
					Notifications
				</Link>
				<Link
					to="/caelus/friendship-actions"
					className="flex items-center justify-center text-center px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				>
					<img
						src="https://cdn.thatskyapplication.com/icons/hug.png"
						alt="Hug icon."
						className="h-5 w-5 mr-2"
					/>
					Friendship Actions
				</Link>
				<Link
					to="/caelus/spirits"
					className="flex items-center justify-center text-center px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				>
					<img
						src="https://cdn.thatskyapplication.com/icons/wing_buff.png"
						alt="Wing buff icon."
						className="h-5 w-5 mr-2"
					/>
					Spirits
				</Link>
			</div>
			<div className="mt-8 space-y-4 text-center text-lg">
				<p className="lg:hidden">
					{APPLICATION_NAME} is simple to set up and use. If you prefer reading a guide on features,
					see above for some popular features, or browse everything via the menu button below.
				</p>
				<p className="hidden lg:block">
					{APPLICATION_NAME} is simple to set up and use. If you prefer reading a guide on features,
					see above for some popular features, or browse everything via the sidebar on the left.
				</p>
			</div>
		</div>
	);
}
