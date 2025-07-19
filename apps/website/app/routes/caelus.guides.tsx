import { Link, Outlet, useLocation } from "@remix-run/react";
import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { APPLICATION_NAME, SKY_KID_ICON_URL } from "~/utility/constants.js";

interface SidebarItem {
	title: string;
	path: string;
}

const HOME_ITEMS = [
	{ title: "Home", path: "/caelus/guides/home" },
	{ title: "Acknowledgements", path: "/caelus/guides/acknowledgements" },
] as const satisfies Readonly<SidebarItem[]>;

const GUIDE_ITEMS = [
	{ title: "Daily Guides", path: "/caelus/guides/daily-guides" },
	{ title: "Friendship Actions", path: "/caelus/guides/friendship-actions" },
	{ title: "Hearts", path: "/caelus/guides/hearts" },
	{ title: "Notifications", path: "/caelus/guides/notifications" },
	{ title: "Spirits", path: "/caelus/guides/spirits" },
] as const satisfies Readonly<SidebarItem[]>;

function SidebarSection({
	title,
	items,
	currentPath,
	onItemClick,
}: {
	title: string;
	items: readonly SidebarItem[];
	currentPath: string;
	onItemClick?: () => void;
}) {
	return (
		<div className="mb-6">
			<h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
				{title}
			</h3>
			<ul className="space-y-1">
				{items.map((item) => {
					const isActive = currentPath === item.path;
					return (
						<li key={item.path}>
							<Link
								to={item.path}
								onClick={onItemClick}
								className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
										: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
								}`}
							>
								<span>{item.title}</span>
								{isActive && (
									<img
										src={SKY_KID_ICON_URL}
										alt="Current page"
										className="w-4 h-4 flex-shrink-0"
									/>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default function CaelusGuidesLayout() {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This is fine.
	useEffect(() => {
		setSidebarOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setSidebarOpen(false);
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex gap-8">
				<aside className="hidden lg:block w-64 flex-shrink-0">
					<div className="sticky top-24">
						<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
							<div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
								<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
									<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<h2 className="font-semibold text-gray-900 dark:text-gray-100">
										{APPLICATION_NAME}
									</h2>
								</div>
							</div>
							<SidebarSection title="Home" items={HOME_ITEMS} currentPath={location.pathname} />
							<SidebarSection title="Guides" items={GUIDE_ITEMS} currentPath={location.pathname} />
						</div>
					</div>
				</aside>
				<main className="flex-1 min-w-0">
					<div className="lg:hidden mb-6">
						<button
							type="button"
							onClick={() => setSidebarOpen(true)}
							className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							<span className="font-medium text-gray-900 dark:text-gray-100">Guide Navigation</span>
							<Menu className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-auto" />
						</button>
					</div>
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8">
						<Outlet />
					</div>
				</main>
			</div>
			{sidebarOpen && (
				<>
					<button
						type="button"
						className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden cursor-default"
						onClick={() => setSidebarOpen(false)}
						aria-label="Close sidebar"
					/>
					<div className="fixed top-4 left-4 right-4 bottom-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col lg:hidden">
						<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
							<div className="flex items-center gap-2">
								<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
									<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<h2 className="font-semibold text-gray-900 dark:text-gray-100">Caelus Guide</h2>
								</div>
							</div>
							<button
								type="button"
								onClick={() => setSidebarOpen(false)}
								className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
								aria-label="Close navigation"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="flex-1 overflow-y-auto p-6">
							<SidebarSection
								title="Home"
								items={HOME_ITEMS}
								currentPath={location.pathname}
								onItemClick={() => setSidebarOpen(false)}
							/>
							<SidebarSection
								title="Guides"
								items={GUIDE_ITEMS}
								currentPath={location.pathname}
								onItemClick={() => setSidebarOpen(false)}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
