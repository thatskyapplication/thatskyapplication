import type { Packet } from "@thatskyapplication/utility";
import database from "~/database.server";
import pino from "~/pino.js";
import {
	deleteSkyProfileBanner,
	deleteSkyProfileIcon,
	uploadSkyProfileBanner,
	uploadSkyProfileIcon,
} from "~/utility/sky-profile-assets.server.js";
import {
	hasSkyProfileStorageChanges,
	toSkyProfileStorageValueFromPacket,
} from "./editor/sky-profile-editor.js";
import type {
	SkyProfileActionErrors,
	SkyProfileStorageValue,
} from "./editor/sky-profile-editor-types.js";
import { getSkyProfilePacket } from "./sky-profile-repository.server.js";

interface SaveSkyProfileFromWebsiteOptions {
	bannerFile: File | null;
	iconFile: File | null;
	lastUpdatedAt: Date;
	profile: SkyProfileStorageValue;
	userId: string;
}

interface SaveSkyProfileSuccessResult {
	changed: boolean;
	ok: true;
}

interface SaveSkyProfileFailureResult {
	errors: SkyProfileActionErrors;
	ok: false;
}

interface CleanupUploadedAssetOptions {
	banner: string | null;
	icon: string | null;
	userId: string;
}

type SaveSkyProfileFromWebsiteResult = SaveSkyProfileFailureResult | SaveSkyProfileSuccessResult;

async function cleanupUploadedAsset({ banner, icon, userId }: CleanupUploadedAssetOptions) {
	if (icon) {
		void deleteSkyProfileIcon({ icon, userId }).catch((cleanupError) => {
			pino.error(cleanupError, "Failed to clean up unreferenced Sky profile icon.");
		});
	}

	if (banner) {
		void deleteSkyProfileBanner({ banner, userId }).catch((cleanupError) => {
			pino.error(cleanupError, "Failed to clean up unreferenced Sky profile banner.");
		});
	}
}

export async function saveSkyProfileFromWebsite({
	bannerFile,
	iconFile,
	lastUpdatedAt,
	profile,
	userId,
}: SaveSkyProfileFromWebsiteOptions): Promise<SaveSkyProfileFromWebsiteResult> {
	const skyProfilePacket = await getSkyProfilePacket(userId);
	const initialIcon = skyProfilePacket?.icon ?? null;
	const initialBanner = skyProfilePacket?.banner ?? null;

	const hasNewIcon = iconFile !== null;
	const hasNewBanner = bannerFile !== null;
	const hasAssetChanges = hasNewIcon || hasNewBanner;
	const hasProfileChanges = hasSkyProfileStorageChanges(
		toSkyProfileStorageValueFromPacket(skyProfilePacket),
		profile,
	);

	if (!(hasAssetChanges || hasProfileChanges)) {
		return { changed: false, ok: true };
	}

	let uploadedIcon: string | null = null;
	let uploadedBanner: string | null = null;
	let icon = initialIcon;
	let banner = initialBanner;
	const errors: SkyProfileActionErrors = {};

	const [iconUploadResult, bannerUploadResult] = await Promise.allSettled([
		iconFile
			? uploadSkyProfileIcon({
					file: iconFile,
					userId,
				})
			: initialIcon,
		bannerFile
			? uploadSkyProfileBanner({
					file: bannerFile,
					userId,
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
		await cleanupUploadedAsset({
			banner: uploadedBanner && uploadedBanner !== initialBanner ? uploadedBanner : null,
			icon: uploadedIcon && uploadedIcon !== initialIcon ? uploadedIcon : null,
			userId,
		});

		return { errors, ok: false };
	}

	const skyProfileUpsertData: Partial<Packet<"sky_profiles">> &
		Pick<Packet<"sky_profiles">, "user_id"> = {
		user_id: userId,
		last_updated_at: lastUpdatedAt,
		name: profile.name,
		description: profile.description,
		seasons: profile.seasons,
		spirit: profile.spirit,
		hangout: profile.hangout,
		personality: profile.personality,
		country: profile.country,
		platform: profile.platform,
		winged_light: profile.winged_light,
		catalogue_progression: profile.catalogue_progression,
		guess_rank: profile.guess_rank,
	};

	if (hasNewIcon) {
		skyProfileUpsertData.icon = icon;
	}

	if (hasNewBanner) {
		skyProfileUpsertData.banner = banner;
	}

	try {
		await database
			.insertInto("sky_profiles")
			.values(skyProfileUpsertData)
			.onConflict((oc) => oc.column("user_id").doUpdateSet(skyProfileUpsertData))
			.execute();
	} catch (error) {
		await cleanupUploadedAsset({
			banner: uploadedBanner && uploadedBanner !== initialBanner ? uploadedBanner : null,
			icon: uploadedIcon && uploadedIcon !== initialIcon ? uploadedIcon : null,
			userId,
		});

		throw error;
	}

	if (hasNewIcon && initialIcon && icon !== initialIcon) {
		void deleteSkyProfileIcon({ icon: initialIcon, userId }).catch((error) => {
			pino.error(error, "Failed to delete replaced Sky profile icon.");
		});
	}

	if (hasNewBanner && initialBanner && banner !== initialBanner) {
		void deleteSkyProfileBanner({ banner: initialBanner, userId }).catch((error) => {
			pino.error(error, "Failed to delete replaced Sky profile banner.");
		});
	}

	return { changed: true, ok: true };
}
