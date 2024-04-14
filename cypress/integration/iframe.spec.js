/// <reference types="cypress" />


describe('Work with iFrames', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    cy.get('#frame1')
})