/// <reference types="cypress" />

describe('Fixture tests', () => {
    it('Get data from fixture file', function () {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.fixture('userData').as('user').then((() => {
            cy.get('#formNome').type(this.user.name)
            cy.get('#formSobrenome').type(this.user.lastName)
            cy.get(`[name=formSexo][value=${this.user.gender}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.user.food}]`).click()
            cy.get('#formEscolaridade').select(this.user.education)
            cy.get('#formEsportes').select(this.user.sport)
        }))

        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
    })
})
