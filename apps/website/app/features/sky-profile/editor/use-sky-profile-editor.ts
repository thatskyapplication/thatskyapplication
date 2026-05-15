import {
	COUNTRY_VALUES,
	type Country,
	isValidImageAsset,
	type PlatformIds,
	type SeasonIds,
	type SkyProfilePersonalityTypes,
} from "@thatskyapplication/utility";
import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { hasSkyProfileEditorChanges, toSkyProfileFormProfile } from "./sky-profile-editor.js";
import type { SkyProfileEditorValue, SkyProfileFormProfile } from "./sky-profile-editor-types.js";

interface UseSkyProfileEditorOptions {
	imageInvalidMessage: string;
	initialProfile: SkyProfileEditorValue;
	saved: boolean;
}

interface UseSkyProfileEditorResult {
	bannerInputRef: RefObject<HTMLInputElement | null>;
	bannerPreviewURL: string | null;
	clientBannerError: string | null;
	clientIconError: string | null;
	draft: SkyProfileEditorValue;
	hasChanges: boolean;
	iconInputRef: RefObject<HTMLInputElement | null>;
	iconPreviewURL: string | null;
	onBannerChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onIconChange: (event: ChangeEvent<HTMLInputElement>) => void;
	profileFormValue: SkyProfileFormProfile;
	reset: () => void;
	setCountryValue: (country: string) => void;
	setDescriptionValue: (description: string) => void;
	setHangoutValue: (hangout: string) => void;
	setNameValue: (name: string) => void;
	setPersonalityValue: (personality: SkyProfilePersonalityTypes | null) => void;
	setPlatformValues: (
		platforms:
			| readonly PlatformIds[]
			| ((previous: readonly PlatformIds[]) => readonly PlatformIds[]),
	) => void;
	setSeasonValues: (
		seasons: readonly SeasonIds[] | ((previous: readonly SeasonIds[]) => readonly SeasonIds[]),
	) => void;
	setSpiritValue: (spirit: string) => void;
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

export function useSkyProfileEditor({
	imageInvalidMessage,
	initialProfile,
	saved,
}: UseSkyProfileEditorOptions): UseSkyProfileEditorResult {
	const [draft, setDraft] = useState(initialProfile);
	const [hasPendingIconUpload, setHasPendingIconUpload] = useState(false);
	const [hasPendingBannerUpload, setHasPendingBannerUpload] = useState(false);
	const [clientIconError, setClientIconError] = useState<string | null>(null);
	const [clientBannerError, setClientBannerError] = useState<string | null>(null);
	const [iconPreviewURL, setIconPreviewURL] = useState<string | null>(null);
	const [bannerPreviewURL, setBannerPreviewURL] = useState<string | null>(null);
	const iconPreviewURLRef = useRef<string | null>(null);
	const bannerPreviewURLRef = useRef<string | null>(null);
	const bannerInputRef = useRef<HTMLInputElement>(null);
	const iconInputRef = useRef<HTMLInputElement>(null);

	const clearIconFile = () => {
		if (iconInputRef.current) {
			iconInputRef.current.value = "";
		}

		setHasPendingIconUpload(false);
		setClientIconError(null);
		clearPreviewURL(iconPreviewURLRef, setIconPreviewURL);
	};

	const clearBannerFile = () => {
		if (bannerInputRef.current) {
			bannerInputRef.current.value = "";
		}

		setHasPendingBannerUpload(false);
		setClientBannerError(null);
		clearPreviewURL(bannerPreviewURLRef, setBannerPreviewURL);
	};

	const reset = () => {
		setDraft(initialProfile);
		clearIconFile();
		clearBannerFile();
	};

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
		if (!saved) {
			return;
		}

		setDraft(initialProfile);
		if (iconInputRef.current) {
			iconInputRef.current.value = "";
		}

		if (bannerInputRef.current) {
			bannerInputRef.current.value = "";
		}

		setHasPendingIconUpload(false);
		setHasPendingBannerUpload(false);
		setClientIconError(null);
		setClientBannerError(null);
		clearPreviewURL(iconPreviewURLRef, setIconPreviewURL);
		clearPreviewURL(bannerPreviewURLRef, setBannerPreviewURL);
	}, [initialProfile, saved]);

	const onBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextFile = event.currentTarget.files?.[0] ?? null;

		if (nextFile && !isValidImageAsset(nextFile)) {
			setClientBannerError(imageInvalidMessage);
			event.currentTarget.value = "";
			setHasPendingBannerUpload(false);
			clearPreviewURL(bannerPreviewURLRef, setBannerPreviewURL);
			return;
		}

		setClientBannerError(null);
		setHasPendingBannerUpload(Boolean(nextFile));
		updatePreviewURL(bannerPreviewURLRef, setBannerPreviewURL, nextFile);
	};

	const onIconChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextFile = event.currentTarget.files?.[0] ?? null;

		if (nextFile && !isValidImageAsset(nextFile)) {
			setClientIconError(imageInvalidMessage);
			event.currentTarget.value = "";
			setHasPendingIconUpload(false);
			clearPreviewURL(iconPreviewURLRef, setIconPreviewURL);
			return;
		}

		setClientIconError(null);
		setHasPendingIconUpload(Boolean(nextFile));
		updatePreviewURL(iconPreviewURLRef, setIconPreviewURL, nextFile);
	};

	const hasChanges =
		hasPendingIconUpload ||
		hasPendingBannerUpload ||
		hasSkyProfileEditorChanges(initialProfile, draft);

	const profileFormValue = useMemo(() => toSkyProfileFormProfile(draft), [draft]);
	const setNameValue = (name: string) => setDraft((previous) => ({ ...previous, name }));
	const setDescriptionValue = (description: string) =>
		setDraft((previous) => ({ ...previous, description }));
	const setSeasonValues = (
		seasons: readonly SeasonIds[] | ((previous: readonly SeasonIds[]) => readonly SeasonIds[]),
	) =>
		setDraft((previous) => ({
			...previous,
			seasons: typeof seasons === "function" ? seasons(previous.seasons) : seasons,
		}));
	const setSpiritValue = (spirit: string) => setDraft((previous) => ({ ...previous, spirit }));
	const setHangoutValue = (hangout: string) => setDraft((previous) => ({ ...previous, hangout }));
	const setPersonalityValue = (personality: SkyProfilePersonalityTypes | null) =>
		setDraft((previous) => ({ ...previous, personality }));
	const setCountryValue = (country: string) =>
		setDraft((previous) => ({
			...previous,
			country:
				country === "" || COUNTRY_VALUES.includes(country as Country)
					? (country as Country | "")
					: previous.country,
		}));
	const setPlatformValues = (
		platforms:
			| readonly PlatformIds[]
			| ((previous: readonly PlatformIds[]) => readonly PlatformIds[]),
	) =>
		setDraft((previous) => ({
			...previous,
			platforms: typeof platforms === "function" ? platforms(previous.platforms) : platforms,
		}));

	return {
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
		setCountryValue,
		setDescriptionValue,
		setHangoutValue,
		setNameValue,
		setPersonalityValue,
		setPlatformValues,
		setSeasonValues,
		setSpiritValue,
	};
}
