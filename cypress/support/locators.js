const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTATION: '[data-test=menu-movimentacao]',
        FINANCIAL_STATEMENT: '[data-test=menu-extrato]'
    },
    ACCOUNTS: {
        NAME: '[data-test=nome]',
        BTN_SAVE: '.btn',
        FN_XP_BTN_UPDATE: name => `//table//td[contains(.,'${name}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTATION: {
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        ACCOUNT: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVE: '.btn-primary'
    },
    FINANCIAL_STATEMENT: {
        LINES: '.list-group > li',
        FN_XP_SEARCH_ELEMENT: (desc, value) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${value}')]`,
        FN_XP_REMOVE_TRANSACTION: desc => `//span[contains(.,'${desc}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_UPDATE_TRANSACTION: desc => `//span[contains(.,'${desc}')]/../../..//i[@class='fas fa-edit']`
    },
    BALANCE: {
        FN_XP_BALANCE_ACCOUNT: name => `//td[contains(.,'${name}')]/../td[2]`
    },
    MESSAGE: '.toast-message'


}

export default locators;