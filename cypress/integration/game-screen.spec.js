describe('User should see StartScreen', () => {
    before(() => {
        cy.visit('http://localhost:3000/playground');
    })

    it("It should contain Tic tac toe", () => {
        cy.get("[data-cy=title]").contains('Tic tac toe');
    })

    it("It should display game status", () => {
        cy.get("[data-cy=game-satatus]");
    })

    it("It should display game board", () => {
        cy.get("[data-cy=game-board]");
    })

    it("Game board should have 9 squares", () => {
        cy.get("[data-cy=game-board]").find('div').should('length', 9);
    })

    it("Each square should be clickable", () => {
        cy.get("[data-cy=game-board]").children().eq(0).click();
        cy.get("[data-cy=game-board]").find('div').click({ multiple: true })
    })
})

describe("Check winning combinations", () => {
    before(() => {
        cy.visit('http://localhost:3000/playground');
    })

    it("Check player won", () => {
        cy.get('[data-cy=square-0]').click()
        cy.get('[data-cy=square-1]').click()
        cy.get('[data-cy=square-4]').click()
        cy.get('[data-cy=square-5]').click()
        cy.get('[data-cy=square-3]').click()
        cy.get('[data-cy=square-6]').click()
        cy.get('[data-cy=square-8]').click()
    })
})