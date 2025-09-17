import { setInterval } from "node:timers";
import type { RESTGetAPICurrentUserGuildsResult } from "@discordjs/core/http-only";

interface CacheEntry<T> {
	data: T;
	timestamp: number;
	ttl: number;
}

class BaseCache<Data> {
	private readonly cache = new Map<string, CacheEntry<Data>>();

	// @ts-expect-error This is fine.
	// biome-ignore lint/correctness/noUnusedPrivateClassMembers: This is fine.
	private readonly cleanupInterval = setInterval(() => this.cleanup(), 900_000);

	/**
	 * Sets a value in the cache.
	 *
	 * @param key - The key to set.
	 * @param data - The data to set.
	 * @param ttl - The time to live in minutes.
	 */
	public set(key: string, data: Data, ttl: number) {
		this.cache.set(key, { data, timestamp: Date.now(), ttl: ttl * 60_000 });
	}

	public get(key: string): Data | null {
		const entry = this.cache.get(key);

		if (!entry) {
			return null;
		}

		if (Date.now() - entry.timestamp > entry.ttl) {
			this.cache.delete(key);
			return null;
		}

		return entry.data;
	}

	private cleanup() {
		const now = Date.now();

		for (const [key, entry] of this.cache) {
			if (now - entry.timestamp > entry.ttl) {
				this.cache.delete(key);
			}
		}
	}
}

export const guildCache = new BaseCache<RESTGetAPICurrentUserGuildsResult>();
