import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { Form, Link, useSearchParams } from "react-router";

interface PaginationProps {
	currentPage: number;
	maximumPage: number;
	minimumPage?: number;
}

export default function Pagination({ currentPage, maximumPage, minimumPage = 1 }: PaginationProps) {
	const [searchParams] = useSearchParams();

	// Avoids resetting query parameters.
	const createPageURL = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		return `?${params.toString()}`;
	};

	const back2 = currentPage - 2;
	const back1 = currentPage - 1;
	const next1 = currentPage + 1;
	const next2 = currentPage + 2;
	const absoluteMaximumPage = Math.max(Math.abs(maximumPage), Math.abs(minimumPage));

	const maximumLength =
		minimumPage < 0
			? absoluteMaximumPage.toString().length + 1
			: absoluteMaximumPage.toString().length;

	return (
		<div className="mt-8 flex justify-center items-center space-x-2">
			{
				<Link
					className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
						currentPage <= minimumPage ? "cursor-not-allowed opacity-50" : ""
					}`}
					onClick={(event) => {
						if (currentPage <= minimumPage) {
							event.preventDefault();
						}
					}}
					to={createPageURL(minimumPage)}
				>
					<ChevronsLeftIcon className="w-6 h-6" />
					<span className="hidden md:block ml-1">Start</span>
				</Link>
			}
			<Link
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					currentPage <= minimumPage ? "cursor-not-allowed opacity-50" : ""
				}`}
				onClick={(event) => {
					if (currentPage <= minimumPage) {
						event.preventDefault();
					}
				}}
				to={createPageURL(back1)}
			>
				<ChevronLeftIcon className="w-6 h-6" />
			</Link>
			<div className="flex items-center space-x-2">
				{back2 >= minimumPage && (
					<Link
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
						to={createPageURL(back2)}
					>
						<span>{back2}</span>
					</Link>
				)}
				{back1 >= minimumPage && (
					<Link
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
						to={createPageURL(back1)}
					>
						<span>{back1}</span>
					</Link>
				)}
				<Form
					method="get"
					onSubmit={(event) => {
						const form = event.currentTarget;
						const pageInput = form.elements.namedItem("page") as HTMLInputElement;
						const pageValue = Number(pageInput.value);

						if (pageValue > maximumPage) {
							event.preventDefault();
							pageInput.value = maximumPage.toString();
							setTimeout(() => form.submit(), 0);
							return;
						}

						if (pageValue < minimumPage) {
							event.preventDefault();
							pageInput.value = minimumPage.toString();
							setTimeout(() => form.submit(), 0);
							return;
						}
					}}
				>
					<input
						className="p-2 border border-gray-200 dark:border-gray-600 w-10 h-10 text-center rounded-full"
						defaultValue={currentPage}
						inputMode="numeric"
						key={currentPage}
						maxLength={maximumLength}
						name="page"
						pattern={minimumPage < 0 ? `-?\\d{1,${maximumLength}}` : `\\d{1,${maximumLength}}`}
						type="text"
					/>
				</Form>
				{next1 <= maximumPage && (
					<Link
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
						to={createPageURL(next1)}
					>
						<span>{next1}</span>
					</Link>
				)}
				{next2 <= maximumPage && (
					<Link
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
						to={createPageURL(next2)}
					>
						<span>{next2}</span>
					</Link>
				)}
			</div>
			<Link
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					currentPage >= maximumPage ? "cursor-not-allowed opacity-50" : ""
				}`}
				onClick={(event) => {
					if (currentPage >= maximumPage) {
						event.preventDefault();
					}
				}}
				to={createPageURL(next1)}
			>
				<ChevronRightIcon className="w-6 h-6" />
			</Link>
			{
				<Link
					className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
						currentPage >= maximumPage ? "cursor-not-allowed opacity-50" : ""
					}`}
					onClick={(event) => {
						if (currentPage >= maximumPage) {
							event.preventDefault();
						}
					}}
					to={createPageURL(maximumPage)}
				>
					<span className="hidden md:block mr-1">End</span>
					<ChevronsRightIcon className="w-6 h-6" />
				</Link>
			}
		</div>
	);
}
