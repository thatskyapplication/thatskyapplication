export function ProgressBar({ percentage }: { percentage: number }) {
	return (
		<div
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={percentage}
			className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
			role="progressbar"
		>
			<div
				className="h-full rounded-full bg-blue-500 transition-all"
				style={{ width: `${percentage}%` }}
			/>
		</div>
	);
}
