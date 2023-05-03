import { CDN_URL } from "~/util/constants";

class SkyKid {
	public readonly name: string;

	public readonly avatarIcon: string;

	public constructor(name: string, avatarIconName: string = name) {
		this.name = name;
		this.avatarIcon = new URL(`avatar_icons/${avatarIconName}.webp`, CDN_URL).href;
	}
}

export const caelus = new SkyKid("Caelus");
export const anna = new SkyKid("Prudence", "Anna");
export const elaine = new SkyKid("Laine", "Elaine");
export const elizabeth = new SkyKid("ellie", "Elizabeth");
export const jiralite = new SkyKid("Jiralite");
export const lucía = new SkyKid("Lu", "Lucía");
export const sherry = new SkyKid("Sherry");
export const taha = new SkyKid("TAHA", "Taha");
