import type { MappedEvents } from "@discordjs/core";

export interface Event<T extends keyof MappedEvents = keyof MappedEvents> {
	name: T;
	fire(this: void, ...parameters: MappedEvents[T]): Promise<void> | void;
}
