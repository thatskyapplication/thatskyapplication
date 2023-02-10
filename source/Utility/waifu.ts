import { request } from "undici";

interface WaifuResponse {
	url: string;
}

export const enum WaifuCategory {
	Hug = "hug",
	Kick = "kick",
	Slap = "slap",
}

export default async function waifu(endpoint: WaifuCategory): Promise<WaifuResponse> {
	return (await request(`https://api.waifu.pics/sfw/${endpoint}`)).body.json();
}
