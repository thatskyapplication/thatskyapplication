import type { Snowflake } from "@discordjs/core";
import { client } from "../discord.js";
import { PRODUCTION } from "./constants.js";

interface EmojiData {
	id: Snowflake;
	name: string;
	animated?: boolean;
}

/**
 * Emojis from the miscellaneous server.
 */
export const MISCELLANEOUS_EMOJIS = PRODUCTION
	? ({
			AscendedCandle: { id: "1313930716576485447", name: "ascended_candle" },
			WingedLight: { id: "1313930689380487330", name: "winged_light" },
			Yes: { id: "1313930693662871612", animated: true, name: "yes" },
			No: { id: "1313930687711023104", animated: true, name: "no" },
			PlatformIOS: { id: "1313930697593061567", name: "platform_ios" },
			PlatformAndroid: { id: "1313930711560093727", name: "platform_android" },
			PlatformMac: { id: "1313930686276567111", name: "platform_mac" },
			PlatformSwitch: { id: "1313930699195158558", name: "platform_switch" },
			PlatformPlayStation: { id: "1313930695462354984", name: "platform_playstation" },
			SeasonalCandle: { id: "1313930691074854924", name: "seasonal_candle" },
			SeasonalHeart: { id: "1313930704198963282", name: "seasonal_heart" },
			Candle: { id: "1313930712977637437", name: "candle" },
			Heart: { id: "1313930706480791582", name: "heart" },
			PlatformSteam: { id: "1313930700025761793", name: "platform_steam" },
			Light: { id: "1313930707487428648", name: "light" },
			ShardRegular: { id: "1313930704748412980", name: "shard_regular" },
			ShardStrong: { id: "1313930714324009151", name: "shard_strong" },
			Blessing1: { id: "1313930703108313208", name: "blessing_1" },
			Blessing2: { id: "1313930720430919730", name: "blessing_2" },
			Blessing3: { id: "1313930718019194981", name: "blessing_3" },
			SpellColourTrail: { id: "1313930724721557605", name: "spell_colour_trail" },
			SpellSharedMemory: { id: "1313930723169669200", name: "spell_shared_memory" },
			SpellSharedSpace: { id: "1313930708724613192", name: "spell_shared_space" },
			WingBuff: { id: "1313930710230241383", name: "wing_buff" },
			Quest: { id: "1313930701623656551", name: "quest" },
			MusicSheet: { id: "1313930722012168282", name: "music_sheet" },
			EventCurrency: { id: "1313930718723969105", name: "event_currency" },
			ConstellationFlag: { id: "1313930715473117305", name: "constellation_flag" },
			CreatorTroupe: { id: "1314781360409546825", name: "creator_troupe" },
			YouTube: { id: "1314804438724120647", name: "youtube" },
			Twitch: { id: "1314807290934722580", name: "twitch" },
			TikTok: { id: "1314809519934799923", name: "tiktok" },
			X: { id: "1314810631689601064", name: "x" },
			Instagram: { id: "1314811293214965760", name: "instagram" },
			Facebook: { id: "1314812062681268294", name: "facebook" },
			Bluesky: { id: "1314813140210286632", name: "bluesky" },
			Report: { id: "1321535527924666409", name: "report" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			AscendedCandle: { id: "1313864872198541445", name: "ascended_candle" },
			WingedLight: { id: "1313864860114620427", name: "winged_light" },
			Yes: { id: "1313864879542767737", animated: true, name: "yes" },
			No: { id: "1313864865676398703", animated: true, name: "no" },
			PlatformIOS: { id: "1313864864279695392", name: "platform_ios" },
			PlatformAndroid: { id: "1313864863444893698", name: "platform_android" },
			PlatformMac: { id: "1313864861972828170", name: "platform_mac" },
			PlatformSwitch: { id: "1313864870877335572", name: "platform_switch" },
			PlatformPlayStation: { id: "1313864868356423710", name: "platform_playstation" },
			SeasonalCandle: { id: "1313864881010901052", name: "seasonal_candle" },
			SeasonalHeart: { id: "1313864876703223879", name: "seasonal_heart" },
			Candle: { id: "1313864867241005180", name: "candle" },
			Heart: { id: "1313864886392193085", name: "heart" },
			PlatformSteam: { id: "1313864894033952819", name: "platform_steam" },
			Light: { id: "1313864887637770281", name: "light" },
			ShardRegular: { id: "1313864875176497225", name: "shard_regular" },
			ShardStrong: { id: "1313864890221592576", name: "shard_strong" },
			Blessing1: { id: "1313864895426596926", name: "blessing_1" },
			Blessing2: { id: "1313864873582661703", name: "blessing_2" },
			Blessing3: { id: "1313864868994089011", name: "blessing_3" },
			SpellColourTrail: { id: "1313864892943564851", name: "spell_colour_trail" },
			SpellSharedMemory: { id: "1313864878309638244", name: "spell_shared_memory" },
			SpellSharedSpace: { id: "1313864882738823328", name: "spell_shared_space" },
			WingBuff: { id: "1313864885460926544", name: "wing_buff" },
			Quest: { id: "1313864888686215261", name: "quest" },
			MusicSheet: { id: "1313864897657831510", name: "music_sheet" },
			EventCurrency: { id: "1313864891311980584", name: "event_currency" },
			ConstellationFlag: { id: "1313864899235151883", name: "constellation_flag" },
			CreatorTroupe: { id: "1314781247842549790", name: "creator_troupe" },
			YouTube: { id: "1314803833397973032", name: "youtube" },
			Twitch: { id: "1314807448854335548", name: "twitch" },
			TikTok: { id: "1314809650750951465", name: "tiktok" },
			X: { id: "1314810363983695892", name: "x" },
			Instagram: { id: "1314811456763596811", name: "instagram" },
			Facebook: { id: "1314811939821715527", name: "facebook" },
			Bluesky: { id: "1314813267444633610", name: "bluesky" },
			Report: { id: "1321535771731300494", name: "report" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type MiscellaneousEmojis = (typeof MISCELLANEOUS_EMOJIS)[keyof typeof MISCELLANEOUS_EMOJIS];

/**
 * Emojis from the emotes servers.
 */
export const EMOTE_EMOJIS = PRODUCTION
	? ({
			Sit: { id: "1313931603797479424", name: "sit" },
			Point: { id: "1313931584512065586", name: "point" },
			Come: { id: "1313931561678143599", name: "come" },
			NoThanks: { id: "1313931563162927136", name: "no_thanks" },
			Welcome: { id: "1313931605617672284", name: "welcome" },
			Nod: { id: "1313931565658800240", name: "nod" },
			Scold: { id: "1313931626174087179", name: "scold" },
			Butterfly: { id: "1313931572784791592", name: "butterfly" },
			Clap: { id: "1313931560210403338", name: "clap" },
			Wave: { id: "1313931570305830994", name: "wave" },
			Laugh: { id: "1313931567336394813", name: "laugh" },
			Yawn: { id: "1313931564647714836", name: "yawn" },
			WipeBrow: { id: "1313931577377427477", name: "wipe_brow" },
			Teamwork: { id: "1313931624785641493", name: "teamwork" },
			BlowKiss: { id: "1313931558733742120", name: "blow_kiss" },
			Grateful: { id: "1313931608151167107", name: "grateful" },
			BellyScratch: { id: "1313931583316824115", name: "belly_scratch" },
			Chuckle: { id: "1313931568720642100", name: "chuckle" },
			Shiver: { id: "1313931614128046181", name: "shiver" },
			HideAndSeek: { id: "1313931581152428083", name: "hide_and_seek" },
			Angry: { id: "1313931592070070352", name: "angry" },
			Shy: { id: "1313931596805705788", name: "shy" },
			Shocked: { id: "1313931576140103721", name: "shocked" },
			Apologise: { id: "1313931579193557032", name: "apologise" },
			Crying: { id: "1313931580263104542", name: "crying" },
			Kabuki: { id: "1313931593915826176", name: "kabuki" },
			Shrug: { id: "1313931590665240586", name: "shrug" },
			Grumpy: { id: "1313931574521102346", name: "grumpy" },
			Peek: { id: "1313931597992427541", name: "peek" },
			Eww: { id: "1313931610835390504", name: "eww" },
			Facepalm: { id: "1313931589251502191", name: "facepalm" },
			Handstand: { id: "1313931619865722910", name: "handstand" },
			Backflip: { id: "1313931595333505197", name: "backflip" },
			Bow: { id: "1313931609732419654", name: "bow" },
			Cheer: { id: "1313931587938947172", name: "cheer" },
			Leap: { id: "1313931600915992596", name: "leap" },
			TripleAxel: { id: "1313931617378635797", name: "triple_axel" },
			Confetti: { id: "1313931585464041473", name: "confetti" },
			BoogieDance: { id: "1313931618481733664", name: "boogie_dance" },
			SpinDance: { id: "1313931571274711140", name: "spin_dance" },
			Juggle: { id: "1313931586454163517", name: "juggle" },
			CrabWalk: { id: "1313931602262491158", name: "crab_walk" },
			RallyCheer: { id: "1313931628241752226", name: "rally_cheer" },
			SpinTrick: { id: "1313931606573977673", name: "spin_trick" },
			ShowDance: { id: "1313931615876939926", name: "show_dance" },
			Duck: { id: "1313931622017663016", name: "duck" },
			Faint: { id: "1313931612395933746", name: "faint" },
			Respect: { id: "1313931627256217621", name: "respect" },
			LookAround: { id: "1313931599267631185", name: "look_around" },
			Salute: { id: "1313931623720423514", name: "salute" },
			Acknowledge: { id: "1313931793853845524", name: "acknowledge" },
			KungFu: { id: "1313931758638727289", name: "kung_fu" },
			DontGo: { id: "1313931797062488116", name: "dont_go" },
			Boo: { id: "1313931766700052490", name: "boo" },
			DustOff: { id: "1313931782395265084", name: "dust_off" },
			ChestPound: { id: "1313931735779512414", name: "chest_pound" },
			Marching: { id: "1313931802502762559", name: "marching" },
			Telekinesis: { id: "1313931737323147345", name: "telekinesis" },
			Float: { id: "1313931761993908245", name: "float" },
			Pray: { id: "1313931740276064290", name: "pray" },
			Yoga: { id: "1313931738338295901", name: "yoga" },
			Shush: { id: "1313931765038977044", name: "shush" },
			Sparkler: { id: "1313931754964389971", name: "sparkler" },
			Thinking: { id: "1313931785377284147", name: "thinking" },
			Doze: { id: "1313931786316808223", name: "doze" },
			Balance: { id: "1313931734550712352", name: "balance" },
			DeepBreath: { id: "1313931768155607081", name: "deep_breath" },
			Bubbles: { id: "1313931746005221396", name: "bubbles" },
			Beckon: { id: "1313931805669462056", name: "beckon" },
			Gloat: { id: "1313931779958116424", name: "gloat" },
			Stretch: { id: "1313931757204148264", name: "stretch" },
			Slouch: { id: "1313931795355537619", name: "slouch" },
			Sneeze: { id: "1313931775248171030", name: "sneeze" },
			HandRub: { id: "1313931744671437020", name: "hand_rub" },
			Voilà: { id: "1313931773767450675", name: "voilà" },
			Navigate: { id: "1313931770944688289", name: "navigate" },
			CalmDown: { id: "1313931760148414543", name: "calm_down" },
			EvilLaugh: { id: "1313931751122403338", name: "evil_laugh" },
			Ouch: { id: "1313931769312972810", name: "ouch" },
			Anxious: { id: "1313931783418417268", name: "anxious" },
			Headbob: { id: "1313931778825650176", name: "headbob" },
			Aww: { id: "1313931791966666814", name: "aww" },
			WavingLight: { id: "1313931799856152716", name: "waving_light" },
			RaiseTheRoof: { id: "1313931772349776053", name: "raise_the_roof" },
			Twirl: { id: "1313931752175046708", name: "twirl" },
			RhythmicClap: { id: "1313931790662242354", name: "rhythmic_clap" },
			Conduct: { id: "1313931777437335652", name: "conduct" },
			SilentClap: { id: "1313931797930836080", name: "silent_clap" },
			Skipping: { id: "1313931741475635220", name: "skipping" },
			Pleading: { id: "1313931753756299304", name: "pleading" },
			Tiptoeing: { id: "1313931742461296702", name: "tiptoeing" },
			Grieving: { id: "1313931763495473233", name: "grieving" },
			HackySack: { id: "1313931787449143460", name: "hacky_sack" },
			Somersault: { id: "1313931806940205201", name: "somersault" },
			Moping: { id: "1313931789290700840", name: "moping" },
			PullUp: { id: "1313931801022173234", name: "pull_up" },
			JollyDance: { id: "1313931780998303855", name: "jolly_dance" },
			BlindfoldBalancePose: { id: "1313931749298016418", name: "blindfold_balance_pose" },
			CureForMeDance: { id: "1313931747385409618", name: "cure_for_me_dance" },
			Whistle: { id: "1313931803597475943", name: "whistle" },
			Flex: { id: "1313931946170253343", name: "flex" },
			FloatSpin: { id: "1313931947612962887", name: "float_spin" },
			Read: { id: "1313931944420966410", name: "read" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Sit: { id: "1313865085504192573", name: "sit" },
			Point: { id: "1313865090176651365", name: "point" },
			Come: { id: "1313865082765312051", name: "come" },
			NoThanks: { id: "1313865143519678506", name: "no_thanks" },
			Welcome: { id: "1313865115128430663", name: "welcome" },
			Nod: { id: "1313865081339121806", name: "nod" },
			Scold: { id: "1313865088666701825", name: "scold" },
			Butterfly: { id: "1313865107583012925", name: "butterfly" },
			Clap: { id: "1313865077077835837", name: "clap" },
			Wave: { id: "1313865079711858752", name: "wave" },
			Laugh: { id: "1313865078705098784", name: "laugh" },
			Yawn: { id: "1313865122288242718", name: "yawn" },
			WipeBrow: { id: "1313865136045293589", name: "wipe_brow" },
			Teamwork: { id: "1313865110099595287", name: "teamwork" },
			BlowKiss: { id: "1313865123206533202", name: "blow_kiss" },
			Grateful: { id: "1313865097126482031", name: "grateful" },
			BellyScratch: { id: "1313865092638445689", name: "belly_scratch" },
			Chuckle: { id: "1313865091577417758", name: "chuckle" },
			Shiver: { id: "1313865133247696977", name: "shiver" },
			HideAndSeek: { id: "1313865117221257217", name: "hide_and_seek" },
			Angry: { id: "1313865148418756618", name: "angry" },
			Shy: { id: "1313865095218200656", name: "shy" },
			Shocked: { id: "1313865084111421461", name: "shocked" },
			Apologise: { id: "1313865112649728151", name: "apologise" },
			Crying: { id: "1313865093347541036", name: "crying" },
			Kabuki: { id: "1313865100230262929", name: "kabuki" },
			Shrug: { id: "1313865113568018534", name: "shrug" },
			Grumpy: { id: "1313865097856290848", name: "grumpy" },
			Peek: { id: "1313865147022049361", name: "peek" },
			Eww: { id: "1313865096119713862", name: "eww" },
			Facepalm: { id: "1313865118672617503", name: "facepalm" },
			Handstand: { id: "1313865126075699300", name: "handstand" },
			Backflip: { id: "1313865137462972486", name: "backflip" },
			Bow: { id: "1313865131909714011", name: "bow" },
			Cheer: { id: "1313865130584571975", name: "cheer" },
			Leap: { id: "1313865116474937467", name: "leap" },
			TripleAxel: { id: "1313865124175679509", name: "triple_axel" },
			Confetti: { id: "1313865139606523975", name: "confetti" },
			BoogieDance: { id: "1313865127082070040", name: "boogie_dance" },
			SpinDance: { id: "1313865129854504980", name: "spin_dance" },
			Juggle: { id: "1313865141002965053", name: "juggle" },
			CrabWalk: { id: "1313865128654934048", name: "crab_walk" },
			RallyCheer: { id: "1313865120681820181", name: "rally_cheer" },
			SpinTrick: { id: "1313865134715834511", name: "spin_trick" },
			ShowDance: { id: "1313865138297901119", name: "show_dance" },
			Duck: { id: "1313865109273313351", name: "duck" },
			Faint: { id: "1313865145734271058", name: "faint" },
			Respect: { id: "1313865111361814529", name: "respect" },
			LookAround: { id: "1313865142269771817", name: "look_around" },
			Salute: { id: "1313865119968792596", name: "salute" },
			Acknowledge: { id: "1313865249908199437", name: "acknowledge" },
			KungFu: { id: "1313865264537800716", name: "kung_fu" },
			DontGo: { id: "1313865239695065250", name: "dont_go" },
			Boo: { id: "1313865245554638849", name: "boo" },
			DustOff: { id: "1313865244531101717", name: "dust_off" },
			ChestPound: { id: "1313865277099868191", name: "chest_pound" },
			Marching: { id: "1313865237124087871", name: "marching" },
			Telekinesis: { id: "1313865259861282897", name: "telekinesis" },
			Float: { id: "1313865297308155924", name: "float" },
			Pray: { id: "1313865246795894865", name: "pray" },
			Yoga: { id: "1313865238164013076", name: "yoga" },
			Shush: { id: "1313865234313773106", name: "shush" },
			Sparkler: { id: "1313865241842679840", name: "sparkler" },
			Thinking: { id: "1313865243226669096", name: "thinking" },
			Doze: { id: "1313865235693830225", name: "doze" },
			Balance: { id: "1313865263963177010", name: "balance" },
			DeepBreath: { id: "1313865287074058310", name: "deep_breath" },
			Bubbles: { id: "1313865298863980554", name: "bubbles" },
			Beckon: { id: "1313865284087709736", name: "beckon" },
			Gloat: { id: "1313865256421953587", name: "gloat" },
			Stretch: { id: "1313865248515817492", name: "stretch" },
			Slouch: { id: "1313865240504434721", name: "slouch" },
			Sneeze: { id: "1313865267167887360", name: "sneeze" },
			HandRub: { id: "1313865262893760576", name: "hand_rub" },
			Voilà: { id: "1313865270322008165", name: "voilà" },
			Navigate: { id: "1313865293931483236", name: "navigate" },
			CalmDown: { id: "1313865283059974244", name: "calm_down" },
			EvilLaugh: { id: "1313865285219913768", name: "evil_laugh" },
			Ouch: { id: "1313865280551649333", name: "ouch" },
			Anxious: { id: "1313865255415447562", name: "anxious" },
			Headbob: { id: "1313865300218740846", name: "headbob" },
			Aww: { id: "1313865252307341374", name: "aww" },
			WavingLight: { id: "1313865253729075200", name: "waving_light" },
			RaiseTheRoof: { id: "1313865275803697182", name: "raise_the_roof" },
			Twirl: { id: "1313865268564328549", name: "twirl" },
			RhythmicClap: { id: "1313865258200203345", name: "rhythmic_clap" },
			Conduct: { id: "1313865266085761084", name: "conduct" },
			SilentClap: { id: "1313865282103676981", name: "silent_clap" },
			Skipping: { id: "1313865279708725278", name: "skipping" },
			Pleading: { id: "1313865251308961802", name: "pleading" },
			Tiptoeing: { id: "1313865273085919295", name: "tiptoeing" },
			Grieving: { id: "1313865295898742855", name: "grieving" },
			HackySack: { id: "1313865261480415262", name: "hacky_sack" },
			Somersault: { id: "1313865288990720000", name: "somersault" },
			Moping: { id: "1313865292383916072", name: "moping" },
			PullUp: { id: "1313865273928978534", name: "pull_up" },
			JollyDance: { id: "1313865289993158717", name: "jolly_dance" },
			BlindfoldBalancePose: { id: "1313865294929723412", name: "blindfold_balance_pose" },
			CureForMeDance: { id: "1313865271722770433", name: "cure_for_me_dance" },
			Whistle: { id: "1313865278303637547", name: "whistle" },
			Flex: { id: "1313865496944312380", name: "flex" },
			FloatSpin: { id: "1313865497980436510", name: "float_spin" },
			Read: { id: "1313865495480504453", name: "read" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type EmotesEmojis = (typeof EMOTE_EMOJIS)[keyof typeof EMOTE_EMOJIS];

/**
 * Emojis from the stances server.
 */
export const STANCE_EMOJIS = PRODUCTION
	? ({
			Base: { id: "1313932311712108544", name: "base_stance" },
			Courageous: { id: "1313932313356275793", name: "courageous" },
			Confident: { id: "1313932318909534239", name: "confident" },
			Sneaky: { id: "1313932317475078167", name: "sneaky" },
			Proud: { id: "1313932322130755698", name: "proud" },
			Polite: { id: "1313932316086636606", name: "polite" },
			Sassy: { id: "1313932314832535704", name: "sassy" },
			Laidback: { id: "1313932326446698516", name: "laidback" },
			Wise: { id: "1313932320075677697", name: "wise" },
			Timid: { id: "1313932320822001685", name: "timid" },
			Tinker: { id: "1313932325347659918", name: "tinker" },
			Injured: { id: "1313932323598762057", name: "injured" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Base: { id: "1313865789631102977", name: "base_stance" },
			Courageous: { id: "1313865785579671614", name: "courageous" },
			Confident: { id: "1313865782425554977", name: "confident" },
			Sneaky: { id: "1313865779069976648", name: "sneaky" },
			Proud: { id: "1313865783994089502", name: "proud" },
			Polite: { id: "1313865792860721264", name: "polite" },
			Sassy: { id: "1313865787324502077", name: "sassy" },
			Laidback: { id: "1313865786535968860", name: "laidback" },
			Wise: { id: "1313865781200556032", name: "wise" },
			Timid: { id: "1313865791522738296", name: "timid" },
			Tinker: { id: "1313865788851097720", name: "tinker" },
			Injured: { id: "1313865793670221995", name: "injured" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type StancesEmojis = (typeof STANCE_EMOJIS)[keyof typeof STANCE_EMOJIS];

/**
 * Emojis from the calls server.
 */
export const CALL_EMOJIS = PRODUCTION
	? ({
			Base: { id: "1313932583880622080", name: "base_call" },
			Bird: { id: "1313932590448775198", name: "bird" },
			Whale: { id: "1313932587127017473", name: "whale" },
			Manta: { id: "1313932582424940584", name: "manta" },
			CosmicManta: { id: "1313932585419804843", name: "cosmic_manta" },
			Crab: { id: "1313932593158291456", name: "crab" },
			Jellyfish: { id: "1313932581007392828", name: "jellyfish" },
			BabyManta: { id: "1313932591950200952", name: "baby_manta" },
			Nightbird: { id: "1313932588917854239", name: "nightbird" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Base: { id: "1313867161948917871", name: "base_call" },
			Bird: { id: "1313867169045676094", name: "bird" },
			Whale: { id: "1313867164926873600", name: "whale" },
			Manta: { id: "1313867170140262573", name: "manta" },
			CosmicManta: { id: "1313867166621110323", name: "cosmic_manta" },
			Crab: { id: "1313867163005751296", name: "crab" },
			Jellyfish: { id: "1313867163966374048", name: "jellyfish" },
			BabyManta: { id: "1313867160228986891", name: "baby_manta" },
			Nightbird: { id: "1313867168001298557", name: "nightbird" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type CallsEmojis = (typeof CALL_EMOJIS)[keyof typeof CALL_EMOJIS];

/**
 * Emojis from the friend actions server.
 */
export const FRIEND_ACTION_EMOJIS = PRODUCTION
	? ({
			HoldHand: { id: "1313932793620992040", name: "hold_hand" },
			HighFive: { id: "1313932810905714748", name: "high_five" },
			Hug: { id: "1313932795344719933", name: "hug" },
			FistBump: { id: "1313932812520521728", name: "fist_bump" },
			DoubleFive: { id: "1313932796875509833", name: "double_five" },
			HairTousle: { id: "1313932808263307304", name: "hair_tousle" },
			Carry: { id: "1313932800155582515", name: "carry" },
			PlayFight: { id: "1313932804396154950", name: "play_fight" },
			Bearhug: { id: "1313932798066692158", name: "bearhug" },
			Handshake: { id: "1313932806459621476", name: "handshake" },
			DuetDance: { id: "1313932809630388324", name: "duet_dance" },
			SideHug: { id: "1313932813950521446", name: "side_hug" },
			CradleCarry: { id: "1313932802646867978", name: "cradle_carry" },
			DuetBow: { id: "1313932801074004042", name: "duet_bow" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			HoldHand: { id: "1313867568318251110", name: "hold_hand" },
			HighFive: { id: "1313867556389650452", name: "high_five" },
			Hug: { id: "1313867549510733824", name: "hug" },
			FistBump: { id: "1313867559103234089", name: "fist_bump" },
			DoubleFive: { id: "1313867551096438834", name: "double_five" },
			HairTousle: { id: "1313867561766490122", name: "hair_tousle" },
			Carry: { id: "1313867565080117329", name: "carry" },
			PlayFight: { id: "1313867553524682834", name: "play_fight" },
			Bearhug: { id: "1313867558058856468", name: "bearhug" },
			Handshake: { id: "1313867552346341377", name: "handshake" },
			DuetDance: { id: "1313867555190083674", name: "duet_dance" },
			SideHug: { id: "1313867563146416260", name: "side_hug" },
			CradleCarry: { id: "1313867570016944198", name: "cradle_carry" },
			DuetBow: { id: "1313867566653116467", name: "duet_bow" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type FriendActionsEmojis = (typeof FRIEND_ACTION_EMOJIS)[keyof typeof FRIEND_ACTION_EMOJIS];

/**
 * Emojis from the seasons servers.
 */
export const SEASON_EMOJIS = PRODUCTION
	? ({
			Gratitude: { id: "1313932978874744904", name: "gratitude" },
			GratitudeCandle: { id: "1313933013586808832", name: "gratitude_candle" },
			Lightseekers: { id: "1313933017181585490", name: "lightseekers" },
			LightseekersCandle: { id: "1313932983845130240", name: "lightseekers_candle" },
			Belonging: { id: "1313932993597014066", name: "belonging" },
			BelongingCandle: { id: "1313932982632972288", name: "belonging_candle" },
			BelongingHeart: { id: "1313932990640033913", name: "belonging_heart" },
			Rhythm: { id: "1313932988743942195", name: "rhythm" },
			RhythmCandle: { id: "1313933020755005511", name: "rhythm_candle" },
			RhythmHeart: { id: "1313933049754423336", name: "rhythm_heart" },
			Enchantment: { id: "1313933018271842424", name: "enchantment" },
			EnchantmentCandle: { id: "1313932998046912562", name: "enchantment_candle" },
			EnchantmentHeart: { id: "1313933004611129445", name: "enchantment_heart" },
			Sanctuary: { id: "1313932980686946315", name: "sanctuary" },
			SanctuaryCandle: { id: "1313932992460357762", name: "sanctuary_candle" },
			SanctuaryHeart: { id: "1313932987418804329", name: "sanctuary_heart" },
			Prophecy: { id: "1313933000513163294", name: "prophecy" },
			ProphecyCandle: { id: "1313933015730094080", name: "prophecy_candle" },
			ProphecyHeart: { id: "1313933003331993691", name: "prophecy_heart" },
			Dreams: { id: "1313933057387921438", name: "dreams" },
			DreamsCandle: { id: "1313933052291977226", name: "dreams_candle" },
			DreamsHeart: { id: "1313933029432889446", name: "dreams_heart" },
			Assembly: { id: "1313933039101022209", name: "assembly" },
			AssemblyCandle: { id: "1313933022005039237", name: "assembly_candle" },
			AssemblyHeart: { id: "1313933053956984882", name: "assembly_heart" },
			LittlePrince: { id: "1313932994318303343", name: "little_prince" },
			LittlePrinceCandle: { id: "1313932996386226226", name: "little_prince_candle" },
			LittlePrinceHeart: { id: "1313933014677590089", name: "little_prince_heart" },
			Flight: { id: "1313933032633274439", name: "flight" },
			FlightCandle: { id: "1313932985388761149", name: "flight_candle" },
			FlightHeart: { id: "1313933001675116645", name: "flight_heart" },
			Abyss: { id: "1313933050853199923", name: "abyss" },
			AbyssCandle: { id: "1313933055806804019", name: "abyss_candle" },
			AbyssHeart: { id: "1313933024915882045", name: "abyss_heart" },
			Performance: { id: "1313933034260795424", name: "performance" },
			PerformanceCandle: { id: "1313932999443615754", name: "performance_candle" },
			PerformanceHeart: { id: "1313933030884249600", name: "performance_heart" },
			Shattering: { id: "1313933040686465145", name: "shattering" },
			ShatteringCandle: { id: "1313933046604496977", name: "shattering_candle" },
			ShatteringHeart: { id: "1313933048114446376", name: "shattering_heart" },
			Aurora: { id: "1313933045182496828", name: "aurora" },
			AuroraCandle: { id: "1313933037385551965", name: "aurora_candle" },
			AuroraHeart: { id: "1313933043354042379", name: "aurora_heart" },
			Remembrance: { id: "1313933023326240789", name: "remembrance" },
			RemembranceCandle: { id: "1313933012227854346", name: "remembrance_candle" },
			RemembranceHeart: { id: "1313933019844706304", name: "remembrance_heart" },
			Passage: { id: "1313933026534883351", name: "passage" },
			PassageCandle: { id: "1313933035942445207", name: "passage_candle" },
			PassageHeart: { id: "1313933041491644508", name: "passage_heart" },
			Moments: { id: "1313933027608494235", name: "moments" },
			MomentsCandle: { id: "1313933180658778154", name: "moments_candle" },
			MomentsHeart: { id: "1313933182378442812", name: "moments_heart" },
			Revival: { id: "1313933185549336586", name: "revival" },
			RevivalCandle: { id: "1313933177978617866", name: "revival_candle" },
			RevivalHeart: { id: "1313933179803009114", name: "revival_heart" },
			NineColouredDeer: { id: "1313933184299171891", name: "nine_coloureddeer" },
			NineColouredDeerCandle: { id: "1313933196630429706", name: "nine_coloured_deer_candle" },
			NineColouredDeerHeart: { id: "1313933188036431963", name: "nine_coloured_deer_heart" },
			Nesting: { id: "1313933192218153040", name: "nesting" },
			NestingCandle: { id: "1313933193434632244", name: "nesting_candle" },
			NestingHeart: { id: "1313933186744451093", name: "nesting_heart" },
			Duets: { id: "1313933189068357737", name: "duets" },
			DuetsCandle: { id: "1313933195070279813", name: "duets_candle" },
			DuetsHeart: { id: "1313933200246182040", name: "duets_heart" },
			Moomin: { id: "1313933190699679753", name: "moomin" },
			MoominCandle: { id: "1313933197456969731", name: "moomin_candle" },
			MoominHeart: { id: "1313933199667367936", name: "moomin_heart" },
			Radiance: { id: "1330471315458621490", name: "radiance" },
			RadianceCandle: { id: "1330471900178153482", name: "radiance_candle" },
			RadianceHeart: { id: "1330471918305939537", name: "radiance_heart" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Gratitude: { id: "1313868667473367135", name: "gratitude" },
			GratitudeCandle: { id: "1313868669092237384", name: "gratitude_candle" },
			Lightseekers: { id: "1313868678940332074", name: "lightseekers" },
			LightseekersCandle: { id: "1313868704299352207", name: "lightseekers_candle" },
			Belonging: { id: "1313868697173098536", name: "belonging" },
			BelongingCandle: { id: "1313868736289181756", name: "belonging_candle" },
			BelongingHeart: { id: "1313868674846687343", name: "belonging_heart" },
			Rhythm: { id: "1313868662767357953", name: "rhythm" },
			RhythmCandle: { id: "1313868738935914589", name: "rhythm_candle" },
			RhythmHeart: { id: "1313868680450408448", name: "rhythm_heart" },
			Enchantment: { id: "1313868676033675275", name: "enchantment" },
			EnchantmentCandle: { id: "1313868670476484680", name: "enchantment_candle" },
			EnchantmentHeart: { id: "1313868713019310151", name: "enchantment_heart" },
			Sanctuary: { id: "1313868684745244783", name: "sanctuary" },
			SanctuaryCandle: { id: "1313868695293923330", name: "sanctuary_candle" },
			SanctuaryHeart: { id: "1313868707231043655", name: "sanctuary_heart" },
			Prophecy: { id: "1313868731616595998", name: "prophecy" },
			ProphecyCandle: { id: "1313868673751978015", name: "prophecy_candle" },
			ProphecyHeart: { id: "1313868665862619230", name: "prophecy_heart" },
			Dreams: { id: "1313868688096628837", name: "dreams" },
			DreamsCandle: { id: "1313868700138606654", name: "dreams_candle" },
			DreamsHeart: { id: "1313868682744561678", name: "dreams_heart" },
			Assembly: { id: "1313868692274282618", name: "assembly" },
			AssemblyCandle: { id: "1313868730031149096", name: "assembly_candle" },
			AssemblyHeart: { id: "1313868664373645322", name: "assembly_heart" },
			LittlePrince: { id: "1313868681578549260", name: "little_prince" },
			LittlePrinceCandle: { id: "1313868734535958639", name: "little_prince_candle" },
			LittlePrinceHeart: { id: "1313868693989621772", name: "little_prince_heart" },
			Flight: { id: "1313868677346492506", name: "flight" },
			FlightCandle: { id: "1313868709923651636", name: "flight_candle" },
			FlightHeart: { id: "1313868671524802683", name: "flight_heart" },
			Abyss: { id: "1313868737631354920", name: "abyss" },
			AbyssCandle: { id: "1313868705846923367", name: "abyss_candle" },
			AbyssHeart: { id: "1313868689094742058", name: "abyss_heart" },
			Performance: { id: "1313868720824909956", name: "performance" },
			PerformanceCandle: { id: "1313868711387725886", name: "performance_candle" },
			PerformanceHeart: { id: "1313868701904408617", name: "performance_heart" },
			Shattering: { id: "1313868719583133716", name: "shattering" },
			ShatteringCandle: { id: "1313868728231919680", name: "shattering_candle" },
			ShatteringHeart: { id: "1313868709189914787", name: "shattering_heart" },
			Aurora: { id: "1313868733315285022", name: "aurora" },
			AuroraCandle: { id: "1313868716408045578", name: "aurora_candle" },
			AuroraHeart: { id: "1313868714830987404", name: "aurora_heart" },
			Remembrance: { id: "1313868703409897573", name: "remembrance" },
			RemembranceCandle: { id: "1313868727170633750", name: "remembrance_candle" },
			RemembranceHeart: { id: "1313868725627261041", name: "remembrance_heart" },
			Passage: { id: "1313868686712377424", name: "passage" },
			PassageCandle: { id: "1313868717612073063", name: "passage_candle" },
			PassageHeart: { id: "1313868690973921501", name: "passage_heart" },
			Moments: { id: "1313868698578325514", name: "moments" },
			MomentsCandle: { id: "1313868836113743893", name: "moments_candle" },
			MomentsHeart: { id: "1313868834498940949", name: "moments_heart" },
			Revival: { id: "1313868841943826506", name: "revival" },
			RevivalCandle: { id: "1313868837296275476", name: "revival_candle" },
			RevivalHeart: { id: "1313868843554308157", name: "revival_heart" },
			NineColouredDeer: { id: "1313868841251770408", name: "nine_coloureddeer" },
			NineColouredDeerCandle: { id: "1313868847119335569", name: "nine_coloured_deer_candle" },
			NineColouredDeerHeart: { id: "1313868852416741457", name: "nine_coloured_deer_heart" },
			Nesting: { id: "1313868851083214899", name: "nesting" },
			NestingCandle: { id: "1313868855969448040", name: "nesting_candle" },
			NestingHeart: { id: "1313868845856850044", name: "nesting_heart" },
			Duets: { id: "1313868840127692911", name: "duets" },
			DuetsCandle: { id: "1313868849900290108", name: "duets_candle" },
			DuetsHeart: { id: "1313868854295789578", name: "duets_heart" },
			Moomin: { id: "1313868845038960712", name: "moomin" },
			MoominCandle: { id: "1313868838659555389", name: "moomin_candle" },
			MoominHeart: { id: "1313868848763764736", name: "moomin_heart" },
			Radiance: { id: "1330471300128571402", name: "radiance" },
			RadianceCandle: { id: "1330471914988113940", name: "radiance_candle" },
			RadianceHeart: { id: "1330471926933487686", name: "radiance_heart" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

export type SeasonEmojis = (typeof SEASON_EMOJIS)[keyof typeof SEASON_EMOJIS];

/**
 * Emojis from the events server.
 */
export const EVENT_EMOJIS = PRODUCTION
	? ({
			Colour: { id: "1313933371847475321", name: "colour" },
			Music: { id: "1313933384296304680", name: "music" },
			SkyAnniversary: { id: "1313933370115362827", name: "sky_anniversary" },
			AURORAEncore: { id: "1313933374678761622", name: "aurora_encore" },
			Sunlight: { id: "1313933381733453986", name: "sunlight" },
			Style: { id: "1313933390529036431", name: "style" },
			Mischief: { id: "1313933380701782116", name: "mischief" },
			AviarysFireworkFestival: { id: "1313933387303751812", name: "aviarys_firework_festival" },
			Feast: { id: "1313933376423460906", name: "feast" },
			Fortune: { id: "1313933373433188493", name: "fortune" },
			Love: { id: "1313933379397222460", name: "love" },
			Bloom: { id: "1313933388721164288", name: "bloom" },
			SkyXCinnamorollPopUpCafe: {
				id: "1313933377887277086",
				name: "sky_x_cinnamoroll_pop_up_cafe",
			},
			Nature: { id: "1313933391837532171", name: "nature" },
			SkyFest: { id: "1313933383310770176", name: "sky_fest" },
			TournamentOfTriumph: { id: "1313933385735082096", name: "tournament_of_triumph" },
			Moonlight: { id: "1313933393368711248", name: "moonlight" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Colour: { id: "1313869118457385060", name: "colour" },
			Music: { id: "1313869115374440498", name: "music" },
			SkyAnniversary: { id: "1313869122303430743", name: "sky_anniversary" },
			AURORAEncore: { id: "1313869119656955997", name: "aurora_encore" },
			Sunlight: { id: "1313869117278916679", name: "sunlight" },
			Style: { id: "1313869109879898122", name: "style" },
			Mischief: { id: "1313869125264736297", name: "mischief" },
			AviarysFireworkFestival: { id: "1313869123712979086", name: "aviarys_firework_festival" },
			Feast: { id: "1313869104515649571", name: "feast" },
			Fortune: { id: "1313869112384032879", name: "fortune" },
			Love: { id: "1313869114162413568", name: "love" },
			Bloom: { id: "1313869101118132287", name: "bloom" },
			SkyXCinnamorollPopUpCafe: {
				id: "1313869108520947805",
				name: "sky_x_cinnamoroll_pop_up_cafe",
			},
			Nature: { id: "1313869120944734309", name: "nature" },
			SkyFest: { id: "1313869111054569512", name: "sky_fest" },
			TournamentOfTriumph: { id: "1313869102766358528", name: "tournament_of_triumph" },
			Moonlight: { id: "1313869106763530260", name: "moonlight" },
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
			Outfit01: { id: "1313933910828126280", name: "01_outfit" },
			/**
			 * Pointing Candlemaker.
			 */
			Outfit02: { id: "1313933881912725524", name: "02_outfit" },
			/**
			 * Ushering Stargazer.
			 */
			Outfit03: { id: "1313933903412723794", name: "03_outfit" },
			/**
			 * Butterfly Charmer.
			 */
			Outfit04: { id: "1313933831728009247", name: "04_outfit" },
			/**
			 * Shivering Trailblazer.
			 */
			Outfit05: { id: "1313933838581501952", name: "05_outfit" },
			/**
			 * Hide'n'Seek Pioneer.
			 */
			Outfit06: { id: "1313933858747449396", name: "06_outfit" },
			/**
			 * Confident Sightseer.
			 */
			Outfit07: { id: "1313933829148246016", name: "07_outfit" },
			/**
			 * Polite Scholar.
			 */
			Outfit08: { id: "1313933917522231406", name: "08_outfit" },
			/**
			 * Memory Whisperer.
			 */
			Outfit09: { id: "1313933906717835264", name: "09_outfit" },
			/**
			 * Boogie Kid.
			 */
			Outfit10: { id: "1313933832994426881", name: "10_outfit" },
			/**
			 * Troupe Greeter.
			 */
			Outfit11: { id: "1313933883284127797", name: "11_outfit" },
			/**
			 * Troupe Juggler.
			 */
			Outfit12: { id: "1313933842972672023", name: "12_outfit" },
			/**
			 * Festival Spin Dancer.
			 */
			Outfit13: { id: "1313933915831931032", name: "13_outfit" },
			/**
			 * Admiring Actor.
			 */
			Outfit14: { id: "1313933827076259930", name: "14_outfit" },
			/**
			 * Jellyfish Whisperer.
			 */
			Outfit15: { id: "1313933870697287772", name: "15_outfit" },
			/**
			 * Rallying Thrillseeker.
			 */
			Outfit16: { id: "1313933850270765107", name: "16_outfit" },
			/**
			 * Prophet of Fire.
			 */
			Outfit17: { id: "1313933869082349568", name: "17_outfit" },
			/**
			 * Peeking Postman.
			 */
			Outfit18: { id: "1313933830503010354", name: "18_outfit" },
			/**
			 * Bearhug Yeti.
			 */
			Outfit19: { id: "1313933860857450507", name: "19_outfit" },
			/**
			 * Chuckling Scout.
			 */
			Outfit20: { id: "1313933886287249549", name: "20_outfit" },
			/**
			 * Gloating Narcissist.
			 */
			Outfit21: { id: "1313933839676215416", name: "21_outfit" },
			/**
			 * The Rose (non-ultimate).
			 */
			Outfit22: { id: "1313933888673812490", name: "22_outfit" },
			/**
			 * The Rose (ultimate).
			 */
			Outfit23: { id: "1313933901340606464", name: "23_outfit" },
			/**
			 * Flight Guide.
			 */
			Outfit24: { id: "1313933863537348699", name: "24_outfit" },
			/**
			 * Talented Builder.
			 */
			Outfit25: { id: "1313933879169646633", name: "25_outfit" },
			/**
			 * Tinkering Chimesmith.
			 */
			Outfit26: { id: "1313933884731293889", name: "26_outfit" },
			/**
			 * Light Whisperer.
			 */
			Outfit27: { id: "1313933867182194768", name: "27_outfit" },
			/**
			 * Mischief Witch Jumper.
			 */
			Outfit28: { id: "1313933841181835336", name: "28_outfit" },
			/**
			 * Anxious Angler.
			 */
			Outfit29: { id: "1313933872857350165", name: "29_outfit" },
			/**
			 * Modest Dancer.
			 */
			Outfit30: { id: "1313933858047135895", name: "30_outfit" },
			/**
			 * Frantic Stagehand
			 */
			Outfit31: { id: "1313933856012763186", name: "31_outfit" },
			/**
			 * Forgetful Storyteller.
			 */
			Outfit32: { id: "1313933896429080636", name: "32_outfit" },
			/**
			 * Rainbow Trousers.
			 */
			Outfit33: { id: "1313933908206948424", name: "33_outfit" },
			/**
			 * Ancient Light (manta).
			 */
			Outfit34: { id: "1313933865609334805", name: "34_outfit" },
			/**
			 * Mindful Miner.
			 */
			Outfit35: { id: "1313933911876702228", name: "35_outfit" },
			/**
			 * AURORA (ultimate).
			 */
			Outfit36: { id: "1313933913198166026", name: "36_outfit" },
			/**
			 * AURORA (non-ultimate).
			 */
			Outfit37: { id: "1313933891828056176", name: "37_outfit" },
			/**
			 * To The Love Outfit.
			 */
			Outfit38: { id: "1313933909599191090", name: "38_outfit" },
			/**
			 * Runaway Outfit.
			 */
			Outfit39: { id: "1313933890221772860", name: "39_outfit" },
			/**
			 * Pleading Child.
			 */
			Outfit40: { id: "1313933898148741233", name: "40_outfit" },
			/**
			 * Wounded Warrior.
			 */
			Outfit41: { id: "1313933904104656938", name: "41_outfit" },
			/**
			 * Tiptoeing Tea-Brewer.
			 */
			Outfit42: { id: "1313933887566778409", name: "42_outfit" },
			/**
			 * Days of Fortune Muralist's Smock.
			 */
			Outfit43: { id: "1313933895032504360", name: "43_outfit" },
			/**
			 * Bloom Gardening Tunic.
			 */
			Outfit44: { id: "1313933905581310083", name: "44_outfit" },
			/**
			 * Melancholy Mope.
			 */
			Outfit45: { id: "1313933880776069193", name: "45_outfit" },
			/**
			 * Oddball Outcast.
			 */
			Outfit46: { id: "1313933899851632680", name: "46_outfit" },
			/**
			 * Dark Rainbow Tunic.
			 */
			Outfit47: { id: "1313933914456326154", name: "47_outfit" },
			/**
			 * Ascetic Monk.
			 */
			Outfit48: { id: "1313933874987929712", name: "48_outfit" },
			/**
			 * Nightbird Whisperer.
			 */
			Outfit49: { id: "1313933877571751967", name: "49_outfit" },
			/**
			 * Style Wide-Leg Jeans.
			 */
			Outfit50: { id: "1313933893434474606", name: "50_outfit" },
			/**
			 * Memory of a Lost Village.
			 */
			Outfit51: { id: "1313934002150834256", name: "51_outfit" },
			/**
			 * Mischief Goth Garment.
			 */
			Outfit52: { id: "1313934008681234523", name: "52_outfit" },
			/**
			 * Spirit of Mural (ultimate).
			 */
			Outfit53: { id: "1313934014817501198", name: "53_outfit" },
			/**
			 * Herb Gatherer.
			 */
			Outfit54: { id: "1313934005502087189", name: "54_outfit" },
			/**
			 * Hunter.
			 */
			Outfit55: { id: "1313934006932476009", name: "55_outfit" },
			/**
			 * Princess.
			 */
			Outfit56: { id: "1313934013228122235", name: "56_outfit" },
			/**
			 * Days of Fortune Dragon Vestment.
			 */
			Outfit57: { id: "1313934019036975145", name: "57_outfit" },
			/**
			 * Nesting Guide (ultimate).
			 */
			Outfit58: { id: "1313934017166315612", name: "58_outfit" },
			/**
			 * SkyFest 5th Anniversary T-shirt.
			 */
			Outfit59: { id: "1313934020924538890", name: "59_outfit" },
			/**
			 * The Cellist's Beginnings.
			 */
			Outfit60: { id: "1313934004109443164", name: "60_outfit" },
			/**
			 * The Pianist's Beginnings.
			 */
			Outfit61: { id: "1313934023978127410", name: "61_outfit" },
			/**
			 * The Cellist's Flourishing.
			 */
			Outfit62: { id: "1313934011755790447", name: "62_outfit" },
			/**
			 * The Pianist's Flourishing.
			 */
			Outfit63: { id: "1313934010304561193", name: "63_outfit" },
			/**
			 * Tournament Tunic.
			 */
			Outfit64: { id: "1313934034811883560", name: "64_outfit" },
			/**
			 * Sunlight Beach Shorts outfit.
			 */
			Outfit65: { id: "1313934027878563913", name: "65_outfit" },
			/**
			 * Moonlight Frock.
			 */
			Outfit66: { id: "1313934030495940729", name: "66_outfit" },
			/**
			 * Style Dazzling Dress.
			 */
			Outfit67: { id: "1313934031922008154", name: "67_outfit" },
			/**
			 * Style Dapper Suit.
			 */
			Outfit68: { id: "1313934022929420389", name: "68_outfit" },
			/**
			 * Roving Snufkin Robe.
			 */
			Outfit69: { id: "1313934026658152652", name: "69_outfit" },
			/**
			 * The Moomin Storybook (ultimate).
			 */
			Outfit70: { id: "1313934033029431366", name: "70_outfit" },
			/**
			 * Inspiration of Inclusion.
			 */
			Outfit71: { id: "1313934029287850075", name: "71_outfit" },
			/**
			 * Music Marching Uniform.
			 */
			Outfit72: { id: "1313934025106264124", name: "72_outfit" },
			/**
			 * The Moomin Storybook (non-ultimate).
			 */
			Outfit73: { id: "1315724161330577490", name: "73_outfit" },
			/**
			 * Wonderland Primrose Pinafore Set.
			 */
			Outfit74: { id: "1320563769931468810", name: "74_outfit" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Outfit01: { id: "1313869809905172600", name: "01_outfit" },
			Outfit02: { id: "1313869738820239450", name: "02_outfit" },
			Outfit03: { id: "1313869742565752842", name: "03_outfit" },
			Outfit04: { id: "1313869743316402238", name: "04_outfit" },
			Outfit05: { id: "1313869806952386702", name: "05_outfit" },
			Outfit06: { id: "1313869808424583188", name: "06_outfit" },
			Outfit07: { id: "1313869784294887434", name: "07_outfit" },
			Outfit08: { id: "1313869740736778442", name: "08_outfit" },
			Outfit09: { id: "1313869769811824692", name: "09_outfit" },
			Outfit10: { id: "1313869765093363724", name: "10_outfit" },
			Outfit11: { id: "1313869793765363805", name: "11_outfit" },
			Outfit12: { id: "1313869795854254183", name: "12_outfit" },
			Outfit13: { id: "1313869747518967871", name: "13_outfit" },
			Outfit14: { id: "1313869777118302280", name: "14_outfit" },
			Outfit15: { id: "1313869804171690037", name: "15_outfit" },
			Outfit16: { id: "1313869745870733332", name: "16_outfit" },
			Outfit17: { id: "1313869757459726356", name: "17_outfit" },
			Outfit18: { id: "1313869762278854667", name: "18_outfit" },
			Outfit19: { id: "1313869749150814309", name: "19_outfit" },
			Outfit20: { id: "1313869790624088185", name: "20_outfit" },
			Outfit21: { id: "1313869781652344883", name: "21_outfit" },
			Outfit22: { id: "1313869760504660100", name: "22_outfit" },
			Outfit23: { id: "1313869758877274223", name: "23_outfit" },
			Outfit24: { id: "1313869744700657674", name: "24_outfit" },
			Outfit25: { id: "1313869812455182396", name: "25_outfit" },
			Outfit26: { id: "1313869768230703104", name: "26_outfit" },
			Outfit27: { id: "1313869750732066866", name: "27_outfit" },
			Outfit28: { id: "1313869773368721461", name: "28_outfit" },
			Outfit29: { id: "1313869786169741312", name: "29_outfit" },
			Outfit30: { id: "1313869792943276062", name: "30_outfit" },
			Outfit31: { id: "1313869805631176735", name: "31_outfit" },
			Outfit32: { id: "1313869763511976020", name: "32_outfit" },
			Outfit33: { id: "1313869798299668511", name: "33_outfit" },
			Outfit34: { id: "1313869800585433149", name: "34_outfit" },
			Outfit35: { id: "1313869766460702720", name: "35_outfit" },
			Outfit36: { id: "1313869740346839062", name: "36_outfit" },
			Outfit37: { id: "1313869789323595837", name: "37_outfit" },
			Outfit38: { id: "1313869771309318174", name: "38_outfit" },
			Outfit39: { id: "1313869787650330646", name: "39_outfit" },
			Outfit40: { id: "1313869791601365004", name: "40_outfit" },
			Outfit41: { id: "1313869815055781939", name: "41_outfit" },
			Outfit42: { id: "1313869772429201441", name: "42_outfit" },
			Outfit43: { id: "1313869811402543105", name: "43_outfit" },
			Outfit44: { id: "1313869778712002590", name: "44_outfit" },
			Outfit45: { id: "1313869780473741312", name: "45_outfit" },
			Outfit46: { id: "1313869799754960927", name: "46_outfit" },
			Outfit47: { id: "1313869802640506920", name: "47_outfit" },
			Outfit48: { id: "1313869775440576593", name: "48_outfit" },
			Outfit49: { id: "1313869813613068308", name: "49_outfit" },
			Outfit50: { id: "1313869782386343987", name: "50_outfit" },
			Outfit51: { id: "1313919393331413043", name: "51_outfit" },
			Outfit52: { id: "1313919419428372513", name: "52_outfit" },
			Outfit53: { id: "1313919400859930756", name: "53_outfit" },
			Outfit54: { id: "1313919412956434463", name: "54_outfit" },
			Outfit55: { id: "1313919420669628416", name: "55_outfit" },
			Outfit56: { id: "1313919418287263826", name: "56_outfit" },
			Outfit57: { id: "1313919397408145408", name: "57_outfit" },
			Outfit58: { id: "1313919395784949874", name: "58_outfit" },
			Outfit59: { id: "1313919422355865650", name: "59_outfit" },
			Outfit60: { id: "1313919415007580192", name: "60_outfit" },
			Outfit61: { id: "1313919408912994314", name: "61_outfit" },
			Outfit62: { id: "1313919400121729075", name: "62_outfit" },
			Outfit63: { id: "1313919425052807309", name: "63_outfit" },
			Outfit64: { id: "1313919406090489867", name: "64_outfit" },
			Outfit65: { id: "1313919409852776651", name: "65_outfit" },
			Outfit66: { id: "1313919416874045530", name: "66_outfit" },
			Outfit67: { id: "1313919398603390996", name: "67_outfit" },
			Outfit68: { id: "1313919423307845673", name: "68_outfit" },
			Outfit69: { id: "1313919404924469269", name: "69_outfit" },
			Outfit70: { id: "1313919402793635862", name: "70_outfit" },
			Outfit71: { id: "1313919414181302322", name: "71_outfit" },
			Outfit72: { id: "1313919411211604051", name: "72_outfit" },
			Outfit73: { id: "1315724340121178122", name: "73_outfit" },
			Outfit74: { id: "1320563623567032350", name: "74_outfit" },
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
			Shoe01: { id: "1313934732756652142", name: "01_shoe" },
			/**
			 * Days of Mischief 2021.
			 */
			Shoe02: { id: "1313934728906145852", name: "02_shoe" },
			/**
			 * Pleading Child.
			 */
			Shoe03: { id: "1313934739475922945", name: "03_shoe" },
			/**
			 * Nightbird Whisperer.
			 */
			Shoe04: { id: "1313934744110628885", name: "04_shoe" },
			/**
			 * Musical Voyage Sneakers.
			 */
			Shoe05: { id: "1313934741107376200", name: "05_shoe" },
			/**
			 * Sunlight Chunky Sandals.
			 */
			Shoe06: { id: "1313934735218839563", name: "06_shoe" },
			/**
			 * Style Silk Ballet Slippers.
			 */
			Shoe07: { id: "1313934748933947473", name: "07_shoe" },
			/**
			 * Style Bunny Slippers.
			 */
			Shoe08: { id: "1313934745662525580", name: "08_shoe" },
			/**
			 * Vestige of a Deserted Oasis.
			 */
			Shoe09: { id: "1313934733821870100", name: "09_shoe" },
			/**
			 * Echo of an Abandoned Refuge.
			 */
			Shoe10: { id: "1313934747155697756", name: "10_shoe" },
			/**
			 * Remnant of a Forgotten Haven.
			 */
			Shoe11: { id: "1313934736577531957", name: "11_shoe" },
			/**
			 * Mischief Goth Boots.
			 */
			Shoe12: { id: "1313934751836540979", name: "12_shoe" },
			/**
			 * Cosy Hermit Boots.
			 */
			Shoe13: { id: "1313934750020538499", name: "13_shoe" },
			/**
			 * Dark Rainbow Loafers.
			 */
			Shoe14: { id: "1313934731120873522", name: "14_shoe" },
			/**
			 * The Pianist's Flourishing.
			 */
			Shoe15: { id: "1313934742717988874", name: "15_shoe" },
			/**
			 * Sense of Self.
			 */
			Shoe16: { id: "1313934738477813800", name: "16_shoe" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Shoe01: { id: "1313919703458119770", name: "01_shoe" },
			Shoe02: { id: "1313919688484454570", name: "02_shoe" },
			Shoe03: { id: "1313919699360415885", name: "03_shoe" },
			Shoe04: { id: "1313919691462283387", name: "04_shoe" },
			Shoe05: { id: "1313919692313726998", name: "05_shoe" },
			Shoe06: { id: "1313919702002565190", name: "06_shoe" },
			Shoe07: { id: "1313919704959811724", name: "07_shoe" },
			Shoe08: { id: "1313919708612923473", name: "08_shoe" },
			Shoe09: { id: "1313919696440922133", name: "09_shoe" },
			Shoe10: { id: "1313919689709060147", name: "10_shoe" },
			Shoe11: { id: "1313919697946804344", name: "11_shoe" },
			Shoe12: { id: "1313919710139519006", name: "12_shoe" },
			Shoe13: { id: "1313919695229026358", name: "13_shoe" },
			Shoe14: { id: "1313919700844937296", name: "14_shoe" },
			Shoe15: { id: "1313919706809241681", name: "15_shoe" },
			Shoe16: { id: "1313919693664288770", name: "16_shoe" },
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
			Mask01: { id: "1313935107651801239", name: "01_mask" },
			/**
			 * Waving Bellmaker.
			 */
			Mask02: { id: "1313935113607839754", name: "02_mask" },
			/**
			 * Hide'n'Seek Pioneer.
			 */
			Mask03: { id: "1313935104988676279", name: "03_mask" },
			/**
			 * Proud Victor.
			 */
			Mask04: { id: "1313935103524606075", name: "04_mask" },
			/**
			 * Fainting Warrior.
			 */
			Mask05: { id: "1313935112412598384", name: "05_mask" },
			/**
			 * Provoking Performer.
			 */
			Mask06: { id: "1313935121237413959", name: "06_mask" },
			/**
			 * Leaping Dancer.
			 */
			Mask07: { id: "1313935155861127340", name: "07_mask" },
			/**
			 * Saluting Protector.
			 */
			Mask08: { id: "1313935109518397591", name: "08_mask" },
			/**
			 * Greeting Shaman.
			 */
			Mask09: { id: "1313935125204963398", name: "09_mask" },
			/**
			 * Season of Gratitude ultimate.
			 */
			Mask10: { id: "1313935114962731078", name: "10_mask" },
			/**
			 * Sassy Drifter.
			 */
			Mask11: { id: "1313935122524934236", name: "11_mask" },
			/**
			 * Piggyback Lightseeker.
			 */
			Mask12: { id: "1313935147225190451", name: "12_mask" },
			/**
			 * Doublefive Light Catcher.
			 */
			Mask13: { id: "1313935106322468946", name: "13_mask" },
			/**
			 * Laidback Pioneer.
			 */
			Mask14: { id: "1313935152124264533", name: "14_mask" },
			/**
			 * Twirling Champion.
			 */
			Mask15: { id: "1313935120159342746", name: "15_mask" },
			/**
			 * Crab Whisperer.
			 */
			Mask16: { id: "1313935133337849916", name: "16_mask" },
			/**
			 * Shushing Light Scholar.
			 */
			Mask17: { id: "1313935124005519371", name: "17_mask" },
			/**
			 * Boogie Kid.
			 */
			Mask18: { id: "1313935127998369974", name: "18_mask" },
			/**
			 * Wise Grandparent.
			 */
			Mask19: { id: "1313935174249091153", name: "19_mask" },
			/**
			 * Pleaful Parent.
			 */
			Mask20: { id: "1313935126446608406", name: "20_mask" },
			/**
			 * Sparkler Parent.
			 */
			Mask21: { id: "1313935132276559932", name: "21_mask" },
			/**
			 * Rhythm Guide (ultimate).
			 */
			Mask22: { id: "1313935160449699910", name: "22_mask" },
			/**
			 * Troupe Greeter.
			 */
			Mask23: { id: "1313935116955025551", name: "23_mask" },
			/**
			 * Admiring Actor.
			 */
			Mask24: { id: "1313935110776815707", name: "24_mask" },
			/**
			 * Thoughtful Director.
			 */
			Mask25: { id: "1313935149188255784", name: "25_mask" },
			/**
			 * Respectful Pianist.
			 */
			Mask26: { id: "1313935165793239070", name: "26_mask" },
			/**
			 * Nodding Muralist.
			 */
			Mask27: { id: "1313935150568050780", name: "27_mask" },
			/**
			 * Playfighting Herbalist.
			 */
			Mask28: { id: "1313935138568147046", name: "28_mask" },
			/**
			 * Indifferent Alchemist.
			 */
			Mask29: { id: "1313935130405900383", name: "29_mask" },
			/**
			 * Scarecrow Farmer.
			 */
			Mask30: { id: "1313935144511340605", name: "30_mask" },
			/**
			 * Hiking Grouch.
			 */
			Mask31: { id: "1313935129407918131", name: "31_mask" },
			/**
			 * Prophet of Water.
			 */
			Mask32: { id: "1313935139645948016", name: "32_mask" },
			/**
			 * Prophet of Earth.
			 */
			Mask33: { id: "1313935136731041793", name: "33_mask" },
			/**
			 * Prophet of Air.
			 */
			Mask34: { id: "1313935134839275590", name: "34_mask" },
			/**
			 * Prophet of Fire.
			 */
			Mask35: { id: "1313935141982437487", name: "35_mask" },
			/**
			 * Prophecy Guide (ultimate).
			 */
			Mask36: { id: "1313935153848127508", name: "36_mask" },
			/**
			 * Peeking Postman.
			 */
			Mask37: { id: "1313935163364741152", name: "37_mask" },
			/**
			 * Dancing Performer.
			 */
			Mask38: { id: "1313935167391531078", name: "38_mask" },
			/**
			 * Spinning Mentor.
			 */
			Mask39: { id: "1313935140527013909", name: "39_mask" },
			/**
			 * Dreams Guide (ultimate).
			 */
			Mask40: { id: "1313935158721908776", name: "40_mask" },
			/**
			 * Fortune Blushing Mask.
			 */
			Mask41: { id: "1313935178124496896", name: "41_mask" },
			/**
			 * Days of Fortune 2021 Bull Mask.
			 */
			Mask42: { id: "1313935176270872597", name: "42_mask" },
			/**
			 * Days of Love 2021.
			 */
			Mask43: { id: "1313935168750489681", name: "43_mask" },
			/**
			 * Assembly Guide (ultimate).
			 */
			Mask44: { id: "1313935155026464788", name: "44_mask" },
			/**
			 * Marching Adventurer.
			 */
			Mask45: { id: "1313935146097053788", name: "45_mask" },
			/**
			 * Chuckling Scout.
			 */
			Mask46: { id: "1313935170486927461", name: "46_mask" },
			/**
			 * Daydream Forester.
			 */
			Mask47: { id: "1313935171950739466", name: "47_mask" },
			/**
			 * Scolding Student.
			 */
			Mask48: { id: "1313935161955450880", name: "48_mask" },
			/**
			 * Baffled Botanist.
			 */
			Mask49: { id: "1313935157593640960", name: "49_mask" },
			/**
			 * Scaredy Cadet.
			 */
			Mask50: { id: "1313935143190138963", name: "50_mask" },
			/**
			 * Beckoning Ruler.
			 */
			Mask51: { id: "1313935254784049222", name: "51_mask" },
			/**
			 * Bumbling Boatswain.
			 */
			Mask52: { id: "1313935256117706844", name: "52_mask" },
			/**
			 * Ceasing Commodore.
			 */
			Mask53: { id: "1313935313428545597", name: "53_mask" },
			/**
			 * Cackling Cannoneer.
			 */
			Mask54: { id: "1313935259955494965", name: "54_mask" },
			/**
			 * Abyss Guide (ultimate).
			 */
			Mask55: { id: "1313935258848067685", name: "55_mask" },
			/**
			 * Abyss Guide (non-ultimate).
			 */
			Mask56: { id: "1313935263147495466", name: "56_mask" },
			/**
			 * Anxious Angler.
			 */
			Mask57: { id: "1313935276380524584", name: "57_mask" },
			/**
			 * Days of Fortune Tiger Mask.
			 */
			Mask58: { id: "1313935264284151840", name: "58_mask" },
			/**
			 * Performance Guide (ultimate).
			 */
			Mask59: { id: "1313935257673793646", name: "59_mask" },
			/**
			 * Modest Dancer.
			 */
			Mask60: { id: "1313935269589684234", name: "60_mask" },
			/**
			 * Frantic Stagehand.
			 */
			Mask61: { id: "1313935267387670590", name: "61_mask" },
			/**
			 * Performance Guide (non-ultimate).
			 */
			Mask62: { id: "1313935265936576614", name: "62_mask" },
			/**
			 * Forgetful Storyteller.
			 */
			Mask63: { id: "1313935261448802345", name: "63_mask" },
			/**
			 * Mellow Musician.
			 */
			Mask64: { id: "1313935273435856946", name: "64_mask" },
			/**
			 * Ancient Darkness (plant).
			 */
			Mask65: { id: "1313935314774917182", name: "65_mask" },
			/**
			 * Seed of Hope.
			 */
			Mask66: { id: "1313935293426171995", name: "66_mask" },
			/**
			 * Running Wayfarer.
			 */
			Mask67: { id: "1313935270764347533", name: "67_mask" },
			/**
			 * Warrior of Love.
			 */
			Mask68: { id: "1313935308626071622", name: "68_mask" },
			/**
			 * Mindful Miner.
			 */
			Mask69: { id: "1313935279169474570", name: "69_mask" },
			/**
			 * AURORA (non-ultimate).
			 */
			Mask70: { id: "1313935283854774455", name: "70_mask" },
			/**
			 * Days of Mischief 2022.
			 */
			Mask71: { id: "1313935295124607068", name: "71_mask" },
			/**
			 * Journey Mask.
			 */
			Mask72: { id: "1313935277676302396", name: "72_mask" },
			/**
			 * Bereft Veteran.
			 */
			Mask73: { id: "1313935280960569395", name: "73_mask" },
			/**
			 * Wounded Warrior.
			 */
			Mask74: { id: "1313935311872720928", name: "74_mask" },
			/**
			 * Days of Fortune Rabbit Mask.
			 */
			Mask75: { id: "1313935301474914445", name: "75_mask" },
			/**
			 * Passage Guide (ultimate).
			 */
			Mask76: { id: "1313935268499292251", name: "76_mask" },
			/**
			 * Passage Guide (non-ultimate 1).
			 */
			Mask77: { id: "1313935298425655306", name: "77_mask" },
			/**
			 * Passage Guide (non-ultimate 2).
			 */
			Mask78: { id: "1313935288845996214", name: "78_mask" },
			/**
			 * Passage Guide (non-ultimate 3).
			 */
			Mask79: { id: "1313935302913425409", name: "79_mask" },
			/**
			 * Passage Guide (non-ultimate 4).
			 */
			Mask80: { id: "1313935288065589248", name: "80_mask" },
			/**
			 * Reassuring Ranger.
			 */
			Mask81: { id: "1313935286438334467", name: "81_mask" },
			/**
			 * Ascetic Monk.
			 */
			Mask82: { id: "1313935282709729353", name: "82_mask" },
			/**
			 * Style Runway Mask.
			 */
			Mask83: { id: "1313935274815914096", name: "83_mask" },
			/**
			 * Mischief Crabula Mask.
			 */
			Mask84: { id: "1313935305954295919", name: "84_mask" },
			/**
			 * Sparrow Appreciation.
			 */
			Mask85: { id: "1313935271934427206", name: "85_mask" },
			/**
			 * Spirit of Mural (non-ultimate).
			 */
			Mask86: { id: "1313935285444149258", name: "86_mask" },
			/**
			 * Feudal Lord.
			 */
			Mask87: { id: "1313935304566247434", name: "87_mask" },
			/**
			 * Princess.
			 */
			Mask88: { id: "1313935307376164874", name: "88_mask" },
			/**
			 * Gift of the Nine-Coloured Deer.
			 */
			Mask89: { id: "1313935291609780384", name: "89_mask" },
			/**
			 * Fortune Dragon Mask.
			 */
			Mask90: { id: "1313935310329221232", name: "90_mask" },
			/**
			 * Ocean Mask.
			 */
			Mask91: { id: "1313935290095898635", name: "91_mask" },
			/**
			 * Dark Rainbow Mask.
			 */
			Mask92: { id: "1313935296844271707", name: "92_mask" },
			/**
			 * Duets Guide (non-ultimate).
			 */
			Mask93: { id: "1313935299767963799", name: "93_mask" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Mask01: { id: "1313919848769781872", name: "01_mask" },
			Mask02: { id: "1313919852456710154", name: "02_mask" },
			Mask03: { id: "1313919865635082260", name: "03_mask" },
			Mask04: { id: "1313919842189049978", name: "04_mask" },
			Mask05: { id: "1313919845401755679", name: "05_mask" },
			Mask06: { id: "1313919858735448146", name: "06_mask" },
			Mask07: { id: "1313919843635957842", name: "07_mask" },
			Mask08: { id: "1313919846588612629", name: "08_mask" },
			Mask09: { id: "1313919849788866632", name: "09_mask" },
			Mask10: { id: "1313919859939213312", name: "10_mask" },
			Mask11: { id: "1313919851298947092", name: "11_mask" },
			Mask12: { id: "1313919847708491837", name: "12_mask" },
			Mask13: { id: "1313919874090795069", name: "13_mask" },
			Mask14: { id: "1313919862656995439", name: "14_mask" },
			Mask15: { id: "1313919856516530229", name: "15_mask" },
			Mask16: { id: "1313919855610695701", name: "16_mask" },
			Mask17: { id: "1313919883037376592", name: "17_mask" },
			Mask18: { id: "1313919877420941506", name: "18_mask" },
			Mask19: { id: "1313919886283640936", name: "19_mask" },
			Mask20: { id: "1313919868650786879", name: "20_mask" },
			Mask21: { id: "1313919896228466739", name: "21_mask" },
			Mask22: { id: "1313919902083715173", name: "22_mask" },
			Mask23: { id: "1313919864372596836", name: "23_mask" },
			Mask24: { id: "1313919903836930139", name: "24_mask" },
			Mask25: { id: "1313919871460970570", name: "25_mask" },
			Mask26: { id: "1313919889060134912", name: "26_mask" },
			Mask27: { id: "1313919870412525668", name: "27_mask" },
			Mask28: { id: "1313919890712956989", name: "28_mask" },
			Mask29: { id: "1313919909192929361", name: "29_mask" },
			Mask30: { id: "1313919891845419089", name: "30_mask" },
			Mask31: { id: "1313919907699752980", name: "31_mask" },
			Mask32: { id: "1313919875650945095", name: "32_mask" },
			Mask33: { id: "1313919854134169631", name: "33_mask" },
			Mask34: { id: "1313919894651404371", name: "34_mask" },
			Mask35: { id: "1313919905749401600", name: "35_mask" },
			Mask36: { id: "1313919892818366516", name: "36_mask" },
			Mask37: { id: "1313919881279963229", name: "37_mask" },
			Mask38: { id: "1313919879476416524", name: "38_mask" },
			Mask39: { id: "1313919914913828985", name: "39_mask" },
			Mask40: { id: "1313919899193704448", name: "40_mask" },
			Mask41: { id: "1313919897989808178", name: "41_mask" },
			Mask42: { id: "1313919884375359610", name: "42_mask" },
			Mask43: { id: "1313919887361703950", name: "43_mask" },
			Mask44: { id: "1313919910983897162", name: "44_mask" },
			Mask45: { id: "1313919878545149994", name: "45_mask" },
			Mask46: { id: "1313919861411414150", name: "46_mask" },
			Mask47: { id: "1313919867056816228", name: "47_mask" },
			Mask48: { id: "1313919900808646778", name: "48_mask" },
			Mask49: { id: "1313919916641878047", name: "49_mask" },
			Mask50: { id: "1313919912904888391", name: "50_mask" },
			Mask51: { id: "1313920376128012390", name: "51_mask" },
			Mask52: { id: "1313920361158410362", name: "52_mask" },
			Mask53: { id: "1313920365294256139", name: "53_mask" },
			Mask54: { id: "1313920364547674112", name: "54_mask" },
			Mask55: { id: "1313920367546339369", name: "55_mask" },
			Mask56: { id: "1313920353872908388", name: "56_mask" },
			Mask57: { id: "1313920371925323847", name: "57_mask" },
			Mask58: { id: "1313920411620081754", name: "58_mask" },
			Mask59: { id: "1313920355319939124", name: "59_mask" },
			Mask60: { id: "1313920356670509086", name: "60_mask" },
			Mask61: { id: "1313920382650159176", name: "61_mask" },
			Mask62: { id: "1313920358234980393", name: "62_mask" },
			Mask63: { id: "1313920374747959316", name: "63_mask" },
			Mask64: { id: "1313920389516234786", name: "64_mask" },
			Mask65: { id: "1313920408390598798", name: "65_mask" },
			Mask66: { id: "1313920368687321118", name: "66_mask" },
			Mask67: { id: "1313920362920022186", name: "67_mask" },
			Mask68: { id: "1313920391567118406", name: "68_mask" },
			Mask69: { id: "1313920388606070804", name: "69_mask" },
			Mask70: { id: "1313920381538664508", name: "70_mask" },
			Mask71: { id: "1313920396147429446", name: "71_mask" },
			Mask72: { id: "1313920380276052069", name: "72_mask" },
			Mask73: { id: "1313920397275693117", name: "73_mask" },
			Mask74: { id: "1313920377369395282", name: "74_mask" },
			Mask75: { id: "1313920378686406656", name: "75_mask" },
			Mask76: { id: "1313920373120831521", name: "76_mask" },
			Mask77: { id: "1313920386869493762", name: "77_mask" },
			Mask78: { id: "1313920395073556552", name: "78_mask" },
			Mask79: { id: "1313920399876296746", name: "79_mask" },
			Mask80: { id: "1313920404842221681", name: "80_mask" },
			Mask81: { id: "1313920370193203220", name: "81_mask" },
			Mask82: { id: "1313920384579539027", name: "82_mask" },
			Mask83: { id: "1313920403193724949", name: "83_mask" },
			Mask84: { id: "1313920407690022932", name: "84_mask" },
			Mask85: { id: "1313920359438749797", name: "85_mask" },
			Mask86: { id: "1313920410236096574", name: "86_mask" },
			Mask87: { id: "1313920385514868748", name: "87_mask" },
			Mask88: { id: "1313920401637773422", name: "88_mask" },
			Mask89: { id: "1313920392720683089", name: "89_mask" },
			Mask90: { id: "1313920406377332757", name: "90_mask" },
			Mask91: { id: "1313920393953939500", name: "91_mask" },
			Mask92: { id: "1313920398295040020", name: "92_mask" },
			Mask93: { id: "1313920383770169407", name: "93_mask" },
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
			FaceAccessory01: { id: "1313935533063274557", name: "01_face_accessory" },
			/**
			 * Exhausted Dock Worker.
			 */
			FaceAccessory02: { id: "1313935545356783646", name: "02_face_accessory" },
			/**
			 * Apologetic Lumberjack.
			 */
			FaceAccessory03: { id: "1313935555611988120", name: "03_face_accessory" },
			/**
			 * Backflipping Champion.
			 */
			FaceAccessory04: { id: "1313935538826252471", name: "04_face_accessory" },
			/**
			 * Bowing Medalist.
			 */
			FaceAccessory05: { id: "1313935566580088932", name: "05_face_accessory" },
			/**
			 * Lookout Scout.
			 */
			FaceAccessory06: { id: "1313935539631689820", name: "06_face_accessory" },
			/**
			 * Levitating Adept.
			 */
			FaceAccessory07: { id: "1313935541703802910", name: "07_face_accessory" },
			/**
			 * Hairtousle Teen.
			 */
			FaceAccessory08: { id: "1313935572443856977", name: "08_face_accessory" },
			/**
			 * Enchantment Guide (ultimate).
			 */
			FaceAccessory09: { id: "1313935550125838346", name: "09_face_accessory" },
			/**
			 * Chill Sunbather.
			 */
			FaceAccessory10: { id: "1313935551342186647", name: "10_face_accessory" },
			/**
			 * Days of Feast Horns.
			 */
			FaceAccessory11: { id: "1313935537203052675", name: "11_face_accessory" },
			/**
			 * Bearhug Hermit.
			 */
			FaceAccessory12: { id: "1313935534942457896", name: "12_face_accessory" },
			/**
			 * Rainbow braid.
			 */
			FaceAccessory13: { id: "1313935552944275488", name: "13_face_accessory" },
			/**
			 * Mischief Withered Antlers.
			 */
			FaceAccessory14: { id: "1313935554429190254", name: "14_face_accessory" },
			/**
			 * Abyss Guide (ultimate).
			 */
			FaceAccessory15: { id: "1313935592731443250", name: "15_face_accessory" },
			/**
			 * Rainbow Earring.
			 */
			FaceAccessory16: { id: "1313935547810578453", name: "16_face_accessory" },
			/**
			 * Rainbow Headphones.
			 */
			FaceAccessory17: { id: "1313935578747768854", name: "17_face_accessory" },
			/**
			 * Elder of the Isle.
			 */
			FaceAccessory18: { id: "1313935577212653650", name: "18_face_accessory" },
			/**
			 * Elder of the Prairie.
			 */
			FaceAccessory19: { id: "1313935546904477706", name: "19_face_accessory" },
			/**
			 * Elder of the Forest.
			 */
			FaceAccessory20: { id: "1313935556534734910", name: "20_face_accessory" },
			/**
			 * Tiara We Can Touch.
			 */
			FaceAccessory21: { id: "1313935588474228866", name: "21_face_accessory" },
			/**
			 * Feast Goggles.
			 */
			FaceAccessory22: { id: "1313935558103273472", name: "22_face_accessory" },
			/**
			 * Melancholy Mope.
			 */
			FaceAccessory23: { id: "1313935587627110560", name: "23_face_accessory" },
			/**
			 * Tumbling Troublemaker.
			 */
			FaceAccessory24: { id: "1313935543696097380", name: "24_face_accessory" },
			/**
			 * Nature Glasses.
			 */
			FaceAccessory25: { id: "1313935562348167208", name: "25_face_accessory" },
			/**
			 * Days of Colour 2023.
			 */
			FaceAccessory26: { id: "1313935565112217680", name: "26_face_accessory" },
			/**
			 * Reassuring Ranger.
			 */
			FaceAccessory27: { id: "1313935575505440839", name: "27_face_accessory" },
			/**
			 * Moments Guide (ultimate).
			 */
			FaceAccessory28: { id: "1313935569440739359", name: "28_face_accessory" },
			/**
			 * Jolly Geologist.
			 */
			FaceAccessory29: { id: "1313935570820665407", name: "29_face_accessory" },
			/**
			 * Style Star Sunglasses.
			 */
			FaceAccessory30: { id: "1313935568165539871", name: "30_face_accessory" },
			/**
			 * Style Flame Sunglasses.
			 */
			FaceAccessory31: { id: "1313935559525400667", name: "31_face_accessory" },
			/**
			 * Style Heart Sunglasses.
			 */
			FaceAccessory32: { id: "1313935586058567771", name: "32_face_accessory" },
			/**
			 * Festival Earrings.
			 */
			FaceAccessory33: { id: "1313935584045301791", name: "33_face_accessory" },
			/**
			 * Gift of the Nine-Coloured Deer.
			 */
			FaceAccessory34: { id: "1313935563610394624", name: "34_face_accessory" },
			/**
			 * Days of Fortune Dragon Bangles.
			 */
			FaceAccessory35: { id: "1313935589833179230", name: "35_face_accessory" },
			/**
			 * Compassionate Cellist.
			 */
			FaceAccessory36: { id: "1313935581046116412", name: "36_face_accessory" },
			/**
			 * Sunlight Helios Hoops earrings.
			 */
			FaceAccessory37: { id: "1313935574088028160", name: "37_face_accessory" },
			/**
			 * Moonlight earrings.
			 */
			FaceAccessory38: { id: "1313935591502643200", name: "38_face_accessory" },
			/**
			 * Style Dapper Monocle.
			 */
			FaceAccessory39: { id: "1313935582761717780", name: "39_face_accessory" },
			/**
			 * Mischief Star Sticker.
			 */
			FaceAccessory40: { id: "1313935561022636072", name: "40_face_accessory" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			FaceAccessory01: { id: "1313920630118420562", name: "01_face_accessory" },
			FaceAccessory02: { id: "1313920619875668099", name: "02_face_accessory" },
			FaceAccessory03: { id: "1313920570496389212", name: "03_face_accessory" },
			FaceAccessory04: { id: "1313920596676972635", name: "04_face_accessory" },
			FaceAccessory05: { id: "1313920587621732382", name: "05_face_accessory" },
			FaceAccessory06: { id: "1313920571335114753", name: "06_face_accessory" },
			FaceAccessory07: { id: "1313920622971326554", name: "07_face_accessory" },
			FaceAccessory08: { id: "1313920618265182259", name: "08_face_accessory" },
			FaceAccessory09: { id: "1313920585302147092", name: "09_face_accessory" },
			FaceAccessory10: { id: "1313920632051863617", name: "10_face_accessory" },
			FaceAccessory11: { id: "1313920583980814336", name: "11_face_accessory" },
			FaceAccessory12: { id: "1313920574334173277", name: "12_face_accessory" },
			FaceAccessory13: { id: "1313920625311744052", name: "13_face_accessory" },
			FaceAccessory14: { id: "1313920586493333627", name: "14_face_accessory" },
			FaceAccessory15: { id: "1313920568449302542", name: "15_face_accessory" },
			FaceAccessory16: { id: "1313920616482738256", name: "16_face_accessory" },
			FaceAccessory17: { id: "1313920573306310827", name: "17_face_accessory" },
			FaceAccessory18: { id: "1313920633503219826", name: "18_face_accessory" },
			FaceAccessory19: { id: "1313920598258483293", name: "19_face_accessory" },
			FaceAccessory20: { id: "1313920610497335316", name: "20_face_accessory" },
			FaceAccessory21: { id: "1313920600988975196", name: "21_face_accessory" },
			FaceAccessory22: { id: "1313920631334502493", name: "22_face_accessory" },
			FaceAccessory23: { id: "1313920577601536041", name: "23_face_accessory" },
			FaceAccessory24: { id: "1313920615299678208", name: "24_face_accessory" },
			FaceAccessory25: { id: "1313920612015542445", name: "25_face_accessory" },
			FaceAccessory26: { id: "1313920626872029306", name: "26_face_accessory" },
			FaceAccessory27: { id: "1313920595192315967", name: "27_face_accessory" },
			FaceAccessory28: { id: "1313920621263982642", name: "28_face_accessory" },
			FaceAccessory29: { id: "1313920580667310111", name: "29_face_accessory" },
			FaceAccessory30: { id: "1313920624573284472", name: "30_face_accessory" },
			FaceAccessory31: { id: "1313920576079007856", name: "31_face_accessory" },
			FaceAccessory32: { id: "1313920628834828378", name: "32_face_accessory" },
			FaceAccessory33: { id: "1313920582651215902", name: "33_face_accessory" },
			FaceAccessory34: { id: "1313920604042432613", name: "34_face_accessory" },
			FaceAccessory35: { id: "1313920613525487696", name: "35_face_accessory" },
			FaceAccessory36: { id: "1313920578440138773", name: "36_face_accessory" },
			FaceAccessory37: { id: "1313920602817564802", name: "37_face_accessory" },
			FaceAccessory38: { id: "1313920604939747450", name: "38_face_accessory" },
			FaceAccessory39: { id: "1313920608677134378", name: "39_face_accessory" },
			FaceAccessory40: { id: "1313920607028777020", name: "40_face_accessory" },
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
			Necklace01: { id: "1313935763599130694", name: "necklace_01" },
			/**
			 * Lightseekers Pendant.
			 */
			Necklace02: { id: "1313935760109600849", name: "necklace_02" },
			/**
			 * Belonging Pendant.
			 */
			Necklace03: { id: "1313935761518624899", name: "necklace_03" },
			/**
			 * Rhythm Pendant.
			 */
			Necklace04: { id: "1313935770482118676", name: "necklace_04" },
			/**
			 * Enchantment Pendant.
			 */
			Necklace05: { id: "1313935769190268979", name: "necklace_05" },
			/**
			 * Sanctuary Pendant.
			 */
			Necklace06: { id: "1313935767575461919", name: "necklace_06" },
			/**
			 * Hiking Grouch.
			 */
			Necklace07: { id: "1313935766035894282", name: "necklace_07" },
			/**
			 * Prophecy Pendant.
			 */
			Necklace08: { id: "1313935764676939777", name: "necklace_08" },
			/**
			 * Days of Feast 2020.
			 */
			Necklace09: { id: "1313935778048643214", name: "necklace_09" },
			/**
			 * Dreams Pendant.
			 */
			Necklace10: { id: "1313935780737060937", name: "necklace_10" },
			/**
			 * Assembly Pendant.
			 */
			Necklace11: { id: "1313935776052023329", name: "necklace_11" },
			/**
			 * Ocean Necklace.
			 */
			Necklace12: { id: "1313935801654182030", name: "necklace_12" },
			/**
			 * Little Prince Pendant.
			 */
			Necklace13: { id: "1313935826413158481", name: "necklace_13" },
			/**
			 * Star Collector.
			 */
			Necklace14: { id: "1313935814648135692", name: "necklace_14" },
			/**
			 * Flight Pendant.
			 */
			Necklace15: { id: "1313935771849326703", name: "necklace_15" },
			/**
			 * Talented Builder.
			 */
			Necklace16: { id: "1313935782570102886", name: "necklace_16" },
			/**
			 * Winter Feast Scarf.
			 */
			Necklace17: { id: "1313935792196030536", name: "necklace_17" },
			/**
			 * Abyss Pendant.
			 */
			Necklace18: { id: "1313935794746167366", name: "necklace_18" },
			/**
			 * Performance Pendant.
			 */
			Necklace19: { id: "1313935773883568179", name: "necklace_19" },
			/**
			 * Days of Nature 2022.
			 */
			Necklace20: { id: "1313935779411791976", name: "necklace_20" },
			/**
			 * Shattering Pendant.
			 */
			Necklace21: { id: "1313935792934096917", name: "necklace_21" },
			/**
			 * Ancient Darkness (dragon).
			 */
			Necklace22: { id: "1313935789888901191", name: "necklace_22" },
			/**
			 * Jelly Shoulder Buddy.
			 */
			Necklace23: { id: "1313935796352319509", name: "necklace_23" },
			/**
			 * AURORA Pendant.
			 */
			Necklace24: { id: "1313935803348549642", name: "necklace_24" },
			/**
			 * Remembrance Pendant.
			 */
			Necklace25: { id: "1313935799116370001", name: "necklace_25" },
			/**
			 * Pleading Child.
			 */
			Necklace26: { id: "1313935806821564467", name: "necklace_26" },
			/**
			 * Remembrance Guide.
			 */
			Necklace27: { id: "1313935830904999986", name: "necklace_27" },
			/**
			 * Days of Love Classy Cravat.
			 */
			Necklace28: { id: "1313935819018600491", name: "necklace_28" },
			/**
			 * Passage Pendant.
			 */
			Necklace29: { id: "1313935804804108438", name: "necklace_29" },
			/**
			 * Oddball Outcast.
			 */
			Necklace30: { id: "1313935797661208607", name: "necklace_30" },
			/**
			 * Moments Pendant.
			 */
			Necklace31: { id: "1313935800731172864", name: "necklace_31" },
			/**
			 * Revival Pendant.
			 */
			Necklace32: { id: "1313935808079724575", name: "necklace_32" },
			/**
			 * Nine-Coloured Deer Pendant.
			 */
			Necklace33: { id: "1313935809547862049", name: "necklace_33" },
			/**
			 * Nesting Pendant.
			 */
			Necklace34: { id: "1313935832687579146", name: "necklace_34" },
			/**
			 * Cinnamoroll Pop-Up Cafe Bowtie.
			 */
			Necklace35: { id: "1313935824873586740", name: "necklace_35" },
			/**
			 * Ocean Blue Scarf.
			 */
			Necklace36: { id: "1313935827973308447", name: "necklace_36" },
			/**
			 * Duets Pendant.
			 */
			Necklace37: { id: "1313935815881134122", name: "necklace_37" },
			/**
			 * Style Dapper Necktie.
			 */
			Necklace38: { id: "1313935821807685772", name: "necklace_38" },
			/**
			 * Hattifattener Shoulder Buddy.
			 */
			Necklace39: { id: "1313935811497951235", name: "necklace_39" },
			/**
			 * Roving Snufkin Scarf.
			 */
			Necklace40: { id: "1313935791067627520", name: "necklace_40" },
			/**
			 * Moomintroll Tail.
			 */
			Necklace41: { id: "1313935817600667668", name: "necklace_41" },
			/**
			 * Moomin Pendant.
			 */
			Necklace42: { id: "1313935823015776267", name: "necklace_42" },
			/**
			 * Comfort of Kindness.
			 */
			Necklace43: { id: "1313935820385943712", name: "necklace_43" },
			/**
			 * Sense of Self.
			 */
			Necklace44: { id: "1313935829202370580", name: "necklace_44" },
			/**
			 * Inspiration of Inclusion.
			 */
			Necklace45: { id: "1313935812668424214", name: "necklace_45" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Necklace01: { id: "1313920866920435712", name: "necklace_01" },
			Necklace02: { id: "1313920801229246608", name: "necklace_02" },
			Necklace03: { id: "1313920876667998211", name: "necklace_03" },
			Necklace04: { id: "1313920838763811008", name: "necklace_04" },
			Necklace05: { id: "1313920868195373207", name: "necklace_05" },
			Necklace06: { id: "1313920872657977475", name: "necklace_06" },
			Necklace07: { id: "1313920818132160665", name: "necklace_07" },
			Necklace08: { id: "1313920871194427412", name: "necklace_08" },
			Necklace09: { id: "1313920878798704721", name: "necklace_09" },
			Necklace10: { id: "1313920821399519244", name: "necklace_10" },
			Necklace11: { id: "1313920806002229318", name: "necklace_11" },
			Necklace12: { id: "1313920849568338060", name: "necklace_12" },
			Necklace13: { id: "1313920847651541134", name: "necklace_13" },
			Necklace14: { id: "1313920813577011232", name: "necklace_14" },
			Necklace15: { id: "1313920865360154655", name: "necklace_15" },
			Necklace16: { id: "1313920814814466068", name: "necklace_16" },
			Necklace17: { id: "1313920832996905002", name: "necklace_17" },
			Necklace18: { id: "1313920825568530594", name: "necklace_18" },
			Necklace19: { id: "1313920809802137611", name: "necklace_19" },
			Necklace20: { id: "1313920828592623617", name: "necklace_20" },
			Necklace21: { id: "1313920861379624990", name: "necklace_21" },
			Necklace22: { id: "1313920874671505448", name: "necklace_22" },
			Necklace23: { id: "1313920860251492574", name: "necklace_23" },
			Necklace24: { id: "1313920854312091679", name: "necklace_24" },
			Necklace25: { id: "1313920840664088586", name: "necklace_25" },
			Necklace26: { id: "1313920842035626035", name: "necklace_26" },
			Necklace27: { id: "1313920864479219773", name: "necklace_27" },
			Necklace28: { id: "1313920808065699912", name: "necklace_28" },
			Necklace29: { id: "1313920858900664442", name: "necklace_29" },
			Necklace30: { id: "1313920797772877958", name: "necklace_30" },
			Necklace31: { id: "1313920835047657553", name: "necklace_31" },
			Necklace32: { id: "1313920822762541130", name: "necklace_32" },
			Necklace33: { id: "1313920827506298903", name: "necklace_33" },
			Necklace34: { id: "1313920824482332772", name: "necklace_34" },
			Necklace35: { id: "1313920856728010762", name: "necklace_35" },
			Necklace36: { id: "1313920843880861766", name: "necklace_36" },
			Necklace37: { id: "1313920792932778004", name: "necklace_37" },
			Necklace38: { id: "1313920819377737792", name: "necklace_38" },
			Necklace39: { id: "1313920830748495923", name: "necklace_39" },
			Necklace40: { id: "1313920845596332186", name: "necklace_40" },
			Necklace41: { id: "1313920851477008466", name: "necklace_41" },
			Necklace42: { id: "1313920836784095325", name: "necklace_42" },
			Necklace43: { id: "1313920795763802113", name: "necklace_43" },
			Necklace44: { id: "1313920815838007378", name: "necklace_44" },
			Necklace45: { id: "1313920862830989324", name: "necklace_45" },
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
			Hair01: { id: "1313936059306082354", name: "01_hair" },
			/**
			 * Pointing Candlemaker.
			 */
			Hair02: { id: "1313936058165235746", name: "02_hair" },
			/**
			 * Ushering Stargazer.
			 */
			Hair03: { id: "1313936060388216953", name: "03_hair" },
			/**
			 * Rejecting Voyager.
			 */
			Hair04: { id: "1313936061914681424", name: "04_hair" },
			/**
			 * Applauding Bellmaker.
			 */
			Hair05: { id: "1313936076972228731", name: "05_hair" },
			/**
			 * Waving Bellmaker.
			 */
			Hair06: { id: "1313936068210593893", name: "06_hair" },
			/**
			 * Slumbering Shipwright.
			 */
			Hair07: { id: "1313936080717873203", name: "07_hair" },
			/**
			 * Laughing Light Catcher.
			 */
			Hair08: { id: "1313936075827187782", name: "08_hair" },
			/**
			 * Bird Whisperer.
			 */
			Hair09: { id: "1313936065093959802", name: "09_hair" },
			/**
			 * Shivering Trailblazer.
			 */
			Hair10: { id: "1313936109553582133", name: "10_hair" },
			/**
			 * Blushing Prospector.
			 */
			Hair11: { id: "1313936066767622295", name: "11_hair" },
			/**
			 * Hide'n'Seek Pioneer.
			 */
			Hair12: { id: "1313936056034529403", name: "12_hair" },
			/**
			 * Pouty Porter.
			 */
			Hair13: { id: "1313936091778387990", name: "13_hair" },
			/**
			 * Dismayed Hunter.
			 */
			Hair14: { id: "1313936111688482899", name: "14_hair" },
			/**
			 * Apologetic Lumberjack.
			 */
			Hair15: { id: "1313936071343734887", name: "15_hair" },
			/**
			 * Tearful Light Miner.
			 */
			Hair16: { id: "1313936063391338618", name: "16_hair" },
			/**
			 * Confident Sightseer.
			 */
			Hair17: { id: "1313936083154636820", name: "17_hair" },
			/**
			 * Backflipping Champion.
			 */
			Hair18: { id: "1313936078549422142", name: "18_hair" },
			/**
			 * Cheerful Spectator.
			 */
			Hair19: { id: "1313936087957114880", name: "19_hair" },
			/**
			 * Bowing Medalist.
			 */
			Hair20: { id: "1313936122476494879", name: "20_hair" },
			/**
			 * Frightened Refugee.
			 */
			Hair21: { id: "1313936084828160102", name: "21_hair" },
			/**
			 * Fainting Warrior.
			 */
			Hair22: { id: "1313936072442515467", name: "22_hair" },
			/**
			 * Courageous Soldier.
			 */
			Hair23: { id: "1313936119297212506", name: "23_hair" },
			/**
			 * Stealthy Survivor.
			 */
			Hair24: { id: "1313936102234521620", name: "24_hair" },
			/**
			 * Saluting Captain.
			 */
			Hair25: { id: "1313936108236701736", name: "25_hair" },
			/**
			 * Praying Acolyte.
			 */
			Hair26: { id: "1313936090910162985", name: "26_hair" },
			/**
			 * Levitating Adept.
			 */
			Hair27: { id: "1313936105719988344", name: "27_hair" },
			/**
			 * Polite Scholar.
			 */
			Hair28: { id: "1313936129795428354", name: "28_hair" },
			/**
			 * Meditating Monastic.
			 */
			Hair29: { id: "1313936086703018036", name: "29_hair" },
			/**
			 * Elder of the Isle.
			 */
			Hair30: { id: "1313936093711958086", name: "30_hair" },
			/**
			 * Elder of the Prairie.
			 */
			Hair31: { id: "1313936114834477146", name: "31_hair" },
			/**
			 * Elder of the Forest.
			 */
			Hair32: { id: "1313936081510596609", name: "32_hair" },
			/**
			 * Elder of the Valley 1.
			 */
			Hair33: { id: "1313936106827550861", name: "33_hair" },
			/**
			 * Elder of the Valley 2.
			 */
			Hair34: { id: "1313936073600274452", name: "34_hair" },
			/**
			 * Elder of the Wasteland.
			 */
			Hair35: { id: "1313936096815485041", name: "35_hair" },
			/**
			 * Elder of the Vault.
			 */
			Hair36: { id: "1313936115585253408", name: "36_hair" },
			/**
			 * Sassy Drifter.
			 */
			Hair37: { id: "1313936124514930739", name: "37_hair" },
			/**
			 * Provoking Performer.
			 */
			Hair38: { id: "1313936128335806474", name: "38_hair" },
			/**
			 * Stretching Guru.
			 */
			Hair39: { id: "1313936123671609374", name: "39_hair" },
			/**
			 * Crab Whisperer.
			 */
			Hair40: { id: "1313936089224056945", name: "40_hair" },
			/**
			 * Twirling Champion.
			 */
			Hair41: { id: "1313936069330206762", name: "41_hair" },
			/**
			 * Piggyback Lightseeker.
			 */
			Hair42: { id: "1313936095032901664", name: "42_hair" },
			/**
			 * Laidback Pioneer.
			 */
			Hair43: { id: "1313936100192161916", name: "43_hair" },
			/**
			 * Doublefive Light Catcher.
			 */
			Hair44: { id: "1313936098220576829", name: "44_hair" },
			/**
			 * Hungry Pumpkin Hat.
			 */
			Hair45: { id: "1313936103581155329", name: "45_hair" },
			/**
			 * Confetti Cousin.
			 */
			Hair46: { id: "1313936113240375408", name: "46_hair" },
			/**
			 * Sparkler Parent.
			 */
			Hair47: { id: "1313936131611430962", name: "47_hair" },
			/**
			 * Days of Feast 2019.
			 */
			Hair48: { id: "1313936117409517618", name: "48_hair" },
			/**
			 * Festival Spin Dancer.
			 */
			Hair49: { id: "1313936126825730048", name: "49_hair" },
			/**
			 * Troupe Juggler.
			 */
			Hair50: { id: "1313936120496521348", name: "50_hair" },
			/**
			 * Respectful Pianist.
			 */
			Hair51: { id: "1313936265078509708", name: "51_hair" },
			/**
			 * Rhythm Guide (ultimate).
			 */
			Hair52: { id: "1313936259701280808", name: "52_hair" },
			/**
			 * Nodding Muralist.
			 */
			Hair53: { id: "1313936269633654935", name: "53_hair" },
			/**
			 * Scarecrow Farmer.
			 */
			Hair54: { id: "1313936290848182333", name: "54_hair" },
			/**
			 * Snoozing Carpenter.
			 */
			Hair55: { id: "1313936284397338725", name: "55_hair" },
			/**
			 * Crab Walker.
			 */
			Hair56: { id: "1313936323270279250", name: "56_hair" },
			/**
			 * Indifferent Alchemist.
			 */
			Hair57: { id: "1313936255783927881", name: "57_hair" },
			/**
			 * Playfighting Herbalist.
			 */
			Hair58: { id: "1313936252315369552", name: "58_hair" },
			/**
			 * Enchantment Ultimate.
			 */
			Hair59: { id: "1313936250759151616", name: "59_hair" },
			/**
			 * Jelly Whisperer.
			 */
			Hair60: { id: "1313936253879845025", name: "60_hair" },
			/**
			 * Timid Bookworm.
			 */
			Hair61: { id: "1313936273190420650", name: "61_hair" },
			/**
			 * Rallying Thrillseeker.
			 */
			Hair62: { id: "1313936267691688109", name: "62_hair" },
			/**
			 * Hiking Grouch.
			 */
			Hair63: { id: "1313936282715689020", name: "63_hair" },
			/**
			 * Grateful Shell Collector.
			 */
			Hair64: { id: "1313936262943739985", name: "64_hair" },
			/**
			 * Prophet of Water.
			 */
			Hair65: { id: "1313936257616969869", name: "65_hair" },
			/**
			 * Prophet of Earth.
			 */
			Hair66: { id: "1313936297047494699", name: "66_hair" },
			/**
			 * Prophet of Air.
			 */
			Hair67: { id: "1313936306379948106", name: "67_hair" },
			/**
			 * Prophet of Fire.
			 */
			Hair68: { id: "1313936266735386624", name: "68_hair" },
			/**
			 * Mischief Witch Hat.
			 */
			Hair69: { id: "1313936326504091658", name: "69_hair" },
			/**
			 * Bearhug Hermit.
			 */
			Hair70: { id: "1313936271554642023", name: "70_hair" },
			/**
			 * Dancing Performer.
			 */
			Hair71: { id: "1313936261316218891", name: "71_hair" },
			/**
			 * Spinning Mentor.
			 */
			Hair72: { id: "1313936279552921741", name: "72_hair" },
			/**
			 * Days of Fortune 2021 1.
			 */
			Hair73: { id: "1313936275526647830", name: "73_hair" },
			/**
			 * Days of Fortune Wool Hat.
			 */
			Hair74: { id: "1313936287094411425", name: "74_hair" },
			/**
			 * Days of Fortune 2021 2.
			 */
			Hair75: { id: "1313936277741244477", name: "75_hair" },
			/**
			 * Days of Bloom 2021.
			 */
			Hair76: { id: "1313936288956813362", name: "76_hair" },
			/**
			 * Assembly Guide (ultimate).
			 */
			Hair77: { id: "1313936285647241348", name: "77_hair" },
			/**
			 * Daydream Forester.
			 */
			Hair78: { id: "1313936329016610886", name: "78_hair" },
			/**
			 * Marching Adventurer.
			 */
			Hair79: { id: "1313936280526127216", name: "79_hair" },
			/**
			 * Baffled Botanist.
			 */
			Hair80: { id: "1313936274272288820", name: "80_hair" },
			/**
			 * Scolding Student.
			 */
			Hair81: { id: "1313936294077796514", name: "81_hair" },
			/**
			 * Scaredy Cadet.
			 */
			Hair82: { id: "1313936303192277044", name: "82_hair" },
			/**
			 * Rainbow Hat.
			 */
			Hair83: { id: "1313936298720891012", name: "83_hair" },
			/**
			 * Nintendo Switch.
			 */
			Hair84: { id: "1313936315682656338", name: "84_hair" },
			/**
			 * Slouching Soldier.
			 */
			Hair85: { id: "1313936327749668945", name: "85_hair" },
			/**
			 * Gloating Narcissist.
			 */
			Hair86: { id: "1313936301271158884", name: "86_hair" },
			/**
			 * Stretching Lamplighter.
			 */
			Hair87: { id: "1313936292337160333", name: "87_hair" },
			/**
			 * Beckoning Ruler.
			 */
			Hair88: { id: "1313936312436264970", name: "88_hair" },
			/**
			 * Sneezing Geographer.
			 */
			Hair89: { id: "1313936295583813733", name: "89_hair" },
			/**
			 * The Rose (ultimate).
			 */
			Hair90: { id: "1313936308216791090", name: "90_hair" },
			/**
			 * Talented Builder.
			 */
			Hair91: { id: "1313936330430087229", name: "91_hair" },
			/**
			 * Tinkering Chimesmith.
			 */
			Hair92: { id: "1313936317322629170", name: "92_hair" },
			/**
			 * Light Whisperer.
			 */
			Hair93: { id: "1313936304777592883", name: "93_hair" },
			/**
			 * Lively Navigator.
			 */
			Hair94: { id: "1313936309404041258", name: "94_hair" },
			/**
			 * Mischief Witch Hair.
			 */
			Hair95: { id: "1313936322255257700", name: "95_hair" },
			/**
			 * Mischief Spider Quiff.
			 */
			Hair96: { id: "1313936314189611109", name: "96_hair" },
			/**
			 * Winter Feast Hat.
			 */
			Hair97: { id: "1313936319000481802", name: "97_hair" },
			/**
			 * Cackling Cannoneer.
			 */
			Hair98: { id: "1313936324817977374", name: "98_hair" },
			/**
			 * Ceasing Commodore.
			 */
			Hair99: { id: "1313936320648839310", name: "99_hair" },
			/**
			 * Anxious Angler.
			 */
			Hair100: { id: "1313936299702485024", name: "100_hair" },
			/**
			 * Days of Fortune 2022 1.
			 */
			Hair101: { id: "1313936447354703974", name: "101_hair" },
			/**
			 * Kizuna AI.
			 */
			Hair102: { id: "1313936460818415710", name: "102_hair" },
			/**
			 * Performance Guide (ultimate).
			 */
			Hair103: { id: "1313936473766236162", name: "103_hair" },
			/**
			 * Modest Dancer.
			 */
			Hair104: { id: "1313936441893584937", name: "104_hair" },
			/**
			 * Frantic Stagehand.
			 */
			Hair105: { id: "1313936449539805237", name: "105_hair" },
			/**
			 * Forgetful Storyteller.
			 */
			Hair106: { id: "1313936467822776460", name: "106_hair" },
			/**
			 * Mellow Musician.
			 */
			Hair107: { id: "1313936444892512398", name: "107_hair" },
			/**
			 * Ancient Darkness (dragon).
			 */
			Hair108: { id: "1313936472239247450", name: "108_hair" },
			/**
			 * Ancient Light (manta).
			 */
			Hair109: { id: "1313936450525462569", name: "109_hair" },
			/**
			 * Ancient Light (jellyfish).
			 */
			Hair110: { id: "1313936459279110246", name: "110_hair" },
			/**
			 * Seed of Hope.
			 */
			Hair111: { id: "1313936454283694181", name: "111_hair" },
			/**
			 * Running Wayfarer.
			 */
			Hair112: { id: "1313936452585001161", name: "112_hair" },
			/**
			 * Warrior of Love.
			 */
			Hair113: { id: "1313936457341079562", name: "113_hair" },
			/**
			 * Mindful Miner.
			 */
			Hair114: { id: "1313936482783727707", name: "114_hair" },
			/**
			 * Runaway Hairstyle.
			 */
			Hair115: { id: "1313936464253423638", name: "115_hair" },
			/**
			 * AURORA (ultimate).
			 */
			Hair116: { id: "1313936443323842631", name: "116_hair" },
			/**
			 * Mischief Tufted Hair.
			 */
			Hair117: { id: "1313936506758500382", name: "117_hair" },
			/**
			 * PlayStation.
			 */
			Hair118: { id: "1313936465931141131", name: "118_hair" },
			/**
			 * Pleading Child.
			 */
			Hair119: { id: "1313936455571083396", name: "119_hair" },
			/**
			 * Bereft Veteran.
			 */
			Hair120: { id: "1313936479365496852", name: "120_hair" },
			/**
			 * Tiptoeing Tea-Brewer.
			 */
			Hair121: { id: "1313936494724907058", name: "121_hair" },
			/**
			 * Tumbling Troublemaker.
			 */
			Hair122: { id: "1313936504971726898", name: "122_hair" },
			/**
			 * Melancholy Mope.
			 */
			Hair123: { id: "1313936475787759656", name: "123_hair" },
			/**
			 * Overactive Overachiever.
			 */
			Hair124: { id: "1313936487783338188", name: "124_hair" },
			/**
			 * Oddball Outcast.
			 */
			Hair125: { id: "1313936440274718742", name: "125_hair" },
			/**
			 * Marching Band Hat.
			 */
			Hair126: { id: "1313936490098856019", name: "126_hair" },
			/**
			 * Nightbird Whisperer.
			 */
			Hair127: { id: "1313936463074820116", name: "127_hair" },
			/**
			 * Ascetic Monk.
			 */
			Hair128: { id: "1313936493101977761", name: "128_hair" },
			/**
			 * Jolly Geologist.
			 */
			Hair129: { id: "1313936469429325845", name: "129_hair" },
			/**
			 * Vestige of a Deserted Oasis.
			 */
			Hair130: { id: "1313936470972698734", name: "130_hair" },
			/**
			 * Memory of a Lost Village.
			 */
			Hair131: { id: "1313936499166810112", name: "131_hair" },
			/**
			 * Hopeful Steward (ultimate).
			 */
			Hair132: { id: "1313936491851812896", name: "132_hair" },
			/**
			 * Hopeful Steward (non-ultimate).
			 */
			Hair133: { id: "1313936502354612285", name: "133_hair" },
			/**
			 * Base 2.
			 */
			Hair134: { id: "1313936486378246285", name: "134_hair" },
			/**
			 * Base 3.
			 */
			Hair135: { id: "1313936477616345118", name: "135_hair" },
			/**
			 * Spirit of Mural (ultimate).
			 */
			Hair136: { id: "1313936481005473854", name: "136_hair" },
			/**
			 * Herb Gatherer.
			 */
			Hair137: { id: "1313936497795141653", name: "137_hair" },
			/**
			 * Hunter.
			 */
			Hair138: { id: "1313936484662775829", name: "138_hair" },
			/**
			 * Princess.
			 */
			Hair139: { id: "1313936496373534893", name: "139_hair" },
			/**
			 * Bloom Spiky Sprig Hair.
			 */
			Hair140: { id: "1313936500844400782", name: "140_hair" },
			/**
			 * Bloom Arum Petal Hair.
			 */
			Hair141: { id: "1313936507999879179", name: "141_hair" },
			/**
			 * Nesting Atrium.
			 */
			Hair142: { id: "1313936529529503744", name: "142_hair" },
			/**
			 * Cinnamoroll Pop-Up Cafe Combo.
			 */
			Hair143: { id: "1313936525007917088", name: "143_hair" },
			/**
			 * Nature Wave-Touched Hair.
			 */
			Hair144: { id: "1313936528279343177", name: "144_hair" },
			/**
			 * Colour Glam Cut.
			 */
			Hair145: { id: "1313936521262530671", name: "145_hair" },
			/**
			 * The Cellist's Beginnings.
			 */
			Hair146: { id: "1313936519681146920", name: "146_hair" },
			/**
			 * The Pianist's Beginnings.
			 */
			Hair147: { id: "1313936526983434330", name: "147_hair" },
			/**
			 * Tournament Curls.
			 */
			Hair148: { id: "1313936518313672766", name: "148_hair" },
			/**
			 * Moonlight Updo.
			 */
			Hair149: { id: "1313936509530935387", name: "149_hair" },
			/**
			 * Comfort of Kindness.
			 */
			Hair150: { id: "1313936510550147145", name: "150_hair" },
			/**
			 * Spirit of Adventure.
			 */
			Hair151: { id: "1313936669644427365", name: "151_hair" },
			/**
			 * Mischief Spider Bun.
			 */
			Hair152: { id: "1313936667773505647", name: "152_hair" },
			/**
			 * Wonderland Frantic Hair.
			 */
			Hair153: { id: "1320564267895754772", name: "153_hair" },
			/**
			 * Wonderland Hare Hairstyle.
			 */
			Hair154: { id: "1320565117187784807", name: "154_hair" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Hair01: { id: "1313921255413383228", name: "01_hair" },
			Hair02: { id: "1313921248488853575", name: "02_hair" },
			Hair03: { id: "1313921287651065996", name: "03_hair" },
			Hair04: { id: "1313921238355152967", name: "04_hair" },
			Hair05: { id: "1313921230104956928", name: "05_hair" },
			Hair06: { id: "1313921228855050325", name: "06_hair" },
			Hair07: { id: "1313921261180817448", name: "07_hair" },
			Hair08: { id: "1313921285931401238", name: "08_hair" },
			Hair09: { id: "1313921231543730237", name: "09_hair" },
			Hair10: { id: "1313921257741353043", name: "10_hair" },
			Hair11: { id: "1313921239504392263", name: "11_hair" },
			Hair12: { id: "1313921250069970954", name: "12_hair" },
			Hair13: { id: "1313921268327907328", name: "13_hair" },
			Hair14: { id: "1313921269431009290", name: "14_hair" },
			Hair15: { id: "1313921237126479972", name: "15_hair" },
			Hair16: { id: "1313921244156133427", name: "16_hair" },
			Hair17: { id: "1313921263198273651", name: "17_hair" },
			Hair18: { id: "1313921227798216795", name: "18_hair" },
			Hair19: { id: "1313921256801960047", name: "19_hair" },
			Hair20: { id: "1313921221334925363", name: "20_hair" },
			Hair21: { id: "1313921224664944651", name: "21_hair" },
			Hair22: { id: "1313921223008321606", name: "22_hair" },
			Hair23: { id: "1313921235389911095", name: "23_hair" },
			Hair24: { id: "1313921262271070358", name: "24_hair" },
			Hair25: { id: "1313921247020847185", name: "25_hair" },
			Hair26: { id: "1313921225839480955", name: "26_hair" },
			Hair27: { id: "1313921234723012648", name: "27_hair" },
			Hair28: { id: "1313921233141760050", name: "28_hair" },
			Hair29: { id: "1313921240649564160", name: "29_hair" },
			Hair30: { id: "1313921291161571479", name: "30_hair" },
			Hair31: { id: "1313921252788015124", name: "31_hair" },
			Hair32: { id: "1313921264959754341", name: "32_hair" },
			Hair33: { id: "1313921272383668235", name: "33_hair" },
			Hair34: { id: "1313921274472431626", name: "34_hair" },
			Hair35: { id: "1313921253941448835", name: "35_hair" },
			Hair36: { id: "1313921251324203109", name: "36_hair" },
			Hair37: { id: "1313921292486967397", name: "37_hair" },
			Hair38: { id: "1313921290117185627", name: "38_hair" },
			Hair39: { id: "1313921276078981130", name: "39_hair" },
			Hair40: { id: "1313921259649892373", name: "40_hair" },
			Hair41: { id: "1313921284022734868", name: "41_hair" },
			Hair42: { id: "1313921277324562492", name: "42_hair" },
			Hair43: { id: "1313921282525630495", name: "43_hair" },
			Hair44: { id: "1313921281053163622", name: "44_hair" },
			Hair45: { id: "1313921270899019786", name: "45_hair" },
			Hair46: { id: "1313921278721396797", name: "46_hair" },
			Hair47: { id: "1313921288837795882", name: "47_hair" },
			Hair48: { id: "1313921241559601164", name: "48_hair" },
			Hair49: { id: "1313921266566303765", name: "49_hair" },
			Hair50: { id: "1313921245502378016", name: "50_hair" },
			Hair51: { id: "1313921391849902191", name: "51_hair" },
			Hair52: { id: "1313921441435222139", name: "52_hair" },
			Hair53: { id: "1313921439862358077", name: "53_hair" },
			Hair54: { id: "1313921463836868649", name: "54_hair" },
			Hair55: { id: "1313921446061412363", name: "55_hair" },
			Hair56: { id: "1313921429259157626", name: "56_hair" },
			Hair57: { id: "1313921438503272449", name: "57_hair" },
			Hair58: { id: "1313921397613002812", name: "58_hair" },
			Hair59: { id: "1313921430802530376", name: "59_hair" },
			Hair60: { id: "1313921393057857632", name: "60_hair" },
			Hair61: { id: "1313921423013707817", name: "61_hair" },
			Hair62: { id: "1313921404592328735", name: "62_hair" },
			Hair63: { id: "1313921405242576997", name: "63_hair" },
			Hair64: { id: "1313921416999080057", name: "64_hair" },
			Hair65: { id: "1313921414100815922", name: "65_hair" },
			Hair66: { id: "1313921412980932638", name: "66_hair" },
			Hair67: { id: "1313921400989421599", name: "67_hair" },
			Hair68: { id: "1313921394588909578", name: "68_hair" },
			Hair69: { id: "1313921444329164873", name: "69_hair" },
			Hair70: { id: "1313921390088290384", name: "70_hair" },
			Hair71: { id: "1313921406823829606", name: "71_hair" },
			Hair72: { id: "1313921464994369557", name: "72_hair" },
			Hair73: { id: "1313921420174037094", name: "73_hair" },
			Hair74: { id: "1313921447588003941", name: "74_hair" },
			Hair75: { id: "1313921455670558783", name: "75_hair" },
			Hair76: { id: "1313921449039495331", name: "76_hair" },
			Hair77: { id: "1313921399110242508", name: "77_hair" },
			Hair78: { id: "1313921442865348628", name: "78_hair" },
			Hair79: { id: "1313921403451478126", name: "79_hair" },
			Hair80: { id: "1313921468962439329", name: "80_hair" },
			Hair81: { id: "1313921395675238432", name: "81_hair" },
			Hair82: { id: "1313921418131673144", name: "82_hair" },
			Hair83: { id: "1313921421704958052", name: "83_hair" },
			Hair84: { id: "1313921409592070254", name: "84_hair" },
			Hair85: { id: "1313921452931809280", name: "85_hair" },
			Hair86: { id: "1313921458891788439", name: "86_hair" },
			Hair87: { id: "1313921415749177415", name: "87_hair" },
			Hair88: { id: "1313921470501486684", name: "88_hair" },
			Hair89: { id: "1313921402042323017", name: "89_hair" },
			Hair90: { id: "1313921466147930222", name: "90_hair" },
			Hair91: { id: "1313921450758901780", name: "91_hair" },
			Hair92: { id: "1313921408090243133", name: "92_hair" },
			Hair93: { id: "1313921460632424539", name: "93_hair" },
			Hair94: { id: "1313921454177255506", name: "94_hair" },
			Hair95: { id: "1313921457365061673", name: "95_hair" },
			Hair96: { id: "1313921462377123845", name: "96_hair" },
			Hair97: { id: "1313921451878780989", name: "97_hair" },
			Hair98: { id: "1313921437173678090", name: "98_hair" },
			Hair99: { id: "1313921467292979398", name: "99_hair" },
			Hair100: { id: "1313921472246317106", name: "100_hair" },
			Hair101: { id: "1313921685145260103", name: "101_hair" },
			Hair102: { id: "1313921712647180289", name: "102_hair" },
			Hair103: { id: "1313921692820705432", name: "103_hair" },
			Hair104: { id: "1313921678425985034", name: "104_hair" },
			Hair105: { id: "1313921676093947997", name: "105_hair" },
			Hair106: { id: "1313921747145199769", name: "106_hair" },
			Hair107: { id: "1313921673791016974", name: "107_hair" },
			Hair108: { id: "1313921681353343087", name: "108_hair" },
			Hair109: { id: "1313921720499048572", name: "109_hair" },
			Hair110: { id: "1313921722247811092", name: "110_hair" },
			Hair111: { id: "1313921736051261504", name: "111_hair" },
			Hair112: { id: "1313921679466168434", name: "112_hair" },
			Hair113: { id: "1313921688471207986", name: "113_hair" },
			Hair114: { id: "1313921759623512135", name: "114_hair" },
			Hair115: { id: "1313921728094670868", name: "115_hair" },
			Hair116: { id: "1313921706317840435", name: "116_hair" },
			Hair117: { id: "1313921737989165157", name: "117_hair" },
			Hair118: { id: "1313921716753272854", name: "118_hair" },
			Hair119: { id: "1313921683027005484", name: "119_hair" },
			Hair120: { id: "1313921696406700143", name: "120_hair" },
			Hair121: { id: "1313921690459443332", name: "121_hair" },
			Hair122: { id: "1313921705042907216", name: "122_hair" },
			Hair123: { id: "1313921743492091916", name: "123_hair" },
			Hair124: { id: "1313921701674745887", name: "124_hair" },
			Hair125: { id: "1313921739373285478", name: "125_hair" },
			Hair126: { id: "1313921754292424756", name: "126_hair" },
			Hair127: { id: "1313921729915125873", name: "127_hair" },
			Hair128: { id: "1313921745253826603", name: "128_hair" },
			Hair129: { id: "1313921751129788456", name: "129_hair" },
			Hair130: { id: "1313921698038550679", name: "130_hair" },
			Hair131: { id: "1313921734604488835", name: "131_hair" },
			Hair132: { id: "1313921756058353714", name: "132_hair" },
			Hair133: { id: "1313921703008796704", name: "133_hair" },
			Hair134: { id: "1313921731991179265", name: "134_hair" },
			Hair135: { id: "1313921752937660488", name: "135_hair" },
			Hair136: { id: "1313921726207234119", name: "136_hair" },
			Hair137: { id: "1313921714874351736", name: "137_hair" },
			Hair138: { id: "1313921708171722803", name: "138_hair" },
			Hair139: { id: "1313921699674062909", name: "139_hair" },
			Hair140: { id: "1313921742002978917", name: "140_hair" },
			Hair141: { id: "1313921757987602503", name: "141_hair" },
			Hair142: { id: "1313921686659399711", name: "142_hair" },
			Hair143: { id: "1313921709585207348", name: "143_hair" },
			Hair144: { id: "1313921740799217736", name: "144_hair" },
			Hair145: { id: "1313921718783316200", name: "145_hair" },
			Hair146: { id: "1313921748470726777", name: "146_hair" },
			Hair147: { id: "1313921694611673170", name: "147_hair" },
			Hair148: { id: "1313921711254798456", name: "148_hair" },
			Hair149: { id: "1313921749506723871", name: "149_hair" },
			Hair150: { id: "1313921723661291622", name: "150_hair" },
			Hair151: { id: "1313921883309342780", name: "151_hair" },
			Hair152: { id: "1313921884773023744", name: "152_hair" },
			Hair153: { id: "1320564196324147272", name: "153_hair" },
			Hair154: { id: "1320565008454909983", name: "154_hair" },
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
			HairAccessory01: { id: "1313936937643540571", name: "01_hair_accessory" },
			/**
			 * Chill Sunbather.
			 */
			HairAccessory02: { id: "1313936927291871262", name: "02_hair_accessory" },
			/**
			 * First Sky Anniversary.
			 */
			HairAccessory03: { id: "1313936929779093535", name: "03_hair_accessory" },
			/**
			 * Days of Fortune Orange.
			 */
			HairAccessory04: { id: "1313936925387657260", name: "04_hair_accessory" },
			/**
			 * Days of Rainbow 2021.
			 */
			HairAccessory05: { id: "1313936962956165190", name: "05_hair_accessory" },
			/**
			 * Second Sky Anniversary.
			 */
			HairAccessory06: { id: "1313936932467904612", name: "06_hair_accessory" },
			/**
			 * Summer Hat.
			 */
			HairAccessory07: { id: "1313936943591067740", name: "07_hair_accessory" },
			/**
			 * Summer Shell Hair Pin.
			 */
			HairAccessory08: { id: "1313936946892116028", name: "08_hair_accessory" },
			/**
			 * Bunny Accessory.
			 */
			HairAccessory09: { id: "1313937002487349298", name: "09_hair_accessory" },
			/**
			 * Light Whisperer.
			 */
			HairAccessory10: { id: "1313937000411168839", name: "10_hair_accessory" },
			/**
			 * Tinkering Chimesmith.
			 */
			HairAccessory11: { id: "1313936991460786196", name: "11_hair_accessory" },
			/**
			 * Lively Navigator.
			 */
			HairAccessory12: { id: "1313936956626833462", name: "12_hair_accessory" },
			/**
			 * Flight Guide (ultimate).
			 */
			HairAccessory13: { id: "1313936980454674504", name: "13_hair_accessory" },
			/**
			 * Snowflake Hair Accessory.
			 */
			HairAccessory14: { id: "1313936965804097588", name: "14_hair_accessory" },
			/**
			 * Bumbling Boatswain.
			 */
			HairAccessory15: { id: "1313936979079073792", name: "15_hair_accessory" },
			/**
			 * Days of Fortune Fish Accessory.
			 */
			HairAccessory16: { id: "1313936935558844469", name: "16_hair_accessory" },
			/**
			 * Days of Love Flower Crown.
			 */
			HairAccessory17: { id: "1313936945163796550", name: "17_hair_accessory" },
			/**
			 * Kizuna AI.
			 */
			HairAccessory18: { id: "1313936957956685854", name: "18_hair_accessory" },
			/**
			 * Nature Coral Crown.
			 */
			HairAccessory19: { id: "1313936933885313104", name: "19_hair_accessory" },
			/**
			 * Harmony Hall Grand Opening.
			 */
			HairAccessory20: { id: "1313936984263098439", name: "20_hair_accessory" },
			/**
			 * Days of Rainbow 2022.
			 */
			HairAccessory21: { id: "1313936976122216458", name: "21_hair_accessory" },
			/**
			 * Ancient Darkness (plant).
			 */
			HairAccessory22: { id: "1313936968031404032", name: "22_hair_accessory" },
			/**
			 * Ancient Light (jellyfish).
			 */
			HairAccessory23: { id: "1313936953099419688", name: "23_hair_accessory" },
			/**
			 * Third Sky Anniversary.
			 */
			HairAccessory24: { id: "1313936954664026142", name: "24_hair_accessory" },
			/**
			 * Reassuring Ranger.
			 */
			HairAccessory25: { id: "1313937004215537734", name: "25_hair_accessory" },
			/**
			 * Nightbird Whisperer.
			 */
			HairAccessory26: { id: "1313936973353713734", name: "26_hair_accessory" },
			/**
			 * Moments Guide (ultimate).
			 */
			HairAccessory27: { id: "1313936990168809543", name: "27_hair_accessory" },
			/**
			 * Fourth Sky Anniversary.
			 */
			HairAccessory28: { id: "1313937005754716160", name: "28_hair_accessory" },
			/**
			 * Days of Style 2023.
			 */
			HairAccessory29: { id: "1313936971889901650", name: "29_hair_accessory" },
			/**
			 * Echo of an Abandoned Refuge.
			 */
			HairAccessory30: { id: "1313936941393121330", name: "30_hair_accessory" },
			/**
			 * Remnant of a Forgotten Haven.
			 */
			HairAccessory31: { id: "1313936970585477151", name: "31_hair_accessory" },
			/**
			 * Mischief Crabkin Accessory.
			 */
			HairAccessory32: { id: "1313936959927750728", name: "32_hair_accessory" },
			/**
			 * Moth Appreciation.
			 */
			HairAccessory33: { id: "1313936997395730442", name: "33_hair_accessory" },
			/**
			 * Winter Pine Cone Hair Clip.
			 */
			HairAccessory34: { id: "1313936939811864586", name: "34_hair_accessory" },
			/**
			 * Spirit of Mural (non-ultimate).
			 */
			HairAccessory35: { id: "1313936977963389110", name: "35_hair_accessory" },
			/**
			 * Feudal Lord.
			 */
			HairAccessory36: { id: "1313936942315864168", name: "36_hair_accessory" },
			/**
			 * Love Heart Beret.
			 */
			HairAccessory37: { id: "1313936994300330146", name: "37_hair_accessory" },
			/**
			 * Nesting Nook.
			 */
			HairAccessory38: { id: "1313936948175310940", name: "38_hair_accessory" },
			/**
			 * Cinnamoroll Pop-Up Cafe Mini Companion.
			 */
			HairAccessory39: { id: "1313936995512356925", name: "39_hair_accessory" },
			/**
			 * Cinnamoroll Pop-Up Cafe Combo.
			 */
			HairAccessory40: { id: "1313936951706910773", name: "40_hair_accessory" },
			/**
			 * Cosy Teacup Headband.
			 */
			HairAccessory41: { id: "1313936969432039466", name: "41_hair_accessory" },
			/**
			 * SkyFest 5th Anniversary Headband.
			 */
			HairAccessory42: { id: "1313936964210266122", name: "42_hair_accessory" },
			/**
			 * SkyFest Oreo Headband.
			 */
			HairAccessory43: { id: "1313936985789829200", name: "43_hair_accessory" },
			/**
			 * Tournament Golden Garland.
			 */
			HairAccessory44: { id: "1313936992681332829", name: "44_hair_accessory" },
			/**
			 * Moonlight Blossom Accessory.
			 */
			HairAccessory45: { id: "1313936987568209981", name: "45_hair_accessory" },
			/**
			 * Style Darkness Fascinator.
			 */
			HairAccessory46: { id: "1313936982144978995", name: "46_hair_accessory" },
			/**
			 * Pointed Snufkin Hat.
			 */
			HairAccessory47: { id: "1313936949656027219", name: "47_hair_accessory" },
			/**
			 * Moomintroll Ears.
			 */
			HairAccessory48: { id: "1313936998830047282", name: "48_hair_accessory" },
			/**
			 * Sense of Self.
			 */
			HairAccessory49: { id: "1313936961555267628", name: "49_hair_accessory" },
			/**
			 * Inspiration of Inclusion.
			 */
			HairAccessory50: { id: "1313936974675181639", name: "50_hair_accessory" },
			/**
			 * Wonderland Stacked Hat.
			 */
			HairAccessory51: { id: "1320563290316734494", name: "51_hair_accessory" },
			/**
			 * Wonderland Primrose Pinafore Set.
			 */
			HairAccessory52: { id: "1320565947206995998", name: "52_hair_accessory" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			HairAccessory01: { id: "1313922070463385641", name: "01_hair_accessory" },
			HairAccessory02: { id: "1313922117904892074", name: "02_hair_accessory" },
			HairAccessory03: { id: "1313922072296296568", name: "03_hair_accessory" },
			HairAccessory04: { id: "1313922083897475103", name: "04_hair_accessory" },
			HairAccessory05: { id: "1313922068756299827", name: "05_hair_accessory" },
			HairAccessory06: { id: "1313922097407328420", name: "06_hair_accessory" },
			HairAccessory07: { id: "1313922086368182384", name: "07_hair_accessory" },
			HairAccessory08: { id: "1313922111483674676", name: "08_hair_accessory" },
			HairAccessory09: { id: "1313922126071464036", name: "09_hair_accessory" },
			HairAccessory10: { id: "1313922124364251227", name: "10_hair_accessory" },
			HairAccessory11: { id: "1313922082425274441", name: "11_hair_accessory" },
			HairAccessory12: { id: "1313922151354601613", name: "12_hair_accessory" },
			HairAccessory13: { id: "1313922095360639026", name: "13_hair_accessory" },
			HairAccessory14: { id: "1313922137030922271", name: "14_hair_accessory" },
			HairAccessory15: { id: "1313922142664130611", name: "15_hair_accessory" },
			HairAccessory16: { id: "1313922073558650880", name: "16_hair_accessory" },
			HairAccessory17: { id: "1313922114633334794", name: "17_hair_accessory" },
			HairAccessory18: { id: "1313922113240961064", name: "18_hair_accessory" },
			HairAccessory19: { id: "1313922106827866283", name: "19_hair_accessory" },
			HairAccessory20: { id: "1313922077190787145", name: "20_hair_accessory" },
			HairAccessory21: { id: "1313922090591584286", name: "21_hair_accessory" },
			HairAccessory22: { id: "1313922079036538920", name: "22_hair_accessory" },
			HairAccessory23: { id: "1313922115841294376", name: "23_hair_accessory" },
			HairAccessory24: { id: "1313922084698587197", name: "24_hair_accessory" },
			HairAccessory25: { id: "1313922120216215684", name: "25_hair_accessory" },
			HairAccessory26: { id: "1313922092529356800", name: "26_hair_accessory" },
			HairAccessory27: { id: "1313922100997918750", name: "27_hair_accessory" },
			HairAccessory28: { id: "1313922139308687490", name: "28_hair_accessory" },
			HairAccessory29: { id: "1313922144773738557", name: "29_hair_accessory" },
			HairAccessory30: { id: "1313922128369684522", name: "30_hair_accessory" },
			HairAccessory31: { id: "1313922133579005982", name: "31_hair_accessory" },
			HairAccessory32: { id: "1313922080437440625", name: "32_hair_accessory" },
			HairAccessory33: { id: "1313922094152814622", name: "33_hair_accessory" },
			HairAccessory34: { id: "1313922075429310474", name: "34_hair_accessory" },
			HairAccessory35: { id: "1313922132241027224", name: "35_hair_accessory" },
			HairAccessory36: { id: "1313922110220931165", name: "36_hair_accessory" },
			HairAccessory37: { id: "1313922146162049097", name: "37_hair_accessory" },
			HairAccessory38: { id: "1313922108375695370", name: "38_hair_accessory" },
			HairAccessory39: { id: "1313922119096205383", name: "39_hair_accessory" },
			HairAccessory40: { id: "1313922089316515972", name: "40_hair_accessory" },
			HairAccessory41: { id: "1313922135529619487", name: "41_hair_accessory" },
			HairAccessory42: { id: "1313922088188383365", name: "42_hair_accessory" },
			HairAccessory43: { id: "1313922121281572915", name: "43_hair_accessory" },
			HairAccessory44: { id: "1313922099198562454", name: "44_hair_accessory" },
			HairAccessory45: { id: "1313922122732535959", name: "45_hair_accessory" },
			HairAccessory46: { id: "1313922130798444615", name: "46_hair_accessory" },
			HairAccessory47: { id: "1313922140797669487", name: "47_hair_accessory" },
			HairAccessory48: { id: "1313922147399241879", name: "48_hair_accessory" },
			HairAccessory49: { id: "1313922153497759754", name: "49_hair_accessory" },
			HairAccessory50: { id: "1313922149366632479", name: "50_hair_accessory" },
			HairAccessory51: { id: "1320563050180378715", name: "51_hair_accessory" },
			HairAccessory52: { id: "1320566011736490115", name: "52_hair_accessory" },
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
			Cape01: { id: "1313937172839010304", name: "01_cape" },
			/**
			 * Beta.
			 */
			Cape02: { id: "1313937182641098754", name: "02_cape" },
			/**
			 * Starter Pack.
			 */
			Cape03: { id: "1313937177411059863", name: "03_cape" },
			/**
			 * Butterfly Charmer 1.
			 */
			Cape04: { id: "1313937180401467412", name: "04_cape" },
			/**
			 * Pouty Porter 1.
			 */
			Cape05: { id: "1313937174382772244", name: "05_cape" },
			/**
			 * Dismayed Hunter 1.
			 */
			Cape06: { id: "1313937175901110302", name: "06_cape" },
			/**
			 * Proud Victor 1.
			 */
			Cape07: { id: "1313937179101237368", name: "07_cape" },
			/**
			 * Handstanding Thrillseeker 1.
			 */
			Cape08: { id: "1313937190916591666", name: "08_cape" },
			/**
			 * Courageous Soldier 1.
			 */
			Cape09: { id: "1313937193521250486", name: "09_cape" },
			/**
			 * Stealthy Survivor 1.
			 */
			Cape10: { id: "1313937198927708271", name: "10_cape" },
			/**
			 * Praying Acolyte 1.
			 */
			Cape11: { id: "1313937186671951872", name: "11_cape" },
			/**
			 * Memory Whisperer 1.
			 */
			Cape12: { id: "1313937184566280203", name: "12_cape" },
			/**
			 * Saluting Protector.
			 */
			Cape13: { id: "1313937188530159616", name: "13_cape" },
			/**
			 * Stretching Guru.
			 */
			Cape14: { id: "1313937181504438413", name: "14_cape" },
			/**
			 * Founder's Pack.
			 */
			Cape15: { id: "1313937225494560819", name: "15_cape" },
			/**
			 * Crab Whisperer.
			 */
			Cape16: { id: "1313937192506363924", name: "16_cape" },
			/**
			 * Piggyback Lightseeker.
			 */
			Cape17: { id: "1313937239058812959", name: "17_cape" },
			/**
			 * Shushing Light Scholar.
			 */
			Cape18: { id: "1313937196050415647", name: "18_cape" },
			/**
			 * Spooky Bat Cape.
			 */
			Cape19: { id: "1313937230691041340", name: "19_cape" },
			/**
			 * Confetti Cousin.
			 */
			Cape20: { id: "1313937251763486841", name: "20_cape" },
			/**
			 * Pleaful Parent.
			 */
			Cape21: { id: "1313937214400626820", name: "21_cape" },
			/**
			 * Wise Grandparent.
			 */
			Cape22: { id: "1313937209480712264", name: "22_cape" },
			/**
			 * Troupe Juggler.
			 */
			Cape23: { id: "1313937194867626005", name: "23_cape" },
			/**
			 * Thoughtful Director.
			 */
			Cape24: { id: "1313937212542554133", name: "24_cape" },
			/**
			 * Crab Walker.
			 */
			Cape25: { id: "1313937206074937415", name: "25_cape" },
			/**
			 * Snoozing Carpenter.
			 */
			Cape26: { id: "1313937200047722604", name: "26_cape" },
			/**
			 * Indifferent Alchemist.
			 */
			Cape27: { id: "1313937207643345047", name: "27_cape" },
			/**
			 * Playfighting Herbalist.
			 */
			Cape28: { id: "1313937248349323336", name: "28_cape" },
			/**
			 * Earth Cape.
			 */
			Cape29: { id: "1313937189331275850", name: "29_cape" },
			/**
			 * Timid Bookworm.
			 */
			Cape30: { id: "1313937215650529470", name: "30_cape" },
			/**
			 * Sanctuary Guide (ultimate).
			 */
			Cape31: { id: "1313937201716789331", name: "31_cape" },
			/**
			 * Grateful Shell Collector.
			 */
			Cape32: { id: "1313937222025871532", name: "32_cape" },
			/**
			 * Chill Sunbather.
			 */
			Cape33: { id: "1313937247309140048", name: "33_cape" },
			/**
			 * Prophet of Air.
			 */
			Cape34: { id: "1313937197308838003", name: "34_cape" },
			/**
			 * Prophet of Water.
			 */
			Cape35: { id: "1313937203583389727", name: "35_cape" },
			/**
			 * Prophet of Earth.
			 */
			Cape36: { id: "1313937220565995612", name: "36_cape" },
			/**
			 * Mischief Web Cape.
			 */
			Cape37: { id: "1313937204841808012", name: "37_cape" },
			/**
			 * Butterfly Charmer 2.
			 */
			Cape38: { id: "1313937245576892416", name: "38_cape" },
			/**
			 * Pouty Porter 2.
			 */
			Cape39: { id: "1313937211166822491", name: "39_cape" },
			/**
			 * Proud Victor 2.
			 */
			Cape40: { id: "1313937216916947065", name: "40_cape" },
			/**
			 * Days of Feast 2020.
			 */
			Cape41: { id: "1313937241474728056", name: "41_cape" },
			/**
			 * Snowflake Cape.
			 */
			Cape42: { id: "1313937236085178458", name: "42_cape" },
			/**
			 * Peeking Postman.
			 */
			Cape43: { id: "1313937228342366218", name: "43_cape" },
			/**
			 * Dancing Performer.
			 */
			Cape44: { id: "1313937233769795755", name: "44_cape" },
			/**
			 * Spinning Mentor.
			 */
			Cape45: { id: "1313937218540408953", name: "45_cape" },
			/**
			 * Dreams Guide (ultimate).
			 */
			Cape46: { id: "1313937237456584786", name: "46_cape" },
			/**
			 * Courageous Soldier 2.
			 */
			Cape47: { id: "1313937250530361374", name: "47_cape" },
			/**
			 * Praying Acolyte 2.
			 */
			Cape48: { id: "1313937226719035422", name: "48_cape" },
			/**
			 * Days of Fortune 2021.
			 */
			Cape49: { id: "1313937243479605362", name: "49_cape" },
			/**
			 * Dismayed Hunter 2.
			 */
			Cape50: { id: "1313937224177287270", name: "50_cape" },
			/**
			 * Days of Bloom 2021.
			 */
			Cape51: { id: "1313937404255797248", name: "51_cape" },
			/**
			 * Assembly Guide (ultimate).
			 */
			Cape52: { id: "1313937400514478191", name: "52_cape" },
			/**
			 * Scolding Student.
			 */
			Cape53: { id: "1313937450825158668", name: "53_cape" },
			/**
			 * Ocean Cape.
			 */
			Cape54: { id: "1313937402116440156", name: "54_cape" },
			/**
			 * Handstanding Thrillseeker 2.
			 */
			Cape55: { id: "1313937454167883869", name: "55_cape" },
			/**
			 * Rainbow cape.
			 */
			Cape56: { id: "1313937410870083684", name: "56_cape" },
			/**
			 * Nintendo Switch (red).
			 */
			Cape57: { id: "1313937420303073320", name: "57_cape" },
			/**
			 * Nintendo Switch (blue).
			 */
			Cape58: { id: "1313937436853665812", name: "58_cape" },
			/**
			 * Star Collector.
			 */
			Cape59: { id: "1313937416637255782", name: "59_cape" },
			/**
			 * Slouching Soldier.
			 */
			Cape60: { id: "1313937424958754896", name: "60_cape" },
			/**
			 * Stretching Lamplighter.
			 */
			Cape61: { id: "1313937421997445150", name: "61_cape" },
			/**
			 * Sneezing Geographer.
			 */
			Cape62: { id: "1313937407497867275", name: "62_cape" },
			/**
			 * Little Prince Scarf Cape.
			 */
			Cape63: { id: "1313937418814226534", name: "63_cape" },
			/**
			 * Little Prince Asteroid Jacket.
			 */
			Cape64: { id: "1313937433427185759", name: "64_cape" },
			/**
			 * Light Whisperer.
			 */
			Cape65: { id: "1313937406038380564", name: "65_cape" },
			/**
			 * Lively Navigator.
			 */
			Cape66: { id: "1313937423708852275", name: "66_cape" },
			/**
			 * Mischief Withered Cape.
			 */
			Cape67: { id: "1313937442386214912", name: "67_cape" },
			/**
			 * Winter Ancestor Cape.
			 */
			Cape68: { id: "1313937438523002940", name: "68_cape" },
			/**
			 * Ceasing Commodore.
			 */
			Cape69: { id: "1313937415639011418", name: "69_cape" },
			/**
			 * Cackling Cannoneer.
			 */
			Cape70: { id: "1313937455505866762", name: "70_cape" },
			/**
			 * Anxious Angler.
			 */
			Cape71: { id: "1313937427034935296", name: "71_cape" },
			/**
			 * Bumbling Boatswain.
			 */
			Cape72: { id: "1313937465492504719", name: "72_cape" },
			/**
			 * Abyss Guide (ultimate).
			 */
			Cape73: { id: "1313937414292504740", name: "73_cape" },
			/**
			 * Days of Fortune 2022.
			 */
			Cape74: { id: "1313937477840408687", name: "74_cape" },
			/**
			 * Kizuna AI Cape.
			 */
			Cape75: { id: "1313937428469518396", name: "75_cape" },
			/**
			 * Purple Bloom Cape.
			 */
			Cape76: { id: "1313937445028364379", name: "76_cape" },
			/**
			 * Memory Whisperer 2.
			 */
			Cape77: { id: "1313937430163882014", name: "77_cape" },
			/**
			 * Performance Guide (ultimate).
			 */
			Cape78: { id: "1313937452184109180", name: "78_cape" },
			/**
			 * Forgetful Storyteller.
			 */
			Cape79: { id: "1313937457489645670", name: "79_cape" },
			/**
			 * Mellow Musician.
			 */
			Cape80: { id: "1313937467497513061", name: "80_cape" },
			/**
			 * Nature Turtle Cape.
			 */
			Cape81: { id: "1313937409100222524", name: "81_cape" },
			/**
			 * Stealthy Survivor 2.
			 */
			Cape82: { id: "1313937449533182033", name: "82_cape" },
			/**
			 * Ancient Darkness (plant).
			 */
			Cape83: { id: "1313937446693638224", name: "83_cape" },
			/**
			 * The Void of Shattering (ultimate 1).
			 */
			Cape84: { id: "1313937431682220042", name: "84_cape" },
			/**
			 * Ancient Light (jellyfish).
			 */
			Cape85: { id: "1313937474657062974", name: "85_cape" },
			/**
			 * Ancient Light (manta).
			 */
			Cape86: { id: "1313937439919833098", name: "86_cape" },
			/**
			 * The Void of Shattering (ultimate 2).
			 */
			Cape87: { id: "1313937412636016711", name: "87_cape" },
			/**
			 * Seed of Hope.
			 */
			Cape88: { id: "1313937470391451689", name: "88_cape" },
			/**
			 * Running Wayfarer.
			 */
			Cape89: { id: "1313937443887513761", name: "89_cape" },
			/**
			 * Warrior of Love.
			 */
			Cape90: { id: "1313937448107249706", name: "90_cape" },
			/**
			 * Mindful Miner.
			 */
			Cape91: { id: "1313937463923838986", name: "91_cape" },
			/**
			 * AURORA (ultimate).
			 */
			Cape92: { id: "1313937435243315200", name: "92_cape" },
			/**
			 * Days of Mischief 2022.
			 */
			Cape93: { id: "1313937462451638282", name: "93_cape" },
			/**
			 * PlayStation.
			 */
			Cape94: { id: "1313937461117976767", name: "94_cape" },
			/**
			 * Giving In Cape.
			 */
			Cape95: { id: "1313937459091865714", name: "95_cape" },
			/**
			 * Wings of AURORA.
			 */
			Cape96: { id: "1313937479123996732", name: "96_cape" },
			/**
			 * Cosy Hermit Cape.
			 */
			Cape97: { id: "1313937468910997534", name: "97_cape" },
			/**
			 * Bereft Veteran.
			 */
			Cape98: { id: "1313937471754604684", name: "98_cape" },
			/**
			 * Wounded Warrior.
			 */
			Cape99: { id: "1313937476074737735", name: "99_cape" },
			/**
			 * Tiptoeing Tea-Brewer.
			 */
			Cape100: { id: "1313937472958365756", name: "100_cape" },
			/**
			 * Red Bloom Cape.
			 */
			Cape101: { id: "1313937610896310312", name: "101_cape" },
			/**
			 * Tumbling Troublemaker.
			 */
			Cape102: { id: "1313937618462834849", name: "102_cape" },
			/**
			 * Overactive Overachiever.
			 */
			Cape103: { id: "1313937621344325654", name: "103_cape" },
			/**
			 * Passage Guide (ultimate).
			 */
			Cape104: { id: "1313937648204910672", name: "104_cape" },
			/**
			 * Nature School Cape.
			 */
			Cape105: { id: "1313937644027248640", name: "105_cape" },
			/**
			 * Dark Rainbow Cape.
			 */
			Cape106: { id: "1313937635588444221", name: "106_cape" },
			/**
			 * Reassuring Ranger.
			 */
			Cape107: { id: "1313937630412406795", name: "107_cape" },
			/**
			 * Sunlight Pink Beach Towel Cape.
			 */
			Cape108: { id: "1313937660947202079", name: "108_cape" },
			/**
			 * Sunlight Yellow Beach Towel Cape.
			 */
			Cape109: { id: "1313937636985016451", name: "109_cape" },
			/**
			 * Sunlight Blue Beach Towel Cape.
			 */
			Cape110: { id: "1313937638583177247", name: "110_cape" },
			/**
			 * Vestige of a Deserted Oasis.
			 */
			Cape111: { id: "1313937675614687313", name: "111_cape" },
			/**
			 * Echo of an Abandoned Refuge.
			 */
			Cape112: { id: "1313937623881875466", name: "112_cape" },
			/**
			 * Remnant of a Forgotten Haven.
			 */
			Cape113: { id: "1313937639791136882", name: "113_cape" },
			/**
			 * Memory of a Lost Village.
			 */
			Cape114: { id: "1313937627703148544", name: "114_cape" },
			/**
			 * Hopeful Steward (ultimate).
			 */
			Cape115: { id: "1313937658514509834", name: "115_cape" },
			/**
			 * Mischief Gossamer Cape.
			 */
			Cape116: { id: "1313937659848032366", name: "116_cape" },
			/**
			 * Mischief Crabula Cloak.
			 */
			Cape117: { id: "1313937619490439169", name: "117_cape" },
			/**
			 * Sparrow Appreciation.
			 */
			Cape118: { id: "1313937672187936818", name: "118_cape" },
			/**
			 * Moth Appreciation.
			 */
			Cape119: { id: "1313937632530530375", name: "119_cape" },
			/**
			 * Winter Quilted Cape.
			 */
			Cape120: { id: "1313937634212712538", name: "120_cape" },
			/**
			 * Spirit of Mural (ultimate).
			 */
			Cape121: { id: "1313937665443496046", name: "121_cape" },
			/**
			 * Hunter.
			 */
			Cape122: { id: "1313937629074423848", name: "122_cape" },
			/**
			 * Feudal Lord.
			 */
			Cape123: { id: "1313937646036451378", name: "123_cape" },
			/**
			 * Princess.
			 */
			Cape124: { id: "1313937625907855391", name: "124_cape" },
			/**
			 * Radiance of the Nine-Coloured Deer.
			 */
			Cape125: { id: "1313937670430392320", name: "125_cape" },
			/**
			 * Days of Fortune Dragon Stole.
			 */
			Cape126: { id: "1313937668991619093", name: "126_cape" },
			/**
			 * Days of Love Meteor Mantle.
			 */
			Cape127: { id: "1313937673806680134", name: "127_cape" },
			/**
			 * Bloom Arum Petal Cape.
			 */
			Cape128: { id: "1313937664143130688", name: "128_cape" },
			/**
			 * Nesting Loft.
			 */
			Cape129: { id: "1313937662264217641", name: "129_cape" },
			/**
			 * Cinnamoroll Pop-Up Cafe Cloud Cape.
			 */
			Cape130: { id: "1313937678126940210", name: "130_cape" },
			/**
			 * Nature Wave Pack.
			 */
			Cape131: { id: "1313937651283394612", name: "131_cape" },
			/**
			 * SkyFest Wireframe Cape.
			 */
			Cape132: { id: "1313937654949089291", name: "132_cape" },
			/**
			 * Duets Guide (ultimate).
			 */
			Cape133: { id: "1313937667431596183", name: "133_cape" },
			/**
			 * The Cellist's Flourishing.
			 */
			Cape134: { id: "1313937640831324181", name: "134_cape" },
			/**
			 * Sunlight Woven Wrap cape.
			 */
			Cape135: { id: "1313937653359448075", name: "135_cape" },
			/**
			 * Comfort of Kindness.
			 */
			Cape136: { id: "1313937642768826499", name: "136_cape" },
			/**
			 * Spirit of Adventure.
			 */
			Cape137: { id: "1313937656710955060", name: "137_cape" },
			/**
			 * Mischief Raven-Feathered Cloak.
			 */
			Cape138: { id: "1313937622560936022", name: "138_cape" },
			/**
			 * Marching Band Cape.
			 */
			Cape139: { id: "1313937650234691614", name: "139_cape" },
			/**
			 * Moominmamma's Masterpiece.
			 */
			Cape140: { id: "1315726083160543323", name: "140_cape" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			Cape01: { id: "1313922301863133276", name: "01_cape" },
			Cape02: { id: "1313922337200013413", name: "02_cape" },
			Cape03: { id: "1313922361552011306", name: "03_cape" },
			Cape04: { id: "1313922370796388424", name: "04_cape" },
			Cape05: { id: "1313922320934633675", name: "05_cape" },
			Cape06: { id: "1313922294287962142", name: "06_cape" },
			Cape07: { id: "1313922303930798142", name: "07_cape" },
			Cape08: { id: "1313922296242507887", name: "08_cape" },
			Cape09: { id: "1313922299598078074", name: "09_cape" },
			Cape10: { id: "1313922319810433078", name: "10_cape" },
			Cape11: { id: "1313922355965198336", name: "11_cape" },
			Cape12: { id: "1313922307432906842", name: "12_cape" },
			Cape13: { id: "1313922318501941338", name: "13_cape" },
			Cape14: { id: "1313922368858492999", name: "14_cape" },
			Cape15: { id: "1313922373078220842", name: "15_cape" },
			Cape16: { id: "1313922332838072391", name: "16_cape" },
			Cape17: { id: "1313922357974536324", name: "17_cape" },
			Cape18: { id: "1313922340081635398", name: "18_cape" },
			Cape19: { id: "1313922367931813888", name: "19_cape" },
			Cape20: { id: "1313922298385797210", name: "20_cape" },
			Cape21: { id: "1313922345215328308", name: "21_cape" },
			Cape22: { id: "1313922359744528456", name: "22_cape" },
			Cape23: { id: "1313922354375688222", name: "23_cape" },
			Cape24: { id: "1313922341612421120", name: "24_cape" },
			Cape25: { id: "1313922348658983013", name: "25_cape" },
			Cape26: { id: "1313922383647866880", name: "26_cape" },
			Cape27: { id: "1313922351473364992", name: "27_cape" },
			Cape28: { id: "1313922338839855197", name: "28_cape" },
			Cape29: { id: "1313922305763835955", name: "29_cape" },
			Cape30: { id: "1313922323639959572", name: "30_cape" },
			Cape31: { id: "1313922330589794486", name: "31_cape" },
			Cape32: { id: "1313922316626952334", name: "32_cape" },
			Cape33: { id: "1313922347094249592", name: "33_cape" },
			Cape34: { id: "1313922315704205403", name: "34_cape" },
			Cape35: { id: "1313922325133000774", name: "35_cape" },
			Cape36: { id: "1313922326990946315", name: "36_cape" },
			Cape37: { id: "1313922352702033921", name: "37_cape" },
			Cape38: { id: "1313922380950929500", name: "38_cape" },
			Cape39: { id: "1313922334930763858", name: "39_cape" },
			Cape40: { id: "1313922379193516194", name: "40_cape" },
			Cape41: { id: "1313922376953499721", name: "41_cape" },
			Cape42: { id: "1313922328085921915", name: "42_cape" },
			Cape43: { id: "1313922322448519188", name: "43_cape" },
			Cape44: { id: "1313922349984383039", name: "44_cape" },
			Cape45: { id: "1313922343151599648", name: "45_cape" },
			Cape46: { id: "1313922366438637678", name: "46_cape" },
			Cape47: { id: "1313922374978113546", name: "47_cape" },
			Cape48: { id: "1313922382527725669", name: "48_cape" },
			Cape49: { id: "1313922363686912151", name: "49_cape" },
			Cape50: { id: "1313922308955570308", name: "50_cape" },
			Cape51: { id: "1313922458298093568", name: "51_cape" },
			Cape52: { id: "1313922463414878248", name: "52_cape" },
			Cape53: { id: "1313922537356398682", name: "53_cape" },
			Cape54: { id: "1313922487964270646", name: "54_cape" },
			Cape55: { id: "1313922453726036050", name: "55_cape" },
			Cape56: { id: "1313922455701557279", name: "56_cape" },
			Cape57: { id: "1313922460348846211", name: "57_cape" },
			Cape58: { id: "1313922467294740521", name: "58_cape" },
			Cape59: { id: "1313922503860551762", name: "59_cape" },
			Cape60: { id: "1313922502350864494", name: "60_cape" },
			Cape61: { id: "1313922500165632092", name: "61_cape" },
			Cape62: { id: "1313922518125510688", name: "62_cape" },
			Cape63: { id: "1313922506951757915", name: "63_cape" },
			Cape64: { id: "1313922471010893824", name: "64_cape" },
			Cape65: { id: "1313922505571962901", name: "65_cape" },
			Cape66: { id: "1313922497174962211", name: "66_cape" },
			Cape67: { id: "1313922511464824883", name: "67_cape" },
			Cape68: { id: "1313922492380872847", name: "68_cape" },
			Cape69: { id: "1313922473686732904", name: "69_cape" },
			Cape70: { id: "1313922485871185930", name: "70_cape" },
			Cape71: { id: "1313922469006147729", name: "71_cape" },
			Cape72: { id: "1313922465293930657", name: "72_cape" },
			Cape73: { id: "1313922475163127890", name: "73_cape" },
			Cape74: { id: "1313922523565527092", name: "74_cape" },
			Cape75: { id: "1313922520277192725", name: "75_cape" },
			Cape76: { id: "1313922461997465610", name: "76_cape" },
			Cape77: { id: "1313922472785215522", name: "77_cape" },
			Cape78: { id: "1313922478082490490", name: "78_cape" },
			Cape79: { id: "1313922476530729032", name: "79_cape" },
			Cape80: { id: "1313922530960212079", name: "80_cape" },
			Cape81: { id: "1313922510324240435", name: "81_cape" },
			Cape82: { id: "1313922484235538532", name: "82_cape" },
			Cape83: { id: "1313922508860162088", name: "83_cape" },
			Cape84: { id: "1313922479479328880", name: "84_cape" },
			Cape85: { id: "1313922491130839090", name: "85_cape" },
			Cape86: { id: "1313922522118488187", name: "86_cape" },
			Cape87: { id: "1313922498496172103", name: "87_cape" },
			Cape88: { id: "1313922535133286470", name: "88_cape" },
			Cape89: { id: "1313922494087958528", name: "89_cape" },
			Cape90: { id: "1313922456230170666", name: "90_cape" },
			Cape91: { id: "1313922525482319972", name: "91_cape" },
			Cape92: { id: "1313922527260708916", name: "92_cape" },
			Cape93: { id: "1313922482587041802", name: "93_cape" },
			Cape94: { id: "1313922516699447347", name: "94_cape" },
			Cape95: { id: "1313922489985929236", name: "95_cape" },
			Cape96: { id: "1313922532726014042", name: "96_cape" },
			Cape97: { id: "1313922529366249623", name: "97_cape" },
			Cape98: { id: "1313922481194664007", name: "98_cape" },
			Cape99: { id: "1313922495774199888", name: "99_cape" },
			Cape100: { id: "1313922533954945075", name: "100_cape" },
			Cape101: { id: "1313922682164744273", name: "101_cape" },
			Cape102: { id: "1313922647750611055", name: "102_cape" },
			Cape103: { id: "1313922659821682750", name: "103_cape" },
			Cape104: { id: "1313922707477495808", name: "104_cape" },
			Cape105: { id: "1313922711290118246", name: "105_cape" },
			Cape106: { id: "1313922660752687230", name: "106_cape" },
			Cape107: { id: "1313922662489395271", name: "107_cape" },
			Cape108: { id: "1313922649788776449", name: "108_cape" },
			Cape109: { id: "1313922651596783687", name: "109_cape" },
			Cape110: { id: "1313922664431091743", name: "110_cape" },
			Cape111: { id: "1313922653119316019", name: "111_cape" },
			Cape112: { id: "1313922709171732600", name: "112_cape" },
			Cape113: { id: "1313922693078319174", name: "113_cape" },
			Cape114: { id: "1313922668269011037", name: "114_cape" },
			Cape115: { id: "1313922655048695902", name: "115_cape" },
			Cape116: { id: "1313922646391394334", name: "116_cape" },
			Cape117: { id: "1313922656474759281", name: "117_cape" },
			Cape118: { id: "1313922678239006730", name: "118_cape" },
			Cape119: { id: "1313922675042943058", name: "119_cape" },
			Cape120: { id: "1313922671125463101", name: "120_cape" },
			Cape121: { id: "1313922691195076618", name: "121_cape" },
			Cape122: { id: "1313922703727657194", name: "122_cape" },
			Cape123: { id: "1313922666696151080", name: "123_cape" },
			Cape124: { id: "1313922683863568487", name: "124_cape" },
			Cape125: { id: "1313922697574744094", name: "125_cape" },
			Cape126: { id: "1313922676581990523", name: "126_cape" },
			Cape127: { id: "1313922669514723369", name: "127_cape" },
			Cape128: { id: "1313922695884312588", name: "128_cape" },
			Cape129: { id: "1313922679643832400", name: "129_cape" },
			Cape130: { id: "1313922685129981982", name: "130_cape" },
			Cape131: { id: "1313922701919916042", name: "131_cape" },
			Cape132: { id: "1313922689425211453", name: "132_cape" },
			Cape133: { id: "1313922713378619472", name: "133_cape" },
			Cape134: { id: "1313922686648451072", name: "134_cape" },
			Cape135: { id: "1313922672631087136", name: "135_cape" },
			Cape136: { id: "1313922705732538449", name: "136_cape" },
			Cape137: { id: "1313922694856835244", name: "137_cape" },
			Cape138: { id: "1313922658458669096", name: "138_cape" },
			Cape139: { id: "1313922699667574824", name: "139_cape" },
			Cape140: { id: "1315725838733545545", name: "140_cape" },
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
			HeldProp01: { id: "1313937992813117524", name: "01_held_prop" },
			/**
			 * Blushing Prospector.
			 */
			HeldProp02: { id: "1313937986886434896", name: "02_held_prop" },
			/**
			 * Cheerful Spectator.
			 */
			HeldProp03: { id: "1313937977050927134", name: "03_held_prop" },
			/**
			 * Frightened Refugee.
			 */
			HeldProp04: { id: "1313937973951070208", name: "04_held_prop" },
			/**
			 * Lookout Scout.
			 */
			HeldProp05: { id: "1313937985611501658", name: "05_held_prop" },
			/**
			 * Saluting Captain.
			 */
			HeldProp06: { id: "1313937991202508902", name: "06_held_prop" },
			/**
			 * Leaping Dancer.
			 */
			HeldProp07: { id: "1313937988723544147", name: "07_held_prop" },
			/**
			 * Greeting Shaman.
			 */
			HeldProp08: { id: "1313938045917204490", name: "08_held_prop" },
			/**
			 * Doublefive Light Catcher.
			 */
			HeldProp09: { id: "1313938003869306930", name: "09_held_prop" },
			/**
			 * Twirling Champion.
			 */
			HeldProp10: { id: "1313937978665467964", name: "10_held_prop" },
			/**
			 * Laidback Pioneer.
			 */
			HeldProp11: { id: "1313938035112411157", name: "11_held_prop" },
			/**
			 * Season of Lightseekers ultimate.
			 */
			HeldProp12: { id: "1313938022026182726", name: "12_held_prop" },
			/**
			 * Pleaful Parent.
			 */
			HeldProp13: { id: "1313938002476531823", name: "13_held_prop" },
			/**
			 * Hairtousle Teen.
			 */
			HeldProp14: { id: "1313938037968732280", name: "14_held_prop" },
			/**
			 * Respectful Pianist.
			 */
			HeldProp15: { id: "1313937971141021766", name: "15_held_prop" },
			/**
			 * Thoughtful Director.
			 */
			HeldProp16: { id: "1313938036601389087", name: "16_held_prop" },
			/**
			 * Sanctuary Guide.
			 */
			HeldProp17: { id: "1313937994071277658", name: "17_held_prop" },
			/**
			 * Days of Summer Lights 2020.
			 */
			HeldProp18: { id: "1313938058747314257", name: "18_held_prop" },
			/**
			 * Prophecy Guide.
			 */
			HeldProp19: { id: "1313938006717235283", name: "19_held_prop" },
			/**
			 * Dancing Performer.
			 */
			HeldProp20: { id: "1313937975729459201", name: "20_held_prop" },
			/**
			 * Assembly Guide.
			 */
			HeldProp21: { id: "1313938033480962138", name: "21_held_prop" },
			/**
			 * Nintendo Switch.
			 */
			HeldProp22: { id: "1313938016724582510", name: "22_held_prop" },
			/**
			 * Summer Umbrella.
			 */
			HeldProp23: { id: "1313937996621283338", name: "23_held_prop" },
			/**
			 * Tinkering Chimesmith.
			 */
			HeldProp24: { id: "1313938040493703178", name: "24_held_prop" },
			/**
			 * Mellow Musician.
			 */
			HeldProp25: { id: "1313938000891220028", name: "25_held_prop" },
			/**
			 * Fledgling Harp.
			 */
			HeldProp26: { id: "1313938004657705033", name: "26_held_prop" },
			/**
			 * Rhythm Guitar.
			 */
			HeldProp27: { id: "1313937995266785411", name: "27_held_prop" },
			/**
			 * Triumph Handpan.
			 */
			HeldProp28: { id: "1313938056776126555", name: "28_held_prop" },
			/**
			 * Ancient Darkness (dragon).
			 */
			HeldProp29: { id: "1313938020323295302", name: "29_held_prop" },
			/**
			 * TGC Guitar.
			 */
			HeldProp30: { id: "1313938011473444936", name: "30_held_prop" },
			/**
			 * Voice of AURORA.
			 */
			HeldProp31: { id: "1313938052669898852", name: "31_held_prop" },
			/**
			 * Days of Fortune Enchanted Umbrella.
			 */
			HeldProp32: { id: "1313938009942659193", name: "32_held_prop" },
			/**
			 * Days of Love Serendipitous Sceptre.
			 */
			HeldProp33: { id: "1313938031605973045", name: "33_held_prop" },
			/**
			 * Overactive Overachiever.
			 */
			HeldProp34: { id: "1313937998265450598", name: "34_held_prop" },
			/**
			 * Triumph Violin.
			 */
			HeldProp35: { id: "1313938054922240122", name: "35_held_prop" },
			/**
			 * Triumph Saxophone.
			 */
			HeldProp36: { id: "1313938023662223410", name: "36_held_prop" },
			/**
			 * Moments Guide (ultimate).
			 */
			HeldProp37: { id: "1313938053974327438", name: "37_held_prop" },
			/**
			 * Moments Guide (non-ultimate).
			 */
			HeldProp38: { id: "1313937999645511731", name: "38_held_prop" },
			/**
			 * Festival Sceptre.
			 */
			HeldProp39: { id: "1313938014497542176", name: "39_held_prop" },
			/**
			 * Winter Feast Snowboard.
			 */
			HeldProp40: { id: "1313938047435411588", name: "40_held_prop" },
			/**
			 * Fortune Drum.
			 */
			HeldProp41: { id: "1313938043647955078", name: "41_held_prop" },
			/**
			 * Bloom Lilypad Umbrella.
			 */
			HeldProp42: { id: "1313938018976923798", name: "42_held_prop" },
			/**
			 * SkyFest Jenova Fan.
			 */
			HeldProp43: { id: "1313938008214343801", name: "43_held_prop" },
			/**
			 * The Musicians' Legacy.
			 */
			HeldProp44: { id: "1313938039281680414", name: "44_held_prop" },
			/**
			 * Tournament Torch.
			 */
			HeldProp45: { id: "1313938060492144661", name: "45_held_prop" },
			/**
			 * Compassionate Cellist.
			 */
			HeldProp46: { id: "1313938050908422225", name: "46_held_prop" },
			/**
			 * The Moomin Storybook (ultimate).
			 */
			HeldProp47: { id: "1313938049113133136", name: "47_held_prop" },
			/**
			 * Spirit of Adventure.
			 */
			HeldProp48: { id: "1313938041936810015", name: "48_held_prop" },
			/**
			 * Mischief Withered Broom.
			 */
			HeldProp49: { id: "1313938012551385249", name: "49_held_prop" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			HeldProp01: { id: "1313922939204272228", name: "01_held_prop" },
			HeldProp02: { id: "1313922916634726420", name: "02_held_prop" },
			HeldProp03: { id: "1313922928605270016", name: "03_held_prop" },
			HeldProp04: { id: "1313922902533476373", name: "04_held_prop" },
			HeldProp05: { id: "1313922944778375230", name: "05_held_prop" },
			HeldProp06: { id: "1313922932489191555", name: "06_held_prop" },
			HeldProp07: { id: "1313922950205935777", name: "07_held_prop" },
			HeldProp08: { id: "1313922930404491305", name: "08_held_prop" },
			HeldProp09: { id: "1313922946271674461", name: "09_held_prop" },
			HeldProp10: { id: "1313922960834433126", name: "10_held_prop" },
			HeldProp11: { id: "1313922941313880134", name: "11_held_prop" },
			HeldProp12: { id: "1313922898096033804", name: "12_held_prop" },
			HeldProp13: { id: "1313922894924873800", name: "13_held_prop" },
			HeldProp14: { id: "1313922977707851786", name: "14_held_prop" },
			HeldProp15: { id: "1313922892370804839", name: "15_held_prop" },
			HeldProp16: { id: "1313922959441657946", name: "16_held_prop" },
			HeldProp17: { id: "1313922927229665320", name: "17_held_prop" },
			HeldProp18: { id: "1313922890625716255", name: "18_held_prop" },
			HeldProp19: { id: "1313922913388462120", name: "19_held_prop" },
			HeldProp20: { id: "1313922923752329296", name: "20_held_prop" },
			HeldProp21: { id: "1313922907294011474", name: "21_held_prop" },
			HeldProp22: { id: "1313922905461231689", name: "22_held_prop" },
			HeldProp23: { id: "1313922908594114580", name: "23_held_prop" },
			HeldProp24: { id: "1313922910431346700", name: "24_held_prop" },
			HeldProp25: { id: "1313922955255873576", name: "25_held_prop" },
			HeldProp26: { id: "1313922899924488284", name: "26_held_prop" },
			HeldProp27: { id: "1313922937807573023", name: "27_held_prop" },
			HeldProp28: { id: "1313922943150985237", name: "28_held_prop" },
			HeldProp29: { id: "1313922917834293299", name: "29_held_prop" },
			HeldProp30: { id: "1313922965372669996", name: "30_held_prop" },
			HeldProp31: { id: "1313922911706550272", name: "31_held_prop" },
			HeldProp32: { id: "1313922968296095836", name: "32_held_prop" },
			HeldProp33: { id: "1313922936444289178", name: "33_held_prop" },
			HeldProp34: { id: "1313922963052957717", name: "34_held_prop" },
			HeldProp35: { id: "1313922921806168145", name: "35_held_prop" },
			HeldProp36: { id: "1313922896581890048", name: "36_held_prop" },
			HeldProp37: { id: "1313922969889673277", name: "37_held_prop" },
			HeldProp38: { id: "1313922958313394267", name: "38_held_prop" },
			HeldProp39: { id: "1313922953355722832", name: "39_held_prop" },
			HeldProp40: { id: "1313922962088525844", name: "40_held_prop" },
			HeldProp41: { id: "1313922971835826218", name: "41_held_prop" },
			HeldProp42: { id: "1313922957113823253", name: "42_held_prop" },
			HeldProp43: { id: "1313922951367753861", name: "43_held_prop" },
			HeldProp44: { id: "1313922966786150520", name: "44_held_prop" },
			HeldProp45: { id: "1313922915250606282", name: "45_held_prop" },
			HeldProp46: { id: "1313922934779285604", name: "46_held_prop" },
			HeldProp47: { id: "1313922925614596219", name: "47_held_prop" },
			HeldProp48: { id: "1313922948444328017", name: "48_held_prop" },
			HeldProp49: { id: "1313922919906283571", name: "49_held_prop" },
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
			LargePlaceableProp01: { id: "1313938252285345852", name: "01_large_placeable_prop" },
			/**
			 * Belonging Guide (ultimate).
			 */
			LargePlaceableProp02: { id: "1313938239555371058", name: "02_large_placeable_prop" },
			/**
			 * Days of Feast 2020.
			 */
			LargePlaceableProp03: { id: "1313938289463656530", name: "03_large_placeable_prop" },
			/**
			 * Pink Bloom Teaset.
			 */
			LargePlaceableProp04: { id: "1313938248871186524", name: "04_large_placeable_prop" },
			/**
			 * Assembly Guide (non-ultimate 1).
			 */
			LargePlaceableProp05: { id: "1313938247054917763", name: "05_large_placeable_prop" },
			/**
			 * Assembly Guide (non-ultimate 2).
			 */
			LargePlaceableProp06: { id: "1313938300850933760", name: "06_large_placeable_prop" },
			/**
			 * Scaredy Cadet.
			 */
			LargePlaceableProp07: { id: "1313938271985729616", name: "07_large_placeable_prop" },
			/**
			 * Marching Adventurer.
			 */
			LargePlaceableProp08: { id: "1313938241744932969", name: "08_large_placeable_prop" },
			/**
			 * Assembly Guide (non-ultimate 5).
			 */
			LargePlaceableProp09: { id: "1313938281297088663", name: "09_large_placeable_prop" },
			/**
			 * Baffled Botanist.
			 */
			LargePlaceableProp10: { id: "1313938269519745074", name: "10_large_placeable_prop" },
			/**
			 * Chuckling Scout.
			 */
			LargePlaceableProp11: { id: "1313938243259072622", name: "11_large_placeable_prop" },
			/**
			 * Star Collector.
			 */
			LargePlaceableProp12: { id: "1313938279531417621", name: "12_large_placeable_prop" },
			/**
			 * Double Deck Chairs.
			 */
			LargePlaceableProp13: { id: "1313938263131684875", name: "13_large_placeable_prop" },
			/**
			 * Chill Sunbather.
			 */
			LargePlaceableProp14: { id: "1313938245213491331", name: "14_large_placeable_prop" },
			/**
			 * Crab Whisperer.
			 */
			LargePlaceableProp15: { id: "1313938250603429898", name: "15_large_placeable_prop" },
			/**
			 * Troupe Juggler.
			 */
			LargePlaceableProp16: { id: "1313938298934268005", name: "16_large_placeable_prop" },
			/**
			 * Grateful Shell Collector.
			 */
			LargePlaceableProp17: { id: "1313938276385554442", name: "17_large_placeable_prop" },
			/**
			 * Festival Spin Dancer.
			 */
			LargePlaceableProp18: { id: "1313938265262264411", name: "18_large_placeable_prop" },
			/**
			 * Mischief Spooky Dining Set.
			 */
			LargePlaceableProp19: { id: "1313938274124959806", name: "19_large_placeable_prop" },
			/**
			 * Playfighting Herbalist.
			 */
			LargePlaceableProp20: { id: "1313938261621739601", name: "20_large_placeable_prop" },
			/**
			 * Jelly Whisperer.
			 */
			LargePlaceableProp21: { id: "1313938253799489607", name: "21_large_placeable_prop" },
			/**
			 * Prophet of Fire 1.
			 */
			LargePlaceableProp22: { id: "1313938305431375998", name: "22_large_placeable_prop" },
			/**
			 * Purple Bloom Teaset.
			 */
			LargePlaceableProp23: { id: "1313938316395151401", name: "23_large_placeable_prop" },
			/**
			 * Performance Guide (non-ultmate).
			 */
			LargePlaceableProp24: { id: "1313938267330314295", name: "24_large_placeable_prop" },
			/**
			 * Days of Sunlight 2022.
			 */
			LargePlaceableProp25: { id: "1313938317644922952", name: "25_large_placeable_prop" },
			/**
			 * Light fence.
			 */
			LargePlaceableProp26: { id: "1313938306878275635", name: "26_large_placeable_prop" },
			/**
			 * Snowkid Prop.
			 */
			LargePlaceableProp27: { id: "1313938285030281376", name: "27_large_placeable_prop" },
			/**
			 * Remembrance Guide (non-ultimate 2).
			 */
			LargePlaceableProp28: { id: "1313938319112933507", name: "28_large_placeable_prop" },
			/**
			 * Remembrance Guide (non-ultimate 3).
			 */
			LargePlaceableProp29: { id: "1313938310045110364", name: "29_large_placeable_prop" },
			/**
			 * Remembrance Guide (ultimate).
			 */
			LargePlaceableProp30: { id: "1313938291938037831", name: "30_large_placeable_prop" },
			/**
			 * Days of Love Flowery Archway.
			 */
			LargePlaceableProp31: { id: "1313938326704623646", name: "31_large_placeable_prop" },
			/**
			 * Bloom Picnic Basket.
			 */
			LargePlaceableProp32: { id: "1313938282924605461", name: "32_large_placeable_prop" },
			/**
			 * Anniversary Party Lights.
			 */
			LargePlaceableProp33: { id: "1313938304135336037", name: "33_large_placeable_prop" },
			/**
			 * Nesting Solarium 1.
			 */
			LargePlaceableProp34: { id: "1313938286489768006", name: "34_large_placeable_prop" },
			/**
			 * Nesting Solarium 2.
			 */
			LargePlaceableProp35: { id: "1313938311664107580", name: "35_large_placeable_prop" },
			/**
			 * Nesting Solarium 3.
			 */
			LargePlaceableProp36: { id: "1313938294031257600", name: "36_large_placeable_prop" },
			/**
			 * Nesting Loft 1.
			 */
			LargePlaceableProp37: { id: "1313938314721759302", name: "37_large_placeable_prop" },
			/**
			 * Nesting Loft 2.
			 */
			LargePlaceableProp38: { id: "1313938323492048906", name: "38_large_placeable_prop" },
			/**
			 * Nesting Atrium 1.
			 */
			LargePlaceableProp39: { id: "1313938312804958229", name: "39_large_placeable_prop" },
			/**
			 * Nesting Atrium 2.
			 */
			LargePlaceableProp40: { id: "1313938302205689857", name: "40_large_placeable_prop" },
			/**
			 * Nesting Nook.
			 */
			LargePlaceableProp41: { id: "1313938295255863326", name: "41_large_placeable_prop" },
			/**
			 * Stone stool.
			 */
			LargePlaceableProp42: { id: "1313938297008951347", name: "42_large_placeable_prop" },
			/**
			 * Stone single bench.
			 */
			LargePlaceableProp43: { id: "1313938320866152499", name: "43_large_placeable_prop" },
			/**
			 * Stone wood-fired oven.
			 */
			LargePlaceableProp44: { id: "1313938329636704276", name: "44_large_placeable_prop" },
			/**
			 * Stone single bed.
			 */
			LargePlaceableProp45: { id: "1313938287898923018", name: "45_large_placeable_prop" },
			/**
			 * Stone tall cube.
			 */
			LargePlaceableProp46: { id: "1313938308329504861", name: "46_large_placeable_prop" },
			/**
			 * Stone chair.
			 */
			LargePlaceableProp47: { id: "1313938328231608340", name: "47_large_placeable_prop" },
			/**
			 * Stone small table.
			 */
			LargePlaceableProp48: { id: "1313938322212519997", name: "48_large_placeable_prop" },
			/**
			 * Stone tall shelf.
			 */
			LargePlaceableProp49: { id: "1313938278109679677", name: "49_large_placeable_prop" },
			/**
			 * Cosy Cafe Table.
			 */
			LargePlaceableProp50: { id: "1313938325316309122", name: "50_large_placeable_prop" },
			/**
			 * Stone bench.
			 */
			LargePlaceableProp51: { id: "1313938415930183720", name: "51_large_placeable_prop" },
			/**
			 * Stone desk.
			 */
			LargePlaceableProp52: { id: "1313938418107023410", name: "52_large_placeable_prop" },
			/**
			 * Stone armchair.
			 */
			LargePlaceableProp53: { id: "1313938421793951845", name: "53_large_placeable_prop" },
			/**
			 * Stone console table.
			 */
			LargePlaceableProp54: { id: "1313938414235553894", name: "54_large_placeable_prop" },
			/**
			 * Stone loveseat.
			 */
			LargePlaceableProp55: { id: "1313938419914768434", name: "55_large_placeable_prop" },
			/**
			 * Stone round dining table.
			 */
			LargePlaceableProp56: { id: "1313938412113231933", name: "56_large_placeable_prop" },
			/**
			 * Stone plant stand.
			 */
			LargePlaceableProp57: { id: "1313938426873118720", name: "57_large_placeable_prop" },
			/**
			 * Stone sofa corner.
			 */
			LargePlaceableProp58: { id: "1313938425140740126", name: "58_large_placeable_prop" },
			/**
			 * Stone square dining table.
			 */
			LargePlaceableProp59: { id: "1313938450311020647", name: "59_large_placeable_prop" },
			/**
			 * Stone sofa side.
			 */
			LargePlaceableProp60: { id: "1313938432589828217", name: "60_large_placeable_prop" },
			/**
			 * Stone long dining table.
			 */
			LargePlaceableProp61: { id: "1313938423228141640", name: "61_large_placeable_prop" },
			/**
			 * Stone small bathtub.
			 */
			LargePlaceableProp62: { id: "1313938447517618257", name: "62_large_placeable_prop" },
			/**
			 * Stone kitchen drawers.
			 */
			LargePlaceableProp63: { id: "1313938438692802560", name: "63_large_placeable_prop" },
			/**
			 * Stone coffee table.
			 */
			LargePlaceableProp64: { id: "1313938430182428835", name: "64_large_placeable_prop" },
			/**
			 * Stone candle light.
			 */
			LargePlaceableProp65: { id: "1313938451581898826", name: "65_large_placeable_prop" },
			/**
			 * Stone washstand.
			 */
			LargePlaceableProp66: { id: "1313938441624490055", name: "66_large_placeable_prop" },
			/**
			 * Stone kitchen cabinet.
			 */
			LargePlaceableProp67: { id: "1313938440320057384", name: "67_large_placeable_prop" },
			/**
			 * Stone kitchen stove.
			 */
			LargePlaceableProp68: { id: "1313938446170980372", name: "68_large_placeable_prop" },
			/**
			 * Stone wide cube.
			 */
			LargePlaceableProp69: { id: "1313938437308416031", name: "69_large_placeable_prop" },
			/**
			 * Large bathtub.
			 */
			LargePlaceableProp70: { id: "1313938435668574239", name: "70_large_placeable_prop" },
			/**
			 * Sunlight Manta Float.
			 */
			LargePlaceableProp71: { id: "1313938434309750926", name: "71_large_placeable_prop" },
			/**
			 * Moonlight Lantern Decoration.
			 */
			LargePlaceableProp72: { id: "1313938442387980310", name: "72_large_placeable_prop" },
			/**
			 * Comfort of Kindness.
			 */
			LargePlaceableProp73: { id: "1313938453469069392", name: "73_large_placeable_prop" },
			/**
			 * Spirit of Adventure.
			 */
			LargePlaceableProp74: { id: "1313938448629108809", name: "74_large_placeable_prop" },
			/**
			 * Inspiration of Inclusion.
			 */
			LargePlaceableProp75: { id: "1313938444317233234", name: "75_large_placeable_prop" },
			/**
			 * Mischief Cauldron.
			 */
			LargePlaceableProp76: { id: "1313938431558156288", name: "76_large_placeable_prop" },
			/**
			 * Jam Station.
			 */
			LargePlaceableProp77: { id: "1313938428546514945", name: "77_large_placeable_prop" },
			/**
			 * Wonderland Teacup Bath.
			 */
			LargePlaceableProp78: { id: "1320564773204791337", name: "78_large_placeable_prop" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			LargePlaceableProp01: { id: "1313923096218177678", name: "01_large_placeable_prop" },
			LargePlaceableProp02: { id: "1313923124944699472", name: "02_large_placeable_prop" },
			LargePlaceableProp03: { id: "1313923091612696709", name: "03_large_placeable_prop" },
			LargePlaceableProp04: { id: "1313923099686604843", name: "04_large_placeable_prop" },
			LargePlaceableProp05: { id: "1313923147128508557", name: "05_large_placeable_prop" },
			LargePlaceableProp06: { id: "1313923101485961370", name: "06_large_placeable_prop" },
			LargePlaceableProp07: { id: "1313923088483880981", name: "07_large_placeable_prop" },
			LargePlaceableProp08: { id: "1313923090186637394", name: "08_large_placeable_prop" },
			LargePlaceableProp09: { id: "1313923165977579630", name: "09_large_placeable_prop" },
			LargePlaceableProp10: { id: "1313923084780044349", name: "10_large_placeable_prop" },
			LargePlaceableProp11: { id: "1313923105248382986", name: "11_large_placeable_prop" },
			LargePlaceableProp12: { id: "1313923128509862009", name: "12_large_placeable_prop" },
			LargePlaceableProp13: { id: "1313923098185302067", name: "13_large_placeable_prop" },
			LargePlaceableProp14: { id: "1313923184524791882", name: "14_large_placeable_prop" },
			LargePlaceableProp15: { id: "1313923158641741986", name: "15_large_placeable_prop" },
			LargePlaceableProp16: { id: "1313923114593423360", name: "16_large_placeable_prop" },
			LargePlaceableProp17: { id: "1313923086944567346", name: "17_large_placeable_prop" },
			LargePlaceableProp18: { id: "1313923108154904649", name: "18_large_placeable_prop" },
			LargePlaceableProp19: { id: "1313923135233458308", name: "19_large_placeable_prop" },
			LargePlaceableProp20: { id: "1313923103168004157", name: "20_large_placeable_prop" },
			LargePlaceableProp21: { id: "1313923110059249695", name: "21_large_placeable_prop" },
			LargePlaceableProp22: { id: "1313923181265817673", name: "22_large_placeable_prop" },
			LargePlaceableProp23: { id: "1313923111782977668", name: "23_large_placeable_prop" },
			LargePlaceableProp24: { id: "1313923131731214367", name: "24_large_placeable_prop" },
			LargePlaceableProp25: { id: "1313923177260519466", name: "25_large_placeable_prop" },
			LargePlaceableProp26: { id: "1313923162102038680", name: "26_large_placeable_prop" },
			LargePlaceableProp27: { id: "1313923094427074571", name: "27_large_placeable_prop" },
			LargePlaceableProp28: { id: "1313923182939344896", name: "28_large_placeable_prop" },
			LargePlaceableProp29: { id: "1313923106699612170", name: "29_large_placeable_prop" },
			LargePlaceableProp30: { id: "1313923154816532560", name: "30_large_placeable_prop" },
			LargePlaceableProp31: { id: "1313923139243081868", name: "31_large_placeable_prop" },
			LargePlaceableProp32: { id: "1313923130070274119", name: "32_large_placeable_prop" },
			LargePlaceableProp33: { id: "1313923150882275468", name: "33_large_placeable_prop" },
			LargePlaceableProp34: { id: "1313923137364295821", name: "34_large_placeable_prop" },
			LargePlaceableProp35: { id: "1313923172155916418", name: "35_large_placeable_prop" },
			LargePlaceableProp36: { id: "1313923122826838107", name: "36_large_placeable_prop" },
			LargePlaceableProp37: { id: "1313923169882472500", name: "37_large_placeable_prop" },
			LargePlaceableProp38: { id: "1313923145475948689", name: "38_large_placeable_prop" },
			LargePlaceableProp39: { id: "1313923133236973651", name: "39_large_placeable_prop" },
			LargePlaceableProp40: { id: "1313923164321091607", name: "40_large_placeable_prop" },
			LargePlaceableProp41: { id: "1313923179751936011", name: "41_large_placeable_prop" },
			LargePlaceableProp42: { id: "1313923141277454347", name: "42_large_placeable_prop" },
			LargePlaceableProp43: { id: "1313923173506351165", name: "43_large_placeable_prop" },
			LargePlaceableProp44: { id: "1313923113246785587", name: "44_large_placeable_prop" },
			LargePlaceableProp45: { id: "1313923152732225637", name: "45_large_placeable_prop" },
			LargePlaceableProp46: { id: "1313923143320080426", name: "46_large_placeable_prop" },
			LargePlaceableProp47: { id: "1313923148974133310", name: "47_large_placeable_prop" },
			LargePlaceableProp48: { id: "1313923175926468708", name: "48_large_placeable_prop" },
			LargePlaceableProp49: { id: "1313923126895050782", name: "49_large_placeable_prop" },
			LargePlaceableProp50: { id: "1313923167575867495", name: "50_large_placeable_prop" },
			LargePlaceableProp51: { id: "1313923273527922689", name: "51_large_placeable_prop" },
			LargePlaceableProp52: { id: "1313923261545054249", name: "52_large_placeable_prop" },
			LargePlaceableProp53: { id: "1313923263113461891", name: "53_large_placeable_prop" },
			LargePlaceableProp54: { id: "1313923290158465044", name: "54_large_placeable_prop" },
			LargePlaceableProp55: { id: "1313923266620031048", name: "55_large_placeable_prop" },
			LargePlaceableProp56: { id: "1313923265059754026", name: "56_large_placeable_prop" },
			LargePlaceableProp57: { id: "1313923292356411422", name: "57_large_placeable_prop" },
			LargePlaceableProp58: { id: "1313923268863987844", name: "58_large_placeable_prop" },
			LargePlaceableProp59: { id: "1313923282180767744", name: "59_large_placeable_prop" },
			LargePlaceableProp60: { id: "1313923295762186240", name: "60_large_placeable_prop" },
			LargePlaceableProp61: { id: "1313923280306180216", name: "61_large_placeable_prop" },
			LargePlaceableProp62: { id: "1313923275679731712", name: "62_large_placeable_prop" },
			LargePlaceableProp63: { id: "1313923277114310656", name: "63_large_placeable_prop" },
			LargePlaceableProp64: { id: "1313923298635022356", name: "64_large_placeable_prop" },
			LargePlaceableProp65: { id: "1313923311742353413", name: "65_large_placeable_prop" },
			LargePlaceableProp66: { id: "1313923287977562224", name: "66_large_placeable_prop" },
			LargePlaceableProp67: { id: "1313923306096955432", name: "67_large_placeable_prop" },
			LargePlaceableProp68: { id: "1313923285758771382", name: "68_large_placeable_prop" },
			LargePlaceableProp69: { id: "1313923283699105853", name: "69_large_placeable_prop" },
			LargePlaceableProp70: { id: "1313923307501781123", name: "70_large_placeable_prop" },
			LargePlaceableProp71: { id: "1313923309728960675", name: "71_large_placeable_prop" },
			LargePlaceableProp72: { id: "1313923304561578085", name: "72_large_placeable_prop" },
			LargePlaceableProp73: { id: "1313923271959384075", name: "73_large_placeable_prop" },
			LargePlaceableProp74: { id: "1313923293761503444", name: "74_large_placeable_prop" },
			LargePlaceableProp75: { id: "1313923302355636234", name: "75_large_placeable_prop" },
			LargePlaceableProp76: { id: "1313923278502494208", name: "76_large_placeable_prop" },
			LargePlaceableProp77: { id: "1313923270583652404", name: "77_large_placeable_prop" },
			LargePlaceableProp78: { id: "1320564604060962826", name: "78_large_placeable_prop" },
		} as const satisfies Readonly<Record<string, EmojiData>>);

type LargePlaceablePropsEmojis =
	(typeof LARGE_PLACEABLE_PROPS_EMOJIS)[keyof typeof LARGE_PLACEABLE_PROPS_EMOJIS];

export const SMALL_PLACEABLE_PROPS_EMOJIS = PRODUCTION
	? ({
			/**
			 * Days of Love 2020.
			 */
			SmallPlaceableProp01: { id: "1313938750883233884", name: "01_small_placeable_prop" },
			/**
			 * Days of Love Seesaw.
			 */
			SmallPlaceableProp02: { id: "1313938691462533174", name: "02_small_placeable_prop" },
			/**
			 * Assembly Guide (non-ultimate 3).
			 */
			SmallPlaceableProp03: { id: "1313938676207587328", name: "03_small_placeable_prop" },
			/**
			 * Assembly Guide (non-ultimate 4).
			 */
			SmallPlaceableProp04: { id: "1313938740204277770", name: "04_small_placeable_prop" },
			/**
			 * The Rose.
			 */
			SmallPlaceableProp05: { id: "1313938692800385135", name: "05_small_placeable_prop" },
			/**
			 * Little Prince Fox.
			 */
			SmallPlaceableProp06: { id: "1313938745208344666", name: "06_small_placeable_prop" },
			/**
			 * Second Sky Anniversary.
			 */
			SmallPlaceableProp07: { id: "1313938674169413645", name: "07_small_placeable_prop" },
			/**
			 * Mischief Pumpkin Prop.
			 */
			SmallPlaceableProp08: { id: "1313938696096976987", name: "08_small_placeable_prop" },
			/**
			 * Wise Grandparent.
			 */
			SmallPlaceableProp09: { id: "1313938752552439888", name: "09_small_placeable_prop" },
			/**
			 * Winter Feast Pillow.
			 */
			SmallPlaceableProp10: { id: "1313938729295155304", name: "10_small_placeable_prop" },
			/**
			 * Winter Feast Snowglobe.
			 */
			SmallPlaceableProp11: { id: "1313938733124288532", name: "11_small_placeable_prop" },
			/**
			 * Sparkler Parent.
			 */
			SmallPlaceableProp12: { id: "1313938743832346714", name: "12_small_placeable_prop" },
			/**
			 * Prophet of Earth.
			 */
			SmallPlaceableProp13: { id: "1313938731438313563", name: "13_small_placeable_prop" },
			/**
			 * Days of Love Gondola.
			 */
			SmallPlaceableProp14: { id: "1313938727873019914", name: "14_small_placeable_prop" },
			/**
			 * Prophet of Air.
			 */
			SmallPlaceableProp15: { id: "1313938724882747473", name: "15_small_placeable_prop" },
			/**
			 * Balloon.
			 */
			SmallPlaceableProp16: { id: "1313938749385867334", name: "16_small_placeable_prop" },
			/**
			 * Confetti launcher.
			 */
			SmallPlaceableProp17: { id: "1313938747477463092", name: "17_small_placeable_prop" },
			/**
			 * Campfire Snack Kit.
			 */
			SmallPlaceableProp18: { id: "1313938710672179342", name: "18_small_placeable_prop" },
			/**
			 * Feline Familiar Prop.
			 */
			SmallPlaceableProp19: { id: "1313938735859241060", name: "19_small_placeable_prop" },
			/**
			 * Prophet of Water.
			 */
			SmallPlaceableProp20: { id: "1313938721233440828", name: "20_small_placeable_prop" },
			/**
			 * Tournament Skyball Set.
			 */
			SmallPlaceableProp21: { id: "1313938767324909579", name: "21_small_placeable_prop" },
			/**
			 * Remembrance Guide (non-ultimate 1).
			 */
			SmallPlaceableProp22: { id: "1313938758755946577", name: "22_small_placeable_prop" },
			/**
			 * Remembrance Guide (non-ultimate 4).
			 */
			SmallPlaceableProp23: { id: "1313938681203130408", name: "23_small_placeable_prop" },
			/**
			 * Remembrance Guide (non-ultimate 5).
			 */
			SmallPlaceableProp24: { id: "1313938665478553630", name: "24_small_placeable_prop" },
			/**
			 * Bloom Butterfly Fountain.
			 */
			SmallPlaceableProp25: { id: "1313938682926989362", name: "25_small_placeable_prop" },
			/**
			 * Passage Guide (non-ultimate).
			 */
			SmallPlaceableProp26: { id: "1313938677432320031", name: "26_small_placeable_prop" },
			/**
			 * Nature Sonorous Seashell.
			 */
			SmallPlaceableProp27: { id: "1313938760521613373", name: "27_small_placeable_prop" },
			/**
			 * Jolly Geologist.
			 */
			SmallPlaceableProp28: { id: "1313938672567189605", name: "28_small_placeable_prop" },
			/**
			 * Anniversary Sonorous Seashell.
			 */
			SmallPlaceableProp29: { id: "1313938679206645821", name: "29_small_placeable_prop" },
			/**
			 * Anniversary Plush.
			 */
			SmallPlaceableProp30: { id: "1313938737452945479", name: "30_small_placeable_prop" },
			/**
			 * Prophet of Fire 2.
			 */
			SmallPlaceableProp31: { id: "1313938670545408023", name: "31_small_placeable_prop" },
			/**
			 * Sunlight Surfboard.
			 */
			SmallPlaceableProp32: { id: "1313938669287243838", name: "32_small_placeable_prop" },
			/**
			 * Days of Feast 2023.
			 */
			SmallPlaceableProp33: { id: "1313938684562899084", name: "33_small_placeable_prop" },
			/**
			 * Herb Gatherer.
			 */
			SmallPlaceableProp34: { id: "1313938667059937381", name: "34_small_placeable_prop" },
			/**
			 * Love Heart Plushie.
			 */
			SmallPlaceableProp35: { id: "1313938694880886815", name: "35_small_placeable_prop" },
			/**
			 * Companion Cube.
			 */
			SmallPlaceableProp36: { id: "1313938772156747826", name: "36_small_placeable_prop" },
			/**
			 * Nesting Guide (ultimate).
			 */
			SmallPlaceableProp37: { id: "1313938726564397076", name: "37_small_placeable_prop" },
			/**
			 * Nesting Solarium.
			 */
			SmallPlaceableProp38: { id: "1313938741840318535", name: "38_small_placeable_prop" },
			/**
			 * Nesting Loft.
			 */
			SmallPlaceableProp39: { id: "1313938766099906590", name: "39_small_placeable_prop" },
			/**
			 * Nesting Atrium.
			 */
			SmallPlaceableProp40: { id: "1313938712551489649", name: "40_small_placeable_prop" },
			/**
			 * Nesting Nook 1.
			 */
			SmallPlaceableProp41: { id: "1313938756184834111", name: "41_small_placeable_prop" },
			/**
			 * Nesting Nook 2.
			 */
			SmallPlaceableProp42: { id: "1313938738711232564", name: "42_small_placeable_prop" },
			/**
			 * Decor pillow one colour.
			 */
			SmallPlaceableProp43: { id: "1313938754729410670", name: "43_small_placeable_prop" },
			/**
			 * Cinnamoroll Pop-Up Cafe Plushie.
			 */
			SmallPlaceableProp44: { id: "1313938723414474762", name: "44_small_placeable_prop" },
			/**
			 * Decor pillow two colours.
			 */
			SmallPlaceableProp45: { id: "1313938762509848738", name: "45_small_placeable_prop" },
			/**
			 * Small solid rug.
			 */
			SmallPlaceableProp46: { id: "1313938746600853504", name: "46_small_placeable_prop" },
			/**
			 * Decor folded cloth.
			 */
			SmallPlaceableProp47: { id: "1313938770680352799", name: "47_small_placeable_prop" },
			/**
			 * Small stripes rug.
			 */
			SmallPlaceableProp48: { id: "1313938763969331272", name: "48_small_placeable_prop" },
			/**
			 * Small classic rug.
			 */
			SmallPlaceableProp49: { id: "1313938734290440234", name: "49_small_placeable_prop" },
			/**
			 * Stone wall sconce.
			 */
			SmallPlaceableProp50: { id: "1313938768952295486", name: "50_small_placeable_prop" },
			/**
			 * Small half circle rug.
			 */
			SmallPlaceableProp51: { id: "1313938851504324648", name: "51_small_placeable_prop" },
			/**
			 * Medium solid rug.
			 */
			SmallPlaceableProp52: { id: "1313938867090493560", name: "52_small_placeable_prop" },
			/**
			 * Stone figurine.
			 */
			SmallPlaceableProp53: { id: "1313938853970710608", name: "53_small_placeable_prop" },
			/**
			 * Medium stripes rug.
			 */
			SmallPlaceableProp54: { id: "1313938856562917467", name: "54_small_placeable_prop" },
			/**
			 * Instrument stand.
			 */
			SmallPlaceableProp55: { id: "1313938857955295334", name: "55_small_placeable_prop" },
			/**
			 * Stone wall pot rack.
			 */
			SmallPlaceableProp56: { id: "1313938893061488640", name: "56_small_placeable_prop" },
			/**
			 * Stone closed box.
			 */
			SmallPlaceableProp57: { id: "1313938861440766043", name: "57_small_placeable_prop" },
			/**
			 * Medium diamonds rug.
			 */
			SmallPlaceableProp58: { id: "1313938859553460234", name: "58_small_placeable_prop" },
			/**
			 * Music player.
			 */
			SmallPlaceableProp59: { id: "1313938863239987220", name: "59_small_placeable_prop" },
			/**
			 * Stone empty box.
			 */
			SmallPlaceableProp60: { id: "1313938865383411763", name: "60_small_placeable_prop" },
			/**
			 * Stone wall mirror.
			 */
			SmallPlaceableProp61: { id: "1313938889077166100", name: "61_small_placeable_prop" },
			/**
			 * Medium argyle rug.
			 */
			SmallPlaceableProp62: { id: "1313938885939695698", name: "62_small_placeable_prop" },
			/**
			 * Colour Bubble Machine.
			 */
			SmallPlaceableProp63: { id: "1313938855237255238", name: "63_small_placeable_prop" },
			/**
			 * Stone wall mug rack.
			 */
			SmallPlaceableProp64: { id: "1313938883582623805", name: "64_small_placeable_prop" },
			/**
			 * Stone wall towel rack.
			 */
			SmallPlaceableProp65: { id: "1313938901919862815", name: "65_small_placeable_prop" },
			/**
			 * Medium circle rug.
			 */
			SmallPlaceableProp66: { id: "1313938869921779722", name: "66_small_placeable_prop" },
			/**
			 * Stone wall shelf.
			 */
			SmallPlaceableProp67: { id: "1313938903937450005", name: "67_small_placeable_prop" },
			/**
			 * Large solid rug.
			 */
			SmallPlaceableProp68: { id: "1313938899307073536", name: "68_small_placeable_prop" },
			/**
			 * Large circle rug.
			 */
			SmallPlaceableProp69: { id: "1313938868562690080", name: "69_small_placeable_prop" },
			/**
			 * SkyFest Star Jar.
			 */
			SmallPlaceableProp70: { id: "1313938871343644732", name: "70_small_placeable_prop" },
			/**
			 * Duets Guide (ultimate 1).
			 */
			SmallPlaceableProp71: { id: "1313938875307131053", name: "71_small_placeable_prop" },
			/**
			 * Duets Guide (ultimate 2).
			 */
			SmallPlaceableProp72: { id: "1313938887621480508", name: "72_small_placeable_prop" },
			/**
			 * The Cellist's Beginnings.
			 */
			SmallPlaceableProp73: { id: "1313938905610981429", name: "73_small_placeable_prop" },
			/**
			 * The Pianist's Beginnings 1.
			 */
			SmallPlaceableProp74: { id: "1313938876955365517", name: "74_small_placeable_prop" },
			/**
			 * The Pianist's Beginnings 2.
			 */
			SmallPlaceableProp75: { id: "1313938878578823268", name: "75_small_placeable_prop" },
			/**
			 * The Musicians' Legacy.
			 */
			SmallPlaceableProp76: { id: "1313938894571442327", name: "76_small_placeable_prop" },
			/**
			 * The Cellist's Flourishing 1.
			 */
			SmallPlaceableProp77: { id: "1313938879857823855", name: "77_small_placeable_prop" },
			/**
			 * The Cellist's Flourishing 2.
			 */
			SmallPlaceableProp78: { id: "1313938873021235241", name: "78_small_placeable_prop" },
			/**
			 * The Pianist's Flourishing.
			 */
			SmallPlaceableProp79: { id: "1313938881854308443", name: "79_small_placeable_prop" },
			/**
			 * The Moomin Storybook (ultimate).
			 */
			SmallPlaceableProp80: { id: "1313938896350085141", name: "80_small_placeable_prop" },
			/**
			 * Comfort of Kindness.
			 */
			SmallPlaceableProp81: { id: "1313938907049492491", name: "81_small_placeable_prop" },
			/**
			 * Inspiration of Inclusion.
			 */
			SmallPlaceableProp82: { id: "1313938900712030318", name: "82_small_placeable_prop" },
			/**
			 * Hanging mask.
			 */
			SmallPlaceableProp83: { id: "1313938890666803230", name: "83_small_placeable_prop" },
			/**
			 * Hanging mask.
			 */
			SmallPlaceableProp84: { id: "1313938897440477215", name: "84_small_placeable_prop" },
			/**
			 * The Moomin Storybook (non-ultimate).
			 */
			SmallPlaceableProp85: { id: "1315723498727145513", name: "85_small_placeable_prop" },
			/**
			 * Wonderland Cafe Corridor.
			 */
			SmallPlaceableProp86: { id: "1320566969392435303", name: "86_small_placeable_prop" },
		} as const satisfies Readonly<Record<string, EmojiData>>)
	: ({
			SmallPlaceableProp01: { id: "1313924407802069145", name: "01_small_placeable_prop" },
			SmallPlaceableProp02: { id: "1313924361388036187", name: "02_small_placeable_prop" },
			SmallPlaceableProp03: { id: "1313924391138099201", name: "03_small_placeable_prop" },
			SmallPlaceableProp04: { id: "1313924373379416076", name: "04_small_placeable_prop" },
			SmallPlaceableProp05: { id: "1313924359056003115", name: "05_small_placeable_prop" },
			SmallPlaceableProp06: { id: "1313924430933524522", name: "06_small_placeable_prop" },
			SmallPlaceableProp07: { id: "1313924420800348180", name: "07_small_placeable_prop" },
			SmallPlaceableProp08: { id: "1313924370556653609", name: "08_small_placeable_prop" },
			SmallPlaceableProp09: { id: "1313924394556461106", name: "09_small_placeable_prop" },
			SmallPlaceableProp10: { id: "1313924366668533871", name: "10_small_placeable_prop" },
			SmallPlaceableProp11: { id: "1313924392899710998", name: "11_small_placeable_prop" },
			SmallPlaceableProp12: { id: "1313924425888043048", name: "12_small_placeable_prop" },
			SmallPlaceableProp13: { id: "1313924397806911510", name: "13_small_placeable_prop" },
			SmallPlaceableProp14: { id: "1313924363216490596", name: "14_small_placeable_prop" },
			SmallPlaceableProp15: { id: "1313924396490166302", name: "15_small_placeable_prop" },
			SmallPlaceableProp16: { id: "1313924429486493827", name: "16_small_placeable_prop" },
			SmallPlaceableProp17: { id: "1313924380513796228", name: "17_small_placeable_prop" },
			SmallPlaceableProp18: { id: "1313924379100450918", name: "18_small_placeable_prop" },
			SmallPlaceableProp19: { id: "1313924384347521084", name: "19_small_placeable_prop" },
			SmallPlaceableProp20: { id: "1313924421915906081", name: "20_small_placeable_prop" },
			SmallPlaceableProp21: { id: "1313924435354583040", name: "21_small_placeable_prop" },
			SmallPlaceableProp22: { id: "1313924375803723776", name: "22_small_placeable_prop" },
			SmallPlaceableProp23: { id: "1313924372003684435", name: "23_small_placeable_prop" },
			SmallPlaceableProp24: { id: "1313924382263087218", name: "24_small_placeable_prop" },
			SmallPlaceableProp25: { id: "1313924368522416149", name: "25_small_placeable_prop" },
			SmallPlaceableProp26: { id: "1313924365041008711", name: "26_small_placeable_prop" },
			SmallPlaceableProp27: { id: "1313924412457750591", name: "27_small_placeable_prop" },
			SmallPlaceableProp28: { id: "1313924387313025084", name: "28_small_placeable_prop" },
			SmallPlaceableProp29: { id: "1313924399694352406", name: "29_small_placeable_prop" },
			SmallPlaceableProp30: { id: "1313924424269037568", name: "30_small_placeable_prop" },
			SmallPlaceableProp31: { id: "1313924403427283006", name: "31_small_placeable_prop" },
			SmallPlaceableProp32: { id: "1313924389384880138", name: "32_small_placeable_prop" },
			SmallPlaceableProp33: { id: "1313924405868494908", name: "33_small_placeable_prop" },
			SmallPlaceableProp34: { id: "1313924414936711271", name: "34_small_placeable_prop" },
			SmallPlaceableProp35: { id: "1313924377124798485", name: "35_small_placeable_prop" },
			SmallPlaceableProp36: { id: "1313924427666165812", name: "36_small_placeable_prop" },
			SmallPlaceableProp37: { id: "1313924448654590077", name: "37_small_placeable_prop" },
			SmallPlaceableProp38: { id: "1313924442933428304", name: "38_small_placeable_prop" },
			SmallPlaceableProp39: { id: "1313924385790365787", name: "39_small_placeable_prop" },
			SmallPlaceableProp40: { id: "1313924418677772300", name: "40_small_placeable_prop" },
			SmallPlaceableProp41: { id: "1313924410671108097", name: "41_small_placeable_prop" },
			SmallPlaceableProp42: { id: "1313924401716265102", name: "42_small_placeable_prop" },
			SmallPlaceableProp43: { id: "1313924439024341094", name: "43_small_placeable_prop" },
			SmallPlaceableProp44: { id: "1313924416580878408", name: "44_small_placeable_prop" },
			SmallPlaceableProp45: { id: "1313924444456091749", name: "45_small_placeable_prop" },
			SmallPlaceableProp46: { id: "1313924440651858032", name: "46_small_placeable_prop" },
			SmallPlaceableProp47: { id: "1313924450902737006", name: "47_small_placeable_prop" },
			SmallPlaceableProp48: { id: "1313924446561767424", name: "48_small_placeable_prop" },
			SmallPlaceableProp49: { id: "1313924433366487152", name: "49_small_placeable_prop" },
			SmallPlaceableProp50: { id: "1313924437258666095", name: "50_small_placeable_prop" },
			SmallPlaceableProp51: { id: "1313924657539448914", name: "51_small_placeable_prop" },
			SmallPlaceableProp52: { id: "1313924629613776938", name: "52_small_placeable_prop" },
			SmallPlaceableProp53: { id: "1313924669241557076", name: "53_small_placeable_prop" },
			SmallPlaceableProp54: { id: "1313924631547215962", name: "54_small_placeable_prop" },
			SmallPlaceableProp55: { id: "1313924674568196116", name: "55_small_placeable_prop" },
			SmallPlaceableProp56: { id: "1313924633619070979", name: "56_small_placeable_prop" },
			SmallPlaceableProp57: { id: "1313924637960175666", name: "57_small_placeable_prop" },
			SmallPlaceableProp58: { id: "1313924644650221640", name: "58_small_placeable_prop" },
			SmallPlaceableProp59: { id: "1313924621799526430", name: "59_small_placeable_prop" },
			SmallPlaceableProp60: { id: "1313924627927531644", name: "60_small_placeable_prop" },
			SmallPlaceableProp61: { id: "1313924656348004445", name: "61_small_placeable_prop" },
			SmallPlaceableProp62: { id: "1313924652959268937", name: "62_small_placeable_prop" },
			SmallPlaceableProp63: { id: "1313924643182088222", name: "63_small_placeable_prop" },
			SmallPlaceableProp64: { id: "1313924661918040226", name: "64_small_placeable_prop" },
			SmallPlaceableProp65: { id: "1313924625696034866", name: "65_small_placeable_prop" },
			SmallPlaceableProp66: { id: "1313924654469222410", name: "66_small_placeable_prop" },
			SmallPlaceableProp67: { id: "1313924685410467932", name: "67_small_placeable_prop" },
			SmallPlaceableProp68: { id: "1313924671355228202", name: "68_small_placeable_prop" },
			SmallPlaceableProp69: { id: "1313924623712256091", name: "69_small_placeable_prop" },
			SmallPlaceableProp70: { id: "1313924659313639526", name: "70_small_placeable_prop" },
			SmallPlaceableProp71: { id: "1313924667471433798", name: "71_small_placeable_prop" },
			SmallPlaceableProp72: { id: "1313924639201689612", name: "72_small_placeable_prop" },
			SmallPlaceableProp73: { id: "1313924663323394089", name: "73_small_placeable_prop" },
			SmallPlaceableProp74: { id: "1313924665269555241", name: "74_small_placeable_prop" },
			SmallPlaceableProp75: { id: "1313924673083412620", name: "75_small_placeable_prop" },
			SmallPlaceableProp76: { id: "1313924681711222897", name: "76_small_placeable_prop" },
			SmallPlaceableProp77: { id: "1313924635707965584", name: "77_small_placeable_prop" },
			SmallPlaceableProp78: { id: "1313924683141218304", name: "78_small_placeable_prop" },
			SmallPlaceableProp79: { id: "1313924641357824050", name: "79_small_placeable_prop" },
			SmallPlaceableProp80: { id: "1313924677957058651", name: "80_small_placeable_prop" },
			SmallPlaceableProp81: { id: "1313924646567153796", name: "81_small_placeable_prop" },
			SmallPlaceableProp82: { id: "1313924676178939944", name: "82_small_placeable_prop" },
			SmallPlaceableProp83: { id: "1313924687415214080", name: "83_small_placeable_prop" },
			SmallPlaceableProp84: { id: "1313924679798362252", name: "84_small_placeable_prop" },
			SmallPlaceableProp85: { id: "1315723148133531738", name: "85_small_placeable_prop" },
			SmallPlaceableProp86: { id: "1320566442755756102", name: "86_small_placeable_prop" },
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
	return "animated" in emoji ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
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
