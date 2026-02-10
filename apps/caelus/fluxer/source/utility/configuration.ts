import process from "node:process";
import { z } from "zod/v4";

const envSchema = z.object({
	FLUXER_TOKEN: z.string().min(1),
});

export const { FLUXER_TOKEN } = envSchema.parse(process.env);
