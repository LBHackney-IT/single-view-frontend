import { AuthRoles } from '../support/commands';

describe('Notes', () => {
  describe("Displays notes", () => {

    before(() => {
      var jigsawLoggedIn = false;
      cy.visitAs('/customers/personapi/6d7ed1a4#notes', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);
      
      cy.intercept('GET', '**/getPersonApiCustomer*', { fixture: 'person-profile.json' }).as('getPerson');
      cy.intercept('GET', '**/notes*', { fixture: 'customer-notes.json' }).as('getNotes');
    });

    it('displays the notes tab and a snapshot', () => {
      cy.get('#notes', { timeout: 10000 })
        .should('be.visible')
      cy.get('[data-snapshot="1"]').should('be.visible', {timeout: 10000});
      cy.get('[data-testid^="note_"]:visible'). should('have.length', 5);
    });

    // TODO: Add tests of note display
  });
});
