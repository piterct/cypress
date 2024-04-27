/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Should test at a functional level', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get(loc.LOGIN.USER).type('piterct.teste@gmail.com')
        cy.get(loc.LOGIN.PASSWORD).type('123')
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Should create an account', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.ACCOUNTS).click()
        cy.get(loc.ACCOUNTS.NAME).type('Test account')
        cy.get(loc.ACCOUNTS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(.,'Test account')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test="nome"]')
            .clear()
            .type('Update account')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
    })
})