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
        cy.getAccountByName('Conta para alterar')
            .then(accountId => {
                cy.request({
                    method: 'PUT',
                    headers: { Authorization: `JWT ${token}` },
                    url: `/contas/${accountId}`,
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

    it('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(accountId => {
                const now = new Date();
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: accountId,
                        data_pagamento: formatDate(now, 1),
                        data_transacao: formatDate(now),
                        descricao: "des",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    },
                })
            }).as('response')

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Should get balance', () => {

    })

    it('Should remove a transaction', () => {

    })

    function formatDate(date, days = 0) {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);

        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return `${day}/${month}/${year}`;
    }
})