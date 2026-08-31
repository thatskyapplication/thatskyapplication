import { S3Client } from "@aws-sdk/client-s3";
import {
	S3_ACCOUNT_ID,
	S3_ACCESS_KEY_ID_REPORTS,
	S3_SECRET_ACCESS_KEY_REPORTS,
} from "./config.server.js";

export default new S3Client({
	credentials: {
		accessKeyId: S3_ACCESS_KEY_ID_REPORTS,
		secretAccessKey: S3_SECRET_ACCESS_KEY_REPORTS,
	},
	endpoint: `https://${S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: "auto",
	maxAttempts: 3,
	requestHandler: {
		connectionTimeout: 3_000,
		requestTimeout: 30_000,
		throwOnRequestTimeout: true,
	},
});
