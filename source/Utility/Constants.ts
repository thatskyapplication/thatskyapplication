import { Locale } from "discord.js";

export const REPOSITORY = "Jiralite/Caelus" as const;
export const STARTUP_MESSAGE = "Twirling in the air~" as const;
export const LOG_CHANNEL_ID = "994581628804403250" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki/" as const;
export const MAXIMUM_WINGED_LIGHT = 206 as const;

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

export const Realm = {
  IslesOfDawn: 0,
  DaylightPrairie: 1,
  HiddenForest: 2,
  ValleyOfTriumph: 3,
  GoldenWasteland: 4,
  VaultOfKnowledge: 5,
  EyeOfEden: 6,
  AncientMemory: 7
} as const;

export const realmTranslations = {
  [Realm.IslesOfDawn]: {
    [Locale.EnglishGB]: "Isles of Dawn",
    [Locale.EnglishUS]: "Isles of Dawn",
    [Locale.SpanishES]: "Isla del Amanecer"
  },
  [Realm.DaylightPrairie]: {
    [Locale.EnglishGB]: "Daylight Prairie",
    [Locale.EnglishUS]: "Daylight Prairie",
    [Locale.SpanishES]: "Planicie de Luz de Día"
  },
  [Realm.HiddenForest]: {
    [Locale.EnglishGB]: "Hidden Forest",
    [Locale.EnglishUS]: "Hidden Forest",
    [Locale.SpanishES]: "Bosque Escondido"
  },
  [Realm.ValleyOfTriumph]: {
    [Locale.EnglishGB]: "Valley Of Triumph",
    [Locale.EnglishUS]: "Valley Of Triumph",
    [Locale.SpanishES]: "Valle del Triunfo"
  },
  [Realm.GoldenWasteland]: {
    [Locale.EnglishGB]: "Golden Wasteland",
    [Locale.EnglishUS]: "Golden Wasteland",
    [Locale.SpanishES]: "Páramo Dorado"
  },
  [Realm.VaultOfKnowledge]: {
    [Locale.EnglishGB]: "Vault of Knowledge",
    [Locale.EnglishUS]: "Vault of Knowledge",
    [Locale.SpanishES]: "Bóveda del Conocimiento"
  },
  [Realm.EyeOfEden]: {
    [Locale.EnglishGB]: "Eye of Eden",
    [Locale.EnglishUS]: "Eye of Eden",
    [Locale.SpanishES]: "Ojo de edén"
  },
  [Realm.AncientMemory]: {
    [Locale.EnglishGB]: "Ancient Memory",
    [Locale.EnglishUS]: "Ancient Memory",
    [Locale.SpanishES]: "Memoria antigua"
  }
} as const;

export type RealmValue = typeof Realm[keyof typeof Realm];

export const WingedLightCount = {
  IslesOfDawn: 9,
  DaylightPrairie: 21,
  HiddenForest: 19,
  ValleyOfTriumph: 17,
  GoldenWasteland: 18,
  VaultOfKnowledge: 11,
  EyeOfEden: 10,
  AncientMemory: 6,
  Orbit: 1
} as const;
