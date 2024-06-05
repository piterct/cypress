/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    let token;

    beforeEach(() => {
        cy.getToken('piterct.teste@gmail.com', '123')
            .then(tkn => {
                token = tkn;
            })
    });

    afterEach(() => {
        cy.resetRest(token)
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: { nome: "any account" }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.be.property('id')
            expect(res.body).to.have.property('nome', 'any account')
        })
    })

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                url: `/contas/${res.body[0].id}`,
                body: { nome: "Updated account by rest" }
            }).as('response')

            cy.get('@response').its('status').should('be.equal', 200)
        })
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: { nome: "Conta mesmo nome" },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })

    })

    it.only('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(accountId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: accountId,
                        data_pagamento: "04/06/2024",
                        data_transacao: "04/06/2024",
                        descricao: "Teste de movimentacao",
                        envolvido: "Joao",
                        status: false,
                        tipo: "REC",
                        valor: "2500"
                    },
                })
            })

    })

    it('Should get balance', () => {

    })

    it('Should remove a transaction', () => {

    })
})