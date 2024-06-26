import loc from './locators'

Cypress.Commands.add('accessAccountMenu', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNTS).click()
})

Cypress.Commands.add('insertAccount', account => {
    cy.get(loc.ACCOUNTS.NAME).clear().type(account)
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
})

