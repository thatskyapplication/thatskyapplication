import {
	ALLOWED_IMAGE_MEDIA_TYPES,
	COUNTRY_VALUES,
	CountryToEmoji,
	isCountry,
	isPlatformId,
	isSkyProfilePersonalityType,
	isValidImageAsset,
	MAXIMUM_ASSET_SIZE,
	PLATFORM_ID_VALUES,
	type PlatformIds,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_PERSONALITY_TYPE_VALUES,
	SkyProfileEditType,
	type SkyProfilePacket,
	SkyProfilePersonalityToMBTI,
	skyProfileIconURL,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { ArrowLeft, Check, ExternalLinkIcon } from "lucide-react";
import type { Dispatch, RefObject, SetStateAction, SyntheticEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { data, Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import { SitePage } from "~/components/PageLayout";
import Select from "~/components/Select";
import SkyProfileHeaderCard from "~/components/SkyProfileHeaderCard";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { getLocale } from "~/middleware/i18next.js";
import pg from "~/pg.server";
import pino from "~/pino.js";
import { skyProfileBannerURL } from "~/utility/cdn-url.js";
import { SkyProfilePersonalityToEmoji } from "~/utility/emojis.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { PlatformToIcon } from "~/utility/platform-icons.js";
import {
	deleteSkyProfileBanner,
	deleteSkyProfileIcon,
	uploadSkyProfileBanner,
	uploadSkyProfileIcon,
} from "~/utility/sky-profile-assets.server.js";

type SkyProfileActionErrors = {
	banner?: string;
	country?: string;
	description?: string;
	hangout?: string;
	icon?: string;
	name?: string;
	personality?: string;
};

const TEXT_FIELD_CLASS = [
	"w-full",
	"rounded-lg",
	"border",
	"border-gray-300",
	"bg-white",
	"px-3",
	"py-2.5",
	"text-base",
	"text-gray-900",
	"shadow-sm",
	"outline-none",
	"transition-colors",
	"focus:border-blue-500",
	"disabled:cursor-not-allowed",
	"disabled:border-gray-200",
	"disabled:bg-gray-100",
	"disabled:text-gray-500",
	"dark:border-gray-600",
	"dark:bg-gray-800",
	"dark:text-gray-100",
	"dark:disabled:border-gray-700",
	"dark:disabled:bg-gray-900",
	"dark:disabled:text-gray-500",
].join(" ");

const SELECTABLE_OPTION_CARD_CLASS = [
	"rounded-lg",
	"border",
	"border-gray-300",
	"bg-white",
	"text-left",
	"shadow-sm",
	"transition-colors",
	"peer-checked:border-blue-500",
	"peer-checked:bg-blue-50",
	"peer-focus-visible:border-blue-500",
	"peer-focus-visible:ring-2",
	"peer-focus-visible:ring-blue-500/30",
	"peer-disabled:cursor-not-allowed",
	"peer-disabled:border-gray-200",
	"peer-disabled:bg-gray-100",
	"peer-disabled:opacity-60",
	"dark:border-gray-600",
	"dark:bg-gray-800",
	"dark:peer-checked:border-blue-400",
	"dark:peer-checked:bg-blue-950/40",
	"dark:peer-disabled:border-gray-700",
	"dark:peer-disabled:bg-gray-900",
].join(" ");

function hasSelectedFile(value: FormDataEntryValue | null): value is File {
	return value instanceof File && value.size > 0 && value.name !== "";
}

function clearPreviewURL(
	previewURLRef: RefObject<string | null>,
	setPreviewURL: Dispatch<SetStateAction<string | null>>,
) {
	if (previewURLRef.current) {
		URL.revokeObjectURL(previewURLRef.current);
	}

	previewURLRef.current = null;
	setPreviewURL(null);
}

function updatePreviewURL(
	previewURLRef: RefObject<string | null>,
	setPreviewURL: Dispatch<SetStateAction<string | null>>,
	file: File | null,
) {
	if (previewURLRef.current) {
		URL.revokeObjectURL(previewURLRef.current);
	}

	const nextPreviewURL = file ? URL.createObjectURL(file) : null;
	previewURLRef.current = nextPreviewURL;
	setPreviewURL(nextPreviewURL);
}

function platformIdsForStorage(platforms: readonly number[] | null): PlatformIds[] | null {
	if (platforms === null) {
		return null;
	}

	const orderedPlatforms = PLATFORM_ID_VALUES.filter((platform) => platforms.includes(platform));
	return orderedPlatforms.length > 0 ? orderedPlatforms : null;
}

function platformSignature(platforms: readonly number[] | null) {
	return platformIdsForStorage(platforms)?.join(",") ?? "";
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select(
			"icon",
			"banner",
			"name",
			"description",
			"hangout",
			"personality",
			"country",
			"platform",
		)
		.where({ user_id: discordUser.id })
		.first();

	return { discordUserId: discordUser.id, skyProfilePacket };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);
	const locale = getLocale(context);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select(
			"icon",
			"banner",
			"name",
			"description",
			"hangout",
			"personality",
			"country",
			"platform",
		)
		.where({ user_id: discordUser.id })
		.first();

	const formData = await request.formData();
	const rawIcon = formData.get("icon");
	const rawBanner = formData.get("banner");
	const rawName = formData.get("name");
	const rawDescription = formData.get("description");
	const rawHangout = formData.get("hangout");
	const rawPersonality = formData.get("personality");
	const rawCountry = formData.get("country");
	const rawPlatforms = formData.getAll("platform");
	const hasNewIcon = hasSelectedFile(rawIcon);
	const hasNewBanner = hasSelectedFile(rawBanner);
	const name = typeof rawName === "string" ? rawName.trim() : "";
	const description = typeof rawDescription === "string" ? rawDescription.trim() : "";
	const hangout = typeof rawHangout === "string" ? rawHangout.trim() : "";
	const personality =
		typeof rawPersonality === "string" && rawPersonality.length > 0 ? Number(rawPersonality) : null;
	const country = typeof rawCountry === "string" && rawCountry.length > 0 ? rawCountry : null;
	const platforms = rawPlatforms
		.filter(
			(platform): platform is string =>
				typeof platform === "string" && /^\d+$/.test(platform.trim()),
		)
		.map((platform) => Number.parseInt(platform, 10))
		.filter((platform) => isPlatformId(platform));
	const initialIcon = skyProfilePacket?.icon ?? null;
	const initialBanner = skyProfilePacket?.banner ?? null;
	const initialName = skyProfilePacket?.name?.trim() ?? "";
	const initialDescription = skyProfilePacket?.description?.trim() ?? "";
	const initialHangout = skyProfilePacket?.hangout?.trim() ?? "";
	const initialPersonalityRaw = skyProfilePacket?.personality ?? null;
	const initialCountryRaw = skyProfilePacket?.country ?? null;
	const initialPlatformsRaw = platformIdsForStorage(skyProfilePacket?.platform ?? null);
	const errors: SkyProfileActionErrors = {};

	if (hasNewIcon && !isValidImageAsset(rawIcon)) {
		errors.icon = t("asset-image-invalid", {
			lng: locale,
			ns: "general",
			size: MAXIMUM_ASSET_SIZE / 1_000_000,
		});
	}

	if (hasNewBanner && !isValidImageAsset(rawBanner)) {
		errors.banner = t("asset-image-invalid", {
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

	if (
		personality !== null &&
		!(Number.isInteger(personality) && isSkyProfilePersonalityType(personality))
	) {
		errors.personality = t("sky-profile.edit-personality-invalid", {
			lng: locale,
			ns: "features",
		});
	}

	if (country !== null && !isCountry(country)) {
		errors.country = t("sky-profile.unknown-country", {
			lng: locale,
			ns: "features",
		});
	}

	if (Object.keys(errors).length > 0) {
		return data({ ok: false, errors } as const, { status: 422 });
	}

	if (
		!(hasNewIcon || hasNewBanner) &&
		name === initialName &&
		description === initialDescription &&
		hangout === initialHangout &&
		personality === initialPersonalityRaw &&
		country === initialCountryRaw &&
		platformSignature(platforms) === platformSignature(initialPlatformsRaw)
	) {
		return null;
	}

	let uploadedIcon: string | null = null;
	let uploadedBanner: string | null = null;
	let icon = initialIcon;
	let banner = initialBanner;

	const [iconUploadResult, bannerUploadResult] = await Promise.allSettled([
		hasNewIcon
			? uploadSkyProfileIcon({
					file: rawIcon,
					userId: discordUser.id,
				})
			: initialIcon,
		hasNewBanner
			? uploadSkyProfileBanner({
					file: rawBanner,
					userId: discordUser.id,
				})
			: initialBanner,
	]);

	if (hasNewIcon) {
		if (iconUploadResult.status === "fulfilled") {
			uploadedIcon = iconUploadResult.value;
			icon = uploadedIcon;
		} else {
			pino.error(iconUploadResult.reason, "Failed to upload Sky profile icon.");
			errors.icon = "Unable to upload icon.";
		}
	}

	if (hasNewBanner) {
		if (bannerUploadResult.status === "fulfilled") {
			uploadedBanner = bannerUploadResult.value;
			banner = uploadedBanner;
		} else {
			pino.error(bannerUploadResult.reason, "Failed to upload Sky profile banner.");
			errors.banner = "Unable to upload banner.";
		}
	}

	if (errors.icon || errors.banner) {
		if (uploadedIcon && uploadedIcon !== initialIcon) {
			void deleteSkyProfileIcon({ icon: uploadedIcon, userId: discordUser.id }).catch(
				(cleanupError) => {
					pino.error(cleanupError, "Failed to clean up unreferenced Sky profile icon.");
				},
			);
		}

		if (uploadedBanner && uploadedBanner !== initialBanner) {
			void deleteSkyProfileBanner({ banner: uploadedBanner, userId: discordUser.id }).catch(
				(cleanupError) => {
					pino.error(cleanupError, "Failed to clean up unreferenced Sky profile banner.");
				},
			);
		}

		return data({ ok: false, errors } as const, { status: 422 });
	}

	const skyProfileUpsertData: Partial<SkyProfilePacket> & Pick<SkyProfilePacket, "user_id"> = {
		user_id: discordUser.id,
		name,
		description: description.length > 0 ? description : null,
		hangout: hangout.length > 0 ? hangout : null,
		personality,
		country,
		platform: platformIdsForStorage(platforms),
	};

	if (hasNewIcon) {
		skyProfileUpsertData.icon = icon;
	}

	if (hasNewBanner) {
		skyProfileUpsertData.banner = banner;
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

		if (uploadedBanner && uploadedBanner !== initialBanner) {
			void deleteSkyProfileBanner({ banner: uploadedBanner, userId: discordUser.id }).catch(
				(cleanupError) => {
					pino.error(cleanupError, "Failed to clean up unreferenced Sky profile banner.");
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

	if (hasNewBanner && initialBanner && banner !== initialBanner) {
		void deleteSkyProfileBanner({ banner: initialBanner, userId: discordUser.id }).catch(
			(error) => {
				pino.error(error, "Failed to delete replaced Sky profile banner.");
			},
		);
	}

	return { ok: true } as const;
};

export default function MeSkyProfile() {
	const { discordUserId, skyProfilePacket } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const { i18n, t } = useTranslation();
	const initialIcon = skyProfilePacket?.icon ?? null;
	const initialBanner = skyProfilePacket?.banner ?? null;
	const initialName = skyProfilePacket?.name?.trim() ?? "";
	const initialDescription = skyProfilePacket?.description?.trim() ?? "";
	const initialHangout = skyProfilePacket?.hangout?.trim() ?? "";
	const initialPersonalityRaw = skyProfilePacket?.personality ?? null;
	const initialCountryRaw = skyProfilePacket?.country ?? null;
	const initialPlatformsRaw = platformIdsForStorage(skyProfilePacket?.platform ?? null);
	const initialPersonality =
		initialPersonalityRaw != null && isSkyProfilePersonalityType(initialPersonalityRaw)
			? initialPersonalityRaw
			: null;
	const initialCountry =
		initialCountryRaw != null && isCountry(initialCountryRaw) ? initialCountryRaw : "";
	const initialPlatforms = initialPlatformsRaw ?? [];
	const [showSuccess, setShowSuccess] = useState(false);
	const [hasPendingIconUpload, setHasPendingIconUpload] = useState(false);
	const [hasPendingBannerUpload, setHasPendingBannerUpload] = useState(false);
	const [clientIconError, setClientIconError] = useState<string | null>(null);
	const [clientBannerError, setClientBannerError] = useState<string | null>(null);
	const [iconPreviewURL, setIconPreviewURL] = useState<string | null>(null);
	const [bannerPreviewURL, setBannerPreviewURL] = useState<string | null>(null);
	const iconPreviewURLRef = useRef<string | null>(null);
	const bannerPreviewURLRef = useRef<string | null>(null);
	const cdnURL = useCDNURL();
	const [nameValue, setNameValue] = useState(initialName);
	const [descriptionValue, setDescriptionValue] = useState(initialDescription);
	const [hangoutValue, setHangoutValue] = useState(initialHangout);
	const [personalityValue, setPersonalityValue] = useState<number | null>(initialPersonality);
	const [countryValue, setCountryValue] = useState(initialCountry);
	const [platformValues, setPlatformValues] = useState<PlatformIds[]>(initialPlatforms);
	const bannerInputRef = useRef<HTMLInputElement>(null);
	const iconInputRef = useRef<HTMLInputElement>(null);
	const displayNames = new Intl.DisplayNames(i18n.language, { type: "region", style: "long" });
	const countryOptions = COUNTRY_VALUES.map((country) => ({
		label: `${CountryToEmoji[country]} ${displayNames.of(country)!}`,
		value: country,
	})).sort((a, b) => a.label.localeCompare(b.label));

	const initialBannerURL = initialBanner
		? skyProfileBannerURL(cdnURL, discordUserId, initialBanner)
		: null;

	const initialIconURL = initialIcon ? skyProfileIconURL(cdnURL, discordUserId, initialIcon) : null;
	const displayedBannerURL = bannerPreviewURL ?? initialBannerURL;
	const displayedIconURL = iconPreviewURL ?? initialIconURL;
	const previewName = nameValue.trim();
	const previewDescription = descriptionValue.trim();
	const initialPlatformSignature = platformSignature(initialPlatformsRaw);

	const isSaving =
		navigation.state !== "idle" &&
		navigation.formMethod?.toLowerCase() === "post" &&
		navigation.formData != null;
	const selectableOptionLabelClass = isSaving ? "cursor-not-allowed" : "cursor-pointer";

	const hasChanges =
		hasPendingIconUpload ||
		hasPendingBannerUpload ||
		nameValue.trim() !== initialName ||
		descriptionValue.trim() !== initialDescription ||
		hangoutValue.trim() !== initialHangout ||
		personalityValue !== initialPersonalityRaw ||
		countryValue !== (initialCountryRaw ?? "") ||
		platformSignature(platformValues) !== platformSignature(initialPlatformsRaw);

	const bannerError =
		clientBannerError ?? (actionData?.ok === false ? actionData.errors.banner : undefined);

	const iconError =
		clientIconError ?? (actionData?.ok === false ? actionData.errors.icon : undefined);

	const nameError = actionData?.ok === false ? actionData.errors.name : undefined;
	const descriptionError = actionData?.ok === false ? actionData.errors.description : undefined;
	const hangoutError = actionData?.ok === false ? actionData.errors.hangout : undefined;
	const personalityError = actionData?.ok === false ? actionData.errors.personality : undefined;
	const countryError = actionData?.ok === false ? actionData.errors.country : undefined;

	useEffect(
		() => () => {
			if (iconPreviewURLRef.current) {
				URL.revokeObjectURL(iconPreviewURLRef.current);
			}

			if (bannerPreviewURLRef.current) {
				URL.revokeObjectURL(bannerPreviewURLRef.current);
			}
		},
		[],
	);

	useEffect(() => {
		if (actionData?.ok !== true) {
			setShowSuccess(false);
			return;
		}

		clearPreviewURL(iconPreviewURLRef, setIconPreviewURL);
		clearPreviewURL(bannerPreviewURLRef, setBannerPreviewURL);
		setHasPendingIconUpload(false);
		setHasPendingBannerUpload(false);
		setClientIconError(null);
		setClientBannerError(null);
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
				<Link
					className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					to="/me"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>{t("navigation-back", { ns: "general" })}</span>
				</Link>

				<div>
					<h1 className="mb-1 text-4xl font-bold">Sky profile</h1>
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						Update your Sky profile here!
					</p>
				</div>

				<Form
					encType="multipart/form-data"
					key={`${initialIcon ?? ""}:${initialBanner ?? ""}:${initialName}:${initialDescription}:${initialHangout}:${initialPersonalityRaw ?? ""}:${initialCountryRaw ?? ""}:${initialPlatformSignature}`}
					method="post"
					onReset={() => {
						clearPreviewURL(iconPreviewURLRef, setIconPreviewURL);
						clearPreviewURL(bannerPreviewURLRef, setBannerPreviewURL);
						setHasPendingIconUpload(false);
						setHasPendingBannerUpload(false);
						setClientIconError(null);
						setClientBannerError(null);
						setNameValue(initialName);
						setDescriptionValue(initialDescription);
						setHangoutValue(initialHangout);
						setPersonalityValue(initialPersonality);
						setCountryValue(initialCountry);
						setPlatformValues(initialPlatforms);
					}}
					onSubmit={handleSubmit}
				>
					<div className="mb-4 flex flex-col gap-3">
						<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
							Public preview
						</h2>
						<SkyProfileHeaderCard
							bannerURL={displayedBannerURL}
							disabled={isSaving}
							iconURL={displayedIconURL}
							name={previewName || null}
							onBannerUploadClick={() => bannerInputRef.current?.click()}
							onIconUploadClick={() => iconInputRef.current?.click()}
						>
							<div className="flex-1 min-w-0">
								{previewName ? (
									<h2 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
										{previewName}
									</h2>
								) : (
									<h2 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold italic text-black dark:text-white">
										No name
									</h2>
								)}
								{previewDescription ? (
									<p className="whitespace-pre-wrap">{previewDescription}</p>
								) : (
									<p className="italic">No description.</p>
								)}
							</div>
						</SkyProfileHeaderCard>
						{bannerError ? (
							<p className="my-0 text-sm text-red-600 dark:text-red-400" id="banner-error">
								{bannerError}
							</p>
						) : null}
						{iconError ? (
							<p className="my-0 text-sm text-red-600 dark:text-red-400" id="icon-error">
								{iconError}
							</p>
						) : null}
					</div>

					<input
						accept={ALLOWED_IMAGE_MEDIA_TYPES.join(",")}
						aria-describedby={bannerError ? "banner-error" : undefined}
						aria-invalid={bannerError ? true : undefined}
						className="sr-only"
						disabled={isSaving}
						id="banner"
						name="banner"
						onChange={(event) => {
							const nextFile = event.currentTarget.files?.[0] ?? null;

							if (nextFile && !isValidImageAsset(nextFile)) {
								setClientBannerError(
									t("asset-image-invalid", {
										ns: "general",
										size: MAXIMUM_ASSET_SIZE / 1_000_000,
									}),
								);

								event.currentTarget.value = "";
								setHasPendingBannerUpload(false);
								clearPreviewURL(bannerPreviewURLRef, setBannerPreviewURL);
								return;
							}

							setClientBannerError(null);
							setHasPendingBannerUpload(Boolean(nextFile));
							updatePreviewURL(bannerPreviewURLRef, setBannerPreviewURL, nextFile);
						}}
						ref={bannerInputRef}
						type="file"
					/>
					<input
						accept={ALLOWED_IMAGE_MEDIA_TYPES.join(",")}
						aria-describedby={iconError ? "icon-error" : undefined}
						aria-invalid={iconError ? true : undefined}
						className="sr-only"
						disabled={isSaving}
						id="icon"
						name="icon"
						onChange={(event) => {
							const nextFile = event.currentTarget.files?.[0] ?? null;

							if (nextFile && !isValidImageAsset(nextFile)) {
								setClientIconError(
									t("asset-image-invalid", {
										ns: "general",
										size: MAXIMUM_ASSET_SIZE / 1_000_000,
									}),
								);

								event.currentTarget.value = "";
								setHasPendingIconUpload(false);
								clearPreviewURL(iconPreviewURLRef, setIconPreviewURL);
								return;
							}

							setClientIconError(null);
							setHasPendingIconUpload(Boolean(nextFile));
							updatePreviewURL(iconPreviewURLRef, setIconPreviewURL, nextFile);
						}}
						ref={iconInputRef}
						type="file"
					/>

					<div className="flex flex-col gap-4">
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
									className={TEXT_FIELD_CLASS}
									defaultValue={initialName}
									disabled={isSaving}
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
									className={TEXT_FIELD_CLASS}
									defaultValue={initialDescription}
									disabled={isSaving}
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
									className={TEXT_FIELD_CLASS}
									defaultValue={initialHangout}
									disabled={isSaving}
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

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2
								className="my-0 text-base font-medium text-gray-900 dark:text-gray-100"
								id="country-heading"
							>
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Country}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-2">
								<p
									className="my-0 text-sm text-gray-600 dark:text-gray-400"
									id="country-description"
								>
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Country}`, {
										ns: "features",
									})}
								</p>
								<Select
									ariaDescribedBy={`country-description${countryError ? " country-error" : ""}`}
									ariaLabelledBy="country-heading"
									className="w-full"
									disabled={isSaving}
									error={countryError}
									isClearable={true}
									onChange={(value) => setCountryValue(value)}
									options={countryOptions}
									placeholder={t("sky-profile.select-a-country", { ns: "features" })}
									value={countryValue}
								/>
								{countryError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="country-error">
										{countryError}
									</p>
								) : null}
								<input name="country" type="hidden" value={countryValue} />
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Platforms}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-3">
								<p
									className="my-0 text-sm text-gray-600 dark:text-gray-400"
									id="platforms-description"
								>
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Platforms}`, {
										ns: "features",
									})}
								</p>
								<fieldset aria-describedby="platforms-description">
									<legend className="sr-only">
										{t(`sky-profile.edit-type-label.${SkyProfileEditType.Platforms}`, {
											ns: "features",
										})}
									</legend>
									<div className="grid grid-cols-2 gap-2 md:grid-cols-3">
										{PLATFORM_ID_VALUES.map((platform) => (
											<label
												className={selectableOptionLabelClass}
												htmlFor={`platform-${platform}`}
												key={platform}
											>
												<input
													checked={platformValues.includes(platform)}
													className="peer sr-only"
													disabled={isSaving}
													id={`platform-${platform}`}
													name="platform"
													onChange={() => {
														setPlatformValues((previousPlatforms) =>
															previousPlatforms.includes(platform)
																? previousPlatforms.filter(
																		(previousPlatform) => previousPlatform !== platform,
																	)
																: [...previousPlatforms, platform],
														);
													}}
													type="checkbox"
													value={platform}
												/>
												<div
													className={`${SELECTABLE_OPTION_CARD_CLASS} flex items-center gap-3 px-3 py-2`}
												>
													<div className="shrink-0 rounded-full bg-gray-200 p-2 shadow-sm dark:bg-gray-100">
														{PlatformToIcon[platform]}
													</div>
													<span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
														{t(`sky-profile.platform-label.${platform}`, {
															ns: "features",
														})}
													</span>
												</div>
											</label>
										))}
									</div>
								</fieldset>
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center justify-between gap-3">
								<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
									{t(`sky-profile.edit-type-label.${SkyProfileEditType.Personality}`, {
										ns: "features",
									})}
								</h2>
								<button
									className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 dark:disabled:text-gray-500"
									disabled={isSaving || personalityValue === null}
									onClick={() => setPersonalityValue(null)}
									type="button"
								>
									Clear selection
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<p className="my-0 text-sm text-gray-600 dark:text-gray-400">
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Personality}`, {
										ns: "features",
									})}
								</p>
								<fieldset
									aria-describedby={personalityError ? "personality-error" : undefined}
									aria-invalid={personalityError ? true : undefined}
								>
									<legend className="sr-only">
										{t(`sky-profile.edit-type-label.${SkyProfileEditType.Personality}`, {
											ns: "features",
										})}
									</legend>
									<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
										{SKY_PROFILE_PERSONALITY_TYPE_VALUES.map((personality) => (
											<label
												className={selectableOptionLabelClass}
												htmlFor={`personality-${personality}`}
												key={personality}
											>
												<input
													checked={personalityValue === personality}
													className="peer sr-only"
													disabled={isSaving}
													id={`personality-${personality}`}
													name="personality"
													onChange={() => setPersonalityValue(personality)}
													type="radio"
													value={personality}
												/>
												<div
													className={`${SELECTABLE_OPTION_CARD_CLASS} flex flex-col gap-1 px-3 py-2`}
												>
													<div className="flex items-center gap-2">
														<div
															aria-hidden="true"
															className="h-5 w-5 shrink-0 bg-contain bg-center bg-no-repeat"
															style={{
																backgroundImage: `url(https://cdn.discordapp.com/emojis/${SkyProfilePersonalityToEmoji[personality].id}.webp)`,
															}}
														/>
														<span className="text-sm font-semibold leading-tight text-gray-900 dark:text-gray-100">
															{t(`sky-profile.personality-types.${personality}`, {
																ns: "features",
															})}
														</span>
													</div>
													<span className="text-[11px] font-medium uppercase text-gray-500 dark:text-gray-400">
														{SkyProfilePersonalityToMBTI[personality]}
													</span>
												</div>
											</label>
										))}
									</div>
								</fieldset>
								{personalityError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="personality-error">
										{personalityError}
									</p>
								) : null}
							</div>
						</div>
					</div>

					<div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
						<div className="flex flex-col gap-2.5 sm:flex-row">
							<button
								className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors duration-300 hover:bg-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-green-600/60 disabled:text-white/80 disabled:shadow-md dark:border-gray-600"
								disabled={isSaving || !hasChanges}
								type="submit"
							>
								Save Sky profile
							</button>
							<button
								className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 shadow-md transition-colors duration-300 hover:bg-gray-300 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200/70 disabled:text-gray-900/70 disabled:shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:bg-gray-700/70 dark:disabled:text-gray-100/70"
								disabled={isSaving || !hasChanges}
								type="reset"
							>
								Reset
							</button>
						</div>
						{initialName ? (
							<Link
								className="bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 rounded-sm border border-gray-200 px-4 py-2 text-sm font-medium transition-colors duration-300 overflow-auto dark:border-gray-600"
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
