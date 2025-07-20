import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { Form, Link } from "react-router";

interface PaginationProps {
	currentPage: number;
	totalPages?: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
	const back2 = currentPage - 2;
	const back1 = currentPage - 1;
	const next1 = currentPage + 1;
	const next2 = currentPage + 2;

	return (
		<div className="mt-8 flex justify-center items-center space-x-2">
			{typeof totalPages === "number" && (
				<Link
					to={"?page=1"}
					onClick={(event) => {
						if (currentPage <= 1) {
							event.preventDefault();
						}
					}}
					className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
						currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
					}`}
				>
					<ChevronsLeftIcon className="w-6 h-6" />
					<span className="hidden md:block ml-1">Start</span>
				</Link>
			)}
			<Link
				to={`?page=${back1}`}
				onClick={(event) => {
					if (typeof totalPages === "number" && currentPage <= 1) {
						event.preventDefault();
					}
				}}
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					typeof totalPages === "number" && currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
				}`}
			>
				<ChevronLeftIcon className="w-6 h-6" />
			</Link>
			<div className="flex items-center space-x-2">
				{(totalPages === undefined || back2 > 0) && (
					<Link
						to={`?page=${back2}`}
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
					>
						<span>{back2}</span>
					</Link>
				)}
				{(totalPages === undefined || back1 > 0) && (
					<Link
						to={`?page=${back1}`}
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
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

						if (typeof totalPages === "number" && pageValue > totalPages) {
							event.preventDefault();
							pageInput.value = totalPages.toString();
							setTimeout(() => form.submit(), 0);
						}

						if (typeof totalPages === "number" && pageValue < 1) {
							event.preventDefault();
							pageInput.value = "1";
							setTimeout(() => form.submit(), 0);
						}
					}}
				>
					<input
						key={currentPage}
						className="p-2 border border-gray-200 dark:border-gray-600 w-10 h-10 text-center rounded-full"
						type="text"
						inputMode="numeric"
						pattern={totalPages === undefined ? "-?\\d*" : "\\d*"}
						name="page"
						defaultValue={currentPage}
						maxLength={String(totalPages).length}
					/>
				</Form>
				{(totalPages === undefined || (typeof totalPages === "number" && next1 <= totalPages)) && (
					<Link
						to={`?page=${next1}`}
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
					>
						<span>{next1}</span>
					</Link>
				)}
				{(totalPages === undefined || (typeof totalPages === "number" && next2 <= totalPages)) && (
					<Link
						to={`?page=${next2}`}
						className="hover:shadow-lg flex items-center justify-center hover:bg-gray-100/75 dark:hover:bg-gray-900/50 rounded-full h-6 w-6"
					>
						<span>{next2}</span>
					</Link>
				)}
			</div>
			<Link
				to={`?page=${next1}`}
				onClick={(event) => {
					if (typeof totalPages === "number" && currentPage >= totalPages) {
						event.preventDefault();
					}
				}}
				className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
					typeof totalPages === "number" && currentPage >= totalPages
						? "cursor-not-allowed opacity-50"
						: ""
				}`}
			>
				<ChevronRightIcon className="w-6 h-6" />
			</Link>
			{typeof totalPages === "number" && (
				<Link
					to={`?page=${totalPages}`}
					onClick={(event) => {
						if (currentPage >= totalPages) {
							event.preventDefault();
						}
					}}
					className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg flex items-center p-2 ${
						currentPage >= totalPages ? "cursor-not-allowed opacity-50" : ""
					}`}
				>
					<span className="hidden md:block mr-1">End</span>
					<ChevronsRightIcon className="w-6 h-6" />
				</Link>
			)}
		</div>
	);
}
