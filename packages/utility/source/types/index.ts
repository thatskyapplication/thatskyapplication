import type { SpiritIds } from "../utility/spirits.js";

export type Snowflake = `${bigint}`;

export type Nullable<Type> = {
	[Property in keyof Type]: Type[Property] | null;
};

export enum VisitType {
	Travelling = 0,
	Returning = 1,
}

export interface VisitPeriod {
	readonly start: Temporal.ZonedDateTime;
	readonly end: Temporal.ZonedDateTime;
}

export interface BaseVisit<Type extends VisitType = VisitType> extends VisitPeriod {
	readonly type: Type;
}

export interface TravellingSpiritVisit extends BaseVisit<VisitType.Travelling> {
	readonly spiritId: SpiritIds;
}

export interface ReturningSpiritVisit extends BaseVisit<VisitType.Returning> {
	readonly spiritIds: readonly [SpiritIds, ...SpiritIds[]];
}

export interface ReturningIndividualSpiritVisit extends BaseVisit<VisitType.Returning> {
	readonly spiritId: SpiritIds;
}

export type IndividualSpiritVisit = TravellingSpiritVisit | ReturningIndividualSpiritVisit;

export type Visit = TravellingSpiritVisit | ReturningSpiritVisit;
