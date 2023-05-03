import type { PropsWithChildren } from "react";
import Header from "~/components/Header";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<main className="mx-auto max-w-7xl px-4 lg:max-w-full">
			<Header />
			<div className="relative top-6 mx-auto max-w-7xl gap-6 lg:max-w-full lg:flex">
				<div className="mx-auto max-w-5xl min-w-xs w-full pb-10">{children}</div>
			</div>
		</main>
	);
}
