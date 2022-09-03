import { BasePage } from "./base-page"

class JigsawLoginPage extends BasePage {

    constructor(pageUrl:string="/jigsawLogin") {
        super(pageUrl=pageUrl)
    }

    elements = {
      ...this.baseElements,
      getLoginPageHeading: () => cy.get('.lbh-heading-h1'),
      getDismissJigsawLogin: () => cy.get('[data-testid="dismiss-jigsaw-login"]'),
      getForm: () => cy.get('form'),
      getUsernameField: () => cy.get('#username'),
      getPasswordField: () => cy.get('#password'),
      getLoginButton: () => cy.get('.govuk-button'),
    }

    peformLogin(username:string, password:string, placeholderTokenValue:string) {

      this.elements.getUsernameField().type(username);
      this.elements.getPasswordField().type(password);

      cy.intercept('**/storeCredentials', {body: placeholderTokenValue});

      this.elements.getLoginButton().click()

    }

}

export const jigsawLoginPage = new JigsawLoginPage();
