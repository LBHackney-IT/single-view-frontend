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
      var jigsawLoggedIn = false;
      cy.visitAs('/', AuthRoles.RestrictedGroup, jigsawLoggedIn);
    })

    it('displays appropriate head link', () => {
      cy.get('.lbh-header__links').should('have.text', 'Sign in')
    })

    it('displays an error message', () => {
      cy.get('#error-summary-title').should('have.text', 'You may not have permission to use this service. If this is your first time using Single View, please sign in below.');
      cy.get('.govuk-error-summary__body').should('have.text', 'To request access please complete this form. Request access');
    })

    it('displays login button', () => {
      cy.get('.govuk-button').should('have.text', 'Sign in with Google')
    })
  });

  describe('when logged in with appropriate group', () => {
    before(() => {
      var jigsawLoggedIn = false;
      cy.visitAs('/', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);
    })

    it('displays appropriate head link', () => {
      cy.get('.lbh-header__links > .govuk-link').should('have.text', 'Sign out')
    })

    it('displays the user name', () => {
      cy.get('.lbh-header__links > p').should('have.text', 'Welcome Testy McTestface')
    })

    it('appropriately redirected to jigsaw', () => {
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/jigsawLogin')
      })
    });

    describe('when jigsaw login is dismissed', ()=> {

      it('appropriately redirected to search', () => {

        cy.get('[data-testid="dismiss-jigsaw-login"]').should('have.text', "I don’t have access to Jigsaw.").click();

        cy.location().should((location) => {
          expect(location.pathname).to.eq('/search')
        })
      });
    });
  });
});
