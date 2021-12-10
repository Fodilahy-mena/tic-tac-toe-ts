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
        cy.get("[data-cy=player-board]");
    })

    it("Game board should have 9 squares", () => {
        cy.get("[data-cy=player-board]").find('div').should('length', 9);
    })

    it("Each square should be clickable", () => {
        cy.get("[data-cy=player-board]").find('div').each(($square, index) => {
            if(index % 2 == 0) {
                cy.get($square).click().then(($sq) => {
                    cy.get($sq).find('[data-cy=icon]').should('be.visible')
                });
            }
        })
    })
})