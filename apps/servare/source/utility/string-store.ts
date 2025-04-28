import { Schema, SchemaStore } from "@sapphire/string-store";

export enum CustomId {
	MemberLog = 0,
	MessageLogChannelId = 1,
	MessageLogIgnoreChannelIds = 2,
	MessageLogAllowChannelIds = 3,
	ReportChannel = 4,
	ReportModalResponse = 5,
	ReportModalResponseText = 6,
	ReportModalConfirmationConfirm = 7,
	ReportModalConfirmationCancel = 8,
	ReportTag = 9,
}

const memberLogSchema = new Schema(CustomId.MemberLog);
const messageLogChannelIdSchema = new Schema(CustomId.MessageLogChannelId);
const messageLogIgnoreChannelIdsSchema = new Schema(CustomId.MessageLogIgnoreChannelIds);
const messageLogAllowChannelIdsSchema = new Schema(CustomId.MessageLogAllowChannelIds);
const reportChannelSchema = new Schema(CustomId.ReportChannel);

const reportModalResponseSchema = new Schema(CustomId.ReportModalResponse)
	.string("commandId")
	.string("username")
	.string("userId")
	.string("messageId");

const reportModalResponseTextSchema = new Schema(CustomId.ReportModalResponseText);

const reportModalConfirmationConfirmSchema = new Schema(CustomId.ReportModalConfirmationConfirm)
	.string("commandId")
	.string("username")
	.string("userId")
	.string("messageId");

const reportModalConfirmationCancelSchema = new Schema(CustomId.ReportModalConfirmationCancel);
const reportTagSchema = new Schema(CustomId.ReportTag);

export const schemaStore = new SchemaStore()
	.add(memberLogSchema)
	.add(messageLogChannelIdSchema)
	.add(messageLogIgnoreChannelIdsSchema)
	.add(messageLogAllowChannelIdsSchema)
	.add(reportChannelSchema)
	.add(reportModalResponseSchema)
	.add(reportModalResponseTextSchema)
	.add(reportModalConfirmationConfirmSchema)
	.add(reportModalConfirmationCancelSchema)
	.add(reportTagSchema);
