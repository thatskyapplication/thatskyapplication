import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "@base-ui/react/menu";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { SiCrowdin, SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
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
	Menu as MenuIcon,
	Settings as SettingsIcon,
	User,
	Users,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { CROWDIN_URL } from "@thatskyapplication/utility";
import {
	type NavigationGroup,
	type NavigationItem,
	useNavigationGroups,
} from "~/hooks/navigation-groups";
import { APPLICATION_NAME, INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { avatarURL } from "~/utility/functions";
import type { DiscordUser } from "~/utility/types";
import { DesktopUserContextMenuItem } from "./DesktopUserContextMenuItem";
import { MobileUserContextMenuItem } from "./MobileUserContextMenuItem";

const NAVIGATION_TRIGGER_CLASS =
	"flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors" as const;

const NAVIGATION_ACTIVE_CLASS =
	"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" as const;

const NAVIGATION_INACTIVE_CLASS =
	"text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" as const;

const NAVIGATION_LINK_CLASS =
	"flex items-start gap-3 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" as const;

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
	onClose: () => void;
	user?: DiscordUser | null;
	userDisplayName: string | null;
	userIconURL: string | null;
}

function UserMenu({ user, userDisplayName, userIconURL }: UserMenuProps) {
	const location = useLocation();
	const currentPath = location.pathname + location.search;
	const imageURL = userIconURL ?? avatarURL(user);
	const { t } = useTranslation();

	return (
		<Menu.Root modal={false}>
			<Menu.Trigger className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
				<div
					aria-label={`${userDisplayName}'s avatar`}
					className="h-8 w-8 rounded-full bg-cover bg-center"
					role="img"
					style={{ backgroundImage: `url(${imageURL})` }}
				/>
				<div className="hidden flex-col sm:flex">
					<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{userDisplayName}
					</span>
				</div>
				<ChevronDown className="h-4 w-4 text-gray-600 transition-transform data-popup-open:rotate-180 dark:text-gray-400" />
			</Menu.Trigger>
			<Menu.Portal>
				<Menu.Positioner
					align="end"
					className="z-50"
					collisionPadding={8}
					side="bottom"
					sideOffset={8}
				>
					<Menu.Popup className="max-h-(--available-height) w-48 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
						<DesktopUserContextMenuItem icon={User} to="/me">
							My area
						</DesktopUserContextMenuItem>
						<DesktopUserContextMenuItem icon={Users} to={`/sky-profiles/${user.id}`}>
							{t("sky-profile.name", { ns: "features" })}
						</DesktopUserContextMenuItem>
						<DesktopUserContextMenuItem icon={BookOpenCheck} to="/me/catalogue">
							{t("catalogue.main-title", { ns: "features" })}
						</DesktopUserContextMenuItem>
						<DesktopUserContextMenuItem icon={CheckSquare} to="/me/checklist">
							{t("checklist.title", { ns: "features" })}
						</DesktopUserContextMenuItem>
						<DesktopUserContextMenuItem icon={Heart} to="/me/heart-history">
							{t("heart.history-title", { ns: "features" })}
						</DesktopUserContextMenuItem>
						<DesktopUserContextMenuItem icon={SettingsIcon} to="/me/settings">
							{t("settings.name", { ns: "features" })}
						</DesktopUserContextMenuItem>
						<Menu.Separator className="my-1 border-t border-gray-200 dark:border-gray-700" />
						<DesktopUserContextMenuItem
							danger
							icon={LogOut}
							to={`/logout?returnTo=${encodeURIComponent(currentPath)}`}
						>
							Log out
						</DesktopUserContextMenuItem>
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
}

function LoginButton() {
	const location = useLocation();
	const currentPath = location.pathname + location.search;

	return (
		<Link
			className="flex items-center gap-2 rounded-lg bg-discord-button px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
			to={`/login?returnTo=${encodeURIComponent(currentPath)}`}
		>
			<LogIn className="h-4 w-4" />
			<span className="hidden sm:inline">Sign in</span>
		</Link>
	);
}

function DesktopNavigationLink({ item }: { item: NavigationItem }) {
	const content = (
		<>
			<span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>
			<div className="min-w-0">
				<div className="text-sm font-medium">{item.label}</div>
				<div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
			</div>
		</>
	);

	if (item.external) {
		return (
			<NavigationMenu.Link
				className={NAVIGATION_LINK_CLASS}
				closeOnClick
				href={item.to}
				rel="noopener noreferrer"
				target="_blank"
			>
				{content}
			</NavigationMenu.Link>
		);
	}

	return (
		<NavigationMenu.Link
			className={NAVIGATION_LINK_CLASS}
			closeOnClick
			render={<Link to={item.to} />}
		>
			{content}
		</NavigationMenu.Link>
	);
}

function DesktopNavigation({
	activeGroupLabels,
	groups,
	isCaelusActive,
}: {
	activeGroupLabels: ReadonlySet<string>;
	groups: readonly NavigationGroup[];
	isCaelusActive: boolean;
}) {
	return (
		<NavigationMenu.Root className="hidden md:block">
			<NavigationMenu.List className="flex items-center gap-1">
				{/* Caelus. This is not a group. */}
				<NavigationMenu.Item>
					<NavigationMenu.Link
						active={isCaelusActive}
						className={clsx(
							NAVIGATION_TRIGGER_CLASS,
							isCaelusActive ? NAVIGATION_ACTIVE_CLASS : NAVIGATION_INACTIVE_CLASS,
						)}
						render={<Link to="/caelus" />}
					>
						<Bot className="h-5 w-5" />
						<span>{APPLICATION_NAME}</span>
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				{groups.map((group) => {
					const isActive = activeGroupLabels.has(group.label);

					return (
						<NavigationMenu.Item key={group.label}>
							<NavigationMenu.Trigger
								className={clsx(
									NAVIGATION_TRIGGER_CLASS,
									isActive ? NAVIGATION_ACTIVE_CLASS : NAVIGATION_INACTIVE_CLASS,
								)}
							>
								<span>{group.label}</span>
								<NavigationMenu.Icon
									className={(state) => clsx("transition-transform", state.open && "rotate-180")}
								>
									<ChevronDown className="h-4 w-4" />
								</NavigationMenu.Icon>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="h-full w-64 py-1">
								{group.items.map((item) => (
									<DesktopNavigationLink item={item} key={item.to} />
								))}
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					);
				})}
			</NavigationMenu.List>
			<NavigationMenu.Portal>
				<NavigationMenu.Positioner
					align="start"
					className="h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)"
					collisionPadding={8}
					side="bottom"
					sideOffset={8}
				>
					<NavigationMenu.Popup className="relative z-50 h-(--popup-height) w-(--popup-width) overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-[width,height] duration-150 dark:border-gray-700 dark:bg-gray-900">
						<NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
					</NavigationMenu.Popup>
				</NavigationMenu.Positioner>
			</NavigationMenu.Portal>
		</NavigationMenu.Root>
	);
}

function MobileMenu({ onClose, user, userDisplayName, userIconURL }: MobileMenuProps) {
	const location = useLocation();
	const currentPath = location.pathname + location.search;
	const { t } = useTranslation();
	const navigationGroups = useNavigationGroups();
	const imageURL = user ? (userIconURL ?? avatarURL(user)) : null;

	return (
		<Dialog.Root
			onOpenChange={(open) => {
				if (!open) {
					onClose();
				}
			}}
			open
		>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs" />
				<Dialog.Popup className="fixed top-4 right-4 bottom-4 left-4 z-50 flex flex-col rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
					<div className="flex shrink-0 items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
						<Dialog.Title className="my-0 font-semibold text-gray-900 dark:text-gray-100">
							Navigation
						</Dialog.Title>
						<Dialog.Close
							aria-label={t("close", { ns: "general" })}
							className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
						>
							<X className="h-5 w-5" />
						</Dialog.Close>
					</div>
					<div className="flex-1 overflow-y-auto p-4">
						{user ? (
							<div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
								<div className="mb-3 flex items-center gap-3">
									<div
										aria-label={`Avatar of ${userDisplayName ?? user.username}`}
										className="h-8 w-8 rounded-full bg-cover bg-center"
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
									<MobileUserContextMenuItem
										icon={CheckSquare}
										onClick={onClose}
										to="/me/checklist"
									>
										{t("checklist.title", { ns: "features" })}
									</MobileUserContextMenuItem>
									<MobileUserContextMenuItem icon={Heart} onClick={onClose} to="/me/heart-history">
										{t("heart.history-title", { ns: "features" })}
									</MobileUserContextMenuItem>
									<MobileUserContextMenuItem
										icon={SettingsIcon}
										onClick={onClose}
										to="/me/settings"
									>
										{t("settings.name", { ns: "features" })}
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
									className="flex w-full items-center justify-center gap-2 rounded-lg bg-discord-button px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
									<h4 className="mb-2 px-3 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
										{group.label}
									</h4>
									<div className="space-y-1">
										{group.items.map((item) =>
											"external" in item ? (
												<a
													className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
													href={item.to}
													key={item.to}
													onClick={onClose}
													rel="noopener noreferrer"
													target="_blank"
												>
													<span className="flex h-5 w-5 shrink-0 items-center justify-center">
														{item.icon}
													</span>
													<div className="min-w-0">
														<div className="font-medium">{item.label}</div>
														<div className="text-sm text-gray-500 dark:text-gray-400">
															{item.description}
														</div>
													</div>
												</a>
											) : (
												<Link
													className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
													key={item.to}
													onClick={onClose}
													to={item.to}
												>
													<span className="flex h-5 w-5 shrink-0 items-center justify-center">
														{item.icon}
													</span>
													<div className="min-w-0">
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
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function SiteTopBarContent({ user, userDisplayName, userIconURL }: SiteTopBarProps) {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const topBarRef = useRef<HTMLDivElement>(null);
	const navigationGroups = useNavigationGroups();

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

	const activeGroupLabels = new Set(
		navigationGroups
			.filter(
				(group) =>
					group.label !== "Links" &&
					group.items.some(
						(item) =>
							!item.external &&
							location.pathname.startsWith(item.to.split("/").slice(0, 2).join("/")),
					),
			)
			.map((group) => group.label),
	);

	return (
		<>
			<div
				className="sticky top-0 z-30 px-4 pt-4 pb-2"
				ref={topBarRef}
				style={{ scrollbarGutter: "stable" }}
			>
				<div className="mx-auto max-w-7xl rounded-xl border border-gray-200 bg-white/90 p-4 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-6">
							<Link
								className="font-bold text-gray-900 transition-colors hover:text-blue-600 sm:text-xl dark:text-gray-100 dark:hover:text-blue-400"
								to="/"
							>
								thatskyapplication
							</Link>
							<DesktopNavigation
								activeGroupLabels={activeGroupLabels}
								groups={navigationGroups}
								isCaelusActive={location.pathname.startsWith("/caelus")}
							/>
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
								className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
								onClick={() => setMobileMenuOpen(true)}
								type="button"
							>
								<MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
							</button>
						</div>
					</div>
				</div>
			</div>
			{mobileMenuOpen && (
				<MobileMenu
					onClose={() => setMobileMenuOpen(false)}
					user={user}
					userDisplayName={userDisplayName}
					userIconURL={userIconURL}
				/>
			)}
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
	const { t } = useTranslation();
	const navigationGroups = useNavigationGroups();

	return (
		<footer className="mt-4 w-full border-t border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-4 py-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div className="col-span-1 md:col-span-2">
						<h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
							thatskyapplication
						</h3>
						<p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
							{t("website-description", { ns: "general" })}
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
								className="rounded-lg bg-discord-button p-2 transition-colors hover:bg-[#4752C4]"
								href={INVITE_SUPPORT_SERVER_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiDiscord className="h-5 w-5 text-white" />
							</a>
							<a
								aria-label="GitHub repository."
								className="rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700"
								href="https://github.com/thatskyapplication"
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiGithub className="h-5 w-5 text-white" />
							</a>
							<a
								aria-label="Help translate via Crowdin."
								className="rounded-lg bg-[#2E3440] p-2 transition-colors hover:bg-[#242933]"
								href={CROWDIN_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								<SiCrowdin className="h-5 w-5 text-white" />
							</a>
						</div>
					</div>
					<div>
						<h4 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Features</h4>
						<ul className="space-y-2">
							{navigationGroups
								.find((group) => group.label === "Features")
								?.items.map((item) => (
									<li key={item.to}>
										<Link
											className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
											to={item.to}
										>
											{item.label}
										</Link>
									</li>
								))}
						</ul>
					</div>
					<div>
						<h4 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Support</h4>
						<ul className="space-y-2">
							{navigationGroups
								.find((group) => group.label === "Links")
								?.items.map((item) =>
									"external" in item ? (
										<li key={item.to}>
											<a
												className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
												className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
