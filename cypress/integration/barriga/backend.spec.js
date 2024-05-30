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
            url: 'https://barrigarest.wcaquino.me/contas',
            body: { nome: "conta qualquer" }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.be.property('id')
            expect(res.body).to.have.property('nome', 'conta qualquer')
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