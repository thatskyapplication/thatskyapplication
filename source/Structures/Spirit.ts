import type { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { Realm, RealmValue, WIKI_URL } from "../Utility/Constants.js";

const enum SpiritName {
  SassyDrifter = "Sassy Drifter",
  StretchingGuru = "Stretching Guru",
  ProvokingPerformer = "Provoking Performer",
  LeapingDancer = "Leaping Dancer",
  SalutingProtector = "Saluting Protector",
  GreetingShaman = "Greeting Shaman",
  PiggybackLightseeker = "Piggyback Lightseeker",
  DoublefiveLightCatcher = "Doublefive Light Catcher",
  LaidbackPioneer = "Laidback Pioneer",
  TwirlingChampion = "Twirling Champion",
  CrabWhisperer = "Crab Whisperer",
  ShushingLightScholar = "Shushing Light Scholar",
  BoogieKid = "Boogie Kid",
  ConfettiCousin = "Confetti Cousin",
  HairtousleTeen = "Hairtousle Teen",
  SparklerParent = "Sparkler Parent",
  PleafulParent = "Pleaful Parent",
  WiseGrandparent = "Wise Grandparent",
  TroupeGreeter = "Troupe Greeter",
  FestivalSpinDancer = "Festival Spin Dancer",
  AdmiringActor = "Admiring Actor",
  TroupeJuggler = "Troupe Juggler",
  RespectfulPianist = "Respectful Pianist",
  ThoughtfulDirector = "Thoughtful Director",
  NoddingMuralist = "Nodding Muralist",
  IndifferentAlchemist = "Indifferent Alchemist",
  CrabWalker = "Crab Walker",
  ScarecrowFarmer = "Scarecrow Farmer",
  SnoozingCarpenter = "Snoozing Carpenter",
  PlayfightingHerbalist = "Playfighting Herbalist",
  JellyWhisperer = "Jelly Whisperer",
  TimidBookworm = "Timid Bookworm",
  RallyingThrillseeker = "Rallying Thrillseeker",
  HikingGrouch = "Hiking Grouch",
  GratefulShellCollector = "Grateful Shell Collector",
  ChillSunbather = "Chill Sunbather",
  ProphetOfWater = "Prophet of Water",
  ProphetOfEarth = "Prophet of Earth",
  ProphetOfAir = "Prophet of Air",
  ProphetOfFire = "Prophet of Fire",
  SpinningMentor = "Spinning Mentor",
  DancingPerformer = "Dancing Performer",
  PeekingPostman = "Peeking Postman",
  BearhugHermit = "Bearhug Hermit",
  BaffledBotanist = "Baffled Botanist",
  ScoldingStudent = "Scolding Student",
  ScaredyCadet = "Scaredy Cadet",
  MarchingAdventurer = "Marching Adventurer",
  ChucklingScout = "Chuckling Scout",
  DaydreamForester = "Daydream Forester",
  BeckoningRuler = "Beckoning Ruler",
  GloatingNarcissist = "Gloating Narcissist",
  StretchingLamplighter = "Stretching Lamplighter",
  SlouchingSoldier = "Slouching Soldier",
  SneezingGeographer = "Sneezing Geographer",
  StarCollector = "Star Collector",
  LivelyNavigator = "Lively Navigator",
  LightWhisperer = "Light Whisperer",
  TinkeringChimesmith = "Tinkering Chimesmith",
  TalentedBuilder = "Talented Builder",
  AnxiousAngler = "Anxious Angler",
  CeasingCommodore = "Ceasing Commodore",
  BumblingBoatswain = "Bumbling Boatswain",
  CacklingCannoneer = "Cackling Cannoneer",
  FranticStagehand = "Frantic Stagehand",
  ForgetfulStoryteller = "Forgetful Storyteller",
  MellowMusician = "Mellow Musician",
  ModestDancer = "Modest Dancer"
}

const enum Season {
  Gratitude = "Gratitude",
  Lightseekers = "Lightseekers",
  Belonging = "Belonging",
  Rhythm = "Rhythm",
  Enchantment = "Enchantment",
  Sanctuary = "Sanctuary",
  Prophecy = "Prophecy",
  Dreams = "Dreams",
  Assembly = "Assembly",
  LittlePrince = "Little Prince",
  Flight = "Flight",
  Abyss = "Abyss",
  Performance = "Performance"
}

const enum Call {
  Crab = "Crab",
  Jellyfish = "Jellyfish",
  BabyManta = "Baby manta"
}

const enum Expression {
  // Friend expressions
  DoubleFive = "Double-Five",
  HairTousle = "Hair tousle",
  Carry = "Carry",
  PlayFight = "Play fight",
  Bearhug = "Bearhug",
  Handshake = "Handshake",
  DuetDance = "Duet dance",
  // Regular expressions
  Point = "Point",
  Welcome = "Welcome",
  Nod = "Nod",
  Scold = "Scold",
  BlowKiss = "Blow kiss",
  Grateful = "Grateful",
  BellyScratch = "Belly scratch",
  Chuckle = "Chuckle",
  Karate = "Karate",
  Shrug = "Shrug",
  Grouchy = "Grouchy",
  Peek = "Peek",
  Eww = "Eww",
  Facepalm = "Faceplam",
  Leap = "Leap",
  Twirl = "Twirl",
  Confetti = "Confetti",
  Boogie = "Boogie",
  Dance = "Dance",
  Juggle = "Juggle",
  CrabWalk = "Crab walk",
  Rally = "Rally",
  SpinTrick = "Spin trick",
  ShowDance = "Show dance",
  Respect = "Respect",
  Dismiss = "Dismiss",
  Greeting = "Greeting",
  DontGo = "Don't go!",
  Scare = "Scare",
  DustOff = "Dust off",
  ChestPound = "Chest pound",
  March = "March",
  Yoga = "Yoga",
  Shush = "Shush",
  Sparkler = "Sparkler",
  Thinking = "Thinking",
  Doze = "Doze",
  Balance = "Balance",
  DeepBreath = "DeepBreath",
  Bubbles = "Bubbles",
  Beckon = "Beckon",
  Gloat = "Gloat",
  Stretch = "Stretch",
  Slouch = "Slouch",
  Sneeze = "Sneeze",
  HandRub = "Hand rub",
  Voilà = "Voilà",
  Navigate = "Navigate",
  CalmDown = "Calm down",
  EvilLaugh = "Evil laugh",
  Ouch = "Ouch",
  Anxious = "Anxious",
  Headbob = "Headbob",
  Awww = "Awww"
}

const enum Stance {
  Sassy = "Sassy",
  Laidback = "Laidback",
  Wise = "Wise",
  Timid = "Timid",
  Tinker = "Tinker"
}

interface SpiritOffer {
  candles: number;
  hearts: number;
  ascendedCandles: number;
}

interface SpiritDataBase {
  name: SpiritName;
  realm: RealmValue;
  offer?: SpiritOffer;
  keywords?: string[];
}

interface SpiritDataBaseWithExpression extends SpiritDataBase {
  expression: Expression;
}

interface SpiritDataBaseWithStance extends SpiritDataBase {
  stance: Stance;
}

interface SpiritDataBaseWithCall extends SpiritDataBase {
  call: Call;
}

type SpiritData = SpiritDataBaseWithExpression | SpiritDataBaseWithStance | SpiritDataBaseWithCall;
type SeasonalSpiritData = SpiritData & { season: Season };

interface SpiritSeason {
  name: Season;
}

class Spirit {
  readonly name: SpiritData["name"];
  readonly realm: SpiritData["realm"];
  readonly offer: Exclude<SpiritData["offer"], undefined> | null;
  readonly keywords: NonNullable<SpiritData["keywords"]>;
  readonly attachment: Buffer | null;
  readonly url: string;
  readonly expression: SpiritDataBaseWithExpression["expression"] | null;
  readonly stance: SpiritDataBaseWithStance["stance"] | null;
  readonly call: SpiritDataBaseWithCall["call"] | null;

  constructor(spirit: SpiritData) {
    const underscoredName = spirit.name.replaceAll(" ", "_");
    this.name = spirit.name;
    this.realm = spirit.realm;
    this.offer = spirit.offer ?? null;
    this.keywords = spirit.keywords ?? [];

    try {
      this.attachment = readFileSync(new URL(`../../Images/${underscoredName}.webp`, import.meta.url));
    } catch {
      this.attachment = null;
    }

    this.url = new URL(underscoredName, WIKI_URL).toString();
    this.expression = "expression" in spirit ? spirit.expression : null;
    this.stance = "stance" in spirit ? spirit.stance : null;
    this.call = "call" in spirit ? spirit.call : null;
  }

  isSeasonalSpirit(): this is SeasonalSpirit {
    return "season" in this;
  }
}

class SeasonalSpirit extends Spirit {
  readonly season: SpiritSeason;

  constructor(spirit: SeasonalSpiritData) {
    super(spirit);
    this.season = { name: spirit.season };
  }
}

export default [
  new SeasonalSpirit({ name: SpiritName.SassyDrifter, season: Season.Gratitude, stance: Stance.Sassy, realm: Realm.IslesOfDawn, offer: { candles: 87, hearts: 0, ascendedCandles: 2 }, keywords: ["weasel", "weasel mask"] }),
  new SeasonalSpirit({ name: SpiritName.StretchingGuru, season: Season.Gratitude, expression: Expression.Yoga, realm: Realm.DaylightPrairie, offer: { candles: 104, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ProvokingPerformer, season: Season.Gratitude, expression: Expression.Karate, realm: Realm.HiddenForest, offer: { candles: 104, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.LeapingDancer, season: Season.Gratitude, expression: Expression.Leap, realm: Realm.ValleyOfTriumph, offer: { candles: 107, hearts: 13, ascendedCandles: 2 }, keywords: ["fox", "fox mask"] }),
  new SeasonalSpirit({ name: SpiritName.SalutingProtector, season: Season.Gratitude, expression: Expression.Dismiss, realm: Realm.GoldenWasteland, offer: { candles: 145, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.GreetingShaman, season: Season.Gratitude, expression: Expression.Greeting, realm: Realm.VaultOfKnowledge, offer: { candles: 112, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.PiggybackLightseeker, season: Season.Lightseekers, expression: Expression.Carry, realm: Realm.IslesOfDawn, offer: { candles: 123, hearts: 8, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.DoublefiveLightCatcher, season: Season.Lightseekers, expression: Expression.DoubleFive, realm: Realm.DaylightPrairie, offer: { candles: 126, hearts: 7, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.LaidbackPioneer, season: Season.Lightseekers, stance: Stance.Laidback, realm: Realm.HiddenForest, offer: { candles: 151, hearts: 0, ascendedCandles: 2 }, keywords: ["umbrella"] }),
  new SeasonalSpirit({ name: SpiritName.TwirlingChampion, season: Season.Lightseekers, expression: Expression.Twirl, realm: Realm.ValleyOfTriumph, offer: { candles: 131, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.CrabWhisperer, season: Season.Lightseekers, call: Call.Crab, realm: Realm.GoldenWasteland, offer: { candles: 190, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ShushingLightScholar, season: Season.Lightseekers, expression: Expression.Shush, realm: Realm.VaultOfKnowledge, offer: { candles: 108, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.BoogieKid, season: Season.Belonging, expression: Expression.Boogie, realm: Realm.IslesOfDawn, offer: { candles: 103, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ConfettiCousin, season: Season.Belonging, expression: Expression.Confetti, realm: Realm.DaylightPrairie, offer: { candles: 115, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.HairtousleTeen, season: Season.Belonging, expression: Expression.HairTousle, realm: Realm.HiddenForest, offer: { candles: 148, hearts: 9, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.SparklerParent, season: Season.Belonging, expression: Expression.Sparkler, realm: Realm.ValleyOfTriumph, offer: { candles: 116, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.PleafulParent, season: Season.Belonging, expression: Expression.DontGo, realm: Realm.GoldenWasteland, offer: { candles: 195, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.WiseGrandparent, season: Season.Belonging, stance: Stance.Wise, realm: Realm.VaultOfKnowledge, offer: { candles: 156, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.TroupeGreeter, season: Season.Rhythm, expression: Expression.Welcome, realm: Realm.IslesOfDawn, offer: { candles: 146, hearts: 13, ascendedCandles: 12 } }),
  new SeasonalSpirit({ name: SpiritName.FestivalSpinDancer, season: Season.Rhythm, expression: Expression.Dance, realm: Realm.DaylightPrairie, offer: { candles: 157, hearts: 19, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.AdmiringActor, season: Season.Rhythm, expression: Expression.BlowKiss, realm: Realm.HiddenForest, offer: { candles: 135, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.TroupeJuggler, season: Season.Rhythm, expression: Expression.Juggle, realm: Realm.ValleyOfTriumph, offer: { candles: 205, hearts: 27, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.RespectfulPianist, season: Season.Rhythm, expression: Expression.Respect, realm: Realm.GoldenWasteland, offer: { candles: 162, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ThoughtfulDirector, season: Season.Rhythm, expression: Expression.Thinking, realm: Realm.VaultOfKnowledge, offer: { candles: 195, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.NoddingMuralist, season: Season.Enchantment, expression: Expression.Nod, realm: Realm.GoldenWasteland, offer: { candles: 77, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.IndifferentAlchemist, season: Season.Enchantment, expression: Expression.Shrug, realm: Realm.GoldenWasteland, offer: { candles: 167, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.CrabWalker, season: Season.Enchantment, expression: Expression.CrabWalk, realm: Realm.GoldenWasteland, offer: { candles: 115, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ScarecrowFarmer, season: Season.Enchantment, expression: Expression.Scare, realm: Realm.GoldenWasteland, offer: { candles: 89, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.SnoozingCarpenter, season: Season.Enchantment, expression: Expression.Doze, realm: Realm.GoldenWasteland, offer: { candles: 112, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.PlayfightingHerbalist, season: Season.Enchantment, expression: Expression.PlayFight, realm: Realm.GoldenWasteland, offer: { candles: 195, hearts: 10, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.JellyWhisperer, season: Season.Sanctuary, call: Call.Jellyfish, realm: Realm.DaylightPrairie, offer: { candles: 135, hearts: 15, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.TimidBookworm, season: Season.Sanctuary, stance: Stance.Timid, realm: Realm.DaylightPrairie, offer: { candles: 140, hearts: 0, ascendedCandles: 2 }, keywords: ["butterfly", "butterfly cape"] }),
  new SeasonalSpirit({ name: SpiritName.RallyingThrillseeker, season: Season.Sanctuary, expression: Expression.Rally, realm: Realm.DaylightPrairie, offer: { candles: 125, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.HikingGrouch, season: Season.Sanctuary, expression: Expression.Grouchy, realm: Realm.DaylightPrairie, offer: { candles: 139, hearts: 29, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.GratefulShellCollector, season: Season.Sanctuary, expression: Expression.Grateful, realm: Realm.DaylightPrairie, offer: { candles: 162, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ChillSunbather, season: Season.Sanctuary, expression: Expression.BellyScratch, realm: Realm.DaylightPrairie, offer: { candles: 197, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ProphetOfWater, season: Season.Prophecy, expression: Expression.DeepBreath, realm: Realm.IslesOfDawn, offer: { candles: 187, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ProphetOfEarth, season: Season.Prophecy, expression: Expression.DustOff, realm: Realm.IslesOfDawn, offer: { candles: 211, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ProphetOfAir, season: Season.Prophecy, expression: Expression.Balance, realm: Realm.IslesOfDawn, offer: { candles: 201, hearts: 12, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.ProphetOfFire, season: Season.Prophecy, expression: Expression.ChestPound, realm: Realm.IslesOfDawn, offer: { candles: 202, hearts: 26, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.SpinningMentor, season: Season.Dreams, expression: Expression.SpinTrick, realm: Realm.ValleyOfTriumph, offer: { candles: 169, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.DancingPerformer, season: Season.Dreams, expression: Expression.ShowDance, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: SpiritName.PeekingPostman, season: Season.Dreams, expression: Expression.Peek, realm: Realm.ValleyOfTriumph, offer: { candles: 217, hearts: 13, ascendedCandles: 2 }, keywords: ["rabbit", "rabbit mask"] }),
  new SeasonalSpirit({ name: SpiritName.BearhugHermit, season: Season.Dreams, expression: Expression.Bearhug, realm: Realm.ValleyOfTriumph, keywords: ["yeti"] }),
  new SeasonalSpirit({ name: SpiritName.BaffledBotanist, season: Season.Assembly, expression: Expression.Facepalm, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.ScoldingStudent, season: Season.Assembly, expression: Expression.Scold, realm: Realm.HiddenForest, offer: { candles: 157, hearts: 13, ascendedCandles: 2 }, keywords: ["clover", "clover cape"] }),
  new SeasonalSpirit({ name: SpiritName.ScaredyCadet, season: Season.Assembly, expression: Expression.Eww, realm: Realm.HiddenForest, keywords: ["hammock"] }),
  new SeasonalSpirit({ name: SpiritName.MarchingAdventurer, season: Season.Assembly, expression: Expression.March, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.ChucklingScout, season: Season.Assembly, expression: Expression.Chuckle, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.DaydreamForester, season: Season.Assembly, expression: Expression.Bubbles, realm: Realm.HiddenForest, offer: { candles: 112, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.BeckoningRuler, season: Season.LittlePrince, expression: Expression.Beckon, realm: Realm.VaultOfKnowledge, keywords: ["frog", "frog mask"], offer: { candles: 103, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: SpiritName.GloatingNarcissist, season: Season.LittlePrince, expression: Expression.Gloat, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: SpiritName.StretchingLamplighter, season: Season.LittlePrince, expression: Expression.Stretch, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: SpiritName.SlouchingSoldier, season: Season.LittlePrince, expression: Expression.Slouch, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: SpiritName.SneezingGeographer, season: Season.LittlePrince, expression: Expression.Sneeze, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: SpiritName.StarCollector, season: Season.LittlePrince, expression: Expression.HandRub, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: SpiritName.LivelyNavigator, season: Season.Flight, expression: Expression.Navigate, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.LightWhisperer, season: Season.Flight, call: Call.BabyManta, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.TinkeringChimesmith, season: Season.Flight, stance: Stance.Tinker, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.TalentedBuilder, season: Season.Flight, expression: Expression.Voilà, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: SpiritName.AnxiousAngler, season: Season.Abyss, expression: Expression.Anxious, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: SpiritName.CeasingCommodore, season: Season.Abyss, expression: Expression.CalmDown, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: SpiritName.BumblingBoatswain, season: Season.Abyss, expression: Expression.Ouch, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: SpiritName.CacklingCannoneer, season: Season.Abyss, expression: Expression.EvilLaugh, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: SpiritName.FranticStagehand, season: Season.Performance, expression: Expression.Handshake, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: SpiritName.ForgetfulStoryteller, season: Season.Performance, expression: Expression.Awww, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: SpiritName.MellowMusician, season: Season.Performance, expression: Expression.Headbob, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: SpiritName.ModestDancer, season: Season.Performance, expression: Expression.DuetDance, realm: Realm.ValleyOfTriumph })
] as const;
