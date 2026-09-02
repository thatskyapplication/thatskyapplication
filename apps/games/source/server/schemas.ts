import { z } from "zod";
import { GUESS_TYPE_VALUES, type GuessTypes } from "@thatskyapplication/utility";

export const instanceIdSchema = z.string().regex(/^[\w-]{1,64}$/);
const snowflake = z.string().regex(/^\d{17,20}$/);
const guessType = z.union(GUESS_TYPE_VALUES.map((type: GuessTypes) => z.literal(type)));

export const guessTypeQuerySchema = z
	.string()
	.regex(/^\d{1,3}$/)
	.transform(Number)
	.pipe(guessType);

export const startSchema = z.object({ type: guessType, instanceId: instanceIdSchema.nullish() });

export const answerSchema = z.object({
	type: guessType,
	option: z.int(),
	instanceId: instanceIdSchema.nullish(),
	sessionId: z.uuid().nullish(),
});

export const endSchema = z.object({
	type: guessType,
	instanceId: instanceIdSchema.nullish(),
	sessionId: z.uuid().nullish(),
});
export const nameSchema = z.object({ name: z.string() });
export const tokenSchema = z.object({ code: z.string().min(1) });
export const claimSchema = z.object({ instanceId: instanceIdSchema });
export const primarySchema = z.object({ instanceId: instanceIdSchema, userId: snowflake });
