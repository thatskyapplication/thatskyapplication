import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIApplicationCommandInteractionDataBasicOption,
	type APIApplicationCommandInteractionDataOption,
	type APIAttachment,
	type APIInteractionDataResolved,
	type APIInteractionDataResolvedChannel,
	type APIInteractionDataResolvedGuildMember,
	type APIMessage,
	type APIMessageApplicationCommandInteractionDataResolved,
	type APIUser,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	InteractionType,
	type Snowflake,
} from "@discordjs/core";
import { Role } from "../models/discord/role.js";

type InteractionOption =
	| APIApplicationCommandInteractionDataOption<InteractionType.ApplicationCommand>
	| APIApplicationCommandInteractionDataOption<InteractionType.ApplicationCommandAutocomplete>;

type InteractionBasicOption =
	| APIApplicationCommandInteractionDataBasicOption<InteractionType.ApplicationCommand>
	| APIApplicationCommandInteractionDataBasicOption<InteractionType.ApplicationCommandAutocomplete>;

type BasicOptionType = InteractionBasicOption["type"];

type OptionOfType<Type extends BasicOptionType> = Extract<InteractionBasicOption, { type: Type }>;

type NumericOptionType = ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number;

type ResolvableOptionType =
	| ApplicationCommandOptionType.Attachment
	| ApplicationCommandOptionType.Channel
	| ApplicationCommandOptionType.Role
	| ApplicationCommandOptionType.User;

type FocusedOption = Extract<
	APIApplicationCommandInteractionDataBasicOption<InteractionType.ApplicationCommandAutocomplete>,
	{ type: ApplicationCommandOptionType.String | NumericOptionType }
>;

type CommandInteractionData =
	| APIApplicationCommandInteraction["data"]
	| APIApplicationCommandAutocompleteInteraction["data"];

type Mentionable = APIUser | APIInteractionDataResolvedGuildMember | Role;

interface ResolvedData {
	readonly attachments: Readonly<Record<Snowflake, APIAttachment>>;
	readonly channels: Readonly<Record<Snowflake, APIInteractionDataResolvedChannel>>;
	readonly members: Readonly<Record<Snowflake, APIInteractionDataResolvedGuildMember>>;
	readonly messages: Readonly<Record<Snowflake, APIMessage>>;
	readonly roles: Readonly<Record<Snowflake, Role>>;
	readonly users: Readonly<Record<Snowflake, APIUser>>;
}

interface ParsedCommandData {
	readonly focusedOption: FocusedOption | null;
	readonly group: string | null;
	readonly options: ReadonlyMap<string, InteractionBasicOption>;
	readonly resolved: ResolvedData;
	readonly subcommand: string | null;
}

function isBasicOption(option: InteractionOption): option is InteractionBasicOption {
	return (
		option.type !== ApplicationCommandOptionType.Subcommand &&
		option.type !== ApplicationCommandOptionType.SubcommandGroup
	);
}

function isFocusedOption(option: InteractionBasicOption): option is FocusedOption {
	return (
		"focused" in option &&
		option.focused === true &&
		(option.type === ApplicationCommandOptionType.String ||
			option.type === ApplicationCommandOptionType.Integer ||
			option.type === ApplicationCommandOptionType.Number)
	);
}

function basicOptions(
	options: readonly InteractionOption[] | undefined,
): readonly InteractionBasicOption[] {
	return options?.filter(isBasicOption) ?? [];
}

function commandPath(options: readonly InteractionOption[] | undefined): {
	readonly group: string | null;
	readonly options: readonly InteractionBasicOption[];
	readonly subcommand: string | null;
} {
	const root = options?.[0];

	if (root?.type === ApplicationCommandOptionType.SubcommandGroup) {
		const subcommand = root.options?.[0];

		return {
			group: root.name,
			options: basicOptions(subcommand?.options),
			subcommand: subcommand?.name ?? null,
		};
	}

	if (root?.type === ApplicationCommandOptionType.Subcommand) {
		return { group: null, options: basicOptions(root.options), subcommand: root.name };
	}

	return { group: null, options: basicOptions(options), subcommand: null };
}

function resolvedData(data: CommandInteractionData): ResolvedData {
	const resolved: Partial<
		APIInteractionDataResolved & APIMessageApplicationCommandInteractionDataResolved
	> = ("resolved" in data ? data.resolved : undefined) ?? {};

	return {
		attachments: resolved.attachments ?? {},
		channels: resolved.channels ?? {},
		members: resolved.members ?? {},
		messages: resolved.messages ?? {},
		roles: Object.fromEntries(
			Object.entries(resolved.roles ?? {}).map(([id, role]) => [id, new Role(role)]),
		),
		users: resolved.users ?? {},
	};
}

function parseCommandData(data: CommandInteractionData): ParsedCommandData {
	const path = commandPath("options" in data ? data.options : undefined);

	return {
		focusedOption: path.options.find(isFocusedOption) ?? null,
		group: path.group,
		options: new Map(
			path.options.map((option): [string, InteractionBasicOption] => [option.name, option]),
		),
		resolved: resolvedData(data),
		subcommand: path.subcommand,
	};
}

function hasOptionType<Type extends BasicOptionType>(
	option: InteractionBasicOption,
	type: Type,
): option is OptionOfType<Type> {
	return option.type === type;
}

function unexpectedOptionType(
	name: string,
	expected: BasicOptionType,
	actual: BasicOptionType,
): never {
	throw new TypeError(
		`Option "${name}" has type ${ApplicationCommandOptionType[actual]}; expected ${ApplicationCommandOptionType[expected]}.`,
	);
}

function numericValue(name: string, value: number | string): number {
	if (typeof value !== "number") {
		throw new TypeError(
			`Option "${name}" holds a partial autocomplete value; numeric options are only complete on chat input interactions.`,
		);
	}

	return value;
}

function resolveOption<Value>(
	option: OptionOfType<ResolvableOptionType> | null,
	values: Readonly<Record<Snowflake, Value>>,
): Value | null {
	return option === null ? null : (values[option.value] ?? null);
}

function requireResolved<Value>(name: string, kind: string, value: Value | null): Value {
	if (value === null) {
		throw new Error(
			`The ${kind} for option "${name}" was not included in the resolved interaction data.`,
		);
	}

	return value;
}

export class OptionResolver {
	private readonly autocomplete: boolean;

	private readonly commandName: string;

	private readonly commandType: ApplicationCommandType;

	private readonly focusedOption: FocusedOption | null;

	private readonly group: string | null;

	private readonly options: ReadonlyMap<string, InteractionBasicOption>;

	private readonly resolved: ResolvedData;

	private readonly subcommand: string | null;

	private readonly targetId: Snowflake | null;

	public constructor(
		interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction,
	) {
		const { focusedOption, group, options, resolved, subcommand } = parseCommandData(
			interaction.data,
		);

		this.autocomplete = interaction.type === InteractionType.ApplicationCommandAutocomplete;
		this.commandName = interaction.data.name;
		this.commandType = interaction.data.type;
		this.focusedOption = focusedOption;
		this.group = group;
		this.options = options;
		this.resolved = resolved;
		this.subcommand = subcommand;
		this.targetId = "target_id" in interaction.data ? interaction.data.target_id : null;
	}

	public get size(): number {
		return this.options.size;
	}

	public has(name: string): boolean {
		return this.options.has(name);
	}

	public getOption(name: string): InteractionBasicOption | null {
		return this.options.get(name) ?? null;
	}

	public requireOption(name: string): InteractionBasicOption {
		const option = this.getOption(name);

		if (!option) {
			throw new Error(`Missing required option "${name}".`);
		}

		return option;
	}

	public getSubcommand(): string | null {
		return this.subcommand;
	}

	public requireSubcommand(): string {
		if (!this.subcommand) {
			throw new Error("A subcommand was not selected.");
		}

		return this.subcommand;
	}

	public getSubcommandGroup(): string | null {
		return this.group;
	}

	public requireSubcommandGroup(): string {
		if (!this.group) {
			throw new Error("A subcommand group was not selected.");
		}

		return this.group;
	}

	public getBoolean(name: string): boolean | null {
		return this.typedOption(name, ApplicationCommandOptionType.Boolean)?.value ?? null;
	}

	public requireBoolean(name: string): boolean {
		return this.requireTypedOption(name, ApplicationCommandOptionType.Boolean).value;
	}

	public getString(name: string): string | null {
		return this.typedOption(name, ApplicationCommandOptionType.String)?.value ?? null;
	}

	public requireString(name: string): string {
		return this.requireTypedOption(name, ApplicationCommandOptionType.String).value;
	}

	public getInteger(name: string): number | null {
		return this.numeric(name, ApplicationCommandOptionType.Integer);
	}

	public requireInteger(name: string): number {
		const option = this.requireTypedOption(name, ApplicationCommandOptionType.Integer);
		return numericValue(name, option.value);
	}

	public getNumber(name: string): number | null {
		return this.numeric(name, ApplicationCommandOptionType.Number);
	}

	public requireNumber(name: string): number {
		const option = this.requireTypedOption(name, ApplicationCommandOptionType.Number);
		return numericValue(name, option.value);
	}

	public getUser(name: string): APIUser | null {
		return resolveOption(
			this.typedOption(name, ApplicationCommandOptionType.User),
			this.resolved.users,
		);
	}

	public requireUser(name: string): APIUser {
		return requireResolved(
			name,
			"user",
			resolveOption(
				this.requireTypedOption(name, ApplicationCommandOptionType.User),
				this.resolved.users,
			),
		);
	}

	public getMember(name: string): APIInteractionDataResolvedGuildMember | null {
		return resolveOption(
			this.typedOption(name, ApplicationCommandOptionType.User),
			this.resolved.members,
		);
	}

	public requireMember(name: string): APIInteractionDataResolvedGuildMember {
		return requireResolved(
			name,
			"member",
			resolveOption(
				this.requireTypedOption(name, ApplicationCommandOptionType.User),
				this.resolved.members,
			),
		);
	}

	public getChannel(name: string): APIInteractionDataResolvedChannel | null {
		return resolveOption(
			this.typedOption(name, ApplicationCommandOptionType.Channel),
			this.resolved.channels,
		);
	}

	public requireChannel(name: string): APIInteractionDataResolvedChannel {
		return requireResolved(
			name,
			"channel",
			resolveOption(
				this.requireTypedOption(name, ApplicationCommandOptionType.Channel),
				this.resolved.channels,
			),
		);
	}

	public getRole(name: string): Role | null {
		return resolveOption(
			this.typedOption(name, ApplicationCommandOptionType.Role),
			this.resolved.roles,
		);
	}

	public requireRole(name: string): Role {
		return requireResolved(
			name,
			"role",
			resolveOption(
				this.requireTypedOption(name, ApplicationCommandOptionType.Role),
				this.resolved.roles,
			),
		);
	}

	public getAttachment(name: string): APIAttachment | null {
		return resolveOption(
			this.typedOption(name, ApplicationCommandOptionType.Attachment),
			this.resolved.attachments,
		);
	}

	public requireAttachment(name: string): APIAttachment {
		return requireResolved(
			name,
			"attachment",
			resolveOption(
				this.requireTypedOption(name, ApplicationCommandOptionType.Attachment),
				this.resolved.attachments,
			),
		);
	}

	public getMentionable(name: string): Mentionable | null {
		const option = this.typedOption(name, ApplicationCommandOptionType.Mentionable);
		return option === null ? null : this.mentionable(option.value);
	}

	public requireMentionable(name: string): Mentionable {
		const option = this.requireTypedOption(name, ApplicationCommandOptionType.Mentionable);
		return requireResolved(name, "mentionable", this.mentionable(option.value));
	}

	public requireTargetUser(): APIUser {
		const targetUser = this.resolved.users[this.targetIdFor(ApplicationCommandType.User)];

		if (!targetUser) {
			throw new Error("The target user was not included in the resolved interaction data.");
		}

		return targetUser;
	}

	public getTargetMember(): APIInteractionDataResolvedGuildMember | null {
		return this.resolved.members[this.targetIdFor(ApplicationCommandType.User)] ?? null;
	}

	public requireTargetMember(): APIInteractionDataResolvedGuildMember {
		const targetMember = this.getTargetMember();

		if (!targetMember) {
			throw new Error("The target member was not included in the resolved interaction data.");
		}

		return targetMember;
	}

	public requireTargetMessage(): APIMessage {
		const targetMessage = this.resolved.messages[this.targetIdFor(ApplicationCommandType.Message)];

		if (!targetMessage) {
			throw new Error("The target message was not included in the resolved interaction data.");
		}

		return targetMessage;
	}

	public getFocusedOption(): FocusedOption | null {
		return this.focusedOption;
	}

	public requireFocusedOption(): FocusedOption;

	public requireFocusedOption<Type extends FocusedOption["type"]>(
		type: Type,
	): Extract<FocusedOption, { type: Type }>;

	public requireFocusedOption(type?: FocusedOption["type"]): FocusedOption {
		if (!this.focusedOption) {
			throw new Error(
				this.autocomplete
					? "The autocomplete interaction did not contain a focused option."
					: "This method can only be used on autocomplete interactions.",
			);
		}

		if (type !== undefined && this.focusedOption.type !== type) {
			return unexpectedOptionType(this.focusedOption.name, type, this.focusedOption.type);
		}

		return this.focusedOption;
	}

	public chatInputCommandText(): string {
		if (this.commandType !== ApplicationCommandType.ChatInput) {
			throw new Error("This method can only be used on chat input command interactions.");
		}

		const properties = [
			`/${this.commandName}`,
			this.group,
			this.subcommand,
			...this.options.values().map((option) => `${option.name}:${option.value}`),
		];

		return properties.filter((property) => property !== null).join(" ");
	}

	private mentionable(id: Snowflake): Mentionable | null {
		return this.resolved.members[id] ?? this.resolved.users[id] ?? this.resolved.roles[id] ?? null;
	}

	private numeric(name: string, type: NumericOptionType): number | null {
		const option = this.typedOption(name, type);
		return option === null ? null : numericValue(name, option.value);
	}

	private requireTypedOption<Type extends BasicOptionType>(
		name: string,
		type: Type,
	): OptionOfType<Type> {
		const option = this.requireOption(name);

		return hasOptionType(option, type) ? option : unexpectedOptionType(name, type, option.type);
	}

	private targetIdFor(
		type: ApplicationCommandType.User | ApplicationCommandType.Message,
	): Snowflake {
		if (this.commandType !== type || this.targetId === null) {
			const contextMenuType = type === ApplicationCommandType.User ? "user" : "message";

			throw new Error(
				`This method can only be used on ${contextMenuType} context menu interactions.`,
			);
		}

		return this.targetId;
	}

	private typedOption<Type extends BasicOptionType>(
		name: string,
		type: Type,
	): OptionOfType<Type> | null {
		const option = this.getOption(name);

		if (!option) {
			return null;
		}

		return hasOptionType(option, type) ? option : unexpectedOptionType(name, type, option.type);
	}
}
