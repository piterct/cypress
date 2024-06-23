const buildEnv = () => {
    cy.intercept({
        method: 'POST',
        url: '/signin',
    },
        {
            id: 50314,
            nome: "False User",
            token: "A big string"
        }
    ).as('signin')


    cy.intercept({
        method: 'GET',
        url: '/saldo',
    },
        [
            { conta_id: 999, conta: "Wallet", saldo: "100.00" },
            { conta_id: 9909, conta: "Bank", saldo: "10000000.00" },
        ]
    ).as('balance')

    cy.intercept({
        method: 'GET',
        url: '/contas'
    },
        [
            { id: 1, nome: "Wallet", visivel: true, usuario_id: 1 },
            { id: 2, nome: "Bank", visivel: true, usuario_id: 1 },
        ]
    ).as('accounts')
}

export default buildEnv