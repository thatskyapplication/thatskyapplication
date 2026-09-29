import { clsx } from "clsx";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Form, Link, useSearchParams } from "react-router";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";

interface PaginationProps {
	currentPage: number;
	excludeSearchParameters?: readonly string[];
	formatPage?: (page: number) => string;
	getPageURL?: (page: number) => string;
	maximumPage: number;
	minimumPage?: number;
	preventScrollReset?: boolean;
}

const EMPTY_SEARCH_PARAMETERS: readonly string[] = [];

const CONTROL_CLASS_NAME =
	"inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 p-0 text-sm font-medium shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:h-12 sm:w-auto sm:px-3 sm:text-base dark:border-gray-600 dark:bg-gray-900 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-gray-950" as const;

const ENABLED_CONTROL_CLASS_NAME =
	"hover:bg-gray-100/50 hover:shadow-lg dark:hover:bg-gray-900/50" as const;

const DISABLED_CONTROL_CLASS_NAME = "cursor-not-allowed opacity-50" as const;

const PAGE_LINK_CLASS_NAME =
	"inline-flex h-9 min-w-[var(--pagination-page-width)] items-center justify-center rounded-full px-2 text-sm font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-gray-100/75 hover:shadow-lg sm:h-10 sm:min-w-[var(--pagination-page-width-sm)] sm:px-3 sm:text-base dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-gray-950 dark:hover:bg-gray-900/50" as const;

interface PaginationControlProps {
	"aria-label": string;
	children: ReactNode;
	disabled?: boolean;
	preventScrollReset?: boolean;
	to: string;
}

function PaginationControl({
	"aria-label": ariaLabel,
	children,
	disabled = false,
	preventScrollReset = false,
	to,
}: PaginationControlProps) {
	const className = clsx(
		CONTROL_CLASS_NAME,
		disabled ? DISABLED_CONTROL_CLASS_NAME : ENABLED_CONTROL_CLASS_NAME,
	);

	return disabled ? (
		<button aria-label={ariaLabel} className={className} disabled type="button">
			{children}
		</button>
	) : (
		<Link
			aria-label={ariaLabel}
			className={className}
			preventScrollReset={preventScrollReset}
			to={to}
		>
			{children}
		</Link>
	);
}

export default function Pagination({
	currentPage,
	excludeSearchParameters = EMPTY_SEARCH_PARAMETERS,
	formatPage = String,
	getPageURL,
	maximumPage,
	minimumPage = 1,
	preventScrollReset = false,
}: PaginationProps) {
	const [searchParams] = useSearchParams();
	const excludedSearchParameters = new Set(excludeSearchParameters);

	// Avoids resetting query parameters.
	const createPageURL =
		getPageURL ??
		((page: number) => {
			const params = new URLSearchParams(searchParams);

			for (const parameter of excludedSearchParameters) {
				params.delete(parameter);
			}

			params.set("page", page.toString());
			return `?${params.toString()}`;
		});

	const back2 = currentPage - 2;
	const back1 = currentPage - 1;
	const next1 = currentPage + 1;
	const next2 = currentPage + 2;
	const absoluteMaximumPage = Math.max(Math.abs(maximumPage), Math.abs(minimumPage));
	const maximumDigitLength = absoluteMaximumPage.toString().length;
	const maximumInputLength = getPageURL
		? Math.max(
				...[back2, back1, currentPage, next1, next2]
					.filter((page) => page >= minimumPage && page <= maximumPage)
					.map((page) => formatPage(page).length),
			)
		: minimumPage < 0
			? maximumDigitLength + 1
			: maximumDigitLength;
	const showsOuterNeighbours = getPageURL === undefined;
	const neighbourClassName = getPageURL ? "hidden lg:block" : "hidden sm:block";
	const previousDisabled = currentPage <= minimumPage;
	const nextDisabled = currentPage >= maximumPage;
	const paginationStyle = {
		"--pagination-current-width": `max(3.5rem, calc(${maximumInputLength}ch + 1.5rem))`,
		"--pagination-current-width-sm": `max(5rem, calc(${maximumInputLength}ch + 3rem))`,
		"--pagination-page-width": `max(2.75rem, calc(${maximumInputLength}ch + 1rem))`,
		"--pagination-page-width-sm": `max(3.5rem, calc(${maximumInputLength}ch + 2rem))`,
	} as CSSProperties;
	const hiddenSearchParameterOccurrences = new Map<string, number>();
	const hiddenSearchParameters: { key: string; name: string; value: string }[] = [];

	for (const [name, value] of searchParams.entries()) {
		if (name === "page" || excludedSearchParameters.has(name)) {
			continue;
		}

		const parameterKey = JSON.stringify([name, value]);
		const occurrence = hiddenSearchParameterOccurrences.get(parameterKey) ?? 0;
		hiddenSearchParameterOccurrences.set(parameterKey, occurrence + 1);
		hiddenSearchParameters.push({ key: JSON.stringify([name, value, occurrence]), name, value });
	}

	return (
		<nav
			aria-label="Pagination"
			className="mt-6 flex justify-center sm:mt-8"
			style={paginationStyle}
		>
			<ul className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2">
				<li>
					<PaginationControl
						aria-label="Go to first page"
						disabled={previousDisabled}
						preventScrollReset={preventScrollReset}
						to={createPageURL(minimumPage)}
					>
						<ChevronsLeftIcon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
						<span className="ml-1 hidden md:block">Start</span>
					</PaginationControl>
				</li>
				<li>
					<PaginationControl
						aria-label="Go to previous page"
						disabled={previousDisabled}
						preventScrollReset={preventScrollReset}
						to={createPageURL(back1)}
					>
						<ChevronLeftIcon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
					</PaginationControl>
				</li>
				{showsOuterNeighbours && back2 >= minimumPage && (
					<li className={neighbourClassName}>
						<Link
							aria-label={`Go to page ${formatPage(back2)}`}
							className={PAGE_LINK_CLASS_NAME}
							preventScrollReset={preventScrollReset}
							to={createPageURL(back2)}
						>
							{formatPage(back2)}
						</Link>
					</li>
				)}
				{back1 >= minimumPage && (
					<li className={neighbourClassName}>
						<Link
							aria-label={`Go to page ${formatPage(back1)}`}
							className={PAGE_LINK_CLASS_NAME}
							preventScrollReset={preventScrollReset}
							to={createPageURL(back1)}
						>
							{formatPage(back1)}
						</Link>
					</li>
				)}
				<li>
					{getPageURL ? (
						<span
							aria-current="page"
							className="inline-flex h-11 min-w-(--pagination-current-width) items-center justify-center rounded-full border border-gray-400 bg-gray-100 px-3 text-base leading-normal font-medium tabular-nums shadow-sm sm:h-14 sm:min-w-(--pagination-current-width-sm) sm:px-4 sm:text-lg dark:border-gray-600 dark:bg-gray-900"
						>
							{formatPage(currentPage)}
						</span>
					) : (
						<Form
							method="get"
							preventScrollReset={preventScrollReset}
							onSubmit={(event) => {
								const pageInput = event.currentTarget.elements.namedItem(
									"page",
								) as HTMLInputElement;
								const pageValue = Number(pageInput.value.trim());

								if (!Number.isInteger(pageValue)) {
									pageInput.value = currentPage.toString();
									return;
								}

								pageInput.value = Math.max(
									minimumPage,
									Math.min(maximumPage, pageValue),
								).toString();
							}}
						>
							{hiddenSearchParameters.map(({ key, name, value }) => (
								<input key={key} name={name} type="hidden" value={value} />
							))}
							<input
								aria-current="page"
								aria-label={`Current page, enter a page from ${minimumPage} to ${maximumPage}`}
								className="h-11 w-(--pagination-current-width) rounded-full border border-gray-400 bg-gray-100 px-2 text-center text-base leading-normal font-medium tabular-nums shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:h-14 sm:w-(--pagination-current-width-sm) sm:px-4 sm:text-lg dark:border-gray-600 dark:bg-gray-900 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-gray-950"
								defaultValue={currentPage}
								inputMode="numeric"
								key={currentPage}
								maxLength={maximumInputLength}
								name="page"
								pattern={
									minimumPage < 0
										? `-?\\d{1,${maximumDigitLength}}`
										: `\\d{1,${maximumDigitLength}}`
								}
								type="text"
								{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
							/>
						</Form>
					)}
				</li>
				{next1 <= maximumPage && (
					<li className={neighbourClassName}>
						<Link
							aria-label={`Go to page ${formatPage(next1)}`}
							className={PAGE_LINK_CLASS_NAME}
							preventScrollReset={preventScrollReset}
							to={createPageURL(next1)}
						>
							{formatPage(next1)}
						</Link>
					</li>
				)}
				{showsOuterNeighbours && next2 <= maximumPage && (
					<li className={neighbourClassName}>
						<Link
							aria-label={`Go to page ${formatPage(next2)}`}
							className={PAGE_LINK_CLASS_NAME}
							preventScrollReset={preventScrollReset}
							to={createPageURL(next2)}
						>
							{formatPage(next2)}
						</Link>
					</li>
				)}
				<li>
					<PaginationControl
						aria-label="Go to next page"
						disabled={nextDisabled}
						preventScrollReset={preventScrollReset}
						to={createPageURL(next1)}
					>
						<ChevronRightIcon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
					</PaginationControl>
				</li>
				<li>
					<PaginationControl
						aria-label="Go to last page"
						disabled={nextDisabled}
						preventScrollReset={preventScrollReset}
						to={createPageURL(maximumPage)}
					>
						<span className="mr-1 hidden md:block">End</span>
						<ChevronsRightIcon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
					</PaginationControl>
				</li>
			</ul>
		</nav>
	);
}
