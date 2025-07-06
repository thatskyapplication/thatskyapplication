import { SiCrowdin, SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Link, useLocation } from "@remix-run/react";
import { Bot, Clock, Menu, Users, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "~/contexts/LocaleContext";
import {
	CROWDIN_URL,
	INVITE_APPLICATION_URL,
	INVITE_SUPPORT_SERVER_URL,
} from "~/utility/constants";
import { timeString } from "~/utility/functions";

interface NavigationItem {
	to: string;
	label: string;
	icon: React.ReactNode;
	description: string;
}

const NAVIGATION_ITEMS = [
	{
		to: "/caelus/home",
		label: "Caelus",
		icon: <Bot className="h-5 w-5" />,
		description: "Guides for Caelus.",
	},
	{
		to: "/daily-guides",
		label: "Daily Guides",
		icon: <Clock className="h-5 w-5" />,
		description: "Today's daily guides.",
	},
	{
		to: "/shard-eruption",
		label: "Shard Eruptions",
		icon: <Zap className="h-5 w-5" />,
		description: "See a schedule of shard eruptions.",
	},
	{
		to: "/sky-profiles",
		label: "Sky Profiles",
		icon: <Users className="h-5 w-5" />,
		description: "See everyone's Sky profiles.",
	},
] as const satisfies Readonly<NavigationItem[]>;

function TimeDisplay() {
	const locale = useLocale();
	const [currentTime, setCurrentTime] = useState(() => timeString(locale));
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const updateTime = () => {
			try {
				const time = timeString(locale);
				setCurrentTime(time);
				setError(null);
			} catch (err) {
				setError("Time unavailable.");
				console.warn("Failed to update time:", err);
			}
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [locale]);

	if (error) {
		return (
			<div className="text-sm font-mono text-red-400" title={error}>
				--:--
			</div>
		);
	}

	return (
		<div className="text-sm font-mono text-gray-600 dark:text-gray-400">
			<div className="hidden lg:block">{currentTime.lg}</div>
			<div className="lg:hidden">{currentTime.sm}</div>
		</div>
	);
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	if (!isOpen) return null;

	return (
		<div className="md:hidden">
			<button
				type="button"
				className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
				onClick={onClose}
				aria-label="Close mobile menu"
			/>
			<div className="fixed top-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
				<div className="p-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-semibold text-gray-900 dark:text-gray-100">Navigation</h3>
						<button
							type="button"
							onClick={onClose}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
							aria-label="Close menu"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					<nav className="space-y-1">
						{NAVIGATION_ITEMS.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								onClick={onClose}
								className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
							>
								{item.icon}
								<div>
									<div className="font-medium">{item.label}</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
								</div>
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
}

export function SiteTopBar() {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This is fine.
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMobileMenuOpen(false);
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	return (
		<>
			<div className="fixed top-4 left-4 right-4 z-30" style={{ scrollbarGutter: "stable" }}>
				<div className="max-w-7xl mx-auto p-4 rounded-xl bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-6">
							<Link
								to="/"
								className="font-bold sm:text-xl text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								thatskyapplication
							</Link>
							<nav className="hidden md:flex items-center gap-1">
								{NAVIGATION_ITEMS.map((item) => {
									const isActive = location.pathname.startsWith(
										item.to.split("/").slice(0, 2).join("/"),
									);
									return (
										<Link
											key={item.to}
											to={item.to}
											className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
												isActive
													? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
													: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
											}`}
										>
											{item.icon}
											<span>{item.label}</span>
										</Link>
									);
								})}
							</nav>
						</div>
						<div className="flex items-center gap-4">
							<TimeDisplay />
							<button
								type="button"
								onClick={() => setMobileMenuOpen(true)}
								className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								aria-label="Open navigation menu"
							>
								<Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
		</>
	);
}

export function SiteFooter() {
	return (
		<footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="col-span-1 md:col-span-2">
						<h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">
							thatskyapplication
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
							Home to tools for Sky: Children of the Light. 🩵
						</p>
						<div className="flex gap-4">
							<a
								href={INVITE_SUPPORT_SERVER_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg transition-colors"
								aria-label="Join Discord Server"
							>
								<SiDiscord className="h-5 w-5 text-white" />
							</a>
							<a
								href="https://github.com/thatskyapplication"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
								aria-label="GitHub Repository"
							>
								<SiGithub className="h-5 w-5 text-white" />
							</a>
							<a
								href={CROWDIN_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-[#2E3440] hover:bg-[#242933] rounded-lg transition-colors"
								aria-label="Help Translate"
							>
								<SiCrowdin className="h-5 w-5 text-white" />
							</a>
						</div>
					</div>
					<div>
						<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Features</h4>
						<ul className="space-y-2">
							{NAVIGATION_ITEMS.map((item) => (
								<li key={item.to}>
									<Link
										to={item.to}
										className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
							<li>
								<Link
									to="/thatskylink"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								>
									thatskylink
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<a
									href={INVITE_SUPPORT_SERVER_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								>
									Support Server
								</a>
							</li>
							<li>
								<a
									href={INVITE_APPLICATION_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								>
									Invite Caelus
								</a>
							</li>
							<li>
								<Link
									to="/caelus/terms-privacy"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								>
									Terms & Privacy
								</Link>
							</li>
							<li>
								<Link
									to="/caelus/acknowledgements"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								>
									Acknowledgements
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
