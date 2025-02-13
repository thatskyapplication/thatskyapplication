export const PlatformId = {
	iOS: 0,
	Android: 1,
	Mac: 2,
	NintendoSwitch: 3,
	PlayStation: 4,
	Steam: 5,
} as const satisfies Readonly<Record<string, number>>;

export const PLATFORM_ID_VALUES = Object.values(PlatformId);
export type PlatformIds = (typeof PLATFORM_ID_VALUES)[number];

export function isPlatformId(platformId: number): platformId is PlatformIds {
	return PLATFORM_ID_VALUES.includes(platformId as PlatformIds);
}
