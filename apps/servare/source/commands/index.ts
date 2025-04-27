import about from "./chat-inputs/about.js";
import confgure from "./chat-inputs/confgure.js";
import memberLog from "./chat-inputs/member-log.js";
import messageLog from "./chat-inputs/message-log.js";
import report from "./message-context-menus/report.js";

export const CHAT_INPUT_COMMANDS = [about, confgure, memberLog, messageLog] as const;
export const MESSAGE_CONTEXT_MENU_COMMANDS = [report] as const;
