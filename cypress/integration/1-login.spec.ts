import { AuthRoles } from '../support/commands';

describe('login', () => {
  describe('when not logged in', () => {
    before(() => {
      cy.visit('/')
    })

    it('displays the service name', () => {
      cy.get('.lbh-header__service-name').should('have.text', 'Single View 2.0')
    })


    it('displays appropriate head link', () => {
      cy.get('.lbh-header__links').should('have.text', 'Sign in')
    })

    it('displays login button', () => {
      cy.get('.govuk-button').should('have.text', 'Sign in with Google')
    })

  });

  describe('when logged in with wrong group', () => {
    before(() => {
      cy.visitAs('/', AuthRoles.RestrictedGroup );
    })

    it('displays appropriate head link', () => {
      cy.get('.lbh-header__links').should('have.text', 'Sign in')
    })

    it('displays an error message', () => {
      cy.get('#error-summary-title').should('have.text', 'You do not have permission to access this service.');
      cy.get('.govuk-error-summary__body').should('have.text', 'To request access please complete this form. Request access');
    })

    it('displays login button', () => {
      cy.get('.govuk-button').should('have.text', 'Sign in with Google')
    })
  });

  describe('when logged in with appropriate group', () => {
    before(() => {
      cy.visitAs('/', AuthRoles.UnrestrictedGroup);
    })

    it('displays appropriate head link', () => {
      cy.get('.govuk-link').should('have.text', 'Sign out')
    })

    it('displays the user name', () => {
      cy.get('.lbh-header__links > p').should('have.text', 'Welcome Testy McTest')
    })

    it('appropriatly redirected', () => {
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/search')
      })
    })
  });
})
