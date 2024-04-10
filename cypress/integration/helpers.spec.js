/// <reference types="cypress" />

describe('Helpers...', () => {

    it('Wrap', () => {
        const obj = { name: 'User', age: 20 }
        expect(obj).to.have.property('name')
        cy.wrap(obj).should('have.property', 'name')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // cy.get('#formNome').then($el => {
        // cy.wrap($el).type('Works by cypress')
        //  })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Found the first button'))
        //promise.then(number => console.log(number))
        cy.wrap(promise).then(number => console.log(number))
        cy.get('#buttonList').then(() => console.log('Found the second button'))

        cy.wrap(1).should(number => {
            return 2
        }).should('be.equal', 1)
    })
})