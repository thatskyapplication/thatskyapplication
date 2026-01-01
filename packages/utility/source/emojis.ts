import { Cosmetic } from "./cosmetics.js";
import { SeasonId, type SeasonIds } from "./season.js";
import type { Snowflake } from "./types/index.js";
import { EventId, type EventIds } from "./utility/event.js";

export interface Emoji {
	id: Snowflake;
	name: string;
	animated?: boolean;
}

const MISCELLANEOUS_EMOJIS_PRODUCTION = {
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
	PlatformSteam: { id: "1406587258236043284", name: "platform_steam" },
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
	EventTicket: { id: "1313930718723969105", name: "event_ticket" },
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
	DyeRed: { id: "1330476581336125460", name: "dye_red" },
	DyeYellow: { id: "1330476605038002198", name: "dye_yellow" },
	DyeGreen: { id: "1330476631327772672", name: "dye_green" },
	DyeCyan: { id: "1330476678996168724", name: "dye_cyan" },
	DyeBlue: { id: "1330476698310803486", name: "dye_blue" },
	DyePurple: { id: "1330476718288277618", name: "dye_purple" },
	DyeBlack: { id: "1330476749988827166", name: "dye_black" },
	DyeWhite: { id: "1330476771614916769", name: "dye_red" },
	Dye: { id: "1365252158030745680", name: "dye" },
	GiveawayTicket: { id: "1372542240563658782", name: "giveaway_ticket" },
	Settings: { id: "1381212248856465428", name: "settings" },
	Reddit: { id: "1390378584568234004", name: "reddit" },
	Crowdin: { id: "1406562879351689317", name: "crowdin" },
	Trash: { id: "1410256775961251990", name: "trash" },
	Edit: { id: "1410257589840908318", name: "edit" },
	DailyQuest: { id: "1415342214581850182", name: "daily_quest" },
	DailyReset: { id: "1415788534908063784", animated: true, name: "daily_reset" },
	Trust: { id: "1431662227202641930", name: "trust" },
} as const satisfies Readonly<Record<string, Emoji>>;

const MISCELLANEOUS_EMOJIS_DEVELOPMENT = {
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
	PlatformSteam: { id: "1406587272794738720", name: "platform_steam" },
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
	EventTicket: { id: "1313864891311980584", name: "event_ticket" },
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
	DyeRed: { id: "1330476591905640484", name: "dye_red" },
	DyeYellow: { id: "1330476617511997470", name: "dye_yellow" },
	DyeGreen: { id: "1330476643629924433", name: "dye_green" },
	DyeCyan: { id: "1330476687695282196", name: "dye_cyan" },
	DyeBlue: { id: "1330476707244933190", name: "dye_blue" },
	DyePurple: { id: "1330476726274359316", name: "dye_purple" },
	DyeBlack: { id: "1330476758964899861", name: "dye_black" },
	DyeWhite: { id: "1330476779365859328", name: "dye_red" },
	Dye: { id: "1365252165068656661", name: "dye" },
	GiveawayTicket: { id: "1372542337623916614", name: "giveaway_ticket" },
	Settings: { id: "1381212382121955329", name: "settings" },
	Reddit: { id: "1390378668282351667", name: "reddit" },
	Crowdin: { id: "1406560560534917130", name: "crowdin" },
	Trash: { id: "1410256786191155283", name: "trash" },
	Edit: { id: "1410257597130473522", name: "edit" },
	DailyQuest: { id: "1415342223272185938", name: "daily_quest" },
	DailyReset: { id: "1415788543141347458", animated: true, name: "daily_reset" },
	Trust: { id: "1431662235343651089", name: "trust" },
} as const satisfies Readonly<Record<string, Emoji>>;

const EMOTE_EMOJIS_PRODUCTION = {
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
	Voilà: { id: "1313931773767450675", name: "voila" },
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
	Cartwheel: { id: "1330496618889482411", name: "cartwheel" },
	HypeDance: { id: "1330568867986014218", name: "hype_dance" },
	HeartGesture: { id: "1330656137174978560", name: "heart_gesture" },
	Cough: { id: "1363812372510150676", name: "cough" },
	Amazed: { id: "1365270363428360304", name: "amazed" },
	FlagSignal: { id: "1431952765734617181", name: "flag_signal" },
	FlightRun: { id: "1431815492737306715", name: "flight_run" },
	JellyfishDance: { id: "1431949581221888150", name: "jellyfish_dance" },
	Dizzy: { id: "1431943071666540554", name: "dizzy" },
} as const satisfies Readonly<Record<string, Emoji>>;

const EMOTE_EMOJIS_DEVELOPMENT = {
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
	Voilà: { id: "1313865270322008165", name: "voila" },
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
	Cartwheel: { id: "1330496633737318460", name: "cartwheel" },
	HypeDance: { id: "1330568876974542949", name: "hype_dance" },
	HeartGesture: { id: "1330656144921985115", name: "heart_gesture" },
	Cough: { id: "1363812384329699408", name: "cough" },
	Amazed: { id: "1365270370436780152", name: "amazed" },
	FlagSignal: { id: "1431952776078037062", name: "flag_signal" },
	FlightRun: { id: "1431815498953261056", name: "flight_run" },
	JellyfishDance: { id: "1431949589807759423", name: "jellyfish_dance" },
	Dizzy: { id: "1431943075508256860", name: "dizzy" },
} as const satisfies Readonly<Record<string, Emoji>>;

const STANCE_EMOJIS_PRODUCTION = {
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
	Sad: { id: "1383903593739976794", name: "sad" },
	Scarred: { id: "1396915896559337502", name: "scarred" },
} as const satisfies Readonly<Record<string, Emoji>>;

const STANCE_EMOJIS_DEVELOPMENT = {
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
	Sad: { id: "1383903601277010021", name: "sad" },
	Scarred: { id: "1396915902917644461", name: "scarred" },
} as const satisfies Readonly<Record<string, Emoji>>;

const CALL_EMOJIS_PRODUCTION = {
	Base: { id: "1313932583880622080", name: "base_call" },
	Bird: { id: "1313932590448775198", name: "bird" },
	Whale: { id: "1313932587127017473", name: "whale" },
	Manta: { id: "1313932582424940584", name: "manta" },
	CosmicManta: { id: "1313932585419804843", name: "cosmic_manta" },
	Crab: { id: "1313932593158291456", name: "crab" },
	Jellyfish: { id: "1313932581007392828", name: "jellyfish" },
	BabyManta: { id: "1313932591950200952", name: "baby_manta" },
	Nightbird: { id: "1313932588917854239", name: "nightbird" },
	BlueBird: { id: "1389263899345424404", name: "blue_bird" },
	Manatee: { id: "1396948897603125359", name: "manatee" },
	Lighthorn: { id: "1431655246316441700", name: "lighthorn" },
} as const satisfies Readonly<Record<string, Emoji>>;

const CALL_EMOJIS_DEVELOPMENT = {
	Base: { id: "1313867161948917871", name: "base_call" },
	Bird: { id: "1313867169045676094", name: "bird" },
	Whale: { id: "1313867164926873600", name: "whale" },
	Manta: { id: "1313867170140262573", name: "manta" },
	CosmicManta: { id: "1313867166621110323", name: "cosmic_manta" },
	Crab: { id: "1313867163005751296", name: "crab" },
	Jellyfish: { id: "1313867163966374048", name: "jellyfish" },
	BabyManta: { id: "1313867160228986891", name: "baby_manta" },
	Nightbird: { id: "1313867168001298557", name: "nightbird" },
	BlueBird: { id: "1389264024423764018", name: "blue_bird" },
	Manatee: { id: "1396948907115937832", name: "manatee" },
	Lighthorn: { id: "1431655254428225733", name: "lighthorn" },
} as const satisfies Readonly<Record<string, Emoji>>;

const FRIEND_ACTION_EMOJIS_PRODUCTION = {
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
} as const satisfies Readonly<Record<string, Emoji>>;

const FRIEND_ACTION_EMOJIS_DEVELOPMENT = {
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
} as const satisfies Readonly<Record<string, Emoji>>;

const SEASON_EMOJIS_PRODUCTION = {
	Gratitude: { id: "1400926220174098543", name: "gratitude" },
	GratitudeCandle: { id: "1313933013586808832", name: "gratitude_candle" },
	Lightseekers: { id: "1400927788596203651", name: "lightseekers" },
	LightseekersCandle: { id: "1313932983845130240", name: "lightseekers_candle" },
	Belonging: { id: "1400928944210841672", name: "belonging" },
	BelongingCandle: { id: "1313932982632972288", name: "belonging_candle" },
	BelongingHeart: { id: "1313932990640033913", name: "belonging_heart" },
	Rhythm: { id: "1400921906718314516", name: "rhythm" },
	RhythmCandle: { id: "1313933020755005511", name: "rhythm_candle" },
	RhythmHeart: { id: "1313933049754423336", name: "rhythm_heart" },
	Enchantment: { id: "1400926943150608394", name: "enchantment" },
	EnchantmentCandle: { id: "1313932998046912562", name: "enchantment_candle" },
	EnchantmentHeart: { id: "1313933004611129445", name: "enchantment_heart" },
	Sanctuary: { id: "1313932980686946315", name: "sanctuary" },
	SanctuaryCandle: { id: "1313932992460357762", name: "sanctuary_candle" },
	SanctuaryHeart: { id: "1313932987418804329", name: "sanctuary_heart" },
	Prophecy: { id: "1400935411819217051", name: "prophecy" },
	ProphecyCandle: { id: "1313933015730094080", name: "prophecy_candle" },
	ProphecyHeart: { id: "1313933003331993691", name: "prophecy_heart" },
	Dreams: { id: "1400928669656158339", name: "dreams" },
	DreamsCandle: { id: "1313933052291977226", name: "dreams_candle" },
	DreamsHeart: { id: "1313933029432889446", name: "dreams_heart" },
	Assembly: { id: "1400924901447307375", name: "assembly" },
	AssemblyCandle: { id: "1313933022005039237", name: "assembly_candle" },
	AssemblyHeart: { id: "1400923991845245060", name: "assembly_heart" },
	LittlePrince: { id: "1400928314251542528", name: "little_prince" },
	LittlePrinceCandle: { id: "1313932996386226226", name: "little_prince_candle" },
	LittlePrinceHeart: { id: "1313933014677590089", name: "little_prince_heart" },
	Flight: { id: "1400927486333812736", name: "flight" },
	FlightCandle: { id: "1313932985388761149", name: "flight_candle" },
	FlightHeart: { id: "1313933001675116645", name: "flight_heart" },
	Abyss: { id: "1400936225598345216", name: "abyss" },
	AbyssCandle: { id: "1313933055806804019", name: "abyss_candle" },
	AbyssHeart: { id: "1313933024915882045", name: "abyss_heart" },
	Performance: { id: "1400934915398303754", name: "performance" },
	PerformanceCandle: { id: "1313932999443615754", name: "performance_candle" },
	PerformanceHeart: { id: "1313933030884249600", name: "performance_heart" },
	Shattering: { id: "1400932992515571782", name: "shattering" },
	ShatteringCandle: { id: "1313933046604496977", name: "shattering_candle" },
	ShatteringHeart: { id: "1313933048114446376", name: "shattering_heart" },
	Aurora: { id: "1400935913709637683", name: "aurora" },
	AuroraCandle: { id: "1313933037385551965", name: "aurora_candle" },
	AuroraHeart: { id: "1313933043354042379", name: "aurora_heart" },
	Remembrance: { id: "1400932490536812675", name: "remembrance" },
	RemembranceCandle: { id: "1313933012227854346", name: "remembrance_candle" },
	RemembranceHeart: { id: "1313933019844706304", name: "remembrance_heart" },
	Passage: { id: "1313933026534883351", name: "passage" },
	PassageCandle: { id: "1313933035942445207", name: "passage_candle" },
	PassageHeart: { id: "1313933041491644508", name: "passage_heart" },
	Moments: { id: "1400931523506475028", name: "moments" },
	MomentsCandle: { id: "1313933180658778154", name: "moments_candle" },
	MomentsHeart: { id: "1313933182378442812", name: "moments_heart" },
	Revival: { id: "1313933185549336586", name: "revival" },
	RevivalCandle: { id: "1313933177978617866", name: "revival_candle" },
	RevivalHeart: { id: "1313933179803009114", name: "revival_heart" },
	NineColouredDeer: { id: "1313933184299171891", name: "nine_coloured_deer" },
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
	BlueBird: { id: "1363537580578050400", name: "blue_bird" },
	BlueBirdCandle: { id: "1363538105067503846", name: "blue_bird_candle" },
	BlueBirdHeart: { id: "1363538304288690226", name: "blue_bird_heart" },
	TwoEmbersPart1: { id: "1392771944562163752", name: "two_embers_part_1" },
	TwoEmbersPart1Candle: { id: "1396855475739558039", name: "two_embers_part_1_candle" },
	TwoEmbersPart1Heart: { id: "1396855599152631839", name: "two_embers_part_1_heart" },
	Migration: { id: "1428111864889348238", name: "migration" },
	MigrationCandle: { id: "1429514486049542334", name: "migration_candle" },
	MigrationHeart: { id: "1429514579863670784", name: "migration_heart" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SEASON_EMOJIS_DEVELOPMENT = {
	Gratitude: { id: "1400926228990660750", name: "gratitude" },
	GratitudeCandle: { id: "1313868669092237384", name: "gratitude_candle" },
	Lightseekers: { id: "1400927795856801944", name: "lightseekers" },
	LightseekersCandle: { id: "1313868704299352207", name: "lightseekers_candle" },
	Belonging: { id: "1400928992462114866", name: "belonging" },
	BelongingCandle: { id: "1313868736289181756", name: "belonging_candle" },
	BelongingHeart: { id: "1313868674846687343", name: "belonging_heart" },
	Rhythm: { id: "1400922083847966890", name: "rhythm" },
	RhythmCandle: { id: "1313868738935914589", name: "rhythm_candle" },
	RhythmHeart: { id: "1313868680450408448", name: "rhythm_heart" },
	Enchantment: { id: "1400926965736800316", name: "enchantment" },
	EnchantmentCandle: { id: "1313868670476484680", name: "enchantment_candle" },
	EnchantmentHeart: { id: "1313868713019310151", name: "enchantment_heart" },
	Sanctuary: { id: "1313868684745244783", name: "sanctuary" },
	SanctuaryCandle: { id: "1313868695293923330", name: "sanctuary_candle" },
	SanctuaryHeart: { id: "1313868707231043655", name: "sanctuary_heart" },
	Prophecy: { id: "1400935420316877052", name: "prophecy" },
	ProphecyCandle: { id: "1313868673751978015", name: "prophecy_candle" },
	ProphecyHeart: { id: "1313868665862619230", name: "prophecy_heart" },
	Dreams: { id: "1400928679017578538", name: "dreams" },
	DreamsCandle: { id: "1313868700138606654", name: "dreams_candle" },
	DreamsHeart: { id: "1313868682744561678", name: "dreams_heart" },
	Assembly: { id: "1400924932988211391", name: "assembly" },
	AssemblyCandle: { id: "1313868730031149096", name: "assembly_candle" },
	AssemblyHeart: { id: "1400924020953841767", name: "assembly_heart" },
	LittlePrince: { id: "1400928322703331380", name: "little_prince" },
	LittlePrinceCandle: { id: "1313868734535958639", name: "little_prince_candle" },
	LittlePrinceHeart: { id: "1313868693989621772", name: "little_prince_heart" },
	Flight: { id: "1400927494793859224", name: "flight" },
	FlightCandle: { id: "1313868709923651636", name: "flight_candle" },
	FlightHeart: { id: "1313868671524802683", name: "flight_heart" },
	Abyss: { id: "1400936233688891415", name: "abyss" },
	AbyssCandle: { id: "1313868705846923367", name: "abyss_candle" },
	AbyssHeart: { id: "1313868689094742058", name: "abyss_heart" },
	Performance: { id: "1400934932897071255", name: "performance" },
	PerformanceCandle: { id: "1313868711387725886", name: "performance_candle" },
	PerformanceHeart: { id: "1313868701904408617", name: "performance_heart" },
	Shattering: { id: "1400933002099560579", name: "shattering" },
	ShatteringCandle: { id: "1313868728231919680", name: "shattering_candle" },
	ShatteringHeart: { id: "1313868709189914787", name: "shattering_heart" },
	Aurora: { id: "1400935921385209866", name: "aurora" },
	AuroraCandle: { id: "1313868716408045578", name: "aurora_candle" },
	AuroraHeart: { id: "1313868714830987404", name: "aurora_heart" },
	Remembrance: { id: "1400932491858280508", name: "remembrance" },
	RemembranceCandle: { id: "1313868727170633750", name: "remembrance_candle" },
	RemembranceHeart: { id: "1313868725627261041", name: "remembrance_heart" },
	Passage: { id: "1313868686712377424", name: "passage" },
	PassageCandle: { id: "1313868717612073063", name: "passage_candle" },
	PassageHeart: { id: "1313868690973921501", name: "passage_heart" },
	Moments: { id: "1400931534193692692", name: "moments" },
	MomentsCandle: { id: "1313868836113743893", name: "moments_candle" },
	MomentsHeart: { id: "1313868834498940949", name: "moments_heart" },
	Revival: { id: "1313868841943826506", name: "revival" },
	RevivalCandle: { id: "1313868837296275476", name: "revival_candle" },
	RevivalHeart: { id: "1313868843554308157", name: "revival_heart" },
	NineColouredDeer: { id: "1313868841251770408", name: "nine_coloured_deer" },
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
	BlueBird: { id: "1363537620289847437", name: "blue_bird" },
	BlueBirdCandle: { id: "1363538114949414963", name: "blue_bird_candle" },
	BlueBirdHeart: { id: "1363538311402094813", name: "blue_bird_heart" },
	TwoEmbersPart1: { id: "1392772065802719252", name: "two_embers_part_1" },
	TwoEmbersPart1Candle: { id: "1396855483955941478", name: "two_embers_part_1_candle" },
	TwoEmbersPart1Heart: { id: "1396855636632797245", name: "two_embers_part_1_heart" },
	Migration: { id: "1428111900868214804", name: "migration" },
	MigrationCandle: { id: "1429514613476687933", name: "migration_candle" },
	MigrationHeart: { id: "1429514640282488832", name: "migration_heart" },
} as const satisfies Readonly<Record<string, Emoji>>;

const EVENT_EMOJIS_PRODUCTION = {
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
	Treasure: { id: "1345892771441147934", name: "treasure" },
} as const satisfies Readonly<Record<string, Emoji>>;

const EVENT_EMOJIS_DEVELOPMENT = {
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
	Treasure: { id: "1345892778781053009", name: "treasure" },
} as const satisfies Readonly<Record<string, Emoji>>;

const OUTFIT_EMOJIS_PRODUCTION = {
	/**
	 * Base.
	 */
	Outfit01: { id: "1392509274990575759", name: "01_outfit" },
	/**
	 * Pointing Candlemaker.
	 */
	Outfit02: { id: "1392513844529598524", name: "02_outfit" },
	/**
	 * Ushering Stargazer.
	 */
	Outfit03: { id: "1392513291804217365", name: "03_outfit" },
	/**
	 * Butterfly Charmer.
	 */
	Outfit04: { id: "1392513595258179796", name: "04_outfit" },
	/**
	 * Shivering Trailblazer.
	 */
	Outfit05: { id: "1392511065970970735", name: "05_outfit" },
	/**
	 * Hide'n'Seek Pioneer.
	 */
	Outfit06: { id: "1392509811668549692", name: "06_outfit" },
	/**
	 * Confident Sightseer.
	 */
	Outfit07: { id: "1392511998323069029", name: "07_outfit" },
	/**
	 * Polite Scholar.
	 */
	Outfit08: { id: "1392511563151314954", name: "08_outfit" },
	/**
	 * Memory Whisperer.
	 */
	Outfit09: { id: "1392512455741280449", name: "09_outfit" },
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
	 * Frantic Stagehand.
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
	/**
	 * Radiance Leaping Dancer.
	 */
	Outfit75: { id: "1330514815864672299", name: "75_outfit" },
	/**
	 * Radiance Provoking Performer.
	 */
	Outfit76: { id: "1330644916203815054", name: "76_outfit" },
	/**
	 * Radiance Greeting Shaman.
	 */
	Outfit77: { id: "1330666163813879828", name: "77_outfit" },
	/**
	 * Fortune Snake Outfit.
	 */
	Outfit78: { id: "1333204969163325482", name: "78_outfit" },
	/**
	 * Treasure Seeker's Outfit.
	 */
	Outfit79: { id: "1345901512416690260", name: "79_outfit" },
	/**
	 * Costumed Confetti Cousin.
	 */
	Outfit80: { id: "1364902537895088128", name: "80_outfit" },
	/**
	 * Woodcutting Pleaful Parent.
	 */
	Outfit81: { id: "1365257960279900252", name: "81_outfit" },
	/**
	 * Royal Hairtousle Teen.
	 */
	Outfit82: { id: "1365271623120195704", name: "82_outfit" },
	/**
	 * Ocean Waves Outfit.
	 */
	Outfit83: { id: "1366370362606223451", name: "83_outfit" },
	/**
	 * Rainbow Smock.
	 */
	Outfit84: { id: "1376529972608372756", name: "84_outfit" },
	/**
	 * Tending Toymaker.
	 */
	Outfit85: { id: "1396908098257686548", name: "85_outfit" },
	/**
	 * Scarred Sentry.
	 */
	Outfit86: { id: "1396917161343189012", name: "86_outfit" },
	/**
	 * Stern Shepherd.
	 */
	Outfit87: { id: "1396949612899602533", name: "87_outfit" },
	/**
	 * Resourceful Recluse.
	 */
	Outfit88: { id: "1396955999528685578", name: "88_outfit" },
	/**
	 * Anniversary Suit.
	 */
	Outfit89: { id: "1401820507371737190", name: "89_outfit" },
	/**
	 * Anniversary Gown Ensemble Gown.
	 */
	Outfit90: { id: "1404327666202710016", name: "90_outfit" },
	/**
	 * Sunlight Bonnet Dress.
	 */
	Outfit91: { id: "1412357405106372608", name: "91_outfit" },
	/**
	 * Migration Guide (ultimate).
	 */
	Outfit92: { id: "1431638759744606258", name: "92_outfit" },
	/**
	 * Migrating Bird Whisperer.
	 */
	Outfit93: { id: "1431816159728242782", name: "93_outfit" },
	/**
	 * Migrating Jellyfish Whisperer.
	 */
	Outfit94: { id: "1431949634774761649", name: "94_outfit" },
	/**
	 * Migrating Manta Whisperer.
	 */
	Outfit95: { id: "1431952759711862907", name: "95_outfit" },
	/**
	 * Days of Feast 2025.
	 */
	Outfit96: { id: "1449477359920218124", name: "96_outfit" },
} as const satisfies Readonly<Record<string, Emoji>>;

const OUTFIT_EMOJIS_DEVELOPMENT = {
	Outfit01: { id: "1392509282980855848", name: "01_outfit" },
	Outfit02: { id: "1392513851723092090", name: "02_outfit" },
	Outfit03: { id: "1392513299949817856", name: "03_outfit" },
	Outfit04: { id: "1392513601474138142", name: "04_outfit" },
	Outfit05: { id: "1392511074368094268", name: "05_outfit" },
	Outfit06: { id: "1392509819008847942", name: "06_outfit" },
	Outfit07: { id: "1392512006489243769", name: "07_outfit" },
	Outfit08: { id: "1392511571053510666", name: "08_outfit" },
	Outfit09: { id: "1392512465237180416", name: "09_outfit" },
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
	Outfit39: { id: "1313869782386343987", name: "39_outfit" },
	Outfit40: { id: "1313869787650330646", name: "40_outfit" },
	Outfit41: { id: "1313869791601365004", name: "41_outfit" },
	Outfit42: { id: "1313869815055781939", name: "42_outfit" },
	Outfit43: { id: "1313869772429201441", name: "43_outfit" },
	Outfit44: { id: "1313869811402543105", name: "44_outfit" },
	Outfit45: { id: "1313869778712002590", name: "45_outfit" },
	Outfit46: { id: "1313869780473741312", name: "46_outfit" },
	Outfit47: { id: "1313869799754960927", name: "47_outfit" },
	Outfit48: { id: "1313869802640506920", name: "48_outfit" },
	Outfit49: { id: "1313869775440576593", name: "49_outfit" },
	Outfit50: { id: "1313869813613068308", name: "50_outfit" },
	Outfit51: { id: "1313919395784949874", name: "51_outfit" },
	Outfit52: { id: "1313919393331413043", name: "52_outfit" },
	Outfit53: { id: "1313919419428372513", name: "53_outfit" },
	Outfit54: { id: "1313919400859930756", name: "54_outfit" },
	Outfit55: { id: "1313919412956434463", name: "55_outfit" },
	Outfit56: { id: "1313919420669628416", name: "56_outfit" },
	Outfit57: { id: "1313919418287263826", name: "57_outfit" },
	Outfit58: { id: "1313919397408145408", name: "58_outfit" },
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
	Outfit75: { id: "1330514830603587584", name: "75_outfit" },
	Outfit76: { id: "1330644931693248584", name: "76_outfit" },
	Outfit77: { id: "1330666170403000430", name: "77_outfit" },
	Outfit78: { id: "1333204981150515292", name: "78_outfit" },
	Outfit79: { id: "1345901519869837345", name: "79_outfit" },
	Outfit80: { id: "1364902547592052737", name: "80_outfit" },
	Outfit81: { id: "1365257968148283423", name: "81_outfit" },
	Outfit82: { id: "1365271629558452224", name: "82_outfit" },
	Outfit83: { id: "1366370369044484119", name: "83_outfit" },
	Outfit84: { id: "1376529980800106496", name: "84_outfit" },
	Outfit85: { id: "1396908105500987647", name: "85_outfit" },
	Outfit86: { id: "1396917168918106184", name: "86_outfit" },
	Outfit87: { id: "1396949620608864417", name: "87_outfit" },
	Outfit88: { id: "1396956009645473904", name: "88_outfit" },
	Outfit89: { id: "1401820515299229697", name: "89_outfit" },
	Outfit90: { id: "1404327674553303211", name: "90_outfit" },
	Outfit91: { id: "1412357412500934696", name: "91_outfit" },
	Outfit92: { id: "1431638770482151445", name: "92_outfit" },
	Outfit93: { id: "1431816173930151956", name: "93_outfit" },
	Outfit94: { id: "1431949644669390898", name: "94_outfit" },
	Outfit95: { id: "1431952770440892518", name: "95_outfit" },
	Outfit96: { id: "1449477368723804382", name: "96_outfit" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SHOE_EMOJIS_PRODUCTION = {
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
	 * Peeking Postman.
	 */
	Shoe05: { id: "1439909617068015636", name: "05_shoe" },
	/**
	 * Musical Voyage Sneakers.
	 */
	Shoe06: { id: "1313934741107376200", name: "06_shoe" },
	/**
	 * Sunlight Chunky Sandals.
	 */
	Shoe07: { id: "1313934735218839563", name: "07_shoe" },
	/**
	 * Style Silk Ballet Slippers.
	 */
	Shoe08: { id: "1313934748933947473", name: "08_shoe" },
	/**
	 * Style Bunny Slippers.
	 */
	Shoe09: { id: "1313934745662525580", name: "09_shoe" },
	/**
	 * Vestige of a Deserted Oasis.
	 */
	Shoe10: { id: "1313934733821870100", name: "10_shoe" },
	/**
	 * Echo of an Abandoned Refuge.
	 */
	Shoe11: { id: "1313934747155697756", name: "11_shoe" },
	/**
	 * Remnant of a Forgotten Haven.
	 */
	Shoe12: { id: "1313934736577531957", name: "12_shoe" },
	/**
	 * Mischief Goth Boots.
	 */
	Shoe13: { id: "1313934751836540979", name: "13_shoe" },
	/**
	 * Cosy Hermit Boots.
	 */
	Shoe14: { id: "1313934750020538499", name: "14_shoe" },
	/**
	 * Dark Rainbow Loafers.
	 */
	Shoe15: { id: "1313934731120873522", name: "15_shoe" },
	/**
	 * The Pianist's Flourishing.
	 */
	Shoe16: { id: "1313934742717988874", name: "16_shoe" },
	/**
	 * Sense of Self.
	 */
	Shoe17: { id: "1313934738477813800", name: "17_shoe" },
	/**
	 * Radiance Leaping Dancer.
	 */
	Shoe18: { id: "1330515567882276934", name: "18_shoe" },
	/**
	 * Radiance Provoking Performer.
	 */
	Shoe19: { id: "1330646393114722365", name: "19_shoe" },
	/**
	 * Treasure Cavalier Boots.
	 */
	Shoe20: { id: "1345896918710095912", name: "20_shoe" },
	/**
	 * Woodcutting Pleaful Parent.
	 */
	Shoe21: { id: "1365257777966092298", name: "21_shoe" },
	/**
	 * Ocean Sea Foam Boots.
	 */
	Shoe22: { id: "1366371889743921182", name: "22_shoe" },
	/**
	 * Scarred Sentry.
	 */
	Shoe23: { id: "1396917421683511466", name: "23_shoe" },
	/**
	 * Anniversary Gown Ensemble Shoes.
	 */
	Shoe24: { id: "1404327902828560456", name: "24_shoe" },
	/**
	 * Migration Guide (ultimate).
	 */
	Shoe25: { id: "1431028995335389225", name: "25_shoe" },
	/**
	 * Fluffy Winter Wear shoes.
	 */
	Shoe26: { id: "1449475133520740466", name: "26_shoe" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SHOE_EMOJIS_DEVELOPMENT = {
	Shoe01: { id: "1313919703458119770", name: "01_shoe" },
	Shoe02: { id: "1313919688484454570", name: "02_shoe" },
	Shoe03: { id: "1313919699360415885", name: "03_shoe" },
	Shoe04: { id: "1313919691462283387", name: "04_shoe" },
	Shoe05: { id: "1439911388439908513", name: "05_shoe" },
	Shoe06: { id: "1313919692313726998", name: "06_shoe" },
	Shoe07: { id: "1313919702002565190", name: "07_shoe" },
	Shoe08: { id: "1313919704959811724", name: "08_shoe" },
	Shoe09: { id: "1313919708612923473", name: "09_shoe" },
	Shoe10: { id: "1313919696440922133", name: "10_shoe" },
	Shoe11: { id: "1313919689709060147", name: "11_shoe" },
	Shoe12: { id: "1313919697946804344", name: "12_shoe" },
	Shoe13: { id: "1313919710139519006", name: "13_shoe" },
	Shoe14: { id: "1313919695229026358", name: "14_shoe" },
	Shoe15: { id: "1313919700844937296", name: "15_shoe" },
	Shoe16: { id: "1313919706809241681", name: "16_shoe" },
	Shoe17: { id: "1313919693664288770", name: "17_shoe" },
	Shoe18: { id: "1330515583351001182", name: "18_shoe" },
	Shoe19: { id: "1330646401532559402", name: "19_shoe" },
	Shoe20: { id: "1345896926830133379", name: "20_shoe" },
	Shoe21: { id: "1365257785629216768", name: "21_shoe" },
	Shoe22: { id: "1366371897792532620", name: "22_shoe" },
	Shoe23: { id: "1396917426486247454", name: "23_shoe" },
	Shoe24: { id: "1404327909891641480", name: "24_shoe" },
	Shoe25: { id: "1431029005762691394", name: "25_shoe" },
	Shoe26: { id: "1449475145600208897", name: "26_shoe" },
} as const satisfies Readonly<Record<string, Emoji>>;

const MASK_EMOJIS_PRODUCTION = {
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
	Mask79: { id: "1313935288065589248", name: "79_mask" },
	/**
	 * Passage Guide (non-ultimate 4).
	 */
	Mask80: { id: "1313935302913425409", name: "80_mask" },
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
	/**
	 * Radiance Guide (ultimate).
	 */
	Mask94: { id: "1330484202856120361", name: "94_mask" },
	/**
	 * Fortune Snake Mask.
	 */
	Mask95: { id: "1333204436235059313", name: "95_mask" },
	/**
	 * Treasure Seeker's Eyepatch.
	 */
	Mask96: { id: "1345899392087101490", name: "96_mask" },
	/**
	 * Transcendent Journey Mask.
	 */
	Mask97: { id: "1354390500983181312", name: "97_mask" },
	/**
	 * Bloom Rose Petal Mask.
	 */
	Mask98: { id: "1353522156822073415", name: "98_mask" },
	/**
	 * Costumed Confetti Cousin.
	 */
	Mask99: { id: "1364902300765917325", name: "99_mask" },
	/**
	 * Ocean Waves Mask.
	 */
	Mask100: { id: "1366372066298695720", name: "100_mask" },
	/**
	 * Rainbow Face Paint Mask.
	 */
	Mask101: { id: "1376530171292680212", name: "101_mask" },
	/**
	 * Stern Shepherd.
	 */
	Mask102: { id: "1396951023146373150", name: "102_mask" },
	/**
	 * Resourceful Recluse.
	 */
	Mask103: { id: "1396955699723894906", name: "103_mask" },
	/**
	 * Mischief Beak MAsk.
	 */
	Mask104: { id: "1433198715879035090", name: "104_mask" },
} as const satisfies Readonly<Record<string, Emoji>>;

const MASK_EMOJIS_DEVELOPMENT = {
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
	Mask57: { id: "1313920406377332757", name: "57_mask" },
	Mask58: { id: "1313920371925323847", name: "58_mask" },
	Mask59: { id: "1313920411620081754", name: "59_mask" },
	Mask60: { id: "1313920355319939124", name: "60_mask" },
	Mask61: { id: "1313920356670509086", name: "61_mask" },
	Mask62: { id: "1313920382650159176", name: "62_mask" },
	Mask63: { id: "1313920358234980393", name: "63_mask" },
	Mask64: { id: "1313920374747959316", name: "64_mask" },
	Mask65: { id: "1313920389516234786", name: "65_mask" },
	Mask66: { id: "1313920408390598798", name: "66_mask" },
	Mask67: { id: "1313920368687321118", name: "67_mask" },
	Mask68: { id: "1313920362920022186", name: "68_mask" },
	Mask69: { id: "1313920391567118406", name: "69_mask" },
	Mask70: { id: "1313920388606070804", name: "70_mask" },
	Mask71: { id: "1313920381538664508", name: "71_mask" },
	Mask72: { id: "1313920396147429446", name: "72_mask" },
	Mask73: { id: "1313920380276052069", name: "73_mask" },
	Mask74: { id: "1313920397275693117", name: "74_mask" },
	Mask75: { id: "1313920377369395282", name: "75_mask" },
	Mask76: { id: "1313920378686406656", name: "76_mask" },
	Mask77: { id: "1313920373120831521", name: "77_mask" },
	Mask78: { id: "1313920386869493762", name: "78_mask" },
	Mask79: { id: "1313920395073556552", name: "79_mask" },
	Mask80: { id: "1313920399876296746", name: "80_mask" },
	Mask81: { id: "1313920404842221681", name: "81_mask" },
	Mask82: { id: "1313920370193203220", name: "82_mask" },
	Mask83: { id: "1313920384579539027", name: "83_mask" },
	Mask84: { id: "1313920403193724949", name: "84_mask" },
	Mask85: { id: "1313920407690022932", name: "85_mask" },
	Mask86: { id: "1313920359438749797", name: "86_mask" },
	Mask87: { id: "1313920410236096574", name: "87_mask" },
	Mask88: { id: "1313920385514868748", name: "88_mask" },
	Mask89: { id: "1313920401637773422", name: "89_mask" },
	Mask90: { id: "1313920392720683089", name: "90_mask" },
	Mask91: { id: "1313920393953939500", name: "91_mask" },
	Mask92: { id: "1313920398295040020", name: "92_mask" },
	Mask93: { id: "1313920383770169407", name: "93_mask" },
	Mask94: { id: "1330484210611392535", name: "94_mask" },
	Mask95: { id: "1333204546775679097", name: "95_mask" },
	Mask96: { id: "1345899400043429998", name: "96_mask" },
	Mask97: { id: "1354390516753760256", name: "97_mask" },
	Mask98: { id: "1353522165378711623", name: "98_mask" },
	Mask99: { id: "1364902309586407479", name: "99_mask" },
	Mask100: { id: "1366372071566999633", name: "100_mask" },
	Mask101: { id: "1376530178947153970", name: "101_mask" },
	Mask102: { id: "1396951030150987816", name: "102_mask" },
	Mask103: { id: "1396955708032811099", name: "103_mask" },
	Mask104: { id: "1433198725970526331", name: "104_mask" },
} as const satisfies Readonly<Record<string, Emoji>>;

const FACE_ACCESSORY_EMOJIS_PRODUCTION = {
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
	 * Chill Sunbather.
	 */
	FaceAccessory08: { id: "1313935551342186647", name: "08_face_accessory" },
	/**
	 * Elder of the Isle.
	 */
	FaceAccessory09: { id: "1313935577212653650", name: "09_face_accessory" },
	/**
	 * Elder of the Prairie.
	 */
	FaceAccessory10: { id: "1313935546904477706", name: "10_face_accessory" },
	/**
	 * Elder of the Forest.
	 */
	FaceAccessory11: { id: "1313935556534734910", name: "11_face_accessory" },
	/**
	 * Feast Goggles.
	 */
	FaceAccessory12: { id: "1313935558103273472", name: "12_face_accessory" },
	/**
	 * Nature Glasses.
	 */
	FaceAccessory13: { id: "1313935562348167208", name: "13_face_accessory" },
	/**
	 * Reassuring Ranger.
	 */
	FaceAccessory14: { id: "1313935575505440839", name: "14_face_accessory" },
	/**
	 * Moments Guide (ultimate).
	 */
	FaceAccessory15: { id: "1313935569440739359", name: "15_face_accessory" },
	/**
	 * Jolly Geologist.
	 */
	FaceAccessory16: { id: "1313935570820665407", name: "16_face_accessory" },
	/**
	 * Style Star Sunglasses.
	 */
	FaceAccessory17: { id: "1313935568165539871", name: "17_face_accessory" },
	/**
	 * Style Flame Sunglasses.
	 */
	FaceAccessory18: { id: "1313935559525400667", name: "18_face_accessory" },
	/**
	 * Style Heart Sunglasses.
	 */
	FaceAccessory19: { id: "1313935586058567771", name: "19_face_accessory" },
	/**
	 * Compassionate Cellist.
	 */
	FaceAccessory20: { id: "1313935581046116412", name: "20_face_accessory" },
	/**
	 * Style Dapper Monocle.
	 */
	FaceAccessory21: { id: "1313935582761717780", name: "21_face_accessory" },
	/**
	 * Mischief Star Sticker.
	 */
	FaceAccessory22: { id: "1313935561022636072", name: "22_face_accessory" },
	/**
	 * Blue Bird Guide (ultimate).
	 */
	FaceAccessory23: { id: "1365253683805421631", name: "23_face_accessory" },
	/**
	 * Divining Wise Grandparent.
	 */
	FaceAccessory24: { id: "1365251455874895922", name: "24_face_accessory" },
	/**
	 * Anniversary Cinema Glasses.
	 */
	FaceAccessory25: { id: "1391821692338442460", name: "25_face_accessory" },
	/**
	 * Migration Guide (ultimate).
	 */
	FaceAccessory26: { id: "1431639054042271786", name: "26_face_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const FACE_ACCESSORY_EMOJIS_DEVELOPMENT = {
	FaceAccessory01: { id: "1313920630118420562", name: "01_face_accessory" },
	FaceAccessory02: { id: "1313920619875668099", name: "02_face_accessory" },
	FaceAccessory03: { id: "1313920570496389212", name: "03_face_accessory" },
	FaceAccessory04: { id: "1313920596676972635", name: "04_face_accessory" },
	FaceAccessory05: { id: "1313920587621732382", name: "05_face_accessory" },
	FaceAccessory06: { id: "1313920571335114753", name: "06_face_accessory" },
	FaceAccessory07: { id: "1313920622971326554", name: "07_face_accessory" },
	FaceAccessory08: { id: "1313920632051863617", name: "08_face_accessory" },
	FaceAccessory09: { id: "1313920633503219826", name: "09_face_accessory" },
	FaceAccessory10: { id: "1313920598258483293", name: "10_face_accessory" },
	FaceAccessory11: { id: "1313920610497335316", name: "11_face_accessory" },
	FaceAccessory12: { id: "1313920631334502493", name: "12_face_accessory" },
	FaceAccessory13: { id: "1313920612015542445", name: "13_face_accessory" },
	FaceAccessory14: { id: "1313920595192315967", name: "14_face_accessory" },
	FaceAccessory15: { id: "1313920621263982642", name: "15_face_accessory" },
	FaceAccessory16: { id: "1313920580667310111", name: "16_face_accessory" },
	FaceAccessory17: { id: "1313920624573284472", name: "17_face_accessory" },
	FaceAccessory18: { id: "1313920576079007856", name: "18_face_accessory" },
	FaceAccessory19: { id: "1313920628834828378", name: "19_face_accessory" },
	FaceAccessory20: { id: "1313920602817564802", name: "20_face_accessory" },
	FaceAccessory21: { id: "1313920608677134378", name: "21_face_accessory" },
	FaceAccessory22: { id: "1313920607028777020", name: "22_face_accessory" },
	FaceAccessory23: { id: "1365253690675433542", name: "23_face_accessory" },
	FaceAccessory24: { id: "1365251466738139169", name: "24_face_accessory" },
	FaceAccessory25: { id: "1391821700949082252", name: "25_face_accessory" },
	FaceAccessory26: { id: "1431639061537488918", name: "26_face_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const NECKLACE_EMOJIS_PRODUCTION = {
	/**
	 * Gratitude Pendant.
	 */
	Necklace01: { id: "1313935763599130694", name: "01_necklace" },
	/**
	 * Lightseekers Pendant.
	 */
	Necklace02: { id: "1313935760109600849", name: "02_necklace" },
	/**
	 * Belonging Pendant.
	 */
	Necklace03: { id: "1313935761518624899", name: "03_necklace" },
	/**
	 * Rhythm Pendant.
	 */
	Necklace04: { id: "1313935770482118676", name: "04_necklace" },
	/**
	 * Enchantment Pendant.
	 */
	Necklace05: { id: "1313935769190268979", name: "05_necklace" },
	/**
	 * Sanctuary Pendant.
	 */
	Necklace06: { id: "1313935767575461919", name: "06_necklace" },
	/**
	 * Hiking Grouch.
	 */
	Necklace07: { id: "1392498131358318693", name: "07_necklace" },
	/**
	 * Prophecy Pendant.
	 */
	Necklace08: { id: "1313935764676939777", name: "08_necklace" },
	/**
	 * Days of Feast 2020.
	 */
	Necklace09: { id: "1392503728740765706", name: "09_necklace" },
	/**
	 * Dreams Pendant.
	 */
	Necklace10: { id: "1313935780737060937", name: "10_necklace" },
	/**
	 * Assembly Pendant.
	 */
	Necklace11: { id: "1313935776052023329", name: "11_necklace" },
	/**
	 * Ocean Necklace.
	 */
	Necklace12: { id: "1392502063568785508", name: "12_necklace" },
	/**
	 * Little Prince Pendant.
	 */
	Necklace13: { id: "1313935826413158481", name: "13_necklace" },
	/**
	 * Star Collector.
	 */
	Necklace14: { id: "1392499089148739765", name: "14_necklace" },
	/**
	 * Flight Pendant.
	 */
	Necklace15: { id: "1313935771849326703", name: "15_necklace" },
	/**
	 * Talented Builder.
	 */
	Necklace16: { id: "1392499568377073765", name: "16_necklace" },
	/**
	 * Winter Feast Scarf.
	 */
	Necklace17: { id: "1392503992365613166", name: "17_necklace" },
	/**
	 * Abyss Pendant.
	 */
	Necklace18: { id: "1313935794746167366", name: "18_necklace" },
	/**
	 * Performance Pendant.
	 */
	Necklace19: { id: "1313935773883568179", name: "19_necklace" },
	/**
	 * Days of Nature 2022.
	 */
	Necklace20: { id: "1392502492218265704", name: "20_necklace" },
	/**
	 * Shattering Pendant.
	 */
	Necklace21: { id: "1313935792934096917", name: "21_necklace" },
	/**
	 * Ancient Darkness (dragon).
	 */
	Necklace22: { id: "1392504527952810025", name: "22_necklace" },
	/**
	 * Jelly Shoulder Buddy.
	 */
	Necklace23: { id: "1392503199893688331", name: "23_necklace" },
	/**
	 * AURORA Pendant.
	 */
	Necklace24: { id: "1313935803348549642", name: "24_necklace" },
	/**
	 * Remembrance Pendant.
	 */
	Necklace25: { id: "1313935799116370001", name: "25_necklace" },
	/**
	 * Pleading Child.
	 */
	Necklace26: { id: "1392499960393764926", name: "26_necklace" },
	/**
	 * Remembrance Guide.
	 */
	Necklace27: { id: "1392500666693455902", name: "27_necklace" },
	/**
	 * Days of Love Classy Cravat.
	 */
	Necklace28: { id: "1392501503188533358", name: "28_necklace" },
	/**
	 * Passage Pendant.
	 */
	Necklace29: { id: "1313935804804108438", name: "29_necklace" },
	/**
	 * Oddball Outcast.
	 */
	Necklace30: { id: "1392501024987811861", name: "30_necklace" },
	/**
	 * Moments Pendant.
	 */
	Necklace31: { id: "1313935800731172864", name: "31_necklace" },
	/**
	 * Revival Pendant.
	 */
	Necklace32: { id: "1313935808079724575", name: "32_necklace" },
	/**
	 * Nine-Coloured Deer Pendant.
	 */
	Necklace33: { id: "1313935809547862049", name: "33_necklace" },
	/**
	 * Nesting Pendant.
	 */
	Necklace34: { id: "1313935832687579146", name: "34_necklace" },
	/**
	 * Cinnamoroll Pop-Up Cafe Bowtie.
	 */
	Necklace35: { id: "1392507623529517156", name: "35_necklace" },
	/**
	 * Ocean Blue Scarf.
	 */
	Necklace36: { id: "1392502866803032145", name: "36_necklace" },
	/**
	 * Duets Pendant.
	 */
	Necklace37: { id: "1313935815881134122", name: "37_necklace" },
	/**
	 * Style Dapper Necktie.
	 */
	Necklace38: { id: "1392505254561452112", name: "38_necklace" },
	/**
	 * Hattifattener Shoulder Buddy.
	 */
	Necklace39: { id: "1313935811497951235", name: "39_necklace" },
	/**
	 * Roving Snufkin Scarf.
	 */
	Necklace40: { id: "1313935791067627520", name: "40_necklace" },
	/**
	 * Moomintroll Tail.
	 */
	Necklace41: { id: "1313935817600667668", name: "41_necklace" },
	/**
	 * Moomin Pendant.
	 */
	Necklace42: { id: "1313935823015776267", name: "42_necklace" },
	/**
	 * Comfort of Kindness.
	 */
	Necklace43: { id: "1313935820385943712", name: "43_necklace" },
	/**
	 * Sense of Self.
	 */
	Necklace44: { id: "1313935829202370580", name: "44_necklace" },
	/**
	 * Inspiration of Inclusion.
	 */
	Necklace45: { id: "1313935812668424214", name: "45_necklace" },
	/**
	 * Radiance Pendant.
	 */
	Necklace46: { id: "1330482500056911944", name: "46_necklace" },
	/**
	 * Blue Bird Pendant.
	 */
	Necklace47: { id: "1363811108015706123", name: "47_necklace" },
	/**
	 * The Two Embers - Part 1 Pendant.
	 */
	Necklace48: { id: "1396895194703466698", name: "48_necklace" },
	/**
	 * Spirited Manatee Tail.
	 */
	Necklace49: { id: "1399295016740065360", name: "49_necklace" },
	/**
	 * Vestige of Dark Dragons Tail.
	 */
	Necklace50: { id: "1401818687077355672", name: "50_necklace" },
	/**
	 * Moonlight Tufted Tail.
	 */
	Necklace51: { id: "1422146168137191435", name: "51_necklace" },
	/**
	 * Migration Pendant.
	 */
	Necklace52: { id: "1429825301658992761", name: "52_necklace" },
	/**
	 * Mischief Feline Tail.
	 */
	Necklace53: { id: "1433197642007183430", name: "53_necklace" },
} as const satisfies Readonly<Record<string, Emoji>>;

const NECKLACE_EMOJIS_DEVELOPMENT = {
	Necklace01: { id: "1313920866920435712", name: "01_necklace" },
	Necklace02: { id: "1313920801229246608", name: "02_necklace" },
	Necklace03: { id: "1313920876667998211", name: "03_necklace" },
	Necklace04: { id: "1313920838763811008", name: "04_necklace" },
	Necklace05: { id: "1313920868195373207", name: "05_necklace" },
	Necklace06: { id: "1313920872657977475", name: "06_necklace" },
	Necklace07: { id: "1392498159296446644", name: "07_necklace" },
	Necklace08: { id: "1313920871194427412", name: "08_necklace" },
	Necklace09: { id: "1392503736395628585", name: "09_necklace" },
	Necklace10: { id: "1313920821399519244", name: "10_necklace" },
	Necklace11: { id: "1313920806002229318", name: "11_necklace" },
	Necklace12: { id: "1392502070745239654", name: "12_necklace" },
	Necklace13: { id: "1313920847651541134", name: "13_necklace" },
	Necklace14: { id: "1392499097491079281", name: "14_necklace" },
	Necklace15: { id: "1313920865360154655", name: "15_necklace" },
	Necklace16: { id: "1392499584168624159", name: "16_necklace" },
	Necklace17: { id: "1392504002356314183", name: "17_necklace" },
	Necklace18: { id: "1313920825568530594", name: "18_necklace" },
	Necklace19: { id: "1313920809802137611", name: "19_necklace" },
	Necklace20: { id: "1392502498702397511", name: "20_necklace" },
	Necklace21: { id: "1313920861379624990", name: "21_necklace" },
	Necklace22: { id: "1392504535603351582", name: "22_necklace" },
	Necklace23: { id: "1392503207170932757", name: "23_necklace" },
	Necklace24: { id: "1313920854312091679", name: "24_necklace" },
	Necklace25: { id: "1313920840664088586", name: "25_necklace" },
	Necklace26: { id: "1392499967251447868", name: "26_necklace" },
	Necklace27: { id: "1392500672636780704", name: "27_necklace" },
	Necklace28: { id: "1392501511271092294", name: "28_necklace" },
	Necklace29: { id: "1313920858900664442", name: "29_necklace" },
	Necklace30: { id: "1392501031824261211", name: "30_necklace" },
	Necklace31: { id: "1313920835047657553", name: "31_necklace" },
	Necklace32: { id: "1313920822762541130", name: "32_necklace" },
	Necklace33: { id: "1313920827506298903", name: "33_necklace" },
	Necklace34: { id: "1313920824482332772", name: "34_necklace" },
	Necklace35: { id: "1392507631301693501", name: "35_necklace" },
	Necklace36: { id: "1392502879167971410", name: "36_necklace" },
	Necklace37: { id: "1313920792932778004", name: "37_necklace" },
	Necklace38: { id: "1392505261268275241", name: "38_necklace" },
	Necklace39: { id: "1313920830748495923", name: "39_necklace" },
	Necklace40: { id: "1313920845596332186", name: "40_necklace" },
	Necklace41: { id: "1313920851477008466", name: "41_necklace" },
	Necklace42: { id: "1313920836784095325", name: "42_necklace" },
	Necklace43: { id: "1313920795763802113", name: "43_necklace" },
	Necklace44: { id: "1313920815838007378", name: "44_necklace" },
	Necklace45: { id: "1313920862830989324", name: "45_necklace" },
	Necklace46: { id: "1330482752545362080", name: "46_necklace" },
	Necklace47: { id: "1363810875089096865", name: "47_necklace" },
	Necklace48: { id: "1396895202043760723", name: "48_necklace" },
	Necklace49: { id: "1399295025233395742", name: "49_necklace" },
	Necklace50: { id: "1401818695403311175", name: "50_necklace" },
	Necklace51: { id: "1422146174357471232", name: "51_necklace" },
	Necklace52: { id: "1429825309015806094", name: "52_necklace" },
	Necklace53: { id: "1433197656137666721", name: "53_necklace" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HAIR_EMOJIS_PRODUCTION = {
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
	Hair33: { id: "1313936073600274452", name: "33_hair" },
	/**
	 * Elder of the Valley 2.
	 */
	Hair34: { id: "1313936106827550861", name: "34_hair" },
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
	 * Days of Fortune 2022.
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
	/**
	 * Radiance Leaping Dancer.
	 */
	Hair155: { id: "1330513805192466467", name: "155_hair" },
	/**
	 * Radiance Greeting Shaman.
	 */
	Hair156: { id: "1330664948711424104", name: "156_hair" },
	/**
	 * Fortune Snake Coif.
	 */
	Hair157: { id: "1333207592440303657", name: "157_hair" },
	/**
	 * Days of Love Braids.
	 */
	Hair158: { id: "1338231103885934796", name: "158_hair" },
	/**
	 * Amethyst-Tipped Tails.
	 */
	Hair159: { id: "1338232780793839736", name: "159_hair" },
	/**
	 * Transcendent Journey Hood.
	 */
	Hair160: { id: "1354388513227014144", name: "160_hair" },
	/**
	 * Bloom Rose Braided Hair.
	 */
	Hair161: { id: "1353523208946450483", name: "161_hair" },
	/**
	 * Costumed Confetti Cousin.
	 */
	Hair162: { id: "1364902000491495454", name: "162_hair" },
	/**
	 * Ocean Manta Hair.
	 */
	Hair163: { id: "1366371276943261798", name: "163_hair" },
	/**
	 * Rainbow Head Wrap.
	 */
	Hair164: { id: "1376530842750419086", name: "164_hair" },
	/**
	 * Tending Toymaker.
	 */
	Hair165: { id: "1396908344098426940", name: "165_hair" },
	/**
	 * Scarred Sentry 1.
	 */
	Hair166: { id: "1396916687659470990", name: "166_hair" },
	/**
	 * Scarred Sentry 2.
	 */
	Hair167: { id: "1396916702293393549", name: "167_hair" },
	/**
	 * Stern Shepherd.
	 */
	Hair168: { id: "1396949340118843442", name: "168_hair" },
	/**
	 * Migrating Bellmaker.
	 */
	Hair169: { id: "1431662851990224957", name: "169_hair" },
	/**
	 * Migrating Manta Whisperer.
	 */
	Hair170: { id: "1431952763998441492", name: "170_hair" },
	/**
	 * Mischief Puzzlewright's Brimmed Hat.
	 */
	Hair171: { id: "1432488576129568908", name: "171_hair" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HAIR_EMOJIS_DEVELOPMENT = {
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
	Hair33: { id: "1313921274472431626", name: "33_hair" },
	Hair34: { id: "1313921272383668235", name: "34_hair" },
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
	Hair146: { id: "1313921723661291622", name: "146_hair" },
	Hair147: { id: "1313921748470726777", name: "147_hair" },
	Hair148: { id: "1313921694611673170", name: "148_hair" },
	Hair149: { id: "1313921711254798456", name: "149_hair" },
	Hair150: { id: "1313921749506723871", name: "150_hair" },
	Hair151: { id: "1313921883309342780", name: "151_hair" },
	Hair152: { id: "1313921884773023744", name: "152_hair" },
	Hair153: { id: "1320564196324147272", name: "153_hair" },
	Hair154: { id: "1320565008454909983", name: "154_hair" },
	Hair155: { id: "1330513818933002292", name: "155_hair" },
	Hair156: { id: "1330664954428260363", name: "156_hair" },
	Hair157: { id: "1333207599063240724", name: "157_hair" },
	Hair158: { id: "1338231111171571794", name: "158_hair" },
	Hair159: { id: "1338232789127921704", name: "159_hair" },
	Hair160: { id: "1354388537121968289", name: "160_hair" },
	Hair161: { id: "1353523218207608893", name: "161_hair" },
	Hair162: { id: "1364902007327948911", name: "162_hair" },
	Hair163: { id: "1366371285243789403", name: "163_hair" },
	Hair164: { id: "1376530850547761312", name: "164_hair" },
	Hair165: { id: "1396908358262591511", name: "165_hair" },
	Hair166: { id: "1396916694261174341", name: "166_hair" },
	Hair167: { id: "1396916710698909706", name: "167_hair" },
	Hair168: { id: "1396949348863971441", name: "168_hair" },
	Hair169: { id: "1431662859770658916", name: "169_hair" },
	Hair170: { id: "1431952774568087552", name: "170_hair" },
	Hair171: { id: "1432488588137861232", name: "171_hair" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HAIR_ACCESSORY_EMOJIS_PRODUCTION = {
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
	/**
	 * Radiance Greeting Shaman.
	 */
	HairAccessory53: { id: "1330662827316477952", name: "53_hair_accessory" },
	/**
	 * Amethyst Accessory.
	 */
	HairAccessory54: { id: "1338232440082272316", name: "54_hair_accessory" },
	/**
	 * Costumed Confetti Cousin.
	 */
	HairAccessory55: { id: "1364903131032322112", name: "55_hair_accessory" },
	/**
	 * Nostalgic Sparkler Parent.
	 */
	HairAccessory56: { id: "1365260195114127390", name: "56_hair_accessory" },
	/**
	 * Sixth Sky Anniversary.
	 */
	HairAccessory57: { id: "1391821367585935511", name: "57_hair_accessory" },
	/**
	 * Butterfly Blossom Memento.
	 */
	HairAccessory58: { id: "1396910401362329600", name: "58_hair_accessory" },
	/**
	 * Mini Manatee Accessory.
	 */
	HairAccessory59: { id: "1396910416243982356", name: "59_hair_accessory" },
	/**
	 * Vault Elder's Lantern (ultimate).
	 */
	HairAccessory60: { id: "1396895791959904536", name: "60_hair_accessory" },
	/**
	 * Sunlight Bonnet Jellyfish Hat.
	 */
	HairAccessory61: { id: "1412360698922537072", name: "61_hair_accessory" },
	/**
	 * Migrating Butterfly Charmer.
	 */
	HairAccessory62: { id: "1431943061776109709", name: "62_hair_accessory" },
	/**
	 * Migrating Jellyfish Whisperer.
	 */
	HairAccessory63: { id: "1431949633084588195", name: "63_hair_accessory" },
	/**
	 * Mischief Feline Ears.
	 */
	HairAccessory64: { id: "1433197643969855568", name: "64_hair_accessory" },
	/**
	 * Mischief Leaf Hat.
	 */
	HairAccessory65: { id: "1433200193825800333", name: "65_hair_accessory" },
	/**
	 * Fluffy Winter Wear hair accessory.
	 */
	HairAccessory66: { id: "1449475135181688942", name: "66_hair_accessory" },
	/**
	 * Snowkid Accessory.
	 */
	HairAccessory67: { id: "1449475137987416084", name: "67_hair_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HAIR_ACCESSORY_EMOJIS_DEVELOPMENT = {
	HairAccessory01: { id: "1313922070463385641", name: "01_hair_accessory" },
	HairAccessory02: { id: "1313922117904892074", name: "02_hair_accessory" },
	HairAccessory03: { id: "1313922072296296568", name: "03_hair_accessory" },
	HairAccessory04: { id: "1313922083897475103", name: "04_hair_accessory" },
	HairAccessory05: { id: "1313922068756299827", name: "05_hair_accessory" },
	HairAccessory06: { id: "1313922097407328420", name: "06_hair_accessory" },
	HairAccessory07: { id: "1313922086368182384", name: "07_hair_accessory" },
	HairAccessory08: { id: "1313922084698587197", name: "08_hair_accessory" },
	HairAccessory09: { id: "1313922111483674676", name: "09_hair_accessory" },
	HairAccessory10: { id: "1313922126071464036", name: "10_hair_accessory" },
	HairAccessory11: { id: "1313922124364251227", name: "11_hair_accessory" },
	HairAccessory12: { id: "1313922082425274441", name: "12_hair_accessory" },
	HairAccessory13: { id: "1313922151354601613", name: "13_hair_accessory" },
	HairAccessory14: { id: "1313922095360639026", name: "14_hair_accessory" },
	HairAccessory15: { id: "1313922137030922271", name: "15_hair_accessory" },
	HairAccessory16: { id: "1313922142664130611", name: "16_hair_accessory" },
	HairAccessory17: { id: "1313922073558650880", name: "17_hair_accessory" },
	HairAccessory18: { id: "1313922114633334794", name: "18_hair_accessory" },
	HairAccessory19: { id: "1313922113240961064", name: "19_hair_accessory" },
	HairAccessory20: { id: "1313922106827866283", name: "20_hair_accessory" },
	HairAccessory21: { id: "1313922077190787145", name: "21_hair_accessory" },
	HairAccessory22: { id: "1313922090591584286", name: "22_hair_accessory" },
	HairAccessory23: { id: "1313922079036538920", name: "23_hair_accessory" },
	HairAccessory24: { id: "1313922115841294376", name: "24_hair_accessory" },
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
	HairAccessory53: { id: "1330662833142239272", name: "53_hair_accessory" },
	HairAccessory54: { id: "1338232448043057152", name: "54_hair_accessory" },
	HairAccessory55: { id: "1364903137093226578", name: "55_hair_accessory" },
	HairAccessory56: { id: "1365260201950711880", name: "56_hair_accessory" },
	HairAccessory57: { id: "1391821381422809118", name: "57_hair_accessory" },
	HairAccessory58: { id: "1396910409046556804", name: "58_hair_accessory" },
	HairAccessory59: { id: "1396910423139156088", name: "59_hair_accessory" },
	HairAccessory60: { id: "1396895798465134765", name: "60_hair_accessory" },
	HairAccessory61: { id: "1412360710121324624", name: "61_hair_accessory" },
	HairAccessory62: { id: "1431943071637180528", name: "62_hair_accessory" },
	HairAccessory63: { id: "1431949642672898080", name: "63_hair_accessory" },
	HairAccessory64: { id: "1433197658490667008", name: "64_hair_accessory" },
	HairAccessory65: { id: "1433200211278172282", name: "65_hair_accessory" },
	HairAccessory66: { id: "1449475147424727062", name: "66_hair_accessory" },
	HairAccessory67: { id: "1449475149337329896", name: "67_hair_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HEAD_ACCESSORY_EMOJIS_PRODUCTION = {
	/**
	 * Hairtousle Teen.
	 */
	HeadAccessory01: { id: "1313935572443856977", name: "01_head_accessory" },
	/**
	 * Enchantment Guide (ultimate).
	 */
	HeadAccessory02: { id: "1313935550125838346", name: "02_head_accessory" },
	/**
	 * Days of Feast Horns.
	 */
	HeadAccessory03: { id: "1313935537203052675", name: "03_head_accessory" },
	/**
	 * Bearhug Hermit.
	 */
	HeadAccessory04: { id: "1313935534942457896", name: "04_head_accessory" },
	/**
	 * Rainbow braid.
	 */
	HeadAccessory05: { id: "1313935552944275488", name: "05_head_accessory" },
	/**
	 * Mischief Withered Antlers.
	 */
	HeadAccessory06: { id: "1313935554429190254", name: "06_head_accessory" },
	/**
	 * Abyss Guide (ultimate).
	 */
	HeadAccessory07: { id: "1313935592731443250", name: "07_head_accessory" },
	/**
	 * Rainbow Earring.
	 */
	HeadAccessory08: { id: "1313935547810578453", name: "08_head_accessory" },
	/**
	 * Rainbow Headphones.
	 */
	HeadAccessory09: { id: "1313935578747768854", name: "09_head_accessory" },
	/**
	 * Tiara We Can Touch.
	 */
	HeadAccessory10: { id: "1313935588474228866", name: "10_head_accessory" },
	/**
	 * Melancholy Mope.
	 */
	HeadAccessory11: { id: "1313935587627110560", name: "11_head_accessory" },
	/**
	 * Tumbling Troublemaker.
	 */
	HeadAccessory12: { id: "1313935543696097380", name: "12_head_accessory" },
	/**
	 * Dark Rainbow Earrings.
	 */
	HeadAccessory13: { id: "1313935565112217680", name: "13_head_accessory" },
	/**
	 * Festival Earrings.
	 */
	HeadAccessory14: { id: "1313935584045301791", name: "14_head_accessory" },
	/**
	 * Gift of the Nine-Coloured Deer.
	 */
	HeadAccessory15: { id: "1313935563610394624", name: "15_head_accessory" },
	/**
	 * Days of Fortune Dragon Bangles.
	 */
	HeadAccessory16: { id: "1313935589833179230", name: "16_head_accessory" },
	/**
	 * Sunlight Helios Hoops earrings.
	 */
	HeadAccessory17: { id: "1313935574088028160", name: "17_head_accessory" },
	/**
	 * Moonlight earrings.
	 */
	HeadAccessory18: { id: "1313935591502643200", name: "18_head_accessory" },
	/**
	 * Radiance Provoking Performer.
	 */
	HeadAccessory19: { id: "1330643945394278400", name: "19_head_accessory" },
	/**
	 * Royal Hairtousle Teen.
	 */
	HeadAccessory20: { id: "1365271433810284564", name: "20_head_accessory" },
	/**
	 * Spirited Manatee Head Accessory.
	 */
	HeadAccessory21: { id: "1399295002525307003", name: "21_head_accessory" },
	/**
	 * Vestige of Dark Dragons Head Accessory.
	 */
	HeadAccessory22: { id: "1401818086453149776", name: "22_head_accessory" },
	/**
	 * Migrating Bellmaker.
	 */
	HeadAccessory23: { id: "1431663764666716212", name: "23_head_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HEAD_ACCESSORY_EMOJIS_DEVELOPMENT = {
	HeadAccessory01: { id: "1313920618265182259", name: "01_head_accessory" },
	HeadAccessory02: { id: "1313920585302147092", name: "02_head_accessory" },
	HeadAccessory03: { id: "1313920583980814336", name: "03_head_accessory" },
	HeadAccessory04: { id: "1313920574334173277", name: "04_head_accessory" },
	HeadAccessory05: { id: "1313920625311744052", name: "05_head_accessory" },
	HeadAccessory06: { id: "1313920586493333627", name: "06_head_accessory" },
	HeadAccessory07: { id: "1313920568449302542", name: "07_head_accessory" },
	HeadAccessory08: { id: "1313920616482738256", name: "08_head_accessory" },
	HeadAccessory09: { id: "1313920573306310827", name: "09_head_accessory" },
	HeadAccessory10: { id: "1313920600988975196", name: "10_head_accessory" },
	HeadAccessory11: { id: "1313920577601536041", name: "11_head_accessory" },
	HeadAccessory12: { id: "1313920615299678208", name: "12_head_accessory" },
	HeadAccessory13: { id: "1313920626872029306", name: "13_head_accessory" },
	HeadAccessory14: { id: "1313920582651215902", name: "14_head_accessory" },
	HeadAccessory15: { id: "1313920604042432613", name: "15_head_accessory" },
	HeadAccessory16: { id: "1313920613525487696", name: "16_head_accessory" },
	HeadAccessory17: { id: "1313920578440138773", name: "17_head_accessory" },
	HeadAccessory18: { id: "1313920604939747450", name: "18_head_accessory" },
	HeadAccessory19: { id: "1330643964210057416", name: "19_head_accessory" },
	HeadAccessory20: { id: "1365271440584212492", name: "20_head_accessory" },
	HeadAccessory21: { id: "1399295009513279508", name: "21_head_accessory" },
	HeadAccessory22: { id: "1401818096985182218", name: "22_head_accessory" },
	HeadAccessory23: { id: "1431663772413726841", name: "23_head_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const CAPE_EMOJIS_PRODUCTION = {
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
	/**
	 * Radiance Guide (ultimate).
	 */
	Cape141: { id: "1330483570732437514", name: "141_cape" },
	/**
	 * Radiance Leaping Dancer.
	 */
	Cape142: { id: "1330515297572229140", name: "142_cape" },
	/**
	 * Radiance Provoking Performer.
	 */
	Cape143: { id: "1330645121758265506", name: "143_cape" },
	/**
	 * Fortune Snake Cloak.
	 */
	Cape144: { id: "1333207214017613927", name: "144_cape" },
	/**
	 * Radiance Guide (non-ultimate).
	 */
	Cape145: { id: "1351091440821997673", name: "145_cape" },
	/**
	 * Transcendent Journey Cape.
	 */
	Cape146: { id: "1354387222064791583", name: "146_cape" },
	/**
	 * Bloom Rose Embroidered Cape.
	 */
	Cape147: { id: "1353521854467412101", name: "147_cape" },
	/**
	 * Blue Bird Guide (ultimate).
	 */
	Cape148: { id: "1365253698946863104", name: "148_cape" },
	/**
	 * Divining Wise Grandparent.
	 */
	Cape149: { id: "1365251704605380669", name: "149_cape" },
	/**
	 * Nostalgic Sparkler Parent.
	 */
	Cape150: { id: "1385651493432201338", name: "150_cape" },
	/**
	 * Royal Hairtousle Teen.
	 */
	Cape151: { id: "1365271212221005854", name: "151_cape" },
	/**
	 * Ocean Sea Form Cape.
	 */
	Cape152: { id: "1366371481830817815", name: "152_cape" },
	/**
	 * Rainbow Ribbon Shawl.
	 */
	Cape153: { id: "1376529616486797342", name: "153_cape" },
	/**
	 * TGC Wireframe Cape.
	 */
	Cape154: { id: "1392519682141192303", name: "154_cape" },
	/**
	 * Cloak of Darkness.
	 */
	Cape155: { id: "1396909752306499755", name: "155_cape" },
	/**
	 * Vault Elder's Lantern (ultimate).
	 */
	Cape156: { id: "1396896124287320094", name: "156_cape" },
	/**
	 * Scarred Sentry.
	 */
	Cape157: { id: "1396916995714453624", name: "157_cape" },
	/**
	 * Anniversary Tuxedo Cape.
	 */
	Cape158: { id: "1404901751844372560", name: "158_cape" },
	/**
	 * Sunlight Shawl.
	 */
	Cape159: { id: "1412354185634254929", name: "159_cape" },
	/**
	 * Moonlight Garland Cape.
	 */
	Cape160: { id: "1422146394285805598", name: "160_cape" },
	/**
	 * Migrating Bellmaker.
	 */
	Cape161: { id: "1431664156876210206", name: "161_cape" },
	/**
	 * Migrating Bird Whisperer.
	 */
	Cape162: { id: "1431816406302724269", name: "162_cape" },
	/**
	 * Migrating Butterfly Charmer.
	 */
	Cape163: { id: "1431943063403499630", name: "163_cape" },
	/**
	 * Migrating Manta Whisperer.
	 */
	Cape164: { id: "1431952761573998751", name: "164_cape" },
	/**
	 * Mischief Goth Cape.
	 */
	Cape165: { id: "1433199881626849413", name: "165_cape" },
	/**
	 * Winter Scarf Cape.
	 */
	Cape166: { id: "1449475139459747860", name: "166_cape" },
	/**
	 * Days of Feast 2025.
	 */
	Cape167: { id: "1449477616062173316", name: "167_cape" },
} as const satisfies Readonly<Record<string, Emoji>>;

const CAPE_EMOJIS_DEVELOPMENT = {
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
	Cape108: { id: "1313922695884312588", name: "108_cape" },
	Cape109: { id: "1313922679643832400", name: "109_cape" },
	Cape110: { id: "1313922685129981982", name: "110_cape" },
	Cape111: { id: "1313922649788776449", name: "111_cape" },
	Cape112: { id: "1313922651596783687", name: "112_cape" },
	Cape113: { id: "1313922664431091743", name: "113_cape" },
	Cape114: { id: "1313922653119316019", name: "114_cape" },
	Cape115: { id: "1313922709171732600", name: "115_cape" },
	Cape116: { id: "1313922693078319174", name: "116_cape" },
	Cape117: { id: "1313922668269011037", name: "117_cape" },
	Cape118: { id: "1313922655048695902", name: "118_cape" },
	Cape119: { id: "1313922646391394334", name: "119_cape" },
	Cape120: { id: "1313922656474759281", name: "120_cape" },
	Cape121: { id: "1313922678239006730", name: "121_cape" },
	Cape122: { id: "1313922675042943058", name: "122_cape" },
	Cape123: { id: "1313922671125463101", name: "123_cape" },
	Cape124: { id: "1313922691195076618", name: "124_cape" },
	Cape125: { id: "1313922703727657194", name: "125_cape" },
	Cape126: { id: "1313922666696151080", name: "126_cape" },
	Cape127: { id: "1313922683863568487", name: "127_cape" },
	Cape128: { id: "1313922697574744094", name: "128_cape" },
	Cape129: { id: "1313922676581990523", name: "129_cape" },
	Cape130: { id: "1313922669514723369", name: "130_cape" },
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
	Cape141: { id: "1330483751511265353", name: "141_cape" },
	Cape142: { id: "1330515305260253196", name: "142_cape" },
	Cape143: { id: "1330645128993570826", name: "143_cape" },
	Cape144: { id: "1333207221777207439", name: "144_cape" },
	Cape145: { id: "1351091572149588010", name: "145_cape" },
	Cape146: { id: "1354387232324063362", name: "146_cape" },
	Cape147: { id: "1353521862545768468", name: "147_cape" },
	Cape148: { id: "1365253705430995025", name: "148_cape" },
	Cape149: { id: "1365251711626776667", name: "149_cape" },
	Cape150: { id: "1385651515196440727", name: "150_cape" },
	Cape151: { id: "1365271219129028608", name: "151_cape" },
	Cape152: { id: "1366371491746283520", name: "152_cape" },
	Cape153: { id: "1376529647810121849", name: "153_cape" },
	Cape154: { id: "1392519712918999200", name: "154_cape" },
	Cape155: { id: "1396909761089241168", name: "155_cape" },
	Cape156: { id: "1396896130075332690", name: "156_cape" },
	Cape157: { id: "1396916997295706253", name: "157_cape" },
	Cape158: { id: "1404901759306170439", name: "158_cape" },
	Cape159: { id: "1412354192940728402", name: "159_cape" },
	Cape160: { id: "1422146401189494915", name: "160_cape" },
	Cape161: { id: "1431664163591290960", name: "161_cape" },
	Cape162: { id: "1431816413571711228", name: "162_cape" },
	Cape163: { id: "1431943073579012138", name: "163_cape" },
	Cape164: { id: "1431952772332392589", name: "164_cape" },
	Cape165: { id: "1433199898483888149", name: "165_cape" },
	Cape166: { id: "1449475151178633477", name: "166_cape" },
	Cape167: { id: "1449477634466775062", name: "167_cape" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HELD_PROPS_EMOJIS_PRODUCTION = {
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
	/**
	 * Radiance Provoking Performer.
	 */
	HeldProp50: { id: "1330644760855187506", name: "50_held_prop" },
	/**
	 * Fortune Hand Fan.
	 */
	HeldProp51: { id: "1333206877915582495", name: "51_held_prop" },
	/**
	 * Treasure Shovel.
	 */
	HeldProp52: { id: "1345897425151332372", name: "52_held_prop" },
	/**
	 * Anniversary Clapperboard.
	 */
	HeldProp53: { id: "1391822648979357859", name: "53_held_prop" },
	/**
	 * Anniversary Cinema Popcorn.
	 */
	HeldProp54: { id: "1391821970747953428", name: "54_held_prop" },
	/**
	 * Tender Toymaker.
	 */
	HeldProp55: { id: "1396907779679195186", name: "55_held_prop" },
	/**
	 * Scarred Sentry 1.
	 */
	HeldProp56: { id: "1396920105610510508", name: "56_held_prop" },
	/**
	 * Scarred Sentry 2.
	 */
	HeldProp57: { id: "1396917851394277426", name: "57_held_prop" },
	/**
	 * Stern Shepherd.
	 */
	HeldProp58: { id: "1396950649765105705", name: "58_held_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HELD_PROPS_EMOJIS_DEVELOPMENT = {
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
	HeldProp50: { id: "1330644766781603994", name: "50_held_prop" },
	HeldProp51: { id: "1333206885289168936", name: "51_held_prop" },
	HeldProp52: { id: "1345897433070309387", name: "52_held_prop" },
	HeldProp53: { id: "1391822656877232280", name: "53_held_prop" },
	HeldProp54: { id: "1391821979446939760", name: "54_held_prop" },
	HeldProp55: { id: "1396907787304439948", name: "55_held_prop" },
	HeldProp56: { id: "1396920113374040204", name: "56_held_prop" },
	HeldProp57: { id: "1396917858767863828", name: "57_held_prop" },
	HeldProp58: { id: "1396950659575844996", name: "58_held_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const LARGE_PLACEABLE_PROPS_EMOJIS_PRODUCTION = {
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
	LargePlaceableProp39: { id: "1404328860958593107", name: "39_large_placeable_prop" },
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
	/**
	 * Radiance Leaping Dancer.
	 */
	LargePlaceableProp79: { id: "1330514299126419539", name: "79_large_placeable_prop" },
	/**
	 * Fortune Vertical Poster.
	 */
	LargePlaceableProp80: { id: "1333205583003652096", name: "80_large_placeable_prop" },
	/**
	 * Fortune Candle Flags.
	 */
	LargePlaceableProp81: { id: "1333206106943656057", name: "81_large_placeable_prop" },
	/**
	 * Fortune Plant.
	 */
	LargePlaceableProp82: { id: "1333206450998214696", name: "82_large_placeable_prop" },
	/**
	 * Dressing table.
	 */
	LargePlaceableProp83: { id: "1391669691172520028", name: "83_large_placeable_prop" },
	/**
	 * Blue stool.
	 */
	LargePlaceableProp84: { id: "1391669703046332457", name: "84_large_placeable_prop" },
	/**
	 * Floor curtain.
	 */
	LargePlaceableProp85: { id: "1391669711476883609", name: "85_large_placeable_prop" },
	/**
	 * Left curtain.
	 */
	LargePlaceableProp86: { id: "1391669720335388702", name: "87_large_placeable_prop" },
	/**
	 * Blue Bird Guide (non-ultimate).
	 */
	LargePlaceableProp87: { id: "1389136116308774962", name: "87_large_placeable_prop" },
	/**
	 * Anniversary Film Seats.
	 */
	LargePlaceableProp88: { id: "1391822982787108884", name: "88_large_placeable_prop" },
	/**
	 * Resourceful Recluse 1.
	 */
	LargePlaceableProp89: { id: "1396956391478001894", name: "89_large_placeable_prop" },
	/**
	 * Resourceful Recluse 2.
	 */
	LargePlaceableProp90: { id: "1396956605022732379", name: "90_large_placeable_prop" },
	/**
	 * Sky Balloon Prop.
	 */
	LargePlaceableProp91: { id: "1401821013708242945", name: "91_large_placeable_prop" },
	/**
	 * Balloon Arch.
	 */
	LargePlaceableProp92: { id: "1401820180027412540", name: "92_large_placeable_prop" },
	/**
	 * Moonlight Basin.
	 */
	LargePlaceableProp93: { id: "1422145351481036862", name: "93_large_placeable_prop" },
	/**
	 * Mischief Withered Sapling.
	 */
	LargePlaceableProp94: { id: "1433424877750190100", name: "94_large_placeable_prop" },
	/**
	 * Puzzle Box.
	 */
	LargePlaceableProp95: { id: "1433424881311027362", name: "95_large_placeable_prop" },
	/**
	 * Puzzle Chest.
	 */
	LargePlaceableProp96: { id: "1433424885493006416", name: "96_large_placeable_prop" },
	/**
	 * Puzzle Cage.
	 */
	LargePlaceableProp97: { id: "1433424887216607383", name: "97_large_placeable_prop" },
	/**
	 * Migration Guide (non-ultimate).
	 */
	LargePlaceableProp98: { id: "1451111865974259794", name: "98_large_placeable_prop" },
	/**
	 * Horizontal ice block.
	 */
	LargePlaceableProp99: { id: "1453075356826337372", name: "99_large_placeable_prop" },
	/**
	 * Vertical ice block.
	 */
	LargePlaceableProp100: { id: "1453075360055824524", name: "100_large_placeable_prop" },
	/**
	 * Ice concave slide.
	 */
	LargePlaceableProp101: { id: "1453075364028088572", name: "101_large_placeable_prop" },
	/**
	 * Ice convex slide.
	 */
	LargePlaceableProp102: { id: "1453075367891042473", name: "102_large_placeable_prop" },
	/**
	 * Ice stool.
	 */
	LargePlaceableProp103: { id: "1453075371514794106", name: "103_large_placeable_prop" },
	/**
	 * Ice small table.
	 */
	LargePlaceableProp104: { id: "1453075375251787908", name: "104_large_placeable_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const LARGE_PLACEABLE_PROPS_EMOJIS_DEVELOPMENT = {
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
	LargePlaceableProp13: { id: "1313923181265817673", name: "13_large_placeable_prop" },
	LargePlaceableProp14: { id: "1313923098185302067", name: "14_large_placeable_prop" },
	LargePlaceableProp15: { id: "1313923184524791882", name: "15_large_placeable_prop" },
	LargePlaceableProp16: { id: "1313923158641741986", name: "16_large_placeable_prop" },
	LargePlaceableProp17: { id: "1313923114593423360", name: "17_large_placeable_prop" },
	LargePlaceableProp18: { id: "1313923086944567346", name: "18_large_placeable_prop" },
	LargePlaceableProp19: { id: "1313923108154904649", name: "19_large_placeable_prop" },
	LargePlaceableProp20: { id: "1313923135233458308", name: "20_large_placeable_prop" },
	LargePlaceableProp21: { id: "1313923103168004157", name: "21_large_placeable_prop" },
	LargePlaceableProp22: { id: "1313923110059249695", name: "22_large_placeable_prop" },
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
	LargePlaceableProp39: { id: "1404328872987725844", name: "39_large_placeable_prop" },
	LargePlaceableProp40: { id: "1313923164321091607", name: "40_large_placeable_prop" },
	LargePlaceableProp41: { id: "1313923179751936011", name: "41_large_placeable_prop" },
	LargePlaceableProp42: { id: "1313923141277454347", name: "42_large_placeable_prop" },
	LargePlaceableProp43: { id: "1313923173506351165", name: "43_large_placeable_prop" },
	LargePlaceableProp44: { id: "1313923113246785587", name: "44_large_placeable_prop" },
	LargePlaceableProp45: { id: "1313923143320080426", name: "45_large_placeable_prop" },
	LargePlaceableProp46: { id: "1313923152732225637", name: "46_large_placeable_prop" },
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
	LargePlaceableProp79: { id: "1330514306290290789", name: "79_large_placeable_prop" },
	LargePlaceableProp80: { id: "1333205584824238080", name: "80_large_placeable_prop" },
	LargePlaceableProp81: { id: "1333206114203865088", name: "81_large_placeable_prop" },
	LargePlaceableProp82: { id: "1333206456794873928", name: "82_large_placeable_prop" },
	LargePlaceableProp83: { id: "1391669758554013767", name: "83_large_placeable_prop" },
	LargePlaceableProp84: { id: "1391669766930038896", name: "84_large_placeable_prop" },
	LargePlaceableProp85: { id: "1391669774626324480", name: "85_large_placeable_prop" },
	LargePlaceableProp86: { id: "1391669782289584138", name: "86_large_placeable_prop" },
	LargePlaceableProp87: { id: "1389136123988545587", name: "87_large_placeable_prop" },
	LargePlaceableProp88: { id: "1391822990693634108", name: "88_large_placeable_prop" },
	LargePlaceableProp89: { id: "1396956400135180471", name: "89_large_placeable_prop" },
	LargePlaceableProp90: { id: "1396956612895313950", name: "90_large_placeable_prop" },
	LargePlaceableProp91: { id: "1401821020276523038", name: "91_large_placeable_prop" },
	LargePlaceableProp92: { id: "1401820190467162163", name: "92_large_placeable_prop" },
	LargePlaceableProp93: { id: "1422145359089500261", name: "93_large_placeable_prop" },
	LargePlaceableProp94: { id: "1433424889271816295", name: "94_large_placeable_prop" },
	LargePlaceableProp95: { id: "1433424891247591455", name: "95_large_placeable_prop" },
	LargePlaceableProp96: { id: "1433424893403336826", name: "96_large_placeable_prop" },
	LargePlaceableProp97: { id: "1433424895341101137", name: "97_large_placeable_prop" },
	LargePlaceableProp98: { id: "1451111873188593756", name: "98_large_placeable_prop" },
	LargePlaceableProp99: { id: "1453075366540476579", name: "99_large_placeable_prop" },
	LargePlaceableProp100: { id: "1453075370147315965", name: "100_large_placeable_prop" },
	LargePlaceableProp101: { id: "1453075374169657436", name: "101_large_placeable_prop" },
	LargePlaceableProp102: { id: "1453075377613181079", name: "102_large_placeable_prop" },
	LargePlaceableProp103: { id: "1453075380981465191", name: "103_large_placeable_prop" },
	LargePlaceableProp104: { id: "1453075385473569009", name: "104_large_placeable_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SMALL_PLACEABLE_PROPS_EMOJIS_PRODUCTION = {
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
	/**
	 * Days of Love Violet Crystal.
	 */
	SmallPlaceableProp87: { id: "1338230430813520012", name: "87_small_placeable_prop" },
	/**
	 * Bloom Rose Jar.
	 */
	SmallPlaceableProp88: { id: "1353522647463624875", name: "88_small_placeable_prop" },
	/**
	 * Flower vase.
	 */
	SmallPlaceableProp89: { id: "1391669733245583370", name: "89_small_placeable_prop" },
	/**
	 * Small crescent rug.
	 */
	SmallPlaceableProp90: { id: "1391669740564381847", name: "90_small_placeable_prop" },
	/**
	 * Decorative stick jar.
	 */
	SmallPlaceableProp91: { id: "1391669748420575322", name: "91_small_placeable_prop" },
	/**
	 * Tender Toymaker.
	 */
	SmallPlaceableProp92: { id: "1396906802330865715", name: "92_small_placeable_prop" },
	/**
	 * Blue Carpet.
	 */
	SmallPlaceableProp93: { id: "1401820772309270588", name: "93_small_placeable_prop" },
	/**
	 * Manatee Plush.
	 */
	SmallPlaceableProp94: { id: "1399294985655947375", name: "94_small_placeable_prop" },
	// Sky Creator Award not yet created.
	/**
	 * Vault Elder's Lantern (non-ultimate).
	 */
	SmallPlaceableProp96: { id: "1414165166928691281", name: "96_small_placeable_prop" },
	/**
	 * Caring Companion.
	 */
	SmallPlaceableProp97: { id: "1410974814767681566", name: "97_small_placeable_prop" },
	/**
	 * Sunlight Wave Projector.
	 */
	SmallPlaceableProp98: { id: "1412356286833627157", name: "98_small_placeable_prop" },
	/**
	 * Sandcastle piece 1.
	 */
	SmallPlaceableProp99: { id: "1412362936252629072", name: "99_small_placeable_prop" },
	/**
	 * Sandcastle piece 2.
	 */
	SmallPlaceableProp100: { id: "1412362954199924787", name: "100_small_placeable_prop" },
	/**
	 * Sandcastle piece 3.
	 */
	SmallPlaceableProp101: { id: "1412362978061189281", name: "101_small_placeable_prop" },
	/**
	 * Sandcastle piece 4.
	 */
	SmallPlaceableProp102: { id: "1412362986105999400", name: "102_small_placeable_prop" },
	/**
	 * Sandcastle piece 5.
	 */
	SmallPlaceableProp103: { id: "1412362994616369212", name: "103_small_placeable_prop" },
	/**
	 * Sandcastle piece 6.
	 */
	SmallPlaceableProp104: { id: "1412363003201982546", name: "104_small_placeable_prop" },
	/**
	 * Sandcastle piece 7.
	 */
	SmallPlaceableProp105: { id: "1412363013624959056", name: "105_small_placeable_prop" },
	/**
	 * Projector of Memories.
	 */
	SmallPlaceableProp106: { id: "1413962451191464036", name: "106_small_placeable_prop" },
	/**
	 * Moonlight Banner.
	 */
	SmallPlaceableProp107: { id: "1422145740154736803", name: "107_small_placeable_prop" },
	/**
	 * Mischief Crabkin Lamp.
	 */
	SmallPlaceableProp108: { id: "1433429774738391040", name: "108_small_placeable_prop" },
	/**
	 * Mischief Cobweb Decor.
	 */
	SmallPlaceableProp109: { id: "1433429752865357945", name: "109_small_placeable_prop" },
	/**
	 * Mischief Dark Dragon Rug.
	 */
	SmallPlaceableProp110: { id: "1433429754832228474", name: "110_small_placeable_prop" },
	/**
	 * Mischief Symbol 1.
	 */
	SmallPlaceableProp111: { id: "1441416741791203378", name: "111_small_placeable_prop" },
	/**
	 * Mischief Symbol 2.
	 */
	SmallPlaceableProp112: { id: "1441416743888359454", name: "112_small_placeable_prop" },
	/**
	 * Mischief Symbol 3.
	 */
	SmallPlaceableProp113: { id: "1441416746245423267", name: "113_small_placeable_prop" },
	/**
	 * Mischief Symbol 4.
	 */
	SmallPlaceableProp114: { id: "1441416748116217977", name: "114_small_placeable_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SMALL_PLACEABLE_PROPS_EMOJIS_DEVELOPMENT = {
	SmallPlaceableProp01: { id: "1313924363216490596", name: "01_small_placeable_prop" },
	SmallPlaceableProp02: { id: "1313924396490166302", name: "02_small_placeable_prop" },
	SmallPlaceableProp03: { id: "1313924429486493827", name: "03_small_placeable_prop" },
	SmallPlaceableProp04: { id: "1313924380513796228", name: "04_small_placeable_prop" },
	SmallPlaceableProp05: { id: "1313924379100450918", name: "05_small_placeable_prop" },
	SmallPlaceableProp06: { id: "1313924384347521084", name: "06_small_placeable_prop" },
	SmallPlaceableProp07: { id: "1313924421915906081", name: "07_small_placeable_prop" },
	SmallPlaceableProp08: { id: "1313924435354583040", name: "08_small_placeable_prop" },
	SmallPlaceableProp09: { id: "1313924375803723776", name: "09_small_placeable_prop" },
	SmallPlaceableProp10: { id: "1313924372003684435", name: "10_small_placeable_prop" },
	SmallPlaceableProp11: { id: "1313924382263087218", name: "11_small_placeable_prop" },
	SmallPlaceableProp12: { id: "1313924368522416149", name: "12_small_placeable_prop" },
	SmallPlaceableProp13: { id: "1313924365041008711", name: "13_small_placeable_prop" },
	SmallPlaceableProp14: { id: "1313924412457750591", name: "14_small_placeable_prop" },
	SmallPlaceableProp15: { id: "1313924387313025084", name: "15_small_placeable_prop" },
	SmallPlaceableProp16: { id: "1313924399694352406", name: "16_small_placeable_prop" },
	SmallPlaceableProp17: { id: "1313924424269037568", name: "17_small_placeable_prop" },
	SmallPlaceableProp18: { id: "1313924403427283006", name: "18_small_placeable_prop" },
	SmallPlaceableProp19: { id: "1313924389384880138", name: "19_small_placeable_prop" },
	SmallPlaceableProp20: { id: "1313924405868494908", name: "20_small_placeable_prop" },
	SmallPlaceableProp21: { id: "1313924414936711271", name: "21_small_placeable_prop" },
	SmallPlaceableProp22: { id: "1313924377124798485", name: "22_small_placeable_prop" },
	SmallPlaceableProp23: { id: "1313924407802069145", name: "23_small_placeable_prop" },
	SmallPlaceableProp24: { id: "1313924361388036187", name: "24_small_placeable_prop" },
	SmallPlaceableProp25: { id: "1313924391138099201", name: "25_small_placeable_prop" },
	SmallPlaceableProp26: { id: "1313924373379416076", name: "26_small_placeable_prop" },
	SmallPlaceableProp27: { id: "1313924359056003115", name: "27_small_placeable_prop" },
	SmallPlaceableProp28: { id: "1313924430933524522", name: "28_small_placeable_prop" },
	SmallPlaceableProp29: { id: "1313924420800348180", name: "29_small_placeable_prop" },
	SmallPlaceableProp30: { id: "1313924370556653609", name: "30_small_placeable_prop" },
	SmallPlaceableProp31: { id: "1313924394556461106", name: "31_small_placeable_prop" },
	SmallPlaceableProp32: { id: "1313924366668533871", name: "32_small_placeable_prop" },
	SmallPlaceableProp33: { id: "1313924392899710998", name: "33_small_placeable_prop" },
	SmallPlaceableProp34: { id: "1313924425888043048", name: "34_small_placeable_prop" },
	SmallPlaceableProp35: { id: "1313924397806911510", name: "35_small_placeable_prop" },
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
	SmallPlaceableProp47: { id: "1313924446561767424", name: "47_small_placeable_prop" },
	SmallPlaceableProp48: { id: "1313924450902737006", name: "48_small_placeable_prop" },
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
	SmallPlaceableProp75: { id: "1313924683141218304", name: "75_small_placeable_prop" },
	SmallPlaceableProp76: { id: "1313924673083412620", name: "76_small_placeable_prop" },
	SmallPlaceableProp77: { id: "1313924641357824050", name: "77_small_placeable_prop" },
	SmallPlaceableProp78: { id: "1313924681711222897", name: "78_small_placeable_prop" },
	SmallPlaceableProp79: { id: "1313924635707965584", name: "79_small_placeable_prop" },
	SmallPlaceableProp80: { id: "1313924677957058651", name: "80_small_placeable_prop" },
	SmallPlaceableProp81: { id: "1313924646567153796", name: "81_small_placeable_prop" },
	SmallPlaceableProp82: { id: "1313924676178939944", name: "82_small_placeable_prop" },
	SmallPlaceableProp83: { id: "1313924687415214080", name: "83_small_placeable_prop" },
	SmallPlaceableProp84: { id: "1313924679798362252", name: "84_small_placeable_prop" },
	SmallPlaceableProp85: { id: "1315723148133531738", name: "85_small_placeable_prop" },
	SmallPlaceableProp86: { id: "1320566442755756102", name: "86_small_placeable_prop" },
	SmallPlaceableProp87: { id: "1338230482931814540", name: "87_small_placeable_prop" },
	SmallPlaceableProp88: { id: "1353522656946819122", name: "88_small_placeable_prop" },
	SmallPlaceableProp89: { id: "1391669789591601184", name: "89_small_placeable_prop" },
	SmallPlaceableProp90: { id: "1391669797715972126", name: "90_small_placeable_prop" },
	SmallPlaceableProp91: { id: "1391669806096187392", name: "91_small_placeable_prop" },
	SmallPlaceableProp92: { id: "1396906809238884393", name: "92_small_placeable_prop" },
	SmallPlaceableProp93: { id: "1401820779548639252", name: "93_small_placeable_prop" },
	SmallPlaceableProp94: { id: "1399294998867869737", name: "94_small_placeable_prop" },
	SmallPlaceableProp96: { id: "1414165242040291389", name: "96_small_placeable_prop" },
	SmallPlaceableProp97: { id: "1410974885789827245", name: "97_small_placeable_prop" },
	SmallPlaceableProp98: { id: "1412356291883696208", name: "98_small_placeable_prop" },
	SmallPlaceableProp99: { id: "1412363024085549146", name: "99_small_placeable_prop" },
	SmallPlaceableProp100: { id: "1412363031710662717", name: "100_small_placeable_prop" },
	SmallPlaceableProp101: { id: "1412363038673080340", name: "101_small_placeable_prop" },
	SmallPlaceableProp102: { id: "1412363046424416286", name: "102_small_placeable_prop" },
	SmallPlaceableProp103: { id: "1412363052916936714", name: "103_small_placeable_prop" },
	SmallPlaceableProp104: { id: "1412363059103793223", name: "104_small_placeable_prop" },
	SmallPlaceableProp105: { id: "1412363066477379604", name: "105_small_placeable_prop" },
	SmallPlaceableProp106: { id: "1413962458145751163", name: "106_small_placeable_prop" },
	SmallPlaceableProp107: { id: "1422145747624792074", name: "107_small_placeable_prop" },
	SmallPlaceableProp108: { id: "1433429764848226346", name: "108_small_placeable_prop" },
	SmallPlaceableProp109: { id: "1433429766777737287", name: "109_small_placeable_prop" },
	SmallPlaceableProp110: { id: "1433429769617277048", name: "110_small_placeable_prop" },
	SmallPlaceableProp111: { id: "1441416756836171870", name: "111_small_placeable_prop" },
	SmallPlaceableProp112: { id: "1441416764645707806", name: "112_small_placeable_prop" },
	SmallPlaceableProp113: { id: "1441416773701468260", name: "113_small_placeable_prop" },
	SmallPlaceableProp114: { id: "1441416775349833780", name: "114_small_placeable_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

export function emojiConstants(production: boolean) {
	const emojis = production
		? {
				MISCELLANEOUS_EMOJIS: MISCELLANEOUS_EMOJIS_PRODUCTION,
				EMOTE_EMOJIS: EMOTE_EMOJIS_PRODUCTION,
				STANCE_EMOJIS: STANCE_EMOJIS_PRODUCTION,
				CALL_EMOJIS: CALL_EMOJIS_PRODUCTION,
				FRIEND_ACTION_EMOJIS: FRIEND_ACTION_EMOJIS_PRODUCTION,
				SEASON_EMOJIS: SEASON_EMOJIS_PRODUCTION,
				EVENT_EMOJIS: EVENT_EMOJIS_PRODUCTION,
				OUTFIT_EMOJIS: OUTFIT_EMOJIS_PRODUCTION,
				SHOE_EMOJIS: SHOE_EMOJIS_PRODUCTION,
				MASK_EMOJIS: MASK_EMOJIS_PRODUCTION,
				FACE_ACCESSORY_EMOJIS: FACE_ACCESSORY_EMOJIS_PRODUCTION,
				NECKLACE_EMOJIS: NECKLACE_EMOJIS_PRODUCTION,
				HAIR_EMOJIS: HAIR_EMOJIS_PRODUCTION,
				HAIR_ACCESSORY_EMOJIS: HAIR_ACCESSORY_EMOJIS_PRODUCTION,
				HEAD_ACCESSORY_EMOJIS: HEAD_ACCESSORY_EMOJIS_PRODUCTION,
				CAPE_EMOJIS: CAPE_EMOJIS_PRODUCTION,
				HELD_PROPS_EMOJIS: HELD_PROPS_EMOJIS_PRODUCTION,
				LARGE_PLACEABLE_PROPS_EMOJIS: LARGE_PLACEABLE_PROPS_EMOJIS_PRODUCTION,
				SMALL_PLACEABLE_PROPS_EMOJIS: SMALL_PLACEABLE_PROPS_EMOJIS_PRODUCTION,
			}
		: {
				MISCELLANEOUS_EMOJIS: MISCELLANEOUS_EMOJIS_DEVELOPMENT,
				EMOTE_EMOJIS: EMOTE_EMOJIS_DEVELOPMENT,
				STANCE_EMOJIS: STANCE_EMOJIS_DEVELOPMENT,
				CALL_EMOJIS: CALL_EMOJIS_DEVELOPMENT,
				FRIEND_ACTION_EMOJIS: FRIEND_ACTION_EMOJIS_DEVELOPMENT,
				SEASON_EMOJIS: SEASON_EMOJIS_DEVELOPMENT,
				EVENT_EMOJIS: EVENT_EMOJIS_DEVELOPMENT,
				OUTFIT_EMOJIS: OUTFIT_EMOJIS_DEVELOPMENT,
				SHOE_EMOJIS: SHOE_EMOJIS_DEVELOPMENT,
				MASK_EMOJIS: MASK_EMOJIS_DEVELOPMENT,
				FACE_ACCESSORY_EMOJIS: FACE_ACCESSORY_EMOJIS_DEVELOPMENT,
				NECKLACE_EMOJIS: NECKLACE_EMOJIS_DEVELOPMENT,
				HAIR_EMOJIS: HAIR_EMOJIS_DEVELOPMENT,
				HAIR_ACCESSORY_EMOJIS: HAIR_ACCESSORY_EMOJIS_DEVELOPMENT,
				HEAD_ACCESSORY_EMOJIS: HEAD_ACCESSORY_EMOJIS_DEVELOPMENT,
				CAPE_EMOJIS: CAPE_EMOJIS_DEVELOPMENT,
				HELD_PROPS_EMOJIS: HELD_PROPS_EMOJIS_DEVELOPMENT,
				LARGE_PLACEABLE_PROPS_EMOJIS: LARGE_PLACEABLE_PROPS_EMOJIS_DEVELOPMENT,
				SMALL_PLACEABLE_PROPS_EMOJIS: SMALL_PLACEABLE_PROPS_EMOJIS_DEVELOPMENT,
			};

	const {
		CALL_EMOJIS,
		CAPE_EMOJIS,
		EMOTE_EMOJIS,
		EVENT_EMOJIS,
		FACE_ACCESSORY_EMOJIS,
		FRIEND_ACTION_EMOJIS,
		HAIR_ACCESSORY_EMOJIS,
		HAIR_EMOJIS,
		HEAD_ACCESSORY_EMOJIS,
		HELD_PROPS_EMOJIS,
		LARGE_PLACEABLE_PROPS_EMOJIS,
		MASK_EMOJIS,
		MISCELLANEOUS_EMOJIS,
		NECKLACE_EMOJIS,
		OUTFIT_EMOJIS,
		SEASON_EMOJIS,
		SHOE_EMOJIS,
		SMALL_PLACEABLE_PROPS_EMOJIS,
		STANCE_EMOJIS,
	} = emojis;

	const CosmeticToEmoji = {
		[Cosmetic.EmoteSit]: EMOTE_EMOJIS.Sit,
		[Cosmetic.BaseStance]: STANCE_EMOJIS.Base,
		[Cosmetic.BaseCall]: CALL_EMOJIS.Base,
		[Cosmetic.BaseOutfit]: OUTFIT_EMOJIS.Outfit01,
		[Cosmetic.BaseMask]: MASK_EMOJIS.Mask01,
		[Cosmetic.BaseHair1]: HAIR_EMOJIS.Hair01,
		[Cosmetic.BaseCape]: CAPE_EMOJIS.Cape01,
		[Cosmetic.MobileCape]: CAPE_EMOJIS.Cape03,
		[Cosmetic.EmotePoint1]: EMOTE_EMOJIS.Point,
		[Cosmetic.EmotePoint2]: EMOTE_EMOJIS.Point,
		[Cosmetic.PointingCandlemakerHair]: HAIR_EMOJIS.Hair02,
		[Cosmetic.PointingCandlemakerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.PointingCandlemakerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PointingCandlemakerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmotePoint3]: EMOTE_EMOJIS.Point,
		[Cosmetic.EmotePoint4]: EMOTE_EMOJIS.Point,
		[Cosmetic.PointingCandlemakerOutfit]: OUTFIT_EMOJIS.Outfit02,
		[Cosmetic.PointingCandlemakerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteCome1]: EMOTE_EMOJIS.Come,
		[Cosmetic.EmoteCome2]: EMOTE_EMOJIS.Come,
		[Cosmetic.UsheringStargazerHair]: HAIR_EMOJIS.Hair03,
		[Cosmetic.UsheringStargazerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.UsheringStargazerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.UsheringStargazerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteCome3]: EMOTE_EMOJIS.Come,
		[Cosmetic.EmoteCome4]: EMOTE_EMOJIS.Come,
		[Cosmetic.UsheringStargazerOutfit]: OUTFIT_EMOJIS.Outfit03,
		[Cosmetic.UsheringStargazerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteNoThanks1]: EMOTE_EMOJIS.NoThanks,
		[Cosmetic.EmoteNoThanks2]: EMOTE_EMOJIS.NoThanks,
		[Cosmetic.RejectingVoyagerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.RejectingVoyagerHair]: HAIR_EMOJIS.Hair04,
		[Cosmetic.RejectingVoyagerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RejectingVoyagerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteNoThanks3]: EMOTE_EMOJIS.NoThanks,
		[Cosmetic.EmoteNoThanks4]: EMOTE_EMOJIS.NoThanks,
		[Cosmetic.RejectingVoyagerFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory01,
		[Cosmetic.RejectingVoyagerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteButterfly1]: EMOTE_EMOJIS.Butterfly,
		[Cosmetic.EmoteButterfly2]: EMOTE_EMOJIS.Butterfly,
		[Cosmetic.ButterflyCharmerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ButterflyCharmerCape1]: CAPE_EMOJIS.Cape04,
		[Cosmetic.ButterflyCharmerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ButterflyCharmerWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteButterfly3]: EMOTE_EMOJIS.Butterfly,
		[Cosmetic.EmoteButterfly4]: EMOTE_EMOJIS.Butterfly,
		[Cosmetic.ButterflyCharmerOutfit]: OUTFIT_EMOJIS.Outfit04,
		[Cosmetic.EmoteClap1]: EMOTE_EMOJIS.Clap,
		[Cosmetic.EmoteClap2]: EMOTE_EMOJIS.Clap,
		[Cosmetic.ApplaudingBellmakerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ApplaudingBellmakerHair]: HAIR_EMOJIS.Hair05,
		[Cosmetic.ApplaudingBellmakerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ApplaudingBellmakerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteClap3]: EMOTE_EMOJIS.Clap,
		[Cosmetic.EmoteClap4]: EMOTE_EMOJIS.Clap,
		[Cosmetic.ApplaudingBellmakerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteWave1]: EMOTE_EMOJIS.Wave,
		[Cosmetic.EmoteWave2]: EMOTE_EMOJIS.Wave,
		[Cosmetic.WavingBellmakerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.WavingBellmakerHair]: HAIR_EMOJIS.Hair06,
		[Cosmetic.WavingBellmakerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.WavingBellmakerWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteWave3]: EMOTE_EMOJIS.Wave,
		[Cosmetic.EmoteWave4]: EMOTE_EMOJIS.Wave,
		[Cosmetic.WavingBellmakerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WavingBellmakerMask]: MASK_EMOJIS.Mask02,
		[Cosmetic.WavingBellmakerWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteWave5]: EMOTE_EMOJIS.Wave,
		[Cosmetic.EmoteWave6]: EMOTE_EMOJIS.Wave,
		[Cosmetic.EmoteYawn1]: EMOTE_EMOJIS.Yawn,
		[Cosmetic.EmoteYawn2]: EMOTE_EMOJIS.Yawn,
		[Cosmetic.SlumberingShipwrightBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.SlumberingShipwrightHair]: HAIR_EMOJIS.Hair07,
		[Cosmetic.SlumberingShipwrightHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SlumberingShipwrightWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteYawn3]: EMOTE_EMOJIS.Yawn,
		[Cosmetic.EmoteYawn4]: EMOTE_EMOJIS.Yawn,
		[Cosmetic.SlumberingShipwrightBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteLaugh1]: EMOTE_EMOJIS.Laugh,
		[Cosmetic.EmoteLaugh2]: EMOTE_EMOJIS.Laugh,
		[Cosmetic.LaughingLightCollectorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.LaughingLightCollectorHarp]: HELD_PROPS_EMOJIS.HeldProp01,
		[Cosmetic.LaughingLightCollectorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LaughingLightCollectorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteLaugh3]: EMOTE_EMOJIS.Laugh,
		[Cosmetic.EmoteLaugh4]: EMOTE_EMOJIS.Laugh,
		[Cosmetic.LaughingLightCollectorHair]: HAIR_EMOJIS.Hair08,
		[Cosmetic.LaughingLightCollectorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CallBird]: CALL_EMOJIS.Bird,
		[Cosmetic.BirdWhispererMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.BirdWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.BirdWhispererHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BirdWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.BirdWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BirdWhispererHair]: HAIR_EMOJIS.Hair09,
		[Cosmetic.EmoteWipeBrow1]: EMOTE_EMOJIS.WipeBrow,
		[Cosmetic.EmoteWipeBrow2]: EMOTE_EMOJIS.WipeBrow,
		[Cosmetic.ExhaustedDockWorkerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ExhaustedDockWorkerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ExhaustedDockWorkerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteWipeBrow3]: EMOTE_EMOJIS.WipeBrow,
		[Cosmetic.EmoteWipeBrow4]: EMOTE_EMOJIS.WipeBrow,
		[Cosmetic.ExhaustedDockWorkerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ExhaustedDockWorkerFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory02,
		[Cosmetic.EmoteTeamwork]: EMOTE_EMOJIS.Teamwork,
		[Cosmetic.CeremonialWorshipperBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.CeremonialWorshipperHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CeremonialWorshipperWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.CeremonialWorshipperBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteShiver1]: EMOTE_EMOJIS.Shiver,
		[Cosmetic.EmoteShiver2]: EMOTE_EMOJIS.Shiver,
		[Cosmetic.ShiveringTrailblazerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ShiveringTrailblazerOutfit]: OUTFIT_EMOJIS.Outfit05,
		[Cosmetic.ShiveringTrailblazerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ShiveringTrailblazerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteShiver3]: EMOTE_EMOJIS.Shiver,
		[Cosmetic.EmoteShiver4]: EMOTE_EMOJIS.Shiver,
		[Cosmetic.ShiveringTrailblazerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ShiveringTrailblazerHair]: HAIR_EMOJIS.Hair10,
		[Cosmetic.EmoteBlush1]: EMOTE_EMOJIS.Shy,
		[Cosmetic.EmoteBlush2]: EMOTE_EMOJIS.Shy,
		[Cosmetic.BlushingProspectorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.BlushingProspectorHair]: HAIR_EMOJIS.Hair11,
		[Cosmetic.BlushingProspectorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BlushingProspectorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteBlush3]: EMOTE_EMOJIS.Shy,
		[Cosmetic.EmoteBlush4]: EMOTE_EMOJIS.Shy,
		[Cosmetic.BlushingProspectorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BlushingProspectorDrum]: HELD_PROPS_EMOJIS.HeldProp02,
		[Cosmetic.EmoteHideAndSeek]: EMOTE_EMOJIS.HideAndSeek,
		[Cosmetic.HideAndSeekPioneerHair]: HAIR_EMOJIS.Hair12,
		[Cosmetic.HideAndSeekPioneerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.HideAndSeekPioneerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HideAndSeekPioneerWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HideAndSeekPioneerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HideAndSeekPioneerMask]: MASK_EMOJIS.Mask03,
		[Cosmetic.HideAndSeekPioneerWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HideAndSeekPioneerOutfit]: OUTFIT_EMOJIS.Outfit06,
		[Cosmetic.EmoteAngry1]: EMOTE_EMOJIS.Angry,
		[Cosmetic.EmoteAngry2]: EMOTE_EMOJIS.Angry,
		[Cosmetic.PoutyPorterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.PoutyPorterHair]: HAIR_EMOJIS.Hair13,
		[Cosmetic.PoutyPorterHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PoutyPorterWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteAngry3]: EMOTE_EMOJIS.Angry,
		[Cosmetic.EmoteAngry4]: EMOTE_EMOJIS.Angry,
		[Cosmetic.PoutyPorterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PoutyPorterCape1]: CAPE_EMOJIS.Cape05,
		[Cosmetic.Shocked1]: EMOTE_EMOJIS.Shocked,
		[Cosmetic.Shocked2]: EMOTE_EMOJIS.Shocked,
		[Cosmetic.DismayedHunterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.DismayedHunterHair]: HAIR_EMOJIS.Hair14,
		[Cosmetic.DismayedHunterHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DismayedHunterWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.Shocked3]: EMOTE_EMOJIS.Shocked,
		[Cosmetic.Shocked4]: EMOTE_EMOJIS.Shocked,
		[Cosmetic.DismayedHunterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DismayedHunterCape1]: CAPE_EMOJIS.Cape06,
		[Cosmetic.EmoteApologise1]: EMOTE_EMOJIS.Apologise,
		[Cosmetic.EmoteApologise2]: EMOTE_EMOJIS.Apologise,
		[Cosmetic.ApologeticLumberjackBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ApologeticLumberjackHair]: HAIR_EMOJIS.Hair15,
		[Cosmetic.ApologeticLumberjackHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ApologeticLumberjackWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteApologise3]: EMOTE_EMOJIS.Apologise,
		[Cosmetic.EmoteApologise4]: EMOTE_EMOJIS.Apologise,
		[Cosmetic.ApologeticLumberjackBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ApologeticLumberjackFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory03,
		[Cosmetic.EmoteCrying1]: EMOTE_EMOJIS.Crying,
		[Cosmetic.EmoteCrying2]: EMOTE_EMOJIS.Crying,
		[Cosmetic.TearfulLightMinerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.TearfulLightMinerHair]: HAIR_EMOJIS.Hair16,
		[Cosmetic.TearfulLightMinerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TearfulLightMinerWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteCrying3]: EMOTE_EMOJIS.Crying,
		[Cosmetic.EmoteCrying4]: EMOTE_EMOJIS.Crying,
		[Cosmetic.TearfulLightMinerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TearfulLightMinerWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteCrying5]: EMOTE_EMOJIS.Crying,
		[Cosmetic.EmoteCrying6]: EMOTE_EMOJIS.Crying,
		[Cosmetic.CallWhale]: CALL_EMOJIS.Whale,
		[Cosmetic.WhaleWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.WhaleWhispererHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.WhaleWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.WhaleWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WhaleWhispererMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.StanceConfident]: STANCE_EMOJIS.Confident,
		[Cosmetic.ConfidentSightseerHair]: HAIR_EMOJIS.Hair17,
		[Cosmetic.ConfidentSightseerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ConfidentSightseerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ConfidentSightseerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ConfidentSightseerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ConfidentSightseerOutfit]: OUTFIT_EMOJIS.Outfit07,
		[Cosmetic.EmoteHandstand1]: EMOTE_EMOJIS.Handstand,
		[Cosmetic.EmoteHandstand2]: EMOTE_EMOJIS.Handstand,
		[Cosmetic.HandstandingThrillseekerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.HandstandingThrillseekerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HandstandingThrillseekerWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteHandstand3]: EMOTE_EMOJIS.Handstand,
		[Cosmetic.EmoteHandstand4]: EMOTE_EMOJIS.Handstand,
		[Cosmetic.HandstandingThrillseekerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HandstandingThrillseekerCape1]: CAPE_EMOJIS.Cape08,
		[Cosmetic.CallManta]: CALL_EMOJIS.Manta,
		[Cosmetic.MantaWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.MantaWhispererHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MantaWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MantaWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.MantaWhispererMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.EmoteBackflip1]: EMOTE_EMOJIS.Backflip,
		[Cosmetic.EmoteBackflip2]: EMOTE_EMOJIS.Backflip,
		[Cosmetic.BackflippingChampionBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.BackflippingChampionHair]: HAIR_EMOJIS.Hair18,
		[Cosmetic.BackflippingChampionHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BackflippingChampionWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteBackflip3]: EMOTE_EMOJIS.Backflip,
		[Cosmetic.EmoteBackflip4]: EMOTE_EMOJIS.Backflip,
		[Cosmetic.BackflippingChampionBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BackflippingChampionFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory04,
		[Cosmetic.EmoteCheer1]: EMOTE_EMOJIS.Cheer,
		[Cosmetic.EmoteCheer2]: EMOTE_EMOJIS.Cheer,
		[Cosmetic.CheerfulSpectatorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.CheerfulSpectatorHair]: HAIR_EMOJIS.Hair19,
		[Cosmetic.CheerfulSpectatorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CheerfulSpectatorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteCheer3]: EMOTE_EMOJIS.Cheer,
		[Cosmetic.EmoteCheer4]: EMOTE_EMOJIS.Cheer,
		[Cosmetic.CheerfulSpectatorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CheerfulSpectatorPiano]: HELD_PROPS_EMOJIS.HeldProp03,
		[Cosmetic.EmoteBow1]: EMOTE_EMOJIS.Bow,
		[Cosmetic.EmoteBow2]: EMOTE_EMOJIS.Bow,
		[Cosmetic.BowingMedalistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.BowingMedalistHair]: HAIR_EMOJIS.Hair20,
		[Cosmetic.BowingMedalistHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BowingMedalistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteBow3]: EMOTE_EMOJIS.Bow,
		[Cosmetic.EmoteBow4]: EMOTE_EMOJIS.Bow,
		[Cosmetic.BowingMedalistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BowingMedalistFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory05,
		[Cosmetic.StanceProud]: STANCE_EMOJIS.Proud,
		[Cosmetic.ProudVictorCape1]: CAPE_EMOJIS.Cape07,
		[Cosmetic.ProudVictorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.ProudVictorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ProudVictorWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ProudVictorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProudVictorMask]: MASK_EMOJIS.Mask04,
		[Cosmetic.EmoteDuck1]: EMOTE_EMOJIS.Duck,
		[Cosmetic.EmoteDuck2]: EMOTE_EMOJIS.Duck,
		[Cosmetic.FrightenedRefugeeBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.FrightenedRefugeeHair]: HAIR_EMOJIS.Hair21,
		[Cosmetic.FrightenedRefugeeHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FrightenedRefugeeWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteDuck3]: EMOTE_EMOJIS.Duck,
		[Cosmetic.EmoteDuck4]: EMOTE_EMOJIS.Duck,
		[Cosmetic.FrightenedRefugeeBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.FrightenedRefugeeContrabass]: HELD_PROPS_EMOJIS.HeldProp04,
		[Cosmetic.EmoteFaint1]: EMOTE_EMOJIS.Faint,
		[Cosmetic.EmoteFaint2]: EMOTE_EMOJIS.Faint,
		[Cosmetic.FaintingWarriorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.FaintingWarriorHair]: HAIR_EMOJIS.Hair22,
		[Cosmetic.FaintingWarriorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FaintingWarriorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteFaint3]: EMOTE_EMOJIS.Faint,
		[Cosmetic.EmoteFaint4]: EMOTE_EMOJIS.Faint,
		[Cosmetic.FaintingWarriorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.FaintingWarriorMask]: MASK_EMOJIS.Mask05,
		[Cosmetic.StanceCourageous]: STANCE_EMOJIS.Courageous,
		[Cosmetic.CourageousSoldierHair]: HAIR_EMOJIS.Hair23,
		[Cosmetic.CourageousSoldierBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.CourageousSoldierHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CourageousSoldierWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.CourageousSoldierBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CourageousSoldierCape1]: CAPE_EMOJIS.Cape09,
		[Cosmetic.StanceSneaky]: STANCE_EMOJIS.Sneaky,
		[Cosmetic.StealthySurvivorHair]: HAIR_EMOJIS.Hair24,
		[Cosmetic.StealthySurvivorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.StealthySurvivorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StealthySurvivorWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.StealthySurvivorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.StealthySurvivorCape1]: CAPE_EMOJIS.Cape10,
		[Cosmetic.EmoteSalute1]: EMOTE_EMOJIS.Salute,
		[Cosmetic.EmoteSalute2]: EMOTE_EMOJIS.Salute,
		[Cosmetic.SalutingCaptainBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.SalutingCaptainHair]: HAIR_EMOJIS.Hair25,
		[Cosmetic.SalutingCaptainHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SalutingCaptainWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteSalute3]: EMOTE_EMOJIS.Salute,
		[Cosmetic.EmoteSalute4]: EMOTE_EMOJIS.Salute,
		[Cosmetic.SalutingCaptainBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SalutingCaptainFireworksStaff]: HELD_PROPS_EMOJIS.HeldProp06,
		[Cosmetic.EmoteLookAround1]: EMOTE_EMOJIS.LookAround,
		[Cosmetic.EmoteLookAround2]: EMOTE_EMOJIS.LookAround,
		[Cosmetic.LookoutScoutBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.LookoutScoutHorn]: HELD_PROPS_EMOJIS.HeldProp05,
		[Cosmetic.LookoutScoutHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LookoutScoutWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteLookAround3]: EMOTE_EMOJIS.LookAround,
		[Cosmetic.EmoteLookAround4]: EMOTE_EMOJIS.LookAround,
		[Cosmetic.LookoutScoutBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LookoutScoutFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory06,
		[Cosmetic.EmotePray1]: EMOTE_EMOJIS.Pray,
		[Cosmetic.EmotePray2]: EMOTE_EMOJIS.Pray,
		[Cosmetic.PrayingAcolyteBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.PrayingAcolyteHair]: HAIR_EMOJIS.Hair26,
		[Cosmetic.PrayingAcolyteHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PrayingAcolyteWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmotePray3]: EMOTE_EMOJIS.Pray,
		[Cosmetic.EmotePray4]: EMOTE_EMOJIS.Pray,
		[Cosmetic.PrayingAcolyteBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PrayingAcolyteCape1]: CAPE_EMOJIS.Cape11,
		[Cosmetic.EmoteTelekinesis1]: EMOTE_EMOJIS.Telekinesis,
		[Cosmetic.EmoteTelekinesis2]: EMOTE_EMOJIS.Telekinesis,
		[Cosmetic.LevitatingAdeptBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.LevitatingAdeptHair]: HAIR_EMOJIS.Hair27,
		[Cosmetic.LevitatingAdeptHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LevitatingAdeptWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteTelekinesis3]: EMOTE_EMOJIS.Telekinesis,
		[Cosmetic.EmoteTelekinesis4]: EMOTE_EMOJIS.Telekinesis,
		[Cosmetic.LevitatingAdeptBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LevitatingAdeptFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory07,
		[Cosmetic.StancePolite]: STANCE_EMOJIS.Polite,
		[Cosmetic.PoliteScholarOutfit]: OUTFIT_EMOJIS.Outfit08,
		[Cosmetic.PoliteScholarBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.PoliteScholarHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PoliteScholarWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PoliteScholarBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PoliteScholarHair]: HAIR_EMOJIS.Hair28,
		[Cosmetic.CallCosmicManta]: CALL_EMOJIS.CosmicManta,
		[Cosmetic.MemoryWhispererOutfit]: OUTFIT_EMOJIS.Outfit09,
		[Cosmetic.MemoryWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.MemoryWhispererHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MemoryWhispererWingBuff1]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MemoryWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.MemoryWhispererCape1]: CAPE_EMOJIS.Cape12,
		[Cosmetic.EmoteFloat1]: EMOTE_EMOJIS.Float,
		[Cosmetic.EmoteFloat2]: EMOTE_EMOJIS.Float,
		[Cosmetic.MeditatingMonasticBlessing1]: MISCELLANEOUS_EMOJIS.Blessing1,
		[Cosmetic.MeditatingMonasticHair]: HAIR_EMOJIS.Hair29,
		[Cosmetic.MeditatingMonasticHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MeditatingMonasticWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteFloat3]: EMOTE_EMOJIS.Float,
		[Cosmetic.EmoteFloat4]: EMOTE_EMOJIS.Float,
		[Cosmetic.MeditatingMonasticBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.MeditatingMonasticTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp01,
		[Cosmetic.ElderOfTheIsleHair]: HAIR_EMOJIS.Hair30,
		[Cosmetic.ElderOfThePrairieHair]: HAIR_EMOJIS.Hair31,
		[Cosmetic.ElderOfTheForestHair]: HAIR_EMOJIS.Hair32,
		[Cosmetic.ElderOfTheValleyHair1]: HAIR_EMOJIS.Hair33,
		[Cosmetic.ElderOfTheValleyHair2]: HAIR_EMOJIS.Hair34,
		[Cosmetic.ElderOfTheWastelandHair]: HAIR_EMOJIS.Hair35,
		[Cosmetic.ElderOfTheVaultHair]: HAIR_EMOJIS.Hair36,
		[Cosmetic.GratitudePendant]: NECKLACE_EMOJIS.Necklace01,
		[Cosmetic.GratitudeUltimateMask]: MASK_EMOJIS.Mask10,
		[Cosmetic.StanceSassy]: STANCE_EMOJIS.Sassy,
		[Cosmetic.SassyDrifterHair]: HAIR_EMOJIS.Hair37,
		[Cosmetic.SassyDrifterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SassyDrifterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SassyDrifterMask]: MASK_EMOJIS.Mask11,
		[Cosmetic.EmoteYoga1]: EMOTE_EMOJIS.Yoga,
		[Cosmetic.EmoteYoga2]: EMOTE_EMOJIS.Yoga,
		[Cosmetic.StretchingGuruHair]: HAIR_EMOJIS.Hair39,
		[Cosmetic.StretchingGuruBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteYoga3]: EMOTE_EMOJIS.Yoga,
		[Cosmetic.EmoteYoga4]: EMOTE_EMOJIS.Yoga,
		[Cosmetic.StretchingGuruBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.StretchingGuruCape]: CAPE_EMOJIS.Cape14,
		[Cosmetic.EmoteKabuki1]: EMOTE_EMOJIS.Kabuki,
		[Cosmetic.EmoteKabuki2]: EMOTE_EMOJIS.Kabuki,
		[Cosmetic.ProvokingPerformerMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.ProvokingPerformerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteKabuki3]: EMOTE_EMOJIS.Kabuki,
		[Cosmetic.EmoteKabuki4]: EMOTE_EMOJIS.Kabuki,
		[Cosmetic.ProvokingPerformerHair]: HAIR_EMOJIS.Hair38,
		[Cosmetic.ProvokingPerformerMask]: MASK_EMOJIS.Mask06,
		[Cosmetic.EmoteLeap1]: EMOTE_EMOJIS.Leap,
		[Cosmetic.EmoteLeap2]: EMOTE_EMOJIS.Leap,
		[Cosmetic.LeapingDancerSmallBell]: HELD_PROPS_EMOJIS.HeldProp07,
		[Cosmetic.LeapingDancerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteLeap3]: EMOTE_EMOJIS.Leap,
		[Cosmetic.EmoteLeap4]: EMOTE_EMOJIS.Leap,
		[Cosmetic.LeapingDancerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LeapingDancerMask]: MASK_EMOJIS.Mask07,
		[Cosmetic.EmoteAcknowledge1]: EMOTE_EMOJIS.Acknowledge,
		[Cosmetic.EmoteAcknowledge2]: EMOTE_EMOJIS.Acknowledge,
		[Cosmetic.SalutingProtectorMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.SalutingProtectorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteAcknowledge3]: EMOTE_EMOJIS.Acknowledge,
		[Cosmetic.EmoteAcknowledge4]: EMOTE_EMOJIS.Acknowledge,
		[Cosmetic.SalutingProtectorCape]: CAPE_EMOJIS.Cape13,
		[Cosmetic.SalutingProtectorMask]: MASK_EMOJIS.Mask08,
		[Cosmetic.EmoteKungFu1]: EMOTE_EMOJIS.KungFu,
		[Cosmetic.EmoteKungFu2]: EMOTE_EMOJIS.KungFu,
		[Cosmetic.GreetingShamanBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GreetingShamanLargeBell]: HELD_PROPS_EMOJIS.HeldProp08,
		[Cosmetic.EmoteKungFu3]: EMOTE_EMOJIS.KungFu,
		[Cosmetic.EmoteKungFu4]: EMOTE_EMOJIS.KungFu,
		[Cosmetic.GreetingShamanBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GreetingShamanMask]: MASK_EMOJIS.Mask09,
		[Cosmetic.BetaCape]: CAPE_EMOJIS.Cape02,
		[Cosmetic.FoundersCape]: CAPE_EMOJIS.Cape15,
		[Cosmetic.LightseekerPendant]: NECKLACE_EMOJIS.Necklace02,
		[Cosmetic.LightseekerUltimateProp]: HELD_PROPS_EMOJIS.HeldProp12,
		[Cosmetic.FriendActionCarry1]: FRIEND_ACTION_EMOJIS.Carry,
		[Cosmetic.PiggybackLightseekerMask]: MASK_EMOJIS.Mask12,
		[Cosmetic.PiggybackLightseekerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PiggybackLightseekerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.FriendActionCarry2]: FRIEND_ACTION_EMOJIS.Carry,
		[Cosmetic.PiggybackLightseekerHair]: HAIR_EMOJIS.Hair42,
		[Cosmetic.PiggybackLightseekerCape]: CAPE_EMOJIS.Cape17,
		[Cosmetic.FriendActionDoubleFive1]: FRIEND_ACTION_EMOJIS.DoubleFive,
		[Cosmetic.DoublefiveLightCatcherBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DoublefiveLightCatcherHair]: HAIR_EMOJIS.Hair44,
		[Cosmetic.DoublefiveLightCatcherMask]: MASK_EMOJIS.Mask13,
		[Cosmetic.FriendActionDoubleFive2]: FRIEND_ACTION_EMOJIS.DoubleFive,
		[Cosmetic.DoublefiveLightCatcherBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DoublefiveLightCatcherFlute]: HELD_PROPS_EMOJIS.HeldProp09,
		[Cosmetic.StanceLaidback]: STANCE_EMOJIS.Laidback,
		[Cosmetic.LaidbackPioneerMask]: MASK_EMOJIS.Mask14,
		[Cosmetic.LaidbackPioneerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LaidbackPioneerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LaidbackPioneerMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.LaidbackPioneerHair]: HAIR_EMOJIS.Hair43,
		[Cosmetic.LaidbackPioneerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LaidbackPioneerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LaidbackPioneerUmbrella]: HELD_PROPS_EMOJIS.HeldProp11,
		[Cosmetic.EmoteTripleAxel1]: EMOTE_EMOJIS.TripleAxel,
		[Cosmetic.EmoteTripleAxel2]: EMOTE_EMOJIS.TripleAxel,
		[Cosmetic.TwirlingChampionBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TwirlingChampionMask]: MASK_EMOJIS.Mask15,
		[Cosmetic.EmoteTripleAxel3]: EMOTE_EMOJIS.TripleAxel,
		[Cosmetic.EmoteTripleAxel4]: EMOTE_EMOJIS.TripleAxel,
		[Cosmetic.TwirlingChampionHair]: HAIR_EMOJIS.Hair41,
		[Cosmetic.TwirlingChampionPanflute]: HELD_PROPS_EMOJIS.HeldProp10,
		[Cosmetic.CallCrab]: CALL_EMOJIS.Crab,
		[Cosmetic.CrabWhispererMask]: MASK_EMOJIS.Mask16,
		[Cosmetic.CrabWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CrabWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CrabWhispererMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.CrabWhispererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CrabWhispererBlessing4]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CrabWhispererHair]: HAIR_EMOJIS.Hair40,
		[Cosmetic.CrabWhispererCape]: CAPE_EMOJIS.Cape16,
		[Cosmetic.EmoteShush1]: EMOTE_EMOJIS.Shush,
		[Cosmetic.EmoteShush2]: EMOTE_EMOJIS.Shush,
		[Cosmetic.ShushingLightScholarBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ShushingLightScholarMask]: MASK_EMOJIS.Mask17,
		[Cosmetic.EmoteShush3]: EMOTE_EMOJIS.Shush,
		[Cosmetic.EmoteShush4]: EMOTE_EMOJIS.Shush,
		[Cosmetic.ShushingLightScholarBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ShushingLightScholarCape]: CAPE_EMOJIS.Cape18,
		[Cosmetic.SpookyBatCape]: CAPE_EMOJIS.Cape19,
		[Cosmetic.HungryPumpkinHat]: HAIR_EMOJIS.Hair45,
		[Cosmetic.BelongingPendant]: NECKLACE_EMOJIS.Necklace03,
		[Cosmetic.BelongingBonfire]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp02,
		[Cosmetic.EmoteBoogieDance1]: EMOTE_EMOJIS.BoogieDance,
		[Cosmetic.EmoteBoogieDance2]: EMOTE_EMOJIS.BoogieDance,
		[Cosmetic.BoogieKidBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BoogieKidBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteBoogieDance3]: EMOTE_EMOJIS.BoogieDance,
		[Cosmetic.EmoteBoogieDance4]: EMOTE_EMOJIS.BoogieDance,
		[Cosmetic.BoogieKidMask]: MASK_EMOJIS.Mask18,
		[Cosmetic.BoogieKidOutfit]: OUTFIT_EMOJIS.Outfit10,
		[Cosmetic.BoogieKidSeasonalHeart]: SEASON_EMOJIS.BelongingHeart,
		[Cosmetic.EmoteConfetti1]: EMOTE_EMOJIS.Confetti,
		[Cosmetic.EmoteConfetti2]: EMOTE_EMOJIS.Confetti,
		[Cosmetic.ConfettiCousinBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ConfettiCousinBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteConfetti3]: EMOTE_EMOJIS.Confetti,
		[Cosmetic.EmoteConfetti4]: EMOTE_EMOJIS.Confetti,
		[Cosmetic.ConfettiCousinCape]: CAPE_EMOJIS.Cape20,
		[Cosmetic.ConfettiCousinHair]: HAIR_EMOJIS.Hair46,
		[Cosmetic.ConfettiCousinSeasonalHeart]: SEASON_EMOJIS.BelongingHeart,
		[Cosmetic.FriendActionHairTousle1]: FRIEND_ACTION_EMOJIS.HairTousle,
		[Cosmetic.HairtousleTeenBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HairtousleTeenBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HairtousleTeenMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.FriendActionHairTousle2]: FRIEND_ACTION_EMOJIS.HairTousle,
		[Cosmetic.HairtousleTeenBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HairtousleTeenEarmuffs]: HEAD_ACCESSORY_EMOJIS.HeadAccessory01,
		[Cosmetic.HairtousleTeenUkulele]: HELD_PROPS_EMOJIS.HeldProp14,
		[Cosmetic.HairtousleTeenBlessing4]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HairtousleTeenSeasonalHeart]: SEASON_EMOJIS.BelongingHeart,
		[Cosmetic.EmoteSparkler1]: EMOTE_EMOJIS.Sparkler,
		[Cosmetic.EmoteSparkler2]: EMOTE_EMOJIS.Sparkler,
		[Cosmetic.SparklerParentBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SparklerParentMask]: MASK_EMOJIS.Mask21,
		[Cosmetic.EmoteSparkler3]: EMOTE_EMOJIS.Sparkler,
		[Cosmetic.EmoteSparkler4]: EMOTE_EMOJIS.Sparkler,
		[Cosmetic.SparklerParentHair]: HAIR_EMOJIS.Hair47,
		[Cosmetic.SparklerParentBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SparklerParentSeasonalHeart]: SEASON_EMOJIS.BelongingHeart,
		[Cosmetic.EmoteDontGo1]: EMOTE_EMOJIS.DontGo,
		[Cosmetic.EmoteDontGo2]: EMOTE_EMOJIS.DontGo,
		[Cosmetic.PleafulParentBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PleafulParentGuitar]: HELD_PROPS_EMOJIS.HeldProp13,
		[Cosmetic.EmoteDontGo3]: EMOTE_EMOJIS.DontGo,
		[Cosmetic.EmoteDontGo4]: EMOTE_EMOJIS.DontGo,
		[Cosmetic.PleafulParentMask]: MASK_EMOJIS.Mask20,
		[Cosmetic.PleafulParentCape]: CAPE_EMOJIS.Cape21,
		[Cosmetic.PleafulParentSeasonalHeart]: SEASON_EMOJIS.BelongingHeart,
		[Cosmetic.StanceWise]: STANCE_EMOJIS.Wise,
		[Cosmetic.WiseGrandparentBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WiseGrandparentMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.WiseGrandparentBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WiseGrandparentBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WiseGrandparentMask]: MASK_EMOJIS.Mask19,
		[Cosmetic.WiseGrandparentBlessing4]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WiseGrandparentBlessing5]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.WiseGrandparentCape]: CAPE_EMOJIS.Cape22,
		[Cosmetic.WiseGrandparentSeasonalHeart]: SEASON_EMOJIS.BelongingHeart,
		[Cosmetic.DaysOfFeastHat]: HAIR_EMOJIS.Hair48,
		[Cosmetic.RhythmPendant]: NECKLACE_EMOJIS.Necklace04,
		[Cosmetic.RhythmUltimateMask]: MASK_EMOJIS.Mask22,
		[Cosmetic.RhythmUltimateHair]: HAIR_EMOJIS.Hair52,
		[Cosmetic.EmoteWelcome1]: EMOTE_EMOJIS.Welcome,
		[Cosmetic.EmoteWelcome2]: EMOTE_EMOJIS.Welcome,
		[Cosmetic.TroupeGreeterMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.TroupeGreeterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteWelcome3]: EMOTE_EMOJIS.Welcome,
		[Cosmetic.EmoteWelcome4]: EMOTE_EMOJIS.Welcome,
		[Cosmetic.TroupeGreeterMask]: MASK_EMOJIS.Mask23,
		[Cosmetic.TroupeGreeterOutfit]: OUTFIT_EMOJIS.Outfit11,
		[Cosmetic.TroupeGreeterSeasonalHeart]: SEASON_EMOJIS.RhythmHeart,
		[Cosmetic.EmoteSpinDance1]: EMOTE_EMOJIS.SpinDance,
		[Cosmetic.EmoteSpinDance2]: EMOTE_EMOJIS.SpinDance,
		[Cosmetic.FestivalSpinDancerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.FestivalSpinDancerMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.EmoteSpinDance3]: EMOTE_EMOJIS.SpinDance,
		[Cosmetic.EmoteSpinDance4]: EMOTE_EMOJIS.SpinDance,
		[Cosmetic.FestivalSpinDancerHair]: HAIR_EMOJIS.Hair49,
		[Cosmetic.FestivalSpinDancerOutfit]: OUTFIT_EMOJIS.Outfit13,
		[Cosmetic.FestivalSpinDancerSeasonalHeart]: SEASON_EMOJIS.RhythmHeart,
		[Cosmetic.EmoteBlowKiss1]: EMOTE_EMOJIS.BlowKiss,
		[Cosmetic.EmoteBlowKiss2]: EMOTE_EMOJIS.BlowKiss,
		[Cosmetic.AdmiringActorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.AdmiringActorMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.EmoteBlowKiss3]: EMOTE_EMOJIS.BlowKiss,
		[Cosmetic.EmoteBlowKiss4]: EMOTE_EMOJIS.BlowKiss,
		[Cosmetic.AdmiringActorOutfit]: OUTFIT_EMOJIS.Outfit14,
		[Cosmetic.AdmiringActorMask]: MASK_EMOJIS.Mask24,
		[Cosmetic.AdmiringActorSeasonalHeart]: SEASON_EMOJIS.RhythmHeart,
		[Cosmetic.EmoteJuggle1]: EMOTE_EMOJIS.Juggle,
		[Cosmetic.EmoteJuggle2]: EMOTE_EMOJIS.Juggle,
		[Cosmetic.TroupeJugglerHair]: HAIR_EMOJIS.Hair50,
		[Cosmetic.TroupeJugglerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteJuggle3]: EMOTE_EMOJIS.Juggle,
		[Cosmetic.EmoteJuggle4]: EMOTE_EMOJIS.Juggle,
		[Cosmetic.TroupeJugglerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TroupeJugglerCape]: CAPE_EMOJIS.Cape23,
		[Cosmetic.TroupeJugglerOutfit]: OUTFIT_EMOJIS.Outfit12,
		[Cosmetic.TroupeJugglerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TroupeJugglerSeasonalHeart]: SEASON_EMOJIS.RhythmHeart,
		[Cosmetic.EmoteRespect1]: EMOTE_EMOJIS.Respect,
		[Cosmetic.EmoteRespect2]: EMOTE_EMOJIS.Respect,
		[Cosmetic.RespectfulPianistHair]: HAIR_EMOJIS.Hair51,
		[Cosmetic.RespectfulPianistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteRespect3]: EMOTE_EMOJIS.Respect,
		[Cosmetic.EmoteRespect4]: EMOTE_EMOJIS.Respect,
		[Cosmetic.RespectfulPianistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.RespectfulPianistWinterPiano]: HELD_PROPS_EMOJIS.HeldProp15,
		[Cosmetic.RespectfulPianistMask]: MASK_EMOJIS.Mask26,
		[Cosmetic.RespectfulPianistBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.RespectfulPianistSeasonalHeart]: SEASON_EMOJIS.RhythmHeart,
		[Cosmetic.EmoteThinking1]: EMOTE_EMOJIS.Thinking,
		[Cosmetic.EmoteThinking2]: EMOTE_EMOJIS.Thinking,
		[Cosmetic.ThoughtfulDirectorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ThoughtfulDirectorMask]: MASK_EMOJIS.Mask25,
		[Cosmetic.EmoteThinking3]: EMOTE_EMOJIS.Thinking,
		[Cosmetic.EmoteThinking4]: EMOTE_EMOJIS.Thinking,
		[Cosmetic.ThoughtfulDirectorXylophone]: HELD_PROPS_EMOJIS.HeldProp16,
		[Cosmetic.ThoughtfulDirectorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ThoughtfulDirectorBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ThoughtfulDirectorCape]: CAPE_EMOJIS.Cape24,
		[Cosmetic.ThoughtfulDirectorSeasonalHeart]: SEASON_EMOJIS.RhythmHeart,
		[Cosmetic.SassyDrifterHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SassyDrifterWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.DaysOfLoveSwing]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp01,
		[Cosmetic.DoublefiveLightCatcherHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DoublefiveLightCatcherWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.LaidbackPioneerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LaidbackPioneerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ProvokingPerformerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ProvokingPerformerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ProvokingPerformerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PleafulParentWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PleafulParentBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CrabWhispererHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CrabWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PiggybackLightseekerHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PiggybackLightseekerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EnchantmentGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EnchantmentGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.EnchantmentPendant]: NECKLACE_EMOJIS.Necklace05,
		[Cosmetic.EnchantmentUltimateHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory02,
		[Cosmetic.EnchantmentTurban]: HAIR_EMOJIS.Hair59,
		[Cosmetic.EmoteNod1]: EMOTE_EMOJIS.Nod,
		[Cosmetic.EmoteNod2]: EMOTE_EMOJIS.Nod,
		[Cosmetic.NoddingMuralistMask]: MASK_EMOJIS.Mask27,
		[Cosmetic.NoddingMuralistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteNod3]: EMOTE_EMOJIS.Nod,
		[Cosmetic.EmoteNod4]: EMOTE_EMOJIS.Nod,
		[Cosmetic.NoddingMuralistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.NoddingMuralistHair]: HAIR_EMOJIS.Hair53,
		[Cosmetic.NoddingMuralistSeasonalHeart]: SEASON_EMOJIS.EnchantmentHeart,
		[Cosmetic.EmoteShrug1]: EMOTE_EMOJIS.Shrug,
		[Cosmetic.EmoteShrug2]: EMOTE_EMOJIS.Shrug,
		[Cosmetic.IndifferentAlchemistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.IndifferentAlchemistMask]: MASK_EMOJIS.Mask29,
		[Cosmetic.EmoteShrug3]: EMOTE_EMOJIS.Shrug,
		[Cosmetic.EmoteShrug4]: EMOTE_EMOJIS.Shrug,
		[Cosmetic.IndifferentAlchemistHair]: HAIR_EMOJIS.Hair57,
		[Cosmetic.IndifferentAlchemistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.IndifferentAlchemistBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.IndifferentAlchemistCape]: CAPE_EMOJIS.Cape27,
		[Cosmetic.IndifferentAlchemistSeasonalHeart]: SEASON_EMOJIS.EnchantmentHeart,
		[Cosmetic.EmoteCrabWalk1]: EMOTE_EMOJIS.CrabWalk,
		[Cosmetic.EmoteCrabWalk2]: EMOTE_EMOJIS.CrabWalk,
		[Cosmetic.CrabWalkerHair]: HAIR_EMOJIS.Hair56,
		[Cosmetic.CrabWalkerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteCrabWalk3]: EMOTE_EMOJIS.CrabWalk,
		[Cosmetic.EmoteCrabWalk4]: EMOTE_EMOJIS.CrabWalk,
		[Cosmetic.CrabWalkerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CrabWalkerCape]: CAPE_EMOJIS.Cape25,
		[Cosmetic.CrabWalkerSeasonalHeart]: SEASON_EMOJIS.EnchantmentHeart,
		[Cosmetic.EmoteBoo1]: EMOTE_EMOJIS.Boo,
		[Cosmetic.EmoteBoo2]: EMOTE_EMOJIS.Boo,
		[Cosmetic.ScarecrowFarmerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ScarecrowFarmerMask]: MASK_EMOJIS.Mask30,
		[Cosmetic.EmoteBoo3]: EMOTE_EMOJIS.Boo,
		[Cosmetic.EmoteBoo4]: EMOTE_EMOJIS.Boo,
		[Cosmetic.ScarecrowFarmerHair]: HAIR_EMOJIS.Hair54,
		[Cosmetic.ScarecrowFarmerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ScarecrowFarmerSeasonalHeart]: SEASON_EMOJIS.EnchantmentHeart,
		[Cosmetic.EmoteDoze1]: EMOTE_EMOJIS.Doze,
		[Cosmetic.EmoteDoze2]: EMOTE_EMOJIS.Doze,
		[Cosmetic.SnoozingCarpenterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SnoozingCarpenterHair]: HAIR_EMOJIS.Hair55,
		[Cosmetic.EmoteDoze3]: EMOTE_EMOJIS.Doze,
		[Cosmetic.EmoteDoze4]: EMOTE_EMOJIS.Doze,
		[Cosmetic.SnoozingCarpenterCape]: CAPE_EMOJIS.Cape26,
		[Cosmetic.SnoozingCarpenterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SnoozingCarpenterSeasonalHeart]: SEASON_EMOJIS.EnchantmentHeart,
		[Cosmetic.FriendActionPlayFight1]: FRIEND_ACTION_EMOJIS.PlayFight,
		[Cosmetic.PlayfightingHerbalistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PlayfightingHerbalistMask]: MASK_EMOJIS.Mask28,
		[Cosmetic.PlayfightingHerbalistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PlayfightingHerbalistBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.FriendActionPlayFight2]: FRIEND_ACTION_EMOJIS.PlayFight,
		[Cosmetic.PlayfightingHerbalistMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.PlayfightingHerbalistHair]: HAIR_EMOJIS.Hair58,
		[Cosmetic.PlayfightingHerbalistCape]: CAPE_EMOJIS.Cape28,
		[Cosmetic.PlayfightingHerbalistBlessing4]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PlayfightingHerbalistSeasonalHeart]: SEASON_EMOJIS.EnchantmentHeart,
		[Cosmetic.EarthCape]: CAPE_EMOJIS.Cape29,
		[Cosmetic.EnchantmentGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EnchantmentGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StretchingGuruHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StretchingGuruWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EnchantmentGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EnchantmentGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.EnchantmentGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EnchantmentGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SparklerParentWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EnchantmentGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EnchantmentGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HealingHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory01,
		[Cosmetic.SalutingProtectorHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SalutingProtectorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SalutingProtectorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EnchantmentGuideQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EnchantmentGuideHeart6]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.EnchantmentGuideHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.HairtousleTeenWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.LeapingDancingHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LeapingDancingWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ConfettiCousinWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SanctuaryGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SanctuaryGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SanctuaryPendant]: NECKLACE_EMOJIS.Necklace06,
		[Cosmetic.SanctuaryHandpan]: HELD_PROPS_EMOJIS.HeldProp17,
		[Cosmetic.SanctuaryGuideMantaCape]: CAPE_EMOJIS.Cape31,
		[Cosmetic.CallJellyfish]: CALL_EMOJIS.Jellyfish,
		[Cosmetic.JellyWhispererMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.JellyWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.JellyWhispererHair]: HAIR_EMOJIS.Hair60,
		[Cosmetic.JellyWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.JellyWhispererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.JellyWhispererOutfit]: OUTFIT_EMOJIS.Outfit15,
		[Cosmetic.JellyWhispererSeasonalHeart]: SEASON_EMOJIS.SanctuaryHeart,
		[Cosmetic.StanceTimid]: STANCE_EMOJIS.Timid,
		[Cosmetic.TimidBookwormBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TimidBookwormMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.TimidBookwormHair]: HAIR_EMOJIS.Hair61,
		[Cosmetic.TimidBookwormBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TimidBookwormBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TimidBookwormCape]: CAPE_EMOJIS.Cape30,
		[Cosmetic.TimidBookwormSeasonalHeart]: SEASON_EMOJIS.SanctuaryHeart,
		[Cosmetic.EmoteRallyCheer1]: EMOTE_EMOJIS.RallyCheer,
		[Cosmetic.EmoteRallyCheer2]: EMOTE_EMOJIS.RallyCheer,
		[Cosmetic.RallyingThrillseekerHair]: HAIR_EMOJIS.Hair62,
		[Cosmetic.RallyingThrillseekerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteRallyCheer3]: EMOTE_EMOJIS.RallyCheer,
		[Cosmetic.EmoteRallyCheer4]: EMOTE_EMOJIS.RallyCheer,
		[Cosmetic.RallyingThrillseekerOutfit]: OUTFIT_EMOJIS.Outfit16,
		[Cosmetic.RallyingThrillseekerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.RallyingThrillseekerSeasonalHeart]: SEASON_EMOJIS.SanctuaryHeart,
		[Cosmetic.EmoteGrumpy1]: EMOTE_EMOJIS.Grumpy,
		[Cosmetic.EmoteGrumpy2]: EMOTE_EMOJIS.Grumpy,
		[Cosmetic.HikingGrouchBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HikingGrouchMask]: MASK_EMOJIS.Mask31,
		[Cosmetic.EmoteGrumpy3]: EMOTE_EMOJIS.Grumpy,
		[Cosmetic.EmoteGrumpy4]: EMOTE_EMOJIS.Grumpy,
		[Cosmetic.HikingGrouchHair]: HAIR_EMOJIS.Hair63,
		[Cosmetic.HikingGrouchBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HikingGrouchBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.HikingGrouchBowTie]: NECKLACE_EMOJIS.Necklace07,
		[Cosmetic.HikingGrouchSeasonalHeart]: SEASON_EMOJIS.SanctuaryHeart,
		[Cosmetic.EmoteGrateful1]: EMOTE_EMOJIS.Grateful,
		[Cosmetic.EmoteGrateful2]: EMOTE_EMOJIS.Grateful,
		[Cosmetic.GratefulShellCollectorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GratefulShellCollectorHair]: HAIR_EMOJIS.Hair64,
		[Cosmetic.EmoteGrateful3]: EMOTE_EMOJIS.Grateful,
		[Cosmetic.EmoteGrateful4]: EMOTE_EMOJIS.Grateful,
		[Cosmetic.GratefulShellCollectorCape]: CAPE_EMOJIS.Cape32,
		[Cosmetic.GratefulShellCollectorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GratefulShellCollectorSeasonalHeart]: SEASON_EMOJIS.SanctuaryHeart,
		[Cosmetic.EmoteBellyScratch1]: EMOTE_EMOJIS.BellyScratch,
		[Cosmetic.EmoteBellyScratch2]: EMOTE_EMOJIS.BellyScratch,
		[Cosmetic.ChillSunbatherBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ChillSunbatherFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory08,
		[Cosmetic.EmoteBellyScratch3]: EMOTE_EMOJIS.BellyScratch,
		[Cosmetic.EmoteBellyScratch4]: EMOTE_EMOJIS.BellyScratch,
		[Cosmetic.ChillSunbatherHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory02,
		[Cosmetic.ChillSunbatherBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ChillSunbatherCape]: CAPE_EMOJIS.Cape33,
		[Cosmetic.ChillSunbatherBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ChillSunbatherSeasonalHeart]: SEASON_EMOJIS.SanctuaryHeart,
		[Cosmetic.SkyAnniversaryHairAccessory1]: HAIR_ACCESSORY_EMOJIS.HairAccessory03,
		[Cosmetic.SanctuaryGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SanctuaryGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.GreetingShamanHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.GreetingShamanWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SanctuaryGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SanctuaryGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SanctuaryGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SanctuaryGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.WiseGrandparentWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SanctuaryGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SanctuaryGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ShushingLightScholarHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ShushingLightScholarWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.FestivalSpinDancerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.FestivalSpinDancerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SanctuaryGuideQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SanctuaryGuideHeart6]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SanctuaryGuideFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.DaysOfSummerLightsLantern]: HELD_PROPS_EMOJIS.HeldProp18,
		[Cosmetic.TwirlingChampionHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TwirlingChampionWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TwirlingChampionBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphecyGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.ProphecyGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ProphecyPendant]: NECKLACE_EMOJIS.Necklace08,
		[Cosmetic.ProphecyGuideDunun]: HELD_PROPS_EMOJIS.HeldProp19,
		[Cosmetic.ProphecyGuideAnubisMask]: MASK_EMOJIS.Mask36,
		[Cosmetic.EmoteDeepBreath1]: EMOTE_EMOJIS.DeepBreath,
		[Cosmetic.EmoteDeepBreath2]: EMOTE_EMOJIS.DeepBreath,
		[Cosmetic.ProphetOfWaterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfWaterHair]: HAIR_EMOJIS.Hair65,
		[Cosmetic.EmoteDeepBreath3]: EMOTE_EMOJIS.DeepBreath,
		[Cosmetic.EmoteDeepBreath4]: EMOTE_EMOJIS.DeepBreath,
		[Cosmetic.ProphetOfWaterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfWaterCape]: CAPE_EMOJIS.Cape35,
		[Cosmetic.ProphetOfWaterMask]: MASK_EMOJIS.Mask32,
		[Cosmetic.ProphetOfWaterBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfWaterSeasonalHeart]: SEASON_EMOJIS.ProphecyHeart,
		[Cosmetic.EmoteDustOff1]: EMOTE_EMOJIS.DustOff,
		[Cosmetic.EmoteDustOff2]: EMOTE_EMOJIS.DustOff,
		[Cosmetic.ProphetOfEarthHair]: HAIR_EMOJIS.Hair66,
		[Cosmetic.ProphetOfEarthBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteDustOff3]: EMOTE_EMOJIS.DustOff,
		[Cosmetic.EmoteDustOff4]: EMOTE_EMOJIS.DustOff,
		[Cosmetic.ProphetOfEarthMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.ProphetOfEarthBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfEarthCape]: CAPE_EMOJIS.Cape36,
		[Cosmetic.ProphetOfEarthMask]: MASK_EMOJIS.Mask33,
		[Cosmetic.ProphetOfEarthSeasonalHeart]: SEASON_EMOJIS.ProphecyHeart,
		[Cosmetic.EmoteBalance1]: EMOTE_EMOJIS.Balance,
		[Cosmetic.EmoteBalance2]: EMOTE_EMOJIS.Balance,
		[Cosmetic.ProphetOfAirHair]: HAIR_EMOJIS.Hair67,
		[Cosmetic.ProphetOfAirBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteBalance3]: EMOTE_EMOJIS.Balance,
		[Cosmetic.EmoteBalance4]: EMOTE_EMOJIS.Balance,
		[Cosmetic.ProphetOfAirBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfAirMask]: MASK_EMOJIS.Mask34,
		[Cosmetic.ProphetOfAirCape]: CAPE_EMOJIS.Cape34,
		[Cosmetic.ProphetOfAirBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfAirSeasonalHeart]: SEASON_EMOJIS.ProphecyHeart,
		[Cosmetic.EmoteChestPound1]: EMOTE_EMOJIS.ChestPound,
		[Cosmetic.EmoteChestPound2]: EMOTE_EMOJIS.ChestPound,
		[Cosmetic.ProphetOfFireBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfFireHair]: HAIR_EMOJIS.Hair68,
		[Cosmetic.EmoteChestPound3]: EMOTE_EMOJIS.ChestPound,
		[Cosmetic.EmoteChestPound4]: EMOTE_EMOJIS.ChestPound,
		[Cosmetic.ProphetOfFireBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ProphetOfFireMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.ProphetOfFireMask]: MASK_EMOJIS.Mask35,
		[Cosmetic.ProphetOfFireOutfit]: OUTFIT_EMOJIS.Outfit17,
		[Cosmetic.ProphetOfFireSeasonalHeart]: SEASON_EMOJIS.ProphecyHeart,
		[Cosmetic.ProphecyGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.ProphecyGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AdmiringActorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AdmiringActorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.MischiefWebCape]: CAPE_EMOJIS.Cape37,
		[Cosmetic.MischiefWitchHat]: HAIR_EMOJIS.Hair69,
		[Cosmetic.ProphecyGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.ProphecyGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.IndifferentAlchemistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ProphecyGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.ProphecyGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BoogieKidWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ButterflyCharmerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ButterflyCharmerWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ButterflyCharmerCape2]: CAPE_EMOJIS.Cape38,
		[Cosmetic.ProudVictorWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ProudVictorCape2]: CAPE_EMOJIS.Cape40,
		[Cosmetic.PoutyPorterWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PoutyPorterCape2]: CAPE_EMOJIS.Cape39,
		[Cosmetic.FeastNeckTie]: NECKLACE_EMOJIS.Necklace09,
		[Cosmetic.DaysOfFeastCape]: CAPE_EMOJIS.Cape41,
		[Cosmetic.DaysOfFeastTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp03,
		[Cosmetic.DaysOfFeastHorns]: HEAD_ACCESSORY_EMOJIS.HeadAccessory03,
		[Cosmetic.SnowflakeCape]: CAPE_EMOJIS.Cape42,
		[Cosmetic.TroupeGreeterWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TroupeGreeterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DreamsPendant]: NECKLACE_EMOJIS.Necklace10,
		[Cosmetic.DreamsGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DreamsGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DreamsGuidePhoenixMask]: MASK_EMOJIS.Mask40,
		[Cosmetic.DreamsGuideUltimateCape]: CAPE_EMOJIS.Cape46,
		[Cosmetic.EmoteSpinTrick1]: EMOTE_EMOJIS.SpinTrick,
		[Cosmetic.EmoteSpinTrick2]: EMOTE_EMOJIS.SpinTrick,
		[Cosmetic.SpinningMentorHair]: HAIR_EMOJIS.Hair72,
		[Cosmetic.SpinningMentorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteSpinTrick3]: EMOTE_EMOJIS.SpinTrick,
		[Cosmetic.EmoteSpinTrick4]: EMOTE_EMOJIS.SpinTrick,
		[Cosmetic.SpinningMentorMask]: MASK_EMOJIS.Mask39,
		[Cosmetic.SpinningMentorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SpinningMentorBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SpinningMentorCape]: CAPE_EMOJIS.Cape45,
		[Cosmetic.SpinningMentorSeasonalHeart]: SEASON_EMOJIS.DreamsHeart,
		[Cosmetic.EmoteShowDance1]: EMOTE_EMOJIS.ShowDance,
		[Cosmetic.EmoteShowDance2]: EMOTE_EMOJIS.ShowDance,
		[Cosmetic.DancingPerformerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DancingPerformerHair]: HAIR_EMOJIS.Hair71,
		[Cosmetic.EmoteShowDance3]: EMOTE_EMOJIS.ShowDance,
		[Cosmetic.EmoteShowDance4]: EMOTE_EMOJIS.ShowDance,
		[Cosmetic.DancingPerformerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DancingPerformerMask]: MASK_EMOJIS.Mask38,
		[Cosmetic.DancingPerformerCape]: CAPE_EMOJIS.Cape44,
		[Cosmetic.DancingPerformerLute]: HELD_PROPS_EMOJIS.HeldProp20,
		[Cosmetic.DancingPerformerSeasonalHeart]: SEASON_EMOJIS.DreamsHeart,
		[Cosmetic.EmotePeek1]: EMOTE_EMOJIS.Peek,
		[Cosmetic.EmotePeek2]: EMOTE_EMOJIS.Peek,
		[Cosmetic.PeekingPostmanMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.PeekingPostmanBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmotePeek3]: EMOTE_EMOJIS.Peek,
		[Cosmetic.EmotePeek4]: EMOTE_EMOJIS.Peek,
		[Cosmetic.PeekingPostmanOutfit]: OUTFIT_EMOJIS.Outfit18,
		[Cosmetic.PeekingPostmanBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.PeekingPostmanCape]: CAPE_EMOJIS.Cape43,
		[Cosmetic.PeekingPostmanRabbitMask]: MASK_EMOJIS.Mask37,
		[Cosmetic.PeekingPostmanSeasonalHeart]: SEASON_EMOJIS.DreamsHeart,
		[Cosmetic.FriendActionBearhug1]: FRIEND_ACTION_EMOJIS.Bearhug,
		[Cosmetic.BearhugHermitBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BearhugHermitRedHorns]: HEAD_ACCESSORY_EMOJIS.HeadAccessory04,
		[Cosmetic.BearhugHermitBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BearhugHermitMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.BearhugHermitBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.FriendActionBearhug2]: FRIEND_ACTION_EMOJIS.Bearhug,
		[Cosmetic.BearhugHermitHair]: HAIR_EMOJIS.Hair70,
		[Cosmetic.BearhugHermitOutfit]: OUTFIT_EMOJIS.Outfit19,
		[Cosmetic.BearhugHermitSeasonalHeart]: SEASON_EMOJIS.DreamsHeart,
		[Cosmetic.NoddingMuralistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.DreamsGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DreamsGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DreamsGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DreamsGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CrabWalkerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RespectfulPianistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.CourageousSoldierWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.CourageousSoldierCape2]: CAPE_EMOJIS.Cape47,
		[Cosmetic.PrayingAcolyteWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PrayingAcolyteCape2]: CAPE_EMOJIS.Cape48,
		[Cosmetic.DreamsGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DreamsGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DaysOfFortuneMask]: MASK_EMOJIS.Mask42,
		[Cosmetic.DaysOfFortuneHeaddress]: HAIR_EMOJIS.Hair75,
		[Cosmetic.DaysOfFortuneOrange]: HAIR_ACCESSORY_EMOJIS.HairAccessory04,
		[Cosmetic.DaysOfFortuneCape]: CAPE_EMOJIS.Cape49,
		[Cosmetic.FortuneBlushingMask]: MASK_EMOJIS.Mask41,
		[Cosmetic.FortuneBunHair]: HAIR_EMOJIS.Hair73,
		[Cosmetic.DaysOfFortuneWoolHat]: HAIR_EMOJIS.Hair74,
		[Cosmetic.DaysOfLoveMask]: MASK_EMOJIS.Mask43,
		[Cosmetic.DaysOfLoveSeesaw]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp02,
		[Cosmetic.DreamsGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DreamsGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DismayedHunterWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.DismayedHunterCape2]: CAPE_EMOJIS.Cape50,
		[Cosmetic.BloomHair]: HAIR_EMOJIS.Hair76,
		[Cosmetic.BloomCape]: CAPE_EMOJIS.Cape51,
		[Cosmetic.PinkBloomTeaset]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp04,
		[Cosmetic.AssemblyGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AssemblyGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AssemblyPendant]: NECKLACE_EMOJIS.Necklace11,
		[Cosmetic.AssemblyGuideUltimateMask]: MASK_EMOJIS.Mask44,
		[Cosmetic.AssemblyGuideUltimateHair]: HAIR_EMOJIS.Hair77,
		[Cosmetic.AssemblyGuideBugle]: HELD_PROPS_EMOJIS.HeldProp21,
		[Cosmetic.AssemblyGuideUltimateCape]: CAPE_EMOJIS.Cape52,
		[Cosmetic.AssemblyGuideHighFive]: FRIEND_ACTION_EMOJIS.HighFive,
		[Cosmetic.EmoteFacepalm1]: EMOTE_EMOJIS.Facepalm,
		[Cosmetic.EmoteFacepalm2]: EMOTE_EMOJIS.Facepalm,
		[Cosmetic.BaffledBotanistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BaffledBotanistHair]: HAIR_EMOJIS.Hair80,
		[Cosmetic.EmoteFacepalm3]: EMOTE_EMOJIS.Facepalm,
		[Cosmetic.EmoteFacepalm4]: EMOTE_EMOJIS.Facepalm,
		[Cosmetic.BaffledBotanistMask]: MASK_EMOJIS.Mask49,
		[Cosmetic.BaffledBotanistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BaffledBotanistBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BaffledBotanistProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp10,
		[Cosmetic.BaffledBotanistSeasonalHeart]: SEASON_EMOJIS.AssemblyHeart,
		[Cosmetic.EmoteScold1]: EMOTE_EMOJIS.Scold,
		[Cosmetic.EmoteScold2]: EMOTE_EMOJIS.Scold,
		[Cosmetic.ScoldingStudentMask]: MASK_EMOJIS.Mask48,
		[Cosmetic.ScoldingStudentBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteScold3]: EMOTE_EMOJIS.Scold,
		[Cosmetic.EmoteScold4]: EMOTE_EMOJIS.Scold,
		[Cosmetic.ScoldingStudentHair]: HAIR_EMOJIS.Hair81,
		[Cosmetic.ScoldingStudentBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ScoldingStudentBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ScoldingStudentCape]: CAPE_EMOJIS.Cape53,
		[Cosmetic.ScoldingStudentSeasonalHeart]: SEASON_EMOJIS.AssemblyHeart,
		[Cosmetic.EmoteEww1]: EMOTE_EMOJIS.Eww,
		[Cosmetic.EmoteEww2]: EMOTE_EMOJIS.Eww,
		[Cosmetic.ScaredyCadetMask]: MASK_EMOJIS.Mask50,
		[Cosmetic.ScaredyCadetBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteEww3]: EMOTE_EMOJIS.Eww,
		[Cosmetic.EmoteEww4]: EMOTE_EMOJIS.Eww,
		[Cosmetic.ScaredyCadetMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.ScaredyCadetHair]: HAIR_EMOJIS.Hair82,
		[Cosmetic.ScaredyCadetHammock]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp07,
		[Cosmetic.ScaredyCadetBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ScaredyCadetSeasonalHeart]: SEASON_EMOJIS.AssemblyHeart,
		[Cosmetic.EmoteMarching1]: EMOTE_EMOJIS.Marching,
		[Cosmetic.EmoteMarching2]: EMOTE_EMOJIS.Marching,
		[Cosmetic.MarchingAdventurerHair]: HAIR_EMOJIS.Hair79,
		[Cosmetic.MarchingAdventurerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteMarching3]: EMOTE_EMOJIS.Marching,
		[Cosmetic.EmoteMarching4]: EMOTE_EMOJIS.Marching,
		[Cosmetic.MarchingAdventurerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.MarchingAdventurerMask]: MASK_EMOJIS.Mask45,
		[Cosmetic.MarchingAdventurerTikiTorch]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp08,
		[Cosmetic.MarchingAdventurerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.MarchingAdventurerSeasonalHeart]: SEASON_EMOJIS.AssemblyHeart,
		[Cosmetic.EmoteChuckle1]: EMOTE_EMOJIS.Chuckle,
		[Cosmetic.EmoteChuckle2]: EMOTE_EMOJIS.Chuckle,
		[Cosmetic.ChucklingScoutMask]: MASK_EMOJIS.Mask46,
		[Cosmetic.ChucklingScoutBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteChuckle3]: EMOTE_EMOJIS.Chuckle,
		[Cosmetic.EmoteChuckle4]: EMOTE_EMOJIS.Chuckle,
		[Cosmetic.ChucklingScoutBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ChucklingScoutOutfit]: OUTFIT_EMOJIS.Outfit20,
		[Cosmetic.ChucklingScoutProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp11,
		[Cosmetic.ChucklingScoutBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.ChucklingScoutSeasonalHeart]: SEASON_EMOJIS.AssemblyHeart,
		[Cosmetic.EmoteBubbles1]: EMOTE_EMOJIS.Bubbles,
		[Cosmetic.EmoteBubbles2]: EMOTE_EMOJIS.Bubbles,
		[Cosmetic.DaydreamForesterMask]: MASK_EMOJIS.Mask47,
		[Cosmetic.DaydreamForesterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteBubbles3]: EMOTE_EMOJIS.Bubbles,
		[Cosmetic.EmoteBubbles4]: EMOTE_EMOJIS.Bubbles,
		[Cosmetic.DaydreamForesterMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.DaydreamForesterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DaydreamForesterBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.DaydreamForesterHair]: HAIR_EMOJIS.Hair78,
		[Cosmetic.DaydreamForesterSeasonalHeart]: SEASON_EMOJIS.AssemblyHeart,
		[Cosmetic.AssemblyGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AssemblyGuidePillow]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp04,
		[Cosmetic.OceanNecklace]: NECKLACE_EMOJIS.Necklace12,
		[Cosmetic.OceanCape]: CAPE_EMOJIS.Cape54,
		[Cosmetic.RallyingThrillseekerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AssemblyGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AssemblyGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AssemblyGuideFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.AssemblyGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AssemblyGuideJar]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp03,
		[Cosmetic.ThoughtfulDirectorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AssemblyGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AssemblyGuideBrazier]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp05,
		[Cosmetic.AssemblyGuideDoubleFive]: FRIEND_ACTION_EMOJIS.DoubleFive,
		[Cosmetic.SnoozingCarpenterWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HandstandingThrillseekerWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HandstandingThrillseekerCape2]: CAPE_EMOJIS.Cape55,
		[Cosmetic.AssemblyGuideQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AssemblyGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AssemblyGuideBookcase]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp06,
		[Cosmetic.AssemblyGuideTarpaulin]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp09,
		[Cosmetic.TimidBookwormWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RainbowBraid]: HEAD_ACCESSORY_EMOJIS.HeadAccessory05,
		[Cosmetic.RainbowCape]: CAPE_EMOJIS.Cape56,
		[Cosmetic.RainbowHat]: HAIR_EMOJIS.Hair83,
		[Cosmetic.RainbowFlower]: HAIR_ACCESSORY_EMOJIS.HairAccessory05,
		[Cosmetic.SwitchBlueCape]: CAPE_EMOJIS.Cape58,
		[Cosmetic.SwitchRedCape]: CAPE_EMOJIS.Cape57,
		[Cosmetic.VesselFlute]: HELD_PROPS_EMOJIS.HeldProp22,
		[Cosmetic.ElvishHairstyle]: HAIR_EMOJIS.Hair84,
		[Cosmetic.LittlePrinceScarf]: CAPE_EMOJIS.Cape63,
		[Cosmetic.LittlePrinceFox]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp06,
		[Cosmetic.TheRoseQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LittlePrincePendant]: NECKLACE_EMOJIS.Necklace13,
		[Cosmetic.TheRoseUltimateHair]: HAIR_EMOJIS.Hair90,
		[Cosmetic.TheRoseUltimateOutfit]: OUTFIT_EMOJIS.Outfit23,
		[Cosmetic.TheRoseRose]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp05,
		[Cosmetic.EmoteBeckon1]: EMOTE_EMOJIS.Beckon,
		[Cosmetic.EmoteBeckon2]: EMOTE_EMOJIS.Beckon,
		[Cosmetic.BeckoningRulerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BeckoningRulerHair]: HAIR_EMOJIS.Hair88,
		[Cosmetic.EmoteBeckon3]: EMOTE_EMOJIS.Beckon,
		[Cosmetic.EmoteBeckon4]: EMOTE_EMOJIS.Beckon,
		[Cosmetic.BeckoningRulerFrogMask]: MASK_EMOJIS.Mask51,
		[Cosmetic.BeckoningRulerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.BeckoningRulerSeasonalHeart]: SEASON_EMOJIS.LittlePrinceHeart,
		[Cosmetic.EmoteGloat1]: EMOTE_EMOJIS.Gloat,
		[Cosmetic.EmoteGloat2]: EMOTE_EMOJIS.Gloat,
		[Cosmetic.GloatingNarcissistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GloatingNarcissistMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.EmoteGloat3]: EMOTE_EMOJIS.Gloat,
		[Cosmetic.EmoteGloat4]: EMOTE_EMOJIS.Gloat,
		[Cosmetic.GloatingNarcissistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GloatingNarcissistOutfit]: OUTFIT_EMOJIS.Outfit21,
		[Cosmetic.GloatingNarcissistHair]: HAIR_EMOJIS.Hair86,
		[Cosmetic.GloatingNarcissistBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.GloatingNarcissistSeasonalHeart]: SEASON_EMOJIS.LittlePrinceHeart,
		[Cosmetic.EmoteStretch1]: EMOTE_EMOJIS.Stretch,
		[Cosmetic.EmoteStretch2]: EMOTE_EMOJIS.Stretch,
		[Cosmetic.StretchingLamplighterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.StretchingLamplighterHair]: HAIR_EMOJIS.Hair87,
		[Cosmetic.EmoteStretch3]: EMOTE_EMOJIS.Stretch,
		[Cosmetic.EmoteStretch4]: EMOTE_EMOJIS.Stretch,
		[Cosmetic.StretchingLamplighterCape]: CAPE_EMOJIS.Cape61,
		[Cosmetic.StretchingLamplighterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.StretchingLamplighterSeasonalHeart]: SEASON_EMOJIS.LittlePrinceHeart,
		[Cosmetic.EmoteSlouch1]: EMOTE_EMOJIS.Slouch,
		[Cosmetic.EmoteSlouch2]: EMOTE_EMOJIS.Slouch,
		[Cosmetic.SlouchingSoldierBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SlouchingSoldierHair]: HAIR_EMOJIS.Hair85,
		[Cosmetic.EmoteSlouch3]: EMOTE_EMOJIS.Slouch,
		[Cosmetic.EmoteSlouch4]: EMOTE_EMOJIS.Slouch,
		[Cosmetic.SlouchingSoldierBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SlouchingSoldierMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.SlouchingSoldierCape]: CAPE_EMOJIS.Cape60,
		[Cosmetic.SlouchingSoldierBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SlouchingSoldierSeasonalHeart]: SEASON_EMOJIS.LittlePrinceHeart,
		[Cosmetic.EmoteSneeze1]: EMOTE_EMOJIS.Sneeze,
		[Cosmetic.EmoteSneeze2]: EMOTE_EMOJIS.Sneeze,
		[Cosmetic.SneezingGeographerHair]: HAIR_EMOJIS.Hair89,
		[Cosmetic.SneezingGeographerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteSneeze3]: EMOTE_EMOJIS.Sneeze,
		[Cosmetic.EmoteSneeze4]: EMOTE_EMOJIS.Sneeze,
		[Cosmetic.SneezingGeographerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.SneezingGeographerCape]: CAPE_EMOJIS.Cape62,
		[Cosmetic.SneezingGeographerSeasonalHeart]: SEASON_EMOJIS.LittlePrinceHeart,
		[Cosmetic.EmoteHandRub1]: EMOTE_EMOJIS.HandRub,
		[Cosmetic.EmoteHandRub2]: EMOTE_EMOJIS.HandRub,
		[Cosmetic.StarCollectorNecktie]: NECKLACE_EMOJIS.Necklace14,
		[Cosmetic.StarCollectorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteHandRub3]: EMOTE_EMOJIS.HandRub,
		[Cosmetic.EmoteHandRub4]: EMOTE_EMOJIS.HandRub,
		[Cosmetic.StarCollectorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.StarCollectorCape]: CAPE_EMOJIS.Cape59,
		[Cosmetic.StarCollectorProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp12,
		[Cosmetic.StarCollectorBlessing3]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.StarCollectorSeasonalHeart]: SEASON_EMOJIS.LittlePrinceHeart,
		[Cosmetic.SkyAnniversaryHairAccessory2]: HAIR_ACCESSORY_EMOJIS.HairAccessory06,
		[Cosmetic.SkyAnniversaryProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp07,
		[Cosmetic.TheRoseQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheRoseQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheRoseQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ProphetOfWaterProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp20,
		[Cosmetic.ProphetOfWaterWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TheRoseQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DoubleDeckChairs]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13,
		[Cosmetic.SummerHat]: HAIR_ACCESSORY_EMOJIS.HairAccessory07,
		[Cosmetic.SummerUmbrella]: HELD_PROPS_EMOJIS.HeldProp23,
		[Cosmetic.SummerShellHairPin]: HAIR_ACCESSORY_EMOJIS.HairAccessory08,
		[Cosmetic.ChillSunbatherSunlounger]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp14,
		[Cosmetic.ChillSunbatherWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TheRoseQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart6]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheRoseQuest7]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheRoseHeart7]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SwordOutfit]: OUTFIT_EMOJIS.Outfit22,
		[Cosmetic.LittlePrinceAsteroidJacket]: CAPE_EMOJIS.Cape64,
		[Cosmetic.CrabWhispererPipe]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp15,
		[Cosmetic.TroupeJugglerProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp16,
		[Cosmetic.TroupeJugglerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SummerLightsAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory09,
		[Cosmetic.GratefulShellCollectorChairs]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp17,
		[Cosmetic.GratefulShellCollectorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.FlightGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.FlightGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FlightPendant]: NECKLACE_EMOJIS.Necklace15,
		[Cosmetic.FlightGuideUltimateHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory13,
		[Cosmetic.FlightGuideUltimateOutfit]: OUTFIT_EMOJIS.Outfit24,
		[Cosmetic.EmoteNavigate1]: EMOTE_EMOJIS.Navigate,
		[Cosmetic.EmoteNavigate2]: EMOTE_EMOJIS.Navigate,
		[Cosmetic.LivelyNavigatorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LivelyNavigatorHair]: HAIR_EMOJIS.Hair94,
		[Cosmetic.LivelyNavigatorHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory12,
		[Cosmetic.LivelyNavigatorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteNavigate3]: EMOTE_EMOJIS.Navigate,
		[Cosmetic.EmoteNavigate4]: EMOTE_EMOJIS.Navigate,
		[Cosmetic.LivelyNavigatorTrailSpell1]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.LivelyNavigatorCape]: CAPE_EMOJIS.Cape66,
		[Cosmetic.LivelyNavigatorMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.LivelyNavigatorTrailSpell2]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.LivelyNavigatorSeasonalHeart]: SEASON_EMOJIS.FlightHeart,
		[Cosmetic.CallBabyManta]: CALL_EMOJIS.BabyManta,
		[Cosmetic.LightWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LightWhispererHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory10,
		[Cosmetic.LightWhispererHair]: HAIR_EMOJIS.Hair93,
		[Cosmetic.LightWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.LightWhispererTrailSpell1]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.LightWhispererCape]: CAPE_EMOJIS.Cape65,
		[Cosmetic.LightWhispererOutfit]: OUTFIT_EMOJIS.Outfit27,
		[Cosmetic.LightWhispererTrailSpell2]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.LightWhispererSeasonalHeart]: SEASON_EMOJIS.FlightHeart,
		[Cosmetic.StanceTinker]: STANCE_EMOJIS.Tinker,
		[Cosmetic.TinkeringChimesmithBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TinkeringChimesmithOutfit]: OUTFIT_EMOJIS.Outfit26,
		[Cosmetic.TinkeringChimesmithHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory11,
		[Cosmetic.TinkeringChimesmithBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TinkeringChimesmithTrailSpell1]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.TinkeringChimesmithKalimba]: HELD_PROPS_EMOJIS.HeldProp24,
		[Cosmetic.TinkeringChimesmithHair]: HAIR_EMOJIS.Hair92,
		[Cosmetic.TinkeringChimesmithTrailSpell2]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.TinkeringChimesmithSeasonalHeart]: SEASON_EMOJIS.FlightHeart,
		[Cosmetic.EmoteVoilà1]: EMOTE_EMOJIS.Voilà,
		[Cosmetic.EmoteVoilà2]: EMOTE_EMOJIS.Voilà,
		[Cosmetic.TalentedBuilderBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.TalentedBuilderMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.TalentedBuilderNeckAccessory]: NECKLACE_EMOJIS.Necklace16,
		[Cosmetic.TalentedBuilderBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteVoilà3]: EMOTE_EMOJIS.Voilà,
		[Cosmetic.EmoteVoilà4]: EMOTE_EMOJIS.Voilà,
		[Cosmetic.TalentedBuilderTrailSpell1]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.TalentedBuilderOutfit]: OUTFIT_EMOJIS.Outfit25,
		[Cosmetic.TalentedBuilderHair]: HAIR_EMOJIS.Hair91,
		[Cosmetic.TalentedBuilderTrailSpell2]: MISCELLANEOUS_EMOJIS.SpellColourTrail,
		[Cosmetic.TalentedBuilderSeasonalHeart]: SEASON_EMOJIS.FlightHeart,
		[Cosmetic.FestivalSpinDancerProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp18,
		[Cosmetic.FlightGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.FlightGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FlightGuideHighFive]: FRIEND_ACTION_EMOJIS.HighFive,
		[Cosmetic.MischiefWitchHair]: HAIR_EMOJIS.Hair95,
		[Cosmetic.MischiefWitheredCape]: CAPE_EMOJIS.Cape67,
		[Cosmetic.MischiefSpookyDiningSet]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp19,
		[Cosmetic.MischiefWitchJumper]: OUTFIT_EMOJIS.Outfit28,
		[Cosmetic.MischiefWitheredAntlers]: HEAD_ACCESSORY_EMOJIS.HeadAccessory06,
		[Cosmetic.MischiefSpiderQuiff]: HAIR_EMOJIS.Hair96,
		[Cosmetic.MischiefPumpkinProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp08,
		[Cosmetic.PlayfightingHerbalistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PlayfightingHerbalistOrb]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp20,
		[Cosmetic.FlightGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.FlightGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.WiseGrandparentProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp09,
		[Cosmetic.FlightGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.FlightGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DreamsGuideFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.ProphecyGuideFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.JellyWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.JellyWhispererUmbrella]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp21,
		[Cosmetic.FlightGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.FlightGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FlightGuideFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.ProphetOfFireWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ProphetOfFireCauldron]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp22,
		[Cosmetic.OdeToJoyMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.WinterFeastPillow]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp10,
		[Cosmetic.WinterFeastScarf]: NECKLACE_EMOJIS.Necklace17,
		[Cosmetic.WinterFeastHat]: HAIR_EMOJIS.Hair97,
		[Cosmetic.SnowflakeHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory14,
		[Cosmetic.WinterAncestorCape]: CAPE_EMOJIS.Cape68,
		[Cosmetic.WinterFeastSnowGlobe]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp11,
		[Cosmetic.SparklerParentPinwheel]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp12,
		[Cosmetic.ProphetOfEarthProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp13,
		[Cosmetic.ProphetOfEarthWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AbyssGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AbyssGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AbyssGuidePendant]: NECKLACE_EMOJIS.Necklace18,
		[Cosmetic.AbyssGuideUltimateHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory07,
		[Cosmetic.AbyssGuideUltimateCape]: CAPE_EMOJIS.Cape73,
		[Cosmetic.AbyssGuideUltimateMask]: MASK_EMOJIS.Mask55,
		[Cosmetic.EmoteAnxious1]: EMOTE_EMOJIS.Anxious,
		[Cosmetic.EmoteAnxious2]: EMOTE_EMOJIS.Anxious,
		[Cosmetic.AnxiousAnglerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.AnxiousAnglerMask]: MASK_EMOJIS.Mask57,
		[Cosmetic.AnxiousAnglerHair]: HAIR_EMOJIS.Hair100,
		[Cosmetic.AnxiousAnglerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteAnxious3]: EMOTE_EMOJIS.Anxious,
		[Cosmetic.EmoteAnxious4]: EMOTE_EMOJIS.Anxious,
		[Cosmetic.AnxiousAnglerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AnxiousAnglerCape]: CAPE_EMOJIS.Cape71,
		[Cosmetic.AnxiousAnglerOutfit]: OUTFIT_EMOJIS.Outfit29,
		[Cosmetic.AnxiousAnglerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AnxiousAnglerSeasonalHeart]: SEASON_EMOJIS.AbyssHeart,
		[Cosmetic.EmoteCalmDown1]: EMOTE_EMOJIS.CalmDown,
		[Cosmetic.EmoteCalmDown2]: EMOTE_EMOJIS.CalmDown,
		[Cosmetic.CeasingCommodoreBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CeasingCommodoreHair]: HAIR_EMOJIS.Hair99,
		[Cosmetic.CeasingCommodoreMask]: MASK_EMOJIS.Mask53,
		[Cosmetic.CeasingCommodoreBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteCalmDown3]: EMOTE_EMOJIS.CalmDown,
		[Cosmetic.EmoteCalmDown4]: EMOTE_EMOJIS.CalmDown,
		[Cosmetic.CeasingCommodoreCape]: CAPE_EMOJIS.Cape69,
		[Cosmetic.CeasingCommodoreBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CeasingCommodoreSeasonalHeart]: SEASON_EMOJIS.AbyssHeart,
		[Cosmetic.EmoteOuch1]: EMOTE_EMOJIS.Ouch,
		[Cosmetic.EmoteOuch2]: EMOTE_EMOJIS.Ouch,
		[Cosmetic.BumblingBoatswainBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.BumblingBoatswainMask]: MASK_EMOJIS.Mask52,
		[Cosmetic.BumblingBoatswainMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.BumblingBoatswainBlessing2]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.EmoteOuch3]: EMOTE_EMOJIS.Ouch,
		[Cosmetic.EmoteOuch4]: EMOTE_EMOJIS.Ouch,
		[Cosmetic.BumblingBoatswainBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.BumblingBoatswainCape]: CAPE_EMOJIS.Cape72,
		[Cosmetic.BumblingBoatswainHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory15,
		[Cosmetic.BumblingBoatswainBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.BumblingBoatswainSeasonalHeart]: SEASON_EMOJIS.AbyssHeart,
		[Cosmetic.EmoteEvilLaugh1]: EMOTE_EMOJIS.EvilLaugh,
		[Cosmetic.EmoteEvilLaugh2]: EMOTE_EMOJIS.EvilLaugh,
		[Cosmetic.CacklingCannoneerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing2,
		[Cosmetic.CacklingCannoneerMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.CacklingCannoneerMask]: MASK_EMOJIS.Mask54,
		[Cosmetic.CacklingCannoneerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteEvilLaugh3]: EMOTE_EMOJIS.EvilLaugh,
		[Cosmetic.EmoteEvilLaugh4]: EMOTE_EMOJIS.EvilLaugh,
		[Cosmetic.CacklingCannoneerCape]: CAPE_EMOJIS.Cape70,
		[Cosmetic.CacklingCannoneerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CacklingCannoneerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CacklingCannoneerHair]: HAIR_EMOJIS.Hair98,
		[Cosmetic.CacklingCannoneerSeasonalHeart]: SEASON_EMOJIS.AbyssHeart,
		[Cosmetic.AbyssGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AbyssGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DaysOfFortuneTigerMask]: MASK_EMOJIS.Mask58,
		[Cosmetic.DaysOfFortuneFishCape]: CAPE_EMOJIS.Cape74,
		[Cosmetic.DaysOfFortuneFishHood]: HAIR_EMOJIS.Hair101,
		[Cosmetic.DaysOfFortuneFishAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory16,
		[Cosmetic.AbyssGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AbyssGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.DaysOfLoveFlowerCrown]: HAIR_ACCESSORY_EMOJIS.HairAccessory17,
		[Cosmetic.DaysOfLoveGondola]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp14,
		[Cosmetic.AbyssGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AbyssGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HikingGrouchWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.KizunaAIHair]: HAIR_EMOJIS.Hair102,
		[Cosmetic.KizunaAIBow]: HAIR_ACCESSORY_EMOJIS.HairAccessory18,
		[Cosmetic.KizunaAICape]: CAPE_EMOJIS.Cape75,
		[Cosmetic.AbyssGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AbyssGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AbyssGuideMask]: MASK_EMOJIS.Mask56,
		[Cosmetic.PurpleBloomCape]: CAPE_EMOJIS.Cape76,
		[Cosmetic.PurpleBloomTeaset]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp23,
		[Cosmetic.ScarecrowFarmerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MemoryWhispererWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MemoryWhispererCape2]: CAPE_EMOJIS.Cape77,
		[Cosmetic.PerformanceGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PerformanceGuideSharedMemorySpell1]: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
		[Cosmetic.PerformanceGuidePendant]: NECKLACE_EMOJIS.Necklace19,
		[Cosmetic.PerformanceGuideUltimateMask]: MASK_EMOJIS.Mask59,
		[Cosmetic.PerformanceGuideUltimateCape]: CAPE_EMOJIS.Cape78,
		[Cosmetic.PerformanceGuideUltimateHair]: HAIR_EMOJIS.Hair103,
		[Cosmetic.PerformanceGuideHighFive]: FRIEND_ACTION_EMOJIS.HighFive,
		[Cosmetic.PerformanceGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FriendActionHandshake1]: FRIEND_ACTION_EMOJIS.Handshake,
		[Cosmetic.FranticStagehandBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FranticStagehandHood]: HAIR_EMOJIS.Hair105,
		[Cosmetic.FranticStagehandMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.FranticStagehandBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FranticStagehandBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FriendActionHandshake2]: FRIEND_ACTION_EMOJIS.Handshake,
		[Cosmetic.FranticStagehandMask]: MASK_EMOJIS.Mask61,
		[Cosmetic.FranticStagehandOutfit]: OUTFIT_EMOJIS.Outfit31,
		[Cosmetic.FranticStagehandSeasonalHeart]: SEASON_EMOJIS.PerformanceHeart,
		[Cosmetic.EmoteAww1]: EMOTE_EMOJIS.Aww,
		[Cosmetic.EmoteAww2]: EMOTE_EMOJIS.Aww,
		[Cosmetic.ForgetfulStorytellerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ForgetfulStorytellerMask]: MASK_EMOJIS.Mask63,
		[Cosmetic.ForgetfulStorytellerHair]: HAIR_EMOJIS.Hair106,
		[Cosmetic.ForgetfulStorytellerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteAww3]: EMOTE_EMOJIS.Aww,
		[Cosmetic.EmoteAww4]: EMOTE_EMOJIS.Aww,
		[Cosmetic.ForgetfulStorytellerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ForgetfulStorytellerOutfit]: OUTFIT_EMOJIS.Outfit32,
		[Cosmetic.ForgetfulStorytellerCape]: CAPE_EMOJIS.Cape79,
		[Cosmetic.ForgetfulStorytellerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ForgetfulStorytellerSeasonalHeart]: SEASON_EMOJIS.PerformanceHeart,
		[Cosmetic.EmoteHeadbob1]: EMOTE_EMOJIS.Headbob,
		[Cosmetic.EmoteHeadbob2]: EMOTE_EMOJIS.Headbob,
		[Cosmetic.MellowMusicianMask]: MASK_EMOJIS.Mask64,
		[Cosmetic.MellowMusicianBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MellowMusicianBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MellowMusicianCape]: CAPE_EMOJIS.Cape80,
		[Cosmetic.EmoteHeadbob3]: EMOTE_EMOJIS.Headbob,
		[Cosmetic.EmoteHeadbob4]: EMOTE_EMOJIS.Headbob,
		[Cosmetic.MellowMusicianBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MellowMusicianElectricGuitar]: HELD_PROPS_EMOJIS.HeldProp25,
		[Cosmetic.MellowMusicianHair]: HAIR_EMOJIS.Hair107,
		[Cosmetic.MellowMusicianBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MellowMusicianSeasonalHeart]: SEASON_EMOJIS.PerformanceHeart,
		[Cosmetic.FriendActionDuetDance1]: FRIEND_ACTION_EMOJIS.DuetDance,
		[Cosmetic.ModestDancerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ModestDancerMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.ModestDancerMask]: MASK_EMOJIS.Mask60,
		[Cosmetic.ModestDancerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ModestDancerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FriendActionDuetDance2]: FRIEND_ACTION_EMOJIS.DuetDance,
		[Cosmetic.ModestDancerOutfit]: OUTFIT_EMOJIS.Outfit30,
		[Cosmetic.ModestDancerHair]: HAIR_EMOJIS.Hair104,
		[Cosmetic.ModestDancerSeasonalHeart]: SEASON_EMOJIS.PerformanceHeart,
		[Cosmetic.SpinningMentorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.NatureCoralCrown]: HAIR_ACCESSORY_EMOJIS.HairAccessory19,
		[Cosmetic.NatureTurtleCape]: CAPE_EMOJIS.Cape81,
		[Cosmetic.NatureShoulderTurtle]: NECKLACE_EMOJIS.Necklace20,
		[Cosmetic.PerformanceGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PerformanceGuideMask]: MASK_EMOJIS.Mask62,
		[Cosmetic.DaydreamForesterWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PerformanceGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PerformanceGuideSharedMemorySpell2]: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
		[Cosmetic.PerformanceGuideDoubleFive]: FRIEND_ACTION_EMOJIS.DoubleFive,
		[Cosmetic.PerformanceGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ProphetOfAirProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp15,
		[Cosmetic.ProphetOfAirWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PerformanceGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PerformanceGuideSharedMemorySpell3]: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
		[Cosmetic.FriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.PerformanceGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HarmonyHallGrandOpeningHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory20,
		[Cosmetic.HarmonyHallMusicSheet1]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.HarmonyHallMusicSheet2]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.HarmonyHallMusicSheet3]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.HarmonyHallMusicSheet4]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.FledglingHarp]: HELD_PROPS_EMOJIS.HeldProp26,
		[Cosmetic.RhythmGuitar]: HELD_PROPS_EMOJIS.HeldProp27,
		[Cosmetic.TriumphHandpan]: HELD_PROPS_EMOJIS.HeldProp28,
		[Cosmetic.PerformanceGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PerformanceGuideSharedMemorySpell4]: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
		[Cosmetic.PerformanceGuideDuetDance]: FRIEND_ACTION_EMOJIS.DuetDance,
		[Cosmetic.PerformanceGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PerformanceGuideFlowerPot]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp24,
		[Cosmetic.PeekingPostmanWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.StealthySurvivorWingBuff2]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.StealthySurvivorCape2]: CAPE_EMOJIS.Cape82,
		[Cosmetic.RainbowTrousers]: OUTFIT_EMOJIS.Outfit33,
		[Cosmetic.RainbowEarring]: HEAD_ACCESSORY_EMOJIS.HeadAccessory08,
		[Cosmetic.RainbowHeadphones]: HEAD_ACCESSORY_EMOJIS.HeadAccessory09,
		[Cosmetic.RainbowDoubleFlower]: HAIR_ACCESSORY_EMOJIS.HairAccessory21,
		[Cosmetic.TheVoidofShatteringQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheVoidofShatteringHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ShatteringPendant]: NECKLACE_EMOJIS.Necklace21,
		[Cosmetic.TheVoidofShatteringMantaCape]: CAPE_EMOJIS.Cape87,
		[Cosmetic.TheVoidofShatteringDarkDragonCape]: CAPE_EMOJIS.Cape84,
		[Cosmetic.AncientLightJellyfishHair]: HAIR_EMOJIS.Hair110,
		[Cosmetic.AncientLightJellyfishBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightJellyfishBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightJellyfishHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory23,
		[Cosmetic.AncientLightJellyfishCape]: CAPE_EMOJIS.Cape85,
		[Cosmetic.AncientLightJellyfishBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightJellyfishSeasonalHeart]: SEASON_EMOJIS.ShatteringHeart,
		[Cosmetic.AncientLightMantaMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.AncientLightMantaBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightMantaBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightMantaHair]: HAIR_EMOJIS.Hair109,
		[Cosmetic.AncientLightMantaCape]: CAPE_EMOJIS.Cape86,
		[Cosmetic.AncientLightMantaBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightMantaBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientLightMantaOutfit]: OUTFIT_EMOJIS.Outfit34,
		[Cosmetic.AncientLightMantaSeasonalHeart]: SEASON_EMOJIS.ShatteringHeart,
		[Cosmetic.AncientDarknessPlantHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory22,
		[Cosmetic.AncientDarknessPlantBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessPlantBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessPlantMask]: MASK_EMOJIS.Mask65,
		[Cosmetic.AncientDarknessPlantMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.AncientDarknessPlantBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessPlantBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessPlantCape]: CAPE_EMOJIS.Cape83,
		[Cosmetic.AncientDarknessPlantSeasonalHeart]: SEASON_EMOJIS.ShatteringHeart,
		[Cosmetic.AncientDarknessDragonNeckAccessory]: NECKLACE_EMOJIS.Necklace22,
		[Cosmetic.AncientDarknessDragonBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessDragonBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessDragonDarkHorn]: HELD_PROPS_EMOJIS.HeldProp29,
		[Cosmetic.AncientDarknessDragonHair]: HAIR_EMOJIS.Hair108,
		[Cosmetic.AncientDarknessDragonBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AncientDarknessDragonSeasonalHeart]: SEASON_EMOJIS.ShatteringHeart,
		[Cosmetic.SkyAnniversaryHairAccessory3]: HAIR_ACCESSORY_EMOJIS.HairAccessory24,
		[Cosmetic.HappyBirthdayMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.Balloon]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp16,
		[Cosmetic.LightFence]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp26,
		[Cosmetic.ConfettiLauncher]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp17,
		[Cosmetic.TGCGuitar]: HELD_PROPS_EMOJIS.HeldProp30,
		[Cosmetic.TheVoidofShatteringQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheVoidofShatteringHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheVoidofShatteringQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheVoidofShatteringHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ElderOfTheIsleFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory09,
		[Cosmetic.ElderOfThePrairieFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory10,
		[Cosmetic.ElderOfTheForestFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory11,
		[Cosmetic.ScoldingStudentWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TheVoidofShatteringQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheVoidofShatteringHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CampfireTent]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp25,
		[Cosmetic.JellyShoulderBuddy]: NECKLACE_EMOJIS.Necklace23,
		[Cosmetic.CampfireSnackKit]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp18,
		[Cosmetic.TheVoidofShatteringQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheVoidofShatteringHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheVoidofShatteringQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheVoidofShatteringHeart6]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BeckoningRulerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RunawayHairstyle]: HAIR_EMOJIS.Hair115,
		[Cosmetic.TiaraWeCanTouch]: HEAD_ACCESSORY_EMOJIS.HeadAccessory10,
		[Cosmetic.RunawayOutfit]: OUTFIT_EMOJIS.Outfit39,
		[Cosmetic.AURORAQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EmoteSilentClap2]: EMOTE_EMOJIS.SilentClap,
		[Cosmetic.AURORAPendant]: NECKLACE_EMOJIS.Necklace24,
		[Cosmetic.AURORAAuroraHair]: HAIR_EMOJIS.Hair116,
		[Cosmetic.AURORAUltimateOutfit]: OUTFIT_EMOJIS.Outfit36,
		[Cosmetic.AURORAUltimateCape]: CAPE_EMOJIS.Cape92,
		[Cosmetic.EmoteSilentClap1]: EMOTE_EMOJIS.SilentClap,
		[Cosmetic.EmoteSilentClap3]: EMOTE_EMOJIS.SilentClap,
		[Cosmetic.EmoteSilentClap4]: EMOTE_EMOJIS.SilentClap,
		[Cosmetic.EmoteWavingLight1]: EMOTE_EMOJIS.WavingLight,
		[Cosmetic.EmoteWavingLight2]: EMOTE_EMOJIS.WavingLight,
		[Cosmetic.RunningWayfarerMask]: MASK_EMOJIS.Mask67,
		[Cosmetic.RunningWayfarerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RunningWayfarerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RunningWayfarerHair]: HAIR_EMOJIS.Hair112,
		[Cosmetic.EmoteWavingLight3]: EMOTE_EMOJIS.WavingLight,
		[Cosmetic.EmoteWavingLight4]: EMOTE_EMOJIS.WavingLight,
		[Cosmetic.RunningWayfarerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RunningWayfarerMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.RunningWayfarerCape]: CAPE_EMOJIS.Cape89,
		[Cosmetic.RunningWayfarerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RunningWayfarerSeasonalHeart]: SEASON_EMOJIS.AuroraHeart,
		[Cosmetic.EmoteRaiseTheRoof1]: EMOTE_EMOJIS.RaiseTheRoof,
		[Cosmetic.EmoteRaiseTheRoof2]: EMOTE_EMOJIS.RaiseTheRoof,
		[Cosmetic.MindfulMinerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MindfulMinerMask]: MASK_EMOJIS.Mask69,
		[Cosmetic.EmoteRaiseTheRoof3]: EMOTE_EMOJIS.RaiseTheRoof,
		[Cosmetic.EmoteRaiseTheRoof4]: EMOTE_EMOJIS.RaiseTheRoof,
		[Cosmetic.MindfulMinerHair]: HAIR_EMOJIS.Hair114,
		[Cosmetic.MindfulMinerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MindfulMinerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MindfulMinerOutfit]: OUTFIT_EMOJIS.Outfit35,
		[Cosmetic.MindfulMinerCape]: CAPE_EMOJIS.Cape91,
		[Cosmetic.MindfulMinerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MindfulMinerSeasonalHeart]: SEASON_EMOJIS.AuroraHeart,
		[Cosmetic.EmoteTwirl1]: EMOTE_EMOJIS.Twirl,
		[Cosmetic.EmoteTwirl2]: EMOTE_EMOJIS.Twirl,
		[Cosmetic.WarriorOfLoveMask]: MASK_EMOJIS.Mask68,
		[Cosmetic.WarriorOfLoveBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WarriorOfLoveBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WarriorOfLoveHair]: HAIR_EMOJIS.Hair113,
		[Cosmetic.EmoteTwirl3]: EMOTE_EMOJIS.Twirl,
		[Cosmetic.EmoteTwirl4]: EMOTE_EMOJIS.Twirl,
		[Cosmetic.WarriorOfLoveMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.WarriorOfLoveBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WarriorOfLoveBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WarriorOfLoveCape]: CAPE_EMOJIS.Cape90,
		[Cosmetic.WarriorOfLoveSeasonalHeart]: SEASON_EMOJIS.AuroraHeart,
		[Cosmetic.EmoteRhythmicClap1]: EMOTE_EMOJIS.RhythmicClap,
		[Cosmetic.EmoteRhythmicClap2]: EMOTE_EMOJIS.RhythmicClap,
		[Cosmetic.SeedOfHopeBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SeedOfHopeMask]: MASK_EMOJIS.Mask66,
		[Cosmetic.SeedOfHopeMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.SeedOfHopeBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteRhythmicClap3]: EMOTE_EMOJIS.RhythmicClap,
		[Cosmetic.EmoteRhythmicClap4]: EMOTE_EMOJIS.RhythmicClap,
		[Cosmetic.SeedOfHopeHair]: HAIR_EMOJIS.Hair111,
		[Cosmetic.SeedOfHopeBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SeedOfHopeBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SeedOfHopeCape]: CAPE_EMOJIS.Cape88,
		[Cosmetic.SeedOfHopeSeasonalHeart]: SEASON_EMOJIS.AuroraHeart,
		[Cosmetic.MischiefTuftedHair]: HAIR_EMOJIS.Hair117,
		[Cosmetic.FelineFamiliarProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp19,
		[Cosmetic.CatCostumeMask]: MASK_EMOJIS.Mask71,
		[Cosmetic.CatCostumeCape]: CAPE_EMOJIS.Cape93,
		[Cosmetic.AURORAQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EmoteConduct1]: EMOTE_EMOJIS.Conduct,
		[Cosmetic.EmoteConduct2]: EMOTE_EMOJIS.Conduct,
		[Cosmetic.EmoteConduct3]: EMOTE_EMOJIS.Conduct,
		[Cosmetic.EmoteConduct4]: EMOTE_EMOJIS.Conduct,
		[Cosmetic.AURORAQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AURORAHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.EmoteSkipping1]: EMOTE_EMOJIS.Skipping,
		[Cosmetic.EmoteSkipping2]: EMOTE_EMOJIS.Skipping,
		[Cosmetic.EmoteSkipping3]: EMOTE_EMOJIS.Skipping,
		[Cosmetic.EmoteSkipping4]: EMOTE_EMOJIS.Skipping,
		[Cosmetic.BearhugHermitWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.VoiceOfAURORA]: HELD_PROPS_EMOJIS.HeldProp31,
		[Cosmetic.AURORAQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AURORAMusicSheet1]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.JourneyCape]: CAPE_EMOJIS.Cape94,
		[Cosmetic.JourneyHood]: HAIR_EMOJIS.Hair118,
		[Cosmetic.JourneyMask]: MASK_EMOJIS.Mask72,
		[Cosmetic.GivingInCape]: CAPE_EMOJIS.Cape95,
		[Cosmetic.ToTheLoveOutfit]: OUTFIT_EMOJIS.Outfit38,
		[Cosmetic.AURORAQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.AURORAMusicSheet2]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.AURORAOutfit]: OUTFIT_EMOJIS.Outfit37,
		[Cosmetic.AURORAMask]: MASK_EMOJIS.Mask70,
		[Cosmetic.WingsOfAURORA]: CAPE_EMOJIS.Cape96,
		[Cosmetic.FeastGoggles]: FACE_ACCESSORY_EMOJIS.FaceAccessory12,
		[Cosmetic.SnowkidProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp27,
		[Cosmetic.TournamentSkyballSet]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp21,
		[Cosmetic.CosyHermitCape]: CAPE_EMOJIS.Cape97,
		[Cosmetic.BaffledBotanistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AssemblyGuideSharedSpaceSpell]: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
		[Cosmetic.RemembranceGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RemembrancePendant]: NECKLACE_EMOJIS.Necklace25,
		[Cosmetic.RemembranceGuideUltimateNeckAccessory]: NECKLACE_EMOJIS.Necklace27,
		[Cosmetic.RemembranceGuideUltimateProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp30,
		[Cosmetic.RemembranceGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideChimes]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp22,
		[Cosmetic.RemembranceGuideHighFive]: FRIEND_ACTION_EMOJIS.HighFive,
		[Cosmetic.RemembranceGuideSharedSpaceSpell1]: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
		[Cosmetic.EmoteGrieving1]: EMOTE_EMOJIS.Grieving,
		[Cosmetic.EmoteGrieving2]: EMOTE_EMOJIS.Grieving,
		[Cosmetic.BereftVeteranMask]: MASK_EMOJIS.Mask73,
		[Cosmetic.BereftVeteranBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.BereftVeteranBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.BereftVeteranHair]: HAIR_EMOJIS.Hair120,
		[Cosmetic.EmoteGrieving3]: EMOTE_EMOJIS.Grieving,
		[Cosmetic.EmoteGrieving4]: EMOTE_EMOJIS.Grieving,
		[Cosmetic.BereftVeteranCape]: CAPE_EMOJIS.Cape98,
		[Cosmetic.BereftVeteranBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.BereftVeteranSeasonalHeart]: SEASON_EMOJIS.RemembranceHeart,
		[Cosmetic.EmotePleading1]: EMOTE_EMOJIS.Pleading,
		[Cosmetic.EmotePleading2]: EMOTE_EMOJIS.Pleading,
		[Cosmetic.PleadingChildNeckAccessory]: NECKLACE_EMOJIS.Necklace26,
		[Cosmetic.PleadingChildBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PleadingChildBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PleadingChildHair]: HAIR_EMOJIS.Hair119,
		[Cosmetic.EmotePleading3]: EMOTE_EMOJIS.Pleading,
		[Cosmetic.EmotePleading4]: EMOTE_EMOJIS.Pleading,
		[Cosmetic.PleadingChildOutfit]: OUTFIT_EMOJIS.Outfit40,
		[Cosmetic.PleadingChildBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PleadingChildSeasonalHeart]: SEASON_EMOJIS.RemembranceHeart,
		[Cosmetic.EmoteTiptoeing1]: EMOTE_EMOJIS.Tiptoeing,
		[Cosmetic.EmoteTiptoeing2]: EMOTE_EMOJIS.Tiptoeing,
		[Cosmetic.TiptoeingTeaBrewerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TiptoeingTeaBrewerHair]: HAIR_EMOJIS.Hair121,
		[Cosmetic.EmoteTiptoeing3]: EMOTE_EMOJIS.Tiptoeing,
		[Cosmetic.EmoteTiptoeing4]: EMOTE_EMOJIS.Tiptoeing,
		[Cosmetic.TiptoeingTeaBrewerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TiptoeingTeaBrewerOutfit]: OUTFIT_EMOJIS.Outfit42,
		[Cosmetic.TiptoeingTeaBrewerCape]: CAPE_EMOJIS.Cape100,
		[Cosmetic.TiptoeingTeaBrewerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TiptoeingTeaBrewerSeasonalHeart]: SEASON_EMOJIS.RemembranceHeart,
		[Cosmetic.StanceInjured]: STANCE_EMOJIS.Injured,
		[Cosmetic.WoundedWarriorBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WoundedWarriorMask]: MASK_EMOJIS.Mask74,
		[Cosmetic.WoundedWarriorOutfit]: OUTFIT_EMOJIS.Outfit41,
		[Cosmetic.WoundedWarriorBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WoundedWarriorBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WoundedWarriorCape]: CAPE_EMOJIS.Cape99,
		[Cosmetic.WoundedWarriorSeasonalHeart]: SEASON_EMOJIS.RemembranceHeart,
		[Cosmetic.DaysOfFortuneRabbitMask]: MASK_EMOJIS.Mask75,
		[Cosmetic.DaysOfFortuneMuralistsSmock]: OUTFIT_EMOJIS.Outfit43,
		[Cosmetic.DaysOfFortuneEnchantedUmbrella]: HELD_PROPS_EMOJIS.HeldProp32,
		[Cosmetic.RemembranceGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RemembranceGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideKettle]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp29,
		[Cosmetic.RemembranceGuideDoubleFive]: FRIEND_ACTION_EMOJIS.DoubleFive,
		[Cosmetic.RemembranceGuideSharedSpaceSpell2]: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
		[Cosmetic.RemembranceGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RemembranceGuideQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuidePottedPlant]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp28,
		[Cosmetic.DaysOfLoveFloweryArchway]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp31,
		[Cosmetic.DaysOfLoveClassyCravat]: NECKLACE_EMOJIS.Necklace28,
		[Cosmetic.DaysOfLoveSerendipitousSceptre]: HELD_PROPS_EMOJIS.HeldProp33,
		[Cosmetic.SlouchingSoldierWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RemembranceGuideQuest7]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RemembranceGuideQuest8]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideCrabPlushie]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp23,
		[Cosmetic.RemembranceGuideMantaPlushie]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp24,
		[Cosmetic.RemembranceGuideFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.RemembranceGuideSharedSpaceSpell3]: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
		[Cosmetic.ScaredyCadetWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MarchingAdventurerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ChucklingScoutWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RemembranceGuideQuest9]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RemembranceGuideSharedSpaceSpell4]: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
		[Cosmetic.RemembranceGuideQuest10]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RedBloomCape]: CAPE_EMOJIS.Cape101,
		[Cosmetic.BloomButterflyFountain]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp25,
		[Cosmetic.BloomGardeningTunic]: OUTFIT_EMOJIS.Outfit44,
		[Cosmetic.BloomPicnicBasket]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp32,
		[Cosmetic.SneezingGeographerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PassageGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PassageGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PassagePendant]: NECKLACE_EMOJIS.Necklace29,
		[Cosmetic.PassageGuideUltimateMask]: MASK_EMOJIS.Mask76,
		[Cosmetic.PassageGuideUltimateCape]: CAPE_EMOJIS.Cape104,
		[Cosmetic.EmoteHackySack1]: EMOTE_EMOJIS.HackySack,
		[Cosmetic.EmoteHackySack2]: EMOTE_EMOJIS.HackySack,
		[Cosmetic.OddballOutcastHair]: HAIR_EMOJIS.Hair125,
		[Cosmetic.OddballOutcastBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.OddballOutcastBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.OddballOutcastNeckAccessory]: NECKLACE_EMOJIS.Necklace30,
		[Cosmetic.EmoteHackySack3]: EMOTE_EMOJIS.HackySack,
		[Cosmetic.EmoteHackySack4]: EMOTE_EMOJIS.HackySack,
		[Cosmetic.OddballOutcastOutfit]: OUTFIT_EMOJIS.Outfit46,
		[Cosmetic.OddballOutcastBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.OddballOutcastSeasonalHeart]: SEASON_EMOJIS.PassageHeart,
		[Cosmetic.EmoteSomersault1]: EMOTE_EMOJIS.Somersault,
		[Cosmetic.EmoteSomersault2]: EMOTE_EMOJIS.Somersault,
		[Cosmetic.TumblingTroublemakerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TumblingTroublemakerHair]: HAIR_EMOJIS.Hair122,
		[Cosmetic.EmoteSomersault3]: EMOTE_EMOJIS.Somersault,
		[Cosmetic.EmoteSomersault4]: EMOTE_EMOJIS.Somersault,
		[Cosmetic.TumblingTroublemakerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TumblingTroublemakerCape]: CAPE_EMOJIS.Cape102,
		[Cosmetic.TumblingTroublemakerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TumblingTroublemakerHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory12,
		[Cosmetic.TumblingTroublemakerSeasonalHeart]: SEASON_EMOJIS.PassageHeart,
		[Cosmetic.EmoteMoping1]: EMOTE_EMOJIS.Moping,
		[Cosmetic.EmoteMoping2]: EMOTE_EMOJIS.Moping,
		[Cosmetic.MelancholyMopeHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory11,
		[Cosmetic.MelancholyMopeBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MelancholyMopeBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MelancholyMopeHair]: HAIR_EMOJIS.Hair123,
		[Cosmetic.EmoteMoping3]: EMOTE_EMOJIS.Moping,
		[Cosmetic.EmoteMoping4]: EMOTE_EMOJIS.Moping,
		[Cosmetic.MelancholyMopeOutfit]: OUTFIT_EMOJIS.Outfit45,
		[Cosmetic.MelancholyMopeBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MelancholyMopeSeasonalHeart]: SEASON_EMOJIS.PassageHeart,
		[Cosmetic.EmotePullUp1]: EMOTE_EMOJIS.PullUp,
		[Cosmetic.EmotePullUp2]: EMOTE_EMOJIS.PullUp,
		[Cosmetic.OveractiveOverachieverBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.OveractiveOverachieverMantaOcarina]: HELD_PROPS_EMOJIS.HeldProp34,
		[Cosmetic.EmotePullUp3]: EMOTE_EMOJIS.PullUp,
		[Cosmetic.EmotePullUp4]: EMOTE_EMOJIS.PullUp,
		[Cosmetic.OveractiveOverachieverCape]: CAPE_EMOJIS.Cape103,
		[Cosmetic.OveractiveOverachieverBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.OveractiveOverachieverBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.OveractiveOverachieverHair]: HAIR_EMOJIS.Hair124,
		[Cosmetic.OveractiveOverachieverSeasonalHeart]: SEASON_EMOJIS.PassageHeart,
		[Cosmetic.NatureSchoolCape]: CAPE_EMOJIS.Cape105,
		[Cosmetic.NatureGlasses]: FACE_ACCESSORY_EMOJIS.FaceAccessory13,
		[Cosmetic.NatureSonorousSeashell]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp27,
		[Cosmetic.PassageGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PassageGuideSerowMask]: MASK_EMOJIS.Mask77,
		[Cosmetic.TinkeringChimesmithWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PassageGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PassageGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PassageGuideBoarMask]: MASK_EMOJIS.Mask78,
		[Cosmetic.PassageGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PassageGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PassageGuideMonkeyMask]: MASK_EMOJIS.Mask79,
		[Cosmetic.DarkRainbowCape]: CAPE_EMOJIS.Cape106,
		[Cosmetic.DarkRainbowEarrings]: HEAD_ACCESSORY_EMOJIS.HeadAccessory13,
		[Cosmetic.DarkRainbowTunic]: OUTFIT_EMOJIS.Outfit47,
		[Cosmetic.PassageGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.PassageGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PassageGuideHackySack]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp26,
		[Cosmetic.PassageGuideRacoonMask]: MASK_EMOJIS.Mask80,
		[Cosmetic.DaysOfMusicMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.TriumphSaxophone]: HELD_PROPS_EMOJIS.HeldProp36,
		[Cosmetic.MarchingBandHat]: HAIR_EMOJIS.Hair126,
		[Cosmetic.TriumphViolin]: HELD_PROPS_EMOJIS.HeldProp35,
		[Cosmetic.MomentsGuideCamera]: HELD_PROPS_EMOJIS.HeldProp38,
		[Cosmetic.MomentsPendant]: NECKLACE_EMOJIS.Necklace31,
		[Cosmetic.MomentsGuideUltimateFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory15,
		[Cosmetic.MomentsGuideUltimateCamera]: HELD_PROPS_EMOJIS.HeldProp37,
		[Cosmetic.MomentsGuideUltimateHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory27,
		[Cosmetic.MomentsGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MomentsGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FriendActionSideHug1]: FRIEND_ACTION_EMOJIS.SideHug,
		[Cosmetic.FriendActionSideHug2]: FRIEND_ACTION_EMOJIS.SideHug,
		[Cosmetic.ReassuringRangerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ReassuringRangerFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory14,
		[Cosmetic.ReassuringRangerMask]: MASK_EMOJIS.Mask81,
		[Cosmetic.ReassuringRangerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ReassuringRangerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ReassuringRangerCape]: CAPE_EMOJIS.Cape107,
		[Cosmetic.ReassuringRangerHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory25,
		[Cosmetic.ReassuringRangerBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ReassuringRangerSeasonalHeart]: SEASON_EMOJIS.MomentsHeart,
		[Cosmetic.CallNightbird]: CALL_EMOJIS.Nightbird,
		[Cosmetic.NightbirdWhispererHair]: HAIR_EMOJIS.Hair127,
		[Cosmetic.NightbirdWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NightbirdWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NightbirdWhispererHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory26,
		[Cosmetic.NightbirdWhispererOutfit]: OUTFIT_EMOJIS.Outfit49,
		[Cosmetic.NightbirdWhispererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NightbirdWhispererBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NightbirdWhispererShoes]: SHOE_EMOJIS.Shoe04,
		[Cosmetic.NightbirdWhispererSeasonalHeart]: SEASON_EMOJIS.MomentsHeart,
		[Cosmetic.EmoteJollyDance1]: EMOTE_EMOJIS.JollyDance,
		[Cosmetic.EmoteJollyDance2]: EMOTE_EMOJIS.JollyDance,
		[Cosmetic.JollyGeologistFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory16,
		[Cosmetic.JollyGeologistHair]: HAIR_EMOJIS.Hair129,
		[Cosmetic.EmoteJollyDance3]: EMOTE_EMOJIS.JollyDance,
		[Cosmetic.EmoteJollyDance4]: EMOTE_EMOJIS.JollyDance,
		[Cosmetic.JollyGeologistBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.JollyGeologistBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.JollyGeologistMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.JollyGeologistProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp28,
		[Cosmetic.JollyGeologistSeasonalHeart]: SEASON_EMOJIS.MomentsHeart,
		[Cosmetic.EmoteBlindfoldBalancePose1]: EMOTE_EMOJIS.BlindfoldBalancePose,
		[Cosmetic.EmoteBlindfoldBalancePose2]: EMOTE_EMOJIS.BlindfoldBalancePose,
		[Cosmetic.AsceticMonkBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AsceticMonkMask]: MASK_EMOJIS.Mask82,
		[Cosmetic.AsceticMonkHair]: HAIR_EMOJIS.Hair128,
		[Cosmetic.AsceticMonkBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteBlindfoldBalancePose3]: EMOTE_EMOJIS.BlindfoldBalancePose,
		[Cosmetic.EmoteBlindfoldBalancePose4]: EMOTE_EMOJIS.BlindfoldBalancePose,
		[Cosmetic.AsceticMonkOutfit]: OUTFIT_EMOJIS.Outfit48,
		[Cosmetic.AsceticMonkBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.AsceticMonkSeasonalHeart]: SEASON_EMOJIS.MomentsHeart,
		[Cosmetic.SkyAnniversaryHairAccessory4]: HAIR_ACCESSORY_EMOJIS.HairAccessory28,
		[Cosmetic.AnniversarySonorousSeashell]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp29,
		[Cosmetic.AnniversaryPartyLights]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp33,
		[Cosmetic.AnniversaryPlush]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp30,
		[Cosmetic.GloatingNarcissistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MomentsGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MomentsGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MomentsGuideDoubleFive]: FRIEND_ACTION_EMOJIS.DoubleFive,
		[Cosmetic.ProphetOfFireProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp31,
		[Cosmetic.CacklingCannoneerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MomentsGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MomentsGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LivelyNavigatorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.EmoteCureForMe1]: EMOTE_EMOJIS.CureForMeDance,
		[Cosmetic.EmoteCureForMe2]: EMOTE_EMOJIS.CureForMeDance,
		[Cosmetic.MusicalVoyageSneakers]: SHOE_EMOJIS.Shoe06,
		[Cosmetic.MomentsGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MomentsGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.SunlightPinkBeachTowelCape]: CAPE_EMOJIS.Cape108,
		[Cosmetic.SunlightYellowBeachTowelCape]: CAPE_EMOJIS.Cape109,
		[Cosmetic.SunlightBlueBeachTowelCape]: CAPE_EMOJIS.Cape110,
		[Cosmetic.SunlightChunkySandals]: SHOE_EMOJIS.Shoe07,
		[Cosmetic.SunlightSurfboard]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp32,
		[Cosmetic.StarCollectorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MomentsGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MomentsGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StyleTopHat]: HAIR_ACCESSORY_EMOJIS.HairAccessory29,
		[Cosmetic.StyleRunwayMask]: MASK_EMOJIS.Mask83,
		[Cosmetic.StyleStarSunglasses]: FACE_ACCESSORY_EMOJIS.FaceAccessory17,
		[Cosmetic.StyleSilkBalletSlippers]: SHOE_EMOJIS.Shoe08,
		[Cosmetic.StyleFlameSunglasses]: FACE_ACCESSORY_EMOJIS.FaceAccessory18,
		[Cosmetic.StyleHeartSunglasses]: FACE_ACCESSORY_EMOJIS.FaceAccessory19,
		[Cosmetic.StyleBunnySlippers]: SHOE_EMOJIS.Shoe09,
		[Cosmetic.StyleWideLegJeans]: OUTFIT_EMOJIS.Outfit50,
		[Cosmetic.HopefulStewardQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RevivalPendant]: NECKLACE_EMOJIS.Necklace32,
		[Cosmetic.HopefulStewardUltimateHair]: HAIR_EMOJIS.Hair132,
		[Cosmetic.HopefulStewardUltimateCape]: CAPE_EMOJIS.Cape115,
		[Cosmetic.VestigeOfADesertedOasisHair]: HAIR_EMOJIS.Hair130,
		[Cosmetic.VestigeOfADesertedOasisBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.VestigeOfADesertedOasisBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.VestigeOfADesertedOasisCape]: CAPE_EMOJIS.Cape111,
		[Cosmetic.VestigeOfADesertedOasisShoes]: SHOE_EMOJIS.Shoe10,
		[Cosmetic.VestigeOfADesertedOasisBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.VestigeOfADesertedOasisSeasonalHeart]: SEASON_EMOJIS.RevivalHeart,
		[Cosmetic.MemoryOfALostVillageBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MemoryOfALostVillageCape]: CAPE_EMOJIS.Cape114,
		[Cosmetic.MemoryOfALostVillageOutfit]: OUTFIT_EMOJIS.Outfit51,
		[Cosmetic.MemoryOfALostVillageBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MemoryOfALostVillageBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MemoryOfALostVillageHair]: HAIR_EMOJIS.Hair131,
		[Cosmetic.MemoryOfALostVillageSeasonalHeart]: SEASON_EMOJIS.RevivalHeart,
		[Cosmetic.EchoOfAnAbandonedRefugeBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EchoOfAnAbandonedRefugeShoes]: SHOE_EMOJIS.Shoe11,
		[Cosmetic.EchoOfAnAbandonedRefugeMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.EchoOfAnAbandonedRefugeBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EchoOfAnAbandonedRefugeBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EchoOfAnAbandonedRefugeCape]: CAPE_EMOJIS.Cape112,
		[Cosmetic.EchoOfAnAbandonedRefugeHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory30,
		[Cosmetic.EchoOfAnAbandonedRefugeBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EchoOfAnAbandonedRefugeSeasonalHeart]: SEASON_EMOJIS.RevivalHeart,
		[Cosmetic.RemnantOfAForgottenHavenBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RemnantOfAForgottenHavenShoes]: SHOE_EMOJIS.Shoe12,
		[Cosmetic.RemnantOfAForgottenHavenCape]: CAPE_EMOJIS.Cape113,
		[Cosmetic.RemnantOfAForgottenHavenBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RemnantOfAForgottenHavenBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RemnantOfAForgottenHavenHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory31,
		[Cosmetic.RemnantOfAForgottenHavenSeasonalHeart]: SEASON_EMOJIS.RevivalHeart,
		[Cosmetic.HopefulStewardQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MischiefCrabkinAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory32,
		[Cosmetic.MischiefGothBoots]: SHOE_EMOJIS.Shoe13,
		[Cosmetic.MischiefGothGarment]: OUTFIT_EMOJIS.Outfit52,
		[Cosmetic.MischiefGossamerCape]: CAPE_EMOJIS.Cape116,
		[Cosmetic.MischiefCrabulaCloak]: CAPE_EMOJIS.Cape117,
		[Cosmetic.MischiefCrabulaMask]: MASK_EMOJIS.Mask84,
		[Cosmetic.HopefulStewardQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BaseHair2]: HAIR_EMOJIS.Hair134,
		[Cosmetic.BaseHair3]: HAIR_EMOJIS.Hair135,
		[Cosmetic.HopefulStewardQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HopefulStewardFriendActionHug]: FRIEND_ACTION_EMOJIS.Hug,
		[Cosmetic.HopefulStewardQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TalentedBuilderWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HopefulStewardQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart6]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FestivalEarrings]: HEAD_ACCESSORY_EMOJIS.HeadAccessory14,
		[Cosmetic.FestivalSceptre]: HELD_PROPS_EMOJIS.HeldProp39,
		[Cosmetic.MothAppreciationCape]: CAPE_EMOJIS.Cape119,
		[Cosmetic.MothAppreciationAntennae]: HAIR_ACCESSORY_EMOJIS.HairAccessory33,
		[Cosmetic.SparrowAppreciationCape]: CAPE_EMOJIS.Cape118,
		[Cosmetic.SparrowAppreciationMask]: MASK_EMOJIS.Mask85,
		[Cosmetic.HopefulStewardQuest7]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHeart7]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StretchingLamplighterWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HopefulStewardQuest8]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.HopefulStewardHair]: HAIR_EMOJIS.Hair133,
		[Cosmetic.HopefulStewardQuest9]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.WinterFeastSnowboard]: HELD_PROPS_EMOJIS.HeldProp40,
		[Cosmetic.WinterPineConeHairClip]: HAIR_ACCESSORY_EMOJIS.HairAccessory34,
		[Cosmetic.CourseCreationProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp33,
		[Cosmetic.CosyHermitBoots]: SHOE_EMOJIS.Shoe14,
		[Cosmetic.WinterQuiltedCape]: CAPE_EMOJIS.Cape120,
		[Cosmetic.HopefulStewardQuest10]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.GiftOfTheNineColouredDeer]: HEAD_ACCESSORY_EMOJIS.HeadAccessory15,
		[Cosmetic.RadianceOfTheNineColouredDeer]: CAPE_EMOJIS.Cape125,
		[Cosmetic.SpiritOfMuralQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SpiritOfMuralHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.NineColouredDeerPendant]: NECKLACE_EMOJIS.Necklace33,
		[Cosmetic.SpiritOfMuralUltimateHair]: HAIR_EMOJIS.Hair136,
		[Cosmetic.SpiritOfMuralUltimateOutfit]: OUTFIT_EMOJIS.Outfit53,
		[Cosmetic.SpiritOfMuralUltimateCape]: CAPE_EMOJIS.Cape121,
		[Cosmetic.EmoteWhistle1]: EMOTE_EMOJIS.Whistle,
		[Cosmetic.EmoteWhistle2]: EMOTE_EMOJIS.Whistle,
		[Cosmetic.HerbGathererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.HerbGathererOutfit]: OUTFIT_EMOJIS.Outfit54,
		[Cosmetic.HerbGathererHair]: HAIR_EMOJIS.Hair137,
		[Cosmetic.HerbGathererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteWhistle3]: EMOTE_EMOJIS.Whistle,
		[Cosmetic.EmoteWhistle4]: EMOTE_EMOJIS.Whistle,
		[Cosmetic.HerbGathererProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp34,
		[Cosmetic.HerbGathererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.HerbGathererSeasonalHeart]: SEASON_EMOJIS.NineColouredDeerHeart,
		[Cosmetic.EmoteFlex1]: EMOTE_EMOJIS.Flex,
		[Cosmetic.EmoteFlex2]: EMOTE_EMOJIS.Flex,
		[Cosmetic.HunterOutfit]: OUTFIT_EMOJIS.Outfit55,
		[Cosmetic.HunterBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteFlex3]: EMOTE_EMOJIS.Flex,
		[Cosmetic.EmoteFlex4]: EMOTE_EMOJIS.Flex,
		[Cosmetic.HunterBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.HunterHair]: HAIR_EMOJIS.Hair138,
		[Cosmetic.HunterCape]: CAPE_EMOJIS.Cape122,
		[Cosmetic.HunterBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.HunterSeasonalHeart]: SEASON_EMOJIS.NineColouredDeerHeart,
		[Cosmetic.FriendActionCradleCarry1]: FRIEND_ACTION_EMOJIS.CradleCarry,
		[Cosmetic.FriendActionCradleCarry2]: FRIEND_ACTION_EMOJIS.CradleCarry,
		[Cosmetic.FeudalLordBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FeudalLordHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory36,
		[Cosmetic.FeudalLordMask]: MASK_EMOJIS.Mask87,
		[Cosmetic.FeudalLordBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FeudalLordBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FeudalLordCape]: CAPE_EMOJIS.Cape123,
		[Cosmetic.FeudalLordMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.FeudalLordBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.FeudalLordSeasonalHeart]: SEASON_EMOJIS.NineColouredDeerHeart,
		[Cosmetic.EmoteFloatSpin1]: EMOTE_EMOJIS.FloatSpin,
		[Cosmetic.EmoteFloatSpin2]: EMOTE_EMOJIS.FloatSpin,
		[Cosmetic.PrincessMask]: MASK_EMOJIS.Mask88,
		[Cosmetic.PrincessBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PrincessBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PrincessHair]: HAIR_EMOJIS.Hair139,
		[Cosmetic.EmoteFloatSpin3]: EMOTE_EMOJIS.FloatSpin,
		[Cosmetic.EmoteFloatSpin4]: EMOTE_EMOJIS.FloatSpin,
		[Cosmetic.PrincessOutfit]: OUTFIT_EMOJIS.Outfit56,
		[Cosmetic.PrincessBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PrincessBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.PrincessCape]: CAPE_EMOJIS.Cape124,
		[Cosmetic.PrincessSeasonalHeart]: SEASON_EMOJIS.NineColouredDeerHeart,
		[Cosmetic.AnxiousAnglerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SpiritOfMuralQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SpiritOfMuralHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.FortuneDragonMask]: MASK_EMOJIS.Mask90,
		[Cosmetic.FortuneDrum]: HELD_PROPS_EMOJIS.HeldProp41,
		[Cosmetic.DaysOfFortuneDragonVestment]: OUTFIT_EMOJIS.Outfit57,
		[Cosmetic.DaysOfFortuneDragonStole]: CAPE_EMOJIS.Cape126,
		[Cosmetic.DaysOfFortuneDragonBangles]: HEAD_ACCESSORY_EMOJIS.HeadAccessory16,
		[Cosmetic.SpiritOfMuralQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SpiritOfMuralHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory35,
		[Cosmetic.LoveHeartPlushie]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp35,
		[Cosmetic.LoveHeartBeret]: HAIR_ACCESSORY_EMOJIS.HairAccessory37,
		[Cosmetic.DaysofLoveMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.DaysofLoveMeteorMantle]: CAPE_EMOJIS.Cape127,
		[Cosmetic.SpiritOfMuralQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SpiritOfMuralHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.LightWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.CeasingCommodoreWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.FranticStagehandWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SpiritOfMuralQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.SpiritOfMuralMask]: MASK_EMOJIS.Mask86,
		[Cosmetic.BloomArumPetalHair]: HAIR_EMOJIS.Hair141,
		[Cosmetic.BloomSpikySprigHair]: HAIR_EMOJIS.Hair140,
		[Cosmetic.BloomArumPetalCape]: CAPE_EMOJIS.Cape128,
		[Cosmetic.BloomLilypadUmbrella]: HELD_PROPS_EMOJIS.HeldProp42,
		[Cosmetic.CompanionCube]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp36,
		[Cosmetic.NestingGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.StoneStool]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp42,
		[Cosmetic.NestingGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.NestingPendant]: NECKLACE_EMOJIS.Necklace34,
		[Cosmetic.NestingGuideUltimateOutfit]: OUTFIT_EMOJIS.Outfit58,
		[Cosmetic.NestingGuideUltimateProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp37,
		[Cosmetic.NestingSolariumBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingSolariumProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp38,
		[Cosmetic.NestingSolariumProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp34,
		[Cosmetic.NestingSolariumBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingSolariumBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingSolariumProp3]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp35,
		[Cosmetic.NestingSolariumProp4]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp36,
		[Cosmetic.NestingSolariumBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingSolariumSeasonalHeart]: SEASON_EMOJIS.NestingHeart,
		[Cosmetic.NestingLoftBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingLoftProp1]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp37,
		[Cosmetic.NestingLoftProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp38,
		[Cosmetic.NestingLoftBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingLoftBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingLoftCape]: CAPE_EMOJIS.Cape129,
		[Cosmetic.NestingLoftProp3]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp39,
		[Cosmetic.NestingLoftBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingLoftSeasonalHeart]: SEASON_EMOJIS.NestingHeart,
		[Cosmetic.NestingAtriumProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp40,
		[Cosmetic.NestingAtriumBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingAtriumBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingAtriumProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp39,
		[Cosmetic.NestingAtriumHair]: HAIR_EMOJIS.Hair142,
		[Cosmetic.NestingAtriumBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingAtriumBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingAtriumProp3]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp40,
		[Cosmetic.NestingAtriumSeasonalHeart]: SEASON_EMOJIS.NestingHeart,
		[Cosmetic.NestingNookProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp41,
		[Cosmetic.NestingNookBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingNookBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingNookProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp41,
		[Cosmetic.NestingNookProp3]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp42,
		[Cosmetic.NestingNookBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingNookBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.NestingNookHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory38,
		[Cosmetic.NestingNookSeasonalHeart]: SEASON_EMOJIS.NestingHeart,
		[Cosmetic.StoneSingleBench]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp43,
		[Cosmetic.StoneWoodFiredOven]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp44,
		[Cosmetic.StoneTallCube]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp46,
		[Cosmetic.StoneSingleBed]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp45,
		[Cosmetic.NestingGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.NestingGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StoneChair]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp47,
		[Cosmetic.StoneSmallTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp48,
		[Cosmetic.DecorPillowOneColour]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp43,
		[Cosmetic.StoneTallShelf]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp49,
		[Cosmetic.DancingPerformerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.CosyTeacupHeadband]: HAIR_ACCESSORY_EMOJIS.HairAccessory41,
		[Cosmetic.CosyCafeTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp50,
		[Cosmetic.CinnamorollPopUpCafeSwirledHair]: HAIR_EMOJIS.Hair143,
		[Cosmetic.CinnamorollPopUpCafeCinnamarollEars]: HAIR_ACCESSORY_EMOJIS.HairAccessory40,
		[Cosmetic.CinnamorollPopUpCafePlushie]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp44,
		[Cosmetic.CinnamorollPopUpCafeMiniCompanion]: HAIR_ACCESSORY_EMOJIS.HairAccessory39,
		[Cosmetic.CinnamorollPopUpCafeBowtie]: NECKLACE_EMOJIS.Necklace35,
		[Cosmetic.CinnamorollPopUpCafeCloudCape]: CAPE_EMOJIS.Cape130,
		[Cosmetic.NestingGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.NestingGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StoneBench]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp51,
		[Cosmetic.StoneDesk]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp52,
		[Cosmetic.DecorPillowTwoColour]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp45,
		[Cosmetic.SmallSolidRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp46,
		[Cosmetic.StoneArmchair]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp53,
		[Cosmetic.StoneConsoleTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp54,
		[Cosmetic.DecorFoldedCloth]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp47,
		[Cosmetic.SmallStripesRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp48,
		[Cosmetic.StoneLoveseat]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp55,
		[Cosmetic.StoneRoundDiningTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp56,
		[Cosmetic.StonePlantStand]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp57,
		[Cosmetic.SmallClassicRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp49,
		[Cosmetic.StoneSofaCorner]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp58,
		[Cosmetic.StoneSquareDiningTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp59,
		[Cosmetic.StoneWallSconce]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp50,
		[Cosmetic.SmallHalfCircleRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp51,
		[Cosmetic.NestingGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.NestingGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.OceanMask]: MASK_EMOJIS.Mask91,
		[Cosmetic.OceanBlueScarf]: NECKLACE_EMOJIS.Necklace36,
		[Cosmetic.NatureWaveCape]: CAPE_EMOJIS.Cape131,
		[Cosmetic.NatureWaveTouchedHair]: HAIR_EMOJIS.Hair144,
		[Cosmetic.StoneSofaSide]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp60,
		[Cosmetic.StoneLongDiningTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp61,
		[Cosmetic.StoneSmallBathtub]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp62,
		[Cosmetic.MediumSolidRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp52,
		[Cosmetic.StoneFigurine]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp53,
		[Cosmetic.StoneKichenDrawers]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp63,
		[Cosmetic.StoneCoffeeTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp64,
		[Cosmetic.StoneCandleLight]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp65,
		[Cosmetic.MediumStripesRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp54,
		[Cosmetic.InstrumentStand]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp55,
		[Cosmetic.NestingGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.NestingGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.StoneWallPotRack]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp56,
		[Cosmetic.StoneClosedBox]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp57,
		[Cosmetic.StoneWashstand]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp66,
		[Cosmetic.MediumDiamondsRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp58,
		[Cosmetic.MusicPlayer]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp59,
		[Cosmetic.StoneEmptyBox]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp60,
		[Cosmetic.StoneWallMirror]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp61,
		[Cosmetic.MediumArgyleRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp62,
		[Cosmetic.DarkRainbowMask]: MASK_EMOJIS.Mask92,
		[Cosmetic.ColourGlamCut]: HAIR_EMOJIS.Hair145,
		[Cosmetic.DarkRainbowLoafers]: SHOE_EMOJIS.Shoe15,
		[Cosmetic.ColourBubbleMachine]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp63,
		[Cosmetic.StoneWallMugRack]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp64,
		[Cosmetic.StoneWallTowelRack]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp65,
		[Cosmetic.MediumCircleRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp66,
		[Cosmetic.StoneKitchenCabinet]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp67,
		[Cosmetic.StoneWallShelf]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp67,
		[Cosmetic.LargeSolidRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp68,
		[Cosmetic.StoneKitchenStove]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp68,
		[Cosmetic.StoneWideCube]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp69,
		[Cosmetic.LargeBathtub]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp70,
		[Cosmetic.LargeCircleRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp69,
		[Cosmetic.SkyFestStarJar]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp70,
		[Cosmetic.SkyFest5thAnniversaryTShirt]: OUTFIT_EMOJIS.Outfit59,
		[Cosmetic.SkyFest5thAnniversaryHeadband]: HAIR_ACCESSORY_EMOJIS.HairAccessory42,
		[Cosmetic.SkyFestJenovaFan]: HELD_PROPS_EMOJIS.HeldProp43,
		[Cosmetic.SkyFestOreoHeadband]: HAIR_ACCESSORY_EMOJIS.HairAccessory43,
		[Cosmetic.SkyFestWireframeCape]: CAPE_EMOJIS.Cape132,
		[Cosmetic.DuetsGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DuetsGuideMask]: MASK_EMOJIS.Mask93,
		[Cosmetic.DuetsPendant]: NECKLACE_EMOJIS.Necklace37,
		[Cosmetic.DuetsGuideUltimateProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp71,
		[Cosmetic.DuetsGuideUltimateCape]: CAPE_EMOJIS.Cape133,
		[Cosmetic.DuetsGuideUltimateProp2]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp72,
		[Cosmetic.ThePianistsBeginningsBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsBeginningsProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp74,
		[Cosmetic.ThePianistsBeginningsHair]: HAIR_EMOJIS.Hair147,
		[Cosmetic.ThePianistsBeginningsBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsBeginningsBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsBeginningsOutfit]: OUTFIT_EMOJIS.Outfit61,
		[Cosmetic.ThePianistsBeginningsProp2]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp75,
		[Cosmetic.ThePianistsBeginningsBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsBeginningsSeasonalHeart]: SEASON_EMOJIS.DuetsHeart,
		[Cosmetic.TheCellistsBeginningsHair]: HAIR_EMOJIS.Hair146,
		[Cosmetic.TheCellistsBeginningsBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsBeginningsBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsBeginningsProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp73,
		[Cosmetic.TheCellistsBeginningsOutfit]: OUTFIT_EMOJIS.Outfit60,
		[Cosmetic.TheCellistsBeginningsBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsBeginningsSeasonalHeart]: SEASON_EMOJIS.DuetsHeart,
		[Cosmetic.TheMusiciansLegacyMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.TheMusiciansLegacyBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheMusiciansLegacyBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheMusiciansLegacyProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp76,
		[Cosmetic.TheMusiciansLegacyProp2]: HELD_PROPS_EMOJIS.HeldProp44,
		[Cosmetic.TheMusiciansLegacyBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheMusiciansLegacySeasonalHeart]: SEASON_EMOJIS.DuetsHeart,
		[Cosmetic.TheCellistsFlourishingProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp77,
		[Cosmetic.TheCellistsFlourishingBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsFlourishingBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsFlourishingProp2]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp78,
		[Cosmetic.TheCellistsFlourishingCape]: CAPE_EMOJIS.Cape134,
		[Cosmetic.TheCellistsFlourishingBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsFlourishingBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TheCellistsFlourishingOutfit]: OUTFIT_EMOJIS.Outfit62,
		[Cosmetic.TheCellistsFlourishingSeasonalHeart]: SEASON_EMOJIS.DuetsHeart,
		[Cosmetic.ThePianistsFlourishingBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsFlourishingProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp79,
		[Cosmetic.ThePianistsFlourishingShoes]: SHOE_EMOJIS.Shoe16,
		[Cosmetic.ThePianistsFlourishingBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsFlourishingBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ThePianistsFlourishingOutfit]: OUTFIT_EMOJIS.Outfit63,
		[Cosmetic.ThePianistsFlourishingSeasonalHeart]: SEASON_EMOJIS.DuetsHeart,
		[Cosmetic.DuetsGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DuetsGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TournamentCurls]: HAIR_EMOJIS.Hair148,
		[Cosmetic.TournamentTorch]: HELD_PROPS_EMOJIS.HeldProp45,
		[Cosmetic.TournamentGoldenGarland]: HAIR_ACCESSORY_EMOJIS.HairAccessory44,
		[Cosmetic.TournamentTunic]: OUTFIT_EMOJIS.Outfit64,
		[Cosmetic.MellowMusicianWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.DuetsGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DuetsGuideDuetBow1]: FRIEND_ACTION_EMOJIS.DuetBow,
		[Cosmetic.DuetsGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DuetsGuideDuetBow2]: FRIEND_ACTION_EMOJIS.DuetBow,
		[Cosmetic.CompassionateCellistSharedMemorySpell]: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
		[Cosmetic.CompassionateCellistFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory20,
		[Cosmetic.CompassionateCellistHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CompassionateCellistProp]: HELD_PROPS_EMOJIS.HeldProp46,
		[Cosmetic.SunlightMantaFloat]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp71,
		[Cosmetic.SunlightBeachShorts]: OUTFIT_EMOJIS.Outfit65,
		[Cosmetic.SunlightHeliosHoops]: HEAD_ACCESSORY_EMOJIS.HeadAccessory17,
		[Cosmetic.SunlightWovenWrap]: CAPE_EMOJIS.Cape135,
		[Cosmetic.DuetsGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.DuetsGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MoonlightBlossomAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory45,
		[Cosmetic.MoonlightLanternDecoration]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp72,
		[Cosmetic.MoonlightEarrings]: HEAD_ACCESSORY_EMOJIS.HeadAccessory18,
		[Cosmetic.MoonlightFrock]: OUTFIT_EMOJIS.Outfit66,
		[Cosmetic.MoonlightUpdo]: HAIR_EMOJIS.Hair149,
		[Cosmetic.AncientLightJellyfishWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AncientLightMantaWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AncientDarknessPlantWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.AncientDarknessDragonWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.StyleDarknessFascinator]: HAIR_ACCESSORY_EMOJIS.HairAccessory46,
		[Cosmetic.StyleDazzlingDress]: OUTFIT_EMOJIS.Outfit67,
		[Cosmetic.StyleDapperSuit]: OUTFIT_EMOJIS.Outfit68,
		[Cosmetic.StyleDapperMonocle]: FACE_ACCESSORY_EMOJIS.FaceAccessory21,
		[Cosmetic.StyleDapperNecktie]: NECKLACE_EMOJIS.Necklace38,
		[Cosmetic.BumblingBoatswainWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.HattifattenerShoulderBuddy]: NECKLACE_EMOJIS.Necklace39,
		[Cosmetic.PointedSnufkinHat]: HAIR_ACCESSORY_EMOJIS.HairAccessory47,
		[Cosmetic.RovingSnufkinRobe]: OUTFIT_EMOJIS.Outfit69,
		[Cosmetic.RovingSnufkinScarf]: NECKLACE_EMOJIS.Necklace40,
		[Cosmetic.MoomintrollEars]: HAIR_ACCESSORY_EMOJIS.HairAccessory48,
		[Cosmetic.MoomintrollTail]: NECKLACE_EMOJIS.Necklace41,
		[Cosmetic.TheMoominStorybookQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EmoteRead1]: EMOTE_EMOJIS.Read,
		[Cosmetic.EmoteRead2]: EMOTE_EMOJIS.Read,
		[Cosmetic.MoominPendant]: NECKLACE_EMOJIS.Necklace42,
		[Cosmetic.TheMoominStorybookUltimateUmbrella]: HELD_PROPS_EMOJIS.HeldProp47,
		[Cosmetic.TheMoominStorybookUltimatePlush]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp80,
		[Cosmetic.TheMoominStorybookUltimateOutfit]: OUTFIT_EMOJIS.Outfit70,
		[Cosmetic.ComfortOfKindnessBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ComfortOfKindnessProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp81,
		[Cosmetic.ComfortOfKindnessHair]: HAIR_EMOJIS.Hair150,
		[Cosmetic.ComfortOfKindnessBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ComfortOfKindnessBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ComfortOfKindnessProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp73,
		[Cosmetic.ComfortOfKindnessNeckAccessory]: NECKLACE_EMOJIS.Necklace43,
		[Cosmetic.ComfortOfKindnessBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ComfortOfKindnessBlessing5]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ComfortOfKindnessCape]: CAPE_EMOJIS.Cape136,
		[Cosmetic.ComfortOfKindnessSeasonalHeart]: SEASON_EMOJIS.MoominHeart,
		[Cosmetic.SenseOfSelfMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.SenseOfSelfBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SenseOfSelfBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SenseOfSelfShoes]: SHOE_EMOJIS.Shoe17,
		[Cosmetic.SenseOfSelfNeckAccessory]: NECKLACE_EMOJIS.Necklace44,
		[Cosmetic.SenseOfSelfBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SenseOfSelfBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SenseOfSelfHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory49,
		[Cosmetic.SenseOfSelfSeasonalHeart]: SEASON_EMOJIS.MoominHeart,
		[Cosmetic.SpiritOfAdventureMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.SpiritOfAdventureHair]: HAIR_EMOJIS.Hair151,
		[Cosmetic.SpiritOfAdventureHarmonica]: HELD_PROPS_EMOJIS.HeldProp48,
		[Cosmetic.SpiritOfAdventureBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SpiritOfAdventureBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SpiritOfAdventureProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp74,
		[Cosmetic.SpiritOfAdventureCape]: CAPE_EMOJIS.Cape137,
		[Cosmetic.SpiritOfAdventureBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.SpiritOfAdventureSeasonalHeart]: SEASON_EMOJIS.MoominHeart,
		[Cosmetic.InspirationOfInclusionProp1]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp75,
		[Cosmetic.InspirationOfInclusionBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.InspirationOfInclusionBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.InspirationOfInclusionHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory50,
		[Cosmetic.InspirationOfInclusionProp2]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp82,
		[Cosmetic.InspirationOfInclusionBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.InspirationOfInclusionBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.InspirationOfInclusionNeckAccessory]: NECKLACE_EMOJIS.Necklace45,
		[Cosmetic.InspirationOfInclusionOutfit]: OUTFIT_EMOJIS.Outfit71,
		[Cosmetic.InspirationOfInclusionBlessing5]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.InspirationOfInclusionSeasonalHeart]: SEASON_EMOJIS.MoominHeart,
		[Cosmetic.MischiefStarSticker]: FACE_ACCESSORY_EMOJIS.FaceAccessory22,
		[Cosmetic.MischiefCauldron]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp76,
		[Cosmetic.MischiefSpiderBun]: HAIR_EMOJIS.Hair152,
		[Cosmetic.MischiefRavenFeatheredCloak]: CAPE_EMOJIS.Cape138,
		[Cosmetic.MischiefWitheredBroom]: HELD_PROPS_EMOJIS.HeldProp49,
		[Cosmetic.TheMoominStorybookQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.WarriorOfLoveWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TheMoominStorybookQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheMoominStorybookHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.HangingMask]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp83,
		[Cosmetic.TheMoominStorybookQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.EmoteRead3]: EMOTE_EMOJIS.Read,
		[Cosmetic.EmoteRead4]: EMOTE_EMOJIS.Read,
		[Cosmetic.MarchingBandCape]: CAPE_EMOJIS.Cape139,
		[Cosmetic.MusicMarchingUniform]: OUTFIT_EMOJIS.Outfit72,
		[Cosmetic.JamStation]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp77,
		[Cosmetic.FledglingUprightPiano]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp84,
		[Cosmetic.TheMoominStorybookQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheMoominStorybookQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.TheMoominStorybookHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheMoominStorybookProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp85,
		[Cosmetic.TheMoominStorybookOutfit]: OUTFIT_EMOJIS.Outfit73,
		[Cosmetic.MoominmammasMasterpiece]: CAPE_EMOJIS.Cape140,
		[Cosmetic.WonderlandStackedHat]: HAIR_ACCESSORY_EMOJIS.HairAccessory51,
		[Cosmetic.WonderlandFranticHair]: HAIR_EMOJIS.Hair153,
		[Cosmetic.WonderlandTeacupBath]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp78,
		[Cosmetic.WonderlandHareHairstyle]: HAIR_EMOJIS.Hair154,
		[Cosmetic.WonderlandPrimrosePinaforeDress]: OUTFIT_EMOJIS.Outfit74,
		[Cosmetic.WonderlandPrimrosePinaforeHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory52,
		[Cosmetic.WonderlandCafeCorridor]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp86,
		[Cosmetic.ModestDancerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PleadingChildWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.PleadingChildShoes]: SHOE_EMOJIS.Shoe03,
		[Cosmetic.OddballOutcastWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RadianceGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RadianceGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RadiancePendant]: NECKLACE_EMOJIS.Necklace46,
		[Cosmetic.RadianceGuideUltimateCape]: CAPE_EMOJIS.Cape141,
		[Cosmetic.RadianceGuideUltimateMask]: MASK_EMOJIS.Mask94,
		[Cosmetic.RadianceGuideRedDye]: MISCELLANEOUS_EMOJIS.DyeRed,
		[Cosmetic.RadianceGuideYellowDye]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.Cartwheel1]: EMOTE_EMOJIS.Cartwheel,
		[Cosmetic.Cartwheel2]: EMOTE_EMOJIS.Cartwheel,
		[Cosmetic.RadianceLeapingDancerHair]: HAIR_EMOJIS.Hair155,
		[Cosmetic.RadianceLeapingDancerRedDye1]: MISCELLANEOUS_EMOJIS.DyeRed,
		[Cosmetic.RadianceLeapingDancerRedDye2]: MISCELLANEOUS_EMOJIS.DyeRed,
		[Cosmetic.RadianceLeapingDancerProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp79,
		[Cosmetic.Cartwheel3]: EMOTE_EMOJIS.Cartwheel,
		[Cosmetic.Cartwheel4]: EMOTE_EMOJIS.Cartwheel,
		[Cosmetic.RadianceLeapingDancerRedDye3]: MISCELLANEOUS_EMOJIS.DyeRed,
		[Cosmetic.RadianceLeapingDancerOutfit]: OUTFIT_EMOJIS.Outfit75,
		[Cosmetic.RadianceLeapingDancerCape]: CAPE_EMOJIS.Cape142,
		[Cosmetic.RadianceLeapingDancerYellowDye1]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.RadianceLeapingDancerYellowDye2]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.RadianceLeapingDancerShoes]: SHOE_EMOJIS.Shoe18,
		[Cosmetic.RadianceLeapingDancerSeasonalHeart]: SEASON_EMOJIS.RadianceHeart,
		[Cosmetic.HypeDance1]: EMOTE_EMOJIS.HypeDance,
		[Cosmetic.HypeDance2]: EMOTE_EMOJIS.HypeDance,
		[Cosmetic.RadianceProvokingPerformerGreenDye1]: MISCELLANEOUS_EMOJIS.DyeGreen,
		[Cosmetic.RadianceProvokingPerformerHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory19,
		[Cosmetic.RadianceProvokingPerformerGreenDye2]: MISCELLANEOUS_EMOJIS.DyeGreen,
		[Cosmetic.RadianceProvokingPerformerCymbals]: HELD_PROPS_EMOJIS.HeldProp50,
		[Cosmetic.HypeDance3]: EMOTE_EMOJIS.HypeDance,
		[Cosmetic.HypeDance4]: EMOTE_EMOJIS.HypeDance,
		[Cosmetic.RadianceProvokingPerformerOutfit]: OUTFIT_EMOJIS.Outfit76,
		[Cosmetic.RadianceProvokingPerformerYellowDye1]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.RadianceProvokingPerformerYellowDye2]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.RadianceProvokingPerformerCape]: CAPE_EMOJIS.Cape143,
		[Cosmetic.RadianceProvokingPerformerShoes]: SHOE_EMOJIS.Shoe19,
		[Cosmetic.RadianceProvokingPerformerWhiteDye]: MISCELLANEOUS_EMOJIS.DyeWhite,
		[Cosmetic.RadianceProvokingPerformerSeasonalHeart]: SEASON_EMOJIS.RadianceHeart,
		[Cosmetic.HeartGesture1]: EMOTE_EMOJIS.HeartGesture,
		[Cosmetic.HeartGesture2]: EMOTE_EMOJIS.HeartGesture,
		[Cosmetic.RadianceGreetingShamanHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory53,
		[Cosmetic.RadianceGreetingShamanBlueDye1]: MISCELLANEOUS_EMOJIS.DyeBlue,
		[Cosmetic.RadianceGreetingShamanBlueDye2]: MISCELLANEOUS_EMOJIS.DyeBlue,
		[Cosmetic.RadianceGreetingShamanCyanDye1]: MISCELLANEOUS_EMOJIS.DyeCyan,
		[Cosmetic.HeartGesture3]: EMOTE_EMOJIS.HeartGesture,
		[Cosmetic.HeartGesture4]: EMOTE_EMOJIS.HeartGesture,
		[Cosmetic.RadianceGreetingShamanPurpleDye1]: MISCELLANEOUS_EMOJIS.DyePurple,
		[Cosmetic.RadianceGreetingShamanBlackDye]: MISCELLANEOUS_EMOJIS.DyeBlack,
		[Cosmetic.RadianceGreetingShamanHair]: HAIR_EMOJIS.Hair156,
		[Cosmetic.RadianceGreetingShamanCyanDye2]: MISCELLANEOUS_EMOJIS.DyeCyan,
		[Cosmetic.RadianceGreetingShamanPurpleDye2]: MISCELLANEOUS_EMOJIS.DyePurple,
		[Cosmetic.RadianceGreetingShamanOutfit]: OUTFIT_EMOJIS.Outfit77,
		[Cosmetic.RadianceGreetingShamanSeasonalHeart]: SEASON_EMOJIS.RadianceHeart,
		[Cosmetic.DragonDanceMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.FortuneRedDye]: MISCELLANEOUS_EMOJIS.DyeRed,
		[Cosmetic.FortuneSnakeMask]: MASK_EMOJIS.Mask95,
		[Cosmetic.FortuneSnakeOutfit]: OUTFIT_EMOJIS.Outfit78,
		[Cosmetic.FortuneVerticalPoster]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp80,
		[Cosmetic.FortuneCandleFlags]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp81,
		[Cosmetic.FortunePlant]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp82,
		[Cosmetic.FortuneHandFan]: HELD_PROPS_EMOJIS.HeldProp51,
		[Cosmetic.FortuneSnakeCoif]: HAIR_EMOJIS.Hair157,
		[Cosmetic.FortuneSnakeCloak]: CAPE_EMOJIS.Cape144,
		[Cosmetic.ForgetfulStorytellerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RadianceGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RadianceGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RadianceGuideGreenDye]: MISCELLANEOUS_EMOJIS.DyeGreen,
		[Cosmetic.RadianceGuideCyanDye]: MISCELLANEOUS_EMOJIS.DyeCyan,
		[Cosmetic.DaysOfLoveVioletCrystal]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp87,
		[Cosmetic.DaysOfLoveBraids]: HAIR_EMOJIS.Hair158,
		[Cosmetic.DaysOfLoveAmethystAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory54,
		[Cosmetic.DaysOfLoveAmethystTippedTails]: HAIR_EMOJIS.Hair159,
		[Cosmetic.DaysOfLovePurpleDye]: MISCELLANEOUS_EMOJIS.DyePurple,
		[Cosmetic.RadianceGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RadianceGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RadianceGuideBlueDye]: MISCELLANEOUS_EMOJIS.DyeBlue,
		[Cosmetic.RadianceGuidePurpleDye]: MISCELLANEOUS_EMOJIS.DyePurple,
		[Cosmetic.MindfulMinerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.TreasureCavalierBoots]: SHOE_EMOJIS.Shoe20,
		[Cosmetic.TreasureShovel]: HELD_PROPS_EMOJIS.HeldProp52,
		[Cosmetic.TreasureSeekersEyepatch]: MASK_EMOJIS.Mask96,
		[Cosmetic.TreasureSeekersOutfit]: OUTFIT_EMOJIS.Outfit79,
		[Cosmetic.TreasureSeekersBlackDye]: MISCELLANEOUS_EMOJIS.DyeBlack,
		[Cosmetic.TreasureSeekersWhiteDye]: MISCELLANEOUS_EMOJIS.DyeWhite,
		[Cosmetic.RadianceGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RadianceGuideWhiteDye]: MISCELLANEOUS_EMOJIS.DyeWhite,
		[Cosmetic.RadianceGuideBlackDye]: MISCELLANEOUS_EMOJIS.DyeBlack,
		[Cosmetic.ChucklingScoutShoes]: SHOE_EMOJIS.Shoe01,
		[Cosmetic.RadianceGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.RadianceGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.RadianceGuideCape]: CAPE_EMOJIS.Cape145,
		[Cosmetic.TranscendentJourneyCape]: CAPE_EMOJIS.Cape146,
		[Cosmetic.TranscendentJourneyHood]: HAIR_EMOJIS.Hair160,
		[Cosmetic.TranscendentJourneyMask]: MASK_EMOJIS.Mask97,
		[Cosmetic.BloomRoseJar]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp88,
		[Cosmetic.BloomRoseBraidedHair]: HAIR_EMOJIS.Hair161,
		[Cosmetic.BloomRosePetalMask]: MASK_EMOJIS.Mask98,
		[Cosmetic.BloomRoseEmbroideredCape]: CAPE_EMOJIS.Cape147,
		[Cosmetic.BlueBirdGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.BlueBirdGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BlueBirdPendant]: NECKLACE_EMOJIS.Necklace47,
		[Cosmetic.BlueBirdGuideUltimateFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory23,
		[Cosmetic.BlueBirdGuideUltimateCape]: CAPE_EMOJIS.Cape148,
		[Cosmetic.EmoteCough1]: EMOTE_EMOJIS.Cough,
		[Cosmetic.EmoteCough2]: EMOTE_EMOJIS.Cough,
		[Cosmetic.CostumedConfettiCousinHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory55,
		[Cosmetic.CostumedConfettiCousinBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CostumedConfettiCousinBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CostumedConfettiCousinMask]: MASK_EMOJIS.Mask99,
		[Cosmetic.CostumedConfettiCousinRedDye]: MISCELLANEOUS_EMOJIS.DyeRed,
		[Cosmetic.CostumedConfettiCousinYellowDye]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.CostumedConfettiCousinBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CostumedConfettiCousinOutfit]: OUTFIT_EMOJIS.Outfit80,
		[Cosmetic.CostumedConfettiCousinHair]: HAIR_EMOJIS.Hair162,
		[Cosmetic.CostumedConfettiCousinBlessing4]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.CostumedConfettiCousinSeasonalHeart]: SEASON_EMOJIS.BlueBirdHeart,
		[Cosmetic.TumblingTroublemakerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.DiviningWiseGrandparentDye1]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.DiviningWiseGrandparentBlackDye]: MISCELLANEOUS_EMOJIS.DyeBlack,
		[Cosmetic.DiviningWiseGrandparentFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory24,
		[Cosmetic.DiviningWiseGrandparentBlessing]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.DiviningWiseGrandparentBlueDye]: MISCELLANEOUS_EMOJIS.DyeBlue,
		[Cosmetic.DiviningWiseGrandparentDye2]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.DiviningWiseGrandparentCyanDye]: MISCELLANEOUS_EMOJIS.DyeCyan,
		[Cosmetic.DiviningWiseGrandparentCape]: CAPE_EMOJIS.Cape149,
		[Cosmetic.DiviningWiseGrandparentSeasonalHeart]: SEASON_EMOJIS.BlueBirdHeart,
		[Cosmetic.WoodcuttingPleafulParentMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.WoodcuttingPleafulParentBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WoodcuttingPleafulParentBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WoodcuttingPleafulParentShoes]: SHOE_EMOJIS.Shoe21,
		[Cosmetic.WoodcuttingPleafulParentGreenDye1]: MISCELLANEOUS_EMOJIS.DyeGreen,
		[Cosmetic.WoodcuttingPleafulParentGreenDye2]: MISCELLANEOUS_EMOJIS.DyeGreen,
		[Cosmetic.WoodcuttingPleafulParentOutfit]: OUTFIT_EMOJIS.Outfit81,
		[Cosmetic.WoodcuttingPleafulParentBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.WoodcuttingPleafulParentSeasonalHeart]: SEASON_EMOJIS.BlueBirdHeart,
		[Cosmetic.NostalgicSparklerParentDye1]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.NostalgicSparklerParentHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory56,
		[Cosmetic.NostalgicSparklerParentPurpleDye]: MISCELLANEOUS_EMOJIS.DyePurple,
		[Cosmetic.NostalgicSparklerParentCyanDye]: MISCELLANEOUS_EMOJIS.DyeCyan,
		[Cosmetic.NostalgicSparklerParentCape]: CAPE_EMOJIS.Cape150,
		[Cosmetic.NostalgicSparklerParentDye2]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.NostalgicSparklerParentDye3]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.NostalgicSparklerParentDye4]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.NostalgicSparklerParentSeasonalHeart]: SEASON_EMOJIS.BlueBirdHeart,
		[Cosmetic.EmoteAmazed1]: EMOTE_EMOJIS.Amazed,
		[Cosmetic.EmoteAmazed2]: EMOTE_EMOJIS.Amazed,
		[Cosmetic.RoyalHairtousleTeenBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RoyalHairtousleTeenHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory20,
		[Cosmetic.EmoteAmazed3]: EMOTE_EMOJIS.Amazed,
		[Cosmetic.EmoteAmazed4]: EMOTE_EMOJIS.Amazed,
		[Cosmetic.RoyalHairtousleTeenOutfit]: OUTFIT_EMOJIS.Outfit82,
		[Cosmetic.RoyalHairtousleTeenBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.RoyalHairtousleTeenWhiteDye]: MISCELLANEOUS_EMOJIS.DyeWhite,
		[Cosmetic.RoyalHairtousleTeenCape]: CAPE_EMOJIS.Cape151,
		[Cosmetic.RoyalHairtousleTeenSeasonalHeart]: SEASON_EMOJIS.BlueBirdHeart,
		[Cosmetic.OceanWavesOutfit]: OUTFIT_EMOJIS.Outfit83,
		[Cosmetic.OceanMantaHair]: HAIR_EMOJIS.Hair163,
		[Cosmetic.OceanSeaFoamCape]: CAPE_EMOJIS.Cape152,
		[Cosmetic.OceanSeaFoamBoots]: SHOE_EMOJIS.Shoe22,
		[Cosmetic.OceanWavesMask]: MASK_EMOJIS.Mask100,
		[Cosmetic.BlueBirdGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.BlueBirdGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.EmoteCough3]: EMOTE_EMOJIS.Cough,
		[Cosmetic.EmoteCough4]: EMOTE_EMOJIS.Cough,
		[Cosmetic.BlueBirdGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.BlueBirdGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.BereftVeternWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.RainbowSmock]: OUTFIT_EMOJIS.Outfit84,
		[Cosmetic.RainbowHeadWrap]: HAIR_EMOJIS.Hair164,
		[Cosmetic.RainbowRibbonShawl]: CAPE_EMOJIS.Cape153,
		[Cosmetic.RainbowFacePaintMask]: MASK_EMOJIS.Mask101,
		[Cosmetic.BlueBirdGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.StanceSad]: STANCE_EMOJIS.Sad,
		[Cosmetic.RunningWayfarerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.SeedOfHopeWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.BlueBirdGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.BlueBirdGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.WorkshopShowAndTellProp1]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp83,
		[Cosmetic.WorkshopShowAndTellProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp84,
		[Cosmetic.WorkshopShowAndTellProp3]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp85,
		[Cosmetic.WorkshopShowAndTellProp4]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp89,
		[Cosmetic.WorkshopShowAndTellProp5]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp86,
		[Cosmetic.WorkshopShowAndTellProp6]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp90,
		[Cosmetic.WorkshopShowAndTellProp7]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp91,
		[Cosmetic.BlueBirdGuideQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.CallBlueBird]: CALL_EMOJIS.BlueBird,
		[Cosmetic.BlueBirdGuideProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp87,
		[Cosmetic.SkyAnniversaryHairAccessory5]: HAIR_ACCESSORY_EMOJIS.HairAccessory57,
		[Cosmetic.AnniversaryClapboard]: HELD_PROPS_EMOJIS.HeldProp53,
		[Cosmetic.AnniversaryMovieSeats]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp88,
		[Cosmetic.AnniversaryCinemaGlasses]: FACE_ACCESSORY_EMOJIS.FaceAccessory25,
		[Cosmetic.AnniversaryCinemaPopcorn]: HELD_PROPS_EMOJIS.HeldProp54,
		[Cosmetic.TGCWireframeCape]: CAPE_EMOJIS.Cape154,
		[Cosmetic.JollyGeologistWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.ButterflyBlossomMemento]: HAIR_ACCESSORY_EMOJIS.HairAccessory58,
		[Cosmetic.MiniManateeAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory59,
		[Cosmetic.CloakOfDarkness]: CAPE_EMOJIS.Cape155,
		[Cosmetic.VaultEldersLanternQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.VaultEldersLanternHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.TheTwoEmbersPendant]: NECKLACE_EMOJIS.Necklace48,
		[Cosmetic.VaultEldersLanternUltimateHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory60,
		[Cosmetic.VaultEldersLanternUltimateCape]: CAPE_EMOJIS.Cape156,
		[Cosmetic.TenderToymakerBlessing]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.TenderToymakerProp1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp92,
		[Cosmetic.TenderToymakerProp2]: HELD_PROPS_EMOJIS.HeldProp55,
		[Cosmetic.TenderToymakerDye1]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.TenderToymakerGreenDye]: MISCELLANEOUS_EMOJIS.DyeGreen,
		[Cosmetic.TenderToymakerOutfit]: OUTFIT_EMOJIS.Outfit85,
		[Cosmetic.TenderToymakerHair]: HAIR_EMOJIS.Hair165,
		[Cosmetic.TenderToymakerDye2]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.TenderToymakerSeasonalHeart]: SEASON_EMOJIS.TwoEmbersPart1Heart,
		[Cosmetic.StanceScarred]: STANCE_EMOJIS.Scarred,
		[Cosmetic.ScarredSentryHair1]: HAIR_EMOJIS.Hair166,
		[Cosmetic.ScarredSentryHair2]: HAIR_EMOJIS.Hair167,
		[Cosmetic.ScarredSentryPurpleDye]: MISCELLANEOUS_EMOJIS.DyePurple,
		[Cosmetic.ScarredSentryCape]: CAPE_EMOJIS.Cape157,
		[Cosmetic.ScarredSentryOutfit]: OUTFIT_EMOJIS.Outfit86,
		[Cosmetic.ScarredSentryShoes]: SHOE_EMOJIS.Shoe23,
		[Cosmetic.ScarredSentryProp1]: HELD_PROPS_EMOJIS.HeldProp56,
		[Cosmetic.ScarredSentryDye]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.ScarredSentryWhiteDye]: MISCELLANEOUS_EMOJIS.DyeWhite,
		[Cosmetic.ScarredSentryProp2]: HELD_PROPS_EMOJIS.HeldProp57,
		[Cosmetic.ScarredSentrySeasonalHeart]: SEASON_EMOJIS.TwoEmbersPart1Heart,
		[Cosmetic.CallManatee]: CALL_EMOJIS.Manatee,
		[Cosmetic.SternShepherdMusicSheet]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.SternShepherdHair]: HAIR_EMOJIS.Hair168,
		[Cosmetic.SternShepherdOutfit]: OUTFIT_EMOJIS.Outfit87,
		[Cosmetic.SternShepherdYellowDye]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.SternShepherdDye1]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.SternShepherdProp]: HELD_PROPS_EMOJIS.HeldProp58,
		[Cosmetic.SternShepherdMask]: MASK_EMOJIS.Mask102,
		[Cosmetic.SternShepherdDye2]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.SternShepherdSeasonalHeart]: SEASON_EMOJIS.TwoEmbersPart1Heart,
		[Cosmetic.ResourcefulRecluseMask]: MASK_EMOJIS.Mask103,
		[Cosmetic.ResourcefulRecluseBlessing]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ResourcefulRecluseDye1]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.ResourcefulRecluseOutfit]: OUTFIT_EMOJIS.Outfit88,
		[Cosmetic.ResourcefulRecluseProp1]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp89,
		[Cosmetic.ResourcefulRecluseBlackDye]: MISCELLANEOUS_EMOJIS.DyeBlack,
		[Cosmetic.ResourcefulRecluseDye2]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.ResourcefulRecluseProp2]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp90,
		[Cosmetic.ResourcefulRecluseSeasonalHeart]: SEASON_EMOJIS.TwoEmbersPart1Heart,
		[Cosmetic.SkyBalloonProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp91,
		[Cosmetic.BlueCarpet]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp93,
		[Cosmetic.AnniversarySuit]: OUTFIT_EMOJIS.Outfit89,
		[Cosmetic.BalloonArch]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp92,
		[Cosmetic.VaultEldersLanternQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.VaultEldersLanternHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.ManateePlush]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp94,
		[Cosmetic.SpiritedManateeTail]: NECKLACE_EMOJIS.Necklace49,
		[Cosmetic.SpiritedManateeHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory21,
		[Cosmetic.VestigeOfDarkDragonsTail]: NECKLACE_EMOJIS.Necklace50,
		[Cosmetic.VestigeOfDarkDragonsHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory22,
		[Cosmetic.VaultEldersLanternQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.VaultEldersLanternHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.VaultEldersLanternQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.VaultEldersLanternHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.AnniversaryGown]: OUTFIT_EMOJIS.Outfit90,
		[Cosmetic.AnniversaryShoes]: SHOE_EMOJIS.Shoe24,
		[Cosmetic.AnniversaryTuxedoCape]: CAPE_EMOJIS.Cape158,
		[Cosmetic.SkyCreatorAward]: null,
		[Cosmetic.TiptoeingTeaBrewerWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.WoundedWarriorWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.VaultEldersLanternQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.VaultEldersLanternHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.VaultEldersLanternProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp96,
		[Cosmetic.CaringCompanionQuest]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.CaringCompanionHeart]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.CaringCompanionProp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp97,
		[Cosmetic.SunlightShawl]: CAPE_EMOJIS.Cape159,
		[Cosmetic.SunlightWaveProjector]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp98,
		[Cosmetic.SunlightBonnetDress]: OUTFIT_EMOJIS.Outfit91,
		[Cosmetic.SunlightBonnetJellyfishHat]: HAIR_ACCESSORY_EMOJIS.HairAccessory61,
		[Cosmetic.SandcastlePiece1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp99,
		[Cosmetic.SandcastlePiece2]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp100,
		[Cosmetic.SandcastlePiece3]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp101,
		[Cosmetic.SandcastlePiece4]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp102,
		[Cosmetic.SandcastlePiece5]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp103,
		[Cosmetic.SandcastlePiece6]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp104,
		[Cosmetic.SandcastlePiece7]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp105,
		[Cosmetic.ProjectorOfMemories]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp106,
		[Cosmetic.MoonlightBanner]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp107,
		[Cosmetic.MoonlightTuftedTail]: NECKLACE_EMOJIS.Necklace51,
		[Cosmetic.MoonlightBasin]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp93,
		[Cosmetic.MoonlightGarlandCape]: CAPE_EMOJIS.Cape160,
		[Cosmetic.MigrationGuideQuest1]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationPendant]: NECKLACE_EMOJIS.Necklace52,
		[Cosmetic.NightbirdWhispererWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
		[Cosmetic.MigrationGuideUltimateShoes]: SHOE_EMOJIS.Shoe25,
		[Cosmetic.MigrationGuideUltimateOutfit]: OUTFIT_EMOJIS.Outfit92,
		[Cosmetic.MigrationGuideUltimateFaceAccessory]: FACE_ACCESSORY_EMOJIS.FaceAccessory26,
		[Cosmetic.CallLighthorn]: CALL_EMOJIS.Lighthorn,
		[Cosmetic.MusicSheetAncientEcho]: MISCELLANEOUS_EMOJIS.MusicSheet,
		[Cosmetic.MigratingBellmakerHair]: HAIR_EMOJIS.Hair169,
		[Cosmetic.MigratingBellmakerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingBellmakerDye]: MISCELLANEOUS_EMOJIS.Dye,
		[Cosmetic.MigratingBellmakerBlueDye]: MISCELLANEOUS_EMOJIS.DyeBlue,
		[Cosmetic.MigratingBellmakerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingBellmakerHeadAccessory]: HEAD_ACCESSORY_EMOJIS.HeadAccessory23,
		[Cosmetic.MigratingBellmakerCape]: CAPE_EMOJIS.Cape161,
		[Cosmetic.MigratingBellmakerTrust]: MISCELLANEOUS_EMOJIS.Trust,
		[Cosmetic.MigratingBellmakerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingBellmakerSeasonalHeart]: SEASON_EMOJIS.MigrationHeart,
		[Cosmetic.EmoteFlightRun1]: EMOTE_EMOJIS.FlightRun,
		[Cosmetic.MigratingBirdWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingBirdWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteFlightRun2]: EMOTE_EMOJIS.FlightRun,
		[Cosmetic.EmoteFlightRun3]: EMOTE_EMOJIS.FlightRun,
		[Cosmetic.MigratingBirdWhispererOutfit]: OUTFIT_EMOJIS.Outfit93,
		[Cosmetic.MigratingBirdWhispererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingBirdWhispererBlueDye]: MISCELLANEOUS_EMOJIS.DyeBlue,
		[Cosmetic.MigratingBirdWhispererTrust]: MISCELLANEOUS_EMOJIS.Trust,
		[Cosmetic.EmoteFlightRun4]: EMOTE_EMOJIS.FlightRun,
		[Cosmetic.MigratingBirdWhispererCape]: CAPE_EMOJIS.Cape162,
		[Cosmetic.MigratingBirdWhispererSeasonalHeart]: SEASON_EMOJIS.MigrationHeart,
		[Cosmetic.EmoteDizzy1]: EMOTE_EMOJIS.Dizzy,
		[Cosmetic.MigratingButterflyCharmerBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingButterflyCharmerYellowDye]: MISCELLANEOUS_EMOJIS.DyeYellow,
		[Cosmetic.EmoteDizzy2]: EMOTE_EMOJIS.Dizzy,
		[Cosmetic.EmoteDizzy3]: EMOTE_EMOJIS.Dizzy,
		[Cosmetic.MigratingButterflyCharmerCape]: CAPE_EMOJIS.Cape163,
		[Cosmetic.MigratingButterflyCharmerBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingButterflyCharmerBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingButterflyCharmerTrust]: MISCELLANEOUS_EMOJIS.Trust,
		[Cosmetic.EmoteDizzy4]: EMOTE_EMOJIS.Dizzy,
		[Cosmetic.MigratingButterflyCharmerHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory62,
		[Cosmetic.MigratingButterflyCharmerSeasonalHeart]: SEASON_EMOJIS.MigrationHeart,
		[Cosmetic.EmoteJellyfishDance1]: EMOTE_EMOJIS.JellyfishDance,
		[Cosmetic.MigratingJellyWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingJellyWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteJellyfishDance2]: EMOTE_EMOJIS.JellyfishDance,
		[Cosmetic.EmoteJellyfishDance3]: EMOTE_EMOJIS.JellyfishDance,
		[Cosmetic.MigratingJellyWhispererCyanDye]: MISCELLANEOUS_EMOJIS.DyeCyan,
		[Cosmetic.MigratingJellyWhispererOutfit]: OUTFIT_EMOJIS.Outfit94,
		[Cosmetic.MigratingJellyWhispererHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory63,
		[Cosmetic.MigratingJellyWhispererTrust]: MISCELLANEOUS_EMOJIS.Trust,
		[Cosmetic.EmoteJellyfishDance4]: EMOTE_EMOJIS.JellyfishDance,
		[Cosmetic.MigratingJellyWhispererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingJellyWhispererSeasonalHeart]: SEASON_EMOJIS.MigrationHeart,
		[Cosmetic.EmoteFlagSignal1]: EMOTE_EMOJIS.FlagSignal,
		[Cosmetic.MigratingMantaWhispererBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingMantaWhispererHair]: HAIR_EMOJIS.Hair170,
		[Cosmetic.MigratingMantaWhispererBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.EmoteFlagSignal2]: EMOTE_EMOJIS.FlagSignal,
		[Cosmetic.EmoteFlagSignal3]: EMOTE_EMOJIS.FlagSignal,
		[Cosmetic.MigratingMantaWhispererBlessing3]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigratingMantaWhispererCape]: CAPE_EMOJIS.Cape164,
		[Cosmetic.MigratingMantaWhispererWhiteDye]: MISCELLANEOUS_EMOJIS.DyeWhite,
		[Cosmetic.MigratingMantaWhispererTrust]: MISCELLANEOUS_EMOJIS.Trust,
		[Cosmetic.EmoteFlagSignal4]: EMOTE_EMOJIS.FlagSignal,
		[Cosmetic.MigratingMantaWhispererOutfit]: OUTFIT_EMOJIS.Outfit95,
		[Cosmetic.MigratingMantaWhispererSeasonalHeart]: SEASON_EMOJIS.MigrationHeart,
		[Cosmetic.MigrationGuideQuest2]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideHeart1]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MigrationGuideHeart2]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MischiefPuzzlewrightsBrimmedHat]: HAIR_EMOJIS.Hair171,
		[Cosmetic.MischiefFelineEars]: HAIR_ACCESSORY_EMOJIS.HairAccessory64,
		[Cosmetic.MischiefFelineTail]: NECKLACE_EMOJIS.Necklace53,
		[Cosmetic.MischiefBeakMask]: MASK_EMOJIS.Mask104,
		[Cosmetic.MischiefGothCape]: CAPE_EMOJIS.Cape165,
		[Cosmetic.MischiefLeafHat]: HAIR_ACCESSORY_EMOJIS.HairAccessory65,
		[Cosmetic.MischiefCrabkinLamp]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp108,
		[Cosmetic.MischiefCobwebDecor]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp109,
		[Cosmetic.MischiefDarkDragonRug]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp110,
		[Cosmetic.MischiefWitheredSapling]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp94,
		[Cosmetic.MischiefSymbol1]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp111,
		[Cosmetic.MischiefSymbol2]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp112,
		[Cosmetic.MischiefSymbol3]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp113,
		[Cosmetic.MischiefSymbol4]: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp114,
		[Cosmetic.PuzzleBox]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp95,
		[Cosmetic.PuzzleChest]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp96,
		[Cosmetic.PuzzleCage]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp97,
		[Cosmetic.MigrationGuideQuest3]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideQuest4]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideHeart3]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MigrationGuideHeart4]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MigrationGuideQuest5]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideHeart5]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MigrationGuideHeart6]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.MigrationGuideHeart7]: MISCELLANEOUS_EMOJIS.Heart,
		[Cosmetic.PeekingPostmanShoes]: SHOE_EMOJIS.Shoe05,
		[Cosmetic.MigrationGuideQuest6]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideQuest7]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideProp]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp98,
		[Cosmetic.ElderOfTheValleyBlessing1]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.ElderOfTheValleyBlessing2]: MISCELLANEOUS_EMOJIS.Blessing3,
		[Cosmetic.MigrationGuideQuest8]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.WinterScarfCape]: CAPE_EMOJIS.Cape166,
		[Cosmetic.FluffyWinterWearHairAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory66,
		[Cosmetic.FluffyWinterWearShoes]: SHOE_EMOJIS.Shoe26,
		[Cosmetic.SnowkidAccessory]: HAIR_ACCESSORY_EMOJIS.HairAccessory67,
		[Cosmetic.DaysOfFeast2025Cape]: CAPE_EMOJIS.Cape167,
		[Cosmetic.DaysOfFeast2025Outfit]: OUTFIT_EMOJIS.Outfit96,
		[Cosmetic.HorizontalIceBlock]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp99,
		[Cosmetic.VerticalIceBlock]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp100,
		[Cosmetic.IceConcaveSlide]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp101,
		[Cosmetic.IceConvexSlide]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp102,
		[Cosmetic.IceStool]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp103,
		[Cosmetic.IceSmallTable]: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp104,
		[Cosmetic.MigrationGuideQuest9]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.MigrationGuideQuest10]: MISCELLANEOUS_EMOJIS.Quest,
		[Cosmetic.ElderOfTheValleyFaceAccessory1]: null,
		[Cosmetic.ElderOfTheValleyFaceAccessory2]: null,
		[Cosmetic.AsceticMonkWingBuff]: MISCELLANEOUS_EMOJIS.WingBuff,
	} as const satisfies Readonly<Record<Cosmetic, Emoji | null>>;

	const SeasonIdToSeasonalEmoji = {
		[SeasonId.Gratitude]: SEASON_EMOJIS.Gratitude,
		[SeasonId.Lightseekers]: SEASON_EMOJIS.Lightseekers,
		[SeasonId.Belonging]: SEASON_EMOJIS.Belonging,
		[SeasonId.Rhythm]: SEASON_EMOJIS.Rhythm,
		[SeasonId.Enchantment]: SEASON_EMOJIS.Enchantment,
		[SeasonId.Sanctuary]: SEASON_EMOJIS.Sanctuary,
		[SeasonId.Prophecy]: SEASON_EMOJIS.Prophecy,
		[SeasonId.Dreams]: SEASON_EMOJIS.Dreams,
		[SeasonId.Assembly]: SEASON_EMOJIS.Assembly,
		[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrince,
		[SeasonId.Flight]: SEASON_EMOJIS.Flight,
		[SeasonId.Abyss]: SEASON_EMOJIS.Abyss,
		[SeasonId.Performance]: SEASON_EMOJIS.Performance,
		[SeasonId.Shattering]: SEASON_EMOJIS.Shattering,
		[SeasonId.AURORA]: SEASON_EMOJIS.Aurora,
		[SeasonId.Remembrance]: SEASON_EMOJIS.Remembrance,
		[SeasonId.Passage]: SEASON_EMOJIS.Passage,
		[SeasonId.Moments]: SEASON_EMOJIS.Moments,
		[SeasonId.Revival]: SEASON_EMOJIS.Revival,
		[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeer,
		[SeasonId.Nesting]: SEASON_EMOJIS.Nesting,
		[SeasonId.Duets]: SEASON_EMOJIS.Duets,
		[SeasonId.Moomin]: SEASON_EMOJIS.Moomin,
		[SeasonId.Radiance]: SEASON_EMOJIS.Radiance,
		[SeasonId.BlueBird]: SEASON_EMOJIS.BlueBird,
		[SeasonId.TwoEmbersPart1]: SEASON_EMOJIS.TwoEmbersPart1,
		[SeasonId.Migration]: SEASON_EMOJIS.Migration,
	} as const satisfies Readonly<Record<SeasonIds, Emoji | null>>;

	const SeasonIdToSeasonalCandleEmoji = {
		[SeasonId.Gratitude]: SEASON_EMOJIS.GratitudeCandle,
		[SeasonId.Lightseekers]: SEASON_EMOJIS.LightseekersCandle,
		[SeasonId.Belonging]: SEASON_EMOJIS.BelongingCandle,
		[SeasonId.Rhythm]: SEASON_EMOJIS.RhythmCandle,
		[SeasonId.Enchantment]: SEASON_EMOJIS.EnchantmentCandle,
		[SeasonId.Sanctuary]: SEASON_EMOJIS.SanctuaryCandle,
		[SeasonId.Prophecy]: SEASON_EMOJIS.ProphecyCandle,
		[SeasonId.Dreams]: SEASON_EMOJIS.DreamsCandle,
		[SeasonId.Assembly]: SEASON_EMOJIS.AssemblyCandle,
		[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrinceCandle,
		[SeasonId.Flight]: SEASON_EMOJIS.FlightCandle,
		[SeasonId.Abyss]: SEASON_EMOJIS.AbyssCandle,
		[SeasonId.Performance]: SEASON_EMOJIS.PerformanceCandle,
		[SeasonId.Shattering]: SEASON_EMOJIS.ShatteringCandle,
		[SeasonId.AURORA]: SEASON_EMOJIS.AuroraCandle,
		[SeasonId.Remembrance]: SEASON_EMOJIS.RemembranceCandle,
		[SeasonId.Passage]: SEASON_EMOJIS.PassageCandle,
		[SeasonId.Moments]: SEASON_EMOJIS.MomentsCandle,
		[SeasonId.Revival]: SEASON_EMOJIS.RevivalCandle,
		[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerCandle,
		[SeasonId.Nesting]: SEASON_EMOJIS.NestingCandle,
		[SeasonId.Duets]: SEASON_EMOJIS.DuetsCandle,
		[SeasonId.Moomin]: SEASON_EMOJIS.MoominCandle,
		[SeasonId.Radiance]: SEASON_EMOJIS.RadianceCandle,
		[SeasonId.BlueBird]: SEASON_EMOJIS.BlueBirdCandle,
		[SeasonId.TwoEmbersPart1]: SEASON_EMOJIS.TwoEmbersPart1Candle,
		[SeasonId.Migration]: SEASON_EMOJIS.MigrationCandle,
	} as const satisfies Readonly<Record<SeasonIds, Emoji>>;

	const SeasonIdToSeasonalHeartEmoji = {
		[SeasonId.Belonging]: SEASON_EMOJIS.BelongingHeart,
		[SeasonId.Rhythm]: SEASON_EMOJIS.RhythmHeart,
		[SeasonId.Enchantment]: SEASON_EMOJIS.EnchantmentHeart,
		[SeasonId.Sanctuary]: SEASON_EMOJIS.SanctuaryHeart,
		[SeasonId.Prophecy]: SEASON_EMOJIS.ProphecyHeart,
		[SeasonId.Dreams]: SEASON_EMOJIS.DreamsHeart,
		[SeasonId.Assembly]: SEASON_EMOJIS.AssemblyHeart,
		[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrinceHeart,
		[SeasonId.Flight]: SEASON_EMOJIS.FlightHeart,
		[SeasonId.Abyss]: SEASON_EMOJIS.AbyssHeart,
		[SeasonId.Performance]: SEASON_EMOJIS.PerformanceHeart,
		[SeasonId.Shattering]: SEASON_EMOJIS.ShatteringHeart,
		[SeasonId.AURORA]: SEASON_EMOJIS.AuroraHeart,
		[SeasonId.Remembrance]: SEASON_EMOJIS.RemembranceHeart,
		[SeasonId.Passage]: SEASON_EMOJIS.PassageHeart,
		[SeasonId.Moments]: SEASON_EMOJIS.MomentsHeart,
		[SeasonId.Revival]: SEASON_EMOJIS.RevivalHeart,
		[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerHeart,
		[SeasonId.Nesting]: SEASON_EMOJIS.NestingHeart,
		[SeasonId.Duets]: SEASON_EMOJIS.DuetsHeart,
		[SeasonId.Moomin]: SEASON_EMOJIS.MoominHeart,
		[SeasonId.Radiance]: SEASON_EMOJIS.RadianceHeart,
		[SeasonId.BlueBird]: SEASON_EMOJIS.BlueBirdHeart,
		[SeasonId.TwoEmbersPart1]: SEASON_EMOJIS.TwoEmbersPart1Heart,
		[SeasonId.Migration]: SEASON_EMOJIS.MigrationHeart,
	} as const satisfies Readonly<
		Record<
			Exclude<SeasonIds, typeof SeasonId.Gratitude | typeof SeasonId.Lightseekers>,
			Emoji | null
		>
	>;

	const EventIdToEventTicketEmoji = {
		// 2019.
		[EventId.HalloweenOfficeEvent2019]: null,
		[EventId.DaysOfGiving2019]: null,
		[EventId.DaysOfFeast2019]: null,

		// 2020.
		[EventId.LunarNewYear2020]: null,
		[EventId.DaysOfLove2020]: null,
		[EventId.DaysOfSpring2020]: null,
		[EventId.DaysOfNature2020]: null,
		[EventId.DaysOfHealing2020]: null,
		[EventId.DaysOfRainbow2020]: null,
		[EventId.SkyAnniversary2020]: null,
		[EventId.DaysOfSummerLights2020]: null,
		[EventId.DaysOfMischief2020]: null,
		[EventId.DaysOfGiving2020]: null,
		[EventId.DaysOfFeast2020]: null,

		// 2021.
		[EventId.DaysOfFortune2021]: null,
		[EventId.DaysOfLove2021]: null,
		[EventId.DaysOfBloom2021]: null,
		[EventId.DaysOfNature2021]: null,
		[EventId.ChildrensDay2021]: null,
		[EventId.DaysOfRainbow2021]: null,
		[EventId.SkyAnniversary2021]: null,
		[EventId.DaysOfSummer2021]: null,
		[EventId.DaysOfSummerLights2021]: null,
		[EventId.DaysOfGiving2021]: null,
		[EventId.DaysOfMischief2021]: null,
		[EventId.DaysOfFeast2021]: null,

		// 2022.
		[EventId.DaysOfFortune2022]: null,
		[EventId.DaysOfLove2022]: null,
		[EventId.KizunaAI2022]: null,
		[EventId.DaysOfBloom2022]: null,
		[EventId.DaysOfNature2022]: null,
		[EventId.HarmonyHallGrandOpening2022]: null,
		[EventId.DaysOfRainbow2022]: null,
		[EventId.SkyAnniversary2022]: null,
		[EventId.DaysOfSunlight2022]: null,
		[EventId.LazyDays2022]: null,
		[EventId.DaysOfMischief2022]: null,
		[EventId.DaysOfGiving2022]: null,
		[EventId.DaysOfFeast2022]: null,

		// 2023.
		[EventId.DaysOfFortune2023]: null,
		[EventId.DaysOfLove2023]: null,
		[EventId.DaysOfBloom2023]: null,
		[EventId.DaysOfNature2023]: null,
		[EventId.DaysOfColour2023]: EVENT_EMOJIS.Colour,
		[EventId.DaysOfMusic2023]: EVENT_EMOJIS.Music,
		[EventId.SkyAnniversary2023]: EVENT_EMOJIS.SkyAnniversary,
		[EventId.AURORAEncoreConcerts2023]: EVENT_EMOJIS.AURORAEncore,
		[EventId.DaysOfSunlight2023]: EVENT_EMOJIS.Sunlight,
		[EventId.DaysOfStyle2023]: EVENT_EMOJIS.Style,
		[EventId.DaysOfMischief2023]: EVENT_EMOJIS.Mischief,
		[EventId.DaysOfGiving2023]: null,
		[EventId.AviarysFireworkFestival2023]: EVENT_EMOJIS.AviarysFireworkFestival,
		[EventId.DaysOfFeast2023]: EVENT_EMOJIS.Feast,

		// 2024.
		[EventId.DaysOfFortune2024]: EVENT_EMOJIS.Fortune,
		[EventId.DaysOfLove2024]: EVENT_EMOJIS.Love,
		[EventId.SpringCamping2024]: null,
		[EventId.DaysOfBloom2024]: EVENT_EMOJIS.Bloom,
		[EventId.SkyXCinnamorollPopUpCafe2024]: EVENT_EMOJIS.SkyXCinnamorollPopUpCafe,
		[EventId.DaysOfNature2024]: EVENT_EMOJIS.Nature,
		[EventId.DaysOfColour2024]: EVENT_EMOJIS.Colour,
		[EventId.SkyFest2024]: EVENT_EMOJIS.SkyFest,
		[EventId.TournamentOfTriumph2024]: EVENT_EMOJIS.TournamentOfTriumph,
		[EventId.DaysOfSunlight2024]: EVENT_EMOJIS.Sunlight,
		[EventId.DaysOfMoonlight2024]: EVENT_EMOJIS.Moonlight,
		[EventId.DaysOfStyle2024]: EVENT_EMOJIS.Style,
		[EventId.DaysOfMischief2024]: EVENT_EMOJIS.Mischief,
		[EventId.DaysOfMusic2024]: EVENT_EMOJIS.Music,
		[EventId.DaysOfGiving2024]: null,
		[EventId.SkyXAlicesWonderlandCafe2024]: EVENT_EMOJIS.Feast,

		// 2025.
		[EventId.DaysOfFortune2025]: EVENT_EMOJIS.Fortune,
		[EventId.DaysOfLove2025]: EVENT_EMOJIS.Love,
		[EventId.DaysOfTreasure2025]: EVENT_EMOJIS.Treasure,
		[EventId.DaysOfBloom2025]: EVENT_EMOJIS.Bloom,
		[EventId.DaysOfNature2025]: EVENT_EMOJIS.Nature,
		[EventId.DaysOfColour2025]: EVENT_EMOJIS.Colour,
		[EventId.AURORAHomecoming2025]: null,
		[EventId.WorkshopShowAndTell2025]: null,
		[EventId.SkyAnniversary2025]: EVENT_EMOJIS.SkyFest,
		[EventId.DaysOfSunlight2025]: EVENT_EMOJIS.Sunlight,
		[EventId.DaysOfMoonlight2025]: EVENT_EMOJIS.Moonlight,
		[EventId.RadianceEvent2025]: null,
		[EventId.DaysOfMischief2025]: EVENT_EMOJIS.Mischief,
		[EventId.DaysOfGiving2025]: null,
		[EventId.RadianceEvent22025]: null,
		[EventId.DaysOfFeast2025]: EVENT_EMOJIS.Feast,
	} as const satisfies Readonly<Record<EventIds, Emoji | null>>;

	return {
		...emojis,
		CosmeticToEmoji,
		SeasonIdToSeasonalEmoji,
		SeasonIdToSeasonalCandleEmoji,
		SeasonIdToSeasonalHeartEmoji,
		EventIdToEventTicketEmoji,
	};
}

export function formatEmoji(emoji: Emoji) {
	return emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
}

export function formatEmojiURL(id: Snowflake) {
	return `https://cdn.discordapp.com/emojis/${id}.webp`;
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
