import type { ReactNode } from "react";
import TopBar from "./TopBar.js";

interface PageLayoutProps {
	children: ReactNode;
	back?: string;
	hideBack?: boolean;
	className?: string;
}

export default function PageLayout({ children, back, hideBack, className }: PageLayoutProps) {
	return (
		<div className={`min-h-screen pt-20 ${className ? ` ${className}` : ""}`}>
			<TopBar back={back} hideBack={hideBack} />
			{children}
		</div>
	);
}
