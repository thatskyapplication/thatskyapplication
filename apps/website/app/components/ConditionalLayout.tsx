import { useLocation } from "@remix-run/react";
import { SiteFooter, SiteTopBar } from "~/components/SiteNavigation";
import { EXCLUDE_TOP_BAR_AND_FOOTER } from "~/utility/constants.js";

interface ConditionalLayoutProps {
	children: React.ReactNode;
	forceShowTopBar?: boolean;
	forceShowFooter?: boolean;
}

export default function ConditionalLayout({
	children,
	forceShowTopBar,
	forceShowFooter,
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
			{shouldShowNavigation && <SiteTopBar />}
			<main className={`flex-1 ${shouldShowNavigation ? "pt-20" : ""}`}>{children}</main>
			{shouldShowFooter && <SiteFooter />}
		</div>
	);
}
