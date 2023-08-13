import { request } from "undici";

interface WaifuResponse {
	url: string;
}

export const enum WaifuCategory {
	Kick = "kick",
	Slap = "slap",
}

export async function waifu(endpoint: WaifuCategory): Promise<WaifuResponse> {
	return (await request(`https://api.waifu.pics/sfw/${endpoint}`)).body.json() as Promise<WaifuResponse>;
}
