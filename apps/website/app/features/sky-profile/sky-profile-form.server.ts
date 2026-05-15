import {
	isSpiritId,
	isValidImageAsset,
	MAXIMUM_ASSET_SIZE,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import {
	isPlatformIds,
	isSeasonIds,
	isSkyProfileCountry,
	isSkyProfilePersonality,
	isSkyProfileWingedLight,
	toSkyProfileStorageValue,
} from "./editor/sky-profile-editor.js";
import type {
	SkyProfileActionErrors,
	SkyProfileFormProfile,
	SkyProfileStorageValue,
} from "./editor/sky-profile-editor-types.js";

interface ParsedSkyProfileMultipart {
	bannerFile: File | null;
	iconFile: File | null;
	profile: SkyProfileStorageValue;
}

interface ParseSkyProfileMultipartSuccess {
	ok: true;
	value: ParsedSkyProfileMultipart;
}

interface ParseSkyProfileMultipartFailure {
	errors: SkyProfileActionErrors;
	ok: false;
}

type ParseSkyProfileMultipartResult =
	| ParseSkyProfileMultipartFailure
	| ParseSkyProfileMultipartSuccess;

function hasSelectedFile(value: FormDataEntryValue | null): value is File {
	return value instanceof File && value.size > 0 && value.name !== "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseProfileJSON(value: FormDataEntryValue | null): unknown {
	if (typeof value !== "string") {
		return null;
	}

	try {
		return JSON.parse(value) as unknown;
	} catch {
		return null;
	}
}

function numberArray(value: unknown) {
	if (!(Array.isArray(value) && value.every((item): item is number => Number.isInteger(item)))) {
		return null;
	}

	return value;
}

function stringValue(value: unknown) {
	return typeof value === "string" ? value : null;
}

function numberOrNull(value: unknown) {
	if (value === null) {
		return null;
	}

	if (typeof value === "number" && Number.isInteger(value)) {
		return value;
	}

	return undefined;
}

export function parseSkyProfileMultipart(
	formData: FormData,
	locale: string,
): ParseSkyProfileMultipartResult {
	const errors: SkyProfileActionErrors = {};
	const rawIcon = formData.get("icon");
	const rawBanner = formData.get("banner");
	const hasNewIcon = hasSelectedFile(rawIcon);
	const hasNewBanner = hasSelectedFile(rawBanner);
	const rawProfile = parseProfileJSON(formData.get("profile"));

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

	if (!isRecord(rawProfile)) {
		errors.name = "Unable to read Sky profile form.";
		return { errors, ok: false };
	}

	const name = stringValue(rawProfile.name);
	const description = stringValue(rawProfile.description);
	const seasons = numberArray(rawProfile.seasons);
	const spirit = stringValue(rawProfile.spirit);
	const hangout = stringValue(rawProfile.hangout);
	const personality = numberOrNull(rawProfile.personality);
	const country = stringValue(rawProfile.country);
	const platforms = numberArray(rawProfile.platforms);
	const wingedLight = numberOrNull(rawProfile.wingedLight);
	const validSeasons = seasons && isSeasonIds(seasons) ? seasons : null;
	const validPersonality =
		personality !== undefined && isSkyProfilePersonality(personality) ? personality : undefined;
	const validCountry = country !== null && isSkyProfileCountry(country) ? country : null;
	const validPlatforms = platforms && isPlatformIds(platforms) ? platforms : null;
	const validWingedLight =
		wingedLight !== undefined && isSkyProfileWingedLight(wingedLight) ? wingedLight : undefined;

	if (name === null) {
		errors.name = "Name is required.";
	}

	if (description === null) {
		errors.description = "Description is invalid.";
	}

	if (validSeasons === null) {
		errors.seasons = "Seasons are invalid.";
	}

	if (spirit === null) {
		errors.spirit = t("spirits.not-encountered-spirit", {
			lng: locale,
			ns: "features",
		});
	}

	if (hangout === null) {
		errors.hangout = "Hangout is invalid.";
	}

	if (validPersonality === undefined) {
		errors.personality = t("sky-profile.edit-personality-invalid", {
			lng: locale,
			ns: "features",
		});
	}

	if (validCountry === null) {
		errors.country = t("sky-profile.unknown-country", {
			lng: locale,
			ns: "features",
		});
	}

	if (validPlatforms === null) {
		errors.platforms = "Platforms are invalid.";
	}

	if (validWingedLight === undefined) {
		errors.wingedLight = t("sky-profile.edit-winged-light-invalid", {
			lng: locale,
			ns: "features",
		});
	}

	if (Object.keys(errors).length > 0) {
		return { errors, ok: false };
	}

	const profile: SkyProfileFormProfile = {
		country: validCountry!,
		description: description!,
		hangout: hangout!,
		name: name!,
		personality: validPersonality!,
		platforms: validPlatforms!,
		seasons: validSeasons!,
		spirit: spirit!,
		wingedLight: validWingedLight!,
	};

	const storageProfile = toSkyProfileStorageValue(profile);

	if (storageProfile.name.length === 0) {
		errors.name = "Name is required.";
	}

	if (storageProfile.name.length > SKY_PROFILE_MAXIMUM_NAME_LENGTH) {
		errors.name = `Name must not exceed ${SKY_PROFILE_MAXIMUM_NAME_LENGTH} characters.`;
	}

	if (profile.description.trim().length > SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH) {
		errors.description = `Description must not exceed ${SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH} characters.`;
	}

	const trimmedHangout = profile.hangout.trim();

	if (trimmedHangout.length > 0 && trimmedHangout.length < SKY_PROFILE_MINIMUM_HANGOUT_LENGTH) {
		errors.hangout = `Hangout must be at least ${SKY_PROFILE_MINIMUM_HANGOUT_LENGTH} characters.`;
	}

	if (trimmedHangout.length > SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH) {
		errors.hangout = `Hangout must not exceed ${SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH} characters.`;
	}

	if (profile.spirit.length > 0) {
		const spiritId = Number.parseInt(profile.spirit, 10);

		if (!(/^\d+$/.test(profile.spirit) && Number.isInteger(spiritId) && isSpiritId(spiritId))) {
			errors.spirit = t("spirits.not-encountered-spirit", {
				lng: locale,
				ns: "features",
			});
		}
	}

	if (Object.keys(errors).length > 0) {
		return { errors, ok: false };
	}

	return {
		ok: true,
		value: {
			bannerFile: hasNewBanner ? rawBanner : null,
			iconFile: hasNewIcon ? rawIcon : null,
			profile: storageProfile,
		},
	};
}
