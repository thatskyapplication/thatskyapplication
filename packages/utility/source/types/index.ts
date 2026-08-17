import type { SpiritIds } from "../utility/spirits.js";

export type Snowflake = `${bigint}`;

export type Nullable<Type> = {
	[Property in keyof Type]: Type[Property] | null;
};

export enum VisitType {
	Travelling = 0,
	Returning = 1,
}

export interface BaseVisit<Type extends VisitType = VisitType> {
	type: Type;
	visit: number;
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
}

export interface TravellingSpiritVisit extends BaseVisit<VisitType.Travelling> {
	spiritId: SpiritIds;
}

export interface ReturningSpiritVisit extends BaseVisit<VisitType.Returning> {
	spiritIds: readonly SpiritIds[];
}

export interface ReturningIndividualSpiritVisit extends BaseVisit<VisitType.Returning> {
	spiritId: SpiritIds;
}

export type IndividualSpiritVisit = TravellingSpiritVisit | ReturningIndividualSpiritVisit;

export type Visit = TravellingSpiritVisit | ReturningSpiritVisit;
