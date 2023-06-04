import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";

export default [
	...Elder,
	// new ElderSpirit({
	// 	name: SpiritName.ElderOfTheIsle,
	// 	realm: Realm.IslesOfDawn,
	// 	offer: { candles: 0, hearts: 0, ascendedCandles: 129 },
	// }),
	// new ElderSpirit({
	// 	name: SpiritName.ElderOfThePrairie,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 0, hearts: 0, ascendedCandles: 78 },
	// }),
	// new ElderSpirit({
	// 	name: SpiritName.ElderOfTheForest,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 0, hearts: 0, ascendedCandles: 256 },
	// }),
	// new ElderSpirit({
	// 	name: SpiritName.ElderOfTheValley,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 0, hearts: 0, ascendedCandles: 11 },
	// }),
	// new ElderSpirit({
	// 	name: SpiritName.ElderOfTheWasteland,
	// 	realm: Realm.GoldenWasteland,
	// 	offer: { candles: 0, hearts: 0, ascendedCandles: 6 },
	// }),
	// new ElderSpirit({
	// 	name: SpiritName.ElderOfTheVault,
	// 	realm: Realm.VaultOfKnowledge,
	// 	offer: { candles: 0, hearts: 0, ascendedCandles: 5 },
	// }),
	...Seasonal,
	// new SeasonalSpirit({
	// 	name: SpiritName.SassyDrifter,
	// 	season: Season.Gratitude,
	// 	stance: Stance.Sassy,
	// 	realm: Realm.IslesOfDawn,
	// 	offer: { candles: 87, hearts: 0, ascendedCandles: 2 },
	// 	hasMarketingVideo: true,
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(1, skyDate(2_020, 1, 31))
	// 			.set(10, skyDate(2_020, 5, 28))
	// 			.set(39, skyDate(2_021, 7, 8))
	// 			.set(76, skyDate(2_022, 12, 8)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// 	keywords: ["weasel", "weasel mask"],
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.StretchingGuru,
	// 	season: Season.Gratitude,
	// 	expression: Expression.Yoga,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 104, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(8, skyDate(2_020, 4, 30))
	// 			.set(57, skyDate(2_022, 3, 17)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ProvokingPerformer,
	// 	season: Season.Gratitude,
	// 	expression: Expression.Karate,
	// 	realm: Realm.HiddenForest,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 104, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(4, skyDate(2_020, 3, 12))
	// 			.set(19, skyDate(2_020, 10, 1))
	// 			.set(84, skyDate(2_023, 3, 30))
	// 			.set("Error", skyDate(2_023, 4, 13)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.LeapingDancer,
	// 	season: Season.Gratitude,
	// 	expression: Expression.Leap,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 107, hearts: 13, ascendedCandles: 2 },
	// 	keywords: ["fox", "fox mask"],
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(12, skyDate(2_020, 6, 25))
	// 			.set(31, skyDate(2_021, 3, 18)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SalutingProtector,
	// 	season: Season.Gratitude,
	// 	expression: Expression.Dismiss,
	// 	realm: Realm.GoldenWasteland,
	// 	offer: { candles: 145, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set("Error", skyDate(2_020, 5, 28))
	// 			.set(53, skyDate(2_022, 1, 20)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.GreetingShaman,
	// 	season: Season.Gratitude,
	// 	expression: Expression.Greeting,
	// 	realm: Realm.VaultOfKnowledge,
	// 	offer: { candles: 112, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(14, skyDate(2_020, 7, 23))
	// 			.set(62, skyDate(2_022, 5, 26)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.PiggybackLightseeker,
	// 	season: Season.Lightseekers,
	// 	expression: Expression.Carry,
	// 	realm: Realm.IslesOfDawn,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 123, hearts: 8, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(7, skyDate(2_020, 4, 16))
	// 			.set(30, skyDate(2_021, 3, 4))
	// 			.set(80, skyDate(2_023, 2, 2)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.DoublefiveLightCatcher,
	// 	season: Season.Lightseekers,
	// 	expression: Expression.DoubleFive,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 126, hearts: 7, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(2, skyDate(2_020, 2, 14))
	// 			.set(33, skyDate(2_021, 4, 15))
	// 			.set(66, skyDate(2_022, 7, 21)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.LaidbackPioneer,
	// 	season: Season.Lightseekers,
	// 	stance: Stance.Laidback,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 151, hearts: 0, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(3, skyDate(2_020, 2, 27))
	// 			.set(23, skyDate(2_020, 11, 26))
	// 			.set(72, skyDate(2_022, 10, 13)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// 	hasMarketingVideo: true,
	// 	keywords: ["umbrella"],
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.TwirlingChampion,
	// 	season: Season.Lightseekers,
	// 	expression: Expression.TripleAxel,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 131, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(18, skyDate(2_020, 9, 17))
	// 			.set(52, skyDate(2_022, 1, 6)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.CrabWhisperer,
	// 	season: Season.Lightseekers,
	// 	call: Call.Crab,
	// 	realm: Realm.GoldenWasteland,
	// 	offer: { candles: 190, hearts: 0, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(6, skyDate(2_020, 4, 9))
	// 			.set(43, skyDate(2_021, 9, 1)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ShushingLightScholar,
	// 	season: Season.Lightseekers,
	// 	expression: Expression.Shush,
	// 	realm: Realm.VaultOfKnowledge,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 108, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(16, skyDate(2_020, 8, 20))
	// 			.set(70, skyDate(2_022, 9, 15)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.BoogieKid,
	// 	season: Season.Belonging,
	// 	expression: Expression.Boogie,
	// 	realm: Realm.IslesOfDawn,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 103, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(22, skyDate(2_020, 11, 12))
	// 			.set(40, skyDate(2_021, 7, 22))
	// 			.set(82, skyDate(2_023, 3, 2)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ConfettiCousin,
	// 	season: Season.Belonging,
	// 	expression: Expression.Confetti,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 115, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(13, skyDate(2_020, 7, 9))
	// 			.set(27, skyDate(2_021, 1, 21)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.HairtousleTeen,
	// 	season: Season.Belonging,
	// 	expression: Expression.HairTousle,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 148, hearts: 9, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(11, skyDate(2_020, 6, 11))
	// 			.set(63, skyDate(2_022, 6, 9)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SparklerParent,
	// 	season: Season.Belonging,
	// 	expression: Expression.Sparkler,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 116, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(9, skyDate(2_020, 5, 14))
	// 			.set(32, skyDate(2_021, 4, 1))
	// 			.set(51, skyDate(2_021, 12, 23)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.PleafulParent,
	// 	season: Season.Belonging,
	// 	expression: Expression.DontGo,
	// 	realm: Realm.GoldenWasteland,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 195, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(5, skyDate(2_020, 3, 26))
	// 			.set(24, skyDate(2_020, 12, 10))
	// 			.set(77, skyDate(2_022, 12, 22)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.WiseGrandparent,
	// 	season: Season.Belonging,
	// 	stance: Stance.Wise,
	// 	realm: Realm.VaultOfKnowledge,
	// 	offer: { candles: 156, hearts: 0, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(15, skyDate(2_020, 8, 6))
	// 			.set(48, skyDate(2_021, 11, 11)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.NoddingMuralist,
	// 	season: Season.Enchantment,
	// 	expression: Expression.Nod,
	// 	realm: Realm.GoldenWasteland,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 77, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(26, skyDate(2_021, 1, 7))
	// 			.set(73, skyDate(2_022, 10, 27)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.IndifferentAlchemist,
	// 	season: Season.Enchantment,
	// 	expression: Expression.Shrug,
	// 	realm: Realm.GoldenWasteland,
	// 	offer: { candles: 167, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(21, skyDate(2_020, 10, 29))
	// 			.set(69, skyDate(2_022, 9, 1)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.CrabWalker,
	// 	season: Season.Enchantment,
	// 	expression: Expression.CrabWalk,
	// 	realm: Realm.GoldenWasteland,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 115, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set("Error", skyDate(2_021, 2, 4))
	// 			.set(29, skyDate(2_021, 2, 18))
	// 			.set(83, skyDate(2_023, 3, 16)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ScarecrowFarmer,
	// 	season: Season.Enchantment,
	// 	expression: Expression.Scare,
	// 	realm: Realm.GoldenWasteland,
	// 	offer: { candles: 89, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(58, skyDate(2_022, 3, 31)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SnoozingCarpenter,
	// 	season: Season.Enchantment,
	// 	expression: Expression.Doze,
	// 	realm: Realm.GoldenWasteland,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 112, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(36, skyDate(2_021, 5, 27))
	// 			.set(86, skyDate(2_023, 4, 27)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.PlayfightingHerbalist,
	// 	season: Season.Enchantment,
	// 	expression: Expression.PlayFight,
	// 	realm: Realm.GoldenWasteland,
	// 	offer: { candles: 195, hearts: 10, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(47, skyDate(2_021, 10, 28)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.JellyWhisperer,
	// 	season: Season.Sanctuary,
	// 	call: Call.Jellyfish,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 135, hearts: 15, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(49, skyDate(2_021, 11, 25)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.TimidBookworm,
	// 	season: Season.Sanctuary,
	// 	stance: Stance.Timid,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 140, hearts: 0, ascendedCandles: 2 },
	// 	keywords: ["butterfly", "butterfly cape"],
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(37, skyDate(2_021, 6, 10))
	// 			.set(65, skyDate(2_022, 7, 7)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.RallyingThrillseeker,
	// 	season: Season.Sanctuary,
	// 	expression: Expression.Rally,
	// 	realm: Realm.DaylightPrairie,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 125, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(34, skyDate(2_021, 4, 29))
	// 			.set(79, skyDate(2_023, 1, 19)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.HikingGrouch,
	// 	season: Season.Sanctuary,
	// 	expression: Expression.Grouchy,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 139, hearts: 29, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(55, skyDate(2_022, 2, 17)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.GratefulShellCollector,
	// 	season: Season.Sanctuary,
	// 	expression: Expression.Grateful,
	// 	realm: Realm.DaylightPrairie,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 162, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(45, skyDate(2_021, 9, 30))
	// 			.set(88, skyDate(2_023, 5, 25)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ChillSunbather,
	// 	season: Season.Sanctuary,
	// 	expression: Expression.BellyScratch,
	// 	realm: Realm.DaylightPrairie,
	// 	offer: { candles: 197, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(42, skyDate(2_021, 8, 19)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ProphetOfWater,
	// 	season: Season.Prophecy,
	// 	expression: Expression.DeepBreath,
	// 	realm: Realm.IslesOfDawn,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 201, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set(41, skyDate(2_021, 8, 5))
	// 			.set(74, skyDate(2_022, 11, 10)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(2, skyDate(2_023, 5, 15)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ProphetOfEarth,
	// 	season: Season.Prophecy,
	// 	expression: Expression.DustOff,
	// 	realm: Realm.IslesOfDawn,
	// 	offer: { candles: 211, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
	// 			.set("Error", skyDate(2_022, 1, 6))
	// 			.set(54, skyDate(2_022, 2, 3)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(2, skyDate(2_023, 5, 15)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ProphetOfAir,
	// 	season: Season.Prophecy,
	// 	expression: Expression.Balance,
	// 	realm: Realm.IslesOfDawn,
	// 	offer: { candles: 201, hearts: 12, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(61, skyDate(2_022, 5, 12)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(2, skyDate(2_023, 5, 15)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ProphetOfFire,
	// 	season: Season.Prophecy,
	// 	expression: Expression.ChestPound,
	// 	realm: Realm.IslesOfDawn,
	// 	offer: { candles: 202, hearts: 26, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(50, skyDate(2_021, 12, 9)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SpinningMentor,
	// 	season: Season.Dreams,
	// 	expression: Expression.SpinTrick,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 169, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(59, skyDate(2_022, 4, 14)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.DancingPerformer,
	// 	season: Season.Dreams,
	// 	expression: Expression.ShowDance,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.PeekingPostman,
	// 	season: Season.Dreams,
	// 	expression: Expression.Peek,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 217, hearts: 13, ascendedCandles: 2 },
	// 	keywords: ["rabbit", "rabbit mask"],
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(64, skyDate(2_022, 6, 23)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.BearhugHermit,
	// 	season: Season.Dreams,
	// 	expression: Expression.Bearhug,
	// 	realm: Realm.ValleyOfTriumph,
	// 	offer: { candles: 190, hearts: 8, ascendedCandles: 2 },
	// 	hasMarketingVideo: true,
	// 	keywords: ["yeti"],
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(75, skyDate(2_022, 11, 24)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.BaffledBotanist,
	// 	season: Season.Assembly,
	// 	expression: Expression.Facepalm,
	// 	realm: Realm.HiddenForest,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 127, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(78, skyDate(2_023, 1, 5)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(1, skyDate(2_023, 3, 6)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ScoldingStudent,
	// 	season: Season.Assembly,
	// 	expression: Expression.Scold,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 157, hearts: 13, ascendedCandles: 2 },
	// 	keywords: ["clover", "clover cape"],
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(68, skyDate(2_022, 8, 18)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ScaredyCadet,
	// 	season: Season.Assembly,
	// 	expression: Expression.Eww,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 152, hearts: 13, ascendedCandles: 2 },
	// 	keywords: ["hammock"],
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(1, skyDate(2_023, 3, 6)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.MarchingAdventurer,
	// 	season: Season.Assembly,
	// 	expression: Expression.March,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 143, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(1, skyDate(2_023, 3, 6)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ChucklingScout,
	// 	season: Season.Assembly,
	// 	expression: Expression.Chuckle,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 159, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(1, skyDate(2_023, 3, 6)),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.DaydreamForester,
	// 	season: Season.Assembly,
	// 	expression: Expression.Bubbles,
	// 	realm: Realm.HiddenForest,
	// 	offer: { candles: 112, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(60, skyDate(2_022, 4, 28)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.BeckoningRuler,
	// 	season: Season.LittlePrince,
	// 	expression: Expression.Beckon,
	// 	realm: Realm.VaultOfKnowledge,
	// 	keywords: ["frog", "frog mask"],
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 103, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(71, skyDate(2_022, 9, 29)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.GloatingNarcissist,
	// 	season: Season.LittlePrince,
	// 	expression: Expression.Gloat,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.StretchingLamplighter,
	// 	season: Season.LittlePrince,
	// 	expression: Expression.Stretch,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SlouchingSoldier,
	// 	season: Season.LittlePrince,
	// 	expression: Expression.Slouch,
	// 	realm: Realm.VaultOfKnowledge,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 140, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(81, skyDate(2_023, 2, 16)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SneezingGeographer,
	// 	season: Season.LittlePrince,
	// 	expression: Expression.Sneeze,
	// 	realm: Realm.VaultOfKnowledge,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 123, hearts: 13, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(85, skyDate(2_023, 4, 13)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.StarCollector,
	// 	season: Season.LittlePrince,
	// 	expression: Expression.HandRub,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.LivelyNavigator,
	// 	season: Season.Flight,
	// 	expression: Expression.Navigate,
	// 	realm: Realm.HiddenForest,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.LightWhisperer,
	// 	season: Season.Flight,
	// 	call: Call.BabyManta,
	// 	realm: Realm.HiddenForest,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.TinkeringChimesmith,
	// 	season: Season.Flight,
	// 	stance: Stance.Tinker,
	// 	realm: Realm.HiddenForest,
	// 	hasMarketingVideo: true,
	// 	offer: { candles: 238, hearts: 0, ascendedCandles: 2 },
	// 	visits: {
	// 		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(87, skyDate(2_023, 5, 11)),
	// 		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	// 	},
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.TalentedBuilder,
	// 	season: Season.Flight,
	// 	expression: Expression.Voilà,
	// 	realm: Realm.HiddenForest,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.AnxiousAngler,
	// 	season: Season.Abyss,
	// 	expression: Expression.Anxious,
	// 	realm: Realm.GoldenWasteland,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.CeasingCommodore,
	// 	season: Season.Abyss,
	// 	expression: Expression.CalmDown,
	// 	realm: Realm.GoldenWasteland,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.BumblingBoatswain,
	// 	season: Season.Abyss,
	// 	expression: Expression.Ouch,
	// 	realm: Realm.GoldenWasteland,
	// 	hasMarketingVideo: true,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.CacklingCannoneer,
	// 	season: Season.Abyss,
	// 	expression: Expression.EvilLaugh,
	// 	realm: Realm.GoldenWasteland,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.FranticStagehand,
	// 	season: Season.Performance,
	// 	expression: Expression.Handshake,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ForgetfulStoryteller,
	// 	season: Season.Performance,
	// 	expression: Expression.Awww,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.MellowMusician,
	// 	season: Season.Performance,
	// 	expression: Expression.Headbob,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.ModestDancer,
	// 	season: Season.Performance,
	// 	expression: Expression.DuetDance,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// // Season of Shattering - not sure how to add this.
	// new SeasonalSpirit({
	// 	name: SpiritName.RunningWayfarer,
	// 	season: Season.Aurora,
	// 	expression: Expression.WavingLight,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.MindfulMiner,
	// 	season: Season.Aurora,
	// 	expression: Expression.RaiseTheRoof,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.WarriorOfLove,
	// 	season: Season.Aurora,
	// 	expression: Expression.Twirl,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.SeedOfHope,
	// 	season: Season.Aurora,
	// 	expression: Expression.RhythmicClap,
	// 	realm: Realm.ValleyOfTriumph,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.BereftVeteran,
	// 	season: Season.Remembrance,
	// 	expression: Expression.Grieving,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.PleadingChild,
	// 	season: Season.Remembrance,
	// 	expression: Expression.Pleading,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.TiptoeingTeaBrewer,
	// 	season: Season.Remembrance,
	// 	expression: Expression.Tiptoeing,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.WoundedWarrior,
	// 	season: Season.Remembrance,
	// 	stance: Stance.Injured,
	// 	realm: Realm.VaultOfKnowledge,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.OddballOutcast,
	// 	season: Season.Passage,
	// 	expression: Expression.HackySack,
	// 	realm: Realm.IslesOfDawn,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.TumblingTroublemaker,
	// 	season: Season.Passage,
	// 	expression: Expression.Somersault,
	// 	realm: Realm.IslesOfDawn,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.MelancholyMope,
	// 	season: Season.Passage,
	// 	expression: Expression.Moping,
	// 	realm: Realm.IslesOfDawn,
	// }),
	// new SeasonalSpirit({
	// 	name: SpiritName.OveractiveOverachiever,
	// 	season: Season.Passage,
	// 	expression: Expression.PullUp,
	// 	realm: Realm.IslesOfDawn,
	// }),
] as const;
