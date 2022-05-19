import { AuthRoles } from '../support/commands';

describe('jigsaw login', () => {
  before(() => {
    cy.visitAs('/', AuthRoles.UnrestrictedGroup);
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

  it('cookie is set when looked in', () => {
    cy.get('#username', { timeout: 10000 }).type('Luna');
    cy.get('#password').type('pa$$w0rd');

    const someThing = "lorem";
    cy.intercept('POST', '**/storeCredentialS', (req) => {
      req.continue(res => {
        res.body = someThing
      })
    }).as('submitCreds');

    cy.get('.govuk-button').should('have.text', 'Login').click().then(() => {
      cy.getCookie('jigsawToken')
          .should('have.property', 'value', someThing);
    });
  })

  it('displays displays error when creds are wrong', ()=> {
    cy.visitAs('/jigsawLogin', AuthRoles.UnrestrictedGroup);

    cy.get('#username').type('Luna');
    cy.get('#password').type('pa$$w0rd');

    cy.intercept('POST', '**/storeCredentialS', {
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
})
