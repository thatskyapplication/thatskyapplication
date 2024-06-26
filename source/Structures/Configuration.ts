import pg, { Table } from "../pg.js";

export interface ConfigurationPacket {
	ai: boolean;
}

interface ConfigurationData {
	ai: ConfigurationPacket["ai"];
}

type ConfigurationEditData = Partial<ConfigurationData>;

export default new (class Configuration {
	public ai!: ConfigurationData["ai"];

	public patch(data: ConfigurationPacket) {
		this.ai = data.ai;
	}

	public async edit({ ai = this.ai }: ConfigurationEditData) {
		const [configurationPacket] = await pg<ConfigurationPacket>(Table.Configuration)
			.update({ ai })
			.returning("*");

		this.patch(configurationPacket!);
	}
})();
