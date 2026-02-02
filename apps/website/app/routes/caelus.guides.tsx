import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { APPLICATION_NAME, SKY_KID_ICON_URL } from "~/utility/constants.js";

interface SidebarItem {
	title: string;
	path: string;
}

const HOME_ITEMS = [{ title: "Home", path: "/caelus/guides/home" }] as const satisfies Readonly<
	SidebarItem[]
>;

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
								className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
										: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
								}`}
								onClick={onItemClick}
								to={item.path}
							>
								<span>{item.title}</span>
								{isActive && (
									<img alt="Current page" className="w-4 h-4 shrink-0" src={SKY_KID_ICON_URL} />
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
			if (event.key === "Escape") {
				setSidebarOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	return (
		<div className="container mx-auto px-4 max-w-7xl">
			<div className="flex gap-8">
				<aside className="hidden lg:block w-64 shrink-0">
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
							<SidebarSection currentPath={location.pathname} items={HOME_ITEMS} title="Home" />
						</div>
					</div>
				</aside>
				<main className="flex-1 min-w-0">
					<div className="lg:hidden mb-6">
						<button
							className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xs hover:shadow-md transition-shadow"
							onClick={() => setSidebarOpen(true)}
							type="button"
						>
							<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							<span className="font-medium text-gray-900 dark:text-gray-100">Guide Navigation</span>
							<Menu className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-auto" />
						</button>
					</div>
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xs p-8">
						<Outlet />
					</div>
				</main>
			</div>
			{sidebarOpen && (
				<>
					<button
						aria-label="Close sidebar"
						className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden cursor-default"
						onClick={() => setSidebarOpen(false)}
						type="button"
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
								aria-label="Close navigation"
								className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
								onClick={() => setSidebarOpen(false)}
								type="button"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="flex-1 overflow-y-auto p-6">
							<SidebarSection
								currentPath={location.pathname}
								items={HOME_ITEMS}
								onItemClick={() => setSidebarOpen(false)}
								title="Home"
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
