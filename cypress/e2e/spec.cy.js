describe("app works correctly with routes", () => {
	before(function () {
		cy.visit("http://localhost:3000");
	});

	it("should open burger constructor page by default", function () {
		cy.contains("Соберите бургер");
	});
});