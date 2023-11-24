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
