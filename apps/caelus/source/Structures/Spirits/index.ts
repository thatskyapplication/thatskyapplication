import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";

export default [
	...Elder,
	...Seasonal,
	/*
	new SeasonalSpirit({
		name: SpiritName.LivelyNavigator,
		season: Season.Flight,
		expression: Expression.Navigate,
		realm: Realm.HiddenForest,
	}),
	new SeasonalSpirit({
		name: SpiritName.LightWhisperer,
		season: Season.Flight,
		call: Call.BabyManta,
		realm: Realm.HiddenForest,
	}),
	new SeasonalSpirit({
		name: SpiritName.TinkeringChimesmith,
		season: Season.Flight,
		stance: Stance.Tinker,
		realm: Realm.HiddenForest,
		hasMarketingVideo: true,
		offer: { candles: 238, hearts: 0, ascendedCandles: 2 },
		visits: {
			travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(87, skyDate(2_023, 5, 11)),
			returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
		},
	}),
	new SeasonalSpirit({
		name: SpiritName.TalentedBuilder,
		season: Season.Flight,
		expression: Expression.Voilà,
		realm: Realm.HiddenForest,
	}),
	new SeasonalSpirit({
		name: SpiritName.AnxiousAngler,
		season: Season.Abyss,
		expression: Expression.Anxious,
		realm: Realm.GoldenWasteland,
	}),
	new SeasonalSpirit({
		name: SpiritName.CeasingCommodore,
		season: Season.Abyss,
		expression: Expression.CalmDown,
		realm: Realm.GoldenWasteland,
	}),
	new SeasonalSpirit({
		name: SpiritName.BumblingBoatswain,
		season: Season.Abyss,
		expression: Expression.Ouch,
		realm: Realm.GoldenWasteland,
		hasMarketingVideo: true,
	}),
	new SeasonalSpirit({
		name: SpiritName.CacklingCannoneer,
		season: Season.Abyss,
		expression: Expression.EvilLaugh,
		realm: Realm.GoldenWasteland,
	}),
	new SeasonalSpirit({
		name: SpiritName.FranticStagehand,
		season: Season.Performance,
		expression: Expression.Handshake,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.ForgetfulStoryteller,
		season: Season.Performance,
		expression: Expression.Awww,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.MellowMusician,
		season: Season.Performance,
		expression: Expression.Headbob,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.ModestDancer,
		season: Season.Performance,
		expression: Expression.DuetDance,
		realm: Realm.ValleyOfTriumph,
	}),
	// Season of Shattering - not sure how to add this.
	new SeasonalSpirit({
		name: SpiritName.RunningWayfarer,
		season: Season.Aurora,
		expression: Expression.WavingLight,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.MindfulMiner,
		season: Season.Aurora,
		expression: Expression.RaiseTheRoof,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.WarriorOfLove,
		season: Season.Aurora,
		expression: Expression.Twirl,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.SeedOfHope,
		season: Season.Aurora,
		expression: Expression.RhythmicClap,
		realm: Realm.ValleyOfTriumph,
	}),
	new SeasonalSpirit({
		name: SpiritName.BereftVeteran,
		season: Season.Remembrance,
		expression: Expression.Grieving,
		realm: Realm.VaultOfKnowledge,
	}),
	new SeasonalSpirit({
		name: SpiritName.PleadingChild,
		season: Season.Remembrance,
		expression: Expression.Pleading,
		realm: Realm.VaultOfKnowledge,
	}),
	new SeasonalSpirit({
		name: SpiritName.TiptoeingTeaBrewer,
		season: Season.Remembrance,
		expression: Expression.Tiptoeing,
		realm: Realm.VaultOfKnowledge,
	}),
	new SeasonalSpirit({
		name: SpiritName.WoundedWarrior,
		season: Season.Remembrance,
		stance: Stance.Injured,
		realm: Realm.VaultOfKnowledge,
	}),
	new SeasonalSpirit({
		name: SpiritName.OddballOutcast,
		season: Season.Passage,
		expression: Expression.HackySack,
		realm: Realm.IslesOfDawn,
	}),
	new SeasonalSpirit({
		name: SpiritName.TumblingTroublemaker,
		season: Season.Passage,
		expression: Expression.Somersault,
		realm: Realm.IslesOfDawn,
	}),
	new SeasonalSpirit({
		name: SpiritName.MelancholyMope,
		season: Season.Passage,
		expression: Expression.Moping,
		realm: Realm.IslesOfDawn,
	}),
	new SeasonalSpirit({
		name: SpiritName.OveractiveOverachiever,
		season: Season.Passage,
		expression: Expression.PullUp,
		realm: Realm.IslesOfDawn,
	}),
	*/
] as const;
