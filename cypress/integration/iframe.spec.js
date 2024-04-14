/// <reference types="cypress" />


describe('Work with iFrames', () => {

    it('Should type text field', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('works?')
                .should('have.value', 'works?')
        })
    })

    it('Should test iframe directly', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })
    })
})