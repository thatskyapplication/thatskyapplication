import {
	autoUpdate,
	FloatingFocusManager,
	FloatingPortal,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from "@floating-ui/react";
import { SiCrowdin, SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { CROWDIN_URL } from "@thatskyapplication/utility";
import { clsx } from "clsx";
import {
	BookOpenCheck,
	Bot,
	CheckSquare,
	ChevronDown,
	HandHeart,
	Heart,
	LogIn,
	LogOut,
	Menu,
	User,
	Users,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { type NavigationGroup, useNavigationGroups } from "~/hooks/navigation-groups";
import { APPLICATION_NAME, INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { avatarURL } from "~/utility/functions";
import type { DiscordUser } from "~/utility/types";
import { DesktopUserContextMenuItem } from "./DesktopUserContextMenuItem";
import { MobileUserContextMenuItem } from "./MobileUserContextMenuItem";

interface SiteTopBarProps {
	user: DiscordUser | null;
	userDisplayName: string | null;
	userIconURL: string | null;
}

interface UserMenuProps {
	user: DiscordUser;
	userDisplayName: string;
	userIconURL: string | null;
}

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	user?: DiscordUser | null;
	userDisplayName: string | null;
	userIconURL: string | null;
}

function useDesktopDropdown(placement: "bottom-end" | "bottom-start") {
	const [isOpen, setIsOpen] = useState(false);
	const { context, floatingStyles, refs } = useFloating({
		middleware: [offset(8), flip(), shift({ padding: 8 })],
		onOpenChange: setIsOpen,
		open: isOpen,
		placement,
		strategy: "fixed",
		whileElementsMounted: autoUpdate,
	});
	const click = useClick(context);
	const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
	const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

	return { context, floatingStyles, getFloatingProps, getReferenceProps, isOpen, refs, setIsOpen };
}

function UserMenu({ user, userDisplayName, userIconURL }: UserMenuProps) {
	const location = useLocation();
	const currentPath = location.pathname + location.search;
	const imageURL = userIconURL ?? avatarURL(user);
	const { t } = useTranslation();
	const { context, floatingStyles, getFloatingProps, getReferenceProps, isOpen, refs, setIsOpen } =
		useDesktopDropdown("bottom-end");

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps({
					"aria-expanded": isOpen,
					className:
						"flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors",
					type: "button",
				})}
			>
				<div
					aria-label={`${userDisplayName}'s avatar`}
					className="w-8 h-8 rounded-full bg-cover bg-center"
					role="img"
					style={{ backgroundImage: `url(${imageURL})` }}
				/>
				<div className="hidden sm:flex flex-col">
					<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{userDisplayName}
					</span>
				</div>
				<ChevronDown
					className={clsx(
						"h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform",
						isOpen && "rotate-180",
					)}
				/>
			</button>
			{isOpen && (
				<FloatingPortal>
					<FloatingFocusManager context={context} modal={false}>
						<div
							className="z-50 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
							ref={refs.setFloating}
							style={floatingStyles}
							{...getFloatingProps()}
						>
							<div className="py-1">
								<DesktopUserContextMenuItem icon={User} onClick={() => setIsOpen(false)} to="/me">
									My area
								</DesktopUserContextMenuItem>
								<DesktopUserContextMenuItem
									icon={Users}
									onClick={() => setIsOpen(false)}
									to={`/sky-profiles/${user.id}`}
								>
									{t("sky-profile.name", { ns: "features" })}
								</DesktopUserContextMenuItem>
								<DesktopUserContextMenuItem
									icon={BookOpenCheck}
									onClick={() => setIsOpen(false)}
									to="/me/catalogue"
								>
									{t("catalogue.main-title", { ns: "features" })}
								</DesktopUserContextMenuItem>
								<DesktopUserContextMenuItem
									icon={CheckSquare}
									onClick={() => setIsOpen(false)}
									to="/me/checklist"
								>
									{t("checklist.title", { ns: "features" })}
								</DesktopUserContextMenuItem>
								<DesktopUserContextMenuItem
									icon={Heart}
									onClick={() => setIsOpen(false)}
									to="/me/heart-history"
								>
									{t("heart.history-title", { ns: "features" })}
								</DesktopUserContextMenuItem>
								<div className="mt-1 border-t border-gray-200 pt-1 dark:border-gray-700">
									<DesktopUserContextMenuItem
										danger
										icon={LogOut}
										onClick={() => setIsOpen(false)}
										to={`/logout?returnTo=${encodeURIComponent(currentPath)}`}
									>
										Log out
									</DesktopUserContextMenuItem>
								</div>
							</div>
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			)}
		</>
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

function NavigationDropdown({ group, isActive }: { group: NavigationGroup; isActive: boolean }) {
	const { context, floatingStyles, getFloatingProps, getReferenceProps, isOpen, refs, setIsOpen } =
		useDesktopDropdown("bottom-start");

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps({
					"aria-expanded": isOpen,
					className: clsx(
						"flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
						isActive
							? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
							: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
					),
					type: "button",
				})}
			>
				<span>{group.label}</span>
				<ChevronDown className={clsx("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
			</button>
			{isOpen && (
				<FloatingPortal>
					<FloatingFocusManager context={context} modal={false}>
						<div
							className="z-50 w-64 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
							ref={refs.setFloating}
							style={floatingStyles}
							{...getFloatingProps()}
						>
							<div className="py-1">
								{group.items.map((item) =>
									item.external ? (
										<a
											className="flex items-start gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
											href={item.to}
											key={item.to}
											onClick={() => setIsOpen(false)}
											rel="noopener noreferrer"
											target="_blank"
										>
											{item.icon}
											<div>
												<div className="font-medium text-sm">{item.label}</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													{item.description}
												</div>
											</div>
										</a>
									) : (
										<Link
											className="flex items-start gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
											key={item.to}
											onClick={() => setIsOpen(false)}
											to={item.to}
										>
											{item.icon}
											<div>
												<div className="font-medium text-sm">{item.label}</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													{item.description}
												</div>
											</div>
										</Link>
									),
								)}
							</div>
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			)}
		</>
	);
}

function MobileMenu({ isOpen, onClose, user, userDisplayName, userIconURL }: MobileMenuProps) {
	const location = useLocation();
	const currentPath = location.pathname + location.search;
	const { t } = useTranslation();
	const navigationGroups = useNavigationGroups();

	if (!isOpen) {
		return null;
	}

	const imageURL = user ? (userIconURL ?? avatarURL(user)) : null;

	return (
		<div className="md:hidden">
			<button
				aria-label="Close mobile menu"
				className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
				onClick={onClose}
				type="button"
			/>
			<div className="fixed top-4 left-4 right-4 bottom-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
				<div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
					<h3 className="font-semibold text-gray-900 dark:text-gray-100">Navigation</h3>
					<button
						aria-label="Close menu."
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
						onClick={onClose}
						type="button"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="flex-1 overflow-y-auto p-4">
					{user ? (
						<div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div className="flex items-center gap-3 mb-3">
								<div
									aria-label={`Avatar of ${userDisplayName ?? user.username}`}
									className="w-8 h-8 rounded-full bg-cover bg-center"
									role="img"
									style={{ backgroundImage: `url(${imageURL})` }}
								/>
								<span className="font-medium text-gray-900 dark:text-gray-100">
									{userDisplayName ?? user.username}
								</span>
							</div>
							<div className="space-y-2">
								<MobileUserContextMenuItem icon={User} onClick={onClose} to="/me">
									My area
								</MobileUserContextMenuItem>
								<MobileUserContextMenuItem
									icon={Users}
									onClick={onClose}
									to={`/sky-profiles/${user.id}`}
								>
									{t("sky-profile.name", { ns: "features" })}
								</MobileUserContextMenuItem>
								<MobileUserContextMenuItem
									icon={BookOpenCheck}
									onClick={onClose}
									to="/me/catalogue"
								>
									{t("catalogue.main-title", { ns: "features" })}
								</MobileUserContextMenuItem>
								<MobileUserContextMenuItem icon={CheckSquare} onClick={onClose} to="/me/checklist">
									{t("checklist.title", { ns: "features" })}
								</MobileUserContextMenuItem>
								<MobileUserContextMenuItem icon={Heart} onClick={onClose} to="/me/heart-history">
									{t("heart.history-title", { ns: "features" })}
								</MobileUserContextMenuItem>
								<MobileUserContextMenuItem
									danger
									icon={LogOut}
									onClick={onClose}
									to={`/logout?returnTo=${encodeURIComponent(currentPath)}`}
								>
									Log out
								</MobileUserContextMenuItem>
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

					<nav className="space-y-4">
						{/* Caelus. This is not a group. */}
						<Link
							className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
							onClick={onClose}
							to="/caelus"
						>
							<Bot className="h-5 w-5" />
							<div>
								<div className="font-medium">{APPLICATION_NAME}</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									Guides for {APPLICATION_NAME}.
								</div>
							</div>
						</Link>
						{navigationGroups.map((group) => (
							<div key={group.label}>
								<h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
									{group.label}
								</h4>
								<div className="space-y-1">
									{group.items.map((item) =>
										"external" in item ? (
											<a
												className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
												href={item.to}
												key={item.to}
												onClick={onClose}
												rel="noopener noreferrer"
												target="_blank"
											>
												{item.icon}
												<div>
													<div className="font-medium">{item.label}</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														{item.description}
													</div>
												</div>
											</a>
										) : (
											<Link
												className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
												key={item.to}
												onClick={onClose}
												to={item.to}
											>
												{item.icon}
												<div>
													<div className="font-medium">{item.label}</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														{item.description}
													</div>
												</div>
											</Link>
										),
									)}
								</div>
							</div>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
}

function SiteTopBarContent({ user, userDisplayName, userIconURL }: SiteTopBarProps) {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const topBarRef = useRef<HTMLDivElement>(null);
	const navigationGroups = useNavigationGroups();

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	useEffect(() => {
		const topBarElement = topBarRef.current;

		if (!topBarElement) {
			return;
		}

		const updateTopBarHeight = () => {
			document.documentElement.style.setProperty(
				"--site-top-bar-height",
				`${topBarElement.getBoundingClientRect().height}px`,
			);
		};

		updateTopBarHeight();

		const resizeObserver = new ResizeObserver(() => updateTopBarHeight());
		resizeObserver.observe(topBarElement);

		return () => {
			resizeObserver.disconnect();
			document.documentElement.style.removeProperty("--site-top-bar-height");
		};
	}, []);

	const getGroupActiveState = (group: NavigationGroup) => {
		return (
			group.label !== "Links" &&
			group.items.some(
				(item) =>
					!item.external && location.pathname.startsWith(item.to.split("/").slice(0, 2).join("/")),
			)
		);
	};

	return (
		<>
			<div
				className="sticky top-0 z-30 px-4 pt-4 pb-2"
				ref={topBarRef}
				style={{ scrollbarGutter: "stable" }}
			>
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
								{/* Caelus. This is not a group. */}
								<Link
									className={clsx(
										"flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
										location.pathname.startsWith("/caelus")
											? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
											: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
									)}
									to="/caelus"
								>
									<Bot className="h-5 w-5" />
									<span>{APPLICATION_NAME}</span>
								</Link>
								{navigationGroups.map((group) => (
									<NavigationDropdown
										group={group}
										isActive={getGroupActiveState(group)}
										key={group.label}
									/>
								))}
							</nav>
						</div>
						<div className="flex items-center gap-4">
							<div className="hidden md:flex">
								{user ? (
									<UserMenu
										user={user}
										userDisplayName={userDisplayName ?? user.username}
										userIconURL={userIconURL}
									/>
								) : (
									<LoginButton />
								)}
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
			<MobileMenu
				isOpen={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				user={user}
				userDisplayName={userDisplayName}
				userIconURL={userIconURL}
			/>
		</>
	);
}

export function SiteTopBar({ user, userDisplayName, userIconURL }: SiteTopBarProps) {
	const { pathname } = useLocation();
	return (
		<SiteTopBarContent
			key={pathname}
			user={user}
			userDisplayName={userDisplayName}
			userIconURL={userIconURL}
		/>
	);
}

export function SiteFooter() {
	const navigationGroups = useNavigationGroups();

	return (
		<footer className="w-full mt-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="col-span-1 md:col-span-2">
						<h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">
							thatskyapplication
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
							Home to tools for Sky: Children of the Light. 🩵
						</p>
						<Link
							className="mb-6 inline-flex items-center gap-2 rounded-lg border border-pink-300 bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:border-pink-200 hover:bg-pink-600"
							to="/donate"
						>
							<HandHeart className="h-4 w-4 text-pink-100" />
							Donate
						</Link>
						<div className="flex gap-4">
							<a
								aria-label="Join Discord server."
								className="p-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg transition-colors"
								href={INVITE_SUPPORT_SERVER_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiDiscord className="h-5 w-5 text-white" />
							</a>
							<a
								aria-label="GitHub repository."
								className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
								href="https://github.com/thatskyapplication"
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiGithub className="h-5 w-5 text-white" />
							</a>
							<a
								aria-label="Help translate via Crowdin."
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
							{navigationGroups
								.find((group) => group.label === "Features")
								?.items.map((item) => (
									<li key={item.to}>
										<Link
											className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
											to={item.to}
										>
											{item.label}
										</Link>
									</li>
								))}
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Support</h4>
						<ul className="space-y-2">
							{navigationGroups
								.find((group) => group.label === "Links")
								?.items.map((item) =>
									"external" in item ? (
										<li key={item.to}>
											<a
												className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
												href={item.to}
												rel="noopener noreferrer"
												target="_blank"
											>
												{item.label}
											</a>
										</li>
									) : (
										<li key={item.to}>
											<Link
												className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
												to={item.to}
											>
												{item.label}
											</Link>
										</li>
									),
								)}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
