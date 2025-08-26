import { useLocation } from "react-router";
import { SiteFooter, SiteTopBar } from "~/components/SiteNavigation";
import { EXCLUDE_TOP_BAR_AND_FOOTER } from "~/utility/constants";
import type { DiscordUser } from "~/utility/types";

interface ConditionalLayoutProps {
	children: React.ReactNode;
	forceShowTopBar?: boolean;
	forceShowFooter?: boolean;
	user: DiscordUser | null;
	locale: string;
}

export default function ConditionalLayout({
	children,
	forceShowTopBar,
	forceShowFooter,
	user,
	locale,
}: ConditionalLayoutProps) {
	const location = useLocation();

	const shouldShowNavigation =
		forceShowTopBar === undefined
			? !EXCLUDE_TOP_BAR_AND_FOOTER.includes(
					location.pathname as (typeof EXCLUDE_TOP_BAR_AND_FOOTER)[number],
				)
			: forceShowTopBar;

	const shouldShowFooter =
		forceShowFooter === undefined
			? !EXCLUDE_TOP_BAR_AND_FOOTER.includes(
					location.pathname as (typeof EXCLUDE_TOP_BAR_AND_FOOTER)[number],
				)
			: forceShowFooter;

	return (
		<div className="min-h-screen flex flex-col">
			{shouldShowNavigation && <SiteTopBar locale={locale} user={user} />}
			<main className={`flex-1 ${shouldShowNavigation ? "pt-20" : ""}`}>{children}</main>
			{shouldShowFooter && <SiteFooter />}
		</div>
	);
}
