import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-test="menu-settings"]').click()
    cy.get('[href="/logout"]').click()
})

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: password
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token;
        })
})

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
        method: 'GET',
        headers: { Authorization: `JWT ${token}` },
        url: '/reset'
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('getAccountByName', name => {
    cy.getToken('piterct.teste@gmail.com', '123').then(token => {
        cy.request({
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            qs: {
                nome: name
            }
        }).then(res => {
            return res.body[0].id
        })
    })

})