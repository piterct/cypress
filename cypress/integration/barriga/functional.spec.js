/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandAccounts'

describe('Should test at a functional level', () => {
    before(() => {
        cy.login('piterct.teste@gmail.com', '123')
        cy.resetApp()
    });

    it('Should create an account', () => {
        cy.accessAccountMenu()
        cy.insertAccount('Test account')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.login('piterct.teste@gmail.com', '123')
        cy.accessAccountMenu()
        cy.xpath(loc.ACCOUNTS.XP_BTN_UPDATE).click()
        cy.get(loc.ACCOUNTS.NAME)
            .clear()
            .type('Update account')
        cy.get(loc.ACCOUNTS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })
})