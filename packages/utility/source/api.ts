import type { APIUser, Snowflake } from "discord-api-types/v10";

export const DAILY_GUIDES_MODIFICATIONS_ROUTE = "/api/daily-guides/modifications" as const;
export const DAILY_GUIDES_DISTRIBUTE_ROUTE = "/api/daily-guides/distribute" as const;

export const DailyGuidesModificationType = {
	Set: 0,
	QuestsReorder: 1,
	NestingWorkshopSet: 2,
	NestingWorkshopReorder: 3,
} as const satisfies Readonly<Record<string, number>>;

export function guildsMeRoute(guildId: Snowflake) {
	return `/api/guilds/${guildId}/@me` as const;
}

export interface APIGuildsMeResponse {
	present: boolean;
}

export type APIDailyGuidesUser = Pick<APIUser, "id" | "username" | "discriminator">;

export interface APIDailyGuidesQuests {
	quest1: number | null;
	quest2: number | null;
	quest3: number | null;
	quest4: number | null;
}

export interface APIDailyGuidesState extends APIDailyGuidesQuests {
	travellingRock: string | null;
	travellingRockNotSpawned: boolean | null;
}

interface APIDailyGuidesModification<Type extends number, State> {
	type: Type;
	user: APIDailyGuidesUser;
	previous: State;
	next: State;
}

export type APIPostDailyGuidesModificationBody =
	| APIDailyGuidesModification<typeof DailyGuidesModificationType.Set, APIDailyGuidesState>
	| APIDailyGuidesModification<
			typeof DailyGuidesModificationType.QuestsReorder,
			APIDailyGuidesQuests
	  >
	| APIDailyGuidesModification<
			typeof DailyGuidesModificationType.NestingWorkshopSet,
			readonly number[]
	  >
	| APIDailyGuidesModification<
			typeof DailyGuidesModificationType.NestingWorkshopReorder,
			readonly number[]
	  >;

export interface APIPostDailyGuidesDistributeBody {
	user: APIDailyGuidesUser;
}
