/// <reference types="cypress" />

describe('Crypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        //cy.pause()

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')


        //TODO Print the title inside the console
        cy.title()

        cy.title().should(title => {
            console.log(title)
        })

        let syncTitle

        //TODO Write the title in a text field 
        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Should find and interect with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.pause()

        //cy.get('not exist')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})