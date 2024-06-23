/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandAccounts'
import buildEnv from '../../support/buildEnv';
const USER = 'piterct.teste@gmail.com';
const PASSWORD = 'Wrong password';


describe('Should test at a functional level', () => {
    beforeEach(() => {
        buildEnv();
        cy.login(USER, PASSWORD)
    });

    afterEach(() => {
        cy.clearLocalStorage()
    })

    it('Should create an account', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas'
        },
            { id: 3, nome: "Test account", visivel: true, usuario_id: 1 }
        )

        cy.accessAccountMenu()
        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
            [
                { id: 1, nome: "Wallet", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Bank", visivel: true, usuario_id: 1 },
                { id: 3, nome: "Test account", visivel: true, usuario_id: 1 },
            ]
        ).as('savedAccounts')

        cy.insertAccount('Test account')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.intercept({
            method: 'PUT',
            url: '/contas/**'
        },
            { id: 1, nome: "Update account", visivel: true, usuario_id: 1 }
        )

        cy.accessAccountMenu()

        cy.xpath(loc.ACCOUNTS.FN_XP_BTN_UPDATE('Wallet')).click()
        cy.get(loc.ACCOUNTS.NAME)
            .clear()
            .type('Update account')

        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
            [
                { id: 1, nome: "Update account", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Bank", visivel: true, usuario_id: 1 },
            ]
        ).as('savedAccounts')
        cy.get(loc.ACCOUNTS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.accessAccountMenu()
        cy.intercept({
            method: 'POST',
            url: '/contas',
        },
            {
                statusCode: 400,
                body: {
                    error: "Já existe uma conta com esse nome!"
                }
            }
        ).as('accountWithTheSameName')
        cy.insertAccount('Conta mesmo nome')

        cy.get(loc.MESSAGE).should('contain', 'Request failed with status code 400')
    })

    it.only('Should create a transaction', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes'
        },
            {
                body: {
                    id: 2031035,
                    descricao: "Description",
                    envolvido: "involved",
                    observacao: null,
                    tipo: "REC",
                    data_transacao: "2024-06-23T03:00:00.000Z",
                    data_pagamento: "2024-06-23T03:00:00.000Z",
                    valor: "5000.00",
                    status: false,
                    conta_id: 2165565,
                    usuario_id: 50314,
                    transferencia_id: null,
                    parcelamento_id: null
                }
            }
        ).as('transations')

        cy.get(loc.MENU.MOVIMENTATION).click()
        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        },
            {
                statusCode: 200,
                body: [
                    {
                        conta: "Conta para movimentacoes", id: 2031036, descricao: "Movimentacao para exclusao", envolvido: "AAA", observacao: null, tipo: "DESP",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 2165573,
                        usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    },
                    {
                        conta: "Conta com movimentacao", id: 2031037, descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null, tipo: "DESP",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-1500.00", status: true,
                        conta_id: 2165574, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    },
                    {
                        conta: "Conta para saldo", id: 2031038, descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null, tipo: "REC",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "3500.00", status: false,
                        conta_id: 2165575, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    },
                    {
                        conta: "Conta para saldo", id: 2031039, descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null, tipo: "DESP",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-1000.00", status: true,
                        conta_id: 2165575, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    },
                    {
                        conta: "Conta para saldo", id: 2031040, descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null, tipo: "REC",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "1534.00", status: true,
                        conta_id: 2165575, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    },
                    {
                        conta: "Conta para extrato", id: 2031041, descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null, tipo: "DESP",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-220.00", status: true,
                        conta_id: 2165576, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    },
                    {
                        conta: "Conta para saldo", id: 2031049, descricao: "Description", envolvido: "FFF", observacao: null, tipo: "DESP",
                        data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "250.00", status: true,
                        conta_id: 2165576, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                    }
                ]
            }).as('bankStatement')
            
        cy.get(loc.MOVIMENTATION.DESCRIPTION).clear().type('Description')
        cy.get(loc.MOVIMENTATION.VALUE).clear().type('250')
        cy.get(loc.MOVIMENTATION.INTERESTED).clear().type('Interested')
        cy.get(loc.MOVIMENTATION.ACCOUNT).select('Bank')
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