"use client";

import { Button } from "ariakit/button";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";
import { IoIosLink } from "react-icons/io";
import { SiDiscord } from "react-icons/si";
import { TbSquareRoundedChevronRight } from "react-icons/tb";
import { VscMenu } from "react-icons/vsc";
import { useNav } from "~/contexts/nav";
import { INVITE_APPLICATION_URL, INVITE_SUPPORT_SERVER_URL } from "~/util/constants";

const ThemeSwitcher = dynamic(async () => import("./ThemeSwitcher"));

export default function Header() {
	const pathname = usePathname();
	const { setOpened } = useNav();

	const pathElements = useMemo(
		() =>
			pathname
				.split("/")
				.slice(1)
				.map((path, idx, original) => (
					<Link
						className="rounded outline-none hover:underline focus:underline"
						href={`/${original.slice(0, idx + 1).join("/")}`}
						key={`${path}-${idx}`}
					>
						{path}
					</Link>
				)),
		[pathname],
	);

	const breadcrumbs = useMemo(
		() =>
			pathElements.flatMap((value, index, array) => (
				<Fragment key={`${value.key}-${index}`}>
					<div>{value}</div>
					{index < array.length - 1 ? (
						<div className="mx-2">
							<TbSquareRoundedChevronRight />
						</div>
					) : (
						""
					)}
				</Fragment>
			)),
		[pathElements],
	);

	return (
		<header className="sticky top-4 z-20 border border-light-900 rounded-md bg-white/75 shadow backdrop-blur-md dark:border-dark-100 dark:bg-dark-600/75">
			<div className="block h-16 px-6">
				<div className="h-full flex flex-row place-content-between place-items-center gap-8">
					<Button
						aria-label="Menu"
						className="h-6 w-6 flex flex-row transform-gpu cursor-pointer select-none appearance-none place-items-center border-0 rounded bg-transparent p-0 text-sm font-semibold leading-none no-underline outline-none lg:hidden active:translate-y-px focus:ring focus:ring-caelus dark:focus:ring-white focus:ring-width-2"
						onClick={() => setOpened((open) => !open)}
					>
						<VscMenu size={24} />
					</Button>
					<div className="hidden lg:flex lg:grow lg:flex-row lg:overflow-hidden place-items-center">{breadcrumbs}</div>
					<div className="flex flex-row place-items-center gap-4">
						<Button
							aria-label="Invite Caelus"
							as="a"
							className="h-6 w-6 flex flex-row transform-gpu cursor-pointer select-none appearance-none place-items-center border-0 rounded rounded-full bg-transparent p-0 text-sm font-semibold leading-none no-underline outline-none active:translate-y-px focus:ring focus:ring-caelus dark:focus:ring-white focus:ring-width-2"
							href={INVITE_APPLICATION_URL}
							rel="external noopener noreferrer"
							target="_blank"
						>
							<IoIosLink size={20} />
						</Button>
						<Button
							aria-label="Join Support Server"
							as="a"
							className="h-6 w-6 flex flex-row transform-gpu cursor-pointer select-none appearance-none place-items-center border-0 rounded rounded-full bg-transparent p-0 text-sm font-semibold leading-none no-underline outline-none active:translate-y-px focus:ring focus:ring-caelus dark:focus:ring-white focus:ring-width-2"
							href={INVITE_SUPPORT_SERVER_URL}
							rel="external noopener noreferrer"
							target="_blank"
						>
							<SiDiscord size={20} />
						</Button>
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</header>
	);
}
