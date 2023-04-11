import process from "node:process";
import { request } from "undici";

interface WaifuResponse {
	url: string;
}

export const enum WaifuCategory {
	Kick = "kick",
	Slap = "slap",
}

const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) throw new Error("No GitHub token.");

export async function waifu(endpoint: WaifuCategory): Promise<WaifuResponse> {
	return (await request(`https://api.waifu.pics/sfw/${endpoint}`)).body.json();
}
