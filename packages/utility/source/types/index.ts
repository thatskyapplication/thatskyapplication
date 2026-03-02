import type { DateTime } from "luxon";
import type { SpiritIds } from "../utility/spirits.js";

export type Snowflake = `${bigint}`;

export type Nullable<Type> = {
	[Property in keyof Type]: Type[Property] | null;
};

export enum VisitType {
	Travelling = 0,
	Returning = 1,
}

export interface Visit {
	type: VisitType;
	spiritId: SpiritIds;
	visit: number;
	start: DateTime;
	end: DateTime;
}
