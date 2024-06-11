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
                    url: `/contas/${accountId}`,
                    body: { nome: "Updated account by rest" }
                }).as('response')

                cy.get('@response').its('status').should('be.equal', 200)
            })
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
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
        let accountBalance = null;
        cy.request({
            method: 'GET',
            url: '/saldo',
        }).then(res => {
            res.body.forEach(account => {
                if (account.conta === "Conta para saldo") {
                    accountBalance = account;
                }
            });
            expect(accountBalance.saldo).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/transacoes/${res.body[0].id}`,
                body: {
                    status: true,
                    data_transacao: convertToDDMMYYYY(res.body[0].data_transacao),
                    data_pagamento: convertToDDMMYYYY(res.body[0].data_pagamento),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                },
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
        }).then(res => {
            res.body.forEach(account => {
                if (account.conta === "Conta para saldo") {
                    accountBalance = account;
                }
            });
            expect(accountBalance.saldo).to.be.equal('4034.00')
        })
    })


    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.log(res)
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${res.body[0].id}`,
            }).its('status').should('be.equal', 204)
        })
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

    function convertToDDMMYYYY(dateString) {
        const date = new Date(dateString);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }
})