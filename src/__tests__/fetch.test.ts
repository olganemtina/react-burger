import { IRegisterFormData } from "../services/types/auth";
import { registerRequest, registerUrl } from "../utils/api/auth-api";

describe("check fetch", () => {
	beforeEach(() => {
		jest.spyOn(global, "fetch").mockResolvedValue({
			ok: true,
			json: async () => {
				return {
					data: "test",
				};
			},
		} as Response);
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should register request passed", async () => {
		const requestData: IRegisterFormData = {
			name: "name",
			email: "email",
			password: "password",
		};
		const result = await registerRequest(requestData);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenLastCalledWith(registerUrl, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(requestData),
		});
	});
});
