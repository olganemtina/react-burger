import * as CONSTANTS from "./test-constants";

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
					.find(CONSTANTS.ORDER_NUMBER)
					.children("div").length
			) {
				cy.get(".close-button").click();
			} else {
				cy.get(CONSTANTS.ORDER_NUMBER)
					.contains("Пожалуйста, добавьте булки в бургер")
					.should("exist");
				cy.get(".close-button").click();
			}
		});
	});

	it("should open modal with choosen orders", () => {
		const dataTransfer = new DataTransfer();

		cy.get(CONSTANTS.DRAGGABLE_ITEM).first().trigger("dragstart", {
			dataTransfer,
		});

		cy.get(CONSTANTS.DROP_AREA).trigger("drop", {
			dataTransfer,
		});

		cy.get(CONSTANTS.DRAGGABLE_ITEM).last().trigger("dragstart", {
			dataTransfer,
		});

		cy.get(CONSTANTS.DROP_AREA).trigger("drop", {
			dataTransfer,
		});

		cy.get(CONSTANTS.DROP_AREA)
			.find(".constructor-element")
			.should("have.length", 3);

		cy.get("button").contains("Оформить заказ").click();
		cy.get(CONSTANTS.ORDER_NUMBER).contains("123").should("exist");
	});

	it("should open ingredient details modal", function () {
		cy.get(CONSTANTS.CURRENT_INGREDIENT_NAME)
			.first()
			.as("currentIngredient");
		cy.get("@currentIngredient").invoke("text").as("SourceText");

		cy.get("@currentIngredient").click();

		cy.get(CONSTANTS.MODAL_CURRENT_INGREDIENT_NAME)
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
