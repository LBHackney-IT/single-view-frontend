import { AuthRoles, JigsawStatuses } from '../support/commands';
import { searchPage } from '../pages/search-page';

describe('matching', () => {
	before(() => {
		searchPage.pageUrl = "/search?firstName=Luna&lastName=Kitty"
		searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)
		searchPage.search("Luna", "Kitty")
	});

	it('allows user to match results', () => {
		cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')
		searchPage.elements.getMatchButton()
			.should('be.disabled');

		const checkboxIndexes = [1, 3]
		searchPage.matchResults(checkboxIndexes)

		cy.location('pathname').should('eq', '/customers/single-view/cypress-sv-id');
	});

})
