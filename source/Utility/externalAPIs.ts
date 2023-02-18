import { makeURLSearchParams } from "discord.js";
import { request } from "undici";
import { RESOURCES_VERSION } from "./Constants.js";

interface GitHubContentResponse {
	name: string;
	download_url: string;
}

export const enum ResourceType {
	Hugs = "hugs",
	Shards = "shards",
	Spirits = "spirits",
}

interface WaifuResponse {
	url: string;
}

export const enum WaifuCategory {
	Kick = "kick",
	Slap = "slap",
}

export async function waifu(endpoint: WaifuCategory): Promise<WaifuResponse> {
	return (await request(`https://api.waifu.pics/sfw/${endpoint}`)).body.json();
}

export async function fetchResources(type: ResourceType) {
	return (
		(await (
			await request(
				`https://api.github.com/repos/thatskyapplication/resources/contents/${type}?${makeURLSearchParams({
					ref: RESOURCES_VERSION,
				})}`,
				{ headers: { "user-agent": "Caelus", "x-github-api-version": "2022-11-28" } },
			)
		).body.json()) as GitHubContentResponse[]
	).map(({ name, download_url }) => ({ name, downloadURL: download_url }));
}
