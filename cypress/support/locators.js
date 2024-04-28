const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
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
        ACCOUNT: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVE: '.btn-primary'
    },
    FINANCIAL_STATEMENT: {
        LINES: '.list-group > li',
        XP_SEARCH_ELEMENT: "//span[contains(.,'Description')]/following-sibling::small[contains(.,'250')]"
    },
    BALANCE: {
        FN_XP_BALANCE_ACCOUNT: NAME => `//td[contains(.,'${NAME}')]/../td[2]`
    },
    MESSAGE: '.toast-message'


}

export default locators;