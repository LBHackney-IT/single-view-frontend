import { AuthRoles } from '../support/commands';

describe('Notes', () => {
  describe("Displays notes", () => {
    beforeEachEach(() => {
      cy.intercept('GET', '**/getPersonApiCustomer*', { fixture: 'person-profile.json' }).as('getPerson');
      cy.intercept('GET', '**/notes*', { fixture: 'customer-notes.json' }).as('getNotes');
  
      var jigsawLoggedIn = true;
      cy.visitAs('/customers/personapi/6d7ed1a4#notes', AuthRoles.UnrestrictedGroup, true);
    })

    it('displays the notes tab', () => {
      cy.get('#notes', { timeout: 10000 })
        .should('be.visible')
    });

    it('displays a snapshot', () => {
      cy.get('[data-snapshot="1"]').should('be.visible', {timeout: 10000});
      cy.get('[data-testid^="note_"]:visible'). should('have.length', 5);
    });

    // TODO: Add tests of note display
  });
});
