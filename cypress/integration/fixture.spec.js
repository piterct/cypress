/// <reference types="cypress" />

describe('Fixture tests', () => {
    it('Get data from fixture file', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').type()
        cy.get('#formSobrenome').type()
        cy.get('[name=formSexo][value=F]').click()
        cy.get('[name=formComidaFavorita][value=pizza]').click()
        cy.get('#formEscolaridade').select()
        cy.get('#formEsportes').select()
        cy.get('#formCadastrar')

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
    })
})
