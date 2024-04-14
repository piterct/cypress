/// <reference types="cypress" />


describe('Work with basic alerts', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it.only('Alert with mock', () => {
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)
        cy.get('#alert').click()
    })
})