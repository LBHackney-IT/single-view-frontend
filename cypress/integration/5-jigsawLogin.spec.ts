import { AuthRoles } from '../support/commands';

describe('Jigsaw Login & Logout',  () => {

  describe('Performs Jigsaw login',  () => {
    
    before(() => {
      var jigsawLoggedIn = false;
      cy.visitAs('/', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);
    })

    it('displays the heading', () => {
      cy.get('.lbh-heading-h1', { timeout: 10000 })
        .should('be.visible')
        .should('have.text', 'Login to your Jigsaw account')
    });

    it('displays dismiss link', () => {
      cy.get('[data-testid="dismiss-jigsaw-login"]').should('have.text', "I don’t have access to Jigsaw.");
    });

    it('displays the form', () => {
      cy.get('form').contains('Username');
      cy.get('form').contains('Password');
    });

    it('displays the error messages', () => {
      cy.get('.govuk-button', { timeout: 10000 }).click();

      cy.contains('Username is mandatory');
      cy.contains('Password is mandatory');
    });

    it('cookie is set when logged in', () => {
      cy.get('#username', { timeout: 10000 }).type('Luna');
      cy.get('#password').type('pa$$w0rd');

      const someThing = "Placeholder-Jigsaw-Token";

      cy.intercept('**/storeCredentials', {body: someThing});

      cy.get('.govuk-button').should('have.text', 'Login').click().then(() => {
        cy.getCookie('jigsawToken')
            .should('have.property', 'value', someThing);
      });
    })
  if (Cypress.env('APP_ENV') == 'production') {
      it('displays displays error when creds are wrong', ()=> {
        var jigsawLoggedIn = false;
        cy.visitAs('/jigsawLogin', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);

        cy.get('#username').type('Luna');
        cy.get('#password').type('pa$$w0rd');

        cy.intercept('POST', '**/storeCredentials', {
        statusCode: 401,
      }).as('submitWrongCreds'); 

      cy.get('.govuk-button').should('have.text', 'Login').click().then(() => {
        cy.get('.govuk-error-summary').should('be.visible').should('have.text', 'There is a problemPlease ensure that you have entered your credentials correctly')
      });
    });

    describe('when user dismisses login', ()=>{
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
      var jigsawLoggedIn = false;
      cy.visitAs('/customers/Jigsaw/641056#cases', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);
    });

    beforeEach(() => {
      cy.intercept("**/getJigsawCustomer**", {statusCode: 401});
      cy.intercept('**/getJigsawCases**', {statusCode: 401});
    })

    it('displays jigsaw login link in error summary', () => {
      cy.get('[data-testid="jigsawLoginErrorSummary"]').should('have.text', 'Log in to Jigsaw');
    });

    it('displays jigsaw login link in header bar', () => {
      cy.get('[data-testid="jigsawLoginHeader"]').should('have.text', 'Log in to Jigsaw');
    });

  });

  describe("Performs Jigsaw logout", () =>{
    before(() => {
      var jigsawLoggedIn = true;
      cy.visitAs('/search', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);
    });

    it('performs jigsaw logout', () => {
      cy.get('[data-testid="jigsawLogoutHeader"]').click()
      cy.getCookie('jigsawToken').should('not.exist')
    })
  })

});