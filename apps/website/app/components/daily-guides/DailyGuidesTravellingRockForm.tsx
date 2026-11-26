import { clsx } from "clsx";
import { Check, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import { ALLOWED_IMAGE_MEDIA_TYPES, isValidImageAsset } from "@thatskyapplication/utility";
import { ActionButton } from "~/components/ActionButton.js";
import type { action } from "~/routes/admin.daily-guides.js";
import {
	FIELD_ERROR_CLASS,
	FORM_ERROR_BANNER_CLASS,
	SUBSECTION_HEADING_CLASS,
	SUCCESS_BANNER_CLASS,
} from "~/utility/styles.js";

export const MAXIMUM_TRAVELLING_ROCK_SIZE = 10_000_000 as const;

export const TRAVELLING_ROCK_INVALID_IMAGE_ERROR =
	"Choose a GIF, JPEG, PNG or WebP image of up to 10 MB." as const;

export interface DailyGuidesTravellingRock {
	imageURL: string | null;
	loaded: string;
	notSpawned: boolean;
}

function DailyGuidesTravellingRockFields({
	disabled,
	imageURL,
	notSpawned: loadedNotSpawned,
}: {
	disabled: boolean;
	imageURL: string | null;
	notSpawned: boolean;
}) {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const previewURLRef = useRef<string | null>(null);
	const [previewURL, setPreviewURL] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [notSpawned, setNotSpawned] = useState(loadedNotSpawned);
	const shownImageURL = previewURL ?? (notSpawned ? null : imageURL);
	const unchanged = previewURL === null && notSpawned === loadedNotSpawned;

	useEffect(
		() => () => {
			if (previewURLRef.current) {
				URL.revokeObjectURL(previewURLRef.current);
			}
		},
		[],
	);

	function showPreview(file: File | null) {
		if (previewURLRef.current) {
			URL.revokeObjectURL(previewURLRef.current);
		}

		const nextPreviewURL = file ? URL.createObjectURL(file) : null;
		previewURLRef.current = nextPreviewURL;
		setPreviewURL(nextPreviewURL);
	}

	return (
		<>
			<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="travelling-rock">
				Upload a GIF, JPEG, PNG or WebP image of up to 10 MB.
			</label>
			<input
				accept={ALLOWED_IMAGE_MEDIA_TYPES.join(",")}
				aria-describedby={imageError ? "travelling-rock-error" : undefined}
				aria-invalid={imageError ? true : undefined}
				className="sr-only"
				disabled={disabled}
				id="travelling-rock"
				name="travelling-rock"
				onChange={(event) => {
					const file = event.currentTarget.files?.[0] ?? null;

					if (file && !isValidImageAsset(file, MAXIMUM_TRAVELLING_ROCK_SIZE)) {
						event.currentTarget.value = "";
						setImageError(TRAVELLING_ROCK_INVALID_IMAGE_ERROR);
						showPreview(null);
						return;
					}

					setImageError(null);
					showPreview(file);

					if (file) {
						setNotSpawned(false);
					}
				}}
				ref={imageInputRef}
				type="file"
			/>
			<button
				aria-describedby={imageError ? "travelling-rock-error" : undefined}
				className={clsx(
					"flex min-h-48 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border text-center shadow-sm transition-colors",
					imageError
						? "border-red-500 bg-white dark:border-red-500 dark:bg-gray-800"
						: "border-gray-300 bg-white hover:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400",
					disabled && "cursor-not-allowed opacity-60",
				)}
				disabled={disabled}
				onClick={() => imageInputRef.current?.click()}
				type="button"
			>
				{shownImageURL ? (
					<img
						alt="Travelling rock."
						className="max-h-96 w-full object-contain"
						src={shownImageURL}
					/>
				) : (
					<>
						<Upload className="h-8 w-8 shrink-0 text-gray-500 dark:text-gray-400" />
						<span className={clsx(SUBSECTION_HEADING_CLASS, "px-6")}>
							{notSpawned ? "Not spawned" : "Choose an image"}
						</span>
					</>
				)}
			</button>
			{imageError && (
				<p className={FIELD_ERROR_CLASS} id="travelling-rock-error">
					{imageError}
				</p>
			)}

			<label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
				<input
					checked={notSpawned}
					className="h-4 w-4 cursor-pointer"
					disabled={disabled}
					name="travelling-rock-not-spawned"
					onChange={(event) => {
						const checked = event.currentTarget.checked;
						setNotSpawned(checked);

						if (checked && imageInputRef.current) {
							imageInputRef.current.value = "";
							setImageError(null);
							showPreview(null);
						}
					}}
					type="checkbox"
					value="true"
				/>
				<span>Not spawned</span>
			</label>

			<ActionButton
				className="sm:w-fit"
				disabled={disabled || unchanged}
				type="submit"
				variant="primary"
			>
				{disabled ? "Saving..." : "Save travelling rock"}
			</ActionButton>
		</>
	);
}

export function DailyGuidesTravellingRockForm({
	date,
	travellingRock,
}: {
	date: string;
	travellingRock: DailyGuidesTravellingRock;
}) {
	const fetcher = useFetcher<typeof action>();
	const isSaving = fetcher.state !== "idle";
	const result = fetcher.data?.intent === "travelling-rock" ? fetcher.data : null;

	return (
		<fetcher.Form className="flex flex-col gap-3" encType="multipart/form-data" method="post">
			<input name="intent" type="hidden" value="travelling-rock" />
			<input name="date" type="hidden" value={date} />
			<input name="loaded" type="hidden" value={travellingRock.loaded} />

			<DailyGuidesTravellingRockFields
				disabled={isSaving}
				imageURL={travellingRock.imageURL}
				key={travellingRock.loaded}
				notSpawned={travellingRock.notSpawned}
			/>

			{result?.ok === false && <div className={FORM_ERROR_BANNER_CLASS}>{result.error}</div>}

			{result?.ok === true && (
				<div className={SUCCESS_BANNER_CLASS}>
					<Check className="h-5 w-5 shrink-0" />
					<p>Travelling rock saved.</p>
				</div>
			)}
		</fetcher.Form>
	);
}
