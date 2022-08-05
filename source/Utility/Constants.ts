export const REPOSITORY = "Jiralite/Caelus" as const;
export const STARTUP_MESSAGE = "Twirling in the air~" as const;
export const LOG_CHANNEL_ID = "994581628804403250" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki/" as const;
export const MAXIMUM_WINGED_LIGHT = 200 as const;

export const enum Emoji {
  TGCBlueSparkles = "597899298520170501",
  TGCCheck = "597899975548076052",
  SkyGiveLight = "632233908603453498",
  Gratitude = "651170389115928587",
  Lightseekers = "651170389359198208",
  Belonging = "651170575955263559",
  Rhythm = "670096804443848714",
  Enchantment = "700863707785330789",
  Sanctuary = "730940479197282355",
  Prophecy = "764257791664979980",
  Dreams = "788247970050473994",
  Assembly = "822639786522968094",
  LittlePrince = "862033729529708614",
  Flight = "893606036324384768",
  Abyss = "932731569473466418",
  Performance = "958109222778847302",
  Candle = "1003029936015147168",
  Heart = "1003031293283553310",
  AscendedCandle = "1003031656887762944"
}

export enum Realm {
  IslesOfDawn = "Isles of Dawn",
  DaylightPrairie = "Daylight Prairie",
  HiddenForest = "Hidden Forest",
  ValleyOfTriumph = "Valley of Triumph",
  GoldenWasteland = "Golden Wasteland",
  VaultOfKnowledge = "Vault of Knowledge",
  EyeOfEden = "Eye of Eden",
  AncientMemory = "Ancient Memory"
}

export const WingedLightCount = {
  IslesOfDawn: 9,
  DaylightPrairie: 21,
  HiddenForest: 19,
  ValleyOfTriumph: 17,
  GoldenWasteland: 18,
  VaultOfKnowledge: 11,
  EyeOfEden: 10,
  AncientMemory: 2,
  Orbit: 1
} as const;
