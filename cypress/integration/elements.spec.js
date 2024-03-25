/// <reference types="cypress" />


describe('Work with basic elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('span').should('contain','Cuidado')
        cy.get('.facilAchar').should('contain','Cuidado')
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')
    })

   it('Links', () => {
    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text','Voltou!')

    cy.reload()
    cy.get('#resultado').should('have.not.text','Voltou!')
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text','Voltou!')
   })

   it("Text Fields", () => {
    cy.get('#formNome').type('Cypress Test')
    cy.get('#formNome').should('have.value', 'Cypress Test')

    cy.get('#elementosForm\\:sugestoes')
      .type('textArea')
      .should('have.value', 'textArea')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type("???")

      cy.get('[data-cy="dataSobrenome"]')
      .type('Test12345{backspace}{backspace}')
      .should('have.value', 'Test123')

      cy.get('#elementosForm\\:sugestoes')
      .clear()
      .type('Error{selectall}adjusted', {delay: 100})
      .should('have.value', 'adjusted')
   })
   
   it('Radio Button', () => {

    cy.get('#formSexoFem')
       .click()
       .should('be.checked')

    cy.get('#formSexoMasc')
       .should('not.be.checked')

    cy.get("[name=formSexo]")
       .should('have.length', 2)

   })

})

