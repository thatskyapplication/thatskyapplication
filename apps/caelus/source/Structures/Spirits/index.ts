import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";

export default [
	...Elder,
	...Seasonal,
	/*
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
