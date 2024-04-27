Cypress.Commands.add('accessAccountMenu', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNTS).click()
})

