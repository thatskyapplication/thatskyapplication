import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	type InteractionReplyOptions,
	type InteractionUpdateOptions,
	type ModalSubmitInteraction,
	type Snowflake,
	type StringSelectMenuInteraction,
	type UserContextMenuCommandInteraction,
	CDN,
	PermissionFlagsBits,
} from "discord.js";

const cdn = new CDN();

interface EmojiData {
	name: string;
	id: Snowflake;
	animated?: boolean;
}

export const EMOJI = {
	AscendedCandle: { name: "ascended_candle", id: "1074399464627912755" },
	WingedLight: { name: "winged_light", id: "1075042577776136313" },
	Yes: { name: "yes", id: "1111792276394475580", animated: true },
	No: { name: "no", id: "1111792367104708699", animated: true },
	PlatformIOS: { name: "platform_iOS", id: "1112935921197789304" },
	PlatformAndroid: { name: "platform_android", id: "1112936417182621727" },
	PlatformMac: { name: "platform_mac", id: "1112936431464235058" },
	PlatformSwitch: { name: "platform_switch", id: "1112936564004237392" },
	PlatformPlayStation: { name: "platform_playstation", id: "1112937466312278036" },
	SeasonGratitude: { name: "season_gratitude", id: "1113247310114193458" },
	SeasonLightseekers: { name: "season_lightseekers", id: "1113247330221707314" },
	SeasonBelonging: { name: "season_belonging", id: "1113247355932778598" },
	SeasonRhythm: { name: "season_rhythm", id: "1113247376908496916" },
	SeasonEnchantment: { name: "season_enchantment", id: "1113247405454921859" },
	SeasonSanctuary: { name: "season_sanctuary", id: "1113247420080463902" },
	SeasonProphecy: { name: "season_prophecy", id: "1113247443857985547" },
	SeasonDreams: { name: "season_dreams", id: "1113247473230676008" },
	SeasonAssembly: { name: "season_assembly", id: "1113247484001652817" },
	SeasonLittlePrince: { name: "season_little_prince", id: "1113247526812921856" },
	SeasonFlight: { name: "season_flight", id: "1113247537399332926" },
	SeasonAbyss: { name: "season_abyss", id: "1113247546219974726" },
	SeasonPerformance: { name: "season_performance", id: "1113247572069457951" },
	SeasonShattering: { name: "season_shattering", id: "1113247601081471136" },
	SeasonAurora: { name: "season_aurora", id: "1113247614138322984" },
	SeasonRemembrance: { name: "season_remembrance", id: "1113247635885793330" },
	SeasonPassage: { name: "season_passage", id: "1113247650259677254" },
	SeasonalCandle: { name: "seasonal_candle", id: "1115305105642758145" },
	SeasonalHeart: { name: "seasonal_heart", id: "1115841397493346325" },
	SeasonMoments: { name: "season_moments", id: "1130091541151629332" },
	Candle: { name: "candle", id: "1134669696822689882" },
	Heart: { name: "heart", id: "1134669722353401977" },
	PlatformSteam: { name: "platform_steam", id: "1134673226107191336" },
	CandleGratitude: { name: "candle_gratitude", id: "1135233671255830619" },
	CandleLightseekers: { name: "candle_lightseekers", id: "1135233695343718411" },
	CandleBelonging: { name: "candle_belonging", id: "1135302561088409741" },
	CandleRhythm: { name: "candle_rhythm", id: "1135302602121298060" },
	CandleEnchantment: { name: "candle_enchantment", id: "1135302620181970944" },
	CandleSanctuary: { name: "candle_sanctuary", id: "1135302635189182614" },
	CandleProphecy: { name: "candle_prophecy", id: "1135302685080432660" },
	CandleDreams: { name: "candle_dreams", id: "1135302699655630849" },
	CandleAssembly: { name: "candle_assembly", id: "1135302713366810685" },
	CandleLittlePrince: { name: "candle_little_prince", id: "1135302724880175134" },
	CandleFlight: { name: "candle_flight", id: "1135302737962221608" },
	CandleAbyss: { name: "candle_abyss", id: "1135302746787029144" },
	CandlePerformance: { name: "candle_performance", id: "1135302762029138040" },
	CandleShattering: { name: "candle_shattering", id: "1135302774205186048" },
	CandleAurora: { name: "candle_aurora", id: "1135302785714360390" },
	CandleRemembrance: { name: "candle_remembrance", id: "1135302796397256755" },
	CandlePassage: { name: "candle_passage", id: "1135302811819708569" },
	CandleMoments: { name: "candle_moments", id: "1135302823593119804" },
	HeartBelonging: { name: "heart_belonging", id: "1135304922997465168" },
	HeartRhythm: { name: "heart_rhythm", id: "1135304943302082760" },
	HeartEnchantment: { name: "heart_enchantment", id: "1135304955104862279" },
	HeartSanctuary: { name: "heart_sanctuary", id: "1135304967679389868" },
	HeartProphecy: { name: "heart_prophecy", id: "1135304979532496906" },
	HeartDreams: { name: "heart_dreams", id: "1135305001149935696" },
	HeartAssembly: { name: "heart_assembly", id: "1135305017449001091" },
	HeartLittlePrince: { name: "heart_little_prince", id: "1135305036113649724" },
	HeartFlight: { name: "heart_flight", id: "1135305050084880484" },
	HeartAbyss: { name: "heart_abyss", id: "1135305058838384670" },
	HeartPerformance: { name: "heart_performance", id: "1135305071509377085" },
	HeartShattering: { name: "heart_shattering", id: "1135305088043327578" },
	HeartAurora: { name: "heart_aurora", id: "1135305121153159311" },
	HeartRemembrance: { name: "heart_remembrance", id: "1135305133614432266" },
	HeartPassage: { name: "heart_passage", id: "1135305161498181765" },
	HeartMoments: { name: "heart_moments", id: "1135305178027933899" },
	SeasonRevival: { name: "season_revival", id: "1162098085455999117" },
	CandleRevival: { name: "candle_revival", id: "1162098562209951746" },
	HeartRevival: { name: "heart_revival", id: "1162098577456238663" },
	Light: { name: "light", id: "1164342686950625300" },
	ShardRegular: { name: "shard_regular", id: "1164672237761200130" },
	ShardStrong: { name: "shard_strong", id: "1164672254911713382" },
	EventMischief: { name: "event_mischief", id: "1177665479612039270" },
	EventAviarysFireworkFestival: { name: "event_aviarys_firework_festival", id: "1177665489976176670" },
	EventFeast: { name: "event_feast", id: "1182501356980932698" },

	// Expressions 1.
	Sit: { name: "sit", id: "1177210235774054441" },
	Point: { name: "point", id: "1177213563111231581" },
	Come: { name: "come", id: "1177333067317268480" },
	NoThanks: { name: "no_thanks", id: "1177335909528645662" },
	Welcome: { name: "welcome", id: "1177336823673016340" },
	Nod: { name: "nod", id: "1177336825707233280" },
	Scold: { name: "scold", id: "1177336828886528081" },
	Butterfly: { name: "butterfly", id: "1177336831558299709" },
	Clap: { name: "clap", id: "1177338295626248263" },
	Wave: { name: "wave", id: "1177338299451449424" },
	Laugh: { name: "laugh", id: "1177338465797550181" },
	Yawn: { name: "yawn", id: "1177338497745559593" },
	WipeBrow: { name: "wipe_brow", id: "1177346837666078890" },
	Teamwork: { name: "teamwork", id: "1177346850861367468" },
	BlowKiss: { name: "blow_kiss", id: "1177346883996364820" },
	Grateful: { name: "grateful", id: "1177346919857651814" },
	BellyScratch: { name: "belly_scratch", id: "1177349505906135143" },
	Chuckle: { name: "chuckle", id: "1177349547475869739" },
	Shiver: { name: "shiver", id: "1177349585283326042" },
	HideAndSeek: { name: "hide_and_seek", id: "1177349740145410150" },
	Angry: { name: "angry", id: "1177351816581754880" },
	Shy: { name: "shy", id: "1177351841026162698" },
	Shocked: { name: "shocked", id: "1177351854267568199" },
	Apologise: { name: "apologise", id: "1177351868763078716" },
	Crying: { name: "crying", id: "1177353646585954466" },
	Kabuki: { name: "kabuki", id: "1177353667632967761" },
	Shrug: { name: "shrug", id: "1177353698645639350" },
	Grumpy: { name: "grumpy", id: "1177353727691198525" },
	Peek: { name: "peek", id: "1177357068437561406" },
	Eww: { name: "eww", id: "1177357102281396244" },
	Facepalm: { name: "facepalm", id: "1177357135965855894" },
	Handstand: { name: "handstand", id: "1177357165804126258" },
	Backflip: { name: "backflip", id: "1177358583877349406" },
	Bow: { name: "bow", id: "1177358599064911932" },
	Cheer: { name: "cheer", id: "1177358626277572728" },
	Leap: { name: "leap", id: "1177358638902423602" },
	TripleAxel: { name: "triple_axel", id: "1177359760924885062" },
	Confetti: { name: "confetti", id: "1177359788938629264" },
	BoogieDance: { name: "boogie_dance", id: "1177359804696637470" },
	SpinDance: { name: "spin_dance", id: "1177359844458643506" },
	Juggle: { name: "juggle", id: "1177366450349035550" },
	CrabWalk: { name: "crab_walk", id: "1177366467004600330" },
	RallyCheer: { name: "rally_cheer", id: "1177366497572683886" },
	SpinTrick: { name: "spin_trick", id: "1177366523149553774" },
	ShowDance: { name: "show_dance", id: "1177368467444342894" },
	Duck: { name: "duck", id: "1177368552093798470" },
	Faint: { name: "faint", id: "1177368589460852736" },
	Respect: { name: "respect", id: "1177368605285957763" },
	LookAround: { name: "look_around", id: "1177377419674534028" },
	Salute: { name: "salute", id: "1177377433175998615" },

	// Expressions 2.
	Acknowledge: { name: "acknowledge", id: "1177393399964373054" },
	KungFu: { name: "kung_fu", id: "1177393417987297290" },
	DontGo: { name: "dont_go", id: "1177394732373114891" },
	Boo: { name: "boo", id: "1177394745727782982" },
	DustOff: { name: "dust_off", id: "1177394792859181176" },
	ChestPound: { name: "chest_pound", id: "1177394820310909029" },
	Marching: { name: "marching", id: "1177399682859810827" },
	Telekinesis: { name: "telekinesis", id: "1177399705081233449" },
	Float: { name: "float", id: "1177399733690572861" },
	Pray: { name: "pray", id: "1177399746911010826" },
	Yoga: { name: "yoga", id: "1177400646694096916" },
	Shush: { name: "shush", id: "1177400660086489149" },
	Sparkler: { name: "sparkler", id: "1177400672585531582" },
	Thinking: { name: "thinking", id: "1177400683817877525" },
	Doze: { name: "doze", id: "1177401997436129280" },
	Balance: { name: "balance", id: "1177402041769922592" },
	DeepBreath: { name: "deep_breath", id: "1177402066784768121" },
	Bubbles: { name: "bubbles", id: "1177402129024024616" },
	Beckon: { name: "beckon", id: "1177403063116517466" },
	Gloat: { name: "gloat", id: "1177403110784761936" },
	Stretch: { name: "stretch", id: "1177403161321938954" },
	Slouch: { name: "slouch", id: "1177403214140801165" },
	Sneeze: { name: "sneeze", id: "1177403643381694474" },
	HandRub: { name: "hand_rub", id: "1177403696561266688" },
	Voilà: { name: "voila", id: "1177403758850871336" },
	Navigate: { name: "navigate", id: "1177403824206524477" },
	CalmDown: { name: "calm_down", id: "1177404573665730622" },
	EvilLaugh: { name: "evil_laugh", id: "1177404591013363765" },
	Ouch: { name: "ouch", id: "1177404615474565120" },
	Anxious: { name: "anxious", id: "1177404645354786917" },
	Headbob: { name: "headbob", id: "1177409163375149127" },
	Aww: { name: "aww", id: "1177409189535043705" },
	WavingLight: { name: "waving_light", id: "1177409211550928966" },
	RaiseTheRoof: { name: "raise_the_roof", id: "1177409241179492404" },
	Twirl: { name: "twirl", id: "1177410184298111067" },
	RhythmicClap: { name: "rhythmic_clap", id: "1177410214639702086" },
	Conduct: { name: "conduct", id: "1177410232629088336" },
	SilentClap: { name: "silent_clap", id: "1177410341043441755" },
	Skipping: { name: "skipping", id: "1177410805055098980" },
	Pleading: { name: "pleading", id: "1177410825909178419" },
	Tiptoeing: { name: "tiptoeing", id: "1177410846901682246" },
	Grieving: { name: "grieving", id: "1177410931593056287" },
	HackySack: { name: "hacky_sack", id: "1177411402256896021" },
	Somersault: { name: "somersault", id: "1177411430979477524" },
	Moping: { name: "moping", id: "1177411465020444692" },
	PullUp: { name: "pull_up", id: "1177411480199635005" },
	JollyDance: { name: "jolly_dance", id: "1177411979909009458" },
	BlindfoldBalancePose: { name: "blindfold_balance_pose", id: "1177412000444338186" },
	CureForMeDance: { name: "cure_for_me_dance", id: "1177412031654146168" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type Emoji = (typeof EMOJI)[keyof typeof EMOJI];

export async function cannotUseCustomEmojis(
	interaction:
		| ButtonInteraction
		| ChatInputCommandInteraction
		| ModalSubmitInteraction
		| StringSelectMenuInteraction
		| UserContextMenuCommandInteraction,
	options?: InteractionReplyOptions | InteractionUpdateOptions,
) {
	if (!interaction.inGuild() || interaction.appPermissions.has(PermissionFlagsBits.UseExternalEmojis)) return false;

	const response = {
		content: "Missing the `Use External Emojis` permission. Someone needs to adjust the permissions!",
		ephemeral: true,
		...options,
	};

	if (interaction.isMessageComponent()) {
		// @ts-expect-error Too generic.
		await interaction.update(response);
	} else {
		// @ts-expect-error Too generic.
		await interaction.reply(response);
	}

	return true;
}

export function formatEmoji(emoji: Emoji) {
	return "animated" in emoji ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
}

export function formatEmojiURL(id: Snowflake) {
	return cdn.emoji(id);
}

export interface CurrencyEmojiOptions {
	emoji: Emoji;
	number: number;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji({ emoji, number, includeSpaceInEmoji = false }: CurrencyEmojiOptions) {
	return `${number}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji)}`;
}
