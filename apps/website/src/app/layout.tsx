import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { caelus } from "~/structures/SkyKid";
import { hind } from "~/util/fonts";
import "@unocss/reset/tailwind-compat.css";
import "~/styles/unocss.css";

export const metadata = {
	title: "Caelus",
	description:
		"Caelus is a Discord bot for Sky: Children of the Light. Comes equipped with fun, hugs, and smiles. Share the love with your community!",
	themeColor: "#A5B5F1",
	openGraph: {
		siteName: "thatskyapplication",
		images: { url: caelus.avatarIcon },
		type: "website",
	},
} as const satisfies Readonly<Metadata>;

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html className={hind.className} lang="en" suppressHydrationWarning>
			<body className="bg-lightblue-200 dark:bg-dark-600 dark:text-light-800">
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
