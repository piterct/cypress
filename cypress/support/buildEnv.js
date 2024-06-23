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

    cy.intercept({
        method: 'GET',
        url: '/extrato'
    },
        {
            statusCode: 200,
            body: [
                {
                    conta: "Conta para movimentacoes", id: 2031036, descricao: "Movimentacao para exclusao", envolvido: "AAA", observacao: null, tipo: "DESP",
                    data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 2165573,
                    usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                },
                {
                    conta: "Conta com movimentacao", id: 2031037, descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null, tipo: "DESP",
                    data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-1500.00", status: true,
                    conta_id: 2165574, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                },
                {
                    conta: "Conta para saldo", id: 2031038, descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null, tipo: "REC",
                    data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "3500.00", status: false,
                    conta_id: 2165575, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                },
                {
                    conta: "Conta para saldo", id: 2031039, descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null, tipo: "DESP",
                    data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-1000.00", status: true,
                    conta_id: 2165575, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                },
                {
                    conta: "Conta para saldo", id: 2031040, descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null, tipo: "REC",
                    data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "1534.00", status: true,
                    conta_id: 2165575, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                },
                {
                    conta: "Conta para extrato", id: 2031041, descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null, tipo: "DESP",
                    data_transacao: "2024-06-23T03:00:00.000Z", data_pagamento: "2024-06-23T03:00:00.000Z", valor: "-220.00", status: true,
                    conta_id: 2165576, usuario_id: 50314, transferencia_id: null, parcelamento_id: null
                }
            ]
        })
}

export default buildEnv