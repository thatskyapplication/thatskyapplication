import about from "./chat-inputs/about.js";
import memberLog from "./chat-inputs/member-log.js";
import messageLog from "./chat-inputs/message-log.js";

export const CHAT_INPUT_COMMANDS = [about, memberLog, messageLog] as const;
