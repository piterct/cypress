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
        cy.xpath(loc.ACCOUNTS.FN_XP_BTN_UPDATE('Test account')).click()
        cy.insertAccount('Update account')
        cy.get(loc.ACCOUNTS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.login('piterct.teste@gmail.com', '123')
        cy.accessAccountMenu()
        cy.insertAccount('Update account')
        cy.get(loc.MESSAGE).should('contain', 'Request failed with status code 400')
    })

    it('Should create a transaction', () => {
        cy.login('piterct.teste@gmail.com', '123')
        cy.get(loc.MENU.MOVIMENTATION).click()
        cy.get(loc.MOVIMENTATION.DESCRIPTION).clear().type('Description')
        cy.get(loc.MOVIMENTATION.VALUE).clear().type('250')
        cy.get(loc.MOVIMENTATION.INTERESTED).clear().type('Interested')
        cy.get(loc.MOVIMENTATION.ACCOUNT).select('Update account')
        cy.get(loc.MOVIMENTATION.STATUS).click()
        cy.get(loc.MOVIMENTATION.BTN_SALVE).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.FINANCIAL_STATEMENT.LINES).should('have.length', 7)
        cy.xpath(loc.FINANCIAL_STATEMENT.FN_XP_SEARCH_ELEMENT('Description', '250')).should('exist')
    })

    it('Should get balance', () => {
        cy.login('piterct.teste@gmail.com', '123')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.BALANCE.FN_XP_BALANCE_ACCOUNT('Update account')).should('contain', '250,00')
    })

    it('Should remove a transaction', () => {
        cy.login('piterct.teste@gmail.com', '123')
        cy.get(loc.MENU.FINANCIAL_STATEMENT).click()
        cy.xpath(loc.FINANCIAL_STATEMENT.FN_XP_REMOVE_TRANSACTION('Description')).click()
        cy.get(loc.FINANCIAL_STATEMENT.LINES).should('have.length', 6)
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})