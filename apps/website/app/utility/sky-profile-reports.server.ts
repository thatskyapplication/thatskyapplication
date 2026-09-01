import { CopyObjectCommand } from "@aws-sdk/client-s3";
import {
	CDN,
	type SkyProfileReportAsset,
	skyProfileReportRoute,
} from "@thatskyapplication/utility";
import { CDN_URL, R2_BUCKET_CDN, R2_BUCKET_REPORTS } from "~/config.server.js";
import pino from "~/pino.js";
import S3Client from "~/s3-client.server.js";

const cdn = new CDN(CDN_URL);

interface SkyProfileReportSource {
	banner: string | null;
	icon: string | null;
	user_id: string;
}

async function snapshotSkyProfileReportAsset(
	reportId: number,
	asset: SkyProfileReportAsset,
	userId: string,
	hash: string | null,
) {
	if (!hash) {
		return;
	}

	const sourceRoute =
		asset === "icon"
			? cdn.skyProfileIconRoute(userId, hash)
			: cdn.skyProfileBannerRoute(userId, hash);

	try {
		await S3Client.send(
			new CopyObjectCommand({
				Bucket: R2_BUCKET_REPORTS,
				CopySource: `${R2_BUCKET_CDN}/${sourceRoute}`,
				Key: skyProfileReportRoute(reportId, asset, hash),
			}),
		);
	} catch (error) {
		pino.error(error, `Failed to snapshot the ${asset} of Sky profile report ${reportId}.`);
	}
}

export async function snapshotSkyProfileReportAssets(
	reportId: number,
	skyProfile: SkyProfileReportSource,
) {
	try {
		await Promise.all([
			snapshotSkyProfileReportAsset(reportId, "icon", skyProfile.user_id, skyProfile.icon),
			snapshotSkyProfileReportAsset(reportId, "banner", skyProfile.user_id, skyProfile.banner),
		]);
	} catch (error) {
		pino.error(error, `Failed to snapshot the assets of Sky profile report ${reportId}.`);
	}
}
