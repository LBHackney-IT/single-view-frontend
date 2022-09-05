import { BasePersonPage } from "../base/base-person-page"
class NotesPage extends BasePersonPage {

	constructor(pageUrl: string = "/customers/personapi/6d7ed1a4#notes") {
		super(pageUrl = pageUrl)
	}

	elements = {
		...this.basePersonElements,
    getNotesTab: () => cy.get('#notes'),
    getSnapshotOne: () => cy.get('[data-snapshot="1"]'), // ???
    getNotes: () => cy.get('[data-testid^="note_"]:visible'),
    getShowMoreLessLink: () => cy.get('.list-snapshot-wrapper > .govuk-link'),
    getNoteByIndex: (index) => cy.get(`[data-testid="note_${index}"]`)
  }

  showMoreLessNotes() {
    this.elements.getShowMoreLessLink().click()
  }

}

export const notesPage = new NotesPage();
