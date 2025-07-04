import { Link, Outlet, useLocation } from "@remix-run/react";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import PageLayout from "~/components/Layout.js";
import { SKY_KID_ICON_URL } from "~/utility/constants.js";

interface SidebarData {
	title: string;
	path: string;
}

const HOME = [
	{ title: "Home", path: "/caelus/home" },
	{ title: "Acknowledgements", path: "/caelus/acknowledgements" },
	{ title: "Terms & Privacy", path: "/caelus/terms-privacy" },
] as const;

const GUIDES = [
	{ title: "Daily Guides", path: "/caelus/daily-guides" },
	{ title: "Hearts", path: "/caelus/hearts" },
	{ title: "Friendship Actions", path: "/caelus/friendship-actions" },
	{ title: "Notifications", path: "/caelus/notifications" },
	{ title: "Spirits", path: "/caelus/spirits" },
] as const;

const renderCategory = (
	title: string,
	sidebarData: readonly SidebarData[],
	location: ReturnType<typeof useLocation>,
) => (
	<>
		<h2 className="text-lg mt-0 mb-0 uppercase tracking-wide">{title}</h2>
		<ul className="space-y-1">
			{sidebarData.map((data) => (
				<li key={data.path}>
					<Link
						to={data.path}
						className={`block px-2 py-1 rounded-md transition duration-200 ${
							location.pathname === data.path
								? "bg-gray-300 dark:bg-gray-700 dark:text-white text-black shadow"
								: "text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-gray-800"
						}`}
					>
						<div className="flex items-center justify-between">
							<span className="flex-1 truncate">{data.title}</span>
							{location.pathname === data.path && (
								<img
									src={SKY_KID_ICON_URL}
									alt="You are here."
									className="w-6 h-6 flex-shrink-0 ml-2"
								/>
							)}
						</div>
					</Link>
				</li>
			))}
		</ul>
	</>
);

export default function GuidesLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const location = useLocation();

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<PageLayout className="flex">
			<nav className="hidden lg:block fixed left-0 top-0 pt-24 h-full w-64 bg-gray-100 dark:bg-gray-900 lg:border-r lg:border-gray-300 dark:lg:border-gray-700 p-4 overflow-y-auto">
				<div className="space-y-1">
					{renderCategory("Home", HOME, location)}
					{renderCategory("Guides", GUIDES, location)}
				</div>
			</nav>
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30"
					onClick={() => setIsSidebarOpen(false)}
					onKeyDown={(event) => event.key === "Escape" && setIsSidebarOpen(false)}
					aria-hidden="true"
				/>
			)}
			<nav
				className={`fixed bottom-2 right-2 w-3/4 max-w-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-lg z-40 transform transition-transform duration-150 ease-in-out ${
					isSidebarOpen ? "translate-x-0" : "translate-x-[110%]"
				} overflow-y-auto max-h-[50vh]`}
			>
				<div className="relative space-y-1">
					<div className="flex justify-between items-center">
						<h2 className="text-lg my-0 uppercase tracking-wide">Home</h2>
						<button type="button" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu.">
							<XIcon className="h-6 w-6" />
						</button>
					</div>
					<ul className="space-y-1">
						{HOME.map((home) => (
							<li key={home.path}>
								<Link
									to={home.path}
									className={`block px-2 py-1 rounded-md hover:outline-none transition duration-200 ${
										location.pathname === home.path
											? "bg-gray-300 dark:bg-gray-700 dark:text-white text-black shadow"
											: "text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-gray-800"
									}`}
									onClick={() => setIsSidebarOpen(false)}
								>
									<div className="flex items-center justify-between">
										<span className="flex-1 truncate">{home.title}</span>
										{location.pathname === home.path && (
											<img
												src={SKY_KID_ICON_URL}
												alt="You are here."
												className="w-6 h-6 flex-shrink-0 ml-2"
											/>
										)}
									</div>
								</Link>
							</li>
						))}
					</ul>
					<h2 className="text-lg mt-0 mb-0 uppercase tracking-wide">Guides</h2>
					<ul className="space-y-1">
						{GUIDES.map((guide) => (
							<li key={guide.path}>
								<Link
									to={guide.path}
									className={`block px-2 py-1 rounded-md hover:outline-none transition duration-200 ${
										location.pathname === guide.path
											? "bg-gray-300 dark:bg-gray-700 dark:text-white text-black shadow"
											: "text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-gray-800"
									}`}
									onClick={() => setIsSidebarOpen(false)}
								>
									<div className="flex items-center justify-between">
										<span className="flex-1 truncate">{guide.title}</span>
										{location.pathname === guide.path && (
											<img
												src={SKY_KID_ICON_URL}
												alt="You are here."
												className="w-6 h-6 flex-shrink-0 ml-2"
											/>
										)}
									</div>
								</Link>
							</li>
						))}
					</ul>
					<div className="flex justify-between border-t border-gray-300 dark:border-gray-700 pt-2">
						<button
							type="button"
							className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md focus:outline-none ml-auto flex items-center space-x-2"
							onClick={toggleSidebar}
							aria-label="Close sidebar"
						>
							<span className="font-semibold uppercase">Close</span>
							<XIcon className="h-6 w-6" />
						</button>
					</div>
				</div>
			</nav>
			{!isSidebarOpen && (
				<button
					type="button"
					className="lg:hidden fixed z-40 bottom-4 right-4 p-3 bg-gray-500/90 dark:bg-gray-900/90 text-white rounded-full shadow-lg focus:outline-none"
					onClick={toggleSidebar}
					aria-label="Open sidebar"
				>
					<MenuIcon className="h-7 w-7" />
				</button>
			)}
			<div className="flex-1 lg:ml-64 p-4">
				<div className="w-full text-black dark:text-white">
					<Outlet />
				</div>
			</div>
		</PageLayout>
	);
}
