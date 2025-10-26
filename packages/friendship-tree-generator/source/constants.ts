import { emojiConstants } from "@thatskyapplication/utility";

export const BACKGROUND_PADDING = 20 as const;
export const LINE_WIDTH = 5 as const;
export const TEXT_COLOUR = "#FFFFFF" as const;
export const LINE_COLOUR = "#FFFFFF" as const;
export const IMAGE_SIZE = 100 as const;
export const WIDTH_MODIFIER = 200 as const;
export const HEIGHT_START_OFFSET = 25 as const;
export const LINE_OFFSET = 10 as const;
export const ASSET_SIZE = 55 as const;
export const ASSET_OFFSET = 5 as const;
export const ASSET_TEXT_SINGLE_OFFSET = 15 as const;
export const ASSET_TEXT_DOUBLE_OFFSET = 31 as const;
export const ASSET_TEXT_TRIPLE_OFFSET = 47 as const;
export const SEASON_ICON_MIDDLE_OFFSET_X = 18 as const;
export const SEASON_ICON_MIDDLE_OFFSET_Y = 42 as const;
export const SEASON_ICON_SIDES_OFFSET_X = 35 as const;
export const SEASON_ICON_SIDES_OFFSET_Y = 35 as const;
export const LEVEL_OFFSET_X = 35 as const;
export const LEVEL_OFFSET_Y = 2 as const;
export const CURRENCY_TEXT_OFFSET = 10 as const;
export const NEXT_HEIGHT_LEVEL = 240 as const;
export const NEXT_HEIGHT_LEVEL_SIDES_OFFSET = 60 as const;

export const {
	MISCELLANEOUS_EMOJIS,
	CosmeticToEmoji,
	SeasonIdToSeasonalEmoji,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalHeartEmoji,
} = emojiConstants(true);
