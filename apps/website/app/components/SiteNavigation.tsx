import { SiCrowdin, SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { CROWDIN_URL } from "@thatskyapplication/utility";
import {
	Bot,
	CheckSquare,
	ChevronDown,
	Clock,
	LogIn,
	LogOut,
	Menu,
	Users,
	X,
	Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { INVITE_APPLICATION_URL, INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { avatarURL, timeString } from "~/utility/functions";
import type { DiscordUser } from "~/utility/types";

interface NavigationItem {
	to: string;
	label: string;
	icon: React.ReactNode;
	description: string;
}

interface SiteTopBarProps {
	user: DiscordUser | null;
	locale: string;
}

interface UserMenuProps {
	user: DiscordUser;
}

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	user?: DiscordUser | null;
}

interface TimeDisplayProps {
	locale: string;
}

const NAVIGATION_ITEMS = [
	{
		to: "/caelus/guides/home",
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

function TimeDisplay({ locale }: TimeDisplayProps) {
	const [currentTime, setCurrentTime] = useState(() => timeString(locale));
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const updateTime = () => {
			try {
				const time = timeString(locale);
				setCurrentTime(time);
				setError(null);
			} catch (error) {
				setError("Time unavailable.");
				console.warn("Failed to update time.", error);
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

function UserMenu({ user }: UserMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const currentPath = location.pathname + location.search;
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This is fine.
	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		function handleEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	const { t } = useTranslation();

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				aria-expanded={isOpen}
				aria-haspopup="true"
				className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				<img
					alt={`${user.username}'s avatar`}
					className="w-8 h-8 rounded-full"
					src={avatarURL(user)}
				/>
				<div className="hidden sm:flex flex-col">
					<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{user.username}
					</span>
				</div>
				<ChevronDown
					className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
					<div className="py-1">
						<Link
							className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
							onClick={() => setIsOpen(false)}
							to="/checklist"
						>
							<CheckSquare className="h-4 w-4" />
							<span>{t("checklist.title", { ns: "features" })}</span>
						</Link>
						<div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
							<Link
								className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
								onClick={() => setIsOpen(false)}
								to={`/logout?returnTo=${encodeURIComponent(currentPath)}`}
							>
								<LogOut className="h-4 w-4" />
								<span>Log out</span>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function LoginButton() {
	const location = useLocation();
	const currentPath = location.pathname + location.search;

	return (
		<Link
			className="flex items-center gap-2 px-3 py-2 bg-discord-button hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
			to={`/login?returnTo=${encodeURIComponent(currentPath)}`}
		>
			<LogIn className="h-4 w-4" />
			<span className="hidden sm:inline">Sign in</span>
		</Link>
	);
}

function MobileMenu({ isOpen, onClose, user }: MobileMenuProps) {
	const location = useLocation();
	const currentPath = location.pathname + location.search;
	const { t } = useTranslation();

	if (!isOpen) {
		return null;
	}

	return (
		<div className="md:hidden">
			<button
				aria-label="Close mobile menu"
				className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
				onClick={onClose}
				type="button"
			/>
			<div className="fixed top-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
				<div className="p-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-semibold text-gray-900 dark:text-gray-100">Navigation</h3>
						<button
							aria-label="Close menu"
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
							onClick={onClose}
							type="button"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					{user ? (
						<div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div className="flex items-center gap-3 mb-3">
								<img
									alt={`Avatar of ${user.username}`}
									className="w-8 h-8 rounded-full"
									src={avatarURL(user)}
								/>
								<span className="font-medium text-gray-900 dark:text-gray-100">
									{user.username}
								</span>
							</div>
							<div className="space-y-2">
								<Link
									className="flex items-center gap-2 w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
									onClick={onClose}
									to="/checklist"
								>
									<CheckSquare className="h-4 w-4" />
									{t("checklist.title", { ns: "features" })}
								</Link>
								<Link
									className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
									onClick={() => onClose()}
									to={`/logout?returnTo=${encodeURIComponent(currentPath)}`}
								>
									<LogOut className="h-4 w-4" />
									<span>Log out</span>
								</Link>
							</div>
						</div>
					) : (
						<div className="mb-4">
							<Link
								className="flex items-center gap-2 w-full px-3 py-2 bg-discord-button hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium justify-center"
								onClick={onClose}
								to={`/login?returnTo=${encodeURIComponent(currentPath)}`}
							>
								<LogIn className="h-4 w-4" />
								Sign in with Discord
							</Link>
						</div>
					)}

					<nav className="space-y-1">
						{NAVIGATION_ITEMS.map((item) => (
							<Link
								className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
								key={item.to}
								onClick={onClose}
								to={item.to}
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

export function SiteTopBar({ user, locale }: SiteTopBarProps) {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This is fine.
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileMenuOpen(false);
			}
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
								className="font-bold sm:text-xl text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
								to="/"
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
											className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
												isActive
													? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
													: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
											}`}
											key={item.to}
											to={item.to}
										>
											{item.icon}
											<span>{item.label}</span>
										</Link>
									);
								})}
							</nav>
						</div>
						<div className="flex items-center gap-4">
							<TimeDisplay locale={locale} />
							<div className="hidden md:flex">
								{user ? <UserMenu user={user} /> : <LoginButton />}
							</div>
							<button
								aria-label="Open navigation menu"
								className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								onClick={() => setMobileMenuOpen(true)}
								type="button"
							>
								<Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} user={user} />
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
								aria-label="Join Discord Server"
								className="p-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg transition-colors"
								href={INVITE_SUPPORT_SERVER_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiDiscord className="h-5 w-5 text-white" />
							</a>
							<a
								aria-label="GitHub Repository"
								className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
								href="https://github.com/thatskyapplication"
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiGithub className="h-5 w-5 text-white" />
							</a>
							<a
								aria-label="Help Translate"
								className="p-2 bg-[#2E3440] hover:bg-[#242933] rounded-lg transition-colors"
								href={CROWDIN_URL}
								rel="noopener noreferrer"
								target="_blank"
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
										className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
										to={item.to}
									>
										{item.label}
									</Link>
								</li>
							))}
							<li>
								<Link
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
									to="/thatskylink"
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
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
									href={INVITE_SUPPORT_SERVER_URL}
									rel="noopener noreferrer"
									target="_blank"
								>
									Support Server
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
									href={INVITE_APPLICATION_URL}
									rel="noopener noreferrer"
									target="_blank"
								>
									Invite Caelus
								</a>
							</li>
							<li>
								<Link
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
									to="/caelus/guides/terms-privacy"
								>
									Terms & Privacy
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
									to="/caelus/guides/acknowledgements"
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
