import type { ClientEvents } from "discord.js";

export interface Event<T extends keyof ClientEvents> {
  name: T;
  once: boolean;
  fire(...parameters: ClientEvents[T]): void | Promise<void>;
}
