import { AuthRoles, JigsawStatuses } from '../support/commands';
import { jigsawLoginPage } from '../pages/jigsawLogin-page'
import { casesPage } from '../pages/profile/cases-page'

describe('Jigsaw Login & Logout', () => {

  describe('Performs Jigsaw login', () => {

    before(() => {
      jigsawLoginPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.None)
    });

    it('displays the heading', () => {
      jigsawLoginPage.elements.getLoginPageHeading()
        .should('be.visible')
        .should('have.text', 'Login to your Jigsaw account')
    });

    it('displays dismiss link', () => {
      jigsawLoginPage.elements.getDismissJigsawLogin()
        .should('have.text', "I don’t have access to Jigsaw.");
    });

    it('displays the form', () => {
      jigsawLoginPage.elements.getForm()
        .should('contain', 'Username')
        .and('contain', 'Password');
    });

    it('displays the error messages', () => {
      jigsawLoginPage.elements.getLoginButton().click()

      cy.contains('Username is mandatory');
      cy.contains('Password is mandatory');
    });

    it('sets the cookie when logged in', () => {
      const placeholderTokenValue = "Placeholder-Jigsaw-Token";

      jigsawLoginPage.peformLogin('Luna', 'pa$$w0rd', placeholderTokenValue)

      cy.getCookie('jigsawToken')
        .should('have.property', 'value', placeholderTokenValue);

    })

    // TODO: Revisit, not sure how to approach this with POM
    if (Cypress.env('APP_ENV') == 'production') {
      it('displays displays error when creds are wrong', () => {
        cy.visitAs('/jigsawLogin', AuthRoles.UnrestrictedGroup, JigsawStatuses.None);

        cy.get('#username').type('Luna');
        cy.get('#password').type('pa$$w0rd');

        cy.intercept('POST', '**/storeCredentials', {
          statusCode: 401,
        }).as('submitWrongCreds');

        cy.get('.govuk-button').should('have.text', 'Login').click().then(() => {
          cy.get('.govuk-error-summary').should('be.visible').should('have.text', 'There is a problemPlease ensure that you have entered your credentials correctly')
        });
      });

      describe('when user dismisses login', () => {
        it('dismissed cookie is set', () => {
          cy.get('[data-testid="dismiss-jigsaw-login"]').should('have.text', "I don’t have access to Jigsaw.")
            .click().then(() => {
              cy.getCookie('jigsawDismissed')
                .should('have.property', 'value', 'true');
            });
        });

        it('redirects to search', () => {
          cy.location().should((location) => {
            expect(location.pathname).to.eq('/search')
          })
        });
      });
    }

  })

  describe("Prompts Jigsaw login", () => {
    before(() => {
      cy.intercept("**/getJigsawCustomer**", { statusCode: 401 });
      cy.intercept('**/getJigsawCases**', { statusCode: 401 });

      casesPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.Dismissed)

    })

    it('displays jigsaw login link in error summary', () => {
      casesPage.elements.getLoginErrorSummary()
        .should('have.text', 'Log in to Jigsaw');
    });

    it('displays jigsaw login link in header bar', () => {
      casesPage.elements.getJigsawLoginLinkHeader()
        .should('have.text', 'Log in to Jigsaw');
    });

  });

  describe("Performs Jigsaw logout", () => {
    before(() => {
      jigsawLoginPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)
    });

    it('performs jigsaw logout', () => {
      jigsawLoginPage.elements.getJigsawLogoutLinkHeader().click()
      cy.getCookie('jigsawToken').should('not.exist')
    })
  })

});