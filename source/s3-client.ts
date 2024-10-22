import process from "node:process";
import { S3Client } from "@aws-sdk/client-s3";

const { S3_ACCOUNT_ID, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env;

if (!(S3_ACCOUNT_ID && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY)) {
	throw new Error("Missing S3 credentials.");
}

export default new S3Client({
	credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
	endpoint: `https://${S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: "auto",
});
