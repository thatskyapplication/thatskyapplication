import type { Snowflake } from "@discordjs/core/http-only";
import { clsx } from "clsx";
import { Check, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
import type { FriendshipActionTypes } from "@thatskyapplication/utility";
import { ActionButton } from "~/components/ActionButton.js";
import { ExternalLink } from "~/components/ExternalLink";
import Select from "~/components/Select";
import { useIsSaving } from "~/hooks/use-is-saving.js";
import { FriendshipActionTypeToLabel } from "~/utility/friendship-actions.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";
import {
	FIELD_ERROR_CLASS,
	FORM_ERROR_BANNER_CLASS,
	SECTION_CARD_CLASS,
	SECTION_HEADING_CLASS,
	SUBSECTION_HEADING_CLASS,
	SUCCESS_BANNER_CLASS,
	textFieldClass,
} from "~/utility/styles.js";

export interface FriendshipActionUploadErrors {
	type?: string;
	asset?: string;
	users?: string;
	reference?: string;
	form?: string;
}

export interface SuccessfulUpload {
	id: number;
	type: FriendshipActionTypes;
	users: readonly Snowflake[];
	assetURL: string;
}

export const MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE = 5_000_000 as const;
export const MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE = 512 as const;
export const MAXIMUM_FRIENDSHIP_ACTIONS_USERS = 5 as const;

const FIELD_LABEL_CLASS = "text-sm text-gray-600 dark:text-gray-400" as const;

export function FriendshipActionUploadForm({
	errors,
	upload,
}: {
	errors: FriendshipActionUploadErrors;
	upload: SuccessfulUpload | null;
}) {
	const isSaving = useIsSaving();
	const formRef = useRef<HTMLFormElement>(null);
	const assetInputRef = useRef<HTMLInputElement>(null);
	const assetPreviewURLRef = useRef<string | null>(null);
	const [assetFileName, setAssetFileName] = useState("");
	const [assetPreviewURL, setAssetPreviewURL] = useState<string | null>(null);
	const [typeValue, setTypeValue] = useState("");

	useEffect(
		() => () => {
			if (assetPreviewURLRef.current) {
				URL.revokeObjectURL(assetPreviewURLRef.current);
			}
		},
		[],
	);

	useEffect(() => {
		if (upload) {
			formRef.current?.reset();
			// oxlint-disable-next-line react/set-state-in-effect -- Reset controlled fields after a confirmed successful submission.
			setAssetFileName("");
			if (assetPreviewURLRef.current) {
				URL.revokeObjectURL(assetPreviewURLRef.current);
			}
			assetPreviewURLRef.current = null;
			setAssetPreviewURL(null);
			setTypeValue("");
		}
	}, [upload]);

	return (
		<div className="flex flex-col gap-3">
			<h2 className={SECTION_HEADING_CLASS}>Upload a friendship action</h2>

			<Form
				className="flex flex-col gap-4"
				encType="multipart/form-data"
				method="post"
				ref={formRef}
			>
				<input name="intent" type="hidden" value="upload" />

				{errors.form ? <div className={FORM_ERROR_BANNER_CLASS}>{errors.form}</div> : null}

				<div className="flex flex-col gap-4">
					<div className={SECTION_CARD_CLASS}>
						<h3 className={SUBSECTION_HEADING_CLASS} id="type-heading">
							Type
						</h3>
						<div className="flex flex-col gap-2">
							<p className="my-0 text-sm text-gray-600 dark:text-gray-400" id="type-description">
								Choose which friendship action this GIF belongs to.
							</p>
							<Select
								ariaDescribedBy="type-description"
								ariaLabelledBy="type-heading"
								className="w-full"
								disabled={isSaving}
								error={errors.type}
								onChange={(value) => setTypeValue(value)}
								options={Object.entries(FriendshipActionTypeToLabel).map(([value, label]) => ({
									label,
									value,
								}))}
								placeholder="Select a friendship action"
								surface="page"
								value={typeValue}
							/>
							<input name="type" type="hidden" value={typeValue} />
						</div>
					</div>

					<div className={SECTION_CARD_CLASS}>
						<h3 className={SUBSECTION_HEADING_CLASS}>Asset</h3>
						<div className="flex flex-col gap-2">
							<label className={FIELD_LABEL_CLASS} htmlFor="asset">
								Upload a 1:1 GIF up to {MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE}x
								{MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE} and{" "}
								{(MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE / 1_000_000).toFixed(0)} MB.
							</label>
							<input
								accept="image/gif"
								aria-describedby={errors.asset ? "asset-error" : undefined}
								aria-invalid={errors.asset ? true : undefined}
								className="sr-only"
								disabled={isSaving}
								id="asset"
								name="asset"
								onChange={(event) => {
									const nextFile = event.currentTarget.files?.[0] ?? null;

									setAssetFileName(nextFile?.name ?? "");

									if (assetPreviewURLRef.current) {
										URL.revokeObjectURL(assetPreviewURLRef.current);
									}

									const nextPreviewURL = nextFile ? URL.createObjectURL(nextFile) : null;
									assetPreviewURLRef.current = nextPreviewURL;
									setAssetPreviewURL(nextPreviewURL);
								}}
								ref={assetInputRef}
								required
								type="file"
							/>
							<div className="flex justify-center">
								<button
									aria-describedby={errors.asset ? "asset-error" : undefined}
									className={clsx(
										"flex aspect-square w-full max-w-64 flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border text-center shadow-sm transition-colors",
										errors.asset
											? "border-red-500 bg-white dark:border-red-500 dark:bg-gray-800"
											: "border-gray-300 bg-white hover:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400",
										isSaving && "cursor-not-allowed opacity-60",
									)}
									disabled={isSaving}
									onClick={() => assetInputRef.current?.click()}
									type="button"
								>
									{assetPreviewURL ? (
										<img
											alt="Friendship action preview."
											className="h-full w-full object-cover"
											src={assetPreviewURL}
										/>
									) : (
										<>
											<Upload className="h-8 w-8 shrink-0 text-gray-500 dark:text-gray-400" />
											<span className="px-6 text-base font-medium text-gray-900 dark:text-gray-100">
												Choose a GIF
											</span>
										</>
									)}
								</button>
							</div>
							{assetFileName ? (
								<p className="my-0 text-center text-sm text-gray-600 dark:text-gray-400">
									{assetFileName}
								</p>
							) : null}
							{errors.asset ? (
								<p className={FIELD_ERROR_CLASS} id="asset-error">
									{errors.asset}
								</p>
							) : null}
						</div>
					</div>

					<div className={SECTION_CARD_CLASS}>
						<h3 className={SUBSECTION_HEADING_CLASS}>Users</h3>
						<div className="flex flex-col gap-2">
							<label className={FIELD_LABEL_CLASS} htmlFor="users">
								Paste up to {MAXIMUM_FRIENDSHIP_ACTIONS_USERS} user ids on a new line.
							</label>
							<textarea
								aria-describedby={errors.users ? "users-error" : undefined}
								aria-invalid={errors.users ? true : undefined}
								className={textFieldClass(Boolean(errors.users), "medium")}
								disabled={isSaving}
								id="users"
								name="users"
								required
								rows={MAXIMUM_FRIENDSHIP_ACTIONS_USERS}
								{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
							/>
							{errors.users ? (
								<p className={FIELD_ERROR_CLASS} id="users-error">
									{errors.users}
								</p>
							) : null}
						</div>
					</div>

					<div className={SECTION_CARD_CLASS}>
						<h3 className={SUBSECTION_HEADING_CLASS}>Reference</h3>
						<div className="flex flex-col gap-2">
							<label className={FIELD_LABEL_CLASS} htmlFor="reference">
								Support server #friendship-actions thread.
							</label>
							<input
								aria-describedby={errors.reference ? "reference-error" : undefined}
								aria-invalid={errors.reference ? true : undefined}
								className={textFieldClass(Boolean(errors.reference), "medium")}
								disabled={isSaving}
								id="reference"
								name="reference"
								placeholder="https://discord.com/channels/1017993798170726411/1416913514676617327"
								required
								type="url"
								{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
							/>
							{errors.reference ? (
								<p className={FIELD_ERROR_CLASS} id="reference-error">
									{errors.reference}
								</p>
							) : null}
						</div>
					</div>
				</div>

				<div className="mt-1 flex flex-col gap-2.5">
					<ActionButton
						className="sm:w-fit"
						disabled={isSaving || !typeValue || !assetFileName}
						type="submit"
						variant="primary"
					>
						<Upload className="h-4 w-4" />
						<span>{isSaving ? "Uploading..." : "Upload friendship action"}</span>
					</ActionButton>

					{upload ? (
						<div className={SUCCESS_BANNER_CLASS}>
							<Check className="h-5 w-5 shrink-0 self-start" />
							<div className="flex flex-col leading-tight">
								<p className="my-0">
									Added {FriendshipActionTypeToLabel[upload.type]} #{upload.id}.
								</p>
								<p className="my-0">Users: {upload.users.join(", ")}</p>
								<p className="my-0">
									<ExternalLink
										className="regular-link inline-flex items-center gap-1"
										href={upload.assetURL}
										icon
									>
										Open uploaded asset
									</ExternalLink>
								</p>
							</div>
						</div>
					) : null}
				</div>
			</Form>
		</div>
	);
}
