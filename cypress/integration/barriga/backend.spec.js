/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    beforeEach(() => {
        //cy.login('piterct.teste@gmail.com', '123')
    });

    afterEach(() => {
        //cy.resetApp()
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "piterct.teste@gmail.com",
                redirecionar: false,
                senha: "123"
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
                cy.request({
                    method: 'POST',
                    headers: { Authorization: `JWT ${token}` },
                    url: 'https://barrigarest.wcaquino.me/contas',
                    body: { nome: "conta qualquer4545" }
                }).as('response')
            })
     
            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.be.property('id')
                expect(res.body).to.have.property('nome', 'conta qualquer4545')
            })

    })

    it('Should update an account', () => {

    })

    it('Should not create an account with same name', () => {

    })

    it('Should create a transaction', () => {

    })

    it('Should get balance', () => {

    })

    it('Should remove a transaction', () => {

    })
})