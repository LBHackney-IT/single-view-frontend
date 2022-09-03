import { BasePage } from "./base-page"

class LoginPage extends BasePage {

    constructor(pageUrl:string="/") {
        super(pageUrl=pageUrl)
    }

    elements = {
        ...this.baseElements,
        getHackneyLoginButton: () => cy.get('[data-testid="hackney-login-button"]'),
        getServiceName: () => cy.get('.lbh-header__service-name'),
        getHeadLink: () => cy.get('.lbh-header__links'),
        getErrorMessageTitle: () => cy.get('#error-summary-title'),
        getErrorMessageBody: () => cy.get('.govuk-error-summary__body'),
        getUserWelcomeMessage: () => cy.get('.lbh-header__links > p'),
        getSignOutLink: () => cy.get('[data-testid="sign-out-link"]'),

        // Jigsaw login screen
        getDismissJigsawLoginLink: () => cy.get('[data-testid="dismiss-jigsaw-login"]')
    }

}

export const loginPage = new LoginPage();