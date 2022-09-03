import { AuthRoles, JigsawStatuses } from '../support/commands';
import { searchPage } from '../pages/search-page';

describe('matching', () => {
  before(() => {
    var jigsawLoggedIn = true;
    searchPage.pageUrl = "/search?firstName=Luna&lastName=Kitty"
    searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)

    cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' })
  });

 it('allows user to match results', () => {
    searchPage.elements.getMatchButton()
    .should('be.disabled');

    const checkboxIndexes = [1, 3]
    searchPage.matchResults(checkboxIndexes)

    cy.location('pathname').should('eq', '/customers/single-view/cypress-sv-id');
 });

})
