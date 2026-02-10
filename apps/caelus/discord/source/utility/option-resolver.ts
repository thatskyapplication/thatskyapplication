import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIApplicationCommandInteractionDataBasicOption,
	type APIApplicationCommandInteractionDataIntegerOption,
	type APIApplicationCommandInteractionDataNumberOption,
	type APIApplicationCommandInteractionDataOption,
	type APIApplicationCommandInteractionDataStringOption,
	type APIAttachment,
	type APIInteractionDataResolved,
	type APIInteractionDataResolvedChannel,
	type APIInteractionDataResolvedGuildMember,
	type APIMessage,
	type APIMessageApplicationCommandInteractionDataResolved,
	type APIUser,
	type APIUserInteractionDataResolved,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	InteractionType,
	type Snowflake,
} from "@discordjs/core";
import { Role } from "../models/discord/role.js";

function isBasicOptions(
	options: APIApplicationCommandInteractionDataOption[],
): options is APIApplicationCommandInteractionDataBasicOption[] {
	return (
		options?.[0]?.type !== ApplicationCommandOptionType.SubcommandGroup &&
		options?.[0]?.type !== ApplicationCommandOptionType.Subcommand
	);
}

/**
 * Utility class for resolving command interaction options while working with the raw API.
 * Based on {@linkplain https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/structures/CommandInteractionOptionResolver.js}
 */
export class OptionResolver {
	private readonly interaction:
		| APIApplicationCommandInteraction
		| APIApplicationCommandAutocompleteInteraction;

	/**
	 * The interaction resolved data
	 */
	private readonly resolved:
		| (Omit<APIInteractionDataResolved, "roles"> & { roles: Record<Snowflake, Role> })
		| APIUserInteractionDataResolved
		| APIMessageApplicationCommandInteractionDataResolved;

	/**
	 * Bottom-level options for the interaction
	 * If there is a subcommand (or subcommand and group), this represents the options for the subcommand.
	 */
	public readonly hoistedOptions: APIApplicationCommandInteractionDataBasicOption[] = [];

	/**
	 * The name of the subcommand group
	 */
	private readonly group: string | null = null;

	/**
	 * The name of the subcommand
	 */
	private readonly subcommand: string | null = null;

	public constructor(
		interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction,
	) {
		this.interaction = interaction;
		let messages = {};
		let roles = {};
		let attachments = {};
		let channels = {};
		let members = {};
		let users = {};

		if ("resolved" in interaction.data) {
			if ("messages" in interaction.data.resolved) {
				messages = interaction.data.resolved.messages;
			}

			if ("roles" in interaction.data.resolved) {
				roles = Object.fromEntries(
					Object.entries(interaction.data.resolved.roles).map(([id, role]) => [id, new Role(role)]),
				);
			}

			if ("attachments" in interaction.data.resolved) {
				attachments = interaction.data.resolved.attachments;
			}

			if ("channels" in interaction.data.resolved) {
				channels = interaction.data.resolved.channels;
			}

			if ("members" in interaction.data.resolved) {
				members = interaction.data.resolved.members;
			}

			if ("users" in interaction.data.resolved) {
				users = interaction.data.resolved.users;
			}
		}

		this.resolved = { messages, roles, attachments, channels, members, users };
		const data = "options" in interaction.data ? (interaction.data.options ?? null) : null;

		if (data && isBasicOptions(data)) {
			this.hoistedOptions = data;
		} else {
			let resolvedData = data;

			if (resolvedData?.[0]?.type === ApplicationCommandOptionType.SubcommandGroup) {
				this.group = resolvedData[0].name;
				resolvedData = resolvedData[0].options;
			}

			if (resolvedData?.[0]?.type === ApplicationCommandOptionType.Subcommand) {
				this.subcommand = resolvedData[0].name;
				this.hoistedOptions = resolvedData[0].options ?? [];
			}
		}
	}

	/**
	 * Gets an option by its name
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public get<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, APIApplicationCommandInteractionDataOption>;

	public get(name: string, required = false): APIApplicationCommandInteractionDataOption | null {
		const option = this.hoistedOptions.find((opt) => opt.name === name);
		if (!option) {
			if (required) {
				throw new Error(`Missing required option "${name}"`);
			}

			return null;
		}

		return option;
	}

	/**
	 * Gets the selected subcommand
	 * @param required Whether to throw an error if there is no subcommand
	 */
	public getSubcommand<Required extends boolean = false>(
		required?: Required,
	): RequiredIf<Required, string>;
	public getSubcommand(required = true): string | null {
		if (required && !this.subcommand) {
			throw new Error("A subcommand was not selected");
		}

		return this.subcommand;
	}

	/**
	 * Gets the selected subcommand group
	 * @param required Whether to throw an error if there is no subcommand group
	 */
	public getSubcommandGroup<Required extends boolean = false>(
		required?: Required,
	): RequiredIf<Required, string>;
	public getSubcommandGroup(required = true): string | null {
		if (required && !this.group) {
			throw new Error("A subcommand group was not selected");
		}

		return this.group;
	}

	/**
	 * Gets a boolean option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getBoolean<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, boolean>;
	public getBoolean(name: string, required = false): boolean | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Boolean, required);
		return option?.value ?? null;
	}

	/**
	 * Gets a channel option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getChannel<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, APIInteractionDataResolvedChannel>;

	public getChannel(name: string, required = false): APIInteractionDataResolvedChannel | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Channel, required);
		return option && "channels" in this.resolved
			? (this.resolved.channels?.[option.value] ?? null)
			: null;
	}

	/**
	 * Gets a string option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getString<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, string>;
	public getString(name: string, required = false): string | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.String, required);
		return option?.value ?? null;
	}

	/**
	 * Gets an integer option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getInteger<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, number>;
	public getInteger(name: string, required = false): number | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Integer, required);
		return option?.value ?? null;
	}

	/**
	 * Gets a number option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getNumber<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, number>;
	public getNumber(name: string, required = false): number | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Number, required);
		return option?.value ?? null;
	}

	/**
	 * Gets a user option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getUser<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, APIUser>;
	public getUser(name: string, required = false): APIUser | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.User, required);
		return option && "users" in this.resolved
			? (this.resolved.users?.[option.value] ?? null)
			: null;
	}

	/**
	 * Gets a member option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getMember<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, APIInteractionDataResolvedGuildMember>;

	public getMember(name: string, required = false): APIInteractionDataResolvedGuildMember | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.User, required);
		return option && "members" in this.resolved
			? (this.resolved.members?.[option.value] ?? null)
			: null;
	}

	/**
	 * Gets a role option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getRole<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, Role>;
	public getRole(name: string, required = false): Role | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Role, required);
		return option && "roles" in this.resolved
			? (this.resolved.roles?.[option.value] ?? null)
			: null;
	}

	/**
	 * Gets an attachment option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getAttachment<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, APIAttachment>;
	public getAttachment(name: string, required = false): APIAttachment | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Attachment, required);
		return option && "attachments" in this.resolved
			? (this.resolved.attachments?.[option.value] ?? null)
			: null;
	}

	/**
	 * Gets a mentionable option
	 * @param name The name of the option
	 * @param required Whether to throw an error if the option is not found
	 */
	public getMentionable<Required extends boolean = false>(
		name: string,
		required?: Required,
	): RequiredIf<Required, APIUser | APIInteractionDataResolvedGuildMember | Role>;

	public getMentionable(
		name: string,
		required = false,
	): APIUser | APIInteractionDataResolvedGuildMember | Role | null {
		const option = this.getTypedOption(name, ApplicationCommandOptionType.Mentionable, required);

		if (!option) {
			return null;
		}

		if (
			"members" in this.resolved &&
			this.resolved.members &&
			option.value in this.resolved.members
		) {
			return this.resolved.members[option.value] ?? null;
		}

		if ("users" in this.resolved && this.resolved.users && option.value in this.resolved.users) {
			return this.resolved.users[option.value] ?? null;
		}

		if ("roles" in this.resolved && this.resolved.roles && option.value in this.resolved.roles) {
			return this.resolved.roles[option.value] ?? null;
		}

		return null;
	}

	/**
	 * Gets the target user for a context menu interaction
	 */
	public getTargetUser(): APIUser {
		if (
			this.interaction.type !== InteractionType.ApplicationCommand ||
			this.interaction.data.type !== ApplicationCommandType.User
		) {
			throw new Error("This method can only be used on user context menu interactions");
		}

		return (this.resolved as APIUserInteractionDataResolved).users[
			this.interaction.data.target_id
		]!;
	}

	/**
	 * Gets the target member for a context menu interaction
	 * @param required Whether to throw an error if the member data is not present
	 */
	public getTargetMember<Required extends boolean = false>(
		required?: Required,
	): RequiredIf<Required, APIInteractionDataResolvedGuildMember>;
	public getTargetMember(required = false): APIInteractionDataResolvedGuildMember | null {
		if (
			this.interaction.type !== InteractionType.ApplicationCommand ||
			this.interaction.data.type !== ApplicationCommandType.User
		) {
			throw new Error("This method can only be used on user context menu interactions");
		}

		const member =
			(this.resolved as APIUserInteractionDataResolved).members?.[
				this.interaction.data.target_id
			] ?? null;

		if (!member && required) {
			throw new Error("Member data is not present");
		}

		return member;
	}

	/**
	 * Gets the target message for a context menu interaction
	 */
	public getTargetMessage(): APIMessage {
		if (
			this.interaction.type !== InteractionType.ApplicationCommand ||
			this.interaction.data.type !== ApplicationCommandType.Message
		) {
			throw new Error("This method can only be used on message context menu interactions");
		}

		return (this.resolved as APIMessageApplicationCommandInteractionDataResolved).messages[
			this.interaction.data.target_id
		]!;
	}

	/**
	 * Gets the focused option for an autocomplete interaction
	 */
	public getFocusedOption<
		Type extends
			| ApplicationCommandOptionType.String
			| ApplicationCommandOptionType.Integer
			| ApplicationCommandOptionType.Number,
	>(
		type?: Type,
	): Extract<
		APIApplicationCommandInteractionDataOption<InteractionType.ApplicationCommandAutocomplete>,
		{ type: Type }
	> {
		if (this.interaction.type !== InteractionType.ApplicationCommandAutocomplete) {
			throw new Error("This method can only be used on autocomplete interactions.");
		}

		const focusedOption = this.hoistedOptions.find(
			(
				option,
			): option is
				| APIApplicationCommandInteractionDataStringOption
				| APIApplicationCommandInteractionDataIntegerOption
				| APIApplicationCommandInteractionDataNumberOption => "focused" in option && option.focused,
		)!;

		if (type && focusedOption.type !== type) {
			throw new Error("No focused option type found for autocomplete interaction.");
		}

		return focusedOption as Extract<
			APIApplicationCommandInteractionDataOption<InteractionType.ApplicationCommandAutocomplete>,
			{ type: Type }
		>;
	}

	private getTypedOption<
		Option extends BasicApplicationCommandOptionType,
		Required extends boolean = false,
	>(
		name: string,
		type: Option,
		required: Required,
	): RequiredIf<Required, TypeToOptionMap<InteractionType.ApplicationCommand>[Option]>;

	private getTypedOption<Option extends BasicApplicationCommandOptionType>(
		name: string,
		type: Option,
		required: boolean,
	): TypeToOptionMap<InteractionType.ApplicationCommand>[Option] | null {
		const option = this.get(name, required);

		if (!option) {
			return null;
		}

		if (option.type !== type) {
			throw new Error(`Option with name "${name}" is not of the correct type`);
		}

		return option as TypeToOptionMap<InteractionType.ApplicationCommand>[Option];
	}

	public chatInputCommandText() {
		const properties = [
			this.interaction.data.name,
			this.group,
			this.subcommand,
			...this.hoistedOptions.map((option) => `${option.name}:${option.value}`),
		];

		return `/${properties.filter(Boolean).join(" ")}`;
	}
}

type BasicApplicationCommandOptionType = APIApplicationCommandInteractionDataBasicOption["type"];

// This extra type is required because apparently just inlining what `_TypeToOptionMap` does into `TypeToOptionMap` does not behave the same
type _TypeToOptionMap<Type extends InteractionType> = {
	[Option in BasicApplicationCommandOptionType]: APIApplicationCommandInteractionDataBasicOption<Type> & {
		type: Option;
	};
};

type TypeToOptionMap<Type extends InteractionType> = {
	[Option in keyof _TypeToOptionMap<Type>]: _TypeToOptionMap<Type>[Option];
};

type If<Value extends boolean, TrueResult, FalseResult> = Value extends true
	? TrueResult
	: Value extends false
		? FalseResult
		: TrueResult | FalseResult;

type RequiredIf<Value extends boolean, ValueType, FallbackType = null> = If<
	Value,
	ValueType,
	ValueType | FallbackType
>;
