import { GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { isSkyProfileReportAsset, skyProfileReportRoute } from "@thatskyapplication/utility";
import { R2_BUCKET_REPORTS } from "~/config.server.js";
import database from "~/database.server.js";
import S3ReportsClient from "~/s3-reports-client.server.js";
import { requireAdminAccess } from "~/utility/functions.server.js";
import type { Route } from "./+types/admin.sky-profile-reports_.$reportId.$asset.js";

const SNAPSHOT_CACHE_MAXIMUM_AGE_SECONDS = 86_400 as const;

export const loader = async ({ context, params, request, url }: Route.LoaderArgs) => {
	await requireAdminAccess({ context, request, url });
	const { asset, reportId } = params;
	const id = Number.parseInt(reportId, 10);

	if (!Number.isSafeInteger(id) || id <= 0 || !isSkyProfileReportAsset(asset)) {
		throw new Response(null, { status: 404 });
	}

	const packet = await database
		.selectFrom("sky_profile_reports")
		.select(["banner", "icon"])
		.where("id", "=", id)
		.executeTakeFirst();

	const hash = packet && (asset === "icon" ? packet.icon : packet.banner);

	if (!hash) {
		throw new Response(null, { status: 404 });
	}

	const object = await S3ReportsClient.send(
		new GetObjectCommand({
			Bucket: R2_BUCKET_REPORTS,
			Key: skyProfileReportRoute(id, asset, hash),
		}),
	).catch((error: unknown) => {
		if (error instanceof NoSuchKey) {
			return null;
		}

		throw error;
	});

	if (!object?.Body) {
		throw new Response(null, { status: 404 });
	}

	const headers = new Headers({
		"Cache-Control": `private, max-age=${SNAPSHOT_CACHE_MAXIMUM_AGE_SECONDS}, immutable`,
	});

	if (object.ContentType) {
		headers.set("Content-Type", object.ContentType);
	}

	return new Response(object.Body.transformToWebStream(), { headers });
};
