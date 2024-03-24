/// <reference types="cypress" />

describe('Crypress basics', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

       // const title = cy.title()
       // console.log(title)

       cy.title().should('be.equal', 'Campo de Treinamento')
       cy.title().should('contain', 'Campo')

       cy.title()
                 .should('be.equal', 'Campo de Treinamento')
                 .and('contain', 'Campo')

         //TODO Print the title inside the console
         //TODO Write the title in a text field       
    })

    it.only('Should find and interect with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        //cy.get('not exist')
        cy.get('#buttonSimple')
             .click()
             .should('have.value', 'Obrigado!')
    })
})