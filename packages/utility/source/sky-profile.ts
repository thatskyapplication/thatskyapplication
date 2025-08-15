export interface SkyProfilePacket {
	user_id: string;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
	country: string | null;
	winged_light: SkyProfileWingedLightTypes | null;
	seasons: number[] | null;
	platform: number[] | null;
	spirit: number | null;
	spot: string | null;
	catalogue_progression: boolean | null;
	guess_rank: boolean | null;
}

export const SkyProfileWingedLightType = {
	InferFromCatalogue: 0,
	Capeless: 1,
} as const satisfies Readonly<Record<string, number>>;

export type SkyProfileWingedLightTypes =
	(typeof SkyProfileWingedLightType)[keyof typeof SkyProfileWingedLightType];

export const SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES = Object.values(SkyProfileWingedLightType);
