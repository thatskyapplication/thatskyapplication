import {
	ALLOWED_IMAGE_MEDIA_TYPES,
	CDN,
	COUNTRY_VALUES,
	CountryToEmoji,
	MAXIMUM_ASSET_SIZE,
	PLATFORM_ID_VALUES,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_PERSONALITY_TYPE_VALUES,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	SkyProfileEditType,
	SkyProfilePersonalityToMBTI,
	skySeasons,
	spirits,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { ArrowLeft, Check, ExternalLinkIcon } from "lucide-react";
import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { data, Form, Link, useNavigation } from "react-router";
import { SitePage } from "~/components/PageLayout";
import Select from "~/components/Select";
import { SkyProfileActionButton, SkyProfileActionLink } from "~/components/SkyProfileActionButton";
import SkyProfileHeaderCard from "~/components/SkyProfileHeaderCard";
import { toSkyProfileEditorValue } from "~/features/sky-profile/editor/sky-profile-editor.js";
import { useSkyProfileEditor } from "~/features/sky-profile/editor/use-sky-profile-editor.js";
import { parseSkyProfileMultipart } from "~/features/sky-profile/sky-profile-form.server.js";
import { getSkyProfilePacket } from "~/features/sky-profile/sky-profile-repository.server.js";
import { saveSkyProfileFromWebsite } from "~/features/sky-profile/sky-profile-save.server.js";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { getLocale } from "~/middleware/i18next.js";
import { discordEmojiURL } from "~/utility/cdn.js";
import { SeasonIdToSeasonalEmoji, SkyProfilePersonalityToEmoji } from "~/utility/emojis.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { PlatformToIcon } from "~/utility/platform-icons.js";
import type { Route } from "./+types/me.sky-profile.js";

const TEXT_FIELD_CLASS = clsx(
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
);

const SELECTABLE_OPTION_CARD_CLASS = clsx(
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
);

export const loader = async ({ request, url }: Route.LoaderArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request, url);
	const skyProfilePacket = await getSkyProfilePacket(discordUser.id);

	return {
		discordUserId: discordUser.id,
		profile: toSkyProfileEditorValue(skyProfilePacket),
	};
};

export const action = async ({ request, context, url }: Route.ActionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request, url);
	const locale = getLocale(context);
	const parsed = parseSkyProfileMultipart(await request.formData(), locale);

	if (!parsed.ok) {
		return data({ ok: false, errors: parsed.errors } as const, { status: 422 });
	}

	const result = await saveSkyProfileFromWebsite({
		lastUpdatedAt: new Date(),
		userId: discordUser.id,
		...parsed.value,
	});

	if (!result.ok) {
		return data({ ok: false, errors: result.errors } as const, { status: 422 });
	}

	return result.changed ? ({ ok: true } as const) : null;
};

export default function MeSkyProfile({ loaderData, actionData }: Route.ComponentProps) {
	const { discordUserId, profile: initialProfile } = loaderData;
	const navigation = useNavigation();
	const { i18n, t } = useTranslation();
	const cdnURL = useCDNURL();
	const cdn = new CDN(cdnURL);
	const availableSeasonIds = [...skySeasons().keys()];
	const [showSuccess, setShowSuccess] = useState(false);
	const editor = useSkyProfileEditor({
		imageInvalidMessage: t("asset-image-invalid", {
			ns: "general",
			size: MAXIMUM_ASSET_SIZE / 1_000_000,
		}),
		initialProfile,
		saved: actionData?.ok === true,
	});
	const {
		bannerInputRef,
		bannerPreviewURL,
		clientBannerError,
		clientIconError,
		draft,
		hasChanges,
		iconInputRef,
		iconPreviewURL,
		onBannerChange,
		onIconChange,
		profileFormValue,
		reset,
		setCatalogueProgressionValue,
		setCountryValue,
		setDescriptionValue,
		setGuessRankValue,
		setHangoutValue,
		setNameValue,
		setPersonalityValue,
		setPlatformValues,
		setSeasonValues,
		setSpiritValue,
		setWingedLightValue,
	} = editor;
	const nameValue = draft.name;
	const descriptionValue = draft.description;
	const wingedLightValue = draft.wingedLight;
	const catalogueProgressionValue = draft.catalogueProgression;
	const guessRankValue = draft.guessRank;
	const seasonValues = draft.seasons;
	const spiritValue = draft.spirit;
	const hangoutValue = draft.hangout;
	const personalityValue = draft.personality;
	const countryValue = draft.country;
	const platformValues = draft.platforms;
	const displayNames = new Intl.DisplayNames(i18n.language, { type: "region", style: "long" });
	const countryOptions = COUNTRY_VALUES.map((country) => ({
		label: `${CountryToEmoji[country]} ${displayNames.of(country)!}`,
		value: country,
	})).sort((a, b) => a.label.localeCompare(b.label));
	const spiritOptions = [...spirits().values()]
		.map((spirit) => ({
			label: t(`spirits.${spirit.id}`, { ns: "general" }),
			value: spirit.id.toString(),
		}))
		.sort((a, b) => a.label.localeCompare(b.label, i18n.language));

	const initialBannerURL = initialProfile.banner
		? cdn.skyProfileBannerURL(discordUserId, initialProfile.banner)
		: null;

	const initialIconURL = initialProfile.icon
		? cdn.skyProfileIconURL(discordUserId, initialProfile.icon)
		: null;
	const displayedBannerURL = bannerPreviewURL ?? initialBannerURL;
	const displayedIconURL = iconPreviewURL ?? initialIconURL;
	const previewName = nameValue.trim();
	const previewDescription = descriptionValue.trim();

	const isSaving =
		navigation.state !== "idle" &&
		navigation.formMethod?.toLowerCase() === "post" &&
		navigation.formData != null;
	const selectableOptionLabelClass = isSaving ? "cursor-not-allowed" : "cursor-pointer";

	const bannerError =
		clientBannerError ?? (actionData?.ok === false ? actionData.errors.banner : undefined);

	const iconError =
		clientIconError ?? (actionData?.ok === false ? actionData.errors.icon : undefined);

	const nameError = actionData?.ok === false ? actionData.errors.name : undefined;
	const descriptionError = actionData?.ok === false ? actionData.errors.description : undefined;
	const spiritError = actionData?.ok === false ? actionData.errors.spirit : undefined;
	const hangoutError = actionData?.ok === false ? actionData.errors.hangout : undefined;
	const personalityError = actionData?.ok === false ? actionData.errors.personality : undefined;
	const countryError = actionData?.ok === false ? actionData.errors.country : undefined;
	const wingedLightError = actionData?.ok === false ? actionData.errors.wingedLight : undefined;
	const catalogueProgressionError =
		actionData?.ok === false ? actionData.errors.catalogueProgression : undefined;
	const guessRankError = actionData?.ok === false ? actionData.errors.guessRank : undefined;

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
					method="post"
					onReset={(event) => {
						event.preventDefault();
						reset();
					}}
					onSubmit={handleSubmit}
				>
					<input name="profile" type="hidden" value={JSON.stringify(profileFormValue)} />
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
						onChange={onBannerChange}
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
						onChange={onIconChange}
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
									disabled={isSaving}
									id="name"
									maxLength={SKY_PROFILE_MAXIMUM_NAME_LENGTH}
									onChange={(event) => setNameValue(event.currentTarget.value)}
									required
									type="text"
									value={nameValue}
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
									disabled={isSaving}
									id="description"
									maxLength={SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH}
									onChange={(event) => setDescriptionValue(event.currentTarget.value)}
									rows={4}
									value={descriptionValue}
								/>
								{descriptionError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="description-error">
										{descriptionError}
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
													className={clsx(
														SELECTABLE_OPTION_CARD_CLASS,
														"flex items-center gap-3 px-3 py-2",
													)}
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
													onChange={() => setPersonalityValue(personality)}
													type="radio"
													value={personality}
												/>
												<div
													className={clsx(
														SELECTABLE_OPTION_CARD_CLASS,
														"flex flex-col gap-1 px-3 py-2",
													)}
												>
													<div className="flex items-center gap-2">
														<div
															aria-hidden="true"
															className="discord-emoji h-5 w-5"
															style={{
																backgroundImage: `url(${discordEmojiURL(SkyProfilePersonalityToEmoji[personality].id)})`,
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

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center justify-between gap-3">
								<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
									{t(`sky-profile.edit-type-label.${SkyProfileEditType.Seasons}`, {
										ns: "features",
									})}
								</h2>
								<button
									className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 dark:disabled:text-gray-500"
									disabled={isSaving || seasonValues.length === 0}
									onClick={() => setSeasonValues([])}
									type="button"
								>
									Clear selection
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<div className="flex items-center justify-between gap-3">
									<p
										className="my-0 text-sm text-gray-600 dark:text-gray-400"
										id="seasons-description"
									>
										{t(`sky-profile.edit-type-description.${SkyProfileEditType.Seasons}`, {
											ns: "features",
										})}
									</p>
									<span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300">
										{seasonValues.length} selected
									</span>
								</div>
								<fieldset aria-describedby="seasons-description">
									<legend className="sr-only">
										{t(`sky-profile.edit-type-label.${SkyProfileEditType.Seasons}`, {
											ns: "features",
										})}
									</legend>
									<div className="rounded-xl border border-gray-300 bg-white/60 p-2 dark:border-gray-600 dark:bg-gray-800/40">
										<div className="hide-scrollbar max-h-80 overflow-y-auto">
											<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
												{availableSeasonIds.map((season) => {
													const selected = seasonValues.includes(season);
													const seasonEmoji = SeasonIdToSeasonalEmoji[season];

													return (
														<button
															aria-pressed={selected}
															className={clsx(
																"flex w-full cursor-pointer items-center gap-3 rounded-lg border bg-white px-3 py-2 text-left shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-50 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-700/80 dark:disabled:border-gray-700 dark:disabled:bg-gray-900",
																selected
																	? "border-blue-600 bg-blue-100 dark:border-blue-400 dark:bg-blue-950/70"
																	: "border-gray-300",
															)}
															disabled={isSaving}
															key={season}
															onClick={() => {
																setSeasonValues((previousSeasons) =>
																	previousSeasons.includes(season)
																		? previousSeasons.filter(
																				(previousSeason) => previousSeason !== season,
																			)
																		: [...previousSeasons, season],
																);
															}}
															type="button"
														>
															{seasonEmoji ? (
																<div
																	aria-hidden="true"
																	className="discord-emoji h-9 w-9 rounded-full shadow-sm"
																	style={{
																		backgroundImage: `url(${discordEmojiURL(seasonEmoji.id)})`,
																	}}
																/>
															) : null}
															<div className="min-w-0 flex-1">
																<div className="truncate text-xs font-semibold text-gray-900 dark:text-gray-100">
																	{t(`seasons.${season}`, { ns: "general" })}
																</div>
															</div>
															<div
																aria-hidden="true"
																className={clsx(
																	"flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
																	selected
																		? "border-blue-600 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-400 dark:text-gray-950"
																		: "border-gray-300 bg-transparent text-transparent dark:border-gray-500",
																)}
															>
																<Check className="h-3.5 w-3.5" />
															</div>
														</button>
													);
												})}
											</div>
										</div>
									</div>
								</fieldset>
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<h2
								className="my-0 text-base font-medium text-gray-900 dark:text-gray-100"
								id="spirit-heading"
							>
								{t(`sky-profile.edit-type-label.${SkyProfileEditType.Spirit}`, {
									ns: "features",
								})}
							</h2>
							<div className="flex flex-col gap-2">
								<p
									className="my-0 text-sm text-gray-600 dark:text-gray-400"
									id="spirit-description"
								>
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.Spirit}`, {
										ns: "features",
									})}
								</p>
								<Select
									ariaDescribedBy="spirit-description"
									ariaLabelledBy="spirit-heading"
									className="w-full"
									disabled={isSaving}
									error={spiritError}
									isClearable={true}
									onChange={(value) => setSpiritValue(value)}
									options={spiritOptions}
									placeholder={t("sky-profile.select-a-spirit", { ns: "features" })}
									value={spiritValue}
								/>
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
									disabled={isSaving}
									id="hangout"
									maxLength={SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH}
									onChange={(event) => setHangoutValue(event.currentTarget.value)}
									type="text"
									value={hangoutValue}
								/>
								{hangoutError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="hangout-error">
										{hangoutError}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center justify-between gap-3">
								<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
									{t(`sky-profile.edit-type-label.${SkyProfileEditType.WingedLight}`, {
										ns: "features",
									})}
								</h2>
								<button
									className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 dark:disabled:text-gray-500"
									disabled={isSaving || wingedLightValue === null}
									onClick={() => setWingedLightValue(null)}
									type="button"
								>
									Clear selection
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<p
									className="my-0 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400"
									id="winged-light-description"
								>
									{t("sky-profile.edit-winged-light-description", { ns: "features" })}
								</p>
								<p className="my-0 text-xs text-gray-500 dark:text-gray-500">
									Note: Discord must be used to modify your catalogue.
								</p>
								<fieldset
									aria-describedby={`winged-light-description${wingedLightError ? " winged-light-error" : ""}`}
									aria-invalid={wingedLightError ? true : undefined}
								>
									<legend className="sr-only">
										{t(`sky-profile.edit-type-label.${SkyProfileEditType.WingedLight}`, {
											ns: "features",
										})}
									</legend>
									<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
										{SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES.map((wingedLight) => (
											<label
												className={selectableOptionLabelClass}
												htmlFor={`winged-light-${wingedLight}`}
												key={wingedLight}
											>
												<input
													checked={wingedLightValue === wingedLight}
													className="peer sr-only"
													disabled={isSaving}
													id={`winged-light-${wingedLight}`}
													onChange={() => setWingedLightValue(wingedLight)}
													type="radio"
													value={wingedLight}
												/>
												<div className={clsx(SELECTABLE_OPTION_CARD_CLASS, "px-3 py-2")}>
													<span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
														{t(`sky-profile-winged-light-types.${wingedLight}`, {
															ns: "general",
														})}
													</span>
												</div>
											</label>
										))}
									</div>
								</fieldset>
								{wingedLightError ? (
									<p
										className="my-0 text-sm text-red-600 dark:text-red-400"
										id="winged-light-error"
									>
										{wingedLightError}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center justify-between gap-3">
								<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
									{t(`sky-profile.edit-type-label.${SkyProfileEditType.CatalogueProgression}`, {
										ns: "features",
									})}
								</h2>
								<button
									className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 dark:disabled:text-gray-500"
									disabled={isSaving || catalogueProgressionValue === null}
									onClick={() => setCatalogueProgressionValue(null)}
									type="button"
								>
									Clear selection
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<p
									className="my-0 text-sm text-gray-600 dark:text-gray-400"
									id="catalogue-progression-description"
								>
									{t(
										`sky-profile.edit-type-description.${SkyProfileEditType.CatalogueProgression}`,
										{ ns: "features" },
									)}
								</p>
								<fieldset
									aria-describedby={`catalogue-progression-description${catalogueProgressionError ? " catalogue-progression-error" : ""}`}
									aria-invalid={catalogueProgressionError ? true : undefined}
								>
									<legend className="sr-only">
										{t(`sky-profile.edit-type-label.${SkyProfileEditType.CatalogueProgression}`, {
											ns: "features",
										})}
									</legend>
									<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
										{([true, false] as const).map((catalogueProgression) => (
											<label
												className={selectableOptionLabelClass}
												htmlFor={`catalogue-progression-${catalogueProgression.toString()}`}
												key={catalogueProgression.toString()}
											>
												<input
													checked={catalogueProgressionValue === catalogueProgression}
													className="peer sr-only"
													disabled={isSaving}
													id={`catalogue-progression-${catalogueProgression.toString()}`}
													onChange={() => setCatalogueProgressionValue(catalogueProgression)}
													type="radio"
													value={catalogueProgression.toString()}
												/>
												<div className={clsx(SELECTABLE_OPTION_CARD_CLASS, "px-3 py-2")}>
													<span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
														{t(catalogueProgression ? "show" : "hide", { ns: "general" })}
													</span>
												</div>
											</label>
										))}
									</div>
								</fieldset>
								{catalogueProgressionError ? (
									<p
										className="my-0 text-sm text-red-600 dark:text-red-400"
										id="catalogue-progression-error"
									>
										{catalogueProgressionError}
									</p>
								) : null}
							</div>
						</div>

						<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center justify-between gap-3">
								<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
									{t(`sky-profile.edit-type-label.${SkyProfileEditType.GuessRank}`, {
										ns: "features",
									})}
								</h2>
								<button
									className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100 dark:disabled:text-gray-500"
									disabled={isSaving || guessRankValue === null}
									onClick={() => setGuessRankValue(null)}
									type="button"
								>
									Clear selection
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<p
									className="my-0 text-sm text-gray-600 dark:text-gray-400"
									id="guess-rank-description"
								>
									{t(`sky-profile.edit-type-description.${SkyProfileEditType.GuessRank}`, {
										ns: "features",
									})}
								</p>
								<fieldset
									aria-describedby={`guess-rank-description${guessRankError ? " guess-rank-error" : ""}`}
									aria-invalid={guessRankError ? true : undefined}
								>
									<legend className="sr-only">
										{t(`sky-profile.edit-type-label.${SkyProfileEditType.GuessRank}`, {
											ns: "features",
										})}
									</legend>
									<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
										{([true, false] as const).map((guessRank) => (
											<label
												className={selectableOptionLabelClass}
												htmlFor={`guess-rank-${guessRank.toString()}`}
												key={guessRank.toString()}
											>
												<input
													checked={guessRankValue === guessRank}
													className="peer sr-only"
													disabled={isSaving}
													id={`guess-rank-${guessRank.toString()}`}
													onChange={() => setGuessRankValue(guessRank)}
													type="radio"
													value={guessRank.toString()}
												/>
												<div className={clsx(SELECTABLE_OPTION_CARD_CLASS, "px-3 py-2")}>
													<span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
														{t(guessRank ? "show" : "hide", { ns: "general" })}
													</span>
												</div>
											</label>
										))}
									</div>
								</fieldset>
								{guessRankError ? (
									<p className="my-0 text-sm text-red-600 dark:text-red-400" id="guess-rank-error">
										{guessRankError}
									</p>
								) : null}
							</div>
						</div>
					</div>

					<div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
						<div className="flex flex-col gap-2.5 sm:flex-row">
							<SkyProfileActionButton
								disabled={isSaving || !hasChanges}
								type="submit"
								variant="primary"
							>
								Save Sky profile
							</SkyProfileActionButton>
							<SkyProfileActionButton
								disabled={isSaving || !hasChanges}
								type="reset"
								variant="secondary"
							>
								Reset
							</SkyProfileActionButton>
						</div>
						{initialProfile.name ? (
							<SkyProfileActionLink
								className="gap-2"
								to={`/sky-profiles/${discordUserId}`}
								variant="neutral"
							>
								<ExternalLinkIcon className="h-4 w-4" />
								<span>View Sky profile</span>
							</SkyProfileActionLink>
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
