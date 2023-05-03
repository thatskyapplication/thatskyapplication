import type { ClientEvents } from "discord.js";
import { event as interactionCreate } from "./interactionCreate.js";
import { event as messageCreate } from "./messageCreate.js";
import { event as messageUpdate } from "./messageUpdate.js";
import { event as ready } from "./ready.js";

export interface Event<T extends keyof ClientEvents = keyof ClientEvents> {
	name: T;
	once?: boolean;
	fire(this: void, ...parameters: ClientEvents[T]): Promise<void> | void;
}

export default [
	interactionCreate,
	messageCreate,
	messageUpdate,
	ready,
] as const;
