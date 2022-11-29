import { checkReponseAndGetData } from "../utils/api/request-api-helpers";

describe("check reponse and get data", () => {
	it("should passed", async () => {
		let response = {
			ok: true,
			json: async () => {
				return {
					data: "test",
				};
			},
		} as Response;

		const result = await checkReponseAndGetData(response);
		expect(result).toEqual({ data: "test" });
	});

	it("should failed", async () => {
		let response = {
			ok: false,
			json: async () => {
				return {
					data: "test",
				};
			},
			status: 500,
		} as Response;

		await expect(checkReponseAndGetData(response)).rejects.toEqual(500);
	});
});
