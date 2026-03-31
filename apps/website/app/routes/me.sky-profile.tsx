import {
	ALLOWED_IMAGE_MEDIA_TYPES,
	MAXIMUM_ASSET_SIZE,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
	SkyProfileEditType,
	type SkyProfilePacket,
	skyProfileIconURL,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { ArrowLeft, Check, ExternalLinkIcon } from "lucide-react";
import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, Link, useActionData, useLoaderData } from "react-router";
import { SitePage } from "~/components/PageLayout";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { getLocale } from "~/middleware/i18next.js";
import pg from "~/pg.server";
import pino from "~/pino.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import {
	deleteSkyProfileIcon,
	isValidSkyProfileImageFile,
	uploadSkyProfileIcon,
} from "~/utility/sky-profile-assets.server.js";

type SkyProfileActionErrors = {
	description?: string;
	hangout?: string;
	icon?: string;
	name?: string;
};

function hasSelectedFile(value: FormDataEntryValue | null): value is File {
	return value instanceof File && value.size > 0 && value.name !== "";
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("icon", "name", "description", "hangout")
		.where({ user_id: discordUser.id })
		.first();

	return { discordUserId: discordUser.id, skyProfilePacket };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);
	const locale = getLocale(context);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("icon", "name", "description", "hangout")
		.where({ user_id: discordUser.id })
		.first();

	const formData = await request.formData();
	const rawIcon = formData.get("icon");
	const rawName = formData.get("name");
	const rawDescription = formData.get("description");
	const rawHangout = formData.get("hangout");
	const hasNewIcon = hasSelectedFile(rawIcon);
	const name = typeof rawName === "string" ? rawName.trim() : "";
	const description = typeof rawDescription === "string" ? rawDescription.trim() : "";
	const hangout = typeof rawHangout === "string" ? rawHangout.trim() : "";
	const initialIcon = skyProfilePacket?.icon ?? null;
	const initialName = skyProfilePacket?.name?.trim() ?? "";
	const initialDescription = skyProfilePacket?.description?.trim() ?? "";
	const initialHangout = skyProfilePacket?.hangout?.trim() ?? "";
	const errors: SkyProfileActionErrors = {};

	if (hasNewIcon && !isValidSkyProfileImageFile(rawIcon)) {
		errors.icon = t("asset-image-invalid", {
			lng: locale,
			ns: "general",
			size: MAXIMUM_ASSET_SIZE / 1_000_000,
		});
	}

	if (name.length === 0) {
		errors.name = "Name is required.";
	}

	if (name.length > SKY_PROFILE_MAXIMUM_NAME_LENGTH) {
		errors.name = `Name must not exceed ${SKY_PROFILE_MAXIMUM_NAME_LENGTH} characters.`;
	}

	if (description.length > SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH) {
		errors.description = `Description must not exceed ${SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH} characters.`;
	}

	if (hangout.length > 0 && hangout.length < SKY_PROFILE_MINIMUM_HANGOUT_LENGTH) {
		errors.hangout = `Hangout must be at least ${SKY_PROFILE_MINIMUM_HANGOUT_LENGTH} characters.`;
	}

	if (hangout.length > SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH) {
		errors.hangout = `Hangout must not exceed ${SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH} characters.`;
	}

	if (Object.keys(errors).length > 0) {
		return { ok: false, errors } as const;
	}

	if (
		!hasNewIcon &&
		name === initialName &&
		description === initialDescription &&
		hangout === initialHangout
	) {
		return null;
	}

	let uploadedIcon: string | null = null;
	let icon = initialIcon;

	if (hasNewIcon) {
		try {
			uploadedIcon = await uploadSkyProfileIcon({
				file: rawIcon,
				userId: discordUser.id,
			});

			icon = uploadedIcon;
		} catch (error) {
			pino.error(error, "Failed to upload Sky profile icon.");
			errors.icon = "Unable to upload icon.";

			return {
				ok: false,
				errors,
			} as const;
		}
	}

	const skyProfileUpsertData: Partial<SkyProfilePacket> & Pick<SkyProfilePacket, "user_id"> = {
		user_id: discordUser.id,
		name,
		description: description.length > 0 ? description : null,
		hangout: hangout.length > 0 ? hangout : null,
	};

	if (hasNewIcon) {
		skyProfileUpsertData.icon = icon;
	}

	try {
		await pg<SkyProfilePacket>(Table.Profiles)
			.insert(skyProfileUpsertData)
			.onConflict("user_id")
			.merge(skyProfileUpsertData);
	} catch (error) {
		if (uploadedIcon && uploadedIcon !== initialIcon) {
			void deleteSkyProfileIcon({ icon: uploadedIcon, userId: discordUser.id }).catch(
				(cleanupError) => {
					pino.error(cleanupError, "Failed to clean up unreferenced Sky profile icon.");
				},
			);
		}

		throw error;
	}

	if (hasNewIcon && initialIcon && icon !== initialIcon) {
		void deleteSkyProfileIcon({ icon: initialIcon, userId: discordUser.id }).catch((error) => {
			pino.error(error, "Failed to delete replaced Sky profile icon.");
		});
	}

	return { ok: true } as const;
};

export default function MeSkyProfile() {
	const { discordUserId, skyProfilePacket } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const { t } = useTranslation();
	const initialIcon = skyProfilePacket?.icon ?? null;
	const initialName = skyProfilePacket?.name?.trim() ?? "";
	const initialDescription = skyProfilePacket?.description?.trim() ?? "";
	const initialHangout = skyProfilePacket?.hangout?.trim() ?? "";
	const [showSuccess, setShowSuccess] = useState(false);
	const [hasPendingIconUpload, setHasPendingIconUpload] = useState(false);
	const cdnURL = useCDNURL();
	const [nameValue, setNameValue] = useState(initialName);
	const [descriptionValue, setDescriptionValue] = useState(initialDescription);
	const [hangoutValue, setHangoutValue] = useState(initialHangout);
	const initialIconURL = initialIcon ? skyProfileIconURL(cdnURL, discordUserId, initialIcon) : null;

	const hasChanges =
		hasPendingIconUpload ||
		nameValue.trim() !== initialName ||
		descriptionValue.trim() !== initialDescription ||
		hangoutValue.trim() !== initialHangout;

	const iconError = actionData?.ok === false ? actionData.errors.icon : undefined;
	const nameError = actionData?.ok === false ? actionData.errors.name : undefined;
	const descriptionError = actionData?.ok === false ? actionData.errors.description : undefined;
	const hangoutError = actionData?.ok === false ? actionData.errors.hangout : undefined;

	useEffect(() => {
		if (actionData?.ok !== true) {
			setShowSuccess(false);
			return;
		}

		setShowSuccess(true);
		const timeout = window.setTimeout(() => setShowSuccess(false), 3000);
		return () => window.clearTimeout(timeout);
	}, [actionData]);

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		if (!hasChanges) {
			event.preventDefault();
		}
	};

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
				<div>
					<Link
						className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
						to="/me"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>{t("navigation-back", { ns: "general" })}</span>
					</Link>
				</div>

				<div>
					<h1 className="mb-1 text-4xl font-bold">Sky profile</h1>
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						Update your Sky profile here. For now, you can set your icon, name, description and
						hangout.
					</p>
				</div>

				<Form
					encType="multipart/form-data"
					key={`${initialIcon ?? ""}:${initialName}:${initialDescription}:${initialHangout}`}
					method="post"
					onReset={() => {
						setHasPendingIconUpload(false);
						setNameValue(initialName);
						setDescriptionValue(initialDescription);
						setHangoutValue(initialHangout);
					}}
					onSubmit={handleSubmit}
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Icon}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-3">
									{initialIconURL ? (
										<div
											aria-label="Current Sky profile icon."
											className="h-20 w-20 rounded-full border border-gray-300 bg-cover bg-center shadow-sm dark:border-gray-600"
											role="img"
											style={{ backgroundImage: `url(${initialIconURL})` }}
										/>
									) : (
										<div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-gray-300 bg-white text-xs text-gray-500 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
											No icon
										</div>
									)}
									<p className="my-0 text-sm text-gray-600 dark:text-gray-400">
										{t(`sky-profile.edit-type-description.${SkyProfileEditType.Icon}`, {
											ns: "features",
										})}
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<input
										accept={ALLOWED_IMAGE_MEDIA_TYPES.join(",")}
										aria-describedby={iconError ? "icon-error" : undefined}
										aria-invalid={iconError ? true : undefined}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition-colors file:mr-3 file:rounded-sm file:border file:border-gray-300 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:text-gray-900 hover:file:bg-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:file:border-gray-600 dark:file:bg-gray-700 dark:file:text-gray-100 dark:hover:file:bg-gray-600"
										id="icon"
										name="icon"
										onChange={(event) =>
											setHasPendingIconUpload(Boolean(event.currentTarget.files?.[0]))
										}
										type="file"
									/>
									{iconError ? (
										<p className="my-0 text-sm text-red-600 dark:text-red-400" id="icon-error">
											{iconError}
										</p>
									) : null}
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Name}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="name">
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Name}`, {
										ns: "features",
									})}
								</label>
								<input
									aria-describedby={nameError ? "name-error" : undefined}
									aria-invalid={nameError ? true : undefined}
									className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
									defaultValue={initialName}
									id="name"
									maxLength={SKY_PROFILE_MAXIMUM_NAME_LENGTH}
									name="name"
									onChange={(event) => setNameValue(event.currentTarget.value)}
									required
									type="text"
								/>
								{nameError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="name-error">
										{nameError}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Description}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="description">
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Description}`, {
										ns: "features",
									})}
								</label>
								<textarea
									aria-describedby={descriptionError ? "description-error" : undefined}
									aria-invalid={descriptionError ? true : undefined}
									className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
									defaultValue={initialDescription}
									id="description"
									maxLength={SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH}
									name="description"
									onChange={(event) => setDescriptionValue(event.currentTarget.value)}
									rows={4}
								/>
								{descriptionError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="description-error">
										{descriptionError}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Hangout}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="hangout">
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Hangout}`, {
										ns: "features",
									})}
								</label>
								<input
									aria-describedby={hangoutError ? "hangout-error" : undefined}
									aria-invalid={hangoutError ? true : undefined}
									className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
									defaultValue={initialHangout}
									id="hangout"
									maxLength={SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH}
									name="hangout"
									onChange={(event) => setHangoutValue(event.currentTarget.value)}
									type="text"
								/>
								{hangoutError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="hangout-error">
										{hangoutError}
									</p>
								) : null}
							</div>
						</div>
					</div>

					<div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
						<div className="flex flex-col gap-2.5 sm:flex-row">
							<button
								className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors duration-300 hover:bg-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-green-600/60 disabled:text-white/80 disabled:shadow-md dark:border-gray-600"
								disabled={!hasChanges}
								type="submit"
							>
								Save Sky profile
							</button>
							<button
								className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 shadow-md transition-colors duration-300 hover:bg-gray-300 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200/70 disabled:text-gray-900/70 disabled:shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:bg-gray-700/70 dark:disabled:text-gray-100/70"
								disabled={!hasChanges}
								type="reset"
							>
								Reset
							</button>
						</div>
						{initialName ? (
							<Link
								className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 rounded-sm px-4 py-2 transition-colors duration-300 overflow-auto"
								to={`/sky-profiles/${discordUserId}`}
							>
								<ExternalLinkIcon className="h-4 w-4" />
								<span>View Sky profile</span>
							</Link>
						) : null}
					</div>
					{showSuccess ? (
						<div className="mt-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200">
							<Check className="h-5 w-5" />
							<span>Sky profile saved!</span>
						</div>
					) : null}
				</Form>
			</div>
		</SitePage>
	);
}
