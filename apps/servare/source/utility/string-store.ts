import { Schema, SchemaStore } from "@sapphire/string-store";

export enum CustomId {
	MemberLog = 0,
	MessageLogChannelId = 1,
	MessageLogIgnoreChannelIds = 2,
	MessageLogAllowChannelIds = 3,
}

const memberLogSchema = new Schema(CustomId.MemberLog);
const messageLogChannelIdSchema = new Schema(CustomId.MessageLogChannelId);
const messageLogIgnoreChannelIdsSchema = new Schema(CustomId.MessageLogIgnoreChannelIds);
const messageLogAllowChannelIdsSchema = new Schema(CustomId.MessageLogAllowChannelIds);

export const schemaStore = new SchemaStore()
	.add(memberLogSchema)
	.add(messageLogChannelIdSchema)
	.add(messageLogIgnoreChannelIdsSchema)
	.add(messageLogAllowChannelIdsSchema);
