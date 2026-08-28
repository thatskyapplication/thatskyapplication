import type { Emoji } from "./emoji.js";

const MISCELLANEOUS_EMOJIS = {
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
	DyeRed: { id: "1512760357171626074", name: "dye_red" },
	DyeYellow: { id: "1512760360560492664", name: "dye_yellow" },
	DyeGreen: { id: "1512760344957681704", name: "dye_green" },
	DyeCyan: { id: "1512760342130856076", name: "dye_cyan" },
	DyeBlue: { id: "1512760339698159737", name: "dye_blue" },
	DyePurple: { id: "1512760355271741490", name: "dye_purple" },
	DyeBlack: { id: "1512760729130893332", name: "dye_black" },
	DyeWhite: { id: "1512760358753009775", name: "dye_white" },
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
	CurrentPosition: { id: "1466208837492146299", name: "current_position" },
	Counsellor: { id: "1466368079058440255", name: "counsellor" },
	Champion: { id: "1466368074201432104", name: "champion" },
	Teacher: { id: "1466368110570508419", name: "teacher" },
	Healer: { id: "1466368080904196185", name: "healer" },
	Architect: { id: "1466368071747895316", name: "architect" },
	Marshall: { id: "1466368090005569648", name: "marshall" },
	Mastermind: { id: "1466368092404842637", name: "mastermind" },
	Inventor: { id: "1466368087795306591", name: "inventor" },
	Promoter: { id: "1466368100701310996", name: "promoter" },
	Composer: { id: "1466368077154484247", name: "composer" },
	Performer: { id: "1466368097924681768", name: "performer" },
	Operator: { id: "1466368095030607884", name: "operator" },
	Inspector: { id: "1466368085740093622", name: "inspector" },
	Supervisor: { id: "1466368108808765574", name: "supervisor" },
	Protector: { id: "1466368102760579218", name: "protector" },
	Provider: { id: "1466368104752873658", name: "provider" },
	QuestionMark: { id: "1489893234116399114", name: "question_mark" },
	TreasureCandle: { id: "1512540307886047303", name: "treasure_candle" },
	MomentsCameraUpgrade: { id: "1522921691653607474", name: "moments_camera_upgrade" },
} as const satisfies Readonly<Record<string, Emoji>>;

const EMOTE_EMOJIS = {
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
	CuteClap: { id: "1464068296121913491", name: "cute_clap" },
	Approve: { id: "1494852636325974177", name: "approve" },
	Breakdance: { id: "1494738860272259183", name: "breakdance" },
	BallSpinTrick: { id: "1494827787108876350", name: "ball_spin_trick" },
	TakeNotes: { id: "1494847001861292123", name: "take_notes" },
	Frustration: { id: "1527614975676252251", name: "frustration" },
	Bask: { id: "1527614972656484422", name: "bask" },
	Draw: { id: "1527614974044798986", name: "draw" },
	SlowWalk: { id: "1527614977505103912", name: "slow_walk" },
} as const satisfies Readonly<Record<string, Emoji>>;

const STANCE_EMOJIS = {
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

const CALL_EMOJIS = {
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

const FRIEND_ACTION_EMOJIS = {
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
	RevolvingDance: { id: "1464062658297860147", name: "revolving_dance" },
	SecretHandshake: { id: "1464064360862191820", name: "secret_handshake" },
	Whisper: { id: "1464066210638598343", name: "whisper" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SEASON_EMOJIS = {
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
	Migration: { id: "1536651408525492344", name: "migration" },
	MigrationCandle: { id: "1429514486049542334", name: "migration_candle" },
	MigrationHeart: { id: "1429514579863670784", name: "migration_heart" },
	Lightmending: { id: "1461598394907758592", name: "lightmending" },
	LightmendingCandle: { id: "1461598409705259029", name: "lightmending_candle" },
	LightmendingHeart: { id: "1461598427505885317", name: "lightmending_heart" },
	Carnival: { id: "1536652027059380295", name: "carnival" },
	CarnivalCandle: { id: "1494462023965085846", name: "carnival_candle" },
	CarnivalHeart: { id: "1494462025814773831", name: "carnival_heart" },
	DearVanGogh: { id: "1514530654384164884", name: "dear_van_gogh" },
	DearVanGoghCandle: { id: "1527600208177926224", name: "dear_van_gogh_candle" },
	DearVanGoghHeart: { id: "1527600210325536879", name: "dear_van_gogh_heart" },
} as const satisfies Readonly<Record<string, Emoji>>;

const EVENT_EMOJIS = {
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

const OUTFIT_EMOJIS = {
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
	/**
	 * Lightmending Champion.
	 */
	Outfit97: { id: "1464063594055336079", name: "97_outfit" },
	/**
	 * Lightmending Light Scholar.
	 */
	Outfit98: { id: "1464067775189356666", name: "98_outfit" },
	/**
	 * Lightmending Pioneer.
	 */
	Outfit99: { id: "1464069073997533184", name: "99_outfit" },
	/**
	 * Tournament Sleek Skating Set.
	 */
	Outfit100: { id: "1469073919960154173", name: "100_outfit" },
	/**
	 * Fortune Pleated Dress.
	 */
	Outfit101: { id: "1471652521775861810", name: "101_outfit" },
	/**
	 * Days of Bloom 2026.
	 */
	Outfit102: { id: "1482684563519180921", name: "102_outfit" },
	/**
	 * Bloom Sunflower Sundress.
	 */
	Outfit103: { id: "1482684567012901069", name: "103_outfit" },
	/**
	 * Charming Creature outfit.
	 */
	Outfit104: { id: "1492226476723146883", name: "104_outfit" },
	/**
	 * Carnival Athletic Dancer.
	 */
	Outfit105: { id: "1494755154891636848", name: "105_outfit" },
	/**
	 * Carnival Juggler.
	 */
	Outfit106: { id: "1494828828315615304", name: "106_outfit" },
	/**
	 * Carnival Puzzle Director.
	 */
	Outfit107: { id: "1494847933030338591", name: "107_outfit" },
	/**
	 * Carnival Stunt Actor.
	 */
	Outfit108: { id: "1495324960066109460", name: "108_outfit" },
	/**
	 * Days of Treasure 2026.
	 */
	Outfit109: { id: "1502282536955547809", name: "109_outfit" },
	/**
	 * Rainbow Tied Jumpsuit.
	 */
	Outfit110: { id: "1510010628541124638", name: "110_outfit" },
	/**
	 * Dutch Memory.
	 */
	Outfit111: { id: "1529590597973967019", name: "111_outfit" },
	/**
	 * Sunlight Diver Duo.
	 */
	Outfit112: { id: "1532453826991231086", name: "112_outfit" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SHOE_EMOJIS = {
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
	 * Moonlight Bunny Slippers.
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
	/**
	 * Tournament Sleek Skating Set.
	 */
	Shoe27: { id: "1469074426472431748", name: "27_shoe" },
	/**
	 * Oreo Slippers.
	 */
	Shoe28: { id: "1522919376397926502", name: "28_shoe" },
	/**
	 * Rustic Memory.
	 */
	Shoe29: { id: "1529592858762285126", name: "29_shoe" },
	/**
	 * Sunlight Diver Duo.
	 */
	Shoe30: { id: "1532453819273969935", name: "30_shoe" },
} as const satisfies Readonly<Record<string, Emoji>>;

const MASK_EMOJIS = {
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
	 * Rainbow Facepaint.
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
	/**
	 * Lightmending Guide (ultimate).
	 */
	Mask105: { id: "1464005109485928663", name: "105_mask" },
	/**
	 * Lightmending Champion.
	 */
	Mask106: { id: "1464063047474872514", name: "106_mask" },
	/**
	 * Lightmending Light Catcher.
	 */
	Mask107: { id: "1464064636205666376", name: "107_mask" },
	/**
	 * Lightmending Light Scholar.
	 */
	Mask108: { id: "1464067051474911355", name: "108_mask" },
	/**
	 * Lightmending Pioneer.
	 */
	Mask109: { id: "1464068850210308169", name: "109_mask" },
	/**
	 * Days of Fortune 2026.
	 */
	Mask110: { id: "1471652335695433728", name: "110_mask" },
	/**
	 * Carnival Athletic Dancer.
	 */
	Mask111: { id: "1494754833012359228", name: "111_mask" },
	/**
	 * Carnival Juggler.
	 */
	Mask112: { id: "1494828277305442370", name: "112_mask" },
	/**
	 * Rainbow mask.
	 */
	Mask113: { id: "1510009681383391394", name: "113_mask" },
	/**
	 * Starry Night's Visage.
	 */
	Mask114: { id: "1528914483206946886", name: "114_mask" },
	/**
	 * Days of Sunlight 2026.
	 */
	Mask115: { id: "1532453829625253969", name: "115_mask" },
	/**
	 * Feathery Lash Mask.
	 */
	Mask116: { id: "1542584844456824832", name: "116_mask" },
} as const satisfies Readonly<Record<string, Emoji>>;

const FACE_ACCESSORY_EMOJIS = {
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
	/**
	 * Elder of the Valley 1.
	 */
	FaceAccessory27: { id: "1456314912082231399", name: "27_face_accessory" },
	/**
	 * Elder of the Valley 2.
	 */
	FaceAccessory28: { id: "1456314918012981268", name: "28_face_accessory" },
	/**
	 * Personality Quiz Event 1.
	 */
	FaceAccessory29: { id: "1459119275548741683", name: "29_face_accessory" },
	/**
	 * Personality Quiz Event 2.
	 */
	FaceAccessory30: { id: "1459119279403302944", name: "30_face_accessory" },
	/**
	 * Purple Spectacles.
	 */
	FaceAccessory31: { id: "1459119281328619530", name: "31_face_accessory" },
	/**
	 * Fortune Token Glasses.
	 */
	FaceAccessory32: { id: "1471652959086575636", name: "32_face_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const NECKLACE_EMOJIS = {
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
	 * Sunlight Jelly Shoulder Buddy.
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
	Necklace52: { id: "1536651647885778974", name: "52_necklace" },
	/**
	 * Mischief Feline Tail.
	 */
	Necklace53: { id: "1433197642007183430", name: "53_necklace" },
	/**
	 * Lightmending Pendant.
	 */
	Necklace54: { id: "1458424276267958325", name: "54_necklace" },
	/**
	 * Carnival Pendant.
	 */
	Necklace55: { id: "1536651900454178926", name: "55_necklace" },
	/**
	 * Carnival Juggler.
	 */
	Necklace56: { id: "1494828634656083998", name: "56_necklace" },
	/**
	 * Treasure Mate Companion.
	 */
	Necklace57: { id: "1502284976308224193", name: "57_necklace" },
	/**
	 * Starry Night's Mantle necklace.
	 */
	Necklace58: { id: "1529496729525686373", name: "58_necklace" },
	/**
	 * Dear Van Gogh pendant.
	 */
	Necklace59: { id: "1529583308285935836", name: "59_necklace" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HAIR_EMOJIS = {
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
	 * Days of Love Amethyst-Tipped Tails.
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
	/**
	 * Lightmending Guide (ultimate).
	 */
	Hair172: { id: "1464005115424936119", name: "172_hair" },
	/**
	 * Lightmending Light Scholar.
	 */
	Hair173: { id: "1464066526289199256", name: "173_hair" },
	/**
	 * Lightmending Pioneer.
	 */
	Hair174: { id: "1464068537059381248", name: "174_hair" },
	/**
	 * Tournament of Triumph 2026.
	 */
	Hair175: { id: "1469073568871481487", name: "175_hair" },
	/**
	 * Fortune Ribboned Ponytail.
	 */
	Hair176: { id: "1471652711874298128", name: "176_hair" },
	/**
	 * Days of Bloom 2026.
	 */
	Hair177: { id: "1482684921666600971", name: "177_hair" },
	/**
	 * Days of Nature 2026.
	 */
	Hair178: { id: "1492226482809077831", name: "178_hair" },
	/**
	 * Carnival Guide (ultimate).
	 */
	Hair179: { id: "1494707953767550976", name: "179_hair" },
	/**
	 * Carnival Puzzle Director.
	 */
	Hair180: { id: "1494848161293008966", name: "180_hair" },
	/**
	 * Carnival Stunt Actor.
	 */
	Hair181: { id: "1495326245741924452", name: "181_hair" },
	/**
	 * Days of Treasure 2026.
	 */
	Hair182: { id: "1502282947460595833", name: "182_hair" },
	/**
	 * Days of Colour 2026.
	 */
	Hair183: { id: "1509849075078398082", name: "183_hair" },
	/**
	 * Vase with Fifteen Sunflowers (ultimate).
	 */
	Hair184: { id: "1529588116707348671", name: "184_hair" },
	/**
	 * Dutch Memory.
	 */
	Hair185: { id: "1529590602721657054", name: "185_hair" },
	/**
	 * Joyful Memory.
	 */
	Hair186: { id: "1529596982967144719", name: "186_hair" },
	/**
	 * Days of Sunlight 2026.
	 */
	Hair187: { id: "1532453836591988857", name: "187_hair" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HAIR_ACCESSORY_EMOJIS = {
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
	 * Summer Seashell Hairpin.
	 */
	HairAccessory08: { id: "1313936946892116028", name: "08_hair_accessory" },
	/**
	 * Moonlight Bunny Accessory.
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
	 * Anniversary Oreo Headband.
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
	 * Days of Love Amethyst Accessory.
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
	/**
	 * Personality Quiz Event 1.
	 */
	HairAccessory68: { id: "1459119282951819507", name: "68_hair_accessory" },
	/**
	 * Personality Quiz Event 2.
	 */
	HairAccessory69: { id: "1459119286512521216", name: "69_hair_accessory" },
	/**
	 * Blue Pinned Cap.
	 */
	HairAccessory70: { id: "1459119288538501151", name: "70_hair_accessory" },
	/**
	 * Green Folded Ears.
	 */
	HairAccessory71: { id: "1459119290165891093", name: "71_hair_accessory" },
	/**
	 * Yellow Paintbrush.
	 */
	HairAccessory72: { id: "1459119292107984906", name: "72_hair_accessory" },
	/**
	 * Lightmending Light Catcher.
	 */
	HairAccessory73: { id: "1464064960127697088", name: "73_hair_accessory" },
	/**
	 * Ocean Veil hair accessory.
	 */
	HairAccessory74: { id: "1492226474005238001", name: "74_hair_accessory" },
	/**
	 * Spring Clover Sprout.
	 */
	HairAccessory75: { id: "1497104996200747029", name: "75_hair_accessory" },
	/**
	 * Carnival Puzzle Director.
	 */
	HairAccessory76: { id: "1494848433889214524", name: "76_hair_accessory" },
	/**
	 * Carnival Stunt Actor.
	 */
	HairAccessory77: { id: "1495325739581444197", name: "77_hair_accessory" },
	/**
	 * Treasure Seekers' Hat.
	 */
	HairAccessory78: { id: "1502284138538074253", name: "78_hair_accessory" },
	/**
	 * FlOw flower.
	 */
	HairAccessory79: { id: "1506644769697431622", name: "79_hair_accessory" },
	/**
	 * Rainbow Beret.
	 */
	HairAccessory80: { id: "1510010357354070016", name: "80_hair_accessory" },
	/**
	 * Sky Anniversary 2026.
	 */
	HairAccessory81: { id: "1522919380705480716", name: "81_hair_accessory" },
	/**
	 * Sky Creator Awards 2026.
	 */
	HairAccessory82: { id: "1527298595886465114", name: "82_hair_accessory" },
	/**
	 * Rustic Memory.
	 */
	HairAccessory83: { id: "1529592860846981151", name: "83_hair_accessory" },
	/**
	 * Artistic Memory.
	 */
	HairAccessory84: { id: "1529594758152978462", name: "84_hair_accessory" },
	/**
	 * Joyful Memory.
	 */
	HairAccessory85: { id: "1529596977392783511", name: "85_hair_accessory" },
	/**
	 * Sunlight Sporty Sunglasses.
	 */
	HairAccessory86: { id: "1532453822340006179", name: "86_hair_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HEAD_ACCESSORY_EMOJIS = {
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
	/**
	 * Lightmending Champion.
	 */
	HeadAccessory24: { id: "1464063372784963715", name: "24_head_accessory" },
	/**
	 * Bloom Sunflower Studs.
	 */
	HeadAccessory25: { id: "1482685936688173146", name: "25_head_accessory" },
	/**
	 * Charming Creature head accessory.
	 */
	HeadAccessory26: { id: "1492226472071397517", name: "26_head_accessory" },
	/**
	 * Starry Night's Kiss.
	 */
	HeadAccessory27: { id: "1529491252448329768", name: "27_head_accessory" },
} as const satisfies Readonly<Record<string, Emoji>>;

const CAPE_EMOJIS = {
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
	 * Bloom Rose-Embroidered Cape.
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
	 * Rainbow Shawl.
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
	/**
	 * Lightmending Guide (ultimate).
	 */
	Cape168: { id: "1464005113206280354", name: "168_cape" },
	/**
	 * Lightmending Light Catcher.
	 */
	Cape169: { id: "1464065278714314999", name: "169_cape" },
	/**
	 * Lightmending Light Scholar.
	 */
	Cape170: { id: "1464066824369999953", name: "170_cape" },
	/**
	 * Tournament Crystalline Cape.
	 */
	Cape171: { id: "1469074671835021352", name: "171_cape" },
	/**
	 * Tournament Team Prairie Cape.
	 */
	Cape172: { id: "1469075156096909453", name: "172_cape" },
	/**
	 * Tournament Team Forest Cape.
	 */
	Cape173: { id: "1469075158017904773", name: "173_cape" },
	/**
	 * Tournament Team Valley Cape.
	 */
	Cape174: { id: "1469075160437882921", name: "174_cape" },
	/**
	 * Tournament Team Wasteland Cape.
	 */
	Cape175: { id: "1469075168813908132", name: "175_cape" },
	/**
	 * Days of Fortune 2026.
	 */
	Cape176: { id: "1471652018610241772", name: "176_cape" },
	/**
	 * Days of Bloom 2026.
	 */
	Cape177: { id: "1482683897224499302", name: "177_cape" },
	/**
	 * Carnival Guide (ultimate).
	 */
	Cape178: { id: "1502061121874694224", name: "178_cape" },
	/**
	 * Carnival Athletic Dancer.
	 */
	Cape179: { id: "1494754428044181565", name: "179_cape" },
	/**
	 * Carnival Stunt Actor.
	 */
	Cape180: { id: "1495325980426895390", name: "180_cape" },
	/**
	 * Treasure Coin Cape.
	 */
	Cape181: { id: "1502283493256728676", name: "181_cape" },
	/**
	 * FlOw cape.
	 */
	Cape182: { id: "1506644767235244123", name: "182_cape" },
	/**
	 * Days of Colour 2026.
	 */
	Cape183: { id: "1509849440234504252", name: "183_cape" },
	/**
	 * Black and Blue Swag Hoodie.
	 */
	Cape184: { id: "1522919386271449169", name: "184_cape" },
	/**
	 * Wheatfield Cape.
	 */
	Cape185: { id: "1528912043229315162", name: "185_cape" },
	/**
	 * Starry Night's Mantle Cape.
	 */
	Cape186: { id: "1529495836214689962", name: "186_cape" },
	/**
	 * Vase with Fifteen Sunflowers (ultimate).
	 */
	Cape187: { id: "1529588118892576910", name: "187_cape" },
	/**
	 * Dutch Memory.
	 */
	Cape188: { id: "1529590604869406791", name: "188_cape" },
	/**
	 * Rustic Memory.
	 */
	Cape189: { id: "1529592938403860532", name: "189_cape" },
	/**
	 * Artistic Memory.
	 */
	Cape190: { id: "1529594766969405550", name: "190_cape" },
	/**
	 * Joyful Memory.
	 */
	Cape191: { id: "1529596985076613204", name: "191_cape" },
} as const satisfies Readonly<Record<string, Emoji>>;

const HELD_PROPS_EMOJIS = {
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
	 * Moonlight Lantern.
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
	 * Summer Parasol.
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
	/**
	 * Lightmending Light Catcher.
	 */
	HeldProp59: { id: "1464065540283961476", name: "59_held_prop" },
	/**
	 * Tournament of Triumph 2026.
	 */
	HeldProp60: { id: "1469073215862079561", name: "60_held_prop" },
	/**
	 * Fortune Plush Mount.
	 */
	HeldProp61: { id: "1471653269909667912", name: "61_held_prop" },
	/**
	 * Bloom Sunflower Umbrella.
	 */
	HeldProp62: { id: "1482685517727531130", name: "62_held_prop" },
	/**
	 * Sky Anniversary 2026.
	 */
	HeldProp63: { id: "1522919378792747070", name: "63_held_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const LARGE_PLACEABLE_PROPS_EMOJIS = {
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
	/**
	 * Tournament podium.
	 */
	LargePlaceableProp105: { id: "1481575598416597002", name: "105_large_placeable_prop" },
	/**
	 * Days of Fortune 2026.
	 */
	LargePlaceableProp106: { id: "1471653526777364491", name: "106_large_placeable_prop" },
	/**
	 * Sunflower Round Table.
	 */
	LargePlaceableProp107: { id: "1482686827856003173", name: "107_large_placeable_prop" },
	/**
	 * Sunflower Ladder.
	 */
	LargePlaceableProp108: { id: "1482686829319688275", name: "108_large_placeable_prop" },
	/**
	 * Days of Nature 2026.
	 */
	LargePlaceableProp109: { id: "1492226478887407696", name: "109_large_placeable_prop" },
	/**
	 * Bounce pad 1.
	 */
	LargePlaceableProp110: { id: "1494694936971317468", name: "110_large_placeable_prop" },
	/**
	 * Carnival Guide (non-ultimate).
	 */
	LargePlaceableProp111: { id: "1494694938573799666", name: "111_large_placeable_prop" },
	/**
	 * Days of Treasure 2026 1.
	 */
	LargePlaceableProp112: { id: "1502288923257213079", name: "112_large_placeable_prop" },
	/**
	 * Days of Treasure 2026 2.
	 */
	LargePlaceableProp113: { id: "1502288919545249972", name: "113_large_placeable_prop" },
	/**
	 * Bounce pad 2.
	 */
	LargePlaceableProp114: { id: "1506377579098148984", name: "114_large_placeable_prop" },
	/**
	 * Bounce pad 3.
	 */
	LargePlaceableProp115: { id: "1506377582528954478", name: "115_large_placeable_prop" },
	/**
	 * Days of Colour 2026 manatee kite.
	 */
	LargePlaceableProp116: { id: "1510008602650214410", name: "116_large_placeable_prop" },
	/**
	 * Days of Colour 2026 whale kite.
	 */
	LargePlaceableProp117: { id: "1510008605586489405", name: "117_large_placeable_prop" },
	/**
	 * Days of Colour 2026 lighthorn kite.
	 */
	LargePlaceableProp118: { id: "1510008607276794107", name: "118_large_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (ultimate).
	 */
	LargePlaceableProp119: { id: "1529588114266390631", name: "119_large_placeable_prop" },
	/**
	 * Sunlight Crab Float.
	 */
	LargePlaceableProp120: { id: "1532453834582921296", name: "120_large_placeable_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

const SMALL_PLACEABLE_PROPS_EMOJIS = {
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
	 * Sunlight Campfire Snack Kit.
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
	/**
	 * Tournament Prairie Flag.
	 */
	SmallPlaceableProp115: { id: "1512759203788230747", name: "115_small_placeable_prop" },
	/**
	 * Tournament Forest Flag.
	 */
	SmallPlaceableProp116: { id: "1512759206145556590", name: "116_small_placeable_prop" },
	/**
	 * Tournament Valley Flag.
	 */
	SmallPlaceableProp117: { id: "1512759208146243655", name: "117_small_placeable_prop" },
	/**
	 * Tournament Wasteland Flag.
	 */
	SmallPlaceableProp118: { id: "1512759210742517811", name: "118_small_placeable_prop" },
	/**
	 * Sunflower Small Pillow.
	 */
	SmallPlaceableProp119: { id: "1482687407349301320", name: "119_small_placeable_prop" },
	/**
	 * Sunflower Rug.
	 */
	SmallPlaceableProp120: { id: "1482687410956533921", name: "120_small_placeable_prop" },
	/**
	 * Sunflower Wall Shelf.
	 */
	SmallPlaceableProp121: { id: "1482687413384904815", name: "121_small_placeable_prop" },
	/**
	 * Candle stand.
	 */
	SmallPlaceableProp122: { id: "1487147895865213120", name: "122_small_placeable_prop" },
	/**
	 * Days of Nature 2026.
	 */
	SmallPlaceableProp123: { id: "1492226480652943360", name: "123_small_placeable_prop" },
	/**
	 * Carnival Guide (non-ultimate).
	 */
	SmallPlaceableProp124: { id: "1494696455796031529", name: "124_small_placeable_prop" },
	/**
	 * Days of Colour 2026 butterfly kite.
	 */
	SmallPlaceableProp125: { id: "1509850377653059675", name: "125_small_placeable_prop" },
	/**
	 * Days of Colour 2026 crab kite.
	 */
	SmallPlaceableProp126: { id: "1510006724222910514", name: "126_small_placeable_prop" },
	/**
	 * Days of Colour 2026 bird kite.
	 */
	SmallPlaceableProp127: { id: "1510006727758708767", name: "127_small_placeable_prop" },
	/**
	 * Days of Colour 2026 manta kite.
	 */
	SmallPlaceableProp128: { id: "1510006730732605642", name: "128_small_placeable_prop" },
	/**
	 * Days of Colour 2026 jellyfish kite.
	 */
	SmallPlaceableProp129: { id: "1510006733186269364", name: "129_small_placeable_prop" },
	/**
	 * Days of Colour 2026 turtle kite.
	 */
	SmallPlaceableProp130: { id: "1510006735203467294", name: "130_small_placeable_prop" },
	/**
	 * Moth Plush.
	 */
	SmallPlaceableProp131: { id: "1522919382727266407", name: "131_small_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (non-ultimate) 1.
	 */
	SmallPlaceableProp132: { id: "1529585409347026955", name: "132_small_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (non-ultimate) 2.
	 */
	SmallPlaceableProp133: { id: "1529585412933288108", name: "133_small_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (non-ultimate) 3.
	 */
	SmallPlaceableProp134: { id: "1529585415353405440", name: "134_small_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (non-ultimate) 4.
	 */
	SmallPlaceableProp135: { id: "1529585417941422180", name: "135_small_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (non-ultimate) 5.
	 */
	SmallPlaceableProp136: { id: "1529585420185112727", name: "136_small_placeable_prop" },
	/**
	 * Vase with Fifteen Sunflowers (non-ultimate) 6.
	 */
	SmallPlaceableProp137: { id: "1529585422622265464", name: "137_small_placeable_prop" },
	/**
	 * Dutch Memory.
	 */
	SmallPlaceableProp138: { id: "1529590663081885847", name: "138_small_placeable_prop" },
	/**
	 * Rustic Memory.
	 */
	SmallPlaceableProp139: { id: "1529592864160350338", name: "139_small_placeable_prop" },
	/**
	 * Artistic Memory 1.
	 */
	SmallPlaceableProp140: { id: "1529594761512747079", name: "140_small_placeable_prop" },
	/**
	 * Artistic Memory 2.
	 */
	SmallPlaceableProp141: { id: "1529594764981305487", name: "141_small_placeable_prop" },
	/**
	 * Joyful Memory.
	 */
	SmallPlaceableProp142: { id: "1529596980626718880", name: "142_small_placeable_prop" },
	/**
	 * Days of Sunlight 2026.
	 */
	SmallPlaceableProp143: { id: "1532453823933710356", name: "143_small_placeable_prop" },
} as const satisfies Readonly<Record<string, Emoji>>;

/**
 * Cosmetics exclusive to shared spaces.
 */
const SHARED_SPACE_EMOJIS = {
	/**
	 * Carnival Guide (non-ultimate 1).
	 */
	SharedSpace01: { id: "1494699835167871056", name: "01_shared_space" },
	/**
	 * Carnival Guide (non-ultimate 2).
	 */
	SharedSpace02: { id: "1494699838225387680", name: "02_shared_space" },
	/**
	 * Carnival Guide (non-ultimate 3).
	 */
	SharedSpace03: { id: "1494699840280723476", name: "03_shared_space" },
	/**
	 * Days of Sunlight 2026.
	 */
	SharedSpace04: { id: "1532453831521206333", name: "04_shared_space" },
	/**
	 * Summer Camping 2026.
	 */
	SharedSpace05: { id: "1542584833166016612", name: "05_shared_space" },
	/**
	 * Summer Camping 2026.
	 */
	SharedSpace06: { id: "1542584836894756864", name: "06_shared_space" },
	/**
	 * Summer Camping 2026.
	 */
	SharedSpace07: { id: "1542584839285375036", name: "07_shared_space" },
	/**
	 * Summer Camping 2026.
	 */
	SharedSpace08: { id: "1542584841541779567", name: "08_shared_space" },
} as const satisfies Readonly<Record<string, Emoji>>;

export const PRODUCTION_TABLES = {
	MISCELLANEOUS_EMOJIS,
	EMOTE_EMOJIS,
	STANCE_EMOJIS,
	CALL_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	SEASON_EMOJIS,
	EVENT_EMOJIS,
	OUTFIT_EMOJIS,
	SHOE_EMOJIS,
	MASK_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	NECKLACE_EMOJIS,
	HAIR_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HEAD_ACCESSORY_EMOJIS,
	CAPE_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
	SHARED_SPACE_EMOJIS,
} as const;
