/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandAccounts'
const USER = 'piterct.teste@gmail.com';
const PASSWORD = 'Wrong password';


describe('Should test at a functional level', () => {
    before(() => {
        cy.intercept({
            method: 'POST',
            url: '/signin',
        },
            {
                id: 50314,
                nome: "False User",
                token: "A big string"
            }
        ).as('signin')


        cy.intercept({
            method: 'GET',
            url: '/saldo',
        },
            [
                { conta_id: 999, conta: "Wallet", saldo: "100.00" },
                { conta_id: 9909, conta: "Bank", saldo: "10000000.00" },
            ]
        ).as('saldo')
        cy.login(USER, PASSWORD)
    });

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
    })

    after(() => {
        cy.clearLocalStorage()
    })


    it.only('Should create an account', () => {
        cy.intercept({
            method: 'GET',
            url: '/contas'
        }, 
            [
                { id: 1, nome: "Wallet", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Bank", visivel: true, usuario_id: 1 },
            ]
        ).as('contas')

        cy.accessAccountMenu()
        cy.insertAccount('Test account')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.accessAccountMenu()
        cy.xpath(loc.ACCOUNTS.FN_XP_BTN_UPDATE('Conta para alterar')).click()
        cy.insertAccount('Update account')
        cy.get(loc.ACCOUNTS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.accessAccountMenu()
        cy.insertAccount('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'Request failed with status code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTATION).click()
        cy.get(loc.MOVIMENTATION.DESCRIPTION).clear().type('Description')
        cy.get(loc.MOVIMENTATION.VALUE).clear().type('250')
        cy.get(loc.MOVIMENTATION.INTERESTED).clear().type('Interested')
        cy.get(loc.MOVIMENTATION.ACCOUNT).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTATION.STATUS).click()
        cy.get(loc.MOVIMENTATION.BTN_SALVE).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.FINANCIAL_STATEMENT.LINES).should('have.length', 7)
        cy.xpath(loc.FINANCIAL_STATEMENT.FN_XP_SEARCH_ELEMENT('Description', '250')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.BALANCE.FN_XP_BALANCE_ACCOUNT('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.FINANCIAL_STATEMENT).click()
        cy.xpath(loc.FINANCIAL_STATEMENT.FN_XP_UPDATE_TRANSACTION('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTATION.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTATION.STATUS).click()
        cy.get(loc.MOVIMENTATION.BTN_SALVE).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.BALANCE.FN_XP_BALANCE_ACCOUNT('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.get(loc.MENU.FINANCIAL_STATEMENT).click()
        cy.xpath(loc.FINANCIAL_STATEMENT.FN_XP_REMOVE_TRANSACTION('Movimentacao para exclusao')).click()
        cy.get(loc.FINANCIAL_STATEMENT.LINES).should('have.length', 6)
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})