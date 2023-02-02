import process from "node:process";
import type { Locale } from "discord.js";
import { makeURLSearchParams } from "discord.js";
import { request } from "undici";

const { TENOR_KEY } = process.env;
if (!TENOR_KEY) throw new Error("Tenor API key missing.");

interface TenorSearchOptions {
	q: string;
	clientKey: string;
	/**
	 * @privateRemarks
	 * https://developers.google.com/tenor/guides/localization accepts a lot more
	 * but Discord only sends a subset of this.
	 */
	locale: Locale;
}

interface TenorResponse {
	results: TenorResult[];
}

interface TenorResult {
	media_formats: TenorMediaFormat;
}

interface TenorMediaFormat {
	gif: TenorMediaObject;
}

interface TenorMediaObject {
	url: string;
}

// eslint-disable-next-line id-length
export async function search({ q, clientKey, locale }: TenorSearchOptions): Promise<TenorResponse> {
	const { body } = await request(
		`https://tenor.googleapis.com/v2/search?${makeURLSearchParams({
			key: TENOR_KEY,
			// eslint-disable-next-line id-length
			q,
			client_key: clientKey,
			locale,
			media_filter: "gif",
			limit: 50,
		})}`,
	);

	return body.json();
}
