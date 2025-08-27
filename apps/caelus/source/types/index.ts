export type NonNullableInterface<Type> = {
	[Property in keyof Type]: NonNullable<Type[Property]>;
};
