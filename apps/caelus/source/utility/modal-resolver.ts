import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIInteractionDataResolved,
	type APIModalSubmission,
	ComponentType,
	type ModalSubmitComponent,
} from "@discordjs/core";

export class ModalResolver {
	private components: ReadonlyCollection<string, ModalSubmitComponent>;

	private resolved: Pick<APIInteractionDataResolved, "attachments">;

	public constructor({ components: data, resolved }: APIModalSubmission) {
		const components = new Collection<string, ModalSubmitComponent>();

		for (const label of data) {
			if (label.type === ComponentType.ActionRow) {
				throw new Error("Encountered an action row in a modal.");
			}

			if (label.type === ComponentType.TextDisplay) {
				// No custom id.
				continue;
			}

			components.set(label.component.custom_id, label.component);
		}

		this.components = components;
		let attachments = {};

		if (resolved?.attachments) {
			attachments = resolved.attachments;
		}

		this.resolved = { attachments };
	}

	public getTextInputValue(customId: string) {
		const field = this.components.get(customId);

		if (!(field && ComponentType.TextInput === field.type)) {
			throw new Error(`Custom id ${customId} is not a text input component.`);
		}

		return field.value;
	}

	public getStringSelectValues(customId: string) {
		const field = this.components.get(customId);

		if (!(field && ComponentType.StringSelect === field.type)) {
			throw new Error(`Custom id ${customId} is not a string select component.`);
		}

		return field.values;
	}

	public getFileUploadValeus(customId: string) {
		const field = this.components.get(customId);

		if (!(field && ComponentType.FileUpload === field.type)) {
			throw new Error(`Custom id ${customId} is not a string select component.`);
		}

		return field.values.map((value) => this.resolved.attachments![value]!);
	}
}
