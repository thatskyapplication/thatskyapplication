import type { Snowflake } from "@discordjs/core";
import { client } from "../discord.js";
import { PRODUCTION } from "./constants.js";

interface EmojiData {
	id: Snowflake;
	animated?: boolean;
}

/**
 * Emojis from the miscellaneous server.
 */
export const MISCELLANEOUS_EMOJIS = PRODUCTION
	? ({
			AscendedCandle: { id: "1313930716576485447" },
			WingedLight: { id: "1313930689380487330" },
			Yes: { id: "1313930693662871612", animated: true },
			No: { id: "1313930687711023104", animated: true },
			PlatformIOS: { id: "1313930697593061567" },
			PlatformAndroid: { id: "1313930711560093727" },
			PlatformMac: { id: "1313930686276567111" },
			PlatformSwitch: { id: "1313930699195158558" },
			PlatformPlayStation: { id: "1313930695462354984" },
			SeasonalCandle: { id: "1313930691074854924" },
			SeasonalHeart: { id: "1313930704198963282" },
			Candle: { id: "1313930712977637437" },
			Heart: { id: "1313930706480791582" },
			PlatformSteam: { id: "1313930700025761793" },
			Light: { id: "1313930707487428648" },
			ShardRegular: { id: "1313930704748412980" },
			ShardStrong: { id: "1313930714324009151" },
			Blessing1: { id: "1313930703108313208" },
			Blessing2: { id: "1313930720430919730" },
			Blessing3: { id: "1313930718019194981" },
			SpellColourTrail: { id: "1313930724721557605" },
			SpellSharedMemory: { id: "1313930723169669200" },
			SpellSharedSpace: { id: "1313930708724613192" },
			WingBuff: { id: "1313930710230241383" },
			Quest: { id: "1313930701623656551" },
			MusicSheet: { id: "1313930722012168282" },
			EventCurrency: { id: "1313930718723969105" },
			ConstellationFlag: { id: "1313930715473117305" },
			CreatorTroupe: { id: "1314781360409546825" },
			YouTube: { id: "1314804438724120647" },
			Twitch: { id: "1314807290934722580" },
			TikTok: { id: "1314809519934799923" },
			X: { id: "1314810631689601064" },
			Instagram: { id: "1314811293214965760" },
			Facebook: { id: "1314812062681268294" },
			Bluesky: { id: "1314813140210286632" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			AscendedCandle: { id: "1313864872198541445" },
			WingedLight: { id: "1313864860114620427" },
			Yes: { id: "1313864879542767737", animated: true },
			No: { id: "1313864865676398703", animated: true },
			PlatformIOS: { id: "1313864864279695392" },
			PlatformAndroid: { id: "1313864863444893698" },
			PlatformMac: { id: "1313864861972828170" },
			PlatformSwitch: { id: "1313864870877335572" },
			PlatformPlayStation: { id: "1313864868356423710" },
			SeasonalCandle: { id: "1313864881010901052" },
			SeasonalHeart: { id: "1313864876703223879" },
			Candle: { id: "1313864867241005180" },
			Heart: { id: "1313864886392193085" },
			PlatformSteam: { id: "1313864894033952819" },
			Light: { id: "1313864887637770281" },
			ShardRegular: { id: "1313864875176497225" },
			ShardStrong: { id: "1313864890221592576" },
			Blessing1: { id: "1313864895426596926" },
			Blessing2: { id: "1313864873582661703" },
			Blessing3: { id: "1313864868994089011" },
			SpellColourTrail: { id: "1313864892943564851" },
			SpellSharedMemory: { id: "1313864878309638244" },
			SpellSharedSpace: { id: "1313864882738823328" },
			WingBuff: { id: "1313864885460926544" },
			Quest: { id: "1313864888686215261" },
			MusicSheet: { id: "1313864897657831510" },
			EventCurrency: { id: "1313864891311980584" },
			ConstellationFlag: { id: "1313864899235151883" },
			CreatorTroupe: { id: "1314781247842549790" },
			YouTube: { id: "1314803833397973032" },
			Twitch: { id: "1314807448854335548" },
			TikTok: { id: "1314809650750951465" },
			X: { id: "1314810363983695892" },
			Instagram: { id: "1314811456763596811" },
			Facebook: { id: "1314811939821715527" },
			Bluesky: { id: "1314813267444633610" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type MiscellaneousEmojis = (typeof MISCELLANEOUS_EMOJIS)[keyof typeof MISCELLANEOUS_EMOJIS];

/**
 * Emojis from the emotes servers.
 */
export const EMOTE_EMOJIS = PRODUCTION
	? ({
			Sit: { id: "1313931603797479424" },
			Point: { id: "1313931584512065586" },
			Come: { id: "1313931561678143599" },
			NoThanks: { id: "1313931563162927136" },
			Welcome: { id: "1313931605617672284" },
			Nod: { id: "1313931565658800240" },
			Scold: { id: "1313931626174087179" },
			Butterfly: { id: "1313931572784791592" },
			Clap: { id: "1313931560210403338" },
			Wave: { id: "1313931570305830994" },
			Laugh: { id: "1313931567336394813" },
			Yawn: { id: "1313931564647714836" },
			WipeBrow: { id: "1313931577377427477" },
			Teamwork: { id: "1313931624785641493" },
			BlowKiss: { id: "1313931558733742120" },
			Grateful: { id: "1313931608151167107" },
			BellyScratch: { id: "1313931583316824115" },
			Chuckle: { id: "1313931568720642100" },
			Shiver: { id: "1313931614128046181" },
			HideAndSeek: { id: "1313931581152428083" },
			Angry: { id: "1313931592070070352" },
			Shy: { id: "1313931596805705788" },
			Shocked: { id: "1313931576140103721" },
			Apologise: { id: "1313931579193557032" },
			Crying: { id: "1313931580263104542" },
			Kabuki: { id: "1313931593915826176" },
			Shrug: { id: "1313931590665240586" },
			Grumpy: { id: "1313931574521102346" },
			Peek: { id: "1313931597992427541" },
			Eww: { id: "1313931610835390504" },
			Facepalm: { id: "1313931589251502191" },
			Handstand: { id: "1313931619865722910" },
			Backflip: { id: "1313931595333505197" },
			Bow: { id: "1313931609732419654" },
			Cheer: { id: "1313931587938947172" },
			Leap: { id: "1313931600915992596" },
			TripleAxel: { id: "1313931617378635797" },
			Confetti: { id: "1313931585464041473" },
			BoogieDance: { id: "1313931618481733664" },
			SpinDance: { id: "1313931571274711140" },
			Juggle: { id: "1313931586454163517" },
			CrabWalk: { id: "1313931602262491158" },
			RallyCheer: { id: "1313931628241752226" },
			SpinTrick: { id: "1313931606573977673" },
			ShowDance: { id: "1313931615876939926" },
			Duck: { id: "1313931622017663016" },
			Faint: { id: "1313931612395933746" },
			Respect: { id: "1313931627256217621" },
			LookAround: { id: "1313931599267631185" },
			Salute: { id: "1313931623720423514" },
			Acknowledge: { id: "1313931793853845524" },
			KungFu: { id: "1313931758638727289" },
			DontGo: { id: "1313931797062488116" },
			Boo: { id: "1313931766700052490" },
			DustOff: { id: "1313931782395265084" },
			ChestPound: { id: "1313931735779512414" },
			Marching: { id: "1313931802502762559" },
			Telekinesis: { id: "1313931737323147345" },
			Float: { id: "1313931761993908245" },
			Pray: { id: "1313931740276064290" },
			Yoga: { id: "1313931738338295901" },
			Shush: { id: "1313931765038977044" },
			Sparkler: { id: "1313931754964389971" },
			Thinking: { id: "1313931785377284147" },
			Doze: { id: "1313931786316808223" },
			Balance: { id: "1313931734550712352" },
			DeepBreath: { id: "1313931768155607081" },
			Bubbles: { id: "1313931746005221396" },
			Beckon: { id: "1313931805669462056" },
			Gloat: { id: "1313931779958116424" },
			Stretch: { id: "1313931757204148264" },
			Slouch: { id: "1313931795355537619" },
			Sneeze: { id: "1313931775248171030" },
			HandRub: { id: "1313931744671437020" },
			Voilà: { id: "1313931773767450675" },
			Navigate: { id: "1313931770944688289" },
			CalmDown: { id: "1313931760148414543" },
			EvilLaugh: { id: "1313931751122403338" },
			Ouch: { id: "1313931769312972810" },
			Anxious: { id: "1313931783418417268" },
			Headbob: { id: "1313931778825650176" },
			Aww: { id: "1313931791966666814" },
			WavingLight: { id: "1313931799856152716" },
			RaiseTheRoof: { id: "1313931772349776053" },
			Twirl: { id: "1313931752175046708" },
			RhythmicClap: { id: "1313931790662242354" },
			Conduct: { id: "1313931777437335652" },
			SilentClap: { id: "1313931797930836080" },
			Skipping: { id: "1313931741475635220" },
			Pleading: { id: "1313931753756299304" },
			Tiptoeing: { id: "1313931742461296702" },
			Grieving: { id: "1313931763495473233" },
			HackySack: { id: "1313931787449143460" },
			Somersault: { id: "1313931806940205201" },
			Moping: { id: "1313931789290700840" },
			PullUp: { id: "1313931801022173234" },
			JollyDance: { id: "1313931780998303855" },
			BlindfoldBalancePose: { id: "1313931749298016418" },
			CureForMeDance: { id: "1313931747385409618" },
			Whistle: { id: "1313931803597475943" },
			Flex: { id: "1313931946170253343" },
			FloatSpin: { id: "1313931947612962887" },
			Read: { id: "1313931944420966410" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Sit: { id: "1313865085504192573" },
			Point: { id: "1313865090176651365" },
			Come: { id: "1313865082765312051" },
			NoThanks: { id: "1313865143519678506" },
			Welcome: { id: "1313865115128430663" },
			Nod: { id: "1313865081339121806" },
			Scold: { id: "1313865088666701825" },
			Butterfly: { id: "1313865107583012925" },
			Clap: { id: "1313865077077835837" },
			Wave: { id: "1313865079711858752" },
			Laugh: { id: "1313865078705098784" },
			Yawn: { id: "1313865122288242718" },
			WipeBrow: { id: "1313865136045293589" },
			Teamwork: { id: "1313865110099595287" },
			BlowKiss: { id: "1313865123206533202" },
			Grateful: { id: "1313865097126482031" },
			BellyScratch: { id: "1313865092638445689" },
			Chuckle: { id: "1313865091577417758" },
			Shiver: { id: "1313865133247696977" },
			HideAndSeek: { id: "1313865117221257217" },
			Angry: { id: "1313865148418756618" },
			Shy: { id: "1313865095218200656" },
			Shocked: { id: "1313865084111421461" },
			Apologise: { id: "1313865112649728151" },
			Crying: { id: "1313865093347541036" },
			Kabuki: { id: "1313865100230262929" },
			Shrug: { id: "1313865113568018534" },
			Grumpy: { id: "1313865097856290848" },
			Peek: { id: "1313865147022049361" },
			Eww: { id: "1313865096119713862" },
			Facepalm: { id: "1313865118672617503" },
			Handstand: { id: "1313865126075699300" },
			Backflip: { id: "1313865137462972486" },
			Bow: { id: "1313865131909714011" },
			Cheer: { id: "1313865130584571975" },
			Leap: { id: "1313865116474937467" },
			TripleAxel: { id: "1313865124175679509" },
			Confetti: { id: "1313865139606523975" },
			BoogieDance: { id: "1313865127082070040" },
			SpinDance: { id: "1313865129854504980" },
			Juggle: { id: "1313865141002965053" },
			CrabWalk: { id: "1313865128654934048" },
			RallyCheer: { id: "1313865120681820181" },
			SpinTrick: { id: "1313865134715834511" },
			ShowDance: { id: "1313865138297901119" },
			Duck: { id: "1313865109273313351" },
			Faint: { id: "1313865145734271058" },
			Respect: { id: "1313865111361814529" },
			LookAround: { id: "1313865142269771817" },
			Salute: { id: "1313865119968792596" },
			Acknowledge: { id: "1313865249908199437" },
			KungFu: { id: "1313865264537800716" },
			DontGo: { id: "1313865239695065250" },
			Boo: { id: "1313865245554638849" },
			DustOff: { id: "1313865244531101717" },
			ChestPound: { id: "1313865277099868191" },
			Marching: { id: "1313865237124087871" },
			Telekinesis: { id: "1313865259861282897" },
			Float: { id: "1313865297308155924" },
			Pray: { id: "1313865246795894865" },
			Yoga: { id: "1313865238164013076" },
			Shush: { id: "1313865234313773106" },
			Sparkler: { id: "1313865241842679840" },
			Thinking: { id: "1313865243226669096" },
			Doze: { id: "1313865235693830225" },
			Balance: { id: "1313865263963177010" },
			DeepBreath: { id: "1313865287074058310" },
			Bubbles: { id: "1313865298863980554" },
			Beckon: { id: "1313865284087709736" },
			Gloat: { id: "1313865256421953587" },
			Stretch: { id: "1313865248515817492" },
			Slouch: { id: "1313865240504434721" },
			Sneeze: { id: "1313865267167887360" },
			HandRub: { id: "1313865262893760576" },
			Voilà: { id: "1313865270322008165" },
			Navigate: { id: "1313865293931483236" },
			CalmDown: { id: "1313865283059974244" },
			EvilLaugh: { id: "1313865285219913768" },
			Ouch: { id: "1313865280551649333" },
			Anxious: { id: "1313865255415447562" },
			Headbob: { id: "1313865300218740846" },
			Aww: { id: "1313865252307341374" },
			WavingLight: { id: "1313865253729075200" },
			RaiseTheRoof: { id: "1313865275803697182" },
			Twirl: { id: "1313865268564328549" },
			RhythmicClap: { id: "1313865258200203345" },
			Conduct: { id: "1313865266085761084" },
			SilentClap: { id: "1313865282103676981" },
			Skipping: { id: "1313865279708725278" },
			Pleading: { id: "1313865251308961802" },
			Tiptoeing: { id: "1313865273085919295" },
			Grieving: { id: "1313865295898742855" },
			HackySack: { id: "1313865261480415262" },
			Somersault: { id: "1313865288990720000" },
			Moping: { id: "1313865292383916072" },
			PullUp: { id: "1313865273928978534" },
			JollyDance: { id: "1313865289993158717" },
			BlindfoldBalancePose: { id: "1313865294929723412" },
			CureForMeDance: { id: "1313865271722770433" },
			Whistle: { id: "1313865278303637547" },
			Flex: { id: "1313865496944312380" },
			FloatSpin: { id: "1313865497980436510" },
			Read: { id: "1313865495480504453" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type EmotesEmojis = (typeof EMOTE_EMOJIS)[keyof typeof EMOTE_EMOJIS];

/**
 * Emojis from the stances server.
 */
export const STANCE_EMOJIS = PRODUCTION
	? ({
			Base: { id: "1313932311712108544" },
			Courageous: { id: "1313932313356275793" },
			Confident: { id: "1313932318909534239" },
			Sneaky: { id: "1313932317475078167" },
			Proud: { id: "1313932322130755698" },
			Polite: { id: "1313932316086636606" },
			Sassy: { id: "1313932314832535704" },
			Laidback: { id: "1313932326446698516" },
			Wise: { id: "1313932320075677697" },
			Timid: { id: "1313932320822001685" },
			Tinker: { id: "1313932325347659918" },
			Injured: { id: "1313932323598762057" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Base: { id: "1313865789631102977" },
			Courageous: { id: "1313865785579671614" },
			Confident: { id: "1313865782425554977" },
			Sneaky: { id: "1313865779069976648" },
			Proud: { id: "1313865783994089502" },
			Polite: { id: "1313865792860721264" },
			Sassy: { id: "1313865787324502077" },
			Laidback: { id: "1313865786535968860" },
			Wise: { id: "1313865781200556032" },
			Timid: { id: "1313865791522738296" },
			Tinker: { id: "1313865788851097720" },
			Injured: { id: "1313865793670221995" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type StancesEmojis = (typeof STANCE_EMOJIS)[keyof typeof STANCE_EMOJIS];

/**
 * Emojis from the calls server.
 */
export const CALL_EMOJIS = PRODUCTION
	? ({
			Base: { id: "1313932583880622080" },
			Bird: { id: "1313932590448775198" },
			Whale: { id: "1313932587127017473" },
			Manta: { id: "1313932582424940584" },
			CosmicManta: { id: "1313932585419804843" },
			Crab: { id: "1313932593158291456" },
			Jellyfish: { id: "1313932581007392828" },
			BabyManta: { id: "1313932591950200952" },
			Nightbird: { id: "1313932588917854239" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Base: { id: "1313867161948917871" },
			Bird: { id: "1313867169045676094" },
			Whale: { id: "1313867164926873600" },
			Manta: { id: "1313867170140262573" },
			CosmicManta: { id: "1313867166621110323" },
			Crab: { id: "1313867163005751296" },
			Jellyfish: { id: "1313867163966374048" },
			BabyManta: { id: "1313867160228986891" },
			Nightbird: { id: "1313867168001298557" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type CallsEmojis = (typeof CALL_EMOJIS)[keyof typeof CALL_EMOJIS];

/**
 * Emojis from the friend actions server.
 */
export const FRIEND_ACTION_EMOJIS = PRODUCTION
	? ({
			HoldHand: { id: "1313932793620992040" },
			HighFive: { id: "1313932810905714748" },
			Hug: { id: "1313932795344719933" },
			FistBump: { id: "1313932812520521728" },
			DoubleFive: { id: "1313932796875509833" },
			HairTousle: { id: "1313932808263307304" },
			Carry: { id: "1313932800155582515" },
			PlayFight: { id: "1313932804396154950" },
			Bearhug: { id: "1313932798066692158" },
			Handshake: { id: "1313932806459621476" },
			DuetDance: { id: "1313932809630388324" },
			SideHug: { id: "1313932813950521446" },
			CradleCarry: { id: "1313932802646867978" },
			DuetBow: { id: "1313932801074004042" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			HoldHand: { id: "1313867568318251110" },
			HighFive: { id: "1313867556389650452" },
			Hug: { id: "1313867549510733824" },
			FistBump: { id: "1313867559103234089" },
			DoubleFive: { id: "1313867551096438834" },
			HairTousle: { id: "1313867561766490122" },
			Carry: { id: "1313867565080117329" },
			PlayFight: { id: "1313867553524682834" },
			Bearhug: { id: "1313867558058856468" },
			Handshake: { id: "1313867552346341377" },
			DuetDance: { id: "1313867555190083674" },
			SideHug: { id: "1313867563146416260" },
			CradleCarry: { id: "1313867570016944198" },
			DuetBow: { id: "1313867566653116467" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type FriendActionsEmojis = (typeof FRIEND_ACTION_EMOJIS)[keyof typeof FRIEND_ACTION_EMOJIS];

/**
 * Emojis from the seasons servers.
 */
export const SEASON_EMOJIS = PRODUCTION
	? ({
			Gratitude: { id: "1313932978874744904" },
			GratitudeCandle: { id: "1313933013586808832" },
			Lightseekers: { id: "1313933017181585490" },
			LightseekersCandle: { id: "1313932983845130240" },
			Belonging: { id: "1313932993597014066" },
			BelongingCandle: { id: "1313932982632972288" },
			BelongingHeart: { id: "1313932990640033913" },
			Rhythm: { id: "1313932988743942195" },
			RhythmCandle: { id: "1313933020755005511" },
			RhythmHeart: { id: "1313933049754423336" },
			Enchantment: { id: "1313933018271842424" },
			EnchantmentCandle: { id: "1313932998046912562" },
			EnchantmentHeart: { id: "1313933004611129445" },
			Sanctuary: { id: "1313932980686946315" },
			SanctuaryCandle: { id: "1313932992460357762" },
			SanctuaryHeart: { id: "1313932987418804329" },
			Prophecy: { id: "1313933000513163294" },
			ProphecyCandle: { id: "1313933015730094080" },
			ProphecyHeart: { id: "1313933003331993691" },
			Dreams: { id: "1313933057387921438" },
			DreamsCandle: { id: "1313933052291977226" },
			DreamsHeart: { id: "1313933029432889446" },
			Assembly: { id: "1313933039101022209" },
			AssemblyCandle: { id: "1313933022005039237" },
			AssemblyHeart: { id: "1313933053956984882" },
			LittlePrince: { id: "1313932994318303343" },
			LittlePrinceCandle: { id: "1313932996386226226" },
			LittlePrinceHeart: { id: "1313933014677590089" },
			Flight: { id: "1313933032633274439" },
			FlightCandle: { id: "1313932985388761149" },
			FlightHeart: { id: "1313933001675116645" },
			Abyss: { id: "1313933050853199923" },
			AbyssCandle: { id: "1313933055806804019" },
			AbyssHeart: { id: "1313933024915882045" },
			Performance: { id: "1313933034260795424" },
			PerformanceCandle: { id: "1313932999443615754" },
			PerformanceHeart: { id: "1313933030884249600" },
			Shattering: { id: "1313933040686465145" },
			ShatteringCandle: { id: "1313933046604496977" },
			ShatteringHeart: { id: "1313933048114446376" },
			Aurora: { id: "1313933045182496828" },
			AuroraCandle: { id: "1313933037385551965" },
			AuroraHeart: { id: "1313933043354042379" },
			Remembrance: { id: "1313933023326240789" },
			RemembranceCandle: { id: "1313933012227854346" },
			RemembranceHeart: { id: "1313933019844706304" },
			Passage: { id: "1313933026534883351" },
			PassageCandle: { id: "1313933035942445207" },
			PassageHeart: { id: "1313933041491644508" },
			Moments: { id: "1313933027608494235" },
			MomentsCandle: { id: "1313933180658778154" },
			MomentsHeart: { id: "1313933182378442812" },
			Revival: { id: "1313933185549336586" },
			RevivalCandle: { id: "1313933177978617866" },
			RevivalHeart: { id: "1313933179803009114" },
			NineColouredDeer: { id: "1313933184299171891" },
			NineColouredDeerCandle: { id: "1313933196630429706" },
			NineColouredDeerHeart: { id: "1313933188036431963" },
			Nesting: { id: "1313933192218153040" },
			NestingCandle: { id: "1313933193434632244" },
			NestingHeart: { id: "1313933186744451093" },
			Duets: { id: "1313933189068357737" },
			DuetsCandle: { id: "1313933195070279813" },
			DuetsHeart: { id: "1313933200246182040" },
			Moomin: { id: "1313933190699679753" },
			MoominCandle: { id: "1313933197456969731" },
			MoominHeart: { id: "1313933199667367936" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Gratitude: { id: "1313868667473367135" },
			GratitudeCandle: { id: "1313868669092237384" },
			Lightseekers: { id: "1313868678940332074" },
			LightseekersCandle: { id: "1313868704299352207" },
			Belonging: { id: "1313868697173098536" },
			BelongingCandle: { id: "1313868736289181756" },
			BelongingHeart: { id: "1313868674846687343" },
			Rhythm: { id: "1313868662767357953" },
			RhythmCandle: { id: "1313868738935914589" },
			RhythmHeart: { id: "1313868680450408448" },
			Enchantment: { id: "1313868676033675275" },
			EnchantmentCandle: { id: "1313868670476484680" },
			EnchantmentHeart: { id: "1313868713019310151" },
			Sanctuary: { id: "1313868684745244783" },
			SanctuaryCandle: { id: "1313868695293923330" },
			SanctuaryHeart: { id: "1313868707231043655" },
			Prophecy: { id: "1313868731616595998" },
			ProphecyCandle: { id: "1313868673751978015" },
			ProphecyHeart: { id: "1313868665862619230" },
			Dreams: { id: "1313868688096628837" },
			DreamsCandle: { id: "1313868700138606654" },
			DreamsHeart: { id: "1313868682744561678" },
			Assembly: { id: "1313868692274282618" },
			AssemblyCandle: { id: "1313868730031149096" },
			AssemblyHeart: { id: "1313868664373645322" },
			LittlePrince: { id: "1313868681578549260" },
			LittlePrinceCandle: { id: "1313868734535958639" },
			LittlePrinceHeart: { id: "1313868693989621772" },
			Flight: { id: "1313868677346492506" },
			FlightCandle: { id: "1313868709923651636" },
			FlightHeart: { id: "1313868671524802683" },
			Abyss: { id: "1313868737631354920" },
			AbyssCandle: { id: "1313868705846923367" },
			AbyssHeart: { id: "1313868689094742058" },
			Performance: { id: "1313868720824909956" },
			PerformanceCandle: { id: "1313868711387725886" },
			PerformanceHeart: { id: "1313868701904408617" },
			Shattering: { id: "1313868719583133716" },
			ShatteringCandle: { id: "1313868728231919680" },
			ShatteringHeart: { id: "1313868709189914787" },
			Aurora: { id: "1313868733315285022" },
			AuroraCandle: { id: "1313868716408045578" },
			AuroraHeart: { id: "1313868714830987404" },
			Remembrance: { id: "1313868703409897573" },
			RemembranceCandle: { id: "1313868727170633750" },
			RemembranceHeart: { id: "1313868725627261041" },
			Passage: { id: "1313868686712377424" },
			PassageCandle: { id: "1313868717612073063" },
			PassageHeart: { id: "1313868690973921501" },
			Moments: { id: "1313868698578325514" },
			MomentsCandle: { id: "1313868836113743893" },
			MomentsHeart: { id: "1313868834498940949" },
			Revival: { id: "1313868841943826506" },
			RevivalCandle: { id: "1313868837296275476" },
			RevivalHeart: { id: "1313868843554308157" },
			NineColouredDeer: { id: "1313868841251770408" },
			NineColouredDeerCandle: { id: "1313868847119335569" },
			NineColouredDeerHeart: { id: "1313868852416741457" },
			Nesting: { id: "1313868851083214899" },
			NestingCandle: { id: "1313868855969448040" },
			NestingHeart: { id: "1313868845856850044" },
			Duets: { id: "1313868840127692911" },
			DuetsCandle: { id: "1313868849900290108" },
			DuetsHeart: { id: "1313868854295789578" },
			Moomin: { id: "1313868845038960712" },
			MoominCandle: { id: "1313868838659555389" },
			MoominHeart: { id: "1313868848763764736" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type SeasonEmojis = (typeof SEASON_EMOJIS)[keyof typeof SEASON_EMOJIS];

/**
 * Emojis from the events server.
 */
export const EVENT_EMOJIS = PRODUCTION
	? ({
			Colour: { id: "1313933371847475321" },
			Music: { id: "1313933384296304680" },
			SkyAnniversary: { id: "1313933370115362827" },
			AURORAEncore: { id: "1313933374678761622" },
			Sunlight: { id: "1313933381733453986" },
			Style: { id: "1313933390529036431" },
			Mischief: { id: "1313933380701782116" },
			AviarysFireworkFestival: { id: "1313933387303751812" },
			Feast: { id: "1313933376423460906" },
			Fortune: { id: "1313933373433188493" },
			Love: { id: "1313933379397222460" },
			Bloom: { id: "1313933388721164288" },
			SkyXCinnamorollPopUpCafe: { id: "1313933377887277086" },
			Nature: { id: "1313933391837532171" },
			SkyFest: { id: "1313933383310770176" },
			TournamentOfTriumph: { id: "1313933385735082096" },
			Moonlight: { id: "1313933393368711248" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Colour: { id: "1313869118457385060" },
			Music: { id: "1313869115374440498" },
			SkyAnniversary: { id: "1313869122303430743" },
			AURORAEncore: { id: "1313869119656955997" },
			Sunlight: { id: "1313869117278916679" },
			Style: { id: "1313869109879898122" },
			Mischief: { id: "1313869125264736297" },
			AviarysFireworkFestival: { id: "1313869123712979086" },
			Feast: { id: "1313869104515649571" },
			Fortune: { id: "1313869112384032879" },
			Love: { id: "1313869114162413568" },
			Bloom: { id: "1313869101118132287" },
			SkyXCinnamorollPopUpCafe: { id: "1313869108520947805" },
			Nature: { id: "1313869120944734309" },
			SkyFest: { id: "1313869111054569512" },
			TournamentOfTriumph: { id: "1313869102766358528" },
			Moonlight: { id: "1313869106763530260" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type EventEmojis = (typeof EVENT_EMOJIS)[keyof typeof EVENT_EMOJIS];

/**
 * Emojis from the outfits servers.
 */
export const OUTFIT_EMOJIS = PRODUCTION
	? ({
			/**
			 * Base.
			 */
			Outfit01: { id: "1313933910828126280" },
			/**
			 * Pointing Candlemaker.
			 */
			Outfit02: { id: "1313933881912725524" },
			/**
			 * Ushering Stargazer.
			 */
			Outfit03: { id: "1313933903412723794" },
			/**
			 * Butterfly Charmer.
			 */
			Outfit04: { id: "1313933831728009247" },
			/**
			 * Shivering Trailblazer.
			 */
			Outfit05: { id: "1313933838581501952" },
			/**
			 * Hide'n'Seek Pioneer.
			 */
			Outfit06: { id: "1313933858747449396" },
			/**
			 * Confident Sightseer.
			 */
			Outfit07: { id: "1313933829148246016" },
			/**
			 * Polite Scholar.
			 */
			Outfit08: { id: "1313933917522231406" },
			/**
			 * Memory Whisperer.
			 */
			Outfit09: { id: "1313933906717835264" },
			/**
			 * Boogie Kid.
			 */
			Outfit10: { id: "1313933832994426881" },
			/**
			 * Troupe Greeter.
			 */
			Outfit11: { id: "1313933883284127797" },
			/**
			 * Troupe Juggler.
			 */
			Outfit12: { id: "1313933842972672023" },
			/**
			 * Festival Spin Dancer.
			 */
			Outfit13: { id: "1313933915831931032" },
			/**
			 * Admiring Actor.
			 */
			Outfit14: { id: "1313933827076259930" },
			/**
			 * Jellyfish Whisperer.
			 */
			Outfit15: { id: "1313933870697287772" },
			/**
			 * Rallying Thrillseeker.
			 */
			Outfit16: { id: "1313933850270765107" },
			/**
			 * Prophet of Fire.
			 */
			Outfit17: { id: "1313933869082349568" },
			/**
			 * Peeking Postman.
			 */
			Outfit18: { id: "1313933830503010354" },
			/**
			 * Bearhug Yeti.
			 */
			Outfit19: { id: "1313933860857450507" },
			/**
			 * Chuckling Scout.
			 */
			Outfit20: { id: "1313933886287249549" },
			/**
			 * Gloating Narcissist.
			 */
			Outfit21: { id: "1313933839676215416" },
			/**
			 * The Rose (non-ultimate).
			 */
			Outfit22: { id: "1313933888673812490" },
			/**
			 * The Rose (ultimate).
			 */
			Outfit23: { id: "1313933901340606464" },
			/**
			 * Flight Guide.
			 */
			Outfit24: { id: "1313933863537348699" },
			/**
			 * Talented Builder.
			 */
			Outfit25: { id: "1313933879169646633" },
			/**
			 * Tinkering Chimesmith.
			 */
			Outfit26: { id: "1313933884731293889" },
			/**
			 * Light Whisperer.
			 */
			Outfit27: { id: "1313933867182194768" },
			/**
			 * Mischief Witch Jumper.
			 */
			Outfit28: { id: "1313933841181835336" },
			/**
			 * Anxious Angler.
			 */
			Outfit29: { id: "1313933872857350165" },
			/**
			 * Modest Dancer.
			 */
			Outfit30: { id: "1313933858047135895" },
			/**
			 * Frantic Stagehand
			 */
			Outfit31: { id: "1313933856012763186" },
			/**
			 * Forgetful Storyteller.
			 */
			Outfit32: { id: "1313933896429080636" },
			/**
			 * Rainbow Trousers.
			 */
			Outfit33: { id: "1313933908206948424" },
			/**
			 * Ancient Light (manta).
			 */
			Outfit34: { id: "1313933865609334805" },
			/**
			 * Mindful Miner.
			 */
			Outfit35: { id: "1313933911876702228" },
			/**
			 * AURORA (ultimate).
			 */
			Outfit36: { id: "1313933913198166026" },
			/**
			 * AURORA (non-ultimate).
			 */
			Outfit37: { id: "1313933891828056176" },
			/**
			 * To The Love Outfit.
			 */
			Outfit38: { id: "1313933909599191090" },
			/**
			 * Runaway Outfit.
			 */
			Outfit39: { id: "1313933890221772860" },
			/**
			 * Pleading Child.
			 */
			Outfit40: { id: "1313933898148741233" },
			/**
			 * Wounded Warrior.
			 */
			Outfit41: { id: "1313933904104656938" },
			/**
			 * Tiptoeing Tea-Brewer.
			 */
			Outfit42: { id: "1313933887566778409" },
			/**
			 * Days of Fortune Muralist's Smock.
			 */
			Outfit43: { id: "1313933895032504360" },
			/**
			 * Bloom Gardening Tunic.
			 */
			Outfit44: { id: "1313933905581310083" },
			/**
			 * Melancholy Mope.
			 */
			Outfit45: { id: "1313933880776069193" },
			/**
			 * Oddball Outcast.
			 */
			Outfit46: { id: "1313933899851632680" },
			/**
			 * Dark Rainbow Tunic.
			 */
			Outfit47: { id: "1313933914456326154" },
			/**
			 * Ascetic Monk.
			 */
			Outfit48: { id: "1313933874987929712" },
			/**
			 * Nightbird Whisperer.
			 */
			Outfit49: { id: "1313933877571751967" },
			/**
			 * Style Wide-Leg Jeans.
			 */
			Outfit50: { id: "1313933893434474606" },
			/**
			 * Memory of a Lost Village.
			 */
			Outfit51: { id: "1313934002150834256" },
			/**
			 * Mischief Goth Garment.
			 */
			Outfit52: { id: "1313934008681234523" },
			/**
			 * Spirit of Mural (ultimate).
			 */
			Outfit53: { id: "1313934014817501198" },
			/**
			 * Herb Gatherer.
			 */
			Outfit54: { id: "1313934005502087189" },
			/**
			 * Hunter.
			 */
			Outfit55: { id: "1313934006932476009" },
			/**
			 * Princess.
			 */
			Outfit56: { id: "1313934013228122235" },
			/**
			 * Days of Fortune Dragon Vestment.
			 */
			Outfit57: { id: "1313934019036975145" },
			/**
			 * Nesting Guide (ultimate).
			 */
			Outfit58: { id: "1313934017166315612" },
			/**
			 * SkyFest 5th Anniversary T-shirt.
			 */
			Outfit59: { id: "1313934020924538890" },
			/**
			 * The Cellist's Beginnings.
			 */
			Outfit60: { id: "1313934004109443164" },
			/**
			 * The Pianist's Beginnings.
			 */
			Outfit61: { id: "1313934023978127410" },
			/**
			 * The Cellist's Flourishing.
			 */
			Outfit62: { id: "1313934011755790447" },
			/**
			 * The Pianist's Flourishing.
			 */
			Outfit63: { id: "1313934010304561193" },
			/**
			 * Tournament Tunic.
			 */
			Outfit64: { id: "1313934034811883560" },
			/**
			 * Sunlight Beach Shorts outfit.
			 */
			Outfit65: { id: "1313934027878563913" },
			/**
			 * Moonlight Frock.
			 */
			Outfit66: { id: "1313934030495940729" },
			/**
			 * Style Dazzling Dress.
			 */
			Outfit67: { id: "1313934031922008154" },
			/**
			 * Style Dapper Suit.
			 */
			Outfit68: { id: "1313934022929420389" },
			/**
			 * Roving Snufkin Robe.
			 */
			Outfit69: { id: "1313934026658152652" },
			/**
			 * The Moomin Storybook (ultimate).
			 */
			Outfit70: { id: "1313934033029431366" },
			/**
			 * Inspiration of Inclusion.
			 */
			Outfit71: { id: "1313934029287850075" },
			/**
			 * Music Marching Uniform.
			 */
			Outfit72: { id: "1313934025106264124" },
			/**
			 * The Moomin Storybook (non-ultimate).
			 */
			Outfit73: { id: "1315724161330577490" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Outfit01: { id: "1313869809905172600" },
			Outfit02: { id: "1313869738820239450" },
			Outfit03: { id: "1313869742565752842" },
			Outfit04: { id: "1313869743316402238" },
			Outfit05: { id: "1313869806952386702" },
			Outfit06: { id: "1313869808424583188" },
			Outfit07: { id: "1313869784294887434" },
			Outfit08: { id: "1313869740736778442" },
			Outfit09: { id: "1313869769811824692" },
			Outfit10: { id: "1313869765093363724" },
			Outfit11: { id: "1313869793765363805" },
			Outfit12: { id: "1313869795854254183" },
			Outfit13: { id: "1313869747518967871" },
			Outfit14: { id: "1313869777118302280" },
			Outfit15: { id: "1313869804171690037" },
			Outfit16: { id: "1313869745870733332" },
			Outfit17: { id: "1313869757459726356" },
			Outfit18: { id: "1313869762278854667" },
			Outfit19: { id: "1313869749150814309" },
			Outfit20: { id: "1313869790624088185" },
			Outfit21: { id: "1313869781652344883" },
			Outfit22: { id: "1313869760504660100" },
			Outfit23: { id: "1313869758877274223" },
			Outfit24: { id: "1313869744700657674" },
			Outfit25: { id: "1313869812455182396" },
			Outfit26: { id: "1313869768230703104" },
			Outfit27: { id: "1313869750732066866" },
			Outfit28: { id: "1313869773368721461" },
			Outfit29: { id: "1313869786169741312" },
			Outfit30: { id: "1313869792943276062" },
			Outfit31: { id: "1313869805631176735" },
			Outfit32: { id: "1313869763511976020" },
			Outfit33: { id: "1313869798299668511" },
			Outfit34: { id: "1313869800585433149" },
			Outfit35: { id: "1313869766460702720" },
			Outfit36: { id: "1313869740346839062" },
			Outfit37: { id: "1313869789323595837" },
			Outfit38: { id: "1313869771309318174" },
			Outfit39: { id: "1313869787650330646" },
			Outfit40: { id: "1313869791601365004" },
			Outfit41: { id: "1313869815055781939" },
			Outfit42: { id: "1313869772429201441" },
			Outfit43: { id: "1313869811402543105" },
			Outfit44: { id: "1313869778712002590" },
			Outfit45: { id: "1313869780473741312" },
			Outfit46: { id: "1313869799754960927" },
			Outfit47: { id: "1313869802640506920" },
			Outfit48: { id: "1313869775440576593" },
			Outfit49: { id: "1313869813613068308" },
			Outfit50: { id: "1313869782386343987" },
			Outfit51: { id: "1313919393331413043" },
			Outfit52: { id: "1313919419428372513" },
			Outfit53: { id: "1313919400859930756" },
			Outfit54: { id: "1313919412956434463" },
			Outfit55: { id: "1313919420669628416" },
			Outfit56: { id: "1313919418287263826" },
			Outfit57: { id: "1313919397408145408" },
			Outfit58: { id: "1313919395784949874" },
			Outfit59: { id: "1313919422355865650" },
			Outfit60: { id: "1313919415007580192" },
			Outfit61: { id: "1313919408912994314" },
			Outfit62: { id: "1313919400121729075" },
			Outfit63: { id: "1313919425052807309" },
			Outfit64: { id: "1313919406090489867" },
			Outfit65: { id: "1313919409852776651" },
			Outfit66: { id: "1313919416874045530" },
			Outfit67: { id: "1313919398603390996" },
			Outfit68: { id: "1313919423307845673" },
			Outfit69: { id: "1313919404924469269" },
			Outfit70: { id: "1313919402793635862" },
			Outfit71: { id: "1313919414181302322" },
			Outfit72: { id: "1313919411211604051" },
			Outfit73: { id: "1315724340121178122" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type OutfitEmojis = (typeof OUTFIT_EMOJIS)[keyof typeof OUTFIT_EMOJIS];

/**
 * Emojis from the shoes server.
 */
export const SHOE_EMOJIS = PRODUCTION
	? ({
			/**
			 * Chuckling Scout.
			 */
			Shoe01: { id: "1313934732756652142" },
			/**
			 * Days of Mischief 2021.
			 */
			Shoe02: { id: "1313934728906145852" },
			/**
			 * Pleading Child.
			 */
			Shoe03: { id: "1313934739475922945" },
			/**
			 * Nightbird Whisperer.
			 */
			Shoe04: { id: "1313934744110628885" },
			/**
			 * Musical Voyage Sneakers.
			 */
			Shoe05: { id: "1313934741107376200" },
			/**
			 * Sunlight Chunky Sandals.
			 */
			Shoe06: { id: "1313934735218839563" },
			/**
			 * Style Silk Ballet Slippers.
			 */
			Shoe07: { id: "1313934748933947473" },
			/**
			 * Style Bunny Slippers.
			 */
			Shoe08: { id: "1313934745662525580" },
			/**
			 * Vestige of a Deserted Oasis.
			 */
			Shoe09: { id: "1313934733821870100" },
			/**
			 * Echo of an Abandoned Refuge.
			 */
			Shoe10: { id: "1313934747155697756" },
			/**
			 * Remnant of a Forgotten Haven.
			 */
			Shoe11: { id: "1313934736577531957" },
			/**
			 * Mischief Goth Boots.
			 */
			Shoe12: { id: "1313934751836540979" },
			/**
			 * Cosy Hermit Boots.
			 */
			Shoe13: { id: "1313934750020538499" },
			/**
			 * Dark Rainbow Loafers.
			 */
			Shoe14: { id: "1313934731120873522" },
			/**
			 * The Pianist's Flourishing.
			 */
			Shoe15: { id: "1313934742717988874" },
			/**
			 * Sense of Self.
			 */
			Shoe16: { id: "1313934738477813800" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Shoe01: { id: "1313919703458119770" },
			Shoe02: { id: "1313919688484454570" },
			Shoe03: { id: "1313919699360415885" },
			Shoe04: { id: "1313919691462283387" },
			Shoe05: { id: "1313919692313726998" },
			Shoe06: { id: "1313919702002565190" },
			Shoe07: { id: "1313919704959811724" },
			Shoe08: { id: "1313919708612923473" },
			Shoe09: { id: "1313919696440922133" },
			Shoe10: { id: "1313919689709060147" },
			Shoe11: { id: "1313919697946804344" },
			Shoe12: { id: "1313919710139519006" },
			Shoe13: { id: "1313919695229026358" },
			Shoe14: { id: "1313919700844937296" },
			Shoe15: { id: "1313919706809241681" },
			Shoe16: { id: "1313919693664288770" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type ShoeEmojis = (typeof SHOE_EMOJIS)[keyof typeof SHOE_EMOJIS];

/**
 * Emojis from the masks servers.
 */
export const MASK_EMOJIS = PRODUCTION
	? ({
			/**
			 * Base.
			 */
			Mask01: { id: "1313935107651801239" },
			/**
			 * Waving Bellmaker.
			 */
			Mask02: { id: "1313935113607839754" },
			/**
			 * Hide'n'Seek Pioneer.
			 */
			Mask03: { id: "1313935104988676279" },
			/**
			 * Proud Victor.
			 */
			Mask04: { id: "1313935103524606075" },
			/**
			 * Fainting Warrior.
			 */
			Mask05: { id: "1313935112412598384" },
			/**
			 * Provoking Performer.
			 */
			Mask06: { id: "1313935121237413959" },
			/**
			 * Leaping Dancer.
			 */
			Mask07: { id: "1313935155861127340" },
			/**
			 * Saluting Protector.
			 */
			Mask08: { id: "1313935109518397591" },
			/**
			 * Greeting Shaman.
			 */
			Mask09: { id: "1313935125204963398" },
			/**
			 * Season of Gratitude ultimate.
			 */
			Mask10: { id: "1313935114962731078" },
			/**
			 * Sassy Drifter.
			 */
			Mask11: { id: "1313935122524934236" },
			/**
			 * Piggyback Lightseeker.
			 */
			Mask12: { id: "1313935147225190451" },
			/**
			 * Doublefive Light Catcher.
			 */
			Mask13: { id: "1313935106322468946" },
			/**
			 * Laidback Pioneer.
			 */
			Mask14: { id: "1313935152124264533" },
			/**
			 * Twirling Champion.
			 */
			Mask15: { id: "1313935120159342746" },
			/**
			 * Crab Whisperer.
			 */
			Mask16: { id: "1313935133337849916" },
			/**
			 * Shushing Light Scholar.
			 */
			Mask17: { id: "1313935124005519371" },
			/**
			 * Boogie Kid.
			 */
			Mask18: { id: "1313935127998369974" },
			/**
			 * Wise Grandparent.
			 */
			Mask19: { id: "1313935174249091153" },
			/**
			 * Pleaful Parent.
			 */
			Mask20: { id: "1313935126446608406" },
			/**
			 * Sparkler Parent.
			 */
			Mask21: { id: "1313935132276559932" },
			/**
			 * Rhythm Guide (ultimate).
			 */
			Mask22: { id: "1313935160449699910" },
			/**
			 * Troupe Greeter.
			 */
			Mask23: { id: "1313935116955025551" },
			/**
			 * Admiring Actor.
			 */
			Mask24: { id: "1313935110776815707" },
			/**
			 * Thoughtful Director.
			 */
			Mask25: { id: "1313935149188255784" },
			/**
			 * Respectful Pianist.
			 */
			Mask26: { id: "1313935165793239070" },
			/**
			 * Nodding Muralist.
			 */
			Mask27: { id: "1313935150568050780" },
			/**
			 * Playfighting Herbalist.
			 */
			Mask28: { id: "1313935138568147046" },
			/**
			 * Indifferent Alchemist.
			 */
			Mask29: { id: "1313935130405900383" },
			/**
			 * Scarecrow Farmer.
			 */
			Mask30: { id: "1313935144511340605" },
			/**
			 * Hiking Grouch.
			 */
			Mask31: { id: "1313935129407918131" },
			/**
			 * Prophet of Water.
			 */
			Mask32: { id: "1313935139645948016" },
			/**
			 * Prophet of Earth.
			 */
			Mask33: { id: "1313935136731041793" },
			/**
			 * Prophet of Air.
			 */
			Mask34: { id: "1313935134839275590" },
			/**
			 * Prophet of Fire.
			 */
			Mask35: { id: "1313935141982437487" },
			/**
			 * Prophecy Guide (ultimate).
			 */
			Mask36: { id: "1313935153848127508" },
			/**
			 * Peeking Postman.
			 */
			Mask37: { id: "1313935163364741152" },
			/**
			 * Dancing Performer.
			 */
			Mask38: { id: "1313935167391531078" },
			/**
			 * Spinning Mentor.
			 */
			Mask39: { id: "1313935140527013909" },
			/**
			 * Dreams Guide (ultimate).
			 */
			Mask40: { id: "1313935158721908776" },
			/**
			 * Fortune Blushing Mask.
			 */
			Mask41: { id: "1313935178124496896" },
			/**
			 * Days of Fortune 2021 Bull Mask.
			 */
			Mask42: { id: "1313935176270872597" },
			/**
			 * Days of Love 2021.
			 */
			Mask43: { id: "1313935168750489681" },
			/**
			 * Assembly Guide (ultimate).
			 */
			Mask44: { id: "1313935155026464788" },
			/**
			 * Marching Adventurer.
			 */
			Mask45: { id: "1313935146097053788" },
			/**
			 * Chuckling Scout.
			 */
			Mask46: { id: "1313935170486927461" },
			/**
			 * Daydream Forester.
			 */
			Mask47: { id: "1313935171950739466" },
			/**
			 * Scolding Student.
			 */
			Mask48: { id: "1313935161955450880" },
			/**
			 * Baffled Botanist.
			 */
			Mask49: { id: "1313935157593640960" },
			/**
			 * Scaredy Cadet.
			 */
			Mask50: { id: "1313935143190138963" },
			/**
			 * Beckoning Ruler.
			 */
			Mask51: { id: "1313935254784049222" },
			/**
			 * Bumbling Boatswain.
			 */
			Mask52: { id: "1313935256117706844" },
			/**
			 * Ceasing Commodore.
			 */
			Mask53: { id: "1313935313428545597" },
			/**
			 * Cackling Cannoneer.
			 */
			Mask54: { id: "1313935259955494965" },
			/**
			 * Abyss Guide (ultimate).
			 */
			Mask55: { id: "1313935258848067685" },
			/**
			 * Abyss Guide (non-ultimate).
			 */
			Mask56: { id: "1313935263147495466" },
			/**
			 * Anxious Angler.
			 */
			Mask57: { id: "1313935276380524584" },
			/**
			 * Days of Fortune Tiger Mask.
			 */
			Mask58: { id: "1313935264284151840" },
			/**
			 * Performance Guide (ultimate).
			 */
			Mask59: { id: "1313935257673793646" },
			/**
			 * Modest Dancer.
			 */
			Mask60: { id: "1313935269589684234" },
			/**
			 * Frantic Stagehand.
			 */
			Mask61: { id: "1313935267387670590" },
			/**
			 * Performance Guide (non-ultimate).
			 */
			Mask62: { id: "1313935265936576614" },
			/**
			 * Forgetful Storyteller.
			 */
			Mask63: { id: "1313935261448802345" },
			/**
			 * Mellow Musician.
			 */
			Mask64: { id: "1313935273435856946" },
			/**
			 * Ancient Darkness (plant).
			 */
			Mask65: { id: "1313935314774917182" },
			/**
			 * Seed of Hope.
			 */
			Mask66: { id: "1313935293426171995" },
			/**
			 * Running Wayfarer.
			 */
			Mask67: { id: "1313935270764347533" },
			/**
			 * Warrior of Love.
			 */
			Mask68: { id: "1313935308626071622" },
			/**
			 * Mindful Miner.
			 */
			Mask69: { id: "1313935279169474570" },
			/**
			 * AURORA (non-ultimate).
			 */
			Mask70: { id: "1313935283854774455" },
			/**
			 * Days of Mischief 2022.
			 */
			Mask71: { id: "1313935295124607068" },
			/**
			 * Journey Mask.
			 */
			Mask72: { id: "1313935277676302396" },
			/**
			 * Bereft Veteran.
			 */
			Mask73: { id: "1313935280960569395" },
			/**
			 * Wounded Warrior.
			 */
			Mask74: { id: "1313935311872720928" },
			/**
			 * Days of Fortune Rabbit Mask.
			 */
			Mask75: { id: "1313935301474914445" },
			/**
			 * Passage Guide (ultimate).
			 */
			Mask76: { id: "1313935268499292251" },
			/**
			 * Passage Guide (non-ultimate 1).
			 */
			Mask77: { id: "1313935298425655306" },
			/**
			 * Passage Guide (non-ultimate 2).
			 */
			Mask78: { id: "1313935288845996214" },
			/**
			 * Passage Guide (non-ultimate 3).
			 */
			Mask79: { id: "1313935302913425409" },
			/**
			 * Passage Guide (non-ultimate 4).
			 */
			Mask80: { id: "1313935288065589248" },
			/**
			 * Reassuring Ranger.
			 */
			Mask81: { id: "1313935286438334467" },
			/**
			 * Ascetic Monk.
			 */
			Mask82: { id: "1313935282709729353" },
			/**
			 * Style Runway Mask.
			 */
			Mask83: { id: "1313935274815914096" },
			/**
			 * Mischief Crabula Mask.
			 */
			Mask84: { id: "1313935305954295919" },
			/**
			 * Sparrow Appreciation.
			 */
			Mask85: { id: "1313935271934427206" },
			/**
			 * Spirit of Mural (non-ultimate).
			 */
			Mask86: { id: "1313935285444149258" },
			/**
			 * Feudal Lord.
			 */
			Mask87: { id: "1313935304566247434" },
			/**
			 * Princess.
			 */
			Mask88: { id: "1313935307376164874" },
			/**
			 * Gift of the Nine-Coloured Deer.
			 */
			Mask89: { id: "1313935291609780384" },
			/**
			 * Fortune Dragon Mask.
			 */
			Mask90: { id: "1313935310329221232" },
			/**
			 * Ocean Mask.
			 */
			Mask91: { id: "1313935290095898635" },
			/**
			 * Dark Rainbow Mask.
			 */
			Mask92: { id: "1313935296844271707" },
			/**
			 * Duets Guide (non-ultimate).
			 */
			Mask93: { id: "1313935299767963799" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Mask01: { id: "1313919848769781872" },
			Mask02: { id: "1313919852456710154" },
			Mask03: { id: "1313919865635082260" },
			Mask04: { id: "1313919842189049978" },
			Mask05: { id: "1313919845401755679" },
			Mask06: { id: "1313919858735448146" },
			Mask07: { id: "1313919843635957842" },
			Mask08: { id: "1313919846588612629" },
			Mask09: { id: "1313919849788866632" },
			Mask10: { id: "1313919859939213312" },
			Mask11: { id: "1313919851298947092" },
			Mask12: { id: "1313919847708491837" },
			Mask13: { id: "1313919874090795069" },
			Mask14: { id: "1313919862656995439" },
			Mask15: { id: "1313919856516530229" },
			Mask16: { id: "1313919855610695701" },
			Mask17: { id: "1313919883037376592" },
			Mask18: { id: "1313919877420941506" },
			Mask19: { id: "1313919886283640936" },
			Mask20: { id: "1313919868650786879" },
			Mask21: { id: "1313919896228466739" },
			Mask22: { id: "1313919902083715173" },
			Mask23: { id: "1313919864372596836" },
			Mask24: { id: "1313919903836930139" },
			Mask25: { id: "1313919871460970570" },
			Mask26: { id: "1313919889060134912" },
			Mask27: { id: "1313919870412525668" },
			Mask28: { id: "1313919890712956989" },
			Mask29: { id: "1313919909192929361" },
			Mask30: { id: "1313919891845419089" },
			Mask31: { id: "1313919907699752980" },
			Mask32: { id: "1313919875650945095" },
			Mask33: { id: "1313919854134169631" },
			Mask34: { id: "1313919894651404371" },
			Mask35: { id: "1313919905749401600" },
			Mask36: { id: "1313919892818366516" },
			Mask37: { id: "1313919881279963229" },
			Mask38: { id: "1313919879476416524" },
			Mask39: { id: "1313919914913828985" },
			Mask40: { id: "1313919899193704448" },
			Mask41: { id: "1313919897989808178" },
			Mask42: { id: "1313919884375359610" },
			Mask43: { id: "1313919887361703950" },
			Mask44: { id: "1313919910983897162" },
			Mask45: { id: "1313919878545149994" },
			Mask46: { id: "1313919861411414150" },
			Mask47: { id: "1313919867056816228" },
			Mask48: { id: "1313919900808646778" },
			Mask49: { id: "1313919916641878047" },
			Mask50: { id: "1313919912904888391" },
			Mask51: { id: "1313920376128012390" },
			Mask52: { id: "1313920361158410362" },
			Mask53: { id: "1313920365294256139" },
			Mask54: { id: "1313920364547674112" },
			Mask55: { id: "1313920367546339369" },
			Mask56: { id: "1313920353872908388" },
			Mask57: { id: "1313920371925323847" },
			Mask58: { id: "1313920411620081754" },
			Mask59: { id: "1313920355319939124" },
			Mask60: { id: "1313920356670509086" },
			Mask61: { id: "1313920382650159176" },
			Mask62: { id: "1313920358234980393" },
			Mask63: { id: "1313920374747959316" },
			Mask64: { id: "1313920389516234786" },
			Mask65: { id: "1313920408390598798" },
			Mask66: { id: "1313920368687321118" },
			Mask67: { id: "1313920362920022186" },
			Mask68: { id: "1313920391567118406" },
			Mask69: { id: "1313920388606070804" },
			Mask70: { id: "1313920381538664508" },
			Mask71: { id: "1313920396147429446" },
			Mask72: { id: "1313920380276052069" },
			Mask73: { id: "1313920397275693117" },
			Mask74: { id: "1313920377369395282" },
			Mask75: { id: "1313920378686406656" },
			Mask76: { id: "1313920373120831521" },
			Mask77: { id: "1313920386869493762" },
			Mask78: { id: "1313920395073556552" },
			Mask79: { id: "1313920399876296746" },
			Mask80: { id: "1313920404842221681" },
			Mask81: { id: "1313920370193203220" },
			Mask82: { id: "1313920384579539027" },
			Mask83: { id: "1313920403193724949" },
			Mask84: { id: "1313920407690022932" },
			Mask85: { id: "1313920359438749797" },
			Mask86: { id: "1313920410236096574" },
			Mask87: { id: "1313920385514868748" },
			Mask88: { id: "1313920401637773422" },
			Mask89: { id: "1313920392720683089" },
			Mask90: { id: "1313920406377332757" },
			Mask91: { id: "1313920393953939500" },
			Mask92: { id: "1313920398295040020" },
			Mask93: { id: "1313920383770169407" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type MaskEmojis = (typeof MASK_EMOJIS)[keyof typeof MASK_EMOJIS];

/**
 * Emojis from the face accessories server.
 */
export const FACE_ACCESSORY_EMOJIS = PRODUCTION
	? ({
			/**
			 * Rejecting Voyager.
			 */
			FaceAccessory01: { id: "1313935533063274557" },
			/**
			 * Exhausted Dock Worker.
			 */
			FaceAccessory02: { id: "1313935545356783646" },
			/**
			 * Apologetic Lumberjack.
			 */
			FaceAccessory03: { id: "1313935555611988120" },
			/**
			 * Backflipping Champion.
			 */
			FaceAccessory04: { id: "1313935538826252471" },
			/**
			 * Bowing Medalist.
			 */
			FaceAccessory05: { id: "1313935566580088932" },
			/**
			 * Lookout Scout.
			 */
			FaceAccessory06: { id: "1313935539631689820" },
			/**
			 * Levitating Adept.
			 */
			FaceAccessory07: { id: "1313935541703802910" },
			/**
			 * Hairtousle Teen.
			 */
			FaceAccessory08: { id: "1313935572443856977" },
			/**
			 * Enchantment Guide (ultimate).
			 */
			FaceAccessory09: { id: "1313935550125838346" },
			/**
			 * Chill Sunbather.
			 */
			FaceAccessory10: { id: "1313935551342186647" },
			/**
			 * Days of Feast Horns.
			 */
			FaceAccessory11: { id: "1313935537203052675" },
			/**
			 * Bearhug Hermit.
			 */
			FaceAccessory12: { id: "1313935534942457896" },
			/**
			 * Rainbow braid.
			 */
			FaceAccessory13: { id: "1313935552944275488" },
			/**
			 * Mischief Withered Antlers.
			 */
			FaceAccessory14: { id: "1313935554429190254" },
			/**
			 * Abyss Guide (ultimate).
			 */
			FaceAccessory15: { id: "1313935592731443250" },
			/**
			 * Rainbow Earring.
			 */
			FaceAccessory16: { id: "1313935547810578453" },
			/**
			 * Rainbow Headphones.
			 */
			FaceAccessory17: { id: "1313935578747768854" },
			/**
			 * Elder of the Isle.
			 */
			FaceAccessory18: { id: "1313935577212653650" },
			/**
			 * Elder of the Prairie.
			 */
			FaceAccessory19: { id: "1313935546904477706" },
			/**
			 * Elder of the Forest.
			 */
			FaceAccessory20: { id: "1313935556534734910" },
			/**
			 * Tiara We Can Touch.
			 */
			FaceAccessory21: { id: "1313935588474228866" },
			/**
			 * Feast Goggles.
			 */
			FaceAccessory22: { id: "1313935558103273472" },
			/**
			 * Melancholy Mope.
			 */
			FaceAccessory23: { id: "1313935587627110560" },
			/**
			 * Tumbling Troublemaker.
			 */
			FaceAccessory24: { id: "1313935543696097380" },
			/**
			 * Nature Glasses.
			 */
			FaceAccessory25: { id: "1313935562348167208" },
			/**
			 * Days of Colour 2023.
			 */
			FaceAccessory26: { id: "1313935565112217680" },
			/**
			 * Reassuring Ranger.
			 */
			FaceAccessory27: { id: "1313935575505440839" },
			/**
			 * Moments Guide (ultimate).
			 */
			FaceAccessory28: { id: "1313935569440739359" },
			/**
			 * Jolly Geologist.
			 */
			FaceAccessory29: { id: "1313935570820665407" },
			/**
			 * Style Star Sunglasses.
			 */
			FaceAccessory30: { id: "1313935568165539871" },
			/**
			 * Style Flame Sunglasses.
			 */
			FaceAccessory31: { id: "1313935559525400667" },
			/**
			 * Style Heart Sunglasses.
			 */
			FaceAccessory32: { id: "1313935586058567771" },
			/**
			 * Festival Earrings.
			 */
			FaceAccessory33: { id: "1313935584045301791" },
			/**
			 * Gift of the Nine-Coloured Deer.
			 */
			FaceAccessory34: { id: "1313935563610394624" },
			/**
			 * Days of Fortune Dragon Bangles.
			 */
			FaceAccessory35: { id: "1313935589833179230" },
			/**
			 * Compassionate Cellist.
			 */
			FaceAccessory36: { id: "1313935581046116412" },
			/**
			 * Sunlight Helios Hoops earrings.
			 */
			FaceAccessory37: { id: "1313935574088028160" },
			/**
			 * Moonlight earrings.
			 */
			FaceAccessory38: { id: "1313935591502643200" },
			/**
			 * Style Dapper Monocle.
			 */
			FaceAccessory39: { id: "1313935582761717780" },
			/**
			 * Mischief Star Sticker.
			 */
			FaceAccessory40: { id: "1313935561022636072" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			FaceAccessory01: { id: "1313920630118420562" },
			FaceAccessory02: { id: "1313920619875668099" },
			FaceAccessory03: { id: "1313920570496389212" },
			FaceAccessory04: { id: "1313920596676972635" },
			FaceAccessory05: { id: "1313920587621732382" },
			FaceAccessory06: { id: "1313920571335114753" },
			FaceAccessory07: { id: "1313920622971326554" },
			FaceAccessory08: { id: "1313920618265182259" },
			FaceAccessory09: { id: "1313920585302147092" },
			FaceAccessory10: { id: "1313920632051863617" },
			FaceAccessory11: { id: "1313920583980814336" },
			FaceAccessory12: { id: "1313920574334173277" },
			FaceAccessory13: { id: "1313920625311744052" },
			FaceAccessory14: { id: "1313920586493333627" },
			FaceAccessory15: { id: "1313920568449302542" },
			FaceAccessory16: { id: "1313920616482738256" },
			FaceAccessory17: { id: "1313920573306310827" },
			FaceAccessory18: { id: "1313920633503219826" },
			FaceAccessory19: { id: "1313920598258483293" },
			FaceAccessory20: { id: "1313920610497335316" },
			FaceAccessory21: { id: "1313920600988975196" },
			FaceAccessory22: { id: "1313920631334502493" },
			FaceAccessory23: { id: "1313920577601536041" },
			FaceAccessory24: { id: "1313920615299678208" },
			FaceAccessory25: { id: "1313920612015542445" },
			FaceAccessory26: { id: "1313920626872029306" },
			FaceAccessory27: { id: "1313920595192315967" },
			FaceAccessory28: { id: "1313920621263982642" },
			FaceAccessory29: { id: "1313920580667310111" },
			FaceAccessory30: { id: "1313920624573284472" },
			FaceAccessory31: { id: "1313920576079007856" },
			FaceAccessory32: { id: "1313920628834828378" },
			FaceAccessory33: { id: "1313920582651215902" },
			FaceAccessory34: { id: "1313920604042432613" },
			FaceAccessory35: { id: "1313920613525487696" },
			FaceAccessory36: { id: "1313920578440138773" },
			FaceAccessory37: { id: "1313920602817564802" },
			FaceAccessory38: { id: "1313920604939747450" },
			FaceAccessory39: { id: "1313920608677134378" },
			FaceAccessory40: { id: "1313920607028777020" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type FaceAccessoryEmojis = (typeof FACE_ACCESSORY_EMOJIS)[keyof typeof FACE_ACCESSORY_EMOJIS];

/**
 * Emojis from the necklace server.
 */
export const NECKLACE_EMOJIS = PRODUCTION
	? ({
			/**
			 * Gratitude Pendant.
			 */
			Necklace01: { id: "1313935763599130694" },
			/**
			 * Lightseekers Pendant.
			 */
			Necklace02: { id: "1313935760109600849" },
			/**
			 * Belonging Pendant.
			 */
			Necklace03: { id: "1313935761518624899" },
			/**
			 * Rhythm Pendant.
			 */
			Necklace04: { id: "1313935770482118676" },
			/**
			 * Enchantment Pendant.
			 */
			Necklace05: { id: "1313935769190268979" },
			/**
			 * Sanctuary Pendant.
			 */
			Necklace06: { id: "1313935767575461919" },
			/**
			 * Hiking Grouch.
			 */
			Necklace07: { id: "1313935766035894282" },
			/**
			 * Prophecy Pendant.
			 */
			Necklace08: { id: "1313935764676939777" },
			/**
			 * Days of Feast 2020.
			 */
			Necklace09: { id: "1313935778048643214" },
			/**
			 * Dreams Pendant.
			 */
			Necklace10: { id: "1313935780737060937" },
			/**
			 * Assembly Pendant.
			 */
			Necklace11: { id: "1313935776052023329" },
			/**
			 * Ocean Necklace.
			 */
			Necklace12: { id: "1313935801654182030" },
			/**
			 * Little Prince Pendant.
			 */
			Necklace13: { id: "1313935826413158481" },
			/**
			 * Star Collector.
			 */
			Necklace14: { id: "1313935814648135692" },
			/**
			 * Flight Pendant.
			 */
			Necklace15: { id: "1313935771849326703" },
			/**
			 * Talented Builder.
			 */
			Necklace16: { id: "1313935782570102886" },
			/**
			 * Winter Feast Scarf.
			 */
			Necklace17: { id: "1313935792196030536" },
			/**
			 * Abyss Pendant.
			 */
			Necklace18: { id: "1313935794746167366" },
			/**
			 * Performance Pendant.
			 */
			Necklace19: { id: "1313935773883568179" },
			/**
			 * Days of Nature 2022.
			 */
			Necklace20: { id: "1313935779411791976" },
			/**
			 * Shattering Pendant.
			 */
			Necklace21: { id: "1313935792934096917" },
			/**
			 * Ancient Darkness (dragon).
			 */
			Necklace22: { id: "1313935789888901191" },
			/**
			 * Jelly Shoulder Buddy.
			 */
			Necklace23: { id: "1313935796352319509" },
			/**
			 * AURORA Pendant.
			 */
			Necklace24: { id: "1313935803348549642" },
			/**
			 * Remembrance Pendant.
			 */
			Necklace25: { id: "1313935799116370001" },
			/**
			 * Pleading Child.
			 */
			Necklace26: { id: "1313935806821564467" },
			/**
			 * Remembrance Guide.
			 */
			Necklace27: { id: "1313935830904999986" },
			/**
			 * Days of Love Classy Cravat.
			 */
			Necklace28: { id: "1313935819018600491" },
			/**
			 * Passage Pendant.
			 */
			Necklace29: { id: "1313935804804108438" },
			/**
			 * Oddball Outcast.
			 */
			Necklace30: { id: "1313935797661208607" },
			/**
			 * Moments Pendant.
			 */
			Necklace31: { id: "1313935800731172864" },
			/**
			 * Revival Pendant.
			 */
			Necklace32: { id: "1313935808079724575" },
			/**
			 * Nine-Coloured Deer Pendant.
			 */
			Necklace33: { id: "1313935809547862049" },
			/**
			 * Nesting Pendant.
			 */
			Necklace34: { id: "1313935832687579146" },
			/**
			 * Cinnamoroll Pop-Up Cafe Bowtie.
			 */
			Necklace35: { id: "1313935824873586740" },
			/**
			 * Ocean Blue Scarf.
			 */
			Necklace36: { id: "1313935827973308447" },
			/**
			 * Duets Pendant.
			 */
			Necklace37: { id: "1313935815881134122" },
			/**
			 * Style Dapper Necktie.
			 */
			Necklace38: { id: "1313935821807685772" },
			/**
			 * Hattifattener Shoulder Buddy.
			 */
			Necklace39: { id: "1313935811497951235" },
			/**
			 * Roving Snufkin Scarf.
			 */
			Necklace40: { id: "1313935791067627520" },
			/**
			 * Moomintroll Tail.
			 */
			Necklace41: { id: "1313935817600667668" },
			/**
			 * Moomin Pendant.
			 */
			Necklace42: { id: "1313935823015776267" },
			/**
			 * Comfort of Kindness.
			 */
			Necklace43: { id: "1313935820385943712" },
			/**
			 * Sense of Self.
			 */
			Necklace44: { id: "1313935829202370580" },
			/**
			 * Inspiration of Inclusion.
			 */
			Necklace45: { id: "1313935812668424214" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Necklace01: { id: "1313920866920435712" },
			Necklace02: { id: "1313920801229246608" },
			Necklace03: { id: "1313920876667998211" },
			Necklace04: { id: "1313920838763811008" },
			Necklace05: { id: "1313920868195373207" },
			Necklace06: { id: "1313920872657977475" },
			Necklace07: { id: "1313920818132160665" },
			Necklace08: { id: "1313920871194427412" },
			Necklace09: { id: "1313920878798704721" },
			Necklace10: { id: "1313920821399519244" },
			Necklace11: { id: "1313920806002229318" },
			Necklace12: { id: "1313920849568338060" },
			Necklace13: { id: "1313920847651541134" },
			Necklace14: { id: "1313920813577011232" },
			Necklace15: { id: "1313920865360154655" },
			Necklace16: { id: "1313920814814466068" },
			Necklace17: { id: "1313920832996905002" },
			Necklace18: { id: "1313920825568530594" },
			Necklace19: { id: "1313920809802137611" },
			Necklace20: { id: "1313920828592623617" },
			Necklace21: { id: "1313920861379624990" },
			Necklace22: { id: "1313920874671505448" },
			Necklace23: { id: "1313920860251492574" },
			Necklace24: { id: "1313920854312091679" },
			Necklace25: { id: "1313920840664088586" },
			Necklace26: { id: "1313920842035626035" },
			Necklace27: { id: "1313920864479219773" },
			Necklace28: { id: "1313920808065699912" },
			Necklace29: { id: "1313920858900664442" },
			Necklace30: { id: "1313920797772877958" },
			Necklace31: { id: "1313920835047657553" },
			Necklace32: { id: "1313920822762541130" },
			Necklace33: { id: "1313920827506298903" },
			Necklace34: { id: "1313920824482332772" },
			Necklace35: { id: "1313920856728010762" },
			Necklace36: { id: "1313920843880861766" },
			Necklace37: { id: "1313920792932778004" },
			Necklace38: { id: "1313920819377737792" },
			Necklace39: { id: "1313920830748495923" },
			Necklace40: { id: "1313920845596332186" },
			Necklace41: { id: "1313920851477008466" },
			Necklace42: { id: "1313920836784095325" },
			Necklace43: { id: "1313920795763802113" },
			Necklace44: { id: "1313920815838007378" },
			Necklace45: { id: "1313920862830989324" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type NecklaceEmojis = (typeof NECKLACE_EMOJIS)[keyof typeof NECKLACE_EMOJIS];

/**
 * Emojis from the hair servers.
 */
export const HAIR_EMOJIS = PRODUCTION
	? ({
			/**
			 * Base 1.
			 */
			Hair01: { id: "1313936059306082354" },
			/**
			 * Pointing Candlemaker.
			 */
			Hair02: { id: "1313936058165235746" },
			/**
			 * Ushering Stargazer.
			 */
			Hair03: { id: "1313936060388216953" },
			/**
			 * Rejecting Voyager.
			 */
			Hair04: { id: "1313936061914681424" },
			/**
			 * Applauding Bellmaker.
			 */
			Hair05: { id: "1313936076972228731" },
			/**
			 * Waving Bellmaker.
			 */
			Hair06: { id: "1313936068210593893" },
			/**
			 * Slumbering Shipwright.
			 */
			Hair07: { id: "1313936080717873203" },
			/**
			 * Laughing Light Catcher.
			 */
			Hair08: { id: "1313936075827187782" },
			/**
			 * Bird Whisperer.
			 */
			Hair09: { id: "1313936065093959802" },
			/**
			 * Shivering Trailblazer.
			 */
			Hair10: { id: "1313936109553582133" },
			/**
			 * Blushing Prospector.
			 */
			Hair11: { id: "1313936066767622295" },
			/**
			 * Hide'n'Seek Pioneer.
			 */
			Hair12: { id: "1313936056034529403" },
			/**
			 * Pouty Porter.
			 */
			Hair13: { id: "1313936091778387990" },
			/**
			 * Dismayed Hunter.
			 */
			Hair14: { id: "1313936111688482899" },
			/**
			 * Apologetic Lumberjack.
			 */
			Hair15: { id: "1313936071343734887" },
			/**
			 * Tearful Light Miner.
			 */
			Hair16: { id: "1313936063391338618" },
			/**
			 * Confident Sightseer.
			 */
			Hair17: { id: "1313936083154636820" },
			/**
			 * Backflipping Champion.
			 */
			Hair18: { id: "1313936078549422142" },
			/**
			 * Cheerful Spectator.
			 */
			Hair19: { id: "1313936087957114880" },
			/**
			 * Bowing Medalist.
			 */
			Hair20: { id: "1313936122476494879" },
			/**
			 * Frightened Refugee.
			 */
			Hair21: { id: "1313936084828160102" },
			/**
			 * Fainting Warrior.
			 */
			Hair22: { id: "1313936072442515467" },
			/**
			 * Courageous Soldier.
			 */
			Hair23: { id: "1313936119297212506" },
			/**
			 * Stealthy Survivor.
			 */
			Hair24: { id: "1313936102234521620" },
			/**
			 * Saluting Captain.
			 */
			Hair25: { id: "1313936108236701736" },
			/**
			 * Praying Acolyte.
			 */
			Hair26: { id: "1313936090910162985" },
			/**
			 * Levitating Adept.
			 */
			Hair27: { id: "1313936105719988344" },
			/**
			 * Polite Scholar.
			 */
			Hair28: { id: "1313936129795428354" },
			/**
			 * Meditating Monastic.
			 */
			Hair29: { id: "1313936086703018036" },
			/**
			 * Elder of the Isle.
			 */
			Hair30: { id: "1313936093711958086" },
			/**
			 * Elder of the Prairie.
			 */
			Hair31: { id: "1313936114834477146" },
			/**
			 * Elder of the Forest.
			 */
			Hair32: { id: "1313936081510596609" },
			/**
			 * Elder of the Valley 1.
			 */
			Hair33: { id: "1313936106827550861" },
			/**
			 * Elder of the Valley 2.
			 */
			Hair34: { id: "1313936073600274452" },
			/**
			 * Elder of the Wasteland.
			 */
			Hair35: { id: "1313936096815485041" },
			/**
			 * Elder of the Vault.
			 */
			Hair36: { id: "1313936115585253408" },
			/**
			 * Sassy Drifter.
			 */
			Hair37: { id: "1313936124514930739" },
			/**
			 * Provoking Performer.
			 */
			Hair38: { id: "1313936128335806474" },
			/**
			 * Stretching Guru.
			 */
			Hair39: { id: "1313936123671609374" },
			/**
			 * Crab Whisperer.
			 */
			Hair40: { id: "1313936089224056945" },
			/**
			 * Twirling Champion.
			 */
			Hair41: { id: "1313936069330206762" },
			/**
			 * Piggyback Lightseeker.
			 */
			Hair42: { id: "1313936095032901664" },
			/**
			 * Laidback Pioneer.
			 */
			Hair43: { id: "1313936100192161916" },
			/**
			 * Doublefive Light Catcher.
			 */
			Hair44: { id: "1313936098220576829" },
			/**
			 * Hungry Pumpkin Hat.
			 */
			Hair45: { id: "1313936103581155329" },
			/**
			 * Confetti Cousin.
			 */
			Hair46: { id: "1313936113240375408" },
			/**
			 * Sparkler Parent.
			 */
			Hair47: { id: "1313936131611430962" },
			/**
			 * Days of Feast 2019.
			 */
			Hair48: { id: "1313936117409517618" },
			/**
			 * Festival Spin Dancer.
			 */
			Hair49: { id: "1313936126825730048" },
			/**
			 * Troupe Juggler.
			 */
			Hair50: { id: "1313936120496521348" },
			/**
			 * Respectful Pianist.
			 */
			Hair51: { id: "1313936265078509708" },
			/**
			 * Rhythm Guide (ultimate).
			 */
			Hair52: { id: "1313936259701280808" },
			/**
			 * Nodding Muralist.
			 */
			Hair53: { id: "1313936269633654935" },
			/**
			 * Scarecrow Farmer.
			 */
			Hair54: { id: "1313936290848182333" },
			/**
			 * Snoozing Carpenter.
			 */
			Hair55: { id: "1313936284397338725" },
			/**
			 * Crab Walker.
			 */
			Hair56: { id: "1313936323270279250" },
			/**
			 * Indifferent Alchemist.
			 */
			Hair57: { id: "1313936255783927881" },
			/**
			 * Playfighting Herbalist.
			 */
			Hair58: { id: "1313936252315369552" },
			/**
			 * Enchantment Ultimate.
			 */
			Hair59: { id: "1313936250759151616" },
			/**
			 * Jelly Whisperer.
			 */
			Hair60: { id: "1313936253879845025" },
			/**
			 * Timid Bookworm.
			 */
			Hair61: { id: "1313936273190420650" },
			/**
			 * Rallying Thrillseeker.
			 */
			Hair62: { id: "1313936267691688109" },
			/**
			 * Hiking Grouch.
			 */
			Hair63: { id: "1313936282715689020" },
			/**
			 * Grateful Shell Collector.
			 */
			Hair64: { id: "1313936262943739985" },
			/**
			 * Prophet of Water.
			 */
			Hair65: { id: "1313936257616969869" },
			/**
			 * Prophet of Earth.
			 */
			Hair66: { id: "1313936297047494699" },
			/**
			 * Prophet of Air.
			 */
			Hair67: { id: "1313936306379948106" },
			/**
			 * Prophet of Fire.
			 */
			Hair68: { id: "1313936266735386624" },
			/**
			 * Mischief Witch Hat.
			 */
			Hair69: { id: "1313936326504091658" },
			/**
			 * Bearhug Hermit.
			 */
			Hair70: { id: "1313936271554642023" },
			/**
			 * Dancing Performer.
			 */
			Hair71: { id: "1313936261316218891" },
			/**
			 * Spinning Mentor.
			 */
			Hair72: { id: "1313936279552921741" },
			/**
			 * Days of Fortune 2021 1.
			 */
			Hair73: { id: "1313936275526647830" },
			/**
			 * Days of Fortune Wool Hat.
			 */
			Hair74: { id: "1313936287094411425" },
			/**
			 * Days of Fortune 2021 2.
			 */
			Hair75: { id: "1313936277741244477" },
			/**
			 * Days of Bloom 2021.
			 */
			Hair76: { id: "1313936288956813362" },
			/**
			 * Assembly Guide (ultimate).
			 */
			Hair77: { id: "1313936285647241348" },
			/**
			 * Daydream Forester.
			 */
			Hair78: { id: "1313936329016610886" },
			/**
			 * Marching Adventurer.
			 */
			Hair79: { id: "1313936280526127216" },
			/**
			 * Baffled Botanist.
			 */
			Hair80: { id: "1313936274272288820" },
			/**
			 * Scolding Student.
			 */
			Hair81: { id: "1313936294077796514" },
			/**
			 * Scaredy Cadet.
			 */
			Hair82: { id: "1313936303192277044" },
			/**
			 * Rainbow Hat.
			 */
			Hair83: { id: "1313936298720891012" },
			/**
			 * Nintendo Switch.
			 */
			Hair84: { id: "1313936315682656338" },
			/**
			 * Slouching Soldier.
			 */
			Hair85: { id: "1313936327749668945" },
			/**
			 * Gloating Narcissist.
			 */
			Hair86: { id: "1313936301271158884" },
			/**
			 * Stretching Lamplighter.
			 */
			Hair87: { id: "1313936292337160333" },
			/**
			 * Beckoning Ruler.
			 */
			Hair88: { id: "1313936312436264970" },
			/**
			 * Sneezing Geographer.
			 */
			Hair89: { id: "1313936295583813733" },
			/**
			 * The Rose (ultimate).
			 */
			Hair90: { id: "1313936308216791090" },
			/**
			 * Talented Builder.
			 */
			Hair91: { id: "1313936330430087229" },
			/**
			 * Tinkering Chimesmith.
			 */
			Hair92: { id: "1313936317322629170" },
			/**
			 * Light Whisperer.
			 */
			Hair93: { id: "1313936304777592883" },
			/**
			 * Lively Navigator.
			 */
			Hair94: { id: "1313936309404041258" },
			/**
			 * Mischief Witch Hair.
			 */
			Hair95: { id: "1313936322255257700" },
			/**
			 * Mischief Spider Quiff.
			 */
			Hair96: { id: "1313936314189611109" },
			/**
			 * Winter Feast Hat.
			 */
			Hair97: { id: "1313936319000481802" },
			/**
			 * Cackling Cannoneer.
			 */
			Hair98: { id: "1313936324817977374" },
			/**
			 * Ceasing Commodore.
			 */
			Hair99: { id: "1313936320648839310" },
			/**
			 * Anxious Angler.
			 */
			Hair100: { id: "1313936299702485024" },
			/**
			 * Days of Fortune 2022 1.
			 */
			Hair101: { id: "1313936447354703974" },
			/**
			 * Kizuna AI.
			 */
			Hair102: { id: "1313936460818415710" },
			/**
			 * Performance Guide (ultimate).
			 */
			Hair103: { id: "1313936473766236162" },
			/**
			 * Modest Dancer.
			 */
			Hair104: { id: "1313936441893584937" },
			/**
			 * Frantic Stagehand.
			 */
			Hair105: { id: "1313936449539805237" },
			/**
			 * Forgetful Storyteller.
			 */
			Hair106: { id: "1313936467822776460" },
			/**
			 * Mellow Musician.
			 */
			Hair107: { id: "1313936444892512398" },
			/**
			 * Ancient Darkness (dragon).
			 */
			Hair108: { id: "1313936472239247450" },
			/**
			 * Ancient Light (manta).
			 */
			Hair109: { id: "1313936450525462569" },
			/**
			 * Ancient Light (jellyfish).
			 */
			Hair110: { id: "1313936459279110246" },
			/**
			 * Seed of Hope.
			 */
			Hair111: { id: "1313936454283694181" },
			/**
			 * Running Wayfarer.
			 */
			Hair112: { id: "1313936452585001161" },
			/**
			 * Warrior of Love.
			 */
			Hair113: { id: "1313936457341079562" },
			/**
			 * Mindful Miner.
			 */
			Hair114: { id: "1313936482783727707" },
			/**
			 * Runaway Hairstyle.
			 */
			Hair115: { id: "1313936464253423638" },
			/**
			 * AURORA (ultimate).
			 */
			Hair116: { id: "1313936443323842631" },
			/**
			 * Mischief Tufted Hair.
			 */
			Hair117: { id: "1313936506758500382" },
			/**
			 * PlayStation.
			 */
			Hair118: { id: "1313936465931141131" },
			/**
			 * Pleading Child.
			 */
			Hair119: { id: "1313936455571083396" },
			/**
			 * Bereft Veteran.
			 */
			Hair120: { id: "1313936479365496852" },
			/**
			 * Tiptoeing Tea-Brewer.
			 */
			Hair121: { id: "1313936494724907058" },
			/**
			 * Tumbling Troublemaker.
			 */
			Hair122: { id: "1313936504971726898" },
			/**
			 * Melancholy Mope.
			 */
			Hair123: { id: "1313936475787759656" },
			/**
			 * Overactive Overachiever.
			 */
			Hair124: { id: "1313936487783338188" },
			/**
			 * Oddball Outcast.
			 */
			Hair125: { id: "1313936440274718742" },
			/**
			 * Marching Band Hat.
			 */
			Hair126: { id: "1313936490098856019" },
			/**
			 * Nightbird Whisperer.
			 */
			Hair127: { id: "1313936463074820116" },
			/**
			 * Ascetic Monk.
			 */
			Hair128: { id: "1313936493101977761" },
			/**
			 * Jolly Geologist.
			 */
			Hair129: { id: "1313936469429325845" },
			/**
			 * Vestige of a Deserted Oasis.
			 */
			Hair130: { id: "1313936470972698734" },
			/**
			 * Memory of a Lost Village.
			 */
			Hair131: { id: "1313936499166810112" },
			/**
			 * Hopeful Steward (ultimate).
			 */
			Hair132: { id: "1313936491851812896" },
			/**
			 * Hopeful Steward (non-ultimate).
			 */
			Hair133: { id: "1313936502354612285" },
			/**
			 * Base 2.
			 */
			Hair134: { id: "1313936486378246285" },
			/**
			 * Base 3.
			 */
			Hair135: { id: "1313936477616345118" },
			/**
			 * Spirit of Mural (ultimate).
			 */
			Hair136: { id: "1313936481005473854" },
			/**
			 * Herb Gatherer.
			 */
			Hair137: { id: "1313936497795141653" },
			/**
			 * Hunter.
			 */
			Hair138: { id: "1313936484662775829" },
			/**
			 * Princess.
			 */
			Hair139: { id: "1313936496373534893" },
			/**
			 * Bloom Spiky Sprig Hair.
			 */
			Hair140: { id: "1313936500844400782" },
			/**
			 * Bloom Arum Petal Hair.
			 */
			Hair141: { id: "1313936507999879179" },
			/**
			 * Nesting Atrium.
			 */
			Hair142: { id: "1313936529529503744" },
			/**
			 * Cinnamoroll Pop-Up Cafe Combo.
			 */
			Hair143: { id: "1313936525007917088" },
			/**
			 * Nature Wave-Touched Hair.
			 */
			Hair144: { id: "1313936528279343177" },
			/**
			 * Colour Glam Cut.
			 */
			Hair145: { id: "1313936521262530671" },
			/**
			 * The Cellist's Beginnings.
			 */
			Hair146: { id: "1313936519681146920" },
			/**
			 * The Pianist's Beginnings.
			 */
			Hair147: { id: "1313936526983434330" },
			/**
			 * Tournament Curls.
			 */
			Hair148: { id: "1313936518313672766" },
			/**
			 * Moonlight Updo.
			 */
			Hair149: { id: "1313936509530935387" },
			/**
			 * Comfort of Kindness.
			 */
			Hair150: { id: "1313936510550147145" },
			/**
			 * Spirit of Adventure.
			 */
			Hair151: { id: "1313936669644427365" },
			/**
			 * Mischief Spider Bun.
			 */
			Hair152: { id: "1313936667773505647" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Hair01: { id: "1313921255413383228" },
			Hair02: { id: "1313921248488853575" },
			Hair03: { id: "1313921287651065996" },
			Hair04: { id: "1313921238355152967" },
			Hair05: { id: "1313921230104956928" },
			Hair06: { id: "1313921228855050325" },
			Hair07: { id: "1313921261180817448" },
			Hair08: { id: "1313921285931401238" },
			Hair09: { id: "1313921231543730237" },
			Hair10: { id: "1313921257741353043" },
			Hair11: { id: "1313921239504392263" },
			Hair12: { id: "1313921250069970954" },
			Hair13: { id: "1313921268327907328" },
			Hair14: { id: "1313921269431009290" },
			Hair15: { id: "1313921237126479972" },
			Hair16: { id: "1313921244156133427" },
			Hair17: { id: "1313921263198273651" },
			Hair18: { id: "1313921227798216795" },
			Hair19: { id: "1313921256801960047" },
			Hair20: { id: "1313921221334925363" },
			Hair21: { id: "1313921224664944651" },
			Hair22: { id: "1313921223008321606" },
			Hair23: { id: "1313921235389911095" },
			Hair24: { id: "1313921262271070358" },
			Hair25: { id: "1313921247020847185" },
			Hair26: { id: "1313921225839480955" },
			Hair27: { id: "1313921234723012648" },
			Hair28: { id: "1313921233141760050" },
			Hair29: { id: "1313921240649564160" },
			Hair30: { id: "1313921291161571479" },
			Hair31: { id: "1313921252788015124" },
			Hair32: { id: "1313921264959754341" },
			Hair33: { id: "1313921272383668235" },
			Hair34: { id: "1313921274472431626" },
			Hair35: { id: "1313921253941448835" },
			Hair36: { id: "1313921251324203109" },
			Hair37: { id: "1313921292486967397" },
			Hair38: { id: "1313921290117185627" },
			Hair39: { id: "1313921276078981130" },
			Hair40: { id: "1313921259649892373" },
			Hair41: { id: "1313921284022734868" },
			Hair42: { id: "1313921277324562492" },
			Hair43: { id: "1313921282525630495" },
			Hair44: { id: "1313921281053163622" },
			Hair45: { id: "1313921270899019786" },
			Hair46: { id: "1313921278721396797" },
			Hair47: { id: "1313921288837795882" },
			Hair48: { id: "1313921241559601164" },
			Hair49: { id: "1313921266566303765" },
			Hair50: { id: "1313921245502378016" },
			Hair51: { id: "1313921391849902191" },
			Hair52: { id: "1313921441435222139" },
			Hair53: { id: "1313921439862358077" },
			Hair54: { id: "1313921463836868649" },
			Hair55: { id: "1313921446061412363" },
			Hair56: { id: "1313921429259157626" },
			Hair57: { id: "1313921438503272449" },
			Hair58: { id: "1313921397613002812" },
			Hair59: { id: "1313921430802530376" },
			Hair60: { id: "1313921393057857632" },
			Hair61: { id: "1313921423013707817" },
			Hair62: { id: "1313921404592328735" },
			Hair63: { id: "1313921405242576997" },
			Hair64: { id: "1313921416999080057" },
			Hair65: { id: "1313921414100815922" },
			Hair66: { id: "1313921412980932638" },
			Hair67: { id: "1313921400989421599" },
			Hair68: { id: "1313921394588909578" },
			Hair69: { id: "1313921444329164873" },
			Hair70: { id: "1313921390088290384" },
			Hair71: { id: "1313921406823829606" },
			Hair72: { id: "1313921464994369557" },
			Hair73: { id: "1313921420174037094" },
			Hair74: { id: "1313921447588003941" },
			Hair75: { id: "1313921455670558783" },
			Hair76: { id: "1313921449039495331" },
			Hair77: { id: "1313921399110242508" },
			Hair78: { id: "1313921442865348628" },
			Hair79: { id: "1313921403451478126" },
			Hair80: { id: "1313921468962439329" },
			Hair81: { id: "1313921395675238432" },
			Hair82: { id: "1313921418131673144" },
			Hair83: { id: "1313921421704958052" },
			Hair84: { id: "1313921409592070254" },
			Hair85: { id: "1313921452931809280" },
			Hair86: { id: "1313921458891788439" },
			Hair87: { id: "1313921415749177415" },
			Hair88: { id: "1313921470501486684" },
			Hair89: { id: "1313921402042323017" },
			Hair90: { id: "1313921466147930222" },
			Hair91: { id: "1313921450758901780" },
			Hair92: { id: "1313921408090243133" },
			Hair93: { id: "1313921460632424539" },
			Hair94: { id: "1313921454177255506" },
			Hair95: { id: "1313921457365061673" },
			Hair96: { id: "1313921462377123845" },
			Hair97: { id: "1313921451878780989" },
			Hair98: { id: "1313921437173678090" },
			Hair99: { id: "1313921467292979398" },
			Hair100: { id: "1313921472246317106" },
			Hair101: { id: "1313921685145260103" },
			Hair102: { id: "1313921712647180289" },
			Hair103: { id: "1313921692820705432" },
			Hair104: { id: "1313921678425985034" },
			Hair105: { id: "1313921676093947997" },
			Hair106: { id: "1313921747145199769" },
			Hair107: { id: "1313921673791016974" },
			Hair108: { id: "1313921681353343087" },
			Hair109: { id: "1313921720499048572" },
			Hair110: { id: "1313921722247811092" },
			Hair111: { id: "1313921736051261504" },
			Hair112: { id: "1313921679466168434" },
			Hair113: { id: "1313921688471207986" },
			Hair114: { id: "1313921759623512135" },
			Hair115: { id: "1313921728094670868" },
			Hair116: { id: "1313921706317840435" },
			Hair117: { id: "1313921737989165157" },
			Hair118: { id: "1313921716753272854" },
			Hair119: { id: "1313921683027005484" },
			Hair120: { id: "1313921696406700143" },
			Hair121: { id: "1313921690459443332" },
			Hair122: { id: "1313921705042907216" },
			Hair123: { id: "1313921743492091916" },
			Hair124: { id: "1313921701674745887" },
			Hair125: { id: "1313921739373285478" },
			Hair126: { id: "1313921754292424756" },
			Hair127: { id: "1313921729915125873" },
			Hair128: { id: "1313921745253826603" },
			Hair129: { id: "1313921751129788456" },
			Hair130: { id: "1313921698038550679" },
			Hair131: { id: "1313921734604488835" },
			Hair132: { id: "1313921756058353714" },
			Hair133: { id: "1313921703008796704" },
			Hair134: { id: "1313921731991179265" },
			Hair135: { id: "1313921752937660488" },
			Hair136: { id: "1313921726207234119" },
			Hair137: { id: "1313921714874351736" },
			Hair138: { id: "1313921708171722803" },
			Hair139: { id: "1313921699674062909" },
			Hair140: { id: "1313921742002978917" },
			Hair141: { id: "1313921757987602503" },
			Hair142: { id: "1313921686659399711" },
			Hair143: { id: "1313921709585207348" },
			Hair144: { id: "1313921740799217736" },
			Hair145: { id: "1313921718783316200" },
			Hair146: { id: "1313921748470726777" },
			Hair147: { id: "1313921694611673170" },
			Hair148: { id: "1313921711254798456" },
			Hair149: { id: "1313921749506723871" },
			Hair150: { id: "1313921723661291622" },
			Hair151: { id: "1313921883309342780" },
			Hair152: { id: "1313921884773023744" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type HairEmojis = (typeof HAIR_EMOJIS)[keyof typeof HAIR_EMOJIS];

/**
 * Emojis from the hair accessory server.
 */
export const HAIR_ACCESSORY_EMOJIS = PRODUCTION
	? ({
			/**
			 * Days of Healing.
			 */
			HairAccessory01: { id: "1313936937643540571" },
			/**
			 * Chill Sunbather.
			 */
			HairAccessory02: { id: "1313936927291871262" },
			/**
			 * First Sky Anniversary.
			 */
			HairAccessory03: { id: "1313936929779093535" },
			/**
			 * Days of Fortune Orange.
			 */
			HairAccessory04: { id: "1313936925387657260" },
			/**
			 * Days of Rainbow 2021.
			 */
			HairAccessory05: { id: "1313936962956165190" },
			/**
			 * Second Sky Anniversary.
			 */
			HairAccessory06: { id: "1313936932467904612" },
			/**
			 * Summer Hat.
			 */
			HairAccessory07: { id: "1313936943591067740" },
			/**
			 * Summer Shell Hair Pin.
			 */
			HairAccessory08: { id: "1313936946892116028" },
			/**
			 * Bunny Accessory.
			 */
			HairAccessory09: { id: "1313937002487349298" },
			/**
			 * Light Whisperer.
			 */
			HairAccessory10: { id: "1313937000411168839" },
			/**
			 * Tinkering Chimesmith.
			 */
			HairAccessory11: { id: "1313936991460786196" },
			/**
			 * Lively Navigator.
			 */
			HairAccessory12: { id: "1313936956626833462" },
			/**
			 * Flight Guide (ultimate).
			 */
			HairAccessory13: { id: "1313936980454674504" },
			/**
			 * Snowflake Hair Accessory.
			 */
			HairAccessory14: { id: "1313936965804097588" },
			/**
			 * Bumbling Boatswain.
			 */
			HairAccessory15: { id: "1313936979079073792" },
			/**
			 * Days of Fortune Fish Accessory.
			 */
			HairAccessory16: { id: "1313936935558844469" },
			/**
			 * Days of Love Flower Crown.
			 */
			HairAccessory17: { id: "1313936945163796550" },
			/**
			 * Kizuna AI.
			 */
			HairAccessory18: { id: "1313936957956685854" },
			/**
			 * Nature Coral Crown.
			 */
			HairAccessory19: { id: "1313936933885313104" },
			/**
			 * Harmony Hall Grand Opening.
			 */
			HairAccessory20: { id: "1313936984263098439" },
			/**
			 * Days of Rainbow 2022.
			 */
			HairAccessory21: { id: "1313936976122216458" },
			/**
			 * Ancient Darkness (plant).
			 */
			HairAccessory22: { id: "1313936968031404032" },
			/**
			 * Ancient Light (jellyfish).
			 */
			HairAccessory23: { id: "1313936953099419688" },
			/**
			 * Third Sky Anniversary.
			 */
			HairAccessory24: { id: "1313936954664026142" },
			/**
			 * Reassuring Ranger.
			 */
			HairAccessory25: { id: "1313937004215537734" },
			/**
			 * Nightbird Whisperer.
			 */
			HairAccessory26: { id: "1313936973353713734" },
			/**
			 * Moments Guide (ultimate).
			 */
			HairAccessory27: { id: "1313936990168809543" },
			/**
			 * Fourth Sky Anniversary.
			 */
			HairAccessory28: { id: "1313937005754716160" },
			/**
			 * Days of Style 2023.
			 */
			HairAccessory29: { id: "1313936971889901650" },
			/**
			 * Echo of an Abandoned Refuge.
			 */
			HairAccessory30: { id: "1313936941393121330" },
			/**
			 * Remnant of a Forgotten Haven.
			 */
			HairAccessory31: { id: "1313936970585477151" },
			/**
			 * Mischief Crabkin Accessory.
			 */
			HairAccessory32: { id: "1313936959927750728" },
			/**
			 * Moth Appreciation.
			 */
			HairAccessory33: { id: "1313936997395730442" },
			/**
			 * Winter Pine Cone Hair Clip.
			 */
			HairAccessory34: { id: "1313936939811864586" },
			/**
			 * Spirit of Mural (non-ultimate).
			 */
			HairAccessory35: { id: "1313936977963389110" },
			/**
			 * Feudal Lord.
			 */
			HairAccessory36: { id: "1313936942315864168" },
			/**
			 * Love Heart Beret.
			 */
			HairAccessory37: { id: "1313936994300330146" },
			/**
			 * Nesting Nook.
			 */
			HairAccessory38: { id: "1313936948175310940" },
			/**
			 * Cinnamoroll Pop-Up Cafe Mini Companion.
			 */
			HairAccessory39: { id: "1313936995512356925" },
			/**
			 * Cinnamoroll Pop-Up Cafe Combo.
			 */
			HairAccessory40: { id: "1313936951706910773" },
			/**
			 * Cosy Teacup Headband.
			 */
			HairAccessory41: { id: "1313936969432039466" },
			/**
			 * SkyFest 5th Anniversary Headband.
			 */
			HairAccessory42: { id: "1313936964210266122" },
			/**
			 * SkyFest Oreo Headband.
			 */
			HairAccessory43: { id: "1313936985789829200" },
			/**
			 * Tournament Golden Garland.
			 */
			HairAccessory44: { id: "1313936992681332829" },
			/**
			 * Moonlight Blossom Accessory.
			 */
			HairAccessory45: { id: "1313936987568209981" },
			/**
			 * Style Darkness Fascinator.
			 */
			HairAccessory46: { id: "1313936982144978995" },
			/**
			 * Pointed Snufkin Hat.
			 */
			HairAccessory47: { id: "1313936949656027219" },
			/**
			 * Moomintroll Ears.
			 */
			HairAccessory48: { id: "1313936998830047282" },
			/**
			 * Sense of Self.
			 */
			HairAccessory49: { id: "1313936961555267628" },
			/**
			 * Inspiration of Inclusion.
			 */
			HairAccessory50: { id: "1313936974675181639" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			HairAccessory01: { id: "1313922070463385641" },
			HairAccessory02: { id: "1313922117904892074" },
			HairAccessory03: { id: "1313922072296296568" },
			HairAccessory04: { id: "1313922083897475103" },
			HairAccessory05: { id: "1313922068756299827" },
			HairAccessory06: { id: "1313922097407328420" },
			HairAccessory07: { id: "1313922086368182384" },
			HairAccessory08: { id: "1313922111483674676" },
			HairAccessory09: { id: "1313922126071464036" },
			HairAccessory10: { id: "1313922124364251227" },
			HairAccessory11: { id: "1313922082425274441" },
			HairAccessory12: { id: "1313922151354601613" },
			HairAccessory13: { id: "1313922095360639026" },
			HairAccessory14: { id: "1313922137030922271" },
			HairAccessory15: { id: "1313922142664130611" },
			HairAccessory16: { id: "1313922073558650880" },
			HairAccessory17: { id: "1313922114633334794" },
			HairAccessory18: { id: "1313922113240961064" },
			HairAccessory19: { id: "1313922106827866283" },
			HairAccessory20: { id: "1313922077190787145" },
			HairAccessory21: { id: "1313922090591584286" },
			HairAccessory22: { id: "1313922079036538920" },
			HairAccessory23: { id: "1313922115841294376" },
			HairAccessory24: { id: "1313922084698587197" },
			HairAccessory25: { id: "1313922120216215684" },
			HairAccessory26: { id: "1313922092529356800" },
			HairAccessory27: { id: "1313922100997918750" },
			HairAccessory28: { id: "1313922139308687490" },
			HairAccessory29: { id: "1313922144773738557" },
			HairAccessory30: { id: "1313922128369684522" },
			HairAccessory31: { id: "1313922133579005982" },
			HairAccessory32: { id: "1313922080437440625" },
			HairAccessory33: { id: "1313922094152814622" },
			HairAccessory34: { id: "1313922075429310474" },
			HairAccessory35: { id: "1313922132241027224" },
			HairAccessory36: { id: "1313922110220931165" },
			HairAccessory37: { id: "1313922146162049097" },
			HairAccessory38: { id: "1313922108375695370" },
			HairAccessory39: { id: "1313922119096205383" },
			HairAccessory40: { id: "1313922089316515972" },
			HairAccessory41: { id: "1313922135529619487" },
			HairAccessory42: { id: "1313922088188383365" },
			HairAccessory43: { id: "1313922121281572915" },
			HairAccessory44: { id: "1313922099198562454" },
			HairAccessory45: { id: "1313922122732535959" },
			HairAccessory46: { id: "1313922130798444615" },
			HairAccessory47: { id: "1313922140797669487" },
			HairAccessory48: { id: "1313922147399241879" },
			HairAccessory49: { id: "1313922153497759754" },
			HairAccessory50: { id: "1313922149366632479" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type HairAccessoryEmojis = (typeof HAIR_ACCESSORY_EMOJIS)[keyof typeof HAIR_ACCESSORY_EMOJIS];

/**
 * Emojis from the cape servers.
 */
export const CAPE_EMOJIS = PRODUCTION
	? ({
			/**
			 * Base.
			 */
			Cape01: { id: "1313937172839010304" },
			/**
			 * Beta.
			 */
			Cape02: { id: "1313937182641098754" },
			/**
			 * Starter Pack.
			 */
			Cape03: { id: "1313937177411059863" },
			/**
			 * Butterfly Charmer 1.
			 */
			Cape04: { id: "1313937180401467412" },
			/**
			 * Pouty Porter 1.
			 */
			Cape05: { id: "1313937174382772244" },
			/**
			 * Dismayed Hunter 1.
			 */
			Cape06: { id: "1313937175901110302" },
			/**
			 * Proud Victor 1.
			 */
			Cape07: { id: "1313937179101237368" },
			/**
			 * Handstanding Thrillseeker 1.
			 */
			Cape08: { id: "1313937190916591666" },
			/**
			 * Courageous Soldier 1.
			 */
			Cape09: { id: "1313937193521250486" },
			/**
			 * Stealthy Survivor 1.
			 */
			Cape10: { id: "1313937198927708271" },
			/**
			 * Praying Acolyte 1.
			 */
			Cape11: { id: "1313937186671951872" },
			/**
			 * Memory Whisperer 1.
			 */
			Cape12: { id: "1313937184566280203" },
			/**
			 * Saluting Protector.
			 */
			Cape13: { id: "1313937188530159616" },
			/**
			 * Stretching Guru.
			 */
			Cape14: { id: "1313937181504438413" },
			/**
			 * Founder's Pack.
			 */
			Cape15: { id: "1313937225494560819" },
			/**
			 * Crab Whisperer.
			 */
			Cape16: { id: "1313937192506363924" },
			/**
			 * Piggyback Lightseeker.
			 */
			Cape17: { id: "1313937239058812959" },
			/**
			 * Shushing Light Scholar.
			 */
			Cape18: { id: "1313937196050415647" },
			/**
			 * Spooky Bat Cape.
			 */
			Cape19: { id: "1313937230691041340" },
			/**
			 * Confetti Cousin.
			 */
			Cape20: { id: "1313937251763486841" },
			/**
			 * Pleaful Parent.
			 */
			Cape21: { id: "1313937214400626820" },
			/**
			 * Wise Grandparent.
			 */
			Cape22: { id: "1313937209480712264" },
			/**
			 * Troupe Juggler.
			 */
			Cape23: { id: "1313937194867626005" },
			/**
			 * Thoughtful Director.
			 */
			Cape24: { id: "1313937212542554133" },
			/**
			 * Crab Walker.
			 */
			Cape25: { id: "1313937206074937415" },
			/**
			 * Snoozing Carpenter.
			 */
			Cape26: { id: "1313937200047722604" },
			/**
			 * Indifferent Alchemist.
			 */
			Cape27: { id: "1313937207643345047" },
			/**
			 * Playfighting Herbalist.
			 */
			Cape28: { id: "1313937248349323336" },
			/**
			 * Earth Cape.
			 */
			Cape29: { id: "1313937189331275850" },
			/**
			 * Timid Bookworm.
			 */
			Cape30: { id: "1313937215650529470" },
			/**
			 * Sanctuary Guide (ultimate).
			 */
			Cape31: { id: "1313937201716789331" },
			/**
			 * Grateful Shell Collector.
			 */
			Cape32: { id: "1313937222025871532" },
			/**
			 * Chill Sunbather.
			 */
			Cape33: { id: "1313937247309140048" },
			/**
			 * Prophet of Air.
			 */
			Cape34: { id: "1313937197308838003" },
			/**
			 * Prophet of Water.
			 */
			Cape35: { id: "1313937203583389727" },
			/**
			 * Prophet of Earth.
			 */
			Cape36: { id: "1313937220565995612" },
			/**
			 * Mischief Web Cape.
			 */
			Cape37: { id: "1313937204841808012" },
			/**
			 * Butterfly Charmer 2.
			 */
			Cape38: { id: "1313937245576892416" },
			/**
			 * Pouty Porter 2.
			 */
			Cape39: { id: "1313937211166822491" },
			/**
			 * Proud Victor 2.
			 */
			Cape40: { id: "1313937216916947065" },
			/**
			 * Days of Feast 2020.
			 */
			Cape41: { id: "1313937241474728056" },
			/**
			 * Snowflake Cape.
			 */
			Cape42: { id: "1313937236085178458" },
			/**
			 * Peeking Postman.
			 */
			Cape43: { id: "1313937228342366218" },
			/**
			 * Dancing Performer.
			 */
			Cape44: { id: "1313937233769795755" },
			/**
			 * Spinning Mentor.
			 */
			Cape45: { id: "1313937218540408953" },
			/**
			 * Dreams Guide (ultimate).
			 */
			Cape46: { id: "1313937237456584786" },
			/**
			 * Courageous Soldier 2.
			 */
			Cape47: { id: "1313937250530361374" },
			/**
			 * Praying Acolyte 2.
			 */
			Cape48: { id: "1313937226719035422" },
			/**
			 * Days of Fortune 2021.
			 */
			Cape49: { id: "1313937243479605362" },
			/**
			 * Dismayed Hunter 2.
			 */
			Cape50: { id: "1313937224177287270" },
			/**
			 * Days of Bloom 2021.
			 */
			Cape51: { id: "1313937404255797248" },
			/**
			 * Assembly Guide (ultimate).
			 */
			Cape52: { id: "1313937400514478191" },
			/**
			 * Scolding Student.
			 */
			Cape53: { id: "1313937450825158668" },
			/**
			 * Ocean Cape.
			 */
			Cape54: { id: "1313937402116440156" },
			/**
			 * Handstanding Thrillseeker 2.
			 */
			Cape55: { id: "1313937454167883869" },
			/**
			 * Rainbow cape.
			 */
			Cape56: { id: "1313937410870083684" },
			/**
			 * Nintendo Switch (red).
			 */
			Cape57: { id: "1313937420303073320" },
			/**
			 * Nintendo Switch (blue).
			 */
			Cape58: { id: "1313937436853665812" },
			/**
			 * Star Collector.
			 */
			Cape59: { id: "1313937416637255782" },
			/**
			 * Slouching Soldier.
			 */
			Cape60: { id: "1313937424958754896" },
			/**
			 * Stretching Lamplighter.
			 */
			Cape61: { id: "1313937421997445150" },
			/**
			 * Sneezing Geographer.
			 */
			Cape62: { id: "1313937407497867275" },
			/**
			 * Little Prince Scarf Cape.
			 */
			Cape63: { id: "1313937418814226534" },
			/**
			 * Little Prince Asteroid Jacket.
			 */
			Cape64: { id: "1313937433427185759" },
			/**
			 * Light Whisperer.
			 */
			Cape65: { id: "1313937406038380564" },
			/**
			 * Lively Navigator.
			 */
			Cape66: { id: "1313937423708852275" },
			/**
			 * Mischief Withered Cape.
			 */
			Cape67: { id: "1313937442386214912" },
			/**
			 * Winter Ancestor Cape.
			 */
			Cape68: { id: "1313937438523002940" },
			/**
			 * Ceasing Commodore.
			 */
			Cape69: { id: "1313937415639011418" },
			/**
			 * Cackling Cannoneer.
			 */
			Cape70: { id: "1313937455505866762" },
			/**
			 * Anxious Angler.
			 */
			Cape71: { id: "1313937427034935296" },
			/**
			 * Bumbling Boatswain.
			 */
			Cape72: { id: "1313937465492504719" },
			/**
			 * Abyss Guide (ultimate).
			 */
			Cape73: { id: "1313937414292504740" },
			/**
			 * Days of Fortune 2022.
			 */
			Cape74: { id: "1313937477840408687" },
			/**
			 * Kizuna AI Cape.
			 */
			Cape75: { id: "1313937428469518396" },
			/**
			 * Purple Bloom Cape.
			 */
			Cape76: { id: "1313937445028364379" },
			/**
			 * Memory Whisperer 2.
			 */
			Cape77: { id: "1313937430163882014" },
			/**
			 * Performance Guide (ultimate).
			 */
			Cape78: { id: "1313937452184109180" },
			/**
			 * Forgetful Storyteller.
			 */
			Cape79: { id: "1313937457489645670" },
			/**
			 * Mellow Musician.
			 */
			Cape80: { id: "1313937467497513061" },
			/**
			 * Nature Turtle Cape.
			 */
			Cape81: { id: "1313937409100222524" },
			/**
			 * Stealthy Survivor 2.
			 */
			Cape82: { id: "1313937449533182033" },
			/**
			 * Ancient Darkness (plant).
			 */
			Cape83: { id: "1313937446693638224" },
			/**
			 * The Void of Shattering (ultimate 1).
			 */
			Cape84: { id: "1313937431682220042" },
			/**
			 * Ancient Light (jellyfish).
			 */
			Cape85: { id: "1313937474657062974" },
			/**
			 * Ancient Light (manta).
			 */
			Cape86: { id: "1313937439919833098" },
			/**
			 * The Void of Shattering (ultimate 2).
			 */
			Cape87: { id: "1313937412636016711" },
			/**
			 * Seed of Hope.
			 */
			Cape88: { id: "1313937470391451689" },
			/**
			 * Running Wayfarer.
			 */
			Cape89: { id: "1313937443887513761" },
			/**
			 * Warrior of Love.
			 */
			Cape90: { id: "1313937448107249706" },
			/**
			 * Mindful Miner.
			 */
			Cape91: { id: "1313937463923838986" },
			/**
			 * AURORA (ultimate).
			 */
			Cape92: { id: "1313937435243315200" },
			/**
			 * Days of Mischief 2022.
			 */
			Cape93: { id: "1313937462451638282" },
			/**
			 * PlayStation.
			 */
			Cape94: { id: "1313937461117976767" },
			/**
			 * Giving In Cape.
			 */
			Cape95: { id: "1313937459091865714" },
			/**
			 * Wings of AURORA.
			 */
			Cape96: { id: "1313937479123996732" },
			/**
			 * Cosy Hermit Cape.
			 */
			Cape97: { id: "1313937468910997534" },
			/**
			 * Bereft Veteran.
			 */
			Cape98: { id: "1313937471754604684" },
			/**
			 * Wounded Warrior.
			 */
			Cape99: { id: "1313937476074737735" },
			/**
			 * Tiptoeing Tea-Brewer.
			 */
			Cape100: { id: "1313937472958365756" },
			/**
			 * Red Bloom Cape.
			 */
			Cape101: { id: "1313937610896310312" },
			/**
			 * Tumbling Troublemaker.
			 */
			Cape102: { id: "1313937618462834849" },
			/**
			 * Overactive Overachiever.
			 */
			Cape103: { id: "1313937621344325654" },
			/**
			 * Passage Guide (ultimate).
			 */
			Cape104: { id: "1313937648204910672" },
			/**
			 * Nature School Cape.
			 */
			Cape105: { id: "1313937644027248640" },
			/**
			 * Dark Rainbow Cape.
			 */
			Cape106: { id: "1313937635588444221" },
			/**
			 * Reassuring Ranger.
			 */
			Cape107: { id: "1313937630412406795" },
			/**
			 * Sunlight Pink Beach Towel Cape.
			 */
			Cape108: { id: "1313937660947202079" },
			/**
			 * Sunlight Yellow Beach Towel Cape.
			 */
			Cape109: { id: "1313937636985016451" },
			/**
			 * Sunlight Blue Beach Towel Cape.
			 */
			Cape110: { id: "1313937638583177247" },
			/**
			 * Vestige of a Deserted Oasis.
			 */
			Cape111: { id: "1313937675614687313" },
			/**
			 * Echo of an Abandoned Refuge.
			 */
			Cape112: { id: "1313937623881875466" },
			/**
			 * Remnant of a Forgotten Haven.
			 */
			Cape113: { id: "1313937639791136882" },
			/**
			 * Memory of a Lost Village.
			 */
			Cape114: { id: "1313937627703148544" },
			/**
			 * Hopeful Steward (ultimate).
			 */
			Cape115: { id: "1313937658514509834" },
			/**
			 * Mischief Gossamer Cape.
			 */
			Cape116: { id: "1313937659848032366" },
			/**
			 * Mischief Crabula Cloak.
			 */
			Cape117: { id: "1313937619490439169" },
			/**
			 * Sparrow Appreciation.
			 */
			Cape118: { id: "1313937672187936818" },
			/**
			 * Moth Appreciation.
			 */
			Cape119: { id: "1313937632530530375" },
			/**
			 * Winter Quilted Cape.
			 */
			Cape120: { id: "1313937634212712538" },
			/**
			 * Spirit of Mural (ultimate).
			 */
			Cape121: { id: "1313937665443496046" },
			/**
			 * Hunter.
			 */
			Cape122: { id: "1313937629074423848" },
			/**
			 * Feudal Lord.
			 */
			Cape123: { id: "1313937646036451378" },
			/**
			 * Princess.
			 */
			Cape124: { id: "1313937625907855391" },
			/**
			 * Radiance of the Nine-Coloured Deer.
			 */
			Cape125: { id: "1313937670430392320" },
			/**
			 * Days of Fortune Dragon Stole.
			 */
			Cape126: { id: "1313937668991619093" },
			/**
			 * Days of Love Meteor Mantle.
			 */
			Cape127: { id: "1313937673806680134" },
			/**
			 * Bloom Arum Petal Cape.
			 */
			Cape128: { id: "1313937664143130688" },
			/**
			 * Nesting Loft.
			 */
			Cape129: { id: "1313937662264217641" },
			/**
			 * Cinnamoroll Pop-Up Cafe Cloud Cape.
			 */
			Cape130: { id: "1313937678126940210" },
			/**
			 * Nature Wave Pack.
			 */
			Cape131: { id: "1313937651283394612" },
			/**
			 * SkyFest Wireframe Cape.
			 */
			Cape132: { id: "1313937654949089291" },
			/**
			 * Duets Guide (ultimate).
			 */
			Cape133: { id: "1313937667431596183" },
			/**
			 * The Cellist's Flourishing.
			 */
			Cape134: { id: "1313937640831324181" },
			/**
			 * Sunlight Woven Wrap cape.
			 */
			Cape135: { id: "1313937653359448075" },
			/**
			 * Comfort of Kindness.
			 */
			Cape136: { id: "1313937642768826499" },
			/**
			 * Spirit of Adventure.
			 */
			Cape137: { id: "1313937656710955060" },
			/**
			 * Mischief Raven-Feathered Cloak.
			 */
			Cape138: { id: "1313937622560936022" },
			/**
			 * Marching Band Cape.
			 */
			Cape139: { id: "1313937650234691614" },
			/**
			 * Moominmamma's Masterpiece.
			 */
			Cape140: { id: "1315726083160543323" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Cape01: { id: "1313922301863133276" },
			Cape02: { id: "1313922337200013413" },
			Cape03: { id: "1313922361552011306" },
			Cape04: { id: "1313922370796388424" },
			Cape05: { id: "1313922320934633675" },
			Cape06: { id: "1313922294287962142" },
			Cape07: { id: "1313922303930798142" },
			Cape08: { id: "1313922296242507887" },
			Cape09: { id: "1313922299598078074" },
			Cape10: { id: "1313922319810433078" },
			Cape11: { id: "1313922355965198336" },
			Cape12: { id: "1313922307432906842" },
			Cape13: { id: "1313922318501941338" },
			Cape14: { id: "1313922368858492999" },
			Cape15: { id: "1313922373078220842" },
			Cape16: { id: "1313922332838072391" },
			Cape17: { id: "1313922357974536324" },
			Cape18: { id: "1313922340081635398" },
			Cape19: { id: "1313922367931813888" },
			Cape20: { id: "1313922298385797210" },
			Cape21: { id: "1313922345215328308" },
			Cape22: { id: "1313922359744528456" },
			Cape23: { id: "1313922354375688222" },
			Cape24: { id: "1313922341612421120" },
			Cape25: { id: "1313922348658983013" },
			Cape26: { id: "1313922383647866880" },
			Cape27: { id: "1313922351473364992" },
			Cape28: { id: "1313922338839855197" },
			Cape29: { id: "1313922305763835955" },
			Cape30: { id: "1313922323639959572" },
			Cape31: { id: "1313922330589794486" },
			Cape32: { id: "1313922316626952334" },
			Cape33: { id: "1313922347094249592" },
			Cape34: { id: "1313922315704205403" },
			Cape35: { id: "1313922325133000774" },
			Cape36: { id: "1313922326990946315" },
			Cape37: { id: "1313922352702033921" },
			Cape38: { id: "1313922380950929500" },
			Cape39: { id: "1313922334930763858" },
			Cape40: { id: "1313922379193516194" },
			Cape41: { id: "1313922376953499721" },
			Cape42: { id: "1313922328085921915" },
			Cape43: { id: "1313922322448519188" },
			Cape44: { id: "1313922349984383039" },
			Cape45: { id: "1313922343151599648" },
			Cape46: { id: "1313922366438637678" },
			Cape47: { id: "1313922374978113546" },
			Cape48: { id: "1313922382527725669" },
			Cape49: { id: "1313922363686912151" },
			Cape50: { id: "1313922308955570308" },
			Cape51: { id: "1313922458298093568" },
			Cape52: { id: "1313922463414878248" },
			Cape53: { id: "1313922537356398682" },
			Cape54: { id: "1313922487964270646" },
			Cape55: { id: "1313922453726036050" },
			Cape56: { id: "1313922455701557279" },
			Cape57: { id: "1313922460348846211" },
			Cape58: { id: "1313922467294740521" },
			Cape59: { id: "1313922503860551762" },
			Cape60: { id: "1313922502350864494" },
			Cape61: { id: "1313922500165632092" },
			Cape62: { id: "1313922518125510688" },
			Cape63: { id: "1313922506951757915" },
			Cape64: { id: "1313922471010893824" },
			Cape65: { id: "1313922505571962901" },
			Cape66: { id: "1313922497174962211" },
			Cape67: { id: "1313922511464824883" },
			Cape68: { id: "1313922492380872847" },
			Cape69: { id: "1313922473686732904" },
			Cape70: { id: "1313922485871185930" },
			Cape71: { id: "1313922469006147729" },
			Cape72: { id: "1313922465293930657" },
			Cape73: { id: "1313922475163127890" },
			Cape74: { id: "1313922523565527092" },
			Cape75: { id: "1313922520277192725" },
			Cape76: { id: "1313922461997465610" },
			Cape77: { id: "1313922472785215522" },
			Cape78: { id: "1313922478082490490" },
			Cape79: { id: "1313922476530729032" },
			Cape80: { id: "1313922530960212079" },
			Cape81: { id: "1313922510324240435" },
			Cape82: { id: "1313922484235538532" },
			Cape83: { id: "1313922508860162088" },
			Cape84: { id: "1313922479479328880" },
			Cape85: { id: "1313922491130839090" },
			Cape86: { id: "1313922522118488187" },
			Cape87: { id: "1313922498496172103" },
			Cape88: { id: "1313922535133286470" },
			Cape89: { id: "1313922494087958528" },
			Cape90: { id: "1313922456230170666" },
			Cape91: { id: "1313922525482319972" },
			Cape92: { id: "1313922527260708916" },
			Cape93: { id: "1313922482587041802" },
			Cape94: { id: "1313922516699447347" },
			Cape95: { id: "1313922489985929236" },
			Cape96: { id: "1313922532726014042" },
			Cape97: { id: "1313922529366249623" },
			Cape98: { id: "1313922481194664007" },
			Cape99: { id: "1313922495774199888" },
			Cape100: { id: "1313922533954945075" },
			Cape101: { id: "1313922682164744273" },
			Cape102: { id: "1313922647750611055" },
			Cape103: { id: "1313922659821682750" },
			Cape104: { id: "1313922707477495808" },
			Cape105: { id: "1313922711290118246" },
			Cape106: { id: "1313922660752687230" },
			Cape107: { id: "1313922662489395271" },
			Cape108: { id: "1313922649788776449" },
			Cape109: { id: "1313922651596783687" },
			Cape110: { id: "1313922664431091743" },
			Cape111: { id: "1313922653119316019" },
			Cape112: { id: "1313922709171732600" },
			Cape113: { id: "1313922693078319174" },
			Cape114: { id: "1313922668269011037" },
			Cape115: { id: "1313922655048695902" },
			Cape116: { id: "1313922646391394334" },
			Cape117: { id: "1313922656474759281" },
			Cape118: { id: "1313922678239006730" },
			Cape119: { id: "1313922675042943058" },
			Cape120: { id: "1313922671125463101" },
			Cape121: { id: "1313922691195076618" },
			Cape122: { id: "1313922703727657194" },
			Cape123: { id: "1313922666696151080" },
			Cape124: { id: "1313922683863568487" },
			Cape125: { id: "1313922697574744094" },
			Cape126: { id: "1313922676581990523" },
			Cape127: { id: "1313922669514723369" },
			Cape128: { id: "1313922695884312588" },
			Cape129: { id: "1313922679643832400" },
			Cape130: { id: "1313922685129981982" },
			Cape131: { id: "1313922701919916042" },
			Cape132: { id: "1313922689425211453" },
			Cape133: { id: "1313922713378619472" },
			Cape134: { id: "1313922686648451072" },
			Cape135: { id: "1313922672631087136" },
			Cape136: { id: "1313922705732538449" },
			Cape137: { id: "1313922694856835244" },
			Cape138: { id: "1313922658458669096" },
			Cape139: { id: "1313922699667574824" },
			Cape140: { id: "1315725838733545545" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type CapeEmojis = (typeof CAPE_EMOJIS)[keyof typeof CAPE_EMOJIS];

/**
 * Emojis from the held props server.
 */
export const HELD_PROPS_EMOJIS = PRODUCTION
	? ({
			/**
			 * Laughing Light Catcher.
			 */
			HeldProp01: { id: "1313937992813117524" },
			/**
			 * Blushing Prospector.
			 */
			HeldProp02: { id: "1313937986886434896" },
			/**
			 * Cheerful Spectator.
			 */
			HeldProp03: { id: "1313937977050927134" },
			/**
			 * Frightened Refugee.
			 */
			HeldProp04: { id: "1313937973951070208" },
			/**
			 * Lookout Scout.
			 */
			HeldProp05: { id: "1313937985611501658" },
			/**
			 * Saluting Captain.
			 */
			HeldProp06: { id: "1313937991202508902" },
			/**
			 * Leaping Dancer.
			 */
			HeldProp07: { id: "1313937988723544147" },
			/**
			 * Greeting Shaman.
			 */
			HeldProp08: { id: "1313938045917204490" },
			/**
			 * Doublefive Light Catcher.
			 */
			HeldProp09: { id: "1313938003869306930" },
			/**
			 * Twirling Champion.
			 */
			HeldProp10: { id: "1313937978665467964" },
			/**
			 * Laidback Pioneer.
			 */
			HeldProp11: { id: "1313938035112411157" },
			/**
			 * Season of Lightseekers ultimate.
			 */
			HeldProp12: { id: "1313938022026182726" },
			/**
			 * Pleaful Parent.
			 */
			HeldProp13: { id: "1313938002476531823" },
			/**
			 * Hairtousle Teen.
			 */
			HeldProp14: { id: "1313938037968732280" },
			/**
			 * Respectful Pianist.
			 */
			HeldProp15: { id: "1313937971141021766" },
			/**
			 * Thoughtful Director.
			 */
			HeldProp16: { id: "1313938036601389087" },
			/**
			 * Sanctuary Guide.
			 */
			HeldProp17: { id: "1313937994071277658" },
			/**
			 * Days of Summer Lights 2020.
			 */
			HeldProp18: { id: "1313938058747314257" },
			/**
			 * Prophecy Guide.
			 */
			HeldProp19: { id: "1313938006717235283" },
			/**
			 * Dancing Performer.
			 */
			HeldProp20: { id: "1313937975729459201" },
			/**
			 * Assembly Guide.
			 */
			HeldProp21: { id: "1313938033480962138" },
			/**
			 * Nintendo Switch.
			 */
			HeldProp22: { id: "1313938016724582510" },
			/**
			 * Summer Umbrella.
			 */
			HeldProp23: { id: "1313937996621283338" },
			/**
			 * Tinkering Chimesmith.
			 */
			HeldProp24: { id: "1313938040493703178" },
			/**
			 * Mellow Musician.
			 */
			HeldProp25: { id: "1313938000891220028" },
			/**
			 * Fledgling Harp.
			 */
			HeldProp26: { id: "1313938004657705033" },
			/**
			 * Rhythm Guitar.
			 */
			HeldProp27: { id: "1313937995266785411" },
			/**
			 * Triumph Handpan.
			 */
			HeldProp28: { id: "1313938056776126555" },
			/**
			 * Ancient Darkness (dragon).
			 */
			HeldProp29: { id: "1313938020323295302" },
			/**
			 * TGC Guitar.
			 */
			HeldProp30: { id: "1313938011473444936" },
			/**
			 * Voice of AURORA.
			 */
			HeldProp31: { id: "1313938052669898852" },
			/**
			 * Days of Fortune Enchanted Umbrella.
			 */
			HeldProp32: { id: "1313938009942659193" },
			/**
			 * Days of Love Serendipitous Sceptre.
			 */
			HeldProp33: { id: "1313938031605973045" },
			/**
			 * Overactive Overachiever.
			 */
			HeldProp34: { id: "1313937998265450598" },
			/**
			 * Triumph Violin.
			 */
			HeldProp35: { id: "1313938054922240122" },
			/**
			 * Triumph Saxophone.
			 */
			HeldProp36: { id: "1313938023662223410" },
			/**
			 * Moments Guide (ultimate).
			 */
			HeldProp37: { id: "1313938053974327438" },
			/**
			 * Moments Guide (non-ultimate).
			 */
			HeldProp38: { id: "1313937999645511731" },
			/**
			 * Festival Sceptre.
			 */
			HeldProp39: { id: "1313938014497542176" },
			/**
			 * Winter Feast Snowboard.
			 */
			HeldProp40: { id: "1313938047435411588" },
			/**
			 * Fortune Drum.
			 */
			HeldProp41: { id: "1313938043647955078" },
			/**
			 * Bloom Lilypad Umbrella.
			 */
			HeldProp42: { id: "1313938018976923798" },
			/**
			 * SkyFest Jenova Fan.
			 */
			HeldProp43: { id: "1313938008214343801" },
			/**
			 * The Musicians' Legacy.
			 */
			HeldProp44: { id: "1313938039281680414" },
			/**
			 * Tournament Torch.
			 */
			HeldProp45: { id: "1313938060492144661" },
			/**
			 * Compassionate Cellist.
			 */
			HeldProp46: { id: "1313938050908422225" },
			/**
			 * The Moomin Storybook (ultimate).
			 */
			HeldProp47: { id: "1313938049113133136" },
			/**
			 * Spirit of Adventure.
			 */
			HeldProp48: { id: "1313938041936810015" },
			/**
			 * Mischief Withered Broom.
			 */
			HeldProp49: { id: "1313938012551385249" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			HeldProp01: { id: "1313922939204272228" },
			HeldProp02: { id: "1313922916634726420" },
			HeldProp03: { id: "1313922928605270016" },
			HeldProp04: { id: "1313922902533476373" },
			HeldProp05: { id: "1313922944778375230" },
			HeldProp06: { id: "1313922932489191555" },
			HeldProp07: { id: "1313922950205935777" },
			HeldProp08: { id: "1313922930404491305" },
			HeldProp09: { id: "1313922946271674461" },
			HeldProp10: { id: "1313922960834433126" },
			HeldProp11: { id: "1313922941313880134" },
			HeldProp12: { id: "1313922898096033804" },
			HeldProp13: { id: "1313922894924873800" },
			HeldProp14: { id: "1313922977707851786" },
			HeldProp15: { id: "1313922892370804839" },
			HeldProp16: { id: "1313922959441657946" },
			HeldProp17: { id: "1313922927229665320" },
			HeldProp18: { id: "1313922890625716255" },
			HeldProp19: { id: "1313922913388462120" },
			HeldProp20: { id: "1313922923752329296" },
			HeldProp21: { id: "1313922907294011474" },
			HeldProp22: { id: "1313922905461231689" },
			HeldProp23: { id: "1313922908594114580" },
			HeldProp24: { id: "1313922910431346700" },
			HeldProp25: { id: "1313922955255873576" },
			HeldProp26: { id: "1313922899924488284" },
			HeldProp27: { id: "1313922937807573023" },
			HeldProp28: { id: "1313922943150985237" },
			HeldProp29: { id: "1313922917834293299" },
			HeldProp30: { id: "1313922965372669996" },
			HeldProp31: { id: "1313922911706550272" },
			HeldProp32: { id: "1313922968296095836" },
			HeldProp33: { id: "1313922936444289178" },
			HeldProp34: { id: "1313922963052957717" },
			HeldProp35: { id: "1313922921806168145" },
			HeldProp36: { id: "1313922896581890048" },
			HeldProp37: { id: "1313922969889673277" },
			HeldProp38: { id: "1313922958313394267" },
			HeldProp39: { id: "1313922953355722832" },
			HeldProp40: { id: "1313922962088525844" },
			HeldProp41: { id: "1313922971835826218" },
			HeldProp42: { id: "1313922957113823253" },
			HeldProp43: { id: "1313922951367753861" },
			HeldProp44: { id: "1313922966786150520" },
			HeldProp45: { id: "1313922915250606282" },
			HeldProp46: { id: "1313922934779285604" },
			HeldProp47: { id: "1313922925614596219" },
			HeldProp48: { id: "1313922948444328017" },
			HeldProp49: { id: "1313922919906283571" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type HeldPropsEmojis = (typeof HELD_PROPS_EMOJIS)[keyof typeof HELD_PROPS_EMOJIS];

/**
 * Emojis from the placeable props servers.
 */
export const LARGE_PLACEABLE_PROPS_EMOJIS = PRODUCTION
	? ({
			/**
			 * Meditating Monastic.
			 */
			LargePlaceableProp01: { id: "1313938252285345852" },
			/**
			 * Belonging Guide (ultimate).
			 */
			LargePlaceableProp02: { id: "1313938239555371058" },
			/**
			 * Days of Feast 2020.
			 */
			LargePlaceableProp03: { id: "1313938289463656530" },
			/**
			 * Pink Bloom Teaset.
			 */
			LargePlaceableProp04: { id: "1313938248871186524" },
			/**
			 * Assembly Guide (non-ultimate 1).
			 */
			LargePlaceableProp05: { id: "1313938247054917763" },
			/**
			 * Assembly Guide (non-ultimate 2).
			 */
			LargePlaceableProp06: { id: "1313938300850933760" },
			/**
			 * Scaredy Cadet.
			 */
			LargePlaceableProp07: { id: "1313938271985729616" },
			/**
			 * Marching Adventurer.
			 */
			LargePlaceableProp08: { id: "1313938241744932969" },
			/**
			 * Assembly Guide (non-ultimate 5).
			 */
			LargePlaceableProp09: { id: "1313938281297088663" },
			/**
			 * Baffled Botanist.
			 */
			LargePlaceableProp10: { id: "1313938269519745074" },
			/**
			 * Chuckling Scout.
			 */
			LargePlaceableProp11: { id: "1313938243259072622" },
			/**
			 * Star Collector.
			 */
			LargePlaceableProp12: { id: "1313938279531417621" },
			/**
			 * Double Deck Chairs.
			 */
			LargePlaceableProp13: { id: "1313938263131684875" },
			/**
			 * Chill Sunbather.
			 */
			LargePlaceableProp14: { id: "1313938245213491331" },
			/**
			 * Crab Whisperer.
			 */
			LargePlaceableProp15: { id: "1313938250603429898" },
			/**
			 * Troupe Juggler.
			 */
			LargePlaceableProp16: { id: "1313938298934268005" },
			/**
			 * Grateful Shell Collector.
			 */
			LargePlaceableProp17: { id: "1313938276385554442" },
			/**
			 * Festival Spin Dancer.
			 */
			LargePlaceableProp18: { id: "1313938265262264411" },
			/**
			 * Mischief Spooky Dining Set.
			 */
			LargePlaceableProp19: { id: "1313938274124959806" },
			/**
			 * Playfighting Herbalist.
			 */
			LargePlaceableProp20: { id: "1313938261621739601" },
			/**
			 * Jelly Whisperer.
			 */
			LargePlaceableProp21: { id: "1313938253799489607" },
			/**
			 * Prophet of Fire 1.
			 */
			LargePlaceableProp22: { id: "1313938305431375998" },
			/**
			 * Purple Bloom Teaset.
			 */
			LargePlaceableProp23: { id: "1313938316395151401" },
			/**
			 * Performance Guide (non-ultmate).
			 */
			LargePlaceableProp24: { id: "1313938267330314295" },
			/**
			 * Days of Sunlight 2022.
			 */
			LargePlaceableProp25: { id: "1313938317644922952" },
			/**
			 * Light fence.
			 */
			LargePlaceableProp26: { id: "1313938306878275635" },
			/**
			 * Snowkid Prop.
			 */
			LargePlaceableProp27: { id: "1313938285030281376" },
			/**
			 * Remembrance Guide (non-ultimate 2).
			 */
			LargePlaceableProp28: { id: "1313938319112933507" },
			/**
			 * Remembrance Guide (non-ultimate 3).
			 */
			LargePlaceableProp29: { id: "1313938310045110364" },
			/**
			 * Remembrance Guide (ultimate).
			 */
			LargePlaceableProp30: { id: "1313938291938037831" },
			/**
			 * Days of Love Flowery Archway.
			 */
			LargePlaceableProp31: { id: "1313938326704623646" },
			/**
			 * Bloom Picnic Basket.
			 */
			LargePlaceableProp32: { id: "1313938282924605461" },
			/**
			 * Anniversary Party Lights.
			 */
			LargePlaceableProp33: { id: "1313938304135336037" },
			/**
			 * Nesting Solarium 1.
			 */
			LargePlaceableProp34: { id: "1313938286489768006" },
			/**
			 * Nesting Solarium 2.
			 */
			LargePlaceableProp35: { id: "1313938311664107580" },
			/**
			 * Nesting Solarium 3.
			 */
			LargePlaceableProp36: { id: "1313938294031257600" },
			/**
			 * Nesting Loft 1.
			 */
			LargePlaceableProp37: { id: "1313938314721759302" },
			/**
			 * Nesting Loft 2.
			 */
			LargePlaceableProp38: { id: "1313938323492048906" },
			/**
			 * Nesting Atrium 1.
			 */
			LargePlaceableProp39: { id: "1313938312804958229" },
			/**
			 * Nesting Atrium 2.
			 */
			LargePlaceableProp40: { id: "1313938302205689857" },
			/**
			 * Nesting Nook.
			 */
			LargePlaceableProp41: { id: "1313938295255863326" },
			/**
			 * Stone stool.
			 */
			LargePlaceableProp42: { id: "1313938297008951347" },
			/**
			 * Stone single bench.
			 */
			LargePlaceableProp43: { id: "1313938320866152499" },
			/**
			 * Stone wood-fired oven.
			 */
			LargePlaceableProp44: { id: "1313938329636704276" },
			/**
			 * Stone single bed.
			 */
			LargePlaceableProp45: { id: "1313938287898923018" },
			/**
			 * Stone tall cube.
			 */
			LargePlaceableProp46: { id: "1313938308329504861" },
			/**
			 * Stone chair.
			 */
			LargePlaceableProp47: { id: "1313938328231608340" },
			/**
			 * Stone small table.
			 */
			LargePlaceableProp48: { id: "1313938322212519997" },
			/**
			 * Stone tall shelf.
			 */
			LargePlaceableProp49: { id: "1313938278109679677" },
			/**
			 * Cosy Cafe Table.
			 */
			LargePlaceableProp50: { id: "1313938325316309122" },
			/**
			 * Stone bench.
			 */
			LargePlaceableProp51: { id: "1313938415930183720" },
			/**
			 * Stone desk.
			 */
			LargePlaceableProp52: { id: "1313938418107023410" },
			/**
			 * Stone armchair.
			 */
			LargePlaceableProp53: { id: "1313938421793951845" },
			/**
			 * Stone console table.
			 */
			LargePlaceableProp54: { id: "1313938414235553894" },
			/**
			 * Stone loveseat.
			 */
			LargePlaceableProp55: { id: "1313938419914768434" },
			/**
			 * Stone round dining table.
			 */
			LargePlaceableProp56: { id: "1313938412113231933" },
			/**
			 * Stone plant stand.
			 */
			LargePlaceableProp57: { id: "1313938426873118720" },
			/**
			 * Stone sofa corner.
			 */
			LargePlaceableProp58: { id: "1313938425140740126" },
			/**
			 * Stone square dining table.
			 */
			LargePlaceableProp59: { id: "1313938450311020647" },
			/**
			 * Stone sofa side.
			 */
			LargePlaceableProp60: { id: "1313938432589828217" },
			/**
			 * Stone long dining table.
			 */
			LargePlaceableProp61: { id: "1313938423228141640" },
			/**
			 * Stone small bathtub.
			 */
			LargePlaceableProp62: { id: "1313938447517618257" },
			/**
			 * Stone kitchen drawers.
			 */
			LargePlaceableProp63: { id: "1313938438692802560" },
			/**
			 * Stone coffee table.
			 */
			LargePlaceableProp64: { id: "1313938430182428835" },
			/**
			 * Stone candle light.
			 */
			LargePlaceableProp65: { id: "1313938451581898826" },
			/**
			 * Stone washstand.
			 */
			LargePlaceableProp66: { id: "1313938441624490055" },
			/**
			 * Stone kitchen cabinet.
			 */
			LargePlaceableProp67: { id: "1313938440320057384" },
			/**
			 * Stone kitchen stove.
			 */
			LargePlaceableProp68: { id: "1313938446170980372" },
			/**
			 * Stone wide cube.
			 */
			LargePlaceableProp69: { id: "1313938437308416031" },
			/**
			 * Large bathtub.
			 */
			LargePlaceableProp70: { id: "1313938435668574239" },
			/**
			 * Sunlight Manta Float.
			 */
			LargePlaceableProp71: { id: "1313938434309750926" },
			/**
			 * Moonlight Lantern Decoration.
			 */
			LargePlaceableProp72: { id: "1313938442387980310" },
			/**
			 * Comfort of Kindness.
			 */
			LargePlaceableProp73: { id: "1313938453469069392" },
			/**
			 * Spirit of Adventure.
			 */
			LargePlaceableProp74: { id: "1313938448629108809" },
			/**
			 * Inspiration of Inclusion.
			 */
			LargePlaceableProp75: { id: "1313938444317233234" },
			/**
			 * Mischief Cauldron.
			 */
			LargePlaceableProp76: { id: "1313938431558156288" },
			/**
			 * Jam Station.
			 */
			LargePlaceableProp77: { id: "1313938428546514945" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			LargePlaceableProp01: { id: "1313923096218177678" },
			LargePlaceableProp02: { id: "1313923124944699472" },
			LargePlaceableProp03: { id: "1313923091612696709" },
			LargePlaceableProp04: { id: "1313923099686604843" },
			LargePlaceableProp05: { id: "1313923147128508557" },
			LargePlaceableProp06: { id: "1313923101485961370" },
			LargePlaceableProp07: { id: "1313923088483880981" },
			LargePlaceableProp08: { id: "1313923090186637394" },
			LargePlaceableProp09: { id: "1313923165977579630" },
			LargePlaceableProp10: { id: "1313923084780044349" },
			LargePlaceableProp11: { id: "1313923105248382986" },
			LargePlaceableProp12: { id: "1313923128509862009" },
			LargePlaceableProp13: { id: "1313923098185302067" },
			LargePlaceableProp14: { id: "1313923184524791882" },
			LargePlaceableProp15: { id: "1313923158641741986" },
			LargePlaceableProp16: { id: "1313923114593423360" },
			LargePlaceableProp17: { id: "1313923086944567346" },
			LargePlaceableProp18: { id: "1313923108154904649" },
			LargePlaceableProp19: { id: "1313923135233458308" },
			LargePlaceableProp20: { id: "1313923103168004157" },
			LargePlaceableProp21: { id: "1313923110059249695" },
			LargePlaceableProp22: { id: "1313923181265817673" },
			LargePlaceableProp23: { id: "1313923111782977668" },
			LargePlaceableProp24: { id: "1313923131731214367" },
			LargePlaceableProp25: { id: "1313923177260519466" },
			LargePlaceableProp26: { id: "1313923162102038680" },
			LargePlaceableProp27: { id: "1313923094427074571" },
			LargePlaceableProp28: { id: "1313923182939344896" },
			LargePlaceableProp29: { id: "1313923106699612170" },
			LargePlaceableProp30: { id: "1313923154816532560" },
			LargePlaceableProp31: { id: "1313923139243081868" },
			LargePlaceableProp32: { id: "1313923130070274119" },
			LargePlaceableProp33: { id: "1313923150882275468" },
			LargePlaceableProp34: { id: "1313923137364295821" },
			LargePlaceableProp35: { id: "1313923172155916418" },
			LargePlaceableProp36: { id: "1313923122826838107" },
			LargePlaceableProp37: { id: "1313923169882472500" },
			LargePlaceableProp38: { id: "1313923145475948689" },
			LargePlaceableProp39: { id: "1313923133236973651" },
			LargePlaceableProp40: { id: "1313923164321091607" },
			LargePlaceableProp41: { id: "1313923179751936011" },
			LargePlaceableProp42: { id: "1313923141277454347" },
			LargePlaceableProp43: { id: "1313923173506351165" },
			LargePlaceableProp44: { id: "1313923113246785587" },
			LargePlaceableProp45: { id: "1313923152732225637" },
			LargePlaceableProp46: { id: "1313923143320080426" },
			LargePlaceableProp47: { id: "1313923148974133310" },
			LargePlaceableProp48: { id: "1313923175926468708" },
			LargePlaceableProp49: { id: "1313923126895050782" },
			LargePlaceableProp50: { id: "1313923167575867495" },
			LargePlaceableProp51: { id: "1313923273527922689" },
			LargePlaceableProp52: { id: "1313923261545054249" },
			LargePlaceableProp53: { id: "1313923263113461891" },
			LargePlaceableProp54: { id: "1313923290158465044" },
			LargePlaceableProp55: { id: "1313923266620031048" },
			LargePlaceableProp56: { id: "1313923265059754026" },
			LargePlaceableProp57: { id: "1313923292356411422" },
			LargePlaceableProp58: { id: "1313923268863987844" },
			LargePlaceableProp59: { id: "1313923282180767744" },
			LargePlaceableProp60: { id: "1313923295762186240" },
			LargePlaceableProp61: { id: "1313923280306180216" },
			LargePlaceableProp62: { id: "1313923275679731712" },
			LargePlaceableProp63: { id: "1313923277114310656" },
			LargePlaceableProp64: { id: "1313923298635022356" },
			LargePlaceableProp65: { id: "1313923311742353413" },
			LargePlaceableProp66: { id: "1313923287977562224" },
			LargePlaceableProp67: { id: "1313923306096955432" },
			LargePlaceableProp68: { id: "1313923285758771382" },
			LargePlaceableProp69: { id: "1313923283699105853" },
			LargePlaceableProp70: { id: "1313923307501781123" },
			LargePlaceableProp71: { id: "1313923309728960675" },
			LargePlaceableProp72: { id: "1313923304561578085" },
			LargePlaceableProp73: { id: "1313923271959384075" },
			LargePlaceableProp74: { id: "1313923293761503444" },
			LargePlaceableProp75: { id: "1313923302355636234" },
			LargePlaceableProp76: { id: "1313923278502494208" },
			LargePlaceableProp77: { id: "1313923270583652404" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type LargePlaceablePropsEmojis =
	(typeof LARGE_PLACEABLE_PROPS_EMOJIS)[keyof typeof LARGE_PLACEABLE_PROPS_EMOJIS];

export const SMALL_PLACEABLE_PROPS_EMOJIS = PRODUCTION
	? ({
			/**
			 * Days of Love 2020.
			 */
			SmallPlaceableProp01: { id: "1313938750883233884" },
			/**
			 * Days of Love Seesaw.
			 */
			SmallPlaceableProp02: { id: "1313938691462533174" },
			/**
			 * Assembly Guide (non-ultimate 3).
			 */
			SmallPlaceableProp03: { id: "1313938676207587328" },
			/**
			 * Assembly Guide (non-ultimate 4).
			 */
			SmallPlaceableProp04: { id: "1313938740204277770" },
			/**
			 * The Rose.
			 */
			SmallPlaceableProp05: { id: "1313938692800385135" },
			/**
			 * Little Prince Fox.
			 */
			SmallPlaceableProp06: { id: "1313938745208344666" },
			/**
			 * Second Sky Anniversary.
			 */
			SmallPlaceableProp07: { id: "1313938674169413645" },
			/**
			 * Mischief Pumpkin Prop.
			 */
			SmallPlaceableProp08: { id: "1313938696096976987" },
			/**
			 * Wise Grandparent.
			 */
			SmallPlaceableProp09: { id: "1313938752552439888" },
			/**
			 * Winter Feast Pillow.
			 */
			SmallPlaceableProp10: { id: "1313938729295155304" },
			/**
			 * Winter Feast Snowglobe.
			 */
			SmallPlaceableProp11: { id: "1313938733124288532" },
			/**
			 * Sparkler Parent.
			 */
			SmallPlaceableProp12: { id: "1313938743832346714" },
			/**
			 * Prophet of Earth.
			 */
			SmallPlaceableProp13: { id: "1313938731438313563" },
			/**
			 * Days of Love Gondola.
			 */
			SmallPlaceableProp14: { id: "1313938727873019914" },
			/**
			 * Prophet of Air.
			 */
			SmallPlaceableProp15: { id: "1313938724882747473" },
			/**
			 * Balloon.
			 */
			SmallPlaceableProp16: { id: "1313938749385867334" },
			/**
			 * Confetti launcher.
			 */
			SmallPlaceableProp17: { id: "1313938747477463092" },
			/**
			 * Campfire Snack Kit.
			 */
			SmallPlaceableProp18: { id: "1313938710672179342" },
			/**
			 * Feline Familiar Prop.
			 */
			SmallPlaceableProp19: { id: "1313938735859241060" },
			/**
			 * Prophet of Water.
			 */
			SmallPlaceableProp20: { id: "1313938721233440828" },
			/**
			 * Tournament Skyball Set.
			 */
			SmallPlaceableProp21: { id: "1313938767324909579" },
			/**
			 * Remembrance Guide (non-ultimate 1).
			 */
			SmallPlaceableProp22: { id: "1313938758755946577" },
			/**
			 * Remembrance Guide (non-ultimate 4).
			 */
			SmallPlaceableProp23: { id: "1313938681203130408" },
			/**
			 * Remembrance Guide (non-ultimate 5).
			 */
			SmallPlaceableProp24: { id: "1313938665478553630" },
			/**
			 * Bloom Butterfly Fountain.
			 */
			SmallPlaceableProp25: { id: "1313938682926989362" },
			/**
			 * Passage Guide (non-ultimate).
			 */
			SmallPlaceableProp26: { id: "1313938677432320031" },
			/**
			 * Nature Sonorous Seashell.
			 */
			SmallPlaceableProp27: { id: "1313938760521613373" },
			/**
			 * Jolly Geologist.
			 */
			SmallPlaceableProp28: { id: "1313938672567189605" },
			/**
			 * Anniversary Sonorous Seashell.
			 */
			SmallPlaceableProp29: { id: "1313938679206645821" },
			/**
			 * Anniversary Plush.
			 */
			SmallPlaceableProp30: { id: "1313938737452945479" },
			/**
			 * Prophet of Fire 2.
			 */
			SmallPlaceableProp31: { id: "1313938670545408023" },
			/**
			 * Sunlight Surfboard.
			 */
			SmallPlaceableProp32: { id: "1313938669287243838" },
			/**
			 * Days of Feast 2023.
			 */
			SmallPlaceableProp33: { id: "1313938684562899084" },
			/**
			 * Herb Gatherer.
			 */
			SmallPlaceableProp34: { id: "1313938667059937381" },
			/**
			 * Love Heart Plushie.
			 */
			SmallPlaceableProp35: { id: "1313938694880886815" },
			/**
			 * Companion Cube.
			 */
			SmallPlaceableProp36: { id: "1313938772156747826" },
			/**
			 * Nesting Guide (ultimate).
			 */
			SmallPlaceableProp37: { id: "1313938726564397076" },
			/**
			 * Nesting Solarium.
			 */
			SmallPlaceableProp38: { id: "1313938741840318535" },
			/**
			 * Nesting Loft.
			 */
			SmallPlaceableProp39: { id: "1313938766099906590" },
			/**
			 * Nesting Atrium.
			 */
			SmallPlaceableProp40: { id: "1313938712551489649" },
			/**
			 * Nesting Nook 1.
			 */
			SmallPlaceableProp41: { id: "1313938756184834111" },
			/**
			 * Nesting Nook 2.
			 */
			SmallPlaceableProp42: { id: "1313938738711232564" },
			/**
			 * Decor pillow one colour.
			 */
			SmallPlaceableProp43: { id: "1313938754729410670" },
			/**
			 * Cinnamoroll Pop-Up Cafe Plushie.
			 */
			SmallPlaceableProp44: { id: "1313938723414474762" },
			/**
			 * Decor pillow two colours.
			 */
			SmallPlaceableProp45: { id: "1313938762509848738" },
			/**
			 * Small solid rug.
			 */
			SmallPlaceableProp46: { id: "1313938746600853504" },
			/**
			 * Decor folded cloth.
			 */
			SmallPlaceableProp47: { id: "1313938770680352799" },
			/**
			 * Small stripes rug.
			 */
			SmallPlaceableProp48: { id: "1313938763969331272" },
			/**
			 * Small classic rug.
			 */
			SmallPlaceableProp49: { id: "1313938734290440234" },
			/**
			 * Stone wall sconce.
			 */
			SmallPlaceableProp50: { id: "1313938768952295486" },
			/**
			 * Small half circle rug.
			 */
			SmallPlaceableProp51: { id: "1313938851504324648" },
			/**
			 * Medium solid rug.
			 */
			SmallPlaceableProp52: { id: "1313938867090493560" },
			/**
			 * Stone figurine.
			 */
			SmallPlaceableProp53: { id: "1313938853970710608" },
			/**
			 * Medium stripes rug.
			 */
			SmallPlaceableProp54: { id: "1313938856562917467" },
			/**
			 * Instrument stand.
			 */
			SmallPlaceableProp55: { id: "1313938857955295334" },
			/**
			 * Stone wall pot rack.
			 */
			SmallPlaceableProp56: { id: "1313938893061488640" },
			/**
			 * Stone closed box.
			 */
			SmallPlaceableProp57: { id: "1313938861440766043" },
			/**
			 * Medium diamonds rug.
			 */
			SmallPlaceableProp58: { id: "1313938859553460234" },
			/**
			 * Music player.
			 */
			SmallPlaceableProp59: { id: "1313938863239987220" },
			/**
			 * Stone empty box.
			 */
			SmallPlaceableProp60: { id: "1313938865383411763" },
			/**
			 * Stone wall mirror.
			 */
			SmallPlaceableProp61: { id: "1313938889077166100" },
			/**
			 * Medium argyle rug.
			 */
			SmallPlaceableProp62: { id: "1313938885939695698" },
			/**
			 * Colour Bubble Machine.
			 */
			SmallPlaceableProp63: { id: "1313938855237255238" },
			/**
			 * Stone wall mug rack.
			 */
			SmallPlaceableProp64: { id: "1313938883582623805" },
			/**
			 * Stone wall towel rack.
			 */
			SmallPlaceableProp65: { id: "1313938901919862815" },
			/**
			 * Medium circle rug.
			 */
			SmallPlaceableProp66: { id: "1313938869921779722" },
			/**
			 * Stone wall shelf.
			 */
			SmallPlaceableProp67: { id: "1313938903937450005" },
			/**
			 * Large solid rug.
			 */
			SmallPlaceableProp68: { id: "1313938899307073536" },
			/**
			 * Large circle rug.
			 */
			SmallPlaceableProp69: { id: "1313938868562690080" },
			/**
			 * SkyFest Star Jar.
			 */
			SmallPlaceableProp70: { id: "1313938871343644732" },
			/**
			 * Duets Guide (ultimate 1).
			 */
			SmallPlaceableProp71: { id: "1313938875307131053" },
			/**
			 * Duets Guide (ultimate 2).
			 */
			SmallPlaceableProp72: { id: "1313938887621480508" },
			/**
			 * The Cellist's Beginnings.
			 */
			SmallPlaceableProp73: { id: "1313938905610981429" },
			/**
			 * The Pianist's Beginnings 1.
			 */
			SmallPlaceableProp74: { id: "1313938876955365517" },
			/**
			 * The Pianist's Beginnings 2.
			 */
			SmallPlaceableProp75: { id: "1313938878578823268" },
			/**
			 * The Musicians' Legacy.
			 */
			SmallPlaceableProp76: { id: "1313938894571442327" },
			/**
			 * The Cellist's Flourishing 1.
			 */
			SmallPlaceableProp77: { id: "1313938879857823855" },
			/**
			 * The Cellist's Flourishing 2.
			 */
			SmallPlaceableProp78: { id: "1313938873021235241" },
			/**
			 * The Pianist's Flourishing.
			 */
			SmallPlaceableProp79: { id: "1313938881854308443" },
			/**
			 * The Moomin Storybook (ultimate).
			 */
			SmallPlaceableProp80: { id: "1313938896350085141" },
			/**
			 * Comfort of Kindness.
			 */
			SmallPlaceableProp81: { id: "1313938907049492491" },
			/**
			 * Inspiration of Inclusion.
			 */
			SmallPlaceableProp82: { id: "1313938900712030318" },
			/**
			 * Hanging mask.
			 */
			SmallPlaceableProp83: { id: "1313938890666803230" },
			/**
			 * Hanging mask.
			 */
			SmallPlaceableProp84: { id: "1313938897440477215" },
			/**
			 * The Moomin Storybook (non-ultimate).
			 */
			SmallPlaceableProp85: { id: "1315723498727145513" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			SmallPlaceableProp01: { id: "1313924407802069145" },
			SmallPlaceableProp02: { id: "1313924361388036187" },
			SmallPlaceableProp03: { id: "1313924391138099201" },
			SmallPlaceableProp04: { id: "1313924373379416076" },
			SmallPlaceableProp05: { id: "1313924359056003115" },
			SmallPlaceableProp06: { id: "1313924430933524522" },
			SmallPlaceableProp07: { id: "1313924420800348180" },
			SmallPlaceableProp08: { id: "1313924370556653609" },
			SmallPlaceableProp09: { id: "1313924394556461106" },
			SmallPlaceableProp10: { id: "1313924366668533871" },
			SmallPlaceableProp11: { id: "1313924392899710998" },
			SmallPlaceableProp12: { id: "1313924425888043048" },
			SmallPlaceableProp13: { id: "1313924397806911510" },
			SmallPlaceableProp14: { id: "1313924363216490596" },
			SmallPlaceableProp15: { id: "1313924396490166302" },
			SmallPlaceableProp16: { id: "1313924429486493827" },
			SmallPlaceableProp17: { id: "1313924380513796228" },
			SmallPlaceableProp18: { id: "1313924379100450918" },
			SmallPlaceableProp19: { id: "1313924384347521084" },
			SmallPlaceableProp20: { id: "1313924421915906081" },
			SmallPlaceableProp21: { id: "1313924435354583040" },
			SmallPlaceableProp22: { id: "1313924375803723776" },
			SmallPlaceableProp23: { id: "1313924372003684435" },
			SmallPlaceableProp24: { id: "1313924382263087218" },
			SmallPlaceableProp25: { id: "1313924368522416149" },
			SmallPlaceableProp26: { id: "1313924365041008711" },
			SmallPlaceableProp27: { id: "1313924412457750591" },
			SmallPlaceableProp28: { id: "1313924387313025084" },
			SmallPlaceableProp29: { id: "1313924399694352406" },
			SmallPlaceableProp30: { id: "1313924424269037568" },
			SmallPlaceableProp31: { id: "1313924403427283006" },
			SmallPlaceableProp32: { id: "1313924389384880138" },
			SmallPlaceableProp33: { id: "1313924405868494908" },
			SmallPlaceableProp34: { id: "1313924414936711271" },
			SmallPlaceableProp35: { id: "1313924377124798485" },
			SmallPlaceableProp36: { id: "1313924427666165812" },
			SmallPlaceableProp37: { id: "1313924448654590077" },
			SmallPlaceableProp38: { id: "1313924442933428304" },
			SmallPlaceableProp39: { id: "1313924385790365787" },
			SmallPlaceableProp40: { id: "1313924418677772300" },
			SmallPlaceableProp41: { id: "1313924410671108097" },
			SmallPlaceableProp42: { id: "1313924401716265102" },
			SmallPlaceableProp43: { id: "1313924439024341094" },
			SmallPlaceableProp44: { id: "1313924416580878408" },
			SmallPlaceableProp45: { id: "1313924444456091749" },
			SmallPlaceableProp46: { id: "1313924440651858032" },
			SmallPlaceableProp47: { id: "1313924450902737006" },
			SmallPlaceableProp48: { id: "1313924446561767424" },
			SmallPlaceableProp49: { id: "1313924433366487152" },
			SmallPlaceableProp50: { id: "1313924437258666095" },
			SmallPlaceableProp51: { id: "1313924657539448914" },
			SmallPlaceableProp52: { id: "1313924629613776938" },
			SmallPlaceableProp53: { id: "1313924669241557076" },
			SmallPlaceableProp54: { id: "1313924631547215962" },
			SmallPlaceableProp55: { id: "1313924674568196116" },
			SmallPlaceableProp56: { id: "1313924633619070979" },
			SmallPlaceableProp57: { id: "1313924637960175666" },
			SmallPlaceableProp58: { id: "1313924644650221640" },
			SmallPlaceableProp59: { id: "1313924621799526430" },
			SmallPlaceableProp60: { id: "1313924627927531644" },
			SmallPlaceableProp61: { id: "1313924656348004445" },
			SmallPlaceableProp62: { id: "1313924652959268937" },
			SmallPlaceableProp63: { id: "1313924643182088222" },
			SmallPlaceableProp64: { id: "1313924661918040226" },
			SmallPlaceableProp65: { id: "1313924625696034866" },
			SmallPlaceableProp66: { id: "1313924654469222410" },
			SmallPlaceableProp67: { id: "1313924685410467932" },
			SmallPlaceableProp68: { id: "1313924671355228202" },
			SmallPlaceableProp69: { id: "1313924623712256091" },
			SmallPlaceableProp70: { id: "1313924659313639526" },
			SmallPlaceableProp71: { id: "1313924667471433798" },
			SmallPlaceableProp72: { id: "1313924639201689612" },
			SmallPlaceableProp73: { id: "1313924663323394089" },
			SmallPlaceableProp74: { id: "1313924665269555241" },
			SmallPlaceableProp75: { id: "1313924673083412620" },
			SmallPlaceableProp76: { id: "1313924681711222897" },
			SmallPlaceableProp77: { id: "1313924635707965584" },
			SmallPlaceableProp78: { id: "1313924683141218304" },
			SmallPlaceableProp79: { id: "1313924641357824050" },
			SmallPlaceableProp80: { id: "1313924677957058651" },
			SmallPlaceableProp81: { id: "1313924646567153796" },
			SmallPlaceableProp82: { id: "1313924676178939944" },
			SmallPlaceableProp83: { id: "1313924687415214080" },
			SmallPlaceableProp84: { id: "1313924679798362252" },
			SmallPlaceableProp85: { id: "1315723148133531738" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type SmallPlaceablePropsEmojis =
	(typeof SMALL_PLACEABLE_PROPS_EMOJIS)[keyof typeof SMALL_PLACEABLE_PROPS_EMOJIS];

export type Emoji =
	| MiscellaneousEmojis
	| EmotesEmojis
	| StancesEmojis
	| CallsEmojis
	| FriendActionsEmojis
	| SeasonEmojis
	| EventEmojis
	| OutfitEmojis
	| ShoeEmojis
	| MaskEmojis
	| FaceAccessoryEmojis
	| NecklaceEmojis
	| HairEmojis
	| HairAccessoryEmojis
	| CapeEmojis
	| HeldPropsEmojis
	| LargePlaceablePropsEmojis
	| SmallPlaceablePropsEmojis;

export function formatEmoji(emoji: Emoji) {
	return "animated" in emoji ? `<a:_:${emoji.id}>` : `<:_:${emoji.id}>`;
}

export function formatEmojiURL(id: Snowflake) {
	return client.rest.cdn.emoji(id);
}

interface CurrencyEmojiOptions {
	emoji: Emoji;
	number: number;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji({
	emoji,
	number,
	includeSpaceInEmoji = false,
}: CurrencyEmojiOptions) {
	return `${number}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji)}`;
}
