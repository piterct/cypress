/// <reference types="cypress" />

describe('Dinamic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach(food => {
        it(`Register with ${food}`, () => {
            cy.get('#formNome').type('User')
            cy.get('#formSobrenome').type('Any')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
    })

    it.only('Must select all using each', () => {
        cy.get('#formNome').type('User')
        cy.get('#formSobrenome').type('Any')
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get('[name=formComidaFavorita]').each($el => {
            //$el.clik()
            if ($el.val() == ! 'Vegetariano')
                cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')

        cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })

})