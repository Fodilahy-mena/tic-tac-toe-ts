describe('User should see StartScreen', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    })

    it("It should contain Tic tac toe", () => {
        cy.get("[data-cy=title]").contains('Tic tac toe');
    })

    it("It should contain inputs", () => {
        // should contain first player input
        cy.get("[data-cy=first-player-input]").should('be.visible');
        // should contain second player input
        cy.get("[data-cy=second-player-input]").should('be.visible');
    })

    it("Should contain a button link to start the game", () => {
        cy.get("[data-cy=button-link").should('be.visible')
    })

    it("Clicking on Start link should redirect to playground page (GamePage)", () => {
        cy.get("[data-cy=button-link").click();
        cy.location('pathname').should('eq', '/playground');
    })
})