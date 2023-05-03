"use client";

import { Disclosure, DisclosureContent, useDisclosureState } from "ariakit/disclosure";
import type { PropsWithChildren } from "react";
import { VscChevronDown } from "react-icons/vsc";

export interface SectionOptions {
	background?: boolean | undefined;
	buttonClassName?: string;
	className?: string;
	defaultClosed?: boolean | undefined;
	gutter?: boolean | undefined;
	icon?: JSX.Element | undefined;
	padded?: boolean | undefined;
	title: string;
}

export function Section({
	title,
	icon,
	padded = false,
	defaultClosed = false,
	background = false,
	gutter = false,
	children,
	className = "",
	buttonClassName = "",
}: PropsWithChildren<SectionOptions>) {
	const disclosure = useDisclosureState({ defaultOpen: !defaultClosed });

	return (
		<div className={`flex flex-col ${className}`}>
			<Disclosure
				className={
					buttonClassName
						? buttonClassName
						: "hover:bg-light-800 active:bg-light-900 dark:bg-dark-400 dark:hover:bg-dark-300 dark:active:bg-dark-200 focus:ring-width-2 focus:ring focus:ring-caelus dark:focus:ring-white rounded bg-white p-3 outline-none"
				}
				state={disclosure}
			>
				<div className="flex flex-row place-content-between place-items-center">
					<div className="flex flex-row place-items-center gap-3">
						{icon ?? null}
						<span className="font-semibold">{title}</span>
					</div>
					<VscChevronDown
						className={`transform transition duration-150 ease-in-out ${disclosure.open ? "rotate-180" : "rotate-0"}`}
						size={20}
					/>
				</div>
			</Disclosure>
			<DisclosureContent
				className={`${background ? "bg-light-700 dark:bg-dark-500 rounded" : ""} ${gutter ? "mt-2" : ""}`}
				state={disclosure}
			>
				{padded ? <div className="mx-2 px-0 py-5 md:mx-6.5 md:px-4.5">{children}</div> : children}
			</DisclosureContent>
		</div>
	);
}
