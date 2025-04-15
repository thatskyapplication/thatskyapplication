import { Schema, SchemaStore } from "@sapphire/string-store";

export enum CustomId {
	MemberLog = 0,
}

export const memberLogSchema = new Schema(CustomId.MemberLog);

export const schemaStore = new SchemaStore().add(memberLogSchema);
