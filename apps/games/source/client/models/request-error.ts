export class RequestError extends Error {
	public readonly status: number;

	public override readonly name = "RequestError";

	public constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}
