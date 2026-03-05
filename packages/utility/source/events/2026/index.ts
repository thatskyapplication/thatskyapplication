import daysOfBloom from "./days-of-bloom.js";
import daysOfFortune from "./days-of-fortune.js";
import daysOfLove from "./days-of-love.js";
import personalityQuizEvent from "./personality-quiz-event.js";
import tournamentOfTriumph from "./tournament-of-triumph.js";

export default [
	personalityQuizEvent,
	tournamentOfTriumph,
	daysOfLove,
	daysOfFortune,
	daysOfBloom,
] as const;
