import { AuthRoles, JigsawStatuses } from '../support/commands';
import { notesPage } from '../pages/profile/notes-page'

describe('Notes', () => {
  describe("Displays notes", () => {

    before(() => {
      notesPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.None);

      cy.intercept('GET', '**/getPersonApiCustomer*', { fixture: 'person-profile.json' }).as('getPerson');
      cy.intercept('GET', '**/notes*', { fixture: 'customer-notes.json' }).as('getNotes');
    });

    it('displays the notes tab and a snapshot', () => {
      notesPage.elements.getNotesTab()
        .should('be.visible')
      notesPage.elements.getSnapshotOne()
        .should('be.visible', { timeout: 10000 });
      notesPage.elements.getNotes()
        .should('have.length', 5);
    });

    it('shows more and less notes', () => {
      notesPage.elements.getNoteByIndex(5)
        .should('not.be.visible')
      notesPage.elements.getShowMoreLessLink()
        .should('have.text', 'Show more')
      notesPage.showMoreLessNotes()
      notesPage.elements.getNoteByIndex(5)
        .should('be.visible')

      notesPage.elements.getShowMoreLessLink()
        .should('have.text', 'Show less')
      notesPage.showMoreLessNotes()
      notesPage.elements.getNoteByIndex(5)
        .should('not.be.visible')
    });

    // TODO: Add tests of note display
  });
});
