import { Collection } from "@discordjs/collection";
import {
	ComponentType,
	type ModalSubmitActionRowComponent,
	type ModalSubmitComponent,
} from "@discordjs/core";

export class ModalResolver {
	private fields: Collection<string, ModalSubmitComponent>;

	public constructor(components: ModalSubmitActionRowComponent[]) {
		/**
		 * The extracted fields from the modal.
		 */
		this.fields = components.reduce((accumulator, actionRow) => {
			for (const component of actionRow.components) {
				accumulator.set(component.custom_id, component);
			}

			return accumulator;
		}, new Collection<string, ModalSubmitComponent>());
	}

	/**
	 * Gets the value of a text input component given a custom id.
	 * @param customId The custom id of the text input component
	 */
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
