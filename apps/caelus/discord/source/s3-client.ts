import { S3Client } from "@aws-sdk/client-s3";
import {
	CLOUDFLARE_ACCOUNT_ID,
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
} from "./utility/configuration.js";

export default new S3Client({
	credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
	endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: "auto",
	maxAttempts: 3,
	requestHandler: {
		connectionTimeout: 3_000,
		requestTimeout: 30_000,
		throwOnRequestTimeout: true,
	},
});
