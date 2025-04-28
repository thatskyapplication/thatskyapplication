import about from "./chat-inputs/about.js";
import configure from "./chat-inputs/configure.js";
import report from "./message-context-menus/report.js";

export const CHAT_INPUT_COMMANDS = [about, configure] as const;
export const MESSAGE_CONTEXT_MENU_COMMANDS = [report] as const;
