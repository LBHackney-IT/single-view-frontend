import { AuthRoles, JigsawStatuses } from '../support/commands';
import { searchPage } from '../pages/search-page';

describe('matching', () => {
	before(() => {
		cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')
		searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)
	})

	it('allows user to match results', () => {
		searchPage.search("Luna", "Kitty")
		searchPage.elements.getMatchButton()
			.should('be.disabled');

		const checkboxIndexes = [1, 3]
		searchPage.matchResults(checkboxIndexes)

		cy.location('pathname').should('eq', '/customers/single-view/cypress-sv-id');
	});

})
