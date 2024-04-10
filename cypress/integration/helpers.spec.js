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

    it.only('Its...', () => {
        const obj = { name: 'User', age: 20 }
        cy.wrap(obj).should('have.property', 'name', 'User')
        cy.wrap(obj).its('name').should('be.equal', 'User')

        const obj2 = { name: 'User', age: 20, address: { street: 'dos bobos' } }
        cy.wrap(obj2).its('address').should('have.property', 'street')
        cy.wrap(obj2).its('address').its('street').should('contain', 'bobos')
        cy.wrap(obj2).its('address.street').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })
})