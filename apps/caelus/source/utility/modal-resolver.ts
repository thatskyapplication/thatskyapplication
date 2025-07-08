import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	ComponentType,
	type ModalSubmitActionRowComponent,
	type ModalSubmitComponent,
} from "@discordjs/core";

export class ModalResolver {
	private readonly fields: ReadonlyCollection<string, ModalSubmitComponent>;

	public constructor(components: readonly ModalSubmitActionRowComponent[]) {
		this.fields = components.reduce((accumulator, actionRow) => {
			for (const component of actionRow.components) {
				accumulator.set(component.custom_id, component);
			}

			return accumulator;
		}, new Collection<string, ModalSubmitComponent>());
	}

	public getTextInputValue(customId: string) {
		const field = this.fields.get(customId);

		if (!field) {
			throw new Error(`Custom id ${customId} not found in modal.`);
		}

		if (ComponentType.TextInput !== field.type) {
			throw new Error(`Custom id ${customId} is not a text input component.`);
		}

		return field.value;
	}
}
