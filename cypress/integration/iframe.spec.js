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
})