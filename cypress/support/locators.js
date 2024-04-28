const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings',
        ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTATION: '[data-test=menu-movimentacao]'
    },
    ACCOUNTS: {
        NAME: '[data-test=nome]',
        BTN_SAVE: '.btn',
        XP_BTN_UPDATE: "//table//td[contains(.,'Test account')]/..//i[@class='far fa-edit']"
    },
    MOVIMENTATION: {
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        BTN_SALVE: '.btn-primary'
    },
    FINANCIAL_STATEMENT: {
        LINES:'.list-group > li'
    },
    MESSAGE: '.toast-message'


}

export default locators;