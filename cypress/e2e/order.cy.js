describe("create order", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
		cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
			"postOrder"
		);
		// Устанавливаем токены:
		window.localStorage.setItem(
			"refreshToken",
			JSON.stringify("test-refreshToken")
		);
		cy.setCookie("accessToken", "test-accessToken");
	});

	it("should open modal without choosen orders", function () {
		cy.get("body").then(($body) => {
			cy.get("button").contains("Оформить заказ").click();

			if (
				cy
					.get("body", { timeout: 20000 })
					.find("[data-testid=order-number]")
					.children("div").length
			) {
				cy.get(".close-button").click();
			} else {
				cy.get("[data-testid=order-number]")
					.contains("Пожалуйста, добавьте булки в бургер")
					.should("exist");
				cy.get(".close-button").click();
			}
		});
	});

	it("should open modal with choosen orders", () => {
		const dataTransfer = new DataTransfer();

		cy.get("[data-testid=draggable-item]").first().trigger("dragstart", {
			dataTransfer,
		});

		cy.get("[data-testid=drop-area]").trigger("drop", {
			dataTransfer,
		});

		cy.get("[data-testid=draggable-item]").last().trigger("dragstart", {
			dataTransfer,
		});

		cy.get("[data-testid=drop-area]").trigger("drop", {
			dataTransfer,
		});

		cy.get("[data-testid=drop-area]")
			.find(".constructor-element")
			.should("have.length", 3);

		cy.get("button").contains("Оформить заказ").click();
		cy.get("[data-testid=order-number]").contains("123").should("exist");
	});

	it("should open ingredient details modal", function () {
		cy.get("[data-testid=current-ingredient-name]")
			.first()
			.as("currentIngredient");
		cy.get("@currentIngredient").invoke("text").as("SourceText");

		cy.get("@currentIngredient").click();

		cy.get("[data-testid=modal-current-ingredient-name]")
			.invoke("text")
			.as("TargetText");

		cy.get("@SourceText").then((SourceText) => {
			cy.get("@TargetText").then((TargetText) => {
				expect(SourceText).equal(TargetText);
			});
		});

		cy.get(".close-button").click();
	});

	afterEach(function () {
		cy.clearLocalStorage();
		cy.clearCookies();
	});
});
