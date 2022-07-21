import { AuthRoles } from '../support/commands';

describe('Notes', () => {
  describe("Displays notes", () => {
    before(() => {
      cy.intercept('GET', '**/getPersonApiCustomer*', { fixture: 'person-profile.json' }).as('getPerson');
      cy.intercept('GET', '**/getJigsawCases*', { fixture: 'person-cases.json' }).as('getCases');
      cy.visitAs('/customers/PersonAPI/6d7ed1a4#cases', AuthRoles.UnrestrictedGroup);
    });

    it('displays the cases tab', () => {
      cy.get('#cases', { timeout: 10000 })
        .should('be.visible')
    });     
  });
});
